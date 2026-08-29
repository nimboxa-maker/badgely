"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";

const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().trim().url().max(500).nullable(),
);

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.string().trim().max(max).nullable(),
  );

const providerFieldsSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  websiteUrl: optionalUrl,
  description: optionalText(2000),
  providerType: z.preprocess(
    (value) => (value === "" ? null : value),
    z.enum(["vendor-neutral", "vendor-specific", "professional-body"]).nullable(),
  ),
  accentColor: optionalText(40),
  active: z.boolean(),
});

const updateProviderSchema = providerFieldsSchema.extend({
  id: z.string().uuid(),
});

function providerFormValues(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    websiteUrl: formData.get("websiteUrl"),
    description: formData.get("description"),
    providerType: formData.get("providerType"),
    accentColor: formData.get("accentColor"),
    active: formData.get("active") === "on",
  };
}

export async function createProvider(formData: FormData) {
  const parsed = providerFieldsSchema.safeParse(providerFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the provider details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("providers").insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    website_url: parsed.data.websiteUrl,
    description: parsed.data.description,
    provider_type: parsed.data.providerType,
    accent_color: parsed.data.accentColor,
    active: parsed.data.active,
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("A provider with that name or slug already exists.");
    }

    throw new Error("Unable to create the provider.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/providers");
  redirect("/admin/providers");
}

export async function updateProvider(formData: FormData) {
  const parsed = updateProviderSchema.safeParse({
    id: formData.get("id"),
    ...providerFormValues(formData),
  });

  if (!parsed.success) {
    throw new Error("Please check the provider details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("providers")
    .update({
      name: parsed.data.name,
      slug: parsed.data.slug,
      website_url: parsed.data.websiteUrl,
      description: parsed.data.description,
      provider_type: parsed.data.providerType,
      accent_color: parsed.data.accentColor,
      active: parsed.data.active,
    })
    .eq("id", parsed.data.id);

  if (error) {
    if (error.code === "23505") {
      throw new Error("A provider with that name or slug already exists.");
    }

    throw new Error("Unable to update the provider.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/providers");
  revalidatePath(`/admin/providers/${parsed.data.id}/edit`);
  redirect("/admin/providers");
}
