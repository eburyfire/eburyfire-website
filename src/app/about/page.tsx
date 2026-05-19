import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ebury Fire Systems designs, installs, commissions, and maintains fire and life safety systems. One accountable contractor, with the technical depth to back it up.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="One accountable contractor."
        intro="Ebury Fire Systems designs, installs, commissions, and maintains fire and life safety systems. One accountable contractor, with the technical depth to back it up."
      />

      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <Prose>
            <h2>Mission</h2>
            <p>
              Most fire compliance work in the UK is fragmented across
              specialists, meaning five suppliers for one building. We
              consolidate the supply chain. One contract, one team, one
              customer portal, covering the full lifecycle from initial design
              through ongoing maintenance.
            </p>

            <h2>Capability</h2>
            <p>
              We deliver design, installation, commissioning, and maintenance
              across fire detection and alarm (BS 5839-1:2025), gas suppression
              (BS EN 15004), emergency lighting (BS 5266), aspirating smoke
              detection, watermist (BS 8489), and PAVA voice alarm (BS 5839-8).
            </p>
            <p>
              Our customer portal gives every customer visibility of their
              compliance position in real time: site evidence packs, asset
              registers, log books, certificates, and visit history, available
              on demand.
            </p>
            <p>
              Same engineer every visit. One supplier across every site,
              whether you have one or fifty.
            </p>
            <p>
              Headquartered in London, serving England, with priority response
              for buildings inside the M25.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
