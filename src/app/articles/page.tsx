import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResourceFilters } from "@/components/site/ResourceFilters";
import { fetchResources } from "@/lib/resources";

export const metadata: Metadata = {
  alternates: { canonical: "/articles" },
  title: "Articles",
  description: "Plain answers on fire alarms, gas suppression and the rules behind them, for people with buildings to run.",
};

export default async function ArticlesPage() {
  const items = await fetchResources();
  return (
    <>
      <PageHeader eyebrow="Articles" title="Fire safety, plainly explained." />
      <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 sm:px-10">
        <ResourceFilters items={items} />
      </section>
    </>
  );
}
