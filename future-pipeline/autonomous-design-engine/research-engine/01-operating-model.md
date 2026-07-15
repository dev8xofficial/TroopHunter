# 01 — Operating Model (the engine)

> This is the machine. Everything else (roles, instruments, artifacts) is called *by* this lifecycle. One Area enters; a set of Decision Records and a ranked backlog leave. Read [`03-areas.md`](./03-areas.md) for what an "Area" is; read this for what *happens* to it.

---

## 1. The two modes

Every investigation declares one mode up front, because it decides which evidence is even reachable.

| Mode | When it applies | Subject under study | Strongest reachable evidence |
|---|---|---|---|
| **Paper** | The thing being studied has no running code (ADE today) | The **spec**, the design, the plan | Reasoning, prior art, worked examples on a real brief (Tier 0–2) |
| **Empirical** | Code exists for the area | The **running subsystem** | Ablations, benchmark deltas, stress tests (Tier 3–4) |

Most of ADE is paper today, so **paper mode is the default**. A single investigation can be mixed (e.g. paper-reason the Critic's design but empirically probe the Phase-0 harness that exists). Declaring the mode forces honesty: **you cannot claim empirical confidence in paper mode.** Instruments per mode are in [`04`](./04-instruments.md).

## 2. The one lifecycle

There is exactly **one** investigation pipeline (it replaces the three overlapping ones in the archived drafts). It runs over a single Area.

```
0. FRAME          define the Area's boundary, the question behind the question, and the mode
1. RECONSTRUCT    rebuild how the area works from first principles; surface every assumption
2. DIVERGE        generate — with NO cap — questions, attacks, hypotheses, cross-domain analogies
3. CONVERGE       score every generated item by Expected Value; pick the top few; BACKLOG the rest
4. INVESTIGATE    gather supporting AND contradictory evidence for each picked item
5. ATTACK         a decorrelated adversarial pass tries to falsify each surviving claim
6. SYNTHESIZE     resolve conflicts by evidence; tag each finding with Evidence Tier + confidence
7. DECIDE         emit one-page Decision Records: Accept / Reject / Defer / Needs-Evidence
8. INTEGRATE      human ratifies; accepted findings become spec/plan edits (governance in 06)
9. CAPTURE        write findings to the Knowledge Base; update the Registry; leave a recorded state
```

Stages 2→3 are the heart (§4). Stages 5 and the honesty of 6 depend on real perspective diversity ([`02`](./02-roles-and-diversity.md)). Stage 7's output contract is in [`05 §4`](./05-artifacts-and-integration.md).

Iteration is allowed and expected: new evidence at stage 5 can send you back to 2. Returning to an earlier stage is refinement, not failure. But every return costs budget (§5), so it is a decision, not a reflex.

## 3. The Evidence Ladder (the spine of trust)

Every finding must name its **single strongest piece of evidence**, which places it on this ladder. **A finding's confidence is capped by its tier.** No amount of eloquent reasoning promotes a Tier-0 claim to "high confidence."

| Tier | Evidence type | Example | Available in |
|---|---|---|---|
| **T0** | Reasoning / argument alone | "This coupling looks fragile because…" | always |
| **T1** | External precedent | literature, another system's design, a documented cross-domain solution | always |
| **T2** | Worked example / thought-experiment | trace the mechanism by hand on a real brief (e.g. Burkes hero) and show where it breaks | always |
| **T3** | Offline empirical | an **ablation** (turn the thing off, measure) or a **benchmark delta on the Golden Core** (`../spec/13`) | when code + benchmark exist |
| **T4** | Production empirical | live A/B, real usage analytics | far future |

Confidence caps (a finding may be *lower* than the cap, never higher):

| Best evidence | Max confidence the finding may claim |
|---|---|
| T0 only | **Low** |
| T1 or T2 | **Medium** |
| T3 | **High** |
| T4 | **Very High** |

This single rule is what prevents the engine from becoming a confident-narrative generator — the failure mode most dangerous in paper mode, where *everything* is tempting to argue eloquently and nothing can be measured. It also directly wires the engine to ADE's own measuring stick: **T3 is the Evaluation Charter benchmark.** The engine does not invent a private notion of "better."

## 4. Divergence → Convergence (how "no limits" is honored *and* made affordable)

This is the mechanism that satisfies the founding requirement — *never cap the questions* — without drowning in them.

### 4.1 Divergence — deliberately unbounded

At stage 2, generation has **no question limit, no boundary, no fixed list.** The engine is explicitly instructed to surface *everything* it can about the Area from its full latent knowledge: every question, assumption, attack, failure hypothesis, simpler-alternative, and cross-domain analogy — including the ones you would never have thought to ask. Use a cheap, wide configuration here (breadth over depth). **Capturing a question is nearly free; the cost is only in investigating it.** So we capture all of them.

Every generated item is written down as a **Backlog Entry** ([`templates/backlog-entry.md`](./templates/backlog-entry.md)) tagged to the Area. **Nothing generated is ever discarded** — see §4.3.

### 4.2 Convergence — ruthless triage by Expected Value

We cannot investigate everything now. At stage 3 each generated item is scored by **Expected Value of Investigation**:

```
        impact_if_true  ×  probability_true  ×  reversibility_of_acting
EVI  =  ───────────────────────────────────────────────────────────────
                            cost_to_investigate
```

- **impact_if_true** — how much would ADE's quality/autonomy/robustness move if this is real? (1–5)
- **probability_true** — rough prior that the claim holds. (0–1)
- **reversibility_of_acting** — cheap-to-undo changes score high; one-way-door changes score low and demand more evidence before acting. (0.2–1)
- **cost_to_investigate** — effort to get this to a decidable Evidence Tier. (1–5)

Rank all items by EVI. Investigate the **top N** now (N set by proportionality, §5). Everything else stays in the Backlog at its computed rank.

### 4.3 The Backlog is permanent

The Backlog is a persistent, ranked, **append-mostly** store ([`05 §2`](./05-artifacts-and-integration.md)). Items are never deleted — only re-ranked, promoted into an investigation, or marked *answered* / *obsolete* with a reason. This is the concrete answer to *"the model has answers to 1,000 questions I didn't ask"*: **all 1,000 are captured and ranked; we simply pull from the top as budget allows, forever.** Freedom in what is surfaced; discipline in what is spent.

## 5. Proportionality (budget — so the engine stays affordable)

Dev/R&D runs on the Claude Pro-plan Agent-SDK credit (**never** an API key — see `../AGENTS.md`), by one developer at ~8 hrs/week. An 8-role, 10-stage investigation on *every* item would bankrupt attention and credit. So each investigation picks a **tier** up front, matched to the Area's stakes and reversibility:

| Tier | Use when | Divergence | Items investigated (top N) | Perspectives (see [`02`](./02-roles-and-diversity.md)) | Adversarial pass |
|---|---|---|---|---|---|
| **Light** | low stakes, reversible, or first look at an Area | unbounded, cheap model | 1–3 | 2 decorrelated lenses | 1 falsification attempt |
| **Standard** | default; meaningful subsystem or decision | unbounded | 3–7 | 3–4 lenses incl. domain specialist | dedicated attack stage |
| **Deep** | load-bearing, expensive-to-reverse, or contested | unbounded, possibly multi-pass | 5–12 | full role set + cross-domain | multi-round attack + steelman |

Rule of thumb: **spend the least ceremony that can move a finding up one Evidence Tier.** Start every new Area at Light; escalate only if the first pass shows the stakes justify it.

## 6. Invariants (mirrored from ADE's own discipline)

The engine holds itself to the same kind of invariants ADE's guardrails do (`../spec/11`):

- **I-R1 · No self-grading independence violation.** The perspective that *proposes* a claim does not get to be the one that *clears* its falsification (see [`02`](./02-roles-and-diversity.md)).
- **I-R2 · Evidence cap is absolute.** No finding's stated confidence exceeds its Evidence-Tier cap (§3). A reviewer can reject purely on this.
- **I-R3 · Best-finding retention.** The strongest-supported version of a conclusion seen during an investigation is retained; a later, weaker rationalization never overwrites it.
- **I-R4 · Every investigation ends in a recorded state** — `Decided`, `Deferred` (parked with a reason), or `Inconclusive` (evidence insufficient, documented). **No silent dead ends.**
- **I-R5 · Nothing generated is destroyed.** Divergence output is preserved in the Backlog (§4.3).
- **I-R6 · Human ratifies architecture change.** The engine's output is a proposal; it never edits `../spec` or `../IMPLEMENTATION_PLAN` as an accepted change without human sign-off ([`06`](./06-governance-and-integrity.md)).

## 7. Reproducibility under nondeterminism

LLM investigations are not bit-reproducible. We approximate reproducibility by recording, for each investigation, a **provenance header**: date, model(s) and configuration used per perspective, the exact Area Card and context snapshot fed in, the divergence prompt, and the ranked item list with EVI scores. Two runs won't be identical, but a reader can see *what was asked, of what, with what inputs* — enough to re-run, challenge, or extend. This header is part of the [Investigation Report](./templates/investigation-report.md).
