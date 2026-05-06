# Vision-Led Balanced Matrix v5 — Fixed
> All fixes applied in this version:
> Fix 1 — Priority Portfolio replaces single-priority label
> Fix 2 — Three-layer narrative always present (Visionary / Operator / Accountable)
> Fix 3 — Supporting answers ready for questions outside the primary priority
> Fix 4 — Hero stats and metric slots locked to Priority — no cost/hours defaults
> Fix 5 — Claim-to-Screen Proof Map added before every demo
> Fix 6 — Tier C Execution Path fully operationalized
> Fix 7 — Solo founder/CEO buyer model built into every deliverable

---

## TABLE OF CONTENTS

| Part | Title |
|---|---|
| 0 | Why This File Exists |
| 1 | Configuration Variables |
| 2 | Priority Detection Algorithm |
| 3 | North Star Scoring |
| 4 | p0 Pre-Step |
| 5 | Three-Layer Narrative (NEW FIX) |
| 6 | 3-Step Data Engine |
| 7 | Fixed Deliverable Structure |
| 8 | Portal KPI Mapping |
| 9 | Demo Pitch — 3-Act Structure |
| 10 | Proposal ROI Framework |
| 11 | Tier C Execution Path |
| 12 | Decision Tree |
| 13 | Prompt Modification Instructions |
| 14 | Implementation Checklist |
| 15 | Worked Example |
| App | Quick Reference Card |

---

## PART 0 — WHY THIS FILE EXISTS

Every pipeline that sells digital transformation makes one fatal assumption:
that the value proposition is the same for every client.

It is not.

A social enterprise chasing 500 partner organizations by year-end does not care
about saving $2,000/month. Their bottleneck is operational capacity — not money.
A bootstrapped SaaS founder bleeding cash on manual ops does not care about
"10x scale" — they need to stop the bleeding first.

This framework detects the client's primary strategic driver from observable data
and threads that specific narrative through every phase of the pipeline.

### What Was Fixed in This Version

The original v5 had one structural problem:

**It detected one priority and built everything around it — leaving no ready
answer when the buyer asked about something outside that one priority.**

This version fixes that by adding a **Three-Layer Narrative** that sits beneath
the primary priority in every deliverable. The primary narrative does not change.
But every deliverable now also answers:

```
Layer 1 — Visionary:   Does this help me hit my stated goal?
Layer 2 — Operator:    Does this make my team's life easier?
Layer 3 — Accountable: Can I justify this to my board or treasurer?
```

For solo founder/CEO buyers — which is most of the current buyer base — one
person asks all three questions. The framework now answers all three, in order,
without losing the primary narrative focus.

---

## PART 1 — CONFIGURATION VARIABLES

Before using this framework, set these variables:

```
{PROVIDER}        — Your company name (the service provider)
{PRESENTER}       — The person delivering demos and pitches
{PROSPECT}        — The target company being analyzed
{PROSPECT_ROLE}   — The primary decision-maker's title
{NORTH_STAR}      — The prospect's stated or inferred strategic goal
{CONTACT_EMAIL}   — Your outreach email
{CONTACT_CHANNEL} — Your preferred contact method
```

### Phase File Naming Convention

| Generic Reference | Description |
|---|---|
| Phase-1:Website | Prospect website research |
| Phase-1:LinkedIn-Company | Company LinkedIn analysis |
| Phase-1:LinkedIn-Founder | Founder/CEO LinkedIn analysis |
| Phase-1:Job-Postings | Active job posting analysis |
| Phase-1:Supporting | Any additional research files |
| Phase-0:Priority-Profile | Priority Detection output |
| Phase-3:Outcome-Report | The main value proposition report |
| Phase-4:Demo-Script | The demo pitch script |
| Phase-4:Portal-Implementation | Demo portal build instructions |
| Phase-5:Proposal | The commercial proposal |

---

## PART 2 — THE PRIORITY DETECTION ALGORITHM

Before writing a single word of any deliverable, classify the prospect into
exactly one primary priority bucket. This classification drives the lead narrative.

### The Four Priorities

**Priority A — Scalability / Growth Execution**
The prospect has a specific volume or market expansion goal and their current
systems cannot support that scale without breaking.

Signals: explicit numerical targets, rapid hiring, multi-market expansion language,
new geography launches, franchise or network model, waitlists or backlog mentioned.

Lead narrative: "Your current operations handle X. This infrastructure handles 10X."
Primary metrics: Capacity Unlocked, Volume Handled, Units Supportable/Month.

---

**Priority B — Revenue Growth / Deal Velocity**
The prospect wants to close more deals faster or unlock new revenue streams.

Signals: sales team hiring, CRM references, revenue growth targets in founder posts,
outbound expansion language, commission structures in job postings.

Lead narrative: "This platform lets your team close 30% more deals without adding headcount."
Primary metrics: Deals Closed/Month, Time-to-Close Reduction, Revenue Unlocked/Month.

---

**Priority C — Operational Efficiency / Productivity**
The prospect wants to eliminate friction, ship faster, and deliver better service.

Signals: burnout language in job postings, quality complaints, ops roles doing manual
work, turnaround time mentioned as a client complaint.

Lead narrative: "Your team can deliver in the same day instead of next week."
Primary metrics: Hours Saved/Week, Turnaround Time Reduction, Error Rate Eliminated.

---

**Priority D — Cost Reduction (Fallback Only)**
The prospect's primary driver is reducing operational spend or headcount.

Signals: layoff mentions, cost-cutting language, lean team framing, CFO as primary
stakeholder, finance-led decision making.

Lead narrative: "This eliminates $X/month in operational waste."
Primary metrics: Hours Saved, Cost Impact ($), Effort Reduction (%).

> **Rule:** Priority D is the fallback only. Never the first choice unless cost
> signals clearly dominate. Most solo founder/CEO buyers at mission-driven
> organizations are Priority A or C.

---

### Signal Weighting Table

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

---

## PART 3 — NORTH STAR SCORING (Confidence Tiers)

After identifying the Priority, score the confidence of the North Star.

### Tier A — Direct Quote (Score: 8–10)
A specific, attributed, quantified statement found in the source data.

Action: Use the exact quote as the anchor. Cite the source. Full vision-anchored
narrative is activated.

### Tier B — Strong Inference (Score: 4–7)
No explicit quote, but 3+ consistent directional signals point to the same ambition.

Action: Frame as "Based on your current trajectory..." not "You said...".
Use conditional language. Do not invent a number.

### Tier C — Insufficient Data (Score: 0–3)
Fewer than 3 directional signals. Generic website. No strategic content.

Action: Skip vision framing. Use pure Pain → Fix → Unlock.
Do not guess. Do not hallucinate a goal.

### North Star Conflict Resolution

When signals conflict, apply this hierarchy:

```
1. Job Postings              (most current, operational reality)
2. Operational Documents
3. CEO/Founder LinkedIn Posts (stated intent)
4. Company LinkedIn Posts    (marketing intent)
5. Website About/Mission
6. Marketing Taglines        (least reliable)
```

---

## PART 4 — THE p0 PRE-STEP

### What p0 Is

A mandatory step that runs BEFORE any deliverable phase begins.
Reads all Phase-1 context files and produces a single structured Markdown file.
This file becomes the thread variable passed to every downstream phase.

### p0 Output File Structure

Save as: `Phase-0:Priority-Profile-{PROSPECT}.md`

```markdown
---
prospect: {PROSPECT}
provider: {PROVIDER}
generated: {DATE}
---

# Priority Profile — {PROSPECT}

## Signal Scan Results

| Priority | Score | Key Signals Found |
|----------|-------|-------------------|
| A | [N] | [signals with sources] |
| B | [N] | [signals with sources] |
| C | [N] | [signals with sources] |
| D | [N] | [signals with sources] |

## Classification Result

**Primary Priority: [A/B/C/D] — [Name]**
**Confidence Tier: [A/B/C]**
**Confidence Score: [0-10]**

## Priority Portfolio  ← NEW FIX

Primary Priority:
[A/B/C/D] — [Name] — [lead narrative in one sentence]

Secondary Priority:
[A/B/C/D] — [Name] — [supporting narrative in one sentence]
OR "Not confirmed — use operational layer as default secondary"

Decision Risk:
[The one concern that could block the sale if not addressed]

## North Star

**Quote:** "[exact quote or 'Not found']"
**Source:** [file and section]
**Frame:** [direct claim / trajectory hypothesis / do not use yet]

## Three-Layer Narrative  ← NEW FIX

Layer 1 — Visionary (primary priority lead):
[One sentence: how the platform helps them hit their stated or inferred goal]

Layer 2 — Operator (always present):
[One sentence: how the platform removes the manual work their team does daily]

Layer 3 — Accountable (always present):
[One sentence: how the platform justifies the investment to a board or treasurer]

## Narrative Directives

**Hook sentence (demo opening):**
[One specific, verifiable, citable operational pain — ready to read aloud]

**Hero Stats for Outcome Report:**
- Stat 1: [label matching Primary Priority — NOT hours/cost unless Priority D]
- Stat 2: [label matching Primary Priority]
- Stat 3: [label matching Primary Priority]

**Solution Card Metric Slots:**
- Slot 1: [Priority-specific label]
- Slot 2: [Priority-specific label]
- Slot 3: [Priority-specific label]

**Demo closing line (Act 3 Possibility):**
[Ready-to-read closing tied to Primary Priority and Tier]

**Portal Emphasis:**
- Primary panel to open first: [panel name]
- KPI cards to highlight: [list]
- Screens in order: [ordered list]

## Claim-to-Screen Proof Map  ← NEW FIX

| Claim in Report/Demo | Screen That Proves It | What To Show | Metric |
|---|---|---|---|
| [claim] | [screen] | [specific UI element] | [metric] |

Rule: Every client-facing claim must have a row here.
If a claim has no screen, remove the claim.

## Execution Path

Tier A: Full vision-anchored narrative. All phases. Quote North Star in hero.
Tier B: Trajectory-based narrative. Frame as trajectory. No invented numbers.
Tier C: Pain → Fix → Unlock only. Snapshot first. See Part 11.
```

### Priority Thread — How p0 Connects to Every Phase

```
Phase 1 (Research)
  └── All Phase-1 files produced

p0 Pre-Step
  └── Reads all Phase-1 files
  └── Produces: Phase-0:Priority-Profile-{PROSPECT}
  └── Attached to every prompt below

Phase 3 — Outcome Report
  └── Attaches: Priority Profile + Phase-1 files
  └── Reads Priority → Hero Stats, Metric Slots, narrative frame
  └── Reads Three-Layer Narrative → all three layers present in report

Phase 4 — Portal Implementation
  └── Attaches: Priority Profile + Tech Spec
  └── Applies Portal KPI Mapping per Priority

Phase 4 — Demo Script
  └── Attaches: Priority Profile + portals + Operations Manual
  └── Reads Priority → Demo Screen Routing
  └── Reads Claim-to-Screen Proof Map → every demo claim verified

Phase 5 — Proposal
  └── Attaches: Priority Profile + Tech Spec
  └── Reads Priority → correct ROI lens order
  └── Reads Three-Layer Narrative → all three ROI lenses present
```

### Rule for Every Downstream Prompt

```
FIRST — Read Phase-0:Priority-Profile-{PROSPECT} completely.
Use the Priority Portfolio (Primary + Secondary + Decision Risk).
Use the Three-Layer Narrative for every section that needs supporting context.
Use the Claim-to-Screen Proof Map before writing any demo script section.
Do not default to cost-savings framing unless Priority D is confirmed.
Do not default to hours-saved metrics unless Priority D is confirmed.
```

---

## PART 5 — THREE-LAYER NARRATIVE (NEW FIX)

This is the core fix for the original v5 problem.

v5 built everything around one priority, leaving no ready answer when the buyer
asked about something outside that frame.

This part ensures every deliverable answers all three questions a solo
founder/CEO buyer asks — regardless of which hat they are wearing.

### The Three Layers

**Layer 1 — Visionary (Primary Priority)**
The buyer is thinking about their strategic goal.
Lead with this. This is your v5 primary narrative unchanged.

```
Question answered: "Does this help me hit my stated goal?"
Frame:             Primary Priority narrative
Metrics:           Priority-specific hero stats
```

**Layer 2 — Operator (Always Present)**
The same buyer is thinking about their team's daily work.
This layer is always present, regardless of primary priority.

```
Question answered: "Does this make my team's life easier?"
Frame:             Manual work eliminated, hours recovered, stress reduced
Metrics:           Hours saved/week, tasks automated, manual steps removed
Note:              This is NOT the hero — it supports the hero
```

**Layer 3 — Accountable (Always Present)**
The same buyer is thinking about how to justify this to their board, treasurer,
or major donor.

```
Question answered: "Can I justify this investment?"
Frame:             Cost avoided, hiring prevented, break-even timeline
Metrics:           $/month recovered, headcount avoided, months to break-even
Note:              This is NOT the hero — it closes the justification loop
```

### How to Apply the Three Layers in Each Deliverable

#### In the Outcome Report

```
Section 1 (Operational Snapshot):      Layer 2 context (what the team does daily)
Section 2 (Friction Map):              Layer 2 evidence (manual pain points)
Section 3 (Transformation Preview):    All three layers (what changes for each)
Section 4 (Strategic Unlock):          Layer 1 lead (primary priority narrative)
                                        Layer 2 support (team capacity freed)
                                        Layer 3 support (financial justification)
Section 5 (Investment Framework):      Layer 3 focus (cost, timeline, ROI)
```

**Section 4 must always contain all three layers:**

```
Layer 1 (lead):    "This infrastructure directly supports {NORTH_STAR}."
Layer 2 (support): "Your team also reclaims [X hours/week] currently spent on [task]."
Layer 3 (support): "This avoids hiring [N] additional [role], saving $[X]/year."
```

#### In the Demo Script

```
Act 1 (Hook):       Layer 2 opens (operational pain — always verifiable)
Act 2 (Proof):      Layer 2 demonstrates (screens proving manual work is gone)
                     Layer 1 connects (how this enables the goal)
Act 3 (Possibility): Layer 1 closes (the vision is now reachable)
                      Layer 3 mentioned briefly (the investment makes sense)
```

#### In the Proposal

```
ROI Lens 1 (lead):    Matches Primary Priority (Layer 1)
ROI Lens 2 (support): Operational efficiency (Layer 2)
ROI Lens 3 (close):   Financial justification (Layer 3)
```

### Three-Layer Application by Priority

**Priority A (Scalability) — TreeRaise example:**

```
Layer 1: "This gives you the operational infrastructure to reach 500 organizations
          by 2026 without breaking your coaching team."

Layer 2: "Your TreeRaiser Coaches also get back approximately 18 hours per week
          currently spent on manual follow-up, onboarding, and report assembly."

Layer 3: "Without this platform, reaching 500 organizations would require 3-4
          additional coaches at $40,000-$60,000 each. The platform replaces
          that hiring requirement."
```

**Priority B (Revenue):**

```
Layer 1: "This unlocks [X]% more deals per month without adding sales headcount."

Layer 2: "Your operations team also recovers [X hours/week] from manual
          pipeline tracking and report generation."

Layer 3: "At current average deal value, the platform pays for itself
          within [N] months from additional revenue alone."
```

**Priority C (Efficiency):**

```
Layer 1: "Your team gets back [X hours/week] to focus on actual delivery
          instead of administrative overhead."

Layer 2: "Specifically, [role] stops spending [hours] on [task] and instead
          [does real work]."

Layer 3: "The recovered time at a blended rate of $[X]/hr equals $[Y]/month
          in recoverable operational cost. Break-even in [N] months."
```

**Priority D (Cost):**

```
Layer 1: "$[X]/month recovered in operational cost."

Layer 2: "Your team also gains [X hours/week] for higher-value work,
          which reduces burnout and improves output quality."

Layer 3: "Break-even at current investment: [N] months."
```

### Ready Answers for Out-of-Priority Questions

This is the most practical fix. When a buyer asks something outside your
primary priority narrative, use these ready answers:

**If Primary is A (Scale) and buyer asks about cost:**
```
"The cost story is actually strong here too. Reaching 500 organizations
manually would require [N] additional hires. The platform replaces that
hiring requirement — so the investment pays for itself in avoided headcount
before you factor in any operational savings."
```

**If Primary is A (Scale) and buyer asks about daily operations:**
```
"Your team also benefits directly. Right now [role] spends [X hours] on
[manual task]. That disappears. They spend those hours on actual partner
support instead of admin work."
```

**If Primary is C (Efficiency) and buyer asks about growth:**
```
"When the manual bottlenecks are removed, your team has the capacity to
handle significantly more volume — potentially 3-5x — without adding
proportional headcount. The efficiency gain is also a growth enabler."
```

**If Primary is B (Revenue) and buyer asks about team workload:**
```
"The same automations that speed up your pipeline also reduce your
team's administrative load. [Role] gets back [X hours/week] that were
going into manual follow-up and status tracking."
```

---

## PART 6 — 3-STEP DATA ENGINE

The engine runs once per prospect, before any deliverable is generated.

### Step 1 — Manual Pain Extraction (Always Run)

Scan all Phase-1 files. Extract every observable manual operation.

**Rules:**
- Every pain point must cite its source file and specific text.
- Minimum 3, maximum 7 pain points.
- Tag each with: Time Cost (hrs/wk) and Risk Factor (Low/Medium/High).
- No invented statistics. Use qualitative language if no number is supportable.
- Map each pain point to the human role doing it.

**Output format:**

| # | Pain Point | Source | Time Cost | Risk | Human Role |
|---|---|---|---|---|---|
| 1 | [task done manually] | [file:section] | [hrs/wk] | [H/M/L] | [role] |

### Step 2 — Ambition Detection (Run After Priority Scoring)

Apply the Confidence Tier system from Part 3.

Record:
- Tier: A / B / C
- Score: 0-10
- Quote if Tier A, or "Not found" if Tier B/C

### Step 3 — Human Impact Mapping

For each pain point from Step 1, map to three human layers:

**Layer 1 — The Executive/Founder:**
What does this pain prevent them from doing strategically?

**Layer 2 — The Operator (same person for solo founder/CEO):**
What does their Tuesday look like because of this pain?

**Layer 3 — The End-Client/Partner:**
What does the customer or partner experience because of this pain?

---

## PART 7 — FIXED DELIVERABLE STRUCTURE

### 7.1 — The 24-Hour Impact Snapshot

Generated from Step 1 data only. No vision analysis required.
Sent within 24 hours of a lead expressing interest.
Only deliverable generated before prospect engagement is confirmed.

```
IMPACT SNAPSHOT — {PROSPECT}
Prepared by {PROVIDER} · {DATE}

We analyzed {PROSPECT}'s public operations.
Here is what we found.

─────────────────────────────────────────────

THE BOTTLENECK:
[Single most painful manual operation — one sentence, specific, citable]

3 THINGS WE CAN ELIMINATE:
→ [Pain Point 1] — [Time Cost or Risk]
→ [Pain Point 2] — [Time Cost or Risk]
→ [Pain Point 3] — [Time Cost or Risk]

WHAT THIS UNLOCKS:
[Priority A: "The operational capacity to scale to {NORTH_STAR}"]
[Priority B: "The bandwidth to close [X]% more deals per month"]
[Priority C: "Your team's time back for the work that grows the business"]
[Priority D: "$[X]/month in recoverable operational cost"]

─────────────────────────────────────────────

[SCREENSHOT: Most impressive portal screen]

Want to see the full demo?
→ Reply to this message. I will send a 6-minute walkthrough.

{PRESENTER} | {PROVIDER}
{CONTACT_EMAIL} | {CONTACT_CHANNEL}
```

---

### 7.2 — The Outcome Report — Fixed 5-Section Architecture

**Section 1 — Operational Snapshot**
What the company does, who it serves, how it works today.
Always achievable. Never skipped.
Uses Layer 2 context (team, daily operations).

**Section 2 — The Friction Map**
3-7 manual bottlenecks with time costs and human impact.
Always achievable. Never skipped.
Uses Step 1 output.

**Section 3 — The Transformation Preview**
For each friction point: before/after using actual demo portal screens.
Always achievable. Never skipped.
Uses Claim-to-Screen Proof Map.

**Section 4 — The Strategic Unlock**
What becomes possible when friction is removed.
**THIS SECTION NOW ALWAYS CONTAINS ALL THREE LAYERS:**

```
Layer 1 (lead — adapts by Priority and Tier):

  Priority A, Tier A: "This infrastructure directly supports your stated goal
                       of {NORTH_STAR}. Here is how each automation maps to
                       that target."

  Priority A, Tier B: "With these bottlenecks removed, your team gains the
                       capacity to handle 3-5x more volume. Here is what
                       that trajectory makes possible."

  Priority A, Tier C: "With these bottlenecks removed, your team can scale
                       without adding proportional headcount."

  Priority B, Tier A: "This directly enables your stated revenue target of
                       {NORTH_STAR}. Here is how."

  Priority B, Tier B: "Your pipeline can close [X]% more deals per month
                       with these fixes in place."

  Priority B, Tier C: "Your team reclaims the time needed to grow revenue
                       without adding staff."

  Priority C, Tier A: "Your stated goal of {NORTH_STAR} requires your team
                       at full capacity — not half-capacity managing admin."

  Priority C, Tier B: "Removing these bottlenecks frees your team to focus
                       on what they were hired to do."

  Priority C, Tier C: "Your team reclaims [X] hours per week. Here is what
                       that time is worth."

  Priority D (any): "$[X]/month recovered. Break-even in [N] months."

Layer 2 (always present — operational support):
  "Your team also reclaims approximately [X hours/week] currently spent on
  [specific manual task]. [Role] stops being an inbox manager and becomes
  [their actual function]."

Layer 3 (always present — financial justification):
  "Without this platform, [reaching goal / handling volume / maintaining quality]
  would require [N] additional [role]. The platform replaces that hiring
  requirement — turning a $[X]/year headcount decision into a one-time
  platform investment."
```

**Section 5 — Investment Framework**
Pricing and timeline reference.
Always achievable. Never skipped.
Uses Layer 3 metrics (cost, break-even, avoided hiring).

---

### 7.3 — Hero Stats Block

Hero stats must match the Primary Priority.
Do NOT default to cost/hours unless Priority D is confirmed.

| Priority | Stat 1 | Stat 2 | Stat 3 |
|---|---|---|---|
| A (Scale) | Capacity Unlocked | Processing Velocity | Manual Workflows Eliminated |
| B (Revenue) | Revenue Unlocked/Month | Deals Closed/Month increase | Time-to-Close Reduction |
| C (Efficiency) | Hours Saved/Week | Turnaround Time Reduction | Error Rate Eliminated |
| D (Cost) | Hours Saved/Week | Cost Impact $/Month | Workflows Automated |

**TreeRaise hero stats (Priority A, Tier A) — CORRECT:**
```
500   Organizations your 2026 goal demands this infrastructure must support
10x   Campaign management capacity without adding coaching headcount
6     Manual workflows currently blocking that growth path
```

**WRONG (Priority D defaults — what the original pipeline would produce):**
```
❌ 37 hrs/week saved
❌ $10,630/month impact
❌ 6 workflows eliminated
```
The numbers may overlap. The framing is what matters.

---

### 7.4 — Solution Card Metric Mapping

Do NOT use "Time Saved / Cost Impact / Effort Reduction" unless Priority D confirmed.

**Priority A — Scalability:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Capacity Unlocked | Units/clients at stated volume target |
| Slot 2 | Volume Handled | Transactions per month without adding headcount |
| Slot 3 | Units Supportable at Scale | North Star volume — how this prevents the bottleneck |

**Priority B — Revenue:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Revenue Unlocked / Month | Conversion rate lift × avg deal value × monthly leads |
| Slot 2 | Deals Closed / Month increase | Time recovered ÷ time-to-close × close rate |
| Slot 3 | Time-to-Close Reduction | Steps removed × avg time per step |

**Priority C — Efficiency:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration per role |
| Slot 2 | Turnaround Time Reduction | Before vs. After duration |
| Slot 3 | Error Rate Eliminated | Manual error frequency × downstream cost |

**Priority D — Cost:**
| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration |
| Slot 2 | Cost Impact / Month | Hours saved × blended role rate |
| Slot 3 | Effort Reduction % | Manual steps before ÷ manual steps after |

---

## PART 8 — PORTAL KPI MAPPING

### Admin Portal KPI Mapping

| KPI Card Position | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Hero KPI 1 | Units in Pipeline | Deals Closed This Month | Hours Recovered This Week | Cost Eliminated This Month |
| Hero KPI 2 | Volume Launched / Month | Revenue Unlocked | Turnaround Time avg | Headcount Equivalent Saved |
| Hero KPI 3 | Capacity vs. Goal | Time-to-Close days | Error Rate | Monthly Savings $ |
| Hero KPI 4 | Team Capacity Remaining | Pipeline Value | Team Utilization | Break-Even Progress |

### Admin Portal Default Panel on Load

| Priority | Open This Panel First |
|---|---|
| A | Pipeline / CRM / All Organizations view |
| B | Revenue / Deals dashboard |
| C | Operations / Task Queue |
| D | Financial / Cost Dashboard |

### Partner Portal KPI Mapping

| KPI Card | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Primary metric | Campaigns/Units Supported | Revenue Generated | Time Saved | Fee Reduced |
| Secondary metric | Units Onboarded | Deals Closed | Tasks Automated | Cost per Unit |

### Implementation Instruction for Portal Phase

```
PRIORITY EMPHASIS LAYER

Read Phase-0:Priority-Profile-{PROSPECT} first.

After implementing all functional changes:
1. Update hero KPI cards to match Priority A/B/C/D mapping above.
2. Set default active panel on load to match Priority.
3. Update all KPI labels, values, and trend lines to correct metric category.
4. Do not change the visual design system.
   Change only data labels and which panel is marked active on load.
```

---

## PART 9 — THE DEMO PITCH — 3-ACT STRUCTURE

### Claim-to-Screen Proof Map (NEW FIX — Required Before Writing Script)

Before writing any demo script section, complete this table.
Every claim must have a screen that proves it.
If a claim has no screen, remove the claim.

```markdown
## Claim-to-Screen Proof Map

| Claim | Screen That Proves It | What To Show | Metric |
|---|---|---|---|
| [claim from report] | [exact screen name] | [specific UI element to point to] | [measurable result] |
```

**TreeRaise example:**

| Claim | Screen | What To Show | Metric |
|---|---|---|---|
| "Every new partner is visible in the pipeline" | Admin: All Organizations | Stage column, owner, next action | 47 partners tracked |
| "Follow-up no longer depends on memory" | Admin: Communications | Automated trigger list, 8 active sequences | 0 manual follow-up hours |
| "Coaches see what needs attention" | Admin: Coach Task Queue | Alert items, days since signup, priority level | 4 open tasks visible |
| "Growth toward 500 is trackable" | Admin: Growth Analytics | Acquisition chart, monthly trend | 47/500 with trajectory |
| "Partner self-serves from day one" | Partner: Setup Wizard | 6-step flow, no coach needed | Avg 12 min to launch |
| "Impact is verified in real time" | Partner: Impact & Trees | veritree sync, GPS data, CO2 | 1,147 trees confirmed |

---

### Act 1 — The Pain (0:00 – 0:30)

Open with one specific, verifiable, citable operational pain.
Read the Hook sentence verbatim from Phase-0:Priority-Profile.
Never open with the North Star goal.
Never open with revenue numbers or a feature list.

**Hook template by Priority:**

```
Priority A: "{PROSPECT} currently manages [specific manual process] by hand.
             When a [customer type] visits [website] and clicks [CTA], there is
             no system to ensure follow-up within 48 hours, no automated nurture,
             and no way for leadership to see how many leads are in the funnel.
             That is the bottleneck between where {PROSPECT} is today and
             {NORTH_STAR}."

Priority B: "{PROSPECT}'s team currently tracks every deal manually.
             There is no pipeline visibility, no automated follow-up, and no
             system to see which deals are at risk. That bottleneck is costing
             your team [X] deals per month."

Priority C: "{PROSPECT}'s [role] currently spends [X hours/week] on [manual task].
             Every hour spent on that is an hour not spent on [their actual job].
             That is the bottleneck we are going to eliminate today."

Priority D: "{PROSPECT} currently spends roughly $[X]/month on manual processes
             that could be automated. I am going to show you exactly where that
             money goes and how to stop it."
```

---

### Act 2 — The Proof (0:30 – 4:00)

Navigate screens in the Priority routing order below.
Every screen narration must follow this pattern:

```
1. Name the human role doing this manually today.
2. Show the screen that replaces their manual process.
3. State what they can do with the time they get back.
```

Always check the Claim-to-Screen Proof Map before this act.
Every claim made in Act 2 must have a matching row in that map.

---

### Demo Screen Routing by Priority

#### Priority A — Scalability

**Open with:** Admin Portal → Pipeline / All Organizations
**Navigate in order:**
1. All Organizations (pipeline stages, owner, next action)
2. Pending Approvals ("this is the onboarding queue — currently all manual")
3. Coach Task Queue ("coaches have no visibility right now — this is their new morning")
4. Growth Analytics ("acquisition by month — the path to {NORTH_STAR} is visible here")
5. Partner Portal → Campaigns ("this is what one of your {NORTH_STAR} organizations sees")

**Call out by name:**
- "The Organizations panel — this is your pipeline to {NORTH_STAR}"
- "The Coach Task Queue — without this, every coordinator tracks in their head"
- "The Growth Analytics chart — the trajectory toward your goal, live"

#### Priority B — Revenue

**Open with:** Admin Portal → Revenue dashboard
**Navigate in order:**
1. Revenue & Fees (total revenue, per-client breakdown)
2. All Campaigns / Deals (live by status, revenue per campaign)
3. Growth Analytics (conversion rate, time-to-first-revenue)
4. Partner Portal → Billing (revenue calculator — "your client sees this")
5. Partner Portal → Campaigns (launch flow — "faster launch = faster revenue")

**Call out by name:**
- "The Revenue dashboard — every dollar, every client, in one view"
- "The Campaigns table — what needs attention is right here"
- "The Revenue Calculator — your clients set their own goal and see the split"

#### Priority C — Efficiency

**Open with:** Admin Portal → Task Queue / Operations
**Navigate in order:**
1. Task Queue (alert tasks — "right now this is all manual checking")
2. Communications → Automated Triggers ("8 sequences — none need a human")
3. Flagged Accounts ("staff only see exceptions — not the whole firehose")
4. Partner Portal → Home Dashboard ("zero manual reporting — live feed")
5. Partner Portal → Setup Wizard ("new client goes live without a single email")

**Call out by name:**
- "The Task Queue — alerts replace daily manual dashboard checking"
- "8 automated triggers — each one replaces a manual staff action"
- "The Setup Wizard — self-serve onboarding in under 15 minutes"

#### Priority D — Cost

**Open with:** Admin Portal → Financial dashboard
**Navigate in order:**
1. Financial Overview (fee structure, break-even context)
2. Payout Queue (automated progression — "no manual bank coordination")
3. Communications → Triggers ("replaces tools and manual labor")
4. Partner Portal → Billing (fee calculator — "transparent, self-service")
5. Partner Portal → Verification (compliance flow — "no compliance team needed")

**Call out by name:**
- "The Payout Queue — three-state progression, fully automated"
- "8 automated triggers — each replaces a tool or a staff hour"
- "The Billing calculator — no support call needed"

---

### Act 3 — The Possibility (4:00 – 5:00)

Introduced last. Earned through Acts 1 and 2.
Read the closing line verbatim from Phase-0:Priority-Profile.

**Template by Priority and Tier:**

```
Priority A, Tier A:
"With these systems running, the operational question changes. It is no longer
'can we handle more?' It is 'how fast do you want to reach {NORTH_STAR}?'
This infrastructure is built for that target."

Priority A, Tier B:
"With these bottlenecks removed, you have the capacity to grow significantly —
maybe 3x, maybe 5x — without adding proportional headcount.
How far do you want to take it?"

Priority B, Tier A:
"This is the infrastructure that makes {NORTH_STAR} achievable. Every minute
your team spends on admin is a minute they are not closing the next deal."

Priority C (any tier):
"Your team did not sign up to copy-paste data between spreadsheets. This gives
them back the capacity to do what they were actually hired to do."

Priority D (any tier):
"$[X] per month is recoverable. But the more important number is what your
team does with the hours they get back."
```

**Always add the Three-Layer close (30 seconds after the primary closing line):**

```
Layer 2 close (operational):
"And your [role] specifically gets back [X hours/week] that were going into
[manual task]. That is not a small thing."

Layer 3 close (financial):
"The investment pays for itself in [N] months — faster if you factor in
the [hiring / tools / errors] it replaces."
```

---

## PART 10 — PROPOSAL ROI FRAMEWORK (3 LENSES)

The proposal always contains three ROI lenses.
The order changes based on Primary Priority.
All three lenses are always present.

### Priority A — Lead with Capacity

**Lens 1 (Lead) — Capacity ROI:**
"With manual bottlenecks removed, the team can support [X]x current volume without
adding proportional headcount. At current average revenue per client, that
capacity directly enables {NORTH_STAR}."

**Lens 2 — Operational ROI:**
"These [N] automations also recover approximately [X hours/week] across
[roles]. At a blended rate of $[Y]/hr, that is $[Z]/month recovered."

**Lens 3 — Strategic/Hiring ROI:**
"Reaching {NORTH_STAR} manually would require [N] additional [roles] at
$[X]/year. The platform replaces that hiring requirement."

### Priority B — Lead with Revenue

**Lens 1 (Lead) — Revenue ROI:**
"With pipeline automation running, the team can close [X]% more deals/month.
At current average deal value, that is $[Y]/month in additional revenue."

**Lens 2 — Operational ROI:** (same as Priority A Lens 2)

**Lens 3 — Capacity ROI:** (what the revenue growth requires operationally)

### Priority C — Lead with Efficiency

**Lens 1 (Lead) — Efficiency ROI:**
"These [N] automations recover [X hours/week]. At $[Y]/hr blended rate,
that is $[Z]/month recovered. Break-even: [N] months."

**Lens 2 — Capacity ROI:** (what the recovered time enables at scale)

**Lens 3 — Strategic ROI:** (Tier A/B only — skip for Tier C)

### Priority D — Lead with Cost

**Lens 1 (Lead) — Cost ROI:**
"$[X]/month recovered. Break-even: [N] months."

**Lens 2 — Capacity ROI:** (what the savings fund next)

**Lens 3 — Strategic ROI:** (skip unless Tier A/B signals present)

### Ready Answers for Lens Questions Outside Primary Priority

These are pre-written so the presenter is never caught without an answer:

**If buyer on Priority A asks "what does this cost us monthly?"**
```
"The cost story is strong here too. Reaching {NORTH_STAR} manually would require
[N] additional hires. The platform replaces that — so the investment pays for
itself in avoided headcount before you factor in any operational savings.
Numbers are in Section 5 of the report."
```

**If buyer on Priority C asks "how does this help us grow?"**
```
"When these bottlenecks are removed, your team has capacity for significantly
more volume — potentially 3-5x — without adding proportional headcount.
The efficiency gain is also a growth enabler."
```

**If buyer on Priority B asks "what about the team workload?"**
```
"The same automations that speed up the pipeline also reduce your team's
admin load. [Role] gets back [X hours/week] that were going into manual
follow-up and status tracking."
```

---

## PART 11 — TIER C EXECUTION PATH

### When Tier C Applies

Confidence Score 0-3. Fewer than 3 directional signals. Generic website.
No strategic content found.

### Tier C Deliverable Path

**Step 1 — Generate the 24-Hour Impact Snapshot only.**
Do not generate the full Outcome Report.
Do not invest in full portal customization.
Send the snapshot and wait for a response.

**Step 2 — If prospect responds, book a discovery call.**

Use these structured questions:
```
1. "What is the single biggest goal you are trying to hit this year?"
2. "What is the biggest operational headache your team deals with daily?"
3. "If we could fix one thing for you, what would make the biggest difference?"
```

Record answers. Re-run p0 with this first-party data added.
Now you have Tier A or B data. Proceed with full pipeline.

**Step 3 — If no discovery call is possible, use the Tier C Generic Demo Path.**

### Tier C Generic Demo Path

1. Admin Portal → Company Overview dashboard
2. All Campaigns / Deals table
3. Communications → Automated Triggers
4. Partner Portal → Home Dashboard (live feed + KPIs)
5. Partner Portal → Impact / Results page

### Tier C Hook (no North Star required)

```
"Right now, your team is managing [most visible process] manually.
Every hour spent on [specific task] is an hour not spent on [their actual job].
This platform automates [that process] so your team can focus on [real work]."
```

### Tier C Act 3 Closing

```
"With these bottlenecks removed, your team reclaims [X hours/week].
Here is what that time is worth. And here is what becomes possible when
your people are doing what they were actually hired to do.
The next step is yours."
```

### Tier C Three-Layer Application

Even in Tier C, all three layers must be present:

```
Layer 1: "With these bottlenecks removed, your team can handle
          significantly more volume without adding headcount."
Layer 2: "[Role] gets back [X hours/week] for actual work."
Layer 3: "Break-even on the investment at [N] months."
```

---

## PART 12 — ONE-PAGE DECISION TREE

```
START
  │
  ▼
STEP 0: Run p0 Priority Detection on all Phase-1 files
  │     Save as Phase-0:Priority-Profile-{PROSPECT}
  │     Attach to every downstream prompt
  │
  ▼
STEP 1: Read Priority Portfolio from p0 output
  │     Note: Primary Priority, Secondary Priority, Decision Risk
  │
  ├─── Priority A (highest score)?
  │         Tier A → Full vision-anchored narrative
  │         Tier B → Trajectory-based narrative
  │         Tier C → Snapshot only → Discovery call → Re-run p0
  │
  ├─── Priority B (highest score)?
  │         Tier A → Revenue target narrative
  │         Tier B → Pipeline capacity narrative
  │         Tier C → Throughput improvement → Snapshot + Discovery
  │
  ├─── Priority C (highest score)?
  │         Tier A → Stated efficiency goal narrative
  │         Tier B → Team capacity narrative
  │         Tier C → Hours saved + role elevation → Snapshot + Discovery
  │
  └─── Priority D, OR all scores low?
            Balanced Three-Layer ROI
            All three lenses equally weighted
            Let the buyer choose their primary frame

ALL PRIORITIES:
  After choosing primary narrative →
  Add Layer 2 (operational support) to every Section 4 and Act 3
  Add Layer 3 (financial justification) to every Section 4, Act 3, and Proposal

IF scores tied between two priorities:
  Lead with higher-scored Priority in hero
  Show both priority metrics side-by-side in solution cards
  Use both priorities' narratives in Section 4

IF data insufficient (Tier C + low signals):
  Generate 24-Hour Impact Snapshot ONLY
  Do not generate full Outcome Report
  Follow Tier C Execution Path in Part 11 exactly
```

---

## PART 13 — PROMPT MODIFICATION INSTRUCTIONS

### Outcome Report Prompt — Required Changes

```
## PRE-GENERATION STEP

FIRST — Read Phase-0:Priority-Profile-{PROSPECT} completely.

Do not default to cost-savings framing.
Do not default to hours-saved / cost-impact / effort-reduction metrics.
Use only the metric categories in the Priority Profile.

HERO STATS: Use the Priority-specific table from Part 7.3.
  Do not use Hours Saved / Cost Impact / Workflows Eliminated unless Priority D.

SOLUTION CARDS: Use Metric Slot labels from Priority Profile.
  Do not use "Time Saved / Cost Impact / Effort Reduction" unless Priority D.

SECTION 4: Must always contain all three layers.
  Layer 1: Primary Priority narrative (adapts by Priority + Tier)
  Layer 2: Operational support (always present — team hours, manual work removed)
  Layer 3: Financial justification (always present — cost, hiring avoided, break-even)

Include comment at top of HTML:
<!-- Priority: [X] | Tier: [X] | North Star: [text or N/A] -->
```

### Demo Script Prompt — Required Changes

```
FIRST — Read Phase-0:Priority-Profile-{PROSPECT} completely.
Complete the Claim-to-Screen Proof Map before writing any section.
Remove any claim that has no matching screen in the map.

HOOK: Read verbatim from Priority Profile hook sentence.
      Opens with operational pain, never with strategic goal.

SCREEN ROUTING: Navigate in Priority routing order from Part 9.
                Do not default to generic screen order.

ACT 2: Every narration follows: Role → Screen → What they get back.
        Check every claim against Claim-to-Screen Proof Map.

ACT 3: Read closing line verbatim from Priority Profile.
        Then add the Three-Layer close (Layer 2 + Layer 3 brief mentions).
```

### Proposal Prompt — Required Changes

```
Add: ROI Framework with 3 Lenses (Part 10)

Lead with the lens matching the detected Primary Priority.
All three lenses must be present in the proposal.

Add: Ready Answers section (internal reference, not client-facing)
     Pre-written responses to out-of-priority questions.
     {PRESENTER} reads these when buyer asks outside primary narrative.
```

---

## PART 14 — IMPLEMENTATION CHECKLIST

```
PRE-DELIVERABLE (required before writing anything)
□ Set all configuration variables (Part 1)
□ Run p0 Priority Detection on all Phase-1 files
□ Save as Phase-0:Priority-Profile-{PROSPECT}
□ Record Priority Portfolio: Primary + Secondary + Decision Risk
□ Record Confidence Tier (A / B / C)
□ Record North Star quote or mark "Not found"
□ Write Hook sentence (ready to read aloud, citable)
□ Compute Hero Stats (Priority-specific — NOT cost/hours unless D)
□ Set Solution Card Metric Slot labels (NOT "Time Saved / Cost / Effort" unless D)
□ Write Three-Layer Narrative for this prospect (all three layers)
□ Complete Claim-to-Screen Proof Map
□ Specify Portal Emphasis: panel on load + KPI cards
□ Write Act 3 closing line (ready to read aloud)

WITHIN 24 HOURS (Tier C or before full investment confirmed)
□ Generate 24-Hour Impact Snapshot from p0 Step 1 data only
□ If Tier C: use Tier C template from Part 11 (NOT full Outcome Report)
□ Send snapshot. Wait for response before investing further.

AFTER PROSPECT RESPONDS (confirmed interest)
□ Attach Priority Profile to Outcome Report prompt
□ Verify hero stats match Primary Priority (use Part 7.3 table)
□ Verify solution cards use correct Metric Slot labels (use Part 7.4 table)
□ Verify Section 4 has all three layers present
□ Attach Priority Profile to Portal Implementation prompt
□ Verify portal KPI cards match Priority (Part 8 table)
□ Verify default panel on load matches Priority
□ Attach Priority Profile to Demo Script prompt
□ Complete Claim-to-Screen Proof Map before writing script
□ Verify hook reads verbatim from Priority Profile
□ Verify screen order matches Priority routing (Part 9)
□ Verify Act 3 closing reads verbatim from Priority Profile
□ Verify Three-Layer close is present after Act 3 primary line
□ Attach Priority Profile to Proposal prompt
□ Verify proposal ROI leads with correct Priority lens (Part 10)
□ Verify all three ROI lenses are present in proposal
□ Add Ready Answers section for out-of-priority questions

QUALITY CHECKS (before sending anything to prospect)
□ Can {PRESENTER} defend every claim with a source on a live call?
□ Does the report hold if the buyer has quietly changed their goal?
□ Does a Tier C version still stand on its own?
□ Is the demo portal doing 80% of the selling?
□ Does the hook open with pain, not vision?
□ Are all estimates labeled [Estimated]?
□ Are all source citations present for quoted claims?
□ Are hero stats framed in Priority-correct language?
□ Are solution card slots Priority-specific?
□ Does portal KPI mapping match the Priority?
□ Are demo screens in Priority routing order?
□ Does Section 4 contain all three layers?
□ Does Act 3 include both the primary closing and the Three-Layer close?
□ Are Ready Answers prepared for the three most likely out-of-priority questions?
```

---

## PART 15 — WORKED EXAMPLE: TREERAISE END-TO-END

### Configuration Variables

```
{PROVIDER}        = Dev8X
{PRESENTER}       = Abdul
{PROSPECT}        = TreeRaise
{PROSPECT_ROLE}   = Founder / CEO
{NORTH_STAR}      = 500 partner organizations by end of 2026
{CONTACT_EMAIL}   = hello@dev8x.com
{CONTACT_CHANNEL} = LinkedIn
```

### Priority Classification

Signal scan results:
```
Priority A: 14  ("500 orgs by 2026" +5, Coordinator hiring +3, 
                  founder scale posts +3, social enterprise +3)
Priority B: 3   (fundraising mentioned)
Priority C: 2   (detail-oriented in job post)
Priority D: 0   (no cost-cutting signals)
```

**Result: Priority A — Scalability / Growth Execution**
**Tier: A — Direct Quote**
**North Star: "2026 organizations engaged goal: 500+" [Source: p1a_Website, Press Kit]**

---

### p0 Priority Profile Output

```markdown
# Priority Profile — TreeRaise

## Priority Portfolio

Primary Priority:
A — Scalability — "This gives TreeRaise the operational infrastructure to reach
500 partner organizations in 2026 without the coaching team becoming the bottleneck."

Secondary Priority:
C — Operational Efficiency — "The same platform removes approximately 18 hours/week
of manual work from the TreeRaiser Coach role."

Decision Risk:
"Wayne may question whether a web platform can actually drive organizational growth
or whether this is just an admin tool. The answer is in the pipeline visibility
screen and the Growth Analytics panel."

## Three-Layer Narrative

Layer 1 — Visionary:
"This gives TreeRaise the operational infrastructure to reach 500 partner
organizations in 2026. Without it, the coaching team becomes the bottleneck
at around 80-100 organizations — invisible but certain."

Layer 2 — Operator:
"Your TreeRaiser Coaches currently spend approximately 18 hours per week on
manual follow-up, onboarding coordination, and report assembly. The platform
eliminates all three. They spend those hours on actual partner support."

Layer 3 — Accountable:
"Reaching 500 organizations manually would require 3-4 additional coaches at
roughly $40,000-$60,000 each. The platform replaces that hiring requirement —
turning a $160,000-$240,000 annual headcount decision into a one-time
platform investment."

## Claim-to-Screen Proof Map

| Claim | Screen | What To Show | Metric |
|---|---|---|---|
| "Pipeline to 500 is visible and trackable" | Admin: All Organizations | Stage, owner, next action for all 47 current partners | 47 partners in pipeline |
| "Follow-up no longer depends on memory" | Admin: Communications | 8 automated triggers, sequence status | 0 manual follow-up hours |
| "Coaches see what needs attention" | Admin: Coach Task Queue | Alert items, days since signup, assigned coach | 4 open alerts |
| "Growth toward 500 is trackable" | Admin: Growth Analytics | Monthly acquisition chart, trajectory | 47/500 visible |
| "Partners self-serve from day one" | Partner: Setup Wizard | 6-step flow, avg 12 min to launch | No coach email needed |
| "Impact verified in real time" | Partner: Impact & Trees | veritree sync, GPS, CO2 data | 1,147 trees confirmed |
```

---

### Hero Stats — Correct Framing (Priority A)

```
500   Organizations your 2026 goal demands this infrastructure must support
10x   Campaign management capacity without adding coaching headcount
6     Manual workflows currently blocking that growth path
```

---

### Three-Layer Narrative for Section 4

```
Layer 1 (lead):
"This infrastructure directly supports your stated goal of 500 organizations
by 2026. Without pipeline visibility, automated follow-up, and self-serve
partner onboarding, the coaching team becomes the ceiling at roughly
80-100 organizations. The platform removes that ceiling."

Layer 2 (operational support):
"Your TreeRaiser Coaches also reclaim approximately 18 hours per week
currently split across manual onboarding emails, impact report assembly,
and daily dashboard checking. That time moves to actual partner support —
which is what the role is for."

Layer 3 (financial justification):
"Reaching 500 organizations manually would require 3-4 additional coaches.
At $40,000-$60,000 each, that is $160,000-$240,000 in annual headcount.
The platform replaces that hiring decision."
```

---

### Demo Sequence (Priority A routing)

```
Hook: Read verbatim from Priority Profile hook sentence.

Act 2 screen order:
1. Admin: All Organizations (pipeline, stages, owners)
   "Right now your coach tracks 47 organizations by memory and email.
   This screen is their new reality. Every organization is here — stage,
   owner, next action. Nothing falls through."

2. Admin: Pending Approvals (onboarding queue)
   "This is the queue of organizations that have signed up but not launched.
   Right now this is invisible. Here it is visible and actionable."

3. Admin: Coach Task Queue (alerts and capacity)
   "These alerts fire automatically. A signup with no campaign in 48 hours
   appears here. An organization at 80% of their drive window with under
   50% of goal appears here. The coach does not need to check manually."

4. Admin: Growth Analytics (acquisition chart)
   "This is the path to 500. Current partners by month, pipeline trend,
   trajectory. Leadership can see whether the goal is achievable without
   asking for a report."

5. Partner Portal: Campaigns (partner live view)
   "This is what one of your 500 organizations sees. They manage their
   campaign, track contributions, and download their impact report.
   Zero coaching required once they are onboarded."

Act 3 primary closing:
"With the CRM running, the email sequences live, and the impact reports
automated, the operational question changes. It is no longer 'can we
handle more organizations?' It is 'how fast do you want to reach 500?'
This infrastructure was built for that target."

Act 3 Three-Layer close:
Layer 2: "And your coaching team gets back approximately 18 hours per week
          that were going into manual follow-up and report assembly. That
          is not a small thing for a team this size."
Layer 3: "The investment pays for itself by avoiding the 3-4 coach hires
          you would need to hit 500 manually. That is before you count
          any operational savings."
```

---

### Proposal ROI (Priority A — Capacity leads)

```
Lens 1 (Lead — Capacity):
"These 6 automations allow one TreeRaiser Coach to support 3x the number
of active campaigns without additional working hours. At current revenue
per campaign, this capacity directly enables the 500-organization target."

Lens 2 (Operational):
"These 6 automations also recover approximately 37 hours per week across
coaching and admin roles. At a blended rate of $40/hr, that is $5,920/month
recovered. Break-even: approximately 5-6 months."

Lens 3 (Strategic/Hiring):
"Reaching 500 organizations manually would require hiring 3-4 additional
coaches. At $40,000-$60,000 each, that is $160,000-$240,000/year in
avoided headcount. The platform replaces that hiring requirement."
```

### Ready Answers for Out-of-Priority Questions

```
If Wayne asks "what does this actually cost us per month?":
"The cost story is strong. Reaching 500 organizations manually needs 3-4
additional coaches — that is $160,000-$240,000/year in avoided hiring alone.
The platform pays for itself before you count any operational savings.
Full numbers are in Section 5 of the report."

If Wayne asks "what does this mean for my coaches day to day?":
"Significant relief. Each coach gets back roughly 18 hours per week currently
split across manual follow-up, onboarding emails, and daily dashboard checking.
They spend that time on actual partner support — which is what you hired them for."

If Wayne asks "how does this actually help us grow to 500?":
"Two ways. First, pipeline visibility means no lead falls through — every
interested organization is tracked and followed up automatically. Second,
self-serve onboarding means the coaching team can handle 3x the volume
with the same headcount. Those two things together are what makes 500
operationally reachable."
```

---

## APPENDIX — PRIORITY QUICK-REFERENCE CARD

```
┌────────────────────────────────────────────────────────────────────────────┐
│  PRIORITY DETECTION QUICK CARD                                             │
├──────────────┬───────────────────────┬────────────────────────────────────┤
│  PRIORITY    │  KEY SIGNAL           │  HERO METRIC SLOTS                 │
├──────────────┼───────────────────────┼────────────────────────────────────┤
│  A — Scale   │  Growth targets,      │  Capacity Unlocked                 │
│              │  "500 orgs", "10x"    │  Volume Handled                    │
│              │  mission-driven org   │  Units Supportable at Scale         │
├──────────────┼───────────────────────┼────────────────────────────────────┤
│  B — Revenue │  Sales hiring, CRM,   │  Revenue Unlocked / Month          │
│              │  revenue targets      │  Deals Closed / Month increase     │
│              │  outbound signals     │  Time-to-Close Reduction           │
├──────────────┼───────────────────────┼────────────────────────────────────┤
│  C — Ops     │  "Burnout", "manual"  │  Hours Saved / Week                │
│              │  quality complaints   │  Turnaround Time Reduction         │
│              │  process bottlenecks  │  Error Rate Eliminated             │
├──────────────┼───────────────────────┼────────────────────────────────────┤
│  D — Cost    │  CFO-led, lean team   │  Hours Saved / Week                │
│              │  cost-cutting lang.   │  Cost Impact $/Month               │
│              │  layoff signals       │  Effort Reduction %                │
└──────────────┴───────────────────────┴────────────────────────────────────┘

THREE-LAYER NARRATIVE RULE (NEW FIX — applies to every deliverable)
  Layer 1: Does this help me hit my stated goal?       ← Primary Priority
  Layer 2: Does this make my team's life easier?       ← Always present
  Layer 3: Can I justify this to my board?             ← Always present

  Layer 1 is the hero. Layers 2 and 3 support it.
  Never let Layer 3 (cost) become the hero unless Priority D is confirmed.

CLAIM-TO-SCREEN PROOF MAP RULE (NEW FIX)
  Complete this table before writing any demo script section.
  Every claim must map to a specific screen.
  If a claim has no screen, remove the claim.

CONFIDENCE TIER QUICK CARD
  Tier A: Direct quote found → use verbatim, cite source
  Tier B: 3+ consistent signals → frame as trajectory, not claim
  Tier C: <3 signals → 24-Hour Snapshot only → discovery call → re-run p0

NARRATIVE ARC (all priorities)
  Hook:         Specific operational pain (verifiable, citable, never the goal)
  Demo:         Screens in Priority routing order, every claim screen-proven
  Possibility:  Vision introduced last, earned through proof
  Three-Layer:  Always close with Layer 2 (team) and Layer 3 (financial) briefly

PORTAL DEFAULT PANEL ON LOAD
  Priority A → Pipeline / All Organizations
  Priority B → Revenue & Deals
  Priority C → Task Queue / Operations
  Priority D → Financial Dashboard

READY ANSWERS RULE (NEW FIX)
  Before every demo or proposal meeting, prepare answers for:
  1. "What does this cost / save us?" (if not your primary priority)
  2. "What does this mean for my team day to day?" (if not your primary priority)
  3. "How does this help us grow?" (if not your primary priority)
  These answers are in Part 9 (Proposal) and Part 5 (Three-Layer Narrative).
  {PRESENTER} never gets caught without an answer.

SOLUTION CARD CHECK
  Are these metric slots from the Priority Profile?
  If labels say "Time Saved / Cost Impact / Effort Reduction" → STOP
  Those are Priority D defaults. Apply correct Priority labels.

HERO STAT CHECK
  Priority A hero stats must reference capacity/scale.
  Priority D is the only priority where "$X/month" is the correct primary frame.
  Same numbers can appear — the framing is what changes everything.
```