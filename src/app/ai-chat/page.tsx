"use client";

import { useState } from "react";
import MCPExplainer from "@/components/mcp/MCPExplainer";
import ChatInterface from "@/components/chat/ChatInterface";
import data from "@/lib/data";
import { getFirstName } from "@/lib/data-helpers";
import ChatModesExplainer, { ChatModesExplainerTrigger } from "@/components/chat/ChatModesExplainer";

// Metadata is handled in layout.tsx since this is a client component
export default function ChatPage() {
  const [showModesExplainer, setShowModesExplainer] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI Assistant with MCP Tools
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Ask me anything about {getFirstName(data.contact)}&apos;s
              professional background, technical expertise, project experience,
              or community contributions. I have access to detailed information
              and can provide specific insights about his career journey.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Pro tip:</strong> The AI assistant is now available
                on every page via the floating chat icon in the bottom-right
                corner. This dedicated page offers a full-screen experience for
                longer conversations.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="max-w-2xl">
                <MCPExplainer variant="compact" />
              </div>
              <ChatModesExplainerTrigger onClick={() => setShowModesExplainer(true)} />
            </div>
          </div>

          <ChatInterface />

          <div className="mt-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Professional Experience
                </h3>
                <p className="text-sm text-blue-700">
                  Ask about {getFirstName(data.contact)}&apos;s 14+ years in
                  software engineering and leadership roles.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  Creative Projects
                </h3>
                <p className="text-sm text-green-700">
                  Learn about hands-on engineering projects and creative builds.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  Community Impact
                </h3>
                <p className="text-sm text-purple-700">
                  Discover {getFirstName(data.contact)}&apos;s MVP awards,
                  conferences, and thought leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ChatModesExplainer 
        isOpen={showModesExplainer} 
        onClose={() => setShowModesExplainer(false)} 
      />
    </div>
  );
}
