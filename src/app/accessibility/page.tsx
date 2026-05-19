import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our commitment to WCAG 2.2 AA on eburyfire.co.uk.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader eyebrow="Accessibility" title="Accessibility statement" />
      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <Prose>
            <p>
              We aim to meet WCAG 2.2 AA. If you find anything that
              doesn&rsquo;t meet that standard or you have an accessibility
              concern, email{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>{" "}
              and we&rsquo;ll fix it.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
