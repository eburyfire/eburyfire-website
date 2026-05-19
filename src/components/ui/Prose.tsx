export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        max-w-[720px]
        [&_h2]:text-[24px] [&_h2]:md:text-[28px] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:mt-12 [&_h2]:mb-4
        [&_h3]:text-[18px] [&_h3]:md:text-[20px] [&_h3]:font-medium [&_h3]:tracking-[-0.015em] [&_h3]:mt-8 [&_h3]:mb-3
        [&_p]:text-[16px] [&_p]:text-ink [&_p]:leading-[1.7] [&_p]:mb-4
        [&_ul]:text-[16px] [&_ul]:text-ink [&_ul]:leading-[1.7] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
        [&_ol]:text-[16px] [&_ol]:text-ink [&_ol]:leading-[1.7] [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
        [&_li]:mb-1.5
        [&_strong]:font-medium [&_strong]:text-ink
        [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-orange
        [&_code]:text-[14px] [&_code]:bg-ink/[0.04] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
      "
    >
      {children}
    </div>
  );
}
