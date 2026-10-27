import { whatWeLookAfter } from "@/lib/content";
import { site } from "@/lib/site";

// Structured data for search engines and AI assistants. Invisible on the page.
// No address or phone: the registered office isn't a place we work, and there's
// no business line yet (business.md).

const areaServed = ["London", "South East England"];

export const orgId = `${site.url}/#organization`;

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/ebury-wordmark.svg`,
  slogan: site.tagline,
  description: site.description,
  email: site.contactEmail,
  areaServed,
  knowsAbout: ["Fire detection and alarm systems (BS 5839-1)", "Gas suppression systems (BS EN 15004)"],
};

const serviceNames: Record<(typeof whatWeLookAfter)[number]["id"], string> = {
  "fire-alarms": "Fire alarm servicing",
  "gas-suppression": "Gas suppression maintenance",
};

export const servicesJsonLd = whatWeLookAfter.map((w) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site.url}/services#${w.id}`,
  name: serviceNames[w.id],
  serviceType: w.name,
  description: w.body,
  url: `${site.url}/services#${w.id}`,
  provider: { "@type": "Organization", "@id": orgId, name: site.name, url: site.url },
  areaServed,
}));

export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
