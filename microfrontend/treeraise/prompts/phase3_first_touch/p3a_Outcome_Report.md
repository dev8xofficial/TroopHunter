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
   metrics must NEVER appear in headlines. Classification is internal only.
2. **Decision Emotion:** Structure content to trigger Recognition, Relief, Fear
   of Inaction, Trust, and Momentum in sequence. Emotion labels are internal
   only and must never be printed in the report.
3. **Narrative Formula:** The output MUST follow this exact sequence:
   - Future Outcome → Current Bottleneck → Proof → Safe Change → Strategic Unlock
   - Before writing, verify your outline maps to this sequence. Flag any section
     that doesn't.
4. **Always Built:** Adjust tone based on the Confidence Signal.
5. **Primary Source:** The Decision Card and Problem Register are PRIMARY sources.

### Client-Facing Surface Rule (critical)

The generated HTML is sent directly to the prospect CEO. It must read like a
professional, client-ready business brief, not like an internal sales framework.
The Decision-Led Proof Framework v2, ROI Integrity Ladder, Confidence Signal,
Decision Emotion sequence, Proof Ledger, and Stakeholder Decision Map must remain
fully intact as the hidden operating system for the report, but their mechanics
must not be exposed as visible labels, badges, section names, footnotes, chart
labels, table labels, tooltips, or explanatory copy.

Translate internal framework language into plain client-facing language:

| Internal term | Client-facing expression |
|---|---|
| L1 / L1 Sourced | "from [Prospect]'s own published materials", "stated by [Prospect]", or "directly observed from [Prospect]'s materials" |
| L2 / L2 Estimated | "calculated estimate", "estimated from observable workflow signals", or "[Estimated]" |
| L3 / L3 Proxy | "industry reference point" or "based on comparable platforms; not specific to [Prospect]" |
| L4 / L4 Excluded | Do not show the metric at all |
| ROI Integrity / ROI Integrity Ladder | "how we treated the numbers", "research basis", "confidence in the figures", or no label if unnecessary |
| Proof Ledger / Proof Condition | "research transparency", "evidence we used", "what we'd like to confirm with you" |
| Buyer Confirmation Status / Confirmed / Partial / Hypothesis | Do not show as a badge or status; reflect confidence through cautious wording and CTA format |
| Confidence Signal | Do not name; use it internally to control precision, caveats, and next-step language |
| Decision Emotion / Recognition / Relief / Fear of Inaction / Trust / Momentum | Do not name; engineer these feelings through section order, specificity, and tone |
| Stakeholder Decision Map | "who this decision involves" or "decision context" |

Never print internal labels such as "L1", "L2", "L3", "L4", "ROI Integrity",
"Decision Emotion", "Emotion triggered", "Confidence Signal", "Buyer
Confirmation", "Proof Ledger", "Decision-Led Proof Framework", or "framework" in
visible report text. Use those terms only while reasoning internally.

### Executive Readability Mode (critical)

This report must be designed for a busy prospect who may only scan the page for
60-90 seconds before deciding whether to keep reading or watch the walkthrough.
The output must therefore function as a **scan-first executive brief**:

- The information, logic, proof discipline, and conclusions must remain the same.
- The format must become more visual, structured, and digestible.
- Replace long paragraphs with stat cards, compact tables, comparison blocks,
  short callouts, timelines, icon-led summaries, and tightly written cards where
  possible.
- Use prose only when a sentence genuinely adds context that a visual element
  cannot carry.

The reader should be able to absorb the core case quickly:
1. What is the bottleneck?
2. What changes if it is fixed?
3. Why should they trust the numbers?
4. What happens next?

Do not reduce the rigor of the report. Compress the presentation, not the
thinking.

### Six Anti-Failure Rules (enforced across this deliverable)

1. **Proof before persuasion** — No lead claim without a confirmed proof condition.
   Every headline number must have a Proof Ledger entry.
2. **ROI integrity before ROI headlines** — Classify every metric (L1/L2/L3/L4)
   before it enters the report. L3/L4 never in headlines.
3. **Bottleneck before ambition** — Lead with the operational problem, not the
   strategic vision. Section 3 (Current Problem Register) must earn the right to Section 5
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
Every outcome in the report has a classified number internally. Directly sourced
metrics may lead headlines. Calculated estimates may support with an
"[Estimated]" label or plain source note. Industry reference points never appear
in headlines; they appear in body copy only as directional context. The CEO
should be able to look at any row and immediately understand what changes, what
it is worth, and how confident we are in that number without seeing the internal
classification system. The page should feel like a premium executive dashboard:
easy to scan, easy to narrate on video, and still defensible under scrutiny.

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
- Every metric with its internal ROI Integrity level (L1/L2/L3/L4), then convert
  that level into client-facing source language before writing the HTML
- The Decision Emotion triggers mapped for this prospect, used only to shape the
  copy and sequencing
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
  benchmark, treat it as L3 internally and restrict it to body copy only.
  Convert the visible label to plain client language (for example:
  "from TreeRaise's own published materials", "calculated estimate", or
  "industry reference point"). Never display the L1/L2/L3/L4 codes.

### 3. Outcome Quantification Method

For every solution, produce three numbers: Time Saved, Cost Impact, and
Effort Reduction. Use this method:

**Step 1 — Classify the source of every number before it enters the report
(internal only):**
- **L1 Sourced:** Directly from the prospect's own data or public filings.
  Usage: may lead headlines. Visible label: "from [Prospect]'s own published
  materials" or equivalent plain language.
- **L2 Estimated:** Reasonable calculation from available signals with stated
  assumptions. Usage: may support, must be labelled "[Estimated]" or
  "calculated estimate".
- **L3 Proxy:** Indirect assumption using industry benchmarks; not specific to
  this prospect. Usage: illustrative only, never headline. If used in body, use
  "industry reference point" or "based on comparable platforms; not specific to
  [Prospect]".
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
- Label every time estimate with client-facing source language, not the internal
  integrity code.

**Cost Impact ($/month):**
- Convert time saved to cost using the prospect's actual operational staff rate
  if known (L1). If unknown, state that the rate is not available from research
  and do not assign a fabricated cost. Use directional language or omit the
  dollar figure entirely.
- Add any direct cost reductions (e.g. removing a tool, reducing errors).
- If the business generates revenue per client/campaign, estimate the revenue
  unlocked by faster throughput using only L1 or L2 data.
- Label every number with client-facing source language, not the internal
  integrity code.

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
  - **Every metric must include a client-facing source note** such as
    "from [Prospect]'s own published materials", "[Estimated]", "calculated
    estimate", or "industry reference point". Do not show L1/L2/L3 labels.
- A before/after comparison (2–3 bullet points showing the specific change)

### 5. Report Structure

The HTML report must contain exactly these sections in this order:

#### Section 1 — Header / Hero / Executive Snapshot
- Prospect company name + "Decision Safety Brief"
- Prepared by Dev8X, date
- Do not show any Buyer Confirmation Status, confidence badge, hypothesis badge,
  or internal validation badge. Confidence should affect wording, not appear as
  a visible label.
- The hero must work as a 15-second executive scan:
  - One strong headline
  - One short subhead (maximum 1 sentence)
  - Three headline outcome stat cards pulled from the biggest wins in the report
  - One compact "At a Glance" strip showing:
    - Current bottleneck
    - Strongest operational unlock
    - Recommended next step
- The hero must feel calm, spacious, and premium. Avoid a crowded first screen.
- Do not stack multiple equally loud elements on top of each other. The visual
  hierarchy must be:
  1. Headline
  2. Key quantified proof
  3. Short context
  4. Recommended next step
- Do not use both a loud brand badge and a second eyebrow that repeat the same
  context. Keep top metadata to one quiet line only.
- Do not insert manual line breaks inside the headline. Let the layout wrap
  naturally.
- Keep headline copy tight:
  - Maximum 2 lines on desktop
  - Maximum 16 words where possible
  - No slogan-style triples or dramatic copywriting formulas
- Keep the hero subhead tight:
  - Maximum 24 words where possible
  - Clarify the bottleneck and what the brief covers
- Hero stat cards must be concise:
  - Stat value should be prominent
  - Stat label should be short, ideally under 12 words
  - Source note should be brief, ideally under 5 words
  - If explanation is needed, move it below the fold
- The "At a Glance" strip must stay compact:
  - Each item should read in one quick glance
  - Prefer phrases over sentences
  - Each value should stay under 18 words where possible
- Do not repeat the same idea in the headline, subhead, stat cards, and glance
  strip. Each layer should add a different level of understanding.
- Directly sourced metrics only in the hero headline. If no directly sourced
  metrics exist, use directional language in the hero (e.g. "Significantly
  reduces manual coordination overhead") and place the strongest calculated
  estimate in the subhead with an "[Estimated]" label.
- Source notes under hero stats must use plain language such as
  "TreeRaise published goal", "from TreeRaise's own materials", or
  "calculated estimate". Do not show internal classification codes.

#### Section 2 — Desired Outcome
- One short paragraph: what the buyer is trying to achieve (from Decision Card
  Primary Goal). Maximum 70 words.
- If Buying Reason differs from Desired Outcome, show both explicitly using two
  compact side-by-side summary cards rather than extra prose.
- Add one short visual callout explaining why timing matters now.
- Internally, this section creates Recognition: the buyer sees their ambition
  named. Do not label the emotion in the report.

#### Section 3 — Current Problem Register
- Use a 2-column table or stacked problem cards: Left = "Current Challenge",
  Right = "Business Impact".
- List 4–6 rows drawn directly from the Problem Register.
- Keep each problem and impact tight. Prefer one concise sentence per cell.
- Add a small severity, delay, or operational-pressure cue if supported by the
  evidence, but keep the language businesslike and client-facing.

This section should make the CEO feel seen — these are their real problems,
not generic ones. Use the exact problem statements from the Problem Register
where possible. Internally, use Recognition through extreme specificity, but do
not name the emotion.

#### Section 3B — Research Transparency
Add a compact table mapping the top 3 claims to their proof conditions.

Use a client-readable heading such as:
"Research Transparency — What We Know and Where We'd Like Your Confirmation"

| Claim | Evidence We Used | What We'd Like to Confirm With You | Open Question |
|---|---|---|---|
| [claim 1] | [why we believe it] | [what buyer must see] | [possible doubt] |

Keep this table tight, scannable, and plainspoken. The goal is to make the
research feel disciplined at a glance.

This shows the CEO that the research is disciplined without exposing the Proof
Ledger terminology. Internally, this creates Trust; do not name the emotion.

#### Section 4 — Future Problem Register
- Show the top 3 future problems as compact risk cards or a clean 3-row table.
- For each future problem include:
  - Risk title
  - What likely breaks in 12–24 months
  - How the recommended build prevents that outcome
- Keep each entry to short, punchy business language rather than long warnings.

Internally, this creates Fear of Inaction: the buyer sees what breaks in 12–24
months if no change happens. Do not name the emotion.

#### Section 5 — What Gets Built to Remove the Bottleneck
- Solution cards (4–7 maximum).
- Each card must reference a specific current problem from Section 3.
- Each card must be highly visual and easy to scan. Use a card layout with:
  - Solution name
  - Problem solved
  - What gets built
  - Proof Status (Visible in Demo / Described Only / Future State)
  - Three outcome metrics
  - 2–3 before/after bullets
- Metrics must use client-facing source notes on each. Do not show ROI Integrity
  labels or L1/L2/L3 codes.
- Limit prose inside each card:
  - Problem text: max 25 words
  - Solution text: max 30 words
  - Before/after bullets: max 12 words each where possible

Internally, this creates Relief: the buyer sees the solution to their deepest
frustration. Do not name the emotion.

#### Section 6 — Projected Operational Impact
- This section must feel like an executive summary dashboard, not a text block.
- Include:
  - A stat card grid: Total Annual Hours / Total Annual Cost Impact /
    Workflows Automated / Break-even Month
  - One horizontal bar chart: "Hours Saved Per Week by Solution"
  - One compact "How We Treated Every Number in This Report" panel
- Group the visible explanations by client-facing source basis:
  - **From [Prospect]'s own published materials:** shown as confident projections
  - **Calculated estimates:** shown with stated assumptions and "[Estimated]"
    label where useful
  - **Industry reference points:** shown as "based on comparable platforms; not
    specific to [Prospect]"
- Do not include a note saying L3/L4 metrics were excluded from headlines.
  Instead, say plainly that headline figures are limited to numbers that can be
  tied directly to the prospect's materials.

Use a client-readable subheading such as "How We Treated Every Number in This
Report". Internally, this creates Trust through honest labelling; do not name the
emotion or the internal integrity system.

#### Section 7 — Stakeholder Confidence / Decision Context
- If stakeholder data is available: show an abbreviated stakeholder map as
  compact cards, not long prose.
- Each stakeholder card should show:
  - Name / role
  - What matters most to them
  - What risk they will care about
- If data is thin, use: "Stakeholder mapping recommended during discovery."

#### Section 8 — Recommended Next Action (CTA)
Adjust dynamically based on the Confidence Signal from the Decision Card, but do
not name the Confidence Signal in the report.

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

Internally, this creates Momentum: the next step feels smaller than the problem.
Do not name the emotion.

### 5A. Readability Constraints

These constraints are mandatory. The goal is fast comprehension for a busy
executive, without changing the underlying content.

- Avoid long paragraph blocks. Use cards, tables, chips, comparison rows,
  timelines, and visual summaries wherever possible.
- No paragraph should exceed 80 words.
- Most paragraphs should stay within 35-60 words.
- Each section should have an immediate visual anchor above or beside any
  explanatory text: stat cards, a table, a chart, a callout, a timeline, or a
  comparison block.
- Use headings and subheadings that say exactly what the reader is looking at.
- The report must remain narratable in a 2-3 minute screen-recorded walkthrough.
- The first screen must communicate the decision case without requiring scroll
  depth to understand the value.
- Keep whitespace generous and reading friction low.

### 5B. Visual Composition Priorities

Prioritise this visual hierarchy throughout the report:

1. Headline outcome
2. Bottleneck / business problem
3. Build recommendation
4. Quantified impact
5. Research transparency
6. Next action

When deciding between a paragraph and a visual module, choose the visual module
unless the paragraph adds essential nuance that would otherwise be lost.

---

### 6. HTML Generation Rules

Generate a single self-contained HTML file. All CSS and JavaScript must be
inline — no external files except Chart.js loaded from CDN.

**Visual style:**
- Clean, minimal, professional — dark navy header (`#0f1c2e`), white body,
  accent colour `#2563eb` (blue), success green `#16a34a` for positive metrics
- Font: system-ui stack — no Google Fonts (avoids loading delay during recording)
- Use one clean sans-serif type system across the whole report. Do not use
  Georgia, Times New Roman, or mixed serif/sans pairings.
- Cards with subtle box shadows and `border-radius: 12px`
- The report should look like a premium SaaS dashboard, not a Word document
- The page must feel executive-facing: high signal, low clutter, easy to scan
- Use strong typographic hierarchy and compact summary modules so the page reads
  well in both silent scanning and narrated walkthrough mode

**Hero-specific visual rules:**
- The hero should feel composed, not busy.
- Avoid too many boxed elements competing for attention in the first viewport.
- Use restrained contrast: one dominant headline area, then quieter supporting
  modules.
- Keep hero card borders, fills, and accent colors subtle.
- Do not let hero stat labels become mini paragraphs.
- Do not make the hero feel like a sales landing page. It should feel like an
  executive brief cover with quantified proof.
- Prefer whitespace and alignment over decorative devices.
- Avoid redundant badges, pills, or top-level labels that do not add meaning.
- The first viewport should look clean enough to pause on during a screen
  recording without feeling cramped.

**Charts:**
- Use Chart.js loaded from:
  `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js`
- Section 6 must include at minimum:
  - One horizontal bar chart: "Hours Saved Per Week by Solution"
  - One number/stat card grid: Total Annual Hours / Total Annual Cost Impact /
    Workflows Automated / Break-even Month
- Charts must use real numbers calculated from the solution cards — no placeholder
  data

**Visual modules required across the page:**
- Hero stat cards
- At-a-glance executive summary strip
- Compact current-state problem table or cards
- Research transparency table
- Future-risk cards or table
- Solution cards
- ROI stat grid
- At least one timeline, sequence strip, or phased roadmap showing how the
  recommended build unfolds or how the bottleneck gets removed over time

**Copy discipline:**
- Prefer short sentences and short blocks.
- Avoid walls of text.
- Replace repetitive explanatory prose with structured UI patterns:
  - stat cards
  - comparison rows
  - callout panels
  - labels with short supporting lines
  - mini timelines
  - concise tables
- Use plain, professional language. No hype copy, no fluff, no generic agency
  phrasing.
- Every visible sentence should earn its space.

**Layout:**
- Max width 960px, centered, generous padding
- Mobile-readable but optimised for 1280px screen recording
- Each section clearly separated with a section heading and a thin divider
- Print-friendly: no fixed elements, no overflow issues
- The first viewport should contain the headline, the top value case, and enough
  summary information that a busy executive understands the direction before
  scrolling
- The first viewport must not feel overloaded. If the hero becomes visually dense,
  move supporting explanation lower on the page rather than compressing more into
  the top section.
- Design for scan paths: left-to-right, top-to-bottom, with clear visual anchors
  at regular intervals
- Do not bury the most important insight inside a paragraph

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
│  calculated estimate  from client materials │
│                                         │
│ Before → After                          │
│ • Manual CSV exports → Auto dashboard  │
│ • 3 people checking → 1 live view      │
└─────────────────────────────────────────┘
```

**No placeholder text in the final output.** Every section must be populated with
real content drawn from the attached files. If a number must be estimated, show
the estimate label and source basis in client-facing language — do not leave
template brackets like [INSERT NAME], and do not expose L1/L2/L3/L4 labels.

Before finalising the HTML, scan all visible text and remove any internal
methodology terms: "L1", "L2", "L3", "L4", "ROI Integrity", "Decision Emotion",
"Emotion triggered", "Confidence Signal", "Buyer Confirmation", "Proof Ledger",
"Decision-Led Proof Framework", and "framework". Replace them with the
client-facing language from the surface rule above.

Before finalising the HTML, also sanity-check the page against these questions:
1. Can a busy CEO understand the value in under 90 seconds of scanning?
2. Is the first screen strong enough without reading long paragraphs?
3. Does every section have a clear visual anchor?
4. Are the numbers still disciplined and traceable?
5. Does the page feel like a client-ready executive brief rather than an
   internal working document?

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
