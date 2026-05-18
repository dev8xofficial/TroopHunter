# Vision-Led Balanced Matrix v3 (Updated): The Definitive Framework

> **Version history:** v1 = original Priority Mode anchor. v2 = absorbed 6 counter-perspectives.
> v3 = adds Priority Detection Algorithm, North Star Scoring, TreeRaise worked examples,
> Decision Tree, and revised prompt instructions across all phases.
> v3-updated = integrates all v4 structural fixes directly into the sections where the
> problems existed in v3: p0 Pre-Step, Priority Thread Variable, Portal KPI Mapping,
> Demo Screen Routing, Tier C Execution Path, and Solution Card Metric Mapping.

---

## PART 0 — WHY THIS FILE EXISTS

Every previous version of the Dev8X pipeline made one fatal assumption: that the
value proposition is the same for every client.

It is not.

The TreeRaise discovery made this undeniable. While preparing their Outcome Report,
it became clear that leading with cost savings — the pipeline's default — was the
wrong pitch for a company whose stated public goal is **500 organizations by 2026**.
Their bottleneck is not money. It is operational capacity. Their primary driver is
scalability and growth execution. Pitching $2,000/month in savings to a founder
chasing a 10x growth target is not just weak — it is a signal that you did not do
your homework.

This framework solves that problem permanently. It introduces a **Priority Detection
Algorithm** that runs before any deliverable is written, identifies the client's
primary strategic driver from observable data, and threads that specific narrative
through every phase of the pipeline.

---

## PART 1 — PROBLEMS FIXED FROM v2

The following weaknesses in v2 are addressed in this version:

| v2 Problem | Where Fixed in v3 |
|---|---|
| Priority detection was vague — no scoring system | Part 2: Priority Detection Algorithm with signal weights |
| Confidence Tiers lacked decision rules | Part 3: North Star Scoring with explicit thresholds |
| 3-step data engine had no worked example | Part 4: TreeRaise worked example throughout |
| Impact Snapshot had no template | Part 5: Impact Snapshot template with fill-in structure |
| Demo act structure was described, not scripted | Part 6: Act-by-act script instructions per priority |
| No single decision tree for the operator | Part 7: One-page Decision Tree |
| Prompt changes were implied, not specified | Part 8: Exact prompt modification instructions |

---

## PART 2 — THE PRIORITY DETECTION ALGORITHM

> **⚠ STRUCTURAL FIX (from v4 Problem 1):** In the original v3, Priority Detection was
> a *reading instruction* embedded inside p3a_Outcome_Report.md. It produced no file, fed
> no downstream prompt, and changed nothing architecturally — even when it correctly
> identified the Priority, the Outcome Report still defaulted to a Priority D (cost-savings)
> template frame. The fix: Priority Detection is now a **mandatory pre-step** (`p0`) that
> runs before Phase 3 begins and produces a structured output file. Every downstream prompt
> attaches this file. See Part 2A below for the p0 Pre-Step specification.

Before writing a single word of any deliverable, the AI must classify the prospect
into exactly one of four primary strategic buckets. This classification drives every
narrative decision downstream.

### Part 2A — The p0 Pre-Step: Priority Detection as a Structured Output

**What p0 Is**

A mandatory prompt that runs BEFORE Phase 3 begins. It reads all Phase 1 context files
and produces a single structured Markdown file. This file is the "thread variable"
(see Part 2B) passed to every downstream phase.

**When to Run p0**

Run p0 after Phase 1 is complete and before p3a (Outcome Report) is generated.
p0 runs once per client. Its output is reused across all phases.

**p0 Input Files**

| File | Role |
|------|------|
| p1a_Website.md | Primary signal source |
| p1b_Linkedin_Company.md | Company framing and post themes |
| p1c_Linkedin_Owner.md | Founder goals and language |
| p1e_Job_Posting.md | Operational reality signals |
| Any p1d_ files | Supporting context |

**p0 Output File Structure**

Save output as: `context/p0_Priority_Profile_[ClientName].md`

```markdown
---
client: [Client Name]
generated: [Date]
version: p0_v3updated
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

**Rule for Every Downstream Prompt**

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

### Part 2B — The Priority Thread: How p0 Connects to Every Phase

> **⚠ STRUCTURAL FIX (from v4 Problem 4):** In v3, the Priority Profile was generated during
> p3a but was never formally passed to p4d (portal implementation) or other phases. Portals were
> built from the Tech Spec alone with no Priority signal. The fix: the Priority Profile file
> becomes the **thread variable** explicitly attached to every downstream prompt.

The Priority Profile file must be attached to every downstream prompt.

**Dependency Chain**

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

Phase 4 — p4d Portal Implementation (UPDATED — see Part 2C)
  └── Attaches: p0_Priority_Profile + p4c
  └── Reads Priority → applies Portal KPI Mapping

Phase 4 — p4e Demo Pitch Script (UPDATED — see Part 2D)
  └── Attaches: p0_Priority_Profile + both portal HTML files + p4a
  └── Reads Priority → applies Demo Screen Routing

Phase 5 — p5a Proposal
  └── Attaches: p0_Priority_Profile + p4c
  └── Reads Priority → selects correct ROI lens and framing

Phase 5 — p5b Proposal Pitch Script
  └── Attaches: p0_Priority_Profile + p5a
  └── Reads Priority → hooks, analogies, and possibility framing match Priority
```

---

### Part 2C — Portal KPI Mapping

> **⚠ STRUCTURAL FIX (from v4 Problem 2):** In v3, the demo portal was disconnected from the
> Priority. admin.html and partner-portal.html were fixed HTML files — KPI cards always showed
> the same numbers, and the same screens were shown regardless of Priority A, B, C, or D.
> For TreeRaise (Priority A — Scalability), the admin dashboard still led with revenue and
> fee numbers instead of org pipeline volume and campaign capacity. The fix: the Portal KPI
> Mapping table below tells p4d which KPI cards, labels, and default panel to use per Priority.

When p4d (portal implementation) runs, it receives the Priority Profile.
The following table defines which KPI cards to make prominent, which data labels to use,
and which panels to open by default — per Priority.

**Admin Portal KPI Mapping**

| KPI Card Position | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Hero KPI 1 (top left) | Organizations in Pipeline | Deals Closed This Month | Hours Recovered This Week | Cost Eliminated This Month |
| Hero KPI 2 | Campaigns Launched / Month | Revenue Unlocked | Turnaround Time (avg) | Headcount Equivalent Saved |
| Hero KPI 3 | Capacity vs. 2026 Goal | Time-to-Close (days) | Error Rate | Monthly Savings ($) |
| Hero KPI 4 | Coach Capacity Remaining | Pipeline Value | Team Utilization | Break-Even Progress |

**Admin Portal Default Panel (on load)**

| Priority | Open This Panel First |
|---|---|
| A | Organizations / Pipeline CRM view |
| B | Revenue / Deals dashboard |
| C | Operations / Task Queue |
| D | Financial / Cost Dashboard |

**Partner Portal KPI Mapping**

| KPI Card | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|
| Primary metric | Campaigns Supported | Revenue Generated | Time Saved | Fee Reduced |
| Secondary metric | Orgs Onboarded | Deals Closed | Tasks Automated | Cost per Campaign |

**Implementation Instruction for p4d**

Add this section to the p4d implementation prompt:

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

### Part 2D — Demo Screen Routing Table

> **⚠ STRUCTURAL FIX (from v4 Problem 3):** In v3, p4e_Demo_Pitch.md instructed the AI to map
> screens to pain points but gave no instruction about *which* screens to prioritize based on
> Priority. A Priority A client and a Priority D client received scripts emphasizing the same
> screens in the same order. The fix: the Demo Screen Routing Table below specifies for each
> Priority which portal to open first, which panels to navigate to in order, which KPIs to call
> out by name, and what the Act 3 closing line must reference.

p4e (Demo Pitch Script) receives the Priority Profile.
The following table tells Abdul which screens to navigate to, in which order,
and what to say about each one — per Priority.

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

**Updated p4e Hook Template (by Priority)**

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

### The Four Priorities (Signal Weighting)

Every prospect is classified into exactly one primary bucket.

**Priority A — Scalability / Growth Execution**
The client has a specific volume or market expansion goal and their current systems
cannot support that scale without breaking.

Signals: explicit numerical targets ("500 orgs", "10x revenue"), rapid hiring,
multi-market expansion language, new geography launches, franchise or network model,
waitlists or backlog mentioned.

Demo framing: "Your current operations handle X. This infrastructure handles 10X."
Metric set: Capacity Unlocked, Volume Handled, Processing Velocity, Orgs Onboarded/Mo.

**Priority B — Revenue Growth / Deal Velocity**
The client wants to close more deals, faster, or unlock new revenue streams.

Signals: sales team hiring, CRM references, "we need more clients" language, revenue
growth targets in founder posts, outbound expansion language.

Demo framing: "This platform lets your team close 30% more campaigns without adding headcount."
Metric set: Deals Closed/Mo, Time-to-Close Reduction, Revenue Unlocked/Mo.

**Priority C — Operational Efficiency / Productivity**
The client wants to ship faster, deliver better service, and eliminate friction.

Signals: burnout language in job postings, "we're drowning in admin" posts, quality
complaints in reviews, turnaround time mentioned as a client complaint.

Demo framing: "Your team can deliver in the same day instead of next week."
Metric set: Hours Saved/Week, Turnaround Time Reduction, Error Rate Eliminated, Tasks Automated.

**Priority D — Cost Reduction (Original Pipeline Default)**
The client's primary driver is reducing operational spend, headcount, or tooling costs.

Signals: layoff mentions, cost-cutting language, "lean team" framing, CFO as primary
stakeholder.

Demo framing: "This eliminates $X/month in operational waste."
Metric set: Hours Saved, Cost Impact ($), Effort Reduction (%).

> **Rule:** Priority D is the fallback only. It is never the first choice unless
> cost signals clearly dominate the evidence. Most early-stage social enterprises
> (like TreeRaise) are Priority A. Most established SMBs are Priority C.

---

### Signal Weighting Table

When scanning Phase 1 files, assign weight points to each signal found.
The Priority with the highest total score wins.

| Signal Type | Source | Priority A | Priority B | Priority C | Priority D |
|---|---|---|---|---|---|
| Explicit numerical growth target | LinkedIn post / website | **+5** | +2 | 0 | 0 |
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

**Scoring example — TreeRaise:**
- "500 organizations by 2026" — explicit numerical growth target → A: +5
- Client Specialist job posting — ops/client hiring → A: +3
- Wayne Elsey posts repeatedly about scaling mission → A: +3
- Social enterprise model → A: +3
- No cost-cutting signals found → D: 0

**TreeRaise Priority Score: A = 14. Confirmed: Priority A — Scalability.**

---

## PART 3 — NORTH STAR SCORING (Confidence Tiers)

After identifying the Priority, score the confidence of the North Star on a 3-tier system.

### Tier A — Direct Quote (Score: 8–10)
A specific, attributed, quantified statement found in the source data.

Examples:
- "Our 2026 organizations engaged goal: 500+" [Source: p1a_Website, Press Kit page]
- "2026 trees planted goal: 125,000+" [Source: p1a_Website]

Action: Use the exact quote as the anchor in the Outcome Report hero section.
Flag the source explicitly. Full vision-anchored narrative is activated.

### Tier B — Strong Inference (Score: 4–7)
No explicit quote, but 3 or more consistent directional signals point to the same ambition.

Action: Frame as "Based on your current trajectory..." not "You said...".
Use conditional language. Do not invent a number. Tier B narrative activated.

### Tier C — Insufficient Data (Score: 0–3)
Fewer than 3 directional signals. Website is generic. No strategic content found.

Action: Skip vision framing entirely. Use pure Pain → Fix → Unlock structure.
Do not guess. Do not hallucinate a goal.

> **⚠ STRUCTURAL FIX (from v4 Problem 5):** In v3, Tier C graceful degradation was described
> but never operationalized — no alternative template, no alternative portal guidance, and no
> alternative script structure. See Part 3A below for the complete Tier C Execution Path.

### Part 3A — Tier C Execution Path

**When Tier C Applies**

Confidence Score 0–3. Fewer than 3 directional signals. Generic website. No strategic content.

**Tier C Deliverable Path**

**Step 1 — Generate the 24-Hour Impact Snapshot only.**
Do not generate the full Outcome Report. Do not invest in full portal customization.
Do not write the full demo script. Send the snapshot and wait for a response.

**Step 2 — If the prospect responds, book a discovery call.**
Use the structured discovery call questions:
1. "What is the single biggest goal you are trying to hit this year?"
2. "What is the biggest operational headache your team deals with daily?"
3. "If we could fix one thing for you, what would make the biggest difference?"
Record their answers. Re-run p0 with this first-party data added.
Now you have Tier A or B data. Proceed with full pipeline.

**Step 3 — If no discovery call is possible, use the Tier C Generic Demo Path.**

**Tier C 24-Hour Impact Snapshot Template**

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
[Use Tier C language: "Your team reclaims the time needed to focus on what
actually grows the business."]
[Do NOT claim a specific North Star goal. Do NOT invent a vision you cannot cite.]

─────────────────────────────────────────────────

[Screenshot: most relevant admin or partner portal panel]

Want to see the full demo?
Reply to this message. I will send a 6-minute walkthrough.

Abdul | Dev8X
```

**Tier C Generic Demo Path (no custom portal for this client's industry)**

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

**Tier C Hook (pre-written, no North Star required)**

```
Right now, your team is managing [most visible process] manually.
Every hour spent on [specific task] is an hour not spent on [their actual job].
This platform automates [that process] so your team can focus on [the real work].
```

**Tier C Act 3 Closing (pre-written)**

```
With these bottlenecks removed, your team reclaims [X hours per week].
Here is what that time is worth. And here is what becomes possible when your
people are doing what they were actually hired to do.
The next step is yours.
```

### North Star Conflict Resolution

When signals conflict, apply the **Hierarchy of Evidence**:

1. Job Postings (most current, operational reality)
2. Operational Documents / Operations Manual
3. CEO LinkedIn Posts (stated intent)
4. Company LinkedIn Posts (marketing intent)
5. Website "About Us" / Mission Pages
6. Marketing Taglines (least reliable — aspirational, not operational)

The source higher on this list wins the conflict.

---

## PART 4 — THE 3-STEP DATA ENGINE

The engine runs once per prospect, before any deliverable is generated.

### Step 1 — Manual Pain Extraction (Always Run)

Scan all Phase 1 files. Extract every observable manual operation.

**Rules:**
- Every pain point must cite its source file and the specific text that supports it.
- Minimum 3, maximum 7 pain points.
- Tag each with: Time Cost (hrs/wk) and Risk Factor (Low/Medium/High).
- No invented statistics. Use qualitative language if no number is supportable.
- Map each pain point to the human role doing it.

**TreeRaise Step 1 Output (example):**
| # | Pain Point | Source | Time Cost | Risk | Human Role |
|---|---|---|---|---|---|
| 1 | No CRM — coaches manually track every new signup in their head | p1e_Job_Posting, p4d_partner-portal.html | ~6 hrs/wk | High | TreeRaiser Coach |
| 2 | Zero email automation — no nurture for warm leads, no renewal trigger | p1b_Linkedin_Company, p1a_Website | ~8 hrs/wk | High | TreeRaiser Coach |
| 3 | Coach follow-up after every signup is 100% manual | p1e_Job_Posting | ~4 hrs/wk | High | TreeRaiser Coach |
| 4 | Impact reports may be manually assembled by one person (Victor Junco) | p1a_Website (team page) | ~6 hrs/mo | High | Sustainability Specialist |
| 5 | No outbound prospecting system — growth is 100% inbound only | p1a_Website, p1c_Linkedin_Owner | N/A (revenue risk) | High | Founder / BDR |

### Step 2 — Ambition Detection (Run After Priority Scoring)

Apply the Confidence Tier system from Part 3.

For TreeRaise:
- Tier A confirmed: "2026 organizations engaged goal: 500+" directly from website Press Kit
- North Star: Reach 500 partner organizations by end of 2026
- Confidence Score: 9/10

### Step 3 — Human Impact Mapping

For each pain point from Step 1, map to the three human layers:

**Layer 1 — The Executive (Buyer):**
What does this pain prevent them from doing strategically?

**Layer 2 — The Operator (Daily User):**
What is this person's Tuesday like because of this pain?

**Layer 3 — The End-Client:**
What does this person experience because of the pain?

---

## PART 5 — FIXED DELIVERABLE STRUCTURE (Guaranteed Quality Floor)

The structure of every deliverable is locked. What adapts dynamically is the
content *within* each section, based on Priority (A/B/C/D) and Confidence Tier.

### 5.1 — The 24-Hour Impact Snapshot

**Purpose:** Sent within 24 hours of a lead expressing interest. Generated from
Step 1 data only. No vision analysis required.

**Template:**

```
IMPACT SNAPSHOT — [Company Name]
Prepared by Dev8X · [Date]

We analyzed [Company Name]'s public operations.
Here is what we found.

─────────────────────────────────────────────

THE BOTTLENECK:
[Single most painful manual operation from Step 1 — one sentence, specific]

3 THINGS WE CAN ELIMINATE:
→ [Pain Point 1] — [Time Cost or Risk]
→ [Pain Point 2] — [Time Cost or Risk]
→ [Pain Point 3] — [Time Cost or Risk]

WHAT THIS UNLOCKS:
[Priority A: "The operational capacity to scale to [North Star goal]"]
[Priority B: "The bandwidth to close [X]% more campaigns per month"]
[Priority C: "Your team's time back for the work that actually grows the business"]
[Priority D: "$[X]/month in recoverable operational cost"]

─────────────────────────────────────────────

[SCREENSHOT: Most impressive screen from the admin or partner portal]

Want to see the full demo?
→ Reply to this message. I'll send a 6-minute walkthrough.

Abdul | Dev8X
[email] | [LinkedIn]
```

**Generation rule:** This is the ONLY deliverable generated before prospect engagement
is confirmed.

---

### 5.2 — The Outcome Report (p3a) — Fixed 5-Section Architecture

Every Outcome Report follows this exact section order, every time:

**Section 1 — Operational Snapshot**
Always achievable. Never skipped.

**Section 2 — The Friction Map**
3–7 manual bottlenecks with time costs and human impact from Step 1.
Always achievable. Never skipped.

**Section 3 — The Transformation Preview**
For each friction point: before/after using the actual demo portal screens.
Always achievable. Never skipped.

**Section 4 — The Strategic Unlock**
What becomes possible when friction is removed.
**THIS SECTION ADAPTS BY PRIORITY AND TIER:**

| Priority | Tier A | Tier B | Tier C |
|---|---|---|---|
| A (Scale) | "This infrastructure directly supports your stated goal of [quote]. Here is how each automation maps to that target." | "With these bottlenecks removed, your team gains the capacity to handle 3–5x more volume." | "With these bottlenecks removed, your team can scale operations without adding headcount." |
| B (Revenue) | "This directly enables your stated revenue target of [quote]. Here is how." | "With these fixes in place, your pipeline can close [X]% more campaigns per month." | "With this in place, your team reclaims the time needed to grow revenue without adding staff." |
| C (Efficiency) | "Your stated goal of [quote] requires your team to operate at full capacity." | "Removing these bottlenecks frees your team to focus on what they were hired to do." | "Your team reclaims [X] hours per week. Here is what that time is worth." |
| D (Cost) | "Beyond the cost savings, this infrastructure positions you for [quote]." | "The cost savings fund the next phase of growth." | "$[X]/month recovered. Break-even in [N] months." |

**Section 5 — Investment Framework**
Pricing and timeline reference. Always achievable. Never skipped.

---

### 5.3 — Hero Stats Block

> **⚠ STRUCTURAL FIX (from v4 Problem 6):** In v3, the Outcome Report solution card template
> hardcoded three metric slots — Time Saved / Cost Impact / Effort Reduction — which are
> Priority D metrics. For a Priority A client like TreeRaise, the hero stats defaulted to
> "37 hrs/week saved" and "$10,630/month impact" instead of capacity-framed metrics. The numbers
> may have overlapped but the *column headers* were wrong. The fix: the Hero Stats Block and
> Solution Card Metric Mapping below replace the hardcoded three-slot template entirely.

The three headline numbers in the hero section must match the Priority:

| Priority | Stat 1 | Stat 2 | Stat 3 |
|---|---|---|---|
| A (Scale) | Capacity Unlocked (e.g., "500 orgs supported") | Processing Velocity (e.g., "10x campaign volume") | Manual Workflows Eliminated |
| B (Revenue) | Revenue Unlocked/Mo | Deals Closed/Mo (increase) | Time-to-Close Reduction |
| C (Efficiency) | Hours Saved/Week | Turnaround Time Reduction | Error Rate Eliminated |
| D (Cost) | Hours Saved/Week | Cost Impact ($/mo) | Workflows Automated |

**TreeRaise hero stats (Priority A, Tier A) — CORRECT:**
- "500 — Organizations your 2026 goal demands your infrastructure must support"
- "10x — Campaign management capacity without adding coaching headcount"
- "6 — Manual workflows currently blocking that growth path"

**TreeRaise hero stats — INCORRECT (original v3 Priority D defaults):**
- ~~"37 hrs/week saved"~~
- ~~"$10,630/month impact"~~
- ~~"6 workflows eliminated"~~

The numbers may overlap. The *framing* is what was wrong.

---

### 5.4 — Solution Card Metric Mapping

> **⚠ STRUCTURAL FIX (from v4 Problem 6, continued):** This table replaces the hardcoded
> three metric slots in p3a solution cards. Do not use "Time Saved / Cost Impact /
> Effort Reduction" unless Priority D is confirmed.

**How to Apply in p3a**

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

**Metric Slots by Priority**

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

#### Priority B — Revenue

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Revenue Unlocked / Month | Estimated: conversion rate lift × average deal value × current monthly traffic/leads |
| Slot 2 | Deals Closed / Month (increase) | Estimated: time recovered from manual work ÷ average time-to-close × close rate |
| Slot 3 | Time-to-Close Reduction | Estimated: steps removed from sales process × average time per step |

#### Priority C — Efficiency

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration, per role. Show calculation. Label Estimated if not from source data. |
| Slot 2 | Turnaround Time Reduction | Before: manual process duration. After: automated process duration. Express as % or hours. |
| Slot 3 | Error Rate Eliminated | Manual error frequency × downstream cost of error correction. Express as incidents/month eliminated. |

#### Priority D — Cost

| Slot | Label | How to Calculate |
|---|---|---|
| Slot 1 | Hours Saved / Week | Task frequency × task duration. Label Estimated if not from source data. |
| Slot 2 | Cost Impact / Month | Hours saved × blended role rate ($35/hr default, adjust to region if known). |
| Slot 3 | Effort Reduction % | Manual steps before ÷ manual steps after. Express as percentage. |

---

## PART 6 — THE DEMO PITCH — 3-ACT STRUCTURE BY PRIORITY

The demo script follows the Pain → Proof → Possibility arc for all Priorities.
What changes is the opening line and the closing possibility.

### Act 1 — The Pain (0:00 – 0:30)

All priorities start the same way: prove you understand their operational reality.
The opener is always specific and verifiable — never a strategic claim.

**Template:**
"We analyzed [Company Name]'s operations and found [N] manual processes that are
[cost/blocking/preventing]. I'm going to show you what we built to eliminate them."

The specific framing adapts:
- Priority A: "...that are blocking your path to [North Star goal]."
- Priority B: "...that are costing your team [X] deals per month."
- Priority C: "...that are consuming [X] hours per week your team should be spending on [real work]."
- Priority D: "...that are costing roughly $[X] per month in recoverable labour."

### Act 2 — The Proof (0:30 – 4:00)

The demo portal carries the pitch. Each screen is tied to a pain point from Step 1.
Abdul narrates in human terms:

Standard narration pattern per screen:
1. Name the human role doing this manually today.
2. Show the screen that replaces their manual process.
3. State what they can do with the time they get back.

> **Navigate screens in the order specified by the Demo Screen Routing Table in Part 2D.**
> For Priority A clients open the Organizations panel first. For Priority C clients open
> the Coach Task Queue first. Do not default to a generic screen order.

Example (TreeRaise, Pain Point 1 — No CRM):
"Right now, your TreeRaiser Coach tracks every new signup manually. There is no
pipeline — just emails and memory. This screen is their new morning. Every new
organization is here, with their stage, their assigned coach, and their next action.
Nothing falls through the cracks."

### Act 3 — The Possibility (4:00 – 5:00)

Introduced last. Earned through Acts 1 and 2. Adapts by Priority and Tier.

**Priority A, Tier A:**
"With these systems running, the operational question changes. It is no longer
'can we handle more organizations?' It is 'how fast do you want to reach 500?'
This infrastructure is built for that target."

**Priority A, Tier B:**
"With these bottlenecks removed, you have the operational capacity to grow
significantly — maybe 3x, maybe 5x — without adding proportional headcount.
How far do you want to take it?"

**Priority B, Tier A:**
"This is the infrastructure that makes [revenue quote] achievable. Every minute
your team spends on admin is a minute they are not closing the next campaign."

**Priority C (any tier):**
"Your team did not sign up to copy-paste data between spreadsheets. This gives
them back the capacity to do the actual work. And when they are doing the actual
work, your clients feel the difference."

**Priority D (any tier):**
"$[X] per month is recoverable. But the more important number is what your team
does with the hours they get back."

---

## PART 7 — ONE-PAGE DECISION TREE

Use this before starting any deliverable. Work top to bottom.

```
START
  │
  ▼
STEP 0: Run p0_Priority_Detection on all Phase 1 files (NEW — see Part 2A)
  │     Save output as p0_Priority_Profile_[Client].md
  │     Attach this file to every downstream prompt
  │
  ▼
STEP 1: Read Priority Score from p0 output
  │
  ├─── Highest score is A (Scalability)?
  │         │
  │         ▼
  │    Run Confidence Tiers (Part 3)
  │    Tier A → Vision-anchored scale narrative
  │    Tier B → Trajectory-based scale narrative
  │    Tier C → 24-Hour Snapshot only → Discovery call → Re-run p0
  │             (use Tier C Execution Path in Part 3A)
  │
  ├─── Highest score is B (Revenue)?
  │         │
  │         ▼
  │    Run Confidence Tiers
  │    Tier A → Revenue target narrative
  │    Tier B → Pipeline capacity narrative
  │    Tier C → Throughput improvement (use Tier C Execution Path)
  │
  ├─── Highest score is C (Efficiency)?
  │         │
  │         ▼
  │    Run Confidence Tiers
  │    Tier A → Stated quality/speed goal narrative
  │    Tier B → Team capacity narrative
  │    Tier C → Hours saved + role elevation (use Tier C Execution Path)
  │
  └─── Highest score is D, OR all scores low?
            │
            ▼
       Use Balanced Value (Part 2 Fallback)
       Show Cost + Capacity + Strategic Unlock
       across 3 columns — let the CEO pick their lens

IF scores are tied between two priorities:
  Use the "Balanced Twin" approach:
  Lead with the higher-scored Priority in the hero section.
  Show both priority metrics side by side in the solution cards.

IF data is insufficient for any scoring (Tier C + low signals):
  Generate Impact Snapshot ONLY.
  Do not generate full Outcome Report until discovery call data is available.
  Follow the Tier C Execution Path in Part 3A exactly.
```

---

## PART 8 — PROMPT MODIFICATION INSTRUCTIONS

The following changes must be made to pipeline prompts to implement this framework:

### p3a_Outcome_Report.md — Required Changes

**Add before Section 1 of the prompt:**

```
## PRE-GENERATION STEP — PRIORITY CLASSIFICATION

FIRST — Read p0_Priority_Profile_[Client].md completely before writing any HTML.
This file was produced by the p0 Pre-Step and contains your Priority classification,
Confidence Tier, North Star quote, Hero Stats, Metric Slot labels, Hook sentence,
Act 3 closing line, and Portal Emphasis directives.

If p0_Priority_Profile_[Client].md is not attached, STOP and generate it first
by running the p0 Pre-Step on all Phase 1 files before proceeding.

Do not default to cost-savings framing.
Do not default to hours-saved / cost-impact / effort-reduction metrics.
Use only the metric categories specified in the Priority Profile.

Include a comment block at the top of the HTML output:
<!-- Priority: [X] | Tier: [X] | North Star: [text or N/A] -->
```

**Replace the Hero Stats rule with:**
```
Hero stats must match the Priority detected in p0_Priority_Profile.
Use the Hero Stats Block table from Part 5.3 of this framework.
Do not default to Hours Saved / Cost Impact / Workflows Eliminated
unless Priority D is confirmed.
```

**Replace the Outcome Quantification Method (Rule 3) with:**
```
Quantify outcomes relative to the detected Priority:
- Priority A: Express as capacity (orgs handled, volume processed, scale factor)
- Priority B: Express as revenue (deals/mo, revenue unlocked, close rate)
- Priority C: Express as efficiency (hours saved, turnaround time, error rate)
- Priority D: Express as cost ($/mo saved, break-even months, effort %)

Use the Solution Card Metric Slot labels from the Priority Profile exactly.
For every metric, show the basis calculation and label as [Estimated] or [From source].
```

---

### p4d_Implementation.md — Required Changes

**Add the Priority Emphasis Layer section:**

```
## PRIORITY EMPHASIS LAYER

FIRST — Read p0_Priority_Profile_[Client].md before making any portal changes.

After implementing all functional changes listed in the implementation spec:

1. Update the hero KPI cards in admin.html to match the Portal KPI Mapping table
   (see Part 2C of the Vision-Led framework).
2. Set the default active panel on page load to match the Priority.
3. Update all KPI card labels, values, and trend lines to reflect the correct
   metric category for the detected Priority.
4. Do not change the visual design system. Change only data labels and which
   panel is marked active on load.
```

---

### p4e_Demo_Pitch.md — Required Changes

**Add to WHAT TO READ FIRST:**
```
1. FIRST — Read p0_Priority_Profile_[Client].md completely.
   The demo script Hook (Act 1) and Act 3 Possibility sentence must be read
   verbatim from the Priority Profile — do not write new versions of these.
   Record: Priority = [X], Tier = [X] before writing the script.

2. Navigate screens in the order specified by the Demo Screen Routing Table
   in Part 2D of the Vision-Led framework for the detected Priority.
   Do not default to a generic screen order.
```

**Replace Section 00 HOOK template with:**
```
The Hook must:
1. Be read verbatim from the "Hook sentence" in p0_Priority_Profile.
2. NOT open with a strategic claim, a revenue number, or a vision statement.
3. End by promising to show the fix — not to explain the vision.

If the Priority Profile hook sentence is missing, use this fallback:
"[Company] currently manages [most visible manual process] by hand.
This platform eliminates that."
```

---

### p5a_Proposal.md — Required Changes

**Add a Multi-Lens ROI section after the Cost Estimate table:**
```
Add Section: ROI Framework (3 Lenses)

Present three parallel ROI scenarios so every stakeholder finds their metric.
Lead with the lens that matches the detected Priority from p0_Priority_Profile.

Lens 1 (lead with this for Priority A) — Capacity ROI:
"With manual bottlenecks removed, the team can support [X]x the current volume
without adding proportional headcount. At current average revenue per client,
[X]x capacity = $[Y] additional annual revenue potential."

Lens 2 (lead with this for Priority B) — Revenue ROI:
"With pipeline automation running, your team can close [X]% more campaigns per month.
At current average deal value, that is $[Y]/month in additional revenue potential."

Lens 3 — Efficiency ROI (always present):
"These [N] automations recover [X] hours per week. At a blended rate of $[Y]/hr,
that is $[Z]/month recovered. Break-even on the investment: [N] months."

Strategic ROI (Priority A/B Tier A/B only — skip for C/D or Tier C):
"The platform directly enables [North Star goal]. Without this infrastructure,
reaching [goal] would require [N] additional hires. The platform replaces that
hiring requirement."

Label each lens clearly. The client reads whichever speaks to them.
```

---

## PART 9 — WORKED EXAMPLE: TREERAISE END-TO-END

### Priority Classification Result
- Signal scan: Scalability signals dominate (score: 14)
- Priority: **A — Scalability / Growth Execution**
- Confidence Tier: **A — Direct Quote**
- North Star: "2026 organizations engaged goal: 500+" [Source: p1a_Website, Press Kit]

### p0 Priority Profile Output (what must be generated before Phase 3)

```
Priority: A — Scalability / Growth Execution
Confidence Tier: A — Direct Quote
Confidence Score: 9/10
North Star: "2026 organizations engaged goal: 500+" [Source: p1a_Website.md, Press Kit]

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

### Impact Snapshot (24-Hour Version)

```
IMPACT SNAPSHOT — TreeRaise
Prepared by Dev8X · March 2026

We analyzed TreeRaise's public operations across 5 data sources.
Here is what we found.

───────────────────────────────────────────────────

THE BOTTLENECK:
Your TreeRaiser Coaches have no CRM — every new signup is tracked manually,
which means the pipeline to 500 organizations is invisible.

3 THINGS BLOCKING YOUR 2026 GOAL:
→ No lead pipeline — coaches cannot see which orgs are at risk of going cold
→ Zero renewal automation — past campaign organizers only return if they remember you
→ No outbound system — 100% of growth depends on inbound organic traffic

WHAT THIS UNLOCKS:
The operational infrastructure to scale to 500 organizations without
adding proportional headcount or losing any leads in the process.

───────────────────────────────────────────────────

[Screenshot of the Admin Dashboard showing the 47 active partner pipeline]

Want to see the full 6-minute demo?
→ Reply to this message. I'll send the walkthrough video.

Abdul | Dev8X
```

### Outcome Report Hero Stats — Corrected

**Correct (Priority A framing):**
- "500 — Organizations your 2026 goal demands your infrastructure must support"
- "10x — Campaign management capacity without adding coaching headcount"
- "6 — Manual workflows currently blocking that growth path"

**Original v3 output — WRONG (Priority D defaults):**
- ~~"37 hrs/week saved"~~
- ~~"$10,630/month impact"~~
- ~~"6 workflows eliminated"~~

### Demo Pitch Hook (Act 1)

Read verbatim from Priority Profile hook sentence above.

### Demo Pitch Screen Order (from Part 2D, Priority A routing)

1. Admin Portal → All Organizations (pipeline view)
2. Pending Approvals (onboarding queue)
3. Coach Task Queue (coach capacity and alerts)
4. Growth Analytics (acquisition chart)
5. Partner Portal → Campaigns (live partner view)

### Demo Pitch Possibility (Act 3)

Read verbatim from Priority Profile Act 3 sentence above.

### Proposal ROI Framework (3 Lenses)

**Lens 1 (Lead — Priority A) — Capacity:**
"These 6 automations allow one TreeRaiser Coach to support 3x the number of active
campaigns without additional working hours. At current revenue per campaign, this
capacity directly enables the 500-organization target."

**Lens 2 — Efficiency:**
"These 6 automations recover approximately 37 hours per week across coaching and
admin roles. At a blended rate of $40/hr for coaching staff, that is $5,920/month
recovered. Break-even on the investment: approximately 5–6 months."

**Lens 3 — Strategic:**
"Reaching 500 organizations via inbound-only growth with manual coaching would
require hiring 3–4 additional coaches. This platform replaces that hiring requirement
with automated systems — turning a $180k–$240k annual headcount decision into a
one-time platform investment."

---

## PART 10 — IMPLEMENTATION CHECKLIST

Use this checklist in order. Do not skip steps.

```
PRE-DELIVERABLE (required before writing anything)
□ Run p0_Priority_Detection on all Phase 1 files (see Part 2A)
□ Save output as p0_Priority_Profile_[Client].md
□ Verify Priority Score is recorded for all four priorities
□ Verify winning Priority is confirmed (A / B / C / D)
□ Verify Confidence Tier is recorded (A / B / C)
□ Verify North Star quote is present (or marked "Not found" for Tier B/C)
□ Verify Hook sentence is written (ready to read aloud)
□ Verify Hero Stats are computed (three stats matching the Priority — NOT cost/hours defaults)
□ Verify Solution Card Metric Slot labels are set (NOT "Time Saved / Cost Impact / Effort Reduction"
  unless Priority D confirmed)
□ Verify Portal Emphasis panel and KPI cards are specified (from Portal KPI Mapping in Part 2C)
□ Verify Act 3 Possibility sentence is written (ready to read aloud)

WITHIN 24 HOURS (Tier C only — or any client before full Phase 4 investment)
□ Generate 24-Hour Impact Snapshot from p0 output (Step 1 data only)
□ If Tier C: use Tier C template from Part 3A (NOT the full Outcome Report)
□ Send snapshot, await response before investing further

AFTER PROSPECT RESPONDS (confirmed interest — all tiers)
□ Attach p0_Priority_Profile to p3a prompt
□ Generate Outcome Report with correct Hero Stats (not cost/hours defaults)
□ Verify hero stats match Priority (use Part 5.3 table to check)
□ Verify solution cards use correct Metric Slot labels (use Part 5.4 table to check)
□ Verify Section 4 (Strategic Unlock) uses correct Priority + Tier language
□ Attach p0_Priority_Profile to p4d prompt
□ Verify portal KPI cards reflect Priority Emphasis Layer (Part 2C table)
□ Verify default panel on load matches Priority
□ Attach p0_Priority_Profile to p4e prompt
□ Verify demo script hook is read verbatim from Priority Profile
□ Verify screen navigation follows Priority Screen Routing (Part 2D table)
□ Verify Act 3 closing is read verbatim from Priority Profile
□ Attach p0_Priority_Profile to p5a prompt
□ Verify proposal ROI leads with the correct Priority lens (Part 8)

QUALITY CHECKS (before sending anything to prospect)
□ Can Abdul defend every claim with a source on a live call? (Simplicity test)
□ Does the report hold together if the CEO has quietly changed their goal? (Buyer Psychology test)
□ Does a Tier C version of this report still stand on its own? (Consistency test)
□ Is the demo portal doing 80% of the selling? (Product-Led test)
□ Does the hook open with pain, not vision? (Narrative Arc test)
□ Are all estimates clearly labeled [Estimated]? (Defensibility test)
□ Are all source citations present for quoted claims? (Credibility test)
□ Are hero stats framed in Priority-correct language — NOT cost/hours defaults? (v3 fix check)
□ Are solution card metric slots Priority-specific — NOT hardcoded three-slot defaults? (v3 fix check)
□ Does the portal KPI mapping match the Priority? (v3 fix check)
□ Are demo screens navigated in Priority-routing order? (v3 fix check)
```

---

## PART 11 — WHAT WAS ABSORBED FROM EVERY SOURCE

| Source | Core Insight Absorbed | Where It Appears |
|---|---|---|
| Priority Mode | Dynamic priority detection per client | Part 2 — Signal Weighting Table |
| Balanced Value Matrix | Multi-lens ROI for every stakeholder | Part 5.2 Section 4, Part 8 Proposal changes |
| Role-Based Perspective | Human impact mapping per pain point | Part 4 Step 3, Part 6 Act 2 narration |
| Counter 1 — Simplicity | Engine simplified to 3 steps, all defensible | Part 4 |
| Counter 2 — Data Poverty | Confidence Tiers with graceful degradation | Part 3 |
| Counter 3 — Buyer Psychology | Pain → Proof → Possibility arc; vision earned last | Part 6 Act structure |
| Counter 4 — Consistency | Fixed 5-section report structure guaranteed | Part 5.2 |
| Counter 5 — Speed | 24-hour Impact Snapshot before full package | Part 5.1 |
| Counter 6 — Product-Led | Demo portal carries the pitch; narrative supports it | Part 6 Act 2 |
| v2 original | Fixed structure, Confidence Tiers base, 3-step engine base | Parts 3–6 |
| **v4 fix (Problem 1)** | p0 as structured output file, not reading instruction | **Part 2A** |
| **v4 fix (Problem 2)** | Portal KPI Mapping table per Priority | **Part 2C** |
| **v4 fix (Problem 3)** | Demo Screen Routing Table per Priority | **Part 2D** |
| **v4 fix (Problem 4)** | Priority Thread Variable / dependency chain | **Part 2B** |
| **v4 fix (Problem 5)** | Tier C Execution Path with concrete templates | **Part 3A** |
| **v4 fix (Problem 6)** | Solution Card Metric Mapping by Priority | **Parts 5.3, 5.4** |

---

## APPENDIX — PRIORITY QUICK-REFERENCE CARD

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  PRIORITY DETECTION QUICK CARD                                               │
├──────────────┬───────────────────────┬────────────────────────────────────── ┤
│  PRIORITY    │  KEY SIGNAL           │  METRIC SLOTS (solution cards)        │
├──────────────┼───────────────────────┼───────────────────────────────────────┤
│  A — Scale   │  "500 orgs", "10x"    │  Capacity Unlocked                    │
│              │  growth targets,      │  Volume Handled                       │
│              │  social enterprise    │  Orgs Supportable at Scale            │
├──────────────┼───────────────────────┼───────────────────────────────────────┤
│  B — Revenue │  Sales hiring, CRM,   │  Revenue Unlocked / Month             │
│              │  revenue targets      │  Deals Closed / Month (increase)      │
│              │  mentioned            │  Time-to-Close Reduction              │
├──────────────┼───────────────────────┼───────────────────────────────────────┤
│  C — Ops     │  "Burnout", "manual"  │  Hours Saved / Week                   │
│              │  quality complaints   │  Turnaround Time Reduction            │
│              │  process bottlenecks  │  Error Rate Eliminated                │
├──────────────┼───────────────────────┼───────────────────────────────────────┤
│  D — Cost    │  CFO-led, lean team   │  Hours Saved / Week                   │
│              │  cost-cutting lang.   │  Cost Impact ($/Month)                │
│              │  layoff signals       │  Effort Reduction (%)                 │
└──────────────┴───────────────────────┴───────────────────────────────────────┘

CONFIDENCE TIER QUICK CARD
  Tier A: Direct quote found → use it verbatim, cite source
  Tier B: 3+ consistent signals → frame as trajectory, not claim
  Tier C: <3 signals → 24-Hour Snapshot only → discovery call → re-run p0
          Use Tier C Execution Path (Part 3A) — NOT fallback Outcome Report

NARRATIVE ARC (all priorities)
  Hook:        Verbatim from p0 Priority Profile hook sentence
  Demo:        Portal screens in Priority Screen Routing order (Part 2D)
  Possibility: Verbatim from p0 Priority Profile Act 3 sentence

p0 THREAD VARIABLE RULE
  p0 output file MUST be attached to: p3a, p4d, p4e, p5a, p5b
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

HERO STAT CHECK (before finalizing any Outcome Report)
  Ask: are these hero stats framed in Priority-correct language?
  Priority A hero stats must reference capacity/scale — NOT hours or dollars saved.
  Priority D is the only Priority where "$X/month" is the correct primary frame.
```