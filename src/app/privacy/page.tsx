import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Ebury Fire Systems handles your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy notice — draft pending legal review"
        title="How we handle your data."
      />
      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] text-stone mb-8">
            Last updated: 15 May 2026
          </p>
          <Prose>
            <h2>Who we are</h2>
            <p>
              This site is operated by {site.legalName}, trading as{" "}
              {site.name}. Companies House registration {site.companyNumber}.
              VAT {site.vat}. We are the data controller for the personal data
              described below.
            </p>
            <p>
              Email{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>{" "}
              for any privacy question. Marked “Privacy” gets you
              to the right person first time.
            </p>

            <h2>What we collect on this marketing site</h2>
            <ul>
              <li>
                <strong>Enquiry forms.</strong> Your name, company, email, and
                anything you tell us when you fill in a quote or discovery
                form on this site. We use that to reply to you.
              </li>
              <li>
                <strong>Referral codes.</strong> If you reach us via a partner
                referral link (<code>?ref=CODE</code>), we store the code in a
                cookie called <code>ebury_referral_code</code> for 30 days so
                the right partner is credited if you go on to become a
                customer.
              </li>
              <li>
                <strong>Analytics.</strong> We use Plausible, which is
                cookieless and stores no personal data. We see aggregate page
                view counts, not individual visitors.
              </li>
            </ul>

            <h2>Why we hold it</h2>
            <p>
              Enquiry data is processed under UK GDPR Article 6(1)(b)
              (taking steps at your request prior to entering into a contract)
              and 6(1)(f) (our legitimate interest in responding to people who
              ask us to quote).
            </p>

            <h2>Who else sees it</h2>
            <ul>
              <li>
                <strong>Resend</strong> delivers transactional email
                (acknowledgement of your enquiry, internal notification to our
                team).
              </li>
              <li>
                <strong>Vercel</strong> hosts this website.
              </li>
              <li>
                <strong>Plausible</strong> aggregates anonymous analytics.
              </li>
            </ul>
            <p>
              If you go on to become a customer, your data is handed off to
              the customer portal at <em>portal.eburyfire.co.uk</em>, which is
              covered by its own, more detailed privacy notice.
            </p>
            <p>
              We never sell your data, never use it for marketing without your
              explicit opt-in, and never share it with anyone outside the list
              above without telling you first.
            </p>

            <h2>How long we keep it</h2>
            <p>
              See our{" "}
              <Link href="/data-retention">data retention schedule</Link> for
              the specific window per record type.
            </p>

            <h2>Your rights</h2>
            <p>
              Under UK GDPR you have the right to access, correct, port,
              restrict and (where applicable) erase the personal data we hold
              about you, and to object to processing. To exercise any of
              these, email{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>{" "}
              with “Privacy: subject access” in the subject line.
              We reply within one calendar month.
            </p>
            <p>
              If you’re not happy with how we’ve handled your
              data, you have the right to complain to the Information
              Commissioner’s Office at{" "}
              <a href="https://ico.org.uk/make-a-complaint/">
                ico.org.uk
              </a>
              .
            </p>

            <h2>Cookies</h2>
            <p>
              This marketing site uses only the cookies it needs to function —
              specifically the <code>ebury_referral_code</code> cookie set
              when a partner referral link is followed. No analytics cookies,
              no advertising cookies, no third-party tracking.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
