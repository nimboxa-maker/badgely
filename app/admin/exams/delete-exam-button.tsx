"use client";

import { Trash2 } from "lucide-react";
import { deleteExam } from "@/app/admin/exams/actions";

type DeleteExamButtonProps = {
  examId: string;
  examLabel: string;
};

export function DeleteExamButton({ examId, examLabel }: DeleteExamButtonProps) {
  return (
    <form
      action={deleteExam}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete ${examLabel}? This cannot be undone.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={examId} />
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
