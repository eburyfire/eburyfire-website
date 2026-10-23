import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/data-retention" },
  title: "Data retention",
  description: "How long Ebury Fire Systems keeps each kind of record.",
};

type Row = { record: string; trigger: string; kept: string };

const rows: Row[] = [
  {
    record: "Survey requests (Book a survey form)",
    trigger: "Submitted",
    kept: "2 years if no engagement; transferred to customer record if you sign up",
  },
  {
    record: "Careers form details and emailed CVs",
    trigger: "Last contact from you",
    kept: "12 months, unless you ask us to delete them sooner",
  },
  {
    record: "Email correspondence",
    trigger: "Sent / received",
    kept: "7 years",
  },
  {
    record: "Partner and supplier firm contacts",
    trigger: "Last two-way contact, or end of our work together",
    kept: "24 months if we don't work together; 7 years after the work ends if we do",
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
        eyebrow="Data retention"
        title="How long we keep things."
      />

      <section className="px-4 pb-20 sm:px-10">
        <div className="mx-auto w-full max-w-[1240px]">
          <p className="text-[13px] text-muted mb-8">
            Last updated: 23 October 2026
          </p>
          <p className="text-[16px] text-text leading-[1.7] mb-8 max-w-[720px]">
            We don’t keep personal data longer than we need to. The
            table below lists every record type the marketing site touches,
            the reason we hold it, and how long it stays. Records created
            after you become a customer fall under the portal’s own
            retention schedule.
          </p>

          <div className="overflow-x-auto max-w-[820px]" role="region" aria-label="Retention schedule" tabIndex={0}>
            <table className="w-full text-[14px] text-text border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.1em] text-muted">
                  <th className="text-left py-3 pr-4 font-extrabold border-b border-line">
                    Record
                  </th>
                  <th className="text-left py-3 pr-4 font-extrabold border-b border-line">
                    Trigger
                  </th>
                  <th className="text-left py-3 font-extrabold border-b border-line">
                    We keep it for
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.record}>
                    <td className="py-3 pr-4 align-top border-b border-line font-extrabold">
                      {r.record}
                    </td>
                    <td className="py-3 pr-4 align-top border-b border-line text-muted">
                      {r.trigger}
                    </td>
                    <td className="py-3 align-top border-b border-line">
                      {r.kept}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-[720px]">
            <h2 className="text-[20px] md:text-[22px] font-extrabold tracking-[-0.015em] mt-12 mb-3">
              Asking us to delete sooner
            </h2>
            <p className="text-[16px] text-text leading-[1.7] mb-3">
              You can ask us to delete any data this site holds about you at
              any time. Email{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="underline underline-offset-2 hover:text-blue"
              >
                {site.contactEmail}
              </a>{" "}
              with “Privacy: deletion request” in the subject
              line.
            </p>

            <p className="text-[12px] text-muted mt-10">
              The full privacy notice is{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-blue"
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
