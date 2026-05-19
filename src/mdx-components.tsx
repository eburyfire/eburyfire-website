import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.15] mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] mt-12 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-0.015em] mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[16px] text-ink leading-[1.7] mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-[16px] text-ink leading-[1.7] list-disc pl-5 mb-4 [&_li]:mb-1.5">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-[16px] text-ink leading-[1.7] list-decimal pl-5 mb-4 [&_li]:mb-1.5">
        {children}
      </ol>
    ),
    a: ({ href, children, ...rest }) => (
      <a
        href={href}
        className="text-ink underline underline-offset-2 hover:text-orange"
        {...rest}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-orange pl-5 my-6 text-stone italic">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
