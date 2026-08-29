import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createRenewalPolicy } from "@/app/admin/renewal-policies/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type CertificationRow = {
  id: string;
  name: string;
  status: string;
  providers: { name: string } | { name: string }[] | null;
};

export default async function NewRenewalPolicyPage() {
  const { supabase } = await requireAdmin();

  const [{ data: certifications, error: certificationsError }, { data: policies, error: policiesError }] =
    await Promise.all([
      supabase
        .from("certifications")
        .select("id, name, status, providers(name)")
        .order("name", { ascending: true }),
      supabase.from("renewal_policies").select("certification_id"),
    ]);

  if (certificationsError || policiesError) {
    throw new Error("Unable to load certifications for renewal policy creation.");
  }

  const usedCertificationIds = new Set((policies ?? []).map((policy) => policy.certification_id));
  const availableCertifications = ((certifications ?? []) as unknown as CertificationRow[]).filter(
    (certification) => !usedCertificationIds.has(certification.id),
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/renewal-policies"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to renewal policies
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Renewal policies
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add renewal policy
        </h1>
        <p className="mt-2 text-slate-600">
          Add one renewal policy per certification and record the official renewal guidance.
        </p>
      </div>

      <Card className="mt-8">
        {availableCertifications.length ? (
          <form action={createRenewalPolicy} className="space-y-6">
            <div>
              <label htmlFor="certificationId" className="text-sm font-semibold text-slate-700">
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
                {availableCertifications.map((certification) => {
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
                <label htmlFor="validityPeriodText" className="text-sm font-semibold text-slate-700">
                  Validity period
                </label>
                <input
                  id="validityPeriodText"
                  name="validityPeriodText"
                  type="text"
                  maxLength={300}
                  placeholder="3 years"
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
                  className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="renewalMethod" className="text-sm font-semibold text-slate-700">
                Renewal method
              </label>
              <textarea
                id="renewalMethod"
                name="renewalMethod"
                rows={4}
                maxLength={3000}
                placeholder="Describe the renewal method or continuing-education requirements."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="officialRenewalUrl" className="text-sm font-semibold text-slate-700">
                Official renewal URL
              </label>
              <input
                id="officialRenewalUrl"
                name="officialRenewalUrl"
                type="url"
                maxLength={500}
                placeholder="https://..."
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
                placeholder="Optional factual notes about renewal timing, fees, or exceptions."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/renewal-policies"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create renewal policy
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-bold text-slate-950">Every certification has a renewal policy</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Edit an existing policy instead of creating a duplicate record.
            </p>
            <Link
              href="/admin/renewal-policies"
              className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Back to renewal policies
            </Link>
          </div>
        )}
      </Card>
    </main>
  );
}
