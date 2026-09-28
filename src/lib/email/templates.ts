import { site } from "@/lib/site";

type EnquiryPayload = {
  companyName: string;
  contactName: string;
  email: string;
  numberOfSites?: string;
  currentProvider?: string;
  urgency: string;
  message?: string;
  referralCode?: string;
};

const baseStyles = `
  body { margin: 0; padding: 0; background: #F5F1EC; font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif; color: #1A1A1A; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
  .card { background: #ffffff; border-radius: 8px; padding: 32px; border: 1px solid rgba(26,26,26,0.08); }
  .brand { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; color: #1A1A1A; }
  .brand .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #F26522; vertical-align: middle; margin: 0 2px 3px 2px; }
  .brand .sub { font-size: 13px; font-weight: 300; color: #6F6A60; margin-left: 4px; }
  h1 { font-size: 22px; font-weight: 500; letter-spacing: -0.02em; margin: 24px 0 12px; color: #1A1A1A; }
  p { font-size: 15px; line-height: 1.6; color: #1A1A1A; margin: 0 0 12px; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6F6A60; margin: 18px 0 4px; }
  .value { font-size: 15px; color: #1A1A1A; }
  .rule { height: 1px; background: rgba(26,26,26,0.08); margin: 20px 0; }
  .foot { font-size: 12px; color: #6F6A60; margin-top: 16px; }
  a { color: #F26522; text-decoration: none; }
`;

const wordmark = `
  <div class="brand">
    ebury<span class="dot"></span><span class="sub">fire systems</span>
  </div>
`;

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function enquiryInternalTemplate(p: EnquiryPayload) {
  const rows: Array<[string, string | undefined]> = [
    ["Company", p.companyName],
    ["Contact", p.contactName],
    ["Email", p.email],
    ["Number of sites", p.numberOfSites],
    ["Current provider", p.currentProvider],
    ["Urgency", p.urgency],
    ["Anything to flag", p.message],
    ["Referral code", p.referralCode],
  ];

  const rowsHtml = rows
    .filter(([, v]) => v && v.length)
    .map(
      ([k, v]) =>
        `<p class="label">${esc(k)}</p><div class="value">${esc(v).replace(/\n/g, "<br>")}</div>`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head>
  <body><div class="wrap"><div class="card">
    ${wordmark}
    <h1>New enquiry from ${esc(p.companyName)}</h1>
    <p>A new quote enquiry has been submitted via eburyfire.co.uk/contact.</p>
    <div class="rule"></div>
    ${rowsHtml}
    <div class="rule"></div>
    <p class="foot">Reply directly to this email to respond to ${esc(p.contactName)}.</p>
  </div></div></body></html>`;
}

export function enquiryAcknowledgementTemplate(p: EnquiryPayload) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head>
  <body><div class="wrap"><div class="card">
    ${wordmark}
    <h1>Thanks, ${esc(p.contactName)}.</h1>
    <p>We&rsquo;ve got your enquiry and we&rsquo;ll be in touch within one working day.</p>
    <p>In the meantime, if you want to add anything — site list, renewal dates, the contractor you&rsquo;re leaving — just reply to this email.</p>
    <div class="rule"></div>
    <p class="foot">
      ${site.name} &middot; ${site.legalName} &middot; Company No. ${site.companyNumber}<br>
      <a href="${site.url}">eburyfire.co.uk</a> &middot; <a href="mailto:${site.contactEmail}">${site.contactEmail}</a>
    </p>
  </div></div></body></html>`;
}

export function enquirySubjectInternal(p: EnquiryPayload) {
  return `New enquiry · ${p.companyName} · ${p.urgency}`;
}

export function enquirySubjectAck() {
  return `Thanks — we’ll be in touch within one working day`;
}
