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
    'Follow a family story from Joseph’s 1799 riverboat record through Highland Creek, Missouri, and Texas, with unresolved relationships kept in view.',
};

const readingPath = [
  {
    title: 'A deed out of reach',
    detail:
      'Begin with Joseph’s final words aboard a boat near Pittsburgh in 1799.',
    href: '/stories/joseph-boat',
    kind: 'Story',
  },
  {
    title: 'The Highland Creek claim',
    detail:
      'Read the deeds that name Benjamin among Joseph’s heirs without naming his parents.',
    href: '/cases/parentage/highland-creek',
    kind: 'Research case',
  },
  {
    title: 'The line west',
    detail:
      'Follow the reviewed line from Kentucky through Missouri and Texas.',
    href: '/stories/migration',
    kind: 'Story',
  },
  {
    title: 'The family between the lines',
    detail:
      'Meet the Missouri households whose land and work bring a wider family into view.',
    href: '/stories/between-lines',
    kind: 'Story',
  },
  {
    title: 'The Texas record cluster',
    detail: 'Look closely at the records behind the later Texas connections.',
    href: '/stories/texas-reconnection',
    kind: 'Story',
  },
] as const;

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="The family chronicle"
        title="A family in the records."
        introduction="How can I tell the story of the family I came from when some relationships remain unresolved?"
      />
      <section
        className="border-b border-ink/10 px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="story-introduction"
      >
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            <h2
              id="story-introduction"
              className="font-serif text-3xl leading-tight text-ink sm:text-4xl"
            >
              The family I can see
            </h2>
            <p>
              I began looking for the biological family I was born into. The
              records have carried that search from Benjamin and Hannah Meason
              in Kentucky, through Missouri and Texas, and eventually to me.
              They have also led me into a much wider family: people named
              together in wills, claiming the same land, sharing households,
              working nearby, and carrying names across generations.
            </p>
            <p>
              Some connections are stated plainly in the records. Others become
              visible only when several records are read together. And some—most
              notably the identity of Benjamin’s parents—remain open. These
              chapters follow the family the evidence lets me see, including the
              places where it stops. This history adds to the story of the Cohen
              family that raised me; it does not replace it.
            </p>
          </div>
          <div className="self-start rounded-[2rem] border border-ink/10 bg-cream p-7 shadow-paper sm:p-9">
            <p className="eyebrow">Begin here</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight">
              Joseph’s story
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              A dying man, a deed out of reach, and a family claim that would
              surface years later.
            </p>
            <Link
              href="/stories/joseph-boat"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Start with A deed out of reach <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section
        className="border-b border-ink/10 bg-[#ece3d7]/55 px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="reading-path"
      >
        <div className="mx-auto max-w-[92rem]">
          <p className="eyebrow">A way through the records</p>
          <h2
            id="reading-path"
            className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl"
          >
            Follow the family story
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/65 sm:text-base">
            Joseph and the Highland Creek claim reveal a wider kinship network.
            The westward chapters follow the reviewed line, with George’s
            placement as Benjamin’s son a high-confidence indirect conclusion.
            The Missouri and Texas records show how the family appears beyond a
            single tree. Joseph’s place in Benjamin’s direct ancestry remains
            unproved.
          </p>
          <ol className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {readingPath.map((step, index) => (
              <li key={step.href} className="flex">
                <Link
                  href={step.href}
                  className="group flex w-full flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition-colors hover:border-accent/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {String(index + 1).padStart(2, '0')} · {step.kind}
                  </span>
                  <span className="mt-5 font-serif text-2xl leading-tight text-ink">
                    {step.title}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-ink/65">
                    {step.detail}
                  </span>
                  <span
                    className="mt-auto pt-6 text-sm font-medium text-accent"
                    aria-hidden="true"
                  >
                    Read{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem] space-y-8">
          <div>
            <p className="eyebrow">The complete collection</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Browse every chapter
            </h2>
          </div>
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
                  ) : (
                    <div
                      className="flex h-full min-h-72 flex-col justify-between p-7 sm:p-10"
                      aria-hidden="true"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
                        From the record
                      </span>
                      <span className="max-w-sm font-serif text-4xl leading-tight text-ink/70 sm:text-5xl">
                        {story.title}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-ink/45">
                        {story.period}
                      </span>
                    </div>
                  )}
                  {visual ? (
                    <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.58rem] uppercase tracking-[0.15em] text-accent backdrop-blur">
                      {visual.role === 'evidence'
                        ? 'Evidence image'
                        : 'Place context'}
                    </span>
                  ) : null}
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
