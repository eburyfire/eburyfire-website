export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto w-full max-w-[1240px] px-4 sm:px-10 pt-4 pb-12">
      <div className="rounded-[32px] bg-sand px-6 py-12 sm:px-12 sm:py-16 flex flex-col gap-5">
        {eyebrow ? <p className="eyebrow text-muted m-0">{eyebrow}</p> : null}
        <h1 className="display m-0 text-[44px] sm:text-[64px] lg:text-[80px] max-w-[18ch]">{title}</h1>
        {intro ? (
          <p className="m-0 max-w-[640px] text-[18px] sm:text-[20px] leading-[1.5] text-body">{intro}</p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
