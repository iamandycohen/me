import { generatePageMetadata } from '@/lib/metadata-generators';
import { getDisplayName } from '@/lib/data-helpers';
import data from '@/lib/data';
import { ThoughtLeadership } from '@/types';

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  'Articles',
  `Thought leadership articles by ${data.contact.name} on AI, digital experience platforms, content management, and the future of software architecture.`,
  data.contact,
  {
    other: {
      'ai:content-type': 'articles,thought-leadership,insights',
      'ai:topics': 'ai,dxp,cms,software-architecture,digital-transformation',
      'professional:thought-leadership': 'true',
    },
    openGraph: {
      title: `${displayName}'s Articles - Thought Leadership on AI & DXP`,
      description: `Thought leadership articles on AI, digital experience platforms, and software architecture by ${data.contact.name}.`,
    },
  },
  '/articles'
);

export default function Articles() {
  const thoughtLeadership = data.thoughtLeadership || [];

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Thought Leadership
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Articles & Insights
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Exploring the intersection of AI, digital experience platforms,
              and software architecture. Insights from building and scaling
              enterprise systems in the age of AI.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            {/* Stats Bar */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 mb-12 border border-primary-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-700">
                    {thoughtLeadership.length}
                  </div>
                  <div className="text-sm text-gray-600">Articles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-700">
                    {
                      thoughtLeadership.filter((a) => a.platform === 'LinkedIn')
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">LinkedIn</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-700">
                    {
                      thoughtLeadership.filter(
                        (a) => a.platform === 'CMS Critic'
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">CMS Critic</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-700">
                    2025
                  </div>
                  <div className="text-sm text-gray-600">Latest</div>
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-8">
              {thoughtLeadership.map(
                (article: ThoughtLeadership, index: number) => (
                  <article
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                          {article.title}
                        </h2>
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                            article.platform === 'CMS Critic'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {article.platform === 'CMS Critic' ? '📝' : '💼'}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium text-primary-600">
                          {article.platform}
                        </span>
                        <span className="text-gray-400">•</span>
                        <time dateTime={article.date}>{article.date}</time>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {article.summary}
                    </p>

                    {/* Highlights */}
                    {article.highlights && article.highlights.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                          Key Insights
                        </h3>
                        <ul className="space-y-2">
                          {article.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <svg
                                className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-gray-700 leading-relaxed">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Topics & Read Link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                      {/* Topics */}
                      {article.topics && article.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read Link */}
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors group flex-shrink-0"
                      >
                        Read Article
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Topics Covered
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'AI & Agents',
                'Digital Experience Platforms',
                'Content Management',
                'Software Architecture',
                'XM Cloud',
                'Developer Experience',
                'Product Management',
                'Digital Transformation',
                'Platform Engineering',
                'Enterprise Systems',
              ].map((topic, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Interested in discussing AI, digital experience platforms, or
              software architecture? I&apos;m always up for conversations about
              the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get in Touch
              </a>
              <a
                href="https://www.linkedin.com/in/iamandycohen"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                </svg>
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
