export const site = {
  name: "Ebury Fire Systems",
  legalName: "Ebury Engineering Ltd",
  companyNumber: "16942750",
  vat: "512 9580 88",
  url: "https://eburyfire.co.uk",
  portalUrl: "https://portal.eburyfire.co.uk",
  portalSignInUrl: "https://portal.eburyfire.co.uk/sign-in",
  contactEmail: "hello@eburyfire.co.uk",
  noreplyEmail: "noreply@eburyfire.co.uk",
  registeredOffice: "128 City Road, London, EC1V 2NX",
  twitter: "",
  description:
    "Maintenance of fire detection and alarm systems (BS 5839-1) and gas suppression systems (BS EN 15004) across London and the South East, under one contract. Maintenance fixed in writing after a short survey.",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
