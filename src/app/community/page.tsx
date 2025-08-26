import data from "../../../content/data.json";
import { addSitecoreLinks } from "@/lib/utils";
import type { Presentation, MVPAward } from "@/types";
import { generatePageMetadata } from "@/lib/metadata-generators";

export const metadata = generatePageMetadata(
  "Community",
  "Community leadership, MVP recognition, conference presentations, and thought leadership in CMS architecture and XM Cloud development.",
  data.contact
);

export default function Community() {
  const {
    mvpAwards,
    mvpProfileUrl,
    description,
    presentations,
    featuredMedia,
  } = data.community;
  const { podcasts } = data.community.mediaResources;

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Community</h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {addSitecoreLinks(description)}
            </p>
          </div>

          {/* CSS-Only Tabbed Interface */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-0" role="tablist">
                <a
                  href="#mvp-awards"
                  className="tab-nav-link px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 focus:outline-none focus:text-primary-600 focus:border-primary-600 transition-all duration-200"
                  role="tab"
                  aria-controls="mvp-awards"
                >
                  🏆 MVP Awards
                </a>
                <a
                  href="#presentations"
                  className="tab-nav-link px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 focus:outline-none focus:text-primary-600 focus:border-primary-600 transition-all duration-200"
                  role="tab"
                  aria-controls="presentations"
                >
                  🎤 Presentations
                </a>
                <a
                  href="#media"
                  className="tab-nav-link px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 focus:outline-none focus:text-primary-600 focus:border-primary-600 transition-all duration-200"
                  role="tab"
                  aria-controls="media"
                >
                  🎧 Media & Podcasts
                </a>
              </nav>
            </div>

            {/* Tab Content Panels */}
            <div className="p-8">
              {/* MVP Awards Tab */}
              <section
                id="mvp-awards"
                className="tab-content"
                role="tabpanel"
                aria-labelledby="mvp-awards-tab"
              >
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Sitecore MVP Recognition
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <a
                        href={mvpProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Official MVP Profile
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {mvpAwards &&
                    mvpAwards.map((award: MVPAward, _index: number) => (
                      <div
                        key={award.year}
                        className={`rounded-lg border p-8 shadow-sm ${
                          award.status === "Current"
                            ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${
                                award.status === "Current"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              🏆
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl font-bold text-gray-900">
                                {award.year} {award.type} MVP
                              </h3>
                              {award.status === "Current" && (
                                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-sm font-medium rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {addSitecoreLinks(award.description)}
                            </p>

                            {award.quote && (
                              <blockquote className="text-gray-700 italic leading-relaxed border-l-4 border-yellow-400 pl-4 mb-4">
                                &ldquo;{addSitecoreLinks(award.quote)}&rdquo;
                                {award.quoteSource && (
                                  <cite className="block text-sm text-gray-600 mt-2 not-italic">
                                    — {award.quoteSource}
                                  </cite>
                                )}
                              </blockquote>
                            )}

                            {award.announcementUrl && (
                              <a
                                href={award.announcementUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                              >
                                Official Announcement
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              {/* Presentations Tab */}
              <section
                id="presentations"
                className="tab-content hidden"
                role="tabpanel"
                aria-labelledby="presentations-tab"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Conference Presentations
                  </h2>
                  <p className="text-gray-600">
                    Technical presentations and live demonstrations at industry
                    conferences and community events.
                  </p>
                </div>

                <div className="space-y-8">
                  {presentations.map(
                    (presentation: Presentation, index: number) => (
                      <div
                        key={index}
                        className={`bg-white rounded-lg border border-gray-200 p-8 shadow-sm ${
                          presentation.isHistoric
                            ? "border-yellow-300 bg-yellow-50"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                  {presentation.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-800 mb-2">
                                  {presentation.sessionTitle}
                                </p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                                  <span>{presentation.organization}</span>
                                  <span className="hidden sm:inline">•</span>
                                  <span>{presentation.location}</span>
                                  <span className="hidden sm:inline">•</span>
                                  <span>{presentation.date}</span>
                                  {presentation.isHistoric && (
                                    <span className="text-yellow-600 text-sm font-medium">
                                      (Historic)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {presentation.topics.map((topic, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                >
                                  {topic}
                                </span>
                              ))}
                              {presentation.isLiveDemo && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                                  Live Demo
                                </span>
                              )}
                            </div>

                            <p className="text-gray-700 mb-4">
                              {addSitecoreLinks(presentation.description)}
                            </p>

                            {presentation.documentationQuote && (
                              <blockquote className="border-l-4 border-gray-300 pl-4 text-gray-700 italic mb-4">
                                &ldquo;{presentation.documentationQuote}
                                &rdquo;
                                {presentation.documentationSource && (
                                  <cite className="block text-sm text-gray-600 mt-1 not-italic">
                                    — {presentation.documentationSource}
                                  </cite>
                                )}
                              </blockquote>
                            )}

                            <div className="flex flex-wrap gap-4">
                              {presentation.videoUrl && (
                                <a
                                  href={presentation.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Watch Video
                                </a>
                              )}
                              {presentation.sessionizeUrl && (
                                <a
                                  href={presentation.sessionizeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                  Session Details
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              )}
                              {presentation.documentationUrl && (
                                <a
                                  href={presentation.documentationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                                >
                                  Read More
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Media & Podcasts Tab */}
              <section
                id="media"
                className="tab-content hidden"
                role="tabpanel"
                aria-labelledby="media-tab"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Media & Podcasts
                  </h2>
                  <p className="text-gray-600">
                    Featured podcast appearances and media coverage discussing
                    CMS architecture and technology leadership.
                  </p>
                </div>

                {/* Featured Media */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8 shadow-sm mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                        🎙️
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {featuredMedia.title}
                      </h3>
                      <p className="text-lg text-blue-700 font-medium mb-3">
                        {featuredMedia.episode}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {addSitecoreLinks(featuredMedia.description)}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={featuredMedia.podcastUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.82L4.066 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.066l4.317-3.82z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Listen to Podcast
                        </a>
                        <a
                          href={featuredMedia.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Watch Video
                        </a>
                        <a
                          href={featuredMedia.blogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Read Blog Post
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Podcasts */}
                <div className="space-y-6">
                  {podcasts.map((podcast, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {podcast.title}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {podcast.description}
                      </p>
                      <a
                        href={podcast.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Listen Now
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
