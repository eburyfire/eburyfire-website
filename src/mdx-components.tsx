import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="display mb-6 text-[44px] leading-[1.05] sm:text-[60px]">{children}</h1>,
    h2: ({ children }) => <h2 className="display mt-12 mb-3 text-[30px] leading-[1.1] sm:text-[38px]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-[20px] font-extrabold">{children}</h3>,
    p: ({ children }) => <p className="mb-4 text-[17px] leading-[1.7] text-text">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 list-disc pl-5 text-[17px] leading-[1.7] [&_li]:mb-1.5">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 list-decimal pl-5 text-[17px] leading-[1.7] [&_li]:mb-1.5">{children}</ol>,
    a: ({ href, children, ...rest }) => (
      <a href={href} className="font-bold underline underline-offset-2 hover:text-blue" {...rest}>
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-extrabold">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-[20px] bg-highlight-soft px-6 py-4 [&_p]:mb-0">{children}</blockquote>
    ),
    ...components,
  };
}
