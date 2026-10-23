import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { partnerHref, site } from "@/lib/site";

// No company number, VAT or address here: they live in the privacy notice
// (founder, 23 Oct 2026; reg 25 SI 2015/17).
export function SiteFooter() {
  const links: { label: string; href: string; external?: boolean }[] = [
    { label: "Customer portal", href: site.portalSignInUrl, external: true },
    { label: "Fire firms: become a delivery partner", href: partnerHref, external: true },
    { label: "Careers", href: "/careers" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/privacy#cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ];
  if (site.linkedinUrl) links.push({ label: "LinkedIn", href: site.linkedinUrl, external: true });

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-6 px-4 py-12 text-[14px] text-muted sm:px-10">
        <div className="flex flex-col gap-2">
          <Link href="/" aria-label="Ebury Fire Systems home" className="-ml-2 w-fit">
            <Logo height={44} />
          </Link>
          <p className="m-0">Ebury Fire Systems is part of Ebury Holdings Group.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
            {links.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a href={l.href} className="underline underline-offset-2 hover:text-blue">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="underline underline-offset-2 hover:text-blue">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
