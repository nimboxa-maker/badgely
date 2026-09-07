import Image from "next/image";
import Link from "next/link";

const topLinks = [
  { href: "/certifications", label: "Certifications" },
  { href: "/recertification", label: "Recertification" },
  { href: "/free-resources", label: "Free Resources" },
  { href: "/proctoring-services", label: "Proctoring Services" },
  { href: "/study-store", label: "Study Store" },
  { href: "/courses", label: "Courses" },
];

const discoveryLinks = [
  { href: "/career-paths", label: "Career Paths" },
  { href: "/guides", label: "Guides" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "mailto:team@thirdbadge.com", label: "Contact Us" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookie-settings", label: "Cookie Settings" },
  { href: "/sitemap", label: "Sitemap" },
];

const socialPlaceholders = [
  { label: "Facebook", symbol: "f" },
  { label: "X", symbol: "X" },
  { label: "YouTube", symbol: "▶" },
  { label: "TikTok", symbol: "♪" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(90deg,#0b2d77_0%,#123fb8_55%,#0b2d77_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[240px_1fr_250px]">
          <div className="flex justify-center lg:justify-start">
            <Link
              href="/"
              aria-label="ThirdBadge home"
              className="inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-white"
            >
              <Image
                src="/brand/thirdbadge-logo.png"
                alt="ThirdBadge — Learn It | Earn It | Prove It"
                width={260}
                height={87}
                className="h-16 w-auto rounded-md"
              />
            </Link>
          </div>

          <div className="text-center">
            <nav
              aria-label="Footer primary navigation"
              className="flex flex-wrap justify-center gap-x-5 gap-y-2"
            >
              {topLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-blue-100 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mx-auto my-4 h-px max-w-3xl bg-white/15" />

            <nav
              aria-label="Footer discovery navigation"
              className="flex flex-wrap justify-center gap-x-5 gap-y-2"
            >
              {discoveryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-blue-100 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mx-auto my-4 h-px max-w-3xl bg-white/15" />

            <nav
              aria-label="Footer company navigation"
              className="flex flex-wrap justify-center gap-x-5 gap-y-2"
            >
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-blue-100 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div
              className="flex items-center gap-3"
              aria-label="Social media links coming soon"
            >
              {socialPlaceholders.map((social) => (
                <span
                  key={social.label}
                  title={`${social.label} coming soon`}
                  aria-label={`${social.label} coming soon`}
                  className="flex size-9 cursor-default items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-1 ring-inset ring-white/20"
                >
                  {social.symbol}
                </span>
              ))}
            </div>

            <a
              href="mailto:team@thirdbadge.com"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
              team@thirdbadge.com
            </a>
          </div>
        </div>

        <div className="mt-7 border-t border-white/15 pt-5">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-blue-100">
              © 2026 ThirdBadge. All rights reserved.
            </p>

            <p className="text-xs font-medium text-blue-100">
              Learn It | Earn It | Prove It
            </p>
          </div>

          <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-5 text-blue-100">
            ThirdBadge is an independent educational resource and is not
            affiliated with, endorsed by, or sponsored by any certification
            provider. Certification names and logos may be trademarks of their
            respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}