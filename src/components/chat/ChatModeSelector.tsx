"use client";

import { useState } from "react";
import { clsx } from "clsx";

export type ChatMode = "proxy" | "native" | "agents";

interface ChatModeSelectorProps {
  selectedMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  disabled?: boolean;
}

const MODE_CONFIG = {
  proxy: {
    label: "Proxy Mode",
    shortLabel: "Proxy",
    description: "Direct MCP integration with real-time tool call updates",
    icon: "🔧",
    features: ["Real-time tool updates", "Fast response", "Full transparency"],
    recommended: true,
  },
  native: {
    label: "Native Mode",
    shortLabel: "Native",
    description: "OpenAI handles MCP tools directly (tool calls shown after completion)",
    icon: "🤖",
    features: ["OpenAI managed", "Tool summary", "Post-completion view"],
    recommended: false,
  },
  agents: {
    label: "Agents Mode",
    shortLabel: "Agents",
    description: "OpenAI Agents SDK with enhanced tool interaction",
    icon: "🚀",
    features: ["Agents SDK", "Enhanced interaction", "Real-time updates"],
    recommended: false,
  },
} as const;

export default function ChatModeSelector({ 
  selectedMode, 
  onModeChange, 
  disabled = false 
}: ChatModeSelectorProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative">
      {/* Compact selector */}
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
        <span className="text-sm font-medium text-gray-700">Mode:</span>
        <div className="flex gap-1">
          {(Object.keys(MODE_CONFIG) as ChatMode[]).map((mode) => {
            const config = MODE_CONFIG[mode];
            return (
              <button
                key={mode}
                onClick={() => !disabled && onModeChange(mode)}
                disabled={disabled}
                className={clsx(
                  "px-3 py-1 text-xs font-medium rounded transition-colors relative",
                  selectedMode === mode
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
                title={config.description}
              >
                <span className="flex items-center gap-1">
                  <span className="text-xs">{config.icon}</span>
                  {config.shortLabel}
                  {config.recommended && selectedMode !== mode && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" 
                          title="Recommended" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="ml-2 text-gray-500 hover:text-gray-700 text-xs"
          title="Show mode details"
        >
          {showDetails ? "ℹ️" : "❓"}
        </button>
      </div>

      {/* Detailed information panel */}
      {showDetails && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg border shadow-lg z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Chat Modes</h4>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {(Object.keys(MODE_CONFIG) as ChatMode[]).map((mode) => {
                const config = MODE_CONFIG[mode];
                return (
                  <div
                    key={mode}
                    className={clsx(
                      "p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedMode === mode
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => !disabled && onModeChange(mode)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{config.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-gray-900">
                            {config.label}
                          </h5>
                          {config.recommended && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Recommended
                            </span>
                          )}
                          {selectedMode === mode && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {config.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {config.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-xs text-gray-500 border-t pt-3">
              <p>
                <strong>Proxy Mode:</strong> Best for seeing exactly what&apos;s happening with tool calls in real-time.
              </p>
              <p className="mt-1">
                <strong>Native Mode:</strong> OpenAI manages everything, but you&apos;ll see tool results only after completion.
              </p>
              <p className="mt-1">
                <strong>Agents Mode:</strong> Experimental mode using OpenAI&apos;s new Agents SDK (may have compatibility issues).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
