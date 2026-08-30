import type { Metadata } from "next";

const description =
  "Explore IT certifications across cloud, cybersecurity, networking, Linux, data, and other career areas with searchable, role-focused guidance.";

export const metadata: Metadata = {
  title: "IT Certifications",
  description,
  openGraph: {
    title: "IT Certifications | Badgely",
    description,
  },
  twitter: {
    card: "summary",
    title: "IT Certifications | Badgely",
    description,
  },
};

export default function CertificationsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
