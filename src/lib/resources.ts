import {
  resourceMetas,
  type ResourceCategory,
  type ResourceMeta,
} from "@/content/resources/manifest";

export type { ResourceCategory, ResourceMeta };

export async function fetchResources(): Promise<ResourceMeta[]> {
  return [...resourceMetas].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export async function fetchResourceBySlug(
  slug: string,
): Promise<ResourceMeta | undefined> {
  return resourceMetas.find((r) => r.slug === slug);
}

export function categoryLabel(c: ResourceCategory): string {
  switch (c) {
    case "compliance":
      return "Compliance";
    case "how-to":
      return "How-to";
    case "templates":
      return "Templates";
    case "news":
      return "News";
  }
}

export function formatPublished(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
