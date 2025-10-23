'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: React.ReactNode;
}

interface CommunityTabsProps {
  tabs: Tab[];
}

function CommunityTabsContent({ tabs }: CommunityTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  // Initialize with URL tab or first tab
  const initialTab =
    tabFromUrl && tabs.some((t) => t.id === tabFromUrl)
      ? tabFromUrl
      : tabs[0]?.id || '';

  const [activeTab, setActiveTab] = useState(initialTab);

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/community?tab=${tabId}`, { scroll: false });
  };

  // Sync state with URL changes (e.g., browser back/forward)
  useEffect(() => {
    if (tabFromUrl && tabs.some((t) => t.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, tabs]);

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
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 focus:outline-none transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-gray-50 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent hover:border-gray-300 focus:text-primary-600 focus:border-primary-600'
                }`}
                role="tab"
                aria-controls={tab.id}
                aria-selected={isActive ? 'true' : 'false'}
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

export default function CommunityTabs({ tabs }: CommunityTabsProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      }
    >
      <CommunityTabsContent tabs={tabs} />
    </Suspense>
  );
}
