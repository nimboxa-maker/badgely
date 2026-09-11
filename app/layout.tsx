import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const siteDescription =
  "Your guide to the world of certifications. Explore IT certifications, career paths, study resources, exams, requirements, costs, and renewal details in one place.";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aimtocert.com"
).replace(/\/$/, "");

const socialImageUrl = `${siteUrl}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "AimToCert",

  title: "AimToCert | Your guide to the world of certifications.",

  description: siteDescription,

  icons: {
    icon: "/brand/AimToCert-icon.png",
    shortcut: "/brand/AimToCert-icon.png",
    apple: "/brand/AimToCert-icon.png",
  },

  openGraph: {
    type: "website",
    siteName: "AimToCert",
    url: siteUrl,
    title: "AimToCert | Your guide to the world of certifications.",
    description: siteDescription,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "AimToCert — Your guide to the world of certifications.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AimToCert | Your guide to the world of certifications.",
    description: siteDescription,
    images: [socialImageUrl],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AimToCert",
  url: siteUrl,
  logo: `${siteUrl}/brand/AimToCert-logo-v2.png`,
  description: siteDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AimToCert",
  url: siteUrl,
  description: siteDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/certifications?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          {...{
            name: "impact-site-verification",
            value: "35d5e660-9b71-4e05-bdca-89cb01b788c0",
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-white px-4 py-3 font-semibold text-slate-950 shadow-lg ring-2 ring-blue-600 transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}