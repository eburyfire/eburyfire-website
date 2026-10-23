import type { MetadataRoute } from "next";
import { fetchResources } from "@/lib/resources";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/who-we-work-with",
    "/landlords",
    "/about",
    "/articles",
    "/contact",
    "/careers",
    "/pricing",
    "/privacy",
    "/data-retention",
    "/accessibility",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  const articles = await fetchResources();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes];
}
