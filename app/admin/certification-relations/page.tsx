import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Search } from "lucide-react";
import { DeleteCertificationRelationButton } from "@/app/admin/certification-relations/delete-certification-relation-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminCertificationRelationsPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
  }>;
};

type CertificationRef = {
  id: string;
  name: string;
  slug: string;
  status: string;
  providers: {
    name: string;
  } | null;
};

type CertificationRelationRow = {
  id: string;
  relation_type: string;
  explanation: string | null;
  source_certification: CertificationRef | null;
  target_certification: CertificationRef | null;
};

const relationTypes = [
  "Recommended Before",
  "Recommended After",
  "Alternative",
  "Specialization",
] as const;

export default async function AdminCertificationRelationsPage({
  searchParams,
}: AdminCertificationRelationsPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const relationType = params.type?.trim() || "all";

  const { data, error } = await supabase
    .from("certification_relations")
    .select(
      "id, relation_type, explanation, source_certification:certifications!certification_relations_source_certification_id_fkey(id, name, slug, status, providers(name)), target_certification:certifications!certification_relations_target_certification_id_fkey(id, name, slug, status, providers(name))",
    )
    .order("relation_type", { ascending: true });

  if (error) {
    throw new Error("Unable to load certification relations for administration.");
  }

  const allRelations = (data ?? []) as unknown as CertificationRelationRow[];

  const relations = allRelations.filter((relation) => {
    const searchable = [
      relation.relation_type,
      relation.explanation ?? "",
      relation.source_certification?.name ?? "",
      relation.source_certification?.providers?.name ?? "",
      relation.target_certification?.name ?? "",
      relation.target_certification?.providers?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesType = relationType === "all" || relation.relation_type === relationType;

    return matchesQuery && matchesType;
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
          Admin · Certification relations
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Certification relations
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search certification relationships and review recommended sequencing, alternatives, and specializations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/certification-relations/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add certification relation
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{relations.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allRelations.length}</span> relations
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_260px_auto]" method="get">
          <div>
            <label htmlFor="certification-relation-search" className="text-sm font-semibold text-slate-700">
              Search relations
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="certification-relation-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Certification, provider, type, or explanation"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="certification-relation-type" className="text-sm font-semibold text-slate-700">
              Relation type
            </label>
            <select
              id="certification-relation-type"
              name="type"
              defaultValue={relationType}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All relation types</option>
              {relationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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

      {relations.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Certification relation records">
          {relations.map((relation) => (
            <Card key={relation.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                    Relationship
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-950">
                    {relation.source_certification?.name ?? "Source certification unavailable"}
                  </h2>
                </div>
                <Badge>{relation.relation_type}</Badge>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Target certification
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {relation.target_certification?.name ?? "Target certification unavailable"}
                </p>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-500">Source provider</dt>
                  <dd className="mt-1 text-slate-900">
                    {relation.source_certification?.providers?.name ?? "Not available"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Target provider</dt>
                  <dd className="mt-1 text-slate-900">
                    {relation.target_certification?.providers?.name ?? "Not available"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Source status</dt>
                  <dd className="mt-1 text-slate-900">
                    {relation.source_certification?.status ?? "Not available"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Target status</dt>
                  <dd className="mt-1 text-slate-900">
                    {relation.target_certification?.status ?? "Not available"}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {relation.explanation || "No explanation has been added."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/admin/certification-relations/${relation.id}/edit`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit certification relation
                </Link>
                <DeleteCertificationRelationButton
                  relationId={relation.id}
                  sourceName={relation.source_certification?.name ?? "source certification"}
                  targetName={relation.target_certification?.name ?? "target certification"}
                  relationType={relation.relation_type}
                />
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No certification relations match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different relation type.
          </p>
          <Link
            href="/admin/certification-relations"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
