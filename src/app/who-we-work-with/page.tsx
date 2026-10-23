import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhoTiles, OneContractBand } from "@/components/site/WhoTiles";

export const metadata: Metadata = {
  alternates: { canonical: "/who-we-work-with" },
  title: "Who we work with",
  description:
    "Shops, offices, warehouses, hotels and venues, and the landlords and agents who look after them, across London and the South East.",
};

export default function WhoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we work with"
        title="From the dentist on the corner to the warehouse on the ring road."
        intro="Shops, offices, warehouses, hotels and venues, and the landlords and agents who look after them."
      />
      <section className="mx-auto flex w-full max-w-[1240px] flex-col gap-7 px-4 pb-20 sm:px-10">
        <WhoTiles />
        <OneContractBand href="/contact#survey" />
      </section>
    </>
  );
}
