import { faqs } from "@/lib/content";

// Exclusive accordion with <details name>: no JavaScript, first one open.
export function Faqs() {
  return (
    <div className="flex flex-col gap-4">
      {faqs.map((f, i) => (
        <details key={f.q} name="faq" open={i === 0} className="faq rounded-[20px] bg-white">
          <summary className="flex cursor-pointer justify-between gap-4 px-7 py-6 text-[19px] font-extrabold">
            {f.q}
            <span aria-hidden="true">
              <span className="faq-sign-plus">+</span>
              <span className="faq-sign-minus">–</span>
            </span>
          </summary>
          <p className="m-0 px-7 pb-6 text-[16px] leading-[1.55] text-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
