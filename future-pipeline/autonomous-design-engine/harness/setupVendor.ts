import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

const HARNESS_DIR = resolve(import.meta.dirname, '..', 'harness');
const VENDOR_DIR = join(HARNESS_DIR, 'public', 'vendor');

async function fetchAndPin() {
  if (!existsSync(VENDOR_DIR)) {
    mkdirSync(VENDOR_DIR, { recursive: true });
  }

  const tailwindUrl = 'https://cdn.tailwindcss.com';
  console.log(`Fetching Tailwind from ${tailwindUrl}...`);
  
  const res = await fetch(tailwindUrl);
  if (!res.ok) throw new Error(`Failed to fetch Tailwind: ${res.statusText}`);
  
  const content = await res.text();
  writeFileSync(join(VENDOR_DIR, 'tailwindcss.js'), content, 'utf-8');
  console.log('Saved to public/vendor/tailwindcss.js');

  const indexHtmlPath = join(HARNESS_DIR, 'index.html');
  if (existsSync(indexHtmlPath)) {
    let html = readFileSync(indexHtmlPath, 'utf-8');
    html = html.replace('https://cdn.tailwindcss.com', '/vendor/tailwindcss.js');
    writeFileSync(indexHtmlPath, html, 'utf-8');
    console.log('Updated index.html to use pinned vendor script.');
  }

  console.log('Vendor setup complete. Zero-egress sandbox ready.');
}

fetchAndPin().catch(e => {
  console.error(e);
  process.exit(1);
});
