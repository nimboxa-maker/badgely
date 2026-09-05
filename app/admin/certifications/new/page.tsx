import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCertification } from "@/app/admin/certifications/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function NewCertificationPage() {
  const { supabase } = await requireAdmin();

  const { data: providers, error } = await supabase
    .from("providers")
    .select("id, name, active")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(
      "Unable to load providers for certification creation.",
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/certifications"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to certifications
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Certifications
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add certification
        </h1>

        <p className="mt-2 text-slate-600">
          Create a certification record using factual, original, and
          verifiable information.
        </p>
      </div>

      <Card className="mt-8">
        <form action={createCertification} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="providerId"
                className="text-sm font-semibold text-slate-700"
              >
                Provider
              </label>

              <select
                id="providerId"
                name="providerId"
                required
                defaultValue=""
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a provider
                </option>

                {(providers ?? []).map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                    {provider.active ? "" : " (Archived)"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-sm font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                defaultValue="Active"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>
                <option value="Retiring Soon">
                  Retiring Soon
                </option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-slate-700"
              >
                Certification name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={160}
                placeholder="ThirdBadge Test Certification"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="text-sm font-semibold text-slate-700"
              >
                Slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                required
                maxLength={160}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                placeholder="thirdbadge-test-certification"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-slate-500">
                Lowercase letters, numbers, and hyphens only.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="category"
                className="text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                required
                maxLength={120}
                placeholder="Cybersecurity"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="level"
                className="text-sm font-semibold text-slate-700"
              >
                Level
              </label>

              <input
                id="level"
                name="level"
                type="text"
                required
                maxLength={120}
                placeholder="Foundational"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="vendorType"
                className="text-sm font-semibold text-slate-700"
              >
                Vendor type
              </label>

              <select
                id="vendorType"
                name="vendorType"
                defaultValue="Vendor-neutral"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Vendor-neutral">
                  Vendor-neutral
                </option>
                <option value="Vendor-specific">
                  Vendor-specific
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="shortSummary"
              className="text-sm font-semibold text-slate-700"
            >
              Short summary
            </label>

            <textarea
              id="shortSummary"
              name="shortSummary"
              rows={3}
              required
              maxLength={500}
              placeholder="Write a concise original summary of the certification."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="fullSummary"
              className="text-sm font-semibold text-slate-700"
            >
              Full summary
            </label>

            <textarea
              id="fullSummary"
              name="fullSummary"
              rows={6}
              maxLength={5000}
              placeholder="Optional longer overview."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="targetJobRoles"
                className="text-sm font-semibold text-slate-700"
              >
                Target job roles
              </label>

              <input
                id="targetJobRoles"
                name="targetJobRoles"
                type="text"
                maxLength={1000}
                placeholder="SOC Analyst, Security Administrator"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-slate-500">
                Separate multiple roles with commas.
              </p>
            </div>

            <div>
              <label
                htmlFor="recommendedExperience"
                className="text-sm font-semibold text-slate-700"
              >
                Recommended experience
              </label>

              <textarea
                id="recommendedExperience"
                name="recommendedExperience"
                rows={3}
                maxLength={2000}
                placeholder="Optional experience guidance."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="officialCertificationUrl"
                className="text-sm font-semibold text-slate-700"
              >
                Official certification URL
              </label>

              <input
                id="officialCertificationUrl"
                name="officialCertificationUrl"
                type="url"
                maxLength={500}
                placeholder="https://example.com/certification"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="lastVerifiedDate"
                className="text-sm font-semibold text-slate-700"
              >
                Last verified date
              </label>

              <input
                id="lastVerifiedDate"
                name="lastVerifiedDate"
                type="date"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="estimatedStudyHoursMin"
                className="text-sm font-semibold text-slate-700"
              >
                Minimum study hours
              </label>

              <input
                id="estimatedStudyHoursMin"
                name="estimatedStudyHoursMin"
                type="number"
                min={0}
                step={1}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="estimatedStudyHoursMax"
                className="text-sm font-semibold text-slate-700"
              >
                Maximum study hours
              </label>

              <input
                id="estimatedStudyHoursMax"
                name="estimatedStudyHoursMax"
                type="number"
                min={0}
                step={1}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="seoTitle"
                className="text-sm font-semibold text-slate-700"
              >
                SEO title
              </label>

              <input
                id="seoTitle"
                name="seoTitle"
                type="text"
                maxLength={200}
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="seoDescription"
                className="text-sm font-semibold text-slate-700"
              >
                SEO description
              </label>

              <textarea
                id="seoDescription"
                name="seoDescription"
                rows={3}
                maxLength={500}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input
              name="featured"
              type="checkbox"
              className="mt-1 size-4 rounded border-slate-300"
            />

            <span>
              <span className="block text-sm font-semibold text-slate-900">
                Featured certification
              </span>

              <span className="mt-1 block text-sm text-slate-600">
                Featured records may receive priority placement in
                the public catalog.
              </span>
            </span>
          </label>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/certifications"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create certification
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}