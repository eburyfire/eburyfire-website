// Allow named JS exports (e.g. `export const meta = {...}`) from MDX files
// alongside the default MDX component. `@types/mdx` declares only the default
// export, so without this augmentation the typechecker rejects the named
// imports in `src/content/resources/manifest.ts`.

declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const meta: {
    slug: string;
    title: string;
    category: "compliance" | "how-to" | "templates" | "news";
    excerpt: string;
    publishedAt: string;
    readingMinutes: number;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
