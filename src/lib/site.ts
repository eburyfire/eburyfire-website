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
  phone: "07902 024747",
  tagline: "Keep it boring.",
  deal: "You do the exciting work so we can do the boring work.",
  description:
    "Fire alarm, gas suppression, emergency lighting and aspirating detection across London and the South East. One contract, one customer portal. Maintenance fixed in writing after a short survey.",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Landlords", href: "/landlords" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
