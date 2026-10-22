import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Maintenance priced per site, per year, fixed in writing after a short survey. Call-outs charged separately. Project work by quote. Discovery calls 15 minutes, no obligation.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Plain. Fixed in writing."
        intro="Maintenance is per site, per year, fixed in writing after we’ve seen the building. Project work is quoted on the actual scope: every installation, commissioning and upgrade."
      />

      <section className="px-6 md:px-8 pb-12">
        <div className="mx-auto max-w-[1200px] grid gap-6 md:gap-10 md:grid-cols-2 bg-surface border border-rule rounded-[6px] p-8 md:p-12">
          <div>
            <p className="text-[14px] text-stone mb-2">Maintenance</p>
            <p className="text-[40px] md:text-[48px] font-medium tracking-[-0.025em] leading-none">
              per site, per year
            </p>
            <p className="text-[14px] text-stone mt-3">
              Fixed in writing after a short survey.
            </p>
          </div>
          <div>
            <p className="text-[14px] text-stone mb-2">Project work</p>
            <p className="text-[40px] md:text-[48px] font-medium tracking-[-0.025em] leading-none">
              by quote
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] mb-4">
              What’s included in maintenance
            </h2>
            <p className="text-[16px] text-ink leading-[1.7]">
              Fire detection and alarm servicing to BS 5839-1:2025,
              approximately every six months, gas suppression servicing to BS
              EN 15004, and other systems to their own standards. Visit reports and certificates are filed in your
              customer portal, with your log book entries and asset register.
              One contract across every site.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] mb-4">
              What’s quoted separately
            </h2>
            <p className="text-[16px] text-ink leading-[1.7]">
              New system design, installation and commissioning. System
              upgrades and modifications. Fire risk assessments. Call-outs,
              charged separately. Work outside the agreed maintenance scope.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-20 border-t border-rule">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-[26px] md:text-[32px] font-medium tracking-[-0.02em] leading-[1.1] mb-3">
            Get a quote tailored to your buildings.
          </h2>
          <p className="text-[16px] text-stone max-w-[620px] mb-7">
            Discovery calls run on Zoom or Teams, 15 minutes, no obligation.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/contact" variant="primary">
              Get a quote
            </CtaLink>
            <CtaLink
              href={`mailto:${site.contactEmail}?subject=Discovery%20call`}
              variant="outline"
            >
              Email us to book
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
