import {
  media,
  researchCases,
  stories,
  storyImageNeeds,
  storyMediaIds,
  type Story,
  type StoryId,
} from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLink } from '@/components/ArrowLink';
import { ImageNeeded } from '@/components/ImageNeeded';
import { MediaFigure } from '@/components/MediaFigure';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import { StoryTimeline } from '@/components/StoryTimeline';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return stories.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story: Story | undefined = stories.find((item) => item.id === slug);
  if (!story) return {};
  const url = absoluteUrl(`/stories/${story.id}`);
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: url },
    openGraph: {
      title: story.title,
      description: story.summary,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.summary,
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story: Story | undefined = stories.find((item) => item.id === slug);
  if (!story) notFound();

  const storyId = story.id as StoryId;
  const visuals = storyMediaIds[storyId].map((id) => media[id]);
  const imageNeed = storyImageNeeds[storyId];
  const storyIndex = stories.findIndex((item) => item.id === story.id);
  const previousStory = storyIndex > 0 ? stories[storyIndex - 1] : undefined;
  const nextStory =
    storyIndex < stories.length - 1 ? stories[storyIndex + 1] : undefined;

  return (
    <>
      <section className="paper-noise border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div>
              <p className="eyebrow">
                Family chronicle · Chapter {story.number}
              </p>
              <h1 className="balanced mt-5 max-w-5xl font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.045em]">
                {story.title}
              </h1>
            </div>
            <div className="border-l border-accent/35 pl-6">
              <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                {story.period}
              </p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-ink/65">
                {story.summary}
              </p>
              <ol
                className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] uppercase tracking-[0.1em] text-ink/45"
                aria-label="Chapter route"
              >
                {story.routePlaces.map((place, index) => (
                  <li key={place} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span className="text-accent/60" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                    {place}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {visuals.length > 0 ? (
        <section
          className="px-5 py-12 sm:px-8 md:py-20"
          aria-label="Chapter visual archive"
        >
          <div className="mx-auto grid max-w-[92rem] gap-6 md:grid-cols-2">
            {visuals.map((visual) => (
              <MediaFigure key={visual.id} item={visual} />
            ))}
            {imageNeed ? <ImageNeeded need={imageNeed} /> : null}
          </div>
        </section>
      ) : null}

      <article className="border-y border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          {story.opening ? (
            <div className="mb-16 max-w-3xl space-y-6 border-l-2 border-accent/40 pl-6 sm:pl-10">
              {story.opening.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-serif text-xl leading-relaxed text-ink/80 sm:text-2xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <StoryTimeline story={story} />

          {story.closing ? (
            <section
              className="mt-16 max-w-3xl space-y-5"
              aria-label="Story conclusion"
            >
              {story.closing.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-ink/75">
                  {paragraph}
                </p>
              ))}
            </section>
          ) : null}

          {story.recordReader ? (
            <section
              className="mt-16 border-t border-ink/10 pt-10"
              aria-labelledby="record-reader-title"
            >
              <p className="eyebrow">Read the record</p>
              <h2
                id="record-reader-title"
                className="mt-3 font-serif text-3xl leading-tight sm:text-4xl"
              >
                What this record can tell us
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/55">
                A reviewed summary and interpretation, not a full transcription.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-accent/20 bg-paper p-6">
                  <h3 className="eyebrow !text-[0.58rem]">
                    What the record says
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink/70">
                    {story.recordReader.says}
                    <ReferenceLinks ids={story.recordReader.referenceIds} />
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-paper p-6">
                  <h3 className="eyebrow !text-[0.58rem]">What I infer</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/70">
                    {story.recordReader.inference}
                  </p>
                </div>
                <div className="rounded-2xl border border-dashed border-ink/20 bg-paper/50 p-6">
                  <h3 className="eyebrow !text-[0.58rem]">
                    What remains unknown
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink/70">
                    {story.recordReader.unknown}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {story.id === 'joseph-boat' ? (
            <nav
              aria-label="Continue Joseph's story"
              className="mt-12 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-ink/10 bg-paper p-6"
            >
              <ArrowLink href="/cases/parentage/highland-creek">
                Follow the Highland Creek deeds
              </ArrowLink>
              <ArrowLink href="/cases/parentage/three-thomases">
                Meet the three Thomases
              </ArrowLink>
            </nav>
          ) : null}

          <footer className="mt-14 grid gap-6 border-t border-ink/10 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <p className="max-w-2xl text-sm leading-relaxed text-ink/60">
              This chapter stops where the records stop. It names documented
              movement, households, and relationships without supplying motives
              the evidence never recorded.
            </p>
            <div className="space-y-2 md:text-right">
              {story.relatedCaseIds.map((caseId) => {
                const related = researchCases.find(
                  (item) => item.id === caseId
                );
                return related ? (
                  <Link
                    key={caseId}
                    href={`/cases/${caseId}`}
                    className="block text-sm text-accent underline underline-offset-4"
                  >
                    Open “{related.shortTitle}” →
                  </Link>
                ) : null;
              })}
            </div>
          </footer>
        </div>
      </article>

      <nav aria-label="Story collection" className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {previousStory ? (
              <Link
                href={`/stories/${previousStory.id}`}
                className="bg-paper p-6 transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
              >
                <span className="text-[0.58rem] uppercase tracking-[0.18em] text-ink/40">
                  ← Previous chapter
                </span>
                <span className="mt-2 block font-serif text-xl text-accent">
                  {previousStory.title}
                </span>
              </Link>
            ) : (
              <div className="hidden bg-paper sm:block" aria-hidden="true" />
            )}
            {nextStory ? (
              <Link
                href={`/stories/${nextStory.id}`}
                className="bg-paper p-6 text-right transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
              >
                <span className="text-[0.58rem] uppercase tracking-[0.18em] text-ink/40">
                  Next chapter →
                </span>
                <span className="mt-2 block font-serif text-xl text-accent">
                  {nextStory.title}
                </span>
              </Link>
            ) : (
              <div className="hidden bg-paper sm:block" aria-hidden="true" />
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <ArrowLink href="/stories">All family stories</ArrowLink>
            <ArrowLink href="/family">Explore the family atlas</ArrowLink>
          </div>
        </div>
      </nav>
    </>
  );
}
