import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data retention",
  description: "How long Ebury Fire Systems keeps each kind of record.",
};

type Row = { record: string; trigger: string; kept: string };

const rows: Row[] = [
  {
    record: "Enquiry form submissions",
    trigger: "Submitted",
    kept: "2 years if no engagement; transferred to customer record if you sign up",
  },
  {
    record: "Email correspondence",
    trigger: "Sent / received",
    kept: "7 years",
  },
  {
    record: "Referral code cookies (ebury_referral_code)",
    trigger: "Set in browser",
    kept: "30 days, in-browser only",
  },
  {
    record: "Plausible analytics events",
    trigger: "Page view",
    kept: "Aggregated indefinitely; no personal data",
  },
];

export default function RetentionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Data retention — draft pending legal review"
        title="How long we keep things."
      />

      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] text-stone mb-8">
            Last updated: 15 May 2026
          </p>
          <p className="text-[16px] text-ink leading-[1.7] mb-8 max-w-[720px]">
            We don&rsquo;t keep personal data longer than we need to. The
            table below lists every record type the marketing site touches,
            the reason we hold it, and how long it stays. Records created
            after you become a customer fall under the portal&rsquo;s own
            retention schedule.
          </p>

          <div className="overflow-x-auto max-w-[820px]">
            <table className="w-full text-[14px] text-ink border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.1em] text-stone">
                  <th className="text-left py-3 pr-4 font-medium border-b border-rule">
                    Record
                  </th>
                  <th className="text-left py-3 pr-4 font-medium border-b border-rule">
                    Trigger
                  </th>
                  <th className="text-left py-3 font-medium border-b border-rule">
                    We keep it for
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.record}>
                    <td className="py-3 pr-4 align-top border-b border-rule font-medium">
                      {r.record}
                    </td>
                    <td className="py-3 pr-4 align-top border-b border-rule text-stone">
                      {r.trigger}
                    </td>
                    <td className="py-3 align-top border-b border-rule">
                      {r.kept}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-[720px]">
            <h2 className="text-[20px] md:text-[22px] font-medium tracking-[-0.015em] mt-12 mb-3">
              Asking us to delete sooner
            </h2>
            <p className="text-[16px] text-ink leading-[1.7] mb-3">
              You can ask us to delete any data this site holds about you at
              any time. Email{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="underline underline-offset-2 hover:text-orange"
              >
                {site.contactEmail}
              </a>{" "}
              with &ldquo;Privacy: deletion request&rdquo; in the subject
              line.
            </p>

            <p className="text-[12px] text-stone mt-10">
              The full privacy notice is{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-orange"
              >
                here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
