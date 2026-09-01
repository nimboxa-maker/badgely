import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const siteDescription =
  "Explore IT certifications, compare options, follow career roadmaps, and build a practical study plan.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Badgely",
  title: {
    default: "Badgely | IT certification paths made clearer",
    template: "%s | Badgely",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Badgely",
    title: "Badgely | IT certification paths made clearer",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "Badgely | IT certification paths made clearer",
    description: siteDescription,
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