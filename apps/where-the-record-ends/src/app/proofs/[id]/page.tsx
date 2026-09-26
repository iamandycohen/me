import {
  proofProjects,
  relationships,
} from '@where-the-record-ends/genealogy-content';
import type { ProofPartStatus } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLink } from '@/components/ArrowLink';
import { ProofStatusBadge } from '@/components/ProofStatusBadge';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import { absoluteUrl } from '@/lib/site';

const gpsReviewLabels = {
  'near-ready': 'GPS: nearly demonstrated',
  'work-remains': 'GPS: work remains',
  'private-review': 'GPS: private review needed',
} as const;

const gpsReviewStyles = {
  'near-ready': 'border-amber-700/40 bg-amber-100 text-amber-950',
  'work-remains': 'border-ink/30 bg-paper text-ink/75',
  'private-review': 'border-accent/30 bg-accent/10 text-accent',
} as const;

const gpsElementLabels = {
  research: 'Reasonably exhaustive research',
  citations: 'Complete, accurate citations',
  analysis: 'Analysis and correlation',
  conflicts: 'Conflicting evidence resolved',
  conclusion: 'Sound written conclusion',
} as const;

const gpsElementStatusLabels = {
  shown: 'Shown',
  partial: 'Partial',
  'not-shown': 'Not shown',
  private: 'Private evidence',
} as const;

const gpsElementKeys = Object.keys(gpsElementLabels) as Array<
  keyof typeof gpsElementLabels
>;

export function generateStaticParams() {
  return proofProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = proofProjects.find((entry) => entry.id === id);
  if (!project) return {};
  const url = absoluteUrl(`/proofs/${project.id}`);

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: project.title, description: project.summary, url },
  };
}

export default async function ProofProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = proofProjects.find((entry) => entry.id === id);
  if (!project) notFound();

  const lineage = project.lineage.map((step) => {
    const relationship = step.relationshipId
      ? relationships.find((entry) => entry.id === step.relationshipId)
      : undefined;
    const part = project.parts.find(
      (entry) => entry.id === (step.partId ?? step.relationshipId)
    );
    const status: ProofPartStatus = part
      ? part.status
      : relationship?.assessment === 'high-confidence'
        ? 'accepted-indirect'
        : 'documented';

    return {
      ...step,
      part,
      relationship,
      status,
      summary: part?.summary ?? relationship?.statement ?? '',
      referenceIds: part
        ? [...new Set(part.evidence.map((item) => item.referenceId))]
        : (relationship?.referenceIds ?? []),
    };
  });
  const lineagePartIds = lineage
    .map((step) => step.part?.id)
    .filter((partId): partId is string => Boolean(partId));
  const lineageParts = project.parts
    .filter((part) => lineagePartIds.includes(part.id))
    .sort(
      (left, right) =>
        lineagePartIds.indexOf(left.id) - lineagePartIds.indexOf(right.id)
    );
  const supportingParts = project.parts.filter(
    (part) => !lineagePartIds.includes(part.id)
  );
  const orderedParts = [...lineageParts, ...supportingParts];

  return (
    <>
      <section className="paper-noise border-b border-ink/10 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <Link
            href="/proofs"
            className="text-sm font-medium text-accent underline underline-offset-4"
          >
            ← All proof paths
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
            <div>
              <p className="eyebrow">Proof project</p>
              <h1 className="balanced mt-5 max-w-5xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.045em]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink/65">
                {project.summary}
              </p>
            </div>
            <aside className="rounded-2xl border border-accent/25 bg-cream p-6">
              <ProofStatusBadge status={project.status} />
              <p className="mt-5 text-sm leading-relaxed text-ink/65">
                {lineage.length} links from me to the proposed ancestor, with{' '}
                {project.parts.length} research questions tracked. Each badge
                describes its own link or question.
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.13em] text-ink/55">
                Reviewed {project.publication.reviewedOn}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-cream px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto grid max-w-[92rem] gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
          <h2 className="font-serif text-3xl">Why I am following this path</h2>
          <p className="max-w-3xl text-base leading-relaxed text-ink/70">
            {project.purpose}
          </p>
        </div>
      </section>

      <section className="border-b border-ink/10 px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-[92rem]">
          <p className="eyebrow">From me to the earlier generation</p>
          <h2 className="balanced mt-4 font-serif text-3xl sm:text-4xl">
            The lineage, one link at a time
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70">
            Each parent–child step needs its own evidence and reasoning. An
            identity step tests whether records with different names describe
            the same person. The evidence badge describes the current
            conclusion. The separate GPS assessment tracks five standards for
            that link; none of these links is yet labeled GPS complete. A path
            with an open step remains an open lineage.
          </p>
          {project.id === 'sledge' ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/65">
              The{' '}
              <a
                href="https://www.sar.org/app/uploads/Genealogy_Committee_Policies.pdf"
                className="font-medium text-accent underline underline-offset-4"
              >
                SAR genealogy policies
              </a>{' '}
              call for proof through every generation. Identifying the ancestor
              and establishing Revolutionary service are separate questions
              after those generational links.
            </p>
          ) : null}
          <ol className="mt-9 max-w-5xl space-y-3">
            {lineage.map((step, index) => (
              <li
                key={step.id}
                className="rounded-2xl border border-l-4 border-ink/10 border-l-accent/60 bg-cream p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-accent">
                    {String(index + 1).padStart(2, '0')} ·{' '}
                    {step.kind === 'identity'
                      ? 'Identity'
                      : 'Parent–child link'}
                  </p>
                  <ProofStatusBadge status={step.status} />
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight">
                  {step.from} <span aria-hidden="true">→</span> {step.to}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {step.summary}
                  <ReferenceLinks ids={step.referenceIds} />
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${gpsReviewStyles[step.gpsReview.status]}`}
                  >
                    {gpsReviewLabels[step.gpsReview.status]}
                  </span>
                  <p className="text-xs leading-relaxed text-ink/55">
                    {step.gpsReview.access === 'private'
                      ? 'The underlying records are private; this public page cannot show their full review.'
                      : step.gpsReview.status === 'near-ready'
                        ? 'Strong evidence is in place; the listed GPS work remains.'
                        : 'See the specific standards and next action below.'}
                  </p>
                </div>
                <details className="mt-4 rounded-xl border border-ink/10 bg-paper p-4">
                  <summary className="cursor-pointer text-sm font-medium text-accent">
                    View five-part GPS assessment
                  </summary>
                  <dl className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
                    {gpsElementKeys.map((element) => {
                      const assessment = step.gpsReview.elements[element];
                      return (
                        <div
                          key={element}
                          className="py-3 sm:grid sm:grid-cols-[11rem_7rem_1fr] sm:gap-3"
                        >
                          <dt className="text-xs font-semibold text-ink/80">
                            {gpsElementLabels[element]}
                          </dt>
                          <dd className="mt-1 text-xs font-medium text-accent sm:mt-0">
                            {gpsElementStatusLabels[assessment.status]}
                          </dd>
                          <dd className="mt-1 text-xs leading-relaxed text-ink/65 sm:mt-0">
                            {assessment.note}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                  <p className="mt-2 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/70">
                    <strong>Next:</strong> {step.gpsReview.nextAction}
                  </p>
                </details>
                {step.relationship?.referenceIds.length === 0 ? (
                  <p className="mt-3 text-xs leading-relaxed text-ink/55">
                    The reviewed modern records remain private.
                  </p>
                ) : null}
                {step.part ? (
                  <a
                    href={`#${step.part.id}`}
                    className="mt-5 inline-block text-sm font-medium text-accent underline underline-offset-4"
                  >
                    Read the current assessment
                  </a>
                ) : (
                  <Link
                    href="/family"
                    className="mt-5 inline-block text-sm font-medium text-accent underline underline-offset-4"
                  >
                    View this link in the family atlas
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-[#ece3d7]/35 px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem] space-y-8">
          <div>
            <p className="eyebrow">The evidence behind the line</p>
            <h2 className="balanced mt-4 font-serif text-3xl sm:text-4xl">
              Assessments in lineage order
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/65">
              The detailed questions below follow the same direct line shown
              above. Earlier documented links use the published family atlas.
            </p>
          </div>
          {orderedParts.map((part, index) => (
            <div key={part.id}>
              {index === lineageParts.length ? (
                <div className="mb-8 border-t border-ink/15 pt-12">
                  <p className="eyebrow">Related research</p>
                  <h2 className="balanced mt-4 font-serif text-3xl sm:text-4xl">
                    {project.id === 'sledge'
                      ? 'The separate service question'
                      : 'Questions that support the line'}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/65">
                    {project.id === 'sledge'
                      ? 'Revolutionary service needs its own evidence after the lineage and patriot identity are established.'
                      : 'These questions help evaluate a link or test an alternate identification. They do not add another generation to the lineage above.'}
                  </p>
                </div>
              ) : null}
              <article
                id={part.id}
                className="scroll-mt-28 rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-paper sm:p-9"
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="max-w-4xl">
                    <p className="eyebrow">
                      {index < lineageParts.length
                        ? 'Lineage assessment'
                        : 'Related question'}{' '}
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="balanced mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                      {part.question}
                    </h2>
                  </div>
                  <ProofStatusBadge status={part.status} />
                </div>
                <p className="mt-6 max-w-4xl text-base leading-relaxed text-ink/70">
                  {part.summary}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.13em] text-ink/55">
                  {part.evidenceType === 'unassessed'
                    ? 'Evidence assessment pending'
                    : `Evidence type: ${part.evidenceType}`}
                </p>

                <div className="mt-9 grid gap-9 border-t border-ink/10 pt-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
                  <div>
                    <h3 className="font-serif text-2xl">
                      What the sources contribute
                    </h3>
                    <ul className="mt-5 space-y-4">
                      {part.evidence.map((item, evidenceIndex) => (
                        <li
                          key={`${part.id}-${item.referenceId}-${evidenceIndex}`}
                          className="rounded-xl border border-ink/10 bg-cream p-4"
                        >
                          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-accent">
                            {item.role}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-ink/70">
                            {item.note}
                            <ReferenceLinks ids={[item.referenceId]} />
                          </p>
                        </li>
                      ))}
                    </ul>
                    {part.relatedCaseIds.length > 0 ? (
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        {part.relatedCaseIds.map((caseId) => (
                          <Link
                            key={caseId}
                            href={`/cases/${caseId}`}
                            className="font-medium text-accent underline underline-offset-4"
                          >
                            Explore the {caseId.replaceAll('-', ' ')} case
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-7">
                    <div>
                      <h3 className="font-serif text-2xl">
                        Research and reasoning
                      </h3>
                      <p className="mt-4 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-accent">
                        Records examined
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
                        {part.researchScope.searched.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm leading-relaxed text-ink/70">
                        <strong className="font-semibold text-ink">
                          Limit:
                        </strong>{' '}
                        {part.researchScope.limits}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-ink/70">
                        {part.analysis}
                      </p>
                    </div>
                    {part.conflicts.length > 0 ? (
                      <div>
                        <h3 className="font-serif text-2xl">
                          Conflicts and limits
                        </h3>
                        <ul className="mt-4 space-y-4">
                          {part.conflicts.map((conflict) => (
                            <li
                              key={conflict.issue}
                              className="text-sm leading-relaxed text-ink/70"
                            >
                              <p className="font-semibold text-ink">
                                {conflict.issue}
                              </p>
                              <p className="mt-1">{conflict.resolution}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-9 grid gap-6 border-t border-ink/10 pt-8 lg:grid-cols-2">
                  <div>
                    <p className="eyebrow">Current conclusion</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {part.conclusion}
                    </p>
                  </div>
                  {part.nextTest ? (
                    <div>
                      <p className="eyebrow">What could change it</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">
                        {part.nextTest}
                      </p>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <nav aria-label="Proof paths" className="px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4">
          <ArrowLink href="/proofs">All proof paths</ArrowLink>
          <ArrowLink href="/cases">Research cases</ArrowLink>
        </div>
      </nav>
    </>
  );
}
