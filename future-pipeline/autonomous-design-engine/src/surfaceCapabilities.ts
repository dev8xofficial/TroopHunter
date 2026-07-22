/**
 * ADE — Product-Surface Capability Checklist (Phase 3 / C3.7)
 *
 * Implements the explicit per-surface capability roadmap constraint.
 * The engine must honestly refuse to design surfaces (like data-viz or emails)
 * that the Eyes and Critic are not yet equipped to drive or evaluate.
 *
 * @module surfaceCapabilities
 */

import type { Brief } from './schema.js';

type CapabilityStatus = 'supported' | 'experimental' | 'unsupported';

interface SurfaceCapability {
  name: string;
  status: CapabilityStatus;
  description: string;
}

export const CAPABILITIES: Record<string, SurfaceCapability> = {
  marketing: {
    name: 'Marketing / Landing Pages',
    status: 'supported',
    description: 'Standard website marketing sections (heroes, features, pricing, etc.)',
  },
  forms: {
    name: 'Forms / Inputs',
    status: 'supported',
    description: 'Sections containing input fields and buttons. The engine drives focus/hover states.',
  },
  dashboard: {
    name: 'Dashboard / Product UI',
    status: 'experimental',
    description: 'Complex product UI without heavy data visualization.',
  },
  dataViz: {
    name: 'Data Visualization',
    status: 'unsupported',
    description: 'Charts, graphs, and complex data tables.',
  },
  email: {
    name: 'Email Templates',
    status: 'unsupported',
    description: 'HTML email design, which requires table-based layouts and specific inline styles.',
  },
  multiPage: {
    name: 'Multi-page Flows',
    status: 'unsupported',
    description: 'Connected multi-page user journeys (e.g. checkout, onboarding).',
  },
  localization: {
    name: 'Localization / RTL',
    status: 'unsupported',
    description: 'Right-to-left language support and multi-locale rendering.',
  },
};

/**
 * Checks if the requested brief asks for an unsupported product surface.
 * Heuristically determines the required surface capabilities from the brief.
 */
export function checkSurfaceCapability(brief: Brief): { pass: boolean; violations: string[] } {
  const violations: string[] = [];
  const requiredCapabilities = new Set<string>();

  const sectionName = brief.section.name.toLowerCase();
  const contentKeys = Object.keys(brief.section.content).join(' ').toLowerCase();

  // Basic heuristics for surface detection
  if (sectionName.includes('email') || sectionName.includes('newsletter template')) {
    requiredCapabilities.add('email');
  }

  if (sectionName.includes('chart') || sectionName.includes('graph') || contentKeys.includes('chart') || contentKeys.includes('dataset')) {
    requiredCapabilities.add('dataViz');
  }

  // Dashboard detection
  if (sectionName.includes('dashboard') || brief.industry.toLowerCase().includes('saas app')) {
    requiredCapabilities.add('dashboard');
  }

  // Forms detection
  if (sectionName.includes('form') || sectionName.includes('login') || sectionName.includes('signup') || contentKeys.includes('input')) {
    requiredCapabilities.add('forms');
  }

  // Multi-page detection
  if (sectionName.includes('flow') || sectionName.includes('funnel') || sectionName.includes('multi-page')) {
    requiredCapabilities.add('multiPage');
  }

  // Localization detection
  if (sectionName.includes('rtl') || brief.audience.toLowerCase().includes('arabic') || brief.audience.toLowerCase().includes('hebrew')) {
    requiredCapabilities.add('localization');
  }

  // Check required capabilities against roadmap
  for (const capKey of requiredCapabilities) {
    const cap = CAPABILITIES[capKey];
    if (cap && cap.status === 'unsupported') {
      violations.push(`Surface Capability Missing: The brief requires '${cap.name}' which is currently unsupported. Honest scoping requires deferring this until the engine can correctly render and evaluate it.`);
    }
  }

  return {
    pass: violations.length === 0,
    violations,
  };
}
