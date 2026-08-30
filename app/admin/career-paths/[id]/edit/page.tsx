import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateCareerPath } from "@/app/admin/career-paths/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type EditCareerPathPageProps = {
  params: Promise<{ id: string }>;
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

export default async function EditCareerPathPage({ params }: EditCareerPathPageProps) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const { data, error } = await supabase
    .from("career_paths")
    .select(
      "id, name, slug, short_summary, full_summary, audience_level, target_role, estimated_total_time_text, featured, seo_title, seo_description",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load the career path for editing.");
  }

  if (!data) {
    notFound();
  }

  const path = data as CareerPathRow;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/career-paths"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to career paths
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Career paths
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Edit career path</h1>
        <p className="mt-2 text-slate-600">
          Update roadmap details, audience information, and SEO metadata.
        </p>
      </div>

      <Card className="mt-8">
        <form action={updateCareerPath} className="space-y-6">
          <input type="hidden" name="id" value={path.id} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Career path name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={200}
                defaultValue={path.name}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="slug" className="text-sm font-semibold text-slate-700">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                minLength={2}
                maxLength={200}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                defaultValue={path.slug}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-1 text-xs text-slate-500">
                Lowercase letters, numbers, and single hyphens only.
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="shortSummary" className="text-sm font-semibold text-slate-700">
              Short summary
            </label>
            <textarea
              id="shortSummary"
              name="shortSummary"
              rows={3}
              required
              minLength={10}
              maxLength={500}
              defaultValue={path.short_summary}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="fullSummary" className="text-sm font-semibold text-slate-700">
              Full summary
            </label>
            <textarea
              id="fullSummary"
              name="fullSummary"
              rows={6}
              maxLength={5000}
              defaultValue={path.full_summary ?? ""}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="audienceLevel" className="text-sm font-semibold text-slate-700">
                Audience level
              </label>
              <input
                id="audienceLevel"
                name="audienceLevel"
                type="text"
                maxLength={100}
                defaultValue={path.audience_level ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="targetRole" className="text-sm font-semibold text-slate-700">
                Target role
              </label>
              <input
                id="targetRole"
                name="targetRole"
                type="text"
                maxLength={200}
                defaultValue={path.target_role ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="estimatedTotalTimeText"
                className="text-sm font-semibold text-slate-700"
              >
                Estimated total time
              </label>
              <input
                id="estimatedTotalTimeText"
                name="estimatedTotalTimeText"
                type="text"
                maxLength={200}
                defaultValue={path.estimated_total_time_text ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="seoTitle" className="text-sm font-semibold text-slate-700">
                SEO title
              </label>
              <input
                id="seoTitle"
                name="seoTitle"
                type="text"
                maxLength={200}
                defaultValue={path.seo_title ?? ""}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="seoDescription" className="text-sm font-semibold text-slate-700">
                SEO description
              </label>
              <textarea
                id="seoDescription"
                name="seoDescription"
                rows={3}
                maxLength={500}
                defaultValue={path.seo_description ?? ""}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={path.featured}
              className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Featured career path
          </label>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/career-paths"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save career path changes
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
