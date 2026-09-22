import type { Metadata } from 'next';

import { PageHero } from '@/components/PageHero';
import { researchEmail, researchMailto } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact the research',
  description:
    'Share a family record, original document, photograph, cemetery detail, research lead, or correction with Where the Record Ends.',
};

const emailHref = researchMailto({
  subject: 'Where the Record Ends research contribution',
  body: [
    'Person, family, or topic:',
    '',
    'Record, correction, or lead:',
    '',
    'Source, repository, or URL:',
    '',
    'Page that led you here:',
  ].join('\n'),
});

const usefulDetails = [
  'The person, family, place, or case your message concerns',
  'What the record says and where you found it',
  'A repository citation, catalog entry, or public URL when available',
  'The page or claim you believe should be corrected',
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contribute to the research"
        title="Have a record I haven't seen?"
        introduction="Are you researching the Meason or Mason family, Highland Creek, Benjamin Meason, or one of the related families in these records? I'd like to hear from you."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
          <div className="rounded-[2rem] bg-ink p-8 text-paper sm:p-12">
            <p className="eyebrow !text-accent-soft">Research correspondence</p>
            <h2 className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Share a document, lead, or correction.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-paper/65 sm:text-base">
              Original documents, family records, photographs, cemetery
              information, and well-sourced corrections are especially useful. A
              prepared email will prompt you for the context that helps me
              evaluate the contribution.
            </p>
            <a
              className="mt-8 inline-flex rounded-full bg-accent-soft px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
              href={emailHref}
            >
              Email the research project
            </a>
            <p className="mt-5 text-sm text-paper/55">
              Or write directly to{' '}
              <a
                className="text-accent-soft underline decoration-accent-soft/30 underline-offset-4 hover:text-paper"
                href={`mailto:${researchEmail}`}
              >
                {researchEmail}
              </a>
              .
            </p>
          </div>

          <aside className="rounded-[2rem] border border-ink/10 bg-cream p-8 sm:p-10">
            <p className="eyebrow">What helps most</p>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/65">
              {usefulDetails.map((detail) => (
                <li
                  key={detail}
                  className="grid grid-cols-[auto_1fr] gap-3 border-b border-ink/10 pb-4 last:border-0 last:pb-0"
                >
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">A note about privacy</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            Please keep private material private.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/65 sm:text-base">
            Please do not email DNA results, account credentials, restricted
            archive downloads, or sensitive information about living people. If
            a source has access or publication restrictions, describe it and
            where it can be found rather than forwarding the file.
          </p>
        </div>
      </section>
    </>
  );
}
