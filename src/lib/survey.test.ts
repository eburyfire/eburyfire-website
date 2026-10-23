// Run: pnpm test (node --test with built-in type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { sitesBand, splitContact, surveySchema, toQuoteInput } from "./survey.ts";

const base = { postcode: " ec1v  2nx ", buildingType: "Hotel", sites: "3", name: "Jo", contact: "jo@example.com" };

test("phone or email: either is accepted, anything else isn't", () => {
  assert.deepEqual(splitContact(" Jo@Example.com "), { email: "jo@example.com" });
  assert.deepEqual(splitContact("020 7946 0000"), { phone: "020 7946 0000" });
  assert.deepEqual(splitContact("+44 (0)20 7946-0000"), { phone: "+44 (0)20 7946-0000" });
  assert.equal(splitContact("call me"), null);
  assert.equal(splitContact("12345"), null);
});

test("the form parses, tidying the postcode and the site count", () => {
  const r = surveySchema.parse(base);
  assert.equal(r.postcode, "EC1V 2NX");
  assert.equal(r.sites, 3);
});

test("missing or wrong fields are refused with a plain message", () => {
  const r = surveySchema.safeParse({ ...base, contact: "nope", sites: "0", buildingType: "Castle" });
  assert.equal(r.success, false);
  const msgs = r.error!.issues.map((i) => i.message);
  assert.ok(msgs.includes("Enter a phone number or an email address"));
  assert.ok(msgs.includes("Enter how many sites"));
  assert.ok(msgs.includes("Choose the type of building"));
});

test("an email request maps onto the CRM's enquiry fields", () => {
  const q = toQuoteInput(surveySchema.parse(base))!;
  assert.equal(q.companyName, "Hotel, EC1V 2NX");
  assert.equal(q.contactName, "Jo");
  assert.equal(q.email, "jo@example.com");
  assert.equal(q.numberOfSites, "2-5");
  assert.equal(q.urgency, "Need a quote in 30 days");
  assert.match(q.message!, /Postcode: EC1V 2NX\nBuilding: Hotel\nSites: 3/);
});

test("a phone-only request has no CRM enquiry", () => {
  assert.equal(toQuoteInput(surveySchema.parse({ ...base, contact: "07700 900123" })), null);
});

test("site bands match the CRM's options", () => {
  assert.deepEqual([1, 2, 5, 6, 20, 21, 400].map(sitesBand), ["1", "2-5", "2-5", "6-20", "6-20", "21+", "21+"]);
});
