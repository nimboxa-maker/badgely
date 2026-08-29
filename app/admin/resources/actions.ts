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

const optionalDate = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
);

const optionalCostType = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.enum(["Free", "Paid", "Freemium"]).nullable(),
);

const resourceSchema = z.object({
  certificationId: z.string().uuid(),
  title: z.string().trim().min(2).max(200),
  description: optionalText(3000),
  resourceType: z.enum([
    "Official Guide",
    "Official Training",
    "Practice Lab",
    "Video Course",
    "Book",
    "Documentation",
    "Community",
  ]),
  url: optionalUrl,
  providerName: optionalText(200),
  isOfficial: z.boolean(),
  costType: optionalCostType,
  featured: z.boolean(),
  lastVerifiedDate: optionalDate,
});

const resourceIdSchema = z.string().uuid();

function resourceFormValues(formData: FormData) {
  return {
    certificationId: formData.get("certificationId"),
    title: formData.get("title"),
    description: formData.get("description"),
    resourceType: formData.get("resourceType"),
    url: formData.get("url"),
    providerName: formData.get("providerName"),
    isOfficial: formData.get("isOfficial") === "on",
    costType: formData.get("costType"),
    featured: formData.get("featured") === "on",
    lastVerifiedDate: formData.get("lastVerifiedDate"),
  };
}

function resourcePayload(parsed: z.infer<typeof resourceSchema>) {
  return {
    certification_id: parsed.certificationId,
    title: parsed.title,
    description: parsed.description,
    resource_type: parsed.resourceType,
    url: parsed.url,
    provider_name: parsed.providerName,
    is_official: parsed.isOfficial,
    cost_type: parsed.costType,
    featured: parsed.featured,
    last_verified_date: parsed.lastVerifiedDate,
  };
}

export async function createResource(formData: FormData) {
  const parsed = resourceSchema.safeParse(resourceFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the resource details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("resources").insert(resourcePayload(parsed.data));

  if (error) {
    throw new Error("Unable to create the resource.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/resources");
  revalidatePath("/certifications");
  redirect("/admin/resources");
}

export async function updateResource(formData: FormData) {
  const id = resourceIdSchema.safeParse(formData.get("id"));
  const parsed = resourceSchema.safeParse(resourceFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the resource details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("resources")
    .update(resourcePayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to update the resource.");
  }

  if (!data) {
    throw new Error("Resource not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/resources");
  revalidatePath(`/admin/resources/${id.data}/edit`);
  revalidatePath("/certifications");
  redirect("/admin/resources");
}
