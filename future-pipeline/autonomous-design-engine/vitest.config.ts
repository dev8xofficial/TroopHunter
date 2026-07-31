/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
    // eyes.ts and the harness/ dev-server it drives are process-wide
    // singletons (one Vite server, one browser, one candidate file on disk
    // at harness/src/candidate/Section.tsx). Any two *.e2e.test.ts files
    // running in parallel workers race on that shared file/server — proven
    // live when adding a second e2e file caused eyes.e2e.test.ts's egress
    // fixture to bleed into site-loop.e2e.test.ts's render. Serializing
    // FILES (not the whole suite — tests within a file already run
    // sequentially) is the minimal fix for a constraint that is real,
    // not a flaky-test workaround.
    fileParallelism: false,
  },
});
