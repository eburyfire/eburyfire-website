import { NextResponse, type NextRequest } from "next/server";
import { surveySchema, toQuoteInput, splitContact } from "@/lib/survey";
import {
  surveyAcknowledgementTemplate,
  surveyInternalTemplate,
  surveySubjectAck,
  surveySubjectInternal,
} from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { site } from "@/lib/site";
import { allowQuote, crmLine, idempotencyKey, isHoneypot, sendEnquiryToPortal, type HandOffResult } from "@/lib/portal-enquiry";

const FALLBACK = `We couldn't send your request just now. Please email ${site.contactEmail}.`;

// The "Book a survey" form. The internal email to hello@ is the primary
// path; the portal CRM gets a copy when the visitor left an email address.
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (!allowQuote(ip, Date.now())) {
    return NextResponse.json(
      { ok: false, error: `Too many requests. Please wait a few minutes, or email ${site.contactEmail}.` },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = surveySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid form input",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot filled: a bot. Look successful, send nothing, record nothing.
  if (isHoneypot(data.website)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const email = splitContact(data.contact)?.email;
  const quote = toQuoteInput(data);

  // Into the portal CRM first, so the internal email can say whether it got
  // there. At most ~4 s; never throws.
  let crm: HandOffResult | "no_email" = "no_email";
  if (quote) {
    crm = await sendEnquiryToPortal(idempotencyKey(quote.formId, quote, new Date()), quote);
  }
  const inCrm = crm === "recorded" || crm === "duplicate";
  const crmText =
    crm === "no_email" ? "NOT in the CRM: they left a phone number, not an email. Add it by hand." : crmLine(crm);

  const [internalResult, ackResult] = await Promise.all([
    sendEmail({
      to: site.contactEmail,
      subject: surveySubjectInternal(data),
      html: surveyInternalTemplate(data, crmText),
      ...(email ? { replyTo: email } : {}),
    }),
    email
      ? sendEmail({
          to: email,
          subject: surveySubjectAck(),
          html: surveyAcknowledgementTemplate(data),
          replyTo: site.contactEmail,
        })
      : Promise.resolve(null),
  ]);

  if (ackResult && !ackResult.ok && ackResult.reason !== "no_api_key") {
    // The visitor misses their copy; we still have the request.
    console.error("[quote] acknowledgement email failed", { reason: ackResult.reason, error: ackResult.error });
  }

  if (internalResult.ok) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  if (inCrm) {
    console.error("[quote] internal email failed; request is in the CRM", {
      reason: internalResult.reason,
      error: internalResult.error,
    });
    return NextResponse.json({ ok: true, delivered: false }, { status: 202 });
  }

  // Neither emailed nor in the CRM: tell the visitor, so nothing is lost silently.
  console.error("[quote] request neither emailed nor in the CRM", {
    reason: internalResult.reason,
    error: internalResult.error,
    crm,
  });
  return NextResponse.json({ ok: false, error: FALLBACK }, { status: 502 });
}
