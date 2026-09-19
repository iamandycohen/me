'use client';

import type { Story } from '@where-the-record-ends/genealogy-content';
import { useState } from 'react';

import { ReferenceLinks } from './ReferenceLinks';

export function StoryTimeline({ story }: { story: Story }) {
  const [selectedId, setSelectedId] = useState(story.events[0]?.id);
  const selected =
    story.events.find((event) => event.id === selectedId) ?? story.events[0];

  if (!selected) return null;

  return (
    <div>
      <header className="grid gap-7 border-b border-ink/10 pb-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
        <div className="max-w-lg">
          <p className="eyebrow">Time checkpoints</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Move through the documented moments. Each checkpoint separates what
            the record states from what the evidence can reasonably suggest.
          </p>
        </div>
        <div
          className="grid gap-2 sm:grid-cols-2"
          aria-label={`${story.title} checkpoints`}
        >
          {story.events.map((event) => (
            <button
              key={event.id}
              type="button"
              aria-pressed={event.id === selected.id}
              onClick={() => setSelectedId(event.id)}
              className={`group flex min-h-14 items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                event.id === selected.id
                  ? 'border-accent bg-accent text-paper shadow-sm'
                  : 'border-ink/10 bg-paper/50 text-ink/65 hover:border-accent/45 hover:bg-accent/[0.035]'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-medium ${
                  event.id === selected.id
                    ? 'bg-paper/15 text-paper'
                    : 'bg-accent/10 text-accent'
                }`}
                aria-hidden="true"
              >
                {story.events.indexOf(event) + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-medium">{event.year}</span>
                <span
                  className={`mt-0.5 block truncate text-[0.65rem] ${
                    event.id === selected.id ? 'text-paper/70' : 'text-ink/45'
                  }`}
                >
                  {event.place}
                </span>
              </span>
            </button>
          ))}
        </div>
      </header>

      <section className="mt-10" aria-live="polite">
        <div className="grid gap-6 border-b border-ink/10 pb-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <p className="font-serif text-5xl leading-none text-accent sm:text-6xl">
              {selected.year}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.13em] text-ink/50">
              {selected.place}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-ink/40">
              Route stage
            </p>
            <p className="mt-1 font-serif text-xl text-ink/60">
              {selected.routeIndex + 1}{' '}
              <span className="text-sm text-ink/35">
                of {story.routePlaces.length}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-accent/20 bg-accent/[0.045] p-6 sm:p-8">
            <p className="eyebrow !text-[0.56rem]">The record states</p>
            <p className="mt-4 text-[0.95rem] leading-7 text-ink/75">
              {selected.record}
              <ReferenceLinks ids={selected.referenceIds} />
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-ink/20 bg-paper/35 p-6 sm:p-8">
            <p className="eyebrow !text-[0.56rem] !text-ink/50">
              The evidence suggests
            </p>
            <p className="mt-4 text-[0.95rem] leading-7 text-ink/65">
              {selected.interpretation}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
