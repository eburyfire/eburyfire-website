import Link from "next/link";
import { CtaLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const services = [
  {
    href: "/services#fire-alarm",
    name: "Fire detection and alarm",
    std: "BS 5839-1:2025",
    desc: "Addressable and conventional systems. Take-over maintenance of existing installations or new design and install.",
  },
  {
    href: "/services#gas-suppression",
    name: "Gas suppression",
    std: "BS EN 15004 · EC 304/2008",
    desc: "FM-200, Novec 1230, Inergen, Argonite, CO2, IG-55. Server rooms, data centres, archives, switch rooms.",
  },
  {
    href: "/services#emergency-lighting",
    name: "Emergency lighting",
    std: "BS 5266",
    desc: "Self-contained and central battery systems. Routine inspection, annual discharge testing, system upgrades.",
  },
  {
    href: "/services#aspirating",
    name: "Aspirating smoke detection",
    std: "VESDA",
    desc: "Data centres, archives, fine wine vaults, broadcast studios. Sensitive environments where early warning matters most.",
  },
  {
    href: "/services#watermist",
    name: "Watermist and pre-action",
    std: "BS 8489",
    desc: "Heritage buildings, high-value rooms, sensitive equipment areas where water damage from accidental discharge is unacceptable.",
  },
  {
    href: "/services#voice-alarm",
    name: "Voice alarm (PAVA)",
    std: "BS 5839-8",
    desc: "Integrated with fire detection where evacuation requires spoken instruction beyond bells and sounders.",
  },
];

const journey = [
  {
    n: "1",
    name: "Discovery call",
    desc: "15 minutes by video. We learn your sites, current contractor, renewal timing, what's working and what isn't.",
  },
  {
    n: "2",
    name: "Written proposal",
    desc: "A written proposal setting out scope, price and contract length for your sites.",
  },
  {
    n: "3",
    name: "Contract signed",
    desc: "Digital signature. Direct Debit set up for annual maintenance, or one-off payment link for project work.",
  },
  {
    n: "4",
    name: "First visit",
    desc: "Your visit is scheduled around your site. The certificate and visit record are filed in your customer portal.",
  },
];

const faqs = [
  {
    q: "Where do you operate?",
    a: "London and the South East.",
  },
  {
    q: "How do we switch from our current contractor?",
    a: "Check the notice period in your current contract first. Once you have given notice or your term has ended, we agree a start date with you and schedule the first service visit.",
  },
  {
    q: "What's included in a service visit?",
    a: "Servicing to BS 5839-1:2025, approximately every six months, covering inspection and testing of the panel, devices and batteries. A written certificate and the log book entry are filed in your customer portal.",
  },
  {
    q: "Do you handle the entire system or just maintenance?",
    a: "Both. We cover design, installation, commissioning and maintenance across fire and life safety, with one contract per customer.",
  },
  {
    q: "How do call-outs work?",
    a: "Call-outs are arranged under your maintenance contract, which sets out how to report a fault and what to expect before you sign. Call-outs are charged separately.",
  },
  {
    q: "Can we see compliance evidence whenever we need it?",
    a: "Yes. Your customer portal holds certificates, visit history, log book entries and the asset register. You can also download an evidence pack for the period you choose, for an insurance renewal, a Fire Risk Assessor or an audit.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  vatID: "GB512958088",
  areaServed: ["London", "South East England"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "128 City Road",
    addressLocality: "London",
    postalCode: "EC1V 2NX",
    addressCountry: "GB",
  },
  email: site.contactEmail,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Hero */}
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex gap-7 md:gap-10 items-stretch">
            <div className="w-[3px] bg-orange shrink-0 self-stretch min-h-[260px] hidden md:block" />
            <div className="flex-1 max-w-[820px]">
              <h1 className="text-[40px] md:text-[64px] leading-[1.04] font-medium tracking-[-0.03em] m-0 mb-7">
                London fire and life safety. Done properly.
              </h1>
              <p className="text-[17px] md:text-[20px] leading-[1.55] text-stone max-w-[620px] mb-10">
                One contractor for design, installation, commissioning and
                maintenance, across London and the South East. Maintenance is
                priced per site, per year, and fixed in writing after a short
                survey.
              </p>
              <div className="flex flex-wrap gap-3">
                <CtaLink href="/contact" variant="primary">
                  Book a 15-minute call
                </CtaLink>
                <CtaLink href="/contact" variant="outline">
                  Get a quote
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On-time target strip. A target, not a result: swap in the real
          rate from the portal's visit records once a quarter of visits exists. */}
      <section className="bg-surface border-y border-rule px-6 md:px-8 py-11">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div>
            <p aria-hidden="true" className="text-[12px] uppercase tracking-[0.1em] text-stone mb-2">
              Our target
            </p>
            <p aria-hidden="true" className="text-[52px] md:text-[60px] leading-none font-medium tracking-[-0.025em]">
              95<span className="text-orange text-[28px] md:text-[32px] ml-0.5 font-medium">%</span>
            </p>
          </div>
          <div className="hidden md:block w-px self-stretch bg-ink/10" />
          <p className="text-[15px] text-stone leading-[1.55] max-w-[560px]">
            <span className="sr-only">Our target is 95% </span>
            of visits on time. From our first quarter of visits, we&rsquo;ll
            publish how we&rsquo;re doing against it.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.12em] text-stone mb-5">
              What we do
            </p>
            <h2 className="text-[28px] md:text-[42px] font-medium tracking-[-0.025em] leading-[1.1] mb-4">
              One contractor across fire and life safety.
            </h2>
            <p className="text-[16px] md:text-[17px] text-stone leading-[1.5] max-w-[580px] mb-11">
              Design, installation, commissioning and maintenance. One contract
              and one customer portal across every service.
            </p>
          </Reveal>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Reveal key={s.href}>
                <Link
                  href={s.href}
                  className="block bg-surface rounded-[6px] p-7 transition-all hover:-translate-y-[3px] hover:shadow-[0_2px_16px_rgba(26,26,26,0.06)] h-full"
                >
                  <span className="inline-block w-7 h-[3px] bg-orange mb-5" />
                  <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-2">
                    {s.name}
                  </h3>
                  <p className="text-[12px] text-stone mb-3">{s.std}</p>
                  <p className="text-[14px] text-stone leading-[1.55]">
                    {s.desc}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust line */}
      <section className="bg-surface border-y border-rule px-6 md:px-8 py-14">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="text-[20px] md:text-[24px] tracking-[-0.015em] leading-[1.4] text-ink">
            One contract across your fire and life safety systems. Every visit
            recorded in your customer portal.
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.12em] text-stone mb-5">
              What happens next
            </p>
            <h2 className="text-[28px] md:text-[42px] font-medium tracking-[-0.025em] leading-[1.1] mb-4">
              From first call to first visit.
            </h2>
            <p className="text-[16px] md:text-[17px] text-stone leading-[1.5] max-w-[580px] mb-10">
              Four steps from your first conversation to your first service
              visit.
            </p>
          </Reveal>
          <div className="grid gap-7 grid-cols-2 lg:grid-cols-4">
            {journey.map((step) => (
              <Reveal key={step.n}>
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-orange/40 text-orange text-[15px] font-medium mb-5">
                    {step.n}
                  </div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] mb-2">
                    {step.name}
                  </h3>
                  <p className="text-[13px] text-stone leading-[1.6]">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-24 bg-surface border-y border-rule">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.12em] text-stone mb-5">
              Common questions
            </p>
            <h2 className="text-[28px] md:text-[42px] font-medium tracking-[-0.025em] leading-[1.1] mb-10">
              Things buyers usually ask.
            </h2>
          </Reveal>
          <div className="grid gap-8 md:gap-9 md:grid-cols-2">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <p className="text-[16px] font-medium tracking-[-0.01em] mb-2.5">
                  {f.q}
                </p>
                <p className="text-[14px] text-stone leading-[1.65]">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-medium tracking-[-0.025em] leading-[1.1] mb-2">
              Tell us about your sites.
            </h2>
            <p className="text-[15px] text-stone">
              We reply to every enquiry within one working day, or you can book
              a 15-minute call to talk through your buildings.
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
