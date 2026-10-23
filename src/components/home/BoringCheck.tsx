"use client";

import { useState } from "react";
import Link from "next/link";
import { emptyAnswers, isComplete, questions, verdict, type Answers } from "@/lib/boring-check";

const btn = "pop rounded-full px-[22px] py-2.5 text-[15px] font-extrabold";

export function BoringCheck() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const done = isComplete(answers);

  function set(i: number, value: boolean) {
    setAnswers((prev) => prev.map((a, j) => (j === i ? value : a)));
  }

  return (
    <div className="flex flex-col gap-[22px]">
      {questions.map((q, i) => (
        <div
          key={q}
          role="group"
          aria-labelledby={`check-q-${i}`}
          className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white px-6 py-5"
        >
          <p id={`check-q-${i}`} className="m-0 flex-[1_1_300px] text-[18px] font-bold">
            {q}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={answers[i] === true}
              onClick={() => set(i, true)}
              className={`${btn} ${answers[i] === true ? "bg-yes text-white" : "bg-sand text-text"}`}
            >
              Yes
            </button>
            <button
              type="button"
              aria-pressed={answers[i] === false}
              onClick={() => set(i, false)}
              className={`${btn} ${answers[i] === false ? "bg-no text-white" : "bg-sand text-text"}`}
            >
              No
            </button>
          </div>
        </div>
      ))}
      {/* Always mounted; filled only once all five are answered, not on every tap. */}
      <p className="sr-only" aria-live="polite">
        {done ? verdict(answers) : ""}
      </p>
      <div className="on-dark flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-ink px-8 py-7 text-white">
        <p className="m-0 text-[22px] font-extrabold">{verdict(answers)}</p>
        <Link href="#contact" className="pop rounded-full bg-highlight px-7 py-4 text-[16px] font-extrabold text-ink no-underline">
          Book a survey
        </Link>
      </div>
    </div>
  );
}
