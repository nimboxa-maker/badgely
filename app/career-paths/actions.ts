"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const toggleSavedCareerPathSchema = z.object({
  careerPathId: z.string().uuid(),
  slug: z.string().trim().min(1).max(160),
  intent: z.enum(["save", "remove"]),
});

export async function toggleSavedCareerPath(formData: FormData) {
  const parsed = toggleSavedCareerPathSchema.safeParse({
    careerPathId: formData.get("careerPathId"),
    slug: formData.get("slug"),
    intent: formData.get("intent"),
  });

  if (!parsed.success) {
    throw new Error("Unable to update this saved career path.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (parsed.data.intent === "remove") {
    const { error } = await supabase
      .from("user_saved_career_paths")
      .delete()
      .eq("user_id", user.id)
      .eq("career_path_id", parsed.data.careerPathId);

    if (error) {
      throw new Error("Unable to remove this saved career path.");
    }
  } else {
    const { error } = await supabase.from("user_saved_career_paths").upsert(
      {
        user_id: user.id,
        career_path_id: parsed.data.careerPathId,
      },
      { onConflict: "user_id,career_path_id" },
    );

    if (error) {
      throw new Error("Unable to save this career path.");
    }
  }

  revalidatePath(`/career-paths/${parsed.data.slug}`);
  revalidatePath("/career-paths");
  revalidatePath("/dashboard");
}
