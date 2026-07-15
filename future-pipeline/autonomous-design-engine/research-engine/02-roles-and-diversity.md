# 02 — Roles & Diversity (perspectives without theater)

> Multiple perspectives only help if they are **genuinely decorrelated**. Personas of one model, fed the same context, produce the *choreography* of debate with the *correlated errors* of a single mind. This document defines how the engine gets real independence — and why "the agents agreed" is worth almost nothing.

---

## 1. The failure this prevents

The intuitive design — "spin up an Architect, an Advocate, a Skeptic, all played by the same model, hand them the same brief" — is **theater**. One model wearing hats shares its training data, its blind spots, and its failure modes across every hat. The Skeptic misses exactly what the Advocate misses. You get the *appearance* of scrutiny and none of its statistical value.

**Therefore the engine's rule is inverted from the naive one:**

> **Agreement between same-substrate, same-context perspectives is treated as ~zero evidence.** Only *decorrelated* agreement, or *survived falsification*, counts.

## 2. The two kinds of perspective

### 2.1 Core functions — always present

These are not personalities; they are **jobs the lifecycle requires**. Every investigation runs all of them (a Light investigation may collapse several into one pass):

| Function | Job | Lifecycle stage |
|---|---|---|
| **Framer** | Pin the Area's boundary and the real question behind the asked one; choose mode + proportionality | 0 |
| **Reconstructor** | Rebuild the mechanism from first principles; enumerate assumptions | 1 |
| **Diverger** | Generate — unbounded — questions/attacks/hypotheses/analogies | 2 |
| **Attacker** | Falsify: for each surviving claim, find the one input/scenario under which it fails | 5 |
| **Grounder** | Enforce the Evidence Ladder: demand the strongest reachable evidence, tag tiers, reject over-claims | 4,6 |
| **Synthesizer** | Resolve conflicts by evidence; produce findings + Decision Records | 6,7 |
| **Coordinator** | Keep the lifecycle honest, prevent duplicate work, track provenance and budget | all |

### 2.2 Domain lenses — selected per Area

The *right specialist* depends on the Area. A cost question needs a systems/economics lens; a Critic-taste question needs an evaluation/measurement lens; a Memory question needs a distributed-systems/database lens. Rather than force every investigation through a fixed cast, the Framer **selects 1–3 domain lenses** that fit the Area, drawn from a menu (extend freely):

`systems & scaling` · `evaluation & measurement` · `human factors / HCI` · `security & adversarial` · `cost & economics` · `control theory & feedback` · `cognitive science` · `distributed systems` · `reliability engineering` · `information architecture` · plus any new lens a future Area demands.

This keeps investigations sharp (the relevant expert is present) and cheap (irrelevant experts are absent) — the opposite of running eight personas every time.

## 3. Real decorrelation levers (use as many as feasible)

Genuine independence, in rough order of power:

1. **Different substrate.** Run perspectives on *different models* where possible (e.g. Opus vs Sonnet vs Haiku). Different training → partially independent errors. This is the strongest cheap lever available on the Pro plan.
2. **Different information.** Give perspectives *different slices* of context rather than the identical bundle — one sees the spec, another sees only the failure catalogue, another only the cross-domain brief. Divergent inputs → divergent conclusions.
3. **Adversarial payoff (see §4).** Don't ask a perspective to "be skeptical" (a tone); give it a *win condition* (a concrete falsification target). Incentive structure, not role-play.
4. **Temporal / fresh context.** Run the Attacker in a *fresh* context that never saw the Advocate's reasoning, so it cannot anchor to it — mirroring ADE's own "Critic judges from screenshots in fresh context" invariant.
5. **Structured dissent-must-cite.** A perspective's disagreement is only admitted if it carries evidence (any tier). Ungrounded contrarianism is discarded, exactly like ungrounded agreement.

A Light investigation may only afford levers 3–5; a Deep one should use 1–2 as well.

## 4. The adversarial protocol (falsification with teeth)

The Attacker is the engine's most important perspective, and it is given a **concrete objective, not an attitude**:

> For claim C, produce the **single most plausible input, workload, brief, scale, or sequence of events under which C is false or harmful.** If you can, C is falsified or bounded. If you genuinely cannot after real effort, C has *survived*, and that survival — not anyone's agreement — is the evidence.

Rules:
- The Attacker must run **decorrelated** from the claim's proposer (different substrate and/or fresh context — I-R1 in [`01 §6`](./01-operating-model.md)).
- A surviving claim records *what was tried and failed to break it* — that record is the finding's real support, and it names the falsification condition ("this would change our mind if…").
- **Deep** investigations also run a **mandatory steelman of the status quo** before recommending any change (see [`06 §3`](./06-governance-and-integrity.md)) — the inverse attack, defending what exists, to counter the engine's novelty bias.

## 5. Conflict resolution

When perspectives disagree (the healthy default), resolve **by evidence tier, never by vote**:

1. Compare the strongest evidence behind each position on the Evidence Ladder.
2. Higher tier wins *for now*, at the confidence its tier allows.
3. If tiers tie at T0/T1 (reasoning/precedent only), the honest output is **"multiple explanations remain plausible"** → the item becomes a **Needs-Evidence** Decision Record naming the experiment that would break the tie, and it re-enters the Backlog.
4. Unresolved disagreement is **reported, never hidden or averaged away.**

## 6. How many perspectives (tie-in to budget)

Perspective count is set by proportionality tier in [`01 §5`](./01-operating-model.md): Light = 2 decorrelated lenses; Standard = 3–4 including one domain specialist; Deep = full core set + selected domain lenses + multi-round attack/steelman. More perspectives is not automatically better — it is more expensive, and beyond the point of real decorrelation it just adds correlated noise. Add a perspective only when it brings a genuinely different substrate, information slice, or incentive.
