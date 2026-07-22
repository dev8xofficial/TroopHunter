import { readLibrary, writeLibrary } from './library.js';
import { ModelProvider } from './model.js';
import { LibraryEntry } from './schema.js';

function parseJsonObject(text: string): { ok: true; value: any } | { ok: false; error: string } {
  let jsonText = text.trim();
  const fenceMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch && fenceMatch[1]) {
    jsonText = fenceMatch[1].trim();
  }
  try {
    return { ok: true, value: JSON.parse(jsonText) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const CURATION_AGE_DAYS = 30;
const CURATION_CONFIDENCE_THRESHOLD = 0.5;

export async function runPeriodicCuration(provider: ModelProvider): Promise<void> {
  const entries = readLibrary();
  const now = Date.now();
  let mutated = false;

  console.log(`\n🔍 Starting Library Curation Pass...`);

  for (const entry of entries) {
    if (entry.retired) continue;
    if (entry.outcome.confidence < CURATION_CONFIDENCE_THRESHOLD) continue;

    const referenceTime = new Date(entry.created_at).getTime();
    const ageDays = (now - referenceTime) / (1000 * 60 * 60 * 24);

    if (ageDays < CURATION_AGE_DAYS) continue;

    console.log(`\nEvaluating entry [${entry.id}] "${entry.title}" (Age: ${Math.round(ageDays)} days, Confidence: ${entry.outcome.confidence.toFixed(2)})`);

    const result = await evaluateEntryCuration(provider, entry);
    if (!result.pass) {
      console.log(`❌ Curation rejected: ${result.reason}`);
      console.log(`   Action: Retiring entry.`);
      entry.retired = true;
      entry.outcome.confidence = 0.1;
      mutated = true;
    } else {
      console.log(`✅ Curation passed. Entry remains active.`);
    }
  }

  if (mutated) {
    writeLibrary(entries);
    console.log(`\n💾 Saved updated library version with curated entries.`);
  } else {
    console.log(`\n✨ No entries required retirement.`);
  }
}

async function evaluateEntryCuration(provider: ModelProvider, entry: LibraryEntry): Promise<{ pass: boolean; reason: string }> {
  const system = `You are a strict curation gatekeeper for a design system library.
Your job is to evaluate older design patterns to ensure they are still high-quality, generic enough to be reusable, and not overly tied to one specific brand.
If the pattern contains obvious anti-patterns, hyper-specific client details, or bad design practices, reject it.

Return ONLY JSON with this shape:
{
  "pass": boolean,
  "reason": "string explaining the decision"
}`;

  const user = `Evaluate this library entry:

Title: ${entry.title}
Intent: ${entry.intent}
Construction:
${entry.construction.map((c) => `- ${c}`).join('\n')}
Rationale:
${entry.rationale.map((r) => `- ${r}`).join('\n')}
Avoid:
${entry.avoid.map((a) => `- ${a}`).join('\n')}

Should this entry remain in the high-confidence pool?`;

  try {
    const response = await provider.complete({
      system,
      messages: [{ role: 'user', content: user }],
      maxTokens: 500,
      temperature: 0,
      schemaName: 'curationGate',
    });

    const parsed = parseJsonObject(response.text);
    if (parsed.ok && typeof parsed.value.pass === 'boolean') {
      return {
        pass: parsed.value.pass,
        reason: parsed.value.reason || 'No reason provided',
      };
    }
  } catch (err) {
    console.warn(`⚠️ Model call failed during curation of ${entry.id}:`, err);
  }

  return { pass: true, reason: 'Evaluation failed or returned invalid format; failing open.' };
}
