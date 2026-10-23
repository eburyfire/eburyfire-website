import Link from "next/link";

type Variant = "blue" | "butter" | "ink" | "outline" | "white";

const base =
  "pop inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[16px] font-extrabold leading-none no-underline text-center";

const styles: Record<Variant, string> = {
  blue: "bg-blue text-white hover:text-white",
  butter: "bg-highlight text-ink hover:text-ink",
  ink: "bg-ink text-white hover:text-white",
  outline: "border-2 border-text text-text hover:text-text bg-transparent",
  white: "bg-white text-text hover:text-text",
};

export function buttonClass(variant: Variant = "blue", className = "") {
  return `${base} ${styles[variant]} ${className}`;
}

export function CtaLink({
  href,
  children,
  variant = "blue",
  className = "",
  ...rest
}: { variant?: Variant; className?: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}
