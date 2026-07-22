/**
 * ADE Tests — Orchestrator pure helpers (C1.9, C0.8)
 */

import { describe, it, expect } from 'vitest';
import { boundedContextShots, buildCandidatesInfo } from '../src/orchestrator.js';
import { buildCriticPrompt } from '../src/prompts.js';
import type { InputBundle, RenderResult } from '../src/schema.js';

type Shot = { sectionName: string; breakpoint: string; path: string };

function shotsFor(sectionName: string): Shot[] {
  return ['1440', '768', '375'].map((bp) => ({ sectionName, breakpoint: bp, path: `${sectionName}-${bp}.png` }));
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
    const shots = [...shotsFor('hero'), ...shotsFor('about'), ...shotsFor('pricing'), ...shotsFor('faq'), ...shotsFor('footer')];
    const result = boundedContextShots(shots)!;
    const sectionNames = [...new Set(result.map((s) => s.sectionName))];
    expect(sectionNames).toEqual(['pricing', 'faq', 'footer']); // last 3, not hero/about
    expect(result).toHaveLength(9); // 3 sections x 3 breakpoints, not 15
  });

  it('token count per call stays flat once past the cap, regardless of how many sections were built total', () => {
    const fiveSections = boundedContextShots([...shotsFor('a'), ...shotsFor('b'), ...shotsFor('c'), ...shotsFor('d'), ...shotsFor('e')])!;
    const tenSections = boundedContextShots([...shotsFor('a'), ...shotsFor('b'), ...shotsFor('c'), ...shotsFor('d'), ...shotsFor('e'), ...shotsFor('f'), ...shotsFor('g'), ...shotsFor('h'), ...shotsFor('i'), ...shotsFor('j')])!;
    // Same bounded size whether the artifact has 5 or 10 sections built so far — this IS the H7 guarantee.
    expect(fiveSections.length).toBe(tenSections.length);
  });
});

describe('buildCandidatesInfo (C0.8 — domInfo regression guard)', () => {
  it('carries domInfo (craft metrics + rendered fonts) from each render-valid candidate through to the Critic payload', () => {
    const domInfo: RenderResult['domInfo'] = {
      bodyHeight: 900,
      hasText: true,
      fontsLoaded: true,
      imagesLoaded: true,
      craftMetrics: { spacingConformance: 0.9, alignmentRegularity: 0.85, tapTargetGeometry: 0.8, typeScaleConformance: 0.95 },
      renderedFontFamilies: ['Arial', 'sans-serif'],
    };

    const info = buildCandidatesInfo([{ id: 'cand1', shots: { '1440': '/shots/cand1-1440.png' }, domInfo }]);

    expect(info.cand1.domInfo).toEqual(domInfo);
  });

  it('leaves domInfo undefined when a candidate genuinely has none, rather than fabricating a value', () => {
    const info = buildCandidatesInfo([{ id: 'cand1', shots: { '1440': '/shots/x.png' } }]);
    expect(info.cand1.domInfo).toBeUndefined();
  });

  it('end-to-end: domInfo built by buildCandidatesInfo actually reaches the Critic prompt text (craft metrics + font-substitution CAVEATS) — the exact chain that silently broke', () => {
    const bundle: InputBundle = {
      brief: {
        client: 'TestCo',
        industry: 'Tech',
        audience: 'Devs',
        goal: 'Leads',
        section: { name: 'hero', content: { headline: 'Hi' } },
      },
      hardBrand: {
        client_id: 'testco',
        version: 1,
        status: 'frozen',
        identity: {
          palette: [{ role: 'text', value: '#111827' }],
          typography: [{ role: 'display', family: 'Canela', fallback: 'serif' }],
          motion_voice: 'calm',
          personality: ['clear'],
          tone: 'assured',
          semanticColors: [],
          darkMode: { enabled: false },
        },
        provenance: { palette: 'provided', typography: 'provided', motion_voice: 'derived', personality: 'derived', tone: 'derived' },
      },
    };

    const renderValid = [
      {
        id: 'cand1',
        shots: { '1440': '/shots/cand1-1440.png' },
        domInfo: {
          bodyHeight: 900,
          hasText: true,
          fontsLoaded: true,
          imagesLoaded: true,
          craftMetrics: { spacingConformance: 0.9, alignmentRegularity: 0.85, tapTargetGeometry: 0.8, typeScaleConformance: 0.95 },
          renderedFontFamilies: ['Arial', 'sans-serif'], // "Canela" never actually rendered — fallback
        },
      },
    ];

    const candidatesInfo = buildCandidatesInfo(renderValid);
    const { user } = buildCriticPrompt(bundle, candidatesInfo);

    // Craft metrics genuinely reached the prompt text.
    expect(user).toContain('DOM CRAFT METRICS');
    expect(user).toContain('90%'); // spacingConformance 0.9 -> 90%
    // Font-substitution disclosure genuinely reached the prompt text.
    expect(user).toContain('CAVEATS');
    expect(user).toContain('not found in the actual render');
    expect(user).toContain('Canela');
  });
});
