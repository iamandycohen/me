import Link from 'next/link';

const navigation = [
  ['Family atlas', '/family'],
  ['Research cases', '/cases'],
  ['Highland Creek', '/cases/parentage/highland-creek'],
  ['Stories', '/stories'],
  ['Sources', '/sources'],
  ['About', '/about'],
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/80">
      <a
        href="#main-content"
        className="absolute left-4 top-0 z-50 -translate-y-full rounded-b-lg bg-ink px-4 py-2 text-sm text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-5 py-4 sm:px-8 xl:flex-row xl:items-center xl:justify-between">
        <Link
          href="/"
          className="group flex max-w-fit items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-accent shadow-[0_0_0_5px_rgba(152,83,56,0.12)] transition-transform group-hover:scale-125"
          />
          <span className="font-serif text-xl tracking-tight sm:text-[1.35rem]">
            Where the Record Ends
          </span>
          <span className="hidden border-l border-ink/15 pl-3 text-[0.55rem] uppercase tracking-[0.18em] text-ink/45 sm:inline">
            An active family history
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-x-1 gap-y-1 text-[0.82rem] text-ink/65 xl:justify-end">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-full px-3 py-1.5 underline-offset-4 transition-colors hover:bg-ink/[0.055] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
