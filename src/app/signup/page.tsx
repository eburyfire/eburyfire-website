import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteForm } from "@/components/site/QuoteForm";
import { readReferralCode } from "@/lib/referral";

export const metadata: Metadata = {
  title: "Welcome",
  description:
    "Welcome — let&rsquo;s get you set up. Tell us about your buildings and we&rsquo;ll be in touch within one working day.",
};

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

  return (
    <>
      <PageHeader
        eyebrow="Welcome"
        title="Let&rsquo;s get you set up."
        intro="Tell us about your buildings and we&rsquo;ll be in touch within one working day."
      />
      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 md:grid-cols-[1fr_320px]">
          <div className="max-w-[560px]">
            <QuoteForm referralCode={referralCode} />
          </div>
          <aside>
            <div className="bg-surface border border-rule rounded-[6px] p-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-stone mb-1">
                Referral
              </p>
              <p className="text-[13px] text-ink">
                This enquiry is attributed to{" "}
                <code className="text-[12px] bg-ink/5 px-1.5 py-0.5 rounded">
                  {referralCode}
                </code>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
