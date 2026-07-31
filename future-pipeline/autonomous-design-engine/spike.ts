/**
 * Day-0 Agent-SDK spike
 *
 * Proves the four things the whole dev access model depends on, against the
 * REAL @anthropic-ai/claude-agent-sdk adapter (src/providers/agentSdk.ts) —
 * no mocks. Per AGENTS.md / IMPLEMENTATION_PLAN.md C0.0:
 *   1. Headless OAuth credential pickup (claude login), no ANTHROPIC_API_KEY.
 *   2. A real text completion.
 *   3. A real vision completion (screenshot in, judgment out).
 *   4. Real token-usage retrieval per call.
 *
 * Run: npm run spike   (requires `claude login` already done, ADE_PROVIDER
 * unset or =agent-sdk, and ANTHROPIC_API_KEY NOT set in the environment).
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { buildConfig } from './src/config.js';
import { getProvider } from './src/model.js';

async function runSpike() {
  console.log('--- ADE Day-0 Spike (real Agent SDK) ---');

  if (process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY is set. Unset it — dev must run key-free on Agent-SDK credit.');
    process.exit(1);
  }

  const cfg = buildConfig({ provider: 'agent-sdk' });
  console.log(`[Spike] Provider: ${cfg.provider}, model: ${cfg.modelId}`);

  // 1. Headless OAuth credential pickup — proven implicitly: if `claude login`
  // was never run, the very first `provider.complete()` call below throws.
  console.log('[Spike] 🔒 Resolving agent-sdk provider (OAuth via `claude login`)...');
  const provider = await getProvider(cfg);
  console.log('[Spike] ✅ Provider resolved:', provider.id);

  console.log('-----------------------');

  // 2. Real text completion + token usage.
  console.log('[Spike] 💬 Text completion...');
  const textRes = await provider.complete({
    system: 'You are a terse assistant.',
    messages: [{ role: 'user', content: 'Write one short headline for a real-estate firm.' }],
    maxTokens: 100,
    temperature: 0.7,
  });
  console.log('[Spike] Text response:', textRes.text);
  console.log('[Spike] Text usage:', textRes.usage);
  if (!(textRes.usage.input > 0 || textRes.usage.output > 0)) {
    throw new Error('Text completion returned zero usage on both input and output — usage retrieval is broken.');
  }
  console.log('[Spike] ✅ Text completion + usage retrieval OK.');

  console.log('-----------------------');

  // 3. Real vision completion. Requires a real PNG at test_assets/spike-screenshot.png
  // (any small screenshot works — e.g. copy one from a prior harness render).
  const imagePath = resolve(import.meta.dirname, 'test_assets', 'spike-screenshot.png');
  if (!existsSync(imagePath)) {
    console.warn(
      `[Spike] ⚠ No test image at ${imagePath} — skipping vision check.\n` +
      `         Place a real PNG there (e.g. a harness screenshot) to exercise vision.`,
    );
  } else {
    console.log('[Spike] 🖼️  Vision completion on', imagePath, '...');
    const imageData = readFileSync(imagePath).toString('base64');
    const visionRes = await provider.complete({
      system: 'You are a design critic.',
      messages: [{ role: 'user', content: 'Describe what you see in one sentence.' }],
      images: [{ data: imageData, mediaType: 'image/png' }],
      maxTokens: 100,
      temperature: 0.2,
    });
    console.log('[Spike] Vision response:', visionRes.text);
    console.log('[Spike] Vision usage:', visionRes.usage);
    if (!(visionRes.usage.input > 0 || visionRes.usage.output > 0)) {
      throw new Error('Vision completion returned zero usage — usage retrieval on vision calls is broken.');
    }
    console.log('[Spike] ✅ Vision completion + usage retrieval OK.');
  }

  console.log('--- Spike Completed: all reachable checks passed against the real provider ---');
}

runSpike().catch(err => {
  console.error('[Spike] ❌ FAILED:', err instanceof Error ? err.message : err);
  console.error('This means the dev access model itself is broken — do not proceed to build further until this passes for real (IMPLEMENTATION_PLAN.md C0.0 / S3).');
  process.exit(1);
});
