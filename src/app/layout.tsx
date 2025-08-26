import { Inter, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/styles/globals.css';
import { generateBaseMetadata, generateJsonLd } from '@/lib/metadata-generators';
import { getCurrentRole } from '@/lib/data-helpers';
import data from '../../content/data.json';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Critical Resource Hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      </head>
      <body className={`min-h-screen bg-white ${inter.className}`}>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
} 