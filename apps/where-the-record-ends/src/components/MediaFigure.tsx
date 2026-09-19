import type { PublicMedia } from '@where-the-record-ends/genealogy-content';
import Image from 'next/image';

import { ReferenceLinks } from './ReferenceLinks';

export function MediaFigure({
  item,
  compact = false,
}: {
  item: PublicMedia;
  compact?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream shadow-paper">
      <a
        href={item.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size image: ${item.title}`}
        className={`group relative block overflow-hidden bg-[#e9e0d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${compact ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            compact
              ? '(max-width: 768px) 100vw, 32rem'
              : '(max-width: 768px) 100vw, 50vw'
          }
          className={`transition-transform duration-500 group-hover:scale-[1.015] ${item.fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
          style={{ objectPosition: item.objectPosition }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-accent backdrop-blur">
          {item.role === 'evidence'
            ? 'Evidence image'
            : item.kind === 'portrait'
              ? 'Family photograph'
              : 'Place context'}
        </span>
      </a>
      <figcaption className="p-5">
        <p className="eyebrow !text-[0.58rem]">{item.label}</p>
        <h2 className="mt-2 font-serif text-2xl">{item.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          {item.caption}
          <ReferenceLinks ids={item.referenceIds} />
        </p>
        {item.limitation ? (
          <p className="mt-4 border-l-2 border-accent/25 pl-3 text-xs leading-relaxed text-ink/60">
            Boundary: {item.limitation}
          </p>
        ) : null}
        <p className="mt-4 text-xs text-ink/55">
          {item.provenance.sourcePage ? (
            <a
              className="text-accent underline underline-offset-2"
              href={item.provenance.sourcePage}
              target="_blank"
              rel="noreferrer"
            >
              {item.provenance.credit} ↗
            </a>
          ) : (
            item.provenance.credit
          )}
        </p>
      </figcaption>
    </figure>
  );
}
