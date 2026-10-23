import type { Metadata } from "next";
import Link from "next/link";
import { CtaLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RotatingLine, type Line } from "@/components/home/RotatingLine";
import { BoringCheck } from "@/components/home/BoringCheck";
import { site } from "@/lib/site";

const heroLines: Line[] = [
  { lead: "You've got a full house on Saturday.", punch: "We've got the fire alarm." },
  { lead: "You've got a waiting room full by nine.", punch: "We've got the fire alarm." },
  { lead: "You've got the 6am spin class.", punch: "We've got the fire alarm." },
  { lead: "You've got twelve shops on one parade.", punch: "We've got the fire alarms." },
  { lead: "You've got a server room full of client files.", punch: "We've got the gas suppression." },
];

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
    desc: "Data centres, archives, fine wine vaults, broadcast studios. Sensitive rooms where early warning matters most.",
  },
  {
    href: "/services#watermist",
    name: "Watermist and pre-action",
    std: "BS 8489",
    desc: "Heritage buildings, valuable rooms and sensitive equipment, where water damage from an accidental discharge is unacceptable.",
  },
  {
    href: "/services#voice-alarm",
    name: "Voice alarm (PAVA)",
    std: "BS 5839-8",
    desc: "Integrated with fire detection where evacuation needs spoken instruction beyond bells and sounders.",
  },
];

const askTheSame = [
  { who: "For every business", line: "Your team turns up when it matters.", ask: "Ask the same of the building." },
  { who: "For landlords", line: "You check the rent arrives.", ask: "Ask the same of the building's fire alarm." },
  { who: "For practices", line: "You tell patients to come back in six months.", ask: "Ask the same of the building." },
  { who: "For server rooms", line: "You test your backups.", ask: "Ask the same of the server room's gas suppression." },
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

const portal = [
  "Service certificates",
  "Visit history",
  "Log book entries",
  "Your asset register",
  "An evidence pack to download, for the period you choose",
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

const statsSource =
  "https://www.gov.uk/government/statistics/fire-prevention-and-protection-england-year-ending-march-2026/fire-prevention-and-protection-statistics-england-april-2025-to-march-2026";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  slogan: site.tagline,
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 md:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="label-mono text-ember-ink mb-6">
            Fire and life safety · London and the South East
          </p>
          <h1 className="display-xl text-[76px] sm:text-[112px] md:text-[168px] m-0">
            Keep it boring<span className="text-orange">.</span>
          </h1>
          <p className="display text-[24px] md:text-[34px] mt-8 max-w-[24ch]">
            {site.deal}
          </p>
          <p className="text-[17px] md:text-[19px] leading-[1.55] text-stone max-w-[620px] mt-6">
            Fire alarm maintenance to BS 5839-1, gas suppression to BS EN
            15004, emergency lighting and more, under one contract. Every
            certificate and visit record sits in your customer portal.
          </p>
          <div className="mt-8">
            <RotatingLine lines={heroLines} />
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <CtaLink href="/contact" variant="ember">
              Get a quote
            </CtaLink>
            <CtaLink href="/contact" variant="outline">
              Book a 15-minute call
            </CtaLink>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="stamp hidden xl:block absolute right-10 top-28 text-[15px] text-ember-ink"
        >
          Keep it boring
        </span>
      </section>

      {/* On-time target strip. A target, not a result: swap in the real
          rate from the portal's visit records once a quarter of visits exists. */}
      <section className="bg-surface border-y border-rule px-6 md:px-8 py-11">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div>
            <p aria-hidden="true" className="label-mono text-stone mb-2">
              Our target
            </p>
            <p aria-hidden="true" className="display text-[56px] md:text-[64px] leading-none">
              95<span className="text-orange">%</span>
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

      {/* The other outcome: one true consequence, then the fix. */}
      <section className="on-dark bg-ink text-cream px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-orange mb-5">The other outcome</p>
            <h2 className="display text-[36px] md:text-[56px] max-w-[18ch] mb-12">
              Boring is the good outcome. Here&rsquo;s the other one.
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="display text-[64px] md:text-[88px] leading-none text-orange">
                58%
              </p>
              <p className="text-[17px] leading-[1.55] text-cream/85 mt-4 max-w-[440px]">
                Fire services in England carried out 8,932 fire safety audits of
                shops in the year to March 2026. Only 58% were satisfactory.
              </p>
            </Reveal>
            <Reveal>
              <p className="display text-[64px] md:text-[88px] leading-none text-orange">
                1,224
              </p>
              <p className="text-[17px] leading-[1.55] text-cream/85 mt-4 max-w-[440px]">
                Prohibition notices served by fire authorities in England in the
                same year. A prohibition notice restricts or stops the use of a
                building.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 pt-8 border-t border-cream/15 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-[18px] md:text-[20px] max-w-[620px] leading-[1.5]">
              The fix is the boring bit: a maintained system, a certificate you
              can find, and every record in one place. It&rsquo;s the bit we
              like.
            </p>
            <CtaLink href="/contact" variant="ember">
              Make yours boring
            </CtaLink>
          </div>
          <p className="text-[12px] text-cream/50 mt-8 max-w-[760px]">
            Source:{" "}
            <a href={statsSource} className="underline underline-offset-2 hover:text-orange">
              Home Office, Fire prevention and protection statistics, England,
              April 2025 to March 2026
            </a>{" "}
            (published 2 September 2026). Fire services choose which premises to
            audit based on risk.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">What we do</p>
            <h2 className="display text-[36px] md:text-[56px] max-w-[16ch] mb-4">
              Fire and life safety, under one contract.
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
                  className="group block bg-surface rounded-[6px] p-7 h-full border border-transparent hover:border-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
                >
                  <p className="label-mono text-stone mb-4">{s.std}</p>
                  <h3 className="display text-[24px] mb-3 group-hover:text-ember-ink transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-[14px] text-stone leading-[1.55]">
                    {s.desc}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ask the same of the building */}
      <section className="bg-orange text-ink px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="label-mono mb-5">Ask the same of the building</h2>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {askTheSame.map((a) => (
              <Reveal key={a.who}>
                <p className="label-mono mb-3">{a.who}</p>
                <p className="display text-[28px] md:text-[36px]">
                  {a.line} {a.ask}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">What happens next</p>
            <h2 className="display text-[36px] md:text-[56px] mb-4">
              From first call to first visit.
            </h2>
            <p className="text-[16px] md:text-[17px] text-stone leading-[1.5] max-w-[580px] mb-12">
              Four steps from your first conversation to your first service
              visit.
            </p>
          </Reveal>
          <ol className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step) => (
              <li key={step.n}>
                <Reveal>
                  <p className="display text-[56px] leading-none text-orange mb-4" aria-hidden="true">
                    {step.n}
                  </p>
                  <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-2">
                    <span className="sr-only">Step {step.n}: </span>
                    {step.name}
                  </h3>
                  <p className="text-[14px] text-stone leading-[1.6]">
                    {step.desc}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Portal */}
      <section className="bg-surface border-y border-rule px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] grid gap-12 md:grid-cols-2 items-center">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">Your customer portal</p>
            <h2 className="display text-[36px] md:text-[52px] max-w-[14ch]">
              Your certificates live in your portal, not the bottom drawer.
            </h2>
            <p className="text-[16px] md:text-[17px] text-stone leading-[1.55] max-w-[480px] mt-6">
              Insurance renewal? Fire risk assessor on the way? Download your
              evidence pack and get back to your day.
            </p>
          </Reveal>
          <Reveal>
            <ul className="grid gap-0 border-t border-ink">
              {portal.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 py-4 border-b border-rule text-[17px]"
                >
                  <span aria-hidden="true" className="text-ember-ink font-medium">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The check */}
      <section id="check" className="px-6 md:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">Two-minute check</p>
            <h2 className="display text-[36px] md:text-[56px] mb-12 max-w-[18ch]">
              How boring is your building?
            </h2>
          </Reveal>
          <BoringCheck />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-24 bg-surface border-y border-rule">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="label-mono text-ember-ink mb-5">Common questions</p>
            <h2 className="display text-[36px] md:text-[56px] mb-10">
              Things people usually ask.
            </h2>
          </Reveal>
          <div className="grid gap-8 md:gap-9 md:grid-cols-2">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <h3 className="text-[17px] font-medium tracking-[-0.01em] mb-2.5">
                  {f.q}
                </h3>
                <p className="text-[15px] text-stone leading-[1.65]">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2 className="display text-[36px] md:text-[56px] max-w-[18ch] mb-4">
              Fire safety, for people with better things to do.
            </h2>
            <p className="text-[16px] text-stone">
              We reply to every enquiry within one working day, or you can book
              a 15-minute call to talk through your buildings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/contact" variant="ember">
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
