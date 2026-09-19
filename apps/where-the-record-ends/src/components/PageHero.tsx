import type { ReactNode } from 'react';

export function PageHero({
  eyebrow,
  title,
  introduction,
  aside,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  aside?: ReactNode;
}) {
  return (
    <section className="paper-noise relative overflow-hidden border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24">
      <div
        aria-hidden="true"
        className="absolute -right-16 top-1/2 size-64 -translate-y-1/2 rounded-full border border-accent/10 sm:size-96"
      />
      <div className="relative mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-end">
        <div className="max-w-5xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            {eyebrow}
          </p>
          <h1 className="balanced mt-5 font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.045em]">
            {title}
          </h1>
        </div>
        <div className="rounded-r-2xl border-l-2 border-accent/40 bg-cream/45 py-2 pl-6 pr-4">
          <p className="font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
            {introduction}
          </p>
          {aside}
        </div>
      </div>
    </section>
  );
}
