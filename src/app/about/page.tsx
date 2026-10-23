import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { otherServices } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About us",
  description:
    "Ebury Fire Systems looks after fire alarms and gas suppression across London and the South East, on one annual plan. Part of Ebury Holdings Group.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            Keep it <span className="hl">boring.</span>
          </>
        }
        intro="Ebury Fire Systems looks after fire alarms and gas suppression across London and the South East, on one annual plan with one invoice."
      />

      <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <Prose>
            <h2>Why boring</h2>
            <p>
              If you run a restaurant, a practice, a gym or a parade of shops, the fire alarm should be the least dramatic
              thing in the building. The only exciting fire alarm is one that has gone wrong. So we aim for the opposite:
              every service visit booked for you, certificates you can find, and plain answers when you ask a question.
            </p>

            <h2>What we look after</h2>
            <p>
              Fire alarms, serviced to BS 5839-1, and gas suppression for server rooms, plant rooms and archives,
              maintained to BS EN 15004. Other fire safety services are quoted separately: {otherServices}
            </p>

            <h2>How we work</h2>
            <p>
              A building can end up with a separate firm for each fire safety system, each with its own paperwork. We
              bring them under one contract and one customer portal.
            </p>
            <p>
              Your portal holds your records whenever you need them: certificates, visit history, log book entries, the
              asset register and an evidence pack to download. One contract can cover every site you look after.
            </p>
            <p>We cover London and the South East. Ebury Fire Systems is part of Ebury Holdings Group.</p>
          </Prose>

          <aside className="flex flex-col gap-6 self-start">
            <div className="on-dark flex flex-col gap-4 rounded-[28px] bg-ink p-8 text-white">
              <p className="display m-0 text-[30px] leading-[1.1]">
                You take care of your customers. We&rsquo;ll take care of the fire safety.
              </p>
            </div>
            <CtaLink href="/contact#survey" className="self-start">
              Book a survey
            </CtaLink>
          </aside>
        </div>
      </section>
    </>
  );
}
