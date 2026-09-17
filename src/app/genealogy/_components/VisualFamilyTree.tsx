import Image from 'next/image';
import Link from 'next/link';

interface Person {
  name: string;
  detail: string;
  status: string;
  image?: {
    src: string;
    alt: string;
  };
}

interface LineageGeneration {
  id: string;
  navLabel: string;
  label: string;
  direct: Person;
  partner?: Person;
  connectionToNext?: 'documented' | 'review';
}

const lineageGenerations: LineageGeneration[] = [
  {
    id: 'benjamin-meason',
    navLabel: 'Benjamin',
    label: 'Generation 7 · claimed fourth great-grandfather',
    direct: {
      name: 'Benjamin Meason',
      detail: 'Born about 1776 · living in Monroe County in 1850',
      status: 'Life documented · relationship unproved',
    },
    partner: {
      name: 'Hannah Doom',
      detail: 'Married Benjamin in Kentucky in 1801',
      status: 'Spouse · claimed direct ancestor',
    },
    connectionToNext: 'review',
  },
  {
    id: 'george-m-meason',
    navLabel: 'George',
    label: 'Generation 6 · third great-grandfather',
    direct: {
      name: 'George M. Meason',
      detail: 'Censuses and family note: about 1810 · marker: 1818 · died 1887',
      status: 'Meason line · parentage under review',
    },
    partner: {
      name: 'Martha Reed',
      detail: 'Married George in Clark County in 1840',
      status: 'Spouse · direct ancestor',
    },
  },
  {
    id: 'franklin-meason',
    navLabel: 'Franklin',
    label: 'Generation 5 · second great-grandfather',
    direct: {
      name: 'Franklin Meason',
      detail: '1850–1933',
      status: 'Meason line',
    },
    partner: {
      name: 'Nancy Ann Huffhines',
      detail: '1852–1930',
      status: 'Spouse · direct ancestor',
    },
  },
  {
    id: 'james-lawrence-meason-1892',
    navLabel: 'James · 1892',
    label: 'Generation 4 · great-grandfather',
    direct: {
      name: 'James Lawrence Meason',
      detail: '1892–1949',
      status: 'Meason line',
    },
    partner: {
      name: 'Mary Estelle Sledge',
      detail: '1896–1952',
      status: 'Spouse · direct ancestor',
    },
  },
  {
    id: 'james-lawrence-meason-1934',
    navLabel: 'James · 1934',
    label: 'Generation 3 · grandfather',
    direct: {
      name: 'James Lawrence Meason',
      detail: '1934–1973',
      status: 'Meason line',
    },
    partner: {
      name: 'Julie Ann Lipke',
      detail: 'Family lineage',
      status: 'Spouse · direct ancestor',
    },
  },
  {
    id: 'cynthia-june-meason',
    navLabel: 'Cynthia',
    label: 'Generation 2 · mother',
    direct: {
      name: 'Cynthia June Meason',
      detail: '1958–1991',
      status: 'Meason line',
    },
  },
  {
    id: 'shannon-jeremiah-meason',
    navLabel: 'Shannon',
    label: 'Generation 1 · present',
    direct: {
      name: 'Shannon Jeremiah Meason',
      detail:
        'Birth name · grew up as Andy Cohen · this tree follows my biological Meason ancestry',
      status: 'Me · birth identity',
    },
  },
];

function getInitials(name: string) {
  if (name.startsWith('Unknown')) return '?';

  const parts = name.split(' ');
  return `${parts[0][0]}${parts.at(-1)?.[0] ?? ''}`;
}

function Portrait({
  person,
  variant,
}: {
  person: Person;
  variant: 'primary' | 'secondary' | 'unknown';
}) {
  const isCompact = variant === 'secondary';
  const isUnknown = variant === 'unknown';

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border ${
        isCompact ? 'h-12 w-12' : 'h-14 w-14 sm:h-16 sm:w-16'
      } ${
        isUnknown
          ? 'border-dashed border-ink/30 bg-transparent'
          : 'border-accent/30 bg-accent/[0.07]'
      }`}
      title={person.image ? undefined : `Photo pending for ${person.name}`}
    >
      {person.image ? (
        <Image
          src={person.image.src}
          alt={person.image.alt}
          fill
          sizes={isCompact ? '48px' : '64px'}
          className="object-cover grayscale"
        />
      ) : (
        <span
          className={`absolute inset-0 flex items-center justify-center font-serif text-ink/45 ${
            isCompact ? 'text-base' : 'text-lg sm:text-xl'
          }`}
        >
          {getInitials(person.name)}
        </span>
      )}
      {!person.image ? <span className="sr-only">Photo pending</span> : null}
    </div>
  );
}

function PersonCard({
  person,
  variant = 'primary',
}: {
  person: Person;
  variant?: 'primary' | 'secondary' | 'unknown';
}) {
  const isSecondary = variant === 'secondary';
  const isUnknown = variant === 'unknown';

  return (
    <article
      className={`relative rounded-2xl border shadow-[0_12px_40px_rgba(26,26,26,0.035)] ${
        isSecondary ? 'bg-paper/60 p-4' : 'p-4 sm:p-6'
      } ${
        isUnknown
          ? 'border-dashed border-ink/30 bg-paper/55'
          : isSecondary
            ? 'border-ink/10'
            : 'border-accent/25 bg-paper ring-1 ring-accent/[0.06]'
      }`}
    >
      <div
        className={`flex items-center ${isSecondary ? 'gap-3' : 'gap-4 sm:gap-5'}`}
      >
        <Portrait person={person} variant={variant} />
        <div className="min-w-0">
          <p
            className={`font-medium uppercase text-accent ${
              isSecondary
                ? 'mb-1 text-[0.58rem] tracking-[0.14em]'
                : 'mb-2 text-[0.62rem] tracking-[0.16em] sm:text-xs'
            }`}
          >
            {person.status}
          </p>
          <h3
            className={
              isSecondary
                ? 'text-base leading-tight sm:text-lg'
                : 'text-lg leading-tight sm:text-2xl'
            }
          >
            {person.name}
          </h3>
          <p
            className={`leading-relaxed text-ink/55 ${
              isSecondary ? 'mt-1 text-xs' : 'mt-2 text-xs sm:text-sm'
            }`}
          >
            {person.detail}
          </p>
        </div>
      </div>
    </article>
  );
}

function GenerationLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-center text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink/40 md:text-left">
      {children}
    </p>
  );
}

function LineageRow({
  generation,
  isLast,
}: {
  generation: LineageGeneration;
  isLast: boolean;
}) {
  return (
    <section id={generation.id} className="scroll-mt-28">
      <div className="grid items-center md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,0.72fr)]">
        <div>
          <GenerationLabel>{generation.label}</GenerationLabel>
          <PersonCard person={generation.direct} />
        </div>

        {generation.partner ? (
          <>
            <div
              className="relative h-8 md:h-full md:min-h-16"
              aria-hidden="true"
            >
              <span className="absolute bottom-0 left-8 top-0 border-l border-ink/25 md:bottom-auto md:left-0 md:right-0 md:top-1/2 md:border-l-0 md:border-t" />
              <span className="absolute left-8 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-[#f4efe7] md:block" />
            </div>
            <div className="ml-8 md:ml-0">
              <PersonCard person={generation.partner} variant="secondary" />
            </div>
          </>
        ) : (
          <>
            <div aria-hidden="true" />
            <div aria-hidden="true" />
          </>
        )}
      </div>

      {!isLast ? (
        <div className="grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,0.72fr)]">
          <div className="relative mx-auto h-16 w-px">
            <span
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 border-l ${
                generation.connectionToNext === 'review'
                  ? 'border-dashed border-ink/40'
                  : 'border-ink/30'
              }`}
            />
            {generation.connectionToNext === 'review' ? (
              <span className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 bg-[#f4efe7] px-2 text-[0.58rem] uppercase tracking-widest text-ink/45">
                claimed relationship · not yet proved
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default function VisualFamilyTree() {
  return (
    <figure aria-labelledby="visual-tree-title">
      <figcaption id="visual-tree-title" className="sr-only">
        A visual pedigree showing the working Meason family line from Benjamin
        Meason to Shannon Jeremiah Meason, with spouses shown as secondary
        connections, the relationship between Benjamin and George marked as
        unproved, and Benjamin&apos;s parents marked as unknown.
      </figcaption>

      <nav
        aria-label="Jump to a person in the working Meason line"
        className="mb-14 rounded-2xl border border-ink/10 bg-paper/70 p-5 md:mb-20 md:p-6"
      >
        <p className="eyebrow mb-4">Jump through the direct line</p>
        <div className="flex flex-wrap gap-2">
          {lineageGenerations.map((generation) => (
            <Link
              key={generation.id}
              href={`#${generation.id}`}
              className="rounded-full border border-ink/15 bg-paper px-3 py-2 text-xs text-ink/65 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {generation.navLabel}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-4xl">
        <section id="benjamin-parents" className="scroll-mt-28">
          <p className="mb-4 text-center text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink/40 md:max-w-[54.6%]">
            Generation 8 · Benjamin&apos;s parents · unresolved
          </p>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 md:max-w-[54.6%]">
            <PersonCard
              person={{
                name: 'Unknown father',
                detail: 'No candidate is proved.',
                status: 'Open question',
              }}
              variant="unknown"
            />
            <PersonCard
              person={{
                name: 'Unknown mother',
                detail: 'No identity is established.',
                status: 'Open question',
              }}
              variant="unknown"
            />
          </div>

          <div
            className="grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,0.72fr)]"
            aria-hidden="true"
          >
            <div className="relative mx-auto h-20 w-1/2">
              <span className="absolute left-0 top-0 h-5 border-l border-dashed border-ink/35" />
              <span className="absolute right-0 top-0 h-5 border-r border-dashed border-ink/35" />
              <span className="absolute left-0 right-0 top-5 border-t border-dashed border-ink/35" />
              <span className="absolute bottom-0 left-1/2 top-5 border-l border-dashed border-ink/35" />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#f4efe7] px-2 text-[0.58rem] uppercase tracking-widest text-ink/45">
                unproved
              </span>
            </div>
          </div>
        </section>

        {lineageGenerations.map((generation, index) => (
          <LineageRow
            key={generation.id}
            generation={generation}
            isLast={index === lineageGenerations.length - 1}
          />
        ))}
      </div>
    </figure>
  );
}
