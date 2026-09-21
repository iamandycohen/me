import {
  highlandCreekReconstruction,
  media,
} from '@where-the-record-ends/genealogy-content';

import { ArrowLink } from '@/components/ArrowLink';
import { EvidenceImageViewer } from '@/components/EvidenceImageViewer';
import { HighlandCreekFamilyTree } from '@/components/HighlandCreekFamilyTree';
import { ReferenceLinks } from '@/components/ReferenceLinks';

const edgePresentation = {
  recorded: {
    label: 'Recorded connection',
    description: 'The connection is stated in a record.',
    card: 'border-ink/15 bg-cream',
    badge: 'border-ink/20 bg-ink text-paper',
  },
  'identity-synthesis': {
    label: 'Identity synthesis',
    description: 'Separate records probably describe the same person.',
    card: 'border-moss/35 bg-moss/[0.055]',
    badge: 'border-moss/30 bg-moss text-paper',
  },
  hypothesis: {
    label: 'Open hypothesis',
    description: 'This relationship is plausible but not proved.',
    card: 'border-dashed border-accent/50 bg-accent/[0.045]',
    badge: 'border-accent/35 bg-accent text-paper',
  },
} as const;

const edgeOrder = ['recorded', 'identity-synthesis', 'hypothesis'] as const;

const recordGroupLabels = {
  'will-1779': "Thomas Meason senior's 1779 will",
  'logan-1795': 'Logan County deed group',
  'highland-creek': 'Highland Creek heir records',
} as const;

export function HighlandCreekReconstruction() {
  const item = highlandCreekReconstruction;
  const highlandMap = media['highland-creek-map-1818'];
  const nodeById = new Map(item.nodes.map((node) => [node.id, node]));

  return (
    <>
      <section className="border-b border-ink/10 px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>
            <p className="eyebrow">The land as witness</p>
            <h2 className="balanced mt-4 max-w-4xl font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.035em]">
              One tract, a generation of records
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/65 sm:text-lg">
              {item.summary}
            </p>
          </div>
          <aside className="rounded-[1.5rem] border border-accent/25 bg-accent/[0.045] p-6">
            <p className="eyebrow !text-[0.56rem]">Interpretive boundary</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              {item.boundary}
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ink px-5 py-14 text-paper sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)] lg:items-center">
          <EvidenceImageViewer
            src={highlandMap.src}
            alt={highlandMap.alt}
            width={highlandMap.width}
            height={highlandMap.height}
            title={highlandMap.title}
            label={highlandMap.label}
            caption={highlandMap.caption}
            sourceUrl="https://www.loc.gov/resource/g3950.ct003777a/"
          />
          <div>
            <p className="eyebrow !text-accent-soft">Map meets record</p>
            <h2 className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              A mill beside Highland Creek
            </h2>
            <p className="mt-5 text-base leading-relaxed text-paper/70">
              The 1818 map labels Higgins’ Mill on Highland Creek. Read beside
              the 1812 ejectment involving Wardlow, Jones, and Higgins, it gives
              the title dispute a plausible setting—not a proved parcel.
              <ReferenceLinks ids={highlandMap.referenceIds} />
            </p>
            <div className="mt-6 rounded-[1.25rem] border border-paper/15 bg-paper/[0.045] p-5">
              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-accent-soft">
                What the image cannot establish
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">
                {highlandMap.limitation}
              </p>
            </div>
            <div className="mt-5 border-l-2 border-accent/50 pl-5">
              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-accent-soft">
                Search boundary · 1816–1835
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">
                The complete 1816–1835 Mason principal-party index runs contain
                no later responsive Highland Creek conveyance. That closes an
                obvious deed-index route, but not an unindexed or misfiled
                record, an incidental recital, a court file, or an instrument
                indexed only under another surname.
                <ReferenceLinks ids={[72]} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="highland-creek-timeline"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-3xl">
            <p className="eyebrow">Title chain</p>
            <h2
              id="highland-creek-timeline"
              className="mt-3 font-serif text-4xl sm:text-5xl"
            >
              Follow the thousand acres
            </h2>
            <p className="mt-4 leading-relaxed text-ink/60">
              The land stays identifiable while names, jurisdictions, and legal
              claims change around it.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-2">
            {item.timeline.map((event, index) => (
              <li
                key={event.id}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 rounded-[1.5rem] border border-ink/10 bg-cream p-5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:p-7"
              >
                <div>
                  <span className="block font-serif text-2xl text-accent">
                    {event.date}
                  </span>
                  <span className="mt-2 block text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-ink/35">
                    Event {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl leading-tight">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {event.detail}
                    <ReferenceLinks ids={event.referenceIds} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="border-y border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="fairfield-context"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-4xl">
            <p className="eyebrow">Fairfield evidence checkpoint</p>
            <h2
              id="fairfield-context"
              className="mt-3 font-serif text-4xl sm:text-5xl"
            >
              The family cluster sharpens. The pedigree does not.
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/60">
              {item.contextBoundary}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {item.contextCheckpoints.map((checkpoint) => (
              <article
                key={checkpoint.id}
                className="rounded-[1.5rem] border border-ink/10 bg-paper p-6 shadow-paper"
              >
                <p className="eyebrow !text-[0.54rem]">{checkpoint.eyebrow}</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">
                  {checkpoint.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {checkpoint.detail}
                  <ReferenceLinks ids={checkpoint.referenceIds} />
                </p>
                <div className="mt-5 border-t border-ink/10 pt-4">
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                    Evidence boundary
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/60">
                    {checkpoint.limitation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="highland-creek-reconstruction"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-4xl">
              <p className="eyebrow">Named heirs and possible kinship</p>
              <h2
                id="highland-creek-reconstruction"
                className="mt-3 font-serif text-4xl sm:text-5xl"
              >
                A possible family, without pretending it is proved
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink/60">
                Every named person is visible, but only relationships supported
                by the evidence are drawn as family. A solid record, a
                cross-record identity assessment, and a parentage hypothesis are
                not interchangeable.
              </p>
            </div>
            <ul
              className="space-y-2 text-xs leading-relaxed text-ink/60"
              aria-label="Evidence-state legend"
            >
              {edgeOrder.map((state) => (
                <li key={state} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 shrink-0 rounded-full border px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.12em] ${edgePresentation[state].badge}`}
                  >
                    {edgePresentation[state].label}
                  </span>
                  <span>{edgePresentation[state].description}</span>
                </li>
              ))}
            </ul>
          </div>

          <HighlandCreekFamilyTree />

          <div className="mt-14 max-w-3xl">
            <p className="eyebrow">Connection-by-connection evidence</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
              Read the ledger behind the tree
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 sm:text-base">
              The visual reconstruction is an orientation tool. This ledger
              preserves the full statement, limitation, and source trail for
              every connection it draws.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {edgeOrder.map((state, layerIndex) => {
              const edges = item.edges.filter(
                (edge) => edge.evidenceState === state
              );
              const presentation = edgePresentation[state];

              return (
                <section
                  key={state}
                  aria-labelledby={`relationship-layer-${state}`}
                  className="rounded-[2rem] border border-ink/10 bg-paper/60 p-5 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5">
                    <div>
                      <p className="eyebrow !text-[0.54rem]">
                        Layer {layerIndex + 1}
                      </p>
                      <h3
                        id={`relationship-layer-${state}`}
                        className="mt-2 font-serif text-3xl"
                      >
                        {presentation.label}
                      </h3>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-ink/55">
                      {presentation.description}
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-4 xl:grid-cols-2">
                    {edges.map((edge) => {
                      const from = nodeById.get(edge.from);
                      const to = nodeById.get(edge.to);

                      return (
                        <li
                          key={edge.id}
                          className={`rounded-[1.25rem] border p-5 ${presentation.card}`}
                        >
                          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-ink/45">
                            {presentation.label}
                          </p>
                          <p className="mt-3 font-serif text-xl leading-snug">
                            <a
                              href={`#reconstruction-node-${edge.from}`}
                              className="underline decoration-ink/20 underline-offset-4 hover:decoration-accent"
                            >
                              {from?.label ?? edge.from}
                            </a>{' '}
                            <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                              {edge.relationship}
                            </span>{' '}
                            <a
                              href={`#reconstruction-node-${edge.to}`}
                              className="underline decoration-ink/20 underline-offset-4 hover:decoration-accent"
                            >
                              {to?.label ?? edge.to}
                            </a>
                          </p>
                          <p className="mt-4 text-sm leading-relaxed text-ink/70">
                            {edge.statement}
                            <ReferenceLinks ids={edge.referenceIds} />
                          </p>
                          <div className="mt-4 border-t border-ink/10 pt-4">
                            <p className="text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                              Limitation
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-ink/60">
                              {edge.limitation}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <section
            className="mt-8 rounded-[2rem] bg-ink p-6 text-paper sm:p-8"
            aria-labelledby="people-in-reconstruction"
          >
            <p className="eyebrow !text-accent-soft">Accessible people list</p>
            <h3
              id="people-in-reconstruction"
              className="mt-3 font-serif text-3xl"
            >
              Every person and place in the reconstruction
            </h3>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {item.nodes.map((node) => (
                <li
                  key={node.id}
                  id={`reconstruction-node-${node.id}`}
                  className="rounded-xl border border-paper/10 bg-paper/[0.035] p-4"
                >
                  <p className="font-serif text-xl">{node.label}</p>
                  <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-accent-soft">
                    {recordGroupLabels[node.recordGroup]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/65">
                    {node.detail}
                    <ReferenceLinks ids={node.referenceIds} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section
        className="px-5 py-14 sm:px-8 md:py-20"
        aria-labelledby="highland-creek-deeds"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-4xl">
            <p className="eyebrow">Original deeds</p>
            <h2
              id="highland-creek-deeds"
              className="mt-3 font-serif text-4xl sm:text-5xl"
            >
              The pages behind the reconstruction
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/60">
              These page sequences identify the originals needed to evaluate the
              claims. They are listed now so the citation remains complete even
              before publication permission is resolved.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {item.documents.map((document) => (
              <article
                key={document.id}
                className="flex flex-col rounded-[2rem] border border-ink/10 bg-cream p-6 shadow-paper sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow !text-[0.54rem]">
                      Reference {document.referenceId}
                    </p>
                    <h3 className="mt-2 max-w-xl font-serif text-3xl leading-tight">
                      {document.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-accent">
                    {document.pages[0]?.rightsState === 'permission-required'
                      ? 'Permission required'
                      : 'Rights review required'}
                  </span>
                </div>

                <div className="mt-6 rounded-xl border border-dashed border-accent/35 bg-paper p-4 text-sm leading-relaxed text-ink/65">
                  <p className="font-semibold text-ink">
                    Images are not reproduced here yet.
                  </p>
                  <p className="mt-2">
                    The original pages are preserved for research, but access
                    does not by itself grant permission to publish copies. This
                    viewer will show them only after source-specific review.
                  </p>
                </div>

                <ol
                  className="mt-6 space-y-3"
                  aria-label={`Ordered pages in ${document.title}`}
                >
                  {document.pages.map((page) => (
                    <li
                      key={page.id}
                      className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 border-t border-ink/10 pt-3 first:border-t-0 first:pt-0"
                    >
                      <span
                        className="grid size-8 place-items-center rounded-full bg-ink text-xs font-semibold text-paper"
                        aria-hidden="true"
                      >
                        {page.sequence}
                      </span>
                      <div>
                        <p className="font-medium text-ink">{page.locator}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">
                          {page.description}
                        </p>
                        <div className="mt-3">
                          <ArrowLink href={page.providerUrl}>
                            Open the source film at the provider
                          </ArrowLink>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
