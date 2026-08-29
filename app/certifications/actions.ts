"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const toggleSavedCertificationSchema = z.object({
  certificationId: z.string().uuid(),
  slug: z.string().trim().min(1).max(160),
  intent: z.enum(["save", "remove"]),
});

export async function toggleSavedCertification(formData: FormData) {
  const parsed = toggleSavedCertificationSchema.safeParse({
    certificationId: formData.get("certificationId"),
    slug: formData.get("slug"),
    intent: formData.get("intent"),
  });

  if (!parsed.success) {
    throw new Error("Unable to update this saved certification.");
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
      .from("user_saved_certifications")
      .delete()
      .eq("user_id", user.id)
      .eq("certification_id", parsed.data.certificationId);

    if (error) {
      throw new Error("Unable to remove this saved certification.");
    }
  } else {
    const { error } = await supabase.from("user_saved_certifications").upsert(
      {
        user_id: user.id,
        certification_id: parsed.data.certificationId,
        status: "Interested",
      },
      { onConflict: "user_id,certification_id" },
    );

    if (error) {
      throw new Error("Unable to save this certification.");
    }
  }

  revalidatePath(`/certifications/${parsed.data.slug}`);
  revalidatePath("/certifications");
  revalidatePath("/dashboard");
}
