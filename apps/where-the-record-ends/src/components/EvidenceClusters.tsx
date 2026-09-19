'use client';

import {
  evidenceClusters,
  type EvidenceClusterId,
} from '@where-the-record-ends/genealogy-content';
import { useState } from 'react';

import { ReferenceLinks } from './ReferenceLinks';

const kindStyles = {
  person: 'border-accent/35 bg-accent/[0.07]',
  household: 'border-moss/35 bg-moss/[0.07]',
  land: 'border-[#a98755]/40 bg-[#a98755]/[0.08]',
  record: 'border-ink/15 bg-paper/80',
  work: 'border-[#6e7f8f]/35 bg-[#6e7f8f]/[0.07]',
} as const;

const linkStyles = {
  documented: 'border-solid border-moss/40 text-moss',
  indirect: 'border-dashed border-accent/45 text-accent',
  context: 'border-dotted border-ink/25 text-ink/55',
} as const;

export function EvidenceClusters() {
  const [selectedId, setSelectedId] =
    useState<EvidenceClusterId>('missouri-network');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const selected =
    evidenceClusters.find((cluster) => cluster.id === selectedId) ??
    evidenceClusters[0];
  const activeNode = selected.nodes.find((node) => node.id === activeNodeId);
  const activeLinks = activeNode
    ? selected.links.filter(
        (link) => link.from === activeNode.id || link.to === activeNode.id
      )
    : selected.links;
  const connectedNodeIds = new Set(
    activeLinks.flatMap((link) => [link.from, link.to])
  );

  return (
    <section
      id="evidence-neighborhoods"
      className="scroll-mt-8 overflow-hidden rounded-[2rem] border border-ink/10 bg-cream shadow-paper"
      aria-labelledby="evidence-neighborhoods-title"
    >
      <header className="grid gap-6 border-b border-ink/10 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-end">
        <div>
          <p className="eyebrow">Evidence neighborhoods</p>
          <h2
            id="evidence-neighborhoods-title"
            className="balanced mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl"
          >
            See what clusters around the documented line.
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-ink/60">
          These are typed research connections—not extra branches on the family
          tree. A household, deed, occupation, or repeated neighbor can add
          context without becoming proof of kinship.
        </p>
      </header>

      <div className="border-b border-ink/10 px-7 py-5 sm:px-9">
        <fieldset>
          <legend className="sr-only">Choose an evidence neighborhood</legend>
          <div className="flex flex-wrap gap-2">
            {evidenceClusters.map((cluster) => (
              <button
                key={cluster.id}
                type="button"
                aria-pressed={cluster.id === selected.id}
                onClick={() => {
                  setSelectedId(cluster.id);
                  setActiveNodeId(null);
                }}
                className={`rounded-full border px-4 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  cluster.id === selected.id
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/15 bg-paper/70 text-ink/65 hover:border-accent/45'
                }`}
              >
                <span className="block font-medium">{cluster.place}</span>
                <span className="mt-0.5 block text-[0.58rem] uppercase tracking-[0.12em] opacity-60">
                  {cluster.period}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div
          className="relative min-h-[32rem] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(160,87,61,0.09),transparent_58%)] p-7 sm:p-9"
          aria-live="polite"
        >
          <div className="relative z-10">
            <p className="eyebrow">{selected.period}</p>
            <h3 className="mt-2 font-serif text-3xl">{selected.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/60">
              {selected.summary}
            </p>
            <p className="mt-3 text-xs font-medium text-accent">
              Select a node to trace only its documented and contextual
              connections.
            </p>
          </div>

          <ul className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {selected.nodes.map((node, index) => (
              <li
                key={node.id}
                className={`rounded-[1.35rem] border shadow-[0_12px_35px_rgba(45,31,23,0.04)] transition-all ${kindStyles[node.kind]} ${index === 0 ? 'sm:col-span-2 xl:col-span-1' : ''} ${activeNodeId && !connectedNodeIds.has(node.id) ? 'opacity-35' : 'opacity-100'} ${activeNodeId === node.id ? 'ring-2 ring-accent ring-offset-2 ring-offset-cream' : ''}`}
              >
                <button
                  type="button"
                  aria-pressed={activeNodeId === node.id}
                  onClick={() =>
                    setActiveNodeId(activeNodeId === node.id ? null : node.id)
                  }
                  className="w-full p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[0.56rem] uppercase tracking-[0.15em] text-ink/45">
                      {node.kind}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-current opacity-30" />
                  </span>
                  <span className="mt-5 block font-serif text-xl leading-tight">
                    {node.label}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-ink/60">
                    {node.detail}
                  </span>
                </button>
                <p className="border-t border-ink/10 px-5 py-3 text-[0.62rem] text-ink/50">
                  Sources
                  <ReferenceLinks ids={node.referenceIds} />
                </p>
                {activeNodeId === node.id && activeLinks.length > 0 ? (
                  <ul className="border-t border-accent/15 bg-paper/50 px-5 py-3 text-[0.68rem] leading-relaxed text-ink/60">
                    {activeLinks.map((link) => {
                      const otherId =
                        link.from === node.id ? link.to : link.from;
                      const other = selected.nodes.find(
                        (candidate) => candidate.id === otherId
                      );
                      return (
                        <li key={`${link.from}-${link.to}`}>
                          <span aria-hidden="true">↳ </span>
                          {link.label} · {other?.label}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="relative z-10 mt-8 border-l-2 border-accent/25 pl-4 text-xs leading-relaxed text-ink/55">
            Boundary: {selected.boundary}
          </p>
        </div>

        <aside className="border-t border-ink/10 bg-paper/55 p-7 sm:p-9 lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Connection paths</p>
              <h3 className="mt-2 font-serif text-xl leading-tight">
                {activeNode
                  ? `Connections from ${activeNode.label}`
                  : 'Why these nodes sit together'}
              </h3>
            </div>
            {activeNode ? (
              <button
                type="button"
                onClick={() => setActiveNodeId(null)}
                className="text-xs text-accent underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                Show all
              </button>
            ) : null}
          </div>
          <ul className="mt-6 space-y-4">
            {selected.links.map((link) => {
              const from = selected.nodes.find((node) => node.id === link.from);
              const to = selected.nodes.find((node) => node.id === link.to);
              return (
                <li
                  key={`${link.from}-${link.to}`}
                  className={`border-l-2 pl-4 transition-opacity ${linkStyles[link.kind]} ${activeNode && link.from !== activeNode.id && link.to !== activeNode.id ? 'opacity-20' : 'opacity-100'}`}
                >
                  <p className="text-[0.56rem] uppercase tracking-[0.14em]">
                    {link.kind} · {link.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">
                    {from?.label} → {to?.label}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-ink/45">
              Connection key
            </p>
            <div className="mt-4 space-y-2 text-xs text-ink/55">
              <p>Solid · directly recorded connection</p>
              <p>Dashed · indirect assessed connection</p>
              <p>Dotted · contextual association</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
