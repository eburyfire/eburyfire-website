// Run: pnpm test (node --test with built-in type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { securityHeaders } from "./security-headers.ts";

// Security audit (27 Oct 2026): every response carries the security headers
// and the X-Powered-By header is off.

const h = Object.fromEntries(securityHeaders.map((x) => [x.key.toLowerCase(), x.value]));

test("the header set is complete", () => {
  assert.equal(h["x-frame-options"], "DENY");
  assert.equal(h["content-security-policy"], "frame-ancestors 'none'");
  assert.equal(h["x-content-type-options"], "nosniff");
  assert.equal(h["referrer-policy"], "strict-origin-when-cross-origin");
  assert.equal(h["permissions-policy"], "camera=(), microphone=(), geolocation=()");
  assert.equal(h["strict-transport-security"], "max-age=63072000; includeSubDomains");
  assert.doesNotMatch(h["strict-transport-security"], /preload/);
});

test("next.config applies them to every path and turns off X-Powered-By", () => {
  const src = readFileSync(new URL("../../next.config.ts", import.meta.url), "utf8");
  assert.match(src, /poweredByHeader:\s*false/);
  assert.match(src, /source:\s*"\/\(\.\*\)",\s*headers:\s*securityHeaders/);
  assert.match(src, /import \{ securityHeaders \} from "\.\/src\/lib\/security-headers"/);
});
