import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const actionsSource = await readFile(
  new URL("../../app/study-plans/actions.ts", import.meta.url),
  "utf8",
);
const deleteActionsSource = await readFile(
  new URL("../../app/study-plans/delete-actions.ts", import.meta.url),
  "utf8",
);
const detailPageSource = await readFile(
  new URL("../../app/study-plans/[id]/page.tsx", import.meta.url),
  "utf8",
);

test("study-plan detail lookup explicitly scopes the plan to the signed-in user", () => {
  assert.match(
    detailPageSource,
    /\.eq\("id", id\)[\s\S]*?\.eq\("user_id", user\.id\)[\s\S]*?\.maybeSingle\(\)/,
  );
});

test("study-task mutations verify the signed-in user owns the parent study plan", () => {
  const ownerChecks = actionsSource.match(/\.eq\("user_id", user\.id\)/g) ?? [];

  assert.ok(
    ownerChecks.length >= 3,
    `Expected at least 3 explicit study-plan owner checks, found ${ownerChecks.length}`,
  );
  assert.match(actionsSource, /\.eq\("user_study_plan_id", studyPlan\.id\)/);
});

test("study-plan deletion requires both the plan id and signed-in user id", () => {
  assert.match(
    deleteActionsSource,
    /\.eq\("id", parsed\.data\.studyPlanId\)[\s\S]*?\.eq\("user_id", user\.id\)[\s\S]*?\.select\("id"\)/,
  );
});
