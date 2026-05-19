type Props = {
  size?: "sm" | "md";
};

export function Wordmark({ size = "md" }: Props) {
  const nameSize = size === "sm" ? "text-[22px]" : "text-[30px]";
  const subSize = size === "sm" ? "text-[13px]" : "text-[16px]";
  const dotSize = size === "sm" ? "w-[6px] h-[6px]" : "w-[8px] h-[8px]";
  const subOffset = size === "sm" ? "ml-1" : "ml-1.5";

  return (
    <span className="inline-flex items-baseline gap-1.5 select-none">
      <span
        className={`${nameSize} font-medium tracking-[-0.025em] text-ink leading-none`}
      >
        ebury
      </span>
      <span
        className={`${dotSize} rounded-full bg-orange inline-block translate-y-[-3px]`}
        aria-hidden
      />
      <span
        className={`${subSize} font-light text-stone leading-none ${subOffset}`}
      >
        fire systems
      </span>
    </span>
  );
}
