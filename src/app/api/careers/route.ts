import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { careersInternalTemplate, careersSubjectInternal } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { allowQuote, isHoneypot } from "@/lib/portal-enquiry";
import { careerAreas } from "@/lib/careers";
import { site } from "@/lib/site";

const careersSchema = z.object({
  area: z.enum(careerAreas, { message: "Choose an area" }),
  name: z.string().trim().min(1, "Enter your name").max(200).regex(/^[^\r\n]+$/, "Enter your name on one line"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => /^\+?[\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15, "Enter a valid phone number"),
  notes: z.string().trim().max(4000).optional(),
  website: z.string().max(500).optional(),
});

// Careers details go to hello@ by email only (not the sales CRM). There is
// no file upload: applicants email their CV to hello@.
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (!allowQuote(ip ? `careers:${ip}` : null, Date.now())) {
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

  const parsed = careersSchema.safeParse(json);
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
  if (isHoneypot(data.website)) return NextResponse.json({ ok: true });

  const sent = await sendEmail({
    to: site.contactEmail,
    subject: careersSubjectInternal(data),
    html: careersInternalTemplate(data),
    replyTo: data.email,
  });
  if (!sent.ok) {
    console.error("[careers] email failed", { reason: sent.reason, error: sent.error });
    return NextResponse.json(
      { ok: false, error: `We couldn't send your details just now. Please email them with your CV to ${site.contactEmail}.` },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
