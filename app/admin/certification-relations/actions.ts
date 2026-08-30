"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";

const relationTypes = [
  "Recommended Before",
  "Recommended After",
  "Alternative",
  "Specialization",
] as const;

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.string().trim().max(max).nullable(),
  );

const certificationRelationSchema = z
  .object({
    sourceCertificationId: z.string().uuid(),
    targetCertificationId: z.string().uuid(),
    relationType: z.enum(relationTypes),
    explanation: optionalText(5000),
  })
  .refine((value) => value.sourceCertificationId !== value.targetCertificationId, {
    message: "A certification cannot be related to itself.",
  });

function certificationRelationFormValues(formData: FormData) {
  return {
    sourceCertificationId: formData.get("sourceCertificationId"),
    targetCertificationId: formData.get("targetCertificationId"),
    relationType: formData.get("relationType"),
    explanation: formData.get("explanation"),
  };
}

export async function createCertificationRelation(formData: FormData) {
  const parsed = certificationRelationSchema.safeParse(
    certificationRelationFormValues(formData),
  );

  if (!parsed.success) {
    throw new Error("Please check the certification relation details and try again.");
  }

  const { supabase } = await requireAdmin();
  const certificationIds = [
    parsed.data.sourceCertificationId,
    parsed.data.targetCertificationId,
  ];

  const { data: certifications, error: certificationError } = await supabase
    .from("certifications")
    .select("id, slug")
    .in("id", certificationIds);

  if (certificationError) {
    throw new Error("Unable to verify the selected certifications.");
  }

  if ((certifications ?? []).length !== 2) {
    throw new Error("One or both selected certifications are no longer available.");
  }

  const { error } = await supabase.from("certification_relations").insert({
    source_certification_id: parsed.data.sourceCertificationId,
    target_certification_id: parsed.data.targetCertificationId,
    relation_type: parsed.data.relationType,
    explanation: parsed.data.explanation,
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("That certification relation already exists.");
    }

    if (error.code === "23503") {
      throw new Error("One or both selected certifications are no longer available.");
    }

    throw new Error("Unable to create the certification relation.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/certification-relations");
  revalidatePath("/certifications");

  for (const certification of certifications ?? []) {
    revalidatePath(`/certifications/${certification.slug}`);
  }

  redirect("/admin/certification-relations");
}
