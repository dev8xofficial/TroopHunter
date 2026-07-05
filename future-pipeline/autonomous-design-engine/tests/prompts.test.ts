/**
 * ADE Tests — Prompts (generator and critic)
 */

import { describe, it, expect } from 'vitest';
import { buildGeneratorPrompt, buildCriticPrompt, serializeFeedback } from '../src/prompts.js';
import type { InputBundle } from '../src/schema.js';

const minimalBundle: InputBundle = {
  brief: {
    client: 'TestCo',
    industry: 'Technology',
    audience: 'Developers',
    goal: 'Generate leads',
    section: {
      name: 'hero',
      content: {
        headline: 'Build Better Software',
        subheadline: 'The developer platform for modern teams.',
        cta: { text: 'Get Started', href: '/signup' },
      },
    },
  },
};

const bundleWithBrand: InputBundle = {
  ...minimalBundle,
  brandData: {
    client_id: 'testco',
    palette: [
      { role: 'primary', value: '#1C1917' },
      { role: 'accent', value: '#B45309' },
    ],
    typography: [
      { role: 'display', family: 'Playfair Display', fallback: 'serif' },
      { role: 'ui', family: 'Inter', fallback: 'sans-serif' },
      { role: 'mono', family: 'JetBrains Mono', fallback: 'monospace' },
    ],
  },
};

describe('Prompts', () => {
  describe('buildGeneratorPrompt', () => {
    it('produces system + user prompts', () => {
      const { system, user } = buildGeneratorPrompt(minimalBundle);
      expect(system).toContain('EXACTLY ONE self-contained .tsx');
      expect(system).toContain('ONLY import from "react"');
      expect(user).toContain('TestCo');
      expect(user).toContain('Build Better Software');
    });

    it('includes brand tokens when brand-data is provided', () => {
      const { system, user } = buildGeneratorPrompt(bundleWithBrand);
      expect(user).toContain('#1C1917');
      expect(user).toContain('#B45309');
      expect(user).toContain('Playfair Display');
      expect(system).toContain('brand palette colors');
    });

    it('includes feedback when provided', () => {
      const { user } = buildGeneratorPrompt(minimalBundle, 'Improve contrast on CTA button');
      expect(user).toContain('FEEDBACK FROM PREVIOUS ITERATION');
      expect(user).toContain('Improve contrast on CTA button');
    });

    it('does NOT include brand rule when no brand-data', () => {
      const { system } = buildGeneratorPrompt(minimalBundle);
      expect(system).not.toContain('brand palette colors');
    });
  });

  describe('buildCriticPrompt', () => {
    it('produces system + user prompts for single candidate', () => {
      const { system, user } = buildCriticPrompt(minimalBundle, ['iter0-cand1']);
      expect(system).toContain('You did NOT build this');
      expect(system).toContain('candidate_id');
      expect(user).toContain('iter0-cand1');
      expect(user).toContain('TestCo');
    });

    it('uses pairwise language for multiple candidates', () => {
      const { user } = buildCriticPrompt(minimalBundle, ['cand-a', 'cand-b']);
      expect(user).toContain('comparing 2 candidates');
      expect(user).toContain('Rank them pairwise');
    });

    it('includes brand reference when brand-data provided', () => {
      const { user } = buildCriticPrompt(bundleWithBrand, ['cand-a']);
      expect(user).toContain('#1C1917');
      expect(user).toContain('BRAND CONSTRAINTS');
    });
  });

  describe('serializeFeedback', () => {
    it('includes hard violations first', () => {
      const feedback = serializeFeedback(
        ['Contrast ratio too low on CTA', 'Missing nav items'],
        'The hero image could be larger.',
      );
      expect(feedback.indexOf('MUST FIX')).toBeLessThan(feedback.indexOf('IMPROVE'));
    });

    it('includes keep-what-worked reminder', () => {
      const feedback = serializeFeedback([], 'Minor improvements needed.');
      expect(feedback).toContain('KEEP what worked');
    });

    it('handles empty violations', () => {
      const feedback = serializeFeedback([], 'Some notes');
      expect(feedback).not.toContain('MUST FIX');
      expect(feedback).toContain('IMPROVE');
    });
  });
});
