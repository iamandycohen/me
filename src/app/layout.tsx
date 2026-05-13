import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Inter, Fraunces } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import '@/styles/globals.css';
import {
  generateBaseMetadata,
  generateJsonLd,
} from '@/lib/metadata-generators';
import { getCurrentRole } from '@/lib/data-helpers';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import PerformanceHints from '@/components/ui/PerformanceHints';
import data from '@/lib/data';

// Body sans
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

// Editorial display serif (headlines, pull quotes)
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  preload: true,
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className={`min-h-screen bg-paper text-ink ${inter.className}`}>
        <PerformanceHints />

        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <div className="min-h-screen">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GA_ID}
            dataLayerName="dataLayer"
          />
        )}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
