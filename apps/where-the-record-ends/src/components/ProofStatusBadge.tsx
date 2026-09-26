import type {
  ProofPartStatus,
  ProofProjectStatus,
} from '@where-the-record-ends/genealogy-content';

type ProofStatus = ProofPartStatus | ProofProjectStatus;

const badges: Record<ProofStatus, { label: string; className: string }> = {
  documented: {
    label: 'Documented',
    className: 'border-moss bg-moss text-paper',
  },
  'accepted-indirect': {
    label: 'Accepted indirect',
    className: 'border-moss/50 bg-moss/10 text-moss',
  },
  'supported-inference': {
    label: 'Supported inference',
    className: 'border-accent/50 bg-accent/10 text-accent',
  },
  open: {
    label: 'Open',
    className: 'border-dashed border-ink/45 bg-paper text-ink/75',
  },
  excluded: {
    label: 'Excluded',
    className: 'border-ink/25 bg-ink/10 text-ink/65',
  },
  'not-assessed': {
    label: 'Not yet assessed here',
    className: 'border-ink/25 bg-cream text-ink/60',
  },
  'in-progress': {
    label: 'In progress',
    className: 'border-accent bg-accent text-paper',
  },
};

export function ProofStatusBadge({ status }: { status: ProofStatus }) {
  const badge = badges[status];

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}
