import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createExamDomain } from "@/app/admin/exam-domains/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function NewExamDomainPage() {
  const { supabase } = await requireAdmin();

  const { data: certifications, error } = await supabase
    .from("certifications")
    .select("id, name, status, providers(name)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(
      "Unable to load certifications for exam domain creation.",
    );
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

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add exam domain
        </h1>

        <p className="mt-2 text-slate-600">
          Add an exam objective domain and connect it to the correct
          certification.
        </p>
      </div>

      <Card className="mt-8">
        <form action={createExamDomain} className="space-y-6">
          <div>
            <label
              htmlFor="certificationId"
              className="text-sm font-semibold text-slate-700"
            >
              Certification
            </label>

            <select
              id="certificationId"
              name="certificationId"
              required
              defaultValue=""
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select a certification
              </option>

              {(certifications ?? []).map((certification) => {
                const provider = Array.isArray(
                  certification.providers,
                )
                  ? certification.providers[0]?.name
                  : certification.providers?.name;

                return (
                  <option
                    key={certification.id}
                    value={certification.id}
                  >
                    {provider ? `${provider} · ` : ""}
                    {certification.name}
                    {certification.status === "Active"
                      ? ""
                      : ` (${certification.status})`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="domainName"
                className="text-sm font-semibold text-slate-700"
              >
                Domain name
              </label>

              <input
                id="domainName"
                name="domainName"
                type="text"
                required
                minLength={2}
                maxLength={200}
                placeholder="ThirdBadge Test Domain"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="domainWeightText"
                className="text-sm font-semibold text-slate-700"
              >
                Domain weight
              </label>

              <input
                id="domainWeightText"
                name="domainWeightText"
                type="text"
                maxLength={120}
                placeholder="20%"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="displayOrder"
              className="text-sm font-semibold text-slate-700"
            >
              Display order
            </label>

            <input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min={0}
              step={1}
              defaultValue={0}
              required
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-500">
              Lower numbers appear earlier in the domain list.
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              maxLength={3000}
              placeholder="Optional factual summary of what this domain covers."
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
              Create exam domain
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}