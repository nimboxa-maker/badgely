import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminRenewalPoliciesPageProps = {
  searchParams: Promise<{
    q?: string;
    certification?: string;
  }>;
};

type RenewalPolicyRow = {
  id: string;
  validity_period_text: string | null;
  renewal_method: string | null;
  official_renewal_url: string | null;
  notes: string | null;
  last_verified_date: string | null;
  certifications: {
    id: string;
    name: string;
    slug: string;
    status: string;
    providers: {
      name: string;
    } | null;
  } | null;
};

function verifiedLabel(value: string | null) {
  if (!value) {
    return "Not verified";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function AdminRenewalPoliciesPage({
  searchParams,
}: AdminRenewalPoliciesPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const certification = params.certification?.trim() || "all";

  const { data, error } = await supabase
    .from("renewal_policies")
    .select(
      "id, validity_period_text, renewal_method, official_renewal_url, notes, last_verified_date, certifications(id, name, slug, status, providers(name))",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load renewal policies for administration.");
  }

  const allPolicies = (data ?? []) as unknown as RenewalPolicyRow[];
  const certificationOptions = [
    ...new Map(
      allPolicies
        .filter((policy) => policy.certifications)
        .map((policy) => [
          policy.certifications!.slug,
          `${policy.certifications!.providers?.name ?? "Unknown provider"} · ${policy.certifications!.name}`,
        ]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  const policies = allPolicies.filter((policy) => {
    const searchable = [
      policy.validity_period_text ?? "",
      policy.renewal_method ?? "",
      policy.notes ?? "",
      policy.certifications?.name ?? "",
      policy.certifications?.providers?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesCertification =
      certification === "all" || policy.certifications?.slug === certification;

    return matchesQuery && matchesCertification;
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to admin
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Renewal policies
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Renewal policy records
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search certification renewal guidance, review official sources, and inspect verification dates before making catalog changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/renewal-policies/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add renewal policy
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{policies.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allPolicies.length}</span> policies
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_320px_auto]" method="get">
          <div>
            <label htmlFor="renewal-search" className="text-sm font-semibold text-slate-700">
              Search renewal policies
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="renewal-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Certification, provider, validity period, renewal method, or notes"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="renewal-certification" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="renewal-certification"
              name="certification"
              defaultValue={certification}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All certifications</option>
              {certificationOptions.map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="min-h-11 self-end rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Apply filters
          </button>
        </form>
      </Card>

      {policies.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Renewal policy records">
          {policies.map((policy) => (
            <Card key={policy.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    {policy.certifications?.name ?? "Certification unavailable"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {policy.certifications?.providers?.name ?? "Unknown provider"}
                  </p>
                </div>
                {policy.certifications ? <Badge>{policy.certifications.status}</Badge> : null}
              </div>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Validity period</dt>
                  <dd className="mt-1 text-slate-900">
                    {policy.validity_period_text || "Not set"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Last verified</dt>
                  <dd className="mt-1 text-slate-900">{verifiedLabel(policy.last_verified_date)}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-slate-500">Renewal method</dt>
                  <dd className="mt-1 text-slate-900">{policy.renewal_method || "Not set"}</dd>
                </div>
              </dl>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {policy.notes || "No renewal notes have been added."}
              </p>

              {policy.official_renewal_url ? (
                <a
                  href={policy.official_renewal_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600"
                >
                  Open official renewal source
                </a>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/admin/renewal-policies/${policy.id}/edit`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit renewal policy
                </Link>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Delete control is next
                </p>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No renewal policies match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different certification filter.
          </p>
          <Link
            href="/admin/renewal-policies"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
