"use client";

import { Trash2 } from "lucide-react";
import { deleteCertificationRelation } from "@/app/admin/certification-relations/actions";

type DeleteCertificationRelationButtonProps = {
  relationId: string;
  sourceName: string;
  targetName: string;
  relationType: string;
};

export function DeleteCertificationRelationButton({
  relationId,
  sourceName,
  targetName,
  relationType,
}: DeleteCertificationRelationButtonProps) {
  return (
    <form
      action={deleteCertificationRelation}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete the ${relationType} relation from ${sourceName} to ${targetName}? This cannot be undone.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={relationId} />
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Delete
      </button>
    </form>
  );
}
