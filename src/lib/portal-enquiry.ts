import { createHash, createHmac } from "node:crypto";
import type { QuoteInput } from "./quote-schema";

/**
 * Hands a quote-form enquiry to the portal CRM (Ebury tools Phase 4a).
 * Server to server: the raw JSON body is signed with WEBSITE_ENQUIRY_SECRET
 * (HMAC-SHA256 over `${t}.${body}`), the same scheme the portal verifies
 * (portal: src/lib/website/enquiry-signature.ts). The email to hello@ stays
 * the primary path: this never throws, never changes what the visitor sees,
 * and is skipped when no secret is set. It never logs the enquiry or the secret.
 */

export const DEFAULT_PORTAL_ENQUIRY_URL = "https://portal.eburyfire.co.uk/api/website/enquiry";

export function signEnquiry(secret: string, t: number, rawBody: string): string {
  const mac = createHmac("sha256", secret).update(`${t}.${rawBody}`, "utf8").digest("hex");
  return `t=${t},v1=${mac}`;
}

/**
 * The form's own id (stable across resubmits of one form), or, for a browser
 * without crypto.randomUUID, the same address + message on the same London
 * day counts as one enquiry.
 */
export function idempotencyKey(formId: string | undefined, data: QuoteInput, now: Date): string {
  if (formId && /^[A-Za-z0-9_-]{16,80}$/.test(formId)) return formId;
  const day = now.toLocaleDateString("en-CA", { timeZone: "Europe/London" });
  return `h${createHash("sha256").update(`${data.email}\n${data.message ?? ""}\n${day}`).digest("hex").slice(0, 40)}`;
}

/**
 * Best-effort brake on one address hammering the form: at most 5 posts per
 * IP per 10 minutes per server instance. The portal's own caps (per address
 * and overall) are the real limit; this only keeps one script from using them up.
 */
const hits = new Map<string, number[]>();
export function allowQuote(ip: string | null, nowMs: number): boolean {
  if (!ip) return true;
  const recent = (hits.get(ip) ?? []).filter((t) => nowMs - t < 600_000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(nowMs);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return true;
}

/** The hidden honeypot field was filled: a bot. */
export function isHoneypot(website: string | undefined): boolean {
  return typeof website === "string" && website.trim() !== "";
}

/** Text Postgres can store: no NUL or other control characters (newlines and tabs kept), no lone surrogates. */
export function storable(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.toWellFormed().replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
}

export function enquiryBody(key: string, data: QuoteInput): string {
  const t = (v: string | undefined) => (v === undefined ? undefined : storable(v));
  data = {
    ...data,
    companyName: t(data.companyName)!,
    contactName: t(data.contactName)!,
    currentProvider: t(data.currentProvider),
    message: t(data.message),
    referralCode: t(data.referralCode),
  };
  return JSON.stringify({
    idempotency_key: key,
    enquiry: {
      company_name: data.companyName,
      contact_name: data.contactName,
      email: data.email,
      urgency: data.urgency,
      ...(data.numberOfSites ? { number_of_sites: data.numberOfSites } : {}),
      ...(data.currentProvider ? { current_provider: data.currentProvider } : {}),
      ...(data.message ? { message: data.message } : {}),
      ...(data.referralCode ? { referral_code: data.referralCode } : {}),
    },
  });
}

export type HandOffResult = "recorded" | "duplicate" | "capped" | "skipped" | "failed";

/** The line the internal (hello@) email carries, so a missing CRM copy is never silent. */
export function crmLine(r: HandOffResult): string {
  switch (r) {
    case "recorded": return "Saved to the CRM (prospect, deal and a task on Today).";
    case "duplicate": return "Already in the CRM from an earlier submit of this form.";
    case "capped": return "NOT in the CRM: over the CRM's enquiry limit. Add it by hand.";
    case "skipped": return "NOT in the CRM: the website's CRM hand-off isn't configured.";
    default: return "NOT in the CRM: the hand-off failed (logged). Add it by hand.";
  }
}

let warnedUnconfigured = false;

export async function sendEnquiryToPortal(
  key: string,
  data: QuoteInput,
  deps: { fetch?: typeof fetch; env?: Record<string, string | undefined>; now?: () => number } = {},
): Promise<HandOffResult> {
  const env = deps.env ?? process.env;
  const secret = env.WEBSITE_ENQUIRY_SECRET;
  if (!secret || secret.length < 32) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true;
      console.error("[quote] CRM hand-off disabled: WEBSITE_ENQUIRY_SECRET is not set (or under 32 characters)");
    }
    return "skipped";
  }
  const url = env.PORTAL_ENQUIRY_URL || DEFAULT_PORTAL_ENQUIRY_URL;
  const raw = enquiryBody(key, data);
  const t = Math.floor((deps.now ?? Date.now)() / 1000);
  try {
    const res = await (deps.fetch ?? fetch)(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-ebury-signature": signEnquiry(secret, t, raw) },
      body: raw,
      // A redirect (e.g. to a sign-in page) is a failure, never a success.
      redirect: "manual",
      signal: AbortSignal.timeout(4_000),
    });
    const body = (await res.json().catch(() => null)) as { ok?: boolean; result?: string } | null;
    if (res.status === 200 && body?.ok === true && (body.result === "recorded" || body.result === "duplicate" || body.result === "capped")) {
      if (body.result === "capped") console.warn("[quote] portal CRM is over its enquiry cap; email still sent");
      return body.result;
    }
    console.error("[quote] portal CRM hand-off refused", { key, status: res.status });
    return "failed";
  } catch (err) {
    console.error("[quote] portal CRM hand-off failed", { key, name: (err as Error)?.name ?? "unknown" });
    return "failed";
  }
}
