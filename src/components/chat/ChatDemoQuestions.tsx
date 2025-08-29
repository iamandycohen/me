'use client';

interface DemoQuestion {
  question: string;
  explanation: string;
  icon: string;
}

interface ChatDemoQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    question: "What projects has Andy worked on recently?",
    explanation: "Calls the 'projects' MCP tool to get real engineering project data",
    icon: "🔧"
  },
  {
    question: "Show me Andy's community involvement and MVP awards",
    explanation: "Uses 'community' tool to fetch awards, conferences, and contributions",
    icon: "🏆"
  },
  {
    question: "Create a brief executive summary of Andy's background",
    explanation: "Combines multiple MCP tools (bio, resume, projects) intelligently",
    icon: "📋"
  },
  {
    question: "What's Andy's current role and recent experience?",
    explanation: "Fetches live resume data via 'resume' tool with latest positions",
    icon: "💼"
  }
];

export default function ChatDemoQuestions({ onQuestionSelect }: ChatDemoQuestionsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        <h3 className="font-semibold text-gray-900">See MCP Tools in Action</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Click any question below to see the AI assistant call live MCP tools and fetch real data:
      </p>
      
      <div className="grid gap-2">
        {DEMO_QUESTIONS.map((demo, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(demo.question)}
            className="text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:from-blue-100 hover:to-purple-100 hover:border-blue-200 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                {demo.icon}
              </span>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900 mb-1">
                  {demo.question}
                </div>
                <div className="text-xs text-gray-600">
                  {demo.explanation}
                </div>
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-yellow-600 mt-0.5">💡</span>
          <div className="text-xs text-yellow-800">
            <strong>Watch for tool calls!</strong> You&apos;ll see yellow indicators when the AI calls MCP tools, 
            followed by structured JSON responses that get converted to natural language.
          </div>
        </div>
      </div>
    </div>
  );
}
