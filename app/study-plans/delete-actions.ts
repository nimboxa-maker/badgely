"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const deleteStudyPlanSchema = z.object({
  studyPlanId: z.string().uuid(),
});

export async function deleteStudyPlan(formData: FormData) {
  const parsed = deleteStudyPlanSchema.safeParse({
    studyPlanId: formData.get("studyPlanId"),
  });

  if (!parsed.success) {
    throw new Error("Unable to delete this study plan.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+update+your+study+plan.");
  }

  const { data: deletedPlan, error } = await supabase
    .from("user_study_plans")
    .delete()
    .eq("id", parsed.data.studyPlanId)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();

  if (error || !deletedPlan) {
    throw new Error("Unable to delete this study plan.");
  }

  redirect("/dashboard");
}
