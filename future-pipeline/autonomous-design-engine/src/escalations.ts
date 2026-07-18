/**
 * ADE - Escalation Queue (Phase E1)
 *
 * Park-and-rerun mechanics for human intervention.
 * 
 * @module escalations
 */

import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export interface EscalationRecord {
  id: string;
  type: 'comprehension' | 'budget' | 'oscillation' | 'gate_disagreement' | 'self_audit' | 'other';
  status: 'open' | 'resolved';
  runId: string;
  sectionId?: string;
  question: string;
  answer?: string;
  createdAt: string;
  resolvedAt?: string;
}

export function getEscalationsPath(outDir: string): string {
  return join(outDir, 'escalations.jsonl');
}

export function emitEscalation(outDir: string, input: Omit<EscalationRecord, 'id' | 'status' | 'createdAt'>): EscalationRecord {
  const record: EscalationRecord = {
    id: `esc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    status: 'open',
    createdAt: new Date().toISOString(),
    ...input,
  };

  appendFileSync(getEscalationsPath(outDir), JSON.stringify(record) + '\n', 'utf-8');
  return record;
}

export function listEscalations(outDir: string): EscalationRecord[] {
  const path = getEscalationsPath(outDir);
  if (!existsSync(path)) return [];

  const content = readFileSync(path, 'utf-8');
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));
}

export function answerEscalation(outDir: string, id: string, answer: string): void {
  const records = listEscalations(outDir);
  const index = records.findIndex(r => r.id === id);
  if (index === -1) {
    throw new Error(`Escalation not found: ${id}`);
  }

  records[index].status = 'resolved';
  records[index].answer = answer;
  records[index].resolvedAt = new Date().toISOString();

  const path = getEscalationsPath(outDir);
  writeFileSync(path, records.map(r => JSON.stringify(r)).join('\n') + '\n', 'utf-8');
}
