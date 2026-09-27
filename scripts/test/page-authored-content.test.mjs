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
