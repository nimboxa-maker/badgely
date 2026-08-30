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

const passwordResetRequestSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

const updatePasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your new password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
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
    redirect(
      withMessage(
        "/sign-up",
        "error",
        parsed.error.issues[0]?.message ?? "Check your details and try again.",
      ),
    );
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

  redirect(
    withMessage(
      "/sign-in",
      "message",
      "Account created. Check your email to confirm your address, then sign in.",
    ),
  );
}

export async function requestPasswordReset(formData: FormData) {
  const parsed = passwordResetRequestSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    redirect(
      withMessage(
        "/forgot-password",
        "error",
        parsed.error.issues[0]?.message ?? "Enter a valid email address.",
      ),
    );
  }

  const supabase = await createClient();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteUrl}/auth/callback?next=/update-password`,
  });

  if (error) {
    redirect(
      withMessage(
        "/forgot-password",
        "error",
        "Unable to send a password reset email right now. Please try again shortly.",
      ),
    );
  }

  redirect(
    withMessage(
      "/forgot-password",
      "message",
      "If an account exists for that email, a password reset link has been sent.",
    ),
  );
}

export async function updatePassword(formData: FormData) {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    redirect(
      withMessage(
        "/update-password",
        "error",
        parsed.error.issues[0]?.message ?? "Check your new password and try again.",
      ),
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      withMessage(
        "/sign-in",
        "error",
        "Your password reset link has expired or is invalid. Request a new one.",
      ),
    );
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

  if (error) {
    redirect(
      withMessage(
        "/update-password",
        "error",
        "Unable to update your password. Please request a new reset link and try again.",
      ),
    );
  }

  await supabase.auth.signOut();
  redirect(withMessage("/sign-in", "message", "Password updated. Sign in with your new password."));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
