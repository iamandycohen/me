import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_CONSENT_VERSION,
  AnalyticsConsent,
} from './AnalyticsConsent';
import { AnalyticsPreferencesButton } from './AnalyticsPreferencesButton';

jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics">{gaId}</div>
  ),
}));

const measurementId = 'G-612SWN4FHB';
const disableKey = `ga-disable-${measurementId}`;

function analyticsDisabled() {
  return (window as Window & Record<string, unknown>)[disableKey];
}

function storePreference(choice: 'granted' | 'denied') {
  window.localStorage.setItem(
    ANALYTICS_CONSENT_STORAGE_KEY,
    JSON.stringify({
      choice,
      expiresAt: Date.now() + 60_000,
      version: ANALYTICS_CONSENT_VERSION,
    })
  );
}

beforeEach(() => {
  window.localStorage.clear();
  delete (window as Window & Record<string, unknown>)[disableKey];
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('fails closed and asks for a choice when no preference exists', async () => {
  render(<AnalyticsConsent measurementId={measurementId} />);

  const banner = await screen.findByRole('region', {
    name: /help improve this research site/i,
  });
  expect(banner).toHaveFocus();
  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(true);
});

it('persists a grant and renders Google Analytics', async () => {
  const user = userEvent.setup();
  render(<AnalyticsConsent measurementId={measurementId} />);

  await act(async () => {
    await user.click(
      await screen.findByRole('button', { name: /allow analytics/i })
    );
  });

  expect(await screen.findByTestId('google-analytics')).toHaveTextContent(
    measurementId
  );
  expect(analyticsDisabled()).toBe(false);
  expect(
    JSON.parse(
      window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) ?? '{}'
    )
  ).toMatchObject({
    choice: 'granted',
    version: ANALYTICS_CONSENT_VERSION,
  });
});

it('persists a decline without rendering Google Analytics', async () => {
  const user = userEvent.setup();
  render(<AnalyticsConsent measurementId={measurementId} />);

  await act(async () => {
    await user.click(
      await screen.findByRole('button', { name: /decline analytics/i })
    );
  });

  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(true);
  expect(
    JSON.parse(
      window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) ?? '{}'
    )
  ).toMatchObject({ choice: 'denied' });
});

it('honors an unexpired persisted grant', async () => {
  storePreference('granted');
  render(<AnalyticsConsent measurementId={measurementId} />);

  expect(await screen.findByTestId('google-analytics')).toBeInTheDocument();
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(false);
});

it('reopens preferences and immediately revokes analytics and its cookies', async () => {
  storePreference('granted');
  document.cookie = '_ga=test-value; Path=/';
  document.cookie = '_ga_ABC=stream-value; Path=/';
  const user = userEvent.setup();

  render(
    <>
      <AnalyticsConsent measurementId={measurementId} />
      <AnalyticsPreferencesButton />
    </>
  );

  expect(await screen.findByTestId('google-analytics')).toBeInTheDocument();
  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /analytics preferences/i })
    );
  });
  const banner = await screen.findByRole('region');
  expect(banner).toHaveFocus();

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /decline analytics/i })
    );
  });

  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(true);
  expect(document.cookie).not.toContain('_ga=');
  expect(document.cookie).not.toContain('_ga_ABC=');
});

it('fails closed for malformed and expired stored preferences', async () => {
  window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, '{bad json');
  const { unmount } = render(
    <AnalyticsConsent measurementId={measurementId} />
  );

  expect(await screen.findByRole('region')).toBeInTheDocument();
  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  unmount();

  window.localStorage.setItem(
    ANALYTICS_CONSENT_STORAGE_KEY,
    JSON.stringify({
      choice: 'granted',
      expiresAt: Date.now() - 1,
      version: ANALYTICS_CONSENT_VERSION,
    })
  );
  render(<AnalyticsConsent measurementId={measurementId} />);

  expect(await screen.findByRole('region')).toBeInTheDocument();
  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(true);
});

it('fails closed when the preference cannot be read or written', async () => {
  const getItem = jest
    .spyOn(Storage.prototype, 'getItem')
    .mockImplementation(() => {
      throw new Error('storage disabled');
    });
  const user = userEvent.setup();
  render(<AnalyticsConsent measurementId={measurementId} />);

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

  expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(true);
  expect(screen.getByRole('region')).toBeInTheDocument();
});

it('syncs a granted preference from another tab', async () => {
  render(<AnalyticsConsent measurementId={measurementId} />);
  await screen.findByRole('region');

  const newValue = JSON.stringify({
    choice: 'granted',
    expiresAt: Date.now() + 60_000,
    version: ANALYTICS_CONSENT_VERSION,
  });
  act(() => {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: ANALYTICS_CONSENT_STORAGE_KEY,
        newValue,
      })
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId('google-analytics')).toBeInTheDocument();
  });
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(analyticsDisabled()).toBe(false);
});
