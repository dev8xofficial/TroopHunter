/**
 * ADE Tests — Orchestrator pure helpers (C1.9)
 */

import { describe, it, expect } from 'vitest';
import { boundedContextShots } from '../src/orchestrator.js';

type Shot = { sectionName: string; breakpoint: string; path: string };

function shotsFor(sectionName: string): Shot[] {
  return ['1440', '768', '375'].map(bp => ({ sectionName, breakpoint: bp, path: `${sectionName}-${bp}.png` }));
}

describe('boundedContextShots (C1.9)', () => {
  it('returns undefined for an empty input (no context yet)', () => {
    expect(boundedContextShots([])).toBeUndefined();
  });

  it('returns all shots unbounded when 3 or fewer sections exist', () => {
    const shots = [...shotsFor('hero'), ...shotsFor('about')];
    const result = boundedContextShots(shots);
    expect(result).toHaveLength(6);
  });

  it('bounds to the most recent 3 sections when more than 3 exist (H7 flatness)', () => {
    const shots = [
      ...shotsFor('hero'),
      ...shotsFor('about'),
      ...shotsFor('pricing'),
      ...shotsFor('faq'),
      ...shotsFor('footer'),
    ];
    const result = boundedContextShots(shots)!;
    const sectionNames = [...new Set(result.map(s => s.sectionName))];
    expect(sectionNames).toEqual(['pricing', 'faq', 'footer']); // last 3, not hero/about
    expect(result).toHaveLength(9); // 3 sections x 3 breakpoints, not 15
  });

  it('token count per call stays flat once past the cap, regardless of how many sections were built total', () => {
    const fiveSections = boundedContextShots([...shotsFor('a'), ...shotsFor('b'), ...shotsFor('c'), ...shotsFor('d'), ...shotsFor('e')])!;
    const tenSections = boundedContextShots([
      ...shotsFor('a'), ...shotsFor('b'), ...shotsFor('c'), ...shotsFor('d'), ...shotsFor('e'),
      ...shotsFor('f'), ...shotsFor('g'), ...shotsFor('h'), ...shotsFor('i'), ...shotsFor('j'),
    ])!;
    // Same bounded size whether the artifact has 5 or 10 sections built so far — this IS the H7 guarantee.
    expect(fiveSections.length).toBe(tenSections.length);
  });
});
