import type { PublicMedia } from '@where-the-record-ends/genealogy-content';

import { EvidenceImageViewer } from './EvidenceImageViewer';
import { ReferenceLinks } from './ReferenceLinks';

export function MediaFigure({
  item,
  compact = false,
  showRights = false,
}: {
  item: PublicMedia;
  compact?: boolean;
  showRights?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream shadow-paper">
      <EvidenceImageViewer
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        title={item.title}
        label={
          item.role === 'evidence'
            ? 'Evidence image'
            : item.kind === 'portrait'
              ? 'Family photograph'
              : 'Place context'
        }
        caption={item.caption}
        sourceUrl={item.provenance.sourcePage}
        sourceProvider={item.provenance.credit}
        sourceLabel="Open source page"
        previewAspect={compact ? 'wide' : 'standard'}
        fit={item.fit}
        objectPosition={item.objectPosition}
        sizes={
          compact
            ? '(max-width: 768px) 100vw, 32rem'
            : '(max-width: 768px) 100vw, 50vw'
        }
      />
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
        {showRights ? (
          <dl className="mt-5 space-y-3 border-t border-ink/10 pt-4 text-xs leading-relaxed">
            <div>
              <dt className="font-medium text-ink/45">Dimensions</dt>
              <dd className="mt-1 text-ink/65">
                {item.width} × {item.height}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink/45">Reuse basis</dt>
              <dd className="mt-1 text-ink/65">
                {item.provenance.rightsStatement}
              </dd>
            </div>
          </dl>
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
