import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/Button";
import { VisitTabs } from "@/components/home/VisitTabs";
import { OneContractBand } from "@/components/site/WhoTiles";
import { howItWorks, otherServices, whatWeLookAfter } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "What we do",
  description:
    "Fire alarm servicing to BS 5839-1 and gas suppression maintenance to BS EN 15004, on one annual plan across London and the South East.",
};

const h2 = "display m-0 text-[40px] leading-[1.05] sm:text-[56px]";
const wrap = "mx-auto w-full max-w-[1240px] px-4 sm:px-10";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="What we look after"
        intro="One annual plan for your fire alarm and gas suppression: every service visit booked for you, a certificate after each, one invoice. It starts with a survey."
      >
        <div className="pt-2">
          <CtaLink href="/contact#survey">Book a survey</CtaLink>
        </div>
      </PageHeader>

      <section className={`${wrap} flex flex-col gap-5 pb-16`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          {whatWeLookAfter.map((w) => (
            <div
              key={w.id}
              id={w.id}
              className={`rise flex min-h-[200px] scroll-mt-6 flex-col justify-between gap-3 rounded-[28px] ${w.bg} p-9`}
            >
              <h2 className="m-0 text-[30px] font-extrabold">{w.name}</h2>
              <p className="m-0 text-[17px] leading-[1.5] text-body">{w.body}</p>
            </div>
          ))}
        </div>
        <p className="m-0 text-[16px] leading-[1.6] text-body">
          <strong>Other fire safety services, quoted separately:</strong> {otherServices}
        </p>
      </section>

      <section className="bg-sand">
        <div className={`${wrap} flex flex-col gap-7 py-20`}>
          <h2 className={`rise ${h2}`}>What a service visit includes</h2>
          <div className="rise">
            <VisitTabs idPrefix="services-visit" />
          </div>
        </div>
      </section>

      <section className={`${wrap} flex flex-col gap-7 py-20`}>
        <h2 className={`rise ${h2}`}>How it works</h2>
        <ol className="rise m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-0">
          {howItWorks.map((s) => (
            <li key={s.n} className="flex flex-col gap-2.5 rounded-[24px] border-2 border-text p-7">
              <span className="display text-[44px]" aria-hidden="true">
                {s.n}
              </span>
              <span className="text-[20px] font-extrabold">
                <span className="sr-only">Step {s.n}: </span>
                {s.name}
              </span>
              <span className="text-[15px] leading-[1.45] text-body">{s.body}</span>
            </li>
          ))}
        </ol>
        <OneContractBand href="/contact#survey" />
      </section>
    </>
  );
}
