import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Learn how AimToCert approaches privacy, limited technical data, email communications, cookies, and third-party services.";

export const metadata: Metadata = {
  title: "Privacy Policy | AimToCert",
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | AimToCert",
    description,
    url: "/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | AimToCert",
    description,
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-[linear-gradient(135deg,#0b2d77_0%,#123fb8_55%,#153d9d_100%)] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Privacy
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            AimToCert is designed to be a low-data website. We do not
            intentionally collect or maintain user profiles or personal
            information simply because someone visits the site.
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
              1. Our privacy approach
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert is intended to provide educational information about IT
              certifications without requiring visitors to provide personal
              information.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              You can browse AimToCert without creating a profile, submitting
              personal information, or providing us with your name or email
              address.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              2. Information we do not intentionally collect
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not currently intend to collect or maintain user
              profiles, mailing lists, payment information, demographic
              profiles, browsing histories tied to individual users, or other
              personal information for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              3. Information you voluntarily send to us
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If you contact AimToCert by email, we will receive the email
              address you use and any information you choose to include in your
              message.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              That information may remain within our email service as part of
              the normal communication process. We use it only as reasonably
              necessary to respond to your message, address a question, review
              feedback, or handle a related request.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              4. Basic technical information
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Like most websites, the infrastructure used to host and protect
              AimToCert may automatically process limited technical information
              when a visitor requests a page.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              This can include information such as an IP address, browser type,
              device information, request time, requested page, and other
              standard server or security logs.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              This technical processing may be necessary to deliver the website,
              detect abuse, maintain security, diagnose technical problems, and
              operate the service reliably.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">5. Cookies</h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not currently intend to use advertising or
              behavioral-tracking cookies on its own website.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Essential or technical cookies may still be used if they are
              required by the website, hosting platform, security tools, or
              other core functionality.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If AimToCert later introduces optional analytics, advertising, or
              other non-essential cookies, this policy and the Cookie Settings
              page will be updated accordingly.
            </p>

            <Link
              href="/cookie-settings"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Review Cookie Settings →
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              6. Affiliate links
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert may contain affiliate links to third-party websites,
              courses, products, certification providers, or other services.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              When you follow an affiliate or external link, the destination
              website may collect information or use cookies according to its
              own privacy policy and tracking practices.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not control the privacy practices, cookies, or
              technologies used by third-party websites.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              7. Third-party services
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert may rely on third-party companies for services such as
              website hosting, security, domain services, email, database
              infrastructure, or other technical functions.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Those providers may process limited technical information as
              necessary to provide their services and are responsible for their
              own privacy and security practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              8. We do not sell personal information
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not sell personal information to advertisers, data
              brokers, or other third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              9. Data retention
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Because AimToCert does not currently intend to maintain user
              profiles or personal-data databases, we do not maintain a general
              user-data retention program.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Limited information may still be retained within normal email,
              hosting, security, backup, or technical systems for operational,
              security, legal, or troubleshooting purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              10. External websites
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert contains links to external websites. Once you leave
              AimToCert, the privacy policy and terms of the destination website
              apply.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              We encourage users to review the privacy practices of any
              third-party website before providing personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              11. Changes to this Privacy Policy
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert may add new features or services in the future. If our
              data practices materially change, this Privacy Policy will be
              updated to explain those changes.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              The latest version of the policy will be posted on this page with
              a revised update date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              12. Contact us
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If you have a question about privacy or believe information
              associated with you should be reviewed, contact:
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
              AimToCert&apos;s current goal is to minimize the amount of
              personal information it handles. If the website later introduces
              accounts, analytics, newsletters, payments, or other features that
              change that approach, this policy will be updated before those
              practices are represented as part of the service.
            </p>

            <Link
              href="/terms"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Read our Terms and Conditions →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
