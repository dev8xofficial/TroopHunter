# Dev8X — Freelancer Outreach Pipeline

Abdul is a frontend-first, full-stack developer looking for subcontract and overflow work
from top-rated freelancers and small agencies on Upwork. This pipeline moves a prospect
from raw research to a warm, personalised first message.

**Token limit per Claude session: 190k**

---

## File Naming Convention

```
p1a_   Phase 1 — Website extraction
p1b_   Phase 1 — Upwork profile extraction
p1c_   Phase 1 — LinkedIn owner extraction
p2a_   Phase 2 — Lead warming (3-comment LinkedIn sequence)
p3x_   Phase 3 — Strategy decision (Path A / B / C)
p3a_   Phase 3 — Path A: Short conversation starter
p3b_   Phase 3 — Path B: Medium introduction
p3c_   Phase 3 — Path C: Video message (script + HTML report)
```

Prompts live in `system_prompts/`. Generated context files live in `[prospect]/context/`.
The prompt and the output it generates share the same prefix —
e.g. `p1a_Website.md` (prompt) → `[prospect]/context/p1a_Website.md` (output).

---

## Folder Structure

```
freelancers/
├── PLAYBOOK.md                          ← strategy, philosophy, and full pipeline story
├── README.md                            ← this file — operational reference
├── _shared/
│   ├── abdul.md                         ← Abdul's fixed blocks (derived from master-dataset/abdul.json)
│   ├── results.md                       ← engagement log: prospect type, path used, outcome
│   └── patterns/
│       ├── comments.md                  ← comment angles that got replies, by prospect type
│       ├── hooks.md                     ← observation types that worked, by stack and role
│       └── messages.md                  ← proven opening lines per path
├── system_prompts/                      ← reusable prompts — shared across all prospects
│   ├── phase1_intelligence_extraction/
│   │   ├── p1a_Website.md
│   │   ├── p1b_Upwork.md
│   │   └── p1c_Linkedin_Owner.md
│   ├── phase2_lead_warming/
│   │   └── p2a_Lead_Warming.md
│   └── phase3_outreach/
│       ├── p3x_Strategy.md
│       ├── p3a_Short_Message.md
│       ├── p3b_Medium_Message.md
│       └── p3c_Video_Message.md
│
└── [prospect-name]/                     ← one folder per prospect
    ├── raw/                             ← raw scrapes (input, named after the prompt that reads them)
    │   ├── p1a_Website.md
    │   ├── p1b_Upwork.md
    │   └── p1c_Linkedin_Owner.md
    ├── context/                         ← generated context files (prospect-specific)
    │   ├── p1a_Website.md
    │   ├── p1b_Upwork.md
    │   ├── p1c_Linkedin_Owner.md
    │   ├── p2a_Lead_Warming.md
    │   └── p3x_Strategy.md
    └── artifacts/                       ← ready-to-send outputs
        ├── p3a_Message_[Name].md        ← Path A output
        ├── p3b_Message_[Name].md        ← Path B output
        ├── p3c_Script_[Name].md         ← Path C video script
        └── p3c_Report_[Name].html       ← Path C HTML visual report
```

---

## The Pipeline at a Glance

```
PHASE 1 — Intelligence    Raw scrapes → 3 clean context files
PHASE 2 — Warming         Context → 3-comment LinkedIn sequence (Day 0 / Day 2 / Day 4)
PHASE 3 — Outreach        Strategy decision → one of three message paths
```

| Phase | Abdul has done | Prospect has seen | Gate to next phase |
|-------|---------------|-------------------|--------------------|
| 1 | Scraped and cleaned 3 sources | Nothing | 3 context files exist |
| 2 | Posted 3 comments over 4 days | Comments from Abdul | Prospect replies to any comment |
| 3 | Sent first message | Personalised message or video | Prospect replies |

---

## Phase 1 — Intelligence Extraction

**When to run:** Day 0, immediately after identifying the prospect on Upwork.
Run all three prompts in the same session if token budget allows.

---

### p1a — Website Context

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase1_intelligence_extraction/p1a_Website.md` | Prompt |
| Raw scraped website file | Input |

> Estimated token usage: 10k–40k.

**Save output as:** `[prospect]/context/p1a_Website.md`

---

### p1b — Upwork Profile Context

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase1_intelligence_extraction/p1b_Upwork.md` | Prompt |
| Raw scraped Upwork profile | Input |

> Estimated token usage: 5k–20k.

**Save output as:** `[prospect]/context/p1b_Upwork.md`

---

### p1c — LinkedIn Owner Context

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase1_intelligence_extraction/p1c_Linkedin_Owner.md` | Prompt |
| Raw LinkedIn profile page | Input |

> Estimated token usage: 10k–40k.

**Save output as:** `[prospect]/context/p1c_Linkedin_Owner.md`

---

## Phase 2 — Lead Warming

**When to run:** Immediately after Phase 1 context files exist.

**Comment timing** — relative to prospect entry date, not calendar:

```
Day 0   Post Comment 1
Day 2   Post Comment 2
Day 4   Post Comment 3
```

**Connection request rule:** Send only if the prospect replies to any comment.
If no comment gets a reply, log the prospect in `_shared/results.md` as non-responsive
and stop. Do not send a connection request to a silent prospect.

---

### p2a — Lead Warming Plan

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase2_lead_warming/p2a_Lead_Warming.md` | Prompt |
| `[prospect]/context/p1a_Website.md` | Prospect's website context |
| `[prospect]/context/p1b_Upwork.md` | Prospect's Upwork profile |
| `[prospect]/context/p1c_Linkedin_Owner.md` | Prospect's posts and background |
| `_shared/abdul.md` | Abdul's fixed context — for finding genuine overlap |
| `_shared/patterns/comments.md` | Proven comment angles (if populated) |

> Estimated token usage: 20k–50k.

**Save output as:** `[prospect]/context/p2a_Lead_Warming.md`

---

## Phase 3 — First Message

**When to run:** After the connection is accepted.
Run p3x_Strategy first to get the path recommendation, then run only the prompt for
the recommended path.

---

### p3x — Strategy Decision

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase3_outreach/p3x_Strategy.md` | Prompt |
| `[prospect]/context/p1a_Website.md` | Prospect website |
| `[prospect]/context/p1b_Upwork.md` | Prospect Upwork profile |
| `[prospect]/context/p1c_Linkedin_Owner.md` | Prospect LinkedIn |
| `[prospect]/context/p2a_Lead_Warming.md` | Warming plan and engagement signals |
| `_shared/patterns/messages.md` | Proven message patterns (if populated) |

> Estimated token usage: 15k–30k.

**Output:** Path recommendation (A, B, or C) with rationale. Save as `[prospect]/context/p3x_Strategy.md`.

---

### p3a — Path A: Short Conversation Starter

**Best for:** Visibly busy prospects, brief comment replies, direct communicators.

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase3_outreach/p3a_Short_Message.md` | Prompt |
| `[prospect]/context/p1c_Linkedin_Owner.md` | Prospect profile and posts |
| `[prospect]/context/p2a_Lead_Warming.md` | Warming angle used |
| `[prospect]/context/p3x_Strategy.md` | Strategy rationale |

> Estimated token usage: 10k–20k.

**Save output as:** `[prospect]/artifacts/p3a_Message_[Name].md`

---

### p3b — Path B: Medium Introduction

**Best for:** Substantive comment engagement, explicit overflow signals, Upwork job posts.

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase3_outreach/p3b_Medium_Message.md` | Prompt |
| `[prospect]/context/p1a_Website.md` | Prospect website |
| `[prospect]/context/p1b_Upwork.md` | Prospect Upwork profile |
| `[prospect]/context/p1c_Linkedin_Owner.md` | Prospect LinkedIn |
| `[prospect]/context/p2a_Lead_Warming.md` | Warming angle and engagement |
| `[prospect]/context/p3x_Strategy.md` | Strategy rationale |
| `_shared/abdul.md` | Abdul's fixed intro block — used verbatim |

> Estimated token usage: 15k–30k.

**Save output as:** `[prospect]/artifacts/p3b_Message_[Name].md`

---

### p3c — Path C: Video Message

**Best for:** Rich profiles with enough signal to make the observation feel targeted.
Do not use if research cannot produce a genuinely specific observation — use Path A or B instead.

**Attach to Claude:**
| File | Role |
|------|------|
| `system_prompts/phase3_outreach/p3c_Video_Message.md` | Prompt |
| `[prospect]/context/p1a_Website.md` | Prospect website |
| `[prospect]/context/p1b_Upwork.md` | Prospect Upwork profile |
| `[prospect]/context/p1c_Linkedin_Owner.md` | Prospect LinkedIn |
| `[prospect]/context/p2a_Lead_Warming.md` | Warming angle and engagement |
| `[prospect]/context/p3x_Strategy.md` | Strategy rationale |
| `_shared/abdul.md` | Abdul's fixed script block — used verbatim |

> Estimated token usage: 20k–45k.

**Save outputs as:**
- `[prospect]/artifacts/p3c_Script_[Name].md`
- `[prospect]/artifacts/p3c_Report_[Name].html`

> **Before recording:** replace `href="#"` on the calendar button with the real booking link.
> **Fixed block:** record Abdul's intro and offer sections from `_shared/abdul.md` first —
> these are the same every time. Accent-drill these until fluent, then record once.
> **Variable block:** the personalized observation is recorded live or spliced in.

---

## How the Phases Connect

```
_shared/abdul.md ──────────────────────────────────────────────────┐
                                                                    ↓
p1a_ + p1b_ + p1c_ → p2a_ Warming (Day 0/2/4) → p3x_ Strategy → p3a_ or p3b_ or p3c_
```

`_shared/abdul.md` is a required input for p2a and all Phase 3 prompts.
`_shared/patterns/` is an optional input that improves with each completed engagement.

---

## Token Budget

| Phase | Prompt | Inputs | Est. tokens |
|-------|--------|--------|-------------|
| 1 | p1a_ Website | Prompt + raw website scrape | 10k–40k |
| 1 | p1b_ Upwork | Prompt + raw Upwork scrape | 5k–20k |
| 1 | p1c_ LinkedIn Owner | Prompt + raw LinkedIn scrape | 10k–40k |
| 2 | p2a_ Lead Warming | Prompt + p1a_ + p1b_ + p1c_ + _shared/ | 20k–50k |
| 3 | p3x_ Strategy | Prompt + p1a_ + p1b_ + p1c_ + p2a_ | 15k–30k |
| 3 | p3a_ Short Message | Prompt + p1c_ + p2a_ + p3x_ | 10k–20k |
| 3 | p3b_ Medium Message | Prompt + p1a_ + p1b_ + p1c_ + p2a_ + _shared/ | 15k–30k |
| 3 | p3c_ Video Message | Prompt + p1a_ + p1b_ + p1c_ + p2a_ + _shared/ | 20k–45k |

Keep each phase in its own Claude session to stay within the 190k per-session limit.
