import { spawn, execFileSync } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const siteIndex = args.indexOf('--site');
const site = siteIndex === -1 ? 'genealogy' : args[siteIndex + 1];
if (!['personal', 'genealogy'].includes(site))
  throw Error('Expected --site personal or genealogy');
const appDirectory =
  site === 'personal' ? root : resolve(root, 'apps/where-the-record-ends');
const statePath =
  site === 'personal'
    ? 'src/data/page-content-state.json'
    : 'apps/where-the-record-ends/src/data/page-content-state.json';
const appRequire = createRequire(resolve(appDirectory, 'package.json'));
const skip = args.indexOf('--skip-build');
if (skip !== -1) args.splice(skip, 1);
// A stable public rendering, independent of preview hosts, optional challenge
// configuration, or a developer's analytics consent state.
const env = {
  ...process.env,
  SITE_IS_PUBLIC: 'true',
  NEXT_PUBLIC_SITE_URL:
    site === 'personal'
      ? 'https://www.iamandycohen.com'
      : 'https://www.wheretherecordends.com',
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: '',
  NEXT_TELEMETRY_DISABLED: '1',
};
let server;
let temporary;
function run(command, argv) {
  return new Promise((accept, reject) => {
    const child = spawn(command, argv, { cwd: root, env, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? accept() : reject(Error(`${command} exited with ${code}`))
    );
  });
}
async function availablePort() {
  const listener = createServer();
  listener.listen(0, '127.0.0.1');
  await once(listener, 'listening');
  const port = listener.address().port;
  await new Promise((done) => listener.close(done));
  return port;
}
async function stop() {
  if (server && server.exitCode === null) {
    const done = once(server, 'exit');
    server.kill('SIGTERM');
    const timeout = setTimeout(() => server.kill('SIGKILL'), 5000);
    await done;
    clearTimeout(timeout);
  }
  if (temporary) await rm(temporary, { recursive: true, force: true });
}
try {
  const baseIndex = args.indexOf('--base-ref');
  if (baseIndex !== -1) {
    const ref = args[baseIndex + 1];
    if (!/^[a-f0-9]{40}$/.test(ref ?? ''))
      throw Error('Expected a full --base-ref commit');
    args.splice(baseIndex, 2);
    if (ref !== '0'.repeat(40)) {
      execFileSync('git', ['cat-file', '-e', `${ref}^{commit}`], { cwd: root });
      const path = statePath;
      let bytes;
      try {
        bytes = execFileSync('git', ['show', `${ref}:${path}`], {
          cwd: root,
          stdio: ['ignore', 'pipe', 'ignore'],
        });
      } catch (error) {
        if (error.status !== 128) throw error;
      }
      if (bytes) {
        temporary = await mkdtemp(join(tmpdir(), 'page-tracking-'));
        const file = join(temporary, 'base.json');
        await writeFile(file, bytes);
        args.push('--base', file);
      } else
        console.log(
          'Base revision predates page fingerprints; checking initial tracked coverage.'
        );
    }
  }
  if (skip === -1) await run('npm', ['run', `build:${site}`]);
  const port = await availablePort();
  const origin = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    [
      appRequire.resolve('next/dist/bin/next'),
      'start',
      appDirectory,
      '--hostname',
      '127.0.0.1',
      '--port',
      String(port),
    ],
    { cwd: root, env, stdio: ['ignore', 'ignore', 'inherit'] }
  );
  let startupError;
  server.on('error', (error) => {
    startupError = error;
  });
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    if (startupError) throw startupError;
    if (server.exitCode !== null)
      throw Error('Production server exited before tracking');
    try {
      const response = await fetch(`${origin}/contact`, {
        signal: AbortSignal.timeout(1000),
      });
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* wait for startup */
    }
    await new Promise((done) => setTimeout(done, 250));
  }
  if (!ready) throw Error('Production server was not ready for page tracking');
  await run(process.execPath, [
    resolve(root, 'scripts/page-content-tracking.mjs'),
    ...args,
    '--origin',
    origin,
  ]);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await stop();
}
