/**
 * Agent SDK spike for ADE.
 *
 * Proves the dev access path can run text, vision, and token-usage collection
 * through the same ModelProvider adapter used by the design loop.
 */

import { buildConfig } from './src/config.js';
import { createAgentSdkProvider } from './src/providers/agentSdk.js';

const onePixelPng =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=';

async function main(): Promise<void> {
  const cfg = buildConfig({ provider: 'agent-sdk' });
  const provider = createAgentSdkProvider(cfg);

  if (process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY is set in the parent shell; the Agent SDK adapter strips it before spawning.');
  }

  console.log(`Agent SDK spike using ${provider.id}`);

  const text = await provider.complete({
    system: 'Return terse answers. Do not use tools.',
    messages: [{ role: 'user', content: 'Reply with exactly: ADE_TEXT_OK' }],
    maxTokens: 200,
    temperature: 0,
  });
  assertIncludes(text.text, 'ADE_TEXT_OK', 'text completion');
  console.log(`text ok, usage=${text.usage.input}/${text.usage.output}`);

  const vision = await provider.complete({
    system: 'Return terse answers. Do not use tools.',
    messages: [{ role: 'user', content: 'This image is a 1x1 PNG. Reply with exactly: ADE_VISION_OK' }],
    images: [{ data: onePixelPng, mediaType: 'image/png' }],
    maxTokens: 200,
    temperature: 0,
  });
  assertIncludes(vision.text, 'ADE_VISION_OK', 'vision completion');
  console.log(`vision ok, usage=${vision.usage.input}/${vision.usage.output}`);

  if (text.usage.input + text.usage.output <= 0 || vision.usage.input + vision.usage.output <= 0) {
    throw new Error('Agent SDK did not report token usage.');
  }

  console.log('Agent SDK spike passed.');
}

function assertIncludes(text: string, expected: string, label: string): void {
  if (!text.includes(expected)) {
    throw new Error(`${label} did not return ${expected}. Received: ${text.slice(0, 200)}`);
  }
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
