"use client";

import { useState } from "react";
import { sitesOptions, urgencyOptions } from "@/lib/quote-schema";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function QuoteForm({
  referralCode,
}: {
  referralCode?: string;
}) {
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      companyName: String(fd.get("companyName") ?? ""),
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      numberOfSites: String(fd.get("numberOfSites") ?? ""),
      currentProvider: String(fd.get("currentProvider") ?? ""),
      urgency: String(fd.get("urgency") ?? ""),
      message: String(fd.get("message") ?? ""),
      referralCode: String(fd.get("referralCode") ?? "") || undefined,
    };

    setState({ kind: "submitting" });

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok || res.status === 202) {
        setState({
          kind: "success",
          message:
            body?.note ??
            "Thanks — we’ll be in touch within one working day.",
        });
        form.reset();
        return;
      }

      const issues: Array<{ message: string }> = body?.issues ?? [];
      const msg =
        issues.length > 0
          ? issues.map((i) => i.message).join(". ")
          : (body?.error ?? "Something went wrong. Please try again.");
      setState({ kind: "error", message: msg });
    } catch {
      setState({
        kind: "error",
        message:
          "Network error. Please try again, or email hello@eburyfire.co.uk.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="bg-surface border border-rule rounded-[6px] p-8">
        <p className="text-[18px] font-medium tracking-[-0.015em] mb-2">
          Thanks — we’ll be in touch within one working day.
        </p>
        <p className="text-[14px] text-stone">{state.message}</p>
      </div>
    );
  }

  const submitting = state.kind === "submitting";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      {referralCode ? (
        <input type="hidden" name="referralCode" value={referralCode} />
      ) : null}

      <Field label="Company name" required>
        <input
          name="companyName"
          required
          autoComplete="organization"
          className={inputClass}
        />
      </Field>

      <Field label="Contact name" required>
        <input
          name="contactName"
          required
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <Field label="Email" required>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <Field label="Number of sites">
        <select name="numberOfSites" defaultValue="" className={inputClass}>
          <option value="">— Select —</option>
          {sitesOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Current provider">
        <input
          name="currentProvider"
          autoComplete="off"
          className={inputClass}
          placeholder="(optional)"
        />
      </Field>

      <fieldset className="grid gap-2.5">
        <legend className="text-[13px] font-medium text-ink mb-1">
          Urgency <span className="text-stone">*</span>
        </legend>
        <div className="grid gap-2">
          {urgencyOptions.map((u) => (
            <label
              key={u}
              className="flex items-center gap-2.5 text-[14px] text-ink cursor-pointer"
            >
              <input
                type="radio"
                name="urgency"
                value={u}
                required
                className="accent-orange"
              />
              {u}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Anything to flag">
        <textarea
          name="message"
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="(optional)"
        />
      </Field>

      {state.kind === "error" ? (
        <p className="text-[14px] text-red leading-[1.5]">{state.message}</p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-[22px] py-[14px] text-[15px] font-medium rounded-[4px] bg-ink text-cream hover:bg-black border border-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
        <p className="text-[13px] text-stone">
          We reply within one working day.
        </p>
      </div>
    </form>
  );
}

const inputClass =
  "w-full bg-surface border border-rule rounded-[4px] px-3.5 py-2.5 text-[15px] text-ink focus:outline-none focus:border-ink/40 focus:ring-2 focus:ring-orange/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-medium text-ink">
        {label}
        {required ? <span className="text-stone"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
