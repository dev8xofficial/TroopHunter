/**
 * ADE Tests — Generator (C0.3)
 *
 * generate(): single-file output, truncation retry (F-GEN-06),
 * refusal reframe retry, empty-output rejection, markdown-fence stripping.
 */

import { describe, it, expect } from 'vitest';
import { generate, GeneratorError } from '../src/generator.js';
import type { ModelProvider, CompletionRequest, CompletionResult } from '../src/model.js';
import type { InputBundle, Brief } from '../src/schema.js';

const testBrief: Brief = {
  client: 'TestCo',
  industry: 'Technology',
  audience: 'Developers',
  goal: 'Generate leads',
  section: {
    name: 'hero',
    content: { headline: 'Build Better Software' },
  },
};

const bundle: InputBundle = { brief: testBrief };

/** A provider that returns a scripted sequence of full CompletionResults, one per call. */
function scriptedProvider(script: CompletionResult[]): ModelProvider {
  let callIndex = 0;
  return {
    id: 'mock:scripted',
    async complete(_req: CompletionRequest): Promise<CompletionResult> {
      const result = script[Math.min(callIndex, script.length - 1)];
      callIndex++;
      return result;
    },
  };
}

function budget(max = 10) {
  return { current: 0, max };
}

const validTsx = `export default function Section() { return <div>Hello</div>; }`;

describe('Generator (C0.3)', () => {
  it('returns the model output on a clean first call', async () => {
    const provider = scriptedProvider([{ text: validTsx, usage: { input: 10, output: 20 } }]);
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(result.tsx).toBe(validTsx);
    expect(result.usage).toEqual({ input: 10, output: 20 });
  });

  it('strips markdown code fences from the output', async () => {
    const fenced = '```tsx\n' + validTsx + '\n```';
    const provider = scriptedProvider([{ text: fenced, usage: { input: 10, output: 20 } }]);
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(result.tsx).toBe(validTsx);
  });

  it('retries once with a higher token budget on truncation (stopReason=max_tokens)', async () => {
    const truncated = 'export default function Section() { return <div>{unbalanced';
    let calls = 0;
    const provider: ModelProvider = {
      id: 'mock:truncation',
      async complete(_req) {
        calls++;
        if (calls === 1) {
          return { text: truncated, usage: { input: 10, output: 20 }, stopReason: 'max_tokens' };
        }
        return { text: validTsx, usage: { input: 10, output: 40 } };
      },
    };
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(calls).toBe(2);
    expect(result.tsx).toBe(validTsx);
  });

  it('retries once with a higher token budget on unbalanced braces even without stopReason=max_tokens', async () => {
    const unbalanced = 'export default function Section() { return <div>{{{unclosed';
    let calls = 0;
    const provider: ModelProvider = {
      id: 'mock:unbalanced',
      async complete(_req) {
        calls++;
        if (calls === 1) {
          return { text: unbalanced, usage: { input: 10, output: 20 } };
        }
        return { text: validTsx, usage: { input: 10, output: 40 } };
      },
    };
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(calls).toBe(2);
    expect(result.tsx).toBe(validTsx);
  });

  it('returns still-truncated output after the retry rather than throwing (render-health gate catches it downstream)', async () => {
    const unbalanced = 'export default function Section() { return <div>{{{unclosed';
    const provider = scriptedProvider([
      { text: unbalanced, usage: { input: 10, output: 20 }, stopReason: 'max_tokens' },
      { text: unbalanced, usage: { input: 10, output: 20 }, stopReason: 'max_tokens' },
    ]);
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(result.tsx).toBe(unbalanced);
  });

  it('does not retry truncation when the model-call budget is exhausted', async () => {
    const unbalanced = 'export default function Section() { return <div>{{{unclosed';
    let calls = 0;
    const provider: ModelProvider = {
      id: 'mock:budget-exhausted',
      async complete(_req) {
        calls++;
        return { text: unbalanced, usage: { input: 10, output: 20 }, stopReason: 'max_tokens' };
      },
    };
    const exhaustedBudget = { current: 10, max: 10 };
    const result = await generate(provider, bundle, undefined, 0.7, exhaustedBudget);
    expect(calls).toBe(1);
    expect(result.tsx).toBe(unbalanced);
  });

  it('reframes once on refusal and returns the reframed code', async () => {
    let calls = 0;
    const provider: ModelProvider = {
      id: 'mock:refusal',
      async complete(req) {
        calls++;
        if (calls === 1) {
          return { text: "I'm sorry, I cannot help with that request.", usage: { input: 10, output: 20 } };
        }
        expect(req.messages[0].content).toContain('legitimate business');
        return { text: validTsx, usage: { input: 10, output: 20 } };
      },
    };
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(calls).toBe(2);
    expect(result.tsx).toBe(validTsx);
  });

  it('throws GeneratorError(cause=refusal) if the reframe also refuses', async () => {
    const provider = scriptedProvider([
      { text: "I'm sorry, I cannot help with that.", usage: { input: 10, output: 20 } },
      { text: "I apologize, I cannot generate this.", usage: { input: 10, output: 20 } },
    ]);
    await expect(generate(provider, bundle, undefined, 0.7, budget())).rejects.toThrow(GeneratorError);
    await expect(generate(provider, bundle, undefined, 0.7, budget())).rejects.toMatchObject({ cause: 'refusal' });
  });

  it('does not treat refusal-like phrases as a refusal when real code is present', async () => {
    // "I can't" appears in a comment but real JSX/export follows — must not be misclassified.
    const codeWithPhrase = `// I can't believe how simple this is\nexport default function Section() { return <div>Hi</div>; }`;
    const provider = scriptedProvider([{ text: codeWithPhrase, usage: { input: 10, output: 20 } }]);
    const result = await generate(provider, bundle, undefined, 0.7, budget());
    expect(result.tsx).toBe(codeWithPhrase);
  });

  it('throws GeneratorError on empty output', async () => {
    const provider = scriptedProvider([{ text: '   ', usage: { input: 10, output: 0 } }]);
    await expect(generate(provider, bundle, undefined, 0.7, budget())).rejects.toThrow(GeneratorError);
    await expect(generate(provider, bundle, undefined, 0.7, budget())).rejects.toThrow('empty output');
  });

  it('passes the exploration instruction into the prompt when exploration=true (M8)', async () => {
    let capturedContent = '';
    const provider: ModelProvider = {
      id: 'mock:exploration',
      async complete(req) {
        capturedContent = req.messages[0].content;
        return { text: validTsx, usage: { input: 10, output: 20 } };
      },
    };
    await generate(provider, bundle, undefined, 0.7, budget(), true);
    expect(capturedContent).toContain('M8 Exploration');
    expect(capturedContent).toContain('defensible');
  });

  it('does not add the exploration instruction when exploration=false (default)', async () => {
    let capturedContent = '';
    const provider: ModelProvider = {
      id: 'mock:no-exploration',
      async complete(req) {
        capturedContent = req.messages[0].content;
        return { text: validTsx, usage: { input: 10, output: 20 } };
      },
    };
    await generate(provider, bundle, undefined, 0.7, budget());
    expect(capturedContent).not.toContain('M8 Exploration');
  });

  it('increments the shared model-call budget counter on each call', async () => {
    const provider = scriptedProvider([{ text: validTsx, usage: { input: 10, output: 20 } }]);
    const calls = budget();
    await generate(provider, bundle, undefined, 0.7, calls);
    expect(calls.current).toBe(1);
  });
});
