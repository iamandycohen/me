import type { Metadata } from 'next';

import PrototypeExperience from './PrototypeExperience';

export const metadata: Metadata = {
  title: 'Exploratory prototype | Where the Record Ends',
  description:
    'An exploratory family atlas, open research case, and evidence-backed family story for Where the Record Ends.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function GenealogyPrototypePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe7] text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_72%_18%,rgba(153,72,47,0.13),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.36),transparent)]"
      />
      <section className="relative border-b border-ink/10 px-5 pb-10 pt-20 sm:px-8 md:pb-14 md:pt-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent/35 bg-accent/[0.06] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.19em] text-accent">
                  Exploratory prototype
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-ink/65">
                  Not production navigation
                </span>
              </div>
              <p className="eyebrow mb-5">Where the Record Ends</p>
              <h1 className="max-w-4xl text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.04em]">
                A family history still{' '}
                <span className="italic text-ink/65">in motion.</span>
              </h1>
            </div>
            <p className="border-l border-accent/40 pl-6 font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
              Explore a documented line, follow an unresolved case, or read the
              family story the records can support. Every view shares the same
              boundary between record and interpretation.
            </p>
          </div>
        </div>
      </section>

      <PrototypeExperience />
    </main>
  );
}
