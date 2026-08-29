"use client";

import { Trash2 } from "lucide-react";
import { deleteCareerPath } from "@/app/admin/career-paths/actions";

type DeleteCareerPathButtonProps = {
  careerPathId: string;
  careerPathName: string;
};

export function DeleteCareerPathButton({
  careerPathId,
  careerPathName,
}: DeleteCareerPathButtonProps) {
  return (
    <form
      action={deleteCareerPath}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete ${careerPathName}? Any career path steps linked to it will also be deleted. This cannot be undone.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={careerPathId} />
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
