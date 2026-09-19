import Link from 'next/link';

import { ReferenceLinks } from './ReferenceLinks';

const stops = [
  {
    number: '01',
    place: 'Kentucky',
    period: '1800–1820',
    detail:
      'Tax returns, a marriage bond, and a census place Benjamin and his household first in Nelson County and later in Shelby County.',
    referenceIds: [2, 4, 10],
  },
  {
    number: '02',
    place: 'Missouri',
    period: '1829–1880',
    detail:
      'Patents, households, land transactions, and working lives carry the documented family network through Ralls and Monroe Counties.',
    referenceIds: [11, 13, 28, 64],
  },
  {
    number: '03',
    place: 'Texas',
    period: '1880 onward',
    detail:
      'George appears in Missouri in 1870 and in Dallas County in 1880. Later Dallas records carry the direct line forward, while the route, date, and reason for the move remain unrecorded.',
    referenceIds: [33, 56, 57, 58],
  },
] as const;

export function MigrationArc() {
  return (
    <section
      className="overflow-hidden rounded-[2rem] border border-ink/10 bg-ink text-paper shadow-paper"
      aria-labelledby="migration-arc-title"
    >
      <header className="grid gap-5 border-b border-paper/10 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
        <div>
          <p className="eyebrow !text-accent-soft">The geographic thread</p>
          <h2
            id="migration-arc-title"
            className="balanced mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl"
          >
            Kentucky → Missouri → Texas
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-paper/60">
          The records document the family at these stops. They do not preserve
          every departure, route, reason, or traveling party between them.
        </p>
      </header>

      <ol className="grid lg:grid-cols-3">
        {stops.map((stop, index) => (
          <li
            key={stop.place}
            className={`relative p-7 sm:p-9 ${index > 0 ? 'border-t border-paper/10 lg:border-l lg:border-t-0' : ''}`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-serif text-5xl text-paper/15">
                {stop.number}
              </span>
              <span className="rounded-full border border-paper/15 px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-paper/55">
                {stop.period}
              </span>
            </div>
            <h3 className="mt-7 font-serif text-3xl">{stop.place}</h3>
            <p className="mt-4 text-sm leading-relaxed text-paper/65">
              {stop.detail}
              <ReferenceLinks ids={stop.referenceIds} />
            </p>
          </li>
        ))}
      </ol>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 px-7 py-6 sm:px-9">
        <p className="text-xs uppercase tracking-[0.14em] text-paper/45">
          Documented locations · qualified movement · open gaps
        </p>
        <div className="flex flex-wrap gap-5 text-sm">
          <Link
            href="/stories/migration"
            className="text-accent-soft underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
          >
            Follow the full migration →
          </Link>
          <Link
            href="/stories/texas-reconnection"
            className="text-accent-soft underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
          >
            Examine the Texas evidence →
          </Link>
        </div>
      </footer>
    </section>
  );
}
