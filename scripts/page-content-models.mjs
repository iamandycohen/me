// Data that can be displayed by a route, including content behind interactive
// controls. Rendered HTML is fingerprinted separately for authored page text.
// Keep these projections beside the tracking tests when renderers change.
const pick = (value, fields) =>
  Object.fromEntries(
    fields
      .filter((key) => value?.[key] !== undefined)
      .map((key) => [key, value[key]])
  );
const withoutPublication = (value) => {
  if (Array.isArray(value)) return value.map(withoutPublication);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== 'publication')
      .map(([key, child]) => [key, withoutPublication(child)])
  );
};
const reviewed = (value) => ({
  ...withoutPublication(
    Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== 'shortTitle')
    )
  ),
  reviewedOn: value?.publication?.reviewedOn,
});
const card = (project) => ({
  ...pick(project, ['id', 'title', 'summary', 'status']),
  links: project.lineage.length,
});
const image = (item) => pick(item, ['src', 'alt', 'fit', 'objectPosition']);
const preview = (item) =>
  pick(item, ['src', 'alt', 'fit', 'objectPosition', 'title', 'caption']);
const figure = (item, rights = false) => ({
  ...pick(item, [
    'id',
    'kind',
    'role',
    'src',
    'width',
    'height',
    'alt',
    'label',
    'title',
    'caption',
    'limitation',
    'fit',
    'objectPosition',
    'referenceIds',
  ]),
  ...pick(
    item?.provenance,
    rights
      ? ['sourcePage', 'credit', 'rightsStatement']
      : ['sourcePage', 'credit']
  ),
});
function referenceIds(value, result = new Set()) {
  if (Array.isArray(value))
    value.forEach((child) => referenceIds(child, result));
  else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (key === 'referenceIds') child.forEach((id) => result.add(id));
      else if (key === 'referenceId') result.add(child);
      else referenceIds(child, result);
    }
  }
  return result;
}
function referenceModel(reference, media) {
  const result = pick(reference, [
    'id',
    'title',
    'citation',
    'supports',
    'limitation',
    'visualAccess',
  ]);
  // The URL/access label is a fallback only when no explicit access links exist.
  if (reference.accessLinks?.length) result.accessLinks = reference.accessLinks;
  else Object.assign(result, pick(reference, ['url', 'accessLabel']));
  result.previews = (reference.visualAccess?.previewMediaIds ?? []).map((id) =>
    preview(media[id])
  );
  return result;
}

/** Citation dialogs for IDs discovered in rendered HTML or route models. */
export function referenceContentModels(content, ids) {
  return [...new Set(ids)]
    .sort((a, b) => a - b)
    .map((id) => {
      const source = content.references.find((entry) => entry.id === id);
      if (!source) throw Error(`Page content cites missing reference ${id}`);
      return referenceModel(source, content.media);
    });
}

/** Accept the genealogy-content namespace; no private data or build-time clock. */
export function pageContentModels(content) {
  const {
    people,
    relationships,
    references,
    researchCases,
    proofProjects,
    stories,
    evidenceClusters,
    highlandCreekReconstruction,
    threeThomasesIdentityModel,
    media,
    personMediaIds,
    caseMediaIds,
    storyMediaIds,
    caseImageNeeds,
    storyImageNeeds,
  } = content;
  const complete = (model, extraReferences = []) => {
    const ids = referenceIds(model);
    extraReferences.forEach((id) => ids.add(id));
    return {
      ...model,
      references: referenceContentModels(content, ids),
    };
  };
  const models = {
    '/': complete(
      {
        projects: proofProjects.map((project) => ({
          ...card(project),
          ancestor: project.lineage.at(-1)?.to,
        })),
        hero: pick(media['franklin-home'], ['src', 'alt']),
        map: pick(media['kentucky-map-1818'], ['src']),
        stops: ['kentucky-map-1818', 'ralls-map-1878', 'george-marker'].map(
          (id) => pick(media[id], ['src', 'alt', 'fit'])
        ),
        figure: figure(media['benjamin-bond']),
      },
      [42]
    ),
    '/family': complete(
      {
        people: people.map(withoutPublication),
        relationships: relationships.map((entry) => ({
          ...pick(entry, [
            'id',
            'from',
            'to',
            'evidenceType',
            'assessment',
            'statement',
            'referenceIds',
          ]),
          ...(entry.evidenceType === 'indirect'
            ? pick(entry, ['limitation'])
            : {}),
        })),
        portraits: people.map((person) => ({
          person: person.id,
          ...(() => {
            const item = media[personMediaIds[person.id]];
            return {
              ...pick(item, [
                'kind',
                'src',
                'alt',
                'fit',
                'objectPosition',
                'label',
                'caption',
                'limitation',
                'referenceIds',
              ]),
              ...pick(item?.provenance, ['sourcePage', 'credit']),
            };
          })(),
        })),
        clusters: withoutPublication(evidenceClusters),
      },
      [
        65, 28, 33, 59, 60, 61, 62, 63, 64, 1, 2, 4, 10, 11, 13, 56, 57, 58, 74,
        75, 76,
      ]
    ),
    '/proofs': {
      projects: proofProjects.map((project) => ({
        ...card(project),
        questions: project.parts.length,
        reviewedOn: project.publication.reviewedOn,
      })),
    },
    '/cases': {
      cases: researchCases.map((item) =>
        pick(item, [
          'id',
          'number',
          'title',
          'assessmentType',
          'summary',
          'known',
          'unknown',
        ])
      ),
      reconstructionTitle: highlandCreekReconstruction.title,
      identityTitle: threeThomasesIdentityModel.title,
    },
    '/stories': {
      stories: stories.map((story) => ({
        ...pick(story, [
          'id',
          'number',
          'title',
          'period',
          'summary',
          'routePlaces',
        ]),
        image: {
          ...image(media[storyMediaIds[story.id]?.[0]]),
          ...pick(media[storyMediaIds[story.id]?.[0]], ['role']),
        },
      })),
    },
    '/sources': {
      references: references.map((entry) => referenceModel(entry, media)),
      media: Object.values(media).map((item) => figure(item, true)),
    },
    '/about': {},
    '/contact': {},
    '/privacy': {},
    '/cases/parentage/highland-creek': complete(
      {
        reconstruction: reviewed(highlandCreekReconstruction),
        map: pick(media['highland-creek-map-1818'], [
          'src',
          'alt',
          'width',
          'height',
          'title',
          'label',
          'caption',
          'limitation',
          'referenceIds',
        ]),
      },
      [67, 68, 72, 18, 19, 73, 22, 69, 70]
    ),
    '/cases/parentage/three-thomases': complete(
      { identity: reviewed(threeThomasesIdentityModel) },
      [18, 22, 67, 68, 69, 19, 73]
    ),
  };
  for (const project of proofProjects) {
    const lineage = project.lineage.map((step) => {
      const part = project.parts.find(
        (entry) => entry.id === (step.partId ?? step.relationshipId)
      );
      const relation = relationships.find(
        (entry) => entry.id === step.relationshipId
      );
      return {
        ...pick(step, ['from', 'to', 'kind']),
        gpsReview: pick(step.gpsReview, ['status', 'elements', 'nextAction']),
        status:
          part?.status ??
          (relation?.assessment === 'high-confidence'
            ? 'accepted-indirect'
            : 'documented'),
        summary: part?.summary ?? relation?.statement ?? '',
        referenceIds: part
          ? [...new Set(part.evidence.map((item) => item.referenceId))]
          : (relation?.referenceIds ?? []),
        privateRecordsNote: relation?.referenceIds.length === 0,
        ...(part ? { partId: part.id } : {}),
      };
    });
    const partIds = lineage.map((step) => step.partId).filter(Boolean);
    const orderedParts = [
      ...project.parts
        .filter((part) => partIds.includes(part.id))
        .sort((a, b) => partIds.indexOf(a.id) - partIds.indexOf(b.id)),
      ...project.parts.filter((part) => !partIds.includes(part.id)),
    ];
    models[`/proofs/${project.id}`] = complete({
      project: {
        ...pick(project, ['id', 'title', 'summary', 'purpose', 'status']),
        reviewedOn: project.publication.reviewedOn,
        lineage,
        parts: orderedParts,
      },
    });
  }
  for (const item of researchCases) {
    models[`/cases/${item.id}`] = complete({
      case: {
        ...pick(item, [
          'id',
          'number',
          'title',
          'summary',
          'assessment',
          'known',
          'unknown',
          'referenceIds',
          'sections',
        ]),
        reviewedOn: item.publication.reviewedOn,
      },
      people: item.relatedPersonIds.map((id) =>
        pick(
          people.find((person) => person.id === id),
          ['name']
        )
      ),
      stories: item.relatedStoryIds.map((id) =>
        pick(
          stories.find((story) => story.id === id),
          ['id', 'shortTitle']
        )
      ),
      visuals: (caseMediaIds[item.id] ?? []).map((id) => figure(media[id])),
      imageNeed: caseImageNeeds[item.id],
    });
  }
  for (const [index, story] of stories.entries()) {
    models[`/stories/${story.id}`] = complete({
      story: pick(story, [
        'id',
        'number',
        'title',
        'period',
        'summary',
        'opening',
        'closing',
        'recordReader',
        'routePlaces',
        'events',
      ]),
      cases: story.relatedCaseIds.map((id) =>
        pick(
          researchCases.find((item) => item.id === id),
          ['id', 'shortTitle']
        )
      ),
      previous: pick(stories[index - 1], ['id', 'title']),
      next: pick(stories[index + 1], ['id', 'title']),
      visuals: (storyMediaIds[story.id] ?? []).map((id) => figure(media[id])),
      imageNeed: storyMediaIds[story.id]?.length
        ? storyImageNeeds[story.id]
        : undefined,
    });
  }
  return models;
}
