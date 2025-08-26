export default function MCPServerSection() {
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200">
      <h3 className="text-lg font-semibold mb-6">MCP Server & Discovery</h3>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-3">MCP Tools (JSON-RPC 2.0)</h4>
          <div className="text-sm space-y-2">
            <div className="text-center">
              <code className="font-mono text-primary-600 block mb-1">
                contact
              </code>
              <p className="text-gray-600">Professional contact info</p>
            </div>
            <div className="text-center">
              <code className="font-mono text-primary-600 block mb-1">bio</code>
              <p className="text-gray-600">Biography (short/full)</p>
            </div>
            <div className="text-center">
              <code className="font-mono text-primary-600 block mb-1">
                resume
              </code>
              <p className="text-gray-600">Work experience</p>
            </div>
            <div className="text-center">
              <code className="font-mono text-primary-600 block mb-1">
                projects
              </code>
              <p className="text-gray-600">Engineering projects</p>
            </div>
            <div className="text-center">
              <code className="font-mono text-primary-600 block mb-1">
                community
              </code>
              <p className="text-gray-600">Community & thought leadership</p>
            </div>
            <div className="text-center">
              <code className="font-mono text-primary-600 block mb-1">
                full-profile
              </code>
              <p className="text-gray-600">Complete profile</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Agent Discovery</h4>
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
              <code className="font-mono text-primary-600">/mcp-test</code>
              <p className="text-gray-600">Visual testing interface</p>
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
            href="/mcp-test"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary-600 hover:text-primary-700"
          >
            Test MCP Server
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
          <a
            href="/llms.txt"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary-600 hover:text-primary-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Instructions
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
          <a
            href="/api/docs"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary-600 hover:text-primary-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs
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
          <a
            href="https://github.com/iamandycohen/me"
            className="inline-flex items-center gap-2 font-mono text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            View Repository
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
  );
}
