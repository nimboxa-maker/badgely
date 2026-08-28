import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const foundations = [
  {
    icon: Compass,
    title: "Explore with direction",
    description: "Understand what certifications support different IT roles and experience levels.",
  },
  {
    icon: ShieldCheck,
    title: "Compare trustworthy details",
    description: "See original educational summaries alongside official-source and verification information.",
  },
  {
    icon: BookOpenCheck,
    title: "Build a realistic plan",
    description: "Turn a certification goal into a manageable weekly study roadmap.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <Badge className="bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30">
            Independent IT certification guidance
          </Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find the right IT certification path.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Compare certifications, explore career roadmaps, and build a plan for your next IT role.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/certifications"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Explore certifications <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/career-paths"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Find my path
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Built for clarity</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            One place to make your next certification decision.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {foundations.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
