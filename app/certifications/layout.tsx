import type { Metadata } from "next";

const description =
  "Explore IT certifications across cybersecurity, cloud, networking, Linux, data, project management, and more with verified exam and career guidance.";

export const metadata: Metadata = {
  title: "IT Certifications Directory | Badgely",
  description,
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: "IT Certifications Directory | Badgely",
    description,
    url: "/certifications",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Certifications Directory | Badgely",
    description,
  },
};

export default function CertificationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
