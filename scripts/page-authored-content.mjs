import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import ts from 'typescript';

const invisible = new Set([
  'className',
  'classNames',
  'classes',
  'style',
  'styles',
  'key',
]);
const stylingName = /(?:styles?|classes|classNames?)$/i;
const whitespace = (value) => value.replace(/\s+/g, ' ').trim();

// Capture authored labels/copy even in client states absent from the initial
// HTML. Imports, types, comments and styling are not published page content.
export function authoredLiterals(source, filename = 'component.tsx') {
  const file = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const values = [];
  function visit(node) {
    if (
      ts.isImportDeclaration(node) ||
      ts.isExportDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isTypeNode(node)
    )
      return;
    if (
      ts.isVariableDeclaration(node) &&
      stylingName.test(node.name.getText(file))
    )
      return;
    if (ts.isJsxAttribute(node) && invisible.has(node.name.getText(file)))
      return;
    if (
      ts.isPropertyAssignment(node) &&
      invisible.has(node.name.getText(file).replace(/['"]/g, ''))
    )
      return;
    if (
      ts.isStringLiteralLike(node) ||
      ts.isJsxText(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      if (
        ts.isExpressionStatement(node.parent) ||
        (ts.isPropertyAssignment(node.parent) && node.parent.name === node) ||
        ts.isElementAccessExpression(node.parent)
      )
        return;
      const value = whitespace(node.text);
      if (value) values.push(value);
      return;
    }
    if (
      ts.isNumericLiteral(node) &&
      (ts.isPropertyAssignment(node.parent) ||
        ts.isArrayLiteralExpression(node.parent))
    ) {
      values.push(Number(node.text));
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return values;
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) =>
        entry.isDirectory()
          ? filesIn(resolve(directory, entry.name))
          : [resolve(directory, entry.name)]
      )
    )
  ).flat();
}
async function existingModule(path) {
  for (const candidate of [
    path,
    `${path}.tsx`,
    `${path}.ts`,
    `${path}/index.tsx`,
    `${path}/index.ts`,
  ]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
    }
  }
  throw Error(`Cannot resolve authored content dependency ${path}`);
}
export async function authoredContentForRoute(route, root) {
  const sourceRoot = resolve(root, 'apps/where-the-record-ends/src');
  const app = resolve(sourceRoot, 'app');
  const paths = await filesIn(app);
  const segments = route.split('/').filter(Boolean);
  const matches = paths
    .filter((path) => /\/page\.tsx$/.test(path))
    .filter((path) => {
      const pattern = relative(app, dirname(path))
        .split('/')
        .filter((part) => part && !part.startsWith('('));
      return (
        pattern.length === segments.length &&
        pattern.every(
          (part, i) => /^\[[^\]]+\]$/.test(part) || part === segments[i]
        )
      );
    });
  if (matches.length !== 1)
    throw Error(
      `Expected one authored page for ${route}, found ${matches.length}`
    );
  const visited = new Set();
  const modules = [];
  async function walk(path) {
    if (visited.has(path)) return;
    visited.add(path);
    if (!path.startsWith(`${sourceRoot}/`))
      throw Error('Authored dependency escaped app source');
    if (!/\.(?:tsx?|jsx?|json)$/.test(path))
      throw Error(
        `Unsupported authored dependency; add explicit content tracking: ${path}`
      );
    const source = await readFile(path, 'utf8');
    if (path.endsWith('.json')) {
      modules.push(JSON.parse(source));
      return;
    }
    modules.push(authoredLiterals(source, path));
    const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
    for (const statement of ast.statements) {
      if (
        (!ts.isImportDeclaration(statement) &&
          !ts.isExportDeclaration(statement)) ||
        !statement.moduleSpecifier ||
        !ts.isStringLiteral(statement.moduleSpecifier) ||
        statement.isTypeOnly ||
        statement.importClause?.isTypeOnly
      )
        continue;
      const name = statement.moduleSpecifier.text;
      if (!name.startsWith('@/') && !name.startsWith('.')) continue;
      if (/\.(css|scss)$/.test(name)) continue;
      const target = name.startsWith('@/')
        ? resolve(sourceRoot, name.slice(2))
        : resolve(dirname(path), name);
      await walk(await existingModule(target));
    }
  }
  await walk(matches[0]);
  // File locations/import order are not published content. Keep order within
  // each authored dataset so changing an interactive list's order is detected.
  return modules
    .filter((values) => Object.keys(values).length)
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}
