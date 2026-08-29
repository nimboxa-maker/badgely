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

export async function createRenewalPolicy(formData: FormData) {
  const parsed = renewalPolicySchema.safeParse({
    certificationId: formData.get("certificationId"),
    validityPeriodText: formData.get("validityPeriodText"),
    renewalMethod: formData.get("renewalMethod"),
    officialRenewalUrl: formData.get("officialRenewalUrl"),
    notes: formData.get("notes"),
    lastVerifiedDate: formData.get("lastVerifiedDate"),
  });

  if (!parsed.success) {
    throw new Error("Please check the renewal policy details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("renewal_policies").insert({
    certification_id: parsed.data.certificationId,
    validity_period_text: parsed.data.validityPeriodText,
    renewal_method: parsed.data.renewalMethod,
    official_renewal_url: parsed.data.officialRenewalUrl,
    notes: parsed.data.notes,
    last_verified_date: parsed.data.lastVerifiedDate,
  });

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
