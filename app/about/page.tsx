import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Learn about AimToCert and our mission to help people discover, understand, and pursue IT certifications with confidence.";

export const metadata: Metadata = {
  title: "About AimToCert | IT Certification Guidance",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About AimToCert | IT Certification Guidance",
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About AimToCert | IT Certification Guidance",
    description,
  },
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-[linear-gradient(135deg,#0b2d77_0%,#123fb8_55%,#153d9d_100%)] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            About AimToCert
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your guide to the world of certifications.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            AimToCert is an independent educational resource built to make the
            IT certification journey easier to understand, easier to plan, and
            easier to navigate.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Why AimToCert exists
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              The IT certification world can be confusing. Candidates often
              have to search across multiple websites to understand exam
              requirements, costs, certification paths, study resources,
              renewal policies, testing providers, and career options.
              AimToCert brings that information together in one place so
              learners can spend less time searching and more time moving
              forward.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              What we help you do
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Learn It
                </p>

                <h3 className="mt-2 text-lg font-bold text-slate-950">
                  Understand the path
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Explore certifications, exam objectives, requirements,
                  providers, study resources, and career paths.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Earn It
                </p>

                <h3 className="mt-2 text-lg font-bold text-slate-950">
                  Prepare with purpose
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Compare options, understand testing and proctoring details,
                  and make better-informed certification decisions.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Prove It
                </p>

                <h3 className="mt-2 text-lg font-bold text-slate-950">
                  Turn credentials into progress
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Use your certification journey as a foundation for practical
                  skills, professional growth, and future opportunities.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Independent by design
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert is not a certification provider and does not issue
              credentials. We are an independent educational platform designed
              to organize useful certification information and help users make
              informed decisions.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Certification names, trademarks, logos, exam policies, pricing,
              and requirements belong to their respective organizations and may
              change over time. Users should always confirm important details
              with the official certification provider before registering for
              an exam or making a purchase.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">
              Questions or feedback?
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-700">
              We welcome feedback, corrections, suggestions, and questions that
              can help make AimToCert more useful.
            </p>

            <a
              href="mailto:team@AimToCert.com"
              className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              team@AimToCert.com
            </a>

            <div className="mt-5">
              <Link
                href="/certifications"
                className="text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Explore certifications →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}