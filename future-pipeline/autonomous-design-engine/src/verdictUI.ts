import * as http from 'http';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { exec } from 'child_process';
import type { VerdictEntry } from './schema.js';
import { appendVerdict } from './verdicts.js';

function getFirstPng(dir: string): Buffer | null {
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((f) => f.endsWith('.png') || f.endsWith('.jpg'));
  if (files.length === 0) return null;
  return readFileSync(join(dir, files[0]));
}

function extractRationale(runDir: string): string {
  const tracePath = join(runDir, 'trace.jsonl');
  if (!existsSync(tracePath)) return 'No trace available.';
  try {
    const lines = readFileSync(tracePath, 'utf-8')
      .split('\n')
      .filter((l) => l.trim());
    for (let i = lines.length - 1; i >= 0; i--) {
      const entry = JSON.parse(lines[i]);
      if (entry.event === 'generation_complete' && entry.candidate && entry.candidate.rationale) {
        return entry.candidate.rationale.join('\n');
      }
    }
  } catch (err) {}
  return 'Rationale not found in trace.';
}

export function captureVerdictInteractive(runId: string, section: string, iter0ShotsDir: string, finalShotsDir: string, outPath: string): Promise<VerdictEntry> {
  return new Promise((resolve, reject) => {
    const iter0Img = getFirstPng(iter0ShotsDir);
    const finalImg = getFirstPng(finalShotsDir);
    const rationale = extractRationale(dirname(iter0ShotsDir));

    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getHtml(runId, section, rationale));
        return;
      }

      if (req.method === 'GET' && req.url === '/iter0.png') {
        if (iter0Img) {
          res.writeHead(200, { 'Content-Type': 'image/png' });
          res.end(iter0Img);
        } else {
          res.writeHead(404);
          res.end();
        }
        return;
      }

      if (req.method === 'GET' && req.url === '/final.png') {
        if (finalImg) {
          res.writeHead(200, { 'Content-Type': 'image/png' });
          res.end(finalImg);
        } else {
          res.writeHead(404);
          res.end();
        }
        return;
      }

      if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const entry: VerdictEntry = {
              run_id: runId,
              section,
              preferred: data.preferred,
              rating: data.rating,
              human_verdict: data.decision,
              notes: data.notes,
              timestamp: new Date().toISOString(),
              source: 'blind-pair',
              rejected_with_interest: data.rejected_with_interest,
              r16_lite_outcome: data.r16_lite_outcome,
              ab_test_variant: data.ab_test_variant,
              dimensions: data.dimensions,
              annotations: data.annotations,
              rationale: data.rationale,
            };

            const saved = appendVerdict(outPath, entry);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));

            console.log(`\n✅ Verdict captured interactively for ${runId} / ${section}`);
            server.close();
            resolve(saved);
          } catch (err) {
            console.error('Failed to save verdict:', err);
            res.writeHead(400);
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
        });
        return;
      }

      res.writeHead(404);
      res.end();
    });

    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'string' ? 0 : address?.port;
      const url = `http://localhost:${port}/`;
      console.log(`\n👀 Opening Interactive Verdict UI at ${url}`);

      const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
      exec(`${startCmd} ${url}`);
    });
  });
}

function getHtml(runId: string, section: string, rationale: string) {
  // We escape backticks and dollar signs to prevent template string issues when this function generates HTML string.
  const safeRationale = rationale.replace(/`/g, '\\`').replace(/\\$/g, '\\$');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ADE Verdict UI (C2.8)</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 15px; margin-bottom: 20px; }
  .main-grid { display: grid; grid-template-columns: 280px 1fr 1fr; gap: 20px; }
  .panel { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; }
  .image-container { position: relative; border: 2px solid #334155; border-radius: 4px; overflow: hidden; background: #fff; cursor: crosshair; }
  .image-container img { width: 100%; display: block; }
  .annotation { position: absolute; background: rgba(239, 68, 68, 0.9); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; transform: translate(-50%, -100%); pointer-events: none; margin-top: -5px; white-space: nowrap; }
  .annotation::after { content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); border-width: 4px 4px 0; border-style: solid; border-color: rgba(239, 68, 68, 0.9) transparent transparent transparent; }
  .form-group { margin-bottom: 15px; }
  label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 5px; color: #cbd5e1; }
  select, input, textarea { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #475569; background: #0f172a; color: white; box-sizing: border-box; }
  button { padding: 10px 15px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; width: 100%; margin-top: 10px; }
  button:hover { background: #2563eb; }
  .btn-reject { background: #ef4444; }
  .btn-reject:hover { background: #dc2626; }
  .slider-row { display: flex; align-items: center; gap: 10px; }
  .slider-row input[type=range] { flex: 1; }
  h2, h3 { margin-top: 0; color: #f1f5f9; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <h2>Blind Verdict Comparison (Phase 3 Prep)</h2>
      <div style="color: #94a3b8; font-size: 14px;">Run: ${runId} | Section: ${section}</div>
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="btn-reject" onclick="submitVerdict('reject', 'iter0')">Reject Both</button>
      <button onclick="submitVerdict('approve', 'A')">Approve A</button>
      <button onclick="submitVerdict('approve', 'B')">Approve B</button>
    </div>
  </div>

  <div class="main-grid">
    <div class="panel">
      <h3>Evaluation</h3>
      
      <div class="form-group">
        <label>Rating</label>
        <select id="rating">
          <option value="bad">Bad</option>
          <option value="weak">Weak</option>
          <option value="good" selected>Good</option>
          <option value="strong">Strong</option>
        </select>
      </div>

      <div class="form-group">
        <label>A/B Test Variant (C2.8)</label>
        <select id="ab_test_variant">
          <option value="text_only">Text Critique Only</option>
          <option value="visual_annotated">Visual Annotated Critique</option>
        </select>
      </div>
      
      <hr style="border-color: #334155; margin: 20px 0;">
      <h4>Constitution Dimensions</h4>
      
      <div class="form-group">
        <label>Brand Fit (1-5)</label>
        <div class="slider-row">
          <input type="range" id="dim_brand" min="1" max="5" value="3">
          <span id="val_brand">3</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>Aesthetics (1-5)</label>
        <div class="slider-row">
          <input type="range" id="dim_aesthetics" min="1" max="5" value="3">
          <span id="val_aesthetics">3</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>UX / IA (1-5)</label>
        <div class="slider-row">
          <input type="range" id="dim_ux" min="1" max="5" value="3">
          <span id="val_ux">3</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>Accessibility (1-5)</label>
        <div class="slider-row">
          <input type="range" id="dim_a11y" min="1" max="5" value="3">
          <span id="val_a11y">3</span>
        </div>
      </div>

      <hr style="border-color: #334155; margin: 20px 0;">
      
      <div class="form-group">
        <label style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="rejected_with_interest" style="width:auto;"> 
          Rejected with Interest (M8)
        </label>
      </div>
      
      <div class="form-group">
        <label>R16-lite Outcome</label>
        <select id="r16_outcome">
          <option value="">(None yet)</option>
          <option value="shipped">Shipped</option>
          <option value="reworked">Reworked</option>
          <option value="abandoned">Abandoned</option>
        </select>
      </div>

      <div class="form-group">
        <label>Notes</label>
        <textarea id="notes" rows="3" placeholder="General notes..."></textarea>
      </div>

      <div class="form-group">
        <label>Generator Rationale</label>
        <div style="font-size: 12px; color: #cbd5e1; background: #0f172a; padding: 8px; border-radius: 4px; max-height: 200px; overflow-y: auto; white-space: pre-wrap;">${safeRationale.replace(/</g, '&lt;')}</div>
      </div>
    </div>
    
    <div class="panel">
      <h3>Design A <span id="labelA" style="font-size: 12px; color: #94a3b8;"></span></h3>
      <div class="image-container" id="containerA">
        <img src="" id="imgA">
      </div>
    </div>
    
    <div class="panel">
      <h3>Design B <span id="labelB" style="font-size: 12px; color: #94a3b8;"></span></h3>
      <div class="image-container" id="containerB">
        <img src="" id="imgB">
      </div>
    </div>
  </div>

<script>
  // Randomize A/B
  const showFinalFirst = Math.random() > 0.5;
  const targetA = showFinalFirst ? 'final' : 'iter0';
  const targetB = showFinalFirst ? 'iter0' : 'final';
  
  document.getElementById('imgA').src = '/' + targetA + '.png';
  document.getElementById('imgB').src = '/' + targetB + '.png';

  const annotations = [];

  function setupCanvas(containerId, targetName) {
    const container = document.getElementById(containerId);
    container.addEventListener('click', (e) => {
      if (e.target !== container.querySelector('img')) return;
      
      const text = prompt("Enter annotation note for this point:");
      if (!text) return;

      const rect = container.getBoundingClientRect();
      // Store relative coordinates
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      
      annotations.push({
        x: parseFloat(relX.toFixed(4)),
        y: parseFloat(relY.toFixed(4)),
        text,
        target: targetName
      });

      const mark = document.createElement('div');
      mark.className = 'annotation';
      mark.style.left = (relX * 100) + '%';
      mark.style.top = (relY * 100) + '%';
      mark.innerText = text;
      container.appendChild(mark);
    });
  }

  setupCanvas('containerA', targetA);
  setupCanvas('containerB', targetB);

  // Sync sliders
  ['brand', 'aesthetics', 'ux', 'a11y'].forEach(dim => {
    const input = document.getElementById('dim_' + dim);
    const val = document.getElementById('val_' + dim);
    input.addEventListener('input', () => val.innerText = input.value);
  });

  async function submitVerdict(decision, preferredStr) {
    let preferred = targetA;
    if (preferredStr === 'B') preferred = targetB;
    else if (preferredStr === 'iter0') preferred = 'iter0';

    const payload = {
      decision,
      preferred,
      rating: document.getElementById('rating').value,
      notes: document.getElementById('notes').value,
      ab_test_variant: document.getElementById('ab_test_variant').value,
      rejected_with_interest: document.getElementById('rejected_with_interest').checked,
      r16_lite_outcome: document.getElementById('r16_outcome').value || undefined,
      dimensions: {
        brand_fit: parseInt(document.getElementById('dim_brand').value),
        aesthetic: parseInt(document.getElementById('dim_aesthetics').value),
        ux: parseInt(document.getElementById('dim_ux').value),
        accessibility: parseInt(document.getElementById('dim_a11y').value)
      },
      annotations,
      rationale: \`${safeRationale}\`
    };

    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        document.body.innerHTML = '<div style="padding: 50px; text-align: center;"><h2>Verdict Saved!</h2><p>You can close this tab.</p></div>';
      } else {
        alert("Failed to save verdict.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }
</script>
</body>
</html>`;
}
