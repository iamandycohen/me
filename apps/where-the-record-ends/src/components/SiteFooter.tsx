import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8">
        <div className="grid gap-10 border-b border-paper/10 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow !text-accent-soft">Where the Record Ends</p>
            <p className="balanced mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              The record runs from Kentucky to Missouri to Texas. The search is
              still moving.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper/65">
            <Link className="transition-colors hover:text-paper" href="/family">
              Family atlas
            </Link>
            <Link className="transition-colors hover:text-paper" href="/cases">
              Research cases
            </Link>
            <Link
              className="transition-colors hover:text-paper"
              href="/cases/parentage/highland-creek"
            >
              Highland Creek
            </Link>
            <Link
              className="transition-colors hover:text-paper"
              href="/stories"
            >
              Chronicle
            </Link>
            <Link
              className="transition-colors hover:text-paper"
              href="/sources"
            >
              Sources
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs leading-relaxed text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">
            An ongoing public research project. Evidence, interpretation, and
            uncertainty are kept visibly distinct.
          </p>
          <Link
            className="w-fit underline decoration-paper/20 underline-offset-4 transition-colors hover:text-paper"
            href="/about"
          >
            Read the editorial method
          </Link>
        </div>
      </div>
    </footer>
  );
}
