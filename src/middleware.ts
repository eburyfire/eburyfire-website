import { NextResponse, type NextRequest } from "next/server";
import { REFERRAL_COOKIE, isValidReferralCode } from "@/lib/referral";

export function middleware(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref || !isValidReferralCode(ref)) return NextResponse.next();

  const res = NextResponse.next();
  res.cookies.set(REFERRAL_COOKIE, ref, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}

export const config = {
  matcher: ["/signup", "/contact"],
};
