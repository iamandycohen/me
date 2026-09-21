import {
  media,
  references,
  type PublicMedia,
  type ReferenceVisualAccessStatus,
} from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';

import { MediaFigure } from '@/components/MediaFigure';
import { PageHero } from '@/components/PageHero';

const visualAccessLabels: Readonly<
  Record<ReferenceVisualAccessStatus, string>
> = {
  'reviewed-preview': 'Preview available',
  'external-original-only': 'External original',
  'external-volume-only': 'Volume link',
  'text-only-deferred': 'Catalog / no preview',
};

export const metadata: Metadata = {
  title: 'Sources and visual record',
  description:
    'The reviewed public source catalog, image provenance, rights notes, and interpretive limits behind the family history.',
};

export default function SourcesPage() {
  const visuals: readonly PublicMedia[] = Object.values(media);
  return (
    <>
      <PageHero
        eyebrow="Sources and visual record"
        title="The trail behind every conclusion."
        introduction="Citations are not an appendix to the experience. They are the visible structure that lets a reader separate a record, an assessment, and an open question."
        aside={
          <p className="mt-5 text-xs uppercase tracking-[0.15em] text-ink/45">
            {references.length} reviewed references · {visuals.length} visual
            records
          </p>
        }
      />

      <section
        className="px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="visual-catalog"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-5 border-b border-ink/10 pb-8 md:grid-cols-[1fr_2fr]">
            <p className="eyebrow">Visual provenance</p>
            <div>
              <h2
                id="visual-catalog"
                className="font-serif text-4xl sm:text-5xl"
              >
                Evidence and context stay distinct.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/60">
                A visual can be historically relevant without depicting this
                family. The catalog records that role alongside its source,
                credit, reuse basis, and known limitation.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visuals.map((item) => (
              <MediaFigure key={item.id} item={item} compact showRights />
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="reference-catalog"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="eyebrow">Reviewed public catalog</p>
            <h2
              id="reference-catalog"
              className="mt-2 font-serif text-4xl sm:text-5xl"
            >
              References
            </h2>
          </div>
          <ol className="space-y-4">
            {references.map((reference) => {
              const accessLinks = reference.accessLinks ?? [];
              const visualAccess = reference.visualAccess;

              return (
                <li
                  id={`reference-${reference.id}`}
                  key={reference.id}
                  className="scroll-mt-24 rounded-2xl border border-ink/10 bg-paper/60 p-5 sm:p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="font-serif text-2xl text-accent">
                      {reference.id}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl">{reference.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">
                        {reference.citation}
                      </p>
                      {visualAccess ? (
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-accent">
                            {visualAccessLabels[visualAccess.status]}
                          </span>
                          <p className="text-xs leading-relaxed text-ink/55">
                            {visualAccess.note}
                          </p>
                        </div>
                      ) : null}
                      <dl className="mt-4 grid gap-4 border-t border-ink/10 pt-4 text-xs sm:grid-cols-2">
                        <div>
                          <dt className="font-medium uppercase tracking-[0.12em] text-ink/40">
                            Supports
                          </dt>
                          <dd className="mt-1 leading-relaxed text-ink/60">
                            {reference.supports}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium uppercase tracking-[0.12em] text-ink/40">
                            Limit
                          </dt>
                          <dd className="mt-1 leading-relaxed text-ink/60">
                            {reference.limitation}
                          </dd>
                        </div>
                      </dl>
                      {accessLinks.length > 0 ? (
                        <ul
                          className="mt-4 flex flex-wrap gap-x-4 gap-y-2"
                          aria-label={`Original record links for ${reference.title}`}
                        >
                          {accessLinks.map((accessLink) => (
                            <li key={`${accessLink.url}-${accessLink.label}`}>
                              <a
                                href={accessLink.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block break-words text-xs text-accent underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                              >
                                {accessLink.label} ↗
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : reference.url ? (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block break-words text-xs text-accent underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          {reference.accessLabel ?? 'Open record'} ↗
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
