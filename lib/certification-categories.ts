export type CertificationCategory = {
  name: string;
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
};

export const certificationCategories: CertificationCategory[] = [
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity Certifications & Career Credentials | Badgely",
    description: "Explore cybersecurity certifications for beginners through advanced professionals, including security operations, penetration testing, cloud security, GRC, and leadership credentials.",
    eyebrow: "Cybersecurity certifications",
    intro: "Explore security credentials across foundational cybersecurity, SOC operations, penetration testing, cloud security, governance, and advanced security leadership.",
  },
  {
    name: "Cloud",
    slug: "cloud",
    title: "Cloud Certifications for AWS, Azure & Google Cloud | Badgely",
    description: "Explore cloud certifications across AWS, Microsoft Azure, Google Cloud, and vendor-neutral cloud skills, from fundamentals through advanced architecture.",
    eyebrow: "Cloud certifications",
    intro: "Compare cloud credentials for fundamentals, administration, architecture, security, and multi-cloud career development.",
  },
  {
    name: "Networking",
    slug: "networking",
    title: "Networking Certifications & Network Career Credentials | Badgely",
    description: "Explore networking certifications for entry-level through associate professionals, including Cisco and vendor-neutral networking credentials.",
    eyebrow: "Networking certifications",
    intro: "Build networking skills with credentials covering network fundamentals, administration, troubleshooting, and Cisco technologies.",
  },
  {
    name: "DevOps",
    slug: "devops",
    title: "DevOps Certifications for Linux, Kubernetes & IaC | Badgely",
    description: "Explore DevOps certifications covering Linux administration, Kubernetes, infrastructure as code, automation, and cloud-native operations.",
    eyebrow: "DevOps certifications",
    intro: "Explore credentials that support DevOps roles through Linux, Kubernetes, infrastructure as code, automation, and cloud-native operations.",
  },
  {
    name: "Data",
    slug: "data",
    title: "Data Certifications for Analytics & Database Skills | Badgely",
    description: "Explore data certifications covering analytics, data concepts, database administration, and practical data-focused IT skills.",
    eyebrow: "Data certifications",
    intro: "Explore certifications for data analytics, database administration, and foundational data skills used across modern IT teams.",
  },
  {
    name: "GRC and Audit",
    slug: "grc-and-audit",
    title: "GRC & IT Audit Certifications | Badgely",
    description: "Explore governance, risk, compliance, and IT audit certifications for security management, risk professionals, auditors, and GRC career paths.",
    eyebrow: "GRC and IT audit certifications",
    intro: "Explore professional credentials for governance, risk management, compliance, security management, and IT auditing.",
  },
  {
    name: "IT Support",
    slug: "it-support",
    title: "IT Support Certifications for Beginners | Badgely",
    description: "Explore entry-level IT support certifications covering hardware, software, troubleshooting, security, and foundational technology skills.",
    eyebrow: "IT support certifications",
    intro: "Start with credentials built around troubleshooting, hardware, software, security, and the practical foundations of IT support.",
  },
  {
    name: "Linux",
    slug: "linux",
    title: "Linux Certifications & Linux Administration Credentials | Badgely",
    description: "Explore Linux certifications covering system administration, command-line skills, security, troubleshooting, and Linux operations.",
    eyebrow: "Linux certifications",
    intro: "Explore credentials for Linux administration, command-line operations, troubleshooting, security, and systems support.",
  },
  {
    name: "Infrastructure",
    slug: "infrastructure",
    title: "IT Infrastructure Certifications | Badgely",
    description: "Explore IT infrastructure certifications covering servers, systems operations, hardware, storage, security, and enterprise infrastructure skills.",
    eyebrow: "Infrastructure certifications",
    intro: "Explore certifications focused on servers, systems operations, hardware, storage, security, and enterprise infrastructure support.",
  },
  {
    name: "Project Management",
    slug: "project-management",
    title: "IT Project Management Certifications | Badgely",
    description: "Explore project management certifications for IT professionals, from foundational project skills through advanced professional project management credentials.",
    eyebrow: "Project management certifications",
    intro: "Explore project management credentials that support planning, delivery, leadership, and structured execution across IT initiatives.",
  },
];

export function getCertificationCategory(slug: string) {
  return certificationCategories.find((category) => category.slug === slug) ?? null;
}
