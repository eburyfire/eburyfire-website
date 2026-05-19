export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="px-6 md:px-8 pt-16 md:pt-24 pb-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="border-l-[3px] border-orange pl-6 max-w-[820px]">
          {eyebrow ? (
            <p className="text-[12px] uppercase tracking-[0.12em] text-stone mb-3">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-[34px] md:text-[48px] font-medium tracking-[-0.025em] leading-[1.1] mb-4">
            {title}
          </h1>
          {intro ? (
            <p className="text-[17px] md:text-[19px] text-stone leading-[1.55] max-w-[680px]">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
