import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Search } from "lucide-react";
import { DeleteExamButton } from "@/app/admin/exams/delete-exam-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/require-admin";

type AdminExamsPageProps = {
  searchParams: Promise<{
    q?: string;
    certification?: string;
  }>;
};

type ExamRow = {
  id: string;
  exam_name: string | null;
  exam_code: string | null;
  number_of_exams: number | null;
  duration_minutes: number | null;
  question_count_text: string | null;
  delivery_method: string | null;
  price_text: string | null;
  registration_url: string | null;
  notes: string | null;
  last_verified_date: string | null;
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

function verifiedLabel(value: string | null) {
  if (!value) {
    return "Not verified";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function AdminExamsPage({ searchParams }: AdminExamsPageProps) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const certification = params.certification?.trim() || "all";

  const { data, error } = await supabase
    .from("exams")
    .select(
      "id, exam_name, exam_code, number_of_exams, duration_minutes, question_count_text, delivery_method, price_text, registration_url, notes, last_verified_date, certifications(id, name, slug, status, providers(name))",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load exams for administration.");
  }

  const allExams = (data ?? []) as unknown as ExamRow[];
  const certificationOptions = [
    ...new Map(
      allExams
        .filter((exam) => exam.certifications)
        .map((exam) => [
          exam.certifications!.slug,
          `${exam.certifications!.providers?.name ?? "Unknown provider"} · ${exam.certifications!.name}`,
        ]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  const exams = allExams.filter((exam) => {
    const searchable = [
      exam.exam_name ?? "",
      exam.exam_code ?? "",
      exam.delivery_method ?? "",
      exam.price_text ?? "",
      exam.notes ?? "",
      exam.certifications?.name ?? "",
      exam.certifications?.providers?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesCertification =
      certification === "all" || exam.certifications?.slug === certification;

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
          Admin · Exams
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">Exam records</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Search exam records, review delivery details, and inspect verification dates before making catalog changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/admin/exams/new"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add exam
            </Link>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Showing <span className="font-bold text-slate-950">{exams.length}</span> of{" "}
              <span className="font-bold text-slate-950">{allExams.length}</span> exams
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_320px_auto]" method="get">
          <div>
            <label htmlFor="exam-search" className="text-sm font-semibold text-slate-700">
              Search exams
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="exam-search"
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Exam name, code, certification, provider, or delivery method"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="exam-certification" className="text-sm font-semibold text-slate-700">
              Certification
            </label>
            <select
              id="exam-certification"
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

      {exams.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Exam records">
          {exams.map((exam) => {
            const examLabel = exam.exam_name || exam.exam_code || "this exam";

            return (
              <Card key={exam.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">
                      {exam.exam_name || exam.exam_code || "Unnamed exam"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {exam.exam_code || "No exam code"}
                    </p>
                  </div>
                  {exam.certifications ? <Badge>{exam.certifications.status}</Badge> : null}
                </div>

                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-slate-500">Certification</dt>
                    <dd className="mt-1 text-slate-900">
                      {exam.certifications
                        ? `${exam.certifications.providers?.name ?? "Unknown provider"} · ${exam.certifications.name}`
                        : "Certification unavailable"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Duration</dt>
                    <dd className="mt-1 text-slate-900">
                      {exam.duration_minutes ? `${exam.duration_minutes} minutes` : "Not set"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Questions</dt>
                    <dd className="mt-1 text-slate-900">{exam.question_count_text || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Delivery</dt>
                    <dd className="mt-1 text-slate-900">{exam.delivery_method || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Price</dt>
                    <dd className="mt-1 text-slate-900">{exam.price_text || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Number of exams</dt>
                    <dd className="mt-1 text-slate-900">{exam.number_of_exams ?? "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Last verified</dt>
                    <dd className="mt-1 text-slate-900">{verifiedLabel(exam.last_verified_date)}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/admin/exams/${exam.id}/edit`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    <Pencil className="size-4" aria-hidden="true" />
                    Edit exam
                  </Link>
                  <DeleteExamButton examId={exam.id} examLabel={examLabel} />
                </div>
              </Card>
            );
          })}
        </section>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-950">No exams match these filters</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear the search or choose a different certification filter.
          </p>
          <Link
            href="/admin/exams"
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </Link>
        </Card>
      )}
    </main>
  );
}
