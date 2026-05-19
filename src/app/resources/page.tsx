import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResourceFilters } from "@/components/site/ResourceFilters";
import { fetchResources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Compliance briefings, technical explainers, and operational guidance for buildings under UK regulation.",
};

export default async function ResourcesPage() {
  const items = await fetchResources();
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Compliance, plainly explained."
        intro="Compliance briefings, technical explainers, and operational guidance for buildings under UK regulation."
      />
      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <ResourceFilters items={items} />
        </div>
      </section>
    </>
  );
}
