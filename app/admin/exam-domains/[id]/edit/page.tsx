import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateExamDomain } from "@/app/admin/exam-domains/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type EditExamDomainPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditExamDomainPage({ params }: EditExamDomainPageProps) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const [
    { data: domain, error: domainError },
    { data: certifications, error: certificationsError },
  ] = await Promise.all([
    supabase
      .from("exam_domains")
      .select("id, certification_id, domain_name, domain_weight_text, description, display_order")
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("certifications")
      .select("id, name, status, providers(name)")
      .order("name", { ascending: true }),
  ]);

  if (domainError || certificationsError) {
    throw new Error("Unable to load the exam domain for editing.");
  }

  if (!domain) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/exam-domains"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to exam domains
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Exam domains
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Edit exam domain</h1>
        <p className="mt-2 text-slate-600">
          Update the objective domain, weight, description, and ordering information.
        </p>
      </div>

      <Card className="mt-8">
        <form action={updateExamDomain} className="space-y-6">
          <input type="hidden" name="id" value={domain.id} />

          <div>
            <label htmlFor="certificationId" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="certificationId"
              name="certificationId"
              required
              defaultValue={domain.certification_id}
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
              <label htmlFor="domainName" className="text-sm font-semibold text-slate-700">
                Domain name
              </label>
              <input
                id="domainName"
                name="domainName"
                type="text"
                required
                minLength={2}
                maxLength={200}
                defaultValue={domain.domain_name}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="domainWeightText" className="text-sm font-semibold text-slate-700">
                Domain weight
              </label>
              <input
                id="domainWeightText"
                name="domainWeightText"
                type="text"
                maxLength={120}
                defaultValue={domain.domain_weight_text ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="displayOrder" className="text-sm font-semibold text-slate-700">
              Display order
            </label>
            <input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min={0}
              step={1}
              required
              defaultValue={domain.display_order}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              maxLength={3000}
              defaultValue={domain.description ?? ""}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/exam-domains"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save exam domain changes
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
