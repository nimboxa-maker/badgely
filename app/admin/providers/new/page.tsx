import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProvider } from "@/app/admin/providers/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function NewProviderPage() {
  await requireAdmin();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/providers"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to providers
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Providers
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add certification provider
        </h1>
        <p className="mt-2 text-slate-600">
          Create a provider record. Keep official URLs and descriptions factual and verifiable.
        </p>
      </div>

      <Card className="mt-8">
        <form action={createProvider} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Provider name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={120}
                placeholder="Example Certification Group"
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
                maxLength={120}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                placeholder="example-certification-group"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-1 text-xs text-slate-500">
                Lowercase letters, numbers, and hyphens only.
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="websiteUrl" className="text-sm font-semibold text-slate-700">
              Official website URL
            </label>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              maxLength={500}
              placeholder="https://example.com"
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              maxLength={2000}
              placeholder="Write a concise original description of the provider."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="providerType" className="text-sm font-semibold text-slate-700">
                Provider type
              </label>
              <select
                id="providerType"
                name="providerType"
                defaultValue=""
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Not set</option>
                <option value="vendor-neutral">Vendor-neutral</option>
                <option value="vendor-specific">Vendor-specific</option>
                <option value="professional-body">Professional body</option>
              </select>
            </div>

            <div>
              <label htmlFor="accentColor" className="text-sm font-semibold text-slate-700">
                Accent color
              </label>
              <input
                id="accentColor"
                name="accentColor"
                type="text"
                maxLength={40}
                placeholder="#2563EB"
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input
              name="active"
              type="checkbox"
              defaultChecked
              className="mt-1 size-4 rounded border-slate-300"
            />
            <span>
              <span className="block text-sm font-semibold text-slate-900">Active provider</span>
              <span className="mt-1 block text-sm text-slate-600">
                Active providers may be visible in the public catalog when they have published
                content.
              </span>
            </span>
          </label>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/providers"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create provider
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
