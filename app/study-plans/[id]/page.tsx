import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";
import { toggleStudyTaskCompletion } from "@/app/study-plans/actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DeleteStudyPlanForm } from "@/features/study-plans/delete-plan-form";
import { EditStudyTaskForm } from "@/features/study-plans/edit-task-form";
import { PlanStatusControls } from "@/features/study-plans/plan-status-controls";
import { createClient } from "@/lib/supabase/server";

type StudyPlanDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatHours(value: number | null) {
  if (value === null) {
    return "—";
  }

  return `${Number(value)} hr${Number(value) === 1 ? "" : "s"}`;
}

export default async function StudyPlanDetailPage({
  params,
}: StudyPlanDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please+sign+in+to+view+your+study+plan.");
  }

  const { data: studyPlan, error: studyPlanError } = await supabase
    .from("user_study_plans")
    .select(
      "id, certification_id, target_exam_date, weekly_study_hours, study_weeks, include_labs, current_experience_level, generated_plan_text, progress_percent, status, created_at, certifications(name, slug, category, level)",
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (studyPlanError) {
    throw new Error("Unable to load this study plan.");
  }

  if (!studyPlan) {
    notFound();
  }

  const { data: tasks, error: tasksError } = await supabase
    .from("study_tasks")
    .select(
      "id, title, description, week_number, estimated_hours, task_type, completed, completed_at, display_order",
    )
    .eq("user_study_plan_id", studyPlan.id)
    .order("week_number", { ascending: true })
    .order("display_order", { ascending: true });

  if (tasksError) {
    throw new Error("Unable to load study-plan tasks.");
  }

  const studyTasks = tasks ?? [];
  const nextTask = studyTasks.find((task) => !task.completed) ?? null;
  const groupedWeeks = Array.from({ length: studyPlan.study_weeks }, (_, index) => {
    const weekNumber = index + 1;
    const weekTasks = studyTasks.filter((task) => task.week_number === weekNumber);
    const estimatedHours = weekTasks.reduce(
      (total, task) => total + Number(task.estimated_hours ?? 0),
      0,
    );

    return {
      weekNumber,
      tasks: weekTasks,
      estimatedHours,
    };
  });

  const completedTasks = studyTasks.filter((task) => task.completed).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      <header className="mt-6 rounded-3xl bg-slate-950 px-6 py-9 text-white sm:px-9">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30">
            {studyPlan.status}
          </Badge>
          {studyPlan.certifications?.category ? (
            <Badge className="bg-white/10 text-slate-100">
              {studyPlan.certifications.category}
            </Badge>
          ) : null}
          {studyPlan.certifications?.level ? (
            <Badge className="bg-white/10 text-slate-100">
              {studyPlan.certifications.level}
            </Badge>
          ) : null}
        </div>

        <div className="mt-5 flex items-start gap-3">
          <BookOpenCheck className="mt-1 size-7 text-blue-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              Study plan
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {studyPlan.certifications?.name ?? "Certification study plan"}
            </h1>
          </div>
        </div>

        {studyPlan.generated_plan_text ? (
          <p className="mt-5 max-w-4xl leading-7 text-slate-300">
            {studyPlan.generated_plan_text}
          </p>
        ) : null}

        {studyPlan.certifications?.slug ? (
          <Link
            href={`/certifications/${studyPlan.certifications.slug}`}
            className="mt-5 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            View certification details
          </Link>
        ) : null}
      </header>

      <section className="mt-6" aria-labelledby="plan-controls-heading">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="plan-controls-heading" className="text-lg font-bold text-slate-950">
                Plan controls
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Pause your schedule when needed, resume it later, or mark the plan complete.
              </p>
            </div>
            <PlanStatusControls
              studyPlanId={studyPlan.id}
              status={studyPlan.status as "Active" | "Paused" | "Completed"}
            />
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Study plan summary">
        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <CalendarDays className="size-4" aria-hidden="true" />
            Target exam date
          </div>
          <p className="mt-3 text-lg font-bold text-slate-950">
            {studyPlan.target_exam_date ?? "Not set"}
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Clock3 className="size-4" aria-hidden="true" />
            Weekly study time
          </div>
          <p className="mt-3 text-lg font-bold text-slate-950">
            {studyPlan.weekly_study_hours} hours
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <ListTodo className="size-4" aria-hidden="true" />
            Tasks completed
          </div>
          <p className="mt-3 text-lg font-bold text-slate-950">
            {completedTasks} of {studyTasks.length}
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Experience level
          </div>
          <p className="mt-3 text-lg font-bold text-slate-950">
            {studyPlan.current_experience_level}
          </p>
        </Card>
      </section>

      <section className="mt-8" aria-labelledby="progress-heading">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 id="progress-heading" className="text-xl font-bold text-slate-950">
                Progress
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Progress updates automatically as study tasks are completed.
              </p>
            </div>
            <span className="text-2xl font-bold text-blue-700">
              {studyPlan.progress_percent}%
            </span>
          </div>

          <div
            className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label="Study plan progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={studyPlan.progress_percent}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${studyPlan.progress_percent}%` }}
            />
          </div>
        </Card>
      </section>

      <section className="mt-8" aria-labelledby="next-task-heading">
        <Card className="border-blue-200 bg-blue-50/60">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Next recommended task
          </p>
          <h2 id="next-task-heading" className="mt-2 text-xl font-bold text-slate-950">
            {nextTask?.title ?? "All generated tasks are complete"}
          </h2>
          {nextTask ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Week {nextTask.week_number} · {nextTask.task_type} · {formatHours(nextTask.estimated_hours)}
            </p>
          ) : null}
        </Card>
      </section>

      <section className="mt-10" aria-labelledby="weekly-plan-heading">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Weekly schedule
          </p>
          <h2 id="weekly-plan-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Your {studyPlan.study_weeks}-week plan
          </h2>
          <p className="mt-2 text-slate-600">
            Each week stays within the {studyPlan.weekly_study_hours}-hour weekly study limit.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {groupedWeeks.map((week) => (
            <section key={week.weekNumber} aria-labelledby={`week-${week.weekNumber}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 id={`week-${week.weekNumber}`} className="text-xl font-bold text-slate-950">
                  Week {week.weekNumber}
                </h3>
                <Badge>
                  {week.estimatedHours.toFixed(2).replace(/\.00$/, "")} planned hours
                </Badge>
              </div>

              {week.tasks.length ? (
                <div className="mt-3 space-y-3">
                  {week.tasks.map((task) => (
                    <Card key={task.id} className={task.completed ? "bg-slate-50" : undefined}>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge>{task.task_type}</Badge>
                            {task.completed ? (
                              <Badge className="bg-emerald-50 text-emerald-700">Completed</Badge>
                            ) : null}
                          </div>
                          <h4 className="mt-3 font-bold text-slate-950">{task.title}</h4>
                          {task.description ? (
                            <p className="mt-2 leading-7 text-slate-600">{task.description}</p>
                          ) : null}
                        </div>

                        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                          <span className="text-sm font-semibold text-slate-500">
                            {formatHours(task.estimated_hours)}
                          </span>
                          <form action={toggleStudyTaskCompletion}>
                            <input type="hidden" name="taskId" value={task.id} />
                            <input type="hidden" name="studyPlanId" value={studyPlan.id} />
                            <input
                              type="hidden"
                              name="completed"
                              value={task.completed ? "false" : "true"}
                            />
                            <button
                              type="submit"
                              className={
                                task.completed
                                  ? "min-h-10 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                                  : "min-h-10 rounded-xl bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                              }
                            >
                              {task.completed ? "Mark incomplete" : "Mark complete"}
                            </button>
                          </form>

                          <EditStudyTaskForm
                            studyPlanId={studyPlan.id}
                            studyWeeks={studyPlan.study_weeks}
                            weeklyStudyHours={studyPlan.weekly_study_hours}
                            task={task}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="mt-3 border-dashed py-5">
                  <p className="text-sm text-slate-500">No tasks are scheduled for this week.</p>
                </Card>
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="delete-plan-heading">
        <Card className="border-red-200 bg-red-50/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="delete-plan-heading" className="text-lg font-bold text-slate-950">
                Delete study plan
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Permanently remove this study plan and all of its tasks. This action cannot be undone.
              </p>
            </div>
            <DeleteStudyPlanForm studyPlanId={studyPlan.id} />
          </div>
        </Card>
      </section>
    </main>
  );
}
