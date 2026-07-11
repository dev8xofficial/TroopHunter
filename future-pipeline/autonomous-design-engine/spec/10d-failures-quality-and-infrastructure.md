# 10d — Failure Modes: Quality Floor, Storage, Model & Architecture

> Part of the failure-mode catalogue. **Start at [10-failure-modes.md](./10-failure-modes.md)** for the index, mitigation primitives (MP-n), and how to use this document — this file holds the full 8-field entries for the deterministic floor, the plumbing, and system/hypothesis-level risk.

---

## Accessibility & quality floor

### F-QF-01 — Accessibility violations pass
**Level:** spec+impl · **Severity:** High · **Area:** a11y
- **Description:** Output ships with contrast failures, missing alt text, no focus states, poor semantics/keyboard nav.
- **Root cause:** a11y left to the LLM's judgment; not deterministically checked.
- **Detection:** Automated a11y audit (axe-core or equivalent) fails.
- **Impact:** Legal/usability risk; excludes users; quality-floor breach.
- **Mitigation:** Deterministic a11y checks as a **hard gate** (not Critic-judged); brand a11y pre-checked (F-BRD-04) [MP-1].
- **Recovery:** Feed specific a11y failures back; regenerate; block approval until clean.
- **Validation:** Automated a11y audit in the pass gate; zero criticals to pass.

### F-QF-02 — Quality floor LLM-judged (unreliable)
**Level:** spec · **Severity:** Med · **Area:** Quality floor
- **Description:** Objective floor items (responsiveness, contrast, performance, no overflow) are judged by the Critic instead of measured.
- **Root cause:** Over-reliance on the LLM for things that are deterministically checkable.
- **Detection:** Floor violations slip through despite Critic "pass."
- **Impact:** Inconsistent floor enforcement.
- **Mitigation:** Move all objectively-checkable floor items to deterministic checkers; reserve the Critic for subjective quality [MP-1].
- **Recovery:** Add the missing checker; re-gate.
- **Validation:** Each floor item has a deterministic test, not a prompt.

### F-QF-03 — Accessibility depth / false compliance
**Level:** spec+impl · **Severity:** High · **Area:** a11y
- **Description:** axe-core catches only a minority (~30–45%) of WCAG issues; keyboard flow, focus management, screen-reader experience, reduced-motion, cognitive load, and 200%-zoom reflow are untested — so a "passing" gate creates false confidence and legal exposure.
- **Root cause:** Automated a11y treated as complete compliance.
- **Detection:** Manual/AT audits; keyboard/SR test scripts; reflow/zoom checks.
- **Impact:** Inaccessible output ships as "accessible"; ADA/WCAG/EN 301 549 exposure (see [10e](./10e-failures-security-legal-and-production.md), F-LEG).
- **Mitigation:** Treat a11y as a *dimension*, not a binary gate — add keyboard/focus/reduced-motion/reflow checks, periodic manual audits, a11y in the constitution [MP-1, MP-12].
- **Recovery:** Fix and re-audit.
- **Validation:** Keyboard-trap / SR-broken fixtures; assert detection beyond axe.

---

## Storage, versioning & data integrity

### F-STO-01 — Partial write / corruption
**Level:** impl · **Severity:** High · **Area:** Storage
- **Description:** A crash mid-write leaves a store/file half-written and unreadable.
- **Root cause:** Non-atomic writes.
- **Detection:** Parse/load error; checksum mismatch.
- **Impact:** Lost brand/system/artifact/trace; broken project.
- **Mitigation:** Atomic writes (temp + rename), checksums, schema-validate on read [MP-8].
- **Recovery:** Restore last good version; replay from trace if possible.
- **Validation:** Crash-injection during writes; assert no corrupted state.

### F-STO-02 — Un-versioned mutation of a hard store
**Level:** impl · **Severity:** High · **Area:** Storage / consistency
- **Description:** Brand/Design-System changes with no version/history.
- **Root cause:** In-place mutation; no append-only discipline.
- **Detection:** Hard-store content changed but no version bump/audit entry.
- **Impact:** Silent inconsistency (F-BRD-02); can't roll back or audit.
- **Mitigation:** Append-only versioning for all hard stores; every change is a new immutable version [MP-8].
- **Recovery:** Restore the prior version.
- **Validation:** Assert each hard-store change produces a new version with provenance.

### F-STO-03 — Concurrent-run race condition
**Level:** impl · **Severity:** High · **Area:** Storage / concurrency
- **Description:** Two runs touch the same client's stores simultaneously and clobber each other (e.g. both crystallize, both write-back).
- **Root cause:** No locking/isolation across concurrent runs.
- **Detection:** Lost updates; inconsistent system state; interleaved trace.
- **Impact:** Corrupted brand/system/library; non-reproducible behavior.
- **Mitigation:** Per-client locking or optimistic concurrency with version preconditions; isolate run workspaces [MP-8].
- **Recovery:** Reconcile from versions; re-run the loser.
- **Validation:** Concurrent-run stress test; assert no lost updates.

### F-STO-04 — Trace loss (measurement substrate)
**Level:** impl · **Severity:** High · **Area:** Storage / measurement
- **Description:** `trace.json` (iterations/scores/tokens) is not written or is lost.
- **Root cause:** Trace written only at the end; crash loses it; not flushed.
- **Detection:** Missing/empty trace after a run.
- **Impact:** Can't validate any hypothesis (08) or debug the loop — flies blind.
- **Mitigation:** Append each iteration to the trace immediately (not at the end); durable, atomic appends [MP-8].
- **Recovery:** Partial trace still usable; reconstruct from iteration dirs.
- **Validation:** Kill mid-run; assert completed iterations are persisted.

### F-STO-05 — Orphaned / dangling references
**Level:** impl · **Severity:** Med · **Area:** Storage / integrity
- **Description:** An artifact references a deleted/renamed design system or brand; a Library entry's provenance points nowhere.
- **Root cause:** Deletes without referential-integrity checks.
- **Detection:** Reference resolution fails; integrity scan finds dangling links.
- **Impact:** Broken regeneration/audit; confusing state.
- **Mitigation:** Referential-integrity checks; soft-delete/archive instead of hard delete; cascade rules [MP-8].
- **Recovery:** Re-link or restore the target; mark orphans.
- **Validation:** Integrity scan in tests after deletes.

---

## Model & integration

### F-MOD-01 — Model API failure (429/5xx/timeout)
**Level:** impl · **Severity:** Med · **Area:** Model
- **Description:** Generator/Critic calls fail with rate-limit, server, or timeout errors.
- **Root cause:** Provider limits/outages; large requests.
- **Detection:** Non-2xx responses; timeouts.
- **Impact:** Loop stalls; partial runs.
- **Mitigation:** Retries with backoff, sane timeouts, stream large outputs, respect rate limits [MP-11].
- **Recovery:** Resume from the last persisted iteration (trace).
- **Validation:** Fault-injection on API calls; assert retry/resume.

### F-MOD-02 — Benign-task refusal
**Level:** impl · **Severity:** Med · **Area:** Model
- **Description:** A safety classifier refuses a legitimate design request.
- **Root cause:** False-positive refusal on benign content.
- **Detection:** `stop_reason: refusal` on a normal design task.
- **Impact:** Run blocked with no output.
- **Mitigation:** Handle the refusal stop reason; configure refusal fallbacks; rephrase/retry [MP-11].
- **Recovery:** Fallback model / retry; escalate if persistent.
- **Validation:** Simulate a refusal; assert fallback handling.

### F-MOD-03 — Unparseable structured output
**Level:** impl · **Severity:** Med · **Area:** Model / integration
- **Description:** The Critic returns scores/feedback that don't match the expected schema (bad JSON, missing fields).
- **Root cause:** Free-form generation; no structured-output enforcement.
- **Detection:** JSON-schema validation fails on the Critic response.
- **Impact:** Loop can't make a decision; crash if unhandled.
- **Mitigation:** Structured outputs / schema-constrained responses; validate + one re-ask on failure [MP-1, MP-11].
- **Recovery:** Re-prompt for valid structure; default to a safe conservative verdict on repeated failure.
- **Validation:** Malformed-response handling tests.

### F-MOD-04 — Cost / latency blowup
**Level:** impl · **Severity:** High · **Area:** Model / performance
- **Description:** `variations × iterations × vision calls` makes a run slow and expensive.
- **Root cause:** Unbounded loops; too many variations; large contexts.
- **Detection:** Tokens/section and wall-clock exceed budget (tracked from trace).
- **Impact:** Unsustainable cost; slow iteration.
- **Mitigation:** Bounded loops + budgets; "explore early (3 candidates), polish late (1)"; per-section scope; prompt-cache the stable bundle prefix [MP-5, MP-11].
- **Recovery:** Cap and escalate; reduce variations.
- **Validation:** Track cost/latency per section (H7); alert on budget breach.

### F-MOD-05 — Silent model-version regression
**Level:** spec+impl · **Severity:** Med · **Area:** Model
- **Description:** A model/version change shifts behavior (quality, style, token counts) without notice.
- **Root cause:** Unpinned model; provider updates.
- **Detection:** Metric shift after a version change; style drift.
- **Impact:** Unexplained quality/cost changes; broken calibration.
- **Mitigation:** Pin model ids; record the model id in every trace; re-baseline metrics on change [MP-11].
- **Recovery:** Roll back to the pinned version; recalibrate.
- **Validation:** Regression suite across model versions before adopting.

### F-MOD-06 — Context-window overflow
**Level:** impl · **Severity:** Med · **Area:** Model
- **Description:** The assembled bundle (refs + memory + context + content) exceeds the model's window.
- **Root cause:** Over-stuffing inputs; not honoring the context-economy design.
- **Detection:** Context-length error or silent truncation.
- **Impact:** Failed calls or dropped constraints (silent quality loss).
- **Mitigation:** Retrieval (top-k), vision over text, per-section scope, trimmed visual context ([02 §4](./02-architecture.md)) [MP-5].
- **Recovery:** Trim inputs by priority (hard kept, soft trimmed); retry.
- **Validation:** H7 — tokens/section flat vs refs & Library size; assert no overflow.

---

## Architecture & hypothesis-level failures

### F-SPEC-01 — Core premise H1 false
**Level:** spec · **Severity:** High · **Area:** Architecture
- **Description:** Seeing its own render does **not** help the agent design better — the loop adds no value.
- **Root cause:** The central assumption of ADE could be wrong.
- **Detection:** MVP shows no upward score/quality trend across iterations (H1 fails).
- **Impact:** The entire approach is invalidated.
- **Mitigation:** Build the MVP **first and cheap** specifically to test H1 before any larger investment [MP-5].
- **Recovery:** Stop; rethink the premise (better critique, different signal) before building more.
- **Validation:** H1 ([08](./08-hypotheses-and-validation.md)) — decisive go/no-go gate.

### F-SPEC-02 — Taste ceiling caps autonomy
**Level:** spec · **Severity:** High · **Area:** Architecture
- **Description:** The Critic never reaches reliability good enough to remove human gates; full autonomy stays out of reach.
- **Root cause:** Judging good design without a reference may be fundamentally hard (open question #1).
- **Detection:** Critic↔human agreement plateaus below a usable threshold (H3/H8).
- **Impact:** Goal B's autonomy ceiling is capped; the product stays human-assisted, not autonomous.
- **Mitigation:** Treat taste as the long-term R&D focus; keep humans in the loop; harvest value at lower rungs meanwhile [MP-3, MP-12].
- **Recovery:** Operate at the highest *proven* rung; keep investing in calibration.
- **Validation:** H8 trend over many batches; explicit ceiling acknowledgment.

### F-SPEC-03 — Soft/hard conflation in design
**Level:** spec · **Severity:** High · **Area:** Architecture
- **Description:** The build blurs soft and hard inputs — making the system either rigid (clones) or incoherent (drifts).
- **Root cause:** The soft/hard model (the spine of the spec) not carried into implementation.
- **Detection:** References behaving as law (rigid) or brand behaving as suggestion (drift).
- **Impact:** Loses both autonomy and consistency — the core value proposition.
- **Mitigation:** Authority tags on every input at assembly; conflict precedence enforced; Critic scores hard-adherence ([04 §7](./04-memory-and-consistency.md)) [MP-6].
- **Recovery:** Re-tag inputs; fix precedence; regenerate.
- **Validation:** Tests that hard always wins over soft; references never override brand.

### F-SPEC-04 — MVP over-scoping
**Level:** spec · **Severity:** Med · **Area:** Process
- **Description:** Building memory/brand/library before the eyes loop is proven.
- **Root cause:** Skipping the capability order (eyes → memory → taste).
- **Detection:** Large surface built before any H1 result.
- **Impact:** Wasted effort if H1 fails; slow, expensive first result.
- **Mitigation:** Strict phase gating; MVP = the loop only, no stores ([07](./07-mvp-cli.md), [09 §1](./09-roadmap-and-open-questions.md)) [MP-5].
- **Recovery:** Cut scope back to the loop; defer the rest.
- **Validation:** Phase-gate review; MVP done-criteria met before phase 1.

### F-SPEC-05 — Measurement theater
**Level:** spec · **Severity:** High · **Area:** Process / measurement
- **Description:** Reporting predicted or gamed metrics as if they were real, observed quality (the old pipeline's exact sin).
- **Root cause:** Trusting Critic scores without human ground truth; optimizing proxies.
- **Detection:** Critic scores rise while human ratings don't (the divergence in F-JDG-02).
- **Impact:** False confidence; shipping worse work while "metrics improve."
- **Mitigation:** Report **observed** numbers only; always pair Critic metrics with periodic human ground truth; watch the Critic-vs-human gap [MP-3, MP-12].
- **Recovery:** Re-anchor on human verdicts; discount proxy-only gains.
- **Validation:** Every reported quality number traces to a human-validated measurement (08 §4 decision rules).

### F-SPEC-06 — Evaluation overfitting / benchmark Goodhart
**Level:** spec · **Severity:** High · **Area:** Process / measurement
- **Description:** The system is tuned to the golden-core benchmark until its scores rise but generalization does not — Goodhart's law on the evaluation itself; a stale golden core compounds it (yesterday's "90" looks dated today).
- **Root cause:** A fixed, small, aging benchmark optimized against directly.
- **Detection:** Benchmark gains that do not transfer to fresh held-out briefs; benchmark age.
- **Impact:** Measurement theater one level up (F-SPEC-05); false confidence in the whole outer loop.
- **Mitigation:** A growing, refreshed benchmark with rotating held-out cases and system-proposed adversarial cases ([13](./13-evaluation-charter.md)); track transfer to *fresh* briefs, not just the core [MP-3, MP-12].
- **Recovery:** Refresh/expand the benchmark; discount non-transferring gains.
- **Validation:** Monitor the fresh-held-out transfer gap alongside core scores.
