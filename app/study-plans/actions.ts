"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateStudySchedule } from "@/features/study-plans/scheduling";
import { createClient } from "@/lib/supabase/server";

const createStudyPlanSchema = z.object({
  certificationId: z.string().uuid(),
  currentExperienceLevel: z.enum([
    "Beginner",
    "Some experience",
    "Intermediate",
    "Advanced",
  ]),
  targetExamDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  weeklyStudyHours: z.coerce.number().int().min(1).max(40),
  includeLabs: z.boolean(),
});

const toggleStudyTaskSchema = z.object({
  taskId: z.string().uuid(),
  studyPlanId: z.string().uuid(),
  completed: z.enum(["true", "false"]),
});

export async function createStudyPlan(formData: FormData) {
  const parsed = createStudyPlanSchema.safeParse({
    certificationId: formData.get("certificationId"),
    currentExperienceLevel: formData.get("currentExperienceLevel"),
    targetExamDate: formData.get("targetExamDate"),
    weeklyStudyHours: formData.get("weeklyStudyHours"),
    includeLabs: formData.get("includeLabs") === "true",
  });

  if (!parsed.success) {
    throw new Error("Please check the study-plan settings and try again.");
  }

  const targetDate = new Date(`${parsed.data.targetExamDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(targetDate.getTime()) || targetDate <= today) {
    throw new Error("Choose a target exam date after today.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+create+a+study+plan.");
  }

  const [certificationResult, domainsResult, resourcesResult] = await Promise.all([
    supabase
      .from("certifications")
      .select(
        "id, name, estimated_study_hours_min, estimated_study_hours_max, status",
      )
      .eq("id", parsed.data.certificationId)
      .maybeSingle(),
    supabase
      .from("exam_domains")
      .select("domain_name, description, display_order")
      .eq("certification_id", parsed.data.certificationId)
      .order("display_order", { ascending: true }),
    supabase
      .from("resources")
      .select("title, description, resource_type, is_official")
      .eq("certification_id", parsed.data.certificationId)
      .order("featured", { ascending: false }),
  ]);

  if (certificationResult.error || !certificationResult.data) {
    throw new Error("Unable to load the selected certification.");
  }

  if (certificationResult.data.status !== "Active") {
    throw new Error("Study plans can only be created for active certifications.");
  }

  if (domainsResult.error || resourcesResult.error) {
    throw new Error("Unable to load certification study content.");
  }

  const schedule = generateStudySchedule({
    targetExamDate: parsed.data.targetExamDate,
    weeklyStudyHours: parsed.data.weeklyStudyHours,
    includeLabs: parsed.data.includeLabs,
    estimatedStudyHoursMin:
      certificationResult.data.estimated_study_hours_min,
    estimatedStudyHoursMax:
      certificationResult.data.estimated_study_hours_max,
    domains: domainsResult.data ?? [],
    resources: resourcesResult.data ?? [],
  });

  if (schedule.studyWeeks < 1 || schedule.tasks.length < 1) {
    throw new Error("Unable to generate a study schedule for these settings.");
  }

  const planSummary = [
    `${certificationResult.data.name} study plan`,
    `${schedule.studyWeeks} week${schedule.studyWeeks === 1 ? "" : "s"}`,
    `${parsed.data.weeklyStudyHours} hour${parsed.data.weeklyStudyHours === 1 ? "" : "s"} per week`,
    schedule.warning,
  ]
    .filter(Boolean)
    .join(". ");

  const { data: studyPlan, error: studyPlanError } = await supabase
    .from("user_study_plans")
    .insert({
      user_id: user.id,
      certification_id: parsed.data.certificationId,
      target_exam_date: parsed.data.targetExamDate,
      weekly_study_hours: parsed.data.weeklyStudyHours,
      study_weeks: schedule.studyWeeks,
      include_labs: parsed.data.includeLabs,
      current_experience_level: parsed.data.currentExperienceLevel,
      generated_plan_text: planSummary,
    })
    .select("id")
    .single();

  if (studyPlanError || !studyPlan) {
    throw new Error("Unable to save your study plan.");
  }

  const { error: tasksError } = await supabase.from("study_tasks").insert(
    schedule.tasks.map((task) => ({
      user_study_plan_id: studyPlan.id,
      title: task.title,
      description: task.description,
      week_number: task.week_number,
      estimated_hours: task.estimated_hours,
      task_type: task.task_type,
      display_order: task.display_order,
    })),
  );

  if (tasksError) {
    await supabase
      .from("user_study_plans")
      .delete()
      .eq("id", studyPlan.id)
      .eq("user_id", user.id);

    throw new Error("Unable to save the generated study tasks.");
  }

  redirect(`/study-plans/${studyPlan.id}`);
}

export async function toggleStudyTaskCompletion(formData: FormData) {
  const parsed = toggleStudyTaskSchema.safeParse({
    taskId: formData.get("taskId"),
    studyPlanId: formData.get("studyPlanId"),
    completed: formData.get("completed"),
  });

  if (!parsed.success) {
    throw new Error("Unable to update this study task.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+update+your+study+plan.");
  }

  const { data: studyPlan, error: studyPlanError } = await supabase
    .from("user_study_plans")
    .select("id")
    .eq("id", parsed.data.studyPlanId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (studyPlanError || !studyPlan) {
    throw new Error("Unable to update this study task.");
  }

  const completed = parsed.data.completed === "true";
  const { error } = await supabase
    .from("study_tasks")
    .update({
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    })
    .eq("id", parsed.data.taskId)
    .eq("user_study_plan_id", studyPlan.id);

  if (error) {
    throw new Error("Unable to update this study task.");
  }

  revalidatePath(`/study-plans/${studyPlan.id}`);
  revalidatePath("/dashboard");
}
