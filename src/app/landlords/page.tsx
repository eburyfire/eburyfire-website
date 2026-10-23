import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/landlords" },
  title: "Landlords and managing agents",
  description:
    "Fire alarm maintenance for landlords who own shop parades and mixed-use buildings, and the agents who manage them, across London and the South East.",
};

const benefits = [
  {
    title: "One contract for the whole parade",
    body: "Every unit and shared area you're responsible for, under one contract instead of a different firm for each building.",
    bg: "bg-pink",
  },
  {
    title: "Every record in one portal",
    body: "Certificates, visit history, log book entries and the asset register for each building, with an evidence pack to download when an insurer or assessor asks.",
    bg: "bg-butter",
  },
  {
    title: "Visits booked around your tenants",
    body: "Every service visit booked ahead, around the shops and flats in each building.",
    bg: "bg-mint",
  },
  {
    title: "Contracts that suit buildings with flats above",
    body: "Fixed 12-month terms, so a maintenance agreement on a mixed-use building doesn't roll on unnoticed.",
    bg: "bg-peri",
  },
];

const steps = [
  { n: "1", name: "Send us your list", desc: "The buildings and units you look after, and who occupies them." },
  { n: "2", name: "A photo of each panel", desc: "It shows us what's installed before anyone visits." },
  { n: "3", name: "A fixed price, in writing", desc: "Scope and price, building by building." },
  { n: "4", name: "Boring from then on", desc: "Visits booked around your tenants, records in your portal." },
];

const h2 = "display m-0 text-[40px] leading-[1.05] sm:text-[56px]";
const wrap = "mx-auto w-full max-w-[1240px] px-4 sm:px-10";

export default function LandlordsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Landlords and managing agents"
        title="You check the rent arrives. Ask the same of the building’s fire alarm."
        intro="If you own a parade of shops or a building with flats above, or you manage them for someone who does, the shared fire alarm is often your job. We make it a boring one."
      >
        <div className="pt-2">
          <CtaLink href="/contact#survey">Book a survey</CtaLink>
        </div>
      </PageHeader>

      <section className="on-dark bg-ink text-white">
        <div className={`${wrap} grid items-start gap-10 py-20 md:grid-cols-[1.2fr_1fr]`}>
          <div className="rise flex flex-col gap-4">
            <p className="eyebrow m-0 text-peri">Whose job is the fire alarm?</p>
            <h2 className="display m-0 text-[36px] leading-[1.05] sm:text-[52px]">
              If you control a building&rsquo;s common parts, the law can make its fire alarm your job.
            </h2>
          </div>
          <div className="rise grid gap-4 text-[17px] leading-[1.65] text-ink-soft">
            <p className="m-0">
              Each business is usually responsible for fire safety in the unit it occupies. Where you control shared parts
              of a building, or your lease makes you responsible for maintaining the fire alarm, that duty is yours to
              that extent.
            </p>
            <p className="m-0">
              The rules are in the Regulatory Reform (Fire Safety) Order 2005, articles 3, 5 and 17. The lease decides who
              does what in your building.
            </p>
          </div>
        </div>
      </section>

      <section className={`${wrap} flex flex-col gap-8 py-20`}>
        <h2 className={`rise ${h2}`}>One firm for the parade, not one per building.</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className={`rise lift flex flex-col gap-3 rounded-[28px] ${b.bg} p-8`}>
              <h3 className="m-0 text-[24px] font-extrabold leading-[1.2]">{b.title}</h3>
              <p className="m-0 text-[16px] leading-[1.6] text-body">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className={`${wrap} flex flex-col gap-8 py-20`}>
          <h2 className={`rise ${h2}`}>Four steps, nothing exciting.</h2>
          <ol className="rise m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-0">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-2.5 rounded-[24px] border-2 border-text bg-white p-7">
                <span className="display text-[44px]" aria-hidden="true">
                  {s.n}
                </span>
                <span className="text-[20px] font-extrabold">
                  <span className="sr-only">Step {s.n}: </span>
                  {s.name}
                </span>
                <span className="text-[15px] leading-[1.45] text-body">{s.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} py-20`}>
        <div className="rise flex flex-wrap items-end justify-between gap-6 rounded-[32px] bg-highlight p-8 sm:p-12">
          <div className="flex max-w-[620px] flex-col gap-3">
            <h2 className="display m-0 text-[40px] leading-[1.05] sm:text-[56px]">Send us your building list.</h2>
            <p className="m-0 text-[18px]">
              Managing buildings for several landlords? Send the lot. We reply within one working day.
            </p>
          </div>
          <CtaLink href="/contact#survey">Book a survey</CtaLink>
        </div>
      </section>
    </>
  );
}
