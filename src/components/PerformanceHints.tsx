"use client";

import { useEffect } from "react";

export default function PerformanceHints() {
  useEffect(() => {
    // Only add hints if they don't already exist
    const addLinkIfMissing = (rel: string, href: string, crossOrigin?: boolean) => {
      if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (crossOrigin) {
          link.setAttribute('crossorigin', '');
        }
        document.head.appendChild(link);
      }
    };

    // DNS prefetch for analytics domains
    addLinkIfMissing('dns-prefetch', '//www.google-analytics.com');
    addLinkIfMissing('dns-prefetch', '//www.googletagmanager.com');
    
    // Preconnect for Google Fonts (with crossorigin)
    addLinkIfMissing('preconnect', 'https://fonts.gstatic.com', true);
  }, []);

  return null; // This component doesn't render anything
} 