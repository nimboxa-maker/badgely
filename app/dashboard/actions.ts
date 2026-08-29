"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const savedCertificationStatusSchema = z.object({
  savedCertificationId: z.string().uuid(),
  status: z.enum(["Interested", "Studying", "Completed", "Paused"]),
});

const removeSavedCertificationSchema = z.object({
  savedCertificationId: z.string().uuid(),
});

export async function updateSavedCertificationStatus(formData: FormData) {
  const parsed = savedCertificationStatusSchema.safeParse({
    savedCertificationId: formData.get("savedCertificationId"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    throw new Error("Unable to update this certification status.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to update a saved certification.");
  }

  const { error } = await supabase
    .from("user_saved_certifications")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.savedCertificationId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Unable to update this certification status.");
  }

  revalidatePath("/dashboard");
}

export async function removeSavedCertification(formData: FormData) {
  const parsed = removeSavedCertificationSchema.safeParse({
    savedCertificationId: formData.get("savedCertificationId"),
  });

  if (!parsed.success) {
    throw new Error("Unable to remove this saved certification.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to remove a saved certification.");
  }

  const { error } = await supabase
    .from("user_saved_certifications")
    .delete()
    .eq("id", parsed.data.savedCertificationId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Unable to remove this saved certification.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/certifications");
}
