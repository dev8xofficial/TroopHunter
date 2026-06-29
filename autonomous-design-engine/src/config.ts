/**
 * ADE — Configuration
 *
 * Zod-validated env + CLI flags → typed Config.
 * Invalid config → exit 1 with precise message.
 *
 * @module config
 */

import { z } from 'zod';
import { config as loadDotenv } from 'dotenv';
import { resolve } from 'path';

// Load .env from project root
loadDotenv({ path: resolve(import.meta.dirname, '..', '.env') });

// ─── Schema ────────────────────────────────────────────────────────

const ProviderSchema = z.enum(['agent-sdk', 'api', 'local']).default('api');

const ConfigSchema = z.object({
  // Provider
  provider: ProviderSchema,
  modelId: z.string().default('claude-sonnet-4-20250514'),

  // Render breakpoints
  breakpoints: z.array(z.number().int().positive()).default([1440, 768, 375]),

  // Loop parameters
  maxIters: z.number().int().positive().default(4),
  variations: z.number().int().positive().default(1),
  threshold: z.number().min(0).max(100).default(80),
  renderRepairTries: z.number().int().positive().default(2),

  // Temperatures (Generator diverges, Critic stays stable — F-JDG-06)
  genTemperature: z.number().min(0).max(2).default(0.7),
  criticTemperature: z.number().min(0).max(2).default(0.2),

  // Hard budget caps (F-MOD-04 — High severity)
  maxRunTokens: z.number().int().positive().default(500_000),
  maxRunSeconds: z.number().positive().default(600),
  maxModelCalls: z.number().int().positive().default(30),

  // Ollama (local provider)
  ollamaBaseUrl: z.string().url().default('http://localhost:11434'),
  ollamaModel: z.string().default('llava'),

  // Anthropic API key (only for provider=api)
  anthropicApiKey: z.string().optional(),

  // Display
  headed: z.boolean().default(false),

  // Harness
  harnessPort: z.number().int().positive().default(5199),
});

export type Config = z.infer<typeof ConfigSchema>;

// ─── Build config from env + CLI overrides ─────────────────────────

export interface CLIOverrides {
  provider?: string;
  model?: string;
  variations?: number;
  maxIters?: number;
  threshold?: number;
  headed?: boolean;
}

/**
 * Build a validated Config from environment + CLI overrides.
 * Exits process with code 1 on validation failure.
 */
export function buildConfig(overrides: CLIOverrides = {}): Config {
  const raw = {
    provider: overrides.provider ?? process.env.ADE_PROVIDER,
    modelId: overrides.model ?? process.env.ADE_MODEL,
    breakpoints: process.env.ADE_BREAKPOINTS
      ? process.env.ADE_BREAKPOINTS.split(',').map(Number)
      : undefined,
    maxIters: overrides.maxIters ?? parseIntEnv('ADE_MAX_ITERS'),
    variations: overrides.variations ?? parseIntEnv('ADE_VARIATIONS'),
    threshold: overrides.threshold ?? parseIntEnv('ADE_THRESHOLD'),
    renderRepairTries: parseIntEnv('ADE_RENDER_REPAIR_TRIES'),
    genTemperature: parseFloatEnv('ADE_GEN_TEMPERATURE'),
    criticTemperature: parseFloatEnv('ADE_CRITIC_TEMPERATURE'),
    maxRunTokens: parseIntEnv('ADE_MAX_RUN_TOKENS'),
    maxRunSeconds: parseFloatEnv('ADE_MAX_RUN_SECONDS'),
    maxModelCalls: parseIntEnv('ADE_MAX_MODEL_CALLS'),
    ollamaBaseUrl: process.env.ADE_OLLAMA_BASE_URL,
    ollamaModel: process.env.ADE_OLLAMA_MODEL,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || undefined,
    headed: overrides.headed ?? parseBoolEnv('ADE_HEADED'),
    harnessPort: parseIntEnv('ADE_HARNESS_PORT'),
  };

  // Remove undefined keys so zod defaults apply
  const cleaned = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== undefined),
  );

  const result = ConfigSchema.safeParse(cleaned);

  if (!result.success) {
    const errors = result.error.issues
      .map(i => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    console.error(`\n❌ ADE config error:\n${errors}\n`);
    console.error('Check your .env file or CLI flags. See .env.example for reference.\n');
    process.exit(1);
  }

  const cfg = result.data;

  // Validate provider-specific requirements
  if (cfg.provider === 'api' && !cfg.anthropicApiKey) {
    console.error(
      '\n❌ ADE config error:\n  • ANTHROPIC_API_KEY is required when ADE_PROVIDER=api\n',
    );
    process.exit(1);
  }

  return cfg;
}

// ─── Helpers ───────────────────────────────────────────────────────

function parseIntEnv(key: string): number | undefined {
  const v = process.env[key];
  if (v === undefined || v === '') return undefined;
  const n = parseInt(v, 10);
  if (isNaN(n)) return undefined;
  return n;
}

function parseFloatEnv(key: string): number | undefined {
  const v = process.env[key];
  if (v === undefined || v === '') return undefined;
  const n = parseFloat(v);
  if (isNaN(n)) return undefined;
  return n;
}

function parseBoolEnv(key: string): boolean | undefined {
  const v = process.env[key];
  if (v === undefined || v === '') return undefined;
  return v === 'true' || v === '1';
}
