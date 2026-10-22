import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ebury Fire Systems offers maintenance of fire detection and alarm systems and gas suppression systems under one contract, across London and the South East.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Alarm and suppression, one contract."
        intro="Ebury Fire Systems offers maintenance of fire detection and alarm systems and gas suppression systems, under one contract, across London and the South East."
      />

      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <Prose>
            <h2>Mission</h2>
            <p>
              A building with both a fire alarm and a gas suppression system
              can end up with separate contractors and separate paperwork. We
              bring both under one contract and one customer portal.
            </p>

            <h2>What we cover</h2>
            <p>
              Fire detection and alarm systems (BS 5839-1:2025) and gas
              suppression systems (BS EN 15004). We do maintenance only, not
              installation or design.
            </p>
            <p>
              Your customer portal gives you access to your compliance
              records whenever you need them: certificates, visit history, log
              books, asset registers and downloadable evidence packs.
            </p>
            <p>
              One contract can cover every site you manage, with visits
              scheduled around each site.
            </p>
            <p>We cover London and the South East.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
