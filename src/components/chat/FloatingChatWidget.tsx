'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Minimize2 } from 'lucide-react';
import McpChat from '@/components/mcp/McpChat';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatRef = useRef<{ setInput: (input: string) => void }>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsOpen(false);
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const restoreChat = () => {
    setIsMinimized(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Suggested starter questions
  const starterQuestions = [
    "Tell me about Andy's professional experience",
    "What are Andy's key technical skills?",
    "Show me Andy's recent projects",
    "What's Andy's community involvement?"
  ];

  const handleQuestionSelect = (question: string) => {
    if (chatRef.current) {
      chatRef.current.setInput(question);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {(!isOpen || isMinimized) && (
        <button
          onClick={isMinimized ? restoreChat : toggleChat}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-scale-in"
          aria-label={isMinimized ? "Restore chat" : "Open AI assistant"}
        >
          <MessageCircle size={24} />
          {/* Notification dot for new users */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-slide-in-bottom">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={minimizeChat}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-blue-700"
                aria-label="Minimize chat"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-blue-700"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col">
            {/* Welcome Message & Starter Questions */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">
                Hi! I&apos;m Andy&apos;s AI assistant. Ask me anything about his professional background, projects, or experience.
              </p>
              
              {/* Starter Questions */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {starterQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionSelect(question)}
                      className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 min-h-0">
              <McpChat ref={chatRef} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay for better UX on small screens */}
      {isOpen && !isMinimized && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-40" onClick={closeChat} />
      )}

      {/* Mobile Full Screen Chat */}
      {isOpen && !isMinimized && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button
              onClick={closeChat}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-blue-700"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Welcome */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">
              Hi! I&apos;m Andy&apos;s AI assistant. Ask me anything about his professional background, projects, or experience.
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              {starterQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionSelect(question)}
                  className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700 text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Chat */}
          <div className="flex-1 min-h-0">
            <McpChat ref={chatRef} />
          </div>
        </div>
      )}
    </>
  );
}
