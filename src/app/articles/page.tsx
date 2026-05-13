import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata-generators';
import { getDisplayName } from '@/lib/data-helpers';
import { addSitecoreLinks } from '@/lib/utils';
import data from '@/lib/data';
import { ThoughtLeadership } from '@/types';

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  'Articles',
  `Thought leadership articles by ${data.contact.name} on AI, digital experience platforms, content management, and the future of software architecture.`,
  data.contact,
  {
    openGraph: {
      title: `${displayName}'s Articles — Thought Leadership on AI & DXP`,
      description: `Thought leadership articles on AI, digital experience platforms, and software architecture by ${data.contact.name}.`,
    },
  },
  '/articles'
);

export default function Articles() {
  const thoughtLeadership: ThoughtLeadership[] = data.thoughtLeadership || [];

  return (
    <>
      <section className="pt-20 md:pt-28 lg:pt-32">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Writing</p>
            <h1 className="text-balance mb-6">
              Writing{' '}
              <span className="italic text-ink/60">&amp; arguments.</span>
            </h1>
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
              Exploring the intersection of AI, digital experience platforms,
              and software architecture. Insights from building and scaling
              enterprise systems in the age of AI.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl">
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {thoughtLeadership.map(
                (article: ThoughtLeadership, index: number) => (
                  <li key={index} className="py-10 md:py-12">
                    <article className="grid md:grid-cols-12 gap-6 md:gap-10">
                      <div className="md:col-span-3">
                        <p className="text-sm font-medium text-accent tracking-wide">
                          {article.platform}
                        </p>
                        <time
                          dateTime={article.date}
                          className="text-sm text-ink/50 mt-1 block"
                        >
                          {article.date}
                        </time>
                      </div>

                      <div className="md:col-span-9">
                        <h2 className="font-serif text-2xl md:text-[1.75rem] text-ink mb-4 leading-tight text-balance">
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                          >
                            {article.title}
                          </a>
                        </h2>

                        <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-6 text-pretty">
                          {addSitecoreLinks(article.summary)}
                        </p>

                        {article.highlights &&
                          article.highlights.length > 0 && (
                            <ul className="space-y-2 mb-6 text-ink/70">
                              {article.highlights.map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className="flex gap-3 leading-relaxed"
                                >
                                  <span
                                    className="text-accent select-none pt-1"
                                    aria-hidden="true"
                                  >
                                    —
                                  </span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          {article.topics && article.topics.length > 0 && (
                            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-ink/50">
                              {article.topics.map((topic, idx) => (
                                <li key={idx}>{topic}</li>
                              ))}
                            </ul>
                          )}

                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline text-sm font-medium whitespace-nowrap"
                          >
                            Read article →
                          </a>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-ink/10">
        <div className="container-max">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Topics</p>
            <h2 className="mb-8">What I write about.</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-ink/70">
              {[
                'AI & Agents',
                'Digital Experience Platforms',
                'Platform Engineering',
                'Software Architecture',
                'Product Strategy',
              ].map((topic, index, arr) => (
                <li
                  key={index}
                  className="font-serif italic text-lg md:text-xl"
                >
                  {topic}
                  {index < arr.length - 1 && (
                    <span className="text-accent/60 ml-4" aria-hidden="true">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mt-12">
              <Link href="/contact" className="btn-primary">
                Start a conversation
              </Link>
              <a
                href="https://www.linkedin.com/in/iamandycohen"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
