'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';

interface EvidenceImageViewerProps {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly title: string;
  readonly label: string;
  readonly caption: string;
  readonly sourceUrl?: string;
  readonly sourceLabel?: string;
  readonly sourceProvider?: string;
  readonly previewAspect?: 'natural' | 'standard' | 'wide';
  readonly fit?: 'cover' | 'contain';
  readonly objectPosition?: string;
  readonly sizes?: string;
}

export function EvidenceImageViewer({
  src,
  alt,
  width,
  height,
  title,
  label,
  caption,
  sourceUrl,
  sourceLabel = 'Open source record',
  sourceProvider,
  previewAspect = 'natural',
  fit = 'cover',
  objectPosition,
  sizes = '(max-width: 1024px) 100vw, 58vw',
}: EvidenceImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className={`group relative block w-full overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink text-left shadow-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          previewAspect === 'standard'
            ? 'aspect-[4/3]'
            : previewAspect === 'wide'
              ? 'aspect-[16/10]'
              : ''
        }`}
        onClick={() => {
          setIsOpen(true);
          dialogRef.current?.showModal();
        }}
        aria-label={`Enlarge ${title}`}
        aria-haspopup="dialog"
      >
        {previewAspect === 'natural' ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className={`h-auto w-full opacity-90 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-100 ${fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
            style={{ objectPosition }}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={`opacity-90 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-100 ${fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
            style={{ objectPosition }}
          />
        )}
        <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-full bg-ink/85 px-4 py-2 text-paper backdrop-blur">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.15em]">
            {label}
          </span>
          <span className="shrink-0 text-xs text-accent-soft">
            Enlarge image
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(96vw,96rem)] max-w-none overflow-hidden rounded-[1.5rem] border border-paper/15 bg-ink p-0 text-paper shadow-2xl backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex max-h-[94vh] flex-col">
          <div className="flex items-start justify-between gap-6 border-b border-paper/10 px-5 py-4 sm:px-7">
            <div>
              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-accent-soft">
                {label}
              </p>
              <h2 id={titleId} className="mt-1 font-serif text-2xl">
                {title}
              </h2>
            </div>
            <form method="dialog">
              <button
                type="submit"
                className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-accent-soft hover:text-accent-soft"
              >
                Close
              </button>
            </form>
          </div>
          <div className="min-h-0 overflow-auto bg-black/25 p-3 sm:p-5">
            {isOpen ? (
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="96vw"
                className="mx-auto h-auto max-h-[72vh] w-auto max-w-full"
              />
            ) : null}
          </div>
          <div className="grid gap-3 border-t border-paper/10 px-5 py-4 text-sm leading-relaxed text-paper/65 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-7">
            <p>{caption}</p>
            {sourceUrl ? (
              <div className="sm:text-right">
                {sourceProvider ? (
                  <p className="mb-1 text-xs text-paper/45">
                    Source: {sourceProvider}
                  </p>
                ) : null}
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-accent-soft underline decoration-accent-soft/40 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
                >
                  {sourceLabel} ↗
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
