export function SiteFooter() {
  return (
    <footer
      className="border-t border-white/10 text-white"
      style={{ backgroundColor: "#1E40AF" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-lg font-bold">Badgely</p>

          <p className="mt-1 text-sm leading-6 text-blue-100">
            Clearer certification information, career paths, and
            practical study planning for IT professionals.
          </p>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mx-auto max-w-4xl text-xs leading-5 text-blue-100">
            Badgely is an independent educational resource and is not
            affiliated with, endorsed by, or sponsored by any
            certification provider. Certification names and logos may
            be trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}