"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const captions = [
  "What a boring service visit looks like.",
  "Booked ahead. You know the date and time well before the day.",
  "10:00. Signed in at reception, straight to work.",
  "First, the panel and the log book. Power, batteries, fault history.",
  "Detectors and call points tested. Sounders checked.",
  "One detector past its best. Explained before we leave. Quoted before it’s fixed.",
  "Covers back on. Nothing left behind.",
  "Certificate and log book entry, in your portal.",
  "Your business carries on, around the clock.",
  "Keep it boring. Book a survey.",
];

type Mode = "idle" | "playing" | "paused" | "endcard";

// The approved 60-second hero animation (MP4 of hero-boring-visit.html).
// Muted loop that starts when it scrolls into view, with a pause button.
// With reduced motion it shows a still end card and plays only on request.
// Nothing is downloaded until it plays (preload="none").
export function HeroAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const userPaused = useRef(false);

  const mounted = useRef(true);

  async function play() {
    userPaused.current = false;
    const v = videoRef.current;
    if (!v || !mounted.current) return;
    try {
      await v.play();
    } catch (err) {
      // An interrupted load (AbortError) isn't a failure; anything else
      // (autoplay refused) falls back to the play button.
      if (mounted.current && (err as Error)?.name !== "AbortError") {
        setMode((m) => (m === "endcard" ? m : "idle"));
      }
    }
  }

  function pause() {
    userPaused.current = true;
    videoRef.current?.pause();
  }

  useEffect(() => {
    mounted.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a media query once on mount
      setMode("endcard");
      return () => {
        mounted.current = false;
      };
    }
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      return () => {
        mounted.current = false;
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (entry.isIntersecting) {
          if (!userPaused.current) void play();
        } else if (v && !v.paused) {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      mounted.current = false;
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="on-dark flex min-w-0 flex-[2_1_340px] flex-col justify-center gap-6 overflow-hidden rounded-[32px] bg-ink p-4 text-white sm:p-6"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[22px] bg-sand">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${mode === "endcard" ? "invisible" : ""}`}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setMode("playing")}
          onPause={() => setMode((m) => (m === "playing" ? "paused" : m))}
          poster="/video/boring-visit-poster.jpg"
          aria-label="What a boring service visit looks like, in 60 seconds. Captions are below."
          aria-describedby="hero-animation-captions"
        >
          {/* preload="none": nothing downloads until it plays. */}
          <source src="/video/boring-visit.mp4" type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" src="/video/boring-visit.en.vtt" />
        </video>

        {mode === "endcard" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-sand p-4 text-center">
            <p className="display m-0 text-[40px] leading-none text-ink sm:text-[52px]">
              Keep it <span className="hl">boring.</span>
            </p>
          </div>
        ) : null}

        {mode === "idle" || mode === "endcard" ? (
          <button
            type="button"
            aria-label="Play animation"
            onClick={() => void play()}
            className={`${mode === "idle" ? "pulse" : ""} pop absolute bottom-4 left-4 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-highlight shadow-[0_6px_20px_rgba(30,27,46,.25)]`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4l13 8-13 8z" fill="#1E1B2E" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => (mode === "playing" ? pause() : void play())}
            aria-label={mode === "playing" ? "Pause animation" : "Play animation"}
            className="absolute bottom-3 right-3 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-ink/80 text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d={mode === "playing" ? "M6 4h4v16H6zM14 4h4v16h-4z" : "M7 4l13 8-13 8z"} fill="#FFFFFF" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 px-2 pb-2 sm:px-3">
        <p className="m-0 text-[24px] font-extrabold leading-[1.2] sm:text-[26px]">
          What a boring service visit looks like, in 60 seconds.
        </p>
        {mode === "endcard" ? (
          <Link href="#contact" className="w-fit font-extrabold text-white underline underline-offset-2">
            Book a survey
          </Link>
        ) : null}
      </div>

      <ol id="hero-animation-captions" className="sr-only">
        {captions.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>
    </div>
  );
}
