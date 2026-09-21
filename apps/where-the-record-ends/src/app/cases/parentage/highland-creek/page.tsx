import { highlandCreekReconstruction } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';

import { ArrowLink } from '@/components/ArrowLink';
import { HighlandCreekReconstruction } from '@/components/HighlandCreekReconstruction';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import { absoluteUrl } from '@/lib/site';

const item = highlandCreekReconstruction;
const canonicalUrl = absoluteUrl('/cases/parentage/highland-creek');

export const metadata: Metadata = {
  title: item.title,
  description: item.summary,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: item.title,
    description: item.summary,
    url: canonicalUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: item.title,
    description: item.summary,
  },
};

export default function HighlandCreekPage() {
  return (
    <>
      <section className="paper-noise relative overflow-hidden border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-20 top-10 size-72 rounded-full border border-accent/10 sm:size-[30rem]"
        />
        <div className="relative mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              Parentage case · Evidence reconstruction
            </p>
            <h1 className="balanced mt-5 max-w-6xl font-serif text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.05em]">
              {item.title}
            </h1>
          </div>
          <div className="rounded-r-2xl border-l-2 border-accent/40 bg-cream/50 py-2 pl-6 pr-4">
            <p className="font-serif text-xl leading-relaxed text-ink/70">
              {item.summary}
            </p>
          </div>
        </div>
      </section>

      <HighlandCreekReconstruction />

      <section className="border-t border-ink/10 bg-cream px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[92rem] rounded-[1.5rem] border border-ink/10 bg-paper p-6 sm:p-8">
          <p className="eyebrow !text-[0.54rem]">Publication note</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink/65">
            This reconstruction is part of the reviewed public evidence model.
            It preserves the boundary between recorded relationships,
            cross-record identity assessment, and an open parentage hypothesis.
            Reviewed {item.publication.reviewedOn}.
            <ReferenceLinks ids={[67, 68]} />
          </p>
        </div>
      </section>

      <nav
        aria-label="Parentage case navigation"
        className="px-5 py-12 sm:px-8"
      >
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4">
          <ArrowLink href="/cases/parentage">
            Return to the parentage case
          </ArrowLink>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ArrowLink href="/cases/parentage/three-thomases">
              Meet the three Thomases
            </ArrowLink>
            <ArrowLink href="/cases">All research cases</ArrowLink>
          </div>
        </div>
      </nav>
    </>
  );
}
