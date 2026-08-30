import Link from "next/link";
import { differenceInCalendarDays, format, subDays } from "date-fns";
import { ArrowLeft, Pencil, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminReviewQueuePageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    status?: string;
  }>;
};

type ProviderRef = {
  name: string;
} | null;

type CertificationRef = {
  name: string;
  providers: ProviderRef;
} | null;

type ReviewRecord = {
  key: string;
  id: string;
  recordType: "Certification" | "Exam" | "Renewal policy" | "Resource";
  title: string;
  context: string;
  provider: string;
  lastVerifiedDate: string | null;
  editHref: string;
};

type CertificationRow = {
  id: string;
  name: string;
  last_verified_date: string | null;
  providers: ProviderRef;
};

type ExamRow = {
  id: string;
  exam_name: string | null;
  exam_code: string | null;
  last_verified_date: string | null;
  certifications: CertificationRef;
};

type RenewalPolicyRow = {
  id: string;
  validity_period_text: string | null;
  last_verified_date: string | null;
  certifications: CertificationRef;
};

type ResourceRow = {
  id: string;
  title: string;
  resource_type: string;
  last_verified_date: string | null;
  certifications: CertificationRef;
};

const recordTypes = ["Certification", "Exam", "Renewal policy", "Resource"] as const;

function providerName(certification: CertificationRef) {
  return certification?.providers?.name ?? "Provider unavailable";
}

function reviewStatus(date: string | null) {
  return date ? "Overdue" : "Never verified";
}

function daysSinceVerification(date: string | null) {
  if (!date) {
    return null;
  }

  return differenceInCalendarDays(new Date(), new Date(`${date}T00:00:00`));
}

export default async function AdminReviewQueuePage({
  searchParams,
}: AdminReviewQueuePageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const recordType = params.type?.trim() || "all";
  const status = params.status?.trim() || "all";
  const reviewThreshold = format(subDays(new Date(), 90), "yyyy-MM-dd");

  const [certificationsResult, examsResult, renewalPoliciesResult, resourcesResult] =
    await Promise.all([
      supabase
        .from("certifications")
        .select("id, name, last_verified_date, providers(name)")
        .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
      supabase
        .from("exams")
        .select(
          "id, exam_name, exam_code, last_verified_date, certifications(name, providers(name))",
        )
        .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
      supabase
        .from("renewal_policies")
        .select(
          "id, validity_period_text, last_verified_date, certifications(name, providers(name))",
        )
        .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
      supabase
        .from("resources")
        .select(
          "id, title, resource_type, last_verified_date, certifications(name, providers(name))",
        )
        .or(`last_verified_date.is.null,last_verified_date.lt.${reviewThreshold}`),
    ]);

  const results = [certificationsResult, examsResult, renewalPoliciesResult, resourcesResult];

  if (results.some((result) => result.error)) {
    throw new Error("Unable to load the admin review queue.");
  }

  const certificationRecords = (
    (certificationsResult.data ?? []) as unknown as CertificationRow[]
  ).map<ReviewRecord>((certification) => ({
    key: `certification-${certification.id}`,
    id: certification.id,
    recordType: "Certification",
    title: certification.name,
    context: "Certification record",
    provider: certification.providers?.name ?? "Provider unavailable",
    lastVerifiedDate: certification.last_verified_date,
    editHref: `/admin/certifications/${certification.id}/edit`,
  }));

  const examRecords = ((examsResult.data ?? []) as unknown as ExamRow[]).map<ReviewRecord>(
    (exam) => ({
      key: `exam-${exam.id}`,
      id: exam.id,
      recordType: "Exam",
      title: exam.exam_name || exam.exam_code || "Unnamed exam",
      context: exam.certifications?.name ?? "Certification unavailable",
      provider: providerName(exam.certifications),
      lastVerifiedDate: exam.last_verified_date,
      editHref: `/admin/exams/${exam.id}/edit`,
    }),
  );

  const renewalRecords = (
    (renewalPoliciesResult.data ?? []) as unknown as RenewalPolicyRow[]
  ).map<ReviewRecord>((policy) => ({
    key: `renewal-${policy.id}`,
    id: policy.id,
    recordType: "Renewal policy",
    title: `${policy.certifications?.name ?? "Certification unavailable"} renewal policy`,
    context: policy.validity_period_text || "Validity period not recorded",
    provider: providerName(policy.certifications),
    lastVerifiedDate: policy.last_verified_date,
    editHref: `/admin/renewal-policies/${policy.id}/edit`,
  }));

  const resourceRecords = (
    (resourcesResult.data ?? []) as unknown as ResourceRow[]
  ).map<ReviewRecord>((resource) => ({
    key: `resource-${resource.id}`,
    id: resource.id,
    recordType: "Resource",
    title: resource.title,
    context: `${resource.certifications?.name ?? "Certification unavailable"} · ${resource.resource_type}`,
    provider: providerName(resource.certifications),
    lastVerifiedDate: resource.last_verified_date,
    editHref: `/admin/resources/${resource.id}/edit`,
  }));

  const allRecords = [
    ...certificationRecords,
    ...examRecords,
    ...renewalRecords,
    ...resourceRecords,
  ].sort((a, b) => {
    if (!a.lastVerifiedDate && b.lastVerifiedDate) return -1;
    if (a.lastVerifiedDate && !b.lastVerifiedDate) return 1;
    if (!a.lastVerifiedDate && !b.lastVerifiedDate) return a.title.localeCompare(b.title);
    return (a.lastVerifiedDate ?? "").localeCompare(b.lastVerifiedDate ?? "");
  });

  const records = allRecords.filter((record) => {
    const searchable = [record.title, record.context, record.provider, record.recordType]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesType = recordType === "all" || record.recordType === recordType;
    const recordStatus = reviewStatus(record.lastVerifiedDate);
    const matchesStatus = status === "all" || recordStatus === status;

    return matchesQuery && matchesType && matchesStatus;
  });

  const neverVerifiedCount = allRecords.filter((record) => !record.lastVerifiedDate).length;
  const overdueCount = allRecords.length - neverVerifiedCount;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to admin
      </Link>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Admin · Review queue
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Needs Review
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Review records with no verification date or a last verification date older than 90 days.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xl font-bold text-slate-950">{allRecords.length}</p>
            <p className="text-xs font-semibold text-slate-500">Total</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xl font-bold text-slate-950">{neverVerifiedCount}</p>
            <p className="text-xs font-semibold text-slate-500">Never verified</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xl font-bold text-slate-950">{overdueCount}</p>
            <p className="text-xs font-semibold text-slate-500">Overdue</p>
          </div>
        </div>
      </div>

      <Card className="mt-8">
        <form className="grid gap-4 xl:grid-cols-[1fr_220px_220px_auto]" method="get">
          <div>
            <label htmlFor="review-search" className="text-sm font-semibold text-slate-700">
              Search review queue
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="review-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Certification, provider, exam, or resource"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="review-type" className="text-sm font-semibold text-slate-700">
              Record type
            </label>
            <select
              id="review-type"
              name="type"
              defaultValue={recordType}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All record types</option>
              {recordTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="review-status" className="text-sm font-semibold text-slate-700">
              Review status
            </label>
            <select
              id="review-status"
              name="status"
              defaultValue={status}
              className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All review statuses</option>
              <option value="Never verified">Never verified</option>
              <option value="Overdue">Overdue</option>
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

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Showing <span className="font-bold text-slate-950">{records.length}</span> of{" "}
          <span className="font-bold text-slate-950">{allRecords.length}</span> records needing review
        </p>
        {(query || recordType !== "all" || status !== "all") && (
          <Link
            href="/admin/review-queue"
            className="text-sm font-semibold text-blue-700 hover:text-blue-600"
          >
            Clear filters
          </Link>
        )}
      </div>

      {records.length ? (
        <section className="mt-4 grid gap-4 md:grid-cols-2" aria-label="Records needing review">
          {records.map((record) => {
            const days = daysSinceVerification(record.lastVerifiedDate);

            return (
              <Card key={record.key}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                      {record.recordType}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-slate-950">{record.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{record.context}</p>
                  </div>
                  <Badge>{reviewStatus(record.lastVerifiedDate)}</Badge>
                </div>

                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-slate-500">Provider</dt>
                    <dd className="mt-1 text-slate-900">{record.provider}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Last verified</dt>
                    <dd className="mt-1 text-slate-900">
                      {record.lastVerifiedDate
                        ? format(new Date(`${record.lastVerifiedDate}T00:00:00`), "MMM d, yyyy")
                        : "Never"}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-slate-600">
                  {days === null
                    ? "This record has never been marked as verified."
                    : `${days} days since the last verification.`}
                </p>

                <Link
                  href={record.editHref}
                  className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  Review and edit
                </Link>
              </Card>
            );
          })}
        </section>
      ) : (
        <Card className="mt-4">
          <h2 className="text-lg font-bold text-slate-950">No review records match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the filters or choose a different record type or review status.
          </p>
        </Card>
      )}
    </main>
  );
}
