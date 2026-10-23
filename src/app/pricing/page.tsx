import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/Button";
import { compare, howItWorks, otherServices } from "@/lib/content";

// No Ebury price appears anywhere on the site (founder rule). This page
// explains how the price is set: fixed in writing after a survey.
export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Fixed price after a survey",
  description:
    "One price for the year’s servicing, agreed in writing before we start. It starts with a survey.",
};

const price = compare.find((c) => c.topic === "Your price")!;

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Price"
        title={
          <>
            Fixed price, <span className="hl">in writing.</span>
          </>
        }
        intro={howItWorks[1].body}
      >
        <div className="pt-2">
          <CtaLink href="/contact#survey">Book a survey</CtaLink>
        </div>
      </PageHeader>

      <section className="mx-auto grid w-full max-w-[1240px] gap-4 px-4 pb-20 sm:px-10 md:grid-cols-2">
        <div className="rise flex flex-col gap-3 rounded-[28px] bg-highlight p-8 sm:p-10">
          <h2 className="m-0 text-[26px] font-extrabold">Your price</h2>
          <p className="m-0 text-[17px] leading-[1.6]">{price.us}</p>
        </div>
        <div className="rise flex flex-col gap-3 rounded-[28px] bg-sand p-8 sm:p-10">
          <h2 className="m-0 text-[26px] font-extrabold">Other fire safety services</h2>
          <p className="m-0 text-[17px] leading-[1.6]">Quoted separately: {otherServices}</p>
        </div>
      </section>
    </>
  );
}
