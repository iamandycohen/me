import { researchCases } from './cases.js';
import { evidenceClusters } from './clusters.js';
import { caseMediaIds, media, personMediaIds, storyMediaIds } from './media.js';
import { people } from './people.js';
import { references } from './references.js';
import { relationships } from './relationships.js';
import { stories } from './stories.js';
import type { PublicGenealogyContent, ValidationResult } from './types.js';

export const publicGenealogyContent: PublicGenealogyContent = {
  people,
  relationships,
  references,
  researchCases,
  stories,
  clusters: evidenceClusters,
  media,
};

function duplicateValues(
  values: readonly (string | number)[]
): (string | number)[] {
  const seen = new Set<string | number>();
  const duplicates = new Set<string | number>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function textMissing(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

export function validatePublicGenealogyContent(
  content: PublicGenealogyContent = publicGenealogyContent
): ValidationResult {
  const errors: string[] = [];
  const personIds = new Set(content.people.map((person) => person.id));
  const relationshipIds = content.relationships.map(
    (relationship) => relationship.id
  );
  const referenceIds = new Set(
    content.references.map((reference) => reference.id)
  );
  const caseIds = new Set(
    content.researchCases.map((researchCase) => researchCase.id)
  );
  const storyIds = new Set(content.stories.map((story) => story.id));
  const mediaIds = new Set(Object.keys(content.media));

  for (const [label, values] of [
    ['person', content.people.map((item) => item.id)],
    ['relationship', relationshipIds],
    ['reference', content.references.map((item) => item.id)],
    ['case', content.researchCases.map((item) => item.id)],
    ['story', content.stories.map((item) => item.id)],
    ['cluster', content.clusters.map((item) => item.id)],
    ['media', Object.keys(content.media)],
  ] as const) {
    for (const duplicate of duplicateValues(values)) {
      errors.push(`Duplicate ${label} id: ${duplicate}`);
    }
  }

  const validatePublication = (
    label: string,
    publication: { status: string; privacy: string; reviewedOn: string }
  ) => {
    if (publication.status !== 'published')
      errors.push(`${label} is not published`);
    if (publication.privacy !== 'public') errors.push(`${label} is not public`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publication.reviewedOn))
      errors.push(`${label} has an invalid reviewedOn date`);
  };
  const validateReferences = (label: string, ids: readonly number[]) => {
    for (const id of ids)
      if (!referenceIds.has(id))
        errors.push(`${label} references missing source ${id}`);
  };

  for (const person of content.people) {
    validatePublication(`Person ${person.id}`, person.publication);
    validateReferences(`Person ${person.id}`, person.referenceIds);
  }

  for (const relationship of content.relationships) {
    validatePublication(
      `Relationship ${relationship.id}`,
      relationship.publication
    );
    if (!personIds.has(relationship.from))
      errors.push(
        `Relationship ${relationship.id} has missing from person ${relationship.from}`
      );
    if (!personIds.has(relationship.to))
      errors.push(
        `Relationship ${relationship.id} has missing to person ${relationship.to}`
      );
    validateReferences(
      `Relationship ${relationship.id}`,
      relationship.referenceIds
    );
  }

  for (const source of content.references) {
    validatePublication(`Reference ${source.id}`, source.publication);
    for (const [field, value] of [
      ['title', source.title],
      ['citation', source.citation],
      ['supports', source.supports],
      ['limitation', source.limitation],
    ] as const) {
      if (textMissing(value))
        errors.push(`Reference ${source.id} is missing ${field}`);
    }
  }

  const caseSectionIds: string[] = [];
  const evidenceCardIds: string[] = [];
  for (const researchCase of content.researchCases) {
    validatePublication(`Case ${researchCase.id}`, researchCase.publication);
    validateReferences(`Case ${researchCase.id}`, researchCase.referenceIds);
    for (const personId of researchCase.relatedPersonIds)
      if (!personIds.has(personId))
        errors.push(`Case ${researchCase.id} has missing person ${personId}`);
    for (const storyId of researchCase.relatedStoryIds)
      if (!storyIds.has(storyId))
        errors.push(`Case ${researchCase.id} has missing story ${storyId}`);
    for (const section of researchCase.sections) {
      caseSectionIds.push(`${researchCase.id}:${section.id}`);
      for (const card of section.cards) {
        evidenceCardIds.push(`${researchCase.id}:${card.id}`);
        validateReferences(
          `Case card ${researchCase.id}:${card.id}`,
          card.referenceIds
        );
      }
    }
  }

  const storyEventIds: string[] = [];
  for (const story of content.stories) {
    validatePublication(`Story ${story.id}`, story.publication);
    for (const caseId of story.relatedCaseIds)
      if (!caseIds.has(caseId))
        errors.push(`Story ${story.id} has missing case ${caseId}`);
    for (const event of story.events) {
      storyEventIds.push(event.id);
      validateReferences(`Story event ${event.id}`, event.referenceIds);
      if (event.routeIndex < 0 || event.routeIndex >= story.routePlaces.length)
        errors.push(
          `Story event ${event.id} has invalid routeIndex ${event.routeIndex}`
        );
    }
  }
  for (const duplicate of duplicateValues(caseSectionIds))
    errors.push(`Duplicate case section id: ${duplicate}`);
  for (const duplicate of duplicateValues(evidenceCardIds))
    errors.push(`Duplicate evidence card id: ${duplicate}`);
  for (const duplicate of duplicateValues(storyEventIds))
    errors.push(`Duplicate story event id: ${duplicate}`);

  for (const cluster of content.clusters) {
    validatePublication(`Cluster ${cluster.id}`, cluster.publication);
    const nodeIds = cluster.nodes.map((node) => node.id);
    const nodeIdSet = new Set(nodeIds);
    for (const duplicate of duplicateValues(nodeIds))
      errors.push(`Duplicate cluster node id: ${cluster.id}:${duplicate}`);
    for (const node of cluster.nodes)
      validateReferences(
        `Cluster node ${cluster.id}:${node.id}`,
        node.referenceIds
      );
    for (const link of cluster.links) {
      if (!nodeIdSet.has(link.from))
        errors.push(
          `Cluster ${cluster.id} link has missing from node ${link.from}`
        );
      if (!nodeIdSet.has(link.to))
        errors.push(
          `Cluster ${cluster.id} link has missing to node ${link.to}`
        );
    }
  }

  for (const [id, item] of Object.entries(content.media)) {
    validatePublication(`Media ${id}`, item.publication);
    if (item.id !== id)
      errors.push(`Media key ${id} does not match embedded id ${item.id}`);
    if (item.width <= 0 || item.height <= 0)
      errors.push(`Media ${id} has invalid dimensions`);
    for (const [field, value] of [
      ['src', item.src],
      ['alt', item.alt],
      ['label', item.label],
      ['title', item.title],
      ['caption', item.caption],
      ['collection', item.provenance.collection],
      ['rightsStatement', item.provenance.rightsStatement],
      ['credit', item.provenance.credit],
    ] as const) {
      if (textMissing(value)) errors.push(`Media ${id} is missing ${field}`);
    }
    if (
      (item.kind === 'map' || item.kind === 'place') &&
      textMissing(item.provenance.sourcePage)
    )
      errors.push(`Archive context media ${id} is missing sourcePage`);
    validateReferences(`Media ${id}`, item.referenceIds);
  }

  const validatePlacement = (label: string, id: string) => {
    if (!mediaIds.has(id))
      errors.push(`${label} references missing media ${id}`);
  };
  for (const [personId, mediaId] of Object.entries(personMediaIds)) {
    if (!personIds.has(personId as never))
      errors.push(`Media placement has missing person ${personId}`);
    validatePlacement(`Person ${personId}`, mediaId);
  }
  for (const [caseId, ids] of Object.entries(caseMediaIds)) {
    if (!caseIds.has(caseId as never))
      errors.push(`Media placement has missing case ${caseId}`);
    for (const id of ids) validatePlacement(`Case ${caseId}`, id);
  }
  for (const [storyId, ids] of Object.entries(storyMediaIds)) {
    if (!storyIds.has(storyId as never))
      errors.push(`Media placement has missing story ${storyId}`);
    for (const id of ids) validatePlacement(`Story ${storyId}`, id);
  }

  return { valid: errors.length === 0, errors };
}

export function assertValidPublicGenealogyContent(
  content: PublicGenealogyContent = publicGenealogyContent
): void {
  const result = validatePublicGenealogyContent(content);
  if (!result.valid)
    throw new Error(
      `Invalid public genealogy content:\n${result.errors.map((error) => `- ${error}`).join('\n')}`
    );
}
