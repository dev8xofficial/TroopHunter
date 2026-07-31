import type { Violation } from './schema.js';

const ALLOWLISTED_ASSET_HOSTS = ['fonts.googleapis.com', 'unpkg.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'];

export function validateAssetLicensing(assets: { url: string }[]): Violation[] {
  const violations: Violation[] = [];
  for (const asset of assets) {
    try {
      const url = new URL(asset.url);
      if (!ALLOWLISTED_ASSET_HOSTS.includes(url.hostname)) {
        violations.push({
          gate: 'compliance',
          rule: 'unlicensed-asset',
          message: `Asset loaded from unverified/proprietary host: ${url.hostname}. Only allowlisted OSS CDNs are permitted.`,
          severity: 'critical',
          fixable: false,
        });
      }
    } catch {
      // Ignored here
    }
  }
  return violations;
}

export function screenSimilarity(output: string, knownSiteReference: string): Violation[] {
  const violations: Violation[] = [];
  const outWords = new Set(output.split(/\W+/).filter((w) => w.length > 4));
  const refWords = new Set(knownSiteReference.split(/\W+/).filter((w) => w.length > 4));

  let overlap = 0;
  for (const w of outWords) {
    if (refWords.has(w)) overlap++;
  }

  const total = outWords.size;
  if (total > 0 && overlap / total > 0.8) {
    violations.push({
      gate: 'compliance',
      rule: 'high-resemblance',
      message: 'Output bears high resemblance (>80% overlap) to reference site. Output must remain original.',
      severity: 'critical',
      fixable: false,
    });
  }
  return violations;
}

export function screenDarkPatterns(text: string): Violation[] {
  const violations: Violation[] = [];
  const darkPatterns = [/only \d+ left/i, /offer ends in \d{2}:\d{2}/i, /other people are looking at this/i, /false urgency/i];

  for (const pattern of darkPatterns) {
    if (pattern.test(text)) {
      violations.push({
        gate: 'compliance',
        rule: 'dark-pattern',
        message: `Detected manipulative UX copy or dark pattern: ${pattern}. Refusing execution.`,
        severity: 'critical',
        fixable: false,
      });
    }
  }
  return violations;
}

export function checkRegulatoryRequirements(brief: string, output: string): Violation[] {
  const violations: Violation[] = [];
  const lowerBrief = brief.toLowerCase();
  const lowerOutput = output.toLowerCase();

  if (lowerBrief.includes('finance') || lowerBrief.includes('financial')) {
    if (!lowerOutput.includes('not financial advice') && !lowerOutput.includes('terms and conditions')) {
      violations.push({
        gate: 'compliance',
        rule: 'missing-regulatory-disclaimer',
        message: 'Financial domain brief requires a regulatory disclaimer (e.g. "not financial advice").',
        severity: 'critical',
        fixable: true,
      });
    }
  }
  return violations;
}

export function validateImageryBias(imagePrompts: string[]): Violation[] {
  const violations: Violation[] = [];
  const exclusionaryTerms = [/normal people/i, /standard looking/i, /typical user/i];

  for (const prompt of imagePrompts) {
    for (const term of exclusionaryTerms) {
      if (term.test(prompt)) {
        violations.push({
          gate: 'compliance',
          rule: 'representation-bias',
          message: `Image generation prompt contains exclusionary or normative language ('${term}'). (R15 representation constraint)`,
          severity: 'serious',
          fixable: true,
        });
      }
    }
  }
  return violations;
}
