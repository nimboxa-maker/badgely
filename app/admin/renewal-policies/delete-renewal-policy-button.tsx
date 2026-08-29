"use client";

import { Trash2 } from "lucide-react";
import { deleteRenewalPolicy } from "@/app/admin/renewal-policies/actions";

type DeleteRenewalPolicyButtonProps = {
  renewalPolicyId: string;
  renewalPolicyLabel: string;
};

export function DeleteRenewalPolicyButton({
  renewalPolicyId,
  renewalPolicyLabel,
}: DeleteRenewalPolicyButtonProps) {
  return (
    <form
      action={deleteRenewalPolicy}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete the renewal policy for ${renewalPolicyLabel}? This cannot be undone.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={renewalPolicyId} />
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Delete
      </button>
    </form>
  );
}
