import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateExam } from "@/app/admin/exams/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type EditExamPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditExamPage({ params }: EditExamPageProps) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const [{ data: exam, error: examError }, { data: certifications, error: certificationsError }] =
    await Promise.all([
      supabase
        .from("exams")
        .select(
          "id, certification_id, exam_name, exam_code, number_of_exams, duration_minutes, question_count_text, delivery_method, price_text, registration_url, notes, last_verified_date",
        )
        .eq("id", id)
        .maybeSingle(),
      supabase
        .from("certifications")
        .select("id, name, status, providers(name)")
        .order("name", { ascending: true }),
    ]);

  if (examError || certificationsError) {
    throw new Error("Unable to load the exam for editing.");
  }

  if (!exam) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/exams"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to exams
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Exams
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Edit exam</h1>
        <p className="mt-2 text-slate-600">
          Update verified exam details and keep the certification connection accurate.
        </p>
      </div>

      <Card className="mt-8">
        <form action={updateExam} className="space-y-6">
          <input type="hidden" name="id" value={exam.id} />

          <div>
            <label htmlFor="certificationId" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="certificationId"
              name="certificationId"
              required
              defaultValue={exam.certification_id}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {(certifications ?? []).map((certification) => {
                const provider = Array.isArray(certification.providers)
                  ? certification.providers[0]?.name
                  : certification.providers?.name;

                return (
                  <option key={certification.id} value={certification.id}>
                    {provider ? `${provider} · ` : ""}
                    {certification.name}
                    {certification.status === "Active" ? "" : ` (${certification.status})`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="examName" className="text-sm font-semibold text-slate-700">
                Exam name
              </label>
              <input
                id="examName"
                name="examName"
                type="text"
                maxLength={200}
                defaultValue={exam.exam_name ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="examCode" className="text-sm font-semibold text-slate-700">
                Exam code
              </label>
              <input
                id="examCode"
                name="examCode"
                type="text"
                maxLength={120}
                defaultValue={exam.exam_code ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="numberOfExams" className="text-sm font-semibold text-slate-700">
                Number of exams
              </label>
              <input
                id="numberOfExams"
                name="numberOfExams"
                type="number"
                min={1}
                step={1}
                defaultValue={exam.number_of_exams ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="durationMinutes" className="text-sm font-semibold text-slate-700">
                Duration in minutes
              </label>
              <input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min={1}
                step={1}
                defaultValue={exam.duration_minutes ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="questionCountText" className="text-sm font-semibold text-slate-700">
                Question count
              </label>
              <input
                id="questionCountText"
                name="questionCountText"
                type="text"
                maxLength={200}
                defaultValue={exam.question_count_text ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="deliveryMethod" className="text-sm font-semibold text-slate-700">
                Delivery method
              </label>
              <input
                id="deliveryMethod"
                name="deliveryMethod"
                type="text"
                maxLength={300}
                defaultValue={exam.delivery_method ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="priceText" className="text-sm font-semibold text-slate-700">
                Price
              </label>
              <input
                id="priceText"
                name="priceText"
                type="text"
                maxLength={200}
                defaultValue={exam.price_text ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="lastVerifiedDate" className="text-sm font-semibold text-slate-700">
                Last verified date
              </label>
              <input
                id="lastVerifiedDate"
                name="lastVerifiedDate"
                type="date"
                defaultValue={exam.last_verified_date ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="registrationUrl" className="text-sm font-semibold text-slate-700">
              Registration URL
            </label>
            <input
              id="registrationUrl"
              name="registrationUrl"
              type="url"
              maxLength={500}
              defaultValue={exam.registration_url ?? ""}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              maxLength={3000}
              defaultValue={exam.notes ?? ""}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/exams"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save exam changes
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
