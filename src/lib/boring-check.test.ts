// Run: pnpm test (node --test with built-in type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { isComplete, questions, score, verdict } from "./boring-check.ts";

const all = (i: number) => questions.map(() => i);

test("every question has three options and a 0-point answer", () => {
  assert.equal(questions.length, 5);
  for (const q of questions) {
    assert.equal(q.options.length, 3, q.id);
    assert.ok(q.options.some((o) => o.points === 0), q.id);
  }
});

test("an unfinished check has no score", () => {
  const answers = [0, 0, null, 0, 0];
  assert.equal(isComplete(answers), false);
  assert.throws(() => score(answers));
});

test("out-of-range answers don't count as complete", () => {
  assert.equal(isComplete([0, 0, 0, 0, 3]), false);
  assert.equal(isComplete([0, 0, 0, 0]), false);
});

test("best answers everywhere read as boring", () => {
  assert.equal(score(all(0)), 0);
  assert.equal(verdict(all(0)).level, "boring");
});

test("one small slip is still boring; two are lively", () => {
  assert.equal(verdict([1, 0, 0, 0, 0]).level, "boring");
  assert.equal(verdict([1, 1, 0, 0, 0]).level, "lively");
});

test("a fault light on its own tips it to lively", () => {
  assert.equal(verdict([0, 0, 1, 0, 0]).level, "lively");
});

test("worst answers everywhere read as exciting", () => {
  assert.equal(score(all(2)), 10);
  assert.equal(verdict(all(2)).level, "exciting");
});

test("the boundaries sit at 1 and 4 points", () => {
  assert.equal(verdict([0, 0, 0, 1, 0]).level, "boring"); // 1
  assert.equal(verdict([1, 1, 0, 1, 1]).level, "lively"); // 4
  assert.equal(verdict([1, 1, 0, 1, 2]).level, "exciting"); // 5
});

test("two serious answers are exciting even under 5 points", () => {
  // Over a year since a service (2) and a fault light for a while (2).
  assert.equal(score([2, 0, 1, 0, 0]), 4);
  assert.equal(verdict([2, 0, 1, 0, 0]).level, "exciting");
});
