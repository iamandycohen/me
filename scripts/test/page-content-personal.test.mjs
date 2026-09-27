import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { personalPageContentModels } from '../personal-page-content-models.mjs';
const original = JSON.parse(
  readFileSync(new URL('../../content/data.json', import.meta.url), 'utf8')
);
const changed = (mutate) => {
  const before = personalPageContentModels(original);
  const data = structuredClone(original);
  mutate(data);
  const after = personalPageContentModels(data);
  return Object.keys(before)
    .filter(
      (route) => JSON.stringify(before[route]) !== JSON.stringify(after[route])
    )
    .sort();
};

test('models cover the eight personal sitemap routes', () => {
  assert.deepEqual(Object.keys(personalPageContentModels(original)).sort(), [
    '/',
    '/articles',
    '/community',
    '/contact',
    '/genealogy',
    '/privacy',
    '/projects',
    '/resume',
  ]);
});
test('noninitial Community tabs are tracked independently of other pages', () => {
  assert.deepEqual(
    changed((data) => {
      data.community.presentations.at(-1).description += ' Revised.';
    }),
    ['/community']
  );
  assert.deepEqual(
    changed((data) => {
      data.community.mediaResources.podcasts.at(-1).links[0].url +=
        '?revision=2';
    }),
    ['/community']
  );
  assert.deepEqual(
    changed((data) => {
      data.community.featuredMedia.description += ' Revised.';
    }),
    ['/community']
  );
});
test('article data changes affect only articles', () => {
  assert.deepEqual(
    changed((data) => {
      data.thoughtLeadership[0].summary += ' Revised.';
    }),
    ['/articles']
  );
});
test('featured homepage prose is separate from project detail', () => {
  assert.deepEqual(
    changed((data) => {
      data.projects.find((project) => project.featured).homepageSummary +=
        ' Revised.';
    }),
    ['/']
  );
  assert.deepEqual(
    changed((data) => {
      data.projects.find((project) => project.featured).description +=
        ' Revised.';
    }),
    ['/projects']
  );
  assert.deepEqual(
    changed((data) => {
      data.projects.find((project) => project.featured).title += ' Revised.';
    }),
    ['/', '/projects']
  );
});
test('old resume edits do not affect recent career excerpts or current contact focus', () => {
  assert.ok(original.resume.length > 4);
  assert.deepEqual(
    changed((data) => {
      data.resume.at(-1).description += ' Revised.';
    }),
    ['/resume']
  );
  assert.deepEqual(
    changed((data) => {
      data.resume[0].highlights.push('Another achievement.');
    }),
    ['/contact', '/resume']
  );
});
test('current-role selection follows period data rather than assuming the first role', () => {
  const data = structuredClone(original);
  data.resume[0].period = '2020 - 2025';
  data.resume[1].period = '2025 - Present';
  const models = personalPageContentModels(data);
  assert.equal(models['/contact'].currentRole.title, data.resume[1].title);
  assert.equal(
    models['/'].displayTitle,
    `${data.resume[1].title} · ${data.resume[1].company}`
  );
  assert.equal(models['/privacy'].shared.person.title, data.resume[0].title);
});
test('shared semantic Person and inherited keyword changes affect all eight routes', () => {
  const routes = Object.keys(personalPageContentModels(original)).sort();
  assert.deepEqual(
    changed((data) => {
      data.professional.skills.push('New expertise');
    }),
    routes
  );
  assert.deepEqual(
    changed((data) => {
      data.contact.location += ' area';
    }),
    routes
  );
  assert.deepEqual(
    changed((data) => {
      data.bio.short += ' Revised.';
    }),
    routes
  );
});
test('unused data and hidden conditional fields do not advance page dates', () => {
  assert.deepEqual(
    changed((data) => {
      data.community.description += ' Not displayed.';
      data.community.featuredMedia.videoUrl = 'https://example.test/unused';
      data.thoughtLeadership[0].type = 'Not displayed';
      data.bio.tagline += ' Unused while a current role exists.';
      data.projects[0].internalReview = 'metadata';
    }),
    []
  );
});
test('fallback home tagline is tracked only without an active role', () => {
  const data = structuredClone(original);
  data.resume.forEach((role) => {
    role.period = role.period.replace(/present/gi, '2026');
  });
  const before = personalPageContentModels(data);
  data.bio.tagline += ' Changed.';
  const after = personalPageContentModels(data);
  assert.notDeepEqual(before['/'], after['/']);
  assert.deepEqual(before['/contact'], after['/contact']);
});
