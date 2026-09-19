import {
  caseImageNeeds,
  caseMediaIds,
  media,
  people,
  researchCases,
  stories,
  type CaseId,
} from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLink } from '@/components/ArrowLink';
import { CaseEvidenceExplorer } from '@/components/CaseEvidenceExplorer';
import { ImageNeeded } from '@/components/ImageNeeded';
import { MediaFigure } from '@/components/MediaFigure';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return researchCases.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = researchCases.find((entry) => entry.id === slug);
  if (!item) return {};
  const url = absoluteUrl(`/cases/${item.id}`);
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: item.summary,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.summary,
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = researchCases.find((entry) => entry.id === slug);
  if (!item) notFound();

  const caseId = item.id as CaseId;
  const visuals = caseMediaIds[caseId].map((id) => media[id]);
  const imageNeed = caseImageNeeds[caseId as keyof typeof caseImageNeeds];
  const relatedPeople = item.relatedPersonIds
    .map((id) => people.find((person) => person.id === id))
    .filter((person) => person !== undefined);

  return (
    <>
      <section className="paper-noise border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="eyebrow">Research case {item.number}</p>
            <h1 className="balanced mt-5 max-w-5xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.04em]">
              {item.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink/65">
              {item.summary}
              <ReferenceLinks ids={item.referenceIds} />
            </p>
          </div>
          <aside className="rounded-2xl border border-accent/25 bg-accent/[0.045] p-6">
            <p className="eyebrow !text-[0.56rem]">Current assessment</p>
            <p className="mt-3 font-serif text-2xl">{item.assessment}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.13em] text-ink/55">
              Reviewed {item.publication.reviewedOn}
            </p>
          </aside>
        </div>
      </section>

      <section
        className="px-5 py-12 sm:px-8 md:py-20"
        aria-labelledby="visual-archive"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Evidence and context</p>
              <h2 id="visual-archive" className="mt-2 font-serif text-4xl">
                Visual archive
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/55">
              Every image states whether it is part of the evidence or only
              supplies period and place context.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {visuals.map((visual) => (
              <MediaFigure key={visual.id} item={visual} />
            ))}
            {imageNeed ? <ImageNeeded need={imageNeed} /> : null}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[92rem] gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <CaseEvidenceExplorer sections={item.sections} />

          <aside className="h-fit rounded-[1.5rem] bg-ink p-6 text-paper xl:sticky xl:top-6">
            <p className="eyebrow !text-accent-soft">Case file</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-paper/45">
                  Known
                </dt>
                <dd className="mt-2 leading-relaxed text-paper/70">
                  {item.known}
                </dd>
              </div>
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-paper/45">
                  Not established
                </dt>
                <dd className="mt-2 leading-relaxed text-paper/70">
                  {item.unknown}
                </dd>
              </div>
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-paper/45">
                  People in the file
                </dt>
                <dd className="mt-2 leading-relaxed text-paper/70">
                  {relatedPeople.map((person) => person.name).join(' · ')}
                </dd>
              </div>
            </dl>
            <div className="mt-7 space-y-3 border-t border-paper/10 pt-6">
              {item.relatedStoryIds.map((id) => {
                const story = stories.find((entry) => entry.id === id);
                return story ? (
                  <Link
                    key={id}
                    href={`/stories/${id}`}
                    className="flex items-center justify-between gap-3 text-sm text-accent-soft underline underline-offset-4"
                  >
                    Read “{story.shortTitle}” <span aria-hidden="true">→</span>
                  </Link>
                ) : null;
              })}
            </div>
          </aside>
        </div>
      </section>

      <nav aria-label="Case collection" className="px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4">
          <ArrowLink href="/cases">All open cases</ArrowLink>
          <ArrowLink href="/family">Return to the family atlas</ArrowLink>
        </div>
      </nav>
    </>
  );
}
