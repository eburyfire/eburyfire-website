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

/** The form's own id (stable across resubmits of one form), or a 10-minute fallback. */
export function idempotencyKey(formId: string | undefined, data: QuoteInput, now: Date): string {
  if (formId && /^[A-Za-z0-9_-]{16,80}$/.test(formId)) return formId;
  const bucket = Math.floor(now.getTime() / 600_000);
  return `h${createHash("sha256").update(`${data.email}\n${data.message ?? ""}\n${bucket}`).digest("hex").slice(0, 40)}`;
}

export function enquiryBody(key: string, data: QuoteInput): string {
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

export async function sendEnquiryToPortal(
  key: string,
  data: QuoteInput,
  deps: { fetch?: typeof fetch; env?: Record<string, string | undefined>; now?: () => number } = {},
): Promise<HandOffResult> {
  const env = deps.env ?? process.env;
  const secret = env.WEBSITE_ENQUIRY_SECRET;
  if (!secret || secret.length < 32) return "skipped";
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
    console.error("[quote] portal CRM hand-off refused", { status: res.status });
    return "failed";
  } catch (err) {
    console.error("[quote] portal CRM hand-off failed", { name: (err as Error)?.name ?? "unknown" });
    return "failed";
  }
}
