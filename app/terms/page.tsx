import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Review the terms and conditions that govern use of the AimToCert website and its educational certification resources.";

export const metadata: Metadata = {
  title: "Terms and Conditions | AimToCert",
  description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms and Conditions | AimToCert",
    description,
    url: "/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | AimToCert",
    description,
  },
};

export default function TermsPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-[linear-gradient(135deg,#0b2d77_0%,#123fb8_55%,#153d9d_100%)] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms and Conditions
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            These Terms and Conditions explain the rules for using AimToCert
            and the information, resources, and services available through this
            website.
          </p>

          <p className="mt-3 text-sm text-blue-200">
            Last updated: September 6, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              1. Acceptance of these terms
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              By accessing or using AimToCert, you agree to these Terms and
              Conditions. If you do not agree with these terms, you should not
              use the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              2. Educational purpose
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert is an independent educational resource designed to
              help users research and understand IT certifications, career
              paths, study resources, exam providers, testing options, renewal
              requirements, and related topics.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Information on AimToCert is provided for general educational and
              informational purposes only. It should not be treated as official
              guidance from any certification provider, testing organization,
              employer, school, or government agency.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              3. Accuracy of information
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              We work to keep AimToCert useful and accurate, but certification
              programs change frequently. Exam numbers, prices, prerequisites,
              testing providers, renewal requirements, policies, and other
              details may change without notice.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Before registering for an exam, purchasing a product, or making
              an important certification decision, you should confirm the
              latest information directly with the official certification or
              testing provider.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              4. No guarantee of certification or career outcomes
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not guarantee that use of the website, study
              resources, courses, guides, or recommendations will result in
              passing an exam, earning a certification, receiving employment,
              receiving a promotion, or achieving any other professional or
              financial outcome.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              5. Third-party websites and services
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert may link to websites, products, courses, testing
              providers, certification vendors, marketplaces, and other
              third-party services. These third parties operate independently
              from AimToCert.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              We are not responsible for the availability, accuracy, security,
              privacy practices, pricing, policies, or content of third-party
              websites or services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              6. Affiliate links and commercial relationships
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Some links on AimToCert may be affiliate links. If you make a
              qualifying purchase through one of those links, AimToCert may
              receive a commission at no additional cost to you.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Affiliate relationships do not change the price you pay unless a
              third-party provider specifically states otherwise. AimToCert
              aims to clearly identify commercial relationships where
              appropriate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              7. Intellectual property
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Unless otherwise stated, the original written content, website
              design, branding, organization, and other original materials on
              AimToCert are owned by or licensed to AimToCert and may not be
              copied, reproduced, republished, or redistributed without
              permission, except where allowed by law.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Certification names, exam names, product names, logos, trademarks,
              and other third-party intellectual property belong to their
              respective owners. Their appearance on AimToCert does not imply
              endorsement or sponsorship.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              8. Acceptable use
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              You agree not to misuse AimToCert, interfere with the website,
              attempt unauthorized access, distribute malicious software, use
              automated systems in a way that disrupts the service, or use the
              website for unlawful purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              9. Availability of the website
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              We may update, change, suspend, or discontinue any part of
              AimToCert at any time. We do not guarantee that the website or
              any particular feature will always be available or error-free.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              10. Limitation of liability
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              To the fullest extent permitted by applicable law, AimToCert and
              its operators will not be liable for losses or damages resulting
              from reliance on information presented on the website, use of
              third-party services, interruptions in website availability, or
              decisions made based on AimToCert content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              11. Changes to these terms
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              We may update these Terms and Conditions from time to time. When
              changes are made, the updated version will be posted on this page
              with a revised effective date.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Continued use of AimToCert after updated terms are posted means
              you accept the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              12. Contact us
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If you have questions about these Terms and Conditions, contact:
            </p>

            <a
              href="mailto:nimboxa@gmail.com"
              className="mt-4 inline-flex text-base font-semibold text-blue-700 hover:text-blue-900"
            >
              nimboxa@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-sm leading-6 text-slate-700">
              These terms are intended to provide clear website-use rules for
              AimToCert. They are not a substitute for legal advice tailored
              to a specific business or jurisdiction.
            </p>

            <Link
              href="/privacy"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Read our Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
