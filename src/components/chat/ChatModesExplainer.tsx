"use client";

import { X, Info, Zap, Settings, Rocket } from "lucide-react";

interface ChatModesExplainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModesExplainer({ isOpen, onClose }: ChatModesExplainerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chat Mode Guide</h2>
            <p className="text-gray-600 mt-1">
              Understanding the 3 different AI chat implementations
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close explanation"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {/* Proxy Mode */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 text-white rounded-lg">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">🔄 Proxy Mode</h3>
                  <div className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                    Default & Recommended
                  </div>
                </div>
              </div>
              
              <p className="text-blue-800 mb-4 font-medium">
                Server-side MCP execution with full control over tool calls
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-blue-700">Real-time streaming of tool execution status</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-blue-700">Works locally without requiring public URLs</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-blue-700">Enhanced debugging with detailed tool call logging</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-blue-700">Full transparency into AI reasoning process</span>
                </div>
              </div>
              
              <div className="bg-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Best for:</strong> Development environments, debugging, and when you need complete visibility into AI tool interactions.
                </p>
              </div>
            </div>

            {/* Native Mode */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500 text-white rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-900">🎯 Native Mode</h3>
                  <div className="inline-block bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                    Production Optimized
                  </div>
                </div>
              </div>
              
              <p className="text-purple-800 mb-4 font-medium">
                OpenAI handles MCP tools directly using their native integration
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-purple-700">Tool calls execute on OpenAI&apos;s infrastructure</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-purple-700">Optimal performance with reduced server load</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-purple-700">Results shown after completion</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-sm text-purple-700">Requires publicly accessible MCP server</span>
                </div>
              </div>
              
              <div className="bg-purple-200 rounded-lg p-3">
                <p className="text-xs text-purple-800">
                  <strong>Best for:</strong> Production deployments where the MCP server is publicly accessible and you want optimal performance.
                </p>
              </div>
            </div>

            {/* Agents Mode */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 text-white rounded-lg">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-900">🤖 Agents Mode</h3>
                  <div className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                    Enhanced Experience
                  </div>
                </div>
              </div>
              
              <p className="text-green-800 mb-4 font-medium">
                OpenAI Agents SDK with enhanced streaming and tool interaction
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-green-700">Advanced agent orchestration capabilities</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-green-700">Real-time tool interaction updates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-green-700">Enhanced UX for complex multi-step tasks</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-green-700">Production-ready with comprehensive error handling</span>
                </div>
              </div>
              
              <div className="bg-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  <strong>Best for:</strong> Complex conversations requiring multiple tool interactions and enhanced user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Details Section */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Technical Implementation Details
            </h3>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Smart Mode Selection</h4>
                <p className="text-sm text-gray-600">
                  The system automatically selects the best available mode based on your environment configuration and gracefully falls back to proxy mode if needed.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Model Context Protocol</h4>
                <p className="text-sm text-gray-600">
                  All modes use the same MCP server with 6 professional tools: contact, biography, resume, projects, community contributions, and full profile access.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Environment Awareness</h4>
                <p className="text-sm text-gray-600">
                  The chat system detects your environment (development/production) and automatically configures the optimal mode for your setup.
                </p>
              </div>
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Getting Started</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">For Development</h4>
                <p className="text-sm text-blue-700">
                  Use <strong>Proxy Mode</strong> (default) for local development. It works without any additional setup and provides full debugging visibility.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">For Production</h4>
                <p className="text-sm text-blue-700">
                  Use <strong>Native Mode</strong> for optimal performance when your MCP server is publicly accessible, or <strong>Agents Mode</strong> for enhanced user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatModesExplainerTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
    >
      <Info className="w-4 h-4" />
      How do chat modes work?
    </button>
  );
}
