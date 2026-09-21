'use client';

import type { CaseSection } from '@where-the-record-ends/genealogy-content';
import { useState } from 'react';

import { ReferenceLinks } from './ReferenceLinks';

export function CaseEvidenceExplorer({
  sections,
}: {
  sections: readonly CaseSection[];
}) {
  const [selectedId, setSelectedId] = useState(sections[0]?.id);
  const selected =
    sections.find((section) => section.id === selectedId) ?? sections[0];

  if (!selected) return null;

  return (
    <div>
      <fieldset>
        <legend className="eyebrow">Examine the case file</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              aria-pressed={section.id === selected.id}
              onClick={() => setSelectedId(section.id)}
              className={`rounded-full border px-4 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                section.id === selected.id
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/15 bg-paper/60 text-ink/65 hover:border-accent/45'
              }`}
            >
              <span className="mr-2 font-serif text-sm">0{index + 1}</span>
              {section.label}
            </button>
          ))}
        </div>
      </fieldset>

      <section
        key={selected.id}
        id={selected.id}
        className="mt-10 scroll-mt-28"
        aria-live="polite"
      >
        <p className="eyebrow">{selected.label}</p>
        <h2 className="balanced mt-3 font-serif text-3xl sm:text-4xl">
          {selected.heading}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/60">
          {selected.intro}
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {selected.cards.map((card) => (
            <article
              key={card.id}
              className={`rounded-2xl border p-5 ${
                card.tone === 'limit'
                  ? 'border-dashed border-ink/20 bg-transparent'
                  : card.tone === 'inference'
                    ? 'border-accent/25 bg-accent/[0.035]'
                    : 'border-ink/10 bg-paper/70'
              }`}
            >
              <p className="eyebrow !text-[0.55rem]">{card.eyebrow}</p>
              <h3 className="mt-5 font-serif text-xl">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {card.detail}
                <ReferenceLinks ids={card.referenceIds} />
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
