import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(90deg,#0b2d77_0%,#153d9d_50%,#123fb8_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-lg font-bold">ThirdBadge</p>

          <p className="mt-1 text-sm leading-6 text-blue-100">
            Learn it. Earn it. Prove it.
          </p>

          <div className="mt-3">
            <Link
              href="/guides"
              className="text-sm font-semibold text-white hover:text-blue-100"
            >
              ThirdBadge Guides
            </Link>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mx-auto max-w-4xl text-xs leading-5 text-blue-100">
            ThirdBadge is an independent educational resource and is not
            affiliated with, endorsed by, or sponsored by any
            certification provider. Certification names and logos may
            be trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}