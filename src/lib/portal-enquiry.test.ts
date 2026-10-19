// Run: pnpm test (node --test with built-in type stripping; no extra dependency).
import { test } from "node:test";
import assert from "node:assert/strict";
import { allowQuote, enquiryBody, idempotencyKey, isHoneypot, sendEnquiryToPortal, signEnquiry } from "./portal-enquiry.ts";

test("text the database can't store is cleaned before it's sent", () => {
  const body = JSON.parse(enquiryBody("k".repeat(20), { ...data, contactName: "Jo\u0000e\ud800", message: "line one\nline\ttwo\u0007" }));
  assert.equal(body.enquiry.contact_name, "Joe\ufffd");
  assert.equal(body.enquiry.message, "line one\nline\ttwo");
});

test("honeypot: anything typed in the hidden field is a bot", () => {
  assert.equal(isHoneypot(undefined), false);
  assert.equal(isHoneypot(""), false);
  assert.equal(isHoneypot("   "), false);
  assert.equal(isHoneypot("http://spam.example"), true);
});

const data = {
  companyName: "Acme Care", contactName: "Jane", email: "jane@acme.example",
  urgency: "Curious" as const, message: "secret message", numberOfSites: undefined, currentProvider: undefined, referralCode: undefined,
};
const SECRET = "s".repeat(40);
const env = { WEBSITE_ENQUIRY_SECRET: SECRET, PORTAL_ENQUIRY_URL: "https://portal.test/api/website/enquiry" };

test("signature matches the portal's fixed vector", () => {
  // Same vector as the portal's enquiry-signature.test.ts.
  assert.equal(signEnquiry("k", 1700000000, "x"), "t=1700000000,v1=35e785f0777ca89fd2c639cc4f8c9806af1aa1f62afa88698a7e1f158f227cfc");
});

test("idempotency key: the form id when valid, else the same London day", () => {
  const now = new Date("2026-10-19T10:00:00Z");
  assert.equal(idempotencyKey("f".repeat(20), data, now), "f".repeat(20));
  const a = idempotencyKey(undefined, data, now);
  // A resubmit minutes later, across a 10-minute boundary, is the same enquiry.
  assert.equal(a, idempotencyKey("bad id!", data, new Date("2026-10-19T10:10:03Z")));
  assert.notEqual(a, idempotencyKey(undefined, data, new Date("2026-10-20T10:00:00Z")));
  assert.match(a, /^h[0-9a-f]{40}$/);
});

test("per-IP brake: 5 in 10 minutes, then refused, then allowed again", () => {
  const t0 = 1_800_000_000_000;
  for (let i = 0; i < 5; i++) assert.equal(allowQuote("203.0.113.9", t0 + i), true);
  assert.equal(allowQuote("203.0.113.9", t0 + 10), false);
  assert.equal(allowQuote("203.0.113.10", t0 + 10), true);
  assert.equal(allowQuote("203.0.113.9", t0 + 600_001), true);
  assert.equal(allowQuote(null, t0), true);
});

test("body carries only the form fields, empty ones left out", () => {
  assert.deepEqual(JSON.parse(enquiryBody("k".repeat(20), data)), {
    idempotency_key: "k".repeat(20),
    enquiry: { company_name: "Acme Care", contact_name: "Jane", email: "jane@acme.example", urgency: "Curious", message: "secret message" },
  });
});

test("no secret: skipped, no request", async () => {
  let called = false;
  const r = await sendEnquiryToPortal("k".repeat(20), data, { env: {}, fetch: (async () => { called = true; return new Response(); }) as typeof fetch });
  assert.equal(r, "skipped");
  assert.equal(called, false);
});

test("signed request; only a JSON ok counts as success", async () => {
  let seen: { url: string; init: RequestInit } | null = null;
  const ok = (async (url: string, init: RequestInit) => {
    seen = { url, init };
    return new Response(JSON.stringify({ ok: true, result: "recorded" }), { status: 200 });
  }) as unknown as typeof fetch;
  assert.equal(await sendEnquiryToPortal("k".repeat(20), data, { env, fetch: ok, now: () => 1700000000000 }), "recorded");
  assert.equal(seen!.url, env.PORTAL_ENQUIRY_URL);
  assert.equal(seen!.init.redirect, "manual");
  const raw = seen!.init.body as string;
  assert.equal((seen!.init.headers as Record<string, string>)["x-ebury-signature"], signEnquiry(SECRET, 1700000000, raw));

  const silence = () => {};
  const origErr = console.error;
  const logs: unknown[] = [];
  console.error = (...a: unknown[]) => { logs.push(a); };
  try {
    const redirect = (async () => new Response(null, { status: 307, headers: { location: "/sign-in" } })) as unknown as typeof fetch;
    assert.equal(await sendEnquiryToPortal("k".repeat(20), data, { env, fetch: redirect }), "failed");
    const html = (async () => new Response("<html>sign in</html>", { status: 200 })) as unknown as typeof fetch;
    assert.equal(await sendEnquiryToPortal("k".repeat(20), data, { env, fetch: html }), "failed");
    const boom = (async () => { throw new Error("secret message"); }) as unknown as typeof fetch;
    assert.equal(await sendEnquiryToPortal("k".repeat(20), data, { env, fetch: boom }), "failed");
    assert.ok(!JSON.stringify(logs).includes("secret message"));
    assert.ok(!JSON.stringify(logs).includes(SECRET));
  } finally {
    console.error = origErr;
    void silence;
  }
});
