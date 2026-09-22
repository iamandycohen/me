'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useRef, useState } from 'react';

export const ANALYTICS_PREFERENCES_EVENT =
  'where-the-record-ends:analytics-preferences';
export const ANALYTICS_CONSENT_STORAGE_KEY =
  'where-the-record-ends:analytics-consent';
export const ANALYTICS_CONSENT_VERSION = 1;

const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;

type ConsentChoice = 'granted' | 'denied';

type StoredConsent = {
  choice: ConsentChoice;
  expiresAt: number;
  version: typeof ANALYTICS_CONSENT_VERSION;
};

type AnalyticsConsentProps = {
  measurementId?: string;
};

function parseStoredConsent(value: string | null): StoredConsent | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('version' in parsed) ||
      parsed.version !== ANALYTICS_CONSENT_VERSION ||
      !('choice' in parsed) ||
      (parsed.choice !== 'granted' && parsed.choice !== 'denied') ||
      !('expiresAt' in parsed) ||
      typeof parsed.expiresAt !== 'number' ||
      !Number.isFinite(parsed.expiresAt) ||
      parsed.expiresAt <= Date.now()
    ) {
      return null;
    }

    return parsed as StoredConsent;
  } catch {
    return null;
  }
}

function analyticsCookieNames() {
  return document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
}

function cookieDomains(hostname: string) {
  const domains = new Set<string | null>([null, hostname, `.${hostname}`]);
  const labels = hostname.split('.');

  if (labels.length > 2) {
    const rootDomain = labels.slice(-2).join('.');
    domains.add(rootDomain);
    domains.add(`.${rootDomain}`);
  }

  return domains;
}

function clearAnalyticsCookies() {
  const names = analyticsCookieNames();
  const domains = cookieDomains(window.location.hostname);

  for (const name of names) {
    for (const domain of domains) {
      const domainAttribute = domain ? `; Domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}

function setAnalyticsEnabled(measurementId: string, enabled: boolean) {
  if (!measurementId) {
    return;
  }

  const analyticsWindow = window as Window & Record<string, unknown>;
  analyticsWindow[`ga-disable-${measurementId}`] = !enabled;

  if (!enabled) {
    clearAnalyticsCookies();
  }
}

export function AnalyticsConsent({ measurementId }: AnalyticsConsentProps) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isReopened, setIsReopened] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  const normalizedMeasurementId = measurementId?.trim() ?? '';
  const bannerVisible =
    isReady && (choice === null || isReopened || storageError);

  useEffect(() => {
    try {
      const stored = parseStoredConsent(
        window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
      );
      const initialChoice = stored?.choice ?? null;
      setChoice(initialChoice);
      setAnalyticsEnabled(normalizedMeasurementId, initialChoice === 'granted');
    } catch {
      setChoice(null);
      setStorageError(true);
      setAnalyticsEnabled(normalizedMeasurementId, false);
    } finally {
      setIsReady(true);
    }
  }, [normalizedMeasurementId]);

  useEffect(() => {
    function reopenPreferences() {
      setStorageError(false);
      setIsReopened(true);
    }

    function syncPreference(event: StorageEvent) {
      if (event.key !== ANALYTICS_CONSENT_STORAGE_KEY) {
        return;
      }

      const stored = parseStoredConsent(event.newValue);
      const nextChoice = stored?.choice ?? null;
      setChoice(nextChoice);
      setStorageError(false);
      setIsReopened(false);
      setAnalyticsEnabled(normalizedMeasurementId, nextChoice === 'granted');
    }

    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, reopenPreferences);
    window.addEventListener('storage', syncPreference);

    return () => {
      window.removeEventListener(
        ANALYTICS_PREFERENCES_EVENT,
        reopenPreferences
      );
      window.removeEventListener('storage', syncPreference);
    };
  }, [normalizedMeasurementId]);

  useEffect(() => {
    if (bannerVisible) {
      bannerRef.current?.focus();
    }
  }, [bannerVisible]);

  function saveChoice(nextChoice: ConsentChoice) {
    const stored: StoredConsent = {
      choice: nextChoice,
      expiresAt: Date.now() + CONSENT_LIFETIME_MS,
      version: ANALYTICS_CONSENT_VERSION,
    };

    try {
      window.localStorage.setItem(
        ANALYTICS_CONSENT_STORAGE_KEY,
        JSON.stringify(stored)
      );
    } catch {
      setChoice(null);
      setStorageError(true);
      setIsReopened(false);
      setAnalyticsEnabled(normalizedMeasurementId, false);
      return;
    }

    setChoice(nextChoice);
    setStorageError(false);
    setIsReopened(false);
    setAnalyticsEnabled(normalizedMeasurementId, nextChoice === 'granted');
  }

  return (
    <>
      {isReady && choice === 'granted' && normalizedMeasurementId ? (
        <GoogleAnalytics gaId={normalizedMeasurementId} />
      ) : null}

      {bannerVisible ? (
        <section
          ref={bannerRef}
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-ink/15 bg-paper p-5 text-ink shadow-[0_20px_65px_rgba(43,33,27,0.24)] outline-none sm:bottom-6 sm:p-6"
          role="region"
          tabIndex={-1}
        >
          <div className="sm:flex sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-xl">
              <p className="eyebrow">Analytics preferences</p>
              <h2
                className="mt-2 font-serif text-2xl leading-tight"
                id="analytics-consent-title"
              >
                Help improve this research site
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Allow Google Analytics to measure visits and navigation. We do
                not send your contact-form entries to Analytics.
              </p>
              {storageError ? (
                <p className="mt-3 text-sm font-medium text-rust" role="status">
                  This browser could not save your preference, so analytics
                  remains off.
                </p>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
              <button
                className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-ink/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
                onClick={() => saveChoice('denied')}
                type="button"
              >
                Decline analytics
              </button>
              <button
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
                onClick={() => saveChoice('granted')}
                type="button"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
