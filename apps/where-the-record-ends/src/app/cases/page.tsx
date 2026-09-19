import { researchCases } from '@where-the-record-ends/genealogy-content';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Open research cases',
  description:
    'Questions, competing explanations, and evidence that could change the current family-history assessment.',
};

const assessmentStyles = {
  unresolved: 'border-dashed border-accent/45 bg-accent/[0.035]',
  accepted: 'border-moss/25 bg-moss/[0.045]',
  conflicting: 'border-ink/20 bg-ink/[0.025]',
} as const;

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Open research cases"
        title="The uncertainty belongs in the story."
        introduction="A case file shows more than an answer. It preserves the competing explanations, the record trail, and the evidence that could force a new conclusion."
      />
      <section className="px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-5 lg:grid-cols-3">
            {researchCases.map((item) => (
              <article
                key={item.id}
                className={`flex min-h-[30rem] flex-col rounded-[2rem] border p-7 sm:p-8 ${assessmentStyles[item.assessmentType]}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Case {item.number}</p>
                  <span className="rounded-full border border-current/15 px-3 py-1 text-[0.58rem] uppercase tracking-[0.13em] text-ink/55">
                    {item.assessmentType}
                  </span>
                </div>
                <h2 className="balanced mt-8 font-serif text-4xl leading-tight">
                  {item.title}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-ink/65">
                  {item.summary}
                </p>
                <dl className="mt-7 space-y-5 border-t border-ink/10 pt-6 text-sm">
                  <div>
                    <dt className="eyebrow !text-[0.54rem]">Known</dt>
                    <dd className="mt-2 leading-relaxed text-ink/65">
                      {item.known}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !text-[0.54rem]">Not established</dt>
                    <dd className="mt-2 leading-relaxed text-ink/65">
                      {item.unknown}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/cases/${item.id}`}
                  className="mt-auto inline-flex items-center justify-between border-t border-ink/10 pt-6 text-sm font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Enter the case <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
