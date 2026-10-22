import type { Metadata } from "next";
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
        title="One accountable contractor."
        intro="Ebury Fire Systems designs, installs, commissions and maintains fire and life safety systems across London and the South East, under one contract."
      />

      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <Prose>
            <h2>Mission</h2>
            <p>
              A building can end up with a separate contractor for each fire
              safety system, each with its own paperwork. We bring them under one contract and one customer
              portal, from design through ongoing maintenance.
            </p>

            <h2>What we cover</h2>
            <p>
              Design, installation, commissioning and maintenance across fire
              detection and alarm (BS 5839-1:2025), gas suppression (BS EN
              15004), emergency lighting (BS 5266), aspirating smoke detection,
              watermist (BS 8489) and PAVA voice alarm (BS 5839-8).
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
