You are a senior technical sales consultant at Dev8X writing a video pitch script,
operating under the Decision-Led Proof Framework (v2).

Your task is to read the attached Proposal document and Decision Card, then
generate a **Project Proposal Video Pitch Script** as a `.docx` file. This script
is read aloud by Abdul on screen while recording a 12–14 minute walkthrough
video sent to the client.

---

## FRAMEWORK OVERRIDE (Applies to entire prompt)

This prompt operates under the Decision-Led Proof Framework v2.

1. **Trust through Integrity:** The pitch must include an explicit ROI Integrity
   statement spoken aloud. Honesty builds more trust than precision.
2. **Decision Emotion:** Structure to build Trust through honesty and Momentum
   through a safe next step.
3. **Primary Source:** The Proposal and Decision Card are PRIMARY sources.

---

## WHAT TO READ FIRST

Before writing anything, extract from the attached Proposal:

- Client company name and names of decision-makers (if stated)
- Platform name and what it does
- All five development phases with their names and team assignments
- All three delivery iterations (Basic / Core / Advance) with screen counts and week ranges
- Full team: every person, their role(s), and which phases they work in
- Total hours and total cost
- Hourly rates (senior $25/hr, junior $15/hr)
- Market rate comparison data (US, Europe, South Asia)
- Total number of portals and total number of screens

Then extract from the Decision Card:
- Decision Risk (Section 5) — this must be addressed in Q5 of the QA section
- ROI Integrity Ladder (Section 8) — this must be explained in Q6
- Confidence Signal level — this controls how aggressively to push for commitment
- Decision Emotion Map — use the Trust and Momentum triggers to shape tone

---

## SCRIPT FORMAT RULES

Every section uses exactly these annotation types, styled consistently:

| Symbol | Meaning |
|--------|---------|
| `🖥 SCREEN` | What to show on screen during recording |
| `🎙 SPEAK` | Words to read aloud verbatim |
| `👆 ACTION` | What to click or point to on screen |
| `❓ Q` | A question the client is likely to have |
| `✅ A` | Abdul's direct answer to that question |
| `📌 NOTE` | Internal note — do not read aloud |

Tone rules for all SPEAK blocks:
- Plain English throughout. No jargon without an immediate plain explanation.
- Every technical term must be followed by a "Think of it like..." or "Here's an example..."
  using the client's own platform as the analogy.
- First person singular: "I", "I'll", "I've" — never "Abdul" or third person.
- Confident and direct. No filler phrases like "So basically" or "As you know".
- Keep sentences short. One idea per sentence.

Total spoken words target: ~1,800 words = 12–14 minutes at natural speaking pace.

---

## DOCUMENT STRUCTURE

Generate the script in this exact order. Every section must be present.

---

### HEADER BLOCK

```
[CLIENT COMPANY NAME]
Project Proposal Video Pitch Script — 12–14 Minute Recording
Abdul | [Month Year]
```

📌 NOTE block (styled as a shaded note box):
"Read every 🎙 SPEAK box word for word. 🖥 SCREEN = what to show on screen.
👆 ACTION = what to click or point to. Pause recording between sections freely.
Total spoken words: ~1,800 = 12–14 minutes."

Section index line (bold, monospace-style):
`00 Intro  01 Phases  02 Team ⚠  03 Timeline ⚠  04 Cost ✓  05 Discovery ★`

Footnote: `⚠ = Challenging sections addressed first | ✓ = Positive | ★ = The wow finish`

---

### 00 SECTION — Introduction

**Purpose label:** Purpose of this document and video

🖥 SCREEN: Open Proposal on left, Blueprint on right. Both visible.

🎙 SPEAK:
- Greet the decision-maker(s) by name.
- Explain what the two documents are and that they are their permanent reference.
- State that every technical term will be followed by a plain example from their own platform.
- Natural transition into Section 01.

Length: ~100 words spoken.

---

### 01 SECTION — Development Phases

**Purpose label:** How your platform gets built — five phases, plain English

🖥 SCREEN: Point to the Development Phases section on the Blueprint.

🎙 SPEAK: Opening — every iteration (Basic, Core, Advance) goes through the same five phases.

Then, for each of the five phases, a sub-block:

```
[NN] PHASE [Phase Name]
Team: [Person(s)] — [Role(s)]
🎙 SPEAK
```

Each SPEAK block must:
1. Name the phase and the team.
2. Explain what this phase does in one building/office/restaurant analogy.
3. Give a concrete example using the actual client's platform (use a real portal name and a real
   screen name from the Proposal — e.g. "your Attorney portal" or "the Transactions screen").
4. Explain why this phase needs these specific team members and not others.
5. End with how Abdul's oversight role works in this phase.

Length per phase: ~120–150 words spoken. Five phases total ≈ 650 words for this section.

---

### 02 SECTION — The Team

**Purpose label:** Addressing the hard questions directly

🖥 SCREEN: Point to the Project Team table in the Proposal.

Opening SPEAK: Brief summary of the team (N people, N role titles).

Then three Q&A blocks using ❓ Q / ✅ A format:

**Q1: What does each person actually do?**
Answer: Walk through each team member's specific phase involvement. Use real names and real phases.

**Q2: Why does [lead person] have [N] separate roles? Is one person being paid [N] times?**
Answer: Explain the three jobs are distinct (architecture/planning vs. coding vs. DevOps),
active in different phases, and require different specialist skills. Explain why this is
the reason the total cost is as low as it is.

**Q3: Why does the PM role need [X] hours if the prototype already covers what we need?**
Answer: Use a house analogy — the blueprint tells you what rooms to build, but someone still
has to schedule the electricians and check the walls are straight. [X] hours over [Y] months
is less than one hour per working day.

Length: ~250 words spoken for this section.

---

### 03 SECTION — Timeline

**Purpose label:** Why [N] months — and how you verify every week

🖥 SCREEN: Point to the TOTAL row in the Cost Estimate table showing "[X] hrs ≈ [Y] weeks".

Then two Q&A blocks:

**Q1: Why does this project take [N] months?**
Answer: Show the calculation — total hours ÷ (hours/day × days/week × persons working) = weeks.
Explain that the estimate was built screen by screen, role by role, not guessed.
Give scope context: "[N] screens across [N] fully separate portals, each with its own login,
permissions, and data connections."

**Q2: How do we know the timeline is accurate? What if it takes longer?**
Answer: Acknowledge 20–30% variance is normal in software. Explain the three-version structure
as the protection mechanism.
👆 ACTION: Point to the three iteration cards on the Blueprint.
After Version 1 is live, the client can project the remaining timeline themselves based on
actual pace. Plus weekly dev environment access throughout.

**Q3: How do we verify working hours?**
Answer: Explain Clockify — third-party time tracking, not self-reported. Auto-tracks which
software is open. Client gets read-only access from day one. Describe the Summary and Detailed
report views. Mention auto-tracker screenshots as additional proof.

Length: ~280 words spoken for this section.

---

### 04 SECTION — Cost

**Purpose label:** What you pay — and what the same work costs anywhere else

🖥 SCREEN: Point to the Market Rates Comparison table in the Proposal.

🎙 SPEAK:
- Context first: give the US market rate for senior developer and DevOps as reference.
- Explain what the same project would cost with a US team.
- Transition: "We bill at South Asian market rates, validated against those same profiles."

🖥 SCREEN: Point to the TOTAL row in the Cost Estimate table.

🎙 SPEAK:
- State the total: "$[X]. That is [Y] hours of real work from [N] people over [Z] months."
- Add a revenue-context line: if the platform serves a business where one transaction/deal
  generates significant revenue, note how quickly the platform pays for itself. Adapt this
  to the actual business from the Proposal (e.g. for real estate: one commission covers the
  entire investment).

**Mandatory ROI Integrity Statement (read aloud verbatim):**
"Every number in this proposal is classified. Where we used your own data or public filings,
we labelled it 'Sourced.' Where we estimated from available signals, we stated our assumptions
and labelled it 'Estimated.' Where we used industry benchmarks, we said so — and we never
used those as headline numbers. Where we did not have direct data, we said so — rather than
padding the numbers."

Length: ~200 words spoken for this section.

---

### 05 SECTION — Discovery Phase ★

**Purpose label:** The wow finish — what we already gave you for free

🎙 SPEAK:
- Explain what a Discovery Phase is in the software industry (prototype + requirements +
  validation before development begins).
- State the market cost: $3,000–$15,000 depending on market.
- Reveal: Dev8X does not charge for Discovery.
- Explain why (long-term relationship philosophy, investing in the client first).
- List what was delivered for free: designed screens, working prototype, discovery meetings,
  features document, benchmarked proposal.
- Closing: "Now we are ready to build it. We are asking for your trust to begin — and
  everything I have shown you today is proof that trust is well placed."
- Final: "Thank you for your time. Message me directly with any question."

Length: ~170 words spoken for this section.

---

### QA SECTION — Follow-Up Q&A

**Label:** Quick answers for any questions after the video

**Internal note:** "Use these if [client name(s)] follow up with questions after watching."

Include exactly six ❓ Q / ✅ A blocks covering:

1. "The prototype looked finished. Why are we still paying for months of work?"
   — Static visual vs. working system analogy (movie set with no plumbing).

2. "Can we structure payment in phases to manage cash flow?"
   — Yes — the three versions enable this naturally. Deposit → V1 delivery → V2 → V3.

3. "What if we want to add a feature not in scope?"
   — Change order process: assess → estimate → approve → build. Nothing added without sign-off.

4. "What happens after the platform launches?"
   — Monthly maintenance retainer. New features scoped separately as Phase 2.

5. **Decision Risk question:** Pull the Decision Risk from Decision Card Section 5.
   The question must directly address that risk. Example: if Decision Risk is
   "I'm not sure our team will actually adopt this," then Q5 is:
   "How do we know our team will actually use this?"
   Answer must reference the Implementation Safety section and Adoption Risk mitigation
   plan from the Proposal.

6. **ROI Integrity question:**
   "How do we know these numbers are real?"
   Answer by explaining the ROI Integrity Ladder:
   - L1 = directly from your data or public filings
   - L2 = calculated from available signals with stated assumptions
   - L3 = industry benchmark proxy — illustrative only, never headline
   - L4 = too speculative — removed from all deliverables
   "Every metric in the proposal has been classified using this ladder. Nothing in the
   headline numbers is unverified."

---

### ⚙ SECTION — Changes Made to Your Updated Draft

**Label:** Internal reference — do not share with client

📌 NOTE block: "The following corrections and improvements were made when merging your
updated draft into this final version:"

Include 4–6 📌 NOTE items. For the first run of a new proposal (no prior draft), use
placeholder items such as:

- 📌 NOTE: VERIFIED — all screen counts match the Proposal totals exactly.
- 📌 NOTE: VERIFIED — timeline formula is mathematically correct: [formula shown].
- 📌 NOTE: VERIFIED — hourly rates and total cost match the Cost Estimate table.
- 📌 NOTE: VERIFIED — ROI Integrity statement is present in Section 04 SPEAK.
- 📌 NOTE: VERIFIED — Q5 addresses the Decision Risk from the Decision Card.
- 📌 NOTE: REMINDER — replace [client name(s)] in Sections 00 and QA with actual names
  before recording.
- 📌 NOTE: REMINDER — replace the `href="#"` on any demo link before sending.

If running this prompt on a revised draft (prior script attached), list actual changes made.

---

## DOCX GENERATION INSTRUCTIONS

Follow the SKILL.md docx instructions exactly. Key rules:
- US Letter page size (12240 × 15840 DXA), 1-inch margins
- Font: Arial throughout, 12pt body
- Section headings: HeadingLevel.HEADING_1, bold, size 28
- Phase/Q sub-headings: HeadingLevel.HEADING_2, bold, size 24
- Annotation labels (🖥 SCREEN, 🎙 SPEAK, ❓ Q, ✅ A, 📌 NOTE):
  Bold label + normal body text, each on its own paragraph
- NOTE boxes: shading fill "FFF3CC" (light yellow), ShadingType.CLEAR
- Q blocks: shading fill "EBF3FB" (light blue), bold ❓ label
- A blocks: shading fill "EBF3FB", bold ✅ label
- Never use unicode bullets — use LevelFormat.BULLET for any lists
- Section index line: bold, monospace-style using Space Mono or Courier New

**Steps:**
1. Install: `npm install -g docx`
2. Write script to `/home/claude/generate_pitch.js`
3. Run: `node /home/claude/generate_pitch.js`
4. Validate: `python scripts/office/validate.py /home/claude/pitch.docx`
5. Fix any errors, re-run
6. Copy: `cp /home/claude/pitch.docx "/mnt/user-data/outputs/11_Proposal_Pitch_[ClientName].docx"`
7. Call `present_files` with the output path

---

## WHAT TO ATTACH

| File | Role |
|------|------|
| `prompts/phase5_proposal/p5b_Proposal_Pitch.md` | This prompt |
| `context/p5a_Proposal_[ClientName].docx` | Source of all numbers, names, phases, and screens |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Decision Risk, ROI Integrity, Confidence Signal |

> The Proposal is the main source for numbers and structure. The Decision Card
> is PRIMARY for Q5 (Decision Risk) and the ROI Integrity statement in Section 04.
> Estimated token usage: 15k–35k.

**Save output as:** `context/p5b_Proposal_Pitch_[ClientName].docx`
