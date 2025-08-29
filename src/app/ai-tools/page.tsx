import { generatePageMetadata } from "@/lib/metadata-generators";
import { getDisplayName } from "@/lib/data-helpers";
import MCPExplainer from "@/components/mcp/MCPExplainer";
import MCPCodeExamples from "@/components/mcp/MCPCodeExamples";

import MCPClientSDKDemo from "@/components/mcp/MCPClientSDKDemo";
import data from "@/lib/data";

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  "AI Tools Demo",
  `Interactive demonstration of AI tools and Model Context Protocol implementation by ${data.contact.name} - explore live MCP endpoints and AI-driven data access.`,
  data.contact,
  {
    keywords: ['AI tools', 'AI demonstration', 'MCP', 'Model Context Protocol', 'AI integration', 'Andy Cohen', 'interactive demo'],
    other: {
      "ai:tool-type": "demonstration,ai-tools,interactive",
      "ai:protocol": "model-context-protocol,json-rpc",
      "ai:demonstration": "true",
      "developer:ai-showcase": "true",
    },
    openGraph: {
      title: `${displayName}'s AI Tools Demo`,
      description: `Interactive demonstration of AI tools and Model Context Protocol implementation. Explore live AI-driven data access and tool integration.`,
      type: "website",
    },
  },
  "/ai-tools",
);

export default function MCPTestPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* MCP Education Section */}
      <div className="mb-12">
        <MCPExplainer variant="detailed" />
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Interactive MCP Testing
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test the live MCP server implementation - see how AI agents discover and use structured data
        </p>
      </div>

      {/* Official MCP SDK Testing Interface */}
      <div className="mb-12">
        <MCPClientSDKDemo />
      </div>

      {/* Code Examples */}
      <div className="mb-12">
        <MCPCodeExamples />
      </div>

      {/* Why This Matters Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Why This Implementation Matters</h2>
          <p className="text-lg text-gray-600">
            Building for tomorrow&apos;s AI ecosystem, today
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/70 rounded-lg p-4 border border-white/50">
            <div className="text-center mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-purple-900">Early Adoption</h3>
            </div>
            <p className="text-sm text-purple-700">
              MCP is emerging in 2024. By implementing it now, this site is positioned 
              for the AI-native web that&apos;s coming in 2025+.
            </p>
          </div>

          <div className="bg-white/70 rounded-lg p-4 border border-white/50">
            <div className="text-center mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-blue-900">Production Ready</h3>
            </div>
            <p className="text-sm text-blue-700">
              This isn&apos;t a demo - it&apos;s a fully functional MCP server handling real 
              requests in production, demonstrating enterprise-grade implementation.
            </p>
          </div>

          <div className="bg-white/70 rounded-lg p-4 border border-white/50">
            <div className="text-center mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-green-900">Strategic Thinking</h3>
            </div>
            <p className="text-sm text-green-700">
              Shows deep understanding of where AI development is heading - 
              not just following trends, but anticipating the infrastructure needs.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-white/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">
              Live production MCP server - not a prototype
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
