import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Landlords and managing agents",
  description:
    "Fire alarm and fire safety maintenance for landlords who own shop parades and mixed-use buildings, and the agents who manage them, across London and the South East.",
};

const benefits = [
  {
    title: "One contract for the whole parade",
    body: "Every unit and shared area you're responsible for, under one contract instead of a different firm for each building.",
  },
  {
    title: "Every record in one portal",
    body: "Certificates, visit history, log book entries and the asset register for each building, with an evidence pack to download when an insurer or assessor asks.",
  },
  {
    title: "Visits scheduled around your tenants",
    body: "Servicing to BS 5839-1:2025, approximately every six months, booked around the shops and flats in each building.",
  },
  {
    title: "Contracts that suit buildings with flats above",
    body: "Fixed 12-month terms, so a maintenance agreement on a mixed-use building doesn't roll on unnoticed.",
  },
];

const steps = [
  { n: "1", name: "Send us your list", desc: "The buildings and units you look after, and who occupies them." },
  { n: "2", name: "A photo of each panel", desc: "It shows us what's installed before anyone visits." },
  { n: "3", name: "A written proposal", desc: "Scope, price and contract length, building by building." },
  { n: "4", name: "Boring from then on", desc: "Visits booked around your tenants, records in your portal." },
];

export default function LandlordsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Landlords and managing agents"
        title="You check the rent arrives. Ask the same of the building's fire alarm."
        intro="If you own a parade of shops or a building with flats above, or you manage them for someone who does, the shared fire alarm is often your job. We make it a boring one."
      />

      {/* Whose job is it */}
      <section className="bg-ink text-cream px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] grid gap-10 md:grid-cols-[1.2fr_1fr] items-start">
          <Reveal>
            <p className="label-mono text-orange mb-5">Whose job is the fire alarm?</p>
            <h2 className="display text-[34px] md:text-[52px]">
              If you control a building&rsquo;s common parts, the law can make
              its fire alarm your job.
            </h2>
          </Reveal>
          <Reveal>
            <div className="grid gap-4 text-[16px] leading-[1.65] text-cream/85">
              <p>
                Each business is usually responsible for fire safety in the unit
                it occupies. Where you control shared parts of a building, or
                your lease makes you responsible for maintaining the fire alarm,
                that duty is yours to that extent.
              </p>
              <p>
                The rules are in the Regulatory Reform (Fire Safety) Order 2005,
                articles 5 and 17. The lease decides who does what in your
                building.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">What you get</p>
            <h2 className="display text-[34px] md:text-[52px] max-w-[18ch] mb-12">
              One firm for the parade, not one per building.
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((b) => (
              <Reveal key={b.title}>
                <div className="bg-surface rounded-[6px] p-7 h-full">
                  <h3 className="display text-[24px] mb-3">{b.title}</h3>
                  <p className="text-[15px] text-stone leading-[1.6]">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we start */}
      <section className="bg-surface border-y border-rule px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">How we start</p>
            <h2 className="display text-[34px] md:text-[52px] mb-12">
              Four steps, nothing exciting.
            </h2>
          </Reveal>
          <ol className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n}>
                <Reveal>
                  <p className="display text-[56px] leading-none text-orange mb-4" aria-hidden="true">
                    {s.n}
                  </p>
                  <h3 className="text-[18px] font-medium mb-2">
                    <span className="sr-only">Step {s.n}: </span>
                    {s.name}
                  </h3>
                  <p className="text-[14px] text-stone leading-[1.6]">{s.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange text-ink px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2 className="display text-[36px] md:text-[56px] max-w-[16ch] mb-4">
              Send us your building list.
            </h2>
            <p className="text-[16px] max-w-[520px]">
              Managing buildings for several landlords? Send the lot. We reply
              to every enquiry within one working day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/contact" variant="primary">
              Get a quote
            </CtaLink>
            <CtaLink href="/contact" variant="outline">
              Book a 15-minute call
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
