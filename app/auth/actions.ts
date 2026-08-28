"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

const signUpSchema = z.object({
  displayName: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
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
    redirect(withMessage("/sign-in", "error", parsed.error.issues[0]?.message ?? "Check your details and try again."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    redirect(withMessage("/sign-in", "error", "Unable to sign in with those credentials."));
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect(withMessage("/sign-up", "error", parsed.error.issues[0]?.message ?? "Check your details and try again."));
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
      emailRedirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    redirect(withMessage("/sign-up", "error", error.message));
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect(withMessage("/sign-in", "message", "Account created. Check your email to confirm your address, then sign in."));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
