'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getDisplayName } from '@/lib/data-helpers';
import data from '../../content/data.json';

interface LayoutProps {
  children: React.ReactNode;
}

const displayName = getDisplayName(data.contact);

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'About', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Speaking', href: '/speaking' },
    { name: 'Contact', href: '/contact' },
    { name: 'API', href: '/api/docs', external: true },
    { name: 'MCP Test', href: '/mcp-test' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-max">
          <div className="flex justify-center md:justify-between items-center py-4 relative">
            <Link href="/" className="text-lg font-bold text-gray-900">
              {displayName}
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
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

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden absolute right-0 flex flex-col justify-center items-center w-8 h-8 space-y-1"
              aria-label="Toggle navigation menu"
            >
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium"
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
              {displayName} - Building systems that scale, teams that thrive, and developer experiences that delight.
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