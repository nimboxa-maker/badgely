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

const certificationRelationIdSchema = z.string().uuid();

function certificationRelationFormValues(formData: FormData) {
  return {
    sourceCertificationId: formData.get("sourceCertificationId"),
    targetCertificationId: formData.get("targetCertificationId"),
    relationType: formData.get("relationType"),
    explanation: formData.get("explanation"),
  };
}

function certificationRelationPayload(parsed: z.infer<typeof certificationRelationSchema>) {
  return {
    source_certification_id: parsed.sourceCertificationId,
    target_certification_id: parsed.targetCertificationId,
    relation_type: parsed.relationType,
    explanation: parsed.explanation,
  };
}

export async function createCertificationRelation(formData: FormData) {
  const parsed = certificationRelationSchema.safeParse(certificationRelationFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the certification relation details and try again.");
  }

  const { supabase } = await requireAdmin();
  const certificationIds = [parsed.data.sourceCertificationId, parsed.data.targetCertificationId];

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

  const { error } = await supabase
    .from("certification_relations")
    .insert(certificationRelationPayload(parsed.data));

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

export async function updateCertificationRelation(formData: FormData) {
  const id = certificationRelationIdSchema.safeParse(formData.get("id"));
  const parsed = certificationRelationSchema.safeParse(certificationRelationFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the certification relation details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data: existingRelation, error: existingError } = await supabase
    .from("certification_relations")
    .select("source_certification_id, target_certification_id")
    .eq("id", id.data)
    .maybeSingle();

  if (existingError) {
    throw new Error("Unable to verify the certification relation.");
  }

  if (!existingRelation) {
    throw new Error("Certification relation not found.");
  }

  const certificationIds = [
    ...new Set([
      existingRelation.source_certification_id,
      existingRelation.target_certification_id,
      parsed.data.sourceCertificationId,
      parsed.data.targetCertificationId,
    ]),
  ];

  const { data: certifications, error: certificationError } = await supabase
    .from("certifications")
    .select("id, slug")
    .in("id", certificationIds);

  if (certificationError) {
    throw new Error("Unable to verify the selected certifications.");
  }

  const selectedIds = new Set([
    parsed.data.sourceCertificationId,
    parsed.data.targetCertificationId,
  ]);
  const selectedCertificationCount = (certifications ?? []).filter((certification) =>
    selectedIds.has(certification.id),
  ).length;

  if (selectedCertificationCount !== 2) {
    throw new Error("One or both selected certifications are no longer available.");
  }

  const { data, error } = await supabase
    .from("certification_relations")
    .update(certificationRelationPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new Error("That certification relation already exists.");
    }

    if (error.code === "23503") {
      throw new Error("One or both selected certifications are no longer available.");
    }

    throw new Error("Unable to update the certification relation.");
  }

  if (!data) {
    throw new Error("Certification relation not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/certification-relations");
  revalidatePath(`/admin/certification-relations/${id.data}/edit`);
  revalidatePath("/certifications");

  for (const certification of certifications ?? []) {
    revalidatePath(`/certifications/${certification.slug}`);
  }

  redirect("/admin/certification-relations");
}

export async function deleteCertificationRelation(formData: FormData) {
  const id = certificationRelationIdSchema.safeParse(formData.get("id"));

  if (!id.success) {
    throw new Error("Invalid certification relation.");
  }

  const { supabase } = await requireAdmin();
  const { data: existingRelation, error: existingError } = await supabase
    .from("certification_relations")
    .select("source_certification_id, target_certification_id")
    .eq("id", id.data)
    .maybeSingle();

  if (existingError) {
    throw new Error("Unable to verify the certification relation before deletion.");
  }

  if (!existingRelation) {
    throw new Error("Certification relation not found.");
  }

  const certificationIds = [
    existingRelation.source_certification_id,
    existingRelation.target_certification_id,
  ];
  const { data: certifications, error: certificationError } = await supabase
    .from("certifications")
    .select("id, slug")
    .in("id", certificationIds);

  if (certificationError) {
    throw new Error("Unable to verify linked certifications before deletion.");
  }

  const { data: deleted, error: deleteError } = await supabase
    .from("certification_relations")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (deleteError) {
    throw new Error("Unable to delete the certification relation.");
  }

  if (!deleted) {
    throw new Error("Certification relation deletion could not be verified.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/certification-relations");
  revalidatePath("/certifications");

  for (const certification of certifications ?? []) {
    revalidatePath(`/certifications/${certification.slug}`);
  }
}
