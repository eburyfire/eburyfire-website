import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export const revalidate = 3600;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  hero_image_url: string | null;
  author_name: string;
  published_at: string;
};

function portalUrl(): string {
  return process.env.PORTAL_API_URL ?? "https://portal.eburyfire.co.uk";
}

async function loadPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${portalUrl()}/api/blog/public/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as Post;
  } catch {
    return null;
  }
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Day 40b — marketing /blog/[slug]. ISR; 404 if not published.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="text-sm text-stone-500 hover:text-orange-600 mb-6 inline-block"
      >
        ← All posts
      </Link>

      <header className="mb-8">
        <p className="text-sm text-stone-500 mb-2">
          {formatDate(post.published_at)} · {post.author_name}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-4 text-xl text-stone-600 leading-relaxed">
            {post.excerpt}
          </p>
        ) : null}
      </header>

      {post.hero_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.hero_image_url}
          alt=""
          className="w-full aspect-[16/8] object-cover rounded-md mb-8"
        />
      ) : null}

      <article className="prose prose-stone prose-lg max-w-none">
        <ReactMarkdown>{post.body_md}</ReactMarkdown>
      </article>
    </main>
  );
}
