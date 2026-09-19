'use client';

import {
  highlandCreekReconstruction,
  type ReconstructionEdge,
  type ReconstructionNode,
} from '@where-the-record-ends/genealogy-content';
import { useMemo, useRef, useState } from 'react';

import { ReferenceLinks } from '@/components/ReferenceLinks';

type ViewMode = 'family' | 'deeds';
type EvidenceFilter = 'all' | 'recorded';
type EdgeWithKind = ReconstructionEdge;

const item = highlandCreekReconstruction;

const evidenceLabels = {
  recorded: 'Recorded connection',
  'identity-synthesis': 'Identity synthesis',
  hypothesis: 'Open hypothesis',
} as const;

const evidenceStyles = {
  recorded: 'border-ink/20 bg-ink text-paper',
  'identity-synthesis': 'border-moss/35 bg-moss/[0.12] text-ink',
  hypothesis: 'border-accent/40 bg-accent text-paper',
} as const;

const connectionLabels: Record<string, string> = {
  spouse: 'Spouse',
  'parent-child': 'Parent and child',
  sibling: 'Siblings',
  'heirship-unknown-degree': 'Heirship; degree unknown',
  identity: 'Possible same identity',
  'open-parentage-hypothesis': 'Open parentage hypothesis',
  'deed-property-transfer': 'Deed / property transfer',
  'land-title-association': 'Land / title association',
  'legal-record-role': 'Named legal-record role',
};

const recordGroupLabels = {
  'will-1779': "Thomas Meason senior's 1779 will",
  'logan-1795': 'Logan County deed group',
  'highland-creek': 'Highland Creek heir records',
} as const;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const titleReferenceIds = [22, 69, 70, 68, 67] as const;
type TitleReferenceId = (typeof titleReferenceIds)[number];

// A citation can corroborate an identity without naming that person in the
// selected record. Keep record membership explicit so the deed network does
// not turn supporting citations into invented appearances.
const deedParticipantIdsByReference: Record<
  TitleReferenceId,
  readonly string[]
> = {
  22: ['logan-thomas', 'logan-william', 'highland-joseph'],
  69: [
    'logan-thomas',
    'logan-william',
    'title-james-wardlow',
    'title-leonard-jones',
  ],
  70: [
    'title-edmond-rice',
    'title-james-wardlow',
    'title-leonard-jones',
    'title-higgins',
  ],
  68: [
    'highland-joseph',
    'highland-john',
    'highland-samuel-brother',
    'highland-isaac-john-son',
    'highland-caty-randal',
    'highland-polly-devore',
    'highland-betty-cherry',
    'highland-dorsey',
    'highland-isaac-heir',
    'highland-elizabeth-hite',
    'highland-samuel-grantee',
  ],
  67: ['highland-joseph', 'highland-benjamin', 'highland-james-grantee'],
};

const deedRecordOptions = [
  {
    id: 'all',
    label: 'All title records',
    date: '1795–1813',
    availability:
      'Source links are available for every record. Page-image sequences are identified for references 67 and 68, but publication permission is still required.',
  },
  {
    id: 22,
    label: 'Joseph’s gift to William',
    date: '2 February 1795',
    availability:
      'The source record is cited. No publishable page image is currently available here.',
  },
  {
    id: 69,
    label: 'William’s title conveyance',
    date: '27 April 1811',
    availability:
      'The source record is cited. No publishable page image is currently available here.',
  },
  {
    id: 70,
    label: 'Wardlow and Jones v. Higgins',
    date: '11 March 1812',
    availability:
      'A derivative case abstract is cited; no original case-file image is currently available here.',
  },
  {
    id: 68,
    label: 'Collateral heirs’ deed',
    date: '14 May 1813',
    availability:
      'The original deed-page sequence is identified, but images cannot be displayed until publication permission is resolved.',
  },
  {
    id: 67,
    label: 'Benjamin’s heir deed',
    date: '7 July 1813',
    availability:
      'The original deed-page sequence is identified, but images cannot be displayed until publication permission is resolved.',
  },
] as const;

const authoredBranches = [
  {
    id: 'thomas-household',
    eyebrow: 'Recorded in the 1779 will',
    title: 'Thomas Meason senior’s household',
    note: 'Ann is recorded only as Thomas’s wife. This view does not identify her as the mother of any named child.',
    rootIds: ['will-thomas-senior', 'will-ann'],
    memberIds: [
      'will-thomas',
      'will-joseph',
      'will-samuel',
      'will-isaac',
      'will-george',
      'will-john',
      'will-elizabeth',
      'will-jane',
      'will-rachel-worthington',
      'will-sarah-prescot',
      'will-mary',
    ],
  },
  {
    id: 'logan-father-son',
    eyebrow: 'Recorded in the 1795 deed',
    title: 'The Logan County father and son',
    note: 'William is explicitly called the eldest son of Thomas Mason of Logan County. Their possible links to same-name people in other records remain separate identity questions.',
    rootIds: ['logan-thomas'],
    memberIds: ['logan-william'],
  },
  {
    id: 'joseph-siblings',
    eyebrow: 'Recorded collateral-heir family',
    title: 'Joseph Meason and his brothers',
    note: 'The collateral-heir deed directly identifies John and Samuel—shown in their own branches below—as Joseph’s brothers, without naming their parents.',
    rootIds: ['highland-joseph'],
    memberIds: [],
  },
  {
    id: 'john-branch',
    eyebrow: 'Recorded collateral-heir branch',
    title: 'John Mason’s branch',
    note: 'The deed identifies John as Joseph’s brother and names these four people as John’s children.',
    rootIds: ['highland-john'],
    memberIds: [
      'highland-isaac-john-son',
      'highland-caty-randal',
      'highland-polly-devore',
      'highland-betty-cherry',
    ],
  },
  {
    id: 'samuel-branch',
    eyebrow: 'Recorded collateral-heir branch',
    title: 'Samuel Mason’s branch',
    note: 'The deed identifies Samuel as Joseph’s brother and Dorsey as Samuel’s son.',
    rootIds: ['highland-samuel-brother'],
    memberIds: ['highland-dorsey'],
  },
] as const;

function wordsFromKind(kind: string | undefined, relationship: string) {
  if (!kind) return relationship;
  return (
    connectionLabels[kind] ??
    kind
      .split('-')
      .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
      .join(' ')
  );
}

function recordGroupLabel(node: ReconstructionNode) {
  if (node.kind === 'record') {
    return '1812 ejectment case / derivative abstract';
  }
  return recordGroupLabels[node.recordGroup];
}

function PersonButton({
  node,
  selected,
  onSelect,
  compact = false,
}: {
  node: ReconstructionNode;
  selected: boolean;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(node.id)}
      className={`w-full rounded-xl border text-left transition ${focusRing} ${
        selected
          ? 'border-accent bg-accent/[0.08] shadow-paper'
          : 'border-ink/10 bg-paper hover:border-accent/40 hover:bg-accent/[0.035]'
      } ${compact ? 'p-3' : 'p-4'}`}
    >
      <span className="block font-serif text-lg leading-tight sm:text-xl">
        {node.label}
      </span>
      <span className="mt-1.5 block text-[0.52rem] font-semibold uppercase tracking-[0.13em] text-ink/70">
        {recordGroupLabel(node)}
      </span>
    </button>
  );
}

function EdgeBadges({ edge }: { edge: EdgeWithKind }) {
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      <span
        className={`rounded-full border px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] ${evidenceStyles[edge.evidenceState]}`}
      >
        {evidenceLabels[edge.evidenceState]}
      </span>
      <span className="rounded-full border border-ink/15 bg-paper px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] text-ink/70">
        {wordsFromKind(edge.connectionKind, edge.relationship)}
      </span>
    </span>
  );
}

function DesktopFamilyDiagram({
  nodeById,
  visibleEdges,
  selectedId,
  onSelect,
}: {
  nodeById: ReadonlyMap<string, ReconstructionNode>;
  visibleEdges: readonly EdgeWithKind[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}) {
  const getNode = (id: string) => nodeById.get(id);
  const willChildren = authoredBranches[0].memberIds
    .map(getNode)
    .filter((node): node is ReconstructionNode => Boolean(node));
  const showInterpretiveConnections = visibleEdges.some(
    (edge) => edge.evidenceState !== 'recorded'
  );
  const showParentageHypothesis = visibleEdges.some(
    (edge) => edge.id === 'hypothesis-thomas-benjamin'
  );
  const laterIdentities = [
    {
      willLabel: 'Thomas named above',
      nodeId: 'logan-thomas',
      edgeId: 'synthesis-thomas',
    },
    {
      willLabel: 'Joseph named above',
      nodeId: 'highland-joseph',
      edgeId: 'synthesis-joseph',
    },
    {
      willLabel: 'John named above',
      nodeId: 'highland-john',
      edgeId: 'synthesis-john',
    },
    {
      willLabel: 'Samuel named above',
      nodeId: 'highland-samuel-brother',
      edgeId: 'synthesis-samuel',
    },
  ] as const;

  return (
    <section
      aria-labelledby="desktop-family-tree"
      className="hidden rounded-[1.5rem] border border-ink/10 bg-cream p-6 xl:block"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow !text-[0.52rem]">One visual family tree</p>
          <h4 id="desktop-family-tree" className="mt-2 font-serif text-2xl">
            Recorded family, with interpretive bridges kept visible
          </h4>
        </div>
        <p className="max-w-sm text-right text-xs leading-relaxed text-ink/70">
          Connector labels carry the meaning. Lines organize the view; they do
          not add evidence.
        </p>
      </div>

      <div className="mt-7 max-w-full overflow-x-auto rounded-xl border border-ink/10 bg-paper p-6">
        <div className="mx-auto min-w-[92rem]">
          <div className="mx-auto grid w-[34rem] grid-cols-[1fr_auto_1fr] items-center gap-3">
            {getNode('will-thomas-senior') && (
              <PersonButton
                node={getNode('will-thomas-senior')!}
                selected={selectedId === 'will-thomas-senior'}
                onSelect={onSelect}
              />
            )}
            <div className="flex flex-col items-center">
              <span className="rounded-full border border-ink/20 bg-ink px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-paper">
                Recorded spouses
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-ink/35" />
            </div>
            {getNode('will-ann') && (
              <PersonButton
                node={getNode('will-ann')!}
                selected={selectedId === 'will-ann'}
                onSelect={onSelect}
              />
            )}
          </div>
          <p className="mx-auto mt-3 w-fit rounded-lg border border-accent/25 bg-accent/[0.05] px-4 py-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-accent">
            Ann is named as Thomas’s wife—not as mother of the children below
          </p>

          <p className="mx-auto mt-8 w-fit rounded-full border border-ink/15 bg-cream px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
            Eleven children named by Thomas Meason senior in his 1779 will
          </p>
          <div aria-hidden="true" className="mx-auto h-4 w-px bg-ink/30" />
          <div
            aria-hidden="true"
            className="mx-[4.5rem] border-t border-ink/25"
          />
          <ul className="grid grid-cols-11 gap-3">
            {willChildren.map((node) => (
              <li key={node.id} className="relative pt-4">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-4 w-px bg-ink/25"
                />
                <PersonButton
                  node={node}
                  selected={selectedId === node.id}
                  onSelect={onSelect}
                  compact
                />
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 grid max-w-[78rem] grid-cols-4 items-start gap-5">
            {laterIdentities.map((identity) => {
              const node = getNode(identity.nodeId);
              const synthesisEdge = visibleEdges.find(
                (edge) => edge.id === identity.edgeId
              );
              if (!node) return null;

              return (
                <div key={identity.nodeId} className="text-center">
                  {synthesisEdge && (
                    <>
                      <p className="text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-ink/70">
                        {identity.willLabel}
                      </p>
                      <div
                        aria-hidden="true"
                        className="mx-auto h-5 border-l border-dashed border-moss/60"
                      />
                    </>
                  )}
                  <p
                    className={`mx-auto mb-3 w-fit rounded-full border px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] ${
                      synthesisEdge
                        ? 'border-moss/30 bg-moss/[0.08] text-ink/75'
                        : 'mt-10 border-ink/15 bg-cream text-ink/70'
                    }`}
                  >
                    {synthesisEdge
                      ? 'Identity synthesis · possible same person'
                      : 'Separate record identity'}
                  </p>
                  <PersonButton
                    node={node}
                    selected={selectedId === node.id}
                    onSelect={onSelect}
                  />
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-5 grid max-w-[78rem] grid-cols-4 gap-5">
            <div className="text-center">
              <div aria-hidden="true" className="mx-auto h-5 w-px bg-ink/30" />
              <p className="mx-auto mb-3 w-fit rounded-full border border-ink/20 bg-ink px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] text-paper">
                Recorded father and eldest son
              </p>
              {getNode('logan-william') && (
                <PersonButton
                  node={getNode('logan-william')!}
                  selected={selectedId === 'logan-william'}
                  onSelect={onSelect}
                />
              )}
              {showParentageHypothesis && (
                <div className="mt-4 rounded-xl border border-dashed border-accent/45 bg-accent/[0.045] p-3 text-left">
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.11em] text-accent">
                    Open hypothesis · not proved
                  </p>
                  <p className="mt-2 font-serif text-base">
                    Thomas may be Benjamin Meason’s father
                  </p>
                </div>
              )}
            </div>

            <div className="col-span-3 rounded-[1.25rem] border border-ink/10 bg-cream/70 p-4">
              <div className="relative grid grid-cols-3 gap-5 pt-8">
                <div
                  aria-hidden="true"
                  className="absolute left-[16.67%] right-[16.67%] top-3 border-t border-ink/30"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-3 w-px bg-ink/30"
                />
                <p className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-ink/20 bg-ink px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] text-paper">
                  Recorded brothers
                </p>

                <div className="pt-3 text-center">
                  <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
                    Joseph’s record identity
                  </p>
                </div>
                <div className="pt-3 text-center">
                  <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
                    John’s recorded branch
                  </p>
                  <div
                    aria-hidden="true"
                    className="mx-auto mt-3 h-5 w-px bg-ink/30"
                  />
                  <p className="mx-auto mb-3 w-fit rounded-full border border-ink/15 bg-paper px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] text-ink/70">
                    Four recorded children
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-left">
                    {[
                      'highland-isaac-john-son',
                      'highland-caty-randal',
                      'highland-polly-devore',
                      'highland-betty-cherry',
                    ].map((id) => {
                      const child = getNode(id);
                      return child ? (
                        <li key={id}>
                          <PersonButton
                            node={child}
                            selected={selectedId === id}
                            onSelect={onSelect}
                            compact
                          />
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
                <div className="pt-3 text-center">
                  <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
                    Samuel’s recorded branch
                  </p>
                  <div
                    aria-hidden="true"
                    className="mx-auto mt-3 h-5 w-px bg-ink/30"
                  />
                  <p className="mx-auto mb-3 w-fit rounded-full border border-ink/15 bg-paper px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.11em] text-ink/70">
                    Recorded father and son
                  </p>
                  {getNode('highland-dorsey') && (
                    <PersonButton
                      node={getNode('highland-dorsey')!}
                      selected={selectedId === 'highland-dorsey'}
                      onSelect={onSelect}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {!showInterpretiveConnections && (
            <p className="mx-auto mt-7 w-fit rounded-lg border border-ink/10 bg-cream px-4 py-2 text-xs text-ink/70">
              Recorded only: identity bridges and the Thomas-to-Benjamin
              hypothesis are hidden.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function HighlandCreekFamilyTree() {
  const nodes = item.nodes;
  const edges = item.edges as readonly EdgeWithKind[];
  const firstPerson = nodes.find((node) => node.kind === 'person');
  const [mode, setMode] = useState<ViewMode>('family');
  const [filter, setFilter] = useState<EvidenceFilter>('all');
  const [selectedId, setSelectedId] = useState(firstPerson?.id ?? nodes[0]?.id);
  const [activeDeedReference, setActiveDeedReference] = useState<
    'all' | TitleReferenceId
  >('all');
  const reconstructionRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLElement>(null);

  const nodeById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );
  const visibleEdges = useMemo(
    () =>
      filter === 'recorded'
        ? edges.filter((edge) => edge.evidenceState === 'recorded')
        : edges,
    [edges, filter]
  );
  const selectedNode = nodes.find((node) => node.id === selectedId);

  const authoredIds: ReadonlySet<string> = new Set(
    authoredBranches.flatMap((branch) => [
      ...branch.rootIds,
      ...branch.memberIds,
    ])
  );
  const unplacedPeople = nodes.filter(
    (node) => node.kind === 'person' && !authoredIds.has(node.id)
  );
  const deedCenterNodes = nodes.filter(
    (node) => node.kind === 'land' || node.kind === 'record'
  );
  const identityEdges = visibleEdges.filter(
    (edge) => edge.connectionKind === 'identity'
  );
  const hypothesisEdges = visibleEdges.filter(
    (edge) =>
      edge.evidenceState === 'hypothesis' ||
      edge.connectionKind === 'open-parentage-hypothesis'
  );
  const activeDeedOption =
    deedRecordOptions.find((option) => option.id === activeDeedReference) ??
    deedRecordOptions[0];
  const explicitDeedParticipantIds =
    activeDeedReference === 'all'
      ? titleReferenceIds.flatMap(
          (referenceId) => deedParticipantIdsByReference[referenceId]
        )
      : deedParticipantIdsByReference[activeDeedReference];
  const explicitDeedParticipantIdSet = new Set(explicitDeedParticipantIds);
  const deedCandidateEdges = edges.filter((edge) => {
    if (
      edge.connectionKind === 'identity' ||
      edge.connectionKind === 'open-parentage-hypothesis'
    ) {
      return false;
    }

    const matchesReference =
      activeDeedReference === 'all'
        ? edge.referenceIds.some((id) =>
            titleReferenceIds.includes(id as TitleReferenceId)
          )
        : edge.referenceIds.includes(activeDeedReference);

    return (
      matchesReference &&
      [edge.from, edge.to].every((id) => {
        const node = nodeById.get(id);
        return node?.kind !== 'person' || explicitDeedParticipantIdSet.has(id);
      })
    );
  });
  const deedEdges = deedCandidateEdges.filter(
    (edge) => filter !== 'recorded' || edge.evidenceState === 'recorded'
  );
  const activeDeedCenterNodes = deedCenterNodes.filter((node) =>
    deedEdges.some((edge) => edge.from === node.id || edge.to === node.id)
  );
  const selectedEdgePool = mode === 'deeds' ? deedEdges : visibleEdges;
  const selectedEdges = selectedEdgePool.filter(
    (edge) => edge.from === selectedId || edge.to === selectedId
  );
  const unfilteredSelectedEdgePool =
    mode === 'deeds' ? deedCandidateEdges : edges;
  const hiddenSelectedCount =
    unfilteredSelectedEdgePool.filter(
      (edge) => edge.from === selectedId || edge.to === selectedId
    ).length - selectedEdges.length;
  const deedParticipantIds = Array.from(
    new Set(explicitDeedParticipantIds)
  ).filter(
    (id) =>
      deedEdges.some((edge) => edge.from === id || edge.to === id) &&
      nodeById.get(id)?.kind === 'person'
  );

  function selectNode(id: string) {
    setSelectedId(id);
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        inspectorRef.current?.focus({ preventScroll: true });
        inspectorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }

  function returnToVisualization() {
    reconstructionRef.current?.focus({ preventScroll: true });
    reconstructionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <section aria-labelledby="family-tree-title" className="mt-10">
      <div className="rounded-[2rem] border border-ink/10 bg-paper p-5 shadow-paper sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Interactive reconstruction</p>
            <h3
              id="family-tree-title"
              className="mt-3 font-serif text-3xl sm:text-4xl"
            >
              Follow the people, deeds, and open questions
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
              Choose a person or tract to inspect the records behind each
              connection. The family and deed views use the same evidence; they
              simply organize it around different questions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[34rem]">
            <fieldset>
              <legend className="mb-2 text-[0.54rem] font-semibold uppercase tracking-[0.15em] text-ink/70">
                View
              </legend>
              <div className="grid grid-cols-2 rounded-xl border border-ink/10 bg-cream p-1">
                {(
                  [
                    ['family', 'Family reconstruction'],
                    ['deeds', 'Deed network'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={mode === value}
                    onClick={() => setMode(value)}
                    className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${focusRing} ${
                      mode === value
                        ? 'bg-ink text-paper'
                        : 'text-ink/70 hover:bg-paper hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-[0.54rem] font-semibold uppercase tracking-[0.15em] text-ink/70">
                Evidence shown
              </legend>
              <div className="grid grid-cols-2 rounded-xl border border-ink/10 bg-cream p-1">
                {(
                  [
                    ['all', 'All connections'],
                    ['recorded', 'Recorded only'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                    className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${focusRing} ${
                      filter === value
                        ? 'bg-ink text-paper'
                        : 'text-ink/70 hover:bg-paper hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-ink/10 bg-cream p-4">
          <p className="text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-ink/70">
            How to read the connections
          </p>
          <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-ink/65 md:grid-cols-3">
            <li>
              <strong className="text-ink">Recorded connection:</strong> stated
              by a cited record.
            </li>
            <li>
              <strong className="text-ink">Identity synthesis:</strong> separate
              same-name records may describe one person.
            </li>
            <li>
              <strong className="text-ink">Open hypothesis:</strong> plausible,
              but not proved; hidden in Recorded only.
            </li>
          </ul>
        </div>

        <div
          ref={reconstructionRef}
          tabIndex={-1}
          role="region"
          aria-label={
            mode === 'family' ? 'Family reconstruction' : 'Deed network'
          }
          className="scroll-mt-6 focus:outline-none"
        >
          {mode === 'family' ? (
            <div className="mt-8 space-y-6">
              <DesktopFamilyDiagram
                nodeById={nodeById}
                visibleEdges={visibleEdges}
                selectedId={selectedId}
                onSelect={selectNode}
              />

              <div className="space-y-6 xl:hidden">
                {authoredBranches.map((branch) => {
                  const roots = branch.rootIds
                    .map((id) => nodeById.get(id))
                    .filter((node): node is ReconstructionNode =>
                      Boolean(node)
                    );
                  const members = branch.memberIds
                    .map((id) => nodeById.get(id))
                    .filter((node): node is ReconstructionNode =>
                      Boolean(node)
                    );

                  return (
                    <section
                      key={branch.id}
                      aria-labelledby={`branch-${branch.id}`}
                      className="rounded-[1.5rem] border border-ink/10 bg-cream p-5 sm:p-6"
                    >
                      <p className="eyebrow !text-[0.52rem]">
                        {branch.eyebrow}
                      </p>
                      <h4
                        id={`branch-${branch.id}`}
                        className="mt-2 font-serif text-2xl"
                      >
                        {branch.title}
                      </h4>
                      <p className="mt-2 max-w-3xl text-xs leading-relaxed text-ink/70">
                        {branch.note}
                      </p>
                      <div
                        className={`mt-5 grid gap-4 lg:items-start ${members.length > 0 ? 'lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,2fr)]' : 'max-w-sm'}`}
                      >
                        <div className="space-y-3 border-l-2 border-ink/20 pl-4">
                          {roots.map((node) => (
                            <PersonButton
                              key={node.id}
                              node={node}
                              selected={selectedId === node.id}
                              onSelect={selectNode}
                            />
                          ))}
                        </div>
                        {members.length > 0 && (
                          <div>
                            <p className="mb-3 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-ink/70">
                              {branch.id === 'thomas-household'
                                ? 'Children named by Thomas’s will'
                                : 'People named in this branch'}
                            </p>
                            <ul className="grid gap-3 sm:grid-cols-2">
                              {members.map((node) => (
                                <li
                                  key={node.id}
                                  className="border-l border-ink/20 pl-3"
                                >
                                  <PersonButton
                                    node={node}
                                    selected={selectedId === node.id}
                                    onSelect={selectNode}
                                    compact
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>

              {identityEdges.length > 0 && (
                <section
                  aria-labelledby="identity-bridges"
                  className="rounded-[1.5rem] border border-moss/25 bg-moss/[0.045] p-5 sm:p-6"
                >
                  <p className="eyebrow !text-[0.52rem]">
                    Cross-record comparison
                  </p>
                  <h4
                    id="identity-bridges"
                    className="mt-2 font-serif text-2xl"
                  >
                    Possible same-name identities
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-ink/70">
                    Each side remains a separate record identity. These bridges
                    show a reasoned synthesis, not a merged or proved person.
                  </p>
                  <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                    {identityEdges.map((edge) => (
                      <li
                        key={edge.id}
                        className="rounded-xl border border-moss/25 bg-paper p-4"
                      >
                        <p className="font-serif text-lg">
                          {nodeById.get(edge.from)?.label ?? edge.from}{' '}
                          <span className="font-sans text-xs uppercase tracking-[0.11em] text-ink/75">
                            may be the same person as
                          </span>{' '}
                          {nodeById.get(edge.to)?.label ?? edge.to}
                        </p>
                        <EdgeBadges edge={edge} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hypothesisEdges.length > 0 && (
                <section
                  aria-labelledby="open-parentage"
                  className="rounded-[1.5rem] border border-dashed border-accent/45 bg-accent/[0.04] p-5 sm:p-6"
                >
                  <p className="eyebrow !text-[0.52rem]">
                    Not a proved pedigree link
                  </p>
                  <h4 id="open-parentage" className="mt-2 font-serif text-2xl">
                    Open parentage hypothesis
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {hypothesisEdges.map((edge) => (
                      <li
                        key={edge.id}
                        className="rounded-xl border border-dashed border-accent/40 bg-paper p-4"
                      >
                        <p className="font-serif text-lg">
                          {nodeById.get(edge.from)?.label ?? edge.from}{' '}
                          <span className="font-sans text-xs uppercase tracking-[0.11em] text-accent">
                            {edge.relationship}
                          </span>{' '}
                          {nodeById.get(edge.to)?.label ?? edge.to}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink/65">
                          {edge.statement}
                          <ReferenceLinks ids={edge.referenceIds} />
                        </p>
                        <EdgeBadges edge={edge} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section
                aria-labelledby="unplaced-people"
                className="rounded-[1.5rem] bg-ink p-5 text-paper sm:p-6"
              >
                <p className="eyebrow !text-accent-soft">
                  No invented branches
                </p>
                <h4 id="unplaced-people" className="mt-2 font-serif text-2xl">
                  Named, but not placed in the pedigree
                </h4>
                <p className="mt-2 max-w-3xl text-xs leading-relaxed text-paper/75">
                  This area includes heirs whose degree of kinship is unstated
                  and transaction parties whose deed role does not prove family
                  relationship.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {unplacedPeople.map((node) => (
                    <li key={node.id}>
                      <button
                        type="button"
                        aria-pressed={selectedId === node.id}
                        onClick={() => selectNode(node.id)}
                        className={`w-full rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft ${
                          selectedId === node.id
                            ? 'border-accent-soft bg-paper/15'
                            : 'border-paper/15 bg-paper/[0.045] hover:border-accent-soft/50'
                        }`}
                      >
                        <span className="block font-serif text-lg">
                          {node.label}
                        </span>
                        <span className="mt-2 block text-xs leading-relaxed text-paper/75">
                          {node.detail}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <section
                aria-labelledby="deed-record-selector"
                className="rounded-[1.5rem] border border-ink/10 bg-cream p-5 sm:p-6"
              >
                <p className="eyebrow !text-[0.52rem]">Choose a record</p>
                <h4
                  id="deed-record-selector"
                  className="mt-2 font-serif text-2xl"
                >
                  Follow one title event at a time
                </h4>
                <div
                  className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3"
                  role="group"
                  aria-label="Title record displayed in the deed network"
                >
                  {deedRecordOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={activeDeedReference === option.id}
                      onClick={() => setActiveDeedReference(option.id)}
                      className={`rounded-xl border p-3 text-left transition ${focusRing} ${
                        activeDeedReference === option.id
                          ? 'border-accent bg-accent/[0.08]'
                          : 'border-ink/10 bg-paper hover:border-accent/40'
                      }`}
                    >
                      <span className="block font-serif text-lg leading-tight">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
                        {option.date}
                        {option.id !== 'all' && ` · Reference ${option.id}`}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section
                aria-labelledby="active-deed-network"
                className="rounded-[1.5rem] border border-ink/10 bg-paper p-5 sm:p-6"
              >
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
                  <div>
                    <p className="eyebrow !text-[0.52rem]">
                      {activeDeedOption.date}
                    </p>
                    <h4
                      id="active-deed-network"
                      className="mt-2 font-serif text-3xl"
                    >
                      {activeDeedOption.label}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">
                      The network below includes only people and connections
                      supported by{' '}
                      {activeDeedReference === 'all'
                        ? 'the five selected title-record groups'
                        : `reference ${activeDeedReference}`}
                      .
                      <ReferenceLinks
                        ids={
                          activeDeedReference === 'all'
                            ? titleReferenceIds
                            : [activeDeedReference]
                        }
                      />
                    </p>
                  </div>
                  <aside className="rounded-xl border border-accent/25 bg-accent/[0.045] p-4">
                    <p className="text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-accent">
                      Source and image availability
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-ink/65">
                      {activeDeedOption.availability}
                    </p>
                  </aside>
                </div>

                <div className="mt-7 grid gap-6 xl:grid-cols-[19rem_minmax(0,1fr)]">
                  <div>
                    <p className="mb-3 text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-ink/70">
                      Land or record at the center
                    </p>
                    {activeDeedCenterNodes.length > 0 ? (
                      <ul className="space-y-3 rounded-[1.25rem] bg-ink p-4 text-paper">
                        {activeDeedCenterNodes.map((node) => (
                          <li key={node.id}>
                            <button
                              type="button"
                              aria-pressed={selectedId === node.id}
                              onClick={() => selectNode(node.id)}
                              className={`w-full rounded-xl border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft ${
                                selectedId === node.id
                                  ? 'border-accent-soft bg-paper/15'
                                  : 'border-paper/15 bg-paper/[0.045] hover:border-accent-soft/50'
                              }`}
                            >
                              <span className="block font-serif text-xl">
                                {node.label}
                              </span>
                              <span className="mt-1.5 block text-[0.52rem] font-semibold uppercase tracking-[0.13em] text-accent-soft">
                                {node.kind === 'record'
                                  ? 'Legal record / case abstract'
                                  : 'Land and title center'}
                              </span>
                              <span className="mt-2 block text-xs leading-relaxed text-paper/75">
                                {node.detail}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="rounded-[1.25rem] border border-dashed border-ink/20 bg-cream p-4 text-sm leading-relaxed text-ink/70">
                        No land or record center remains under the current
                        evidence filter. Choose All connections to see any
                        explicitly labeled title-identity synthesis.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-3 text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-ink/70">
                      Named participants and their roles
                    </p>
                    {deedParticipantIds.length > 0 ? (
                      <ul className="grid gap-3 lg:grid-cols-2">
                        {deedParticipantIds.map((participantId) => {
                          const participant = nodeById.get(participantId);
                          if (!participant) return null;
                          const roles = deedEdges.filter(
                            (edge) =>
                              edge.from === participantId ||
                              edge.to === participantId
                          );

                          return (
                            <li
                              key={participantId}
                              className="rounded-xl border border-ink/10 bg-cream p-4"
                            >
                              <PersonButton
                                node={participant}
                                selected={selectedId === participantId}
                                onSelect={selectNode}
                                compact
                              />
                              <ul className="mt-3 space-y-3">
                                {roles.map((edge) => (
                                  <li
                                    key={edge.id}
                                    className="border-t border-ink/10 pt-3 text-xs leading-relaxed text-ink/65 first:border-0 first:pt-0"
                                  >
                                    <p>
                                      <strong className="text-ink">
                                        {nodeById.get(edge.from)?.label ??
                                          edge.from}
                                      </strong>{' '}
                                      — {edge.relationship} —{' '}
                                      <strong className="text-ink">
                                        {nodeById.get(edge.to)?.label ??
                                          edge.to}
                                      </strong>
                                      <ReferenceLinks ids={edge.referenceIds} />
                                    </p>
                                    <EdgeBadges edge={edge} />
                                  </li>
                                ))}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="rounded-xl border border-dashed border-ink/20 bg-cream p-5 text-sm leading-relaxed text-ink/70">
                        No connections from this record remain under Recorded
                        only. Choose All connections to see its interpretive
                        title associations.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <aside
          ref={inspectorRef}
          tabIndex={-1}
          aria-labelledby="selected-evidence-heading"
          className="mt-8 scroll-mt-6 rounded-[1.5rem] border border-accent/25 bg-accent/[0.045] p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-7"
        >
          <p className="eyebrow !text-[0.52rem]">
            Selected person, place, or tract
          </p>
          {selectedNode ? (
            <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
              <div>
                <h4
                  id="selected-evidence-heading"
                  aria-live="polite"
                  aria-atomic="true"
                  className="font-serif text-2xl sm:text-3xl"
                >
                  {selectedNode.label}
                </h4>
                <p className="mt-2 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-accent">
                  {recordGroupLabel(selectedNode)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {selectedNode.detail}
                  <ReferenceLinks ids={selectedNode.referenceIds} />
                </p>
              </div>
              <div>
                <p className="text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-ink/70">
                  Connections shown in this evidence view
                </p>
                {selectedEdges.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {selectedEdges.map((edge) => {
                      const selectedEndpoint =
                        edge.from === selectedId
                          ? 'first named party'
                          : 'second named party';
                      return (
                        <li
                          key={edge.id}
                          className="rounded-xl border border-ink/10 bg-paper p-4"
                        >
                          <p className="font-semibold text-ink">
                            {nodeById.get(edge.from)?.label ?? edge.from} —{' '}
                            {edge.relationship} —{' '}
                            {nodeById.get(edge.to)?.label ?? edge.to}
                          </p>
                          <p className="mt-1 text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
                            Selected here as the {selectedEndpoint}
                          </p>
                          <EdgeBadges edge={edge} />
                          <p className="mt-3 text-sm leading-relaxed text-ink/65">
                            {edge.statement}
                            <ReferenceLinks ids={edge.referenceIds} />
                          </p>
                          <p className="mt-3 border-t border-ink/10 pt-3 text-xs leading-relaxed text-ink/70">
                            <strong className="text-ink/75">Limitation:</strong>{' '}
                            {edge.limitation}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    No connections for this selection are visible under the
                    current filter.
                  </p>
                )}
                {hiddenSelectedCount > 0 && (
                  <p className="mt-3 text-xs leading-relaxed text-ink/70">
                    {hiddenSelectedCount} interpretive{' '}
                    {hiddenSelectedCount === 1
                      ? 'connection is'
                      : 'connections are'}{' '}
                    hidden by Recorded only.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink/70">
              Choose a card to inspect its evidence.
            </p>
          )}
          <button
            type="button"
            onClick={returnToVisualization}
            className={`mt-6 inline-flex rounded-full border border-ink/20 bg-paper px-4 py-2 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent ${focusRing}`}
          >
            {`Return to the ${mode === 'family' ? 'family reconstruction' : 'deed network'}`}
          </button>
        </aside>
      </div>
    </section>
  );
}
