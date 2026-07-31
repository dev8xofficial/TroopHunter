/**
 * ADE Tests — Escalations (E1.2)
 *
 * emit → list → answer → list-shows-resolved. Also verifies the exact
 * resume-detection predicate orchestrator.ts uses to find a resolved
 * comprehension escalation for a section (the E1.2 resume fix).
 */

import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { emitEscalation, listEscalations, answerEscalation } from '../src/escalations.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'escalations-test');

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

describe('Escalations (E1.2)', () => {
  it('emits an open escalation and it appears in listEscalations', () => {
    const record = emitEscalation(TEST_DIR, {
      type: 'comprehension',
      runId: 'r1',
      sectionId: 'hero',
      question: 'Is the audience B2B or B2C?',
    });
    expect(record.status).toBe('open');
    const listed = listEscalations(TEST_DIR);
    expect(listed).toHaveLength(1);
    expect(listed[0].id).toBe(record.id);
  });

  it('answerEscalation marks it resolved and records the answer + timestamp', () => {
    const record = emitEscalation(TEST_DIR, {
      type: 'comprehension',
      runId: 'r1',
      sectionId: 'hero',
      question: 'Is the audience B2B or B2C?',
    });
    answerEscalation(TEST_DIR, record.id, 'B2B — enterprise buyers only.');

    const listed = listEscalations(TEST_DIR);
    expect(listed[0].status).toBe('resolved');
    expect(listed[0].answer).toBe('B2B — enterprise buyers only.');
    expect(listed[0].resolvedAt).toBeTruthy();
  });

  it('throws on answering a non-existent escalation id', () => {
    expect(() => answerEscalation(TEST_DIR, 'esc_does_not_exist', 'x')).toThrow('Escalation not found');
  });

  it('the E1.2 resume predicate (orchestrator.ts) correctly finds a resolved comprehension escalation for a section', () => {
    const record = emitEscalation(TEST_DIR, {
      type: 'comprehension',
      runId: 'r1',
      sectionId: 'hero',
      question: 'Missing audience.',
    });
    answerEscalation(TEST_DIR, record.id, 'Home buyers and sellers.');

    // Exact predicate used in orchestrator.ts's resume check.
    const priorEscalations = listEscalations(TEST_DIR);
    const resolved = priorEscalations.find((e) => e.type === 'comprehension' && e.sectionId === 'hero' && e.status === 'resolved' && e.answer);
    expect(resolved).toBeDefined();
    expect(resolved!.answer).toBe('Home buyers and sellers.');
  });

  it('the resume predicate does NOT match an open (unanswered) escalation', () => {
    emitEscalation(TEST_DIR, { type: 'comprehension', runId: 'r1', sectionId: 'hero', question: 'Missing audience.' });

    const priorEscalations = listEscalations(TEST_DIR);
    const resolved = priorEscalations.find((e) => e.type === 'comprehension' && e.sectionId === 'hero' && e.status === 'resolved' && e.answer);
    expect(resolved).toBeUndefined();
  });

  it('the resume predicate does NOT match a resolved escalation for a DIFFERENT section', () => {
    const record = emitEscalation(TEST_DIR, { type: 'comprehension', runId: 'r1', sectionId: 'pricing', question: 'x' });
    answerEscalation(TEST_DIR, record.id, 'answer');

    const priorEscalations = listEscalations(TEST_DIR);
    const resolved = priorEscalations.find((e) => e.type === 'comprehension' && e.sectionId === 'hero' && e.status === 'resolved' && e.answer);
    expect(resolved).toBeUndefined();
  });

  it('the resume predicate does NOT match a resolved escalation of a DIFFERENT type (e.g. budget)', () => {
    const record = emitEscalation(TEST_DIR, { type: 'budget', runId: 'r1', sectionId: 'hero', question: 'x' });
    answerEscalation(TEST_DIR, record.id, 'increase budget');

    const priorEscalations = listEscalations(TEST_DIR);
    const resolved = priorEscalations.find((e) => e.type === 'comprehension' && e.sectionId === 'hero' && e.status === 'resolved' && e.answer);
    expect(resolved).toBeUndefined();
  });
});
