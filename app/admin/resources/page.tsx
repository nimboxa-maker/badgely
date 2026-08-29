import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminResourcesPageProps = {
  searchParams: Promise<{
    q?: string;
    certification?: string;
    type?: string;
  }>;
};

type ResourceRow = {
  id: string;
  title: string;
  description: string | null;
  resource_type: string;
  url: string | null;
  provider_name: string | null;
  is_official: boolean;
  cost_type: string | null;
  featured: boolean;
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

export default async function AdminResourcesPage({ searchParams }: AdminResourcesPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const certification = params.certification?.trim() || "all";
  const resourceType = params.type?.trim() || "all";

  const { data, error } = await supabase
    .from("resources")
    .select(
      "id, title, description, resource_type, url, provider_name, is_official, cost_type, featured, last_verified_date, certifications(id, name, slug, status, providers(name))",
    )
    .order("featured", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    throw new Error("Unable to load resources for administration.");
  }

  const allResources = (data ?? []) as unknown as ResourceRow[];

  const certificationOptions = [
    ...new Map(
      allResources
        .filter((resource) => resource.certifications)
        .map((resource) => [
          resource.certifications!.slug,
          `${resource.certifications!.providers?.name ?? "Unknown provider"} · ${resource.certifications!.name}`,
        ]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  const resourceTypes = [...new Set(allResources.map((resource) => resource.resource_type))].sort(
    (a, b) => a.localeCompare(b),
  );

  const resources = allResources.filter((resource) => {
    const searchable = [
      resource.title,
      resource.description ?? "",
      resource.resource_type,
      resource.provider_name ?? "",
      resource.cost_type ?? "",
      resource.certifications?.name ?? "",
      resource.certifications?.providers?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesCertification =
      certification === "all" || resource.certifications?.slug === certification;
    const matchesType = resourceType === "all" || resource.resource_type === resourceType;

    return matchesQuery && matchesCertification && matchesType;
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
          Admin · Resources
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">Learning resources</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search certification learning resources, inspect source details, and review verification dates before making catalog changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/resources/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add resource
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{resources.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allResources.length}</span> resources
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 xl:grid-cols-[1fr_280px_220px_auto]" method="get">
          <div>
            <label htmlFor="resource-search" className="text-sm font-semibold text-slate-700">
              Search resources
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="resource-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Title, provider, certification, type, cost, or description"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="resource-certification" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="resource-certification"
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

          <div>
            <label htmlFor="resource-type" className="text-sm font-semibold text-slate-700">
              Resource type
            </label>
            <select
              id="resource-type"
              name="type"
              defaultValue={resourceType}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All types</option>
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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

      {resources.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Learning resources">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{resource.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {resource.certifications
                      ? `${resource.certifications.providers?.name ?? "Unknown provider"} · ${resource.certifications.name}`
                      : "Certification unavailable"}
                  </p>
                </div>
                <Badge>{resource.resource_type}</Badge>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {resource.description || "No resource description has been added."}
              </p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Source</dt>
                  <dd className="mt-1 text-slate-900">{resource.provider_name || "Not set"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Cost</dt>
                  <dd className="mt-1 text-slate-900">{resource.cost_type || "Not set"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Official</dt>
                  <dd className="mt-1 text-slate-900">{resource.is_official ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Last verified</dt>
                  <dd className="mt-1 text-slate-900">{verifiedLabel(resource.last_verified_date)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {resource.featured ? <Badge>Featured</Badge> : null}
                {resource.certifications ? <Badge>{resource.certifications.status}</Badge> : null}
              </div>

              {resource.url ? (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600"
                >
                  Open resource
                </a>
              ) : null}

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Edit and delete controls are next
              </p>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No resources match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose different certification and resource-type filters.
          </p>
          <Link
            href="/admin/resources"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
