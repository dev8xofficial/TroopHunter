import { describe, it, expect } from 'vitest';
import { SEED_CONSTITUTION, loadConstitution, formatConstitutionForPrompt } from '../src/constitution.js';
import { detectRewardHacking } from '../src/calibration.js';
import type { CalibrationExample } from '../src/calibration.js';

describe('Design Constitution (C3.4)', () => {
  it('seed constitution has exactly 10 principles', () => {
    expect(SEED_CONSTITUTION.principles).toHaveLength(10);
  });

  it('seed constitution is version 0', () => {
    expect(SEED_CONSTITUTION.version).toBe(0);
  });

  it('P6 (Accessible) and P9 (No dark patterns) are floor principles', () => {
    const p6 = SEED_CONSTITUTION.principles.find((p) => p.id === 'P6');
    const p9 = SEED_CONSTITUTION.principles.find((p) => p.id === 'P9');
    expect(p6?.floor).toBe(true);
    expect(p9?.floor).toBe(true);
  });

  it('non-floor principles are soft aspirations', () => {
    const nonFloor = SEED_CONSTITUTION.principles.filter((p) => !p.floor);
    expect(nonFloor.length).toBe(8);
    for (const p of nonFloor) {
      expect(p.floor).toBe(false);
    }
  });

  it('every principle has id, name, text, rationale, doesNotDictate', () => {
    for (const p of SEED_CONSTITUTION.principles) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.text).toBeTruthy();
      expect(p.rationale).toBeTruthy();
      expect(p.doesNotDictate).toBeTruthy();
    }
  });

  it('formatConstitutionForPrompt includes all principle IDs', () => {
    const text = formatConstitutionForPrompt(SEED_CONSTITUTION);
    for (const p of SEED_CONSTITUTION.principles) {
      expect(text).toContain(p.id);
    }
  });

  it('formatConstitutionForPrompt marks floor principles', () => {
    const text = formatConstitutionForPrompt(SEED_CONSTITUTION);
    expect(text).toContain('P6');
    expect(text).toContain('HARD FLOOR');
    expect(text).toContain('P9');
  });

  it('formatConstitutionForPrompt includes version number', () => {
    const text = formatConstitutionForPrompt(SEED_CONSTITUTION);
    expect(text).toContain('v0');
  });

  it('formatConstitutionForPrompt instructs citation', () => {
    const text = formatConstitutionForPrompt(SEED_CONSTITUTION);
    expect(text).toContain('cite');
  });

  it('loadConstitution returns seed when no file exists', () => {
    const constitution = loadConstitution('/nonexistent/path');
    expect(constitution.version).toBe(0);
    expect(constitution.principles).toHaveLength(10);
  });
});

describe('Reward-Hacking Gap Detection (C3.4)', () => {
  function makeExample(overrides: Partial<CalibrationExample> & { criticScore: number; ratingScore: number }): CalibrationExample {
    return {
      runId: 'run-1',
      section: 'hero',
      candidateId: 'cand-1',
      criticScore: overrides.criticScore,
      criticPassed: overrides.criticScore >= 80,
      humanPositive: overrides.humanPositive ?? true,
      ratingScore: overrides.ratingScore,
      preferred: 'final',
      timestamp: overrides.timestamp ?? new Date().toISOString(),
      notes: overrides.notes,
      scoreGain: overrides.scoreGain,
      stratum: overrides.stratum ?? 'routine',
      isAudit: overrides.isAudit ?? false,
    };
  }

  it('triggers gap alarm when critic scores rise but human ratings fall', () => {
    const examples: CalibrationExample[] = [];
    // First 10: critic ~70, rating 2 (good)
    for (let i = 0; i < 10; i++) {
      examples.push(
        makeExample({
          criticScore: 70 + Math.random() * 2,
          ratingScore: 2,
          timestamp: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          scoreGain: 0,
        }),
      );
    }
    // Second 10: critic ~82 (+12 rise), rating 1.5 (fell)
    for (let i = 0; i < 10; i++) {
      examples.push(
        makeExample({
          criticScore: 82 + Math.random() * 2,
          ratingScore: i < 5 ? 2 : 1, // average 1.5
          timestamp: `2026-02-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          scoreGain: 0,
        }),
      );
    }

    const alarm = detectRewardHacking(examples);
    expect(alarm.triggered).toBe(true);
    expect(alarm.reasons.some((r) => r.includes('gap widening'))).toBe(true);
  });

  it('does NOT trigger gap alarm when both critic and human rise', () => {
    const examples: CalibrationExample[] = [];
    // First 10: critic ~70, rating 1
    for (let i = 0; i < 10; i++) {
      examples.push(
        makeExample({
          criticScore: 70,
          ratingScore: 1,
          timestamp: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          scoreGain: 0,
        }),
      );
    }
    // Second 10: critic ~80, rating 2 (both rise)
    for (let i = 0; i < 10; i++) {
      examples.push(
        makeExample({
          criticScore: 80,
          ratingScore: 2,
          timestamp: `2026-02-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          scoreGain: 0,
        }),
      );
    }

    const alarm = detectRewardHacking(examples);
    expect(alarm.reasons.some((r) => r.includes('gap widening'))).toBe(false);
  });

  it('does NOT trigger gap alarm with fewer than 20 examples', () => {
    const examples: CalibrationExample[] = [];
    for (let i = 0; i < 15; i++) {
      examples.push(
        makeExample({
          criticScore: 70 + i * 2,
          ratingScore: 1,
          timestamp: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          scoreGain: 0,
        }),
      );
    }

    const alarm = detectRewardHacking(examples);
    expect(alarm.reasons.some((r) => r.includes('gap widening'))).toBe(false);
  });
});
