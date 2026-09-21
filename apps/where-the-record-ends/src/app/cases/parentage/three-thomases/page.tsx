import { threeThomasesIdentityModel } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';

import { ArrowLink } from '@/components/ArrowLink';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import { absoluteUrl } from '@/lib/site';

const item = threeThomasesIdentityModel;
const canonicalUrl = absoluteUrl('/cases/parentage/three-thomases');

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

const assessmentStyles = {
  'strong-indirect': {
    label: 'Strongly favored',
    badge: 'border-moss bg-moss text-paper',
    card: 'border-moss/65 bg-paper',
  },
  possible: {
    label: 'Possible identity',
    badge: 'border-moss/35 bg-moss/[0.12] text-ink',
    card: 'border-moss/35 bg-paper',
  },
  excluded: {
    label: 'Excluded identity',
    badge: 'border-accent/40 bg-accent text-paper',
    card: 'border-accent/45 bg-paper',
  },
} as const;

export default function ThreeThomasesPage() {
  return (
    <>
      <section className="paper-noise relative overflow-hidden border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-16 top-8 font-serif text-[15rem] leading-none text-ink/[0.025] sm:text-[24rem]"
        >
          III
        </div>
        <div className="relative mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              Parentage case · Identity reconstruction
            </p>
            <h1 className="balanced mt-5 max-w-6xl font-serif text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.05em]">
              {item.title}
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-relaxed text-ink/65">
              {item.summary}
              <ReferenceLinks ids={item.referenceIds} />
            </p>
          </div>
          <aside className="rounded-r-2xl border-l-2 border-accent/40 bg-cream/55 py-2 pl-6 pr-4">
            <p className="eyebrow !text-[0.54rem]">The central distinction</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              A shared name creates a question. Chronology, place, and stated
              relationships determine whether the records can describe the same
              person.
            </p>
          </aside>
        </div>
      </section>

      <section
        className="px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="three-identities"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-4xl">
            <p className="eyebrow">Three record identities</p>
            <h2
              id="three-identities"
              className="balanced mt-3 font-serif text-4xl sm:text-5xl"
            >
              Start with what each record actually says
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/60">
              Each card stays separate until evidence supports a connection. The
              repeated first name is not itself an identity match.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {item.subjects.map((subject, index) => (
              <li
                key={subject.id}
                id={`identity-${subject.id}`}
                className="scroll-mt-24 rounded-[1.75rem] border border-ink/10 bg-cream p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow !text-[0.54rem]">
                    Record identity {index + 1}
                  </p>
                  <span className="font-serif text-3xl text-accent/45">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-3xl leading-tight">
                  {subject.name}
                </h3>
                <dl className="mt-5 grid gap-3 border-y border-ink/10 py-4 text-xs">
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-ink/40">
                      Period
                    </dt>
                    <dd className="mt-1 leading-relaxed text-ink/70">
                      {subject.period}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-ink/40">
                      Place
                    </dt>
                    <dd className="mt-1 leading-relaxed text-ink/70">
                      {subject.place}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm leading-relaxed text-ink/70">
                  {subject.summary}
                  <ReferenceLinks ids={subject.referenceIds} />
                </p>
                <div className="mt-5 rounded-xl border border-ink/10 bg-paper/70 p-4">
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                    Record boundary
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/60">
                    {subject.recordBoundary}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="mt-6 rounded-[1.5rem] border border-accent/25 bg-accent/[0.045] p-6 sm:p-7">
            <p className="eyebrow !text-[0.54rem]">A role, not a fourth man</p>
            <h3 className="mt-3 font-serif text-2xl">
              Thomas senior’s named son Thomas
            </h3>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-ink/70">
              {item.boundary}
              <ReferenceLinks ids={[18, 22, 67, 68, 69]} />
            </p>
          </aside>
        </div>
      </section>

      <section
        className="border-y border-ink/10 bg-ink px-5 py-14 text-paper sm:px-8 md:py-20"
        aria-labelledby="identity-connections"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
            <div>
              <p className="eyebrow !text-accent-soft">Identity comparison</p>
              <h2
                id="identity-connections"
                className="balanced mt-3 font-serif text-4xl sm:text-5xl"
              >
                One identity is strongly favored. Another remains possible.
              </h2>
            </div>
            <ul className="space-y-3 text-xs leading-relaxed text-paper/65">
              <li className="flex items-start gap-3">
                <span className="shrink-0 rounded-full border border-moss bg-moss px-3 py-1 font-semibold uppercase tracking-[0.1em] text-paper">
                  Strongly favored
                </span>
                Multiple independent record groups support the identity, but no
                record states it directly.
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 rounded-full border border-moss/35 bg-moss px-3 py-1 font-semibold uppercase tracking-[0.1em] text-paper">
                  Possible
                </span>
                Compatible with the evidence, but not established by it.
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 rounded-full border border-accent-soft/45 bg-accent px-3 py-1 font-semibold uppercase tracking-[0.1em] text-paper">
                  Excluded
                </span>
                The chronology prevents the records from describing one man.
              </li>
            </ul>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {item.connections.map((connection) => {
              const style = assessmentStyles[connection.assessment];

              return (
                <li
                  key={connection.id}
                  className={`rounded-[1.5rem] border p-6 text-ink ${style.card}`}
                >
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.12em] ${style.badge}`}
                  >
                    {style.label}
                  </span>
                  <p className="mt-5 text-[0.56rem] font-semibold uppercase tracking-[0.13em] text-ink/45">
                    {connection.endpointLabels.join(' ↔ ')}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl">
                    {connection.label}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70">
                    {connection.statement}
                    <ReferenceLinks ids={connection.referenceIds} />
                  </p>
                  <div className="mt-5 border-t border-ink/10 pt-4">
                    <p className="text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-ink/45">
                      Limit
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-ink/60">
                      {connection.limitation}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        className="px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="identity-chronology"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-4xl">
            <p className="eyebrow">Chronology</p>
            <h2
              id="identity-chronology"
              className="balanced mt-3 font-serif text-4xl sm:text-5xl"
            >
              The event date and the recording date are not the same thing
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/60">
              The sequence keeps the 1785 will, the 1786 widow statement, and
              the much later recording events distinct. That distinction is what
              makes the identity exclusion possible.
            </p>
          </div>

          <ol className="relative mt-10 space-y-4 before:absolute before:bottom-8 before:left-[1.17rem] before:top-8 before:w-px before:bg-ink/15 sm:before:left-[6.2rem]">
            {item.timeline.map((event, index) => (
              <li
                key={event.id}
                className="relative grid gap-4 rounded-[1.5rem] border border-ink/10 bg-cream p-5 pl-12 sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[0.88rem] top-7 grid size-3 place-items-center rounded-full border-2 border-paper bg-accent sm:left-[5.88rem]"
                />
                <div>
                  <p className="font-serif text-xl text-accent">{event.date}</p>
                  <p className="mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.13em] text-ink/35">
                    Event {index + 1}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl leading-tight">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {event.detail}
                    <ReferenceLinks ids={event.referenceIds} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[92rem] gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-ink/10 bg-paper p-6 sm:p-8">
            <p className="eyebrow">The two Ann roles</p>
            <h2 className="mt-3 font-serif text-3xl">
              Related names are not an identity conclusion
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              {item.annBoundary}
              <ReferenceLinks ids={[18, 19, 73]} />
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-accent/30 bg-accent/[0.045] p-6 sm:p-8">
            <p className="eyebrow">What this does not prove</p>
            <h2 className="mt-3 font-serif text-3xl">
              The bridge to Benjamin remains open
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/70">
              <li className="border-l-2 border-accent/30 pl-4">
                It does not directly prove that the Kentucky Thomas was Thomas
                senior’s named son, even though the indirect evidence strongly
                favors that identification.
              </li>
              <li className="border-l-2 border-accent/30 pl-4">
                It does not establish that Benjamin was a son of the Kentucky
                Thomas.
              </li>
              <li className="border-l-2 border-accent/30 pl-4">
                It does not merge or separate the two documented Ann roles as a
                single identity conclusion.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[92rem] rounded-[1.5rem] border border-ink/10 bg-paper p-6 sm:p-8">
          <p className="eyebrow !text-[0.54rem]">Publication note</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink/65">
            This identity reconstruction is part of the reviewed public evidence
            model. It separates record identities before weighing identity
            matches and preserves every remaining uncertainty. Reviewed{' '}
            {item.publication.reviewedOn}.
            <ReferenceLinks ids={item.referenceIds} />
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
            <ArrowLink href="/cases/parentage/highland-creek">
              Explore Highland Creek
            </ArrowLink>
            <ArrowLink href="/cases">All research cases</ArrowLink>
          </div>
        </div>
      </nav>
    </>
  );
}
