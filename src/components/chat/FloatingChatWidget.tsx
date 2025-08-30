"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  MessageCircle,
  Minimize2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import McpChat, { McpChatRef } from "@/components/mcp/McpChat";
import { getFirstName } from "@/lib/data-helpers";
import data from "@/lib/data";

// Constants for reuse throughout the component
const firstName = getFirstName(data.contact);

export default function FloatingChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isStarterQuestionsExpanded, setIsStarterQuestionsExpanded] =
    useState(true);
  const chatRef = useRef<McpChatRef>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Hide floating widget on dedicated chat page to prevent duplicate McpChat instances
  if (pathname === "/ai-chat") {
    return null;
  }

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
    `Tell me about ${firstName}'s professional experience`,
    `What are ${firstName}'s key technical skills?`,
    `Show me ${firstName}'s recent projects`,
    `What's ${firstName}'s community involvement?`,
    `Tell me about the human side of ${firstName}`,
  ];

  const handleQuestionSelect = (question: string) => {
    if (chatRef.current) {
      chatRef.current.setInput(question);
    }
    // Auto-collapse starter questions on mobile after selection
    setIsStarterQuestionsExpanded(false);
  };

  const toggleStarterQuestions = () => {
    setIsStarterQuestionsExpanded(!isStarterQuestionsExpanded);
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
        <div className="fixed bottom-6 right-6 z-50 w-96 max-h-[80vh] h-[min(600px,80vh)] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-slide-in-bottom">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => chatRef.current?.clearChat?.()}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-blue-700 text-sm"
                aria-label="Clear chat"
              >
                Clear
              </button>
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
          <div className="flex-1 flex flex-col min-h-0">
            {/* Welcome Message & Starter Questions */}
            <div className="flex-shrink-0 p-4 border-b border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">
                Hi! I&apos;m {firstName}&apos;s AI assistant. Ask me anything
                about his professional background, projects, or experience.
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
            <div className="flex-1 min-h-0 overflow-hidden">
              <McpChat ref={chatRef} hideHeader={true} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay for better UX on small screens */}
      {isOpen && !isMinimized && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={closeChat}
        />
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => chatRef.current?.clearChat?.()}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-blue-700 text-sm"
                aria-label="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-blue-700"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Welcome */}
          <div className="flex-shrink-0 border-b border-gray-100 bg-gray-50">
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Hi! I&apos;m {firstName}&apos;s AI assistant. Ask me anything
                about his professional background, projects, or experience.
              </p>
            </div>

            {/* Collapsible Starter Questions */}
            <div className="border-t border-gray-200">
              <button
                onClick={toggleStarterQuestions}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
                aria-expanded={isStarterQuestionsExpanded}
                aria-controls="mobile-starter-questions"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Starter Questions
                  </span>
                  <span className="text-xs text-gray-500">
                    ({starterQuestions.length})
                  </span>
                </div>
                {isStarterQuestionsExpanded ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>

              {isStarterQuestionsExpanded && (
                <div
                  id="mobile-starter-questions"
                  className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200"
                >
                  {starterQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionSelect(question)}
                      className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700 text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Chat */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <McpChat ref={chatRef} hideHeader={true} />
          </div>
        </div>
      )}
    </>
  );
}
