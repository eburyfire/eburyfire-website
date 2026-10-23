"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { careerAreas } from "@/lib/careers";
import { site } from "@/lib/site";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; fields: Record<string, string> };

const inputClass = "w-full rounded-[14px] border border-[#C9C2E8] bg-white px-4 py-3.5 text-[16px] font-normal";
const labelClass = "flex flex-col gap-1.5 text-[15px] font-bold";
const cvHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent("CV")}`;

// Careers details go to hello@ by email. The site has no file upload, so the
// CV is emailed separately (the dashed box is a mailto link, not a dropzone).
export function CareersForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const successRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.kind === "success") successRef.current?.focus();
    if (state.kind === "error") {
      const bad = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (bad ?? formRef.current?.querySelector<HTMLElement>('[data-form-error]'))?.focus();
    }
  }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      area: String(fd.get("area") ?? ""),
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      notes: String(fd.get("notes") ?? "") || undefined,
      website: String(fd.get("website") ?? "") || undefined,
    };
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/careers", {
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
        message: issues.length ? "Please check the fields marked below." : (body?.error ?? `Something went wrong. Please email ${site.contactEmail}.`),
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
        className="flex flex-[3_1_480px] flex-col gap-4 rounded-[32px] bg-lilac p-8 sm:p-12 focus:outline-none"
      >
        <p className="display m-0 text-[40px]">Thanks.</p>
        <p className="m-0 text-[18px] leading-[1.5]">
          Now email your CV to{" "}
          <a href={cvHref} className="font-extrabold underline underline-offset-2">
            {site.contactEmail}
          </a>{" "}
          with your name in the subject.
        </p>
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

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      aria-label="Work with us"
      className="flex min-w-0 flex-[3_1_480px] flex-col gap-[18px] rounded-[32px] bg-lilac p-6 sm:p-12"
    >
      <div inert className="sr-only">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <fieldset className="m-0 flex flex-col gap-3 border-0 p-0" aria-describedby={described("area")}>
        <legend className="eyebrow mb-3 p-0">Which area?</legend>
        <div className="flex flex-wrap gap-2">
          {careerAreas.map((a, i) => (
            <label
              key={a}
              className="pop cursor-pointer rounded-full bg-white px-5 py-3 text-[15px] font-bold has-[:checked]:bg-text has-[:checked]:text-white has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-blue"
            >
              <input type="radio" name="area" value={a} defaultChecked={i === 0} className="sr-only" />
              {a}
            </label>
          ))}
        </div>
        {err("area")}
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Name *
          <input name="name" required autoComplete="name" aria-describedby={described("name")} aria-invalid={fields.name ? true : undefined} className={inputClass} />
        </label>
          {err("name")}
        </div>
        <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Email *
          <input name="email" type="email" required autoComplete="email" aria-describedby={described("email")} aria-invalid={fields.email ? true : undefined} className={inputClass} />
        </label>
          {err("email")}
        </div>
        <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Phone *
          <input name="phone" type="tel" required autoComplete="tel" aria-describedby={described("phone")} aria-invalid={fields.phone ? true : undefined} className={inputClass} />
        </label>
          {err("phone")}
        </div>
      </div>

      <a
        href={cvHref}
        className="flex flex-col items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#8E80D6] bg-white px-6 py-9 text-center no-underline"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5B47C7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 16V4" />
          <path d="M7 9l5-5 5 5" />
          <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
        </svg>
        <span className="text-[18px] font-extrabold">Email your CV to {site.contactEmail}</span>
        <span className="text-[14px] text-lilac-ink">PDF or Word, with your name in the subject.</span>
      </a>

      <label className={labelClass}>
        Anything we should know? (qualifications, area you cover)
        <textarea name="notes" rows={4} maxLength={4000} className={`${inputClass} resize-y`} />
      </label>
      <p className="m-0 text-[14px] leading-[1.5] text-lilac-ink">
        We use your details only to consider you for work with us. See our{" "}
        <Link href="/privacy#applicants" className="underline underline-offset-2">
          privacy notice
        </Link>
        .
      </p>
      {state.kind === "error" ? (
        <p role="alert" tabIndex={-1} data-form-error className="m-0 text-[15px] font-bold text-no">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={state.kind === "submitting"}
        className="pop self-start rounded-full bg-blue px-8 py-4 text-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.kind === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
