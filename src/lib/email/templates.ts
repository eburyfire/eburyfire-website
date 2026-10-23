import { site } from "@/lib/site";
import type { SurveyInput } from "@/lib/survey";

const baseStyles = `
  body { margin: 0; padding: 0; background: #F1EDE7; font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111111; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
  .card { background: #ffffff; border-radius: 24px; padding: 32px; }
  .brand { font-family: Georgia, "Times New Roman", serif; font-size: 28px; color: #1E1B2E; }
  .brand .dot { color: #1D3BC4; }
  h1 { font-size: 22px; font-weight: 800; margin: 24px 0 12px; color: #111111; }
  p { font-size: 15px; line-height: 1.6; color: #111111; margin: 0 0 12px; }
  .label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #4A4A4A; margin: 18px 0 4px; }
  .value { font-size: 15px; color: #111111; }
  .rule { height: 1px; background: #D8D2C8; margin: 20px 0; }
  .foot { font-size: 12px; color: #4A4A4A; margin-top: 16px; }
  a { color: #1D3BC4; }
`;

const wordmark = `<div class="brand">Ebury<span class="dot">.</span></div>`;

export function esc(s: string | number | undefined | null): string {
  if (s === undefined || s === null || s === "") return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rowsHtml(rows: Array<[string, string | number | undefined]>): string {
  return rows
    .filter(([, v]) => v !== undefined && String(v).length > 0)
    .map(([k, v]) => `<p class="label">${esc(k)}</p><div class="value">${esc(v).replace(/\n/g, "<br>")}</div>`)
    .join("");
}

function page(inner: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head>
  <body><div class="wrap"><div class="card">${wordmark}${inner}</div></div></body></html>`;
}

export function surveyInternalTemplate(s: SurveyInput, crm: string) {
  return page(`
    <h1>Survey request from ${esc(s.name)}</h1>
    <p>Sent from the Book a survey form on eburyfire.co.uk.</p>
    <div class="rule"></div>
    ${rowsHtml([
      ["Portal CRM", crm],
      ["Name", s.name],
      ["Phone or email", s.contact],
      ["Postcode", s.postcode],
      ["Type of building", s.buildingType],
      ["How many sites", s.sites],
      ["Referral code", s.referralCode],
    ])}
  `);
}

export function surveySubjectInternal(s: SurveyInput) {
  return `Survey request · ${s.buildingType} · ${s.postcode} · ${s.sites} site${s.sites === 1 ? "" : "s"}`;
}

export function surveyAcknowledgementTemplate(s: SurveyInput) {
  return page(`
    <h1>Thanks, ${esc(s.name)}.</h1>
    <p>We&rsquo;ve got your survey request and we&rsquo;ll reply within one working day.</p>
    <p>Want to add anything, like a site list or when your current contract ends? Just reply to this email.</p>
    <div class="rule"></div>
    <p class="foot">${site.name} &middot; <a href="${site.url}">eburyfire.co.uk</a> &middot; <a href="mailto:${site.contactEmail}">${site.contactEmail}</a></p>
  `);
}

export function surveySubjectAck() {
  return "Thanks. We’ll reply within one working day";
}

export type CareersInput = {
  area: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export function careersInternalTemplate(c: CareersInput) {
  return page(`
    <h1>Careers: ${esc(c.name)}</h1>
    <p>Sent from eburyfire.co.uk/careers. Their CV should follow by email.</p>
    <div class="rule"></div>
    ${rowsHtml([
      ["Area", c.area],
      ["Name", c.name],
      ["Email", c.email],
      ["Phone", c.phone],
      ["Anything we should know", c.notes],
    ])}
  `);
}

export function careersSubjectInternal(c: CareersInput) {
  return `Careers · ${c.area} · ${c.name}`;
}
