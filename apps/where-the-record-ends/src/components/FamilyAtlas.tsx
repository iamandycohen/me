'use client';

import {
  media,
  people,
  personMediaIds,
  relationships,
  type PersonId,
  type PublicMedia,
} from '@where-the-record-ends/genealogy-content';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ReferenceLinks } from './ReferenceLinks';

type AtlasLayer = 'family' | 'evidence' | 'places';

function Initials({ name }: { name: string }) {
  const parts = name.split(' ');
  return (
    <span aria-hidden="true">
      {parts[0]?.[0]}
      {parts.at(-1)?.[0]}
    </span>
  );
}

export function FamilyAtlas() {
  const [selectedId, setSelectedId] = useState<PersonId>('benjamin');
  const [layer, setLayer] = useState<AtlasLayer>('family');
  const selected =
    people.find((person) => person.id === selectedId) ?? people[0];
  const relatedRelationships = relationships.filter(
    (relationship) =>
      relationship.from === selected.id || relationship.to === selected.id
  );
  const mediaId = personMediaIds[selected.id];
  const selectedMedia: PublicMedia | undefined = mediaId
    ? media[mediaId]
    : undefined;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="min-w-0 overflow-hidden rounded-[2rem] border border-ink/10 bg-cream shadow-paper">
        <header className="border-b border-ink/10 p-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">The direct line</p>
              <h2 className="mt-2 font-serif text-3xl">
                Select a person to follow the evidence.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">
                The dashed connection is an accepted high-confidence conclusion
                from indirect evidence—not a direct parentage statement.
              </p>
            </div>
            <fieldset>
              <legend className="sr-only">Atlas layer</legend>
              <div className="inline-flex rounded-full border border-ink/10 bg-paper/60 p-1">
                {(['family', 'evidence', 'places'] as AtlasLayer[]).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={layer === item}
                      onClick={() => setLayer(item)}
                      className={`rounded-full px-3 py-2 text-xs capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                        layer === item
                          ? 'bg-ink text-paper'
                          : 'text-ink/60 hover:text-ink'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </fieldset>
          </div>
        </header>
        <div
          className="overflow-x-auto px-6 py-10 sm:px-8"
          tabIndex={0}
          role="region"
          aria-label="Scrollable direct family line, Benjamin through Andy"
        >
          <p className="mb-5 text-xs text-ink/50 md:hidden">
            Swipe or use the arrow keys to see every generation →
          </p>
          <ol className="flex min-w-[72rem] items-center">
            {people.map((person, index) => {
              const portraitId = personMediaIds[person.id];
              const portrait: PublicMedia | undefined = portraitId
                ? media[portraitId]
                : undefined;
              const isPortrait = portrait?.kind === 'portrait';
              const selectedPerson = selected.id === person.id;
              const previousPerson = index > 0 ? people[index - 1] : undefined;
              const priorRelationship = previousPerson
                ? relationships.find(
                    (relationship) =>
                      (relationship.from === previousPerson.id &&
                        relationship.to === person.id) ||
                      (relationship.to === previousPerson.id &&
                        relationship.from === person.id)
                  )
                : undefined;
              return (
                <li key={person.id} className="contents">
                  {priorRelationship ? (
                    <div
                      className="relative min-w-12 flex-1 px-2"
                      aria-hidden="true"
                    >
                      <span
                        className={`block border-t-2 ${priorRelationship.evidenceType === 'indirect' ? 'border-dashed border-accent' : 'border-ink/20'}`}
                      />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    aria-pressed={selectedPerson}
                    onClick={() => setSelectedId(person.id)}
                    className={`group w-32 rounded-2xl border p-3 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${selectedPerson ? 'border-accent bg-accent/[0.06] shadow-paper' : 'border-ink/10 bg-paper/50 hover:border-accent/40'}`}
                  >
                    <span className="relative mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-ink/10 bg-[#e8ded1] font-serif text-lg">
                      {isPortrait && portrait ? (
                        <Image
                          src={portrait.src}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover grayscale-[0.25]"
                          style={{ objectPosition: portrait.objectPosition }}
                        />
                      ) : (
                        <Initials name={person.name} />
                      )}
                    </span>
                    <span className="block font-serif text-base leading-tight">
                      {person.name}
                    </span>
                    <span className="mt-2 block text-[0.62rem] leading-relaxed text-ink/55">
                      {layer === 'places'
                        ? person.place
                        : layer === 'evidence'
                          ? `${person.evidenceType} · ${person.assessment.replace('-', ' ')}`
                          : person.period}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="grid border-t border-ink/10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]">
          <div className="p-6 sm:p-8">
            <p className="eyebrow">Selected person</p>
            <h2 className="mt-2 font-serif text-4xl">{selected.name}</h2>
            <p className="mt-2 text-sm text-ink/55">
              {selected.period} · {selected.place}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/70">
              {selected.summary}
              <ReferenceLinks ids={selected.referenceIds} />
            </p>
            <dl className="mt-7 grid gap-5 border-t border-ink/10 pt-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow !text-[0.56rem]">
                  Relationship to narrator
                </dt>
                <dd className="mt-2 text-sm text-ink/70">
                  {selected.relation}
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.56rem]">Assessment</dt>
                <dd className="mt-2 text-sm capitalize text-ink/70">
                  {selected.assessment.replace('-', ' ')} ·{' '}
                  {selected.evidenceType} evidence
                </dd>
              </div>
            </dl>
            {relatedRelationships.length > 0 ? (
              <div className="mt-7 space-y-4">
                {relatedRelationships.map((relationship) => (
                  <details
                    key={relationship.id}
                    className="rounded-xl border border-ink/10 bg-paper/45 p-4"
                  >
                    <summary className="cursor-pointer text-sm font-medium text-accent">
                      Why this connection is shown
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-ink/65">
                      {relationship.statement}
                    </p>
                    <p className="mt-3 border-l-2 border-ink/15 pl-3 text-xs italic leading-relaxed text-ink/55">
                      Limitation: {relationship.limitation}
                      <ReferenceLinks ids={relationship.referenceIds} />
                    </p>
                  </details>
                ))}
              </div>
            ) : null}
          </div>
          <div className="border-t border-ink/10 bg-[#ece3d7]/45 p-6 lg:border-l lg:border-t-0">
            {selectedMedia ? (
              <figure key={selectedMedia.id}>
                <a
                  href={selectedMedia.src}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8ded1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 24rem"
                    className={
                      selectedMedia.fit === 'contain'
                        ? 'object-contain p-2'
                        : 'object-cover'
                    }
                    style={{ objectPosition: selectedMedia.objectPosition }}
                  />
                </a>
                <figcaption className="mt-4">
                  <p className="eyebrow !text-[0.56rem]">
                    {selectedMedia.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {selectedMedia.caption}
                    <ReferenceLinks ids={selectedMedia.referenceIds} />
                  </p>
                  {selectedMedia.limitation ? (
                    <p className="mt-3 border-l-2 border-accent/25 pl-3 text-xs leading-relaxed text-ink/55">
                      Boundary: {selectedMedia.limitation}
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs text-ink/55">
                    {selectedMedia.provenance.sourcePage ? (
                      <a
                        href={selectedMedia.provenance.sourcePage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent underline underline-offset-2"
                      >
                        {selectedMedia.provenance.credit} ↗
                      </a>
                    ) : (
                      selectedMedia.provenance.credit
                    )}
                  </p>
                </figcaption>
              </figure>
            ) : (
              <div className="flex min-h-56 flex-col justify-end rounded-2xl border border-dashed border-ink/20 p-5">
                <p className="eyebrow !text-[0.56rem]">Visual record</p>
                <p className="mt-2 font-serif text-xl">
                  No reviewed image is attached yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className="rounded-[2rem] bg-ink p-7 text-paper shadow-paper sm:p-8">
        <p className="eyebrow !text-accent-soft">Where the line stops</p>
        <div className="my-7 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-paper/35 font-serif text-3xl text-paper/70">
            ?
          </span>
          <div>
            <h2 className="font-serif text-2xl">Benjamin’s parents</h2>
            <p className="mt-1 text-sm text-paper/60">
              Unknown · active investigation
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-paper/65">
          The records place Benjamin inside Joseph Meason’s inheritance network,
          but they do not identify his exact branch. No parent appears above him
          here.
        </p>
        <div className="mt-7 space-y-3 border-t border-paper/10 pt-6 text-sm text-paper/70">
          <p>Thomas branch · serious candidate, unproved</p>
          <p>Another sibling branch · open explanation</p>
          <p>Unidentified branch · still possible</p>
        </div>
        <Link
          href="/cases/parentage"
          className="mt-8 inline-flex w-full items-center justify-between rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
        >
          Open the parentage case <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </div>
  );
}
