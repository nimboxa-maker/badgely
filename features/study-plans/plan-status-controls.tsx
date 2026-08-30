import { updateStudyPlanStatus } from "@/app/study-plans/actions";

type StudyPlanStatus = "Active" | "Paused" | "Completed";

type PlanStatusControlsProps = {
  studyPlanId: string;
  status: StudyPlanStatus;
};

function StatusButton({
  studyPlanId,
  status,
  label,
  variant = "secondary",
}: {
  studyPlanId: string;
  status: StudyPlanStatus;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <form action={updateStudyPlanStatus}>
      <input type="hidden" name="studyPlanId" value={studyPlanId} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className={
          variant === "primary"
            ? "min-h-10 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            : "min-h-10 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        }
      >
        {label}
      </button>
    </form>
  );
}

export function PlanStatusControls({ studyPlanId, status }: PlanStatusControlsProps) {
  if (status === "Completed") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
        This study plan is marked complete.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {status === "Active" ? (
        <StatusButton studyPlanId={studyPlanId} status="Paused" label="Pause plan" />
      ) : (
        <StatusButton
          studyPlanId={studyPlanId}
          status="Active"
          label="Resume plan"
          variant="primary"
        />
      )}

      <StatusButton
        studyPlanId={studyPlanId}
        status="Completed"
        label="Mark plan complete"
        variant={status === "Active" ? "primary" : "secondary"}
      />
    </div>
  );
}
