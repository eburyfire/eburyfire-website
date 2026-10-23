import { CtaLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="px-6 md:px-8 pt-20 md:pt-28 pb-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="label-mono text-ember-ink mb-5">404</p>
        <h1 className="display-xl text-[72px] md:text-[132px]">
          Nothing here<span className="text-orange">.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] text-stone max-w-[560px] mt-6">
          Which, for a fire alarm firm, is the dream. Let&rsquo;s get you
          somewhere useful.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <CtaLink href="/" variant="ember">
            Home
          </CtaLink>
          <CtaLink href="/services" variant="outline">
            Services
          </CtaLink>
          <CtaLink href="/contact" variant="outline">
            Contact
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
