import { SurveyForm } from "@/components/forms/SurveyForm";

// "Book a survey." block from the approved home page.
export function SurveySection({
  id,
  initialPostcode,
  referralCode,
  headingLevel = 2,
}: {
  id: string;
  initialPostcode?: string;
  referralCode?: string;
  headingLevel?: 1 | 2;
}) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id={id} className="mx-auto flex w-full max-w-[1240px] scroll-mt-6 flex-wrap gap-6 px-4 py-16 sm:px-10 sm:py-20">
      <div className="rise flex flex-[2_1_340px] flex-col gap-4 rounded-[32px] bg-highlight p-8 sm:p-12">
        <H className="display m-0 text-[44px] sm:text-[56px]">Book a survey.</H>
        <p className="m-0 text-[18px] leading-[1.5]">
          Start your annual plan with a survey. We reply within one working day.
        </p>
      </div>
      <div className="rise flex-[3_1_480px] min-w-0">
        <SurveyForm initialPostcode={initialPostcode} referralCode={referralCode} />
      </div>
    </section>
  );
}
