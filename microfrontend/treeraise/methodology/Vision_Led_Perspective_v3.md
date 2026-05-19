# Vision-Led Balanced Matrix v3: The Definitive Framework

> **Version history:** v1 = original Priority Mode anchor. v2 = absorbed 6 counter-perspectives.
> v3 = adds Priority Detection Algorithm, North Star Scoring, TreeRaise worked examples,
> Decision Tree, and revised prompt instructions across all phases.

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

Before writing a single word of any deliverable, the AI must classify the prospect
into exactly one of four primary strategic buckets. This classification drives every
narrative decision downstream.

### The Four Priorities

**Priority A — Scalability / Growth Execution**
The client has a specific volume or market expansion goal and their current systems
cannot support that scale without breaking.

Signals: explicit numerical targets ("500 orgs", "10x revenue"), rapid hiring,
multi-market expansion language, new geography launches, franchise or network model,
waitlists or backlog mentioned.

Demo framing: "Your current operations handle X. This infrastructure handles 10X."
Metric set: Capacity Unlocked, Volume Handled, Processing Velocity, Orgs Onboarded/Mo.

**Priority B — Revenue Growth / Deal Velocity**
The client wants to close more deals, faster, or unlock new revenue streams. Their
bottleneck is sales throughput, not operational capacity.

Signals: sales team hiring, CRM references, "we need more clients" language, commission
structures mentioned in job postings, revenue growth targets in founder posts,
outbound expansion language.

Demo framing: "This platform lets your team close 30% more campaigns without adding
headcount."
Metric set: Deals Closed/Mo, Time-to-Close Reduction, Revenue Unlocked/Mo.

**Priority C — Operational Efficiency / Productivity**
The client wants to ship faster, deliver better service, and eliminate friction. Their
bottleneck is internal process quality, not volume or sales.

Signals: burnout language in job postings, "we're drowning in admin" posts, quality
complaints in reviews, ops roles that should be strategic but are doing manual work,
turnaround time mentioned as a client complaint.

Demo framing: "Your team can deliver in the same day instead of next week."
Metric set: Hours Saved/Week, Turnaround Time Reduction, Error Rate Eliminated,
Tasks Automated.

**Priority D — Cost Reduction (Original Pipeline Default)**
The client's primary driver is reducing operational spend, headcount, or tooling costs.

Signals: layoff mentions, cost-cutting language, "lean team" framing, references to
over-spending on tools, finance-led decision making, CFO as primary stakeholder.

Demo framing: "This eliminates $X/month in operational waste."
Metric set: Hours Saved, Cost Impact ($), Effort Reduction (%).

> **Rule:** Priority D is the fallback only. It is never the first choice unless
> cost signals clearly dominate the evidence. Most early-stage social enterprises
> (like TreeRaise) are Priority A. Most established SMBs are Priority C.
> Priority D is most common in late-stage or declining businesses.

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

This is why the original cost-savings pitch was wrong. The algorithm would have
caught it before a single line was written.

---

## PART 3 — NORTH STAR SCORING (Confidence Tiers)

After identifying the Priority, the AI scores the confidence of the North Star
(the specific stated goal) on a 3-tier system.

### Tier A — Direct Quote (Score: 8–10)
A specific, attributed, quantified statement found in the source data.

Examples:
- "Our 2026 organizations engaged goal: 500+" [Source: p1a_Website, Press Kit page]
- "2026 trees planted goal: 125,000+" [Source: p1a_Website]

Action: Use the exact quote as the anchor in the Outcome Report hero section.
Flag the source explicitly. Full vision-anchored narrative is activated.

### Tier B — Strong Inference (Score: 4–7)
No explicit quote, but 3 or more consistent directional signals point to the
same ambition.

Examples:
- Hiring a Client Specialist in Costa Rica (operational scale signal)
- LinkedIn posts repeatedly reference scaling the mission globally
- Website mentions "operating in 60 countries" as an achievement reference

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
3. CEO LinkedIn Posts (stated intent)
4. Company LinkedIn Posts (marketing intent)
5. Website "About Us" / Mission Pages
6. Marketing Taglines (least reliable — aspirational, not operational)

The source higher on this list wins the conflict.

---

## PART 4 — THE 3-STEP DATA ENGINE

The engine runs once per prospect, before any deliverable is generated.
Output of each step feeds directly into the deliverable templates in Part 5.

### Step 1 — Manual Pain Extraction (Always Run)

Scan all Phase 1 files. Extract every observable manual operation — tasks real
people are doing by hand that could be automated.

**Rules:**
- Every pain point must cite its source file and the specific text that supports it.
- Minimum 3, maximum 7 pain points.
- Tag each with: Time Cost (hrs/wk) and Risk Factor (Low/Medium/High).
- No invented statistics. Use qualitative language if no number is supportable.
- Map each pain point to the human role doing it (from Part 5 — Human Impact Mapping).

**TreeRaise Step 1 Output (example):**
| # | Pain Point | Source | Time Cost | Risk | Human Role |
|---|---|---|---|---|---|
| 1 | No CRM — coaches manually track every new signup in their head | p1e_Job_Posting (Client Specialist role requirement), p4d_partner-portal.html (no pipeline view) | ~6 hrs/wk | High | TreeRaiser Coach |
| 2 | Zero email automation — no nurture for warm leads, no renewal trigger | p1b_Linkedin_Company (no automation posts), p1a_Website (manual outreach implied) | ~8 hrs/wk | High | TreeRaiser Coach |
| 3 | Coach follow-up after every signup is 100% manual | p1e_Job_Posting ("serve as primary point of contact") | ~4 hrs/wk | High | TreeRaiser Coach |
| 4 | Impact reports may be manually assembled by one person (Victor Junco) | p1a_Website (team page, single Sustainability Specialist) | ~6 hrs/mo (scales to full-time at 500 orgs) | High | Sustainability Specialist |
| 5 | No outbound prospecting system — growth is 100% inbound only | p1a_Website (no BDR role, no outreach tools), p1c_Linkedin_Owner (LinkedIn-only strategy) | N/A (revenue risk, not time) | High | Founder / BDR |

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
TreeRaise: Wayne Elsey cannot see the conversion funnel from interested school →
launched campaign. He is flying blind on whether the 500-org goal is achievable.

**Layer 2 — The Operator (Daily User):**
What is this person's Tuesday like because of this pain?
TreeRaise Coach: Spends 4 hours every morning manually checking on new signups
via email. Has no system to know which leads are warm, which are cold, or which
campaigns are at risk of underperforming.

**Layer 3 — The End-Client (Organizer/Donor):**
What does this person experience because of the pain?
PTA Coordinator: Receives a generic follow-up email days after signing up.
No real-time dashboard to show parents. Campaign feels disconnected from
the organization's mission.

---

## PART 5 — FIXED DELIVERABLE STRUCTURE (Guaranteed Quality Floor)

The structure of every deliverable is locked. What adapts dynamically is the
content *within* each section, based on Priority (A/B/C/D) and Confidence Tier.

### 5.1 — The 24-Hour Impact Snapshot (New Deliverable)

**Purpose:** Sent within 24 hours of a lead expressing interest. Generated from
Step 1 data only. No vision analysis required. Earns attention before investing
in the full package.

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
is confirmed. The full package (Outcome Report + Demo + Proposal) is generated only
after the prospect responds.

---

### 5.2 — The Outcome Report (p3a) — Fixed 5-Section Architecture

Every Outcome Report follows this exact section order, every time:

**Section 1 — Operational Snapshot**
What the company does, who it serves, how it works today. Draws from p1a + p1b.
Always achievable. Never skipped.

**Section 2 — The Friction Map**
3–7 manual bottlenecks with time costs and human impact from Step 1.
Always achievable. Never skipped.

**Section 3 — The Transformation Preview**
For each friction point: before/after using the actual demo portal screens.
Always achievable (tied to our product). Never skipped.

**Section 4 — The Strategic Unlock**
What becomes possible when friction is removed.
**THIS SECTION ADAPTS BY PRIORITY AND TIER:**

| Priority | Tier A | Tier B | Tier C |
|---|---|---|---|
| A (Scale) | "This infrastructure directly supports your stated goal of [quote]. Here is how each automation maps to that target." | "With these bottlenecks removed, your team gains the capacity to handle 3–5x more volume. Here is what that trajectory makes possible." | "With these bottlenecks removed, your team can scale operations without adding headcount." |
| B (Revenue) | "This directly enables your stated revenue target of [quote]. Here is how." | "With these fixes in place, your pipeline can close [X]% more campaigns per month." | "With this in place, your team reclaims the time needed to grow revenue without adding staff." |
| C (Efficiency) | "Your stated goal of [quote] requires your team to operate at full capacity — not half-capacity managing admin." | "Removing these bottlenecks frees your team to focus on what they were hired to do." | "Your team reclaims [X] hours per week. Here is what that time is worth." |
| D (Cost) | "Beyond the cost savings, this infrastructure positions you for [quote]." | "The cost savings fund the next phase of growth." | "$[X]/month recovered. Break-even in [N] months." |

**Section 5 — Investment Framework**
Pricing and timeline reference. Always achievable. Never skipped.
Keep this section brief in the Outcome Report — full detail lives in the Proposal.

---

### 5.3 — Hero Stats Block (Section 1 of Outcome Report)

The three headline numbers in the hero section must match the Priority:

| Priority | Stat 1 | Stat 2 | Stat 3 |
|---|---|---|---|
| A (Scale) | Capacity Unlocked (e.g., "500 orgs supported") | Processing Velocity (e.g., "10x campaign volume") | Manual Workflows Eliminated |
| B (Revenue) | Revenue Unlocked/Mo | Deals Closed/Mo (increase) | Time-to-Close Reduction |
| C (Efficiency) | Hours Saved/Week | Turnaround Time Reduction | Error Rate Eliminated |
| D (Cost) | Hours Saved/Week | Cost Impact ($/mo) | Workflows Automated |

**TreeRaise hero stats (Priority A, Tier A):**
- "10x — Campaign management capacity without adding headcount"
- "500 — Organizations supportable with the pipeline built"
- "6 — Manual workflows eliminated blocking the 2026 goal"

These replace the generic "37 hrs/week saved / $10,630/mo / 6 workflows" from v2.
The numbers may overlap but the framing shifts entirely from cost to capacity.

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
Abdul narrates in human terms (from the Role-Based Perspective):

Standard narration pattern per screen:
1. Name the human role doing this manually today.
2. Show the screen that replaces their manual process.
3. State what they can do with the time they get back.

Example (TreeRaise, Pain Point 1 — No CRM):
"Right now, your TreeRaiser Coach tracks every new signup manually. There is no
pipeline — just emails and memory. This screen is their new morning. Every new
organization is here, with their stage, their assigned coach, and their next action.
Nothing falls through the cracks. The coach stops being an inbox manager and starts
being a growth engine."

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
STEP 1: Run Signal Weighting Table (Part 2)
  │
  ├─── Highest score is A (Scalability)?
  │         │
  │         ▼
  │    Run Confidence Tiers (Part 3)
  │    Tier A → Vision-anchored scale narrative
  │    Tier B → Trajectory-based scale narrative
  │    Tier C → Capacity unlock narrative (no goal quoted)
  │
  ├─── Highest score is B (Revenue)?
  │         │
  │         ▼
  │    Run Confidence Tiers
  │    Tier A → Revenue target narrative
  │    Tier B → Pipeline capacity narrative
  │    Tier C → Throughput improvement narrative
  │
  ├─── Highest score is C (Efficiency)?
  │         │
  │         ▼
  │    Run Confidence Tiers
  │    Tier A → Stated quality/speed goal narrative
  │    Tier B → Team capacity narrative
  │    Tier C → Hours saved + role elevation narrative
  │
  └─── Highest score is D, OR all scores are low?
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
```

---

## PART 8 — PROMPT MODIFICATION INSTRUCTIONS

The following changes must be made to pipeline prompts to implement v3:

### p3a_Outcome_Report.md — Required Changes

**Add before Section 1 of the prompt:**

```
## PRE-GENERATION STEP — PRIORITY CLASSIFICATION

Before writing any HTML, run the Priority Detection Algorithm:

1. Scan all attached files for signals from the Signal Weighting Table.
2. Score each priority (A/B/C/D). Record the scores.
3. Identify the winning priority.
4. Run the Confidence Tier check for the winning priority.
5. Record: Priority = [A/B/C/D], Tier = [A/B/C], North Star = [quote or "not found"].

Do not proceed to HTML generation until this step is complete.
Include a comment block at the top of the HTML output:
<!-- Priority: [X] | Tier: [X] | North Star: [text or N/A] -->
```

**Replace the Hero Stats rule with:**
```
Hero stats must match the Priority detected above.
Use the Hero Stats Block table from the Vision-Led v3 framework.
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

For every metric, show the basis calculation and label as [Estimated] or [From source].
```

---

### p4e_Demo_Pitch.md — Required Changes

**Add to WHAT TO READ FIRST:**
```
3. Run Priority Classification (same as p3a pre-generation step).
   The demo script Hook and Act 3 (Possibility) must match the detected Priority.
   Record: Priority = [X], Tier = [X] before writing the script.
```

**Replace Section 00 HOOK template with:**
```
The Hook must:
1. Open with a specific, verifiable operational pain (from Step 1 output).
2. NOT open with a strategic claim, a revenue number, or a vision statement.
3. End by promising to show the fix — not to explain the vision.

The ONLY reference to the North Star goal belongs in Act 3 (Section 03 Before vs After).
It is earned, not opened with.

Hook template by Priority:
- A: "Right now, [specific manual bottleneck] is preventing [company] from reaching
     the scale they are building toward. This platform eliminates that bottleneck."
- B: "Right now, [specific process] is limiting how many campaigns [company] can
     close per month. This platform removes that ceiling."
- C: "Right now, [specific role] spends [X hours/week] on [manual task] instead of
     [their actual job]. This platform gives that time back."
- D: "Right now, [specific process] is costing [company] roughly [time/cost] every
     week. This platform eliminates it."
```

---

### p5a_Proposal.md — Required Changes

**Add a Multi-Lens ROI section after the Cost Estimate table:**
```
Add Section: ROI Framework (3 Lenses)

Present three parallel ROI scenarios so every stakeholder finds their metric:

Lens 1 — Efficiency ROI (for the Ops team / internal stakeholders):
"These [N] automations recover [X] hours per week.
At a blended rate of $[Y]/hr, that is $[Z]/month recovered.
Break-even on the investment at that rate: [N] months."

Lens 2 — Capacity ROI (for the founder / growth team):
"With manual bottlenecks removed, the team can support [X]x the current volume
without adding proportional headcount.
At current average revenue per client, [X]x capacity = $[Y] additional annual revenue potential."

Lens 3 — Strategic ROI (for Priority A/B only — skip for C/D):
"The platform directly enables [North Star goal].
Without this infrastructure, reaching [goal] would require [N] additional hires.
The platform replaces that hiring requirement."

Label each lens clearly. The client reads whichever speaks to them.
```

---

## PART 9 — WORKED EXAMPLE: TREERAISE END-TO-END

This section shows v3 applied to TreeRaise at every phase so the output can be
validated and used as a template for similar social enterprise clients.

### Priority Classification Result
- Signal scan: Scalability signals dominate (score: 14)
- Priority: **A — Scalability / Growth Execution**
- Confidence Tier: **A — Direct Quote**
- North Star: "2026 organizations engaged goal: 500+" [Source: p1a_Website, Press Kit]

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

### Outcome Report Hero Stats
- "500 — Organizations your 2026 goal demands your infrastructure must support"
- "10x — Campaign management capacity without adding coaching headcount"
- "6 — Manual workflows currently blocking that growth path"

### Demo Pitch Hook (Act 1)
"Right now, your TreeRaiser Coaches have no pipeline visibility. Every new signup
is tracked by memory and email. When a school principal visits treeraise.com and
clicks 'Begin Your Impact', there is no system to ensure someone follows up within
48 hours, no automated nurture if they do not respond, and no way for Wayne to see
how many leads are in the funnel at any given moment. That is the bottleneck between
where TreeRaise is today and 500 organizations by end of 2026. This platform
eliminates it."

### Demo Pitch Possibility (Act 3)
"With the CRM running, the email sequences live, and the impact reports automated,
the operational question changes. It is no longer 'can we handle more organizations?'
It is 'how fast do we want to go?' The infrastructure you have seen in the last
five minutes was built for 500 partners. It was also built for 1,000. The ceiling
is no longer your system. It is only your ambition."

### Proposal ROI Framework (3 Lenses)
**Lens 1 — Efficiency:**
"These 6 automations recover approximately 37 hours per week across coaching and
admin roles. At a blended rate of $40/hr for coaching staff, that is $5,920/month
recovered. Break-even on the investment: approximately 5–6 months."

**Lens 2 — Capacity:**
"With manual coaching follow-up eliminated and email sequences automated, one
TreeRaiser Coach can support 3x the number of active campaigns without additional
working hours. At current revenue per campaign, this capacity directly enables the
500-organization target."

**Lens 3 — Strategic:**
"Reaching 500 organizations via inbound-only growth with manual coaching would
require hiring 3–4 additional coaches. This platform replaces that hiring requirement
with automated systems — turning a $180k–$240k annual headcount decision into a
one-time platform investment."

---

## PART 10 — WHAT WAS ABSORBED FROM EVERY PERSPECTIVE

| Source | Core Insight Absorbed | Where It Appears in v3 |
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

---

## PART 11 — IMPLEMENTATION CHECKLIST

Use this checklist when implementing v3 for a new prospect:

```
PRE-DELIVERABLE (required before writing anything)
□ Run Signal Weighting Table on all Phase 1 files
□ Record Priority Score for all four priorities
□ Confirm winning Priority (A / B / C / D)
□ Run Confidence Tier check for winning Priority
□ Record North Star quote (or mark as Tier B/C)
□ Complete 3-Step Data Engine (Pain Map, Ambition, Human Impact)

WITHIN 24 HOURS OF LEAD EXPRESSING INTEREST
□ Generate Impact Snapshot using Step 1 output + Priority framing
□ Send snapshot, await response before investing further

AFTER PROSPECT RESPONDS (confirmed interest)
□ Generate Outcome Report (p3a) using Priority + Tier
□ Verify hero stats match Priority (not defaulted to cost/hours)
□ Verify Section 4 (Strategic Unlock) uses correct Priority + Tier language
□ Generate Demo Pitch (p4e) with correct Hook and Act 3 framing
□ Verify Hook opens with pain, not vision
□ Generate Proposal (p5a) with 3-Lens ROI section

QUALITY CHECK
□ Can Abdul defend every claim on a live call? (Counter 1 test)
□ Does the report make sense if the CEO has quietly downgraded their goal? (Counter 3 test)
□ Does a data-poor version of this report still hold together? (Counter 4 test)
□ Is the demo portal doing 80% of the selling? (Counter 6 test)
```

---

## APPENDIX — PRIORITY QUICK-REFERENCE CARD

```
┌─────────────────────────────────────────────────────────────────────┐
│  PRIORITY DETECTION QUICK CARD                                      │
├──────────────┬──────────────────────┬───────────────────────────────┤
│  PRIORITY    │  KEY SIGNAL          │  HERO METRIC                  │
├──────────────┼──────────────────────┼───────────────────────────────┤
│  A — Scale   │  "500 orgs", "10x"   │  Capacity Unlocked            │
│              │  growth targets,     │  Volume Handled               │
│              │  social enterprise   │  Orgs Supportable             │
├──────────────┼──────────────────────┼───────────────────────────────┤
│  B — Revenue │  Sales hiring, CRM,  │  Deals/Mo Increase            │
│              │  revenue targets     │  Revenue Unlocked             │
│              │  mentioned           │  Time-to-Close Reduction      │
├──────────────┼──────────────────────┼───────────────────────────────┤
│  C — Ops     │  "Burnout", "manual" │  Hours Saved/Week             │
│              │  quality complaints  │  Turnaround Reduction         │
│              │  process bottlenecks │  Error Rate Eliminated        │
├──────────────┼──────────────────────┼───────────────────────────────┤
│  D — Cost    │  CFO-led, lean team  │  Cost Impact ($/mo)           │
│              │  cost-cutting lang.  │  Break-Even Months            │
│              │  layoff signals      │  Hours Saved                  │
└──────────────┴──────────────────────┴───────────────────────────────┘

CONFIDENCE TIER QUICK CARD
  Tier A: Direct quote found → use it verbatim, cite source
  Tier B: 3+ consistent signals → frame as trajectory, not claim
  Tier C: <3 signals → skip vision, pure Pain → Fix → Unlock

NARRATIVE ARC (all priorities)
  Hook:        Specific operational pain (verifiable, citable)
  Demo:        Portal screens tied to pain points, narrated human-first
  Possibility: Vision introduced last — earned through proof
```
