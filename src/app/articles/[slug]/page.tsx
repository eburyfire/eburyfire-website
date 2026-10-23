import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/ui/Button";
import { categoryLabel, fetchResourceBySlug, fetchResources, formatPublished } from "@/lib/resources";
import { site } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await fetchResources();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchResourceBySlug(slug);
  if (!item) return { title: "Article not found" };
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: { title: item.title, description: item.excerpt, type: "article", publishedTime: item.publishedAt },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await fetchResourceBySlug(slug);
  if (!item) notFound();

  let MDXContent: React.ComponentType | undefined;
  try {
    const mod = (await import(`@/content/resources/${slug}.mdx`)) as { default: React.ComponentType };
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.publishedAt,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/articles/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article className="mx-auto w-full max-w-[1240px] px-4 pb-16 sm:px-10">
        <div className="rounded-[32px] bg-sand px-6 py-6 sm:px-12">
          <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] font-bold text-muted">
            <Link href="/articles" className="underline underline-offset-2 hover:text-blue">
              All articles
            </Link>
            <span aria-hidden="true">·</span>
            <span className="rounded-full bg-highlight px-3 py-1 text-text">{categoryLabel(item.category)}</span>
            <span aria-hidden="true">·</span>
            <span>{item.readingMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <time dateTime={item.publishedAt}>{formatPublished(item.publishedAt)}</time>
          </p>
        </div>
        <div className="mx-auto max-w-[720px] py-12">{MDXContent ? <MDXContent /> : null}</div>
      </article>
      <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-highlight p-8 sm:p-12">
          <p className="display m-0 text-[40px] leading-[1.05] sm:text-[52px]">
            Keep it boring.
          </p>
          <CtaLink href="/contact#survey">Book a survey</CtaLink>
        </div>
      </section>
    </>
  );
}
