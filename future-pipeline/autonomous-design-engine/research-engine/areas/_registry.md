# Research Program — Area Registry

> **This registry is human-owned.** The developer decides which Areas exist, adds them, and chooses which one to research next. The engine does **not** invent Areas, and it does **not** carry a hardcoded map of ADE's subsystems. When pointed at an Area, the engine **discovers the relevant subsystems, components, and moving parts itself** during the Reconstruct stage ([`../01-operating-model.md §2`](../01-operating-model.md)) — nothing internal is pre-listed here.

**Status:** `Unexplored` → `Active` → `Investigated` → `Monitoring` (re-opens on new code/evidence/contradiction — [`../03-areas.md §5`](../03-areas.md)).
**Mode:** which evidence is reachable *today* — Areas are `paper` while ADE has only Phase-0 scaffolding; individual Areas flip to `mixed`/`empirical` as code lands.
**Priority:** the human's current order. `1` = research next.

---

## The current program

*(Ordered as queued by the developer. Phase 1 is highest priority. Each Phase is a top-level Area; the engine researches one at a time and may spawn sub-Areas for whatever components it discovers inside — [`../03-areas.md §6`](../03-areas.md).)*

| ID | Phase / Area | Status | Priority | Mode |
|---|---|---|---|---|
| `P1` | **Architecture Research** | Unexplored | 1 | paper |
| `P2` | **Intelligence Research** | Unexplored | 2 | paper |
| `P3` | **Learning Research** | Unexplored | 3 | paper |
| `P4` | **Evaluation Research** | Unexplored | 4 | paper |
| `P5` | **Autonomy Research** | Unexplored | 5 | paper |
| `P6` | **Generator Research** | Unexplored | 6 | paper |
| `P7` | **Critic Research** | Unexplored | 7 | paper |
| `P8` | **Vision Research ("Eyes")** | Unexplored | 8 | paper |
| `P9` | **Knowledge Research** | Unexplored | 9 | paper |
| `P10` | **Human Collaboration Research** | Unexplored | 10 | paper |
| `P11` | **Robustness Research** | Unexplored | 11 | paper |
| `P12` | **Scaling Research** | Unexplored | 12 | paper |
| `P13` | **Production Research** | Unexplored | 13 | paper |
| `P14` | **Research Agenda Meta-Layer** | Unexplored | 14 | paper |

> The single-line title is deliberate. What each Phase *contains* — which subsystems, assumptions, and mechanisms it touches — is **not written here**; the engine determines that when it reconstructs the Area at the start of an investigation. If the developer wants to scope a Phase more tightly, that goes in the Area Card ([`../templates/area-card.md`](../templates/area-card.md)), not here.

---

## How the developer runs this

1. **Pick the next Area** (top Priority, or whichever you choose — selection is yours, [`../03-areas.md §7`](../03-areas.md)).
2. **Set it `Active`** and copy [`../templates/area-card.md`](../templates/area-card.md) to `areas/<ID>.md`. Fill in only what you already know; leave discovery to the engine.
3. **Run one investigation** ([`../01-operating-model.md`](../01-operating-model.md)) — start at **Light** proportionality, escalate only if stakes justify it.
4. **On completion**, set the Area `Investigated`/`Monitoring`, and the residual questions live on in the Backlog ([`../05-artifacts-and-integration.md §2`](../05-artifacts-and-integration.md)).

## How the developer adds a new Area

Add a row above with a new ID and Priority; write its Area Card when you activate it. That is the whole mechanism — no engine change ([`../03-areas.md §4`](../03-areas.md)). Whatever new part ADE grows in the future becomes researchable the moment you add its row.

## Relationship to ADE's existing agenda

The `R1–R18` bets (`../spec/14-research-agenda.md`) and `H`-series hypotheses (`../spec/08-hypotheses-and-validation.md`) are **not** a separate list to maintain. When a Phase's investigation reaches them, they enter that Phase's Backlog as high-value items and are executed through this engine's lifecycle — they do not get their own registry rows unless the developer chooses to add them.
