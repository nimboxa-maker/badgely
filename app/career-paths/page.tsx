import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Network,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Career Paths",
  description:
    "Explore structured IT career paths that connect certifications, practical activities, and role-focused progression.",
};

const pathIcons = [Cloud, ShieldCheck, Network];

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

  const featuredPaths = (careerPaths ?? []).slice(0, 3);

  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-300/25">
                <Route className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Choose a path to explore</h2>
                <p className="mt-1 text-sm text-slate-300">Start with a role and see the progression ahead.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {featuredPaths.map((path, index) => {
                const Icon = pathIcons[index] ?? Route;
                return (
                  <Link key={path.id} href={`/career-paths/${path.slug}`} className="block">
                    <HeroOption className="flex items-center gap-4">
                      <span
                        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white ${
                          index === 0
                            ? "bg-blue-600"
                            : index === 1
                              ? "bg-violet-600"
                              : "bg-emerald-600"
                        }`}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white">{path.target_role ?? path.name}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-300">{path.short_summary}</p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-blue-200">
                          <span>Start</span>
                          <span className="h-px w-5 bg-blue-300/40" />
                          <span>Build skills</span>
                          <span className="h-px w-5 bg-blue-300/40" />
                          <span>Role ready</span>
                        </div>
                      </div>

                      <ArrowRight className="size-5 shrink-0 text-blue-200" aria-hidden="true" />
                    </HeroOption>
                  </Link>
                );
              })}
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Career roadmaps · certifications · confidence
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Map the certification
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            path to your next IT role.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Explore role-focused roadmaps, recommended certifications, and practical next steps so you can see what to learn and why it matters.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#paths-heading"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Find your path <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <Link
            href="/certifications"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse certifications
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> Independent guidance</span>
          <span className="inline-flex items-center gap-2"><Route className="size-4 text-blue-300" /> Role-focused progression</span>
          <span className="inline-flex items-center gap-2"><Cloud className="size-4 text-blue-300" /> Practical next steps</span>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="paths-heading">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Browse popular career paths</p>
          <h2 id="paths-heading" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Choose a role and follow the roadmap.
          </h2>
          <p className="mt-3 text-slate-600">
            {careerPaths?.length ?? 0} role-focused paths currently available.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(careerPaths ?? []).map((path) => (
            <Card
              key={path.id}
              className="group flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                <Route className="size-5" aria-hidden="true" />
              </span>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {path.featured ? <Badge>Featured</Badge> : null}
                {path.audience_level ? <Badge className="bg-slate-100 text-slate-700">{path.audience_level}</Badge> : null}
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">{path.name}</h3>

              {path.target_role ? (
                <p className="mt-2 text-sm font-semibold text-blue-700">Target role: {path.target_role}</p>
              ) : null}

              <p className="mt-4 flex-1 leading-7 text-slate-600">{path.short_summary}</p>

              {path.estimated_total_time_text ? (
                <p className="mt-4 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
                  Estimated path time: {path.estimated_total_time_text}
                </p>
              ) : null}

              <Link
                href={`/career-paths/${path.slug}`}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-2.5 font-semibold text-blue-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                View career path <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>

        {!careerPaths?.length ? (
          <Card className="mt-6 text-center">
            <p className="text-slate-700">No career paths are available yet.</p>
          </Card>
        ) : null}
      </section>
    </main>
  );
}
