import Link from 'next/link';

import { absoluteUrl, researchMailto } from '@/lib/site';

export function ResearchContactCta({
  context,
  sourcePath,
}: {
  context: string;
  sourcePath: string;
}) {
  const sourceUrl = absoluteUrl(sourcePath);
  const emailHref = researchMailto({
    subject: `Research lead: ${context}`,
    body: [
      `Page: ${sourceUrl}`,
      '',
      'Person, family, or topic:',
      '',
      'Record, correction, or lead:',
      '',
      'Source, repository, or URL:',
    ].join('\n'),
  });

  return (
    <section
      aria-labelledby="research-contact-title"
      className="border-t border-paper/10 bg-ink px-5 py-14 text-paper sm:px-8 md:py-20"
    >
      <div className="mx-auto grid max-w-[92rem] gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="max-w-3xl">
          <p className="eyebrow !text-accent-soft">Contribute to this case</p>
          <h2
            id="research-contact-title"
            className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl"
          >
            Know something about this case?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/65 sm:text-base">
            If you have an original document, family record, photograph,
            cemetery detail, or correction related to {context}, I&apos;d like
            to hear from you. The email will include this page for context.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <a
            className="inline-flex rounded-full bg-accent-soft px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
            href={emailHref}
          >
            Share a record or lead
          </a>
          <Link
            className="text-sm text-paper/65 underline decoration-paper/20 underline-offset-4 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
            href="/contact"
          >
            See contact guidance
          </Link>
        </div>
      </div>
    </section>
  );
}
