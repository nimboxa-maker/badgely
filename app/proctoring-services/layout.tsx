import type { Metadata } from "next";

const description =
  "Find the testing and proctoring providers used by major IT certification programs, including Pearson VUE, PSI, PeopleCert, Certiport, Red Hat, and Prometric.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/proctoring-services",
  },
  openGraph: {
    title: "IT Certification Proctoring Services | Badgely",
    description,
    url: "/proctoring-services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Certification Proctoring Services | Badgely",
    description,
  },
};

export default function ProctoringServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
