import type { Metadata } from "next";

const description =
  "Explore IT career paths for cloud, cybersecurity, networking, DevOps, support, GRC, and more with recommended certifications and practical next steps.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/career-paths",
  },
  openGraph: {
    title: "IT Career Paths & Certification Roadmaps | Badgely",
    description,
    url: "/career-paths",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Career Paths & Certification Roadmaps | Badgely",
    description,
  },
};

export default function CareerPathsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
