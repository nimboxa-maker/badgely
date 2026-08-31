import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

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
  target_job_roles: string[];
  estimated_study_hours_min: number | null;
  estimated_study_hours_max: number | null;
  last_verified_date: string | null;
  providers: {
    name: string;
    slug: string;
  } | null;
};

type SearchParams = Record<string, string | string[] | undefined>;

interface CertificationsPageProps {
  searchParams: Promise<SearchParams>;
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function studyHours(certification: CertificationRow) {
  const { estimated_study_hours_min: min, estimated_study_hours_max: max } = certification;

  if (min !== null && max !== null) {
    return `${min}–${max} hours`;
  }

  if (min !== null) {
    return `${min}+ hours`;
  }

  return "Verify with official provider.";
}

function verifiedDate(value: string | null) {
  if (!value) {
    return "Verify with official provider.";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

const levelRank: Record<string, number> = {
  Foundational: 0,
  Associate: 1,
  Intermediate: 2,
  Advanced: 3,
};

export default async function CertificationsPage({ searchParams }: CertificationsPageProps) {
  const params = await searchParams;
  const query = firstParam(params.q).trim();
  const category = firstParam(params.category);
  const provider = firstParam(params.provider);
  const level = firstParam(params.level);
  const vendorType = firstParam(params.vendorType);
  const status = firstParam(params.status);
  const targetRole = firstParam(params.targetRole);
  const sort = firstParam(params.sort) || "featured";

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, category, level, vendor_type, short_summary, status, featured, target_job_roles, estimated_study_hours_min, estimated_study_hours_max, last_verified_date, providers(name, slug)",
    )
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certifications.");
  }

  const allCertifications = (data ?? []) as CertificationRow[];

  const categories = [...new Set(allCertifications.map((item) => item.category))].sort();
  const providers = [
    ...new Map(
      allCertifications
        .filter((item) => item.providers)
        .map((item) => [item.providers!.slug, item.providers!.name]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));
  const levels = [...new Set(allCertifications.map((item) => item.level))].sort(
    (a, b) => (levelRank[a] ?? 99) - (levelRank[b] ?? 99) || a.localeCompare(b),
  );
  const vendorTypes = [...new Set(allCertifications.map((item) => item.vendor_type))].sort();
  const statuses = [...new Set(allCertifications.map((item) => item.status))].sort();
  const targetRoles = [
    ...new Set(allCertifications.flatMap((item) => item.target_job_roles)),
  ].sort();

  const normalizedQuery = query.toLowerCase();

  const certifications = allCertifications
    .filter((item) => {
      const matchesSearch =
        !normalizedQuery ||
        [
          item.name,
          item.providers?.name ?? "",
          item.category,
          item.short_summary,
          ...item.target_job_roles,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesSearch &&
        (!category || item.category === category) &&
        (!provider || item.providers?.slug === provider) &&
        (!level || item.level === level) &&
        (!vendorType || item.vendor_type === vendorType) &&
        (!status || item.status === status) &&
        (!targetRole || item.target_job_roles.includes(targetRole))
      );
    })
    .sort((a, b) => {
      if (sort === "beginner") {
        return (
          (levelRank[a.level] ?? 99) - (levelRank[b.level] ?? 99) || a.name.localeCompare(b.name)
        );
      }

      if (sort === "verified") {
        return (
          (b.last_verified_date ? Date.parse(b.last_verified_date) : 0) -
            (a.last_verified_date ? Date.parse(a.last_verified_date) : 0) ||
          a.name.localeCompare(b.name)
        );
      }

      if (sort === "study") {
        return (
          (a.estimated_study_hours_min ?? Number.MAX_SAFE_INTEGER) -
            (b.estimated_study_hours_min ?? Number.MAX_SAFE_INTEGER) || a.name.localeCompare(b.name)
        );
      }

      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });

  const hasFilters = Boolean(
    query ||
    category ||
    provider ||
    level ||
    vendorType ||
    status ||
    targetRole ||
    sort !== "featured",
  );

  return (
    <main>
      <section className="relative overflow-hidden border-b border-blue-900 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.3),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              Certification directory
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore IT certifications
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Search and filter certifications across cloud, cybersecurity, networking, Linux, data,
              and other IT career areas.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <form
          method="get"
          action="/certifications"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
        >
          <div>
            <label htmlFor="q" className="text-sm font-semibold text-slate-900">
              Search certifications
            </label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search Security+, CCNA, AWS, cloud, SOC analyst…"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-semibold text-slate-900">
              Category
              <select
                name="category"
                defaultValue={category}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="">All categories</option>
                {categories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-900">
              Provider
              <select
                name="provider"
                defaultValue={provider}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="">All providers</option>
                {providers.map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-900">
              Level
              <select
                name="level"
                defaultValue={level}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="">All levels</option>
                {levels.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-900">
              Vendor type
              <select
                name="vendorType"
                defaultValue={vendorType}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="">All vendor types</option>
                {vendorTypes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-900">
              Active status
              <select
                name="status"
                defaultValue={status}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="">All statuses</option>
                {statuses.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-900">
              Target job role
              <select
                name="targetRole"
                defaultValue={targetRole}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="">All job roles</option>
                {targetRoles.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-900 sm:col-span-2">
              Sort
              <select
                name="sort"
                defaultValue={sort}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"
              >
                <option value="featured">Featured / Popular</option>
                <option value="beginner">Beginner friendly</option>
                <option value="verified">Recently verified</option>
                <option value="study">Shortest estimated study time</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
            >
              Apply search and filters
            </button>
            {hasFilters ? (
              <Link
                href="/certifications"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Clear filters
              </Link>
            ) : null}
          </div>
        </form>

        <div className="mt-8 flex items-center justify-between gap-4 border-y border-slate-200 py-4">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-950">{certifications.length}</span>{" "}
            {certifications.length === 1 ? "certification" : "certifications"}
          </p>
          <p className="text-sm text-slate-500">
            Search and filter state is preserved in the page URL.
          </p>
        </div>

        {certifications.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certification) => (
              <Card key={certification.id} className="flex h-full flex-col">
                <div className="flex flex-wrap gap-2">
                  {certification.providers ? <Badge>{certification.providers.name}</Badge> : null}
                  <Badge className="bg-slate-100 text-slate-700">{certification.category}</Badge>
                  <Badge className="bg-slate-100 text-slate-700">{certification.level}</Badge>
                  {certification.status !== "Active" ? (
                    <Badge className="bg-amber-50 text-amber-800">{certification.status}</Badge>
                  ) : null}
                </div>

                <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
                  {certification.name}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">{certification.short_summary}</p>

                <dl className="mt-5 grid gap-3 text-sm">
                  <div>
                    <dt className="font-semibold text-slate-500">Target job roles</dt>
                    <dd className="mt-1 text-slate-800">
                      {certification.target_job_roles.length
                        ? certification.target_job_roles.join(", ")
                        : "Verify with official provider."}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <dt className="font-semibold text-slate-500">Study time</dt>
                      <dd className="mt-1 text-slate-800">{studyHours(certification)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">Last verified</dt>
                      <dd className="mt-1 text-slate-800">
                        {verifiedDate(certification.last_verified_date)}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-auto pt-5">
                  <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    <span>{certification.vendor_type}</span>
                    <span>{certification.status}</span>
                  </div>
                  <Link
                    href={`/certifications/${certification.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    View certification
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-slate-950">
              No certifications match those filters.
            </h2>
            <p className="mt-2 text-slate-600">Try a broader search or clear one or more filters.</p>
            <Link
              href="/certifications"
              className="mt-5 inline-flex font-semibold text-blue-700 hover:text-blue-600"
            >
              Clear all filters
            </Link>
          </Card>
        )}
      </section>
    </main>
  );
}
