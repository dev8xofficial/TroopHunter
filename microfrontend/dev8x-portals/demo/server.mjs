import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const demoDir = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function resolveRequestPath(requestUrl = '/') {
  const url = new URL(requestUrl, 'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, '');
  return path.join(demoDir, normalized);
}

async function sendFile(targetPath, response) {
  try {
    await access(targetPath);
    const fileStats = await stat(targetPath);
    const resolvedPath = fileStats.isDirectory() ? path.join(targetPath, 'index.html') : targetPath;
    const ext = path.extname(resolvedPath).toLowerCase();

    response.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });

    createReadStream(resolvedPath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('File not found');
  }
}

const server = http.createServer(async (request, response) => {
  await sendFile(resolveRequestPath(request.url), response);
});

server.listen(port, () => {
  console.log(`Dev8X portal demo running at http://127.0.0.1:${port}`);
  console.log('Open /auth/main.html#portal-select for the canonical entry surface.');
});
