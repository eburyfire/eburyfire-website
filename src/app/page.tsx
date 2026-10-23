import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostcodeBox } from "@/components/home/PostcodeBox";
import { HeroAnimation } from "@/components/home/HeroAnimation";
import { BoringCheck } from "@/components/home/BoringCheck";
import { VisitTabs } from "@/components/home/VisitTabs";
import { Faqs } from "@/components/home/Faqs";
import { SurveySection } from "@/components/forms/SurveySection";
import { WhoTiles, OneContractBand } from "@/components/site/WhoTiles";
import {
  compare,
  howItWorks,
  onTheDay,
  otherServices,
  stats,
  stories,
  whatWeLookAfter,
  faqs,
} from "@/lib/content";
import { site } from "@/lib/site";

// The approved redesign v2 home page (sample E, founder 23 Oct 2026):
// section order and copy word for word.

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/ebury-wordmark.svg`,
  slogan: site.tagline,
  description: site.description,
  email: site.contactEmail,
  areaServed: ["London", "South East England"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const h2 = "display m-0 text-[40px] leading-[1.05] sm:text-[56px]";
const wrap = "mx-auto w-full max-w-[1240px] px-4 sm:px-10";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, faqJsonLd]).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className={`${wrap} flex flex-wrap gap-6 pt-2 pb-16 sm:pb-[72px]`}>
        <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-6 rounded-[32px] bg-sand px-6 py-12 sm:px-[52px] sm:py-16">
          <h1 className="display m-0 text-[64px] leading-[1.02] sm:text-[88px] lg:text-[104px]">
            Keep it <span className="hl">boring.</span>
          </h1>
          <p className="m-0 max-w-[580px] text-[20px] leading-[1.5] text-body">
            One annual plan for your fire alarm and gas suppression: every service visit booked for you, a certificate
            after each, one invoice. It starts with a survey.
          </p>
          <PostcodeBox />
          <p className="m-0 text-[15px] text-muted">
            We reply within one working day. Or try the{" "}
            <a href="#check" className="font-extrabold underline underline-offset-2">
              two-minute check
            </a>
            .
          </p>
        </div>
        <HeroAnimation />
      </section>

      {/* Who we work with */}
      <section id="who" className={`${wrap} flex scroll-mt-6 flex-col gap-7 pb-16`}>
        <div className="rise flex flex-col gap-2.5">
          <h2 className={h2}>From the dentist on the corner to the warehouse on the ring road.</h2>
          <p className="m-0 text-[19px] leading-[1.5] text-body">
            Shops, offices, warehouses, hotels and venues, and the landlords and agents who look after them.
          </p>
        </div>
        <WhoTiles />
        <OneContractBand href="#contact" />
      </section>

      {/* Horror stories happen */}
      <section className="on-dark bg-ink text-white">
        <div className={`${wrap} flex flex-col gap-8 py-20 sm:py-[88px]`}>
          <h2 className="rise display m-0 text-[52px] leading-[1.02] sm:text-[72px]">
            Horror stories <span className="hl text-ink">happen.</span>
          </h2>
          <div className="rise flex flex-wrap items-baseline gap-x-8 gap-y-3 rounded-[28px] bg-pink px-6 py-9 text-ink sm:px-10">
            <p className="m-0 text-[64px] font-extrabold leading-none">
              <span className="sr-only">58%</span>
              <span className="count" aria-hidden="true" />
            </p>
            <p className="m-0 flex-[1_1_300px] text-[19px] leading-[1.5]">
              In the year to March 2026, fire services in England audited 8,932 shops. Only 58% of the shops they
              audited were found satisfactory. Audits focus on higher-risk premises.{" "}
              <a href={stats.source} className="font-extrabold text-ink underline underline-offset-2">
                Source: gov.uk
              </a>
            </p>
          </div>
          <div className="rise grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {stories.map((s) => (
              <article key={s.big} className="lift flex flex-col gap-3 rounded-[24px] bg-ink-2 p-[30px]">
                <p className="m-0 text-[34px] font-extrabold text-highlight">{s.big}</p>
                <h3 className="m-0 text-[19px] font-extrabold leading-[1.3]">{s.head}</h3>
                <p className="m-0 text-[15px] leading-[1.5] text-ink-soft">{s.body}</p>
                <a href={s.href} className="mt-auto text-[14px] font-bold text-peri underline underline-offset-2">
                  {s.src}
                </a>
              </article>
            ))}
          </div>
          <div className="rise flex flex-wrap items-center justify-between gap-5 pt-2">
            <div className="flex flex-col gap-1.5">
              <p className="m-0 text-[26px] font-extrabold">None of them were our customers. You could be.</p>
              <p className="m-0 text-[18px] text-ink-soft">
                You take care of your customers. We&rsquo;ll take care of the fire safety.
              </p>
            </div>
            <a
              href="#check"
              className="pop rounded-full bg-highlight px-[30px] py-[18px] text-[17px] font-extrabold text-ink no-underline"
            >
              How boring is your building?
            </a>
          </div>
        </div>
      </section>

      {/* Portal */}
      <section className={`${wrap} flex flex-wrap items-center gap-8 py-20`}>
        <div className="rise flex flex-[1_1_360px] flex-col gap-4">
          <h2 className={h2}>Every site, every certificate, one portal.</h2>
          <p className="m-0 text-[18px] leading-[1.5] text-body">
            Certificates, visit history, log book entries and the asset register for every building. When the insurer or
            the fire risk assessor asks, download the evidence pack and get back to your day.
          </p>
        </div>
        <figure className="rise m-0 min-w-0 flex-[1_1_420px] overflow-hidden rounded-[28px] border-2 border-text bg-sand">
          <Image
            src="/images/portal-sample-dashboard.png"
            alt="The customer portal with sample data: a portfolio of five sites, four up to date and one due soon, upcoming visits and a site list. Labelled sample, fictional data."
            width={1600}
            height={1000}
            sizes="(min-width: 1240px) 580px, (min-width: 800px) 50vw, 100vw"
            className="block h-auto w-full"
          />
          <figcaption className="sr-only">Sample portal screen, fictional data.</figcaption>
        </figure>
      </section>

      {/* Comparison */}
      <section id="compare" className={`${wrap} flex flex-col gap-6 pb-20`}>
        <div className="rise flex flex-col gap-2.5">
          <h2 className={h2}>
            A big name isn&rsquo;t the same as <span className="hl">a good service.</span>
          </h2>
          <p className="m-0 text-[19px] leading-[1.5] text-body">
            To a big national firm you&rsquo;re one account among thousands. Here, you&rsquo;re not an account number.
          </p>
        </div>
        <div
          className="rise overflow-x-auto rounded-[28px] border-2 border-text"
          role="region"
          aria-label="Comparison table"
          tabIndex={0}
        >
          <table className="w-full min-w-[640px] border-collapse text-[17px] leading-[1.45]">
            <thead>
              <tr>
                <th scope="col" className="bg-text px-6 py-5 text-left">
                  <span className="sr-only">Topic</span>
                </th>
                <th scope="col" className="eyebrow bg-highlight px-6 py-5 text-left text-[15px]">
                  With Ebury
                </th>
                <th scope="col" className="eyebrow bg-sand px-6 py-5 text-left text-[15px]">
                  Ask your current provider
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.map((r) => (
                <tr key={r.topic}>
                  <th scope="row" className="border-t border-line px-6 py-[18px] text-left font-extrabold">
                    {r.topic}
                  </th>
                  <td className="border-t border-line bg-highlight-soft px-6 py-[18px]">{r.us}</td>
                  <td className="border-t border-line px-6 py-[18px] text-body">{r.ask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two-minute check */}
      <section id="check" className="scroll-mt-6 bg-lilac">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-[22px] px-4 py-20 sm:px-10">
          <h2 className={`rise ${h2}`}>How boring is your building?</h2>
          <p className="rise m-0 text-[18px] text-lilac-ink">
            Five questions you can answer from memory. A quick check, not a fire risk assessment.
          </p>
          <div className="rise">
            <BoringCheck />
          </div>
        </div>
      </section>

      {/* What we look after */}
      <section id="what" className={`${wrap} flex scroll-mt-6 flex-col gap-5 pt-20 pb-[72px]`}>
        <h2 className={`rise ${h2}`}>What we look after</h2>
        <div className="rise grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          {whatWeLookAfter.map((w) => (
            <Link
              key={w.id}
              href={`/services#${w.id}`}
              className={`lift flex min-h-[200px] flex-col justify-between gap-3 rounded-[28px] ${w.bg} p-9 no-underline`}
            >
              <span className="text-[30px] font-extrabold">{w.name}</span>
              <span className="text-[17px] leading-[1.5] text-body">{w.body}</span>
              <span className="text-[15px] font-extrabold">
                Find out more <span aria-hidden="true">→</span>
                <span className="sr-only"> about {w.name.toLowerCase()}</span>
              </span>
            </Link>
          ))}
        </div>
        <p className="rise m-0 text-[16px] leading-[1.6] text-body">
          <strong>Other fire safety services, quoted separately:</strong> {otherServices}
        </p>
      </section>

      {/* What a service visit includes */}
      <section className="bg-sand">
        <div className={`${wrap} flex flex-col gap-7 py-20`}>
          <h2 className={`rise ${h2}`}>What a service visit includes</h2>
          <div className="rise">
            <VisitTabs />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`${wrap} flex flex-col gap-7 pt-20 pb-10`}>
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
      </section>

      {/* On the day */}
      <section className={`${wrap} pb-20`}>
        <div className="rise flex flex-wrap items-start gap-7 rounded-[32px] bg-mint px-6 py-11 sm:px-12">
          <h2 className="display m-0 flex-[1_1_260px] text-[44px] leading-[1.05] sm:text-[48px]">On the day</h2>
          <ul className="m-0 grid flex-[2_1_480px] list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-0">
            {onTheDay.map((d) => (
              <li key={d.name} className="text-[17px] leading-[1.45]">
                <strong className="block text-[19px]">{d.name}</strong>
                {d.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-sand">
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-20 sm:px-10">
          <h2 className={`rise ${h2} mb-3`}>Questions people ask</h2>
          <div className="rise">
            <Faqs />
          </div>
        </div>
      </section>

      <SurveySection id="contact" />
    </>
  );
}
