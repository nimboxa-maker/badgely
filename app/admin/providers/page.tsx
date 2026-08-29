import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminProvidersPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

export default async function AdminProvidersPage({
  searchParams,
}: AdminProvidersPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const status = params.status === "active" || params.status === "archived"
    ? params.status
    : "all";

  const { data, error } = await supabase
    .from("providers")
    .select(
      "id, name, slug, website_url, description, provider_type, active, created_at, updated_at",
    )
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certification providers.");
  }

  const providers = (data ?? []).filter((provider) => {
    const matchesQuery =
      !query ||
      provider.name.toLowerCase().includes(query) ||
      provider.slug.toLowerCase().includes(query) ||
      provider.provider_type?.toLowerCase().includes(query) ||
      provider.description?.toLowerCase().includes(query);

    const matchesStatus =
      status === "all" ||
      (status === "active" && provider.active) ||
      (status === "archived" && !provider.active);

    return matchesQuery && matchesStatus;
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to admin
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Providers
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Certification providers
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search and review provider records before creating, editing, archiving, or deleting them.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/providers/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add provider
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{providers.length}</span> of{" "}
              <span className="font-bold text-slate-950">{data?.length ?? 0}</span> providers
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 md:grid-cols-[1fr_220px_auto]" method="get">
          <div>
            <label htmlFor="provider-search" className="text-sm font-semibold text-slate-700">
              Search providers
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="provider-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Name, slug, type, or description"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="provider-status" className="text-sm font-semibold text-slate-700">
              Visibility
            </label>
            <select
              id="provider-status"
              name="status"
              defaultValue={status}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All providers</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <button
            type="submit"
            className="min-h-11 self-end rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Apply filters
          </button>
        </form>
      </Card>

      {providers.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Provider records">
          {providers.map((provider) => (
            <Card key={provider.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{provider.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">/{provider.slug}</p>
                </div>
                <Badge>{provider.active ? "Active" : "Archived"}</Badge>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {provider.description || "No provider description yet."}
              </p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Provider type</dt>
                  <dd className="mt-1 text-slate-900">
                    {provider.provider_type || "Not set"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Website</dt>
                  <dd className="mt-1 truncate text-slate-900">
                    {provider.website_url || "Not set"}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Edit, archive, and delete controls are next
              </p>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No providers match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different visibility filter.
          </p>
          <Link
            href="/admin/providers"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
