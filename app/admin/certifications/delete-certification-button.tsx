"use client";

import { Trash2 } from "lucide-react";
import { deleteCertification } from "@/app/admin/certifications/actions";

type DeleteCertificationButtonProps = {
  certificationId: string;
  certificationName: string;
};

export function DeleteCertificationButton({
  certificationId,
  certificationName,
}: DeleteCertificationButtonProps) {
  return (
    <form
      action={deleteCertification}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete ${certificationName}? This cannot be undone and may remove linked catalog or user study data.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={certificationId} />
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
