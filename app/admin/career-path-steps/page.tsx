import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminCareerPathStepsPageProps = {
  searchParams: Promise<{
    q?: string;
    path?: string;
  }>;
};

type CareerPathStepRow = {
  id: string;
  step_number: number;
  title: string;
  explanation: string | null;
  is_optional: boolean;
  practical_activity: string | null;
  display_order: number;
  career_paths: {
    id: string;
    name: string;
    slug: string;
  } | null;
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

export default async function AdminCareerPathStepsPage({
  searchParams,
}: AdminCareerPathStepsPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const pathFilter = params.path?.trim() || "all";

  const { data, error } = await supabase
    .from("career_path_steps")
    .select(
      "id, step_number, title, explanation, is_optional, practical_activity, display_order, career_paths(id, name, slug), certifications(id, name, slug, status, providers(name))",
    )
    .order("display_order", { ascending: true })
    .order("step_number", { ascending: true });

  if (error) {
    throw new Error("Unable to load career path steps for administration.");
  }

  const allSteps = (data ?? []) as unknown as CareerPathStepRow[];

  const pathOptions = [
    ...new Map(
      allSteps
        .filter((step) => step.career_paths)
        .map((step) => [step.career_paths!.slug, step.career_paths!.name]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  const steps = allSteps.filter((step) => {
    const searchable = [
      step.title,
      step.explanation ?? "",
      step.practical_activity ?? "",
      step.career_paths?.name ?? "",
      step.certifications?.name ?? "",
      step.certifications?.providers?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesPath = pathFilter === "all" || step.career_paths?.slug === pathFilter;

    return matchesQuery && matchesPath;
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
          Admin · Career path steps
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Career path steps
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search roadmap steps, review linked certifications and practical activities, and manage their order.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/career-path-steps/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add career path step
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{steps.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allSteps.length}</span> steps
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_300px_auto]" method="get">
          <div>
            <label htmlFor="career-path-step-search" className="text-sm font-semibold text-slate-700">
              Search steps
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="career-path-step-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Title, certification, path, explanation, or activity"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="career-path-step-path" className="text-sm font-semibold text-slate-700">
              Career path
            </label>
            <select
              id="career-path-step-path"
              name="path"
              defaultValue={pathFilter}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All career paths</option>
              {pathOptions.map(([slug, name]) => (
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

      {steps.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Career path step records">
          {steps.map((step) => (
            <Card key={step.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                    {step.career_paths?.name ?? "Career path unavailable"}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-950">
                    Step {step.step_number}: {step.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.is_optional ? <Badge>Optional</Badge> : null}
                  <Badge>Order {step.display_order}</Badge>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {step.explanation || "No explanation has been added."}
              </p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-slate-500">Linked certification</dt>
                  <dd className="mt-1 text-slate-900">
                    {step.certifications
                      ? `${step.certifications.providers?.name ?? "Unknown provider"} · ${step.certifications.name}`
                      : "No linked certification"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-slate-500">Practical activity</dt>
                  <dd className="mt-1 text-slate-900">
                    {step.practical_activity || "Not set"}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Create and edit controls are next
              </p>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No career path steps match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different career path filter.
          </p>
          <Link
            href="/admin/career-path-steps"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
