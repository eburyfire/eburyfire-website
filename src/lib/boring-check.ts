// "How boring is your building?" A quick self-check, not a fire risk
// assessment. Pure scoring so it can be tested without a browser.

export type Option = { label: string; points: 0 | 1 | 2 };
export type Question = { id: string; text: string; options: Option[] };

export const questions: Question[] = [
  {
    id: "service",
    text: "When was the fire alarm last serviced?",
    options: [
      { label: "Within the last six months", points: 0 },
      { label: "Six to twelve months ago", points: 1 },
      { label: "Over a year ago, or not sure", points: 2 },
    ],
  },
  {
    id: "certificate",
    text: "Where's the last service certificate?",
    options: [
      { label: "I could find it in a minute", points: 0 },
      { label: "Somewhere in the office", points: 1 },
      { label: "No idea", points: 2 },
    ],
  },
  {
    id: "panel",
    text: "What does the fire alarm panel say right now?",
    options: [
      { label: "Normal, no fault lights", points: 0 },
      { label: "There's been a fault light for a while", points: 2 },
      { label: "I'm not sure where the panel is", points: 2 },
    ],
  },
  {
    id: "weekly",
    text: "Does someone test a call point each week and write it down?",
    options: [
      { label: "Yes, every week", points: 0 },
      { label: "Now and then", points: 1 },
      { label: "Not that I know of", points: 2 },
    ],
  },
  {
    id: "contractors",
    text: "Who looks after your fire safety systems?",
    options: [
      { label: "One firm, and I know who", points: 0 },
      { label: "A few firms, each with its own paperwork", points: 1 },
      { label: "I'd have to check", points: 2 },
    ],
  },
];

export type Verdict = {
  level: "boring" | "lively" | "exciting";
  title: string;
  body: string;
};

/** Index of the chosen option per question, or null where unanswered. */
export type Answers = (number | null)[];

export function isComplete(answers: Answers): boolean {
  return (
    answers.length === questions.length &&
    answers.every(
      (a, i) => a !== null && a >= 0 && a < questions[i].options.length,
    )
  );
}

export function score(answers: Answers): number {
  if (!isComplete(answers)) throw new Error("Answer every question first");
  return answers.reduce<number>(
    (sum, a, i) => sum + questions[i].options[a as number].points,
    0,
  );
}

/** How many answers landed on the worst option (2 points). */
function serious(answers: Answers): number {
  return answers.filter(
    (a, i) => questions[i].options[a as number].points === 2,
  ).length;
}

export function verdict(answers: Answers): Verdict {
  const total = score(answers);
  // Two serious answers (say, no service for over a year and a fault light
  // that's been on a while) are never "a little" exciting.
  if (total >= 5 || serious(answers) >= 2) {
    return exciting;
  }
  if (total <= 1) {
    return {
      level: "boring",
      title: "Pleasingly boring.",
      body: "Nice work. Keep it that way: servicing approximately every six months, the certificate where you can find it, and someone testing a call point each week.",
    };
  }
  if (total <= 4) {
    return {
      level: "lively",
      title: "A little too exciting.",
      body: "Nothing that can't be put right. We can take over your servicing and keep every certificate and visit record in one customer portal.",
    };
  }
  return exciting;
}

const exciting: Verdict = {
  level: "exciting",
  title: "Let's make it boring.",
  body: "Your fire alarm deserves a quieter life than this. Book a 15-minute call and we'll talk through your building.",
};
