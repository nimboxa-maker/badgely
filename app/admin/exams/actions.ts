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

const optionalPositiveInteger = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : Number(value)),
  z.number().int().positive().nullable(),
);

const optionalDate = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
);

const examSchema = z.object({
  certificationId: z.string().uuid(),
  examName: optionalText(200),
  examCode: optionalText(120),
  numberOfExams: optionalPositiveInteger,
  durationMinutes: optionalPositiveInteger,
  questionCountText: optionalText(200),
  deliveryMethod: optionalText(300),
  priceText: optionalText(200),
  registrationUrl: optionalUrl,
  notes: optionalText(3000),
  lastVerifiedDate: optionalDate,
});

export async function createExam(formData: FormData) {
  const parsed = examSchema.safeParse({
    certificationId: formData.get("certificationId"),
    examName: formData.get("examName"),
    examCode: formData.get("examCode"),
    numberOfExams: formData.get("numberOfExams"),
    durationMinutes: formData.get("durationMinutes"),
    questionCountText: formData.get("questionCountText"),
    deliveryMethod: formData.get("deliveryMethod"),
    priceText: formData.get("priceText"),
    registrationUrl: formData.get("registrationUrl"),
    notes: formData.get("notes"),
    lastVerifiedDate: formData.get("lastVerifiedDate"),
  });

  if (!parsed.success) {
    throw new Error("Please check the exam details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("exams").insert({
    certification_id: parsed.data.certificationId,
    exam_name: parsed.data.examName,
    exam_code: parsed.data.examCode,
    number_of_exams: parsed.data.numberOfExams,
    duration_minutes: parsed.data.durationMinutes,
    question_count_text: parsed.data.questionCountText,
    delivery_method: parsed.data.deliveryMethod,
    price_text: parsed.data.priceText,
    registration_url: parsed.data.registrationUrl,
    notes: parsed.data.notes,
    last_verified_date: parsed.data.lastVerifiedDate,
  });

  if (error) {
    throw new Error("Unable to create the exam.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exams");
  revalidatePath("/certifications");
  redirect("/admin/exams");
}
