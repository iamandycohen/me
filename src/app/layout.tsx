import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "@/styles/globals.css";
import {
  generateBaseMetadata,
  generateJsonLd,
} from "@/lib/metadata-generators";
import { getCurrentRole } from "@/lib/data-helpers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PerformanceHints from "@/components/PerformanceHints";
import data from "../../content/data.json";

// Optimized font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false, // Only preload primary font
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
      <body className={`min-h-screen bg-white ${inter.className}`}>
        {/* Performance hints for third-party resources */}
        <PerformanceHints />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <div className="min-h-screen bg-white">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </div>

        {/* Optimized analytics loading */}
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
