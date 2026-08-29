"use client";

import { deleteStudyPlan } from "@/app/study-plans/delete-actions";

type DeleteStudyPlanFormProps = {
  studyPlanId: string;
};

export function DeleteStudyPlanForm({
  studyPlanId,
}: DeleteStudyPlanFormProps) {
  return (
    <form
      action={deleteStudyPlan}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Delete this study plan and all of its tasks? This cannot be undone.",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="studyPlanId" value={studyPlanId} />
      <button
        type="submit"
        className="min-h-10 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Delete study plan
      </button>
    </form>
  );
}
