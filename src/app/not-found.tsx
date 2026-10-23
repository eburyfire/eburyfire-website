import { CtaLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pt-2 pb-24 sm:px-10">
      <div className="flex flex-col gap-6 rounded-[32px] bg-sand px-6 py-14 sm:px-12 sm:py-20">
        <p className="eyebrow m-0 text-muted">404</p>
        <h1 className="display m-0 text-[64px] leading-[1.02] sm:text-[104px]">
          Nothing <span className="hl">here.</span>
        </h1>
        <p className="m-0 max-w-[560px] text-[19px] leading-[1.5] text-body">
          Which, for a fire alarm firm, is the dream. Let&rsquo;s get you somewhere useful.
        </p>
        <div className="flex flex-wrap gap-3">
          <CtaLink href="/">Home</CtaLink>
          <CtaLink href="/services" variant="white">
            What we do
          </CtaLink>
          <CtaLink href="/articles" variant="white">
            Articles
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
