import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+view+your+dashboard.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .single();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
          </h1>
          <p className="mt-2 text-slate-300">Your saved certifications, career paths, and study plans will appear here.</p>
        </div>

        <form action={signOut}>
          <Button type="submit" variant="secondary">Sign out</Button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Saved certifications</p>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="mt-2 text-sm text-slate-600">Certification saving arrives in a later milestone.</p>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slate-500">Saved career paths</p>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="mt-2 text-sm text-slate-600">Career-path tracking arrives in a later milestone.</p>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slate-500">Study plans</p>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="mt-2 text-sm text-slate-600">Study-plan tools arrive in a later milestone.</p>
        </Card>
      </div>
    </main>
  );
}
