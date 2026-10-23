"use client";

import { useState } from "react";
import { CtaLink } from "@/components/ui/Button";
import { isComplete, questions, verdict, type Answers } from "@/lib/boring-check";

export function BoringCheck() {
  const [answers, setAnswers] = useState<Answers>(() =>
    questions.map(() => null),
  );
  const done = isComplete(answers);
  const result = done ? verdict(answers) : null;
  const answered = answers.filter((a) => a !== null).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
      <form
        className="grid gap-6"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby="boring-check-note"
      >
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="grid gap-3">
            <legend className="text-[17px] font-medium mb-3">
              <span className="label-mono text-ember-ink mr-3">
                {String(qi + 1).padStart(2, "0")}
              </span>
              {q.text}
            </legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o, oi) => {
                const id = `check-${q.id}-${oi}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="cursor-pointer rounded-full border border-ink/20 px-4 py-2 text-[14px] bg-surface hover:border-ink has-[:checked]:bg-ink has-[:checked]:text-cream has-[:checked]:border-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange"
                  >
                    <input
                      id={id}
                      type="radio"
                      name={q.id}
                      value={oi}
                      checked={answers[qi] === oi}
                      onChange={() =>
                        setAnswers((prev) =>
                          prev.map((a, i) => (i === qi ? oi : a)),
                        )
                      }
                      className="sr-only"
                    />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
        <p id="boring-check-note" className="text-[13px] text-stone">
          A quick check, not a fire risk assessment. Nothing you choose here
          is stored or sent.
        </p>
      </form>

      {/* Only the result is announced, not every tap. */}
      <p className="sr-only" aria-live="polite">
        {result ? `${result.title} ${result.body}` : ""}
      </p>
      <div className="lg:sticky lg:top-24 rounded-[8px] bg-orange text-ink p-7 grid gap-4">
        {result ? (
          <>
            <p className="label-mono">Your result</p>
            <p className="display text-[36px] md:text-[44px]">{result.title}</p>
            <p className="text-[16px] leading-[1.55]">{result.body}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CtaLink href="/contact" variant="primary">
                {result.level === "boring" ? "Get a quote anyway" : "Book a 15-minute call"}
              </CtaLink>
              <button
                type="button"
                onClick={() => setAnswers(questions.map(() => null))}
                className="text-[14px] underline underline-offset-4"
              >
                Start again
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="label-mono">
              {answered} of {questions.length} answered
            </p>
            <p className="display text-[36px] md:text-[44px]">
              How boring is your building?
            </p>
            <p className="text-[16px] leading-[1.55]">
              Five questions you can answer from memory. Boring is the goal.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
