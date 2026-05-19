import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-cream/50 mb-3">
              Company
            </p>
            <p className="text-[14px] leading-relaxed">
              {site.legalName}
              <br />
              Registered in England and Wales
              <br />
              Company No. {site.companyNumber}
              <br />
              VAT {site.vat}
            </p>
            <p className="text-[12px] text-cream/60 mt-3">
              Registered office: {site.registeredOffice}
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-cream/50 mb-3">
              Site
            </p>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/services" className="hover:text-orange transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-orange transition-colors">Pricing</Link></li>
              <li><Link href="/resources" className="hover:text-orange transition-colors">Resources</Link></li>
              <li><Link href="/about" className="hover:text-orange transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-orange transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-cream/50 mb-3">
              Customer
            </p>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a
                  href={site.portalSignInUrl}
                  className="hover:text-orange transition-colors"
                >
                  Customer login
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="hover:text-orange transition-colors"
                >
                  {site.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-cream/50 mb-3">
              Legal
            </p>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/privacy" className="hover:text-orange transition-colors">Privacy</Link></li>
              <li><Link href="/data-retention" className="hover:text-orange transition-colors">Data retention</Link></li>
              <li><Link href="/accessibility" className="hover:text-orange transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 text-[11px] text-cream/50 tracking-[0.02em]">
          {site.name} is a trading name of {site.legalName} &middot; A member of the
          Ebury Holdings Group
        </div>
      </div>
    </footer>
  );
}
