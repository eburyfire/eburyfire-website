import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ebury Fire Systems designs, installs, commissions and maintains fire and life safety systems across London and the South East, under one contract.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The calm one who reads the instructions."
        intro="Ebury Fire Systems designs, installs, commissions and maintains fire and life safety systems across London and the South East, under one contract. You do the exciting work so we can do the boring work."
      />

      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1fr_320px]">
          <Prose>
            <h2>Why boring</h2>
            <p>
              If you run a restaurant, a practice, a gym or a parade of shops,
              the fire alarm should be the least dramatic thing in the
              building. The only exciting fire alarm is one that has gone
              wrong. So we aim for the opposite: systems maintained on time,
              certificates you can find, and plain answers when you ask a
              question.
            </p>

            <h2>What we cover</h2>
            <p>
              Design, installation, commissioning and maintenance across fire
              detection and alarm (BS 5839-1:2025), gas suppression (BS EN
              15004), emergency lighting (BS 5266), aspirating smoke detection,
              watermist (BS 8489) and PAVA voice alarm (BS 5839-8).
            </p>

            <h2>How we work</h2>
            <p>
              A building can end up with a separate contractor for each fire
              safety system, each with its own paperwork. We bring them under
              one contract and one customer portal, from design through ongoing
              maintenance.
            </p>
            <p>
              Your customer portal gives you your compliance records whenever
              you need them: certificates, visit history, log books, asset
              registers and downloadable evidence packs. One contract can
              cover every site you manage, with visits scheduled around each
              site.
            </p>
            <p>We cover London and the South East.</p>
          </Prose>

          <aside className="grid gap-6 content-start">
            <div className="bg-ink text-cream rounded-[6px] p-7 grid gap-4">
              <span className="stamp text-orange text-[13px] justify-self-start">
                Keep it boring
              </span>
              <p className="display text-[26px]">
                The only flame in our branding is a dot.
              </p>
              <p className="text-[14px] text-cream/75 leading-[1.6]">
                No flames, no smoke and no scare pictures. When something
                matters, we say it plainly and give you the fix.
              </p>
            </div>
            <CtaLink href="/contact" variant="ember">
              Get a quote
            </CtaLink>
          </aside>
        </div>
      </section>
    </>
  );
}
