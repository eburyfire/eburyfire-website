import Link from "next/link";

type Variant = "primary" | "outline";

type ButtonProps = {
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 px-[22px] py-[14px] text-[15px] font-medium rounded-[4px] border transition-colors";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-cream border-ink hover:bg-black",
  outline:
    "bg-transparent text-ink border-ink hover:bg-ink hover:text-cream",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function CtaButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
