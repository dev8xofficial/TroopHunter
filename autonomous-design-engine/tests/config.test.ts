/**
 * ADE Tests — Config validation
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Re-define the schema here to test independently of process.env side effects
const ProviderSchema = z.enum(['agent-sdk', 'api', 'local']).default('api');

const ConfigSchema = z.object({
  provider: ProviderSchema,
  modelId: z.string().default('claude-sonnet-4-20250514'),
  breakpoints: z.array(z.number().int().positive()).default([1440, 768, 375]),
  maxIters: z.number().int().positive().default(4),
  variations: z.number().int().positive().default(1),
  threshold: z.number().min(0).max(100).default(80),
  renderRepairTries: z.number().int().positive().default(2),
  genTemperature: z.number().min(0).max(2).default(0.7),
  criticTemperature: z.number().min(0).max(2).default(0.2),
  maxRunTokens: z.number().int().positive().default(500_000),
  maxRunSeconds: z.number().positive().default(600),
  maxModelCalls: z.number().int().positive().default(30),
  ollamaBaseUrl: z.string().url().default('http://localhost:11434'),
  ollamaModel: z.string().default('llava'),
  anthropicApiKey: z.string().optional(),
  headed: z.boolean().default(false),
  harnessPort: z.number().int().positive().default(5199),
});

describe('Config', () => {
  it('applies defaults correctly', () => {
    const result = ConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.provider).toBe('api');
      expect(result.data.modelId).toBe('claude-sonnet-4-20250514');
      expect(result.data.breakpoints).toEqual([1440, 768, 375]);
      expect(result.data.maxIters).toBe(4);
      expect(result.data.threshold).toBe(80);
      expect(result.data.genTemperature).toBe(0.7);
      expect(result.data.criticTemperature).toBe(0.2);
    }
  });

  it('accepts valid overrides', () => {
    const result = ConfigSchema.safeParse({
      provider: 'local',
      maxIters: 8,
      threshold: 90,
      genTemperature: 1.0,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.provider).toBe('local');
      expect(result.data.maxIters).toBe(8);
      expect(result.data.threshold).toBe(90);
    }
  });

  it('rejects invalid provider', () => {
    const result = ConfigSchema.safeParse({ provider: 'openai' });
    expect(result.success).toBe(false);
  });

  it('rejects threshold > 100', () => {
    const result = ConfigSchema.safeParse({ threshold: 150 });
    expect(result.success).toBe(false);
  });

  it('rejects negative maxIters', () => {
    const result = ConfigSchema.safeParse({ maxIters: -1 });
    expect(result.success).toBe(false);
  });

  it('rejects invalid temperature', () => {
    const result = ConfigSchema.safeParse({ genTemperature: 3.0 });
    expect(result.success).toBe(false);
  });
});
