'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { BeforeSend } from '@vercel/analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { BeforeSendMiddleware } from '@vercel/speed-insights';
import { useEffect, useRef, useState } from 'react';

export const ANALYTICS_PREFERENCES_EVENT = 'andy-cohen:analytics-preferences';
export const ANALYTICS_CONSENT_STORAGE_KEY = 'andy-cohen:analytics-consent';
export const ANALYTICS_CONSENT_VERSION = 1;

const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;
const MAX_TIMEOUT_MS = 2_147_483_647;

type ConsentChoice = 'granted' | 'denied';

type StoredConsent = {
  choice: ConsentChoice;
  expiresAt: number;
  version: typeof ANALYTICS_CONSENT_VERSION;
};

type AnalyticsConsentProps = {
  enabled?: boolean;
  gaId?: string;
};

// Vercel's scripts retain their beforeSend callbacks after React unmounts them.
// Keep this outside the component so revocation takes effect synchronously and
// remains authoritative for any already-loaded script.
let analyticsCollectionAllowed = false;

export const analyticsBeforeSend: BeforeSend = (event) =>
  analyticsCollectionAllowed ? event : null;

export const speedInsightsBeforeSend: BeforeSendMiddleware = (event) =>
  analyticsCollectionAllowed ? event : null;

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

function clearGoogleAnalyticsCookies() {
  const names = analyticsCookieNames();
  const domains = cookieDomains(window.location.hostname);

  for (const name of names) {
    for (const domain of domains) {
      const domainAttribute = domain ? `; Domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}

function setCollectionAllowed(gaId: string, allowed: boolean) {
  analyticsCollectionAllowed = allowed;

  if (gaId) {
    const analyticsWindow = window as Window & Record<string, unknown>;
    analyticsWindow[`ga-disable-${gaId}`] = !allowed;
  }

  if (!allowed) {
    clearGoogleAnalyticsCookies();
  }
}

export function AnalyticsConsent({
  enabled = true,
  gaId,
}: AnalyticsConsentProps) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isReopened, setIsReopened] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  const normalizedGaId = gaId?.trim() ?? '';
  const bannerVisible =
    enabled && isReady && (choice === null || isReopened || storageError);
  const providersEnabled = enabled && isReady && choice === 'granted';

  useEffect(() => {
    if (!enabled) {
      setCollectionAllowed(normalizedGaId, false);
      setChoice(null);
      setExpiresAt(null);
      setStorageError(false);
      setIsReopened(false);
      setIsReady(false);
      return;
    }

    try {
      const stored = parseStoredConsent(
        window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
      );
      const initialChoice = stored?.choice ?? null;
      setChoice(initialChoice);
      setExpiresAt(stored?.expiresAt ?? null);
      setCollectionAllowed(normalizedGaId, initialChoice === 'granted');
    } catch {
      setChoice(null);
      setExpiresAt(null);
      setStorageError(true);
      setCollectionAllowed(normalizedGaId, false);
    } finally {
      setIsReady(true);
    }
  }, [enabled, normalizedGaId]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    function reopenPreferences() {
      setStorageError(false);
      setIsReopened(true);
    }

    function syncPreference(event: StorageEvent) {
      if (event.key !== ANALYTICS_CONSENT_STORAGE_KEY && event.key !== null) {
        return;
      }

      const stored = parseStoredConsent(
        event.key === null
          ? window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
          : event.newValue
      );
      const nextChoice = stored?.choice ?? null;
      setCollectionAllowed(normalizedGaId, nextChoice === 'granted');
      setChoice(nextChoice);
      setExpiresAt(stored?.expiresAt ?? null);
      setStorageError(false);
      setIsReopened(false);
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
  }, [enabled, normalizedGaId]);

  useEffect(() => {
    if (!enabled || expiresAt === null) {
      return;
    }

    let timeoutId: number | undefined;

    function expireOrReschedule() {
      const remaining = (expiresAt as number) - Date.now();
      if (remaining > 0) {
        timeoutId = window.setTimeout(
          expireOrReschedule,
          Math.min(remaining, MAX_TIMEOUT_MS)
        );
        return;
      }

      setCollectionAllowed(normalizedGaId, false);
      setChoice(null);
      setExpiresAt(null);
      setStorageError(false);
      setIsReopened(false);
    }

    expireOrReschedule();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [enabled, expiresAt, normalizedGaId]);

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
      setCollectionAllowed(normalizedGaId, false);
      setChoice(null);
      setExpiresAt(null);
      setStorageError(true);
      setIsReopened(false);
      return;
    }

    // Update the synchronous gate before React has a chance to unmount the
    // provider components. This blocks queued Vercel events on revocation.
    setCollectionAllowed(normalizedGaId, nextChoice === 'granted');
    setChoice(nextChoice);
    setExpiresAt(stored.expiresAt);
    setStorageError(false);
    setIsReopened(false);
  }

  if (!enabled) {
    return null;
  }

  return (
    <>
      {providersEnabled ? (
        <>
          {normalizedGaId ? <GoogleAnalytics gaId={normalizedGaId} /> : null}
          <Analytics beforeSend={analyticsBeforeSend} />
          <SpeedInsights beforeSend={speedInsightsBeforeSend} />
        </>
      ) : null}

      {bannerVisible ? (
        <section
          ref={bannerRef}
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-ink/15 bg-paper p-5 text-ink shadow-[0_20px_65px_rgba(26,26,26,0.18)] outline-none sm:bottom-6 sm:p-6"
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
                Help improve this site
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Allow optional analytics to measure visits, navigation, and site
                performance. Learn more in the{' '}
                <a className="link-underline" href="/privacy">
                  privacy notice
                </a>
                .
              </p>
              {storageError ? (
                <p
                  className="mt-3 text-sm font-medium text-accent"
                  role="status"
                >
                  This browser could not save your preference, so analytics
                  remains off.
                </p>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
              <button
                className="btn-secondary px-5 py-2.5 text-sm"
                onClick={() => saveChoice('denied')}
                type="button"
              >
                Decline analytics
              </button>
              <button
                className="btn-primary px-5 py-2.5 text-sm"
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
