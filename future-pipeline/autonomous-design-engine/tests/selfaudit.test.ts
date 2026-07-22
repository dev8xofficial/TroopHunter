import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { runSelfAudit } from '../src/selfaudit.js';

describe('Self-Audit Pass (E3.3 / M20)', () => {
  const testDir = join(__dirname, '.test-audit');

  beforeEach(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
  });

  it('analyzes trace and verdicts to emit proposals', () => {
    // 1. Create trace.jsonl
    const traces = [
      // 4 failed runs (triggers failure proposal)
      { run_id: 'fail-1', section_id: '1', iteration: 0, candidate_id: 'c1', input_bundle_ref: 'a', output_code_ref: 'b', screenshots: {}, verdict: 'fail', critic_feedback: '', duration_ms: 0, tokens: { input: 0, output: 0 }, model_id: 'm1', timestamp: '2026', scores: { brand_adherence: 0, brief_fit: 0, craft: 0, weighted_total: 0, system_adherence: null } },
      { run_id: 'fail-2', section_id: '1', iteration: 0, candidate_id: 'c1', input_bundle_ref: 'a', output_code_ref: 'b', screenshots: {}, verdict: 'fail', critic_feedback: '', duration_ms: 0, tokens: { input: 0, output: 0 }, model_id: 'm1', timestamp: '2026', scores: { brand_adherence: 0, brief_fit: 0, craft: 0, weighted_total: 0, system_adherence: null } },
      { run_id: 'fail-3', section_id: '1', iteration: 0, candidate_id: 'c1', input_bundle_ref: 'a', output_code_ref: 'b', screenshots: {}, verdict: 'fail', critic_feedback: '', duration_ms: 0, tokens: { input: 0, output: 0 }, model_id: 'm1', timestamp: '2026', scores: { brand_adherence: 0, brief_fit: 0, craft: 0, weighted_total: 0, system_adherence: null } },
      { run_id: 'fail-4', section_id: '1', iteration: 0, candidate_id: 'c1', input_bundle_ref: 'a', output_code_ref: 'b', screenshots: {}, verdict: 'fail', critic_feedback: '', duration_ms: 0, tokens: { input: 0, output: 0 }, model_id: 'm1', timestamp: '2026', scores: { brand_adherence: 0, brief_fit: 0, craft: 0, weighted_total: 0, system_adherence: null } },
      // 2 recurring hard gate violations
      {
        run_id: 'hard-1',
        section_id: '1',
        iteration: 0,
        candidate_id: 'c1',
        input_bundle_ref: 'a',
        output_code_ref: 'b',
        screenshots: {},
        verdict: 'pass',
        critic_feedback: '',
        duration_ms: 0,
        tokens: { input: 0, output: 0 },
        model_id: 'm1',
        timestamp: '2026',
        scores: { brand_adherence: 85, brief_fit: 85, craft: 85, weighted_total: 85, system_adherence: null },
        hard_violations: ['Contrast: text too low', 'Other: x'],
      },
      {
        run_id: 'hard-2',
        section_id: '1',
        iteration: 0,
        candidate_id: 'c1',
        input_bundle_ref: 'a',
        output_code_ref: 'b',
        screenshots: {},
        verdict: 'pass',
        critic_feedback: '',
        duration_ms: 0,
        tokens: { input: 0, output: 0 },
        model_id: 'm1',
        timestamp: '2026',
        scores: { brand_adherence: 85, brief_fit: 85, craft: 85, weighted_total: 85, system_adherence: null },
        hard_violations: ['Contrast: text too low'],
      },
      // 2 low scoring briefs (blind spots)
      { run_id: 'low-1', section_id: '1', iteration: 0, candidate_id: 'c1', input_bundle_ref: 'a', output_code_ref: 'b', screenshots: {}, verdict: 'pass', critic_feedback: 'Terrible layout.', duration_ms: 0, tokens: { input: 0, output: 0 }, model_id: 'm1', timestamp: '2026', scores: { brand_adherence: 45, brief_fit: 45, craft: 45, weighted_total: 45, system_adherence: null } },
      { run_id: 'low-2', section_id: '1', iteration: 0, candidate_id: 'c1', input_bundle_ref: 'a', output_code_ref: 'b', screenshots: {}, verdict: 'pass', critic_feedback: 'Needs work.', duration_ms: 0, tokens: { input: 0, output: 0 }, model_id: 'm1', timestamp: '2026', scores: { brand_adherence: 55, brief_fit: 55, craft: 55, weighted_total: 55, system_adherence: null } },
    ];
    writeFileSync(join(testDir, 'trace.jsonl'), traces.map((t) => JSON.stringify(t)).join('\n'));

    // 2. Create verdicts.jsonl
    const verdicts = [
      // 1 Disagreement
      { run_id: 'disagree-1', section: 'hero', preferred: 'final', human_verdict: 'approve', critic_verdict: 'fail', rating: 'good', timestamp: '2026-01-01' },
      // 1 Frontier
      { run_id: 'frontier-1', section: 'hero', preferred: 'final', rating: 'strong', human_verdict: 'approve', critic_verdict: 'pass', timestamp: '2026-01-01' },
    ];
    writeFileSync(join(testDir, 'verdicts.jsonl'), verdicts.map((v) => JSON.stringify(v)).join('\n'));

    // Run audit
    runSelfAudit(testDir);

    // Verify proposals
    const proposalsDir = join(testDir, 'proposals');
    expect(existsSync(proposalsDir)).toBe(true);

    const failureContent = readFileSync(join(proposalsDir, 'failure-catalogue-proposals.md'), 'utf-8');
    const constContent = readFileSync(join(proposalsDir, 'constitution-amendment-proposals.md'), 'utf-8');
    const evalContent = readFileSync(join(proposalsDir, 'frontier-eval-cases.md'), 'utf-8');

    // Check failure catalogue
    expect(failureContent).toContain('Recurring Hard-Gate: Contrast');
    expect(failureContent).toContain('fail-1');
    expect(failureContent).toContain('4 overall failed runs');

    // Check constitution amendment
    expect(constContent).toContain('disagree-1');
    expect(constContent).toContain('Human: approve');
    expect(constContent).toContain('Critic: fail');

    // Check eval cases
    expect(evalContent).toContain('Novel High-Quality Patterns');
    expect(evalContent).toContain('frontier-1');
    expect(evalContent).toContain('Low-Scoring Blind Spots');
    expect(evalContent).toContain('low-1');
    expect(evalContent).toContain('Terrible layout.');
  });
});
