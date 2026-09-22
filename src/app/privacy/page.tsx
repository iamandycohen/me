import { generatePageMetadata } from '@/lib/metadata-generators';
import data from '@/lib/data';
import { AnalyticsPreferencesButton } from '@/components/ui/AnalyticsPreferencesButton';

export const metadata = generatePageMetadata(
  'Privacy',
  'Analytics choices and privacy information for iamandycohen.com',
  data.contact,
  {},
  '/privacy'
);

export default function PrivacyPage() {
  return (
    <section className="pt-20 md:pt-28 lg:pt-32 pb-24">
      <div className="container-max">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow mb-6">Privacy and analytics</p>
          <h1 className="text-balance mb-6">
            Analytics is{' '}
            <span className="italic text-ink/60">your choice.</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
            Optional audience and performance measurement stays off until you
            allow it. The site works the same way if you decline.
          </p>
        </div>

        <div className="rule mb-16" />

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Optional measurement</p>
            <h2 className="text-balance">
              One preference controls every analytics service.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-ink/75 lg:col-span-7">
            <p>
              If you opt in, this site uses Google Analytics 4, Vercel Web
              Analytics, and Vercel Speed Insights to understand visits,
              navigation, and site performance. They may process the page
              viewed, referring page, general browser and device information,
              approximate region, and performance measurements.
            </p>
            <p>
              Google Analytics may set identifiers such as the <code>_ga</code>{' '}
              cookie. Vercel&apos;s measurement products are designed without
              cookies, but they remain behind the same opt-in choice here.
              Analytics does not load before you allow it.
            </p>
            <p>
              Your preference is stored in this browser for up to 180 days. You
              can withdraw or renew it at any time; withdrawal stops future
              analytics collection and removes Google Analytics cookies created
              by this site.
            </p>
            <AnalyticsPreferencesButton className="btn-secondary" />
          </div>
        </div>

        <div className="rule my-16" />

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Necessary operation</p>
            <h2 className="text-balance">What declining does not change.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ink/75 lg:col-span-7">
            <p>
              The hosting platform still receives ordinary requests needed to
              deliver and secure the site. Declining optional analytics does not
              prevent those necessary requests, and it does not affect email or
              external links you choose to use.
            </p>
            <p>
              Learn more from the{' '}
              <a
                className="link-underline"
                href="https://policies.google.com/privacy"
              >
                Google privacy policy
              </a>{' '}
              and{' '}
              <a
                className="link-underline"
                href="https://vercel.com/docs/analytics/privacy-policy"
              >
                Vercel Web Analytics privacy documentation
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
