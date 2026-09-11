import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | AimToCert",
  description:
    "Learn how AimToCert uses affiliate links and may earn commissions from qualifying purchases made through selected third-party links.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
  openGraph: {
    title: "Affiliate Disclosure | AimToCert",
    description:
      "Learn how AimToCert uses affiliate links and may earn commissions from qualifying purchases made through selected third-party links.",
    url: "/affiliate-disclosure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Disclosure | AimToCert",
    description:
      "Learn how AimToCert uses affiliate links and may earn commissions from qualifying purchases made through selected third-party links.",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-[linear-gradient(135deg,#0b2d77_0%,#123fb8_55%,#153d9d_100%)] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Transparency
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Affiliate Disclosure
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            AimToCert may earn a commission when you purchase certain products
            or services through affiliate links on this website.
          </p>

          <p className="mt-3 text-sm text-blue-200">
            Last updated: September 11, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              How affiliate links work
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Some links on AimToCert may be affiliate links. If you click one
              of these links and make a qualifying purchase, AimToCert may
              receive a commission from the third-party provider.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              This generally does not increase the price you pay unless the
              third-party provider specifically states otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Why we use affiliate links
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Affiliate commissions can help support the operation and
              maintenance of AimToCert, including website hosting, research,
              content development, and continued improvements to our
              certification resources.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Our editorial approach
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert is an independent educational resource. Affiliate
              relationships do not guarantee that a product, course, service,
              or provider will be recommended or featured.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Our goal is to provide useful certification information and help
              users evaluate available options. Users should independently
              determine whether a product or service is appropriate for their
              needs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Third-party products and services
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Products, courses, exam vouchers, study materials, training
              services, and other offerings linked from AimToCert are provided
              by independent third parties.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not control third-party pricing, availability,
              refund policies, guarantees, terms, privacy practices, or product
              changes.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Before purchasing or registering for a certification-related
              product or service, you should review the current information
              provided by the seller or official certification provider.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Affiliate networks and partners
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert may participate in affiliate programs operated by
              merchants, training providers, publishers, marketplaces,
              certification-related companies, or affiliate networks.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              These relationships may change over time as programs are added,
              removed, or updated.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Identifying affiliate links
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Where appropriate, AimToCert may identify affiliate or sponsored
              relationships near links, recommendations, product listings, or
              other commercial content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Questions
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If you have questions about AimToCert&apos;s affiliate
              relationships or this disclosure, contact:
            </p>

            <a
              href="mailto:team@AimToCert.com"
              className="mt-4 inline-flex text-base font-semibold text-blue-700 hover:text-blue-900"
            >
              team@AimToCert.com
            </a>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-sm leading-6 text-slate-700">
              AimToCert&apos;s goal is to be transparent about commercial
              relationships while continuing to provide useful, independent
              certification guidance.
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/terms"
                className="text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Read our Terms and Conditions →
              </Link>

              <Link
                href="/privacy"
                className="text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Read our Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}