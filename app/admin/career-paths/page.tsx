import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Search } from "lucide-react";
import { DeleteCareerPathButton } from "@/app/admin/career-paths/delete-career-path-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminCareerPathsPageProps = {
  searchParams: Promise<{
    q?: string;
    audience?: string;
  }>;
};

type CareerPathRow = {
  id: string;
  name: string;
  slug: string;
  short_summary: string;
  full_summary: string | null;
  audience_level: string | null;
  target_role: string | null;
  estimated_total_time_text: string | null;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
};

export default async function AdminCareerPathsPage({ searchParams }: AdminCareerPathsPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const audience = params.audience?.trim() || "all";

  const { data, error } = await supabase
    .from("career_paths")
    .select(
      "id, name, slug, short_summary, full_summary, audience_level, target_role, estimated_total_time_text, featured, seo_title, seo_description",
    )
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load career paths for administration.");
  }

  const allPaths = (data ?? []) as CareerPathRow[];
  const audienceOptions = [
    ...new Set(
      allPaths
        .map((path) => path.audience_level)
        .filter((value): value is string => Boolean(value)),
    ),
  ].sort((a, b) => a.localeCompare(b));

  const paths = allPaths.filter((path) => {
    const searchable = [
      path.name,
      path.slug,
      path.short_summary,
      path.full_summary ?? "",
      path.audience_level ?? "",
      path.target_role ?? "",
      path.estimated_total_time_text ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesAudience = audience === "all" || path.audience_level === audience;

    return matchesQuery && matchesAudience;
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
          Admin · Career paths
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Career roadmap pages
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search career paths, review audience and target-role details, and manage roadmap
              metadata.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/career-paths/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add career path
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{paths.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allPaths.length}</span> career paths
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_260px_auto]" method="get">
          <div>
            <label htmlFor="career-path-search" className="text-sm font-semibold text-slate-700">
              Search career paths
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="career-path-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Name, role, audience, duration, or summary"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="career-path-audience" className="text-sm font-semibold text-slate-700">
              Audience level
            </label>
            <select
              id="career-path-audience"
              name="audience"
              defaultValue={audience}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All audiences</option>
              {audienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
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

      {paths.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Career path records">
          {paths.map((path) => (
            <Card key={path.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{path.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">/{path.slug}</p>
                </div>
                {path.featured ? <Badge>Featured</Badge> : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{path.short_summary}</p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Audience</dt>
                  <dd className="mt-1 text-slate-900">{path.audience_level || "Not set"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Target role</dt>
                  <dd className="mt-1 text-slate-900">{path.target_role || "Not set"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-slate-500">Estimated total time</dt>
                  <dd className="mt-1 text-slate-900">
                    {path.estimated_total_time_text || "Not set"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/admin/career-paths/${path.id}/edit`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit career path
                </Link>
                <DeleteCareerPathButton careerPathId={path.id} careerPathName={path.name} />
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No career paths match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different audience filter.
          </p>
          <Link
            href="/admin/career-paths"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
