import type { Metadata } from "next";
import { CareersForm } from "@/components/forms/CareersForm";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description: "Work with Ebury Fire Systems. Tell us which area you're interested in and we'll get in touch when something fits.",
};

export default function CareersPage() {
  return (
    <section className="mx-auto flex w-full max-w-[1240px] flex-wrap items-start gap-6 px-4 pt-2 pb-20 sm:px-10">
      <div className="flex min-w-0 flex-[2_1_380px] flex-col gap-5 rounded-[32px] bg-sand px-6 py-12 sm:px-12 sm:py-14">
        <h1 className="display m-0 text-[60px] leading-[1.02] sm:text-[80px]">
          Work <span className="hl">here.</span>
        </h1>
        <p className="m-0 text-[19px] leading-[1.5] text-body">
          We like work done properly and on time, with no drama. If that sounds like you, tell us which area you&rsquo;re
          interested in. We&rsquo;ll keep your details and get in touch when something fits.
        </p>
      </div>
      <CareersForm />
    </section>
  );
}
