import Image from 'next/image';
import Link from 'next/link';

interface Person {
  name: string;
  detail: string;
  status: string;
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
    referenceId?: number;
  };
  evidenceImage?: {
    src: string;
    alt: string;
    label: string;
    caption: string;
    fit?: 'cover' | 'contain';
    aspect?: 'landscape' | 'portrait';
    referenceId?: number;
  };
}

interface LineageGeneration {
  id: string;
  navLabel: string;
  label: string;
  direct: Person;
  partner?: Person;
  connectionToNext?: 'documented' | 'indirect' | 'review';
}

const lineageGenerations: LineageGeneration[] = [
  {
    id: 'benjamin-meason',
    navLabel: 'Benjamin',
    label: 'Generation 7 · fourth great-grandfather · working conclusion',
    direct: {
      name: 'Benjamin Meason',
      detail: 'Born about 1776 · living in Monroe County in 1850',
      status: 'Direct-line placement · high-confidence indirect conclusion',
      evidenceImage: {
        src: '/genealogy/evidence/benjamin-meason-1802-guardian-bond.jpg',
        alt: 'Facing pages of the Nelson County bond book; Benjamin Meason’s signature appears on the left-page guardian bond',
        label: 'Original record · 1802',
        caption:
          'Benjamin signed this Nelson County guardian bond “Benjn Meason.” It documents his presence and handwriting—not his parents.',
        fit: 'contain',
        referenceId: 5,
      },
    },
    partner: {
      name: 'Hannah Doom',
      detail: 'Married Benjamin in Kentucky in 1801',
      status: 'Spouse · working direct ancestor',
    },
    connectionToNext: 'indirect',
  },
  {
    id: 'george-m-meason',
    navLabel: 'George',
    label: 'Generation 6 · third great-grandfather',
    direct: {
      name: 'George M. Meason',
      detail: 'Censuses and family note: about 1810 · marker: 1818 · died 1887',
      status: 'Placed in Benjamin’s family through converging evidence',
      evidenceImage: {
        src: '/genealogy/evidence/george-m-meason-marker.jpg',
        alt: 'Broken grave marker for George M. Meason at Mount Calvary Cemetery in Dallas',
        label: 'Marker photograph · Dallas',
        caption:
          'George’s marker gives 10 May 1818–11 November 1887. Census and family evidence instead point to birth about 1810, so both traditions remain visible.',
        fit: 'contain',
        referenceId: 26,
      },
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
      status: 'Recorded as Frank · parents named in an original record',
      image: {
        src: '/genealogy/people/franklin-meason.jpg',
        alt: 'Portrait attributed to Franklin Meason',
        referenceId: 42,
      },
      evidenceImage: {
        src: '/genealogy/people/franklin-meason-at-home.jpg',
        alt: 'Full seated portrait attributed to Franklin Meason outside a family home',
        label: 'Family photograph · Richardson',
        caption:
          'The family-tree title identifies Franklin seated at his home in Richardson. The photograph’s exact date and original photographer are still being documented.',
        fit: 'contain',
        aspect: 'portrait',
        referenceId: 42,
      },
    },
    partner: {
      name: 'Nancy Ann Huffhines',
      detail: '1852–1930',
      status: 'Spouse · direct ancestor',
      evidenceImage: {
        src: '/genealogy/evidence/franklin-nancy-meason-marker.jpg',
        alt: 'Shared grave marker for Frank Meason and Nancy A. Meason',
        label: 'Shared grave marker',
        caption:
          'The marker identifies Frank Meason and his wife, Nancy A. Meason. Nancy’s 1852–1930 dates remain legible; Franklin’s final year is weathered in this photograph.',
        fit: 'contain',
        referenceId: 47,
      },
    },
  },
  {
    id: 'james-lawrence-meason-1892',
    navLabel: 'James · 1892',
    label: 'Generation 4 · great-grandfather',
    direct: {
      name: 'James Lawrence Meason',
      detail: '1892–1949',
      status: 'Parents named in an original record',
      image: {
        src: '/genealogy/people/james-lawrence-meason-1892.jpg',
        alt: 'Portrait attributed to James Lawrence Meason, born 1892',
        referenceId: 40,
      },
      evidenceImage: {
        src: '/genealogy/people/james-lawrence-meason-1892-porch.jpg',
        alt: 'Full porch photograph attributed to James Lawrence Meason, born 1892',
        label: 'Family photograph · porch portrait',
        caption:
          'This full frame is the source of James’s portrait circle and carries a handwritten identification. The writing is a caption, not a verified autograph; the photograph’s date and place remain unknown.',
        fit: 'contain',
        aspect: 'portrait',
        referenceId: 40,
      },
    },
    partner: {
      name: 'Mary Estelle Sledge',
      detail: '1896–1952',
      status: 'Spouse · direct ancestor',
      image: {
        src: '/genealogy/people/mary-estelle-sledge.jpg',
        alt: 'Portrait attributed to Mary Estelle Sledge Meason',
        referenceId: 41,
      },
      evidenceImage: {
        src: '/genealogy/people/mary-estelle-sledge-standing.jpg',
        alt: 'Full standing portrait attributed to Mary Estelle Sledge Meason outside a house',
        label: 'Family photograph',
        caption:
          'This is the full frame behind Mary’s portrait circle. The family-tree attribution identifies her as Mary Estelle Sledge Meason; the date and place remain unknown.',
        fit: 'contain',
        aspect: 'portrait',
        referenceId: 41,
      },
    },
  },
  {
    id: 'james-lawrence-meason-1934',
    navLabel: 'James · 1934',
    label: 'Generation 3 · grandfather',
    direct: {
      name: 'James Lawrence Meason',
      detail: '1934–1973',
      status: 'Parents named in an original record',
      image: {
        src: '/genealogy/people/jimmy-meason-studio-portrait.jpg',
        alt: 'Studio portrait of James Lawrence “Jimmy” Meason',
        objectPosition: 'center 22%',
        referenceId: 39,
      },
      evidenceImage: {
        src: '/genealogy/people/james-lawrence-meason-1934-yearbook.jpg',
        alt: 'Yearbook page with a senior portrait of Jimmy Meason and a list of his school activities',
        label: 'Family-held yearbook scan',
        caption:
          'Jimmy’s senior entry records four years of football, three years of basketball, a year as class president, and work as the annual staff’s sports editor.',
        fit: 'contain',
        referenceId: 37,
      },
    },
    partner: {
      name: 'Julie Ann Lipke',
      detail: 'Family lineage',
      status: 'Spouse · direct ancestor',
      evidenceImage: {
        src: '/genealogy/people/jimmy-meason-julie-ann-lipke-wedding.jpg',
        alt: 'Wedding portrait attributed to James Lawrence “Jimmy” Meason and Julie Ann Lipke',
        label: 'Family wedding portrait',
        caption:
          'This family-held photograph is identified as Jimmy Meason and Julie Ann Lipke on their wedding day. The date, place, and original photographer are still being documented.',
        fit: 'contain',
        aspect: 'portrait',
        referenceId: 46,
      },
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
      image: {
        src: '/genealogy/people/cynthia-june-meason-school-portrait.jpg',
        alt: 'Formal school portrait of Cynthia June “Cindee” Meason',
        objectPosition: 'center 28%',
        referenceId: 38,
      },
      evidenceImage: {
        src: '/genealogy/people/cynthia-june-meason-school-portrait.jpg',
        alt: 'Full formal school portrait of Cynthia June “Cindee” Meason',
        label: 'Family photograph · school portrait',
        caption:
          'This full frame is the source of Cindee’s portrait circle. The family identification is established, while the school, studio, and exact date are still being documented.',
        fit: 'contain',
        aspect: 'portrait',
        referenceId: 38,
      },
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
      image: {
        src: '/headshot.jpg',
        alt: 'Andy Cohen',
        objectPosition: 'center 28%',
      },
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
          style={{ objectPosition: person.image.objectPosition }}
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
          {person.image?.referenceId ? (
            <p className="mt-1 text-[0.66rem] text-ink/45">
              Portrait:{' '}
              <Link
                href={`/genealogy#reference-${person.image.referenceId}`}
                className="link-underline"
              >
                reference {person.image.referenceId}
              </Link>
            </p>
          ) : null}
        </div>
      </div>

      {person.evidenceImage ? (
        <figure className="mt-5 overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.025]">
          <a
            href={person.evidenceImage.src}
            target="_blank"
            rel="noreferrer"
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div
              className={`relative overflow-hidden bg-[#e9e3d9] ${
                person.evidenceImage.aspect === 'portrait'
                  ? 'aspect-[4/5]'
                  : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={person.evidenceImage.src}
                alt={person.evidenceImage.alt}
                fill
                sizes="(max-width: 768px) calc(100vw - 4rem), 460px"
                className={`transition-transform duration-300 group-hover:scale-[1.015] ${
                  person.evidenceImage.fit === 'contain'
                    ? 'object-contain'
                    : 'object-cover object-center'
                }`}
              />
            </div>
            <span className="sr-only">Open the full-size evidence image.</span>
          </a>
          <figcaption className="border-t border-ink/10 px-4 py-3">
            <span className="mb-1 block text-[0.58rem] font-medium uppercase tracking-[0.16em] text-accent">
              {person.evidenceImage.label}
            </span>
            <span className="block text-xs leading-relaxed text-ink/55">
              {person.evidenceImage.caption}
            </span>
            {person.evidenceImage.referenceId ? (
              <Link
                href={`/genealogy#reference-${person.evidenceImage.referenceId}`}
                className="mt-2 inline-block text-xs link-underline"
              >
                Reference {person.evidenceImage.referenceId}
              </Link>
            ) : null}
          </figcaption>
        </figure>
      ) : null}
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
      <GenerationLabel>{generation.label}</GenerationLabel>
      <div className="grid items-center md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,0.72fr)]">
        <div>
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
                generation.connectionToNext === 'indirect'
                  ? 'border-dashed border-accent/60'
                  : generation.connectionToNext === 'review'
                    ? 'border-dashed border-ink/40'
                    : 'border-ink/30'
              }`}
            />
            {generation.connectionToNext === 'indirect' ? (
              <span className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 bg-[#f4efe7] px-2 text-[0.58rem] uppercase tracking-widest text-ink/45">
                high-confidence indirect conclusion
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
        connections, the relationship between Benjamin and George marked as a
        high-confidence indirect conclusion, and Benjamin&apos;s parents marked
        as unknown.
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
                parents unknown
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
