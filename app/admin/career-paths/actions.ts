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

const careerPathSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  shortSummary: z.string().trim().min(10).max(500),
  fullSummary: optionalText(5000),
  audienceLevel: optionalText(100),
  targetRole: optionalText(200),
  estimatedTotalTimeText: optionalText(200),
  featured: z.boolean(),
  seoTitle: optionalText(200),
  seoDescription: optionalText(500),
});

const careerPathIdSchema = z.string().uuid();

function careerPathFormValues(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    shortSummary: formData.get("shortSummary"),
    fullSummary: formData.get("fullSummary"),
    audienceLevel: formData.get("audienceLevel"),
    targetRole: formData.get("targetRole"),
    estimatedTotalTimeText: formData.get("estimatedTotalTimeText"),
    featured: formData.get("featured") === "on",
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  };
}

function careerPathPayload(parsed: z.infer<typeof careerPathSchema>) {
  return {
    name: parsed.name,
    slug: parsed.slug,
    short_summary: parsed.shortSummary,
    full_summary: parsed.fullSummary,
    audience_level: parsed.audienceLevel,
    target_role: parsed.targetRole,
    estimated_total_time_text: parsed.estimatedTotalTimeText,
    featured: parsed.featured,
    seo_title: parsed.seoTitle,
    seo_description: parsed.seoDescription,
  };
}

export async function createCareerPath(formData: FormData) {
  const parsed = careerPathSchema.safeParse(careerPathFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the career path details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("career_paths").insert(careerPathPayload(parsed.data));

  if (error) {
    if (error.code === "23505") {
      throw new Error("That career path slug is already in use.");
    }

    throw new Error("Unable to create the career path.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/career-paths");
  revalidatePath("/career-paths");
  redirect("/admin/career-paths");
}

export async function updateCareerPath(formData: FormData) {
  const id = careerPathIdSchema.safeParse(formData.get("id"));
  const parsed = careerPathSchema.safeParse(careerPathFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the career path details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("career_paths")
    .update(careerPathPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new Error("That career path slug is already in use.");
    }

    throw new Error("Unable to update the career path.");
  }

  if (!data) {
    throw new Error("Career path not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/career-paths");
  revalidatePath(`/admin/career-paths/${id.data}/edit`);
  revalidatePath("/career-paths");
  revalidatePath(`/career-paths/${parsed.data.slug}`);
  redirect("/admin/career-paths");
}
