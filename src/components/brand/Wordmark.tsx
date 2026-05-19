type Props = {
  size?: "sm" | "md";
};

export function Wordmark({ size = "md" }: Props) {
  const nameSize = size === "sm" ? "text-[20px]" : "text-[24px]";
  const subSize = size === "sm" ? "text-[12px]" : "text-[13px]";
  const dotSize = size === "sm" ? "w-[5px] h-[5px]" : "w-[6px] h-[6px]";

  return (
    <span className="inline-flex items-baseline gap-1 select-none">
      <span
        className={`${nameSize} font-medium tracking-[-0.02em] text-ink leading-none`}
      >
        ebury
      </span>
      <span
        className={`${dotSize} rounded-full bg-orange inline-block translate-y-[-2px]`}
        aria-hidden
      />
      <span
        className={`${subSize} font-light text-stone leading-none ml-1`}
      >
        fire systems
      </span>
    </span>
  );
}
