import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CtaLink } from "@/components/ui/Button";
import { MobileMenu } from "@/components/site/MobileMenu";
import { nav, site } from "@/lib/site";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-rule">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between gap-6 px-6 md:px-8 py-[12px]">
        <Link href="/" aria-label="Ebury Fire Systems home" className="shrink-0 whitespace-nowrap">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden xl:flex items-center gap-7 text-[14px] whitespace-nowrap">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink hover:text-ember-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4 whitespace-nowrap">
          <a
            href={site.portalSignInUrl}
            className="text-[13px] text-ink underline-offset-4 hover:underline"
          >
            Customer login
          </a>
          <CtaLink href="/contact" variant="ember" className="px-[16px] py-[9px] text-[14px]">
            Get a quote
          </CtaLink>
        </div>

        {/* Below 1280px: a disclosure menu that closes on navigation. */}
        <MobileMenu>
          <nav
            aria-label="Main"
            className="absolute left-0 right-0 top-full bg-cream border-b border-rule px-6 py-5 grid gap-4 text-[17px] max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-ink">
                {item.label}
              </Link>
            ))}
            <a href={site.portalSignInUrl} className="text-ink">
              Customer login
            </a>
            <CtaLink href="/contact" variant="ember">
              Get a quote
            </CtaLink>
          </nav>
        </MobileMenu>
      </div>
    </header>
  );
}
