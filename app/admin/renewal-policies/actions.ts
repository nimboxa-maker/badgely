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

const renewalPolicySchema = z.object({
  certificationId: z.string().uuid(),
  validityPeriodText: optionalText(300),
  renewalMethod: optionalText(3000),
  officialRenewalUrl: optionalUrl,
  notes: optionalText(3000),
  lastVerifiedDate: optionalDate,
});

const renewalPolicyIdSchema = z.string().uuid();

function renewalPolicyFormValues(formData: FormData) {
  return {
    certificationId: formData.get("certificationId"),
    validityPeriodText: formData.get("validityPeriodText"),
    renewalMethod: formData.get("renewalMethod"),
    officialRenewalUrl: formData.get("officialRenewalUrl"),
    notes: formData.get("notes"),
    lastVerifiedDate: formData.get("lastVerifiedDate"),
  };
}

function renewalPolicyPayload(parsed: z.infer<typeof renewalPolicySchema>) {
  return {
    certification_id: parsed.certificationId,
    validity_period_text: parsed.validityPeriodText,
    renewal_method: parsed.renewalMethod,
    official_renewal_url: parsed.officialRenewalUrl,
    notes: parsed.notes,
    last_verified_date: parsed.lastVerifiedDate,
  };
}

export async function createRenewalPolicy(formData: FormData) {
  const parsed = renewalPolicySchema.safeParse(renewalPolicyFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the renewal policy details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("renewal_policies")
    .insert(renewalPolicyPayload(parsed.data));

  if (error) {
    if (error.code === "23505") {
      throw new Error("That certification already has a renewal policy.");
    }

    throw new Error("Unable to create the renewal policy.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/renewal-policies");
  revalidatePath("/certifications");
  redirect("/admin/renewal-policies");
}

export async function updateRenewalPolicy(formData: FormData) {
  const id = renewalPolicyIdSchema.safeParse(formData.get("id"));
  const parsed = renewalPolicySchema.safeParse(renewalPolicyFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the renewal policy details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("renewal_policies")
    .update(renewalPolicyPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new Error("That certification already has a renewal policy.");
    }

    throw new Error("Unable to update the renewal policy.");
  }

  if (!data) {
    throw new Error("Renewal policy not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/renewal-policies");
  revalidatePath(`/admin/renewal-policies/${id.data}/edit`);
  revalidatePath("/certifications");
  redirect("/admin/renewal-policies");
}
