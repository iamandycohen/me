import type { PublicImageNeed } from '@where-the-record-ends/genealogy-content';

export function ImageNeeded({ need }: { need: PublicImageNeed }) {
  return (
    <aside className="flex min-h-72 flex-col justify-between rounded-[1.5rem] border border-dashed border-accent/40 bg-accent/[0.035] p-6">
      <div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-accent/50 font-serif text-2xl text-accent">
          +
        </span>
        <p className="eyebrow mt-8 !text-[0.58rem]">{need.label}</p>
        <h2 className="mt-2 font-serif text-2xl">{need.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          {need.description}
        </p>
      </div>
      <p className="mt-6 text-xs italic leading-relaxed text-ink/55">
        Logged for archival follow-up. No substitute is shown as if it were the
        real place or record.
      </p>
    </aside>
  );
}
