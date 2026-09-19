import Link from 'next/link';

export function ArrowLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        inverse
          ? 'text-accent-soft decoration-accent-soft/30 hover:text-paper focus-visible:outline-accent-soft'
          : 'text-accent decoration-accent/30 hover:text-ink focus-visible:outline-accent'
      }`}
    >
      {children}{' '}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
