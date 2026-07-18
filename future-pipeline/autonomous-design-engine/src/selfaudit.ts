/**
 * ADE — Self-Audit & Proposal Pipeline (E3.3)
 *
 * Periodic pass over trace and verdict data. Emits three proposal streams:
 * 1. Failure entries (persistent loop failures)
 * 2. Constitution amendments (recurring guardrail violations)
 * 3. Frontier cases (successful novel patterns)
 *
 * Proposals are routed to the escalation queue for Tier-A batch ratification.
 */

import { emitEscalation } from './escalations.js';
import { readTrace } from './trace.js';
import { readVerdicts } from './verdicts.js';

export function runSelfAudit(outDir: string): void {
  console.log(`\n🔍 Running Self-Audit Pipeline...`);
  
  const traces = readTrace(outDir);
  const verdicts = readVerdicts(outDir);

  let failureProposals = 0;
  let amendmentProposals = 0;
  let frontierProposals = 0;

  // 1. Failure entries: Look for runs that failed and escalated
  const failedRuns = traces.filter(t => t.verdict === 'fail');
  if (failedRuns.length > 3) {
    emitEscalation(outDir, {
      type: 'self_audit',
      runId: 'batch',
      question: `Self-Audit: Detected ${failedRuns.length} frequent failures. Proposal: Refine the generator baseline or constraints for these sections.`
    });
    failureProposals++;
  }

  // 2. Constitution amendments: Look for recurring identical guardrail violations
  const hardViolations = traces.flatMap(t => t.hard_violations || []);
  if (hardViolations.length > 5) {
    emitEscalation(outDir, {
      type: 'self_audit',
      runId: 'batch',
      question: `Self-Audit: Detected ${hardViolations.length} recurring hard guardrail trips. Proposal: Amend the design constitution or relax the guardrail rule.`
    });
    amendmentProposals++;
  }

  // 3. Frontier cases: Look for highly-rated verdicts that aren't in the library yet
  const strongVerdicts = verdicts.filter(v => v.rating === 'strong');
  for (const v of strongVerdicts) {
    emitEscalation(outDir, {
      type: 'self_audit',
      runId: v.run_id,
      question: `Self-Audit: Frontier Case detected. Run ${v.run_id} received a 'strong' rating. Proposal: Crystallize into the Library.`
    });
    frontierProposals++;
  }

  console.log(`✅ Self-Audit Complete.`);
  console.log(`   - Failure proposals: ${failureProposals}`);
  console.log(`   - Amendment proposals: ${amendmentProposals}`);
  console.log(`   - Frontier proposals: ${frontierProposals}`);
}
