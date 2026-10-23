"use client";

import { useRef, useState } from "react";
import { scopes } from "@/lib/content";

type Key = keyof typeof scopes;
const keys: Key[] = ["alarm", "gas"];

// "What a service visit includes": two tabs (WAI-ARIA tabs pattern).
export function VisitTabs({ idPrefix = "visit" }: { idPrefix?: string }) {
  const [tab, setTab] = useState<Key>("alarm");
  const refs = useRef<Record<Key, HTMLButtonElement | null>>({ alarm: null, gas: null });
  const scope = scopes[tab];

  function onKey(e: React.KeyboardEvent, k: Key) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const i = keys.indexOf(k);
    const next =
      e.key === "Home" ? keys[0] : e.key === "End" ? keys[keys.length - 1] : keys[(i + (e.key === "ArrowRight" ? 1 : -1) + keys.length) % keys.length];
    setTab(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-7">
      <div role="tablist" aria-label="Service visits" className="flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            ref={(el) => {
              refs.current[k] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${k}`}
            aria-selected={k === tab}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={k === tab ? 0 : -1}
            onClick={() => setTab(k)}
            onKeyDown={(e) => onKey(e, k)}
            className={`pop rounded-full px-6 py-3.5 text-[16px] font-extrabold ${k === tab ? "bg-text text-white" : "bg-white text-text"}`}
          >
            {scopes[k].label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${idPrefix}-panel`}
        aria-labelledby={`${idPrefix}-tab-${tab}`}
        tabIndex={0}
        className="flex flex-wrap gap-10 rounded-[28px] bg-white p-6 sm:p-10"
      >
        <div className="flex flex-[1_1_260px] flex-col gap-3">
          <p className="eyebrow m-0 text-muted">{scope.standard}</p>
          <p className="m-0 text-[28px] font-extrabold leading-[1.2]">{scope.title}</p>
          <p className="m-0 text-[16px] leading-[1.5] text-body">{scope.note}</p>
        </div>
        <ul className="m-0 grid flex-[2_1_420px] list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 p-0">
          {scope.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.45]">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mint text-[13px] font-extrabold"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
