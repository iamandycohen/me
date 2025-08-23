import Layout from '@/components/Layout';
import { generatePageMetadata } from '@/lib/metadata-generators';
import { getRoleDuration } from '@/lib/data-helpers';
import data from '../../../content/data.json';

// Generate metadata using utility
export const metadata = generatePageMetadata(
  'Resume',
  `Professional experience and career history for ${data.contact.name}`,
  data.contact
);

export default function Resume() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Professional Experience
              </h1>
              <p className="text-lg text-gray-600">
                Building systems that scale, teams that thrive, and developer experiences that delight
              </p>
            </div>

            <div className="space-y-8">
              {data.resume.map((role, index) => (
                <div key={index} className="card">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {role.title}
                      </h2>
                      <h3 className="text-xl text-primary-600 font-medium mb-2">
                        {role.company}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {getRoleDuration(role)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {role.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2.5"></div>
                          <span className="text-gray-700 leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {data.resume.length === 1 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500 italic">
                  More experience details coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
} 