import { Metadata } from 'next';
import McpChat from '@/components/McpChat';
import MCPExplainer from '@/components/MCPExplainer';

export const metadata: Metadata = {
  title: 'AI Chat - Andy Cohen',
  description: 'Chat with an AI assistant that has access to detailed information about Andy Cohen\'s professional background, projects, and experience.',
  keywords: ['chat', 'AI', 'assistant', 'Andy Cohen', 'professional', 'experience'],
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI Assistant with MCP Tools
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Ask me anything about Andy's professional background, technical expertise, 
              project experience, or community contributions. I have access to detailed 
              information and can provide specific insights about his career journey.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <MCPExplainer variant="compact" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="h-[600px]">
              <McpChat />
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Professional Experience</h3>
                <p className="text-sm text-blue-700">
                  Ask about Andy's 14+ years in software engineering and leadership roles.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Creative Projects</h3>
                <p className="text-sm text-green-700">
                  Learn about hands-on engineering projects and creative builds.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Community Impact</h3>
                <p className="text-sm text-purple-700">
                  Discover Andy's MVP awards, conferences, and thought leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
