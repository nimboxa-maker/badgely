import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

interface CareerPathDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getCareerPath(slug: string) {
  const supabase = await createClient();

  const { data: careerPath } = await supabase
    .from("career_paths")
    .select(
      "id, name, slug, short_summary, full_summary, audience_level, target_role, estimated_total_time_text, featured, seo_title, seo_description",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!careerPath) {
    return null;
  }

  const { data: steps, error } = await supabase
    .from("career_path_steps")
    .select(
      "id, step_number, title, explanation, is_optional, practical_activity, display_order, certification_id, certifications(name, slug, category, level)",
    )
    .eq("career_path_id", careerPath.id)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error("Unable to load this career path.");
  }

  return {
    careerPath,
    steps: steps ?? [],
  };
}

export async function generateMetadata({
  params,
}: CareerPathDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = await getCareerPath(slug);

  if (!record) {
    return {
      title: "Career path not found | Badgely",
      description: "The requested Badgely career path could not be found.",
    };
  }

  return {
    title: record.careerPath.seo_title ?? `${record.careerPath.name} | Badgely`,
    description:
      record.careerPath.seo_description ?? record.careerPath.short_summary,
  };
}

export default async function CareerPathDetailPage({
  params,
}: CareerPathDetailPageProps) {
  const { slug } = await params;
  const record = await getCareerPath(slug);

  if (!record) {
    notFound();
  }

  const { careerPath, steps } = record;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/career-paths"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to career paths
      </Link>

      <header className="mt-6 rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10">
        <div className="flex flex-wrap gap-2">
          {careerPath.featured ? (
            <Badge className="bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30">
              Featured path
            </Badge>
          ) : null}
          {careerPath.audience_level ? (
            <Badge className="bg-white/10 text-slate-100">
              {careerPath.audience_level}
            </Badge>
          ) : null}
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">
          <Route className="size-4" aria-hidden="true" />
          Career path
        </div>

        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
          {careerPath.name}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          {careerPath.short_summary}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-slate-400">Target role</p>
            <p className="mt-1 font-semibold text-white">
              {careerPath.target_role ?? "Role-focused progression"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-slate-400">Estimated path time</p>
            <p className="mt-1 font-semibold text-white">
              {careerPath.estimated_total_time_text ?? "Varies by experience and study pace"}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section aria-labelledby="overview-heading">
            <h2
              id="overview-heading"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              Path overview
            </h2>
            <Card className="mt-4">
              <p className="leading-7 text-slate-700">
                {careerPath.full_summary ?? careerPath.short_summary}
              </p>
            </Card>
          </section>

          <section aria-labelledby="steps-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="steps-heading"
                  className="text-2xl font-bold tracking-tight text-slate-950"
                >
                  Step-by-step path
                </h2>
                <p className="mt-2 text-slate-600">
                  Follow the sequence in order unless a step is marked optional.
                </p>
              </div>
              <Badge>{steps.length} steps</Badge>
            </div>

            <div className="mt-5 space-y-5">
              {steps.map((step) => (
                <Card key={step.id} className="relative overflow-hidden">
                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                      {step.step_number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-950">
                          {step.title}
                        </h3>
                        {step.is_optional ? <Badge>Optional</Badge> : null}
                        {step.practical_activity ? (
                          <Badge>Practical activity</Badge>
                        ) : null}
                      </div>

                      {step.explanation ? (
                        <p className="mt-3 leading-7 text-slate-600">
                          {step.explanation}
                        </p>
                      ) : null}

                      {step.certifications ? (
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex flex-wrap gap-2">
                            <Badge>{step.certifications.category}</Badge>
                            <Badge>{step.certifications.level}</Badge>
                          </div>
                          <Link
                            href={`/certifications/${step.certifications.slug}`}
                            className="mt-3 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
                          >
                            <BookOpen className="size-4" aria-hidden="true" />
                            View {step.certifications.name}
                          </Link>
                        </div>
                      ) : null}

                      {step.practical_activity ? (
                        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-0.5 size-5 shrink-0 text-emerald-700"
                              aria-hidden="true"
                            />
                            <div>
                              <p className="font-semibold text-emerald-950">
                                Practical activity
                              </p>
                              <p className="mt-1 leading-6 text-emerald-900">
                                {step.practical_activity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              ))}

              {!steps.length ? (
                <Card>
                  <p className="text-slate-700">
                    This career path does not have any steps yet.
                  </p>
                </Card>
              ) : null}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="font-semibold text-slate-950">How to use this path</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the certifications as learning checkpoints and complete the practical activities to reinforce the knowledge with hands-on work.
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold text-slate-950">Certification details can change</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Always verify current exam requirements, pricing, prerequisites, and availability with the official certification provider before making scheduling or purchasing decisions.
            </p>
          </Card>
        </aside>
      </div>
    </main>
  );
}
