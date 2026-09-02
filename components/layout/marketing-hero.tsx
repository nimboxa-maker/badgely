import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarketingHeroProps = {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function MarketingHero({
  children,
  aside,
  className,
  contentClassName,
}: MarketingHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-blue-900/60 bg-[#020817] text-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(37,99,235,0.62),transparent_34%),linear-gradient(118deg,#020617_0%,#06143b_48%,#0b3aaf_100%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[46%] opacity-30 [background-image:radial-gradient(rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="pointer-events-none absolute -bottom-56 -right-40 h-[430px] w-[760px] rotate-[-8deg] rounded-[50%] border border-blue-400/35 shadow-[0_0_80px_rgba(37,99,235,0.35)]" />
      <div className="pointer-events-none absolute -bottom-64 -right-56 h-[470px] w-[860px] rotate-[-8deg] rounded-[50%] border border-blue-500/25" />
      <div className="pointer-events-none absolute -bottom-72 -right-72 h-[520px] w-[960px] rotate-[-8deg] rounded-[50%] border border-cyan-400/15" />

      <div
        className={cn(
          "relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20",
          aside ? "lg:grid-cols-[1.04fr_0.96fr] lg:items-center" : "text-center",
          contentClassName,
        )}
      >
        <div>{children}</div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </section>
  );
}

export function HeroPanel({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-blue-300/35 bg-blue-950/45 p-5 shadow-[0_0_45px_rgba(37,99,235,0.32)] ring-1 ring-inset ring-blue-400/20 backdrop-blur-xl sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function HeroOption({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition hover:border-blue-300/40 hover:bg-blue-500/10",
        className,
      )}
      {...props}
    />
  );
}
