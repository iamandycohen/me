"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: React.ReactNode;
}

interface CommunityTabsProps {
  tabs: Tab[];
}

export default function CommunityTabs({ tabs }: CommunityTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 focus:outline-none transition-all duration-200 ${
                  isActive
                    ? "text-primary-600 bg-gray-50 border-primary-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent hover:border-gray-300 focus:text-primary-600 focus:border-primary-600"
                }`}
                role="tab"
                aria-controls={tab.id}
                aria-selected={isActive ? "true" : "false"}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
