export const site = {
  name: "Ebury Fire Systems",
  legalName: "Ebury Engineering Ltd",
  // Company details appear in the privacy notice only (founder, 23 Oct 2026).
  companyNumber: "16942750",
  vat: "512 9580 88",
  registeredOffice: "128 City Road, London EC1V 2NX",
  url: "https://eburyfire.co.uk",
  portalUrl: "https://portal.eburyfire.co.uk",
  portalSignInUrl: "https://portal.eburyfire.co.uk/sign-in",
  contactEmail: "hello@eburyfire.co.uk",
  noreplyEmail: "noreply@eburyfire.co.uk",
  // No business phone line yet: never show a number on the site.
  // The company LinkedIn page isn't live yet; the footer link appears once this is set.
  linkedinUrl: "",
  tagline: "Keep it boring.",
  description:
    "One annual plan for your fire alarm and gas suppression: every service visit booked for you, a certificate after each, one invoice. London and the South East.",
} as const;

export const nav = [
  { label: "What we do", href: "/services" },
  { label: "Who we work with", href: "/who-we-work-with" },
  { label: "About us", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Contact us", href: "/contact" },
] as const;

export const partnerHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Delivery partner")}`;
