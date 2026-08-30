import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const siteDescription =
  "Explore IT certifications, compare options, follow career roadmaps, and build a practical study plan.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
