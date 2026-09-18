import Link from 'next/link';

export type GenealogyReference = {
  id: number;
  title: string;
  citation: string;
  supports: string;
  limitation: string;
  url?: string;
  accessLabel?: string;
  backHref?: string;
};

type ReferencesListProps = {
  references: readonly GenealogyReference[];
};

export default function ReferencesList({ references }: ReferencesListProps) {
  return (
    <ol className="border-t border-ink/15" aria-label="Genealogy references">
      {references.map((reference) => (
        <li
          key={reference.id}
          id={`reference-${reference.id}`}
          value={reference.id}
          className="scroll-mt-28 border-b border-ink/10 py-8"
        >
          <article className="grid gap-5 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="eyebrow mb-2">Reference {reference.id}</p>
              <h3 className="text-xl leading-snug text-ink">
                {reference.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                {reference.citation}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {reference.url ? (
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    aria-label={`${reference.accessLabel ?? 'View source'} for ${reference.title} (opens in a new tab)`}
                  >
                    {reference.accessLabel ?? 'View source'} ↗
                  </a>
                ) : null}
                {reference.backHref ? (
                  <Link
                    href={reference.backHref}
                    className="link-underline text-ink/60"
                    aria-label={`Return to the text citing reference ${reference.id}`}
                  >
                    Return to text ↑
                  </Link>
                ) : null}
              </div>
            </div>
            <dl className="grid gap-5 sm:grid-cols-2 md:col-span-8 md:gap-8">
              <div>
                <dt className="mb-2 text-xs uppercase tracking-widest text-accent">
                  Supports
                </dt>
                <dd className="text-sm leading-relaxed text-ink/70">
                  {reference.supports}
                </dd>
              </div>
              <div>
                <dt className="mb-2 text-xs uppercase tracking-widest text-ink/45">
                  Limitation
                </dt>
                <dd className="text-sm leading-relaxed text-ink/55">
                  {reference.limitation}
                </dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ol>
  );
}
