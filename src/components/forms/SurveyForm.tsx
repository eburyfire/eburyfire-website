"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { buildingTypes } from "@/lib/survey";
import { site } from "@/lib/site";

export const POSTCODE_EVENT = "ebury:postcode";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; fields: Record<string, string> };

const inputClass =
  "w-full rounded-[14px] border border-line bg-white px-4 py-3.5 text-[16px] font-normal text-text";
const labelClass = "flex flex-col gap-1.5 text-[15px] font-bold";

function newFormId(): string {
  const c: Crypto = globalThis.crypto;
  if (typeof c.randomUUID === "function") return c.randomUUID();
  const bytes = new Uint8Array(16);
  c.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function SurveyForm({
  initialPostcode = "",
  referralCode,
}: {
  initialPostcode?: string;
  referralCode?: string;
}) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [postcode, setPostcode] = useState(initialPostcode);
  // One id per form instance: a resubmit after an error is the same request.
  const formIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // The hero's postcode box hands its value over here.
  useEffect(() => {
    const onPostcode = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (typeof value === "string") setPostcode(value);
      // Focus once the page has scrolled to the form, not mid-scroll.
      window.setTimeout(() => typeRef.current?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(POSTCODE_EVENT, onPostcode);
    return () => window.removeEventListener(POSTCODE_EVENT, onPostcode);
  }, []);

  useEffect(() => {
    if (state.kind === "success") successRef.current?.focus();
    if (state.kind === "error") {
      let bad = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      // A radio group isn't focusable itself: focus its first option.
      if (bad?.getAttribute("role") === "radiogroup") bad = bad.querySelector<HTMLElement>("input");
      (bad ?? formRef.current?.querySelector<HTMLElement>('[data-form-error]'))?.focus();
    }
  }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    formIdRef.current ??= newFormId();
    const formId = formIdRef.current;
    const payload = {
      postcode: String(fd.get("postcode") ?? ""),
      buildingType: String(fd.get("buildingType") ?? ""),
      sites: String(fd.get("sites") ?? ""),
      name: String(fd.get("name") ?? ""),
      contact: String(fd.get("contact") ?? ""),
      referralCode: referralCode || undefined,
      formId,
      website: String(fd.get("website") ?? "") || undefined,
    };
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body?.ok === true) {
        setState({ kind: "success" });
        return;
      }
      const issues: Array<{ path: string; message: string }> = body?.issues ?? [];
      const fields: Record<string, string> = {};
      for (const i of issues) if (!fields[i.path]) fields[i.path] = i.message;
      setState({
        kind: "error",
        message: issues.length ? "Please check the fields marked below." : (body?.error ?? `Something went wrong. Please try again, or email ${site.contactEmail}.`),
        fields,
      });
    } catch {
      setState({ kind: "error", message: `Network error. Please try again, or email ${site.contactEmail}.`, fields: {} });
    }
  }

  if (state.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col justify-center gap-3 rounded-[32px] bg-sand p-8 sm:p-12 focus:outline-none"
      >
        <p className="display m-0 text-[36px]">Thanks.</p>
        <p className="m-0 text-[18px]">We reply within one working day.</p>
      </div>
    );
  }

  const fields = state.kind === "error" ? state.fields : {};
  const err = (name: string) =>
    fields[name] ? (
      <span id={`${uid}-${name}-err`} className="text-[14px] font-bold text-no">
        {fields[name]}
      </span>
    ) : null;
  const described = (name: string) => (fields[name] ? `${uid}-${name}-err` : undefined);
  const submitting = state.kind === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      aria-label="Book a survey"
      className="grid grid-cols-1 gap-3.5 rounded-[32px] bg-sand p-6 sm:grid-cols-2 sm:p-12"
    >
      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div inert className="sr-only">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
        Postcode *
        <input
          name="postcode"
          required
          autoComplete="postal-code"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          aria-invalid={fields.postcode ? true : undefined}
          aria-describedby={described("postcode")}
          className={inputClass}
        />
        </label>
        {err("postcode")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
        How many sites? *
        <input
          name="sites"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={1}
          required
          aria-invalid={fields.sites ? true : undefined}
          aria-describedby={described("sites")}
          className={inputClass}
        />
        </label>
        {err("sites")}
      </div>
      {/* Pills, not a <select>: the open list of a native select can't be styled. */}
      <fieldset
        className="m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0 sm:col-span-2"
        aria-describedby={described("buildingType")}
      >
        <legend className="mb-2.5 p-0 text-[15px] font-bold">Type of building *</legend>
        <div
          role="radiogroup"
          aria-required="true"
          aria-invalid={fields.buildingType ? true : undefined}
          className="flex flex-wrap gap-2"
        >
          {buildingTypes.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input
                ref={i === 0 ? typeRef : undefined}
                type="radio"
                name="buildingType"
                value={t}
                required
                className="peer sr-only"
              />
              <span className="pop inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 py-2 text-[15px] font-bold text-text transition-colors peer-checked:border-ink peer-checked:bg-highlight peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-blue">
                {t}
              </span>
            </label>
          ))}
        </div>
        {err("buildingType")}
      </fieldset>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
        Name *
        <input
          name="name"
          required
          autoComplete="name"
          aria-invalid={fields.name ? true : undefined}
          aria-describedby={described("name")}
          className={inputClass}
        />
        </label>
        {err("name")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
        Phone or email *
        <input
          name="contact"
          required
          autoComplete="email"
          aria-invalid={fields.contact ? true : undefined}
          aria-describedby={described("contact")}
          className={inputClass}
        />
        </label>
        {err("contact")}
      </div>
      <p className="m-0 text-[14px] text-muted sm:col-span-2">
        We use your details to reply to you. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          privacy notice
        </Link>
        .
      </p>
      {state.kind === "error" ? (
        <p role="alert" tabIndex={-1} data-form-error className="m-0 text-[15px] font-bold text-no sm:col-span-2">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="pop justify-self-start rounded-full bg-blue px-8 py-4 text-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Book my survey"}
      </button>
    </form>
  );
}
