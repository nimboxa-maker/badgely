import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const adminActionFiles = [
  "providers/actions.ts",
  "certifications/actions.ts",
  "exams/actions.ts",
  "exam-domains/actions.ts",
  "renewal-policies/actions.ts",
  "resources/actions.ts",
  "career-paths/actions.ts",
  "career-path-steps/actions.ts",
  "certification-relations/actions.ts",
];

const requireAdminSource = await readFile(
  new URL("../../lib/auth/require-admin.ts", import.meta.url),
  "utf8",
);

test("admin authorization requires an authenticated user with the admin role", () => {
  assert.match(requireAdminSource, /supabase\.auth\.getUser\(\)/);
  assert.match(requireAdminSource, /if \(!user\)[\s\S]*?redirect\("\/sign-in/);
  assert.match(requireAdminSource, /profile\.role !== "admin"/);
  assert.match(requireAdminSource, /redirect\("\/dashboard\?message=Admin\+access\+required/);
});

for (const relativePath of adminActionFiles) {
  test(`${relativePath} verifies admin authorization server-side`, async () => {
    const source = await readFile(new URL(relativePath, import.meta.url), "utf8");

    assert.match(source, /requireAdmin/);
    assert.match(source, /await requireAdmin\(\)/);
  });
}
