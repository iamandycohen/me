import React from 'react';

interface MCPExplainerProps {
  variant?: 'homepage' | 'detailed' | 'compact';
}

export default function MCPExplainer({ variant = 'homepage' }: MCPExplainerProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">What's MCP?</h4>
            <p className="text-sm text-gray-600">
              Model Context Protocol - the emerging standard for AI agents to securely access external data and tools. 
              Think of it as "API design for the AI era."
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Model Context Protocol (MCP)
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Future of AI-Human Integration</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            MCP is Anthropic's open standard that's revolutionizing how AI agents access external data and tools. 
            It's like REST APIs, but designed specifically for the age of AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                The Problem
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>AI agents can't reliably access external data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>Every integration requires custom code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>No standard way for AIs to discover capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>Security and context management is inconsistent</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                The MCP Solution
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Standardized protocol for AI-tool communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Secure, bidirectional data exchange</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Auto-discovery of available tools and data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Context-aware, intelligent integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-center">Why This Matters Now</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">2024</div>
              <div className="text-sm text-gray-600">MCP is emerging</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">2025+</div>
              <div className="text-sm text-gray-600">Widespread adoption</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">Future</div>
              <div className="text-sm text-gray-600">AI-native standard</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Homepage variant
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl p-6 border border-blue-100">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full text-xs font-medium mb-3">
          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          What's MCP?
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Model Context Protocol</h3>
        <p className="text-sm text-gray-600">
          The emerging standard that lets AI agents securely access external tools and data - 
          think "REST APIs designed for the AI era"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white/70 rounded-lg p-3 border border-white/50">
          <div className="text-lg font-semibold text-blue-600 mb-1">Before MCP</div>
          <div className="text-xs text-gray-600">Custom integrations<br/>Inconsistent access<br/>Manual discovery</div>
        </div>
        <div className="bg-white/70 rounded-lg p-3 border border-white/50">
          <div className="text-lg font-semibold text-green-600 mb-1">With MCP</div>
          <div className="text-xs text-gray-600">Standard protocol<br/>Secure & reliable<br/>Auto-discovery</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500 font-medium">
          🚀 This website implements MCP ahead of mainstream adoption
        </div>
      </div>
    </div>
  );
}
