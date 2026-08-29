import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Search } from "lucide-react";
import { DeleteExamDomainButton } from "@/app/admin/exam-domains/delete-exam-domain-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminExamDomainsPageProps = {
  searchParams: Promise<{
    q?: string;
    certification?: string;
  }>;
};

type ExamDomainRow = {
  id: string;
  domain_name: string;
  domain_weight_text: string | null;
  description: string | null;
  display_order: number;
  certifications: {
    id: string;
    name: string;
    slug: string;
    status: string;
    providers: {
      name: string;
    } | null;
  } | null;
};

export default async function AdminExamDomainsPage({
  searchParams,
}: AdminExamDomainsPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const certification = params.certification?.trim() || "all";

  const { data, error } = await supabase
    .from("exam_domains")
    .select(
      "id, domain_name, domain_weight_text, description, display_order, certifications(id, name, slug, status, providers(name))",
    )
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error("Unable to load exam domains for administration.");
  }

  const allDomains = (data ?? []) as unknown as ExamDomainRow[];
  const certificationOptions = [
    ...new Map(
      allDomains
        .filter((domain) => domain.certifications)
        .map((domain) => [
          domain.certifications!.slug,
          `${domain.certifications!.providers?.name ?? "Unknown provider"} · ${domain.certifications!.name}`,
        ]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  const domains = allDomains.filter((domain) => {
    const searchable = [
      domain.domain_name,
      domain.domain_weight_text ?? "",
      domain.description ?? "",
      domain.certifications?.name ?? "",
      domain.certifications?.providers?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesCertification =
      certification === "all" || domain.certifications?.slug === certification;

    return matchesQuery && matchesCertification;
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
          Admin · Exam domains
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Exam domain records
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search certification exam domains, review weights, and verify their display order before making catalog changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/exam-domains/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add exam domain
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{domains.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allDomains.length}</span> domains
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_320px_auto]" method="get">
          <div>
            <label htmlFor="domain-search" className="text-sm font-semibold text-slate-700">
              Search exam domains
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="domain-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Domain, weight, certification, provider, or description"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="domain-certification" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="domain-certification"
              name="certification"
              defaultValue={certification}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All certifications</option>
              {certificationOptions.map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
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

      {domains.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Exam domain records">
          {domains.map((domain) => (
            <Card key={domain.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{domain.domain_name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {domain.certifications
                      ? `${domain.certifications.providers?.name ?? "Unknown provider"} · ${domain.certifications.name}`
                      : "Certification unavailable"}
                  </p>
                </div>
                {domain.domain_weight_text ? <Badge>{domain.domain_weight_text}</Badge> : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {domain.description || "No domain description has been added."}
              </p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Display order</dt>
                  <dd className="mt-1 text-slate-900">{domain.display_order}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Certification status</dt>
                  <dd className="mt-1 text-slate-900">
                    {domain.certifications?.status ?? "Unavailable"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/admin/exam-domains/${domain.id}/edit`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit exam domain
                </Link>
                <DeleteExamDomainButton
                  examDomainId={domain.id}
                  examDomainLabel={domain.domain_name}
                />
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No exam domains match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different certification filter.
          </p>
          <Link
            href="/admin/exam-domains"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
