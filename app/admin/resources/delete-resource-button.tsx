"use client";

import { Trash2 } from "lucide-react";
import { deleteResource } from "@/app/admin/resources/actions";

type DeleteResourceButtonProps = {
  resourceId: string;
  resourceTitle: string;
};

export function DeleteResourceButton({ resourceId, resourceTitle }: DeleteResourceButtonProps) {
  return (
    <form
      action={deleteResource}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete ${resourceTitle}? This cannot be undone.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={resourceId} />
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
