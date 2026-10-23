"use client";

import { useEffect, useState } from "react";

export type Line = { lead: string; punch: string };

// Rotates a short line every few seconds. Starts on the first line (so the
// server render is complete), stays still for reduced-motion users, and
// has a pause button because auto-updating text needs one (WCAG 2.2.2).
export function RotatingLine({
  lines,
  intervalMs = 3200,
}: {
  lines: Line[];
  intervalMs?: number;
}) {
  const [i, setI] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || lines.length < 2) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tick: ReturnType<typeof setInterval> | undefined;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const stop = () => {
      if (tick) clearInterval(tick);
      if (swap) clearTimeout(swap);
      tick = swap = undefined;
    };
    const start = () => {
      stop();
      if (mq.matches) return;
      tick = setInterval(() => {
        setFading(true);
        swap = setTimeout(() => {
          setI((n) => (n + 1) % lines.length);
          setFading(false);
        }, 300);
      }, intervalMs);
    };
    const onMotionChange = () => {
      setFading(false);
      start();
    };
    start();
    mq.addEventListener("change", onMotionChange);
    return () => {
      mq.removeEventListener("change", onMotionChange);
      stop();
    };
  }, [paused, lines.length, intervalMs]);

  const line = lines[i];
  // A pause or a reduced-motion switch mid-fade must never leave it blank.
  const hidden = fading && !paused;

  return (
    <div className="flex items-stretch gap-2 max-w-[680px]">
      <p
        className="flex-1 bg-ink text-cream rounded-[6px] px-5 py-4 display text-[19px] md:text-[23px] min-h-[3.4em] flex items-center"
        aria-live="off"
      >
        <span
          className={`transition-opacity duration-300 motion-reduce:transition-none motion-reduce:opacity-100 ${hidden ? "opacity-0" : "opacity-100"}`}
        >
          {line.lead} <span className="text-orange">{line.punch}</span>
        </span>
      </p>
      {lines.length > 1 ? (
        <button
          type="button"
          onClick={() => {
            setPaused((p) => !p);
            setFading(false);
          }}
          aria-pressed={paused}
          aria-label="Pause the rotating line"
          className="motion-reduce:hidden shrink-0 w-12 grid place-items-center rounded-[6px] border border-ink/20 text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            {paused ? (
              <path d="M4 2.5v11l9-5.5z" />
            ) : (
              <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />
            )}
          </svg>
        </button>
      ) : null}
    </div>
  );
}
