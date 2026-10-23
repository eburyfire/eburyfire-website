import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Design, installation, commissioning and maintenance across fire detection and alarm, gas suppression, emergency lighting, aspirating detection, watermist, voice alarm and BS 7273 interface work, in London and the South East.",
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
      "Addressable and conventional systems. New installations, takeovers from previous contractors, and ongoing maintenance to BS 5839-1:2025, with servicing approximately every six months.",
    ],
  },
  {
    id: "gas-suppression",
    name: "Gas suppression",
    std: "BS EN 15004 · EC 304/2008",
    body: [
      "Total flood and local application systems. FM-200, Novec 1230, Inergen (IG-541), Argonite, CO2, IG-55. To BS EN 15004 and EC 304/2008.",
    ],
  },
  {
    id: "emergency-lighting",
    name: "Emergency lighting",
    std: "BS 5266",
    body: [
      "Self-contained and central battery systems, installed and maintained to BS 5266.",
    ],
  },
  {
    id: "aspirating",
    name: "Aspirating smoke detection",
    std: "VESDA",
    body: [
      "VESDA aspirating detection for data centres, archives, fine wine vaults, broadcast studios and other valuable rooms that are hard to protect.",
    ],
  },
  {
    id: "watermist",
    name: "Watermist and pre-action",
    std: "BS 8489",
    body: [
      "Heritage buildings, high-value rooms, sensitive equipment areas. Installation and maintenance to BS 8489.",
    ],
  },
  {
    id: "voice-alarm",
    name: "Voice alarm (PAVA)",
    std: "BS 5839-8",
    body: [
      "Public address and voice alarm systems integrated with fire detection where required. Installation and maintenance to BS 5839-8.",
    ],
  },
  {
    id: "bs-7273",
    name: "BS 7273 interface work",
    std: "BS 7273",
    body: [
      "Release mechanism and door retainer interface for compartmentation and means of escape.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="One contractor, end to end."
        intro="Design, installation, commissioning and maintenance across the full fire and life safety stack, in London and the South East. One contract, one customer portal."
      />

      <section className="px-6 md:px-8 pb-16">
        <div className="mx-auto max-w-[1200px] grid gap-8 md:gap-10">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-24 border-t border-rule pt-8 md:pt-10 grid md:grid-cols-[300px_1fr] gap-6 md:gap-12"
            >
              <div>
                <p className="label-mono text-ember-ink mb-2">{s.std}</p>
                <h2 className="display text-[26px] md:text-[30px]">{s.name}</h2>
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

      <section className="bg-orange text-ink px-6 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="display text-[32px] md:text-[44px] mb-2">
              Send us your site list.
            </h2>
            <p className="text-[15px]">
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
