"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({
  items,
  block = false,
}: {
  items: readonly { label: string; href: string }[];
  block?: boolean;
}) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`${block ? "block" : "inline-block"} rounded-full px-5 py-3 no-underline hover:text-blue ${current ? "bg-white" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
