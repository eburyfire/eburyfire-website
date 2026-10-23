// "How boring is your building?" Five yes/no questions you can answer from
// memory. A quick check, not a fire risk assessment. Copy is the approved
// redesign v2 home page, word for word. Pure, so it can be tested without a browser.

export const questions = [
  "Is the fire alarm’s service up to date?",
  "Could you find the last certificate in two minutes?",
  "Is the panel showing no faults right now?",
  "Does someone test a call point every week and write it down?",
  "Do you know who looks after it, by name?",
] as const;

/** true = yes, false = no, null = not answered yet. */
export type Answers = (boolean | null)[];

export function emptyAnswers(): Answers {
  return questions.map(() => null);
}

export function answeredCount(answers: Answers): number {
  return answers.filter((a) => a !== null).length;
}

export function isComplete(answers: Answers): boolean {
  return answers.length === questions.length && answers.every((a) => a !== null);
}

export function yesCount(answers: Answers): number {
  return answers.filter((a) => a === true).length;
}

export function verdict(answers: Answers): string {
  if (!isComplete(answers)) return "Answer all five to see how boring your building is.";
  const yeses = yesCount(answers);
  if (yeses === questions.length) return "5 out of 5. Beautifully boring.";
  return `${yeses} out of 5. A survey shows what it would take to get back to boring.`;
}
