import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SurveySection } from "@/components/forms/SurveySection";
import { readReferralCode } from "@/lib/referral";

export const metadata: Metadata = {
  alternates: { canonical: "/signup" },
  title: "Welcome",
  description: "Book a survey to start your annual plan. We reply within one working day.",
  robots: { index: false },
};

// Referral landing page: the referral code rides along with the survey request.
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const params = await searchParams;
  const incomingRef = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  const referralCode = await readReferralCode(incomingRef);

  if (!referralCode) {
    redirect("/contact");
  }

  return <SurveySection id="survey" headingLevel={1} referralCode={referralCode} />;
}
