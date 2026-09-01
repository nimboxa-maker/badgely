import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

const VERIFY_TEXT = "Verify with official provider.";

interface CertificationPageProps {
  params: Promise<{ slug: string }>;
}

function displayValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return VERIFY_TEXT;
  }

  return String(value);
}

async function getCertification(slug: string) {
  const supabase = await createClient();
  const { data: certification } = await supabase
    .from("certifications")
    .select(
      "id, provider_id, name, slug, category, level, vendor_type, short_summary, full_summary, target_job_roles, recommended_experience, official_certification_url, status, last_verified_date, estimated_study_hours_min, estimated_study_hours_max, seo_title, seo_description",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!certification) {
    return null;
  }

  const [
    providerResult,
    examsResult,
    domainsResult,
    resourcesResult,
    renewalResult,
    relationsResult,
  ] = await Promise.all([
    supabase
      .from("providers")
      .select("name, slug")
      .eq("id", certification.provider_id)
      .maybeSingle(),
    supabase
      .from("exams")
      .select(
        "id, exam_name, exam_code, number_of_exams, duration_minutes, question_count_text, delivery_method, price_text, registration_url, notes, last_verified_date",
      )
      .eq("certification_id", certification.id)
      .order("created_at"),
    supabase
      .from("exam_domains")
      .select("id, domain_name, domain_weight_text, description, display_order")
      .eq("certification_id", certification.id)
      .order("display_order"),
    supabase
      .from("resources")
      .select(
        "id, title, description, resource_type, url, provider_name, is_official, cost_type, featured, last_verified_date",
      )
      .eq("certification_id", certification.id)
      .order("featured", { ascending: false }),
    supabase
      .from("renewal_policies")
      .select(
        "validity_period_text, renewal_method, official_renewal_url, notes, last_verified_date",
      )
      .eq("certification_id", certification.id)
      .maybeSingle(),
    supabase
      .from("certification_relations")
      .select("relation_type, target_certification_id, explanation")
      .eq("source_certification_id", certification.id),
  ]);

  const relations = relationsResult.data ?? [];
  const targetIds = [...new Set(relations.map((relation) => relation.target_certification_id))];
  const relatedCertifications = targetIds.length
    ? ((await supabase.from("certifications").select("id, name, slug").in("id", targetIds)).data ??
      [])
    : [];

  return {
    certification,
    provider: providerResult.data,
    exams: examsResult.data ?? [],
    domains: domainsResult.data ?? [],
    resources: resourcesResult.data ?? [],
    renewal: renewalResult.data,
    relations,
    relatedCertifications,
  };
}

export async function generateMetadata({ params }: CertificationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = await getCertification(slug);

  if (!record) {
    return {
      title: "Certification not found",
      description: "The requested certification could not be found in the Badgely catalog.",
    };
  }

  return {
    title: record.certification.seo_title
      ? { absolute: record.certification.seo_title }
      : record.certification.name,
    description: record.certification.seo_description ?? record.certification.short_summary,
  };
}

export default async function CertificationDetailPage({ params }: CertificationPageProps) {
  const { slug } = await params;
  const record = await getCertification(slug);

  if (!record) {
    notFound();
  }

  const {
    certification,
    provider,
    exams,
    domains,
    resources,
    renewal,
    relations,
    relatedCertifications,
  } = record;


  const studyHours =
    certification.estimated_study_hours_min !== null &&
    certification.estimated_study_hours_max !== null
      ? `${certification.estimated_study_hours_min}–${certification.estimated_study_hours_max} hours`
      : certification.estimated_study_hours_min !== null
        ? `${certification.estimated_study_hours_min}+ hours`
        : VERIFY_TEXT;

  const relatedByType = {
    "Recommended Before": relations.filter(
      (relation) => relation.relation_type === "Recommended Before",
    ),
    "Recommended After": relations.filter(
      (relation) => relation.relation_type === "Recommended After",
    ),
    Alternative: relations.filter((relation) => relation.relation_type === "Alternative"),
    Specialization: relations.filter((relation) => relation.relation_type === "Specialization"),
  };

  const relatedName = (id: string) =>
    relatedCertifications.find((related) => related.id === id) ?? null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/certifications"
        className="text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        ← Back to certifications
      </Link>

      <header className="mt-6 rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30">
            {provider?.name ?? VERIFY_TEXT}
          </Badge>
          <Badge className="bg-white/10 text-slate-100">{certification.category}</Badge>
          <Badge className="bg-white/10 text-slate-100">{certification.level}</Badge>
          <Badge className="bg-white/10 text-slate-100">{certification.vendor_type}</Badge>
          <Badge className="bg-white/10 text-slate-100">{certification.status}</Badge>
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
          {certification.name}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          {certification.short_summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {certification.official_certification_url ? (
            <a
              href={certification.official_certification_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              Official source <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-xl border border-white/20 px-4 py-2.5 text-sm text-slate-300">
              Official source: {VERIFY_TEXT}
            </span>
          )}
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Last verified: {certification.last_verified_date ?? VERIFY_TEXT}
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Overview
            </h2>
            <Card className="mt-4 space-y-5">
              <p className="leading-7 text-slate-700">
                {certification.full_summary ?? certification.short_summary}
              </p>
              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Recommended experience</dt>
                  <dd className="mt-1 text-slate-900">
                    {displayValue(certification.recommended_experience)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Estimated study time</dt>
                  <dd className="mt-1 text-slate-900">{studyHours}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-slate-500">Target job roles</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {certification.target_job_roles.length ? (
                      certification.target_job_roles.map((role) => <Badge key={role}>{role}</Badge>)
                    ) : (
                      <span className="text-slate-900">{VERIFY_TEXT}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </Card>
          </section>

          <section aria-labelledby="exam-heading">
            <h2 id="exam-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Exam Details
            </h2>
            <div className="mt-4 space-y-4">
              {exams.length ? (
                exams.map((exam) => (
                  <Card key={exam.id}>
                    <h3 className="text-lg font-semibold">{displayValue(exam.exam_name)}</h3>
                    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-semibold text-slate-500">Exam code</dt>
                        <dd>{displayValue(exam.exam_code)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-slate-500">Number of exams</dt>
                        <dd>{displayValue(exam.number_of_exams)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-slate-500">Duration</dt>
                        <dd>
                          {exam.duration_minutes ? `${exam.duration_minutes} minutes` : VERIFY_TEXT}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-slate-500">Question count</dt>
                        <dd>{displayValue(exam.question_count_text)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-slate-500">Delivery method</dt>
                        <dd>{displayValue(exam.delivery_method)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-slate-500">Price</dt>
                        <dd>{displayValue(exam.price_text)}</dd>
                      </div>
                    </dl>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-slate-700">{VERIFY_TEXT}</p>
                </Card>
              )}
            </div>
          </section>

          <section aria-labelledby="domains-heading">
            <h2 id="domains-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Skills and Domains
            </h2>
            <div className="mt-4 space-y-4">
              {domains.length ? (
                domains.map((domain) => (
                  <Card key={domain.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-semibold">{domain.domain_name}</h3>
                      <span className="text-sm text-slate-500">
                        {displayValue(domain.domain_weight_text)}
                      </span>
                    </div>
                    <p className="mt-2 leading-7 text-slate-600">
                      {displayValue(domain.description)}
                    </p>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-slate-700">{VERIFY_TEXT}</p>
                </Card>
              )}
            </div>
          </section>

          <section aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Study Resources
            </h2>
            <div className="mt-4 space-y-4">
              {resources.length ? (
                resources.map((resource) => (
                  <Card key={resource.id}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{resource.title}</h3>
                      {resource.is_official ? <Badge>Official resource</Badge> : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {resource.resource_type} · {displayValue(resource.cost_type)}
                    </p>
                    <p className="mt-3 leading-7 text-slate-600">
                      {displayValue(resource.description)}
                    </p>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
                      >
                        View resource <ExternalLink className="size-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-slate-700">{VERIFY_TEXT}</p>
                </Card>
              )}
            </div>
          </section>

          <section aria-labelledby="renewal-heading">
            <h2 id="renewal-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Renewal
            </h2>
            <Card className="mt-4">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Validity period</dt>
                  <dd>{displayValue(renewal?.validity_period_text)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Renewal method</dt>
                  <dd>{displayValue(renewal?.renewal_method)}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-slate-500">Notes</dt>
                  <dd>{displayValue(renewal?.notes)}</dd>
                </div>
              </dl>
            </Card>
          </section>

          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Related Certifications
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Object.entries(relatedByType).map(([label, group]) => (
                <Card key={label}>
                  <h3 className="font-semibold">
                    {label === "Alternative"
                      ? "Alternatives"
                      : `${label}${label === "Specialization" ? "s" : ""}`}
                  </h3>
                  {group.length ? (
                    <ul className="mt-3 space-y-2">
                      {group.map((relation) => {
                        const related = relatedName(relation.target_certification_id);
                        return (
                          <li key={`${relation.relation_type}-${relation.target_certification_id}`}>
                            {related ? (
                              <Link
                                href={`/certifications/${related.slug}`}
                                className="font-semibold text-blue-700 hover:text-blue-600"
                              >
                                {related.name}
                              </Link>
                            ) : (
                              VERIFY_TEXT
                            )}
                            {relation.explanation ? (
                              <p className="mt-1 text-sm text-slate-600">{relation.explanation}</p>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-3 text-slate-600">{VERIFY_TEXT}</p>
                  )}
                </Card>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="font-semibold">Verify before scheduling</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Information may change. Confirm current exam details, pricing, availability, and
              renewal requirements with the official provider before making decisions.
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold">Independent resource</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Badgely is an independent educational resource and is not affiliated with, endorsed
              by, or sponsored by any certification provider. Certification names and logos may be
              trademarks of their respective owners.
            </p>
          </Card>
        </aside>
      </div>
    </main>
  );
}
