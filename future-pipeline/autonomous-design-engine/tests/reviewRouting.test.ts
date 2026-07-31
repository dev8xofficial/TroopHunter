import { describe, it, expect } from 'vitest';
import { routeForReview, formatReviewRoute } from '../src/reviewRouting.js';
import type { CriticOutput } from '../src/schema.js';

function criticOutput(score: number, verdict: 'pass' | 'fail' = 'pass'): CriticOutput {
  return {
    candidates: [
      {
        candidate_id: 'cand1',
        scores: {
          brand_adherence: score,
          system_adherence: null,
          brief_fit: score,
          craft: score,
          weighted_total: score,
        },
        verdict,
        feedback: 'test feedback',
      },
    ],
  };
}

describe('Review Routing (C3.3)', () => {
  it('routes failed verdicts to full-review', () => {
    const route = routeForReview(criticOutput(60, 'fail'), 'features', 80, 0);
    expect(route.route).toBe('full-review');
    expect(route.reason).toContain('fail');
  });

  it('routes low-confidence (near threshold) to full-review', () => {
    const route = routeForReview(criticOutput(82), 'features', 80, 2);
    expect(route.route).toBe('full-review');
    expect(route.reason).toContain('±5');
  });

  it('routes score below 70 to full-review regardless of section', () => {
    const route = routeForReview(criticOutput(65), 'footer', 50, 3);
    expect(route.route).toBe('full-review');
    expect(route.reason).toContain('below 70');
  });

  it('routes Tier A section (hero) to full-review even with good score', () => {
    const route = routeForReview(criticOutput(88), 'hero', 80, 1);
    expect(route.route).toBe('full-review');
    expect(route.tierA).toBe(true);
    expect(route.reason).toContain('Tier A');
  });

  it('routes Tier A with very high score at rung 3 to spot-check', () => {
    const route = routeForReview(criticOutput(95), 'hero', 80, 3);
    expect(route.route).toBe('spot-check');
    expect(route.tierA).toBe(true);
  });

  it('routes comfortable Tier B pass to spot-check', () => {
    const route = routeForReview(criticOutput(88), 'features', 80, 1);
    expect(route.route).toBe('spot-check');
    expect(route.tierA).toBe(false);
  });

  it('routes high-score Tier B at rung 2+ to audit-only', () => {
    const route = routeForReview(criticOutput(95), 'testimonials', 80, 2);
    expect(route.route).toBe('audit-only');
    expect(route.tierA).toBe(false);
  });

  it('formatReviewRoute includes tier label', () => {
    const route = routeForReview(criticOutput(95), 'hero', 80, 3);
    const text = formatReviewRoute(route);
    expect(text).toContain('[Tier A]');
    expect(text).toContain('spot-check');
  });
});
