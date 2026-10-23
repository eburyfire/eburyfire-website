"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categoryLabel, formatPublished, type ResourceCategory, type ResourceMeta } from "@/lib/resources";

const tints = ["bg-pink", "bg-butter", "bg-mint", "bg-peri", "bg-lilac", "bg-sand"];

export function ResourceFilters({ items }: { items: ResourceMeta[] }) {
  const [active, setActive] = useState<"all" | ResourceCategory>("all");
  // Only offer categories that have articles.
  const filters = useMemo(
    () => ["all" as const, ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  return (
    <div>
      <div role="group" aria-label="Filter articles" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f)}
              className={`pop rounded-full px-5 py-2.5 text-[15px] font-extrabold ${on ? "bg-text text-white" : "bg-sand text-text"}`}
            >
              {f === "all" ? "All" : categoryLabel(f)}
            </button>
          );
        })}
      </div>
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
        {visible.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/articles/${item.slug}`}
              className={`lift flex h-full flex-col gap-3 rounded-[28px] ${tints[i % tints.length]} p-8 no-underline`}
            >
              <span className="eyebrow">
                {categoryLabel(item.category)} · {item.readingMinutes} min read
              </span>
              <span className="text-[24px] font-extrabold leading-[1.2]">{item.title}</span>
              <span className="text-[16px] leading-[1.55] text-body">{item.excerpt}</span>
              <span className="mt-auto text-[14px] text-muted">{formatPublished(item.publishedAt)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
