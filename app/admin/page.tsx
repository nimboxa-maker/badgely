import Link from "next/link";
import { format, subDays } from "date-fns";
import { ArrowRight, Database, RefreshCw, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

const catalogAreas = [
  { key: "providers", name: "Providers", description: "Manage certification providers and visibility.", href: "/admin/providers" },
  { key: "certifications", name: "Certifications", description: "Manage certification facts, status, SEO, and featured records.", href: "/admin/certifications" },
  { key: "exams", name: "Exams", description: "Manage exam details, registration links, and verification dates.", href: "/admin/exams" },
  { key: "examDomains", name: "Exam domains", description: "Manage domain summaries, weights, and display order.", href: "/admin/exam-domains" },
  { key: "renewalPolicies", name: "Renewal policies", description: "Manage renewal guidance, official sources, and verification dates.", href: "/admin/renewal-policies" },
  { key: "resources", name: "Resources", description: "Manage official and community learning resources.", href: "/admin/resources" },
  { key: "careerPaths", name: "Career paths", description: "Manage career-roadmap pages and SEO metadata.", href: "/admin/career-paths" },
  { key: "careerPathSteps", name: "Career path steps", description: "Manage ordered certifications and practical activities.", href: "/admin/career-path-steps" },
  { key: "certificationRelations", name: "Certification relations", description: "Manage before, after, alternative, and specialization links.", href: "/admin/certification-relations" },
] as const;

export default async function AdminPage() {
  const { profile, supabase } = await requireAdmin();
  const reviewThreshold = format(subDays(new Date(), 90), "yyyy-MM-dd");

  const [
    providersResult,
    certificationsResult,
    examsResult,
    examDomainsResult,
    renewalPoliciesResult,
    resourcesResult,
    careerPathsResult,
    careerPathStepsResult,
    certificationRelationsResult,
    staleCertificationsResult,
    staleExamsResult,
    staleRenewalPoliciesResult,
    staleResourcesResult,
  ] = await Promise.all([
    supabase.from("providers").select("id", { count: "exact", head: true }),
    supabase.from("certifications").select("id", { count: "exact", head: true }),
    supabase.from("exams").select("id", { count: "exact", head: true }),
    supabase.from("exam_domains").select("id", { count: "exact", head: true }),
    supabase.from("renewal_policies").select("id", { count: "exact", head: true }),
    supabase.from("resources").select("id", { count: "exact", head: true }),
    supabase.from("career_paths").select("id", { count: "exact", head: true }),
    supabase.from("career_path_steps").select("id", { count: "exact", head: true }),
    supabase.from("certification_relations").select("id", { count: "exact", head: true }),
    supabase
      .from("certifications")
      .select("id", { count: "exact", head: true })
      .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
    supabase
      .from("exams")
      .select("id", { count: "exact", head: true })
      .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
    supabase
      .from("renewal_policies")
      .select("id", { count: "exact", head: true })
      .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
    supabase
      .from("resources")
      .select("id", { count: "exact", head: true })
      .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
  ]);

  const results = [
    providersResult,
    certificationsResult,
    examsResult,
    examDomainsResult,
    renewalPoliciesResult,
    resourcesResult,
    careerPathsResult,
    careerPathStepsResult,
    certificationRelationsResult,
    staleCertificationsResult,
    staleExamsResult,
    staleRenewalPoliciesResult,
    staleResourcesResult,
  ];

  if (results.some((result) => result.error)) {
    throw new Error("Unable to load admin dashboard counts.");
  }

  const counts = {
    providers: providersResult.count ?? 0,
    certifications: certificationsResult.count ?? 0,
    exams: examsResult.count ?? 0,
    examDomains: examDomainsResult.count ?? 0,
    renewalPolicies: renewalPoliciesResult.count ?? 0,
    resources: resourcesResult.count ?? 0,
    careerPaths: careerPathsResult.count ?? 0,
    careerPathSteps: careerPathStepsResult.count ?? 0,
    certificationRelations: certificationRelationsResult.count ?? 0,
  };

  const totalCatalogRecords = Object.values(counts).reduce((total, count) => total + count, 0);
  const needsReviewCount =
    (staleCertificationsResult.count ?? 0) +
    (staleExamsResult.count ?? 0) +
    (staleRenewalPoliciesResult.count ?? 0) +
    (staleResourcesResult.count ?? 0);

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
          <p className="mt-3 text-sm font-semibold text-slate-500">Catalog records</p>
          <p className="mt-1 text-xl font-bold text-slate-950">{totalCatalogRecords}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Live total across all {catalogAreas.length} admin-managed catalog areas.
          </p>
        </Card>

        <Card>
          <RefreshCw className="size-5 text-blue-700" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-slate-500">Needs Review</p>
          <p className="mt-1 text-xl font-bold text-slate-950">{needsReviewCount}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Certification, exam, renewal, and resource records with no verification date or a date older than 90 days.
          </p>
        </Card>
      </section>

      <section className="mt-10" aria-labelledby="catalog-management-heading">
        <div className="mb-4">
          <h2 id="catalog-management-heading" className="text-2xl font-bold text-slate-950">
            Catalog management areas
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, create, edit, and safely remove catalog records from each protected admin area.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {catalogAreas.map((area) => (
            <Card key={area.name}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-lg font-bold text-slate-950">{area.name}</p>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {counts[area.key]}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
              <Link
                href={area.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-600"
              >
                Manage {area.name.toLowerCase()}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
