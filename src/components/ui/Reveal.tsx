"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("in-view");
      return;
    }

    // Arm the entrance state only now that JS is running, so SSR keeps the
    // element visible. If the element is already on-screen at mount the
    // observer will immediately add `.in-view` and the transition replays.
    el.classList.add("reveal-armed");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal ${className}`}
    >
      {children}
    </As>
  );
}
