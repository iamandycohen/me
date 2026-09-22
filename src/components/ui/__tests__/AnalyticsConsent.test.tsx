import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_CONSENT_VERSION,
  AnalyticsConsent,
} from '../AnalyticsConsent';
import { AnalyticsPreferencesButton } from '../AnalyticsPreferencesButton';

type AnalyticsEvent = { type: 'pageview'; url: string };
type SpeedEvent = { type: 'vital'; url: string };

let capturedAnalyticsBeforeSend:
  | ((event: AnalyticsEvent) => AnalyticsEvent | null)
  | undefined;
let capturedSpeedBeforeSend:
  | ((event: SpeedEvent) => SpeedEvent | null | undefined | false)
  | undefined;

jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics">{gaId}</div>
  ),
}));

jest.mock('@vercel/analytics/next', () => ({
  Analytics: ({
    beforeSend,
  }: {
    beforeSend: (event: AnalyticsEvent) => AnalyticsEvent | null;
  }) => {
    capturedAnalyticsBeforeSend = beforeSend;
    return <div data-testid="vercel-analytics" />;
  },
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: ({
    beforeSend,
  }: {
    beforeSend: (event: SpeedEvent) => SpeedEvent | null | undefined | false;
  }) => {
    capturedSpeedBeforeSend = beforeSend;
    return <div data-testid="speed-insights" />;
  },
}));

const gaId = 'G-TEST123456';
const disableKey = `ga-disable-${gaId}`;

function analyticsDisabled() {
  return (window as Window & Record<string, unknown>)[disableKey];
}

function storedPreference(
  choice: 'granted' | 'denied',
  expiresAt = Date.now() + 60_000
) {
  return JSON.stringify({
    choice,
    expiresAt,
    version: ANALYTICS_CONSENT_VERSION,
  });
}

function storePreference(choice: 'granted' | 'denied') {
  window.localStorage.setItem(
    ANALYTICS_CONSENT_STORAGE_KEY,
    storedPreference(choice)
  );
}

function expectNoProviders() {
  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument();
  expect(screen.queryByTestId('speed-insights')).not.toBeInTheDocument();
}

beforeEach(() => {
  window.localStorage.clear();
  delete (window as Window & Record<string, unknown>)[disableKey];
  capturedAnalyticsBeforeSend = undefined;
  capturedSpeedBeforeSend = undefined;
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

it('fails closed and asks for an explicit choice', async () => {
  render(<AnalyticsConsent gaId={gaId} />);

  const banner = await screen.findByRole('region', {
    name: /help improve this site/i,
  });
  expect(banner).toHaveFocus();
  expect(screen.getByRole('link', { name: /privacy notice/i })).toHaveAttribute(
    'href',
    '/privacy'
  );
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
});

it('renders nothing when analytics is disabled for this deployment', async () => {
  const getItem = jest.spyOn(Storage.prototype, 'getItem');
  render(<AnalyticsConsent enabled={false} gaId={gaId} />);

  await waitFor(() => expect(analyticsDisabled()).toBe(true));
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expectNoProviders();
  expect(getItem).not.toHaveBeenCalled();
});

it('persists a 180-day grant and mounts all analytics providers', async () => {
  const now = Date.now();
  const user = userEvent.setup();
  render(<AnalyticsConsent gaId={gaId} />);

  await act(async () => {
    await user.click(
      await screen.findByRole('button', { name: /allow analytics/i })
    );
  });

  expect(await screen.findByTestId('google-analytics')).toHaveTextContent(gaId);
  expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
  expect(analyticsDisabled()).toBe(false);

  const stored = JSON.parse(
    window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) ?? '{}'
  );
  expect(stored).toMatchObject({
    choice: 'granted',
    version: ANALYTICS_CONSENT_VERSION,
  });
  expect(stored.expiresAt).toBeGreaterThanOrEqual(
    now + 180 * 24 * 60 * 60 * 1000
  );
  expect(stored.expiresAt).toBeLessThanOrEqual(
    Date.now() + 180 * 24 * 60 * 60 * 1000
  );

  const analyticsEvent: AnalyticsEvent = {
    type: 'pageview',
    url: 'https://example.com/',
  };
  const speedEvent: SpeedEvent = {
    type: 'vital',
    url: 'https://example.com/',
  };
  expect(capturedAnalyticsBeforeSend?.(analyticsEvent)).toBe(analyticsEvent);
  expect(capturedSpeedBeforeSend?.(speedEvent)).toBe(speedEvent);
});

it('persists a denial without mounting any analytics provider', async () => {
  const user = userEvent.setup();
  render(<AnalyticsConsent gaId={gaId} />);

  await act(async () => {
    await user.click(
      await screen.findByRole('button', { name: /decline analytics/i })
    );
  });

  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
  expect(
    JSON.parse(
      window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) ?? '{}'
    )
  ).toMatchObject({ choice: 'denied' });
});

it('honors an unexpired persisted grant', async () => {
  storePreference('granted');
  render(<AnalyticsConsent gaId={gaId} />);

  expect(await screen.findByTestId('google-analytics')).toBeInTheDocument();
  expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(false);
});

it('revokes an analytics grant when it expires during a long-lived session', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  window.localStorage.setItem(
    ANALYTICS_CONSENT_STORAGE_KEY,
    storedPreference('granted', Date.now() + 1_000)
  );
  render(<AnalyticsConsent gaId={gaId} />);

  expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  expect(analyticsDisabled()).toBe(false);

  act(() => {
    jest.advanceTimersByTime(1_001);
  });

  expect(screen.getByRole('region')).toBeInTheDocument();
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
});

it('supports Vercel analytics when no Google measurement ID is configured', async () => {
  storePreference('granted');
  render(<AnalyticsConsent />);

  expect(await screen.findByTestId('vercel-analytics')).toBeInTheDocument();
  expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
});

it.each([
  ['malformed', '{not json'],
  ['expired', storedPreference('granted', Date.now() - 1)],
  [
    'wrong-version',
    JSON.stringify({
      choice: 'granted',
      expiresAt: Date.now() + 60_000,
      version: ANALYTICS_CONSENT_VERSION + 1,
    }),
  ],
])('fails closed for %s stored consent', async (_description, value) => {
  window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  render(<AnalyticsConsent gaId={gaId} />);

  expect(await screen.findByRole('region')).toBeInTheDocument();
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
});

it('fails closed when consent storage cannot be read or written', async () => {
  const getItem = jest
    .spyOn(Storage.prototype, 'getItem')
    .mockImplementation(() => {
      throw new Error('storage disabled');
    });
  const user = userEvent.setup();
  render(<AnalyticsConsent gaId={gaId} />);

  expect(await screen.findByRole('status')).toHaveTextContent(
    /analytics remains off/i
  );
  getItem.mockRestore();
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('storage full');
  });

  await act(async () => {
    await user.click(screen.getByRole('button', { name: /allow analytics/i }));
  });

  expect(screen.getByRole('region')).toBeInTheDocument();
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
});

it('reopens preferences, revokes synchronously, clears cookies, and regrants without reload', async () => {
  storePreference('granted');
  document.cookie = '_ga=test-value; Path=/';
  document.cookie = '_ga_STREAM=stream-value; Path=/';
  const user = userEvent.setup();

  render(
    <>
      <AnalyticsConsent gaId={gaId} />
      <AnalyticsPreferencesButton />
    </>
  );

  expect(await screen.findByTestId('vercel-analytics')).toBeInTheDocument();
  const analyticsGate = capturedAnalyticsBeforeSend;
  const speedGate = capturedSpeedBeforeSend;
  expect(analyticsGate).toBeDefined();
  expect(speedGate).toBeDefined();

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /analytics preferences/i })
    );
  });
  expect(await screen.findByRole('region')).toHaveFocus();

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /decline analytics/i })
    );
  });

  const analyticsEvent: AnalyticsEvent = {
    type: 'pageview',
    url: 'https://example.com/',
  };
  const speedEvent: SpeedEvent = {
    type: 'vital',
    url: 'https://example.com/',
  };
  expect(analyticsGate?.(analyticsEvent)).toBeNull();
  expect(speedGate?.(speedEvent)).toBeNull();
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
  expect(document.cookie).not.toContain('_ga=');
  expect(document.cookie).not.toContain('_ga_STREAM=');

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /analytics preferences/i })
    );
  });
  await act(async () => {
    await user.click(screen.getByRole('button', { name: /allow analytics/i }));
  });

  expect(await screen.findByTestId('vercel-analytics')).toBeInTheDocument();
  expect(analyticsGate?.(analyticsEvent)).toBe(analyticsEvent);
  expect(speedGate?.(speedEvent)).toBe(speedEvent);
  expect(analyticsDisabled()).toBe(false);
});

it('synchronizes grants and denials from another tab', async () => {
  render(<AnalyticsConsent gaId={gaId} />);
  await screen.findByRole('region');

  act(() => {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: ANALYTICS_CONSENT_STORAGE_KEY,
        newValue: storedPreference('granted'),
      })
    );
  });

  expect(await screen.findByTestId('vercel-analytics')).toBeInTheDocument();
  expect(analyticsDisabled()).toBe(false);

  act(() => {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: ANALYTICS_CONSENT_STORAGE_KEY,
        newValue: storedPreference('denied'),
      })
    );
  });

  await waitFor(expectNoProviders);
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(true);
});

it('fails closed when another tab clears local storage', async () => {
  storePreference('granted');
  render(<AnalyticsConsent gaId={gaId} />);
  expect(await screen.findByTestId('vercel-analytics')).toBeInTheDocument();

  window.localStorage.clear();
  act(() => {
    window.dispatchEvent(new StorageEvent('storage', { key: null }));
  });

  expect(await screen.findByRole('region')).toBeInTheDocument();
  expectNoProviders();
  expect(analyticsDisabled()).toBe(true);
});
