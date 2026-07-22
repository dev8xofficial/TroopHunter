import type { Violation } from './schema.js';

export function validateKeyboardFlow(html: string): Violation[] {
  const violations: Violation[] = [];

  if (html.includes('onClick=') && !html.includes('onKeyDown=') && !html.includes('onKeyUp=')) {
    if (!/<button[^>]*onClick=/.test(html) && !/<a[^>]*onClick=/.test(html)) {
      violations.push({
        gate: 'a11y-depth',
        rule: 'keyboard-trap',
        message: 'Non-native interactive element has onClick but no keyboard event handlers.',
        severity: 'critical',
        fixable: false,
      });
    }
  }

  if (/tabIndex=["']?[1-9]\d*["']?/i.test(html) || /tabindex=["']?[1-9]\d*["']?/i.test(html)) {
    violations.push({
      gate: 'a11y-depth',
      rule: 'keyboard-trap',
      message: 'Positive tabindex used, which breaks natural tab flow.',
      severity: 'critical',
      fixable: false,
    });
  }

  return violations;
}

export function validateScreenReader(html: string): Violation[] {
  const violations: Violation[] = [];

  if (/<button[^>]*aria-hidden=["']true["'][^>]*>|<a[^>]*href=[^>]*aria-hidden=["']true["'][^>]*>/i.test(html)) {
    violations.push({
      gate: 'a11y-depth',
      rule: 'sr-broken',
      message: 'aria-hidden="true" is set on a focusable element.',
      severity: 'critical',
      fixable: false,
    });
  }

  if (/<(div|span)[^>]*onClick=[^>]*>/i.test(html) && !/<(div|span)[^>]*role=["']button["'][^>]*>/i.test(html)) {
    violations.push({
      gate: 'a11y-depth',
      rule: 'sr-broken',
      message: 'div or span has onClick handler but lacks role="button".',
      severity: 'serious',
      fixable: false,
    });
  }

  return violations;
}

export function validateReflowAndZoom(html: string): Violation[] {
  const violations: Violation[] = [];

  if (/maximum-scale=1\.?0?/i.test(html) || /user-scalable=no/i.test(html)) {
    violations.push({
      gate: 'a11y-depth',
      rule: 'reflow-zoom-failure',
      message: 'Meta viewport tag restricts zooming, violating WCAG reflow guidelines.',
      severity: 'critical',
      fixable: false,
    });
  }

  return violations;
}

export function validateReducedMotion(html: string): Violation[] {
  const violations: Violation[] = [];

  // Very basic heuristic: if we see Tailwind animate- or transition- classes
  // without motion-reduce: variants nearby, flag it.
  if ((/class=["'][^"']*\banimate-[a-zA-Z0-9_-]+[^"']*["']/i.test(html) || /class=["'][^"']*\btransition-[a-zA-Z0-9_-]+[^"']*["']/i.test(html)) && !/class=["'][^"']*\bmotion-reduce:[^"']*["']/i.test(html)) {
    violations.push({
      gate: 'a11y-depth',
      rule: 'reduced-motion-failure',
      message: 'Animation/transition classes detected without corresponding motion-reduce: variants.',
      severity: 'moderate',
      fixable: true,
    });
  }

  return violations;
}
