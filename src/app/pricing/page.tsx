import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Maintenance from £600 per site per year. Project work by quote. Discovery calls 15 minutes, no obligation.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Plain. Published."
        intro="Maintenance is per site, per year. Project work is bespoke — every install, commission and upgrade is quoted on the actual scope after we&rsquo;ve seen the building."
      />

      <section className="px-6 md:px-8 pb-12">
        <div className="mx-auto max-w-[1200px] grid gap-6 md:gap-10 md:grid-cols-2 bg-surface border border-rule rounded-[6px] p-8 md:p-12">
          <div>
            <p className="text-[14px] text-stone mb-2">Maintenance</p>
            <p className="text-[40px] md:text-[48px] font-medium tracking-[-0.025em] leading-none">
              from £600
              <span className="text-stone text-[16px] font-normal ml-2">
                / site / year
              </span>
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
              What&rsquo;s included in maintenance
            </h2>
            <p className="text-[16px] text-ink leading-[1.7]">
              Annual service to BS 5839-1:2025 and applicable standards for
              other systems. Quarterly tests where required. Site visit reports
              and certificates filed within 48 hours. Asset register and log
              book management via the customer portal. One supplier, one
              contract, one invoice across every site.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] mb-4">
              What&rsquo;s quoted separately
            </h2>
            <p className="text-[16px] text-ink leading-[1.7]">
              New system design, installation, and commissioning. System
              upgrades and modifications. Fire Risk Assessments. Emergency
              callouts, priced per visit. Out-of-scope works.
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
