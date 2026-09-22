'use client';

import { ANALYTICS_PREFERENCES_EVENT } from './AnalyticsConsent';

type AnalyticsPreferencesButtonProps = {
  className?: string;
};

const defaultClassName =
  'w-fit underline decoration-paper/20 underline-offset-4 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper';

export function AnalyticsPreferencesButton({
  className = defaultClassName,
}: AnalyticsPreferencesButtonProps) {
  function openPreferences() {
    window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT));
  }

  return (
    <button className={className} onClick={openPreferences} type="button">
      Analytics preferences
    </button>
  );
}
