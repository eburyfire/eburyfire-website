import { Resend } from "resend";
import { site } from "@/lib/site";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "no_api_key" | "send_failed"; error?: string };

let cached: Resend | null = null;

function client(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!cached) cached = new Resend(process.env.RESEND_API_KEY);
  return cached;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendArgs): Promise<SendResult> {
  const resend = client();
  if (!resend) return { ok: false, reason: "no_api_key" };

  try {
    const result = await resend.emails.send({
      from: `${site.name} <${site.noreplyEmail}>`,
      to: [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (result.error) {
      return {
        ok: false,
        reason: "send_failed",
        error: result.error.message ?? String(result.error),
      };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    return {
      ok: false,
      reason: "send_failed",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
