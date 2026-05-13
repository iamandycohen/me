# Andy Cohen — Personal Site

> Personal site of Andy Cohen. Founding Architect of Sitecore XM Cloud. Currently Head of AI and Agentic Experience at Kajoo + TechGuilds.

A minimal, editorial Next.js portfolio. Content-first.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** — custom editorial palette (warm paper / ink)
- **Fraunces + Inter** typography
- **Jest + React Testing Library**

## Develop

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Script                            | Description            |
| --------------------------------- | ---------------------- |
| `dev`                             | Run Next.js dev server |
| `build`                           | Production build       |
| `start`                           | Run production server  |
| `lint` / `lint:fix`               | ESLint                 |
| `type-check`                      | TypeScript check       |
| `test` / `test:ci` / `test:watch` | Jest                   |
| `validate`                        | Run type-check + lint  |
| `setup:env`                       | Bootstrap `.env.local` |

## Environment

The site has no required environment variables. Optional:

- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs and OpenGraph metadata
- `NEXT_PUBLIC_GA_ID` — Google Analytics

## Structure

```
src/
  app/            App Router pages (about, resume, projects, articles, community, contact)
  components/     UI components (Navigation, Footer, PerformanceHints)
  lib/            Data helpers, metadata, utilities
  styles/         Global Tailwind + editorial typography
content/
  data.json       Single source of truth for bio, resume, projects, community
```

## License

MIT
