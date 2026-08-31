import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Career Paths",
  description:
    "Explore structured IT career paths that connect certifications, practical activities, and role-focused progression.",
};

export default async function CareerPathsPage() {
  const supabase = await createClient();
  const { data: careerPaths, error } = await supabase
    .from("career_paths")
    .select(
      "id, name, slug, short_summary, audience_level, target_role, estimated_total_time_text, featured",
    )
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load career paths.");
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-blue-900 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.3),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              <Route className="size-4" aria-hidden="true" />
              Career paths
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn certifications into a career direction
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Explore step-by-step learning paths for common IT roles. Each path combines certification
              guidance with practical activities so you can see what to learn next and why it matters.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="paths-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="paths-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Available paths
            </h2>
            <p className="mt-2 text-slate-600">
              {careerPaths?.length ?? 0} role-focused paths currently available.
            </p>
          </div>
          <Link
            href="/certifications"
            className="text-sm font-semibold text-blue-700 hover:text-blue-600"
          >
            Browse all certifications
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(careerPaths ?? []).map((path) => (
            <Card key={path.id} className="flex h-full flex-col">
              <div className="flex flex-wrap gap-2">
                {path.featured ? <Badge>Featured</Badge> : null}
                {path.audience_level ? <Badge>{path.audience_level}</Badge> : null}
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">{path.name}</h3>

              {path.target_role ? (
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  Target role: {path.target_role}
                </p>
              ) : null}

              <p className="mt-4 flex-1 leading-7 text-slate-600">{path.short_summary}</p>

              {path.estimated_total_time_text ? (
                <p className="mt-4 text-sm text-slate-500">
                  Estimated path time: {path.estimated_total_time_text}
                </p>
              ) : null}

              <Link
                href={`/career-paths/${path.slug}`}
                className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-slate-950 px-4 py-2.5 font-semibold text-white hover:bg-slate-800"
              >
                View career path
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>

        {!careerPaths?.length ? (
          <Card className="mt-6">
            <p className="text-slate-700">No career paths are available yet.</p>
          </Card>
        ) : null}
      </section>
    </main>
  );
}
