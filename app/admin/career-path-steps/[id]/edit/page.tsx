import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateCareerPathStep } from "@/app/admin/career-path-steps/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type EditCareerPathStepPageProps = {
  params: Promise<{ id: string }>;
};

type CareerPathOption = {
  id: string;
  name: string;
};

type CertificationOption = {
  id: string;
  name: string;
  status: string;
  providers: { name: string } | { name: string }[] | null;
};

export default async function EditCareerPathStepPage({ params }: EditCareerPathStepPageProps) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const [
    { data: step, error: stepError },
    { data: careerPaths, error: careerPathsError },
    { data: certifications, error: certificationsError },
  ] = await Promise.all([
    supabase
      .from("career_path_steps")
      .select(
        "id, career_path_id, certification_id, step_number, title, explanation, is_optional, practical_activity, display_order",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("career_paths").select("id, name").order("name", { ascending: true }),
    supabase
      .from("certifications")
      .select("id, name, status, providers(name)")
      .order("name", { ascending: true }),
  ]);

  if (stepError || careerPathsError || certificationsError) {
    throw new Error("Unable to load the career path step for editing.");
  }

  if (!step) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/career-path-steps"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to career path steps
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Career path steps
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit career path step
        </h1>
        <p className="mt-2 text-slate-600">
          Update the roadmap step, linked certification, optional status, and display order.
        </p>
      </div>

      <Card className="mt-8">
        <form action={updateCareerPathStep} className="space-y-6">
          <input type="hidden" name="id" value={step.id} />

          <div>
            <label htmlFor="careerPathId" className="text-sm font-semibold text-slate-700">
              Career path
            </label>
            <select
              id="careerPathId"
              name="careerPathId"
              required
              defaultValue={step.career_path_id}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {((careerPaths ?? []) as CareerPathOption[]).map((path) => (
                <option key={path.id} value={path.id}>
                  {path.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="certificationId" className="text-sm font-semibold text-slate-700">
              Linked certification
            </label>
            <select
              id="certificationId"
              name="certificationId"
              defaultValue={step.certification_id ?? ""}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">No linked certification</option>
              {((certifications ?? []) as unknown as CertificationOption[]).map((certification) => {
                const provider = Array.isArray(certification.providers)
                  ? certification.providers[0]?.name
                  : certification.providers?.name;

                return (
                  <option key={certification.id} value={certification.id}>
                    {provider ? `${provider} · ` : ""}
                    {certification.name}
                    {certification.status === "Active" ? "" : ` (${certification.status})`}
                  </option>
                );
              })}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Leave this blank for a conceptual or practical-activity step.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="stepNumber" className="text-sm font-semibold text-slate-700">
                Step number
              </label>
              <input
                id="stepNumber"
                name="stepNumber"
                type="number"
                min={1}
                max={1000}
                required
                defaultValue={step.step_number}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="displayOrder" className="text-sm font-semibold text-slate-700">
                Display order
              </label>
              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                min={0}
                max={10000}
                required
                defaultValue={step.display_order}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">
              Step title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              minLength={2}
              maxLength={300}
              defaultValue={step.title}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="explanation" className="text-sm font-semibold text-slate-700">
              Explanation
            </label>
            <textarea
              id="explanation"
              name="explanation"
              rows={5}
              maxLength={5000}
              defaultValue={step.explanation ?? ""}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="practicalActivity" className="text-sm font-semibold text-slate-700">
              Practical activity
            </label>
            <textarea
              id="practicalActivity"
              name="practicalActivity"
              rows={4}
              maxLength={3000}
              defaultValue={step.practical_activity ?? ""}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <input
              name="isOptional"
              type="checkbox"
              defaultChecked={step.is_optional}
              className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Optional step
          </label>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/career-path-steps"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save career path step changes
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
