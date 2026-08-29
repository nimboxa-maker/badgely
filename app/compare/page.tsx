import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Plus, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Compare IT Certifications | Badgely",
  description:
    "Compare up to three IT certifications side by side using provider, level, exam, study-time, renewal, and other stored attributes.",
};

const VERIFY_TEXT = "Verify with official provider.";

const levelRank: Record<string, number> = {
  Foundational: 0,
  Associate: 1,
  Intermediate: 2,
  Advanced: 3,
};

type SearchParams = Record<string, string | string[] | undefined>;

interface ComparePageProps {
  searchParams: Promise<SearchParams>;
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function repeatedParam(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function compareHref(slugs: string[], query = "") {
  const params = new URLSearchParams();

  slugs.forEach((slug) => params.append("cert", slug));
  if (query.trim()) {
    params.set("q", query.trim());
  }

  const queryString = params.toString();
  return queryString ? `/compare?${queryString}` : "/compare";
}

function displayValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return VERIFY_TEXT;
  }

  return String(value);
}

function formatDate(value: string | null) {
  if (!value) {
    return VERIFY_TEXT;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function studyHours(min: number | null, max: number | null) {
  if (min !== null && max !== null) {
    return `${min}–${max} hours`;
  }

  if (min !== null) {
    return `${min}+ hours`;
  }

  return VERIFY_TEXT;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const searchQuery = firstParam(params.q).trim();
  const requestedSlugs = repeatedParam(params.cert);
  const selectedSlugs = [...new Set(requestedSlugs.filter(Boolean))].slice(0, 3);

  const supabase = await createClient();
  const { data: certificationData, error: certificationError } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, category, level, vendor_type, target_job_roles, recommended_experience, estimated_study_hours_min, estimated_study_hours_max, official_certification_url, last_verified_date, status, providers(name)",
    )
    .order("name", { ascending: true });

  if (certificationError) {
    throw new Error("Unable to load certifications for comparison.");
  }

  const allCertifications = certificationData ?? [];
  const selectedCertifications = selectedSlugs
    .map((slug) => allCertifications.find((certification) => certification.slug === slug))
    .filter((certification): certification is NonNullable<typeof certification> => Boolean(certification));

  const selectedIds = selectedCertifications.map((certification) => certification.id);

  const examsResult = selectedIds.length
    ? await supabase
        .from("exams")
        .select(
          "certification_id, exam_code, number_of_exams, duration_minutes, delivery_method, price_text, created_at",
        )
        .in("certification_id", selectedIds)
        .order("created_at", { ascending: true })
    : { data: [], error: null };

  const renewalResult = selectedIds.length
    ? await supabase
        .from("renewal_policies")
        .select("certification_id, validity_period_text, renewal_method")
        .in("certification_id", selectedIds)
    : { data: [], error: null };

  if (examsResult.error || renewalResult.error) {
    throw new Error("Unable to load certification comparison details.");
  }

  const exams = examsResult.data ?? [];
  const renewals = renewalResult.data ?? [];

  const compared = selectedCertifications.map((certification) => ({
    ...certification,
    exam: exams.find((exam) => exam.certification_id === certification.id) ?? null,
    renewal: renewals.find((renewal) => renewal.certification_id === certification.id) ?? null,
  }));

  const normalizedSearch = searchQuery.toLowerCase();
  const searchResults = allCertifications
    .filter((certification) => !selectedSlugs.includes(certification.slug))
    .filter((certification) => {
      if (!normalizedSearch) {
        return true;
      }

      return [
        certification.name,
        certification.providers?.name ?? "",
        certification.category,
        certification.level,
        ...certification.target_job_roles,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    })
    .slice(0, 15);

  const guidance: string[] = [];

  if (compared.length >= 2) {
    const byLevel = [...compared].sort(
      (a, b) => (levelRank[a.level] ?? 99) - (levelRank[b.level] ?? 99),
    );
    const uniqueLevels = new Set(compared.map((item) => item.level));

    if (uniqueLevels.size > 1) {
      guidance.push(
        `${byLevel[0].name} is listed at the ${byLevel[0].level} level, the earliest level among the certifications currently selected.`,
      );
    }

    const withStudyEstimate = compared
      .filter((item) => item.estimated_study_hours_min !== null)
      .sort(
        (a, b) =>
          (a.estimated_study_hours_min ?? Number.MAX_SAFE_INTEGER) -
          (b.estimated_study_hours_min ?? Number.MAX_SAFE_INTEGER),
      );

    if (
      withStudyEstimate.length >= 2 &&
      withStudyEstimate[0].estimated_study_hours_min !==
        withStudyEstimate[1].estimated_study_hours_min
    ) {
      guidance.push(
        `${withStudyEstimate[0].name} has the lowest stored minimum study-time estimate at ${withStudyEstimate[0].estimated_study_hours_min} hours.`,
      );
    }

    const vendorTypes = new Set(compared.map((item) => item.vendor_type));
    if (vendorTypes.size > 1) {
      guidance.push(
        "These options include different vendor types. A vendor-neutral credential emphasizes broadly applicable knowledge, while a vendor-specific credential focuses on a particular technology ecosystem.",
      );
    }

    if (!guidance.length) {
      guidance.push(
        "The stored level, vendor type, and study-time attributes do not create a clear distinction. Compare the listed target roles, exam details, and provider focus against what you want to learn next.",
      );
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Certification comparison
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Compare certifications side by side
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Search and select up to three certifications. Your selections stay in the URL, so the comparison can be bookmarked or shared.
        </p>
      </div>

      <section aria-labelledby="select-heading" className="mt-8">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="select-heading" className="text-xl font-bold text-slate-950">
                Select certifications
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {selectedSlugs.length}/3 selected
              </p>
            </div>
            {selectedSlugs.length ? (
              <Link
                href="/compare"
                className="text-sm font-semibold text-blue-700 hover:text-blue-600"
              >
                Clear comparison
              </Link>
            ) : null}
          </div>

          {compared.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {compared.map((certification) => (
                <span
                  key={certification.id}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-900 ring-1 ring-inset ring-blue-200"
                >
                  {certification.name}
                  <Link
                    href={compareHref(
                      selectedSlugs.filter((slug) => slug !== certification.slug),
                      searchQuery,
                    )}
                    aria-label={`Remove ${certification.name} from comparison`}
                    className="rounded-full p-0.5 hover:bg-blue-100"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </Link>
                </span>
              ))}
            </div>
          ) : null}

          <form method="get" action="/compare" className="mt-6">
            {selectedSlugs.map((slug) => (
              <input key={slug} type="hidden" name="cert" value={slug} />
            ))}
            <label htmlFor="q" className="text-sm font-semibold text-slate-900">
              Search certifications
            </label>
            <div className="mt-2 flex gap-2">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="q"
                  name="q"
                  type="search"
                  defaultValue={searchQuery}
                  placeholder="Search Security+, CCNA, AWS, cloud…"
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <button
                type="submit"
                className="min-h-11 rounded-xl bg-slate-950 px-4 py-2.5 font-semibold text-white hover:bg-slate-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((certification) => {
              const atLimit = selectedSlugs.length >= 3;

              return (
                <div
                  key={certification.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {certification.providers?.name ?? VERIFY_TEXT}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-950">{certification.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {certification.category} · {certification.level}
                  </p>
                  {atLimit ? (
                    <span className="mt-3 inline-flex text-sm font-semibold text-slate-400">
                      Maximum 3 selected
                    </span>
                  ) : (
                    <Link
                      href={compareHref([...selectedSlugs, certification.slug], searchQuery)}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-600"
                    >
                      <Plus className="size-4" aria-hidden="true" /> Add to comparison
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {!searchResults.length ? (
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              No additional certifications match that search.
            </p>
          ) : null}
        </Card>
      </section>

      {compared.length ? (
        <section aria-labelledby="comparison-heading" className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="comparison-heading" className="text-2xl font-bold text-slate-950">
                Comparison
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Copy the current browser URL to share this exact selection.
              </p>
            </div>
          </div>

          <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-48 px-5 py-4 text-sm font-semibold text-slate-600">Attribute</th>
                  {compared.map((certification) => (
                    <th key={certification.id} className="px-5 py-4 align-top">
                      <Link
                        href={`/certifications/${certification.slug}`}
                        className="text-lg font-bold text-slate-950 hover:text-blue-700"
                      >
                        {certification.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <ComparisonRow label="Provider" values={compared.map((item) => item.providers?.name ?? VERIFY_TEXT)} />
                <ComparisonRow label="Category" values={compared.map((item) => item.category)} />
                <ComparisonRow label="Level" values={compared.map((item) => item.level)} />
                <ComparisonRow label="Vendor type" values={compared.map((item) => item.vendor_type)} />
                <ComparisonRow
                  label="Target job roles"
                  values={compared.map((item) =>
                    item.target_job_roles.length ? item.target_job_roles.join(", ") : VERIFY_TEXT,
                  )}
                />
                <ComparisonRow
                  label="Recommended experience"
                  values={compared.map((item) => displayValue(item.recommended_experience))}
                />
                <ComparisonRow
                  label="Estimated study hours"
                  values={compared.map((item) =>
                    studyHours(item.estimated_study_hours_min, item.estimated_study_hours_max),
                  )}
                />
                <ComparisonRow
                  label="Exam code"
                  values={compared.map((item) => displayValue(item.exam?.exam_code))}
                />
                <ComparisonRow
                  label="Number of exams"
                  values={compared.map((item) => displayValue(item.exam?.number_of_exams))}
                />
                <ComparisonRow
                  label="Duration"
                  values={compared.map((item) =>
                    item.exam?.duration_minutes
                      ? `${item.exam.duration_minutes} minutes`
                      : VERIFY_TEXT,
                  )}
                />
                <ComparisonRow
                  label="Delivery method"
                  values={compared.map((item) => displayValue(item.exam?.delivery_method))}
                />
                <ComparisonRow
                  label="Price"
                  values={compared.map((item) => displayValue(item.exam?.price_text))}
                />
                <ComparisonRow
                  label="Renewal"
                  values={compared.map((item) => {
                    const parts = [
                      item.renewal?.validity_period_text,
                      item.renewal?.renewal_method,
                    ].filter(Boolean);
                    return parts.length ? parts.join(" · ") : VERIFY_TEXT;
                  })}
                />
                <ComparisonRow
                  label="Last verified"
                  values={compared.map((item) => formatDate(item.last_verified_date))}
                />
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">Official link</th>
                  {compared.map((item) => (
                    <td key={item.id} className="px-5 py-4 text-sm text-slate-700 align-top">
                      {item.official_certification_url ? (
                        <a
                          href={item.official_certification_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-600"
                        >
                          Official source <ExternalLink className="size-4" aria-hidden="true" />
                        </a>
                      ) : (
                        VERIFY_TEXT
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-5 lg:hidden">
            {compared.map((item) => {
              const renewalParts = [
                item.renewal?.validity_period_text,
                item.renewal?.renewal_method,
              ].filter(Boolean);

              return (
                <Card key={item.id}>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{item.providers?.name ?? VERIFY_TEXT}</Badge>
                    <Badge>{item.level}</Badge>
                  </div>
                  <Link
                    href={`/certifications/${item.slug}`}
                    className="mt-3 block text-xl font-bold text-slate-950 hover:text-blue-700"
                  >
                    {item.name}
                  </Link>
                  <dl className="mt-5 space-y-4">
                    <MobileDetail label="Category" value={item.category} />
                    <MobileDetail label="Vendor type" value={item.vendor_type} />
                    <MobileDetail
                      label="Target job roles"
                      value={item.target_job_roles.length ? item.target_job_roles.join(", ") : VERIFY_TEXT}
                    />
                    <MobileDetail label="Recommended experience" value={displayValue(item.recommended_experience)} />
                    <MobileDetail
                      label="Estimated study hours"
                      value={studyHours(item.estimated_study_hours_min, item.estimated_study_hours_max)}
                    />
                    <MobileDetail label="Exam code" value={displayValue(item.exam?.exam_code)} />
                    <MobileDetail label="Number of exams" value={displayValue(item.exam?.number_of_exams)} />
                    <MobileDetail
                      label="Duration"
                      value={item.exam?.duration_minutes ? `${item.exam.duration_minutes} minutes` : VERIFY_TEXT}
                    />
                    <MobileDetail label="Delivery method" value={displayValue(item.exam?.delivery_method)} />
                    <MobileDetail label="Price" value={displayValue(item.exam?.price_text)} />
                    <MobileDetail
                      label="Renewal"
                      value={renewalParts.length ? renewalParts.join(" · ") : VERIFY_TEXT}
                    />
                    <MobileDetail label="Last verified" value={formatDate(item.last_verified_date)} />
                  </dl>
                  {item.official_certification_url ? (
                    <a
                      href={item.official_certification_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-600"
                    >
                      Official source <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="mt-5 text-sm text-slate-600">Official link: {VERIFY_TEXT}</p>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      ) : (
        <Card className="mt-10 text-center">
          <h2 className="text-xl font-bold text-slate-950">Start your comparison</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Add at least one certification above. Select two or three to see meaningful side-by-side differences.
          </p>
        </Card>
      )}

      {guidance.length ? (
        <section aria-labelledby="guidance-heading" className="mt-10">
          <Card className="border-blue-200 bg-blue-50/60">
            <h2 id="guidance-heading" className="text-xl font-bold text-slate-950">
              Which should I choose?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use these neutral observations as prompts, not as a ranking. They are based only on attributes stored in Badgely.
            </p>
            <ul className="mt-4 space-y-3 text-slate-700">
              {guidance.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Certifications can support learning and job readiness, but they do not guarantee employment or a particular salary outcome.
            </p>
          </Card>
        </section>
      ) : null}
    </main>
  );
}

function ComparisonRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <th className="px-5 py-4 text-sm font-semibold text-slate-600 align-top">{label}</th>
      {values.map((value, index) => (
        <td key={`${label}-${index}`} className="px-5 py-4 text-sm leading-6 text-slate-700 align-top">
          {value}
        </td>
      ))}
    </tr>
  );
}

function MobileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-slate-800">{value}</dd>
    </div>
  );
}
