"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// A plain <details> disclosure that also closes when the route changes
// (the header persists across client navigation) and on Escape.
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (e.key !== "Escape" || !el?.open) return;
      el.removeAttribute("open");
      el.querySelector("summary")?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details
      ref={ref}
      className="xl:hidden group"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) {
          ref.current?.removeAttribute("open");
        }
      }}
    >
      <summary className="list-none cursor-pointer select-none label-mono text-ink border border-ink rounded-[4px] px-3 py-2 [&::-webkit-details-marker]:hidden">
        Menu
      </summary>
      {children}
    </details>
  );
}
