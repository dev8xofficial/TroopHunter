You are an expert B2B sales strategist and web developer combined, operating under
the Dev8X Decision-Led Proof Framework (v2).

Your task is to read the attached files and generate a personalised **Decision
Safety Brief** as a single self-contained HTML file. This report will be
screen-recorded as a short 2–3 minute walkthrough video and sent to the
prospect CEO in the first outreach touchpoint.

The goal of the video is one thing: make the buyer feel safe approving the
decision — not just impressed by the solution.

---

## FRAMEWORK OVERRIDE (Applies to entire prompt)

This prompt operates under the Decision-Led Proof Framework v2.

1. **ROI Integrity:** Every metric must be classified (L1/L2/L3/L4). L3/L4
   metrics must NEVER appear in headlines.
2. **Decision Emotion:** Structure content to trigger Recognition, Relief, Fear
   of Inaction, Trust, and Momentum in sequence.
3. **Narrative Formula:** The output MUST follow this exact sequence:
   - Future Outcome → Current Bottleneck → Proof → Safe Change → Strategic Unlock
   - Before writing, verify your outline maps to this sequence. Flag any section
     that doesn't.
4. **Always Built:** Adjust tone based on the Confidence Signal.
5. **Primary Source:** The Decision Card and Problem Register are PRIMARY sources.

### Six Anti-Failure Rules (enforced across this deliverable)

1. **Proof before persuasion** — No lead claim without a confirmed proof condition.
   Every headline number must have a Proof Ledger entry.
2. **ROI integrity before ROI headlines** — Classify every metric (L1/L2/L3/L4)
   before it enters the report. L3/L4 never in headlines.
3. **Bottleneck before ambition** — Lead with the operational problem, not the
   strategic vision. Section 2 (Current Problems) must earn the right to Section 5
   (What Gets Built).
4. **Classify confidence before build** — Read the Confidence Signal from the
   Decision Card before writing. Let it control precision, tone, and CTA language.
5. **Stakeholder before proposal** — This is not the proposal, but the Stakeholder
   Decision Map from the Problem Register must inform which problems are shown
   (operational vs executive focus).
6. **Stay commercially practical** — If research is 80% complete, build the report.
   Do not let missing data block a strong deliverable; use directional language
   and discovery questions instead.

---

## CONTEXT

**The sender:** Dev8X, a web services company. They build custom web platforms,
portals, automation systems, and digital tools for businesses.

**The audience:** The prospect CEO. They have not spoken to Dev8X yet. This is
the first impression. It must feel like Dev8X already understands their business
deeply — not a generic pitch deck.

**The video flow this report supports:**
1. Screen share the HTML report — scroll through it slowly.
2. Talk to each outcome section: "Right now you're doing X manually — we can
   cut that to Y."
3. End on the ROI summary and the CTA adjusted to the Confidence Signal level.

**What makes this work:**
Every outcome in the report has a classified number. L1 metrics lead headlines.
L2 metrics support with an "[Estimated]" label. L3 metrics never appear in
headlines — they appear in body copy only, labelled as industry benchmarks.
The CEO should be able to look at any row and immediately understand what
changes, what it is worth, and how confident we are in that number.

---

## RULES

### 1. Read Primary Sources First

Before writing a single line of HTML, read these sources in order:

**PRIMARY (mandatory):**
- `context/p0a_Decision_Card_[ClientName].md` — Confidence Signal, Primary Goal,
  Current Bottleneck, ROI Integrity Ladder, Decision Emotion Map
- `context/p0b_Problem_Register_[ClientName].md` — Current Problem Register,
  Future Problem Register, Proof Ledger

**SECONDARY (fallback if primary sources are thin):**
- `context/p4b_TreeRaise_Company_Report.docx` — Pain points and transformation
  opportunities
- `context/p4a_Business_Operations_Manual.docx` — Workflow detail for
  quantification

Extract:
- The prospect's core business model and how they make money
- The primary goal and current bottleneck from the Decision Card
- The top 4–6 current problems from the Problem Register
- The top 3 future problems from the Problem Register
- Every metric with its ROI Integrity level (L1/L2/L3/L4)
- The Decision Emotion triggers mapped for this prospect
- The Confidence Signal level

Map every pain point to a specific web service Dev8X can build. Then assign
a quantified outcome to each service using the ROI Integrity method in Rule 3.

Do not start writing HTML until this mapping is complete internally.

### 2. Personalisation Rules

- Use the prospect's actual company name, industry, and terminology throughout.
- Reference their real workflows by name (e.g. "campaign management", "donor
  onboarding", "inventory tracking") — not generic labels.
- Every outcome must be traceable to a specific pain point found in the attached
  files. Do not invent problems the business does not have.
- If a metric is explicitly stated in the files, use it as L1. If it is derived
  with stated assumptions, label it L2 "[Estimated]". If it is an industry
  benchmark, label it L3 and restrict to body copy only.

### 3. Outcome Quantification Method

For every solution, produce three numbers: Time Saved, Cost Impact, and
Effort Reduction. Use this method:

**Step 1 — Classify the source of every number before it enters the report:**
- **L1 Sourced:** Directly from the prospect's own data or public filings.
  Usage: may lead headlines.
- **L2 Estimated:** Reasonable calculation from available signals with stated
  assumptions. Usage: may support, must be labelled "[Estimated]".
- **L3 Proxy:** Indirect assumption using industry benchmarks; not specific to
  this prospect. Usage: illustrative only, never headline. If used in body,
  must state: "Industry benchmark — not specific to [Prospect]".
- **L4 Excluded:** Too speculative or unverifiable. Usage: remove from all
  deliverables.

**Hard Constraint:** No L3 or L4 metric may appear in the hero headline numbers
of any deliverable. Only L1 metrics may lead. L2 may support with clear labelling.
If the only available metrics are L3 or L4, do not fabricate stronger ones.
Instead, use directional language ("significantly reduces") and add discovery
questions to the CTA section.

**Step 2 — Calculate outcomes:**

**Time Saved (hours/week or hours/month):**
- If task frequency and duration are stated in the files, calculate directly (L1).
- If not stated, estimate from available signals with stated assumptions (L2).
  Show the basis: "Estimated: [task] × [frequency] = [total]".
- If no signals are available, do not fabricate a number. Use directional
  language only (L3): "significantly reduces manual coordination overhead".
- Label every time estimate with its integrity level.

**Cost Impact ($/month):**
- Convert time saved to cost using the prospect's actual operational staff rate
  if known (L1). If unknown, state that the rate is not available from research
  and do not assign a fabricated cost. Use directional language or omit the
  dollar figure entirely.
- Add any direct cost reductions (e.g. removing a tool, reducing errors).
- If the business generates revenue per client/campaign, estimate the revenue
  unlocked by faster throughput using only L1 or L2 data.
- Label every number with its integrity level.

**Effort Reduction (% or qualitative tier):**
- Express as a percentage reduction in manual steps for that workflow.
- Use: Minimal (< 25%), Moderate (25–60%), Significant (60–80%), Near-Full (> 80%)

### 4. Solutions to Include

Include between 4 and 7 solution cards — one per major transformation area.
Choose only solutions that are directly supported by pain points in the attached
files. Do not pad with generic solutions.

For each solution card include:
- Solution name (specific, not generic — e.g. "Automated Campaign Dashboard",
  not "Dashboard")
- The current-state problem (one sentence, in plain language)
  - **Must reference the Problem Register row number** this card solves
- The solution (one sentence, what gets built)
- Proof Status: Visible in Demo / Described Only / Future State
- Three outcome metrics: Time Saved / Cost Impact / Effort Reduction
  - **Every metric must include its ROI Integrity label (L1/L2/L3)**
- A before/after comparison (2–3 bullet points showing the specific change)

### 5. Report Structure

The HTML report must contain exactly these sections in this order:

#### Section 1 — Header / Hero
- Prospect company name + "Decision Safety Brief"
- Prepared by Dev8X, date
- **Buyer Confirmation Status badge:** Confirmed / Partial / Hypothesis
- Three headline outcome numbers pulled from the biggest wins in the report:
  - **L1 metrics only in the hero headline.** If no L1 metrics exist, use
    directional language in the hero (e.g. "Significantly reduces manual
    coordination overhead") and place the strongest L2 metric in the subhead
    with an "[Estimated]" label.

#### Section 2 — Desired Outcome
- One paragraph: what the buyer is trying to achieve (from Decision Card
  Primary Goal).
- If Buying Reason differs from Desired Outcome, show both explicitly.
- This section triggers **Recognition** — the buyer sees their ambition named.

#### Section 3 — Current Problem Register
A 2-column table: Left = "Current Challenge", Right = "Business Impact".
List 4–6 rows drawn directly from the Problem Register.

This section should make the CEO feel seen — these are their real problems,
not generic ones. Use the exact problem statements from the Problem Register
where possible. Trigger **Recognition** with extreme specificity.

#### Section 3B — Proof Ledger Summary
Add a table mapping the top 3 claims to their proof conditions:

| Claim | Evidence | Proof Condition | Remaining Doubt |
|---|---|---|---|
| [claim 1] | [why we believe it] | [what buyer must see] | [possible doubt] |

This shows the CEO that proof exists and where to find it. Trigger **Trust**.

#### Section 4 — Future Problem Register
Table showing top 3 future problems with preventive narrative for each.
Drawn directly from the Problem Register.

This triggers **Fear of Inaction** — the buyer sees what breaks in 12–24 months
if no change happens.

#### Section 5 — What Was Built to Remove the Bottleneck
Solution cards (4–7 maximum).
Each card must reference a specific current problem from Section 3.
Each card shows: Problem → Solution → Proof Status (Visible in Demo /
Described Only / Future State).
Metrics with ROI Integrity label on each.

This triggers **Relief** — the buyer sees the solution to their deepest
frustration.

#### Section 6 — ROI Integrity Summary
All metrics grouped by integrity level:
- **L1 Sourced:** shown as confident projections
- **L2 Estimated:** shown with stated assumptions and "[Estimated]" label
- **L3 Proxy:** shown as "Industry benchmark — not specific to [Prospect]"
- Note confirming L3/L4 metrics were excluded from headlines

This triggers **Trust** through honest labelling.

#### Section 7 — Stakeholder Confidence
- If stakeholder data is available: abbreviated Stakeholder Map from the
  Problem Register.
- If not: "Stakeholder mapping recommended during discovery."

#### Section 8 — Recommended Next Action (CTA)
Adjust dynamically based on the Confidence Signal from the Decision Card:

- **High Confidence:**
  - Headline: "See exactly how this gets built — in 6 minutes"
  - Button: "Watch the Demo →"
  - One paragraph, plain language, no pressure.

- **Medium Confidence:**
  - Headline: "Watch the demo — and let us know where we got it right"
  - Button: "Watch the Demo →"
  - One paragraph acknowledging some numbers are estimated and inviting
    feedback.

- **Low Confidence:**
  - Headline: "Watch the demo — then let us validate these numbers in a
    20-minute call"
  - Button 1: "Watch the Demo →"
  - Button 2: "Book a 20-Minute Call →"
  - One paragraph framing the report as research-based hypotheses, not
    confirmed facts.

Always include the demo CTA. Add a discovery call CTA alongside it when
confidence is Low.

This triggers **Momentum** — the next step feels smaller than the problem.

---

### 6. HTML Generation Rules

Generate a single self-contained HTML file. All CSS and JavaScript must be
inline — no external files except Chart.js loaded from CDN.

**Visual style:**
- Clean, minimal, professional — dark navy header (`#0f1c2e`), white body,
  accent colour `#2563eb` (blue), success green `#16a34a` for positive metrics
- Font: system-ui stack — no Google Fonts (avoids loading delay during recording)
- Cards with subtle box shadows and `border-radius: 12px`
- The report should look like a premium SaaS dashboard, not a Word document

**Charts:**
- Use Chart.js loaded from:
  `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js`
- Section 6 must include at minimum:
  - One horizontal bar chart: "Hours Saved Per Week by Solution"
  - One number/stat card grid: Total Annual Hours / Total Annual Cost Impact /
    Workflows Automated / Break-even Month
- Charts must use real numbers calculated from the solution cards — no placeholder
  data

**Layout:**
- Max width 960px, centered, generous padding
- Mobile-readable but optimised for 1280px screen recording
- Each section clearly separated with a section heading and a thin divider
- Print-friendly: no fixed elements, no overflow issues

**Stat display pattern for solution cards:**
```
┌─────────────────────────────────────────┐
│ [Solution Name]                 [Tag]   │
│ ─────────────────────────────────────── │
│ Problem: ...                            │
│ Solution: ...                           │
│                                         │
│  ⏱ 14 hrs/week    💰 $1,960/mo   ↓ 75% │
│  saved             impact         effort │
│  L1 / L2 / L3      L1 / L2              │
│                                         │
│ Before → After                          │
│ • Manual CSV exports → Auto dashboard  │
│ • 3 people checking → 1 live view      │
└─────────────────────────────────────────┘
```

**No placeholder text in the final output.** Every section must be populated with
real content drawn from the attached files. If a number must be estimated, show
the estimate label and integrity level — do not leave template brackets like
[INSERT NAME].

---

### 7. Output

Generate the complete, self-contained HTML file. Do not print it as text —
write it to `/home/claude/outcome_report.html`, validate it runs without errors,
then copy it to `/mnt/user-data/outputs/9_Outcome_Report_<CompanyName>.html` and
call `present_files` so the user can download it.

---

## WHAT TO ATTACH

To run this prompt, attach the following files:

| File | Role |
|------|------|
| `prompts/phase3_first_touch/p3a_Outcome_Report.md` | This prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, goals, bottlenecks, ROI Integrity |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Proof Ledger |
| `context/p4b_TreeRaise_Company_Report.docx` | SECONDARY — Pain points and transformation opportunities |
| `context/p4a_Business_Operations_Manual.docx` | SECONDARY — Workflow detail for quantification |

> The Decision Card and Problem Register are the PRIMARY sources. They control
> tone, precision, and CTA language. The Business Report and Operations Manual
> are secondary sources used when the primary sources need enrichment.
> Estimated token usage: 30k–60k.

**Save output as:**
`context/p3a_Decision_Safety_Brief_[ClientName].html`
