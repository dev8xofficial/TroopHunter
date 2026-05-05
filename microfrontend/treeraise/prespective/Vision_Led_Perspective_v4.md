# Vision-Led Pipeline v4: The Executable Framework
> **Version history:**
> v1 = Priority Mode anchor.
> v2 = Absorbed 6 counter-perspectives.
> v3 = Priority Detection Algorithm, North Star Scoring, Decision Tree, prompt instructions.
> v4 = Fixes all structural gaps found in v3. Introduces p0 Pre-Step, Priority Thread Variable,
>       Portal KPI Mapping, Demo Screen Routing, and enforces detection as a structured OUTPUT
>       (not a reading instruction). Every fix is traceable to a numbered problem below.

---

## PART 0 — WHY v4 EXISTS: THE 6 PROBLEMS FOUND IN v3

After applying v3 to the TreeRaise pipeline, six structural failures were identified.
Each is documented here with its root cause and the exact fix applied in v4.

---

### PROBLEM 1 — The algorithm ran too late (inside the wrong prompt)

**What v3 said:**
"Before writing any HTML, run the Priority Detection Algorithm."
This instruction lived *inside* p3a_Outcome_Report.md as a comment block.

**What actually happened:**
The Outcome Report prompt (p3a) was already structured around cost-savings metrics.
Hero stats defaulted to hours-saved / cost-impact / workflows-eliminated.
The classification step was bolted on top of a Priority D template.
Even if the AI correctly detected Priority A, it was still filling a Priority D frame.

**Root cause:**
Priority Detection was a *reading instruction*, not a *structured output*.
It produced no file. It fed no downstream prompt. It changed nothing architecturally.

**Fix in v4 → PART 2:**
A new mandatory pre-step prompt `p0_Priority_Detection.md` runs before any deliverable.
It produces a structured output file `p0_Priority_Profile_[Client].md`.
Every downstream prompt (p3a, p4e, p5a, p5b) attaches this file and reads it first.
The detection result is now an INPUT, not an instruction.

---

### PROBLEM 2 — The demo portal was disconnected from the Priority

**What v3 said:**
"The demo portal carries the pitch" (absorbed from Counter-Perspective 6).

**What actually happened:**
admin.html and partner-portal.html were fixed HTML files.
The KPI cards always showed the same numbers.
The same screens were shown regardless of Priority A, B, C, or D.
For TreeRaise (Priority A — Scalability), the admin dashboard still led with revenue
and fee numbers instead of org pipeline volume and campaign capacity.

**Root cause:**
No mechanism existed to change portal emphasis based on detected Priority.
The portal implementation prompt (p4d) received no Priority signal.

**Fix in v4 → PART 4:**
A new Portal KPI Mapping table defines which KPI cards, which screens, and which
data labels to emphasize per Priority.
p4d implementation instructions now include a "Priority Emphasis Layer" section.
For Priority A clients, the admin dashboard hero section must show:
- Organizations in Pipeline (not revenue)
- Campaigns Launched This Month (not fee collected)
- Capacity vs. Goal (progress toward North Star)

---

### PROBLEM 3 — The Demo Pitch Script had no Priority-based screen routing

**What v3 said:**
"Abdul opens with a specific, verifiable operational pain."

**What actually happened:**
p4e_Demo_Pitch.md instructed the AI to map screens to pain points.
But it gave no instruction about *which* screens to prioritize based on Priority.
A Priority A client and a Priority D client would receive scripts emphasizing
the same screens in the same order.

**Root cause:**
p4e had no screen routing logic. Screen selection was left entirely to the AI
with no Priority constraint.

**Fix in v4 → PART 5:**
A Demo Screen Routing Table is introduced.
For each Priority (A/B/C/D), the table specifies:
- Which portal to open first
- Which panels/screens to navigate to, in order
- Which KPIs to call out by name
- What the Act 3 (Possibility) closing line must reference

---

### PROBLEM 4 — The Outcome Report was built before the portals, but portals should reflect the Priority identified in the Outcome Report

**What v3 said:** (silent on this dependency)

**What actually happened:**
Phase 3 → p3a Outcome Report (first touch, Priority detected here)
Phase 4 → p4d Portal implementation (built later, Priority not passed forward)

The Priority detected during Outcome Report generation was never formally passed to
the portal implementation step. The portals were built from the Tech Spec (p4c) alone,
with no Priority signal.

**Root cause:**
The pipeline had no formal "thread variable" — a value computed once and passed
through every subsequent phase.

**Fix in v4 → PART 3:**
The Priority Profile file (produced by p0) becomes the thread variable.
It is explicitly listed as a required attachment for: p3a, p4d, p4e, p5a, p5b.
Each prompt must read the Priority Profile before generating any content.
The pipeline README (p0 section) documents this dependency chain.

---

### PROBLEM 5 — Confidence Tier C produced no usable output for data-poor clients

**What v3 said:**
"Tier C → skip vision framing entirely. Use pure Pain → Fix → Unlock structure."

**What actually happened:**
The TreeRaise portals are built for TreeRaise.
For a different client with sparse data (Tier C), what does Abdul show?
v3 acknowledged the problem but provided no alternative content path.
A Tier C client would receive the same TreeRaise portals with a weaker narrative.

**Root cause:**
Tier C graceful degradation was described but never operationalized.
No alternative template, no alternative portal guidance, no alternative script
structure was defined for data-poor scenarios.

**Fix in v4 → PART 6:**
A Tier C Execution Path is defined with three concrete outputs:
1. A 24-Hour Impact Snapshot (single-page, pain-only, no vision)
2. A Generic-but-Credible Demo path (which portal panels to show when no
   custom portal exists for the client's industry)
3. A Tier C Script Template — a pre-written hook and Act 3 that works without
   a North Star quote

---

### PROBLEM 6 — The Outcome Report financial estimates used wrong metric categories

**What v3 said:**
"For Priority A, express as capacity."

**What actually happened:**
The TreeRaise Outcome Report showed:
- CRM & Pipeline: $960/mo (cost impact)
- Email Automation: $1,280/mo (cost impact)
- BDR Portal: $1,800/mo (cost impact)
Total: "$10,630/month impact" framed as money saved.

For a Priority A client (TreeRaise, chasing 500 orgs by 2026), this is the wrong
metric category. The correct frame is:
- CRM & Pipeline: "Handles 500-org pipeline without adding coaches"
- Email Automation: "Reactivates past campaigns automatically — Legacy Forest grows itself"
- BDR Portal: "One BDR manages 150+ outreach conversations simultaneously"

The numbers in the report weren't wrong. The *column header* was wrong.

**Root cause:**
The solution card template in p3a hardcoded three metric slots:
- Time Saved
- Cost Impact
- Effort Reduction

These are Priority D metrics. For Priority A they should be:
- Capacity Unlocked
- Volume Handled
- Orgs Supportable at Scale

**Fix in v4 → PART 7:**
A Solution Card Metric Mapping table replaces the hardcoded three-slot template.
Each Priority gets its own three metric slots with correct labels and calculation methods.

---

## PART 1 — THE FOUR PRIORITIES (unchanged from v3, included for completeness)

Every prospect is classified into exactly one primary bucket before any deliverable is written.

### Priority A — Scalability / Growth Execution
**Goal:** Reach a specific volume or market expansion target. Current systems cannot support that scale.
**Signals:** Explicit numerical targets, aggressive hiring, multi-market expansion, waitlists, network/franchise model.
**Demo framing:** "Your current operations handle X. This infrastructure handles 10X."
**Metric set:** Capacity Unlocked, Volume Handled, Orgs Supportable, Processing Velocity.

### Priority B — Revenue Growth / Deal Velocity
**Goal:** Close more deals faster, or unlock new revenue streams.
**Signals:** Sales team hiring, CRM references, revenue targets, outbound expansion language.
**Demo framing:** "This platform lets your team close 30% more campaigns without adding headcount."
**Metric set:** Deals Closed/Mo, Time-to-Close Reduction, Revenue Unlocked/Mo.

### Priority C — Operational Efficiency / Productivity
**Goal:** Ship faster, deliver better service, eliminate internal friction.
**Signals:** Burnout language in job postings, manual process complaints, turnaround time issues.
**Demo framing:** "Your team can deliver in the same day instead of next week."
**Metric set:** Hours Saved/Week, Turnaround Time Reduction, Error Rate Eliminated, Tasks Automated.

### Priority D — Cost Reduction (Fallback only)
**Goal:** Reduce operational spend, headcount, or tooling costs.
**Signals:** Layoff mentions, cost-cutting language, lean team framing, CFO-led decisions.
**Demo framing:** "This eliminates $X/month in operational waste."
**Metric set:** Hours Saved, Cost Impact ($), Effort Reduction (%).

> **Rule:** Priority D is never the first choice. It is the fallback when no other signal dominates.
> Most early-stage social enterprises are Priority A.
> Most established SMBs are Priority C.
> Priority D is most common in late-stage or declining businesses.

---

## PART 2 — THE p0 PRE-STEP: PRIORITY DETECTION AS A STRUCTURED OUTPUT

### What p0 Is

A new mandatory prompt that runs BEFORE Phase 3 begins.
It reads all Phase 1 context files and produces a single structured Markdown file.
This file is the "thread variable" passed to every downstream phase.

### When to Run p0

Run p0 after Phase 1 is complete and before p3a (Outcome Report) is generated.
p0 runs once per client. Its output is reused across all phases.

### p0 Input Files

| File | Role |
|------|------|
| p1a_Website.md | Primary signal source |
| p1b_Linkedin_Company.md | Company framing and post themes |
| p1c_Linkedin_Owner.md | Founder goals and language |
| p1e_Job_Posting.md | Operational reality signals |
| Any p1d_ files | Supporting context |

### p0 Output File Structure

Save output as: `context/p0_Priority_Profile_[ClientName].md`

```markdown
---
client: [Client Name]
generated: [Date]
version: p0_v4
---

# Priority Profile — [Client Name]

## Signal Scan Results

| Priority | Score | Key Signals Found |
|----------|-------|-------------------|
| A — Scalability | [N] | [list signals with sources] |
| B — Revenue | [N] | [list signals with sources] |
| C — Efficiency | [N] | [list signals with sources] |
| D — Cost | [N] | [list signals with sources] |

## Classification Result

**Primary Priority: [A / B / C / D] — [Name]**
**Confidence Tier: [A / B / C]**
**Confidence Score: [0–10]**

## North Star

**Quote:** "[exact quote if Tier A, or 'Not found' if Tier B/C]"
**Source:** [file name and section]
**Frame:** [how to reference this in deliverables]

## Narrative Directives (copy these into every downstream prompt)

**Hook sentence (Act 1 opening for demo script):**
[One specific, verifiable, citable operational pain — ready to read aloud]

**Hero Stats for Outcome Report:**
- Stat 1: [label] — [value or calculation method]
- Stat 2: [label] — [value or calculation method]
- Stat 3: [label] — [value or calculation method]

**Solution Card Metric Slots:**
- Slot 1 label: [e.g., "Capacity Unlocked" for Priority A]
- Slot 2 label: [e.g., "Volume Handled" for Priority A]
- Slot 3 label: [e.g., "Orgs Supportable at Scale" for Priority A]

**Act 3 Possibility sentence (for demo script closing):**
[Ready-to-read closing line tied to Priority and Tier]

**Portal Emphasis:**
- Primary panel to open first: [panel name from admin.html or partner-portal.html]
- KPI cards to highlight: [list specific card labels]
- Screens to navigate to in order: [ordered list]

## Execution Path

[Based on Tier, specify which path to follow]

- Tier A: Full vision-anchored narrative. Use all 5 phases. Quote North Star in hero.
- Tier B: Trajectory-based narrative. Frame as "where you're heading." No invented numbers.
- Tier C: Pain → Fix → Unlock only. Use 24-Hour Impact Snapshot first. No vision claims.
```

### Signal Weighting Table (unchanged from v3, reproduced here for operator use)

When scanning Phase 1 files, assign weight points. Highest total score wins.

| Signal Type | Source | A | B | C | D |
|---|---|---|---|---|---|
| Explicit numerical growth target | LinkedIn / website | +5 | +2 | 0 | 0 |
| Aggressive hiring in ops/tech roles | Job posting | +3 | +2 | +2 | -1 |
| Revenue target or funding mention | LinkedIn / press | +2 | +5 | 0 | 0 |
| "Burnout", "drowning", "manual" language | Job posting / posts | +1 | 0 | +4 | +2 |
| Cost-cutting or "lean" language | Any source | 0 | 0 | +1 | +5 |
| Multi-market expansion planned | Website / LinkedIn | +4 | +3 | 0 | 0 |
| Sales team or CRM hiring | Job posting | +1 | +4 | +1 | 0 |
| Client complaint about turnaround | Reviews / posts | 0 | 0 | +4 | 0 |
| CFO or finance-led organization | LinkedIn team | -1 | 0 | 0 | +4 |
| Founder posts about scale/mission | LinkedIn posts | +3 | +1 | +1 | -1 |
| Social enterprise / mission-driven model | Website | +3 | +1 | +1 | -2 |

**TreeRaise example (verified):**
- "500+ organizations by 2026" → A: +5
- Client Specialist job posting (ops/client hiring) → A: +3
- Wayne Elsey posts repeatedly about scaling mission → A: +3
- Social enterprise model → A: +3
- No cost-cutting signals → D: 0
- **Result: Priority A = 14. Confirmed.**

---

## PART 3 — THE PRIORITY THREAD: HOW p0 CONNECTS TO EVERY PHASE

The Priority Profile file is the thread variable. It must be attached to every downstream prompt.

### Dependency Chain (updated pipeline)

```
Phase 1 (Research)
  └── All p1_ files produced

p0 Pre-Step (NEW — runs before Phase 3)
  └── Reads all p1_ files
  └── Produces: p0_Priority_Profile_[Client].md
  └── This file is attached to every prompt below

Phase 3 — p3a Outcome Report
  └── Attaches: p0_Priority_Profile + p1 files
  └── Reads Priority → selects correct Hero Stats, Metric Slots, narrative frame

Phase 4 — p4a Business Operations Manual
  └── Attaches: p0_Priority_Profile + all p1 files
  └── (Priority Profile informs which workflows to emphasize)

Phase 4 — p4b Business Report
  └── Attaches: p0_Priority_Profile + p4a
  └── (Frames transformation opportunities through correct Priority lens)

Phase 4 — p4c Tech Spec
  └── Attaches: p0_Priority_Profile + p4a + p4b
  └── (Prioritizes features that serve the detected Priority)

Phase 4 — p4d Portal Implementation (UPDATED)
  └── Attaches: p0_Priority_Profile + p4c
  └── Reads Priority → applies Portal KPI Mapping (see Part 4)

Phase 4 — p4e Demo Pitch Script (UPDATED)
  └── Attaches: p0_Priority_Profile + both portal HTML files + p4a
  └── Reads Priority → applies Demo Screen Routing (see Part 5)

Phase 5 — p5a Proposal
  └── Attaches: p0_Priority_Profile + p4c
  └── Reads Priority → selects correct ROI lens and framing

Phase 5 — p5b Proposal Pitch Script
  └── Attaches: p0_Priority_Profile + p5a
  └── Reads Priority → hooks, analogies, and possibility framing match Priority
```

### Rule for Every Downstream Prompt

Add this block at the top of every downstream prompt's WHAT TO READ FIRST section:

```
FIRST — Read p0_Priority_Profile_[Client].md completely before writing anything.
This file contains your Priority classification, Confidence Tier, North Star,
Hero Stats, Metric Slot labels, Hook sentence, Act 3 closing line, and Portal Emphasis.
All content you generate must reflect these directives.
Do not default to cost-savings framing. Do not default to hours-saved metrics.
Use only the metric categories specified in the Priority Profile.
```

---

## PART 4 — PORTAL KPI MAPPING (Fix for Problem 2)

### What This Solves

When p4d (portal implementation) runs, it now receives the Priority Profile.
The following table tells the developer which KPI cards to make prominent,
which data labels to use, and which panels to open by default — per Priority.

### Admin Portal KPI Mapping

| KPI Card Position | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Hero KPI 1 (top left) | Organizations in Pipeline | Deals Closed This Month | Hours Recovered This Week | Cost Eliminated This Month |
| Hero KPI 2 | Campaigns Launched / Month | Revenue Unlocked | Turnaround Time (avg) | Headcount Equivalent Saved |
| Hero KPI 3 | Capacity vs. 2026 Goal | Time-to-Close (days) | Error Rate | Monthly Savings ($) |
| Hero KPI 4 | Coach Capacity Remaining | Pipeline Value | Team Utilization | Break-Even Progress |

### Admin Portal Default Panel (on load)

| Priority | Open This Panel First |
|---|---|
| A | Organizations / Pipeline CRM view |
| B | Revenue / Deals dashboard |
| C | Operations / Task Queue |
| D | Financial / Cost Dashboard |

### Partner Portal KPI Mapping

| KPI Card | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Primary metric | Campaigns Supported | Revenue Generated | Time Saved | Fee Reduced |
| Secondary metric | Orgs Onboarded | Deals Closed | Tasks Automated | Cost per Campaign |

### Implementation Instruction for p4d

Add this section to p4d_Implementation prompt:

```
## PRIORITY EMPHASIS LAYER (read p0_Priority_Profile first)

After implementing all functional changes, apply the Priority Emphasis Layer:

1. Read the "Portal Emphasis" section of p0_Priority_Profile_[Client].md.
2. Update the hero KPI cards in admin.html to match the Priority A/B/C/D mapping table.
3. Set the default active panel (the panel that loads on page open) to match the Priority.
4. Update all KPI card labels, values, and trend lines to reflect the correct metric category.
5. Do not change the visual design system. Change only the data labels and which panel
   is marked `active` on load.

For TreeRaise (Priority A):
- KPI 1: "Organizations in Pipeline" showing 47 active + funnel view
- KPI 2: "Campaigns Launched / Month" showing current month count
- KPI 3: "Capacity vs. 2026 Goal" showing 47/500 with progress bar
- KPI 4: "Coach Capacity Remaining" showing available coaching bandwidth
- Default panel: Organizations / All Organizations (pipeline view)
```

---

## PART 5 — DEMO SCREEN ROUTING TABLE (Fix for Problem 3)

### What This Solves

p4e (Demo Pitch Script) now receives the Priority Profile.
The following table tells Abdul which screens to navigate to, in which order,
and what to say about each one — per Priority.

### Screen Routing by Priority

#### Priority A — Scalability

**Open with:** Admin Portal → Organizations panel (pipeline view)
**Navigate in order:**
1. All Organizations (show 47 orgs, pipeline stages)
2. Pending Approvals (show onboarding queue — "this is the bottleneck right now")
3. Coach Queue / Coach Task Queue (show coach capacity and alert system)
4. Growth Analytics (show acquisition chart — "this is what scale looks like with the system running")
5. Partner Portal → Campaigns (show a partner's campaign live view — "this is what one of your 500 orgs sees")

**What to call out by name:**
- "The Organizations panel — this is your pipeline to 500"
- "The Coach Task Queue — without this, coaches track everything in their head"
- "The Growth Analytics chart — your acquisition by month, visible at a glance"

**Act 3 Possibility closing line (read from Priority Profile):**
"With these systems running, the question changes. It is no longer 'can we handle more
organizations?' It is 'how fast do you want to reach [North Star goal]?' This infrastructure
is built for that target."

---

#### Priority B — Revenue

**Open with:** Admin Portal → Revenue & Fees panel
**Navigate in order:**
1. Revenue & Fees (show total revenue, per-org breakdown)
2. All Campaigns (show live campaigns by status, revenue per campaign)
3. Growth Analytics (show conversion rate, time-to-first-dollar)
4. Partner Portal → Billing (show the revenue calculator — "this is what your partner sees")
5. Partner Portal → Campaigns (show campaign launch flow — "faster launch = faster revenue")

**What to call out by name:**
- "The Revenue dashboard — every dollar, every org, in one view"
- "The Campaigns table — filtered by status so your team sees what needs attention"
- "The Revenue Calculator — your partners see this when they set their goal"

**Act 3 Possibility closing line:**
"This is the infrastructure that makes [revenue target] achievable. Every minute your team
spends on admin is a minute they are not closing the next campaign."

---

#### Priority C — Efficiency

**Open with:** Admin Portal → Coach Task Queue (operations)
**Navigate in order:**
1. Coach Task Queue (show alert tasks — "right now this is manual")
2. Communications (show automated triggers — "these replace manual follow-up")
3. Flagged Accounts (show exception-based monitoring — "staff only see what needs them")
4. Partner Portal → Home Dashboard (show the partner's live feed — "zero manual reporting")
5. Partner Portal → Setup Wizard (show the 6-step onboarding — "partner self-serves in minutes")

**What to call out by name:**
- "The Coach Task Queue — alerts replace daily manual checking"
- "8 automated communication triggers — none of these need a human"
- "The Setup Wizard — a new partner goes live without a single back-and-forth email"

**Act 3 Possibility closing line:**
"Your team did not sign up to copy-paste data between spreadsheets. This gives them back
the capacity to do the actual work. When they are doing the actual work, your clients
feel the difference."

---

#### Priority D — Cost

**Open with:** Admin Portal → Revenue & Fees panel (show cost split)
**Navigate in order:**
1. Revenue & Fees (show fee structure, current revenue, break-even context)
2. Payout Queue (show how payouts are managed — "no manual bank coordination")
3. Communications (show automated triggers — "replaces paid tools or manual labor")
4. Partner Portal → Billing (show the 50/50 split calculator — "partners understand the model instantly")
5. Partner Portal → Verification (show the KYC flow — "compliance without a compliance team")

**What to call out by name:**
- "The Payout Queue — three-state progression, no manual bank coordination"
- "8 automated triggers — each one replaces a tool subscription or a staff hour"
- "The Billing calculator — transparent, self-service, no support call needed"

**Act 3 Possibility closing line:**
"[Cost impact] per month is recoverable. But the more important number is what your team
does with the hours they get back."

---

### Updated p4e Hook Template (by Priority)

Replace the generic p4e hook instruction with this:

```
## HOOK (Act 1 — first 30 seconds)

Read the Hook sentence from p0_Priority_Profile_[Client].md exactly as written.
Then add:
"I am going to show you what we built to eliminate [that specific bottleneck]."

Do NOT:
- Open with the North Star goal
- Open with revenue numbers
- Open with a feature list
- Mention Dev8X or Abdul by name in the hook

The hook must be a single specific, verifiable, citable operational pain.
If the Priority Profile hook sentence is not present, use this fallback:
"[Company] currently manages [most visible manual process] by hand.
This platform eliminates that."
```

---

## PART 6 — TIER C EXECUTION PATH (Fix for Problem 5)

### When Tier C Applies

Confidence Score 0–3. Fewer than 3 directional signals. Generic website. No strategic content.

### Tier C Deliverable Path

**Step 1 — Generate the 24-Hour Impact Snapshot only.**
Do not generate the full Outcome Report. Do not invest in full portal customization.
Do not write the full demo script. Send the snapshot and wait for a response.

**Step 2 — If the prospect responds, book a discovery call.**
Use the structured discovery call questions (from v2 Counter-Perspective 2):
1. "What is the single biggest goal you are trying to hit this year?"
2. "What is the biggest operational headache your team deals with daily?"
3. "If we could fix one thing for you, what would make the biggest difference?"
Record their answers. Re-run p0 with this first-party data added.
Now you have Tier A or B data. Proceed with full pipeline.

**Step 3 — If no discovery call is possible, use the Tier C Generic Demo Path.**

### Tier C 24-Hour Impact Snapshot Template

```
IMPACT SNAPSHOT — [Company Name]
Prepared by Dev8X · [Date]

We scanned [Company Name]'s public operations.
Here is what we found.

─────────────────────────────────────────────────

THE BOTTLENECK:
[Single most visible manual operation — one sentence, specific, citable]

3 PROCESSES WE CAN AUTOMATE:
→ [Pain Point 1] — [Time Cost or Risk, marked Estimated]
→ [Pain Point 2] — [Time Cost or Risk, marked Estimated]
→ [Pain Point 3] — [Time Cost or Risk, marked Estimated]

WHAT THIS UNLOCKS:
[Use Tier C language: "Your team reclaims the time needed to focus on what actually grows the business."]
[Do NOT claim a specific North Star goal. Do NOT invent a vision you cannot cite.]

─────────────────────────────────────────────────

[Screenshot: most relevant admin or partner portal panel]

Want to see the full demo?
Reply to this message. I will send a 6-minute walkthrough.

Abdul | Dev8X
```

### Tier C Generic Demo Path (no custom portal for this client's industry)

If no custom portal exists:
1. Open the Admin Portal → Company Overview dashboard
2. Navigate to: All Campaigns table (most universally applicable panel)
3. Navigate to: Communications → Automated Triggers (universally impressive)
4. Navigate to: Partner Portal → Home Dashboard (live feed + KPIs)
5. Close on: Partner Portal → Impact & Trees (visual proof of verified outcomes)

This path works for any client type because it shows:
- A management view (admin)
- Automation in action (triggers)
- An end-user experience (partner dashboard)
- Proof of impact (impact registry)

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

## PART 7 — SOLUTION CARD METRIC MAPPING (Fix for Problem 6)

### What This Replaces

The hardcoded three metric slots in p3a solution cards:
- ~~Time Saved~~
- ~~Cost Impact~~
- ~~Effort Reduction~~

These are Priority D slots. They are wrong for Priority A, B, and C clients.

### Metric Slots by Priority

#### Priority A — Scalability

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Capacity Unlocked | How many orgs/clients/campaigns can this system handle at the stated volume target? State as a multiple or absolute number. |
| Slot 2 | Volume Handled | How many transactions, campaigns, or onboarding events per month does this solution support without adding headcount? |
| Slot 3 | Orgs Supportable at Scale | At the North Star goal volume, how does this solution prevent the bottleneck it is replacing? Express as "X orgs without adding Y coaches." |

**Example for TreeRaise CRM card:**
- Slot 1: "500-org pipeline — visible and trackable with zero additional coaches"
- Slot 2: "Every new sign-up captured automatically — no leads fall through"
- Slot 3: "One dashboard replaces memory + email + spreadsheets for the entire coaching team"

---

#### Priority B — Revenue

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Revenue Unlocked / Month | Estimated: conversion rate lift × average deal value × current monthly traffic/leads |
| Slot 2 | Deals Closed / Month (increase) | Estimated: time recovered from manual work ÷ average time-to-close × close rate |
| Slot 3 | Time-to-Close Reduction | Estimated: steps removed from sales process × average time per step |

---

#### Priority C — Efficiency

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration, per role. Show calculation. Label Estimated if not from source data. |
| Slot 2 | Turnaround Time Reduction | Before: manual process duration. After: automated process duration. Express as % or hours. |
| Slot 3 | Error Rate Eliminated | Manual error frequency × downstream cost of error correction. Express as incidents/month eliminated. |

---

#### Priority D — Cost

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration. Label Estimated if not from source data. |
| Slot 2 | Cost Impact / Month | Hours saved × blended role rate ($35/hr default, adjust to region if known). |
| Slot 3 | Effort Reduction % | Manual steps before ÷ manual steps after. Express as percentage. |

---

### How to Apply in p3a

Replace the metric-row template in p3a with this instruction:

```
## SOLUTION CARD METRIC SLOTS

Read the "Solution Card Metric Slots" section of p0_Priority_Profile_[Client].md.
Use those three slot labels exactly as written.
Do NOT use "Time Saved / Cost Impact / Effort Reduction" unless Priority D is confirmed.

For each solution card:
- Slot 1: [label from Priority Profile] — [calculated value] — [Estimated or From source]
- Slot 2: [label from Priority Profile] — [calculated value] — [Estimated or From source]
- Slot 3: [label from Priority Profile] — [calculated value] — [Estimated or From source]

Show the calculation basis under each metric as a small note.
Always label estimates clearly.
```

---

## PART 8 — UPDATED HERO STATS BLOCK

### Replaces Part 5.3 of v3

The Hero Stats in the Outcome Report must match the Priority.
Read from the Priority Profile. Do not compute independently.

| Priority | Stat 1 | Stat 2 | Stat 3 |
|---|---|---|---|
| A (Scale) | Capacity goal supportable (e.g., "500 orgs") | Volume multiplier (e.g., "10x campaigns") | Manual workflows blocking the goal |
| B (Revenue) | Revenue unlocked / month | Deals closed / month increase | Time-to-close reduction |
| C (Efficiency) | Hours saved / week | Turnaround time reduction | Error rate eliminated |
| D (Cost) | Hours saved / week | Cost impact ($/month) | Workflows automated |

### TreeRaise Correct Hero Stats (Priority A, Tier A)

- Stat 1: "500 — Organizations your 2026 goal demands this infrastructure must support"
- Stat 2: "10x — Campaign management capacity without adding coaching headcount"
- Stat 3: "6 — Manual workflows currently blocking that growth path"

### TreeRaise Incorrect Hero Stats (what v3 actually produced — Priority D framing)

- ~~Stat 1: "37 hrs/week saved"~~
- ~~Stat 2: "$10,630/month impact"~~
- ~~Stat 3: "6 workflows eliminated"~~

The numbers may overlap. The *framing* is what was wrong.

---

## PART 9 — UPDATED PROPOSAL ROI FRAMEWORK

### Three-Lens ROI (from v3, preserved — but lens selection is now Priority-guided)

The proposal must present three parallel ROI scenarios. The order of the lenses
changes based on Priority. Lead with the Priority's native lens.

#### Priority A — Lead with Capacity Lens

**Lens 1 (Lead) — Capacity ROI:**
"With manual bottlenecks removed, the team can support [X]x the current volume without
adding proportional headcount. At current average revenue per client, [X]x capacity
= [estimated revenue potential]."

**Lens 2 — Strategic ROI:**
"The platform directly enables [North Star goal]. Without this infrastructure,
reaching [goal] would require [N] additional hires at [estimated cost/yr].
The platform replaces that hiring requirement."

**Lens 3 — Efficiency ROI:**
"These [N] automations recover [X] hours per week. At a blended rate of [$/hr],
that is [$/month] recovered. Break-even: [N] months."

#### Priority B — Lead with Revenue Lens

**Lens 1 (Lead) — Revenue ROI:**
"With pipeline automation running, your team can close [X]% more campaigns per month.
At current average deal value, that is [$/month] in additional revenue potential."

**Lens 2 — Capacity ROI:** (as above)

**Lens 3 — Efficiency ROI:** (as above)

#### Priority C — Lead with Efficiency Lens

**Lens 1 (Lead) — Efficiency ROI:** (hours + cost)

**Lens 2 — Capacity ROI:** (what the recovered time enables)

**Lens 3 — Strategic ROI:** (Tier A/B only — skip for Tier C)

#### Priority D — Lead with Cost Lens

**Lens 1 (Lead) — Cost ROI:** (hours saved × rate = $/month, break-even months)

**Lens 2 — Capacity ROI:** (what the savings fund next)

**Lens 3 — Strategic ROI:** (skip unless Tier A/B signals exist)

---

## PART 10 — ONE-PAGE DECISION TREE (updated from v3)

```
START
  │
  ▼
STEP 0: Run p0_Priority_Detection.md on all Phase 1 files
  │     Save output as p0_Priority_Profile_[Client].md
  │     Attach this file to every downstream prompt
  │
  ▼
STEP 1: Read Priority Score from p0 output
  │
  ├─── Priority A (highest score)?
  │         │
  │         ▼
  │    Confidence Tier A → Full vision-anchored narrative
  │    Confidence Tier B → Trajectory-based narrative
  │    Confidence Tier C → 24-Hour Snapshot only → Discovery call → Re-run p0
  │
  ├─── Priority B (highest score)?
  │         │
  │         ▼
  │    Tier A → Revenue target narrative
  │    Tier B → Pipeline capacity narrative
  │    Tier C → Throughput improvement (no vision claim)
  │
  ├─── Priority C (highest score)?
  │         │
  │         ▼
  │    Tier A → Stated quality/speed goal narrative
  │    Tier B → Team capacity narrative
  │    Tier C → Hours saved + role elevation (no vision claim)
  │
  └─── Priority D, OR all scores low?
            │
            ▼
       Balanced Three-Lens ROI
       Show Cost + Capacity + Strategic across three columns
       Let the CEO pick their lens

IF scores tied between two priorities:
  Lead with higher-scored Priority in hero section.
  Show both priority metrics side-by-side in solution cards.

IF data insufficient for any scoring (Tier C + low signals):
  Generate 24-Hour Impact Snapshot ONLY.
  Do not generate full Outcome Report.
  Book discovery call first. Re-run p0 with first-party data.
```

---

## PART 11 — IMPLEMENTATION CHECKLIST (updated from v3)

Use this checklist in order. Do not skip steps.

```
PRE-DELIVERABLE (required before writing anything)
□ Run p0_Priority_Detection.md on all Phase 1 files
□ Save output as p0_Priority_Profile_[Client].md
□ Verify Priority Score is recorded for all four priorities
□ Verify winning Priority is confirmed (A / B / C / D)
□ Verify Confidence Tier is recorded (A / B / C)
□ Verify North Star quote is present (or marked "Not found" for Tier B/C)
□ Verify Hook sentence is written (ready to read aloud)
□ Verify Hero Stats are computed (three stats matching the Priority)
□ Verify Solution Card Metric Slot labels are set (not defaulting to cost/hours)
□ Verify Portal Emphasis panel and KPI cards are specified
□ Verify Act 3 Possibility sentence is written (ready to read aloud)

WITHIN 24 HOURS (Tier C only — or any client before full Phase 4 investment)
□ Generate 24-Hour Impact Snapshot from p0 output (Step 1 data only)
□ Send snapshot, await response before investing further

AFTER PROSPECT RESPONDS (confirmed interest — all tiers)
□ Attach p0_Priority_Profile to p3a prompt
□ Generate Outcome Report with correct Hero Stats (not cost/hours defaults)
□ Verify hero stats match Priority (use PART 8 table to check)
□ Verify Section 4 (Strategic Unlock) uses correct Priority + Tier language
□ Attach p0_Priority_Profile to p4d prompt
□ Verify portal KPI cards reflect Priority Emphasis Layer (PART 4 table)
□ Verify default panel on load matches Priority
□ Attach p0_Priority_Profile to p4e prompt
□ Verify demo script hook uses the Priority Profile hook sentence
□ Verify screen navigation follows Priority screen routing (PART 5 table)
□ Verify Act 3 closing uses the Priority Profile Act 3 sentence
□ Attach p0_Priority_Profile to p5a prompt
□ Verify proposal ROI leads with the correct Priority lens (PART 9)

QUALITY CHECKS (before sending anything to prospect)
□ Can Abdul defend every claim with a source on a live call? (Simplicity test)
□ Does the report hold together if the CEO has quietly changed their goal? (Buyer Psychology test)
□ Does a Tier C version of this report still stand on its own? (Consistency test)
□ Is the demo portal doing 80% of the selling? (Product-Led test)
□ Does the hook open with pain, not vision? (Narrative Arc test)
□ Are all estimates clearly labeled [Estimated]? (Defensibility test)
□ Are all source citations present for quoted claims? (Credibility test)
```

---

## PART 12 — TREERAISE COMPLETE WORKED EXAMPLE (v4 correction)

### p0 Output (what should have been generated before Phase 3)

```
Priority: A — Scalability / Growth Execution
Confidence Tier: A — Direct Quote
Confidence Score: 9/10
North Star: "2026 organizations engaged goal: 500+" [Source: p1a_Website.md, Press Kit page]

Hero Stats:
- Stat 1: "500 — Organizations your 2026 goal demands this infrastructure must support"
- Stat 2: "10x — Campaign management capacity without adding coaching headcount"
- Stat 3: "6 — Manual workflows currently blocking that growth path"

Solution Card Metric Slots:
- Slot 1: Capacity Unlocked
- Slot 2: Volume Handled
- Slot 3: Orgs Supportable at Scale

Hook sentence:
"Right now, your TreeRaiser Coaches have no pipeline visibility. Every new sign-up
is tracked by memory and email. When a school principal visits treeraise.com and
clicks 'Begin Your Impact', there is no system to ensure follow-up within 48 hours,
no automated nurture if they do not respond, and no way for leadership to see how
many leads are in the funnel at any given moment. That is the bottleneck between
where TreeRaise is today and 500 organizations by end of 2026."

Act 3 Possibility sentence:
"With the CRM running, the email sequences live, and the impact reports automated,
the operational question changes. It is no longer 'can we handle more organizations?'
It is 'how fast do you want to go?' This infrastructure was built for 500 partners.
It was also built for 1,000. The ceiling is no longer your system."

Portal Emphasis:
- Primary panel on load: Admin Portal → All Organizations (pipeline view)
- KPI Cards: Organizations in Pipeline / Campaigns Launched / Capacity vs. 500-org Goal / Coach Capacity
- Demo screen order: All Organizations → Pending Approvals → Coach Task Queue → Growth Analytics → Partner Home
```

### Outcome Report Correction

**Was generated (Priority D framing — wrong):**
- Hero Stat 1: "37 hrs/week saved"
- Hero Stat 2: "$10,630/month impact"
- CRM card Slot 2: "$960/mo cost impact"

**Should have been generated (Priority A framing — correct):**
- Hero Stat 1: "500 — Organizations your 2026 goal demands this infrastructure must support"
- Hero Stat 2: "10x — Campaign management capacity without adding coaching headcount"
- CRM card Slot 2: "500-org pipeline visible and trackable with zero additional coaches"

---

## PART 13 — WHAT WAS ABSORBED FROM EVERY SOURCE

| Source | Core Insight Absorbed | Where It Appears in v4 |
|---|---|---|
| Priority Mode (v1) | Dynamic priority detection per client | Part 1, Part 2 (p0 Pre-Step) |
| Balanced Value Matrix | Multi-lens ROI for every stakeholder | Part 9 (Three-Lens ROI) |
| Role-Based Perspective | Human impact mapping per pain point | Part 5 (what to call out in demo) |
| Counter 1 — Simplicity | Defensible claims only | Part 11 Quality Checks |
| Counter 2 — Data Poverty | Discovery call for Tier C | Part 6 (Tier C Path) |
| Counter 3 — Buyer Psychology | Pain → Proof → Possibility arc | Part 5 (screen routing structure) |
| Counter 4 — Consistency | Fixed structure per phase | Part 11 Checklist |
| Counter 5 — Speed | 24-Hour Impact Snapshot | Part 6 (Tier C template) |
| Counter 6 — Product-Led | Demo portal carries the pitch | Part 4 (Portal KPI Mapping) |
| v3 original | Priority Detection Algorithm, Confidence Tiers, Decision Tree | Parts 1, 2, 10 |
| **v4 new (Problem 1)** | p0 as structured output, not reading instruction | **Part 2** |
| **v4 new (Problem 2)** | Portal KPI Mapping table | **Part 4** |
| **v4 new (Problem 3)** | Demo Screen Routing Table | **Part 5** |
| **v4 new (Problem 4)** | Priority Thread Variable / dependency chain | **Part 3** |
| **v4 new (Problem 5)** | Tier C Execution Path with concrete templates | **Part 6** |
| **v4 new (Problem 6)** | Solution Card Metric Mapping by Priority | **Part 7** |

---

## APPENDIX — PRIORITY QUICK-REFERENCE CARD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PRIORITY DETECTION QUICK CARD                                              │
├──────────────┬────────────────────────┬─────────────────────────────────────┤
│  PRIORITY    │  KEY SIGNAL            │  HERO METRIC SLOTS                  │
├──────────────┼────────────────────────┼─────────────────────────────────────┤
│  A — Scale   │  Growth targets,       │  Capacity Unlocked                  │
│              │  "10x", "500 orgs"     │  Volume Handled                     │
│              │  social enterprise     │  Orgs Supportable at Scale          │
├──────────────┼────────────────────────┼─────────────────────────────────────┤
│  B — Revenue │  Sales hiring, CRM,    │  Revenue Unlocked / Month           │
│              │  revenue targets       │  Deals Closed / Month (increase)    │
│              │  outbound signals      │  Time-to-Close Reduction            │
├──────────────┼────────────────────────┼─────────────────────────────────────┤
│  C — Ops     │  "Burnout", "manual"   │  Hours Saved / Week                 │
│              │  quality complaints    │  Turnaround Time Reduction          │
│              │  process bottlenecks   │  Error Rate Eliminated              │
├──────────────┼────────────────────────┼─────────────────────────────────────┤
│  D — Cost    │  CFO-led, lean team    │  Hours Saved / Week                 │
│              │  cost-cutting lang.    │  Cost Impact ($/Month)              │
│              │  layoff signals        │  Effort Reduction (%)               │
└──────────────┴────────────────────────┴─────────────────────────────────────┘

CONFIDENCE TIER QUICK CARD
  Tier A: Direct quote found → use it verbatim, cite source
  Tier B: 3+ consistent signals → frame as trajectory, not claim
  Tier C: <3 signals → 24-Hour Snapshot only → discovery call → re-run p0

NARRATIVE ARC (all priorities, unchanged from v3)
  Hook:         Specific operational pain (verifiable, citable)
  Demo:         Portal screens tied to pain points, Priority Screen Routing applied
  Possibility:  Vision introduced last — earned through proof

p0 THREAD VARIABLE RULE
  p0 output file must be attached to: p3a, p4d, p4e, p5a, p5b
  Every prompt reads Priority Profile before generating content
  No prompt defaults to cost/hours metrics without Priority D confirmed

PORTAL DEFAULT PANEL ON LOAD
  Priority A → Organizations / Pipeline view
  Priority B → Revenue & Fees
  Priority C → Coach Task Queue / Operations
  Priority D → Financial Dashboard

SOLUTION CARD CHECK (before finalizing any Outcome Report)
  Ask: are these metric slot labels from the Priority Profile?
  If the labels say "Time Saved / Cost Impact / Effort Reduction" → STOP
  Those are Priority D defaults. Re-read the Priority Profile and apply correct labels.
```