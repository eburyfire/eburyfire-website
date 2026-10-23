import Link from "next/link";
import { site } from "@/lib/site";

const linkClass = "hover:text-orange transition-colors";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-cream mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pt-16 md:pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 md:pb-16 border-b border-cream/15">
          <p className="display-xl text-[64px] md:text-[112px]">
            Keep it boring<span className="text-orange">.</span>
          </p>
          <p className="text-[15px] text-cream/70 max-w-[320px] leading-[1.55]">
            {site.deal}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-4 pt-12">
          <div>
            <p className="label-mono text-cream/50 mb-3">Company</p>
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
            <p className="label-mono text-cream/50 mb-3">Site</p>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/services" className={linkClass}>Services</Link></li>
              <li><Link href="/landlords" className={linkClass}>Landlords and agents</Link></li>
              <li><Link href="/pricing" className={linkClass}>Pricing</Link></li>
              <li><Link href="/resources" className={linkClass}>Resources</Link></li>
              <li><Link href="/about" className={linkClass}>About</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-mono text-cream/50 mb-3">Customer</p>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href={site.portalSignInUrl} className={linkClass}>
                  Customer login
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contactEmail}`} className={linkClass}>
                  {site.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono text-cream/50 mb-3">Legal</p>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/privacy" className={linkClass}>Privacy</Link></li>
              <li><Link href="/data-retention" className={linkClass}>Data retention</Link></li>
              <li><Link href="/accessibility" className={linkClass}>Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 text-[11px] text-cream/50 tracking-[0.02em]">
          {site.name} is a trading name of {site.legalName} · A member of the
          Ebury Holdings Group
        </div>
      </div>
    </footer>
  );
}
