import type { Metadata } from 'next';

import { AnalyticsPreferencesButton } from '@/components/AnalyticsPreferencesButton';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy and analytics',
  description:
    'How Where the Record Ends handles optional analytics and information shared through the research contact form.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy and analytics"
        title="You choose whether this site uses analytics."
        introduction="The public record matters here, but so does the boundary around your own information. Optional audience measurement and necessary contact services are kept separate."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <p className="eyebrow">Optional analytics</p>
            <h2 className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Analytics stays off until you allow it.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ink/70">
            <p>
              Where the Record Ends uses Google Analytics 4 to understand which
              pages are useful and how visitors move through the site. When you
              allow analytics, Google Analytics may receive the page viewed,
              referring page, general device and browser information,
              approximate region, and interactions such as scrolling,
              outbound-link clicks, and file downloads.
            </p>
            <p>
              Google Analytics is not loaded before you opt in. The site stores
              your choice in this browser so it can remember it, and you can
              change that choice at any time. Contact-form fields—including your
              name, email address, topic, source link, and message—are not sent
              to Google Analytics.
            </p>
            <p>
              This project uses analytics for audience measurement, not to show
              advertising. You can learn more in Google&apos;s{' '}
              <a
                className="font-medium text-accent underline decoration-accent/25 underline-offset-4 transition-colors hover:text-ink"
                href="https://policies.google.com/privacy"
              >
                privacy policy
              </a>
              .
            </p>
            <AnalyticsPreferencesButton className="inline-flex rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-paper sm:p-12">
          <p className="eyebrow">Research contact form</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight">
            Information you choose to share supports the research.
          </h2>
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink/70 sm:text-base">
            <p>
              When you submit the contact form, the information you enter is
              stored securely for research follow-up and emailed to the research
              mailbox. It is used to review your record, correction, or research
              lead and to reply when appropriate.
            </p>
            <p>
              Cloudflare Turnstile checks submissions for abuse. These services
              are necessary to operate the contact form and are separate from
              optional analytics. Declining analytics does not prevent you from
              using the form.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
