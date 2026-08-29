import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateRenewalPolicy } from "@/app/admin/renewal-policies/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type EditRenewalPolicyPageProps = {
  params: Promise<{ id: string }>;
};

type CertificationRow = {
  id: string;
  name: string;
  status: string;
  providers: { name: string } | { name: string }[] | null;
};

export default async function EditRenewalPolicyPage({ params }: EditRenewalPolicyPageProps) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const [
    { data: policy, error: policyError },
    { data: certifications, error: certificationsError },
    { data: policies, error: policiesError },
  ] = await Promise.all([
    supabase
      .from("renewal_policies")
      .select(
        "id, certification_id, validity_period_text, renewal_method, official_renewal_url, notes, last_verified_date",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("certifications")
      .select("id, name, status, providers(name)")
      .order("name", { ascending: true }),
    supabase.from("renewal_policies").select("id, certification_id"),
  ]);

  if (policyError || certificationsError || policiesError) {
    throw new Error("Unable to load the renewal policy for editing.");
  }

  if (!policy) {
    notFound();
  }

  const usedCertificationIds = new Set(
    (policies ?? [])
      .filter((existingPolicy) => existingPolicy.id !== policy.id)
      .map((existingPolicy) => existingPolicy.certification_id),
  );

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
          Edit renewal policy
        </h1>
        <p className="mt-2 text-slate-600">
          Update renewal timing, methods, official guidance, and verification information.
        </p>
      </div>

      <Card className="mt-8">
        <form action={updateRenewalPolicy} className="space-y-6">
          <input type="hidden" name="id" value={policy.id} />

          <div>
            <label htmlFor="certificationId" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="certificationId"
              name="certificationId"
              required
              defaultValue={policy.certification_id}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
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
                defaultValue={policy.validity_period_text ?? ""}
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
                defaultValue={policy.last_verified_date ?? ""}
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
              defaultValue={policy.renewal_method ?? ""}
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
              defaultValue={policy.official_renewal_url ?? ""}
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
              defaultValue={policy.notes ?? ""}
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
              Save renewal policy changes
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
