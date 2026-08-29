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

const nonNegativeInteger = z.preprocess(
  (value) => Number(value),
  z.number().int().min(0),
);

const examDomainSchema = z.object({
  certificationId: z.string().uuid(),
  domainName: z.string().trim().min(2).max(200),
  domainWeightText: optionalText(120),
  description: optionalText(3000),
  displayOrder: nonNegativeInteger,
});

const examDomainIdSchema = z.string().uuid();

function examDomainFormValues(formData: FormData) {
  return {
    certificationId: formData.get("certificationId"),
    domainName: formData.get("domainName"),
    domainWeightText: formData.get("domainWeightText"),
    description: formData.get("description"),
    displayOrder: formData.get("displayOrder"),
  };
}

function examDomainPayload(parsed: z.infer<typeof examDomainSchema>) {
  return {
    certification_id: parsed.certificationId,
    domain_name: parsed.domainName,
    domain_weight_text: parsed.domainWeightText,
    description: parsed.description,
    display_order: parsed.displayOrder,
  };
}

export async function createExamDomain(formData: FormData) {
  const parsed = examDomainSchema.safeParse(examDomainFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the exam domain details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("exam_domains").insert(examDomainPayload(parsed.data));

  if (error) {
    throw new Error("Unable to create the exam domain.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exam-domains");
  revalidatePath("/certifications");
  redirect("/admin/exam-domains");
}

export async function updateExamDomain(formData: FormData) {
  const id = examDomainIdSchema.safeParse(formData.get("id"));
  const parsed = examDomainSchema.safeParse(examDomainFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the exam domain details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("exam_domains")
    .update(examDomainPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to update the exam domain.");
  }

  if (!data) {
    throw new Error("Exam domain not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exam-domains");
  revalidatePath(`/admin/exam-domains/${id.data}/edit`);
  revalidatePath("/certifications");
  redirect("/admin/exam-domains");
}
