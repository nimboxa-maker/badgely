import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  removeSavedCertification,
  updateSavedCertificationStatus,
} from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase/server";

const certificationStatuses = [
  "Interested",
  "Studying",
  "Completed",
  "Paused",
] as const;

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+view+your+dashboard.");
  }

  const [profileResult, savedCertificationsResult, savedCareerPathsResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("display_name, role")
        .eq("id", user.id)
        .single(),
      supabase
        .from("user_saved_certifications")
        .select(
          "id, status, target_exam_date, saved_at, certifications(id, name, slug, category, level)",
        )
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false }),
      supabase
        .from("user_saved_career_paths")
        .select(
          "id, saved_at, career_paths(id, name, slug, target_role, audience_level)",
        )
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false }),
    ]);

  if (savedCertificationsResult.error) {
    throw new Error("Unable to load your saved certifications.");
  }

  if (savedCareerPathsResult.error) {
    throw new Error("Unable to load your saved career paths.");
  }

  const profile = profileResult.data;
  const savedCertifications = savedCertificationsResult.data ?? [];
  const savedCareerPaths = savedCareerPathsResult.data ?? [];
  const hasSavedItems = savedCertifications.length > 0 || savedCareerPaths.length > 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Track the certifications and career paths you have saved. Study-plan progress arrives in the next milestone.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Dashboard summary">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Saved certifications</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {savedCertifications.length}
          </p>
          <Link
            href="/certifications"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-600"
          >
            Explore certifications
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slate-500">Saved career paths</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {savedCareerPaths.length}
          </p>
          <Link
            href="/career-paths"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-600"
          >
            Explore career paths
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slate-500">Study plans</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">—</p>
          <p className="mt-3 text-sm text-slate-600">
            Study-plan creation and progress tracking are part of Milestone 6.
          </p>
        </Card>
      </section>

      {!hasSavedItems ? (
        <Card className="mt-8 border-dashed">
          <h2 className="text-xl font-bold text-slate-950">Start building your Badgely dashboard</h2>
          <p className="mt-2 max-w-2xl leading-7 text-slate-600">
            Save a certification or career path and it will appear here. You can then organize saved certifications by learning status.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/certifications"
              className="inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-4 py-2.5 font-semibold text-white hover:bg-slate-800"
            >
              Explore certifications
            </Link>
            <Link
              href="/career-paths"
              className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Explore career paths
            </Link>
          </div>
        </Card>
      ) : null}

      <section className="mt-10" aria-labelledby="saved-certifications-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              <BookOpen className="size-4" aria-hidden="true" />
              Learning status
            </div>
            <h2
              id="saved-certifications-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
            >
              Saved certifications
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-8">
          {certificationStatuses.map((status) => {
            const items = savedCertifications.filter((item) => item.status === status);

            return (
              <section key={status} aria-labelledby={`status-${status.toLowerCase()}`}>
                <div className="flex items-center gap-2">
                  <h3
                    id={`status-${status.toLowerCase()}`}
                    className="text-lg font-bold text-slate-950"
                  >
                    {status}
                  </h3>
                  <Badge>{items.length}</Badge>
                </div>

                {items.length ? (
                  <div className="mt-3 grid gap-4 lg:grid-cols-2">
                    {items.map((item) => (
                      <Card key={item.id}>
                        <div className="flex flex-wrap gap-2">
                          {item.certifications?.category ? (
                            <Badge>{item.certifications.category}</Badge>
                          ) : null}
                          {item.certifications?.level ? (
                            <Badge>{item.certifications.level}</Badge>
                          ) : null}
                        </div>

                        <Link
                          href={`/certifications/${item.certifications?.slug ?? ""}`}
                          className="mt-4 block text-lg font-bold text-slate-950 hover:text-blue-700"
                        >
                          {item.certifications?.name ?? "Saved certification"}
                        </Link>

                        {item.target_exam_date ? (
                          <p className="mt-2 text-sm text-slate-600">
                            Target exam date: {item.target_exam_date}
                          </p>
                        ) : null}

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                          <form action={updateSavedCertificationStatus} className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-end">
                            <input
                              type="hidden"
                              name="savedCertificationId"
                              value={item.id}
                            />
                            <label className="flex-1 text-sm font-semibold text-slate-700">
                              Status
                              <select
                                name="status"
                                defaultValue={item.status}
                                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900"
                              >
                                {certificationStatuses.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <button
                              type="submit"
                              className="min-h-11 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
                            >
                              Update status
                            </button>
                          </form>

                          <form action={removeSavedCertification}>
                            <input
                              type="hidden"
                              name="savedCertificationId"
                              value={item.id}
                            />
                            <button
                              type="submit"
                              className="min-h-11 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
                            >
                              Remove
                            </button>
                          </form>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="mt-3 border-dashed py-5">
                    <p className="text-sm text-slate-500">
                      No saved certifications in {status.toLowerCase()}.
                    </p>
                  </Card>
                )}
              </section>
            );
          })}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="saved-paths-heading">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          <Route className="size-4" aria-hidden="true" />
          Career direction
        </div>
        <h2
          id="saved-paths-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
        >
          Saved career paths
        </h2>

        {savedCareerPaths.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedCareerPaths.map((item) => (
              <Card key={item.id}>
                {item.career_paths?.audience_level ? (
                  <Badge>{item.career_paths.audience_level}</Badge>
                ) : null}
                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  {item.career_paths?.name ?? "Saved career path"}
                </h3>
                {item.career_paths?.target_role ? (
                  <p className="mt-2 text-sm text-slate-600">
                    Target role: {item.career_paths.target_role}
                  </p>
                ) : null}
                {item.career_paths?.slug ? (
                  <Link
                    href={`/career-paths/${item.career_paths.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    View path
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-5 border-dashed">
            <p className="text-slate-600">You have not saved a career path yet.</p>
          </Card>
        )}
      </section>
    </main>
  );
}
