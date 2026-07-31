import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '../src/eyes.js';
import { rmSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

describe('Product-Surface Capability (C3.7)', () => {
  const outDir = join(process.cwd(), '.test-out', 'eyes-interactions');

  beforeEach(() => {
    if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
    mkdirSync(outDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  });

  it('drives interactions and captures hover and active states on desktop', async () => {
    // A simple component with a button and an input
    const component = `
      export default function TestComponent() {
        return (
          <div className="p-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Hover Me
            </button>
            <input 
              type="text" 
              className="mt-4 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Focus Me"
            />
          </div>
        );
      }
    `;

    // Mock config
    const mockCfg = {
      model: 'test',
      criticModel: 'test',
      maxIters: 1,
      variations: 1,
      threshold: 80,
      breakpoints: [1024, 375],
      harnessPort: 5175,
    };

    const result = await render(component, 'test-cand', mockCfg.breakpoints, mockCfg as any, outDir);

    // Verify default shots exist
    expect(result.shots['1024']).toBeTruthy();
    expect(result.shots['375']).toBeTruthy();

    // Verify interaction shots exist for the 1024 breakpoint
    expect(result.shots['1024-hover']).toBeTruthy();
    expect(result.shots['1024-active']).toBeTruthy();

    // Ensure no interaction shots for the 375 breakpoint (per C3.7 plan)
    expect(result.shots['375-hover']).toBeUndefined();
    expect(result.shots['375-active']).toBeUndefined();
  }, 30000); // 30s timeout for playwright
});
