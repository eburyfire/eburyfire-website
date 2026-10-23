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
    <header className="px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[900px]">
          {eyebrow ? (
            <p className="label-mono text-ember-ink mb-4">{eyebrow}</p>
          ) : null}
          <h1 className="display text-[44px] md:text-[72px] mb-6">{title}</h1>
          {intro ? (
            <p className="text-[17px] md:text-[20px] text-stone leading-[1.55] max-w-[680px]">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
