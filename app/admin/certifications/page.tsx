import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminCertificationsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    provider?: string;
  }>;
};

type CertificationRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  level: string;
  vendor_type: string;
  short_summary: string;
  status: string;
  featured: boolean;
  last_verified_date: string | null;
  providers: {
    id: string;
    name: string;
    slug: string;
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

export default async function AdminCertificationsPage({
  searchParams,
}: AdminCertificationsPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const status = ["Active", "Retiring Soon", "Retired"].includes(params.status ?? "")
    ? params.status!
    : "all";
  const provider = params.provider?.trim() || "all";

  const { data, error } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, category, level, vendor_type, short_summary, status, featured, last_verified_date, providers(id, name, slug)",
    )
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certifications for administration.");
  }

  const allCertifications = (data ?? []) as unknown as CertificationRow[];
  const providerOptions = [
    ...new Map(
      allCertifications
        .filter((certification) => certification.providers)
        .map((certification) => [
          certification.providers!.slug,
          certification.providers!.name,
        ]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  const certifications = allCertifications.filter((certification) => {
    const matchesQuery =
      !query ||
      certification.name.toLowerCase().includes(query) ||
      certification.slug.toLowerCase().includes(query) ||
      certification.category.toLowerCase().includes(query) ||
      certification.level.toLowerCase().includes(query) ||
      certification.short_summary.toLowerCase().includes(query) ||
      certification.providers?.name.toLowerCase().includes(query);

    const matchesStatus = status === "all" || certification.status === status;
    const matchesProvider =
      provider === "all" || certification.providers?.slug === provider;

    return matchesQuery && matchesStatus && matchesProvider;
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
          Admin · Certifications
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Certification records
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search certification records, review lifecycle status, and inspect verification dates before making catalog changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/certifications/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add certification
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{certifications.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allCertifications.length}</span> certifications
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_220px_240px_auto]" method="get">
          <div>
            <label htmlFor="certification-search" className="text-sm font-semibold text-slate-700">
              Search certifications
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="certification-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Name, provider, category, level, or summary"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="certification-status" className="text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              id="certification-status"
              name="status"
              defaultValue={status}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Retiring Soon">Retiring Soon</option>
              <option value="Retired">Retired</option>
            </select>
          </div>

          <div>
            <label htmlFor="certification-provider" className="text-sm font-semibold text-slate-700">
              Provider
            </label>
            <select
              id="certification-provider"
              name="provider"
              defaultValue={provider}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All providers</option>
              {providerOptions.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}
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

      {certifications.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Certification records">
          {certifications.map((certification) => (
            <Card key={certification.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{certification.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">/{certification.slug}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{certification.status}</Badge>
                  {certification.featured ? <Badge>Featured</Badge> : null}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {certification.short_summary}
              </p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Provider</dt>
                  <dd className="mt-1 text-slate-900">
                    {certification.providers?.name || "Provider unavailable"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Category / level</dt>
                  <dd className="mt-1 text-slate-900">
                    {certification.category} · {certification.level}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Vendor type</dt>
                  <dd className="mt-1 text-slate-900">{certification.vendor_type}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Last verified</dt>
                  <dd className="mt-1 text-slate-900">
                    {verifiedLabel(certification.last_verified_date)}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Edit, lifecycle, and delete controls are next
              </p>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">
            No certifications match these filters
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose different provider and status filters.
          </p>
          <Link
            href="/admin/certifications"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
