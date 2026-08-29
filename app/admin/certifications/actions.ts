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

const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().trim().url().max(500).nullable(),
);

const optionalInteger = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : Number(value)),
  z.number().int().min(0).nullable(),
);

const optionalDate = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
);

const certificationSchema = z
  .object({
    providerId: z.string().uuid(),
    name: z.string().trim().min(2).max(160),
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(2)
      .max(160)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.string().trim().min(2).max(120),
    level: z.string().trim().min(2).max(120),
    vendorType: z.enum(["Vendor-neutral", "Vendor-specific"]),
    shortSummary: z.string().trim().min(10).max(500),
    fullSummary: optionalText(5000),
    targetJobRoles: z.string().max(1000),
    recommendedExperience: optionalText(2000),
    officialCertificationUrl: optionalUrl,
    status: z.enum(["Active", "Retiring Soon", "Retired"]),
    lastVerifiedDate: optionalDate,
    featured: z.boolean(),
    estimatedStudyHoursMin: optionalInteger,
    estimatedStudyHoursMax: optionalInteger,
    seoTitle: optionalText(200),
    seoDescription: optionalText(500),
  })
  .refine(
    (values) =>
      values.estimatedStudyHoursMin === null ||
      values.estimatedStudyHoursMax === null ||
      values.estimatedStudyHoursMin <= values.estimatedStudyHoursMax,
    { message: "Minimum study hours cannot exceed maximum study hours." },
  );

const certificationIdSchema = z.string().uuid();

function certificationFormValues(formData: FormData) {
  return {
    providerId: formData.get("providerId"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    level: formData.get("level"),
    vendorType: formData.get("vendorType"),
    shortSummary: formData.get("shortSummary"),
    fullSummary: formData.get("fullSummary"),
    targetJobRoles: formData.get("targetJobRoles") ?? "",
    recommendedExperience: formData.get("recommendedExperience"),
    officialCertificationUrl: formData.get("officialCertificationUrl"),
    status: formData.get("status"),
    lastVerifiedDate: formData.get("lastVerifiedDate"),
    featured: formData.get("featured") === "on",
    estimatedStudyHoursMin: formData.get("estimatedStudyHoursMin"),
    estimatedStudyHoursMax: formData.get("estimatedStudyHoursMax"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  };
}

function certificationPayload(parsed: z.infer<typeof certificationSchema>) {
  const targetJobRoles = parsed.targetJobRoles
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);

  return {
    provider_id: parsed.providerId,
    name: parsed.name,
    slug: parsed.slug,
    category: parsed.category,
    level: parsed.level,
    vendor_type: parsed.vendorType,
    short_summary: parsed.shortSummary,
    full_summary: parsed.fullSummary,
    target_job_roles: targetJobRoles,
    recommended_experience: parsed.recommendedExperience,
    official_certification_url: parsed.officialCertificationUrl,
    status: parsed.status,
    last_verified_date: parsed.lastVerifiedDate,
    featured: parsed.featured,
    estimated_study_hours_min: parsed.estimatedStudyHoursMin,
    estimated_study_hours_max: parsed.estimatedStudyHoursMax,
    seo_title: parsed.seoTitle,
    seo_description: parsed.seoDescription,
  };
}

export async function createCertification(formData: FormData) {
  const parsed = certificationSchema.safeParse(certificationFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the certification details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("certifications")
    .insert(certificationPayload(parsed.data));

  if (error) {
    if (error.code === "23505") {
      throw new Error("A certification with that slug already exists.");
    }

    throw new Error("Unable to create the certification.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/certifications");
  revalidatePath("/certifications");
  redirect("/admin/certifications");
}

export async function updateCertification(formData: FormData) {
  const id = certificationIdSchema.safeParse(formData.get("id"));
  const parsed = certificationSchema.safeParse(certificationFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the certification details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("certifications")
    .update(certificationPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A certification with that slug already exists.");
    }

    throw new Error("Unable to update the certification.");
  }

  if (!data) {
    throw new Error("Certification not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/certifications");
  revalidatePath(`/admin/certifications/${id.data}/edit`);
  revalidatePath("/certifications");
  revalidatePath(`/certifications/${parsed.data.slug}`);
  redirect("/admin/certifications");
}
