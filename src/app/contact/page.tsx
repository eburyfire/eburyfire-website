import type { Metadata } from "next";
import { SurveySection } from "@/components/forms/SurveySection";
import { readReferralCode } from "@/lib/referral";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact us",
  description: "Book a survey to start your annual plan. We reply within one working day.",
};

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[]; postcode?: string | string[] }>;
}) {
  const params = await searchParams;
  const referralCode = await readReferralCode(first(params.ref));
  const postcode = (first(params.postcode) ?? "").replace(/[^A-Za-z0-9 ]/g, "").slice(0, 10);

  return (
    <>
      <SurveySection id="survey" headingLevel={1} initialPostcode={postcode} referralCode={referralCode} />
      <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border-2 border-text px-6 py-7 sm:px-10">
          <p className="m-0 text-[20px] font-extrabold">Rather email?</p>
          <a href={`mailto:${site.contactEmail}`} className="text-[20px] font-extrabold underline underline-offset-4 hover:text-blue">
            {site.contactEmail}
          </a>
        </div>
      </section>
    </>
  );
}
