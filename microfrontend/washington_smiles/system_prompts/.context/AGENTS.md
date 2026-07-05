# AI Agent Rules — Washington Smiles Sales Pipeline

> **Read this file FIRST.** It tells you who you're working with, what this
> project is, and the rules you must follow.

---

## Project Identity

- **Project:** Washington Smiles — Sales & Delivery Pipeline System
- **Owner:** Abdul (Dev8X studio)
- **Location:** `d:\Arham\Dev8X\TroopHunter\microfrontend\washington_smiles\system_prompts\`
- **Monorepo:** TroopHunter (Turborepo, npm workspaces)
- **Purpose:** A dual-pipeline B2B sales system that generates revenue at every stage, positions Dev8X as a strategic consultant (not a local agency), and converts research into paid engagements.

## Context Files

When starting work on this project, read these files in order:

1. **This file** (`AGENTS.md`) — Rules and constraints
2. **`MEMORY.md`** — Architecture, decisions, key concepts, terminology
3. **`CURRENT_STATE.md`** — What's done, what's in progress, what's next
4. **`SESSION_LOG.md`** — Chronological record of all sessions

## Key Project Files

| File | Location | Purpose |
|------|----------|---------|
| `DUAL_PIPELINE_SYSTEM.md` | `system_prompts/` | Complete system architecture (both pipelines) |
| `EXECUTION_PLAYBOOK.md` | `system_prompts/` | Immediate-build scope: Video + Messaging + Consultation |
| `OPERATING_DISCIPLINE.md` | `system_prompts/` | Human-run operational rules |
| `README.md` | `system_prompts/` | Original pipeline overview |
| `phase0_strategy_foundation/` | `system_prompts/` | Decision Card + Problem Register prompts |
| `phase1_intelligence_extraction/` | `system_prompts/` | Research extraction prompts (5 files) |
| `phase2_lead_warming/` | `system_prompts/` | LinkedIn warming prompt |
| `phase3_outcome_report/` | `system_prompts/` | Video script + consultation playbook prompts |
| `phase4_solution_architecture/` | `system_prompts/` | Demo & scoping prompts (5 files) |
| `phase5_commercial_proposal/` | `system_prompts/` | Proposal suite prompts (3 files) |
| `Here is the exact English translation of.md` | `system_prompts/` | User's original vision transcript (dual-pipeline concept, enterprise model, war-game, 95-client thesis) |

## Mandatory Rules

1. **Never give away solutions for free.** Every stage proves depth and
   withholds the next stage's value. This is called the Hold-Back Rule.

2. **Never ask for money inside a deliverable.** The video ends on a reply
   ask. The consultation is offered in the follow-up AFTER dialogue. This
   is the Two-Step Money Rule.

3. **Never present unverified data as fact.** The ROI Integrity Ladder
   classifies all metrics as L1 (verified by client), L2 (estimated from
   public data), L3 (inferred), or L4 (industry benchmark). Only L1 and
   L2 are headlined; L3/L4 are support.

4. **Confident wrongness is the most expensive failure.** If the research
   is thin, say so. Never paper over gaps with confident language.

5. **No solution cards, no ROI dashboard, no build timeline in the free
   video.** The video shows problems only.

6. **Honour the guarantee.** The client judges "worth it." Never argue.

7. **Never automate outreach.** Every touchpoint is manual, per-prospect.

8. **Guard Abdul's time.** AI handles research, generation, and drafting.
   Abdul handles video, calls, relationships, and closing. If a CEO would
   feel sold to by a machine, Abdul does it.

## Design System

There is a LOCKED DESIGN SYSTEM in `p3a_Outcome_Report.md` with CSS tokens
and components. Any HTML output (Decision Safety Brief) must use those exact
CSS variables and markup patterns.

## Terminology

| Term | Meaning |
|------|---------|
| Decision Safety Brief | The HTML page Abdul narrates in the video (p3a output) |
| Decision Card | Strategic intelligence foundation (p0a output) |
| Problem Register | Problem mapping + proof ledger (p0b output) |
| Hold-Back Rule | Each stage proves depth, withholds the next stage's payload |
| Two-Step Money Rule | Never ask for money inside a deliverable |
| ROI Integrity Ladder | L1/L2/L3/L4 classification of metric confidence |
| Regret Gap | The gap between the prospect's stated goal and the bottleneck blocking it |
| Stakes Number | The annual cost-of-bottleneck figure shown in the video |
| Confidence Signal | High/Medium/Low indicator controlling tone |
| QA Gate | Pre-flight check before recording (≥3 verifiable problems or stop) |
| Silent Watcher | Prospect who watched the video but didn't reply |
| Correction Branch | Protocol when prospect says "you got it wrong" |
| Fit Check | Optional 15-min free call to reduce trust gap (no diagnosis given) |
| Leave-Behind | The Operational Diagnosis document delivered after consultation |
| Decoupling Rule | Beat 4's stakes number must NOT rely on unknowns confessed in Beat 3 |
| Fee-Anchoring | Anchor the consultation fee against the stakes number, never against competitors |
| Abdul Bottleneck | Abdul is the single human throughput limiter; AI maximizes his hours |
| Decision-Led Proof Framework (v2) | The overall philosophy governing the entire system |

## Session Protocol

At the end of every session, the AI should update:
1. `SESSION_LOG.md` — Add a new entry with date, what was discussed, decisions made, work done
2. `CURRENT_STATE.md` — Update the status of tasks, add new next steps
3. `MEMORY.md` — Add any new decisions, architecture changes, or concepts

**If the AI cannot write files**, it should output the updates for the user
to paste into the appropriate files.
