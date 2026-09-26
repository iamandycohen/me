import { researchCases } from './cases.js';
import { evidenceClusters } from './clusters.js';
import { caseMediaIds, media, personMediaIds, storyMediaIds } from './media.js';
import { genealogyIdentityModels } from './identity-models.js';
import { people } from './people.js';
import { proofProjects } from './proofs.js';
import { references } from './references.js';
import { genealogyReconstructions } from './reconstructions.js';
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
  reconstructions: genealogyReconstructions,
  identityModels: genealogyIdentityModels,
  proofProjects,
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

function textMissing(value: unknown): boolean {
  return typeof value !== 'string' || value.trim().length === 0;
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
    ['reconstruction', content.reconstructions.map((item) => item.id)],
    ['identity model', content.identityModels.map((item) => item.id)],
    ['proof project', content.proofProjects.map((item) => item.id)],
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

  for (const project of content.proofProjects) {
    const projectLabel = `Proof project ${project.id}`;
    if (!['meason', 'sledge'].includes(project.id))
      errors.push(`${projectLabel} has invalid id`);
    validatePublication(projectLabel, project.publication);
    if (project.status !== 'in-progress')
      errors.push(`${projectLabel} has invalid status ${project.status}`);
    for (const [field, value] of [
      ['title', project.title],
      ['summary', project.summary],
      ['purpose', project.purpose],
    ] as const)
      if (textMissing(value))
        errors.push(`${projectLabel} is missing ${field}`);
    const parts = Array.isArray(project.parts) ? project.parts : [];
    if (!parts.length) errors.push(`${projectLabel} has no parts`);
    for (const duplicate of duplicateValues(parts.map(({ id }) => id)))
      errors.push(`Duplicate proof part id: ${project.id}:${duplicate}`);
    const lineage = Array.isArray(project.lineage) ? project.lineage : [];
    if (!lineage.length) errors.push(`${projectLabel} has no lineage steps`);
    for (const duplicate of duplicateValues(lineage.map(({ id }) => id)))
      errors.push(
        `Duplicate proof lineage step id: ${project.id}:${duplicate}`
      );
    const expectedTarget =
      project.id === 'meason'
        ? 'Thomas Meason senior'
        : 'John Sledge of the SAR family claim';
    if (lineage.length && lineage[0].from !== 'Andy Cohen')
      errors.push(`${projectLabel} lineage must begin with Andy Cohen`);
    if (lineage.length && lineage[lineage.length - 1].to !== expectedTarget)
      errors.push(`${projectLabel} lineage must end with ${expectedTarget}`);
    for (const [index, step] of lineage.entries()) {
      const label = `${projectLabel} lineage step ${step.id}`;
      if (step.gpsReview?.status !== 'pending')
        errors.push(`${label} has missing or invalid GPS review status`);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(step.id))
        errors.push(`${label} has invalid id`);
      if (textMissing(step.from) || textMissing(step.to))
        errors.push(`${label} is missing a person label`);
      if (step.from === step.to)
        errors.push(`${label} connects the same label to itself`);
      if (index > 0 && lineage[index - 1].to !== step.from)
        errors.push(`${label} does not connect to the previous step`);
      if (!['parent-child', 'identity'].includes(step.kind))
        errors.push(`${label} has invalid kind ${step.kind}`);
      if (Boolean(step.relationshipId) === Boolean(step.partId)) {
        errors.push(
          `${label} must reference exactly one relationship or proof part`
        );
      } else if (step.relationshipId) {
        const relationship = content.relationships.find(
          ({ id }) => id === step.relationshipId
        );
        if (!relationship)
          errors.push(
            `${label} references missing relationship ${step.relationshipId}`
          );
        else if (step.kind !== relationship.kind)
          errors.push(
            `${label} kind conflicts with relationship ${relationship.id}`
          );
      } else if (step.partId) {
        const part = parts.find(({ id }) => id === step.partId);
        if (!part)
          errors.push(`${label} references missing proof part ${step.partId}`);
        else if (part.status === 'excluded')
          errors.push(
            `${label} references an excluded proof part ${step.partId}`
          );
      }
    }
    for (const part of parts) {
      const label = `${projectLabel} part ${part.id}`;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(part.id))
        errors.push(`${label} has invalid id`);
      if (
        ![
          'documented',
          'accepted-indirect',
          'supported-inference',
          'open',
          'excluded',
          'not-assessed',
        ].includes(part.status)
      )
        errors.push(`${label} has invalid status ${part.status}`);
      if (
        !['direct', 'indirect', 'mixed', 'unassessed'].includes(
          part.evidenceType
        )
      )
        errors.push(`${label} has invalid evidence type ${part.evidenceType}`);
      if (
        (part.status === 'not-assessed') !==
        (part.evidenceType === 'unassessed')
      )
        errors.push(`${label} has inconsistent status and evidence type`);
      for (const [field, value] of [
        ['question', part.question],
        ['summary', part.summary],
        ['research scope limits', part.researchScope?.limits],
        ['analysis', part.analysis],
        ['conclusion', part.conclusion],
      ] as const)
        if (textMissing(value)) errors.push(`${label} is missing ${field}`);
      if (
        !Array.isArray(part.researchScope?.searched) ||
        !part.researchScope.searched.length ||
        part.researchScope.searched.some(textMissing)
      )
        errors.push(`${label} is missing researched record groups`);
      if (
        [
          'open',
          'supported-inference',
          'accepted-indirect',
          'not-assessed',
        ].includes(part.status) &&
        textMissing(part.nextTest)
      )
        errors.push(`${label} is missing next test`);
      const evidence = Array.isArray(part.evidence) ? part.evidence : [];
      if (!evidence.length) errors.push(`${label} has no evidence`);
      for (const item of evidence) {
        validateReferences(label, [item.referenceId]);
        if (!['supports', 'context', 'conflicts', 'limits'].includes(item.role))
          errors.push(`${label} has invalid source role ${item.role}`);
        if (textMissing(item.note))
          errors.push(`${label} has evidence without a note`);
      }
      const conflicts = Array.isArray(part.conflicts) ? part.conflicts : [];
      if (!Array.isArray(part.conflicts))
        errors.push(`${label} is missing conflicts array`);
      for (const conflict of conflicts)
        if (textMissing(conflict.issue) || textMissing(conflict.resolution))
          errors.push(`${label} has incomplete conflict analysis`);
      const relatedCaseIds = Array.isArray(part.relatedCaseIds)
        ? part.relatedCaseIds
        : [];
      if (!Array.isArray(part.relatedCaseIds))
        errors.push(`${label} is missing related case ids array`);
      for (const caseId of relatedCaseIds)
        if (!caseIds.has(caseId))
          errors.push(`${label} has missing case ${caseId}`);
    }
  }

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
    if (source.accessLinks) {
      for (const [index, link] of source.accessLinks.entries()) {
        if (textMissing(link.label))
          errors.push(
            `Reference ${source.id} access link ${index + 1} is missing label`
          );
        if (textMissing(link.url))
          errors.push(
            `Reference ${source.id} access link ${index + 1} is missing url`
          );
      }
    }
    if (source.visualAccess) {
      const { note, previewMediaIds, status } = source.visualAccess;
      if (
        ![
          'reviewed-preview',
          'external-original-only',
          'external-volume-only',
          'text-only-deferred',
        ].includes(status)
      )
        errors.push(
          `Reference ${source.id} has invalid visual access status ${status}`
        );
      if (textMissing(note))
        errors.push(`Reference ${source.id} visual access is missing note`);
      if (status === 'reviewed-preview') {
        if (!previewMediaIds || previewMediaIds.length === 0)
          errors.push(
            `Reference ${source.id} reviewed preview has no preview media`
          );
        for (const mediaId of previewMediaIds ?? [])
          if (!mediaIds.has(mediaId))
            errors.push(
              `Reference ${source.id} visual access references missing media ${mediaId}`
            );
      } else if (previewMediaIds !== undefined) {
        errors.push(
          `Reference ${source.id} non-preview visual access must not include preview media`
        );
      }
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
    if (story.recordReader)
      validateReferences(
        `Story record reader ${story.id}`,
        story.recordReader.referenceIds
      );
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

  for (const reconstruction of content.reconstructions) {
    validatePublication(
      `Reconstruction ${reconstruction.id}`,
      reconstruction.publication
    );
    const nodeIds = reconstruction.nodes.map((node) => node.id);
    const nodeIdSet = new Set(nodeIds);
    for (const duplicate of duplicateValues(nodeIds))
      errors.push(
        `Duplicate reconstruction node id: ${reconstruction.id}:${duplicate}`
      );
    for (const node of reconstruction.nodes)
      validateReferences(
        `Reconstruction node ${reconstruction.id}:${node.id}`,
        node.referenceIds
      );

    for (const duplicate of duplicateValues(
      reconstruction.edges.map((edge) => edge.id)
    ))
      errors.push(
        `Duplicate reconstruction edge id: ${reconstruction.id}:${duplicate}`
      );
    for (const edge of reconstruction.edges) {
      if (!nodeIdSet.has(edge.from))
        errors.push(
          `Reconstruction ${reconstruction.id} edge ${edge.id} has missing from node ${edge.from}`
        );
      if (!nodeIdSet.has(edge.to))
        errors.push(
          `Reconstruction ${reconstruction.id} edge ${edge.id} has missing to node ${edge.to}`
        );
      if (
        !['recorded', 'identity-synthesis', 'hypothesis'].includes(
          edge.evidenceState
        )
      )
        errors.push(
          `Reconstruction ${reconstruction.id} edge ${edge.id} has invalid evidence state ${edge.evidenceState}`
        );
      if (
        ![
          'spouse',
          'parent-child',
          'sibling',
          'heirship-unknown-degree',
          'identity',
          'open-parentage-hypothesis',
          'deed-property-transfer',
          'land-title-association',
          'legal-record-role',
        ].includes(edge.connectionKind)
      )
        errors.push(
          `Reconstruction ${reconstruction.id} edge ${edge.id} has invalid connection kind ${edge.connectionKind}`
        );
      validateReferences(
        `Reconstruction edge ${reconstruction.id}:${edge.id}`,
        edge.referenceIds
      );
    }

    for (const duplicate of duplicateValues(
      reconstruction.timeline.map((event) => event.id)
    ))
      errors.push(
        `Duplicate reconstruction timeline id: ${reconstruction.id}:${duplicate}`
      );
    for (const event of reconstruction.timeline)
      validateReferences(
        `Reconstruction timeline ${reconstruction.id}:${event.id}`,
        event.referenceIds
      );

    for (const duplicate of duplicateValues(
      reconstruction.contextCheckpoints.map((checkpoint) => checkpoint.id)
    ))
      errors.push(
        `Duplicate reconstruction context checkpoint id: ${reconstruction.id}:${duplicate}`
      );
    for (const checkpoint of reconstruction.contextCheckpoints)
      validateReferences(
        `Reconstruction context checkpoint ${reconstruction.id}:${checkpoint.id}`,
        checkpoint.referenceIds
      );

    for (const duplicate of duplicateValues(
      reconstruction.documents.map((document) => document.id)
    ))
      errors.push(
        `Duplicate reconstruction document id: ${reconstruction.id}:${duplicate}`
      );
    for (const document of reconstruction.documents) {
      validateReferences(
        `Reconstruction document ${reconstruction.id}:${document.id}`,
        [document.referenceId]
      );
      const pageIds = document.pages.map((page) => page.id);
      for (const duplicate of duplicateValues(pageIds))
        errors.push(
          `Duplicate reconstruction page id: ${reconstruction.id}:${document.id}:${duplicate}`
        );
      document.pages.forEach((page, index) => {
        if (page.sequence !== index + 1)
          errors.push(
            `Reconstruction document ${document.id} has invalid page order at ${page.id}`
          );
        if (page.rightsState !== 'permission-required')
          errors.push(
            `Reconstruction document ${document.id} page ${page.id} has invalid rights state ${page.rightsState}`
          );
        if (textMissing(page.providerUrl))
          errors.push(
            `Reconstruction document ${document.id} page ${page.id} is missing providerUrl`
          );
      });
    }
  }

  for (const identityModel of content.identityModels) {
    validatePublication(
      `Identity model ${identityModel.id}`,
      identityModel.publication
    );
    validateReferences(
      `Identity model ${identityModel.id}`,
      identityModel.referenceIds
    );
    const subjectIds = identityModel.subjects.map((subject) => subject.id);
    const subjectIdSet = new Set(subjectIds);
    for (const duplicate of duplicateValues(subjectIds))
      errors.push(
        `Duplicate identity subject id: ${identityModel.id}:${duplicate}`
      );
    for (const subject of identityModel.subjects)
      validateReferences(
        `Identity subject ${identityModel.id}:${subject.id}`,
        subject.referenceIds
      );
    for (const duplicate of duplicateValues(
      identityModel.connections.map((connection) => connection.id)
    ))
      errors.push(
        `Duplicate identity connection id: ${identityModel.id}:${duplicate}`
      );
    for (const connection of identityModel.connections) {
      if (
        !['possible', 'strong-indirect', 'excluded'].includes(
          connection.assessment
        )
      )
        errors.push(
          `Identity model ${identityModel.id} connection ${connection.id} has invalid assessment ${connection.assessment}`
        );
      if (connection.endpointLabels.length !== connection.subjectIds.length)
        errors.push(
          `Identity model ${identityModel.id} connection ${connection.id} has mismatched endpoint labels`
        );
      for (const subjectId of connection.subjectIds)
        if (!subjectIdSet.has(subjectId))
          errors.push(
            `Identity model ${identityModel.id} connection ${connection.id} has missing subject ${subjectId}`
          );
      validateReferences(
        `Identity connection ${identityModel.id}:${connection.id}`,
        connection.referenceIds
      );
    }
    for (const duplicate of duplicateValues(
      identityModel.timeline.map((event) => event.id)
    ))
      errors.push(
        `Duplicate identity timeline id: ${identityModel.id}:${duplicate}`
      );
    for (const event of identityModel.timeline)
      validateReferences(
        `Identity timeline ${identityModel.id}:${event.id}`,
        event.referenceIds
      );
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
