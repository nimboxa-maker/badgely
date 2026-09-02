import type { Metadata } from "next";

const description =
  "Browse curated IT certification books, study guides, practice resources, and learning material from trusted publishers and training providers.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/study-store",
  },
  openGraph: {
    title: "IT Certification Study Resources | Badgely",
    description,
    url: "/study-store",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Certification Study Resources | Badgely",
    description,
  },
};

export default function StudyStoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
