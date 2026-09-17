import Link from 'next/link';

import type { PublicTreeNode, TreeNodeStatus } from '../data';
import SourceFootnote from './SourceFootnote';

const statusStyles: Record<TreeNodeStatus, string> = {
  documented: 'border-accent bg-accent/5 text-accent',
  review: 'border-ink/25 bg-paper text-ink/65',
  unknown: 'border-dashed border-ink/40 bg-ink/[0.025] text-ink',
};

const markerStyles: Record<TreeNodeStatus, string> = {
  documented: 'border-accent bg-accent',
  review: 'border-ink/30 bg-paper',
  unknown: 'border-ink/50 bg-paper',
};

export default function DocumentedTree({ nodes }: { nodes: PublicTreeNode[] }) {
  return (
    <ol className="relative" aria-label="Working Meason family line">
      {nodes.map((node, index) => (
        <li
          key={node.href}
          className="relative grid md:grid-cols-12 gap-5 md:gap-10 pb-12 last:pb-0"
        >
          {index < nodes.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute left-[0.6875rem] top-6 h-[calc(100%-0.5rem)] border-l ${
                node.connectionToNext === 'review'
                  ? 'border-dashed border-ink/30'
                  : 'border-ink/20'
              }`}
            />
          )}
          <div className="md:col-span-3 pl-10 md:pl-12 relative">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 ${markerStyles[node.status]}`}
            />
            <p className="eyebrow mb-1">{node.relationship}</p>
            <p className="text-sm text-ink/50">{node.period}</p>
          </div>
          <article className="md:col-span-9 rounded-2xl border border-ink/10 bg-paper p-6 md:p-8 shadow-[0_12px_40px_rgba(26,26,26,0.035)]">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <h3 className="text-2xl md:text-3xl">
                <Link
                  href={node.href}
                  className="group inline-flex items-baseline gap-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  aria-label={`${node.title}: view this person on the visual family tree`}
                >
                  {node.title}
                  <span
                    aria-hidden="true"
                    className="text-base text-accent transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </h3>
              <span
                className={`w-fit rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-widest ${statusStyles[node.status]}`}
              >
                {node.statusLabel}
              </span>
            </div>
            <p className="max-w-2xl leading-relaxed text-ink/70">
              {node.summary}
              {node.referenceIds ? (
                <SourceFootnote referenceIds={node.referenceIds} />
              ) : null}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}
