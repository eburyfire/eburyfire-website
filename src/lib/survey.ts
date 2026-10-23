import { z } from "zod";
import type { QuoteInput } from "./quote-schema";

/**
 * The "Book a survey" form (redesign v2): postcode, building type, sites,
 * name, phone or email. The portal CRM's enquiry contract (company, contact,
 * email, urgency) is unchanged, so a survey request is mapped onto it here.
 * A request with only a phone number can't go to the CRM (it needs an
 * email); the internal email to hello@ carries it instead. Pure.
 */

export const buildingTypes = [
  "Flats above shops",
  "Shop or clinic",
  "Dentist or surgery",
  "Pub, restaurant or venue",
  "Office or serviced office",
  "Warehouse or industrial unit",
  "Hotel",
  "Gym or leisure",
  "Server or plant room",
  "Something else",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits plus the usual separators; 10 to 15 digits once they're stripped.
const PHONE_CHARS_RE = /^\+?[\d\s().-]+$/;

export function splitContact(raw: string): { email?: string; phone?: string } | null {
  const v = raw.trim();
  if (EMAIL_RE.test(v)) return { email: v.toLowerCase() };
  if (PHONE_CHARS_RE.test(v)) {
    const digits = v.replace(/\D/g, "");
    if (digits.length >= 10 && digits.length <= 15) return { phone: v };
  }
  return null;
}

export const surveySchema = z.object({
  postcode: z
    .string()
    .trim()
    .min(2, "Enter your postcode")
    .max(10, "Enter your postcode")
    .regex(/^[A-Za-z0-9 ]+$/, "Enter your postcode")
    .transform((v) => v.toUpperCase().replace(/\s+/g, " ")),
  buildingType: z.enum(buildingTypes, { message: "Choose the type of building" }),
  sites: z.coerce
    .number({ message: "Enter how many sites" })
    .int("Enter how many sites")
    .min(1, "Enter how many sites")
    .max(10_000, "Enter how many sites"),
  name: z.string().trim().min(1, "Enter your name").max(200),
  contact: z
    .string()
    .trim()
    .min(1, "Enter a phone number or email")
    .max(200)
    .refine((v) => splitContact(v) !== null, "Enter a phone number or an email address"),
  referralCode: z.string().trim().max(64).optional(),
  formId: z.string().trim().regex(/^[A-Za-z0-9_-]{16,80}$/).optional(),
  // Honeypot: hidden from people; anything typed here is a bot.
  website: z.string().max(500).optional(),
});

export type SurveyInput = z.infer<typeof surveySchema>;

export function sitesBand(n: number): "1" | "2-5" | "6-20" | "21+" {
  if (n <= 1) return "1";
  if (n <= 5) return "2-5";
  if (n <= 20) return "6-20";
  return "21+";
}

export function surveySummary(s: SurveyInput): string {
  return [
    "Survey request from the website.",
    `Postcode: ${s.postcode}`,
    `Building: ${s.buildingType}`,
    `Sites: ${s.sites}`,
  ].join("\n");
}

/** The portal CRM enquiry for this request, or null when there's no email to file it under. */
export function toQuoteInput(s: SurveyInput): QuoteInput | null {
  const c = splitContact(s.contact);
  if (!c?.email) return null;
  return {
    companyName: `${s.buildingType}, ${s.postcode}`,
    contactName: s.name,
    email: c.email,
    numberOfSites: sitesBand(s.sites),
    currentProvider: undefined,
    // A survey request is a firm ask: the closest of the CRM's fixed options.
    urgency: "Need a quote in 30 days",
    message: surveySummary(s),
    referralCode: s.referralCode || undefined,
    formId: s.formId,
    website: undefined,
  };
}
