import assert from "node:assert/strict";
import test from "node:test";
import { calculateStudyWeeks, generateStudySchedule } from "./scheduling.ts";

const fixedToday = new Date(2026, 7, 28, 12, 0, 0);

test("calculateStudyWeeks returns one week for a target within seven days", () => {
  assert.equal(calculateStudyWeeks("2026-09-03", fixedToday), 1);
});

test("generated schedules never exceed the selected weekly study-hour limit", () => {
  const result = generateStudySchedule({
    targetExamDate: "2026-09-03",
    weeklyStudyHours: 1,
    includeLabs: true,
    estimatedStudyHoursMin: 20,
    estimatedStudyHoursMax: 30,
    today: fixedToday,
    domains: [
      { domain_name: "Domain 1", display_order: 1 },
      { domain_name: "Domain 2", display_order: 2 },
      { domain_name: "Domain 3", display_order: 3 },
      { domain_name: "Domain 4", display_order: 4 },
    ],
    resources: [
      { title: "Official guide", resource_type: "Documentation", is_official: true },
      { title: "Video course", resource_type: "Video", is_official: false },
    ],
  });

  assert.equal(result.studyWeeks, 1);
  assert.ok(result.tasks.length > 1);

  const weeklyTotalsInHundredths = new Map();
  for (const task of result.tasks) {
    const taskHundredths = Math.round(task.estimated_hours * 100);
    weeklyTotalsInHundredths.set(
      task.week_number,
      (weeklyTotalsInHundredths.get(task.week_number) ?? 0) + taskHundredths,
    );
  }

  for (const totalHundredths of weeklyTotalsInHundredths.values()) {
    assert.ok(
      totalHundredths <= 100,
      `Expected weekly total <= 1 hour, received ${totalHundredths / 100}`,
    );
  }
});

test("schedule warns when available study time is below the certification estimate", () => {
  const result = generateStudySchedule({
    targetExamDate: "2026-09-03",
    weeklyStudyHours: 1,
    includeLabs: false,
    estimatedStudyHoursMin: 20,
    estimatedStudyHoursMax: 30,
    today: fixedToday,
    domains: [],
    resources: [],
  });

  assert.equal(result.availableStudyHours, 1);
  assert.equal(result.estimatedStudyHours, 25);
  assert.equal(result.isTimeShort, true);
  assert.match(
    result.warning ?? "",
    /Consider moving the exam date or increasing weekly study time/,
  );
});

test("practice tasks explicitly avoid real, leaked, or proprietary exam questions", () => {
  const result = generateStudySchedule({
    targetExamDate: "2026-09-30",
    weeklyStudyHours: 5,
    includeLabs: false,
    today: fixedToday,
    domains: [{ domain_name: "Security fundamentals", display_order: 1 }],
    resources: [],
  });

  const practiceTask = result.tasks.find((task) => task.task_type === "Practice Questions");

  assert.ok(practiceTask);
  assert.match(
    practiceTask.description,
    /Do not use real, leaked, or proprietary exam questions\./,
  );
});
