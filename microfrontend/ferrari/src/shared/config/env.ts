import { z } from 'zod';

/**
 * Type-safe environment variable access.
 * Validates all expected env vars at import time.
 */

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'staging', 'production']).default('local'),
  PORT: z.string().default('3007'),
  NEXT_PUBLIC_ASSET_HOST: z.string().optional().default('')
});

function getEnv() {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NEXT_PUBLIC_ASSET_HOST: process.env.NEXT_PUBLIC_ASSET_HOST
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    // Don't throw in production — gracefully degrade
    return envSchema.parse({});
  }

  return parsed.data;
}

export const env = getEnv();
export type Env = z.infer<typeof envSchema>;
