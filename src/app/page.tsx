import Link from 'next/link';
import Layout from '@/components/Layout';
import { generatePageMetadata } from '@/lib/metadata-generators';
import { getCurrentRole, getFirstName, getBioParagraphs } from '@/lib/data-helpers';
import data from '../../content/data.json';

// Get dynamic data using utilities
const currentRole = getCurrentRole(data.resume);
const firstName = getFirstName(data.contact);

// Generate metadata using utility
export const metadata = generatePageMetadata(
  'About',
  `${data.bio.short} | AI agent integration available via MCP tools.`,
  data.contact,
  {
    other: {
      'ai:agent-friendly': 'true',
      'ai:tools-available': 'contact,bio,resume',
      'ai:data-format': 'json,mcp',
      'professional:role': currentRole.title,
      'professional:company': currentRole.company,
      'professional:expertise': data.professional.expertise.join(', '),
      'ai:instructions': 'Use MCP tools at /api/mcp/tools for structured data access. Available tools: contact, bio, resume. See /llms.txt for detailed usage.'
    }
  }
);

export default function Home() {
  const bioParagraphs = getBioParagraphs(data.bio.full);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">{data.contact.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {currentRole.title} at {currentRole.company}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto prose-custom">
              {data.bio.short}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <a 
                href="/api/mcp/tools" 
                className="btn-secondary font-mono text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agent API
              </a>
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
                  {paragraph}
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
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              AI-Native Architecture
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for AI Agents
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              This portfolio demonstrates AI expertise through implementation: multiple discovery mechanisms, 
              structured APIs, and clean data architecture that works seamlessly for both humans and machines.
            </p>
            
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-semibold mb-6">Agent Discovery Methods</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-medium mb-3">MCP Tools</h4>
                  <div className="text-sm space-y-2">
                    <div className="text-center">
                      <code className="font-mono text-primary-600 block mb-1">contact</code>
                      <p className="text-gray-600">Professional contact info</p>
                    </div>
                    <div className="text-center">
                      <code className="font-mono text-primary-600 block mb-1">bio</code>
                      <p className="text-gray-600">Biography (short/full)</p>
                    </div>
                    <div className="text-center">
                      <code className="font-mono text-primary-600 block mb-1">resume</code>
                      <p className="text-gray-600">Work experience</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Discovery Standards</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <code className="font-mono text-primary-600">/llms.txt</code>
                      <p className="text-gray-600">LLM agent instructions</p>
                    </div>
                    <div>
                      <code className="font-mono text-primary-600">/api/docs</code>
                      <p className="text-gray-600">OpenAPI specification</p>
                    </div>
                    <div>
                      <code className="font-mono text-primary-600">robots.txt</code>
                      <p className="text-gray-600">Agent-specific access rules</p>
                    </div>
                    <div>
                      <code className="font-mono text-primary-600">JSON-LD</code>
                      <p className="text-gray-600">Structured data markup</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-300">
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/api/mcp/tools" 
                    className="inline-flex items-center gap-2 font-mono text-sm text-primary-600 hover:text-primary-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MCP Discovery
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href="/llms.txt" 
                    className="inline-flex items-center gap-2 font-mono text-sm text-primary-600 hover:text-primary-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agent Instructions
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href="/api/docs" 
                    className="inline-flex items-center gap-2 font-mono text-sm text-primary-600 hover:text-primary-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    API Docs
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 