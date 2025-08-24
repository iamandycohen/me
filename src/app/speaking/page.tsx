import Layout from '@/components/Layout';
import { generatePageMetadata } from '@/lib/metadata-generators';
import { addSitecoreLinks } from '@/lib/utils';
import data from '../../../content/data.json';

export const metadata = generatePageMetadata(
  'Speaking & Media',
  `Andy Cohen's speaking engagements, podcasts, and thought leadership in CMS and AI.`,
  data.contact
);

export default function Speaking() {
  const { mvpStatus, mvpProfileUrl, description, presentations, featuredMedia } = data.speaking;
  const { podcasts } = data.speaking.mediaResources;

  // Filter presentations by type  
  const videoPresentations = presentations.filter(p => p.videoUrl);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Speaking & Media
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {addSitecoreLinks(description)}
              </p>
            </div>

            {/* Sitecore MVP Status */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Sitecore MVP</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{mvpStatus}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Recognized as a {addSitecoreLinks('Sitecore')} Most Valuable Professional for demonstrating exceptional
                      support and engagement with the global Sitecore community through speaking, knowledge sharing,
                      and technical leadership.
                    </p>
                    <a
                      href={mvpProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium mt-3"
                    >
                      View MVP Profile
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>





            {/* Media & Resources */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Media & Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">

                {/* Video Presentations */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16v-4a4 4 0 118 0v4M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Presentations</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Conference talks and live demonstrations showcasing XM Cloud architecture and deployment innovations.
                      </p>
                      <div className="space-y-2">
                        {videoPresentations.map((presentation: any, index: number) => (
                          <a
                            key={index}
                            href={presentation.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block text-sm font-medium ${presentation.isFeatured ? 'text-red-600 hover:text-red-700 font-semibold' : 'text-primary-600 hover:text-primary-700'}`}
                          >
                            {presentation.isFeatured ? '⭐ ' : ''}{presentation.isLiveDemo ? '🎯 ' : ''}{presentation.title} ({presentation.date}) →
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Podcast Appearances */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Podcast Appearances</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        In-depth discussions on CMS architecture, XM Cloud development, and industry insights.
                      </p>
                      
                      {/* Featured Episode */}
                      {featuredMedia && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">{featuredMedia.title}</h4>
                          <p className="text-gray-700 text-sm mb-4">
                            Featured guest discussing &ldquo;{featuredMedia.episode}&rdquo; - {addSitecoreLinks(featuredMedia.description)}
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <a
                              href={featuredMedia.blogUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Read Blog Post
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                            <a
                              href={featuredMedia.podcastUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Listen to Podcast
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                            {featuredMedia.videoUrl && (
                              <a
                                href={featuredMedia.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Watch Video
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16v-4a4 4 0 118 0v4M5 20h14a2 2 0 002-2V6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </a>
                            )}
                          </div>
                          <hr className="border-gray-200" />
                        </div>
                      )}

                      {/* Other Podcast Links */}
                      <div className="space-y-2">
                        {podcasts.map((podcast, index) => (
                          <a
                            key={index}
                            href={podcast.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            {podcast.title} →
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Conference Presentations */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Conference Presentations</h2>
              <div className="space-y-8">
                {presentations.map((presentation: any, index: number) => (
                  <div key={index} className={`bg-white rounded-lg border border-gray-200 p-8 shadow-sm ${presentation.isFeatured ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50' : ''} ${presentation.isHistoric ? 'border-yellow-300 bg-yellow-50' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {presentation.isFeatured && <span className="mr-2 text-red-600">⭐</span>}
                          {presentation.title}
                          {presentation.isUpcoming && <span className="ml-2 text-green-600 text-sm font-medium">(Upcoming)</span>}
                          {presentation.isHistoric && <span className="ml-2 text-yellow-600 text-sm font-medium">(Historic)</span>}
                          {presentation.isFeatured && <span className="ml-2 text-red-600 text-sm font-medium">(Featured)</span>}
                        </h3>
                        <p className="text-gray-600 font-medium">{presentation.location}</p>
                      </div>
                      <div className="text-sm text-gray-500 mt-2 md:mt-0">
                        {presentation.date}
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      &ldquo;{presentation.sessionTitle}&rdquo;
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {presentation.isFeatured && <span className="text-red-600 font-medium mr-2">&ldquo;Andy&apos;s Personal Favorite&rdquo; - </span>}
                      {addSitecoreLinks(presentation.description)}
                      {presentation.isLiveDemo && <span className="ml-2 text-orange-600 font-medium">⚡ Live Demo</span>}
                    </p>
                    
                    {/* Links */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {presentation.videoUrl && (
                        <a
                          href={presentation.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Watch Video
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {presentation.sessionizeUrl && (
                        <a
                          href={presentation.sessionizeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View on Sessionize
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {presentation.documentationUrl && (
                        <a
                          href={presentation.documentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Community Recap
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* Documentation Quote */}
                    {presentation.documentationQuote && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-blue-800 text-sm">
                          <strong>{presentation.documentationSource}:</strong> &ldquo;{presentation.documentationQuote}&rdquo;
                        </p>
                      </div>
                    )}

                                         {/* Topics */}
                     <div className="flex flex-wrap gap-2">
                       {presentation.topics.map((topic: string, tIndex: number) => (
                         <span key={tIndex} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                           {topic}
                         </span>
                       ))}
                     </div>
                  </div>
                ))}
              </div>
            </section>



            {/* Community Impact */}
            <section>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold mb-4">Sharing Knowledge, Building Community</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Every presentation, podcast appearance, and community interaction is an opportunity to advance
                    our collective understanding of what&apos;s possible with modern CMS architecture. From the founding
                    days of {addSitecoreLinks('XM Cloud')} to today&apos;s AI-driven innovations, the goal is always to help others
                    build better digital experiences.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Community First</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Knowledge Sharing</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Technical Excellence</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Continuous Learning</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </Layout>
  );
} 