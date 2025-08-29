'use client';

import { useRef } from 'react';
import McpChat from '@/components/mcp/McpChat';
import ChatDemoQuestions from '@/components/chat/ChatDemoQuestions';

export default function ChatInterface() {
  const chatRef = useRef<{ setInput: (input: string) => void }>(null);

  const handleQuestionSelect = (question: string) => {
    if (chatRef.current) {
      chatRef.current.setInput(question);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <ChatDemoQuestions onQuestionSelect={handleQuestionSelect} />
      
      <div className="h-[600px]">
        <McpChat ref={chatRef} />
      </div>
    </div>
  );
}
