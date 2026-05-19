import { z } from "zod";

export const urgencyOptions = [
  "Curious",
  "Need a quote in 30 days",
  "Need a quote this week",
  "Have a callout right now",
] as const;

export const sitesOptions = ["1", "2-5", "6-20", "21+"] as const;

export const quoteSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(200),
  contactName: z.string().trim().min(1, "Contact name is required").max(200),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  numberOfSites: z.enum(sitesOptions).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  currentProvider: z.string().trim().max(200).optional(),
  urgency: z.enum(urgencyOptions),
  message: z.string().trim().max(4000).optional(),
  referralCode: z.string().trim().max(64).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
