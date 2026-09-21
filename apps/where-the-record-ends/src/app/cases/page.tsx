import {
  highlandCreekReconstruction,
  researchCases,
  threeThomasesIdentityModel,
} from '@where-the-record-ends/genealogy-content';
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

const parentageInvestigations = [
  {
    href: '/cases/parentage/highland-creek',
    eyebrow: 'Evidence reconstruction',
    title: highlandCreekReconstruction.title,
    summary:
      'Follow the named heirs and recorded relationships around Highland Creek without turning the open parentage hypothesis into a proved family connection.',
    linkLabel: 'Explore the reconstruction',
  },
  {
    href: '/cases/parentage/three-thomases',
    eyebrow: 'Identity reconstruction',
    title: threeThomasesIdentityModel.title,
    summary:
      'Separate three documented men who shared the name Thomas and see which identities remain possible, excluded, or unresolved.',
    linkLabel: 'Meet the three Thomases',
  },
] as const;

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

          <div className="mt-14 border-t border-ink/10 pt-10 md:mt-20 md:pt-14">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end">
              <div>
                <p className="eyebrow">Inside case 01</p>
                <h2 className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                  Parentage investigations
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-ink/65 sm:text-base">
                These focused reconstructions support the open question of
                Benjamin Meason’s parentage. They are working views within the
                parentage case—not additional top-level cases or proof of a
                particular parent-child relationship.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {parentageInvestigations.map((investigation) => (
                <article
                  key={investigation.href}
                  className="flex min-h-72 flex-col rounded-[1.75rem] border border-ink/10 bg-paper p-7 sm:p-8"
                >
                  <p className="eyebrow !text-[0.54rem]">
                    {investigation.eyebrow}
                  </p>
                  <h3 className="balanced mt-5 font-serif text-3xl leading-tight">
                    {investigation.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">
                    {investigation.summary}
                  </p>
                  <Link
                    href={investigation.href}
                    className="mt-auto inline-flex items-center justify-between border-t border-ink/10 pt-6 text-sm font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {investigation.linkLabel} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
