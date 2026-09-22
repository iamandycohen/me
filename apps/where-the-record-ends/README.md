# Where the Record Ends

Standalone Next.js application for the reviewed public genealogy publication.
It consumes `@where-the-record-ends/genealogy-content`; it has no build or
runtime relationship with the private research repository.

## Local development

Run the app through the repository workspace scripts after installing from the
repository root. The application is intentionally `noindex` by default. Set
`SITE_IS_PUBLIC=true` only as part of an approved public launch, and set
`NEXT_PUBLIC_SITE_URL` for non-canonical preview environments.

The app scripts compile and validate the shared content package before `dev`,
`type-check`, and `build`. For a Vercel project rooted at this directory, use
the normal `npm run build`; workspace installation must include files outside
the Root Directory. Keep `SITE_IS_PUBLIC` unset for previews.

## Contact form configuration

The research contact form uses a server-only Neon Postgres connection, Google
Workspace SMTP notification, and Cloudflare Turnstile validation. Copy
`.env.example` to `.env.local` for local development. Never expose
`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `TURNSTILE_SECRET_KEY`, or SMTP
credentials through `NEXT_PUBLIC_` variables.

- `DATABASE_URL` is the pooled runtime connection string.
- `DATABASE_URL_UNPOOLED` is used only by Drizzle migrations.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is the public widget key.
- `TURNSTILE_SECRET_KEY` is used only by the server-side Siteverify call.
- `SMTP_*` configures the research mailbox notification transport.
- `CONTACT_NOTIFICATION_TO` defaults to `research@wheretherecordends.com`.

Run `npm run db:generate --workspace=@where-the-record-ends/site` after a
schema change and `npm run db:migrate --workspace=@where-the-record-ends/site`
with the unpooled connection configured. Preview deployments must use a Neon
branch rather than the production database branch.

## Analytics configuration

Google Analytics is optional and loads only after a visitor allows analytics.
Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` only in the Vercel Production environment;
the application also checks `SITE_IS_PUBLIC` so previews and local development
do not collect analytics by default. Contact-form fields and submissions are not
sent to Google Analytics.

The GA4 property should keep advertising features disabled and should disable
Enhanced Measurement's form-interaction tracking. Page views and browser-history
changes are handled by Google Analytics, so the application does not send a
second manual page-view event.

## Routes

- `/family` — interactive family atlas
- `/cases` and `/cases/[slug]` — research case collection
- `/stories` and `/stories/[slug]` — evidence-backed chronicle
- `/sources` — source and media provenance catalog
- `/about` — personal framing and editorial method
- `/contact` — research contributions and corrections
- `/privacy` — analytics choices and contact-data handling
