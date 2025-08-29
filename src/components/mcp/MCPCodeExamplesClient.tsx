'use client';

import { useState } from 'react';

interface CodeExample {
  title: string;
  description: string;
  language: string;
  code: string;
  category: 'integration' | 'protocol' | 'discovery';
}

interface MCPCodeExamplesClientProps {
  examples: CodeExample[];
}

export default function MCPCodeExamplesClient({ examples }: MCPCodeExamplesClientProps) {
  const [activeCategory, setActiveCategory] = useState<'integration' | 'protocol' | 'discovery'>('integration');
  const [activeExample, setActiveExample] = useState(0);

  const filteredExamples = examples.filter(ex => ex.category === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'integration' as const, label: '🔧 Integration', desc: 'Client code' },
          { key: 'protocol' as const, label: '📡 Protocol', desc: 'JSON-RPC' },
          { key: 'discovery' as const, label: '🔍 Discovery', desc: 'Agent finding' }
        ].map(({ key, label, desc }) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key);
              setActiveExample(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === key
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
            <div className="text-xs opacity-75">{desc}</div>
          </button>
        ))}
      </div>

      {/* Example Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filteredExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeExample === index
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Active Example */}
      {filteredExamples[activeExample] && (
        <div>
          <div className="mb-3">
            <h4 className="font-semibold text-gray-900 mb-1">
              {filteredExamples[activeExample].title}
            </h4>
            <p className="text-sm text-gray-600">
              {filteredExamples[activeExample].description}
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-2 rounded-t-lg">
              <span className="text-sm font-mono">
                {filteredExamples[activeExample].language}
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(filteredExamples[activeExample].code)}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-b-lg overflow-x-auto text-sm">
              <code className="language-typescript">
                {filteredExamples[activeExample].code}
              </code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
