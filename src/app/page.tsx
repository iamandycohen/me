import Link from "next/link";
import Image from "next/image";
import MCPServerSection from "@/components/MCPServerSection";
import { generatePageMetadata } from "@/lib/metadata-generators";
import {
  getCurrentRole,
  getBioParagraphs,
  getDisplayName,
} from "@/lib/data-helpers";
import { addSitecoreLinks } from "@/lib/utils";
import data from "../../content/data.json";

// Get dynamic data using utilities
const displayName = getDisplayName(data.contact);
const currentRole = getCurrentRole(data.resume);

// Generate metadata using utility
export const metadata = generatePageMetadata(
  `${displayName}`,
  `${data.bio.short} | AI agent integration available via MCP tools.`,
  data.contact,
  {
    other: {
      "ai:agent-friendly": "true",
      "ai:tools-available":
        "contact,bio,resume,projects,community,full-profile",
      "ai:data-format": "json,mcp",
      "professional:role": currentRole.title,
      "professional:company": currentRole.company,
      "professional:expertise": data.professional.expertise.join(", "),
      "ai:instructions":
        "Use MCP server at /api/mcp for structured data access. Available tools: contact, bio, resume, projects, community, full-profile. See /llms.txt for detailed usage.",
    },
  }
);

export default function Home() {
  const bioParagraphs = getBioParagraphs(data.bio.full);

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <Image
                  src="/headshot.png"
                  alt={data.contact.name}
                  width={288}
                  height={288}
                  className="w-64 h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl border-8 border-white"
                  priority
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="gradient-text">{data.contact.name}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  {currentRole.title} at {currentRole.company}
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl lg:max-w-none prose-custom">
                  {addSitecoreLinks(data.bio.short)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/contact" className="btn-primary">
                    Get in Touch
                  </Link>
                  <a
                    href="/mcp-test"
                    className="btn-secondary font-mono text-sm"
                  >
                    MCP Server
                  </a>
                  <a
                    href="https://github.com/iamandycohen/me"
                    className="btn-secondary inline-flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto leading-relaxed text-gray-700">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {addSitecoreLinks(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Door Explainer */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              AI-Native Architecture
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for AI Agents
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              This portfolio demonstrates AI expertise through implementation:
              MCP protocol compliance, structured APIs, and clean data
              architecture that works seamlessly for both humans and machines.
            </p>

            <MCPServerSection />
            
          </div>
        </div>
      </section>
    </>
  );
}
