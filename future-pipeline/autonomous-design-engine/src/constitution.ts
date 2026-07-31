/**
 * ADE — Design Constitution (Phase 3 / C3.4)
 *
 * A versioned, living constitution of design principles that grounds the
 * Critic's taste. The system may propose amendments; only a human ratifies.
 * See spec/12-design-constitution.md for the full rationale.
 *
 * Closes F-JDG-02 (reward hacking), F-SPEC-02 (taste ceiling),
 * F-LEG-03 (ethics constraint).
 *
 * @module constitution
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { atomicWrite } from './store.js';

// ─── Types ─────────────────────────────────────────────────────────

export interface ConstitutionPrinciple {
  /** Principle ID, e.g. 'P1' */
  id: string;
  /** Short name */
  name: string;
  /** The principle text — what good means */
  text: string;
  /** Why this principle matters */
  rationale: string;
  /** What this principle does NOT dictate (granted freedom) */
  doesNotDictate: string;
  /** If true, this is a hard floor — inviolable, never traded away */
  floor: boolean;
}

export interface Constitution {
  version: number;
  principles: ConstitutionPrinciple[];
  frozenAt: string;
}

// ─── The v0 Seed (spec/12 §3) ─────────────────────────────────────

export const SEED_CONSTITUTION: Constitution = {
  version: 0,
  frozenAt: '2026-01-01T00:00:00Z',
  principles: [
    {
      id: 'P1',
      name: 'Serve the brief before the eye',
      text: 'Beauty is in service of the business goal; a beautiful section that does not advance the goal has failed.',
      rationale: 'Goal B is design for a brief, not decoration.',
      doesNotDictate: 'What "serving the goal" looks like — that is the design.',
      floor: false,
    },
    {
      id: 'P2',
      name: 'Earn every element',
      text: 'Default to less; every element must justify its presence against removal.',
      rationale: 'Restraint reads as confidence; clutter reads as uncertainty.',
      doesNotDictate: 'How much whitespace, which elements — only that each be earned.',
      floor: false,
    },
    {
      id: 'P3',
      name: 'Make the hierarchy unambiguous',
      text: "A first-time viewer's attention should land where the goal needs it, in the order the goal needs.",
      rationale: 'A design the eye cannot navigate cannot convert.',
      doesNotDictate: "How hierarchy is achieved (scale, weight, space, colour, motion — the system's choice).",
      floor: false,
    },
    {
      id: 'P4',
      name: 'Consistency is the floor; distinctiveness is the aim',
      text: 'Obey the brand and system (hard law), but a design indistinguishable from the category mean has failed even if it is "clean."',
      rationale: 'Sameness is the AI-slop failure; differentiation is a core design job.',
      doesNotDictate: 'How to be distinctive.',
      floor: false,
    },
    {
      id: 'P5',
      name: 'The medium is more than a frozen frame',
      text: 'Motion, interaction states, the scroll experience, and real, variable content are part of the design, not afterthoughts. Judge the experience, not the postcard.',
      rationale: 'A static screenshot hides most of what a user feels.',
      doesNotDictate: 'Which motion or interactions — only that they be considered and be good.',
      floor: false,
    },
    {
      id: 'P6',
      name: 'Accessible and inclusive by construction',
      text: 'Accessibility, internationalisation (RTL, text expansion), reduced-motion, and inclusivity are inputs from the first decision, not compliance added at the end.',
      rationale: 'Excluding users is a quality failure, not a checklist miss.',
      doesNotDictate: 'How — only that it hold under real conditions.',
      floor: true, // HARD FLOOR
    },
    {
      id: 'P7',
      name: 'Novelty must be earned by the brief, never by decoration',
      text: 'Creativity in service of intent is the goal; ornament for its own sake is slop.',
      rationale: 'Novelty that does not serve the brief is indistinguishable from noise.',
      doesNotDictate: 'How bold to be — the brief decides the licence.',
      floor: false,
    },
    {
      id: 'P8',
      name: 'Excellence is spiky, not balanced',
      text: 'A design that is exceptional where it matters beats one that is uniformly adequate. Do not average yourself into mediocrity.',
      rationale: 'Summing dimensions into one score rewards compromise over greatness; great work has a point of view.',
      doesNotDictate: 'Which axis to spike — the brief and brand decide.',
      floor: false,
    },
    {
      id: 'P9',
      name: 'Ethical constraints / No dark patterns',
      text: 'Design must respect user agency and intent; it cannot use deceit, forced continuity, or manipulative patterns to drive metrics.',
      rationale: 'Reward hacking on conversion proxies creates long-term trust collapse.',
      doesNotDictate: 'How to optimize a funnel honestly — only that the optimization must be honest.',
      floor: true, // HARD FLOOR
    },
    {
      id: 'P10',
      name: 'Representation and Bias',
      text: 'Imagery, language, and cultural framing must reflect a pluralistic world, avoiding stereotypes or default-western/default-white anchoring unless specifically demanded by the localized brief.',
      rationale: 'Unchecked generative models regress to narrow, biased cultural means.',
      doesNotDictate: 'Specific demographics to include — but demands the system actively check its defaults.',
      floor: false,
    },
  ],
};

// ─── Store ─────────────────────────────────────────────────────────

const CONSTITUTION_FILE = 'constitution.json';

/**
 * Load the constitution from disk, or return the seed if none exists.
 */
export function loadConstitution(dir?: string): Constitution {
  const filePath = dir ? join(dir, CONSTITUTION_FILE) : CONSTITUTION_FILE;
  if (!existsSync(filePath)) {
    return SEED_CONSTITUTION;
  }
  try {
    const raw = JSON.parse(readFileSync(filePath, 'utf-8'));
    return raw as Constitution;
  } catch {
    console.warn('⚠ Failed to parse constitution.json, using seed.');
    return SEED_CONSTITUTION;
  }
}

/**
 * Save a constitution version (atomic write).
 */
export function saveConstitution(dir: string, constitution: Constitution): void {
  const filePath = join(dir, CONSTITUTION_FILE);
  atomicWrite(filePath, constitution);
}

// ─── Prompt Formatting ─────────────────────────────────────────────

/**
 * Render the constitution as a compact text block for injection into
 * the Critic system prompt. Each principle is one line with its ID,
 * name, and text. Floor principles are marked [HARD FLOOR].
 */
export function formatConstitutionForPrompt(constitution: Constitution): string {
  const lines = [`DESIGN CONSTITUTION (v${constitution.version} — ground your judgment against these principles; cite the relevant P-number in your feedback):`, ''];

  for (const p of constitution.principles) {
    const floorTag = p.floor ? ' [HARD FLOOR — inviolable]' : '';
    lines.push(`${p.id} — ${p.name}${floorTag}: ${p.text}`);
  }

  lines.push('');
  lines.push('When scoring, cite which principle(s) each score rests on. A HARD FLOOR violation is an automatic fail regardless of other scores.');

  return lines.join('\n');
}
