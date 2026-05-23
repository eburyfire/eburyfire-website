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
    "Fire alarm, gas suppression, emergency lighting and aspirating detection across England. One contract, one accountable team. Maintenance from £600 per site per year.",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
