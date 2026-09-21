import {
  media,
  researchCases,
  stories,
  storyImageNeeds,
  storyMediaIds,
  type StoryId,
} from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLink } from '@/components/ArrowLink';
import { ImageNeeded } from '@/components/ImageNeeded';
import { MediaFigure } from '@/components/MediaFigure';
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
  const story = stories.find((item) => item.id === slug);
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
  const story = stories.find((item) => item.id === slug);
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

      <article className="border-y border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <StoryTimeline story={story} />

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
