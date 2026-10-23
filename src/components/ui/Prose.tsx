export const proseClass = `
  max-w-[720px]
  [&_h2]:display [&_h2]:text-[32px] [&_h2]:sm:text-[40px] [&_h2]:mt-12 [&_h2]:mb-4
  [&_h3]:text-[20px] [&_h3]:font-extrabold [&_h3]:mt-8 [&_h3]:mb-3
  [&_p]:text-[17px] [&_p]:text-text [&_p]:leading-[1.7] [&_p]:mb-4
  [&_ul]:text-[17px] [&_ul]:leading-[1.7] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
  [&_ol]:text-[17px] [&_ol]:leading-[1.7] [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
  [&_li]:mb-1.5
  [&_strong]:font-extrabold
  [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-blue
  [&_code]:text-[15px] [&_code]:bg-sand [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
  [&_blockquote]:border-l-4 [&_blockquote]:border-highlight [&_blockquote]:pl-5 [&_blockquote]:my-6
`;

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className={proseClass}>{children}</div>;
}
