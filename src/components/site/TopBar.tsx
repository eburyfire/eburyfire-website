import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CtaLink } from "@/components/ui/Button";
import { MobileMenu } from "@/components/site/MobileMenu";
import { NavLinks } from "@/components/site/NavLinks";
import { nav, site } from "@/lib/site";

const stripItems = [
  "Fire alarms",
  "Gas suppression",
  "Serviced offices",
  "Warehouses",
  "Hotels",
  "Landlords",
  "London and the South East",
  "Keep it boring",
];
const stripText = stripItems.join(" · ") + " · ";

export function TopBar() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <div className="overflow-hidden bg-butter py-2.5 text-[14px] font-bold">
        <p className="sr-only">Fire alarms and gas suppression, London and the South East.</p>
        <span className="strip-track inline-block whitespace-nowrap" aria-hidden="true">
          {stripText.repeat(4)}
        </span>
      </div>
      <header className="relative mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-4 py-5 sm:px-10 sm:py-6">
        <Link href="/" aria-label="Ebury Fire Systems home" className="shrink-0">
          <Logo height={56} />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="m-0 flex list-none gap-1.5 rounded-full bg-sand p-1.5 text-[17px] font-bold">
            <NavLinks items={nav} />
          </ul>
        </nav>

        <div className="hidden xl:block">
          <CtaLink href="/contact#survey">Book a survey</CtaLink>
        </div>

        <MobileMenu>
          <nav aria-label="Main" className="absolute left-4 right-4 top-full z-50 rounded-[28px] bg-sand p-4 shadow-[0_18px_40px_rgba(30,27,46,0.14)]">
            <ul className="m-0 grid list-none gap-1 p-0 text-[18px] font-bold">
              <NavLinks items={nav} block />
              <li>
                <a href={site.portalSignInUrl} className="block rounded-full px-5 py-3 no-underline">
                  Customer portal
                </a>
              </li>
            </ul>
            <CtaLink href="/contact#survey" className="mt-3 w-full">
              Book a survey
            </CtaLink>
          </nav>
        </MobileMenu>
      </header>
    </>
  );
}
