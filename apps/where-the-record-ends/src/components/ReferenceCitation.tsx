'use client';

import {
  media,
  type Reference,
  type ReferenceVisualAccessStatus,
} from '@where-the-record-ends/genealogy-content';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const visualAccessLabels: Readonly<
  Record<ReferenceVisualAccessStatus, string>
> = {
  'reviewed-preview': 'Preview available',
  'external-original-only': 'External original',
  'external-volume-only': 'Volume link',
  'text-only-deferred': 'Catalog / no preview',
};

export function ReferenceCitation({ reference }: { reference: Reference }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const citationId = useId();
  const visualAccess = reference.visualAccess;
  const previewItems = (visualAccess?.previewMediaIds ?? []).map(
    (mediaId) => media[mediaId]
  );
  const accessLinks = reference.accessLinks ?? [];
  const sourceHref = `/sources#reference-${reference.id}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isOpen) dialogRef.current?.showModal();
  }, [isOpen, mounted]);

  return (
    <>
      <Link
        href={sourceHref}
        title={reference.title}
        className="text-accent underline decoration-accent/30 underline-offset-2 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-haspopup="dialog"
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }

          event.preventDefault();
          setIsOpen(true);
        }}
      >
        [{reference.id}]
      </Link>

      {mounted && isOpen
        ? createPortal(
            <dialog
              ref={dialogRef}
              id={`${titleId}-dialog`}
              aria-labelledby={titleId}
              aria-describedby={citationId}
              className="m-auto w-[min(94vw,62rem)] max-w-none overflow-hidden rounded-[1.5rem] border border-paper/20 bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
              onClose={() => setIsOpen(false)}
              onClick={(event) => {
                if (event.target === dialogRef.current)
                  dialogRef.current?.close();
              }}
            >
              <div className="flex max-h-[92vh] flex-col">
                <header className="flex items-start justify-between gap-5 border-b border-ink/10 px-5 py-5 sm:px-7">
                  <div className="min-w-0">
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-accent">
                      Reference {reference.id}
                    </p>
                    <h2
                      id={titleId}
                      className="mt-2 font-serif text-2xl sm:text-3xl"
                    >
                      {reference.title}
                    </h2>
                  </div>
                  <form method="dialog" className="shrink-0">
                    <button
                      type="submit"
                      className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Close
                    </button>
                  </form>
                </header>

                <div className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7">
                  <p
                    id={citationId}
                    className="text-sm leading-relaxed text-ink/65"
                  >
                    {reference.citation}
                  </p>

                  <dl className="mt-5 grid gap-4 border-y border-ink/10 py-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                        Supports
                      </dt>
                      <dd className="mt-2 leading-relaxed text-ink/70">
                        {reference.supports}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                        Limit
                      </dt>
                      <dd className="mt-2 leading-relaxed text-ink/70">
                        {reference.limitation}
                      </dd>
                    </div>
                  </dl>

                  {visualAccess ? (
                    <section className="mt-5" aria-label="Visual access">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-accent">
                          {visualAccessLabels[visualAccess.status]}
                        </span>
                        <p className="text-xs leading-relaxed text-ink/55">
                          {visualAccess.note}
                        </p>
                      </div>

                      {previewItems.length > 0 ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {previewItems.map((item) => (
                            <figure
                              key={item.id}
                              className="overflow-hidden rounded-xl border border-ink/10 bg-cream"
                            >
                              <div className="relative aspect-[4/3] bg-[#e9e0d4]">
                                <Image
                                  src={item.src}
                                  alt={item.alt}
                                  fill
                                  sizes="(max-width: 640px) 90vw, 28rem"
                                  className={
                                    item.fit === 'contain'
                                      ? 'object-contain p-2'
                                      : 'object-cover'
                                  }
                                  style={{
                                    objectPosition: item.objectPosition,
                                  }}
                                />
                              </div>
                              <figcaption className="p-3 text-xs leading-relaxed text-ink/60">
                                <span className="font-medium text-ink">
                                  {item.title}.
                                </span>{' '}
                                {item.caption}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/10 pt-5 text-sm">
                    {accessLinks.length > 0 ? (
                      accessLinks.map((accessLink) => (
                        <a
                          key={`${accessLink.url}-${accessLink.label}`}
                          href={accessLink.url}
                          target="_blank"
                          rel="noreferrer"
                          className="break-words font-semibold text-accent underline decoration-accent/35 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          {accessLink.label} ↗
                        </a>
                      ))
                    ) : reference.url ? (
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-words font-semibold text-accent underline decoration-accent/35 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        {reference.accessLabel ?? 'Open record'} ↗
                      </a>
                    ) : null}
                    <Link
                      href={sourceHref}
                      className="font-medium text-ink/65 underline decoration-ink/20 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      View in the full source catalog
                    </Link>
                  </div>
                </div>
              </div>
            </dialog>,
            document.body
          )
        : null}
    </>
  );
}
