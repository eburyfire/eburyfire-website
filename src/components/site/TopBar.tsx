import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { nav, site } from "@/lib/site";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-rule">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 md:px-8 py-[14px]">
        <Link href="/" aria-label="Ebury Fire Systems home">
          <Wordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink hover:text-orange transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.portalSignInUrl}
          className="inline-flex items-center text-[13px] font-medium border border-ink text-ink rounded-[4px] px-[14px] py-[8px] hover:bg-ink hover:text-cream transition-colors"
        >
          Customer login
        </a>
      </div>
    </header>
  );
}
