type SourceFootnoteProps = {
  referenceIds: number | readonly number[];
  sourceId?: string;
  referencesPath?: string;
};

export default function SourceFootnote({
  referenceIds,
  sourceId,
  referencesPath = '',
}: SourceFootnoteProps) {
  const ids = [
    ...new Set(Array.isArray(referenceIds) ? referenceIds : [referenceIds]),
  ];

  if (ids.length === 0) {
    return null;
  }

  return (
    <sup
      id={sourceId}
      className="ml-1 inline-flex max-w-full flex-wrap scroll-mt-28 items-baseline gap-0.5 font-sans text-[0.65em] font-medium leading-none text-accent"
    >
      <span aria-hidden="true">[</span>
      {ids.map((id, index) => (
        <span key={id} className="inline-flex items-baseline gap-0.5">
          {index > 0 ? <span aria-hidden="true">,</span> : null}
          <a
            href={`${referencesPath}#reference-${id}`}
            aria-label={`Go to reference ${id}`}
            role="doc-noteref"
            className="rounded-sm underline decoration-accent/40 underline-offset-2 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {id}
          </a>
        </span>
      ))}
      <span aria-hidden="true">]</span>
    </sup>
  );
}
