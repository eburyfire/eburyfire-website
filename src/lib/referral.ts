import { cookies } from "next/headers";

export const REFERRAL_COOKIE = "ebury_referral_code";

const SAFE_RE = /^[A-Za-z0-9_-]{1,64}$/;

export function isValidReferralCode(code: string): boolean {
  return SAFE_RE.test(code);
}

export async function readReferralCode(
  incoming?: string,
): Promise<string | undefined> {
  if (incoming && isValidReferralCode(incoming)) return incoming;
  const jar = await cookies();
  const v = jar.get(REFERRAL_COOKIE)?.value;
  if (!v) return undefined;
  return isValidReferralCode(v) ? v : undefined;
}
