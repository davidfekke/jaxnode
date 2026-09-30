import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3199;
const BASE = `http://localhost:${PORT}`;

let server;
let serverOutput = '';

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200 || res.status === 404) {
        return true;
      }
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

before(async () => {
  const nextBin = path.join(__dirname, '..', 'node_modules', '.bin', 'next');
  server = spawn(nextBin, ['start', '-p', String(PORT)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env }
  });
  server.stdout.on('data', (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on('data', (chunk) => {
    serverOutput += chunk.toString();
  });

  const ready = await waitForServer(`${BASE}/`);
  if (!ready) {
    server.kill();
    throw new Error(`Server did not start. Output:\n${serverOutput}`);
  }
});

after(() => {
  if (server) {
    server.kill();
  }
});

async function expectHtml(url, status = 200) {
  const res = await fetch(`${BASE}${url}`);
  assert.equal(res.status, status, `${url} should return ${status}`);
  assert.match(res.headers.get('content-type'), /text\/html/, `${url} should be html`);
}

async function expectJson(url, status = 200) {
  const res = await fetch(`${BASE}${url}`);
  assert.equal(res.status, status, `${url} should return ${status}`);
  assert.match(res.headers.get('content-type'), /application\/json/, `${url} should be json`);
}

const PAGES = [
  ['GET /', '/'],
  ['GET /apps', '/apps'],
  ['GET /apps/JaxNodeNext', '/apps/JaxNodeNext'],
  ['GET /code', '/code'],
  ['GET /code/0', '/code/0'],
  ['GET /contact', '/contact'],
  ['GET /terms', '/terms'],
  ['GET /privacy', '/privacy'],
  ['GET /sponsors', '/sponsors'],
  ['GET /video', '/video']
];

for (const [name, url] of PAGES) {
  test(name, async () => {
    await expectHtml(url);
  });
}

test('GET /api returns JSON', async () => {
  await expectJson('/api');
});

test('GET /v1/api/meeting returns JSON', async () => {
  await expectJson('/v1/api/meeting');
});

test('GET /v1/api/github returns JSON', async () => {
  await expectJson('/v1/api/github');
});

test('GET /v1/api/sponsors returns JSON', async () => {
  await expectJson('/v1/api/sponsors');
});

test('GET /apps/NonExistent returns 404', async () => {
  await expectHtml('/apps/NonExistent', 404);
});

test('GET /code with out-of-range page returns 404', async () => {
  const githubRes = await fetch(`${BASE}/v1/api/github`);
  const repos = await githubRes.json();
  if (Array.isArray(repos)) {
    const pageCount = Math.ceil(repos.length / 10);
    await expectHtml(`/code/${pageCount}`, 404);
  } else {
    await expectHtml('/code/0', 200);
  }
});

test('GET /unknown-page returns 404', async () => {
  await expectHtml('/unknown-page', 404);
});

test('GET /css/jaxnode.css returns 200', async () => {
  const res = await fetch(`${BASE}/css/jaxnode.css`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/css/);
});