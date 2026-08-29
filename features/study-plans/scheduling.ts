import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns";

export type StudyTaskType =
  | "Read"
  | "Lab"
  | "Video"
  | "Practice Questions"
  | "Review"
  | "Exam Booking";

export type StudyDomain = {
  domain_name: string;
  description?: string | null;
  display_order?: number | null;
};

export type StudyResource = {
  title: string;
  description?: string | null;
  resource_type: string;
  is_official?: boolean | null;
};

export type GeneratedStudyTask = {
  title: string;
  description: string;
  week_number: number;
  estimated_hours: number;
  task_type: StudyTaskType;
  display_order: number;
};

export type StudyScheduleInput = {
  targetExamDate: string;
  weeklyStudyHours: number;
  includeLabs: boolean;
  estimatedStudyHoursMin?: number | null;
  estimatedStudyHoursMax?: number | null;
  domains: StudyDomain[];
  resources: StudyResource[];
  today?: Date;
};

export type StudyScheduleResult = {
  studyWeeks: number;
  availableStudyHours: number;
  estimatedStudyHours: number | null;
  isTimeShort: boolean;
  warning: string | null;
  tasks: GeneratedStudyTask[];
};

function roundQuarterHour(value: number) {
  return Math.max(0.25, Math.round(value * 4) / 4);
}

function calculateEstimatedStudyHours(
  minimum?: number | null,
  maximum?: number | null,
) {
  if (minimum !== null && minimum !== undefined && maximum !== null && maximum !== undefined) {
    return Math.round((minimum + maximum) / 2);
  }

  return minimum ?? maximum ?? null;
}

export function calculateStudyWeeks(targetExamDate: string, today = new Date()) {
  const target = startOfDay(parseISO(targetExamDate));
  const current = startOfDay(today);
  const daysAvailable = differenceInCalendarDays(target, current);

  if (daysAvailable < 1) {
    return 0;
  }

  return Math.max(1, Math.ceil(daysAvailable / 7));
}

function distributeHoursAcrossTasks(
  taskCount: number,
  weeklyStudyHours: number,
  preferredHours = 1,
) {
  if (taskCount <= 0) {
    return [];
  }

  const perTask = Math.min(preferredHours, weeklyStudyHours / taskCount);
  return Array.from({ length: taskCount }, () => roundQuarterHour(perTask));
}

function addTask(
  tasks: GeneratedStudyTask[],
  task: Omit<GeneratedStudyTask, "display_order">,
) {
  tasks.push({
    ...task,
    display_order: tasks.length + 1,
  });
}

export function generateStudySchedule(input: StudyScheduleInput): StudyScheduleResult {
  const studyWeeks = calculateStudyWeeks(input.targetExamDate, input.today);

  if (studyWeeks < 1) {
    return {
      studyWeeks: 0,
      availableStudyHours: 0,
      estimatedStudyHours: calculateEstimatedStudyHours(
        input.estimatedStudyHoursMin,
        input.estimatedStudyHoursMax,
      ),
      isTimeShort: true,
      warning: "Choose a target exam date after today.",
      tasks: [],
    };
  }

  const weeklyStudyHours = Math.max(1, Math.floor(input.weeklyStudyHours));
  const availableStudyHours = studyWeeks * weeklyStudyHours;
  const estimatedStudyHours = calculateEstimatedStudyHours(
    input.estimatedStudyHoursMin,
    input.estimatedStudyHoursMax,
  );
  const isTimeShort =
    estimatedStudyHours !== null && availableStudyHours < estimatedStudyHours;

  const warning = isTimeShort
    ? `Your schedule provides about ${availableStudyHours} study hours, while this certification is estimated at about ${estimatedStudyHours} hours. Consider moving the exam date or increasing weekly study time.`
    : null;

  const domains = [...input.domains].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );
  const resources = input.resources.slice(0, 6);
  const tasks: GeneratedStudyTask[] = [];

  const domainWeeksStart = 1;
  const finalReviewWeek = Math.max(1, studyWeeks);
  const weakAreaWeek = Math.max(1, studyWeeks - 1);
  const bookingWeek = Math.max(1, studyWeeks - 1);

  if (domains.length) {
    domains.forEach((domain, index) => {
      const week = Math.min(
        finalReviewWeek,
        domainWeeksStart + (index % Math.max(1, studyWeeks - 1)),
      );

      addTask(tasks, {
        title: `Study ${domain.domain_name}`,
        description:
          domain.description?.trim() ||
          `Review your notes and trusted documentation for ${domain.domain_name}. Focus on understanding concepts and being able to explain them in your own words.`,
        week_number: week,
        estimated_hours: 1,
        task_type: "Read",
      });

      addTask(tasks, {
        title: `Practice ${domain.domain_name}`,
        description:
          "Use original practice questions or your own recall prompts to check understanding. Do not use real, leaked, or proprietary exam questions.",
        week_number: week,
        estimated_hours: 0.75,
        task_type: "Practice Questions",
      });

      if (input.includeLabs) {
        addTask(tasks, {
          title: `Hands-on practice: ${domain.domain_name}`,
          description:
            "Complete a legal, authorized lab or small practical exercise that reinforces this topic. Record what you configured, observed, or troubleshot.",
          week_number: week,
          estimated_hours: 1,
          task_type: "Lab",
        });
      }
    });
  } else {
    addTask(tasks, {
      title: "Build certification foundations",
      description:
        "Review the certification overview, recommended experience, and official documentation available in Badgely. Create a short set of notes in your own words.",
      week_number: 1,
      estimated_hours: 1.5,
      task_type: "Read",
    });
  }

  resources.forEach((resource, index) => {
    const week = Math.min(studyWeeks, 1 + (index % studyWeeks));
    const normalizedType = resource.resource_type.toLowerCase();
    const taskType: StudyTaskType = normalizedType.includes("video")
      ? "Video"
      : "Read";

    addTask(tasks, {
      title: `Use resource: ${resource.title}`,
      description:
        resource.description?.trim() ||
        `${resource.is_official ? "Use this official resource" : "Use this listed resource"} to reinforce the topics scheduled for this week.`,
      week_number: week,
      estimated_hours: 1,
      task_type: taskType,
    });
  });

  addTask(tasks, {
    title: "Review weak areas",
    description:
      "Review topics you are consistently missing or cannot explain clearly. Revisit notes, documentation, labs, and original practice-question guidance for those areas.",
    week_number: weakAreaWeek,
    estimated_hours: 1,
    task_type: "Review",
  });

  addTask(tasks, {
    title: "Confirm exam booking",
    description:
      "Verify the current exam registration details with the official certification provider and book or confirm your exam when you are ready.",
    week_number: bookingWeek,
    estimated_hours: 0.5,
    task_type: "Exam Booking",
  });

  addTask(tasks, {
    title: "Final review",
    description:
      "Complete a final review of your notes, key concepts, weak areas, and practical takeaways. Avoid last-minute cramming with unverified or proprietary exam content.",
    week_number: finalReviewWeek,
    estimated_hours: 1,
    task_type: "Review",
  });

  const tasksByWeek = new Map<number, GeneratedStudyTask[]>();
  for (const task of tasks) {
    const weekTasks = tasksByWeek.get(task.week_number) ?? [];
    weekTasks.push(task);
    tasksByWeek.set(task.week_number, weekTasks);
  }

  for (const weekTasks of tasksByWeek.values()) {
    const hours = distributeHoursAcrossTasks(
      weekTasks.length,
      weeklyStudyHours,
      Math.min(1.5, weeklyStudyHours),
    );

    weekTasks.forEach((task, index) => {
      task.estimated_hours = hours[index] ?? 0.25;
    });
  }

  return {
    studyWeeks,
    availableStudyHours,
    estimatedStudyHours,
    isTimeShort,
    warning,
    tasks,
  };
}
