import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryLabel,
  fetchResourceBySlug,
  fetchResources,
  formatPublished,
} from "@/lib/resources";

export async function generateStaticParams() {
  const items = await fetchResources();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchResourceBySlug(slug);
  if (!item) return { title: "Article not found" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
    },
  };
}

export default async function ResourceArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await fetchResourceBySlug(slug);
  if (!item) notFound();

  let MDXContent: React.ComponentType | undefined;
  try {
    const mod = (await import(`@/content/resources/${slug}.mdx`)) as {
      default: React.ComponentType;
    };
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <>
      <header className="sticky top-[64px] z-30 bg-cream/95 backdrop-blur-sm border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-3 flex flex-wrap items-center gap-4 text-[12px]">
          <Link
            href="/resources"
            className="text-stone hover:text-orange transition-colors"
          >
            ← All resources
          </Link>
          <span className="text-stone/40" aria-hidden>·</span>
          <span className="text-orange uppercase tracking-[0.12em]">
            {categoryLabel(item.category)}
          </span>
          <span className="text-stone/40" aria-hidden>·</span>
          <span className="text-stone">{item.readingMinutes} min read</span>
          <span className="text-stone/40" aria-hidden>·</span>
          <span className="text-stone">{formatPublished(item.publishedAt)}</span>
        </div>
      </header>

      <article className="px-6 md:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-[720px]">
          {MDXContent ? <MDXContent /> : null}

          <div className="mt-16 pt-8 border-t border-rule">
            <p className="text-[14px] text-stone mb-3">Was this useful?</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-[13px] px-4 py-2 rounded-[4px] border border-rule text-ink hover:border-ink/40"
              >
                Yes
              </button>
              <button
                type="button"
                className="text-[13px] px-4 py-2 rounded-[4px] border border-rule text-ink hover:border-ink/40"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
