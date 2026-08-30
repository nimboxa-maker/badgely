import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCertificationRelation } from "@/app/admin/certification-relations/actions";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type CertificationOption = {
  id: string;
  name: string;
  status: string;
  providers: { name: string } | { name: string }[] | null;
};

const relationTypes = [
  "Recommended Before",
  "Recommended After",
  "Alternative",
  "Specialization",
] as const;

function certificationLabel(certification: CertificationOption) {
  const provider = Array.isArray(certification.providers)
    ? certification.providers[0]?.name
    : certification.providers?.name;

  return `${provider ? `${provider} · ` : ""}${certification.name}${
    certification.status === "Active" ? "" : ` (${certification.status})`
  }`;
}

export default async function NewCertificationRelationPage() {
  const { supabase } = await requireAdmin();
  const { data: certifications, error } = await supabase
    .from("certifications")
    .select("id, name, status, providers(name)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certification relation form options.");
  }

  const options = (certifications ?? []) as unknown as CertificationOption[];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/certification-relations"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to certification relations
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Admin · Certification relations
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add certification relation
        </h1>
        <p className="mt-2 text-slate-600">
          Connect two different certifications and describe how they relate.
        </p>
      </div>

      <Card className="mt-8">
        <form action={createCertificationRelation} className="space-y-6">
          <div>
            <label htmlFor="sourceCertificationId" className="text-sm font-semibold text-slate-700">
              Source certification
            </label>
            <select
              id="sourceCertificationId"
              name="sourceCertificationId"
              required
              defaultValue=""
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select the source certification
              </option>
              {options.map((certification) => (
                <option key={certification.id} value={certification.id}>
                  {certificationLabel(certification)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="relationType" className="text-sm font-semibold text-slate-700">
              Relation type
            </label>
            <select
              id="relationType"
              name="relationType"
              required
              defaultValue=""
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select a relation type
              </option>
              {relationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="targetCertificationId" className="text-sm font-semibold text-slate-700">
              Target certification
            </label>
            <select
              id="targetCertificationId"
              name="targetCertificationId"
              required
              defaultValue=""
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select the target certification
              </option>
              {options.map((certification) => (
                <option key={certification.id} value={certification.id}>
                  {certificationLabel(certification)}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              The source and target certifications must be different.
            </p>
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
              placeholder="Explain why this relationship is useful to learners."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/certification-relations"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create certification relation
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
