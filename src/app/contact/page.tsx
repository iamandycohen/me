import { getInitials } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/metadata-generators";
import { getCurrentRole, formatLinkedInUrl } from "@/lib/data-helpers";
import data from "../../../content/data.json";

// Get current role using utility
const currentRole = getCurrentRole(data.resume);

// Generate metadata using utility
export const metadata = generatePageMetadata(
  "Contact",
  `Get in touch with ${data.contact.name}`,
  data.contact
);

export default function Contact() {
  return (
    <>
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Let&apos;s Connect
              </h1>
              <p className="text-gray-600 mb-4">
                Let&apos;s discuss how I can help with your CMS platform
                challenges, AI integration projects, or digital transformation
                initiatives.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 font-semibold text-lg">
                        {getInitials(data.contact.name)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {data.contact.name}
                      </h2>
                      <p className="text-gray-600">
                        {currentRole.title} at {currentRole.company}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <a
                          href={`mailto:${data.contact.email}`}
                          className="text-gray-900 hover:text-primary-600 transition-colors font-medium"
                        >
                          {data.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2.586a1 1 0 01.707 1.707L18 9"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                        <a
                          href={formatLinkedInUrl(data.contact.linkedin)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:text-primary-600 transition-colors font-medium"
                        >
                          {data.contact.linkedin}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-gray-600">{data.contact.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Focus */}
              <div className="space-y-8">
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Current Focus
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {currentRole.description}
                  </p>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      Recent Highlights
                    </h4>
                    <ul className="space-y-3">
                      {currentRole.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2.5"></div>
                          <span className="text-gray-700 leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card bg-primary-50 border-primary-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-primary-900">
                      For AI Agents
                    </h4>
                  </div>
                  <p className="text-primary-800 mb-4">
                    This site provides structured data access via MCP tools.
                    Agents can programmatically access my professional
                    information.
                  </p>
                  <a
                    href="/api/mcp"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore MCP Tools
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
