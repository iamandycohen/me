import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { generateBaseMetadata, generateJsonLd } from '@/lib/metadata-generators';
import { getCurrentRole } from '@/lib/data-helpers';
import data from '../../content/data.json';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

// Get current role for dynamic content
const currentRole = getCurrentRole(data.resume);

// Generate metadata using utility
export const metadata = generateBaseMetadata(
  data.contact, 
  currentRole, 
  data.bio, 
  data.professional
);

// Generate JSON-LD using utility
const jsonLd = generateJsonLd(
  data.contact, 
  currentRole, 
  data.bio, 
  data.professional
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Font preloads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
} 