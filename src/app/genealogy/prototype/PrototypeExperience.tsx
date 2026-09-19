'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { publicTree } from '../data';
import SourceFootnote from '../_components/SourceFootnote';
import {
  researchCases,
  storyChapters,
  type CaseSection,
  type CaseId,
  type StoryId,
} from './prototypeData';
import {
  caseImageNeeds,
  caseMediaIds,
  mediaCatalog,
  personMediaIds,
  storyImageNeeds,
  storyMediaIds,
  type PublicImageNeed,
  type PublicMedia,
} from './prototypeMedia';

type Mode = 'family' | 'case' | 'story';
type Layer = 'family' | 'evidence' | 'places';

interface Person {
  id: string;
  name: string;
  period: string;
  relation: string;
  place: string;
  summary: string;
  status: 'documented' | 'indirect' | 'personal' | 'review';
}

interface Relationship {
  id: string;
  from: string;
  to: string;
  evidenceType: string;
  assessment: string;
  statement: string;
  support: string[];
  limitation: string;
  referenceIds: readonly number[];
}

const modes: { id: Mode; label: string; short: string }[] = [
  { id: 'family', label: 'Explore the family', short: 'Family atlas' },
  { id: 'case', label: 'Research cases', short: 'Case collection' },
  { id: 'story', label: 'Family stories', short: 'Chronicle collection' },
];

const personSpecs = [
  {
    id: 'benjamin',
    href: '/genealogy/tree#benjamin-meason',
    place: 'Kentucky → Missouri',
  },
  {
    id: 'george',
    href: '/genealogy/tree#george-m-meason',
    place: 'Missouri → Texas',
  },
  {
    id: 'franklin',
    href: '/genealogy/tree#franklin-meason',
    place: 'Missouri → Texas',
  },
  {
    id: 'james-1892',
    href: '/genealogy/tree#james-lawrence-meason-1892',
    place: 'Texas',
  },
  {
    id: 'james-1934',
    href: '/genealogy/tree#james-lawrence-meason-1934',
    place: 'Texas',
  },
  {
    id: 'cynthia',
    href: '/genealogy/tree#cynthia-june-meason',
    place: 'United States',
  },
  {
    id: 'shannon',
    href: '/genealogy/tree#shannon-jeremiah-meason',
    place: 'United States',
  },
] as const;

// The reviewed public tree is the source for names, periods, relationship labels,
// and summaries. Prototype-only IDs and broad place labels support interaction.
const people: Person[] = personSpecs.map((spec) => {
  const person = publicTree.find((node) => node.href === spec.href);
  if (!person) {
    throw new Error(
      `Prototype person is missing from publicTree: ${spec.href}`
    );
  }

  return {
    id: spec.id,
    name: person.title,
    period: person.period,
    relation: person.relationship,
    place: spec.place,
    summary: person.summary,
    status:
      person.status === 'indirect'
        ? 'indirect'
        : person.status === 'review'
          ? 'review'
          : spec.id === 'shannon'
            ? 'personal'
            : 'documented',
  };
});

const relationships: Relationship[] = [
  {
    id: 'benjamin-george',
    from: 'benjamin',
    to: 'george',
    evidenceType: 'Indirect evidence',
    assessment: 'High-confidence assessment',
    statement:
      'George’s placement as Benjamin’s son is accepted in the working tree because multiple independent records converge around the same family network.',
    support: [
      'Benjamin’s proved son-in-law acquired land with George and James L. Meason.',
      'The Kipper, Hollingsworth, Parker, and Meason households remained closely associated.',
      'George’s son later called elder James L. Meason his uncle; James’s death record named Benjamin as his father.',
    ],
    limitation:
      'No reviewed record states in one sentence that George was Benjamin’s son.',
    referenceIds: [1, 28, 33, 59, 60, 61, 62, 63, 64],
  },
  {
    id: 'george-franklin',
    from: 'george',
    to: 'franklin',
    evidenceType: 'Direct statement in a later record',
    assessment: 'Documented relationship',
    statement:
      'Franklin’s death certificate names George M. Meason and Martha Reed as his parents.',
    support: [
      'The parent names appear in the original death record reviewed for the public tree.',
    ],
    limitation:
      'As with every informant-supplied statement, the record is evaluated alongside identity and chronology.',
    referenceIds: [57, 58],
  },
  ...[
    ['franklin', 'james-1892'],
    ['james-1892', 'james-1934'],
    ['james-1934', 'cynthia'],
    ['cynthia', 'shannon'],
  ].map(
    ([from, to], index): Relationship => ({
      id: `${from}-${to}`,
      from,
      to,
      evidenceType:
        index >= 2
          ? 'Family relationship evidence'
          : 'Original-record evidence',
      assessment:
        index >= 2 ? 'Known family relationship' : 'Documented relationship',
      statement:
        'This connection belongs to the reviewed public direct line and is retained from the current family tree.',
      support: [
        index >= 2
          ? 'The relationship retains the family-evidence status used in the reviewed public tree.'
          : 'The reviewed public tree identifies the parent relationship from original records.',
      ],
      limitation:
        'This prototype summarizes the assessment; the production source catalog remains the detailed citation layer.',
      referenceIds: index === 0 ? [56, 57] : index === 1 ? [56] : [],
    })
  ),
];

function Initials({ name }: { name: string }) {
  const parts = name.split(' ');
  return (
    <span aria-hidden="true">
      {parts[0][0]}
      {parts.at(-1)?.[0]}
    </span>
  );
}

function ArrowIcon({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 ${direction === 'down' ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MediaFigure({
  media,
  compact = false,
}: {
  media: PublicMedia;
  compact?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-[#f7f1e8]">
      <a
        href={media.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the full-size image: ${media.title}`}
        className={`group relative block overflow-hidden bg-[#e9e0d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
          compact ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={
            compact
              ? '(max-width: 768px) 100vw, 28rem'
              : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 36rem'
          }
          className={`transition-transform duration-500 group-hover:scale-[1.015] ${
            media.fit === 'contain' ? 'object-contain p-2' : 'object-cover'
          }`}
          style={{ objectPosition: media.objectPosition }}
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-paper">
          Open image ↗
        </span>
      </a>
      <figcaption className={compact ? 'p-4' : 'p-5'}>
        <p className="text-[0.58rem] uppercase tracking-[0.18em] text-accent">
          {media.label}
        </p>
        <h3 className={`mt-2 font-serif ${compact ? 'text-xl' : 'text-2xl'}`}>
          {media.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {media.caption}
          {media.referenceIds ? (
            <SourceFootnote
              referenceIds={media.referenceIds}
              referencesPath="/genealogy"
            />
          ) : null}
        </p>
        {media.limitation ? (
          <p className="mt-3 border-l-2 border-accent/25 pl-3 text-xs leading-relaxed text-ink/65">
            Boundary: {media.limitation}
          </p>
        ) : null}
        <p className="mt-3 text-[0.62rem] leading-relaxed text-ink/65">
          {media.provenance.sourcePage ? (
            <a
              href={media.provenance.sourcePage}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {media.provenance.credit} ↗
            </a>
          ) : (
            media.provenance.credit
          )}
        </p>
      </figcaption>
    </figure>
  );
}

function ImageNeededNote({ need }: { need: PublicImageNeed }) {
  return (
    <aside className="flex flex-col justify-between rounded-2xl border border-dashed border-accent/35 bg-accent/[0.035] p-5 md:col-span-2">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-accent/50 font-serif text-2xl text-accent">
          +
        </div>
        <p className="mt-6 text-[0.58rem] uppercase tracking-[0.18em] text-accent">
          {need.label}
        </p>
        <h3 className="mt-2 font-serif text-2xl">{need.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          {need.description}
        </p>
      </div>
      <p className="mt-5 text-xs italic leading-relaxed text-ink/65">
        Logged for archival follow-up; no substitute is shown as if it were the
        real place or record.
      </p>
    </aside>
  );
}

function MediaShelf({
  media,
  need,
  label,
}: {
  media: readonly PublicMedia[];
  need?: PublicImageNeed;
  label: string;
}) {
  if (media.length === 0 && !need) return null;

  return (
    <section
      aria-label={label}
      className="border-b border-ink/10 bg-[#eee5da]/30 px-6 py-7 sm:px-9 lg:px-12"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-[0.6rem] uppercase tracking-[0.19em] text-accent">
          Visual archive
        </p>
        <p className="text-xs text-ink/65">Evidence and place context</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {media.map((item) => (
          <MediaFigure key={item.id} media={item} />
        ))}
        {need ? <ImageNeededNote need={need} /> : null}
      </div>
    </section>
  );
}

export default function PrototypeExperience() {
  const [mode, setMode] = useState<Mode>('family');
  const [layer, setLayer] = useState<Layer>('family');
  const [selectedPersonId, setSelectedPersonId] = useState('benjamin');
  const [selectedRelationshipId, setSelectedRelationshipId] =
    useState('benjamin-george');
  const [selectedCaseId, setSelectedCaseId] = useState<CaseId>('parentage');
  const [selectedStoryId, setSelectedStoryId] = useState<StoryId>('migration');
  const [caseSections, setCaseSections] = useState<Record<CaseId, string>>({
    parentage: 'record-turn',
    'george-connection': 'evidence-trail',
    'burial-ground': 'record-chain',
  });
  const [storyCheckpoints, setStoryCheckpoints] = useState<
    Record<StoryId, number>
  >({
    migration: 0,
    'between-lines': 0,
    'texas-reconnection': 0,
  });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedPerson =
    people.find((person) => person.id === selectedPersonId) ?? people[0];
  const selectedRelationship =
    relationships.find(
      (relationship) => relationship.id === selectedRelationshipId
    ) ?? relationships[0];

  function selectPerson(id: string) {
    setSelectedPersonId(id);
    const adjoining = relationships.find(
      (relationship) => relationship.from === id || relationship.to === id
    );
    if (adjoining) setSelectedRelationshipId(adjoining.id);
  }

  function onTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % modes.length;
    if (event.key === 'ArrowLeft')
      nextIndex = (index - 1 + modes.length) % modes.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = modes.length - 1;
    setMode(modes[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  function moveTo(nextMode: Mode) {
    setMode(nextMode);
    requestAnimationFrame(() => {
      const panel = document.getElementById('prototype-panel');
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      panel?.focus({ preventScroll: true });
      panel?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  function openCase(caseId: CaseId) {
    setSelectedCaseId(caseId);
    moveTo('case');
  }

  function openStory(storyId: StoryId) {
    setSelectedStoryId(storyId);
    moveTo('story');
  }

  function showBenjaminGeorgeConnection() {
    setSelectedPersonId('george');
    setSelectedRelationshipId('benjamin-george');
    setLayer('evidence');
    moveTo('family');
  }

  return (
    <section className="relative px-4 py-8 sm:px-8 md:py-12">
      <div className="mx-auto max-w-[92rem]">
        <div
          className="mb-8 border-b border-ink/15"
          role="tablist"
          aria-label="Choose a way to explore"
        >
          <div className="grid grid-cols-3 gap-1" role="presentation">
            {modes.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`prototype-tab-${item.id}`}
                role="tab"
                aria-controls="prototype-panel"
                aria-selected={mode === item.id}
                tabIndex={mode === item.id ? 0 : -1}
                onClick={() => setMode(item.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`relative min-w-0 px-2 pb-4 pt-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-6 ${
                  mode === item.id
                    ? 'text-ink'
                    : 'text-ink/65 hover:text-ink/80'
                }`}
              >
                <span className="block text-[0.6rem] uppercase tracking-[0.2em]">
                  0{index + 1}
                </span>
                <span className="mt-1 block font-serif text-base leading-tight sm:text-xl">
                  {item.label}
                </span>
                {mode === item.id ? (
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div
          id="prototype-panel"
          role="tabpanel"
          aria-labelledby={`prototype-tab-${mode}`}
          tabIndex={0}
          className="scroll-mt-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {mode === 'family' ? (
            <FamilyAtlas
              layer={layer}
              onLayerChange={setLayer}
              selectedPerson={selectedPerson}
              selectedRelationship={selectedRelationship}
              onPersonSelect={selectPerson}
              onRelationshipSelect={setSelectedRelationshipId}
              onOpenCase={openCase}
              onOpenStory={openStory}
            />
          ) : null}
          {mode === 'case' ? (
            <OpenCase
              selectedCaseId={selectedCaseId}
              onSelectCase={setSelectedCaseId}
              selectedSectionId={caseSections[selectedCaseId]}
              onSelectSection={(sectionId) =>
                setCaseSections((current) => ({
                  ...current,
                  [selectedCaseId]: sectionId,
                }))
              }
              onOpenStory={openStory}
              onShowConnection={showBenjaminGeorgeConnection}
            />
          ) : null}
          {mode === 'story' ? (
            <FamilyStory
              selectedStoryId={selectedStoryId}
              onSelectStory={setSelectedStoryId}
              selectedEventIndex={storyCheckpoints[selectedStoryId]}
              onSelectEvent={(eventIndex) =>
                setStoryCheckpoints((current) => ({
                  ...current,
                  [selectedStoryId]: eventIndex,
                }))
              }
              onOpenCase={openCase}
              onShowConnection={showBenjaminGeorgeConnection}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FamilyAtlas({
  layer,
  onLayerChange,
  selectedPerson,
  selectedRelationship,
  onPersonSelect,
  onRelationshipSelect,
  onOpenCase,
  onOpenStory,
}: {
  layer: Layer;
  onLayerChange: (layer: Layer) => void;
  selectedPerson: Person;
  selectedRelationship: Relationship;
  onPersonSelect: (id: string) => void;
  onRelationshipSelect: (id: string) => void;
  onOpenCase: (caseId: CaseId) => void;
  onOpenStory: (storyId: StoryId) => void;
}) {
  const selectedPersonMediaId = personMediaIds[selectedPerson.id];
  const selectedPersonMedia = selectedPersonMediaId
    ? mediaCatalog[selectedPersonMediaId]
    : undefined;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="min-w-0 overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fbf8f2] shadow-[0_28px_80px_rgba(38,27,20,0.06)]">
        <div className="flex flex-col gap-5 border-b border-ink/10 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-accent">
              The family atlas
            </p>
            <h2 className="mt-1 font-serif text-2xl">
              One line, several ways to read it
            </h2>
          </div>
          <fieldset>
            <legend className="sr-only">
              Choose a prototype information layer
            </legend>
            <div className="inline-flex rounded-full border border-ink/10 bg-paper/60 p-1">
              {(['family', 'evidence', 'places'] as Layer[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={layer === item}
                  onClick={() => onLayerChange(item)}
                  className={`rounded-full px-3 py-2 text-xs capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                    layer === item
                      ? 'bg-ink text-paper'
                      : 'text-ink/65 hover:text-ink'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="border-b border-ink/10 bg-[#eee5da]/45 px-5 py-3 text-xs leading-relaxed text-ink/65 sm:px-7">
          {layer === 'family'
            ? 'Family layer · the reviewed public direct line. Select a person or a connection.'
            : layer === 'evidence'
              ? 'Evidence layer · each connection retains its reviewed evidence label; the dashed edge marks George’s accepted indirect placement.'
              : 'Places layer · place labels are broad public context, not precise private locators or a migration animation.'}
        </div>

        <div className="overflow-x-auto px-5 py-10 sm:px-8 lg:py-14">
          <div className="flex min-w-[70rem] items-center">
            {people.map((person, index) => {
              const relationship = relationships[index];
              const isSelected = selectedPerson.id === person.id;
              const personMediaId = personMediaIds[person.id];
              const personMedia: PublicMedia | undefined = personMediaId
                ? mediaCatalog[personMediaId]
                : undefined;
              const hasPortrait = personMedia?.kind === 'portrait';
              return (
                <div key={person.id} className="contents">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onPersonSelect(person.id)}
                    className={`group w-[8.75rem] shrink-0 rounded-2xl border p-3 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                      isSelected
                        ? 'border-accent bg-accent/[0.07] shadow-[0_14px_35px_rgba(153,72,47,0.12)]'
                        : 'border-ink/10 bg-paper hover:-translate-y-1 hover:border-accent/35'
                    }`}
                  >
                    <span
                      className={`relative mb-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border font-serif ${
                        person.status === 'indirect'
                          ? 'border-dashed border-accent/70 text-accent'
                          : 'border-accent/25 bg-accent/[0.06] text-ink/65'
                      }`}
                    >
                      {hasPortrait ? (
                        <Image
                          src={personMedia.src}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover grayscale transition-all group-hover:grayscale-0"
                          style={{
                            objectPosition:
                              personMedia.objectPosition ?? '50% 35%',
                          }}
                        />
                      ) : (
                        <Initials name={person.name} />
                      )}
                    </span>
                    <span className="block font-serif text-base leading-tight">
                      {person.name}
                    </span>
                    <span className="mt-2 block text-[0.63rem] uppercase tracking-[0.12em] text-ink/65">
                      {layer === 'places' ? person.place : person.period}
                    </span>
                  </button>

                  {relationship ? (
                    <button
                      type="button"
                      onClick={() => onRelationshipSelect(relationship.id)}
                      aria-label={`Inspect the relationship between ${person.name} and ${people[index + 1].name}`}
                      aria-pressed={selectedRelationship.id === relationship.id}
                      className="group relative flex h-12 w-10 shrink-0 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span
                        className={`h-px w-full border-t ${
                          relationship.id === 'benjamin-george'
                            ? 'border-dashed border-accent'
                            : 'border-ink/30'
                        } ${
                          selectedRelationship.id === relationship.id
                            ? 'border-t-2'
                            : ''
                        }`}
                      />
                      <span
                        className={`absolute h-2.5 w-2.5 rounded-full border bg-[#fbf8f2] transition-transform group-hover:scale-125 ${
                          relationship.id === 'benjamin-george'
                            ? 'border-accent'
                            : 'border-ink/35'
                        }`}
                      />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid border-t border-ink/10 md:grid-cols-2">
          <div className="border-b border-ink/10 p-5 sm:p-7 md:border-b-0 md:border-r">
            <p className="text-[0.62rem] uppercase tracking-[0.19em] text-accent">
              Selected person
            </p>
            <h3 className="mt-2 font-serif text-2xl">{selectedPerson.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink/65">
              {selectedPerson.relation}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              {selectedPerson.summary}
            </p>
            {selectedPersonMedia ? (
              <div className="mt-6">
                <MediaFigure media={selectedPersonMedia} compact />
              </div>
            ) : null}
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.19em] text-accent">
                  Selected connection
                </p>
                <h3 className="mt-2 font-serif text-xl">
                  {
                    people.find(
                      (person) => person.id === selectedRelationship.from
                    )?.name
                  }{' '}
                  →{' '}
                  {
                    people.find(
                      (person) => person.id === selectedRelationship.to
                    )?.name
                  }
                </h3>
              </div>
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-accent bg-accent/[0.08]" />
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-ink/10 bg-paper/70 p-3">
                <dt className="text-[0.58rem] uppercase tracking-[0.17em] text-ink/65">
                  Evidence type
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink/80">
                  {selectedRelationship.evidenceType}
                </dd>
              </div>
              <div className="rounded-xl border border-accent/25 bg-accent/[0.045] p-3">
                <dt className="text-[0.58rem] uppercase tracking-[0.17em] text-accent">
                  Assessment
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink/80">
                  {selectedRelationship.assessment}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              {selectedRelationship.statement}
              {selectedRelationship.referenceIds.length > 0 ? (
                <SourceFootnote
                  referenceIds={selectedRelationship.referenceIds}
                  referencesPath="/genealogy"
                />
              ) : null}
            </p>
            <details className="group mt-4 border-t border-ink/10 pt-4">
              <summary className="cursor-pointer list-none text-sm font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <span className="inline-flex items-center gap-2">
                  Why I believe this connection
                  <span className="transition-transform group-open:rotate-90">
                    <ArrowIcon />
                  </span>
                </span>
              </summary>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/65">
                {selectedRelationship.support.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-l-2 border-ink/15 pl-3 text-sm italic leading-relaxed text-ink/65">
                Limitation: {selectedRelationship.limitation}
              </p>
            </details>
          </div>
        </div>
      </div>

      <aside className="rounded-[2rem] bg-ink p-6 text-paper shadow-[0_28px_80px_rgba(38,27,20,0.15)] sm:p-8">
        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-accent-soft">
          Where the line stops
        </p>
        <div className="my-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-paper/35 font-serif text-2xl text-paper/70">
            ?
          </span>
          <div>
            <h2 className="font-serif text-2xl text-paper">
              Benjamin’s parents
            </h2>
            <p className="mt-1 text-sm text-paper/70">
              Unknown · active investigation
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-paper/70">
          No parent is shown above Benjamin. The records place him inside Joseph
          Meason’s inheritance network, but do not identify his exact branch.
        </p>
        <div
          className="mt-6 space-y-3"
          role="group"
          aria-label="Parentage hypotheses outside the default tree"
        >
          {[
            ['Thomas branch', 'Serious candidate · unproved'],
            ['Another sibling branch', 'Open explanation'],
            ['Unidentified Meason branch', 'Still possible'],
          ].map(([name, status]) => (
            <div
              key={name}
              className="rounded-xl border border-paper/10 bg-paper/[0.035] p-3"
            >
              <p className="font-serif text-paper/85">{name}</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.15em] text-paper/70">
                {status}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-paper/70">
          These hypotheses stay outside the default tree until relationship
          evidence selects one.
        </p>
        <button
          type="button"
          onClick={() => onOpenCase('parentage')}
          className="mt-7 inline-flex w-full items-center justify-between rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
        >
          Open the parentage case
          <ArrowIcon />
        </button>
        <div className="mt-4 grid gap-3 border-t border-paper/10 pt-5">
          <button
            type="button"
            onClick={() => onOpenCase('george-connection')}
            className="inline-flex items-center justify-between text-left text-sm text-accent-soft underline decoration-accent-soft/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
          >
            Follow George’s connection <ArrowIcon />
          </button>
          <button
            type="button"
            onClick={() => onOpenStory('between-lines')}
            className="inline-flex items-center justify-between text-left text-sm text-accent-soft underline decoration-accent-soft/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
          >
            Read the household story <ArrowIcon />
          </button>
        </div>
      </aside>
    </div>
  );
}

function CollectionSelector({
  eyebrow,
  label,
  items,
  selectedId,
  onSelect,
}: {
  eyebrow: string;
  label: string;
  items: readonly {
    id: string;
    number: string;
    title: string;
    status: string;
  }[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section
      aria-label={label}
      className="rounded-[1.75rem] border border-ink/10 bg-paper/55 p-4 sm:p-5"
    >
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.19em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-2xl">{label}</h2>
        </div>
        <p className="hidden text-xs uppercase tracking-[0.15em] text-ink/65 sm:block">
          {items.length} entries
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {items.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(item.id)}
              className={`min-h-32 rounded-2xl border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                selected
                  ? 'border-accent bg-accent/[0.07] shadow-[0_10px_30px_rgba(140,90,43,0.08)]'
                  : 'border-ink/10 bg-paper/70 hover:border-accent/35 hover:bg-paper'
              }`}
            >
              <span className="text-[0.58rem] uppercase tracking-[0.18em] text-accent">
                {item.number}
              </span>
              <span className="mt-3 block font-serif text-xl leading-tight">
                {item.title}
              </span>
              <span className="mt-3 block text-xs leading-relaxed text-ink/65">
                {item.status}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CaseSectionCards({ section }: { section: CaseSection }) {
  return (
    <div>
      <h3 className="max-w-3xl font-serif text-2xl sm:text-3xl">
        {section.heading}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/65">
        {section.intro}
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {section.cards.map((card) => (
          <article
            key={`${section.id}-${card.title}`}
            className={`rounded-2xl border p-5 ${
              card.tone === 'limit'
                ? 'border-dashed border-ink/20 bg-transparent'
                : card.tone === 'inference'
                  ? 'border-accent/25 bg-accent/[0.035]'
                  : 'border-ink/10 bg-paper/65'
            }`}
          >
            <p className="text-[0.58rem] uppercase tracking-[0.17em] text-accent">
              {card.eyebrow}
            </p>
            <h4 className="mt-5 font-serif text-xl leading-tight">
              {card.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {card.detail}
              {card.referenceIds && card.referenceIds.length > 0 ? (
                <SourceFootnote
                  referenceIds={card.referenceIds}
                  referencesPath="/genealogy"
                />
              ) : null}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function OpenCase({
  selectedCaseId,
  onSelectCase,
  selectedSectionId,
  onSelectSection,
  onOpenStory,
  onShowConnection,
}: {
  selectedCaseId: CaseId;
  onSelectCase: (caseId: CaseId) => void;
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
  onOpenStory: (storyId: StoryId) => void;
  onShowConnection: () => void;
}) {
  const selectedCase =
    researchCases.find((item) => item.id === selectedCaseId) ??
    researchCases[0];
  const selectedSection =
    selectedCase.sections.find((item) => item.id === selectedSectionId) ??
    selectedCase.sections[0];
  const selectedCaseMedia = caseMediaIds[selectedCase.id].map(
    (mediaId) => mediaCatalog[mediaId]
  );
  const selectedCaseImageNeed = caseImageNeeds[selectedCase.id];

  return (
    <div className="space-y-6">
      <CollectionSelector
        eyebrow="Research case collection"
        label="Choose a question"
        items={researchCases.map((item) => ({
          id: item.id,
          number: item.number,
          title: item.shortTitle,
          status: item.assessment,
        }))}
        selectedId={selectedCase.id}
        onSelect={(id) => onSelectCase(id as CaseId)}
      />

      <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fbf8f2] shadow-[0_28px_80px_rgba(38,27,20,0.06)]">
        <div className="grid xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="p-6 sm:p-9 lg:p-12">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-accent">
              Research case {selectedCase.number}
            </p>
            <h2 className="mt-4 max-w-3xl text-balance font-serif text-4xl leading-tight sm:text-5xl">
              {selectedCase.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/65">
              {selectedCase.summary}
              <SourceFootnote
                referenceIds={selectedCase.referenceIds}
                referencesPath="/genealogy"
              />
            </p>

            <div className="-mx-6 mt-8 sm:-mx-9 lg:-mx-12">
              <MediaShelf
                media={selectedCaseMedia}
                need={selectedCaseImageNeed}
                label={`Visual archive for ${selectedCase.shortTitle}`}
              />
            </div>

            <div
              className="mt-9 flex gap-2 overflow-x-auto border-b border-ink/10"
              role="group"
              aria-label="Open case evidence sections"
            >
              {selectedCase.sections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selectedSection.id === item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`min-w-fit border-b-2 px-1 pb-3 pr-5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                    selectedSection.id === item.id
                      ? 'border-accent text-ink'
                      : 'border-transparent text-ink/65 hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="min-h-[24rem] pt-8">
              {selectedCase.id === 'parentage' &&
              selectedSection.id === 'record-turn' ? (
                <RecordTurn section={selectedSection} />
              ) : selectedCase.id === 'parentage' &&
                selectedSection.id === 'explanations' ? (
                <Explanations section={selectedSection} />
              ) : selectedCase.id === 'parentage' &&
                selectedSection.id === 'change' ? (
                <ConclusionTests section={selectedSection} />
              ) : (
                <CaseSectionCards section={selectedSection} />
              )}
            </div>
          </div>

          <aside className="border-t border-ink/10 bg-[#eee5da]/65 p-6 sm:p-8 xl:border-l xl:border-t-0 xl:p-9">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-accent">
              Current assessment
            </p>
            <p className="mt-4 font-serif text-2xl">
              {selectedCase.assessment}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {selectedCase.summary}
            </p>
            <dl className="mt-7 space-y-5 border-t border-ink/10 pt-6">
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.17em] text-ink/65">
                  Known
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/70">
                  {selectedCase.known}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.17em] text-ink/65">
                  Not established
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/70">
                  {selectedCase.unknown}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.17em] text-ink/65">
                  People in this case
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/70">
                  {selectedCase.relatedPeople.join(' · ')}
                </dd>
              </div>
            </dl>
            <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
              {selectedCase.relatedStories.map((storyId) => {
                const story = storyChapters.find((item) => item.id === storyId);
                return story ? (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => onOpenStory(story.id)}
                    className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Read “{story.shortTitle}” <ArrowIcon />
                  </button>
                ) : null;
              })}
              {selectedCase.id === 'george-connection' ? (
                <button
                  type="button"
                  onClick={onShowConnection}
                  className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Inspect the tree connection <ArrowIcon />
                </button>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function RecordTurn({ section }: { section: CaseSection }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {section.cards.map((card, index) => (
        <li
          key={card.title}
          className="relative rounded-2xl border border-ink/10 bg-paper/65 p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.18em] text-accent">
              {card.eyebrow}
            </span>
            <span className="font-serif text-2xl text-ink/20">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-8 font-serif text-xl leading-tight">
            {card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            {card.detail}
            {card.referenceIds ? (
              <SourceFootnote
                referenceIds={card.referenceIds}
                referencesPath="/genealogy"
              />
            ) : null}
          </p>
          {index < section.cards.length - 1 ? (
            <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-[#fbf8f2] text-accent md:flex">
              <ArrowIcon />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function Explanations({ section }: { section: CaseSection }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {section.cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-ink/10 p-5"
        >
          <span className="inline-block rounded-full border border-accent/25 bg-accent/[0.045] px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-accent">
            {card.eyebrow}
          </span>
          <h3 className="mt-5 font-serif text-2xl">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            {card.detail}
            {card.referenceIds ? (
              <SourceFootnote
                referenceIds={card.referenceIds}
                referencesPath="/genealogy"
              />
            ) : null}
          </p>
        </article>
      ))}
    </div>
  );
}

function ConclusionTests({ section }: { section: CaseSection }) {
  return (
    <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <h3 className="font-serif text-2xl">
          A record must select a branch—not merely repeat a name.
        </h3>
        <ul className="mt-6 space-y-4">
          {section.cards.map((card) => (
            <li
              key={card.title}
              className="flex gap-4 border-b border-ink/10 pb-4 text-sm leading-relaxed text-ink/65"
            >
              <span
                className="mt-0.5 font-serif text-accent"
                aria-hidden="true"
              >
                →
              </span>
              <span>
                <strong className="block font-medium text-ink">
                  {card.title}
                </strong>
                {card.detail}
                {card.referenceIds ? (
                  <SourceFootnote
                    referenceIds={card.referenceIds}
                    referencesPath="/genealogy"
                  />
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-ink p-5 text-paper">
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-accent-soft">
          The rule
        </p>
        <p className="mt-4 font-serif text-xl leading-relaxed text-paper">
          A plausible explanation earns a place in the case file. Evidence earns
          a place in the tree.
        </p>
      </div>
    </div>
  );
}

function FamilyStory({
  selectedStoryId,
  onSelectStory,
  selectedEventIndex,
  onSelectEvent,
  onOpenCase,
  onShowConnection,
}: {
  selectedStoryId: StoryId;
  onSelectStory: (storyId: StoryId) => void;
  selectedEventIndex: number;
  onSelectEvent: (eventIndex: number) => void;
  onOpenCase: (caseId: CaseId) => void;
  onShowConnection: () => void;
}) {
  const selectedStory =
    storyChapters.find((item) => item.id === selectedStoryId) ??
    storyChapters[0];
  const selectedEvent =
    selectedStory.events[selectedEventIndex] ?? selectedStory.events[0];
  const selectedStoryMedia = storyMediaIds[selectedStory.id].map(
    (mediaId) => mediaCatalog[mediaId]
  );
  const selectedStoryImageNeed = storyImageNeeds[selectedStory.id];

  return (
    <div className="space-y-6">
      <CollectionSelector
        eyebrow="Family chronicle collection"
        label="Choose a chapter"
        items={storyChapters.map((item) => ({
          id: item.id,
          number: item.number,
          title: item.shortTitle,
          status: `${item.period} · ${item.summary}`,
        }))}
        selectedId={selectedStory.id}
        onSelect={(id) => onSelectStory(id as StoryId)}
      />

      <article className="overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fbf8f2] shadow-[0_28px_80px_rgba(38,27,20,0.06)]">
        <header className="grid border-b border-ink/10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="p-6 sm:p-9 lg:p-12">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-accent">
              Family chronicle · Chapter {selectedStory.number}
            </p>
            <h2 className="mt-4 max-w-3xl text-balance font-serif text-4xl leading-tight sm:text-6xl">
              {selectedStory.title}
            </h2>
            <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-ink/65">
              {selectedStory.summary}
            </p>
          </div>
          <div className="flex items-end bg-[#eee5da]/65 p-6 sm:p-8 lg:border-l lg:border-ink/10">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.19em] text-ink/65">
                Reading key
              </p>
              <div className="mt-4 space-y-3 text-sm text-ink/65">
                <p className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" /> The
                  record states
                </p>
                <p className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full border border-dashed border-ink/50" />{' '}
                  The evidence suggests
                </p>
              </div>
            </div>
          </div>
        </header>

        <MediaShelf
          media={selectedStoryMedia}
          need={selectedStoryImageNeed}
          label={`Visual archive for ${selectedStory.shortTitle}`}
        />

        <section
          className="border-b border-ink/10 bg-[#eee5da]/35 px-6 py-6 sm:px-9 lg:px-12"
          aria-labelledby="time-lens-heading"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p
                id="time-lens-heading"
                className="text-[0.62rem] uppercase tracking-[0.19em] text-accent"
              >
                Time lens
              </p>
              <p className="mt-1 text-sm text-ink/65">
                Move through the documented route one checkpoint at a time.
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {selectedStory.events.map((event, index) => (
                <button
                  key={`${event.year}-${event.place}`}
                  type="button"
                  aria-label={`${event.year}, ${event.place}`}
                  aria-pressed={selectedEventIndex === index}
                  onClick={() => onSelectEvent(index)}
                  className={`min-w-32 rounded-2xl border px-3 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    selectedEventIndex === index
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/15 bg-paper/70 text-ink/65 hover:border-accent/40 hover:text-ink'
                  }`}
                >
                  <span className="block font-medium">{event.year}</span>
                  <span
                    className={`mt-0.5 block text-[0.6rem] leading-tight ${
                      selectedEventIndex === index
                        ? 'text-paper/70'
                        : 'text-ink/65'
                    }`}
                  >
                    {event.place}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 rounded-xl border border-ink/10 bg-paper/55 px-4 py-3 text-sm text-ink/70">
            <span className="mr-2 text-[0.58rem] uppercase tracking-[0.16em] text-accent">
              Selected checkpoint
            </span>
            {selectedEvent.year} · {selectedEvent.place}
          </p>

          <div className="mt-6 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 text-center text-[0.62rem] uppercase tracking-[0.13em] text-ink/65">
            {selectedStory.routePlaces.map((place, index) => {
              const reached = index <= selectedEvent.routeIndex;
              return (
                <div key={place} className="contents">
                  {index > 0 ? (
                    <span
                      className={`h-px ${reached ? 'bg-accent' : 'bg-ink/15'}`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={`rounded-full border px-3 py-2 ${
                      reached
                        ? 'border-accent/40 bg-accent/[0.06] text-accent'
                        : 'border-ink/10 bg-paper/50'
                    }`}
                  >
                    {place}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="relative p-6 sm:p-9 lg:p-12">
          <div
            className="absolute bottom-12 left-[2.1rem] top-12 w-px bg-ink/10 sm:left-[3.75rem] lg:left-[4.75rem]"
            aria-hidden="true"
          />
          <ol className="relative space-y-10">
            {selectedStory.events.map((event, index) => (
              <li
                key={`${event.year}-${event.place}`}
                aria-current={selectedEventIndex === index ? 'step' : undefined}
                className={`grid gap-5 rounded-2xl pl-9 transition-colors sm:pl-12 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8 ${
                  selectedEventIndex === index
                    ? 'bg-accent/[0.025]'
                    : 'hover:bg-paper/50'
                }`}
              >
                <div>
                  <span className="absolute left-[0.6rem] mt-1.5 h-3 w-3 rounded-full border-2 border-[#fbf8f2] bg-accent ring-1 ring-accent sm:left-[1.95rem] lg:left-[2.95rem]" />
                  <p className="font-serif text-2xl text-accent">
                    {event.year}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.13em] text-ink/65">
                    {event.place}
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <section className="rounded-2xl border border-accent/20 bg-accent/[0.035] p-5">
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-accent">
                      The record states
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {event.record}
                      <SourceFootnote
                        referenceIds={event.referenceIds}
                        referencesPath="/genealogy"
                      />
                    </p>
                  </section>
                  <section className="rounded-2xl border border-dashed border-ink/20 p-5">
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-ink/65">
                      The evidence suggests
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">
                      {event.interpretation}
                    </p>
                  </section>
                </div>
              </li>
            ))}
          </ol>
          <p className="sr-only" aria-live="polite">
            Selected checkpoint: {selectedEvent.year}, {selectedEvent.place}.
          </p>
        </div>

        <footer className="grid gap-5 border-t border-ink/10 bg-[#eee5da]/45 p-6 sm:px-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-12">
          <p className="max-w-2xl text-sm leading-relaxed text-ink/65">
            This chapter stops where the records stop: it names documented
            movement, households, and relationships without supplying private
            motives the evidence never recorded.
          </p>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {selectedStory.relatedCases.map((caseId) => {
              const relatedCase = researchCases.find(
                (item) => item.id === caseId
              );
              return relatedCase ? (
                <button
                  key={relatedCase.id}
                  type="button"
                  onClick={() => onOpenCase(relatedCase.id)}
                  className="inline-flex items-center gap-2 text-left text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Open “{relatedCase.shortTitle}” <ArrowIcon />
                </button>
              ) : null;
            })}
            {selectedStory.id !== 'migration' ? (
              <button
                type="button"
                onClick={onShowConnection}
                className="inline-flex items-center gap-2 text-left text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Inspect George’s tree connection <ArrowIcon />
              </button>
            ) : null}
          </div>
        </footer>
      </article>
    </div>
  );
}
