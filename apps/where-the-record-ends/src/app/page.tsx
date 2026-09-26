import { media, proofProjects } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowLink } from '@/components/ArrowLink';
import { MediaFigure } from '@/components/MediaFigure';
import { ProofStatusBadge } from '@/components/ProofStatusBadge';
import { ReferenceLinks } from '@/components/ReferenceLinks';

export const metadata: Metadata = {
  title: 'An active family history',
};

const paths = [
  {
    number: '01',
    title: 'The family tree & atlas',
    description:
      'Trace the reviewed direct line while seeing which connections are documented and which rest on an evidence assessment.',
    href: '/family',
    label: 'Explore the family',
  },
  {
    number: '02',
    title: 'Research cases',
    description:
      'Enter the questions that remain alive, the explanations being tested, and the records that could change the conclusion.',
    href: '/cases',
    label: 'Open the case files',
  },
  {
    number: '03',
    title: 'The chronicle',
    description:
      'Read a family narrative built in layers: first what a record states, then the interpretation it can reasonably support.',
    href: '/stories',
    label: 'Read the stories',
  },
] as const;

const migrationStops = [
  {
    number: '01',
    place: 'Kentucky',
    period: '1800–1820',
    detail:
      'Nelson County tax lists and a marriage bond begin the reviewed trail. By 1820, a Shelby County household fits Benjamin, Hannah, and their growing family.',
    mediaId: 'kentucky-map-1818' as const,
    imagePosition: '55% 55%',
    visualLabel: 'Place context · not proof',
  },
  {
    number: '02',
    place: 'Missouri',
    period: '1829–1880',
    detail:
      'Land patents place Benjamin in Ralls and Monroe Counties. Later households, deeds, and working lives reveal the wider family network.',
    mediaId: 'ralls-map-1878' as const,
    imagePosition: '50% 42%',
    visualLabel: 'Place context · not proof',
  },
  {
    number: '03',
    place: 'Texas',
    period: '1880–1973',
    detail:
      'Texas records document three later generational handoffs through 1973. Reviewed private records carry the documented direct line to the present without publishing those records or asserting a later location.',
    mediaId: 'george-marker' as const,
    imagePosition: '50% 50%',
    visualLabel: 'Evidence image · chronology only',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="paper-noise relative overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 md:py-24 lg:py-28">
        <div aria-hidden="true" className="hero-ghost-word">
          RECORD
        </div>
        <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)] lg:items-center">
          <div className="relative z-10">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />A family history still
              in motion
            </p>
            <h1 className="balanced mt-6 max-w-5xl font-serif text-[clamp(3.8rem,9vw,8.8rem)] leading-[0.82] tracking-[-0.055em]">
              Where the record <span className="italic text-ink/45">ends,</span>
              <br />
              the search begins.
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
              A living account of one family’s path from Kentucky through
              Missouri and into Texas—clear about what the records establish,
              what the evidence suggests, and which questions still refuse to
              close.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/family"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Begin with the family atlas
              </Link>
              <ArrowLink href="/cases/parentage/highland-creek">
                Explore Highland Creek
              </ArrowLink>
              <ArrowLink href="/stories">Follow the family story</ArrowLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl pb-12 pt-5 lg:pb-16">
            <div className="relative ml-auto aspect-[4/5] w-[78%] rotate-[1.5deg] overflow-hidden rounded-[2rem] border-8 border-cream bg-cream shadow-paper">
              <Image
                src={media['franklin-home'].src}
                alt={media['franklin-home'].alt}
                fill
                priority
                sizes="(max-width: 1024px) 75vw, 34vw"
                className="object-cover grayscale-[0.22]"
                style={{ objectPosition: '50% 35%' }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent p-6 pt-24 text-paper">
                <p className="text-[0.58rem] uppercase tracking-[0.18em] text-accent-soft">
                  Family photograph · attributed to Richardson, Texas
                </p>
                <p className="mt-2 font-serif text-2xl">Franklin at home</p>
                <p className="mt-1 text-xs leading-relaxed text-paper/65">
                  Exact date and precise location remain undocumented.
                  <ReferenceLinks ids={[42]} />
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] -rotate-2 rounded-2xl border border-ink/10 bg-cream p-3 shadow-paper">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e9e0d4]">
                <Image
                  src={media['kentucky-map-1818'].src}
                  alt=""
                  fill
                  sizes="18rem"
                  className="object-cover"
                  style={{ objectPosition: '55% 55%' }}
                />
              </div>
              <p className="mt-3 text-[0.58rem] uppercase tracking-[0.16em] text-accent">
                Context, not proof · Kentucky, 1818
              </p>
            </div>
            <p className="absolute right-[2%] top-[3%] -rotate-3 rounded-full border border-ink/15 bg-paper/90 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink/55 shadow-sm backdrop-blur">
              Kentucky → Texas
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-b border-ink/10 bg-[#ece3d7]/55 px-5 py-12 sm:px-8 md:py-16"
        aria-labelledby="featured-highland-creek"
      >
        <div className="mx-auto grid max-w-[92rem] gap-7 rounded-[2rem] border border-ink/10 bg-cream p-7 shadow-paper sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.45fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="eyebrow">Featured investigation</p>
            <h2
              id="featured-highland-creek"
              className="balanced mt-4 font-serif text-4xl leading-tight sm:text-6xl"
            >
              The thousand acres on Highland Creek
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/65">
              Follow one Kentucky tract through its title chain, meet every heir
              named in the deeds, and see where the records support a family
              connection—and where the proposed tree still remains a hypothesis.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              href="/cases/parentage/highland-creek"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Open the Highland Creek reconstruction
              <span aria-hidden="true">→</span>
            </Link>
            <ArrowLink href="/cases/parentage">
              Read the larger parentage case
            </ArrowLink>
          </div>
        </div>
      </section>

      <section
        className="border-b border-ink/10 bg-paper px-5 py-16 sm:px-8 md:py-24"
        aria-labelledby="proof-paths-heading"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="eyebrow">Proof paths</p>
              <h2
                id="proof-paths-heading"
                className="balanced mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl"
              >
                Following the line, one link at a time.
              </h2>
            </div>
            <div className="max-w-2xl lg:pb-1">
              <p className="text-base leading-relaxed text-ink/65">
                I am tracing two lines from myself toward earlier ancestors.
                Each parent–child connection has its own evidence and status; an
                open link keeps the larger lineage open.
              </p>
              <div className="mt-6">
                <ArrowLink href="/proofs">
                  How I assess these proof paths
                </ArrowLink>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {proofProjects.map((project) => (
              <article
                key={project.id}
                className="group flex h-full flex-col rounded-[2rem] border border-ink/10 bg-cream p-7 shadow-paper transition-colors hover:border-accent/40 sm:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow">
                    {project.lineage.length} links in the proposed path
                  </p>
                  <ProofStatusBadge status={project.status} />
                </div>
                <h3 className="balanced mt-8 font-serif text-4xl leading-tight">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  From me toward{' '}
                  {project.lineage[project.lineage.length - 1].to}.
                </p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-ink/65">
                  {project.summary}
                </p>
                <Link
                  href={`/proofs/${project.id}`}
                  className="mt-8 inline-flex items-center justify-between border-t border-ink/10 pt-6 text-sm font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Follow the {project.id === 'meason' ? 'Meason' : 'Sledge'}{' '}
                  path <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="migration-field overflow-hidden bg-ink px-5 py-16 text-paper sm:px-8 md:py-24 lg:py-28"
        aria-labelledby="migration-heading"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(28rem,1.25fr)] lg:items-end">
            <div>
              <p className="eyebrow !text-accent-soft">The geographic spine</p>
              <h2
                id="migration-heading"
                className="balanced mt-5 font-serif text-[clamp(3rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.045em]"
              >
                Kentucky.
                <br />
                Missouri.
                <br />
                <span className="italic text-accent-soft">Texas.</span>
              </h2>
            </div>
            <div className="max-w-2xl lg:pb-2">
              <p className="font-serif text-xl leading-relaxed text-paper/80 sm:text-2xl">
                Across seven generations, the working direct line begins in
                Kentucky, takes shape in Missouri, reaches Texas, and continues
                to the present through changing kinds of evidence.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-paper/55">
                The links do not all carry the same certainty, and the precise
                roads, dates, or reasons for every move are not known. After
                Texas, no location is asserted beyond what the public evidence
                can support.
              </p>
            </div>
          </div>

          <ol className="migration-route mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
            {migrationStops.map((stop) => {
              const item = media[stop.mediaId];

              return (
                <li key={stop.place} className="migration-stop group">
                  <div className="migration-node" aria-hidden="true">
                    {stop.number}
                  </div>
                  <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-paper/15 bg-paper/[0.06]">
                    <div className="relative aspect-[16/9] overflow-hidden bg-paper/10">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className={`${item.fit === 'contain' ? 'object-contain p-4' : 'object-cover'} opacity-80 grayscale-[0.12] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-95`}
                        style={{ objectPosition: stop.imagePosition }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                      <p className="absolute bottom-4 left-5 rounded-full bg-ink/75 px-3 py-1 text-[0.57rem] font-semibold uppercase tracking-[0.16em] text-accent-soft backdrop-blur">
                        {stop.visualLabel}
                      </p>
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-serif text-4xl">{stop.place}</h3>
                        <p className="text-xs font-semibold tracking-[0.12em] text-accent-soft">
                          {stop.period}
                        </p>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-paper/65">
                        {stop.detail}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>

          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-paper/10 pt-7">
            <ArrowLink href="/stories/migration" inverse>
              Read all seven generations
            </ArrowLink>
            <ArrowLink href="/stories/texas-reconnection" inverse>
              Examine the Texas evidence cluster
            </ArrowLink>
          </div>
        </div>
      </section>

      <section
        className="border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24"
        aria-labelledby="neighborhoods-heading"
      >
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(28rem,1.15fr)] lg:items-center">
          <div className="max-w-xl">
            <p className="eyebrow">Evidence neighborhoods</p>
            <h2
              id="neighborhoods-heading"
              className="balanced mt-5 font-serif text-4xl leading-tight sm:text-6xl"
            >
              Sometimes the pattern lives between the names.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/65">
              Explore people alongside the households, land, work, and records
              that surround them in the same place and time. Nearness can reveal
              a research pattern; it does not, by itself, prove a relationship.
            </p>
            <div className="mt-7">
              <ArrowLink href="/family#evidence-neighborhoods">
                Explore the evidence neighborhoods
              </ArrowLink>
            </div>
          </div>

          <div className="evidence-neighborhood" aria-hidden="true">
            <div className="evidence-orbit evidence-orbit-one" />
            <div className="evidence-orbit evidence-orbit-two" />
            <div className="evidence-chip evidence-chip-person">People</div>
            <div className="evidence-chip evidence-chip-household">
              Households
            </div>
            <div className="evidence-chip evidence-chip-land">Land</div>
            <div className="evidence-chip evidence-chip-work">Work</div>
            <div className="evidence-chip evidence-chip-records">Records</div>
            <div className="evidence-center">
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-accent">
                Same place
              </span>
              <strong className="mt-1 font-serif text-2xl font-normal">
                Same time
              </strong>
              <span className="mt-2 text-[0.62rem] leading-relaxed text-ink/50">
                A clue to inspect
                <br />
                not kinship proved
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-5 py-16 sm:px-8 md:py-24"
        aria-labelledby="three-ways"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 border-b border-ink/10 pb-8 md:grid-cols-[1fr_2fr] md:items-end">
            <p className="eyebrow">One body of evidence</p>
            <h2
              id="three-ways"
              className="balanced font-serif text-4xl leading-tight sm:text-6xl"
            >
              Choose how you enter the search.
            </h2>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 md:grid-cols-3">
            {paths.map((path) => (
              <article
                key={path.href}
                className="group flex min-h-[25rem] flex-col bg-cream p-7 transition-colors hover:bg-white sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <p className="font-serif text-5xl text-ink/15">
                    {path.number}
                  </p>
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-full border border-ink/10 text-ink/25 transition-colors group-hover:border-accent/30 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>
                <h3 className="mt-auto font-serif text-3xl">{path.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  {path.description}
                </p>
                <div className="mt-7">
                  <ArrowLink href={path.href}>{path.label}</ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#ece3d7]/55 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="max-w-xl">
            <p className="eyebrow">A visible boundary</p>
            <h2 className="balanced mt-5 font-serif text-4xl leading-tight sm:text-6xl">
              Pictures can deepen a story without pretending to prove it.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/65">
              Every visual is labeled as evidence or context. A period map can
              orient the reader; it cannot locate a family home. A document can
              preserve a signature or statement without proving a relationship
              the record never names.
            </p>
            <div className="mt-7">
              <ArrowLink href="/sources">
                See the source and image catalog
              </ArrowLink>
            </div>
          </div>
          <MediaFigure item={media['benjamin-bond']} compact />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[92rem] gap-8 rounded-[2rem] border border-ink/10 bg-cream p-7 shadow-paper sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="eyebrow">The work stays open</p>
            <h2 className="balanced mt-4 max-w-4xl font-serif text-3xl leading-tight sm:text-5xl">
              A conclusion can be strong and still leave room for the next
              record.
            </h2>
          </div>
          <Link
            href="/cases"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:bg-accent hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Explore the research cases <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
