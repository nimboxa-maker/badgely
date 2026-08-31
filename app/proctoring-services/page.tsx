import type { Metadata } from "next";
import { ArrowRight, Building2, CheckCircle2, Globe2, Monitor, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Proctoring Services | Badgely",
  description:
    "Understand which testing providers deliver certification exams, how delivery options differ, and why exam vendors, voucher sellers, and proctoring providers are not the same thing.",
};

const providerMappings = [
  {
    examOwner: "ISACA",
    exams: "CISA, CISM, CRISC, CGEIT, CDPSE and other ISACA certification exams",
    testingProvider: "PSI",
    delivery: ["Authorized PSI test centers", "PSI remote proctoring"],
    note: "ISACA candidates schedule certification exams through the PSI exam-delivery system.",
    verified: "2026",
  },
];

const roles = [
  {
    icon: Building2,
    title: "Exam owner / certification vendor",
    description:
      "Creates and governs the certification, exam objectives, eligibility rules, scoring policy, and credential requirements.",
    example: "Example: ISACA owns CISA and CISM.",
  },
  {
    icon: Monitor,
    title: "Testing / proctoring provider",
    description:
      "Actually delivers the exam in a test center or through an approved remote-proctoring platform.",
    example: "Example: PSI delivers ISACA certification exams.",
  },
  {
    icon: ShoppingCart,
    title: "Voucher seller / marketplace",
    description:
      "May sell an exam voucher or list an exam in a catalog without being the organization that actually administers the test.",
    example: "A catalog listing alone does not identify the exam proctor.",
  },
];

export default function ProctoringServicesPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              Exam delivery guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Know who actually proctors your certification exam.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Certification brands, voucher sellers, and testing providers can all appear during the
              same exam journey. Badgely separates those roles so you know where the exam is really
              delivered and whether in-person or remote testing is available.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <p className="text-sm font-semibold text-blue-300">The key distinction</p>
            <div className="mt-5 grid gap-3 text-sm sm:text-base">
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="font-semibold text-white">Exam vendor</span>
                <span className="mx-2 text-slate-500">≠</span>
                <span className="text-slate-300">testing provider</span>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="font-semibold text-white">Voucher seller</span>
                <span className="mx-2 text-slate-500">≠</span>
                <span className="text-slate-300">testing provider</span>
              </div>
              <div className="rounded-2xl bg-blue-600 p-4 font-semibold text-white">
                Always verify the actual exam-delivery provider before scheduling.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Verified mapping
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Certification exam delivery providers
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            We list the organization that owns the certification separately from the company that
            actually administers or remotely proctors the exam.
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          {providerMappings.map((mapping) => (
            <Card key={mapping.examOwner} className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="bg-slate-50 p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Exam owner
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-950">{mapping.examOwner}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{mapping.exams}</p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
                        Actual testing provider
                      </p>
                      <p className="mt-2 text-3xl font-bold text-slate-950">
                        {mapping.testingProvider}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      Verified {mapping.verified}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {mapping.delivery.map((delivery) => (
                      <div
                        key={delivery}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
                      >
                        {delivery.toLowerCase().includes("remote") ? (
                          <Globe2 className="mt-0.5 size-5 shrink-0 text-blue-600" aria-hidden="true" />
                        ) : (
                          <Building2
                            className="mt-0.5 size-5 shrink-0 text-blue-600"
                            aria-hidden="true"
                          />
                        )}
                        <span className="font-medium text-slate-800">{delivery}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 leading-7 text-slate-600">{mapping.note}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              How to read the ecosystem
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Three roles that are easy to confuse
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {roles.map(({ icon: Icon, title, description, example }) => (
              <Card key={title} className="h-full">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm font-medium text-slate-700">
                  {example}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="border-blue-200 bg-blue-50">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                Before exam day
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Confirm the provider on the certification owner&apos;s official scheduling page.
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Testing relationships can change. Badgely will show the latest verified mapping we
                have, but candidates should still confirm the provider, delivery format, ID rules,
                technical requirements, and appointment details before purchasing or scheduling.
              </p>
            </div>
            <a
              href="https://www.isaca.org/credentialing/exam-candidate-guides"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              ISACA exam guidance
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Card>
      </section>
    </main>
  );
}
