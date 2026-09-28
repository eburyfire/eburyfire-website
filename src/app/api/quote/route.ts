import { NextResponse, type NextRequest } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";
import {
  enquiryAcknowledgementTemplate,
  enquiryInternalTemplate,
  enquirySubjectAck,
  enquirySubjectInternal,
} from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { site } from "@/lib/site";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid form input",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const [internalResult, ackResult] = await Promise.all([
    sendEmail({
      to: site.contactEmail,
      subject: enquirySubjectInternal(data),
      html: enquiryInternalTemplate(data),
      replyTo: data.email,
    }),
    sendEmail({
      to: data.email,
      subject: enquirySubjectAck(),
      html: enquiryAcknowledgementTemplate(data),
      replyTo: site.contactEmail,
    }),
  ]);

  if (!internalResult.ok && internalResult.reason === "no_api_key") {
    console.warn(
      "[quote] RESEND_API_KEY not configured. Enquiry from",
      data.email,
      "with urgency",
      data.urgency,
    );
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        note:
          "Captured but not yet emailed — Resend not configured. We’ll still get back to you within one working day.",
      },
      { status: 202 },
    );
  }

  if (!internalResult.ok || !ackResult.ok) {
    console.error("[quote] Resend send failure", {
      internal: internalResult,
      ack: ackResult,
    });
    return NextResponse.json(
      {
        ok: false,
        error: "Could not send email at the moment. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
