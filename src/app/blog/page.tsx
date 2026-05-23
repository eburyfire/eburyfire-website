import Link from "next/link";

export const revalidate = 3600;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  hero_image_url: string | null;
  author_name: string;
  published_at: string;
};

function portalUrl(): string {
  return process.env.PORTAL_API_URL ?? "https://portal.eburyfire.co.uk";
}

async function loadPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${portalUrl()}/api/blog/public`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const body = (await res.json()) as { posts?: Post[] };
    return body.posts ?? [];
  } catch {
    return [];
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
 * Day 40b — marketing /blog index. ISR via revalidate=3600. Posts are
 * authored in the portal at /ops/content and fetched at build time.
 */
export default async function BlogIndex() {
  const posts = await loadPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl">
          Practical notes from the team — fire safety standards, on-site
          stories and the way modern compliance actually works.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-stone-500 py-10">
          No posts published yet. Check back soon.
        </p>
      ) : (
        <ul className="space-y-10">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-stone-200 pb-10 last:border-b-0">
              <Link href={`/blog/${p.slug}`} className="group block">
                {p.hero_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.hero_image_url}
                    alt=""
                    className="w-full aspect-[16/8] object-cover rounded-md mb-4"
                  />
                ) : null}
                <p className="text-sm text-stone-500 mb-1">
                  {formatDate(p.published_at)} · {p.author_name}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-orange-600 transition-colors">
                  {p.title}
                </h2>
                {p.excerpt ? (
                  <p className="mt-2 text-stone-600 leading-relaxed">
                    {p.excerpt}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
