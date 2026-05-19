import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteForm } from "@/components/site/QuoteForm";
import { readReferralCode } from "@/lib/referral";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a quote within one working day, or book a 15-minute call to talk through your requirements.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const params = await searchParams;
  const incomingRef = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  const referralCode = await readReferralCode(incomingRef);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get a quote within one working day."
        intro="Or book a 15-minute call to talk through your requirements. We&rsquo;ll reply to every enquiry within one working day."
      />

      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 md:grid-cols-[1fr_320px]">
          <div className="max-w-[560px]">
            <QuoteForm referralCode={referralCode} />
          </div>

          <aside className="grid gap-6 content-start">
            <div className="bg-surface border border-rule rounded-[6px] p-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-stone mb-2">
                Or email us directly
              </p>
              <Link
                href={`mailto:${site.contactEmail}`}
                className="text-[15px] text-ink underline underline-offset-2 hover:text-orange"
              >
                {site.contactEmail}
              </Link>
            </div>

            <div className="bg-surface border border-rule rounded-[6px] p-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-stone mb-2">
                Book a discovery call
              </p>
              <p className="text-[14px] text-stone leading-[1.6] mb-4">
                15 minutes on Zoom or Teams. No obligation.
              </p>
              <Link
                href={`mailto:${site.contactEmail}?subject=Discovery%20call`}
                className="inline-flex items-center text-[13px] font-medium border border-ink text-ink rounded-[4px] px-[14px] py-[8px] hover:bg-ink hover:text-cream transition-colors"
              >
                Email us to book
              </Link>
            </div>

            {referralCode ? (
              <div className="bg-surface border border-rule rounded-[6px] p-6">
                <p className="text-[11px] uppercase tracking-[0.12em] text-stone mb-1">
                  Referral
                </p>
                <p className="text-[13px] text-ink">
                  We&rsquo;ll attribute this enquiry to referral code{" "}
                  <code className="text-[12px] bg-ink/5 px-1.5 py-0.5 rounded">
                    {referralCode}
                  </code>
                  .
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
