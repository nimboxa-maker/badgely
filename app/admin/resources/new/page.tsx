import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createResource } from "@/app/admin/resources/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type CertificationRow = {
  id: string;
  name: string;
  status: string;
  providers: { name: string } | { name: string }[] | null;
};

const resourceTypes = [
  "Official Guide",
  "Official Training",
  "Practice Lab",
  "Video Course",
  "Book",
  "Documentation",
  "Community",
] as const;

export default async function NewResourcePage() {
  const { supabase } = await requireAdmin();
  const { data: certifications, error } = await supabase
    .from("certifications")
    .select("id, name, status, providers(name)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certifications for resource creation.");
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/resources"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to resources
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Resources
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add learning resource
        </h1>
        <p className="mt-2 text-slate-600">
          Add a certification resource and record its source, cost, and verification details.
        </p>
      </div>

      <Card className="mt-8">
        <form action={createResource} className="space-y-6">
          <div>
            <label htmlFor="certificationId" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="certificationId"
              name="certificationId"
              required
              defaultValue=""
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select a certification
              </option>
              {((certifications ?? []) as unknown as CertificationRow[]).map((certification) => {
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
          </div>

          <div>
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">
              Resource title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              minLength={2}
              maxLength={200}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="resourceType" className="text-sm font-semibold text-slate-700">
                Resource type
              </label>
              <select
                id="resourceType"
                name="resourceType"
                required
                defaultValue=""
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a resource type
                </option>
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="costType" className="text-sm font-semibold text-slate-700">
                Cost type
              </label>
              <select
                id="costType"
                name="costType"
                defaultValue=""
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Not set</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
                <option value="Freemium">Freemium</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="providerName" className="text-sm font-semibold text-slate-700">
                Resource provider
              </label>
              <input
                id="providerName"
                name="providerName"
                type="text"
                maxLength={200}
                placeholder="CompTIA, Pearson, YouTube creator, etc."
                className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="lastVerifiedDate" className="text-sm font-semibold text-slate-700">
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

          <div>
            <label htmlFor="url" className="text-sm font-semibold text-slate-700">
              Resource URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              maxLength={500}
              placeholder="https://..."
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
              maxLength={3000}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                name="isOfficial"
                type="checkbox"
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Official resource
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                name="featured"
                type="checkbox"
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Featured resource
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/resources"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create resource
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
