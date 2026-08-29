"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.string().trim().max(max).nullable(),
  );

const optionalCertificationId = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().uuid().nullable(),
);

const careerPathStepSchema = z.object({
  careerPathId: z.string().uuid(),
  certificationId: optionalCertificationId,
  stepNumber: z.coerce.number().int().positive().max(1000),
  title: z.string().trim().min(2).max(300),
  explanation: optionalText(5000),
  isOptional: z.boolean(),
  practicalActivity: optionalText(3000),
  displayOrder: z.coerce.number().int().min(0).max(10000),
});

const careerPathStepIdSchema = z.string().uuid();

function careerPathStepFormValues(formData: FormData) {
  return {
    careerPathId: formData.get("careerPathId"),
    certificationId: formData.get("certificationId"),
    stepNumber: formData.get("stepNumber"),
    title: formData.get("title"),
    explanation: formData.get("explanation"),
    isOptional: formData.get("isOptional") === "on",
    practicalActivity: formData.get("practicalActivity"),
    displayOrder: formData.get("displayOrder"),
  };
}

function careerPathStepPayload(parsed: z.infer<typeof careerPathStepSchema>) {
  return {
    career_path_id: parsed.careerPathId,
    certification_id: parsed.certificationId,
    step_number: parsed.stepNumber,
    title: parsed.title,
    explanation: parsed.explanation,
    is_optional: parsed.isOptional,
    practical_activity: parsed.practicalActivity,
    display_order: parsed.displayOrder,
  };
}

export async function createCareerPathStep(formData: FormData) {
  const parsed = careerPathStepSchema.safeParse(careerPathStepFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the career path step details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data: careerPath, error: careerPathError } = await supabase
    .from("career_paths")
    .select("slug")
    .eq("id", parsed.data.careerPathId)
    .maybeSingle();

  if (careerPathError) {
    throw new Error("Unable to verify the selected career path.");
  }

  if (!careerPath) {
    throw new Error("Selected career path not found.");
  }

  const { error } = await supabase
    .from("career_path_steps")
    .insert(careerPathStepPayload(parsed.data));

  if (error) {
    if (error.code === "23503") {
      throw new Error("The selected career path or certification is no longer available.");
    }

    throw new Error("Unable to create the career path step.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/career-path-steps");
  revalidatePath("/career-paths");
  revalidatePath(`/career-paths/${careerPath.slug}`);
  redirect("/admin/career-path-steps");
}

export async function updateCareerPathStep(formData: FormData) {
  const id = careerPathStepIdSchema.safeParse(formData.get("id"));
  const parsed = careerPathStepSchema.safeParse(careerPathStepFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the career path step details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data: existingStep, error: existingStepError } = await supabase
    .from("career_path_steps")
    .select("career_path_id")
    .eq("id", id.data)
    .maybeSingle();

  if (existingStepError) {
    throw new Error("Unable to verify the career path step.");
  }

  if (!existingStep) {
    throw new Error("Career path step not found.");
  }

  const pathIds = [...new Set([existingStep.career_path_id, parsed.data.careerPathId])];
  const { data: careerPaths, error: careerPathsError } = await supabase
    .from("career_paths")
    .select("id, slug")
    .in("id", pathIds);

  if (careerPathsError) {
    throw new Error("Unable to verify the selected career path.");
  }

  const selectedPath = careerPaths?.find((path) => path.id === parsed.data.careerPathId);

  if (!selectedPath) {
    throw new Error("Selected career path not found.");
  }

  const { data, error } = await supabase
    .from("career_path_steps")
    .update(careerPathStepPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    if (error.code === "23503") {
      throw new Error("The selected career path or certification is no longer available.");
    }

    throw new Error("Unable to update the career path step.");
  }

  if (!data) {
    throw new Error("Career path step not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/career-path-steps");
  revalidatePath(`/admin/career-path-steps/${id.data}/edit`);
  revalidatePath("/career-paths");

  for (const path of careerPaths ?? []) {
    revalidatePath(`/career-paths/${path.slug}`);
  }

  redirect("/admin/career-path-steps");
}
