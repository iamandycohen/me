'use client';

import Link from 'next/link';
import { getFirstName } from '@/lib/data-helpers';
import data from '../../content/data.json';

interface LayoutProps {
  children: React.ReactNode;
}

const firstName = getFirstName(data.contact);

export default function Layout({ children }: LayoutProps) {
  const navigation = [
    { name: 'About', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'API', href: '/api/mcp/tools' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-max">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-lg font-bold text-gray-900">
              {firstName}
            </Link>
            
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container-max py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              {firstName} - Building systems that scale, teams that thrive, and developer experiences that delight.
            </p>
            <p className="text-sm text-gray-500">
              AI-native architecture • MCP integration • Enterprise platforms
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 