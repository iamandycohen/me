import test from 'node:test';
import assert from 'node:assert/strict';
import { authoredLiterals } from '../page-authored-content.mjs';

test('authored client copy survives while comments/types/styles/imports do not', () => {
  const first = `import X from './old'; type State = 'private';
  const tabs = [{ title: 'A hidden record', acres: 226 }];
  export function Page(){return <main className="bg-red-500"> Read the record <X title="Citation" style={{color:'red'}} /></main>}`;
  const reformatted = `// formatting and styles\nimport X from './new'; type State = 'other';
  const tabs = [ { title: "A hidden record", acres: 226 } ];
  export function Page() { return <main className="bg-blue-500">\nRead the record\n<X title="Citation" style={{color:'blue'}}/></main> }`;
  assert.deepEqual(authoredLiterals(first), authoredLiterals(reformatted));
  assert.notDeepEqual(
    authoredLiterals(first),
    authoredLiterals(first.replace('hidden record', 'corrected record'))
  );
  assert.notDeepEqual(
    authoredLiterals(first),
    authoredLiterals(first.replace('226', '227'))
  );
});

test('selected-only template copy is tracked but template styling is not', () => {
  const before =
    'const label = `Connections from ${activeNode.label}`; const view = <p className={`bg-${color}`}>{label}</p>';
  assert.notDeepEqual(
    authoredLiterals(before),
    authoredLiterals(before.replace('Connections from', 'Records for'))
  );
  assert.deepEqual(
    authoredLiterals(before),
    authoredLiterals(before.replace('bg-${color}', 'text-${color}'))
  );
});

test('stylesheet constants do not trigger editorial dates', () => {
  const before =
    "const kindStyles = { person: 'bg-white' }; const inputClassName = 'border-black'; const label='Person';";
  assert.deepEqual(
    authoredLiterals(before),
    authoredLiterals(
      before
        .replace('bg-white', 'bg-red')
        .replace('border-black', 'border-green')
    )
  );
  assert.notDeepEqual(
    authoredLiterals(before),
    authoredLiterals(before.replace("label='Person'", "label='Family'"))
  );
});

test('personal authored traversal excludes modeled JSON and date feedback while retaining hidden copy', async () => {
  const { authoredContentForRoute } =
    await import('../page-authored-content.mjs');
  const { mkdtemp, mkdir, writeFile, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const root = await mkdtemp(join(tmpdir(), 'personal-authored-'));
  try {
    for (const path of ['src/app', 'src/lib', 'src/data', 'content'])
      await mkdir(join(root, path), { recursive: true });
    await writeFile(
      join(root, 'src/app/page.tsx'),
      `import data from '@/lib/data'; import dates from '../data/page-modifications.json'; const hidden = 'Read evidence'; export default () => <main>Welcome</main>;`
    );
    await writeFile(
      join(root, 'src/lib/data.ts'),
      `import data from '../../content/data.json'; export default data;`
    );
    await writeFile(
      join(root, 'content/data.json'),
      '{"privateToModel":"first"}'
    );
    await writeFile(
      join(root, 'src/data/page-modifications.json'),
      '{"first":"date"}'
    );
    const before = await authoredContentForRoute('/', root, 'personal');
    await writeFile(
      join(root, 'content/data.json'),
      '{"privateToModel":"second"}'
    );
    await writeFile(
      join(root, 'src/data/page-modifications.json'),
      '{"second":"date"}'
    );
    assert.deepEqual(
      await authoredContentForRoute('/', root, 'personal'),
      before
    );
    await writeFile(
      join(root, 'src/app/page.tsx'),
      `import data from '@/lib/data'; const hidden = 'Read corrected evidence'; export default () => <main>Welcome</main>;`
    );
    assert.notDeepEqual(
      await authoredContentForRoute('/', root, 'personal'),
      before
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
