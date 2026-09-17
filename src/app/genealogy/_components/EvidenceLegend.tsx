const legend = [
  {
    label: 'Documented',
    description: 'Supported by personal knowledge or original records.',
    marker: 'border-accent bg-accent',
  },
  {
    label: 'Under review',
    description: 'Known privately, pending source and privacy review.',
    marker: 'border-ink/30 bg-paper',
  },
  {
    label: 'Unknown',
    description: 'An open question—not a relationship presented as fact.',
    marker: 'border-ink/50 bg-paper',
  },
];

export default function EvidenceLegend() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {legend.map((item) => (
        <div key={item.label} className="flex gap-4">
          <span
            aria-hidden="true"
            className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${item.marker}`}
          />
          <div>
            <p className="font-medium text-ink mb-1">{item.label}</p>
            <p className="text-sm leading-relaxed text-ink/55">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
