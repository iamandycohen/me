import {
  media,
  stories,
  storyMediaIds,
  type PublicMedia,
} from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Family chronicle',
  description:
    'Evidence-backed family stories that keep record, interpretation, and uncertainty visibly separate.',
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="The family chronicle"
        title="A narrative the records can carry."
        introduction="These chapters connect people, places, and time without inventing motives or smoothing over contradiction. The record speaks first; interpretation follows."
      />
      <section className="px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem] space-y-8">
          {stories.map((story, index) => {
            const mediaId = storyMediaIds[story.id][0];
            const visual: PublicMedia | undefined = mediaId
              ? media[mediaId]
              : undefined;
            return (
              <article
                key={story.id}
                className="group grid overflow-hidden rounded-[2rem] border border-ink/10 bg-cream shadow-paper transition-shadow hover:shadow-xl lg:grid-cols-[minmax(20rem,0.75fr)_minmax(0,1.25fr)]"
              >
                <div
                  className={`relative min-h-72 bg-[#e8ded1] ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  {visual ? (
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={
                        visual.fit === 'contain'
                          ? 'object-contain p-4'
                          : 'object-cover'
                      }
                      style={{ objectPosition: visual.objectPosition }}
                    />
                  ) : null}
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.58rem] uppercase tracking-[0.15em] text-accent backdrop-blur">
                    {visual?.role === 'evidence'
                      ? 'Evidence image'
                      : 'Place context'}
                  </span>
                </div>
                <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">Chapter {story.number}</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-ink/45">
                      {story.period}
                    </p>
                  </div>
                  <h2 className="balanced mt-6 font-serif text-4xl leading-tight sm:text-5xl">
                    {story.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/65">
                    {story.summary}
                  </p>
                  <div className="mt-8 border-y border-ink/10 py-5">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Documented route
                    </p>
                    <ol
                      className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2"
                      aria-label="Places in this chapter"
                    >
                      {story.routePlaces.map((place, placeIndex) => (
                        <li
                          key={place}
                          className="flex items-center gap-2 text-xs text-ink/60"
                        >
                          {placeIndex > 0 ? (
                            <span className="text-accent/55" aria-hidden="true">
                              →
                            </span>
                          ) : null}
                          <span>{place}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <Link
                    href={`/stories/${story.id}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-[gap] group-hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Read the chapter <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
