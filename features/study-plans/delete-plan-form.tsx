"use client";

import { useState } from "react";
import { deleteStudyPlan } from "@/app/study-plans/delete-actions";

type DeleteStudyPlanFormProps = {
  studyPlanId: string;
};

export function DeleteStudyPlanForm({ studyPlanId }: DeleteStudyPlanFormProps) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="min-h-10 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Delete study plan
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-semibold text-red-900">
        Delete this study plan and all of its tasks?
      </p>
      <p className="mt-1 text-sm leading-6 text-red-700">This action cannot be undone.</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="min-h-10 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </button>

        <form action={deleteStudyPlan}>
          <input type="hidden" name="studyPlanId" value={studyPlanId} />
          <button
            type="submit"
            className="min-h-10 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            Yes, delete plan
          </button>
        </form>
      </div>
    </div>
  );
}
