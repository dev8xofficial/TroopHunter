/**
 * ADE Tests — Schema validation
 */

import { describe, it, expect } from 'vitest';
import { BriefSchema, BrandDataSchema, RunRecordSchema, CriticOutputSchema, DimensionScoresSchema, RenderResultSchema, VerdictEntrySchema, validate } from '../src/schema.js';

describe('Schema Validation', () => {
  // ─── Brief ───────────────────────────────────────────────────────

  describe('BriefSchema', () => {
    it('accepts a valid brief', () => {
      const brief = {
        client: "Burke's Steakhouse",
        industry: 'Restaurant',
        audience: 'Affluent professionals',
        goal: 'Drive reservations',
        section: {
          name: 'hero',
          content: {
            headline: 'Where Every Cut Tells a Story',
            cta: { text: 'Reserve', href: '/reservations' },
          },
        },
      };

      const result = BriefSchema.safeParse(brief);
      expect(result.success).toBe(true);
    });

    it('rejects a brief with missing required fields', () => {
      const brief = {
        client: "Burke's Steakhouse",
        // missing industry, audience, goal
        section: { name: 'hero', content: {} },
      };

      const result = BriefSchema.safeParse(brief);
      expect(result.success).toBe(false);
    });

    it('rejects a brief with empty client', () => {
      const brief = {
        client: '',
        industry: 'Restaurant',
        audience: 'People',
        goal: 'Sell',
        section: { name: 'hero', content: {} },
      };

      const result = BriefSchema.safeParse(brief);
      expect(result.success).toBe(false);
    });
  });

  // ─── BrandData ───────────────────────────────────────────────────

  describe('BrandDataSchema', () => {
    it('accepts valid brand-data', () => {
      const brand = {
        client_id: 'burkes',
        palette: [
          { role: 'primary', value: '#1C1917' },
          { role: 'accent', value: '#B45309' },
        ],
        typography: [
          { role: 'display', family: 'Playfair Display', fallback: 'serif' },
          { role: 'ui', family: 'Inter', fallback: 'sans-serif' },
        ],
      };

      const result = BrandDataSchema.safeParse(brand);
      expect(result.success).toBe(true);
    });

    it('rejects brand-data with invalid hex color', () => {
      const brand = {
        client_id: 'test',
        palette: [{ role: 'primary', value: 'not-a-color' }],
        typography: [{ role: 'ui', family: 'Inter', fallback: 'sans' }],
      };

      const result = BrandDataSchema.safeParse(brand);
      expect(result.success).toBe(false);
    });

    it('rejects brand-data with empty palette', () => {
      const brand = {
        client_id: 'test',
        palette: [],
        typography: [{ role: 'ui', family: 'Inter', fallback: 'sans' }],
      };

      const result = BrandDataSchema.safeParse(brand);
      expect(result.success).toBe(false);
    });
  });

  // ─── DimensionScores ─────────────────────────────────────────────

  describe('DimensionScoresSchema', () => {
    it('accepts valid scores', () => {
      const scores = {
        brand_adherence: 85,
        system_adherence: null,
        brief_fit: 90,
        craft: 80,
        weighted_total: 85,
      };

      const result = DimensionScoresSchema.safeParse(scores);
      expect(result.success).toBe(true);
    });

    it('rejects scores outside 0-100', () => {
      const scores = {
        brand_adherence: 150,
        system_adherence: null,
        brief_fit: -10,
        craft: 80,
        weighted_total: 85,
      };

      const result = DimensionScoresSchema.safeParse(scores);
      expect(result.success).toBe(false);
    });
  });

  // ─── CriticOutput ────────────────────────────────────────────────

  describe('CriticOutputSchema', () => {
    it('accepts valid critic output', () => {
      const output = {
        candidates: [
          {
            candidate_id: 'iter0-cand1',
            scores: {
              brand_adherence: 85,
              system_adherence: null,
              brief_fit: 90,
              craft: 80,
              weighted_total: 85,
            },
            verdict: 'pass',
            feedback: 'Strong visual hierarchy.',
          },
        ],
        ranking: ['iter0-cand1'],
        overall_feedback: 'Good first iteration.',
      };

      const result = CriticOutputSchema.safeParse(output);
      expect(result.success).toBe(true);
    });
  });

  describe('RenderResultSchema', () => {
    it('accepts hard constraint violations collected during render', () => {
      const result = RenderResultSchema.safeParse({
        candidate_id: 'iter0-cand1',
        shots: { '375': 'shots/375.png' },
        consoleErrors: [],
        hasErrorOverlay: false,
        hardViolations: [
          {
            gate: 'hard-constraint',
            rule: 'no-placeholder',
            message: 'Placeholder text detected',
            severity: 'serious',
            fixable: true,
          },
        ],
        domInfo: {
          bodyHeight: 900,
          hasText: true,
          fontsLoaded: true,
          imagesLoaded: true,
        },
      });

      expect(result.success).toBe(true);
    });
  });

  // ─── Schema Gate (validate function) ─────────────────────────────

  describe('validate()', () => {
    it('validates known schemas', () => {
      const result = validate('dimensionScores', {
        brand_adherence: 80,
        system_adherence: null,
        brief_fit: 75,
        craft: 85,
        weighted_total: 80,
      });

      expect(result.success).toBe(true);
    });

    it('returns error for unknown schema', () => {
      const result = validate('nonexistent', {});
      expect(result.success).toBe(false);
      expect('error' in result && result.error).toContain('Unknown schema');
    });

    it('returns error for invalid data', () => {
      const result = validate('brief', { client: '' });
      expect(result.success).toBe(false);
    });
  });

  // ─── VerdictEntry ────────────────────────────────────────────────

  describe('VerdictEntrySchema', () => {
    it('accepts valid verdict entry', () => {
      const entry = {
        run_id: 'abc123',
        section: 'hero',
        preferred: 'final',
        rating: 'good',
        timestamp: new Date().toISOString(),
      };

      const result = VerdictEntrySchema.safeParse(entry);
      expect(result.success).toBe(true);
    });
  });
});
