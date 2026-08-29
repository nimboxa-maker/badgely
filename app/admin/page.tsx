import Link from "next/link";
import { ArrowRight, Database, RefreshCw, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

const catalogAreas = [
  { name: "Providers", description: "Manage certification providers and visibility.", href: "/admin/providers" },
  { name: "Certifications", description: "Manage certification facts, status, SEO, and featured records.", href: "/admin/certifications" },
  { name: "Exams", description: "Manage exam details, registration links, and verification dates.", href: "/admin/exams" },
  { name: "Exam domains", description: "Manage domain summaries, weights, and display order.", href: "/admin/exam-domains" },
  { name: "Renewal policies", description: "Manage renewal guidance, official sources, and verification dates.", href: "/admin/renewal-policies" },
  { name: "Resources", description: "Manage official and community learning resources." },
  { name: "Career paths", description: "Manage career-roadmap pages and SEO metadata." },
  { name: "Career path steps", description: "Manage ordered certifications and practical activities." },
  { name: "Certification relations", description: "Manage before, after, alternative, and specialization links." },
] as const;

export default async function AdminPage() {
  const { profile } = await requireAdmin();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Catalog management
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Signed in as {profile.display_name || "an administrator"}. Manage Badgely catalog content and keep verification data current.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Preview public site
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Admin overview">
        <Card>
          <ShieldCheck className="size-5 text-blue-700" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-slate-500">Authorization</p>
          <p className="mt-1 text-xl font-bold text-slate-950">Admin access verified</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This route performs a server-side role check before catalog tools are shown.
          </p>
        </Card>

        <Card>
          <Database className="size-5 text-blue-700" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-slate-500">Catalog areas</p>
          <p className="mt-1 text-xl font-bold text-slate-950">{catalogAreas.length}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            CRUD screens are being added incrementally during Milestone 7.
          </p>
        </Card>

        <Card>
          <RefreshCw className="size-5 text-blue-700" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-slate-500">Needs Review</p>
          <p className="mt-1 text-xl font-bold text-slate-950">90-day review workflow</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Stale certification, exam, renewal, and resource records will be surfaced here later in this milestone.
          </p>
        </Card>
      </section>

      <section className="mt-10" aria-labelledby="catalog-management-heading">
        <div className="mb-4">
          <h2 id="catalog-management-heading" className="text-2xl font-bold text-slate-950">
            Catalog management areas
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Each area will receive search, filters, validated forms, and destructive-action confirmation.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {catalogAreas.map((area) => (
            <Card key={area.name}>
              <p className="text-lg font-bold text-slate-950">{area.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
              {"href" in area ? (
                <Link
                  href={area.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-600"
                >
                  Manage {area.name.toLowerCase()}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Management screen coming in Milestone 7
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
