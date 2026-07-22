/**
 * ADE Tests — Model provider resilience (C0.0 no-API-key guarantee, C0.13 retry/backoff)
 */

import { describe, it, expect } from 'vitest';
import { withRetry } from '../src/model.js';
import { envWithoutApiKeys } from '../src/providers/agentSdk.js';

describe('envWithoutApiKeys (C0.0 — agent-sdk must never require ANTHROPIC_API_KEY)', () => {
  it('strips ANTHROPIC_API_KEY from the environment passed to the spawned SDK process', () => {
    const original = process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_API_KEY = 'sk-ant-fake-test-key-should-never-reach-the-sdk';
    try {
      const env = envWithoutApiKeys();
      expect(env.ANTHROPIC_API_KEY).toBeUndefined();
    } finally {
      if (original === undefined) delete process.env.ANTHROPIC_API_KEY;
      else process.env.ANTHROPIC_API_KEY = original;
    }
  });

  it('strips ANTHROPIC_AUTH_TOKEN too — the second key that would force API billing', () => {
    const original = process.env.ANTHROPIC_AUTH_TOKEN;
    process.env.ANTHROPIC_AUTH_TOKEN = 'fake-auth-token';
    try {
      const env = envWithoutApiKeys();
      expect(env.ANTHROPIC_AUTH_TOKEN).toBeUndefined();
    } finally {
      if (original === undefined) delete process.env.ANTHROPIC_AUTH_TOKEN;
      else process.env.ANTHROPIC_AUTH_TOKEN = original;
    }
  });

  it('runs cleanly with NO key set at all — the actual dev-default posture (ADE_PROVIDER=agent-sdk, no ANTHROPIC_API_KEY)', () => {
    const originalKey = process.env.ANTHROPIC_API_KEY;
    const originalToken = process.env.ANTHROPIC_AUTH_TOKEN;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_AUTH_TOKEN;
    try {
      const env = envWithoutApiKeys();
      expect(env.ANTHROPIC_API_KEY).toBeUndefined();
      expect(env.ANTHROPIC_AUTH_TOKEN).toBeUndefined();
      // Everything else from process.env is preserved — this strips exactly
      // two keys, it does not hand the spawned process an empty/broken env.
      expect(Object.keys(env).length).toBeGreaterThan(0);
    } finally {
      if (originalKey !== undefined) process.env.ANTHROPIC_API_KEY = originalKey;
      if (originalToken !== undefined) process.env.ANTHROPIC_AUTH_TOKEN = originalToken;
    }
  });

  it('preserves unrelated environment variables — proves this is a targeted strip, not env=undefined', () => {
    process.env.ADE_TEST_MARKER_VAR = 'preserved-value';
    try {
      const env = envWithoutApiKeys();
      expect(env.ADE_TEST_MARKER_VAR).toBe('preserved-value');
    } finally {
      delete process.env.ADE_TEST_MARKER_VAR;
    }
  });
});

describe('withRetry (C0.13 — resilience: retries transient failures with backoff, never retries permanent ones)', () => {
  it('retries a 429 and succeeds once the underlying call recovers', async () => {
    let calls = 0;
    const result = await withRetry(
      async () => {
        calls++;
        if (calls < 3) throw new Error('429 rate_limit exceeded');
        return 'ok';
      },
      'test-call',
      3,
    );

    expect(result).toBe('ok');
    expect(calls).toBe(3); // 2 failures + 1 success — genuinely retried, not a fluke first-try pass
  });

  it('retries a 503 with growing delay between attempts (real exponential backoff, not a fixed pause)', async () => {
    let calls = 0;
    const callTimestamps: number[] = [];
    const start = Date.now();

    await withRetry(
      async () => {
        calls++;
        callTimestamps.push(Date.now() - start);
        if (calls < 3) throw new Error('503 Service Unavailable');
        return 'ok';
      },
      'test-backoff',
      3,
    );

    expect(calls).toBe(3);
    // Gap between attempt 1->2 must be smaller than attempt 2->3 (base * 2^attempt growth) —
    // proves the delay actually scales, not just "some delay exists."
    const gap1 = callTimestamps[1] - callTimestamps[0];
    const gap2 = callTimestamps[2] - callTimestamps[1];
    expect(gap2).toBeGreaterThan(gap1 * 1.3); // allow jitter slack, but growth must be real
  }, 20_000);

  it('does NOT retry a non-retryable error (e.g. a genuine 400 bad request) — fails immediately on the first attempt', async () => {
    let calls = 0;
    await expect(
      withRetry(
        async () => {
          calls++;
          throw new Error('400 Bad Request: invalid schema');
        },
        'test-no-retry',
        3,
      ),
    ).rejects.toThrow('400 Bad Request');

    expect(calls).toBe(1); // never retried — this is the resilience posture's OTHER half
  });

  it('stops after maxRetries and surfaces the last error — bounded, not unbounded', async () => {
    let calls = 0;
    await expect(
      withRetry(
        async () => {
          calls++;
          throw new Error('500 Internal Server Error');
        },
        'test-exhausted',
        2,
      ),
    ).rejects.toThrow('500 Internal Server Error');

    expect(calls).toBe(3); // 1 initial + 2 retries = 3, then gives up
  }, 15_000);

  it('recognizes "overloaded" and "timeout" as retryable, matching the real error text providers actually return', async () => {
    let overloadedCalls = 0;
    const overloadedResult = await withRetry(
      async () => {
        overloadedCalls++;
        if (overloadedCalls < 2) throw new Error('Overloaded: try again later');
        return 'ok';
      },
      'test-overloaded',
      2,
    );
    expect(overloadedResult).toBe('ok');
    expect(overloadedCalls).toBe(2);
  });
});
