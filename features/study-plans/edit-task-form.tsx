import { updateStudyTask } from "@/app/study-plans/actions";

type EditStudyTaskFormProps = {
  studyPlanId: string;
  studyWeeks: number;
  weeklyStudyHours: number;
  task: {
    id: string;
    title: string;
    description: string | null;
    week_number: number;
    estimated_hours: number | null;
    task_type: string;
  };
};

const taskTypes = [
  "Read",
  "Lab",
  "Video",
  "Practice Questions",
  "Review",
  "Exam Booking",
] as const;

export function EditStudyTaskForm({
  studyPlanId,
  studyWeeks,
  weeklyStudyHours,
  task,
}: EditStudyTaskFormProps) {
  return (
    <details className="w-full rounded-xl border border-slate-200 bg-white p-3 sm:w-80">
      <summary className="cursor-pointer text-sm font-semibold text-blue-700">
        Edit task
      </summary>

      <form action={updateStudyTask} className="mt-4 space-y-4">
        <input type="hidden" name="taskId" value={task.id} />
        <input type="hidden" name="studyPlanId" value={studyPlanId} />

        <div>
          <label htmlFor={`title-${task.id}`} className="text-xs font-semibold text-slate-700">
            Title
          </label>
          <input
            id={`title-${task.id}`}
            name="title"
            type="text"
            required
            maxLength={160}
            defaultValue={task.title}
            className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor={`description-${task.id}`}
            className="text-xs font-semibold text-slate-700"
          >
            Description
          </label>
          <textarea
            id={`description-${task.id}`}
            name="description"
            rows={4}
            maxLength={2000}
            defaultValue={task.description ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`week-${task.id}`} className="text-xs font-semibold text-slate-700">
              Week
            </label>
            <input
              id={`week-${task.id}`}
              name="weekNumber"
              type="number"
              min={1}
              max={studyWeeks}
              required
              defaultValue={task.week_number}
              className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor={`hours-${task.id}`} className="text-xs font-semibold text-slate-700">
              Hours
            </label>
            <input
              id={`hours-${task.id}`}
              name="estimatedHours"
              type="number"
              min="0.25"
              max={weeklyStudyHours}
              step="0.25"
              required
              defaultValue={Number(task.estimated_hours ?? 0.25)}
              className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`type-${task.id}`} className="text-xs font-semibold text-slate-700">
            Task type
          </label>
          <select
            id={`type-${task.id}`}
            name="taskType"
            required
            defaultValue={task.task_type}
            className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {taskTypes.map((taskType) => (
              <option key={taskType} value={taskType}>
                {taskType}
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs leading-5 text-slate-500">
          Weekly task hours must stay within the {weeklyStudyHours}-hour plan limit.
        </p>

        <button
          type="submit"
          className="min-h-10 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save task changes
        </button>
      </form>
    </details>
  );
}
