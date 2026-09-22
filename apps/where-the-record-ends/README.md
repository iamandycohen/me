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

## Routes

- `/family` — interactive family atlas
- `/cases` and `/cases/[slug]` — research case collection
- `/stories` and `/stories/[slug]` — evidence-backed chronicle
- `/sources` — source and media provenance catalog
- `/about` — personal framing and editorial method
- `/contact` — research contributions and corrections
