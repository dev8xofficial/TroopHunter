# Dev8X — Document Generation Pipeline

This pipeline moves a prospect through six phases: from raw research to a signed
proposal. Every file is named with a phase prefix so its origin and position in
the pipeline are immediately visible.

**Token limit per Claude session: 190k**

---

## File Naming Convention

```
p1_   Phase 1 — Research
p2_   Phase 2 — Outreach
p3_   Phase 3 — First Touch
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

## The 6-Phase Pipeline

```
PHASE 0 — Decision Card  Research → Decision Card + Problem Register → Gate assessment
PHASE 1 — Research       Raw data → clean context files
PHASE 2 — Outreach       Context → LinkedIn warming plan
PHASE 3 — First Touch    Decision Card + Research → Decision Safety Brief (video sent cold)
PHASE 4 — Demo & Scoping Problem Register + Portals → Demo pitch script
PHASE 5 — Proposal       Decision Card + Problem Register + Tech Spec → Full proposal suite
```

| Phase | Dev8X has done... | Prospect has seen... | Goal |
|-------|-------------------|----------------------|------|
| 0 | Produced Decision Card + Problem Register | Nothing yet | Gate assessment — decide how much to build |
| 1 | Researched the prospect | Nothing yet | Build intelligence |
| 2 | Started LinkedIn comments | First comments from Abdul | Accept connection |
| 3 | Sent outcome video | A personalised Decision Safety Brief | Book a call |
| 4 | Built and demoed the platform | Working portals + demo video | Agree to proposal |
| 5 | Delivered full proposal suite | Proposal + pitch video + blueprint | Sign and start |

---

## Folder Structure

```
treeraise/
├── prompts/
│   ├── README.md
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
│   ├── phase3_first_touch/
│   │   └── p3a_Outcome_Report.md
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

## Phase 3 — First Touch

**What this phase does:** Generate a personalised visual HTML report quantifying
the business impact Dev8X can deliver. Screen-record it as a 2–3 minute video
and send it as the first direct message after connection is accepted.

**When to run:** After Phase 1 context files exist. Runs in parallel with Phase 2.

---

### p3a_Outcome_Report.md — Decision Safety Brief

**The report includes:**
- Buyer Confirmation Status badge (Confirmed / Partial / Hypothesis)
- Three headline numbers — L1 or L2 metrics only; L3/L4 never in hero
- Current Problem Register table (4–6 rows) drawn from Problem Register
- Proof Ledger Summary showing claims, evidence, and proof conditions
- Future Problem Register table (3 rows) triggering Fear of Inaction
- 4–7 solution cards linked to specific problem numbers, each with ROI Integrity label
- ROI Integrity Summary grouping all metrics by L1/L2/L3/L4 classification
- CTA dynamically adjusted to Confidence Signal level

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/phase3_first_touch/p3a_Outcome_Report.md` | Prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, goals, bottlenecks, ROI Integrity |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Proof Ledger |
| `context/p4b_TreeRaise_Company_Report.docx` | SECONDARY — Pain points and transformation opportunities |
| `context/p4a_Business_Operations_Manual.docx` | SECONDARY — Workflow detail for quantification |

> The Decision Card and Problem Register are PRIMARY sources. The Business Report
> and Operations Manual are secondary fallbacks.
> Estimated token usage: 30k–60k.

**Save output as:** `context/p3a_Decision_Safety_Brief_[ClientName].html`

> **Before sending:** replace `href="#"` on the "Watch the Demo" button with
> the real demo video link.

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
Phase 0        Phase 1        Phase 2       Phase 3          Phase 4               Phase 5
──────────     ──────────     ──────────    ────────────     ──────────────────    ────────────────
p0a_ Card  →  p1_ files  →  p2_ Warming   p3_ Decision     p4a_ Ops Manual       p5a_ Proposal
p0b_ Reg       (parallel)    (parallel)    Safety Brief     p4b_ Report      →   p5b_ Pitch Script
 ↓                                        (always built)     p4c_ Tech Spec        p5c_ Blueprint
 feeds all                                                   p4d_ Portals
 phases 3-5                                                  p4e_ Demo Pitch
```

**Phases 2 and 3 run in parallel** — start LinkedIn comments on Day 1 while
preparing and recording the outcome report video.

**Phase 4 only starts after prospect engagement** — a reply, a watched video,
or a booked call. Do not invest 60k–130k tokens on the full analysis stack until
there is confirmed interest.

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
| 3 | p3_ | Prompt + Decision Card + Problem Register | 30k–60k |
| 4 | p4a_ | Prompt + all p1_ context files | 60k–130k |
| 4 | p4b_ | Prompt + p4a_ only | 30k–70k |
| 4 | p4c_ | Prompt + p4a_ + p4b_ | 60k–120k |
| 4 | p4d_ | Prompt + p4c_ | 40k–100k |
| 4 | p4e_ | Prompt + Decision Card + Problem Register + 2 portal HTML | 25k–55k |
| 5 | p5a_ | Prompt + Decision Card + Problem Register + Tech Spec | 20k–50k |
| 5 | p5b_ | Prompt + p5a_ + Decision Card | 15k–35k |
| 5 | p5c_ | Prompt + p4c_ + p5a_ | 20k–50k |

p4a_ is the only step that reads all Phase 1 files.
Every other step reads only the direct output of the previous step.
