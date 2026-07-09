# Dev8X — Document Generation Pipeline

This pipeline moves a prospect from raw research to a signed proposal. Every file
is named with a phase prefix so its origin and position in the pipeline are
immediately visible.

**Token limit per Claude session: 190k**

---

## Pipeline Model — PAID (revenue from every stage)

This is a **paid pipeline**. Each stage after the first contact is a paid gate, and
each gate is its own profit centre — it must earn its fee whether or not a build
follows.

```
Lead warming        FREE   — relationship only (LinkedIn)
First Video / Brief FREE   — the trust-buyer; one free sample
Paid Consultation   PAID   — FIRST GATE · live diagnosis · standalone profit
Paid Demo           PAID   — working-solution reveal · standalone profit
Proposal → Build    PAID   — the development contract
```

Two rules thread through every stage:

- **The Hold-Back.** Each stage proves depth and withholds the next stage's payload.
  The first video shows the *problem* and stops (no solutions, no ROI, no build).
  The consultation diagnoses and sketches *solution direction* (no working demo).
  The demo shows the *working solution* (no build cost). This is what makes
  "revenue from every stage" hold.
- **Two-Step Money.** Money is never asked for in a deliverable. The first video
  ends on a *reply ask*; the paid consultation is offered in the follow-up, after
  dialogue exists, wrapped in a guarantee + a stakes number + one proof point.

> Conversion to paid is complete for the **first video** and the **consultation**
> (Phase 3). The demo (Phase 4) and proposal (Phase 5) still carry the legacy free
> CTAs and have not yet been converted.

**Running the funnel:** the prompts generate the *deliverables*; how a human *runs*
the pipeline — channel/automation discipline, funnel metrics, the Abdul bottleneck,
and guarantee rules — lives in **`OPERATING_DISCIPLINE.md`**.

---

## File Naming Convention

```
p1_   Phase 1 — Research
p2_   Phase 2 — Outreach
p3a_  Phase 3 — First Touch: Decision Safety Brief (trimmed — problems only)
p3b_  Phase 3 — First Touch: First Video Script (video + DM wrapper only)
p3c_  Phase 3 — Messaging: Messaging & Objection-Handling Playbook (sells the paid ask)
p3d_  Phase 3 — Diagnosis: Live Consultation Playbook (the first PAID gate, post-paid on confirmation)
p3e_  Phase 3 — Journey Map: "How We Work" one-pager (Consultation → Demo → Build, shown after first payment)
p4a_  Phase 4 — Step 1: Business Operations Manual
p4b_  Phase 4 — Step 2: Business Report
p4c_  Phase 4 — Step 3: Tech Spec
p4d_  Phase 4 — Step 4: Implementation (portals)
p4e_  Phase 4 — Step 5: Demo Pitch Script
p5a_  Phase 5 — Step 1: Proposal
p5b_  Phase 5 — Step 2: Proposal Pitch Script
p5c_  Phase 5 — Step 3: Development Blueprint
```

Every prompt in `prompts/` and every output in `context/` follows this prefix.
The prompt and the output it generates share the same prefix and letter —
e.g. `p4a_Business_Operations_Doc_Generator.md.md` (prompt) → `p4a_Business_Operations_Manual.docx` (output).

---

## The Pipeline

```
PHASE 0 — Decision Card  Research → Decision Card + Problem Register → Gate assessment
PHASE 1 — Research       Raw data → clean context files
PHASE 2 — Outreach       Context → LinkedIn warming plan                       FREE
PHASE 3 — First Touch    Decision Card + Research → trimmed Brief + Video Script FREE
PHASE 3 — Messaging      Video Script + prospect reply → Messaging & Objection Playbook FREE (the paid ask)
PHASE 3 — Diagnosis      Decision Card + Problem Register → Consultation Playbook PAID ← first gate
PHASE 3 — Journey Map    Consultation output → "How We Work" one-pager           PAID (shown only after)
PHASE 4 — Demo & Scoping Problem Register + Portals → Demo pitch script          PAID
PHASE 5 — Proposal       Decision Card + Problem Register + Tech Spec → Proposal  PAID
```

| Phase | Dev8X has done... | Prospect has seen... | Goal | Money |
|-------|-------------------|----------------------|------|-------|
| 0 | Produced Decision Card + Problem Register | Nothing yet | Gate assessment — decide how much to build | — |
| 1 | Researched the prospect | Nothing yet | Build intelligence | — |
| 2 | Started LinkedIn comments | First comments from Abdul | Accept connection | Free |
| 3 (first touch) | Sent the first video | A trimmed Brief (problems only) + reply ask | Get a reply | Free |
| 3 (messaging) | Ran the message + objection sequence | Guarantee, stakes tie-back, the package price | Get the paid "yes" | Free (asks) |
| 3 (diagnosis) | Ran the live consultation | A documented Operational Diagnosis they keep | Sell the demo | **Paid** — post-paid, on confirmation |
| 3 (journey map) | Sent the "How We Work" one-pager | The full Consultation → Demo → Build path, only the consultation priced | Frame the demo as the obvious next step | — (companion to the paid stage) |
| 4 | Built and demoed the platform | Working portals + demo video | Agree to proposal | **Paid** (not yet converted — see note below) |
| 5 | Delivered full proposal suite | Proposal + pitch video + blueprint | Sign and start | **Paid** (not yet converted — see note below) |

---

## Folder Structure

```
treeraise/
├── prompts/
│   ├── README.md
│   ├── OPERATING_DISCIPLINE.md     ← process rules (channel, metrics, scaling, guarantee)
│   ├── phase1_research/
│   │   ├── p1a_Website.md
│   │   ├── p1b_Linkedin_Company.md
│   │   ├── p1c_Linkedin_Owner.md
│   │   ├── p1d_Document.md
│   │   └── p1e_Job_Posting.md
│   ├── phase0_decision/
│   │   ├── p0a_Decision_Card.md
│   │   └── p0b_Problem_Register.md
│   ├── phase2_outreach/
│   │   └── p2a_Lead_Warming.md
│   ├── phase3_outcome_report/
│   │   ├── p3a_Outcome_Report.md            ← trimmed: problems only, reply-ask CTA
│   │   ├── p3b_First_Video_Script.md        ← video narration + DM wrapper (no follow-up messaging)
│   │   ├── p3c_Messaging_Playbook.md        ← post-reply messaging + 19-branch objection matrix; sells the paid package
│   │   ├── p3d_Consultation_Playbook.md     ← live paid diagnosis (first paid gate; post-paid on confirmation, no prepay/refund)
│   │   └── p3e_Engagement_Journey.md        ← "How We Work" one-pager: Consultation → Demo → Build, shown only after first payment
│   ├── phase4_demo_scoping/
│   │   ├── p4a_Business_Operations_Doc_Generator.md.md
│   │   ├── p4b_Business_Report_Doc_Generator.md
│   │   ├── p4c_Tech_Spec_Doc_Generator.md
│   │   ├── p4d_TreeRaise_Implementation_Changes.md
│   │   └── p4e_Demo_Pitch.md
│   └── phase5_proposal/
│       ├── p5a_Proposal.md
│       ├── p5b_Proposal_Pitch.md
│       └── p5c_Proposal_Development_Blueprint.md
│
├── context/                                   ← flat, numbered by phase prefix
│   ├── p1a_Website.md                          ← output of p1a_Website.md
│   ├── p1b_Linkedin_Company.md                 ← output of p1b_Linkedin_Company.md
│   ├── p1c_Linkedin_Owner.md                   ← output of p1_Linkedin_Person.md (owner)
│   ├── p1d_Faith_Based_Guide.md                ← output of p1d_Document.md
│   ├── p1d_Nonprofit_Guide.md                  ← output of p1d_Document.md
│   ├── p1d_School_Guide.md                     ← output of p1d_Document.md
│   ├── p1d_TreeRaise_System_Feature_Benefits.md          ← output of p1d_Document.md ← pending
│   ├── p1e_Job_Posting.md                      ← output of p1e_Job_Posting.md
│   ├── p0a_Decision_Card_TreeRaise.md          ← output of p0a_Decision_Card.md
│   ├── p0b_Problem_Register_TreeRaise.md       ← output of p0b_Problem_Register.md
│   ├── p2a_Lead_Warming.md                     ← output of p2a_Lead_Warming.md
│   ├── p3a_Decision_Safety_Brief_TreeRaise.html                 ← output of p3a_Outcome_Report.md
│   ├── p3b_First_Video_Script_TreeRaise.docx                    ← output of p3b_First_Video_Script.md
│   ├── p3c_Messaging_Playbook_TreeRaise.docx                    ← output of p3c_Messaging_Playbook.md
│   ├── p3d_Consultation_Playbook_TreeRaise.docx                 ← output of p3d_Consultation_Playbook.md
│   ├── p3e_Engagement_Journey_TreeRaise.html                    ← output of p3e_Engagement_Journey.md
│   ├── p4a_Business_Operations_Manual.docx    ← output of p4a_Business_Operations_Doc_Generator.md.md
│   ├── p4b_TreeRaise_Company_Report.docx      ← output of p4b_Business_Report_Doc_Generator.md
│   ├── p4c_Tech_Spec_TreeRaise.docx           ← output of p4c_Tech_Spec_Doc_Generator.md
│   ├── p4e_Demo_Pitch_TreeRaise.docx          ← output of p4e_Demo_Pitch.md
│   ├── p5a_Proposal_TreeRaise.docx            ← output of p5a_Proposal.md
│   ├── p5b_Proposal_Pitch_TreeRaise.docx      ← output of p5b_Proposal_Pitch.md
│   └── p5c_Dev_Blueprint_TreeRaise.html       ← output of p5c_Proposal_Development_Blueprint.md
│
└── portals/                                   ← Phase 4 Step 4 HTML demo outputs
    ├── p4d_admin.html
    └── p4d_partner_portal.html
```

> **Note — one unprocessed raw file:**
> `p1d_TreeRaise_System_Feature_Benefits.md` is pending. Raw source exists — run
> `prompts/phase1_research/p1d_Document.md` on it to produce the cleaned file
> before including it in Phase 4 Step 4a.

> **Note — target CEO files:**
> When running `p1_Linkedin_Person.md` for a target lead CEO (Phase 2 prep),
> save as `context/p1_Linkedin_<TargetCEOName>.md` to distinguish from the
> owner file.

---

## Phase 0 — Decision Card

**What this phase does:** Before any deliverable is built, produce a Decision
Card and Problem Register that set the Confidence Signal — controlling the
tone, precision, and CTA language of all deliverables based on research quality.

**When to run:** Immediately after Phase 1 research files exist, before
Phase 3 (Decision Safety Brief) or Phase 4 (Demo) work begins. The Decision Card
is the mandatory input to every downstream phase.

---

### p0a — Decision Card

**Purpose:** Score all detected goals, classify the primary bottleneck, assess
ROI integrity, and set the Confidence Signal.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase0_decision/p0a_Decision_Card.md` | Prompt |
| `context/p1a_Website.md` | Website research |
| `context/p1b_Linkedin_Company.md` | Company LinkedIn |
| `context/p1c_Linkedin_Owner.md` | Owner LinkedIn |
| `context/p1d_Nonprofit_Guide.md` | Product guide |
| `context/p1d_School_Guide.md` | Product guide |
| `context/p1d_Faith_Based_Guide.md` | Product guide |
| `context/p1e_Job_Posting.md` | Hiring signals |

> Estimated token usage: 40k–80k.

**Save output as:** `context/p0a_Decision_Card_[ClientName].md`

**Confidence Signal rule:** Read the Selected Confidence Level at the bottom
of the output. All deliverables are always built — proceed to p0b, then the
full Phase 3, 4, and 5 suite. The confidence level controls:
- High → use specific numbers, full-confidence framing
- Medium → label L2 metrics as estimated, use supported-projection framing
- Low → use directional language for L3 metrics, add discovery call CTA alongside demo

---

### p0b — Problem Register

**Purpose:** Build the Current Problem Register, Future Problem Register,
Proof Ledger, and Stakeholder Decision Map that feed all downstream demos,
reports, and proposals.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase0_decision/p0b_Problem_Register.md` | Prompt |
| `context/p0a_Decision_Card_[ClientName].md` | Primary input |
| `context/p1a_Website.md` | Research backup |
| `context/p1b_Linkedin_Company.md` | Research backup |
| `context/p1c_Linkedin_Owner.md` | Research backup |

> Estimated token usage: 30k–60k.

**Save output as:** `context/p0b_Problem_Register_[ClientName].md`

---

## Phase 1 — Research

**What this phase does:** Convert raw scraped data into clean, token-efficient
Markdown context files. Run each prompt once per data source. These files feed
every downstream phase.

**When to run:** Before any outreach begins. Complete all available sources first.

---

### p1a_Website.md — Website Context

**Purpose:** Strip noise from the scraped website and produce a single clean
Markdown file covering all pages.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase1_research/p1a_Website.md` | Prompt |
| Raw scraped website file | Input |

**Save output as:** `context/p1a_Website.md`

---

### p1b_Linkedin_Company.md — Company LinkedIn Context

**Purpose:** Clean the company LinkedIn page — About text, posts, employees.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase1_research/p1b_Linkedin_Company.md` | Prompt |
| Raw scraped company LinkedIn page | Input |

**Save output as:** `context/p1b_Linkedin_Company.md`

---

### p1_Linkedin_Person.md — Person LinkedIn Context

**Purpose:** Extract a personal LinkedIn profile — summary, full experience,
recommendations, and posts. Reuse for any individual.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase1_research/p1_Linkedin_Person.md` | Prompt |
| Raw LinkedIn profile page | Input |

**Save output as:** `context/p1_Linkedin_<PersonName>.md`

> Examples: `context/p1c_Linkedin_Owner.md`, `context/p1_Linkedin_WayneElsey.md`
> When running for a target lead CEO, name the file with their name so it's
> distinguishable from the owner file.

---

### p1d_Document.md — Company Document Context (repeat per document)

**Purpose:** Convert a PDF or DOCX company document into clean Markdown.
Run once per document.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase1_research/p1d_Document.md` | Prompt |
| One PDF or DOCX file | Input |

**Save output as:** `context/p1_<DocumentName>.md`

Examples:
- `context/p1d_Faith_Based_Guide.md`
- `context/p1d_Nonprofit_Guide.md`
- `context/p1d_School_Guide.md`
- `context/p1d_TreeRaise_System_Feature_Benefits.md` ← pending

---

### p1e_Job_Posting.md — Job Posting Context (repeat per posting)

**Purpose:** Clean a scraped Upwork or LinkedIn job posting — role,
responsibilities, requirements, and client profile.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase1_research/p1e_Job_Posting.md` | Prompt |
| Raw job posting file | Input |

**Save output as:** `context/p1e_Job_Posting.md`

---

## Phase 2 — Outreach

**What this phase does:** Generate a 3-comment LinkedIn sequence warming the
target CEO toward accepting a connection request.

**When to run:** After Phase 1 is complete. Runs in parallel with Phase 3.

---

### p2a_Lead_Warming.md — Lead Warming Plan

**Preparation:** Scrape the target CEO's LinkedIn profile and run
`p1_Linkedin_Person.md` on it first. Save as `context/p1_Linkedin_<TargetCEOName>.md`.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase2_outreach/p2a_Lead_Warming.md` | Prompt |
| `context/p1_Linkedin_<TargetCEOName>.md` | Target CEO's posts and background |
| `context/p4a_Business_Operations_Manual.docx` | Dev8X context for finding genuine overlap |

> If Phase 4 Step 4a hasn't run yet, substitute `context/p1a_Website.md` and
> `context/p1b_Linkedin_Company.md` as a fallback.
> Estimated token usage: 20k–50k.

**Save output as:** `context/p2_Lead_Warming_<TargetCEOName>.md`

**Sequence:** Comment Day 1 → Day 3 → Day 5. Send connection request after a
reply or once Comment 3 lands well.

---

## Phase 3 — First Touch + Messaging + Diagnosis + Journey Map

**What this phase does:** Turn research into the FREE first video (trust-buyer),
earn a paid "yes" through the reply, run the first PAID gate — a live
consultation that delivers a documented Operational Diagnosis — then hand the
client a map of what comes after. Five prompts: `p3a` builds the recorded
brief, `p3b` scripts the video + DM wrapper only, `p3c` runs the full
post-reply messaging and objection-handling sequence, `p3d` runs the live
consultation, `p3e` generates the "How We Work" journey map.

**When to run:** `p3a` + `p3b` after Phase 1 context exists (parallel with
Phase 2). `p3c` only once `p3b`'s video is finalized and actually sent, and
only continues once the prospect replies. `p3d` only after the prospect agrees
to book the consultation package in `p3c`. `p3e` only after the client has
paid for and experienced the first consultation session and found it worth
it — never sent to a cold prospect.

**The Hold-Back across this phase:** the first video shows the *problem* and stops
(no solutions, no ROI, no build). The consultation diagnoses and sketches *solution
direction* (no working demo). Money is asked for only in the p3b follow-up — never
inside a deliverable.

---

### p3a_Outcome_Report.md — Decision Safety Brief (TRIMMED for hold-back)

The recorded brief. **Trimmed** so it cannot leak the diagnosis on screen:

- Hero stat cards now show the **cost/stakes of the problem**, not solution wins
- Current Problem Register table (4–6 rows) — the homework, in the prospect's words
- Research Transparency table — what we can/can't see (the Trust bridge)
- Future Problem Register — the **Regret Gap** (their stated goal vs. the bottleneck)
- **No solution cards, no ROI dashboard, no chart, no stakeholder section** (withheld)
- CTA is a **reply ask** — no demo button, no calendar, no price

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase3_first_touch/p3a_Outcome_Report.md` | Prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, goal, bottleneck, stakes figure, Emotion Map |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Proof Ledger |
| `context/p1c_Linkedin_Owner.md` | The CEO's stated goal + voice (for the Regret Gap) |

> Estimated token usage: 30k–60k.

**Save output as:** `context/p3a_Decision_Safety_Brief_[ClientName].html`

> **Before recording:** confirm the brief contains no solution/ROI/stakeholder
> sections — the recorded page must hold nothing that gives away the diagnosis.

---

### p3b_First_Video_Script.md — First Video Script (video + DM wrapper only)

Outputs in one doc, hardened after a Phase-3 stress test. Scripts the FREE
trust-buyer step only — no follow-up messaging lives here anymore (that moved
to `p3c`, below):
- **Pre-flight QA gate** — a minimum-specificity threshold (≥3 verifiable, public-
  sourced problems) + a human approval + a version guard that the brief is the
  trimmed p3a. Confident wrongness on a cold CEO is the most expensive failure.
- **Part 0 — DM wrapper & delivery** — the wrapper message that earns the click.
  Must acknowledge the light prior contact from Stage 0 warming (comments +
  accepted connection) rather than claiming total coldness. Also: **mandatory
  burned-in captions** (for muted viewing) and **mobile recording** rules (zoom
  per element, no full-page scroll).
- **Part A — the 2–3 min video** — problem-first, the Regret-Gap beat (decoupled
  from the Beat-3 unknowns), reply-ask close — NO price, no mention of the
  consultation.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase3_outcome_report/p3b_First_Video_Script.md` | Prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — bottleneck, Confidence Signal, Emotion Map, stakes figure |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — current/future problems, research-transparency rows |
| `context/p3a_Decision_Safety_Brief_[ClientName].html` | The brief being walked through (screen mapping) |
| `context/p4a_Business_Operations_Manual.docx` | OPTIONAL — for the proof-of-competence line |

> Estimated token usage: 20k–40k.

**Save output as:** `context/p3b_First_Video_Script_[ClientName].docx`

---

### p3c_Messaging_Playbook.md — Messaging & Objection-Handling (sells the paid ask)

Only runs once `p3b`'s video is finalized and actually sent, and continues once
the prospect replies — never speculatively. Reads the finalized video script so
every number and problem reference matches exactly what was said on camera
(the Alignment Rule). Contains:
- **The happy path** — Message 1 (qualitative only, no number-extraction) →
  Message 2 (the consultation package offer: reframe + stakes tie-back +
  guarantee + proof of competence + legitimacy + the package price + a light
  staircase acknowledgment naming that a demo and a build follow, with zero
  pricing attached to either) → Message 3 (soft follow-up).
- **The War-Game Matrix** — 19 objection branches (A–S) covering every
  realistic scenario: corrections, silent watchers, "too expensive," "send me
  references," stakeholder check-ins, forwarding, free-consulting extraction,
  and more.
- **Stakeholder branches (P, R)** — when a partner/board/CTO needs context, or
  the prospect forwards to someone else: pre-payment, send a light one-page
  summary; post-payment, forward the `p3e` Engagement Journey one-pager instead.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase3_outcome_report/p3c_Messaging_Playbook.md` | Prompt |
| `context/p3b_First_Video_Script_[ClientName].docx` | PRIMARY — the finalized, actually-sent video script |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, Decision Emotion Map, Stakeholder Decision Map |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — problems not used in the video, for Branch O |
| `context/p3a_Decision_Safety_Brief_[ClientName].html` | Sent as an attachment on Branch G |

> Estimated token usage: 15k–30k.

**Save output as:** `context/p3c_Messaging_Playbook_[ClientName].docx`

> **Before sending Message 2:** fill the `[CONSULTATION_FEE]` placeholder — this
> is the same number as `[CONSULTATION_PACKAGE_FEE]` in `p3d`/`p3e`; never let
> the two resolve to different figures.

---

### p3d_Consultation_Playbook.md — Live Consultation (the first PAID gate)

The playbook for the live paid call(s) (~45–60 min each). Sold as a **fixed
multi-session package** (1–4 sessions, each with a named deliverable, ONE
price) defined in `p3e`. **Post-paid on confirmation, not prepaid:** payment is
asked for at the end of a session, never before, and only once the client
confirms it was worth it — there is no refund logic because nothing is
collected until after the verdict. The end-of-session checkpoint (§F.6a) has
three outcomes: pay & continue, the Guarantee Save (one more session before
deciding, max once), or a no-charge true exit. Three parts: **C** the call
script with discovery questions sequenced, **D** the shared Live Capture Sheet
filled in front of the client, **E** the client-facing Operational Diagnosis
they keep. Diagnoses fully and sketches solution direction — never shows
working software or the demo/build price.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase3_outcome_report/p3d_Consultation_Playbook.md` | Prompt |
| `context/p3b_First_Video_Script_[ClientName].docx` | PRIMARY — exact problems, stakes number already said |
| `context/p3c_Messaging_Playbook_[ClientName].docx` | PRIMARY — which branch fired, the fee actually agreed |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Discovery Questions §9, Required Proof Table §7, ROI ladder |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — problems, Manual Operations Mapping, Stakeholder Map |
| `context/p3a_Decision_Safety_Brief_[ClientName].html` | Reference — the brief the client already saw |

> Estimated token usage: 30k–60k.

**Save output as:** `context/p3d_Consultation_Playbook_[ClientName].docx`

> **After the call:** feed the captured numbers back into the Decision Card §8 to
> upgrade L2 estimates to L1 — this raises the Confidence Signal for Phases 4 & 5.

---

### p3e_Engagement_Journey.md — "How We Work" Journey Map

The canonical definition of the commercial ladder (Consultation → Demo →
Build) and the fixed consultation package — `p3c` and `p3d` reference this file
rather than redefining the ladder themselves. Generates a client-facing,
forwardable HTML one-pager reusing `p3a`'s locked design system. **Disclosure
rule:** reveals the shape of all three stages, but prices only the immediate
gate (the consultation package) — demo and build prices stay withheld until
their own gates. **Never sent to a cold prospect** — the earliest legitimate
moment is after the client has paid Dev8X once and found it worth it (the
consultation tee-up, a stakeholder request, or bundled with the diagnosis).

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase3_outcome_report/p3e_Engagement_Journey.md` | Prompt |
| `context/p3b_First_Video_Script_[ClientName].docx` | PRIMARY — exact stakes number, bottleneck, proof-of-competence line |
| `context/p3c_Messaging_Playbook_[ClientName].docx` | PRIMARY — the fee actually agreed |
| `context/p3d_Consultation_Playbook_[ClientName].docx` | The consultation package + diagnosis this page maps to |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, stakes figure |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — operation complexity that sets the session count |
| `prompts/phase3_outcome_report/p3a_Outcome_Report.md` | The locked design system (§6A/§6B/§6C) — copied verbatim |

> Estimated token usage: 20k–40k.

**Save output as:** `context/p3e_Engagement_Journey_[ClientName].html`

> **Not yet built:** a demo-stage gate prompt (paid, guaranteed) to follow this
> one — Phase 4 below is still the legacy, unconverted demo flow.

---

## Phase 4 — Demo & Scoping

**What this phase does:** Build the full business analysis stack, generate
working demo portals, and produce the demo pitch script. Run Steps 4a → 4b →
4c → 4d → 4e in sequence.

**When to run:** After the prospect has engaged — replied on LinkedIn, watched
the outcome video, or booked a discovery call. Do not run this phase for
prospects who have not shown interest.

---

### p4a — Business Operations Manual

**Purpose:** Synthesise all Phase 1 context files into the master reference
document used by every subsequent step.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase4_demo_scoping/p4a_Business_Operations_Doc_Generator.md.md` | Prompt |
| `context/p1a_Website.md` | Website content |
| `context/p1b_Linkedin_Company.md` | Company LinkedIn |
| `context/p1c_Linkedin_Owner.md` | Owner LinkedIn |
| `context/p1d_Faith_Based_Guide.md` | Customer guide |
| `context/p1d_Nonprofit_Guide.md` | Customer guide |
| `context/p1d_School_Guide.md` | Customer guide |
| `context/p1d_TreeRaise_System_Feature_Benefits.md` | Product detail ← produce this first |
| `context/p1e_Job_Posting.md` | Hiring context |

> **This is the only step that reads all Phase 1 context files.**
> Estimated token usage: 60k–130k.

**Save output as:** `context/p4a_Business_Operations_Manual.docx`

---

### p4b — Business Report

**Purpose:** Identify digital transformation opportunities and pain points.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase4_demo_scoping/p4b_Business_Report_Doc_Generator.md` | Prompt |
| `context/p4a_Business_Operations_Manual.docx` | Full synthesised context |

> Estimated token usage: 30k–70k.

**Save output as:** `context/p4b_TreeRaise_Company_Report.docx`

---

### p4c — Technical Specifications Document

**Purpose:** Translate business operations into a full technical spec for the
development team.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase4_demo_scoping/p4c_Tech_Spec_Doc_Generator.md` | Prompt |
| `context/p4a_Business_Operations_Manual.docx` | Operational detail and workflows |
| `context/p4b_TreeRaise_Company_Report.docx` | Digital opportunities and priorities |

> Estimated token usage: 60k–120k.

**Save output as:** `context/p4c_Tech_Spec_TreeRaise.docx`

---

### p4d — Implementation (Demo Portals)

**Purpose:** Generate the working HTML demo portals from the tech spec.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase4_demo_scoping/p4d_TreeRaise_Implementation_Changes.md` | Prompt |
| `context/p4c_Tech_Spec_TreeRaise.docx` | Technical requirements |

> Add `context/p4a_Business_Operations_Manual.docx` if business context is needed
> for implementation decisions.
> Estimated token usage: 40k–100k.

**Save outputs to:** `portals/p4d_admin.html`, `portals/p4d_partner_portal.html`

---

### p4e — Demo Pitch Script

**Purpose:** Generate a 5–7 minute screen-recorded walkthrough script of the
live demo portals. Sent to the prospect after Phase 3 engagement or used during
the discovery call.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase4_demo_scoping/p4e_Demo_Pitch.md` | Prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, Demo Routing Decision, Decision Emotion Map |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Manual Operations Mapping, Proof Ledger |
| `portals/p4d_admin.html` | Primary demo portal |
| `portals/p4d_partner-portal.html` | Secondary demo portal |

> The Decision Card and Problem Register are PRIMARY sources. They determine
> which screens to show and in what order. Every screen in the script must map
> to a Problem Register row and a Proof Ledger entry.
> Estimated token usage: 25k–55k.

**Save output as:** `context/p4e_Demo_Pitch_[ClientName].docx`

---

## Phase 5 — Proposal

**What this phase does:** Deliver the complete proposal package. Run Steps 5a →
5b → 5c in sequence — each feeds the next.

**When to run:** After the prospect has seen the demo and verbally agreed to
receive a proposal.

---

### p5a — Proposal Document

**Purpose:** Generate the full project proposal — team, rates, cost estimate,
market comparison, references, and Implementation Safety. This is a Safe Change
Case, not just a cost document.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase5_proposal/p5a_Proposal.md` | Prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, Delivery Confidence, Adoption Risk, ROI Integrity |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Stakeholder Map |
| `context/p4c_Tech_Spec_TreeRaise.docx` | SECONDARY — Screens, portals, phases, team, hours |

> The Decision Card and Problem Register are PRIMARY sources. They determine
> tone, risk disclosure, and Implementation Safety content. The Tech Spec
> provides the structural data (team, hours, screens).
> Estimated token usage: 20k–50k.

**Save output as:** `context/p5a_Proposal_[ClientName].docx`

---

### p5b — Proposal Pitch Script

**Purpose:** Generate the 12–14 minute video script Abdul reads while
screen-recording a walkthrough of the Proposal and Blueprint together.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase5_proposal/p5b_Proposal_Pitch.md` | Prompt |
| `context/p5a_Proposal_[ClientName].docx` | Source of all numbers, names, phases, and screens |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Decision Risk, ROI Integrity, Confidence Signal |

> The Proposal is the main source for numbers and structure. The Decision Card
> is PRIMARY for Q5 (Decision Risk) and the ROI Integrity statement in Section 04.
> Estimated token usage: 15k–35k.

**Save output as:** `context/p5b_Proposal_Pitch_[ClientName].docx`

---

### p5c — Development Blueprint

**Purpose:** Generate the animated HTML blueprint showing the three delivery
iterations, five development phases, and all portals with their screen lists.
Shown on-screen alongside the Proposal during the pitch video.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase5_proposal/p5c_Proposal_Development_Blueprint.md` | Prompt |
| `context/p4c_Tech_Spec_TreeRaise.docx` | Portals, screens, phases, team |
| `context/p5a_Proposal_TreeRaise.docx` | Screen counts and week ranges |

> Estimated token usage: 20k–50k.

**Save output as:** `context/p5c_Dev_Blueprint_TreeRaise.html`

---

## How the Phases Connect

```
Phase 0       Phase 1      Phase 2     Phase 3a/b (first touch)  Phase 3c (messaging)   Phase 3d (diagnosis)  Phase 3e (journey)   Phase 4            Phase 5
──────────    ──────────   ──────────  ────────────────────────  ─────────────────────  ────────────────────  ───────────────────  ─────────────────  ────────────────
p0a_ Card  →  p1_ files →  p2_ Warming  p3a_ Brief (trimmed)   →  p3c_ Messaging      →  p3d_ Consultation   →  p3e_ "How We Work"   p4a_ Ops Manual    p5a_ Proposal
p0b_ Reg      (parallel)   (parallel)   p3b_ Video (FREE)         + 19-branch matrix      (live, PAID,           (shown once paid  →  p4b_ Report    →  p5b_ Pitch Script
 ↓                                       reply ask only            sells the package       post-paid on           and satisfied)       p4c_ Tech Spec     p5c_ Blueprint
 feeds all                                      │                  price)                  confirmation)              │                p4d_ Portals
 phases 3-5                                     ▼ reply                   │                      │                    ▼                p4e_ Demo Pitch
                                         p3c sells the PAID              ▼ "yes"          → upgrades L2→L1   demo teed up, price
                                         consultation package     package booked          in Decision Card   withheld until its own gate
```

**Phases 2 and 3a/b (first touch) run in parallel** — start LinkedIn comments on
Day 1 while preparing and recording the first video.

**p3c only runs once `p3b`'s video is finalized and sent**, and only continues
once the prospect replies — it reads the finalized video verbatim so nothing it
says drifts from what was said on camera.

**p3d (the paid consultation) only runs after the prospect books the package in
p3c.** It is post-paid on confirmation — payment is asked for at the end of a
session, never before, and only once the client confirms it was worth it. Its
captured numbers flow back into the Decision Card, upgrading L2 estimates to L1
and raising the Confidence Signal for Phases 4 and 5.

**p3e only runs once the client has paid once and found it worth it** — at the
p3d consultation tee-up, a stakeholder request, or bundled with the diagnosis.
Never sent to a cold or unpaid prospect.

**Phase 4 only starts after the paid consultation** — a confirmed, paying prospect.
Do not invest 60k–130k tokens on the full analysis stack until then. Note: Phase
4 (demo) is not yet converted to a paid, guaranteed gate — see the note at the
end of the `p3e` section above.

**Phase 5 runs 5a → 5b → 5c in order** — the pitch script reads the proposal,
the blueprint reads both.

---

## Token Budget

| Phase | Prompt | Inputs | Est. tokens |
|-------|--------|--------|-------------|
| 0 | p0a_ Decision Card | Prompt + all p1_ context files | 40k–80k |
| 0 | p0b_ Problem Register | Prompt + p0a_ + 3 p1_ files | 30k–60k |
| 1 | p1_ (each) | Prompt + one raw file | 10k–40k |
| 2 | p2_ | Prompt + CEO LinkedIn + Ops Manual | 20k–50k |
| 3 | p3a_ Brief (trimmed) | Prompt + Decision Card + Problem Register + Owner LinkedIn | 30k–60k |
| 3 | p3b_ Video Script | Prompt + Decision Card + Problem Register + Brief | 20k–40k |
| 3 | p3c_ Messaging Playbook | Prompt + finalized Video Script + Decision Card + Problem Register | 15k–30k |
| 3 | p3d_ Consultation Playbook | Prompt + Video Script + Messaging Playbook + Decision Card + Problem Register | 30k–60k |
| 3 | p3e_ Engagement Journey | Prompt + Video Script + Messaging Playbook + Consultation Playbook + Decision Card + Problem Register | 20k–40k |
| 4 | p4a_ | Prompt + all p1_ context files | 60k–130k |
| 4 | p4b_ | Prompt + p4a_ only | 30k–70k |
| 4 | p4c_ | Prompt + p4a_ + p4b_ | 60k–120k |
| 4 | p4d_ | Prompt + p4c_ | 40k–100k |
| 4 | p4e_ | Prompt + Decision Card + Problem Register + 2 portal HTML | 25k–55k |
| 5 | p5a_ | Prompt + Decision Card + Problem Register + Tech Spec | 20k–50k |
| 5 | p5b_ | Prompt + p5a_ + Decision Card | 15k–35k |
| 5 | p5c_ | Prompt + p4c_ + p5a_ | 20k–50k |

p4a_ is the only step that reads all Phase 1 files.
Every other step reads only the direct output of the previous step (or, in
Phase 3c–3e, the direct outputs of the previous two or three steps — this is
the most tightly chained part of the pipeline, by design, so nothing said to
the client ever drifts between stages).
