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
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
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

const examIdSchema = z.string().uuid();

function examFormValues(formData: FormData) {
  return {
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
  };
}

function examPayload(parsed: z.infer<typeof examSchema>) {
  return {
    certification_id: parsed.certificationId,
    exam_name: parsed.examName,
    exam_code: parsed.examCode,
    number_of_exams: parsed.numberOfExams,
    duration_minutes: parsed.durationMinutes,
    question_count_text: parsed.questionCountText,
    delivery_method: parsed.deliveryMethod,
    price_text: parsed.priceText,
    registration_url: parsed.registrationUrl,
    notes: parsed.notes,
    last_verified_date: parsed.lastVerifiedDate,
  };
}

export async function createExam(formData: FormData) {
  const parsed = examSchema.safeParse(examFormValues(formData));

  if (!parsed.success) {
    throw new Error("Please check the exam details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("exams").insert(examPayload(parsed.data));

  if (error) {
    throw new Error("Unable to create the exam.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exams");
  revalidatePath("/certifications");
  redirect("/admin/exams");
}

export async function updateExam(formData: FormData) {
  const id = examIdSchema.safeParse(formData.get("id"));
  const parsed = examSchema.safeParse(examFormValues(formData));

  if (!id.success || !parsed.success) {
    throw new Error("Please check the exam details and try again.");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("exams")
    .update(examPayload(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to update the exam.");
  }

  if (!data) {
    throw new Error("Exam not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exams");
  revalidatePath(`/admin/exams/${id.data}/edit`);
  revalidatePath("/certifications");
  redirect("/admin/exams");
}

export async function deleteExam(formData: FormData) {
  const id = examIdSchema.safeParse(formData.get("id"));

  if (!id.success) {
    throw new Error("Unable to delete the exam.");
  }

  const { supabase } = await requireAdmin();
  const { data: exam, error: examError } = await supabase
    .from("exams")
    .select("id, certification_id")
    .eq("id", id.data)
    .maybeSingle();

  if (examError) {
    throw new Error("Unable to delete the exam.");
  }

  if (!exam) {
    throw new Error("Exam not found.");
  }

  const { data: certification } = await supabase
    .from("certifications")
    .select("slug")
    .eq("id", exam.certification_id)
    .maybeSingle();

  const { data: deleted, error: deleteError } = await supabase
    .from("exams")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (deleteError || !deleted) {
    throw new Error("Unable to delete the exam.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exams");
  revalidatePath("/certifications");

  if (certification?.slug) {
    revalidatePath(`/certifications/${certification.slug}`);
  }
}
