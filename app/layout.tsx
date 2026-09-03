import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const siteDescription =
  "Compare IT certifications, explore career roadmaps, find study resources, and review exams, requirements, costs, and renewal details in one place.";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://badgely-alpha.vercel.app").replace(/\/$/, "");
const socialImageUrl = `${siteUrl}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Badgely",
  title: "Badgely | IT Certifications, Career Paths & Study Resources",
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Badgely",
    url: siteUrl,
    title: "Badgely | IT Certifications, Career Paths & Study Resources",
    description: siteDescription,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Badgely — IT certifications, career paths, and study resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badgely | IT Certifications, Career Paths & Study Resources",
    description: siteDescription,
    images: [socialImageUrl],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Badgely",
  url: siteUrl,
  logo: `${siteUrl}/brand/badgely-logo.png`,
  description: siteDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Badgely",
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
}: Readonly<{ children: React.ReactNode }>) {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
