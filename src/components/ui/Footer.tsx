import { getDisplayName, formatLinkedInUrl } from '@/lib/data-helpers';
import data from '@/lib/data';

const displayName = getDisplayName(data.contact);
const year = new Date().getFullYear();
const linkedinUrl = formatLinkedInUrl(data.contact.linkedin);

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="container-max py-12">
        <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-4 text-sm text-ink/60">
          <p className="font-serif italic text-base text-ink/80">
            Built to last. Built for what comes next.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/iamandycohen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <span className="text-ink/40">
              &copy; {year} {displayName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
