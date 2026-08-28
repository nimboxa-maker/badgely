import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">Badgely</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Independent guidance for exploring IT certifications, career roadmaps, and realistic study plans.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link href="/certifications" className="hover:text-white">Certifications</Link>
            <Link href="/career-paths" className="hover:text-white">Career Paths</Link>
            <Link href="/compare" className="hover:text-white">Compare</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs leading-5 text-slate-500">
          <p>
            Badgely is an independent educational resource and is not affiliated with, endorsed by, or sponsored by any certification provider. Certification names and logos may be trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
