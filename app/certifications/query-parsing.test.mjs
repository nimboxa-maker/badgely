import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("./page.tsx", import.meta.url), "utf8");

test("certification query parsing uses the first value when a query parameter repeats", () => {
  assert.match(
    pageSource,
    /function firstParam\(value: string \| string\[\] \| undefined\) \{[\s\S]*?Array\.isArray\(value\) \? value\[0\] \?\? "" : value \?\? "";/,
  );
});

test("certification search text is trimmed before filtering", () => {
  assert.match(pageSource, /const query = firstParam\(params\.q\)\.trim\(\);/);
});

test("certification filters are read from URL query parameters", () => {
  for (const [variable, parameter] of [
    ["category", "category"],
    ["provider", "provider"],
    ["level", "level"],
    ["vendorType", "vendorType"],
    ["status", "status"],
    ["targetRole", "targetRole"],
  ]) {
    assert.match(
      pageSource,
      new RegExp(`const ${variable} = firstParam\\(params\\.${parameter}\\);`),
    );
  }
});

test("certification sorting defaults to featured when no sort value is provided", () => {
  assert.match(
    pageSource,
    /const sort = firstParam\(params\.sort\) \|\| "featured";/,
  );
});
