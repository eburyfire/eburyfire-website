import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Maintenance of fire detection and alarm systems to BS 5839-1 and gas suppression systems to BS EN 15004, under one contract, across London and the South East.",
};

type Service = {
  id: string;
  name: string;
  std: string;
  body: string[];
};

const services: Service[] = [
  {
    id: "fire-alarm",
    name: "Fire detection and alarm",
    std: "BS 5839-1:2025",
    body: [
      "Maintenance of existing fire detection and alarm systems to BS 5839-1:2025, including takeovers from your current contractor. Servicing is approximately every six months.",
    ],
  },
  {
    id: "gas-suppression",
    name: "Gas suppression",
    std: "BS EN 15004",
    body: [
      "Maintenance of gas suppression systems protecting server and comms rooms, archives and switch rooms, to BS EN 15004.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Alarm and suppression, under one contract."
        intro="Maintenance of fire detection and alarm systems and gas suppression systems across London and the South East, with one contract and one customer portal. We do maintenance only, not installation or design."
      />

      <section className="px-6 md:px-8 pb-16">
        <div className="mx-auto max-w-[1200px] grid gap-8 md:gap-10">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-24 border-t border-rule pt-8 md:pt-10 grid md:grid-cols-[220px_1fr] gap-6 md:gap-12"
            >
              <div>
                <h2 className="text-[20px] md:text-[22px] font-medium tracking-[-0.015em]">
                  {s.name}
                </h2>
                <p className="text-[12px] text-stone mt-1">{s.std}</p>
              </div>
              <div className="max-w-[680px]">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-[16px] text-ink leading-[1.7] mb-3 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-20 border-t border-rule">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-[26px] md:text-[32px] font-medium tracking-[-0.02em] leading-[1.1] mb-2">
              Send us your site list.
            </h2>
            <p className="text-[15px] text-stone">
              We reply to every enquiry within one working day.
            </p>
          </div>
          <CtaLink href="/contact" variant="primary">
            Get a quote
          </CtaLink>
        </div>
      </section>
    </>
  );
}
