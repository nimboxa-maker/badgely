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

export async function createExamDomain(formData: FormData) {
  const parsed = examDomainSchema.safeParse({
    certificationId: formData.get("certificationId"),
    domainName: formData.get("domainName"),
    domainWeightText: formData.get("domainWeightText"),
    description: formData.get("description"),
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    throw new Error("Please check the exam domain details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("exam_domains").insert({
    certification_id: parsed.data.certificationId,
    domain_name: parsed.data.domainName,
    domain_weight_text: parsed.data.domainWeightText,
    description: parsed.data.description,
    display_order: parsed.data.displayOrder,
  });

  if (error) {
    throw new Error("Unable to create the exam domain.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exam-domains");
  revalidatePath("/certifications");
  redirect("/admin/exam-domains");
}
