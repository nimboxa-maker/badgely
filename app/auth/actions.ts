"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

function withMessage(path: string, key: "error" | "message", value: string) {
  const params = new URLSearchParams({ [key]: value });
  return `${path}?${params.toString()}`;
}

export async function signIn(formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect(
      withMessage(
        "/sign-in",
        "error",
        parsed.error.issues[0]?.message ?? "Check your details and try again.",
      ),
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    redirect(
      withMessage(
        "/sign-in",
        "error",
        "Unable to sign in with those credentials.",
      ),
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError || !profile || profile.role !== "admin") {
    await supabase.auth.signOut();

    redirect(
      withMessage(
        "/sign-in",
        "error",
        "Admin access required.",
      ),
    );
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}