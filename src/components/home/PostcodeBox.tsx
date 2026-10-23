"use client";

import { POSTCODE_EVENT } from "@/components/forms/SurveyForm";

// Hero postcode box. Without JavaScript it goes to /contact?postcode=…,
// which pre-fills the form there. With it, it jumps to the form on this page.
export function PostcodeBox() {
  return (
    <form
      action="/contact"
      method="get"
      onSubmit={(e) => {
        const target = document.getElementById("contact");
        if (!target) return;
        e.preventDefault();
        const value = String(new FormData(e.currentTarget).get("postcode") ?? "").trim();
        window.dispatchEvent(new CustomEvent(POSTCODE_EVENT, { detail: value }));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }}
      className="flex max-w-[560px] flex-wrap gap-2.5 rounded-[32px] bg-white p-2 sm:rounded-full"
    >
      <label className="flex min-w-0 flex-[1_1_200px] items-center pl-4">
        <span className="sr-only">Your postcode</span>
        <input
          type="text"
          name="postcode"
          placeholder="Your postcode"
          autoComplete="postal-code"
          maxLength={10}
          className="w-full min-w-0 border-0 bg-transparent py-3 text-[17px] rounded-full"
        />
      </label>
      <button
        type="submit"
        className="pop flex-[1_1_auto] rounded-full bg-blue px-7 py-4 text-[17px] font-extrabold text-white sm:flex-none"
      >
        Book a survey
      </button>
    </form>
  );
}
