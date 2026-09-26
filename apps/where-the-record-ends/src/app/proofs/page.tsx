import { proofProjects } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowLink } from '@/components/ArrowLink';
import { PageHero } from '@/components/PageHero';
import { ProofStatusBadge } from '@/components/ProofStatusBadge';
import { absoluteUrl } from '@/lib/site';

const url = absoluteUrl('/proofs');

export const metadata: Metadata = {
  title: 'Proof paths',
  description:
    'Follow two family-history proof projects, the evidence behind each link, and the questions still open.',
  alternates: { canonical: url },
  openGraph: { title: 'Proof paths', url },
};

const standards = [
  'Research the question reasonably exhaustively.',
  'Cite sources completely and accurately.',
  'Analyze and correlate the evidence.',
  'Resolve conflicting evidence.',
  'Write a sound conclusion based on the strongest evidence.',
] as const;

const statusDescriptions = [
  {
    status: 'documented',
    description: 'A reviewed record directly names this narrow relationship.',
  },
  {
    status: 'accepted-indirect',
    description: 'A reasoned conclusion rests on correlated indirect evidence.',
  },
  {
    status: 'supported-inference',
    description: 'Evidence favors an explanation; a proof gap remains.',
  },
  {
    status: 'open',
    description: 'The available evidence does not establish the proposed link.',
  },
  {
    status: 'excluded',
    description: 'Reviewed evidence rules out this proposed identification.',
  },
  {
    status: 'not-assessed',
    description:
      'This link has not yet received a public assessment on this site.',
  },
] as const;

export default function ProofsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proof paths"
        title="What can I actually establish?"
        introduction="Two lines in my family history have led me to questions that deserve more than a name on a tree. I am following each connection back through the records, one claim at a time."
      />

      <section className="border-b border-ink/10 px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow">Why these paths</p>
            <h2 className="balanced mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              A family connection deserves an explanation.
            </h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-ink/70">
            <p>
              I want to understand where my Meason line leads beyond Benjamin. I
              also want to test the Sledge line that may connect my family to an
              earlier John Sledge and a Revolutionary-era claim. Each path
              contains links with different kinds of evidence and different
              questions still to answer.
            </p>
            <p>
              These pages show the current assessment for each link. A record
              can name one relationship directly while leaving the next
              generation open. A promising association can guide the search
              without becoming a parent-child connection in the family atlas.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div>
              <p className="eyebrow">The standard</p>
              <h2 className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                What makes a genealogical proof?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/65">
                I use the five parts of the{' '}
                <a
                  href="https://www.bcgcertification.org/ethics-standards"
                  className="font-medium text-accent underline underline-offset-4"
                >
                  Genealogical Proof Standard
                </a>{' '}
                to test a conclusion. A proof may be short or long, depending on
                the question and the evidence it takes to answer it.
              </p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {standards.map((standard, index) => (
                <li
                  key={standard}
                  className="rounded-2xl border border-ink/10 bg-paper p-5"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">
                    {standard}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem]">
          <p className="eyebrow">The work in progress</p>
          <h2 className="balanced mt-4 font-serif text-4xl sm:text-5xl">
            Two paths through the evidence
          </h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {proofProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col rounded-[2rem] border border-ink/10 bg-cream p-7 shadow-paper sm:p-9"
              >
                <ProofStatusBadge status={project.status} />
                <h3 className="balanced mt-7 font-serif text-4xl leading-tight">
                  {project.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-ink/65">
                  {project.summary}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ink/60">
                  {project.parts.length} questions tracked · Reviewed{' '}
                  {project.publication.reviewedOn}
                </p>
                <Link
                  href={`/proofs/${project.id}`}
                  className="mt-8 inline-flex items-center justify-between border-t border-ink/10 pt-6 text-sm font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Follow this proof path <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem]">
          <p className="eyebrow">Reading the assessments</p>
          <h2 className="mt-4 font-serif text-4xl">What the badges mean</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {statusDescriptions.map(({ status, description }) => (
              <div
                key={status}
                className="rounded-2xl border border-ink/10 bg-cream p-5"
              >
                <ProofStatusBadge status={status} />
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ArrowLink href="/cases">Explore the research cases</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
