# ADE Research Engine

> A permanent, domain-agnostic research capability that studies **any area of ADE, one area at a time**, and evolves the architecture through evidence — not opinion.

**This README is the front door.** It tells you what the engine is, the one rule that shapes everything, how to run an investigation end to end, and where each detail lives. Read it once; then work from the numbered docs.

---

## 1. What it is (in one breath)

ADE designs websites. The **Research Engine studies how ADE designs**, finds where it is weak or wrong, imports better ideas from other fields, and proposes evidence-backed changes that a human ratifies. It never edits the architecture itself — it produces **findings, a ranked backlog, and one-page Decision Records**.

It is the outer discipline that keeps ADE honest: *every architecture can be improved, every assumption can be questioned, every conclusion is revisable when stronger evidence appears.*

## 2. The one rule that shapes everything: **area-by-area**

The engine is **not tied to any specific part of ADE**. It takes an **Area** as input — defined and chosen by the developer — and investigates that Area, and nothing else, in a single focused pass.

- **The developer owns the Areas.** They decide what an Area is, add it to the [Area Registry](./areas/_registry.md), and choose which one runs next. The engine never invents Areas or reorders the program.
- **The engine discovers the internals itself.** It carries *no* hardcoded map of ADE's subsystems. Pointed at an Area (e.g. "Architecture Research"), it works out which parts of ADE that touches during Reconstruct. Nothing internal is pre-listed for it.
- **We research one Area at a time.** Never "review the whole system at once" — that produces shallow, correlated noise.
- **New Areas are added forever.** When ADE grows a new part — or the developer thinks of a new angle — they add a Registry row and (on activation) an [Area Card](./templates/area-card.md). The engine already knows how to research it; only the *subject* changes, never the *machine*. This is the whole point of [`03-areas.md`](./03-areas.md).

## 3. How an investigation runs (operational quickstart)

One Area flows through one lifecycle (full detail in [`01-operating-model.md`](./01-operating-model.md)):

```
Developer picks an Area ← from the Registry; the engine researches only that one
      ↓
Frame + Reconstruct     ← rebuild how this area works, from first principles; list its assumptions
      ↓
DIVERGE  (UNBOUNDED)    ← generate every question, attack, hypothesis, cross-domain analogy — NO LIMIT
      ↓
CONVERGE (ruthless)     ← rank every generated item by Expected Value of Investigation;
                          investigate the top few NOW, park the rest in the Backlog (never deleted)
      ↓
Investigate + Attack    ← gather evidence; a decorrelated adversarial pass tries to falsify each claim
      ↓
Synthesize              ← resolve conflicts by evidence; assign each finding an Evidence Tier + confidence
      ↓
Decide                  ← emit one-page Decision Records (Accept / Reject / Defer / Needs-Evidence)
      ↓
Integrate + Capture     ← human ratifies → spec/plan updates; findings written to the Knowledge Base
```

Two properties make this trustworthy and affordable:

- **Freedom in divergence, discipline in convergence.** Generation is *never* capped — your "1,000 latent questions" are all surfaced and *kept*. But we don't spend an expensive investigation on all of them; we rank and pick. Nothing is lost; nothing is wasted. (See [`01 §4`](./01-operating-model.md).)
- **Confidence is capped by evidence.** Every finding declares its strongest evidence on a 5-tier ladder; a claim resting only on reasoning can never be sold as high-confidence. This kills confident-narrative bias, especially while ADE is still **on paper**. (See [`01 §3`](./01-operating-model.md).)

## 4. Paper-mode today, empirical later

ADE has almost no code yet — so today the subject-under-study is mostly **the spec itself**. The engine runs in **paper mode**: reconstruct, red-team the design, reason, import cross-domain precedent. As subsystems get built, **empirical mode** unlocks its instruments (ablation, benchmark deltas, stress tests). Same engine, different toolbox, declared per investigation. (See [`04-instruments.md`](./04-instruments.md).)

## 5. Document set

| # | Document | Its single job |
|---|---|---|
| — | [`README.md`](./README.md) | Front door: what/why/how, this index |
| 00 | [`00-charter.md`](./00-charter.md) | **Why** it exists: mission, non-goals, principles, success metric |
| 01 | [`01-operating-model.md`](./01-operating-model.md) | **The engine**: modes, Evidence Ladder, the one lifecycle, divergence→convergence, budgets |
| 02 | [`02-roles-and-diversity.md`](./02-roles-and-diversity.md) | **Perspectives without theater**: real decorrelation, adversarial falsification, lens selection |
| 03 | [`03-areas.md`](./03-areas.md) | **The Area system**: domain-agnostic, one-at-a-time, extensible to future areas |
| 04 | [`04-instruments.md`](./04-instruments.md) | **The toolbox**: paper-mode + empirical instruments, cross-domain import protocol |
| 05 | [`05-artifacts-and-integration.md`](./05-artifacts-and-integration.md) | **Outputs + wiring**: Backlog, Knowledge Base, Decision Records, integration into ADE's spec/plan |
| 06 | [`06-governance-and-integrity.md`](./06-governance-and-integrity.md) | **Guardrails**: human authority, anti-bias, self-application, the engine's own kill-gates |
| — | [`areas/_registry.md`](./areas/_registry.md) | The live list of all Areas and their status |
| — | [`templates/`](./templates/) | Fill-in forms: Area Card, Investigation Report, Decision Record, Backlog Entry |
| — | [`_archive/`](./_archive/) | The original six manifesto drafts + `research-goal.md`, preserved as origin intent (superseded by this set) |

**If you only read three:** `00` (why), `01` (the engine), `03` (how any area is researched).

## 6. Relationship to the rest of ADE

- **`../spec/`** is authoritative for ADE's *design*; **`../IMPLEMENTATION_PLAN.md`** for its *build order*. The Research Engine **proposes** changes to those; it never edits architecture directly. Accepted findings flow back as spec/plan edits (see [`05 §5`](./05-artifacts-and-integration.md)).
- **`../spec/13-evaluation-charter.md`** (the Golden Core benchmark) is the engine's ground-truth instrument for empirical evidence (Tier 3). The engine is anchored to the *same* measuring stick ADE uses — it does not invent its own.
- **`../spec/14-research-agenda.md`** (R1–R18) and the H-series hypotheses are **not a rival taxonomy**. They are executed *inside* whichever Area's investigation reaches them, as Backlog items — not maintained as separate Registry rows.
- **`../failures/`** is where confirmed failure modes are catalogued; investigations that discover new ones write there.
- **`../knowledge/`** records *why* past decisions were made; a completed investigation that changes a decision appends there.

## 7. Status

- **Mode:** paper (spec is the subject; ADE has only Phase-0 scaffolding).
- **Engine:** this specification set — v1.
- **Program:** the developer has queued 14 research phases in [`areas/_registry.md`](./areas/_registry.md); **Phase 1 — Architecture Research** is highest priority.
- **Next action:** activate `P1 — Architecture Research` (write its Area Card) and run one full investigation at **Light** proportionality — enough to prove the engine produces a real Decision Record and a ranked backlog before scaling ceremony.

> Inherited from ADE's own culture: **report observed evidence, never predicted confidence.** A finding is only as strong as the tier of evidence under it.
