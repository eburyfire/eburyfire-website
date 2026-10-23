import Link from "next/link";
import { whoTiles } from "@/lib/content";

export function WhoTiles() {
  return (
    <div className="rise grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
      {whoTiles.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className={`lift flex min-h-[180px] flex-col justify-end gap-2 rounded-[28px] ${t.bg} p-8 no-underline`}
        >
          <span className="eyebrow">{t.label}</span>
          <span className="text-[24px] font-extrabold leading-[1.15]">{t.line}</span>
        </Link>
      ))}
    </div>
  );
}

export function OneContractBand({ href }: { href: string }) {
  return (
    <div className="rise on-dark flex flex-wrap items-center justify-between gap-5 rounded-[28px] bg-ink px-6 py-9 text-white sm:px-10">
      <div className="flex flex-col gap-1.5">
        <p className="m-0 text-[28px] font-extrabold">One contract for every site.</p>
        <p className="m-0 text-[17px] text-ink-soft">
          Fire alarms and gas suppression on one schedule, with one portal and one invoice.
        </p>
      </div>
      <Link
        href={href}
        className="pop rounded-full bg-highlight px-7 py-4 text-[16px] font-extrabold text-ink no-underline"
      >
        Tell us how many sites
      </Link>
    </div>
  );
}
