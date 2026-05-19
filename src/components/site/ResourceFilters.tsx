"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  categoryLabel,
  formatPublished,
  type ResourceCategory,
  type ResourceMeta,
} from "@/lib/resources";

const FILTERS: Array<"all" | ResourceCategory> = [
  "all",
  "compliance",
  "how-to",
  "templates",
  "news",
];

export function ResourceFilters({ items }: { items: ResourceMeta[] }) {
  const [active, setActive] = useState<"all" | ResourceCategory>("all");

  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`text-[13px] px-3 py-1.5 rounded-full border transition-colors ${
                isActive
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink border-rule hover:border-ink/40"
              }`}
            >
              {f === "all" ? "All" : categoryLabel(f)}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-[14px] text-stone">No articles in this category yet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/resources/${item.slug}`}
                className="block bg-surface border border-rule rounded-[6px] p-6 transition-all hover:-translate-y-[2px] hover:shadow-[0_2px_16px_rgba(26,26,26,0.06)] h-full"
              >
                <div className="flex items-center gap-3 mb-3 text-[11px] uppercase tracking-[0.12em] text-stone">
                  <span className="text-orange">{categoryLabel(item.category)}</span>
                  <span aria-hidden>·</span>
                  <span>{item.readingMinutes} min read</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-0.015em] leading-[1.25] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-stone leading-[1.6] mb-4">
                  {item.excerpt}
                </p>
                <p className="text-[12px] text-stone">
                  {formatPublished(item.publishedAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
