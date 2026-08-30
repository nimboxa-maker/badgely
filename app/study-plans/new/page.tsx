import { redirect } from "next/navigation";
import { BookOpenCheck, CalendarDays, Clock3, FlaskConical } from "lucide-react";
import { createStudyPlan } from "@/app/study-plans/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Create Study Plan",
  description:
    "Create a personalized certification study plan based on your experience, target date, available weekly hours, and lab preference.",
};

type StudyPlanCreatorPageProps = {
  searchParams: Promise<{ certification?: string }>;
};

export default async function StudyPlanCreatorPage({ searchParams }: StudyPlanCreatorPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+create+a+study+plan.");
  }

  const { data: certifications, error } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, category, level, estimated_study_hours_min, estimated_study_hours_max, providers(name)",
    )
    .eq("status", "Active")
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certifications for study planning.");
  }

  const selectedCertification =
    certifications?.find((certification) => certification.slug === params.certification) ?? null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minimumTargetDate = tomorrow.toISOString().slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          <BookOpenCheck className="size-4" aria-hidden="true" />
          Study plan
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Build a realistic study plan
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Choose a certification, tell Badgely how much time you have each week, and set a target
          exam date. Badgely will turn these settings into editable weekly tasks using the
          certification&apos;s stored domains and resources.
        </p>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card>
          <form action={createStudyPlan} className="space-y-6">
            <div>
              <label htmlFor="certificationId" className="text-sm font-semibold text-slate-800">
                Certification
              </label>
              <select
                id="certificationId"
                name="certificationId"
                required
                defaultValue={selectedCertification?.id ?? ""}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a certification
                </option>
                {(certifications ?? []).map((certification) => (
                  <option key={certification.id} value={certification.id}>
                    {certification.name}
                    {certification.providers?.name ? ` — ${certification.providers.name}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="currentExperienceLevel"
                className="text-sm font-semibold text-slate-800"
              >
                Current experience level
              </label>
              <select
                id="currentExperienceLevel"
                name="currentExperienceLevel"
                required
                defaultValue="Beginner"
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Beginner">Beginner</option>
                <option value="Some experience">Some experience</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="targetExamDate" className="text-sm font-semibold text-slate-800">
                  Target exam date
                </label>
                <input
                  id="targetExamDate"
                  name="targetExamDate"
                  type="date"
                  min={minimumTargetDate}
                  required
                  className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="weeklyStudyHours" className="text-sm font-semibold text-slate-800">
                  Weekly study hours
                </label>
                <input
                  id="weeklyStudyHours"
                  name="weeklyStudyHours"
                  type="number"
                  min="1"
                  max="40"
                  defaultValue="5"
                  required
                  className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="checkbox"
                name="includeLabs"
                value="true"
                className="mt-1 size-4 rounded border-slate-300"
              />
              <span>
                <span className="block font-semibold text-slate-900">Include hands-on labs</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  Add practical lab tasks where they fit the selected certification.
                </span>
              </span>
            </label>

            <Button type="submit">Generate study plan</Button>
            <p className="text-sm leading-6 text-slate-500">
              Your plan will be saved to your account and organized into weekly study tasks based on
              the time available before your target exam date.
            </p>
          </form>
        </Card>

        <aside className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 font-semibold text-slate-950">
              <CalendarDays className="size-5 text-blue-700" aria-hidden="true" />
              Time available
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Badgely will calculate the weeks between today and your target date.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-2 font-semibold text-slate-950">
              <Clock3 className="size-5 text-blue-700" aria-hidden="true" />
              Weekly limit
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Generated tasks will not exceed the weekly study hours you choose.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-2 font-semibold text-slate-950">
              <FlaskConical className="size-5 text-blue-700" aria-hidden="true" />
              Practical learning
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Labs are optional and supplement reading, review, and practice work.
            </p>
          </Card>
        </aside>
      </div>
    </main>
  );
}
