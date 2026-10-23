// Run: pnpm test (node --test with built-in type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { answeredCount, emptyAnswers, isComplete, questions, verdict, yesCount } from "./boring-check.ts";

test("five questions, nothing answered at the start", () => {
  assert.equal(questions.length, 5);
  const a = emptyAnswers();
  assert.equal(a.length, 5);
  assert.equal(answeredCount(a), 0);
  assert.equal(isComplete(a), false);
});

test("an unfinished check asks for all five", () => {
  assert.equal(verdict([true, true, null, true, true]), "Answer all five to see how boring your building is.");
  assert.equal(isComplete([true, true, true, true]), false);
});

test("five yeses are beautifully boring", () => {
  assert.equal(verdict([true, true, true, true, true]), "5 out of 5. Beautifully boring.");
});

test("any no points to a survey, with the count", () => {
  assert.equal(verdict([true, false, true, true, true]), "4 out of 5. A survey shows what it would take to get back to boring.");
  assert.equal(verdict([false, false, false, false, false]), "0 out of 5. A survey shows what it would take to get back to boring.");
  assert.equal(yesCount([true, false, null, true, false]), 2);
});
