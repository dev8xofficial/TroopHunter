# Vision-Led Balanced Matrix v6: Priority Stack Framework

> **Lineage:** v1 = Priority Mode anchor. v2 = Absorbed 6 counter-perspectives.
> v3 = Priority Detection Algorithm, North Star Scoring, Decision Tree, prompt instructions.
> v4 = p0 Pre-Step, Priority Thread Variable, Portal KPI Mapping, Demo Screen Routing.
> v5 = Organization-independent rewrite. Removes all single-company coupling.
> Introduces configurable variables, universal examples, and multi-org deployment model.
> v6 = Priority Stack upgrade. Replaces single-priority narration with Primary,
> Secondary, Tertiary, and De-emphasized priority roles across report, demo, and proposal.
> Every concept from v3/v4/v5 is preserved. Nothing is lost — only generalized and ranked.

---

## TABLE OF CONTENTS

| Part | Title | Key Content |
|---|---|---|
| 0 | [Why This File Exists](#part-0--why-this-file-exists) | Problem statement, what makes v6 different |
| 1 | [Configuration Variables](#part-1--configuration-variables) | {PROVIDER}, {PROSPECT}, phase file mapping |
| 2 | [Priority Detection Algorithm](#part-2--the-priority-detection-algorithm) | Four Priorities, Priority Stack, Signal Weighting Table, 3 archetypes |
| 3 | [North Star Scoring](#part-3--north-star-scoring-confidence-tiers) | Tier A/B/C, Conflict Resolution hierarchy |
| 4 | [p0 Pre-Step](#part-4--the-p0-pre-step-priority-detection-as-a-structured-output) | Structured output, Priority Stack Thread, downstream rule |
| 5 | [3-Step Data Engine](#part-5--the-3-step-data-engine) | Pain Extraction, Ambition Detection, Human Impact, Demo Proof Map |
| 6 | [Fixed Deliverable Structure](#part-6--fixed-deliverable-structure-guaranteed-quality-floor) | Impact Snapshot, 5-Section Report, Priority Stack Roles, Hero Stats, Metric Slots |
| 7 | [Portal KPI Mapping](#part-7--portal-kpi-mapping) | Admin + Partner portal mapping, Priority Emphasis Layer |
| 8 | [Demo Pitch](#part-8--the-demo-pitch--3-act-structure-by-priority-stack) | 3-Act structure, screen routing by Priority Stack, hook template |
| 9 | [Proposal ROI Framework](#part-9--proposal-roi-framework-3-lenses) | Three-Lens ROI, lens order by Priority Stack |
| 10 | [Tier C Execution Path](#part-10--tier-c-execution-path-data-poor-prospects) | Data-poor path, generic demo, discovery call questions |
| 11 | [Decision Tree](#part-11--one-page-decision-tree) | Operator flowchart, tie-breaking, Balanced Twin |
| 12 | [Prompt Modifications](#part-12--prompt-modification-instructions) | Copy-paste prompt blocks for each phase |
| 13 | [Implementation Checklist](#part-13--implementation-checklist) | 35-item operational checklist |
| 14 | [Framework Lineage](#part-14--framework-lineage) | Source absorption table |
| 15 | [Worked Example](#part-15--worked-example-archetype-1-end-to-end) | Full p0 output, snapshot, demo, proposal for Archetype 1 |
| App | [Quick-Reference Card](#appendix--priority-quick-reference-card) | One-page cheat sheet |

## PART 0 — WHY THIS FILE EXISTS

Every pipeline that sells digital transformation makes one fatal assumption:
that the value proposition is the same for every client.

It is not.
                        
A social enterprise chasing 500 partner organizations by year-end does not care
about saving $2,000/month. Their bottleneck is operational capacity — not money.
A bootstrapped SaaS founder bleeding cash on manual ops does not care about
"10x scale" — they need to stop the bleeding first. A mid-market services firm
drowning in admin does not want a growth story — they want their Tuesday back.

This framework solves that problem permanently. It introduces a **Priority
Detection Algorithm** that runs before any deliverable is written, identifies the
prospect's Primary, Secondary, Tertiary, and De-emphasized strategic drivers from
observable data, and threads that ranked narrative through every phase of the
pipeline.

### What Makes v6 Different

v3 and v4 were correct in concept but hardwired to a single service provider and
a single example client. v5 removed that coupling. v6 keeps that universality and
adds a more realistic buyer model: every prospect has multiple priorities, but
only one should lead the pitch.

- All company-specific names are replaced with **configurable variables** (`{PROVIDER}`, `{PROSPECT}`, `{PRESENTER}`)
- All internal file references use **generic phase notation** (`Phase-1 Research`, `Phase-3 Report`)
- Worked examples use **three distinct archetypes** instead of one real company
- The framework can be deployed by any organization selling transformation services
- Priority scoring now produces a **Priority Stack**: Primary, Secondary, Tertiary,
  and De-emphasized priorities
- Outcome reports, demo scripts, portal screen order, and proposals must follow
  the Priority Stack instead of flattening every client into one value proposition

> **Rule:** When implementing this framework, replace every `{VARIABLE}` with your
> organization's actual values before generating deliverables.

---

## PART 1 — CONFIGURATION VARIABLES

Before using this framework, set these variables for your organization:

```
{PROVIDER}        — Your company name (the service provider)
{PRESENTER}       — The person delivering demos and pitches
{PROSPECT}        — The target company being analyzed
{PROSPECT_ROLE}   — The primary decision-maker's title (e.g., CEO, COO, Founder)
{NORTH_STAR}      — The prospect's stated or inferred strategic goal
{CONTACT_EMAIL}   — Your outreach email
{CONTACT_CHANNEL} — Your preferred contact method (email, LinkedIn, etc.)
```

### Phase File Naming Convention

This framework references pipeline phases generically. Map these to your actual file structure:

| Generic Reference | Description | Your File Name |
|---|---|---|
| `Phase-1:Website` | Prospect website research | _(map to your naming)_ |
| `Phase-1:LinkedIn-Company` | Company LinkedIn analysis | _(map to your naming)_ |
| `Phase-1:LinkedIn-Founder` | Founder/CEO LinkedIn analysis | _(map to your naming)_ |
| `Phase-1:Job-Postings` | Active job posting analysis | _(map to your naming)_ |
| `Phase-1:Supporting` | Any additional research files | _(map to your naming)_ |
| `Phase-0:Priority-Profile` | Priority Detection output (this framework creates it) | _(map to your naming)_ |
| `Phase-3:Outcome-Report` | The main value proposition report | _(map to your naming)_ |
| `Phase-4:Demo-Script` | The demo pitch script | _(map to your naming)_ |
| `Phase-4:Portal-Implementation` | Demo portal build instructions | _(map to your naming)_ |
| `Phase-5:Proposal` | The commercial proposal | _(map to your naming)_ |

---

## PART 2 — THE PRIORITY DETECTION ALGORITHM

Before writing a single word of any deliverable, the AI must score all four
strategic priorities and convert them into a **Priority Stack**. The highest
confidence priority becomes the lead narrative, but the other priorities are not
discarded. They become supporting proof, secondary ROI lenses, or angles to avoid.

This matters because real founders rarely have only one concern. A prospect may
care about growth, productivity, execution speed, and cost at the same time. The
framework's job is to decide what leads, what supports, and what stays in the
background.

### The Four Priorities

**Priority A — Scalability / Growth Execution**
The prospect has a specific volume or market expansion goal and their current systems
cannot support that scale without breaking.

Signals: explicit numerical targets ("500 partners", "10x revenue", "100 new locations"),
rapid hiring, multi-market expansion language, new geography launches, franchise or
network model, waitlists or backlog mentioned.

Demo framing: "Your current operations handle X. This infrastructure handles 10X."
Metric set: Capacity Unlocked, Volume Handled, Processing Velocity, Units Supportable/Month.

**Priority B — Revenue Growth / Deal Velocity**
The prospect wants to close more deals, faster, or unlock new revenue streams. Their
bottleneck is sales throughput, not operational capacity.

Signals: sales team hiring, CRM references, "we need more clients" language, commission
structures mentioned in job postings, revenue growth targets in founder posts,
outbound expansion language.

Demo framing: "This platform lets your team close 30% more deals without adding headcount."
Metric set: Deals Closed/Month, Time-to-Close Reduction, Revenue Unlocked/Month.

**Priority C — Operational Efficiency / Productivity**
The prospect wants to ship faster, deliver better service, and eliminate friction. Their
bottleneck is internal process quality, not volume or sales.

Signals: burnout language in job postings, "we're drowning in admin" posts, quality
complaints in reviews, ops roles that should be strategic but are doing manual work,
turnaround time mentioned as a client complaint.

Demo framing: "Your team can deliver in the same day instead of next week."
Metric set: Hours Saved/Week, Turnaround Time Reduction, Error Rate Eliminated,
Tasks Automated.

**Priority D — Cost Reduction (Fallback Only)**
The prospect's primary driver is reducing operational spend, headcount, or tooling costs.

Signals: layoff mentions, cost-cutting language, "lean team" framing, references to
over-spending on tools, finance-led decision making, CFO as primary stakeholder.

Demo framing: "This eliminates $X/month in operational waste."
Metric set: Hours Saved, Cost Impact ($), Effort Reduction (%).

> **Rule:** Priority D is the fallback only. It is never the first choice unless
> cost signals clearly dominate the evidence. Most early-stage mission-driven
> organizations are Priority A. Most established SMBs are Priority C.
> Priority D is most common in late-stage or contracting businesses.

---

### Priority Stack Levels

After scoring, assign every priority to one narrative role:

| Stack Level | Meaning | How It Is Used |
|---|---|---|
| **Primary Priority** | The strongest, most strategically relevant driver | Leads the report hero, demo opening frame, first portal screen, and proposal ROI order |
| **Secondary Priority** | A strong supporting driver | Becomes the second proof layer in solution cards, demo screen two/three, and supporting ROI lens |
| **Tertiary Priority** | A useful but non-leading benefit | Appears as supporting evidence, usually in later report/demo/proposal sections |
| **De-emphasized / Do Not Lead With** | Weak, risky, or potentially distracting angle | Do not use as the headline; include only if explicitly supported or asked by the prospect |

**Ranking rule:**
1. Sort all priorities by weighted score.
2. Confirm the top priority against the North Star Confidence Tier.
3. Assign the next strongest two as Secondary and Tertiary only if they have real
   evidence. Do not invent a Secondary/Tertiary priority just to fill the stack.
4. Any priority with weak evidence, conflicting evidence, or risky positioning becomes
   De-emphasized.
5. Cost Reduction remains De-emphasized unless Priority D has the strongest evidence
   or the prospect explicitly names budget reduction as a goal.

**Narrative rule:** The Primary Priority controls the headline. The Secondary and
Tertiary priorities control proof sequencing. De-emphasized priorities must not
appear in the opening, hero stats, or first proposal lens.

### Signal Weighting Table

When scanning Phase-1 files, assign weight points to each signal found.
The highest score usually becomes Primary, but the final output is a ranked stack,
not a single winner.

| Signal Type | Source | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|---|
| Explicit numerical growth target | LinkedIn / website | **+5** | +2 | 0 | 0 |
| Aggressive hiring in ops/tech roles | Job posting | **+3** | +2 | +2 | -1 |
| Revenue target or funding mention | LinkedIn / press | +2 | **+5** | 0 | 0 |
| "Burnout", "drowning", "manual" language | Job posting / posts | +1 | 0 | **+4** | +2 |
| Cost-cutting or "lean" language | Any source | 0 | 0 | +1 | **+5** |
| Multi-market expansion planned | Website / LinkedIn | **+4** | +3 | 0 | 0 |
| Sales team or CRM hiring | Job posting | +1 | **+4** | +1 | 0 |
| Client complaint about turnaround | Reviews / posts | 0 | 0 | **+4** | 0 |
| CFO or finance-led organization | LinkedIn team | -1 | 0 | 0 | **+4** |
| Founder posts about scale/mission | LinkedIn posts | **+3** | +1 | +1 | -1 |
| Social enterprise / mission-driven model | Website | **+3** | +1 | +1 | -2 |

### Scoring Examples (Three Archetypes)

**Archetype 1 — Mission-Driven Nonprofit (Priority A)**
- "Goal: 500 partner organizations by 2026" → A: +5
- Hiring a Client Coordinator (ops/client role) → A: +3
- Founder posts repeatedly about scaling mission globally → A: +3
- Social enterprise / mission-driven model → A: +3
- No cost-cutting signals → D: 0
- **Priority Stack:** Primary = A — Scalability. Secondary = C — Efficiency
  if manual coordination signals are present. De-emphasized = D — Cost.

**Archetype 2 — B2B SaaS Startup (Priority B)**
- "Series A raised, targeting $5M ARR" → B: +5
- Hiring 3 SDRs and an AE → B: +4
- Founder posts about pipeline velocity → B: +1
- Aggressive ops/tech hiring → B: +2
- **Priority Stack:** Primary = B — Revenue Growth. Secondary = A — Capacity
  if scaling/hiring signals are strong. Tertiary = C — Efficiency.

**Archetype 3 — Regional Services Firm (Priority C)**
- Job posting mentions "high-volume manual processing" → C: +4
- Google Reviews cite slow turnaround → C: +4
- Office Manager posting says "detail-oriented, handles 200+ weekly entries" → C: +4
- No growth targets, no revenue signals → A: 0, B: 0
- **Priority Stack:** Primary = C — Operational Efficiency. Secondary = D — Cost
  only if the manual workload has defensible cost evidence. De-emphasize A/B until
  discovery confirms growth or revenue goals.

---

## PART 3 — NORTH STAR SCORING (Confidence Tiers)

After identifying the Priority, score the confidence of the North Star
(the specific stated goal) on a 3-tier system.

### Tier A — Direct Quote (Score: 8–10)
A specific, attributed, quantified statement found in the source data.

Examples:
- "Our 2026 goal: 500+ partner organizations" [Source: Phase-1:Website, Press Kit]
- "Targeting $10M ARR by Q4" [Source: Phase-1:LinkedIn-Founder, March post]

Action: Use the exact quote as the anchor in the report hero section.
Flag the source explicitly. Full vision-anchored narrative is activated.

### Tier B — Strong Inference (Score: 4–7)
No explicit quote, but 3+ consistent directional signals point to the same ambition.

Examples:
- Hiring aggressively in a new market (operational scale signal)
- LinkedIn posts repeatedly reference expanding the mission globally
- Website mentions past achievements that imply a growth trajectory

Action: Frame as "Based on your current trajectory..." not "You said...".
Use conditional language. Do not invent a number. Tier B narrative activated.

### Tier C — Insufficient Data (Score: 0–3)
Fewer than 3 directional signals. Website is generic. No strategic content found.

Action: Skip vision framing entirely. Use pure Pain → Fix → Unlock structure.
Do not guess. Do not hallucinate a goal. Tier C narrative activated.

### North Star Conflict Resolution

When signals conflict (e.g., LinkedIn posts suggest growth but job posting suggests
lean team / cost-cutting), apply the **Hierarchy of Evidence**:

1. Job Postings (most current, operational reality)
2. Operational Documents / Operations Manual
3. CEO/Founder LinkedIn Posts (stated intent)
4. Company LinkedIn Posts (marketing intent)
5. Website "About Us" / Mission Pages
6. Marketing Taglines (least reliable — aspirational, not operational)

The source higher on this list wins the conflict.

---

## PART 4 — THE p0 PRE-STEP: PRIORITY DETECTION AS A STRUCTURED OUTPUT

### What p0 Is

A mandatory step that runs BEFORE any deliverable phase begins.
It reads all Phase-1 context files and produces a single structured Markdown file.
This file becomes the **thread variable** — the single source of truth passed to
every downstream phase.

### Why This Matters

If Priority Detection lives inside a downstream prompt (e.g., inside the Outcome
Report prompt), the report template has already set its defaults before classification
runs. Detection must be a **structured output** — not a reading instruction.

### When to Run p0

Run p0 after Phase-1 is complete and before any Phase-3+ deliverable is generated.
p0 runs once per prospect. Its output is reused across all phases.

### p0 Input Files

| File | Role |
|------|------|
| Phase-1:Website | Primary signal source |
| Phase-1:LinkedIn-Company | Company framing and post themes |
| Phase-1:LinkedIn-Founder | Founder goals and language |
| Phase-1:Job-Postings | Operational reality signals |
| Phase-1:Supporting | Any additional research files |

### p0 Output File Structure

Save output as: `Phase-0:Priority-Profile-{PROSPECT}`

```markdown
---
prospect: {PROSPECT}
provider: {PROVIDER}
generated: {DATE}
version: p0_v6
---

# Priority Profile — {PROSPECT}

## Signal Scan Results

| Priority | Score | Key Signals Found |
|----------|-------|-------------------|
| A — Scalability | [N] | [list signals with sources] |
| B — Revenue | [N] | [list signals with sources] |
| C — Efficiency | [N] | [list signals with sources] |
| D — Cost | [N] | [list signals with sources] |

## Classification Result

**Primary Priority: [A / B / C / D] — [Name]**
**Secondary Priority: [A / B / C / D / None] — [Name or "Not enough evidence"]**
**Tertiary Priority: [A / B / C / D / None] — [Name or "Not enough evidence"]**
**De-emphasized / Do Not Lead With: [A / B / C / D] — [reason]**
**Confidence Tier: [A / B / C]**
**Confidence Score: [0–10]**

## Priority Stack

| Stack Level | Priority | Evidence Strength | Narrative Role |
|---|---|---|---|
| Primary | [A/B/C/D] — [Name] | [High/Medium/Low] | Leads hero, demo opening frame, first portal screen, first ROI lens |
| Secondary | [A/B/C/D/None] — [Name] | [High/Medium/Low/None] | Supports solution cards, second/third demo screens, second ROI lens |
| Tertiary | [A/B/C/D/None] — [Name] | [High/Medium/Low/None] | Mention later as a supporting benefit |
| De-emphasized | [A/B/C/D] — [Name] | [Weak/Risky/Conflicting] | Do not lead with this angle |

## North Star

**Quote:** "[exact quote if Tier A, or 'Not found' if Tier B/C]"
**Source:** [file name and section]
**Frame:** [how to reference this in deliverables]

## Narrative Directives

**Hook sentence (demo opening):**
[One specific, verifiable, citable operational pain — ready to read aloud]

**Hero Stats for Outcome Report:**
- Stat 1: [label] — [value or calculation method]
- Stat 2: [label] — [value or calculation method]
- Stat 3: [label] — [value or calculation method]

**Solution Card Metric Slots:**
- Slot 1 label: [e.g., "Capacity Unlocked" for Priority A]
- Slot 2 label: [e.g., "Volume Handled" for Priority A]
- Slot 3 label: [e.g., "Units Supportable at Scale" for Priority A]

**Manual Task Proof Map:**
| Manual Task | Priority Supported | Human Role | Demo Screen That Proves It Is Solved |
|---|---|---|---|
| [manual task 1] | [Primary/Secondary/Tertiary priority] | [role] | [screen/panel name] |
| [manual task 2] | [Primary/Secondary/Tertiary priority] | [role] | [screen/panel name] |
| [manual task 3] | [Primary/Secondary/Tertiary priority] | [role] | [screen/panel name] |

**Demo closing line (Act 3 Possibility):**
[Ready-to-read closing line tied to Priority and Tier]

**Portal Emphasis:**
- Primary panel to open first: [panel name]
- KPI cards to highlight: [list specific card labels]
- Screens to navigate in order: [ordered list that follows Primary → Secondary → Tertiary proof]

## Execution Path

- Tier A: Full vision-anchored narrative. All phases. Quote North Star in hero.
- Tier B: Trajectory-based narrative. Frame as "where you're heading." No invented numbers.
- Tier C: Pain → Fix → Unlock only. 24-Hour Impact Snapshot first. No vision claims.
```

### Priority Thread — How p0 Connects to Every Phase

The Priority Profile file must be attached to every downstream prompt.

```
Phase 1 (Research)
  └── All Phase-1 files produced

p0 Pre-Step (runs before Phase 3)
  └── Reads all Phase-1 files
  └── Produces: Phase-0:Priority-Profile-{PROSPECT}
  └── This file is attached to every prompt below

Phase 3 — Outcome Report
  └── Attaches: Priority Profile + Phase-1 files
  └── Reads Priority Stack → selects Hero Stats, Metric Slots, narrative frame

Phase 4 — Business Operations Manual
  └── Attaches: Priority Profile + Phase-1 files

Phase 4 — Portal Implementation
  └── Attaches: Priority Profile + Tech Spec
  └── Reads Priority Stack → applies Portal KPI Mapping and emphasis order

Phase 4 — Demo Script
  └── Attaches: Priority Profile + portal files + Operations Manual
  └── Reads Priority Stack → applies Demo Screen Routing and Manual Task Proof Map

Phase 5 — Proposal
  └── Attaches: Priority Profile + Tech Spec
  └── Reads Priority Stack → selects correct ROI lens order

Phase 5 — Proposal Pitch Script
  └── Attaches: Priority Profile + Proposal
```

### Rule for Every Downstream Prompt

Add this block at the top of every downstream prompt:

```
FIRST — Read Phase-0:Priority-Profile-{PROSPECT} completely before writing anything.
This file contains your Priority Stack classification, Confidence Tier, North Star,
Hero Stats, Metric Slot labels, Manual Task Proof Map, Hook sentence, closing line,
and Portal Emphasis.
All content you generate must reflect these directives.
Do not default to cost-savings framing. Do not default to hours-saved metrics.
Use only the metric categories specified in the Priority Profile.
Lead with the Primary Priority. Use Secondary and Tertiary priorities as supporting
proof only. Do not lead with any De-emphasized priority.
```

---

## PART 5 — THE 3-STEP DATA ENGINE

The engine runs once per prospect, before any deliverable is generated.
Output feeds directly into the deliverable templates in Part 6.

### Step 1 — Manual Pain Extraction (Always Run)

Scan all Phase-1 files. Extract every observable manual operation — tasks real
people are doing by hand that could be automated.

**Rules:**
- Every pain point must cite its source file and the specific text that supports it.
- Minimum 3, maximum 7 pain points.
- Tag each with: Time Cost (hrs/wk) and Risk Factor (Low/Medium/High).
- No invented statistics. Use qualitative language if no number is supportable.
- Map each pain point to the human role doing it (from Step 3 — Human Impact Mapping).
- Map each pain point to the Priority Stack level it supports: Primary, Secondary,
  Tertiary, or De-emphasized.
- Map each pain point to the exact demo screen/panel that proves the manual task
  has been automated or resolved.

**Example Output (Archetype 1 — Mission-Driven Nonprofit):**
| # | Pain Point | Source | Time Cost | Risk | Human Role | Priority Supported | Demo Proof Screen |
|---|---|---|---|---|---|---|---|
| 1 | No CRM — field coordinators manually track every new signup | Phase-1:Job-Postings (Coordinator role), Phase-1:Website (no pipeline visible) | ~6 hrs/wk | High | Field Coordinator | Primary A — Scalability | Admin Portal → Pipeline / All Partners |
| 2 | Zero email automation — no nurture for warm leads, no renewal trigger | Phase-1:LinkedIn-Company (no automation posts), Phase-1:Website (manual outreach implied) | ~8 hrs/wk | High | Field Coordinator | Secondary C — Efficiency | Communications / Automations |
| 3 | Follow-up after every signup is 100% manual | Phase-1:Job-Postings ("serve as primary point of contact") | ~4 hrs/wk | High | Field Coordinator | Primary A + Secondary C | Coordinator Task Queue |
| 4 | Impact reports manually assembled by one person | Phase-1:Website (team page, single Reporting Specialist) | ~6 hrs/mo (scales badly at volume) | High | Reporting Specialist | Secondary C — Efficiency | Growth Analytics / Reports |
| 5 | No outbound prospecting system — growth is 100% inbound only | Phase-1:Website (no BDR role), Phase-1:LinkedIn-Founder (organic-only strategy) | N/A (revenue risk) | High | Founder / BDR | Tertiary B — Revenue | Growth Analytics / Acquisition |

### Step 2 — Ambition Detection (Run After Priority Scoring)

Apply the Confidence Tier system from Part 3.

**Example (Archetype 1):**
- Tier A confirmed: "2026 partner engagement goal: 500+" directly from website
- North Star: Reach 500 partner organizations by end of 2026
- Confidence Score: 9/10

**Example (Archetype 3 — Regional Services Firm):**
- Tier C: No explicit goal statement. Website is generic. Two directional signals only.
- North Star: Not found
- Confidence Score: 2/10
- Action: Skip vision framing. Use Pain → Fix → Unlock only.

### Step 3 — Human Impact Mapping

For each pain point from Step 1, map to three human layers:

**Layer 1 — The Executive (Buyer):**
What does this pain prevent them from doing strategically?
_Example: The founder cannot see the conversion funnel from interested lead →
active client. They are flying blind on whether their growth goal is achievable._

**Layer 2 — The Operator (Daily User):**
What is this person's Tuesday like because of this pain?
_Example: The field coordinator spends 4 hours every morning manually checking
on new signups via email. Has no system to know which leads are warm, cold, or
at risk of churning._

**Layer 3 — The End-Client (Customer/Beneficiary):**
What does this person experience because of the pain?
_Example: The customer receives a generic follow-up email days after signing up.
No real-time dashboard. The experience feels disconnected from the organization's
brand promise._

---

## PART 6 — FIXED DELIVERABLE STRUCTURE (Guaranteed Quality Floor)

The structure of every deliverable is locked. What adapts dynamically is the
content *within* each section, based on the Priority Stack (Primary / Secondary /
Tertiary / De-emphasized) and Confidence Tier.

### 6.1 — The 24-Hour Impact Snapshot (First Touch Deliverable)

**Purpose:** Sent within 24 hours of a lead expressing interest. Generated from
Step 1 data only. No vision analysis required. Earns attention before investing
in the full package.

**Template:**

```
IMPACT SNAPSHOT — {PROSPECT}
Prepared by {PROVIDER} · {DATE}

We analyzed {PROSPECT}'s public operations.
Here is what we found.

─────────────────────────────────────────────

THE BOTTLENECK:
[Single most painful manual operation from Step 1 — one sentence, specific]

3 THINGS WE CAN ELIMINATE:
→ [Pain Point 1] — [Time Cost or Risk]
→ [Pain Point 2] — [Time Cost or Risk]
→ [Pain Point 3] — [Time Cost or Risk]

WHAT THIS UNLOCKS:
[Priority A: "The operational capacity to scale to {NORTH_STAR}"]
[Priority B: "The bandwidth to close [X]% more deals per month"]
[Priority C: "Your team's time back for the work that actually grows the business"]
[Priority D: "$[X]/month in recoverable operational cost"]

─────────────────────────────────────────────

[SCREENSHOT: Most impressive screen from the admin or client portal]

Want to see the full demo?
→ Reply to this message. I'll send a 6-minute walkthrough.

{PRESENTER} | {PROVIDER}
{CONTACT_EMAIL} | {CONTACT_CHANNEL}
```

**Generation rule:** This is the ONLY deliverable generated before prospect engagement
is confirmed. The full package (Outcome Report + Demo + Proposal) is generated only
after the prospect responds.

---

### 6.2 — The Outcome Report — Fixed 5-Section Architecture

Every Outcome Report follows this exact section order, every time:

**Section 1 — Operational Snapshot**
What the company does, who it serves, how it works today.
Always achievable. Never skipped.

**Section 2 — The Friction Map**
3–7 manual bottlenecks with time costs, human impact, Priority Stack support,
and demo proof screens from Step 1.
Always achievable. Never skipped.

**Section 3 — The Transformation Preview**
For each friction point: before/after using the actual demo portal screens.
Sequence the proof so Primary Priority tasks appear first, Secondary tasks second,
and Tertiary tasks later.
Always achievable (tied to our product). Never skipped.

**Section 4 — The Strategic Unlock**
What becomes possible when friction is removed.
**THIS SECTION ADAPTS BY PRIMARY PRIORITY AND TIER:**

| Priority | Tier A | Tier B | Tier C |
|---|---|---|---|
| A (Scale) | "This infrastructure directly supports your stated goal of {NORTH_STAR}. Here is how each automation maps to that target." | "With these bottlenecks removed, your team gains the capacity to handle 3–5x more volume. Here is what that trajectory makes possible." | "With these bottlenecks removed, your team can scale operations without adding headcount." |
| B (Revenue) | "This directly enables your stated revenue target of {NORTH_STAR}. Here is how." | "With these fixes in place, your pipeline can close [X]% more deals per month." | "With this in place, your team reclaims the time needed to grow revenue without adding staff." |
| C (Efficiency) | "Your stated goal of {NORTH_STAR} requires your team to operate at full capacity — not half-capacity managing admin." | "Removing these bottlenecks frees your team to focus on what they were hired to do." | "Your team reclaims [X] hours per week. Here is what that time is worth." |
| D (Cost) | "Beyond the cost savings, this infrastructure positions you for {NORTH_STAR}." | "The cost savings fund the next phase of growth." | "$[X]/month recovered. Break-even in [N] months." |

**Section 5 — Investment Framework**
Pricing and timeline reference. Always achievable. Never skipped.
Keep this section brief — full detail lives in the Proposal.

---

### 6.2.1 — Priority Stack Roles Inside the Outcome Report

The Outcome Report must not flatten every benefit into one generic value claim.
Use the Priority Stack to decide where each value angle appears:

| Stack Level | Report Placement | Rule |
|---|---|---|
| Primary | Title, hero stats, Section 4 Strategic Unlock, first solution card | This is the headline value proposition |
| Secondary | Friction Map grouping, second solution card, supporting proof paragraph | Use as proof that the Primary Priority is operationally achievable |
| Tertiary | Later solution card, note in Investment Framework, optional appendix | Mention as additional upside, not the main reason to buy |
| De-emphasized | Omit from headline and hero stats | Include only if directly supported by evidence or requested by the prospect |

**Example:** If Primary = Scalability, Secondary = Efficiency, and Tertiary = Revenue,
the report leads with the capacity to reach the growth target. It then proves the
manual tasks automated, and only later mentions revenue/deal upside as a byproduct.
It does not lead with cost savings unless Cost is Primary.

---

### 6.3 — Hero Stats Block (Section 1 of Outcome Report)

The three headline numbers in the hero section must match the Primary Priority:

| Priority | Stat 1 | Stat 2 | Stat 3 |
|---|---|---|---|
| A (Scale) | Capacity Unlocked (e.g., "500 units supported") | Processing Velocity (e.g., "10x volume") | Manual Workflows Eliminated |
| B (Revenue) | Revenue Unlocked/Month | Deals Closed/Month (increase) | Time-to-Close Reduction |
| C (Efficiency) | Hours Saved/Week | Turnaround Time Reduction | Error Rate Eliminated |
| D (Cost) | Hours Saved/Week | Cost Impact ($/month) | Workflows Automated |

### 6.4 — Solution Card Metric Mapping

Each Priority gets its own three metric slots with correct labels.
Do NOT default to "Time Saved / Cost Impact / Effort Reduction" — those are Priority D slots.

**Priority A — Scalability:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Capacity Unlocked | How many units/clients/campaigns can the system handle at the stated volume target? |
| Slot 2 | Volume Handled | How many transactions per month without adding headcount? |
| Slot 3 | Units Supportable at Scale | At North Star volume, how does this solution prevent the bottleneck? |

**Priority B — Revenue:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Revenue Unlocked / Month | Conversion rate lift × average deal value × current monthly leads |
| Slot 2 | Deals Closed / Month (increase) | Time recovered from manual work ÷ average time-to-close × close rate |
| Slot 3 | Time-to-Close Reduction | Steps removed from sales process × average time per step |

**Priority C — Efficiency:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration, per role. Label [Estimated] if not from source. |
| Slot 2 | Turnaround Time Reduction | Before duration vs. After duration. Express as % or hours. |
| Slot 3 | Error Rate Eliminated | Manual error frequency × downstream cost. Express as incidents/month eliminated. |

**Priority D — Cost:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration. Label [Estimated] if not from source. |
| Slot 2 | Cost Impact / Month | Hours saved × blended role rate. Adjust to region if known. |
| Slot 3 | Effort Reduction % | Manual steps before ÷ manual steps after. Express as percentage. |

---

## PART 7 — PORTAL KPI MAPPING

When the portal implementation phase runs, it receives the Priority Profile.
The Primary Priority controls the default panel and hero KPI cards. Secondary and
Tertiary priorities may appear as supporting KPI cards or secondary panels, but
they must not displace the Primary Priority on first load.
This table defines which KPI cards to make prominent per Primary Priority.

### Admin Portal KPI Mapping

| KPI Card Position | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Hero KPI 1 | Units in Pipeline | Deals Closed This Month | Hours Recovered This Week | Cost Eliminated This Month |
| Hero KPI 2 | Volume Launched / Month | Revenue Unlocked | Turnaround Time (avg) | Headcount Equivalent Saved |
| Hero KPI 3 | Capacity vs. Goal | Time-to-Close (days) | Error Rate | Monthly Savings ($) |
| Hero KPI 4 | Team Capacity Remaining | Pipeline Value | Team Utilization | Break-Even Progress |

### Admin Portal Default Panel (on load)

| Priority | Open This Panel First |
|---|---|
| A | Pipeline / CRM view |
| B | Revenue / Deals dashboard |
| C | Operations / Task Queue |
| D | Financial / Cost Dashboard |

### Partner Portal KPI Mapping

| KPI Card | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Primary metric | Campaigns/Units Supported | Revenue Generated | Time Saved | Fee Reduced |
| Secondary metric | Units Onboarded | Deals Closed | Tasks Automated | Cost per Unit |

### Implementation Instruction for Portal Phase

Add this section to the portal implementation prompt:

```
## PRIORITY EMPHASIS LAYER (read Phase-0:Priority-Profile-{PROSPECT} first)

After implementing all functional changes, apply the Priority Emphasis Layer:

1. Read the "Portal Emphasis" section of Phase-0:Priority-Profile-{PROSPECT}.
2. Set the default active panel to match the Primary Priority.
3. Update the hero KPI cards in the admin portal to match the Primary Priority mapping table.
4. Add Secondary/Tertiary priority KPIs only as supporting cards or later panels.
5. Update all KPI card labels, values, and trend lines to reflect the correct metric category.
6. Do not change the visual design system. Change only the data labels and which panel
   is marked active on load.
```

---

## PART 8 — THE DEMO PITCH — 3-ACT STRUCTURE BY PRIORITY STACK

The demo script follows the Pain → Proof → Possibility arc for all Priorities.
What changes is the opening line, proof sequence, and closing possibility.
The Primary Priority sets the frame. Secondary and Tertiary priorities determine
the order of supporting screens.

### Act 1 — The Pain (0:00 – 0:30)

All priorities start the same way: prove you understand their operational reality.
The opener is always specific and verifiable — never a strategic claim.

**Template:**
"{PRESENTER} opens with: 'We analyzed {PROSPECT}'s operations and found [N] manual
processes that are [blocking/costing/preventing]. I'm going to show you what we built
to eliminate them.'"

Priority-specific framing:
- Priority A: "...that are blocking your path to {NORTH_STAR}."
- Priority B: "...that are costing your team [X] deals per month."
- Priority C: "...that are consuming [X] hours per week your team should be spending on [real work]."
- Priority D: "...that are costing roughly $[X] per month in recoverable labour."

**Rules:**
- Do NOT open with the North Star goal
- Do NOT open with revenue numbers or a feature list
- The hook must be a single specific, verifiable, citable operational pain

### Act 2 — The Proof (0:30 – 4:00)

The demo portal carries the pitch. Each screen is tied to a pain point from Step 1
and to the Manual Task Proof Map in the Priority Profile.
Narrate in human terms (from the Human Impact Mapping):

Standard narration pattern per screen:
1. Name the human role doing this manually today.
2. Show the screen that replaces their manual process.
3. State which Priority Stack level this screen supports.
4. State what they can do with the time, capacity, revenue, or cost control they get back.

_Example: "Right now, your field coordinator tracks every new signup manually. There is
no pipeline — just emails and memory. This screen is their new morning. Every new lead
is here, with their stage, their assigned handler, and their next action. Nothing falls
through the cracks."_

### Act 3 — The Possibility (4:00 – 5:00)

Introduced last. Earned through Acts 1 and 2. Adapts by Primary Priority and Tier.

**Priority A, Tier A:**
"With these systems running, the operational question changes. It is no longer
'can we handle more?' It is 'how fast do you want to reach {NORTH_STAR}?'
This infrastructure is built for that target."

**Priority A, Tier B:**
"With these bottlenecks removed, you have the operational capacity to grow
significantly — maybe 3x, maybe 5x — without adding proportional headcount.
How far do you want to take it?"

**Priority B, Tier A:**
"This is the infrastructure that makes {NORTH_STAR} achievable. Every minute
your team spends on admin is a minute they are not closing the next deal."

**Priority C (any tier):**
"Your team did not sign up to copy-paste data between spreadsheets. This gives
them back the capacity to do the actual work. And when they are doing the actual
work, your clients feel the difference."

**Priority D (any tier):**
"$[X] per month is recoverable. But the more important number is what your team
does with the hours they get back."

### Priority Stack Screen Sequencing Overlay

Use the Priority-specific routes below as the starting point, then apply the
Priority Stack:

1. **Screen 1 proves the Primary Priority.** Open on the panel that makes the lead
   value proposition visible immediately.
2. **Screens 2–3 prove manual task automation.** These must correspond to the top
   two Manual Task Proof Map rows, not generic feature highlights.
3. **Screen 4 supports the Secondary Priority.** Show the dashboard, queue, or
   automation that turns the Primary claim into operational proof.
4. **Screen 5 supports the Tertiary Priority or end-user experience.** Close the
   proof loop by showing what the customer, partner, or operator experiences.
5. **Never put a De-emphasized priority first.** If cost is De-emphasized, do not
   open on savings, break-even, or financial dashboards.

### Demo Screen Routing by Primary Priority

#### Priority A — Scalability

**Open with:** Admin Portal → Pipeline/CRM view
**Navigate in order:**
1. Pipeline/All Units (show pipeline stages)
2. Onboarding Queue (show pending approvals — "this is the bottleneck right now")
3. Task Queue (show team capacity and alert system)
4. Growth Analytics (show acquisition chart — "this is what scale looks like with the system running")
5. Client Portal → Campaigns (show a client's live view — "this is what one of your {NORTH_STAR} units sees")

**What to call out by name:**
- "The Pipeline panel — this is your path to {NORTH_STAR}"
- "The Task Queue — without this, your team tracks everything in their head"
- "The Growth Analytics chart — your acquisition by month, visible at a glance"

#### Priority B — Revenue

**Open with:** Admin Portal → Revenue dashboard
**Navigate in order:**
1. Revenue & Fees (show total revenue, per-client breakdown)
2. All Campaigns/Deals (show live campaigns by status, revenue per campaign)
3. Growth Analytics (show conversion rate, time-to-first-revenue)
4. Client Portal → Billing (show the revenue calculator — "this is what your client sees")
5. Client Portal → Campaigns (show campaign launch flow — "faster launch = faster revenue")

**What to call out by name:**
- "The Revenue dashboard — every dollar, every client, in one view"
- "The Campaigns table — filtered by status so your team sees what needs attention"
- "The Revenue Calculator — your clients see this when they set their goal"

#### Priority C — Efficiency

**Open with:** Admin Portal → Task Queue / Operations
**Navigate in order:**
1. Task Queue (show alert tasks — "right now this is manual")
2. Communications/Automations (show automated triggers — "these replace manual follow-up")
3. Flagged Accounts (show exception-based monitoring — "staff only see what needs them")
4. Client Portal → Home Dashboard (show the client's live feed — "zero manual reporting")
5. Client Portal → Setup Wizard (show the onboarding flow — "client self-serves in minutes")

**What to call out by name:**
- "The Task Queue — alerts replace daily manual checking"
- "Automated communication triggers — none of these need a human"
- "The Setup Wizard — a new client goes live without a single back-and-forth email"

#### Priority D — Cost

**Open with:** Admin Portal → Financial dashboard
**Navigate in order:**
1. Financial Overview (show fee structure, current revenue, break-even context)
2. Payout/Billing Queue (show how payouts are managed — "no manual coordination")
3. Communications (show automated triggers — "replaces paid tools or manual labor")
4. Client Portal → Billing (show the fee calculator — "clients understand the model instantly")
5. Client Portal → Verification (show the compliance flow — "compliance without a compliance team")

**What to call out by name:**
- "The Payout Queue — automated progression, no manual coordination"
- "Automated triggers — each one replaces a tool subscription or a staff hour"
- "The Billing calculator — transparent, self-service, no support call needed"

### Updated Hook Template (by Priority Stack)

Replace the generic hook instruction in the demo script prompt with:

```
## HOOK (Act 1 — first 30 seconds)

Read the Hook sentence from Phase-0:Priority-Profile-{PROSPECT} exactly as written.
Then add:
"I am going to show you what we built to eliminate [that specific bottleneck]."

Do NOT:
- Open with the North Star goal
- Open with revenue numbers
- Open with a feature list
- Mention {PROVIDER} or {PRESENTER} by name in the hook

The hook must be a single specific, verifiable, citable operational pain.
If the Priority Profile hook sentence is not present, use this fallback:
"{PROSPECT} currently manages [most visible manual process] by hand.
This platform eliminates that."
```

---

## PART 9 — PROPOSAL ROI FRAMEWORK (3 Lenses)

The proposal presents three parallel ROI scenarios so every stakeholder finds their metric.
The order of lenses changes based on the Priority Stack:

- Lens 1 must match the Primary Priority.
- Lens 2 should match the Secondary Priority when evidence supports it.
- Lens 3 should match the Tertiary Priority or use Efficiency as the universal proof lens.
- De-emphasized priorities must not appear as the lead commercial argument.

If the stack has only one well-supported priority, present the Primary lens first,
then use Capacity, Revenue, Efficiency, or Cost only where the evidence supports
the calculation.

### Priority A — Lead with Capacity Lens

**Lens 1 (Lead) — Capacity ROI:**
"With manual bottlenecks removed, the team can support [X]x the current volume without
adding proportional headcount. At current average revenue per client, [X]x capacity
= $[Y] additional annual revenue potential."

**Lens 2 — Strategic ROI:**
"The platform directly enables {NORTH_STAR}. Without this infrastructure,
reaching that goal would require [N] additional hires at $[X]/year.
The platform replaces that hiring requirement."

**Lens 3 — Efficiency ROI:**
"These [N] automations recover [X] hours per week. At a blended rate of $[Y]/hr,
that is $[Z]/month recovered. Break-even: [N] months."

### Priority B — Lead with Revenue Lens

**Lens 1 (Lead) — Revenue ROI:**
"With pipeline automation running, your team can close [X]% more deals per month.
At current average deal value, that is $[Y]/month in additional revenue potential."

**Lens 2 — Capacity ROI:** (as Priority A Lens 1)
**Lens 3 — Efficiency ROI:** (as Priority A Lens 3)

### Priority C — Lead with Efficiency Lens

**Lens 1 (Lead) — Efficiency ROI:** (hours + cost)
**Lens 2 — Capacity ROI:** (what the recovered time enables)
**Lens 3 — Strategic ROI:** (Tier A/B only — skip for Tier C)

### Priority D — Lead with Cost Lens

**Lens 1 (Lead) — Cost ROI:** (hours saved × rate = $/month, break-even months)
**Lens 2 — Capacity ROI:** (what the savings fund next)
**Lens 3 — Strategic ROI:** (skip unless Tier A/B signals exist)

---

## PART 10 — TIER C EXECUTION PATH (Data-Poor Prospects)

### When Tier C Applies

Confidence Score 0–3. Fewer than 3 directional signals. Generic website. No strategic content.

### Tier C Deliverable Path

**Step 1 — Generate the 24-Hour Impact Snapshot only.**
Do not generate the full Outcome Report. Do not invest in full portal customization.
Send the snapshot and wait for a response.

**Step 2 — If the prospect responds, book a discovery call.**
Use these structured discovery questions:
1. "What is the single biggest goal you are trying to hit this year?"
2. "What is the biggest operational headache your team deals with daily?"
3. "If we could fix one thing for you, what would make the biggest difference?"
Record answers. Re-run p0 with this first-party data added.
Now you have Tier A or B data. Proceed with full pipeline.

**Step 3 — If no discovery call is possible, use the Tier C Generic Demo Path.**

### Tier C Generic Demo Path (no custom portal for this prospect's industry)

If no custom portal exists:
1. Open the Admin Portal → Company Overview dashboard
2. Navigate to: All Campaigns/Deals table (most universally applicable panel)
3. Navigate to: Communications → Automated Triggers (universally impressive)
4. Navigate to: Client Portal → Home Dashboard (live feed + KPIs)
5. Close on: Client Portal → Impact/Results page (visual proof of verified outcomes)

This path works for any prospect type because it shows:
- A management view (admin)
- Automation in action (triggers)
- An end-user experience (client dashboard)
- Proof of impact (results registry)

### Tier C Hook (pre-written, no North Star required)

```
Right now, your team is managing [most visible process] manually.
Every hour spent on [specific task] is an hour not spent on [their actual job].
This platform automates [that process] so your team can focus on [the real work].
```

### Tier C Act 3 Closing (pre-written)

```
With these bottlenecks removed, your team reclaims [X hours per week].
Here is what that time is worth. And here is what becomes possible when your
people are doing what they were actually hired to do.
The next step is yours.
```

---

## PART 11 — ONE-PAGE DECISION TREE

```
START
  │
  ▼
STEP 0: Run Priority Detection on all Phase-1 files
  │     Save output as Phase-0:Priority-Profile-{PROSPECT}
  │     Attach this file to every downstream prompt
  │
  ▼
STEP 1: Read Priority Score from p0 output
  │
  ├─── Priority A (highest score)?
  │         │
  │         ▼
  │    Tier A → Full vision-anchored narrative
  │    Tier B → Trajectory-based narrative
  │    Tier C → 24-Hour Snapshot only → Discovery call → Re-run p0
  │             (use Tier C Execution Path in Part 10)
  │
  ├─── Priority B (highest score)?
  │         │
  │         ▼
  │    Tier A → Revenue target narrative
  │    Tier B → Pipeline capacity narrative
  │    Tier C → Throughput improvement (use Tier C Execution Path)
  │
  ├─── Priority C (highest score)?
  │         │
  │         ▼
  │    Tier A → Stated quality/speed goal narrative
  │    Tier B → Team capacity narrative
  │    Tier C → Hours saved + role elevation (use Tier C Execution Path)
  │
  └─── Priority D, OR all scores low?
            │
            ▼
       Balanced Three-Lens ROI
       Show Cost + Capacity + Strategic across three columns
       Let the decision-maker pick their lens

IF scores tied between two priorities:
  Use the "Balanced Twin" approach:
  Lead with higher-scored Priority in hero section.
  Show both priority metrics side-by-side in solution cards.

IF data insufficient for any scoring (Tier C + low signals):
  Generate 24-Hour Impact Snapshot ONLY.
  Do not generate full Outcome Report until discovery call data is available.
  Follow the Tier C Execution Path in Part 10 exactly.
```

---

## PART 12 — PROMPT MODIFICATION INSTRUCTIONS

The following changes must be made to pipeline prompts to implement this framework:

### Outcome Report Prompt — Required Changes

**Add before Section 1 of the prompt:**

```
## PRE-GENERATION STEP — PRIORITY STACK CLASSIFICATION

FIRST — Read Phase-0:Priority-Profile-{PROSPECT} completely before writing any HTML.
This file was produced by the p0 Pre-Step and contains your Priority Stack
classification, Confidence Tier, North Star quote, Hero Stats, Metric Slot labels,
Manual Task Proof Map, Hook sentence, Act 3 closing line, and Portal Emphasis directives.

If Phase-0:Priority-Profile-{PROSPECT} is not attached, STOP and generate it first
by running the p0 Pre-Step on all Phase-1 files before proceeding.

Do not default to cost-savings framing.
Do not default to hours-saved / cost-impact / effort-reduction metrics.
Use only the metric categories specified in the Priority Profile.
Lead with the Primary Priority. Use Secondary and Tertiary priorities as supporting
proof. Do not lead with any De-emphasized priority.

Include a comment block at the top of the HTML output:
<!-- Primary: [X] | Secondary: [X/None] | Tertiary: [X/None] | Tier: [X] | North Star: [text or N/A] -->
```

**Replace the Hero Stats rule with:**
```
Hero stats must match the Primary Priority detected in Phase-0:Priority-Profile.
Use the Hero Stats Block table from Part 6.3 of this framework.
Do not default to Hours Saved / Cost Impact / Workflows Eliminated
unless Priority D is confirmed.
```

**Replace the Outcome Quantification Method with:**
```
Quantify outcomes relative to the Priority Stack:
- Priority A: Express as capacity (units handled, volume processed, scale factor)
- Priority B: Express as revenue (deals/month, revenue unlocked, close rate)
- Priority C: Express as efficiency (hours saved, turnaround time, error rate)
- Priority D: Express as cost ($/month saved, break-even months, effort %)

Use the Solution Card Metric Slot labels from the Priority Profile exactly.
Place Primary Priority metrics first, Secondary metrics second, and Tertiary metrics later.
For every metric, show the basis calculation and label as [Estimated] or [From source].
```

---

### Demo Script Prompt — Required Changes

**Add to WHAT TO READ FIRST:**
```
1. FIRST — Read Phase-0:Priority-Profile-{PROSPECT} completely.
   The demo script Hook (Act 1) and Act 3 Possibility sentence must be read
   verbatim from the Priority Profile — do not write new versions of these.
   Record: Primary = [X], Secondary = [X/None], Tertiary = [X/None], Tier = [X]
   before writing the script.

2. Navigate screens in the order specified by the Portal Emphasis and Manual Task
   Proof Map sections of the Priority Profile. Use Part 8 of the Vision-Led
   framework for the Primary Priority route and Priority Stack sequencing overlay.
   Do not default to a generic screen order.
```

**Replace the HOOK template with:**
```
The Hook must:
1. Be read verbatim from the "Hook sentence" in Phase-0:Priority-Profile.
2. NOT open with a strategic claim, a revenue number, or a vision statement.
3. End by promising to show the fix — not to explain the vision.

If the Priority Profile hook sentence is missing, use this fallback:
"{PROSPECT} currently manages [most visible manual process] by hand.
This platform eliminates that."
```

---

### Proposal Prompt — Required Changes

**Add a Multi-Lens ROI section after the Cost Estimate table:**
```
Add Section: ROI Framework (3 Lenses)

Present three parallel ROI scenarios so every stakeholder finds their metric.
Lead with the lens that matches the Primary Priority from Phase-0:Priority-Profile.
Order the remaining lenses according to Secondary and Tertiary priorities when evidence supports them.
Do not lead with a De-emphasized priority.

Lens 1 (lead with this for Priority A) — Capacity ROI:
"With manual bottlenecks removed, the team can support [X]x the current volume
without adding proportional headcount. At current average revenue per client,
[X]x capacity = $[Y] additional annual revenue potential."

Lens 2 (lead with this for Priority B) — Revenue ROI:
"With pipeline automation running, your team can close [X]% more deals per month.
At current average deal value, that is $[Y]/month in additional revenue potential."

Lens 3 — Efficiency ROI (always present):
"These [N] automations recover [X] hours per week. At a blended rate of $[Y]/hr,
that is $[Z]/month recovered. Break-even on the investment: [N] months."

Strategic ROI (Priority A/B Tier A/B only — skip for C/D or Tier C):
"The platform directly enables {NORTH_STAR}. Without this infrastructure,
reaching that goal would require [N] additional hires. The platform replaces that
hiring requirement."

Label each lens clearly. The prospect reads whichever speaks to them.
```

---

## PART 13 — IMPLEMENTATION CHECKLIST

Use this checklist in order. Do not skip steps.

```
PRE-DELIVERABLE (required before writing anything)
□ Set all configuration variables (Part 1)
□ Run Priority Detection on all Phase-1 files
□ Save output as Phase-0:Priority-Profile-{PROSPECT}
□ Verify Priority Score is recorded for all four priorities
□ Verify Priority Stack is confirmed: Primary, Secondary, Tertiary, De-emphasized
□ Verify Primary Priority is confirmed (A / B / C / D)
□ Verify Secondary/Tertiary priorities have evidence or are marked "None"
□ Verify De-emphasized priorities include a reason
□ Verify Confidence Tier is recorded (A / B / C)
□ Verify North Star quote is present (or marked "Not found")
□ Verify Hook sentence is written (ready to read aloud)
□ Verify Hero Stats are computed (three stats matching Primary Priority — NOT cost/hours defaults)
□ Verify Solution Card Metric Slot labels are set (NOT "Time Saved / Cost Impact /
  Effort Reduction" unless Priority D confirmed)
□ Verify Manual Task Proof Map links each manual task to a Priority Stack level and demo screen
□ Verify Portal Emphasis panel and KPI cards are specified (from Part 7 mapping)
□ Verify Act 3 Possibility sentence is written (ready to read aloud)

WITHIN 24 HOURS (Tier C — or any prospect before full investment)
□ Generate 24-Hour Impact Snapshot from p0 output
□ If Tier C: use Tier C template from Part 10 (NOT the full Outcome Report)
□ Send snapshot, await response before investing further

AFTER PROSPECT RESPONDS (confirmed interest — all tiers)
□ Attach Priority Profile to Outcome Report prompt
□ Generate Outcome Report with correct Hero Stats (not cost/hours defaults)
□ Verify hero stats match Primary Priority (use Part 6.3 table)
□ Verify solution cards use correct Metric Slot labels (use Part 6.4 table)
□ Verify Section 4 (Strategic Unlock) uses correct Primary Priority + Tier language
□ Verify Secondary/Tertiary priorities appear only as supporting proof
□ Attach Priority Profile to Portal Implementation prompt
□ Verify portal KPI cards reflect Priority Emphasis Layer (Part 7)
□ Verify default panel on load matches Primary Priority
□ Attach Priority Profile to Demo Script prompt
□ Verify demo hook is read verbatim from Priority Profile
□ Verify screen navigation follows Priority Stack screen routing (Part 8)
□ Verify demo screens visibly automate the manual tasks identified in Step 1
□ Verify Act 3 closing is read verbatim from Priority Profile
□ Attach Priority Profile to Proposal prompt
□ Verify proposal ROI leads with Primary Priority lens and orders remaining lenses by stack (Part 9)

QUALITY CHECKS (before sending anything to prospect)
□ Can {PRESENTER} defend every claim with a source on a live call?
□ Does the report hold if the decision-maker has quietly changed their goal?
□ Does a Tier C version still stand on its own?
□ Is the demo portal doing 80% of the selling?
□ Does the hook open with pain, not vision?
□ Are all estimates clearly labeled [Estimated]?
□ Are all source citations present for quoted claims?
□ Are hero stats framed in Priority-correct language — NOT cost/hours defaults?
□ Are solution card metric slots Priority-specific — NOT hardcoded defaults?
□ Does the portal KPI mapping match the Primary Priority?
□ Are demo screens navigated in Priority Stack order?
□ Does each demo screen prove a manual task has been automated or resolved?
□ Is cost savings only primary when Cost Reduction is truly the Primary Priority?
```

---

## PART 14 — FRAMEWORK LINEAGE

| Source | Core Insight Absorbed | Where It Appears in v6 |
|---|---|---|
| Priority Mode (v1) | Dynamic priority detection per client | Part 2, Part 4 (p0 Pre-Step) |
| Balanced Value Matrix | Multi-lens ROI for every stakeholder | Part 9 (Three-Lens ROI) |
| Role-Based Perspective | Human impact mapping per pain point | Part 5 Step 3, Part 8 Act 2 |
| Counter 1 — Simplicity | Defensible claims only | Part 13 Quality Checks |
| Counter 2 — Data Poverty | Discovery call for Tier C | Part 10 (Tier C Path) |
| Counter 3 — Buyer Psychology | Pain → Proof → Possibility arc | Part 8 (Demo 3-Act structure) |
| Counter 4 — Consistency | Fixed structure per phase | Part 6 (Fixed Deliverable Structure) |
| Counter 5 — Speed | 24-Hour Impact Snapshot | Part 6.1 |
| Counter 6 — Product-Led | Demo portal carries the pitch | Part 7 (Portal KPI Mapping) |
| v3 contributions | Priority Detection Algorithm, Confidence Tiers, Decision Tree | Parts 2, 3, 11 |
| v4 contributions | p0 as structured output, Portal KPI Mapping, Demo Screen Routing, Priority Thread Variable, Tier C Execution Path, Solution Card Metric Mapping | Parts 4, 7, 8, 10, 6.4 |
| **v5 contributions** | Organization independence, configurable variables, universal archetypes, multi-org deployment model | Parts 0, 1, all examples |
| **v6 contributions** | Priority Stack, Manual Task Proof Map, stack-based demo sequencing, stack-based ROI order | Parts 2, 4, 5, 6, 8, 9, 13 |

---

## PART 15 — WORKED EXAMPLE: ARCHETYPE 1 END-TO-END

This section demonstrates the complete pipeline for **Archetype 1 — Mission-Driven
Nonprofit** (Priority A). Every output shown below is what the framework would
produce when applied to a real prospect matching this archetype.

### Configuration Variables (set for this example)

```
{PROVIDER}        = GreenScale Digital
{PRESENTER}       = Sarah
{PROSPECT}        = EarthBridge Foundation
{PROSPECT_ROLE}   = Executive Director
{NORTH_STAR}      = 500 partner organizations by end of 2026
{CONTACT_EMAIL}   = sarah@greenscale.io
{CONTACT_CHANNEL} = LinkedIn
```

### Priority Stack Classification Result

- Signal scan: Scalability signals dominate (score: 14)
- Primary Priority: **A — Scalability / Growth Execution**
- Secondary Priority: **C — Operational Efficiency / Productivity**
- Tertiary Priority: **B — Revenue Growth / Deal Velocity**
- De-emphasized: **D — Cost Reduction**
- Confidence Tier: **A — Direct Quote**
- North Star: "2026 partner engagement goal: 500+" [Source: Phase-1:Website, Impact Report page]

### p0 Priority Profile Output

```markdown
---
prospect: EarthBridge Foundation
provider: GreenScale Digital
generated: 2026-03-15
version: p0_v6
---

# Priority Profile — EarthBridge Foundation

## Signal Scan Results

| Priority | Score | Key Signals Found |
|----------|-------|-------------------|
| A — Scalability | 14 | "500 partner orgs by 2026" [Website], Coordinator hiring [Job Post], ED posts about global expansion [LinkedIn], mission-driven model [Website] |
| B — Revenue | 3 | Fundraising mentioned [LinkedIn Company] |
| C — Efficiency | 2 | "detail-oriented" in job post [Job Post] |
| D — Cost | 0 | No cost-cutting signals |

## Classification Result

**Primary Priority: A — Scalability / Growth Execution**
**Secondary Priority: C — Operational Efficiency / Productivity**
**Tertiary Priority: B — Revenue Growth / Deal Velocity**
**De-emphasized / Do Not Lead With: D — Cost Reduction (no cost-cutting evidence)**
**Confidence Tier: A**
**Confidence Score: 9/10**

## Priority Stack

| Stack Level | Priority | Evidence Strength | Narrative Role |
|---|---|---|---|
| Primary | A — Scalability / Growth Execution | High | Lead with the 500-partner infrastructure story |
| Secondary | C — Operational Efficiency / Productivity | Medium | Prove the scale story by showing manual coordination removed |
| Tertiary | B — Revenue Growth / Deal Velocity | Low/Medium | Mention outbound/fundraising upside later, not as the headline |
| De-emphasized | D — Cost Reduction | Weak | Do not lead with savings or break-even |

## North Star

**Quote:** "Our 2026 partner engagement goal: 500+ organizations across 12 countries"
**Source:** Phase-1:Website, Impact Report / Press Kit section
**Frame:** Use verbatim. Cite source. Full vision-anchored narrative activated.

## Narrative Directives

**Hook sentence (demo opening):**
"Right now, your Field Coordinators have no pipeline visibility. Every new
partner signup is tracked by memory and email. When a school district visits
earthbridge.org and clicks 'Partner With Us', there is no system to ensure
follow-up within 48 hours, no automated nurture if they don't respond, and
no way for leadership to see how many partners are in the funnel at any given
moment. That is the bottleneck between where EarthBridge is today and 500
partner organizations by end of 2026."

**Hero Stats for Outcome Report:**
- Stat 1: "500 — Partner organizations your 2026 goal demands your infrastructure must support"
- Stat 2: "10x — Program management capacity without adding coordinator headcount"
- Stat 3: "6 — Manual workflows currently blocking that growth path"

**Solution Card Metric Slots:**
- Slot 1 label: Capacity Unlocked
- Slot 2 label: Volume Handled
- Slot 3 label: Partners Supportable at Scale

**Manual Task Proof Map:**
| Manual Task | Priority Supported | Human Role | Demo Screen That Proves It Is Solved |
|---|---|---|---|
| Partner signups tracked manually | Primary A + Secondary C | Field Coordinator | Admin Portal → All Partners |
| Follow-up and renewal reminders handled manually | Secondary C | Field Coordinator | Communications / Automations |
| Coordinator has no prioritized daily work queue | Primary A + Secondary C | Field Coordinator | Coordinator Task Queue |
| Growth pipeline not visible to leadership | Primary A | Executive Director | Growth Analytics |
| Partner experience depends on manual reporting | Tertiary B / customer proof | Partner org contact | Partner Portal Home |

**Demo closing line (Act 3 Possibility):**
"With the CRM running, the email sequences live, and the impact reports automated,
the operational question changes. It is no longer 'can we handle more partners?'
It is 'how fast do you want to reach 500?' This infrastructure is built for that
target. It was also built for 1,000."

**Portal Emphasis:**
- Primary panel on load: Admin Portal → All Partners (pipeline view)
- KPI cards: Partners in Pipeline / Programs Launched / Capacity vs. 500-org Goal / Coordinator Capacity
- Screens to navigate: All Partners → Communications / Automations → Coordinator Task Queue → Growth Analytics → Partner Portal Home

## Execution Path

Tier A: Full vision-anchored narrative. All phases. Quote North Star in hero.
```

### Impact Snapshot (24-Hour Deliverable)

```
IMPACT SNAPSHOT — EarthBridge Foundation
Prepared by GreenScale Digital · March 2026

We analyzed EarthBridge Foundation's public operations across 5 data sources.
Here is what we found.

──────────────────────────────────────────────────────

THE BOTTLENECK:
Your Field Coordinators have no CRM — every new partner signup is tracked
manually, which means the pipeline to 500 organizations is invisible.

3 THINGS BLOCKING YOUR 2026 GOAL:
→ No partner pipeline — coordinators cannot see which orgs are at risk of going cold
→ Zero renewal automation — past program partners only return if they remember you
→ No outbound system — 100% of growth depends on inbound organic traffic

WHAT THIS UNLOCKS:
The operational infrastructure to scale to 500 partner organizations without
adding proportional headcount or losing any leads in the process.

──────────────────────────────────────────────────────

[Screenshot of the Admin Dashboard showing the 47 active partner pipeline]

Want to see the full 6-minute demo?
→ Reply to this message. I'll send the walkthrough video.

Sarah | GreenScale Digital
sarah@greenscale.io | LinkedIn
```

### Outcome Report Hero Stats — Priority A Framing

**Correct (Priority A):**
- "500 — Partner organizations your 2026 goal demands your infrastructure must support"
- "10x — Program management capacity without adding coordinator headcount"
- "6 — Manual workflows currently blocking that growth path"

**WRONG (Priority D defaults — what old pipelines would produce):**
- ~~"37 hrs/week saved"~~
- ~~"$10,630/month impact"~~
- ~~"6 workflows eliminated"~~

The numbers may overlap. The *framing* is what matters.

### Demo Pitch Screen Order (Priority Stack routing from Part 8)

1. Admin Portal → All Partners (pipeline view)
2. Communications / Automations (manual follow-up removed)
3. Coordinator Task Queue (capacity and alerts)
4. Growth Analytics (acquisition chart)
5. Partner Portal → Home (live partner view)

### Proposal ROI Framework (3 Lenses, Priority Stack order)

**Lens 1 (Lead — Capacity ROI):**
"These 6 automations allow one Field Coordinator to support 3x the number of
active programs without additional working hours. At current impact per partner,
this capacity directly enables the 500-organization target."

**Lens 2 — Efficiency ROI:**
"These 6 automations recover approximately 37 hours per week across coordination
and admin roles. At a blended rate of $40/hr, that is $5,920/month recovered.
Break-even on the investment: approximately 5–6 months."

**Lens 3 — Revenue / Strategic Upside:**
"Reaching 500 organizations via inbound-only growth with manual coordination
would require hiring 3–4 additional coordinators. This platform replaces that
hiring requirement with automated systems — turning a $180k–$240k annual
headcount decision into a one-time platform investment."

---

## APPENDIX — PRIORITY QUICK-REFERENCE CARD

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  PRIORITY DETECTION QUICK CARD                                                │
├──────────────┬────────────────────────┬───────────────────────────────────────┤
│  PRIORITY    │  KEY SIGNAL            │  HERO METRIC SLOTS                    │
├──────────────┼────────────────────────┼───────────────────────────────────────┤
│  A — Scale   │  Growth targets,       │  Capacity Unlocked                    │
│              │  "10x", "500 units"    │  Volume Handled                       │
│              │  mission-driven org    │  Units Supportable at Scale            │
├──────────────┼────────────────────────┼───────────────────────────────────────┤
│  B — Revenue │  Sales hiring, CRM,    │  Revenue Unlocked / Month             │
│              │  revenue targets       │  Deals Closed / Month (increase)      │
│              │  outbound signals      │  Time-to-Close Reduction              │
├──────────────┼────────────────────────┼───────────────────────────────────────┤
│  C — Ops     │  "Burnout", "manual"   │  Hours Saved / Week                   │
│              │  quality complaints    │  Turnaround Time Reduction            │
│              │  process bottlenecks   │  Error Rate Eliminated                │
├──────────────┼────────────────────────┼───────────────────────────────────────┤
│  D — Cost    │  CFO-led, lean team    │  Hours Saved / Week                   │
│              │  cost-cutting lang.    │  Cost Impact ($/Month)                │
│              │  layoff signals        │  Effort Reduction (%)                 │
└──────────────┴────────────────────────┴───────────────────────────────────────┘

PRIORITY STACK QUICK CARD
  Primary:       Leads report hero, demo opening frame, first screen, first ROI lens
  Secondary:     Supports proof in solution cards, screens 2-4, second ROI lens
  Tertiary:      Additional upside; mention later, never as the headline
  De-emphasized: Do not lead with this angle; include only if evidence or buyer asks

STACK ROUTING RULE
  Screen 1 proves the Primary Priority
  Screens 2-3 prove the top manual tasks were automated or resolved
  Screen 4 supports the Secondary Priority
  Screen 5 supports Tertiary upside or end-user experience

CONFIDENCE TIER QUICK CARD
  Tier A: Direct quote found → use it verbatim, cite source
  Tier B: 3+ consistent signals → frame as trajectory, not claim
  Tier C: <3 signals → 24-Hour Snapshot only → discovery call → re-run p0

NARRATIVE ARC (all priorities)
  Hook:         Specific operational pain (verifiable, citable)
  Demo:         Portal screens tied to pain points, Priority Screen Routing applied
  Possibility:  Vision introduced last — earned through proof

p0 THREAD VARIABLE RULE
  p0 output file must be attached to all downstream prompts
  Every prompt reads Priority Profile before generating content
  Every prompt follows Primary → Secondary → Tertiary → De-emphasized order
  No prompt defaults to cost/hours metrics without Priority D confirmed

PORTAL DEFAULT PANEL ON LOAD
  Priority A → Pipeline / CRM view
  Priority B → Revenue & Deals
  Priority C → Task Queue / Operations
  Priority D → Financial Dashboard

SOLUTION CARD CHECK (before finalizing any Outcome Report)
  Ask: are these metric slot labels from the Priority Profile?
  If the labels say "Time Saved / Cost Impact / Effort Reduction" → STOP
  Those are Priority D defaults. Re-read the Priority Profile and apply correct labels.

HERO STAT CHECK (before finalizing any Outcome Report)
  Ask: are these hero stats framed in Priority-correct language?
  Priority A hero stats must reference capacity/scale — NOT hours or dollars saved.
  Priority D is the only Priority where "$X/month" is the correct primary frame.

MANUAL TASK PROOF CHECK (before finalizing any demo)
  Ask: does each screen visibly automate or resolve a manual task from Step 1?
  If a screen is only a feature tour and not proof, reorder or remove it.
```
