import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Settings | AimToCert",
  description:
    "Learn how AimToCert uses essential cookies and how to manage cookies in your browser.",
  alternates: {
    canonical: "/cookie-settings",
  },
  openGraph: {
    title: "Cookie Settings | AimToCert",
    description:
      "Learn how AimToCert uses essential cookies and how to manage cookies in your browser.",
    url: "/cookie-settings",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Settings | AimToCert",
    description:
      "Learn how AimToCert uses essential cookies and how to manage cookies in your browser.",
  },
};

export default function CookieSettingsPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-[linear-gradient(135deg,#0b2d77_0%,#123fb8_55%,#153d9d_100%)] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Privacy Controls
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Cookie Settings
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            AimToCert is designed to use as little tracking as possible. We do
            not currently use advertising or behavioral-tracking cookies on our
            website.
          </p>

          <p className="mt-3 text-sm text-blue-200">
            Last updated: September 6, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              Current AimToCert setting
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Essential cookies only
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert does not currently use optional advertising,
              behavioral profiling, or marketing cookies on its own website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Essential cookies
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Essential cookies are small pieces of information that may be
              required for a website or its supporting infrastructure to
              function properly.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              They may support functions such as security, page delivery,
              session handling, fraud prevention, or other technical
              operations. Because these cookies may be necessary for the site
              to work, they generally cannot be disabled through an AimToCert
              preference control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Analytics cookies
            </h2>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-slate-950">Analytics</p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    AimToCert does not currently use optional analytics
                    cookies.
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Not in use
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Advertising and marketing cookies
            </h2>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-slate-950">
                    Advertising and behavioral tracking
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    AimToCert does not currently use advertising or
                    behavioral-tracking cookies on its own website.
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Not in use
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Affiliate and external links
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              AimToCert may contain affiliate links or links to external
              certification providers, course platforms, testing providers,
              marketplaces, or other third-party websites.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              When you click an external link, the destination website may use
              its own cookies or tracking technologies. Those cookies are
              controlled by the third party, not by AimToCert.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              You should review the privacy and cookie policies of those
              websites if you want to understand how they use cookies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Managing cookies in your browser
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Most web browsers allow you to view, block, delete, or restrict
              cookies through their privacy or site settings.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Blocking all cookies may affect websites that depend on essential
              cookies for security or core functionality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              If our cookie practices change
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If AimToCert introduces optional analytics, advertising,
              personalization, or other non-essential cookies in the future,
              this page and our Privacy Policy will be updated.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Where appropriate, we will also provide users with relevant
              choices before optional cookies are used.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Questions about cookies
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              If you have a question about AimToCert&apos;s cookie practices,
              contact:
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
              AimToCert&apos;s current approach is simple: use only the
              technical functionality needed to operate the site and avoid
              optional tracking unless a future feature genuinely requires it.
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