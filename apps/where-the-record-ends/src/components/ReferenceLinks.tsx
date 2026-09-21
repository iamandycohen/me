import { references } from '@where-the-record-ends/genealogy-content';
import Link from 'next/link';

import { ReferenceCitation } from './ReferenceCitation';

export function ReferenceLinks({ ids }: { ids: readonly number[] }) {
  if (ids.length === 0) return null;
  return (
    <span className="ml-1 inline-flex flex-wrap gap-1 align-super text-[0.64rem] leading-none">
      {ids.map((id) => {
        const reference = references.find((item) => item.id === id);

        if (reference) {
          return <ReferenceCitation key={id} reference={reference} />;
        }

        return (
          <Link
            key={id}
            href={`/sources#reference-${id}`}
            title={`Reference ${id}`}
            className="text-accent underline decoration-accent/30 underline-offset-2"
          >
            [{id}]
          </Link>
        );
      })}
    </span>
  );
}
