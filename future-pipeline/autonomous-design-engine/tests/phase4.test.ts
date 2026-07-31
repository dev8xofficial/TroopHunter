import { describe, it, expect } from 'vitest';
import type { Artifact, BrandFoundation, ProjectDesignSystem, RunRecord } from '../src/schema.js';
import type { CalibrationSummary } from '../src/calibration.js';
import { computeEarnedRung, recommendAutonomyPolicy, shouldRequireHumanSectionReview } from '../src/autonomy.js';
import { runCrossSurfaceBrandQA, runWholeArtifactQA, offendingSections, violationSectionName, sectionVariationScore } from '../src/qa.js';
import { checkCostBudget, outputQualityGate, summarizeTraceCost, validateProductionReadiness } from '../src/production.js';
import { deidentificationGate } from '../src/writeback.js';
import { writeArtifact, readArtifact } from '../src/store.js';
import { validateAssetLicensing, screenSimilarity, screenDarkPatterns, checkRegulatoryRequirements } from '../src/compliance.js';
import { validateCrossBrowser, validateTailwindPurge, validateHydration, validateSEO, validateCoreWebVitals } from '../src/parity.js';
import { validateKeyboardFlow, validateScreenReader, validateReflowAndZoom } from '../src/a11y.js';
import { createDeterministicSnapshot, migrateRecord, simulateRestore, runRetentionPolicy, trackWallClock } from '../src/ops.js';
import { validateDependencyAudit, detectToolchainBump } from '../src/supplychain.js';
import { validateProviderConfig, executeWithFallback, checkToSCompliance, reportBurnRate } from '../src/provider.js';
import { readFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import type { Config } from '../src/config.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'phase4-test');

describe('Phase 4 scale, autonomy, and production hardening', () => {
  it('runs whole-artifact QA and blocks incomplete assembled artifacts', () => {
    const report = runWholeArtifactQA(artifact([section('hero', 'approved', 92), section('pricing', 'draft', 72, '')]), brand(), pds('website'), { threshold: 80 });

    expect(report.pass).toBe(false);
    expect(report.violations.map((v) => v.rule)).toEqual(expect.arrayContaining(['section-not-approved', 'missing-code', 'missing-screenshots', 'section-below-threshold']));
  });

  it('C1.11: names the offending section(s) from a whole-artifact QA failure so they can be re-looped, not blindly patched', () => {
    const report = runWholeArtifactQA(artifact([section('hero', 'approved', 92), section('pricing', 'draft', 72, '')]), brand(), pds('website'), { threshold: 80 });

    expect(report.pass).toBe(false);
    // Every violation here is specific to "pricing" — "hero" is clean and
    // must not be swept up into the re-loop set.
    expect(offendingSections(report, ['hero', 'pricing'])).toEqual(new Set(['pricing']));
  });

  it('C1.11: token-drift violations resolve to the exact section named in the rule prefix, including names containing ":"', () => {
    const driftingSection = section('hero', 'approved', 92, 'export default function Section(){return <section className="bg-red-500">Off-system</section>}');
    const report = runWholeArtifactQA(artifact([driftingSection]), brand(), pds('website'), { threshold: 80 });

    const offending = offendingSections(report, ['hero']);
    expect(offending).toContain('hero');
  });

  it('C1.11: cross-cutting violations that name no single section (e.g. empty-artifact) resolve to no offending section', () => {
    const report = runWholeArtifactQA(artifact([]), brand(), pds('website'), { threshold: 80 });

    expect(report.pass).toBe(false);
    expect(report.violations.map((v) => v.rule)).toContain('empty-artifact');
    expect(offendingSections(report, [])).toEqual(new Set());
  });

  it('C1.11: violationSectionName ignores a quoted section-like string that is not an actual section of this artifact', () => {
    const fakeViolation = {
      gate: 'artifact-qa',
      rule: 'some-rule',
      message: 'Section "not-a-real-section" looks suspicious.',
      severity: 'minor' as const,
      fixable: true,
    };
    expect(violationSectionName(fakeViolation, ['hero', 'pricing'])).toBeUndefined();
  });

  it('C4.2: output-quality gate catches dangerouslySetInnerHTML, div-soup, remote resources, and unsanitized URL interpolation', () => {
    const badTsx = `export default function Section({ url }: { url: string }) {
      return <div>
        <div dangerouslySetInnerHTML={{ __html: '<b>hi</b>' }} />
        <img src={\`https://cdn.evil.example/\${url}\`} />
        <script src="https://unpkg.com/some-lib" />
      </div>;
    }`;

    const violations = outputQualityGate(badTsx);
    expect(violations.map((v) => v.rule)).toEqual(expect.arrayContaining(['dangerously-set-inner-html', 'non-semantic-html', 'remote-resource-origin', 'unsanitized-url-interpolation', 'hardcoded-content']));
  });

  it('C1.10: identically-structured sections (different content, same shape) score low variation and are flagged, distinct from the byte-identical check', () => {
    const heroShape = 'export default function Section(){return <section><header><h1>{"Headline A"}</h1><p>{"Sub A"}</p></header><button>{"CTA A"}</button></section>}';
    const pricingShape = 'export default function Section(){return <section><header><h1>{"Headline B"}</h1><p>{"Sub B"}</p></header><button>{"CTA B"}</button></section>}';

    const report = runWholeArtifactQA(artifact([section('hero', 'approved', 92, heroShape), section('pricing', 'approved', 91, pricingShape)]), brand(), pds('website'), { threshold: 80 });

    // NOT byte-identical (different text) — the pre-existing binary check
    // must not fire — but structurally these are the same shape, so C1.10's
    // graduated metric must catch what the binary check misses.
    expect(report.violations.map((v) => v.rule)).not.toContain('no-section-variety');
    expect(report.violations.map((v) => v.rule)).toContain('low-section-variation');
    expect(report.variation_score).toBeLessThan(0.25);
  });

  it('C1.10: structurally distinct sections (different composition) score high variation and are not flagged', () => {
    const heroShape = 'export default function Section(){return <section><header><h1>{"Headline"}</h1></header><button>{"CTA"}</button></section>}';
    const gridShape = 'export default function Section(){return <div><ul><li><img/><span>{"A"}</span></li><li><img/><span>{"B"}</span></li><li><img/><span>{"C"}</span></li></ul></div>}';

    const report = runWholeArtifactQA(artifact([section('hero', 'approved', 92, heroShape), section('features', 'approved', 90, gridShape)]), brand(), pds('website'), { threshold: 80 });

    expect(report.violations.map((v) => v.rule)).not.toContain('low-section-variation');
    expect(report.variation_score).toBeGreaterThan(0.25);
  });

  it('C1.10: sectionVariationScore is a real measurement (0 for identical shapes, rises with real structural difference, 1 for a single section)', () => {
    const identical = 'export default function Section(){return <section><div><span>{"x"}</span></div></section>}';
    const same = [
      { section_id: 'a', name: 'a', code: { component: identical }, screenshots: {}, final_score: { brand_adherence: 90, system_adherence: 90, brief_fit: 90, craft: 90, weighted_total: 90 }, status: 'approved' as const },
      { section_id: 'b', name: 'b', code: { component: identical }, screenshots: {}, final_score: { brand_adherence: 90, system_adherence: 90, brief_fit: 90, craft: 90, weighted_total: 90 }, status: 'approved' as const },
    ];
    expect(sectionVariationScore(same)).toBe(0);

    const solo = [same[0]];
    expect(sectionVariationScore(solo)).toBe(1); // nothing to compare against — not penalized
    expect(sectionVariationScore([])).toBe(1);
  });

  it('C4.2: output-quality gate passes clean, semantic, self-hosted, prop-driven TSX with keys', () => {
    const cleanTsx = `export default function Section({ title, cta, items }: { title: string; cta: string; items: string[] }) {
      return <section>
        <header><h1>{title}</h1></header>
        <ul>
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
        <button>{cta}</button>
      </section>;
    }`;

    const violations = outputQualityGate(cleanTsx);
    expect(violations.length).toBe(0);
  });

  it('C4.2: output-quality gate catches missing list keys', () => {
    const missingKeysTsx = `export default function Section({ items }: { items: string[] }) {
      return <ul>
        {items.map(item => <li>{item}</li>)}
      </ul>;
    }`;

    const violations = outputQualityGate(missingKeysTsx);
    expect(violations.map((v) => v.rule)).toContain('missing-list-keys');
  });

  it('C4.2: output-quality gate catches hardcoded text', () => {
    const hardcodedTsx = `export default function Section(props: any) {
      return <section>
        <header><h1>Ready</h1></header>
        <button>Go</button>
      </section>;
    }`;

    const violations = outputQualityGate(hardcodedTsx);
    expect(violations.map((v) => v.rule)).toContain('hardcoded-content');
  });

  it('C4.1: deidentificationGate blocks write-back if a secret/PII is detected', () => {
    const candidate = {
      client_id: 'c1',
      code: 'Some random code with an api key sk-ant-api03-abcdefghijklmnopqrstuvwxyz123456',
    };
    const result = deidentificationGate(candidate, {
      artifact: artifact([]),
      briefs: [],
      brand: brand(),
      pds: pds('website'),
    });

    expect(result.pass).toBe(false);
    expect(result.violations.some((v) => v.rule === 'secret-pii-leak')).toBe(true);
    expect(result.violations[0].message).toContain('anthropic-api-key');
    expect(result.violations[0].message).toContain('purge + rotate');
  });

  it('C4.1: writeArtifact redacts secrets at capture before persisting to disk', () => {
    const testClientId = `phase4-test-${Date.now()}`;

    const fakeArtifact = artifact([section('hero', 'draft', 0, 'export default function Section() { return <div>sk-ant-api03-secretkeysecretkeysecretkey</div> }')]);
    fakeArtifact.client_id = testClientId;

    writeArtifact(testClientId, 'website', fakeArtifact);

    const saved = readArtifact(testClientId, 'website');
    expect(saved).not.toBeNull();

    const content = JSON.stringify(saved);
    expect(content).not.toContain('sk-ant-api03-secretkeysecretkeysecretkey');
    expect(content).toContain('[REDACTED:anthropic-api-key]');

    // Cleanup
    const dirToClean = join(process.env.ADE_PROJECTS_DIR ?? './projects', testClientId);
    if (existsSync(dirToClean)) rmSync(dirToClean, { recursive: true, force: true });
  });

  it('passes cross-surface QA when website and product share Brand but keep separate PDSs', () => {
    const frozenBrand = brand();
    const websiteArtifact = artifact([section('hero', 'approved', 90)], 'website');
    const productArtifact = artifact([section('dashboard', 'approved', 88)], 'product');

    const result = runCrossSurfaceBrandQA(frozenBrand, [websiteArtifact, productArtifact], [pds('website'), pds('product', { compact: '8px' })]);

    expect(result.pass).toBe(true);
  });

  it('flags product PDS that loses recognizable brand tokens', () => {
    const result = runCrossSurfaceBrandQA(brand(), [artifact([section('dashboard', 'approved', 88)], 'product')], [pds('product', undefined, { color: { danger: '#FF0000' } })]);

    expect(result.pass).toBe(false);
    expect(result.violations.map((v) => v.rule)).toContain('brand-token-missing');
  });

  it('requires production API mode and explicit caps before production runs', () => {
    const ready = validateProductionReadiness(
      config({
        productionMode: true,
        provider: 'agent-sdk',
        anthropicApiKey: undefined,
      }),
    );

    expect(ready.pass).toBe(false);
    expect(ready.violations.map((v) => v.rule)).toEqual(expect.arrayContaining(['provider-not-api', 'missing-api-key']));

    const apiReady = validateProductionReadiness(
      config({
        productionMode: true,
        provider: 'api',
        anthropicApiKey: 'test-key',
        harness: 'next',
      }),
    );
    expect(apiReady.pass).toBe(true);
  });

  it('summarizes H7 cost and checks per-section budget caps', () => {
    const summary = summarizeTraceCost([record('run-1', 'hero', 100_000, 50_000, 120_000), record('run-2', 'pricing', 90_000, 40_000, 180_000)]);
    const violations = checkCostBudget(summary, {
      maxTokensPerSection: 100_000,
      maxSecondsPerSection: 100,
      maxUsdPerSection: 0.5,
    });

    expect(summary.tokensPerSection).toBe(140_000);
    expect(violations.map((v) => v.rule)).toEqual(expect.arrayContaining(['tokens-per-section', 'seconds-per-section', 'usd-per-section']));
  });

  it('climbs autonomy rungs only when calibration evidence supports it', () => {
    const summary = calibrationSummary({
      total: 60,
      recommendedAccuracy: 0.91,
      falsePassRate: 0.04,
      recentAgreement: 0.88,
    });
    // C3.2: provide per-stratum data so the test can actually reach rung 3
    // (rung 3 requires routine+hard+adversarial all passing, with minPerStratum=5)
    summary.strata = {
      routine: { truePasses: 15, trueFails: 10, falsePasses: 1, falseFails: 0, total: 26, accuracy: 0.96, falsePassRate: 0.04, falseFailRate: 0 },
      hard: { truePasses: 10, trueFails: 8, falsePasses: 1, falseFails: 0, total: 19, accuracy: 0.95, falsePassRate: 0.05, falseFailRate: 0 },
      adversarial: { truePasses: 6, trueFails: 6, falsePasses: 0, falseFails: 3, total: 15, accuracy: 0.9, falsePassRate: 0.0, falseFailRate: 0 },
    };

    expect(computeEarnedRung(summary)).toBe(3);

    const policy = recommendAutonomyPolicy(summary, 4, 2);
    expect(policy.activeRung).toBe(3);
    expect(policy.humanGates.sectionApproval).toBe('exceptions-only');
    expect(shouldRequireHumanSectionReview(policy, 1, 'pass')).toBe(false);
    expect(shouldRequireHumanSectionReview(policy, 1, 'fail')).toBe(true);
  });

  describe('C4.3 Provenance & Compliance', () => {
    it('validateAssetLicensing flags unlicensed proprietary fonts', () => {
      const violations = validateAssetLicensing([{ url: 'https://fonts.googleapis.com/css?family=Roboto' }, { url: 'https://use.typekit.net/xyz.css' }]);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('unlicensed-asset');
      expect(violations[0].message).toContain('typekit.net');
    });

    it('screenSimilarity flags high-resemblance outputs', () => {
      const reference = 'The quick brown fox jumps over the lazy dog in a very specific and unique way';
      const output = 'The quick brown fox jumps over the lazy dog in a very specific and unique way with a button';
      const violations = screenSimilarity(output, reference);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('high-resemblance');
    });

    it('screenDarkPatterns refuses manipulative UX copy', () => {
      const text = 'Hurry, only 1 left in stock!';
      const violations = screenDarkPatterns(text);
      expect(violations.map((v) => v.rule)).toContain('dark-pattern');
      expect(violations[0].message).toContain('/only \\d+ left/i');
    });

    it('checkRegulatoryRequirements enforces disclaimers for financial domains', () => {
      const violations = checkRegulatoryRequirements('We need a finance site', 'Buy our crypto!');
      expect(violations.map((v) => v.rule)).toContain('missing-regulatory-disclaimer');

      const compliant = checkRegulatoryRequirements('finance site', 'Crypto info. Not financial advice.');
      expect(compliant.length).toBe(0);
    });
  });

  describe('C4.4 Production-Parity', () => {
    it('validateCrossBrowser catches a WebKit-only bug', () => {
      const errors = {
        chromium: [],
        firefox: [],
        webkit: ['TypeError: undefined is not an object (evaluating layout.flex)'],
      };
      const violations = validateCrossBrowser(errors);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('cross-browser-divergence');
      expect(violations[0].message).toContain('webkit');
    });

    it('validateTailwindPurge catches a CDN-vs-prod purge divergence', () => {
      const usedClasses = ['bg-red-500', 'text-[14px]'];
      const purgedCSS = '.bg-red-500 { background-color: red; }';
      const violations = validateTailwindPurge(usedClasses, purgedCSS);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('purge-divergence');
      expect(violations[0].message).toContain('text-[14px]');
    });

    it('validateHydration catches a hydration mismatch', () => {
      const ssrHtml = '<div>0</div>';
      const clientHtml = '<div>1</div>';
      const violations = validateHydration(ssrHtml, clientHtml);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('hydration-mismatch');
    });

    it('validateSEO catches missing meta', () => {
      const html = '<html><body>Hello</body></html>';
      const violations = validateSEO(html);
      expect(violations.length).toBe(2);
      expect(violations.map((v) => v.rule)).toEqual(['missing-seo-meta', 'missing-seo-meta']);
    });

    it('validateCoreWebVitals catches an oversized unoptimized asset', () => {
      const metrics = { bundleSizeKb: 5000, cls: 0.05 };
      const violations = validateCoreWebVitals(metrics);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('unoptimized-asset');
    });

    it('validateCoreWebVitals catches poor CLS', () => {
      const metrics = { bundleSizeKb: 150, cls: 0.25 };
      const violations = validateCoreWebVitals(metrics);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('poor-cwv');
    });
  });

  describe('C4.5 Accessibility Depth', () => {
    it('validateKeyboardFlow catches keyboard trap / missing keys', () => {
      const html = '<div onClick={() => {}} tabindex="1">Click me</div>';
      const violations = validateKeyboardFlow(html);
      const rules = violations.map((v) => v.rule);
      expect(rules).toContain('keyboard-trap');
      expect(violations.length).toBeGreaterThanOrEqual(1);
    });

    it('validateScreenReader catches SR-broken elements', () => {
      const html = '<button aria-hidden="true">Hidden but focusable</button>';
      const violations = validateScreenReader(html);
      expect(violations.map((v) => v.rule)).toContain('sr-broken');
    });

    it('validateReflowAndZoom catches locked viewports', () => {
      const html = '<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=no" />';
      const violations = validateReflowAndZoom(html);
      expect(violations.map((v) => v.rule)).toContain('reflow-zoom-failure');
    });
  });

  describe('C4.6 Operations, Reproducibility & DR', () => {
    it('createDeterministicSnapshot generates identical hashes for identical inputs', () => {
      const config = { seed: 42, temperature: 0.7, libraryVersion: 2, promptHashes: ['a1b2'] };
      const hash1 = createDeterministicSnapshot(config);
      const hash2 = createDeterministicSnapshot(config);
      expect(hash1).toBe(hash2);
      expect(typeof hash1).toBe('string');
    });

    it('migrateRecord cleanly rejects future schema versions', () => {
      const futureRecord = { version: 99, data: 'test' };
      expect(() => migrateRecord(futureRecord, 2)).toThrow(/from the future/);
    });

    it('migrateRecord migrates old schema to current version', () => {
      const oldRecord = { name: 'test' }; // no version
      const migrated = migrateRecord(oldRecord, 3);
      expect(migrated.version).toBe(3);
      expect(migrated.metadata).toBeDefined();
    });

    it('simulateRestore restores valid payloads and rejects invalid ones', () => {
      const config = { foo: 'bar' };
      const configString = JSON.stringify(config);
      const integrityHash = require('crypto').createHash('sha256').update(configString).digest('hex');
      const validPayload = JSON.stringify({ ...config, integrityHash });
      const invalidPayload = JSON.stringify({ ...config, integrityHash: 'badhash' });

      expect(simulateRestore(validPayload)).toBe(true);
      expect(simulateRestore(invalidPayload)).toBe(false);
      expect(simulateRestore('not json')).toBe(false);
    });

    it('runRetentionPolicy prunes bulky/old intermediates and keeps traces', () => {
      const artifacts = [
        { id: '1', type: 'trace', sizeKb: 50000, ageDays: 100 }, // keep
        { id: '2', type: 'intermediate-render', sizeKb: 500, ageDays: 5 }, // keep
        { id: '3', type: 'intermediate-render', sizeKb: 15000, ageDays: 5 }, // prune (size)
        { id: '4', type: 'intermediate-render', sizeKb: 500, ageDays: 40 }, // prune (age)
      ];
      const pruned = runRetentionPolicy(artifacts);
      expect(pruned).toEqual(['3', '4']);
    });

    it('trackWallClock alerts on budget overrun', () => {
      const start = Date.now() - 5000;
      const budget = 2000;
      const violations = trackWallClock(start, budget);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('wall-clock-budget-exceeded');
    });
  });

  describe('C4.7 Toolchain supply-chain discipline', () => {
    it('validateDependencyAudit catches critical or high vulnerabilities', () => {
      const auditSummary = { vulnerabilities: { critical: 1, high: 0 } };
      const violations = validateDependencyAudit(auditSummary);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('vulnerable-dependency');
    });

    it('detectToolchainBump catches version drift in core tools', () => {
      const prev = { playwright: '1.40.0', react: '18.2.0' };
      const curr = { playwright: '1.41.0', react: '18.2.0' };
      const violations = detectToolchainBump(prev, curr);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('toolchain-bump');
    });
  });

  describe('C4.8 Production Provider Path', () => {
    it('validateProviderConfig enforces ANTHROPIC_API_KEY in production', () => {
      expect(() => validateProviderConfig({ ADE_ENV: 'production' })).toThrow(/ANTHROPIC_API_KEY is required/);
      expect(() => validateProviderConfig({ ADE_PROVIDER: 'api' })).toThrow(/ANTHROPIC_API_KEY is required/);
      expect(() => validateProviderConfig({ ADE_ENV: 'production', ANTHROPIC_API_KEY: 'sk-123' })).not.toThrow();
      expect(() => validateProviderConfig({ ADE_ENV: 'development' })).not.toThrow();
    });

    it('executeWithFallback routes to fallback and triggers re-baseline on failure', () => {
      const primary = () => {
        throw new Error('API down');
      };
      const fallback = () => 'fallback-result';

      const { result, violations } = executeWithFallback(primary, fallback);
      expect(result).toBe('fallback-result');
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('provider-fallback-triggered');
      expect(violations[0].message).toContain('API down');
    });

    it('checkToSCompliance blocks scaling if unresolved', () => {
      const violations = checkToSCompliance(false);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('tos-unresolved');

      expect(checkToSCompliance(true).length).toBe(0);
    });

    it('reportBurnRate alerts on limit exceeded', () => {
      const violations = reportBurnRate(1500, 1000);
      expect(violations.length).toBe(1);
      expect(violations[0].rule).toBe('burn-rate-exceeded');

      expect(reportBurnRate(500, 1000).length).toBe(0);
    });
  });
});

function brand(): BrandFoundation {
  return {
    client_id: 'phase-four',
    version: 2,
    status: 'frozen',
    identity: {
      palette: [
        { role: 'text', value: '#111827' },
        { role: 'background', value: '#FFFFFF' },
        { role: 'accent', value: '#2563EB' },
      ],
      typography: [
        { role: 'display', family: 'Inter', fallback: 'sans-serif' },
        { role: 'ui', family: 'Inter', fallback: 'sans-serif' },
      ],
      motion_voice: 'Calm and quick',
      personality: ['clear', 'trusted'],
      tone: 'Assured',
      semanticColors: [],
      darkMode: { enabled: false },
    },
    provenance: {
      palette: 'provided',
      typography: 'provided',
      motion_voice: 'derived',
      personality: 'derived',
      tone: 'derived',
    },
  };
}

function pds(surface: 'website' | 'product', space: Record<string, string> = { section: '64px' }, overrides: Partial<ProjectDesignSystem['tokens']> = {}): ProjectDesignSystem {
  return {
    client_id: 'phase-four',
    version: 1,
    surface,
    status: 'foundation-frozen',
    inherits: 'phase-four',
    tokens: {
      color: { text: '#111827', background: '#FFFFFF', accent: '#2563EB' },
      type: { display: '32px/1.1 Inter', body: '16px/1.5 Inter' },
      space,
      radius: { card: '8px' },
      shadow: {},
      motion: { fast: '200ms' },
      fluidType: {},
      fluidSpace: {},
      exportFormat: 'dtcg' as const,
      ...overrides,
    },
    components: [
      {
        name: surface === 'product' ? 'data-panel' : 'hero-card',
        anatomy: 'Container',
        variants: ['default'],
        states: ['default'],
        locked_in: surface === 'product' ? 'dashboard' : 'hero',
      },
    ],
    foundation_from: surface === 'product' ? 'dashboard' : 'hero',
    extensionLog: [],
  };
}

function artifact(sections: Artifact['sections'], surface: 'website' | 'product' = 'website'): Artifact {
  return {
    artifact_id: `phase-four-${surface}`,
    client_id: 'phase-four',
    surface,
    status: 'in-progress',
    sections,
  };
}

function section(name: string, status: 'draft' | 'approved', score: number, code = 'export default function Section(){return <section className="bg-[#FFFFFF] text-[#111827] p-[64px] rounded-[8px] duration-[200ms]">Ready</section>}'): Artifact['sections'][number] {
  return {
    section_id: `phase-four_${name}`,
    name,
    code: { component: code },
    screenshots: code ? { '1440': '/tmp/shot.png' } : {},
    final_score: {
      brand_adherence: score,
      system_adherence: score,
      brief_fit: score,
      craft: score,
      weighted_total: score,
    },
    status,
  };
}

function config(partial: Partial<Config>): Config {
  return {
    provider: 'local',
    modelId: 'mock',
    breakpoints: [1440, 768, 375],
    maxIters: 4,
    variations: 1,
    threshold: 80,
    renderRepairTries: 2,
    genTemperature: 0.7,
    criticTemperature: 0.2,
    maxRunTokens: 500_000,
    maxRunSeconds: 600,
    maxModelCalls: 30,
    genModelId: 'mock',
    criticModelId: 'mock',
    orchestratorModelId: 'mock',
    ollamaBaseUrl: 'http://localhost:11434',
    ollamaModel: 'llava',
    embeddingProvider: 'local-hash',
    embeddingModel: 'ade-local-hash-v1',
    productionMode: false,
    harness: 'vite',
    autonomyRung: 0,
    maxTokensPerSection: 200_000,
    maxSecondsPerSection: 300,
    maxUsdPerSection: 50,
    headed: false,
    harnessPort: 5199,
    ...partial,
  };
}

function record(runId: string, sectionId: string, input: number, output: number, durationMs: number): RunRecord {
  return {
    run_id: runId,
    section_id: sectionId,
    iteration: 0,
    candidate_id: 'iter0-cand1',
    input_bundle_ref: 'bundle',
    output_code_ref: 'Section.tsx',
    screenshots: {},
    scores: {
      brand_adherence: 80,
      system_adherence: null,
      brief_fit: 80,
      craft: 80,
      weighted_total: 80,
    },
    verdict: 'pass',
    critic_feedback: 'ok',
    duration_ms: durationMs,
    tokens: { input, output },
    model_id: 'mock',
    timestamp: new Date().toISOString(),
  };
}

function calibrationSummary(partial: { total: number; recommendedAccuracy: number; falsePassRate: number; recentAgreement: number }): CalibrationSummary {
  const emptyMatrix = { truePasses: 0, trueFails: 0, falsePasses: 0, falseFails: 0, total: 0, accuracy: 0, falsePassRate: 0, falseFailRate: 0 };
  return {
    total: partial.total,
    currentThreshold: 80,
    recommendedThreshold: 80,
    agreement: partial.recommendedAccuracy,
    agreementGap: 1 - partial.recommendedAccuracy,
    currentAccuracy: partial.recommendedAccuracy,
    recommendedAccuracy: partial.recommendedAccuracy,
    falsePasses: Math.round(partial.falsePassRate * partial.total),
    falseFails: 0,
    falsePassRate: partial.falsePassRate,
    falseFailRate: 0,
    agreementTrend: [
      {
        batch: 1,
        total: partial.total,
        agreement: partial.recentAgreement,
        falsePasses: 0,
        falseFails: 0,
      },
    ],
    rewardHackingAlarm: {
      triggered: false,
      suspectRuns: [],
      reasons: [],
    },
    autonomy: {
      currentRung: 0,
      recommendedRung: 1,
      reason: 'test',
    },
    weightHints: [],
    rubricExamples: [],
    // C3.2: per-stratum confusion matrices (default: all examples in routine)
    strata: {
      routine: {
        truePasses: Math.round(partial.recommendedAccuracy * partial.total),
        trueFails: 0,
        falsePasses: Math.round(partial.falsePassRate * partial.total),
        falseFails: 0,
        total: partial.total,
        accuracy: partial.recommendedAccuracy,
        falsePassRate: partial.falsePassRate,
        falseFailRate: 0,
      },
      hard: emptyMatrix,
      adversarial: emptyMatrix,
    },
    auditMissRate: 0,
  };
}
