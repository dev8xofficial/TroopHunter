# 10c — Failure Modes: Memory, Learning, Coherence & Human Feedback

> Part of the failure-mode catalogue. **Start at [10-failure-modes.md](./10-failure-modes.md)** for the index, mitigation primitives (MP-n), and how to use this document — this file holds the full 8-field entries for "getting smarter over time, staying consistent, and the human's role in it."

---

## Memory & retrieval

### F-MEM-01 — Retrieval miss
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** Relevant Library entries aren't returned for a brief.
- **Root cause:** Poor query synthesis; weak embeddings; bad index.
- **Detection:** Known-relevant entry not in top-k; generation lacks available knowledge.
- **Impact:** Library adds no value (undermines H6).
- **Mitigation:** Embed the problem-space synthesis ([03 §2.1](./03-data-model.md)); tune top-k; query expansion [MP-9].
- **Recovery:** Broaden the query; re-retrieve.
- **Validation:** Retrieval recall on a labeled query→entry set.

### F-MEM-02 — Retrieval pollution
**Level:** spec+impl · **Severity:** Med · **Area:** Retrieval
- **Description:** Irrelevant entries are retrieved and distract the Generator.
- **Root cause:** Loose similarity threshold; embedding noise.
- **Detection:** Returned entries off-domain; generation pulled off-brief.
- **Impact:** Quality drag; wasted context.
- **Mitigation:** Similarity threshold + confidence weighting; small top-k; treat as soft only [MP-6, MP-9].
- **Recovery:** Tighten retrieval; regenerate.
- **Validation:** Retrieval precision; ablate retrieval and compare.

### F-MEM-03 — Embedding drift (model change)
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** Changing the embedding model leaves old vectors incompatible with new queries.
- **Root cause:** Vectors not re-embedded after a model swap.
- **Detection:** Retrieval quality collapses after an embedding change; mixed vector dimensions.
- **Impact:** Library effectively breaks.
- **Mitigation:** Version the embedding model; re-embed the whole store on change; store the model id with each vector [MP-8].
- **Recovery:** Bulk re-embed; rebuild the index.
- **Validation:** Re-embed test; retrieval parity before/after.

### F-MEM-04 — Embed-vs-payload violation
**Level:** spec · **Severity:** Med · **Area:** Retrieval
- **Description:** Hex codes / HTML / payload fields get embedded, polluting the vector.
- **Root cause:** Embedding the whole entry instead of the problem-space synthesis.
- **Detection:** Retrieval matches on values, not problems; odd nearest-neighbors.
- **Impact:** Poor matching; the Library retrieves by the wrong signal.
- **Mitigation:** Embed only `intent + context_fit`; keep construction/values as payload ([03 §2.1](./03-data-model.md)).
- **Recovery:** Re-embed with the correct field selection.
- **Validation:** Inspect what's embedded; retrieval quality by problem similarity.

### F-MEM-05 — Cold-start blocks generation
**Level:** impl · **Severity:** Low · **Area:** Retrieval
- **Description:** With an empty Library, retrieval returns nothing and the pipeline errors or stalls.
- **Root cause:** Generation assumes non-empty retrieval.
- **Detection:** Empty top-k path; first-project failure.
- **Impact:** Can't start until the Library is seeded.
- **Mitigation:** Library is **optional** input; the system designs from brand+brief alone (exactly the MVP) [MP-6].
- **Recovery:** Proceed with zero entries.
- **Validation:** Run with an empty Library; assert normal operation (this is the MVP).

### F-MEM-06 — Soft memory obeyed as hard law
**Level:** spec · **Severity:** Med · **Area:** Retrieval
- **Description:** The Generator treats retrieved entries as mandatory, reproducing them instead of synthesizing.
- **Root cause:** Soft/hard distinction not enforced in the prompt.
- **Detection:** Output closely mirrors a Library entry; brief-fit suffers.
- **Impact:** Monoculture; loss of brief-driven novelty.
- **Mitigation:** Explicit "direction, may diverge" framing; Critic rewards brief-fit not entry-resemblance [MP-6].
- **Recovery:** Reframe inputs; regenerate.
- **Validation:** Compare outputs to retrieved entries; resemblance should be low when the brief differs.

### F-MEM-07 — Vector store unavailable / slow
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** The vector DB is down or high-latency.
- **Root cause:** Infra failure; connection limits.
- **Detection:** Retrieval timeout/error.
- **Impact:** Stalls generation if retrieval is on the critical path.
- **Mitigation:** Retrieval is non-blocking — on failure, proceed with brand+brief (degraded, logged); timeouts + retries [MP-5, MP-11].
- **Recovery:** Continue without Library; backfill later.
- **Validation:** Kill the store mid-run; assert graceful degradation.

### F-MEM-08 — Retrieval nondeterminism & flat-file scaling
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** The same brief retrieves different top-k as the Library changes (nondeterministic generation), and flat-file cosine is O(n) so precision/latency degrade as the store grows.
- **Root cause:** Evolving store + linear search; no snapshot.
- **Detection:** Retrieval variance over time; latency/precision vs Library size.
- **Impact:** Non-reproducibility (F-OPS-01); H7 pressure; retrieval-miss (F-MEM-01) at scale.
- **Mitigation:** Snapshot the Library version per run; move to an ANN index (pgvector) with tuned recall [MP-8, MP-9].
- **Recovery:** Pin the Library version; rebuild the index.
- **Validation:** Retrieval parity at a fixed Library version; recall at scale.

### F-MEM-09 — Same-domain retrieval suppresses cross-domain novelty
**Level:** spec · **Severity:** Med · **Area:** Retrieval
- **Description:** Retrieval matches a brief's problem-space to the *most similar* entries — so a fintech brief retrieves fintech patterns, a real-estate brief retrieves real-estate patterns. This is the opposite failure from F-MEM-02 (pollution from *irrelevant* entries): here the entries are *too relevant*, converging generation toward the category mean rather than surfacing the cross-domain transfers (e.g. fintech borrowing editorial restraint from fashion) that produce genuinely differentiated work.
- **Root cause:** Pure similarity-ranked retrieval has no mechanism for deliberate serendipity or cross-domain transfer.
- **Detection:** Retrieved entries are always same-domain; output diversity across same-domain briefs is low; the system never surfaces a cross-domain pattern even when one would fit.
- **Impact:** Works *against* the "distinctiveness over generic" goal (F-GEN-02, [12](./12-design-constitution.md) P4) — the Library can make output more consistently competent and simultaneously more generic.
- **Mitigation:** A deliberate cross-domain / "wildcard" retrieval slot alongside same-domain top-k, tested as research bet **R11** ([14](./14-research-agenda.md)).
- **Recovery:** N/A — a creativity ceiling, not a correctness failure.
- **Validation:** The R11 experiment — human distinctiveness ratings, cross-domain-augmented retrieval vs. same-domain-only.

---

## Library write-back & learning

### F-WB-01 — De-identification leak
**Level:** spec+impl · **Severity:** High · **Area:** Write-back / privacy
- **Description:** A Library entry contains a client's name, literal copy, or exact brand tokens.
- **Root cause:** Abstraction step fails to strip identity.
- **Detection:** Identity scan finds client name/PII/exact hex/verbatim copy in an entry.
- **Impact:** Privacy/confidentiality breach; one client's identity leaks into another's design.
- **Mitigation:** A **de-identification gate** that blocks write-back on any leak; entries store abstracted lessons only ([03 §2.2](./03-data-model.md)) [MP-7].
- **Recovery:** Reject the entry; re-abstract; purge any leaked entry + reindex.
- **Validation:** Adversarial write-back tests; assert the gate blocks identity.

### F-WB-02 — Over- / under-abstraction
**Level:** spec · **Severity:** Med · **Area:** Write-back
- **Description:** Entries are too specific (non-transferable) or too vague (useless).
- **Root cause:** Wrong altitude during distillation (open question #3).
- **Detection:** Entries never retrieved (too specific) or always retrieved but unhelpful (too vague).
- **Impact:** Library doesn't compound (H6).
- **Mitigation:** A **Phase-Exit Review** of each distilled entry's abstraction altitude **before** insert — too-specific or too-vague entries are returned for bounded re-abstraction ([11 §2.3](./11-guardrails-and-invariants.md)) [MP-13]; tag by type (principle/pattern/recipe); favor the mid "pattern" altitude; let retrieval+reuse select altitude [MP-9].
- **Recovery:** Re-distill at a better altitude; merge/split entries.
- **Validation:** Track retrieval+reuse rates by altitude; measure H6.

### F-WB-03 — Dedup failure → duplicate entries
**Level:** impl · **Severity:** Med · **Area:** Write-back
- **Description:** Near-identical entries accumulate instead of merging.
- **Root cause:** No similarity check before insert.
- **Detection:** Many high-similarity entry pairs; library grows without diversity.
- **Impact:** Retrieval returns redundant entries; confidence fragments across duplicates.
- **Mitigation:** On write-back, retrieve nearest entries; merge (raise confidence/add variation) above a similarity threshold ([04 §6](./04-memory-and-consistency.md)) [MP-9].
- **Recovery:** Periodic dedup/merge pass.
- **Validation:** Duplicate-rate metric; merge correctness checks.

### F-WB-04 — Bad-pattern enshrinement
**Level:** spec · **Severity:** High · **Area:** Write-back / learning
- **Description:** A poor or rejected design gets written as a positive pattern, then propagates.
- **Root cause:** Write-back not gated on human verdict; a false-pass (F-JDG-04) feeds the Library.
- **Detection:** Low-quality patterns gaining confidence; later projects degrade.
- **Impact:** Self-reinforcing quality decay across projects.
- **Mitigation:** Only write back **human-approved** artifacts; confidence starts low; verdicts weight entries [MP-9, MP-12].
- **Recovery:** Down-weight/delete the offending entry; re-rank.
- **Validation:** Trace entry provenance → human verdict; assert no unapproved write-backs.

### F-WB-05 — Library poisoning / monoculture
**Level:** spec · **Severity:** Med · **Area:** Learning
- **Description:** One dominant style or a bad batch skews all future retrievals; outputs converge to sameness.
- **Root cause:** Popularity feedback loop; no diversity/decay.
- **Detection:** Declining output diversity; the same few entries always retrieved.
- **Impact:** Homogenized designs; novelty loss.
- **Mitigation:** Confidence decay with age/disuse; diversity-aware retrieval; periodic curation [MP-9, MP-12].
- **Recovery:** Rebalance/curate the Library; inject fresh references.
- **Validation:** Output-diversity metric over time; retrieval entropy.

### F-WB-06 — Confidentiality / strategy leak via patterns
**Level:** spec+impl · **Severity:** High · **Area:** Write-back / privacy
- **Description:** A "de-identified" entry (passing F-WB-01's name/token check) is still specific enough to **re-identify a client** or to leak their confidential **design strategy** to a later (possibly rival) client.
- **Root cause:** De-id checks identity tokens, not strategic specificity.
- **Detection:** Specificity/abstraction review; cross-client similarity scan.
- **Impact:** Confidentiality/contract breach; competitive-intelligence leak.
- **Mitigation:** Abstraction-altitude review at write-back ([11 §2.3](./11-guardrails-and-invariants.md)) that also gates *strategic* specificity; per-client access controls if multi-tenant [MP-7, MP-13].
- **Recovery:** Re-abstract or purge; notify if breached.
- **Validation:** Adversarial write-back that preserves strategy; assert it is blocked.

### F-WB-07 — Approved-then-reconsidered patterns already taught the Library
**Level:** spec · **Severity:** Med · **Area:** Write-back / learning
- **Description:** An artifact is human-approved (a true pass at the time) and written back to the Library — but is later reconsidered as mediocre (e.g. after seeing it in context, or as taste standards rise). Unlike F-WB-04 (a *false* pass feeding the Library), this is a *genuine* pass whose write-back has already happened by the time anyone reconsiders it — there is no mechanism to revisit an entry after the fact.
- **Root cause:** Write-back is a one-time event triggered by approval; there is no periodic re-evaluation of already-written entries against updated taste.
- **Detection:** A human, reviewing older Library entries, flags one as no longer representative of current standards.
- **Impact:** The Library can carry forward lessons that were reasonable once but are now subtly wrong, with no trigger to catch this.
- **Mitigation:** A periodic Library-curation pass (already gestured at by MP-9's "periodic curation") that explicitly re-evaluates older high-confidence entries against current human verdicts, not only new write-backs.
- **Recovery:** Down-weight or retire the reconsidered entry, same mechanism as F-WB-04's recovery.
- **Validation:** A curation pass that surfaces at least one previously-approved entry for human reconsideration.

### F-LRN-01 — No compounding (H6 fails)
**Level:** spec · **Severity:** High · **Area:** Learning
- **Description:** The Library doesn't make later projects better/faster — it's a junk drawer, not a brain.
- **Root cause:** Entry quality, retrieval, or abstraction is too weak to add signal.
- **Detection:** Library-on vs Library-off ablation shows no difference.
- **Impact:** The "gets smarter" premise of Goal B fails; no compounding value.
- **Mitigation:** Fix entry altitude (F-WB-02), retrieval (F-MEM-*), and confidence weighting; gate phase-2 on a passing ablation [MP-9].
- **Recovery:** Iterate on the memory subsystem before scaling.
- **Validation:** H6 ablation across matched briefs.

### F-LRN-02 — Calibration non-transfer across domains
**Level:** spec · **Severity:** Med · **Area:** Learning
- **Description:** Verdicts learned in one domain don't improve judging in another.
- **Root cause:** Domain-specific taste (open question #2).
- **Detection:** Critic improves in-domain but not cross-domain after calibration.
- **Impact:** Must re-learn taste per domain; slower scaling.
- **Mitigation:** Separate universal-craft from domain-style signals; collect verdicts per domain [MP-3].
- **Recovery:** Add domain-specific calibration data.
- **Validation:** Cross-domain transfer study.

---

## Consistency & cross-section coherence

### F-CON-01 — Cross-section drift
**Level:** spec+impl · **Severity:** High · **Area:** Consistency
- **Description:** A later section (About) doesn't match the established hero — different feel/values.
- **Root cause:** Section generated without the frozen system as hard input or without seeing prior sections.
- **Detection:** Token-allowlist check + Critic system_adherence + human "doesn't feel like the same site."
- **Impact:** Incoherent artifact (H4 fails).
- **Mitigation:** Crystallized system as hard law + prior-section screenshots as context for every later section ([04 §3](./04-memory-and-consistency.md)) [MP-1, MP-6].
- **Recovery:** Regenerate the drifting section under the system; never approve drift.
- **Validation:** Multi-section runs; zero token drift + human consistency rating (H4).

### F-CON-02 — Monotony (no variation)
**Level:** spec · **Severity:** Med · **Area:** Consistency
- **Description:** Over-constrained — every section is a near-clone of the hero.
- **Root cause:** Consistency mechanism locks composition, not just primitives.
- **Detection:** Sections look identical; low craft/brief-fit for sections with distinct purposes.
- **Impact:** Boring, ineffective pages.
- **Mitigation:** Lock primitives, free composition ([04 §2](./04-memory-and-consistency.md)); Critic rewards purpose-appropriate variation [MP-3, MP-6].
- **Recovery:** Loosen compositional constraints; regenerate.
- **Validation:** Variation metric across sections alongside consistency.

### F-CON-03 — Whole-artifact incoherence
**Level:** spec · **Severity:** Med · **Area:** Coherence
- **Description:** Sections are individually fine but the assembled page breaks (nav inconsistent, rhythm jumps, spacing between sections off).
- **Root cause:** Per-section generation can't see whole-page relationships.
- **Detection:** Whole-artifact Critic pass flags cross-section issues; human review.
- **Impact:** Poor end-to-end experience despite good parts.
- **Mitigation:** A whole-artifact QA pass over the assembled page ([06 §5](./06-workflows.md)); shared nav/footer as locked components.
- **Recovery:** Re-loop the offending section(s) with whole-page context.
- **Validation:** Assembled-page QA scores; human whole-page rating.

### F-CON-04 — Visual-context overload
**Level:** impl · **Severity:** Low · **Area:** Coherence
- **Description:** Feeding too many prior-section screenshots dilutes attention / blows context.
- **Root cause:** Naive "include all prior sections."
- **Detection:** Rising tokens/section; the Generator ignores context.
- **Impact:** Cost + weaker consistency.
- **Mitigation:** Include the most relevant 1–3 prior sections + the design system, not all [MP-5].
- **Recovery:** Trim context; regenerate.
- **Validation:** Tokens/section flat as section count grows (relates to H7).

---

## Surface: product vs marketing & component/state representation

### F-SUR-01 — App states unrepresented
**Level:** spec · **Severity:** High · **Area:** Surface
- **Description:** A product screen is generated as a single static view; empty/loading/error/filled states are missing.
- **Root cause:** Marketing assumptions (one rendered state) applied to an app (open question #5).
- **Detection:** Screen has no state handling; Critic/human note missing states.
- **Impact:** Broken/incomplete product UI in real use.
- **Mitigation:** For product surfaces, require explicit states per component; the Eyes drive and capture each state ([09 Q5](./09-roadmap-and-open-questions.md)); defer apps until this is built.
- **Recovery:** Re-generate with state requirements; capture all states.
- **Validation:** State-coverage checklist per component; multi-state screenshots.

### F-SUR-02 — Component-state explosion
**Level:** spec · **Severity:** Med · **Area:** Surface
- **Description:** The number of state combinations becomes unbounded and unmanageable.
- **Root cause:** Combinatorial states; no prioritization.
- **Detection:** Exploding state matrix; capture/critique time blows up.
- **Impact:** Cost/latency blowup; incomplete coverage.
- **Mitigation:** Capture a prioritized canonical set of states (default/empty/loading/error/filled), not every combination [MP-5].
- **Recovery:** Reduce to the canonical set.
- **Validation:** Bounded state count; coverage of the canonical set.

### F-SUR-03 — Interaction states not driven
**Level:** spec+impl · **Severity:** Med · **Area:** Surface / Eyes
- **Description:** The Eyes only screenshot the default view; hover/focus/expanded states never get exercised.
- **Root cause:** Capture doesn't drive interactions.
- **Detection:** Only default-state screenshots exist for interactive components.
- **Impact:** Interactive design unjudged; broken states ship.
- **Mitigation:** Playwright drives interactions (hover/click/type) and captures each resulting state [MP-10].
- **Recovery:** Add interaction scripts for components with states.
- **Validation:** Assert non-default states captured for interactive components.

### F-SUR-04 — Unsupported high-value surfaces
**Level:** spec · **Severity:** Med · **Area:** Surface
- **Description:** Whole classes of real work are unrepresented: **forms** (validation/states/submission), **multi-page** sites and cross-page consistency, **email**, **data viz / tables / dashboards**, **localization / RTL**, print/PDF.
- **Root cause:** The spec is single-artifact, section-centric, and marketing-first.
- **Detection:** A brief requires an unsupported surface; capability gap.
- **Impact:** The system cannot serve common real briefs; forced human fallback.
- **Mitigation:** An explicit surface roadmap with per-surface Eyes/Critic capabilities; scope honestly until built ([09](./09-roadmap-and-open-questions.md)).
- **Recovery:** Route unsupported surfaces to humans.
- **Validation:** A per-surface capability checklist before claiming support.

---

## Human feedback incorporation

### F-HUM-01 — Verdicts not captured / lost
**Level:** impl · **Severity:** High · **Area:** Feedback
- **Description:** Human approve/reject/notes aren't recorded in a structured, durable way.
- **Root cause:** Feedback taken informally; not persisted with the artifact.
- **Detection:** Artifacts lack a linked verdict; calibration has no data.
- **Impact:** No taste calibration (H8), no learning signal (the system can't improve).
- **Mitigation:** Structured verdict capture persisted with each section/artifact; verdicts feed write-back + Critic calibration [MP-8, MP-12].
- **Recovery:** Backfill verdicts where possible; fix capture.
- **Validation:** Every approved artifact has a linked structured verdict.

### F-HUM-02 — Reviewer-taste overfitting
**Level:** spec · **Severity:** Med · **Area:** Feedback
- **Description:** The Critic calibrates to one reviewer's idiosyncratic taste.
- **Root cause:** Single-reviewer verdicts; small sample.
- **Detection:** Critic agrees with reviewer A, disagrees with B/C.
- **Impact:** Biased, brittle taste; poor generalization.
- **Mitigation:** Multiple reviewers; track inter-rater agreement; weight by consensus [MP-3].
- **Recovery:** Broaden the reviewer pool; reweight.
- **Validation:** Inter-rater reliability; multi-reviewer agreement.

### F-HUM-03 — Premature autonomy relaxation
**Level:** spec · **Severity:** High · **Area:** Feedback / autonomy
- **Description:** Human gates are removed before the Critic is proven calibrated.
- **Root cause:** Over-trust; skipping rungs on the autonomy ladder.
- **Detection:** Rising unreviewed "passes" that later prove wrong; quality complaints.
- **Impact:** Bad work ships unattended; trust collapse.
- **Mitigation:** Autonomy ladder gated strictly on measured Critic↔human agreement ([09 §2](./09-roadmap-and-open-questions.md)) [MP-12].
- **Recovery:** Drop back a rung; reinstate gates.
- **Validation:** Agreement thresholds enforced before each rung change.

### F-HUM-04 — Review bottleneck / rubber-stamping / taste SPOF
**Level:** spec · **Severity:** High · **Area:** Feedback
- **Description:** Human review does not scale with volume (a bottleneck), fatigue/time-pressure produce rubber-stamped approvals, and a single reviewer's taste is a single point of failure for the entire outer loop's ground truth.
- **Root cause:** Uniform, high-volume human gating on one/few reviewers.
- **Detection:** Approval-latency and reviewer test-retest consistency; agreement variance by reviewer.
- **Impact:** False approvals feed the Library and reward model; taste overfit; the autonomy-ladder premise strains.
- **Mitigation:** Uncertainty-routed review (escalate only where the Critic is unsure — [14](./14-research-agenda.md) R14); multiple reviewers with inter-rater tracking; low-friction capture [MP-3, MP-12].
- **Recovery:** Re-review disputed items; broaden the reviewer pool.
- **Validation:** Inject a subtly-bad artifact under load; assert it is not rubber-stamped.
