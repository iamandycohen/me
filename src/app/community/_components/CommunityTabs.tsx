'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface CommunityTabsProps {
  tabs: Tab[];
}

function CommunityTabsContent({ tabs }: CommunityTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const initialTab =
    tabFromUrl && tabs.some((t) => t.id === tabFromUrl)
      ? tabFromUrl
      : tabs[0]?.id || '';

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/community?tab=${tabId}`, { scroll: false });
  };

  useEffect(() => {
    if (tabFromUrl && tabs.some((t) => t.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, tabs]);

  return (
    <div>
      <div className="border-b border-ink/15 mb-12">
        <nav className="flex flex-wrap gap-x-10 gap-y-2" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-4 text-sm uppercase tracking-widest transition-colors focus:outline-none focus-visible:text-accent ${
                  isActive ? 'text-accent' : 'text-ink/50 hover:text-ink'
                }`}
                role="tab"
                aria-controls={tab.id}
                aria-selected={isActive ? 'true' : 'false'}
              >
                {tab.label}
                <span
                  className={`absolute left-0 right-0 -bottom-px h-px transition-colors ${
                    isActive ? 'bg-accent' : 'bg-transparent'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>
      </div>

      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}

export default function CommunityTabs({ tabs }: CommunityTabsProps) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-6 bg-ink/10 rounded w-1/3 mb-12"></div>
          <div className="space-y-3">
            <div className="h-4 bg-ink/10 rounded"></div>
            <div className="h-4 bg-ink/10 rounded w-5/6"></div>
          </div>
        </div>
      }
    >
      <CommunityTabsContent tabs={tabs} />
    </Suspense>
  );
}
