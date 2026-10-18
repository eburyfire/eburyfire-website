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
            Last updated: 18 October 2026
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

            <h2 id="business-contacts">Business contacts we may approach</h2>
            <p>
              This section explains how we use the details of people at
              organisations we think may need fire alarm or gas suppression
              maintenance.
            </p>
            <p>
              <strong>Who we are.</strong> Ebury Engineering Ltd, trading as
              Ebury Fire Systems (company number 16942750), 128 City Road,
              London EC1V 2NX. Contact us at{" "}
              <a href="mailto:hello@eburyfire.co.uk">hello@eburyfire.co.uk</a>.
            </p>
            <p>
              <strong>What we hold.</strong> Your name, job title, work email
              address and work phone number, the organisation you work for,
              and the addresses of buildings your organisation is responsible
              for. We may also note facts about those buildings that matter
              for maintenance, such as the type of fire alarm or gas
              suppression system and when the current maintenance contract
              ends. We keep a record of our emails and calls with you. If a
              call is recorded, we also keep a written transcript of it and a
              summary of what was discussed.
            </p>
            <p>
              <strong>Where it comes from.</strong> Public business sources
              such as company websites, public registers and professional
              profiles, or from you directly.
            </p>
            <p>
              <strong>Why we use it, and our lawful basis.</strong> To tell you
              about our maintenance service and follow up if you&rsquo;re
              interested. We rely on our legitimate interest in offering that
              service to organisations that may need it. We have assessed this
              and decided it doesn&rsquo;t override your rights, because we
              only use work details, contact you about your work role, and make
              it easy to stop. If you&rsquo;re a sole trader or in a
              partnership, we only email you about our services if you have
              agreed to it.
            </p>
            <p>
              <strong>Calls.</strong> We check numbers against the Telephone
              Preference Service and Corporate Telephone Preference Service
              before calling. If we record a call, we tell you at the start.
            </p>
            <p>
              <strong>Stopping contact.</strong> Every email has an unsubscribe
              link, or you can reply &ldquo;stop&rdquo; or email{" "}
              <a href="mailto:hello@eburyfire.co.uk">hello@eburyfire.co.uk</a>.
              We&rsquo;ll stop straight away. We keep a minimal record of your
              email address so we don&rsquo;t contact you again.
            </p>
            <p>
              <strong>How long we keep it.</strong> If you haven&rsquo;t been
              in touch with us for 24 months (by replying to us, speaking to us
              on a call or meeting us), we delete your details, including any
              call transcripts and summaries. While we&rsquo;re in active talks
              with your organisation, discussing your needs, a site survey or a
              quote, we keep them until those talks end. Call recordings are
              deleted after 90 days. The written transcript and summary stay
              with the rest of your details until those are deleted. If you ask
              us not to contact you, we keep a record of that request
              permanently so we can honour it.
            </p>
            <p>
              <strong>Who can see it.</strong> Our staff who work on sales. A
              call recording or transcript can be seen only by the person who
              made the call and by our administrators. The companies that run
              our systems for us also process your details: Supabase hosts our
              database and Vercel runs the portal where we keep these records,
              both in London. We don&rsquo;t sell your details.
            </p>
            <p>
              <strong>Your rights.</strong> You can ask for a copy of the
              information we hold about you, ask us to correct or delete it, or
              object to us using it. Email{" "}
              <a href="mailto:hello@eburyfire.co.uk">hello@eburyfire.co.uk</a>.
              If you&rsquo;re unhappy with how we&rsquo;ve handled your
              information, you can complain to the Information
              Commissioner&rsquo;s Office (<a href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a>).
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
