import { proofProjects } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLink } from '@/components/ArrowLink';
import { ProofStatusBadge } from '@/components/ProofStatusBadge';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import { absoluteUrl } from '@/lib/site';

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
                {project.parts.length} questions tracked. Each badge describes
                its own question; the full path remains in progress.
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

      <section className="px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-[92rem]">
          <p className="eyebrow">The questions in order</p>
          <nav aria-label="Questions in this proof path" className="mt-7">
            <ol className="grid gap-3 lg:grid-cols-2">
              {project.parts.map((part, index) => (
                <li key={part.id}>
                  <a
                    href={`#${part.id}`}
                    className="flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-cream p-5 transition-colors hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="flex items-start gap-4">
                      <span className="text-xs font-semibold tracking-[0.15em] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">
                        {part.question}
                      </span>
                    </span>
                    <ProofStatusBadge status={part.status} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-[#ece3d7]/35 px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem] space-y-8">
          {project.parts.map((part, index) => (
            <article
              key={part.id}
              id={part.id}
              className="scroll-mt-28 rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-paper sm:p-9"
            >
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-4xl">
                  <p className="eyebrow">
                    Question {String(index + 1).padStart(2, '0')}
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
                      <strong className="font-semibold text-ink">Limit:</strong>{' '}
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
