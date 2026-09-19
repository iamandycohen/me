'use client';

import { useEffect } from 'react';

const sourcesUrl = 'https://www.wheretherecordends.com/sources';

export function getLegacyReferenceUrl(hash: string) {
  return /^#reference-\d+$/.test(hash) ? `${sourcesUrl}${hash}` : null;
}

export default function LegacyGenealogyHashRedirect() {
  useEffect(() => {
    const destination = getLegacyReferenceUrl(window.location.hash);

    if (destination) {
      window.location.replace(destination);
    }
  }, []);

  return null;
}
