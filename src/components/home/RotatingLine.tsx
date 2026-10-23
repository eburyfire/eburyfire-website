"use client";

import { useEffect, useState } from "react";

export type Line = { lead: string; punch: string };

// Rotates a short line every few seconds. Starts on the first line (so the
// server render is complete), honours reduced motion, and has a pause
// button because auto-updating text needs one (WCAG 2.2.2).
export function RotatingLine({
  lines,
  intervalMs = 3200,
}: {
  lines: Line[];
  intervalMs?: number;
}) {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduced || lines.length < 2) return;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const tick = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setI((n) => (n + 1) % lines.length);
        setVisible(true);
      }, 300);
    }, intervalMs);
    return () => {
      clearInterval(tick);
      if (swap) clearTimeout(swap);
    };
  }, [paused, reduced, lines.length, intervalMs]);

  const line = lines[i];
  const canRotate = !reduced && lines.length > 1;

  return (
    <div className="flex items-stretch gap-2 max-w-[680px]">
      <p
        className="flex-1 bg-ink text-cream rounded-[6px] px-5 py-4 display text-[19px] md:text-[23px] min-h-[3.4em] flex items-center"
        aria-live="off"
      >
        <span
          className={`transition-opacity duration-300 motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {line.lead} <span className="text-orange">{line.punch}</span>
        </span>
      </p>
      {canRotate ? (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Play the rotating line" : "Pause the rotating line"}
          className="shrink-0 w-12 rounded-[6px] border border-ink/20 text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          <span aria-hidden="true" className="label-mono">
            {paused ? "▶" : "❙❙"}
          </span>
        </button>
      ) : null}
    </div>
  );
}
