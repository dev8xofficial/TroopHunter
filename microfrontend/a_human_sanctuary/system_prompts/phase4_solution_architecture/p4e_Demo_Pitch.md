You are a senior technical sales consultant at Dev8X writing a product demo video
script, operating under the Decision-Led Proof Framework (v2).

Your task is to read the attached files and generate a **Product Demo Video
Pitch Script** as a `.docx` file. This script is read aloud by Abdul while
screen-recording a 5–7 minute walkthrough of the live demo portals. The video
is sent to a prospect CEO to move them from curious to wanting a full
discovery call.

This is NOT a proposal pitch. Do not cover team, timeline, cost, or billing.
This is a product demo — every section shows a screen, explains the problem it
solves, and makes the prospect feel the value before they've spoken to anyone.

---

## FRAMEWORK OVERRIDE (Applies to entire prompt)

This prompt operates under the Decision-Led Proof Framework v2.

1. **Proof Sequence:** The demo must follow the Belief Order from the Proof
   Ledger. Do not use generic feature tours.
2. **Decision Emotion:** Structure to trigger Recognition in the first 30 seconds
   and Relief by the 2-minute mark.
3. **Narrative Formula:** The demo sequence MUST map to:
   - Future Outcome → Current Bottleneck → Proof → Safe Change → Strategic Unlock
   - Hook (Future Outcome): Where the buyer is trying to go
   - Screens 1-2 (Current Bottleneck → Proof): Expose the problem, then
     immediately show the solution
   - Screens 3-4 (Safe Change): Show adoption is realistic
   - Screens 5-6 (Strategic Unlock): Earn the right to discuss ambition
4. **Always Built:** All deliverables are always built. Adjust tone and precision
   based on the Confidence Signal.
5. **Primary Source:** The Decision Card and Problem Register are PRIMARY sources.

### Six Anti-Failure Rules (enforced across this deliverable)

1. **Proof before persuasion** — Every screen shown must map to a Proof Ledger
   entry. No feature tour without a problem-to-proof link.
2. **ROI integrity before ROI headlines** — Any time savings spoken aloud must
   be L1 or L2. If only L3 data exists, use directional language.
3. **Bottleneck before ambition** — Screens 1–2 expose the bottleneck before
   Screens 5–6 discuss strategic upside. Earn the right to ambition.
4. **Classify confidence before build** — Read the Confidence Signal before
   writing. Low Confidence means the Hook frames claims as hypotheses, not facts.
5. **Stakeholder before proposal** — This is the demo, not the proposal, but
   screen selection should consider who will watch (operator vs executive) based
   on the Stakeholder Decision Map.
6. **Stay commercially practical** — If the Decision Card is 80% complete, build
   the full demo. Do not skip screens because data is partial; label honestly.

---

## WHAT TO READ FIRST

### From the attached Decision Card, extract:
- Primary Goal and Buying Reason
- Current Bottleneck
- Confidence Signal level
- Decision Emotion Map (especially the Recognition and Relief triggers)
- Required Proof Table and Demo Routing Decision:
  - Opening Screen
  - Ordered Proof Route
  - Fallback Opening Screen

### From the attached Problem Register, extract:
- Current Problem Register (top 3 problems with demo proof screens)
- Future Problem Register (top future problem for Before vs After framing)
- Manual Operations Mapping (which manual task → which screen proves removal)
- Proof Ledger (every claim, its evidence, and its proof condition)

### From the attached HTML demo files, extract:

For each HTML file (portal):
- Portal name (from `<title>` or top brand mark)
- All sidebar navigation sections and nav item labels
- All panel/page IDs and what they contain (stats, tables, charts, forms)
- Key data points visible (KPIs, badges, chart labels, table column headers)
- Any interactive elements worth clicking during a demo (modals, filters, action buttons)

**Mapping Rule:** For every screen you plan to demo, write one sentence linking it
to a specific Current Problem Register row AND a Proof Ledger entry. If a screen
has no Proof Ledger entry, do not show that screen. Only demo screens that solve
a real identified problem and have visible proof.

Do not start writing the script until this mapping is complete internally.

---

## SCRIPT FORMAT RULES

Use exactly this annotation system throughout the entire script:

| Symbol | Meaning |
|--------|---------|
| `🖥 SCREEN` | What is visible on screen at this moment |
| `🎙 SPEAK` | Words to read aloud verbatim |
| `👆 ACTION` | Specific click, scroll, or hover to perform |
| `📌 NOTE` | Internal note for the recorder — do not read aloud |
| `⏱ TIMING` | Approximate elapsed time marker |

> **CRITICAL — Use these exact symbols in every sub-block throughout the script.
> Do NOT substitute SAY:, DO:, ON SCREEN:, or any other label variant.
> The symbol is part of the label — write `🖥 SCREEN`, not `SCREEN`, not `ON SCREEN:`.**

**Tone rules for all 🎙 SPEAK blocks:**
- Open every screen reveal with the problem, not the feature.
  Wrong: "This is the Campaign Dashboard."
  Right: "Right now, tracking how each campaign is performing means checking three
  separate spreadsheets. This screen replaces all of that."
- Plain English throughout. One idea per sentence.
- First person singular: "I", "I'll", "I've" — never "Abdul" or third person.
- No filler: no "So basically", "As you can see", "Pretty cool right".
- Confident, unhurried. The demo should feel like a tour, not a sales pitch.
- Never apologise for a feature being a prototype. Present everything as finished.
- Wrap each 🎙 SPEAK block's spoken text in quotation marks so the recorder
  immediately knows where the read-aloud text starts and stops.

**Total spoken words target:** ~800–1,000 words = 5–7 minutes.

---

## DOCUMENT STRUCTURE

Generate the script in this exact section order. No sections may be skipped.

---

### HEADER BLOCK

```
[CLIENT COMPANY NAME or "Any Business"] — Product Demo
Dev8X Demo Video Script — 5–7 Minute Recording
Abdul | [Month Year]
```

📌 NOTE block (shaded yellow, FFF3CC):
"Record in one take where possible. Pause freely between sections.
🖥 SCREEN = what should be visible. 👆 ACTION = what to click.
🎙 SPEAK = read word for word. Total: ~800–1,000 words = 5–7 min."

Section index line (bold Courier New, 13pt):
`00 Hook  01 [Portal 1 Name]  02 [Portal 2 Name]  03 Proof Sequence  04 Before vs After  05 Next Step`

Replace portal names with the actual names from the HTML files.

---

### 00 SECTION — Hook

**Purpose label:** The first 20 seconds — trigger RECOGNITION

⏱ TIMING: 0:00

🖥 SCREEN: Show the landing/login screen of the primary portal — the `Opening
Screen` named in the Decision Card's Demo Routing Decision.

🎙 SPEAK:
- ONE sentence naming the exact operational bottleneck this platform removes —
  specific, not generic. Use the Recognition trigger from the Decision Emotion
  Map. Example format: "[Business type] currently [specific painful manual
  process]. This platform eliminates that."
- ONE sentence on who this demo is for: the type of business, the user roles shown.
- ONE sentence on what they'll see in the next 5–6 minutes.
- No greetings. No introductions. Start with the problem.

Length: 3 sentences maximum. ~40 words.

---

### 01 SECTION — [Primary Portal Name]

**Purpose label:** Expose bottleneck → Remove manual work

⏱ TIMING: ~0:20

📌 NOTE block (shaded yellow, FFF3CC): List screens to navigate to in this section,
in order. These must follow the first 2–3 positions of the `Ordered Proof Route`
from the Decision Card. Present as a simple three-row table inside this NOTE block:

| Position | Screen Role | What It Must Prove |
|---|---|---|
| Screen 1 | Expose the bottleneck | The current problem is real and visible in the system |
| Screen 2 | Remove the manual work | The specific automation or workflow that replaces the bottleneck |
| Screen 3 | Operator usability | A daily user can navigate and use this without chaos |

🖥 SCREEN: The portal's main dashboard or overview screen.

For each screen navigated to in this section, use this exact sub-block format.
**Every sub-block must use 🖥 SCREEN, 👆 ACTION, and 🎙 SPEAK — no substitutions.**

```
👆 ACTION  [What to click — specific nav item or button name]
🖥 SCREEN  [What is now visible — screen name + 1 key element on it]
🎙 SPEAK   "[Spoken words in quotation marks]"
```

**Rules for each sub-block 🎙 SPEAK:**
- Open with the problem the screen solves (one sentence).
- Describe what is visible on screen — use the real data labels, column headers,
  or KPI names from the HTML (e.g. "the Pending Approvals queue", "the Revenue chart",
  "the Payout Queue with 3 items waiting").
- Close with the outcome: what the user can now do that they couldn't do before.
- Length: 3–5 sentences per screen.

Cover 3–5 screens maximum. Choose only the highest-impact screens that map to
the `Ordered Proof Route`. Skip screens that are similar to a screen already shown.

At the end of this section:
🎙 SPEAK: One bridging sentence (in quotation marks) transitioning to the next portal.

---

### 02 SECTION — [Secondary Portal Name]

**Purpose label:** Safe Change → Leadership visibility

⏱ TIMING: ~2:30

📌 NOTE block (shaded yellow, FFF3CC): List screens to navigate to in this section,
in order. These must follow the next positions of the `Ordered Proof Route`.
Present as a simple table inside this NOTE block:

| Position | Screen Role | What It Must Prove |
|---|---|---|
| Screen 4 | Leadership visibility | Executives can see control, accountability, and data they currently lack |
| Screen 5 | Future problem prevention | The platform handles the scale or complexity that would break current operations |
| Screen 6+ | Strategic upside | Growth, revenue, or mission-level outcomes that become possible once the bottleneck is gone |

Use the exact same sub-block format as Section 01 — `👆 ACTION`, `🖥 SCREEN`, `🎙 SPEAK`.

Cover 3–4 screens maximum. Focus on screens that serve a *different user type*
or *different workflow* from Section 01 — do not repeat functionality already shown.

---

### 03 SECTION — Proof Sequence

**Purpose label:** Prove the top 3 manual operations are eliminated

⏱ TIMING: ~4:00

🖥 SCREEN: Return to the screen that best shows the primary bottleneck being
removed — typically Screen 2 from Section 01.

🎙 SPEAK:
Walk through the top 3 manual operations from the Manual Operations Mapping
in the Problem Register. For each:

1. Name the manual task (e.g. "Right now, every new signup is tracked by hand").
2. Show the screen that replaces it (e.g. "This queue auto-captures every entry").
3. State the proof condition: what exactly is visible that proves the manual
   work is gone?

Format as a spoken list (wrap each item in quotation marks):
- `🎙 SPEAK  "Manual operation one: [task]. What you see here: [screen evidence]."`
- `🎙 SPEAK  "Manual operation two: [task]. What you see here: [screen evidence]."`
- `🎙 SPEAK  "Manual operation three: [task]. What you see here: [screen evidence]."`

Length: ~120 words spoken.

---

### 04 SECTION — Before vs After

**Purpose label:** What actually changes — and what breaks if they wait

⏱ TIMING: ~4:45

🖥 SCREEN: Return to the most impressive screen from either portal — the one with
the most visible data (dashboard, analytics, or main table).

🎙 SPEAK:
Write a clean Before vs After comparison using the real workflows extracted from
the Problem Register. Format as a spoken list, each pair as a separate 🎙 SPEAK block.

Structure:
- `🎙 SPEAK  "Before this platform: [specific manual action 1]. After: [what the platform does instead — one click or automatic]."`
- Repeat for 2–3 more workflow pairs, each as a separate 🎙 SPEAK block.

Then, trigger **Fear of Inaction** using the top future problem from the Problem Register:
- `🎙 SPEAK  "In the next 12–24 months, if nothing changes: [future problem from register]. The platform prevents this by: [preventive narrative from register]."`

Close with a single 🎙 SPEAK block:
- `🎙 SPEAK  "Every one of these was either a spreadsheet, an email chain, or a manual process. Now it's a screen. And the future problems that would break your operations at scale — they're handled before they start."`

Rules:
- Use actual screen names from the demo (e.g. "the Payout Queue", "the Campaigns table").
- Use actual numbers or volumes from the Problem Register where available.
- Do not say "saves time" or "improves efficiency" — say what specifically changes.
- Length: ~180 words spoken.

---

### 05 SECTION — Next Step

**Purpose label:** One clear CTA — no pressure — trigger MOMENTUM

⏱ TIMING: ~5:30

👆 ACTION  Switch back to the primary portal tab — show the login/landing screen.

🖥 SCREEN: Login/landing screen — clean, simple, professional close.

🎙 SPEAK:
- One sentence: what the full discovery call covers that this demo doesn't
  (customisation to their specific setup, their team roles, their workflow details).
- One sentence: what the prospect gets from a 30-minute call (a scoped plan built
  around their actual operations, not a generic quote).
- The ask: clear, low-pressure, one option only.
  Approved phrasings (adapt — do not copy verbatim):
  - `"If this looks like what you need, reply to this message and we'll set up 30 minutes."`
  - `"One conversation is all it takes to scope this for your business specifically."`
  - `"Reply to this message — I'll send over available times."`
- Final line: state your name, company, and one contact method.

Do NOT say: "I'd love to chat", "Let me know what you think", "Feel free to reach out",
or any phrase that puts the burden of enthusiasm on the prospect.

Length: ~80 words spoken.

---

### SCREEN CHECKLIST

**Label:** Pre-recording checklist — have these ready before pressing record

📌 NOTE block (shaded green, F0F8F3):

Auto-generate a checklist from the script above. For every 🖥 SCREEN and 👆 ACTION
in the script, list it as a numbered item using a proper numbered list (not unicode □):

```
1. [Portal 1] — open in browser tab, landed on [starting screen]
2. [Portal 1] — [nav item to click] panel loaded and ready
3. [Portal 1] — [next nav item] loaded and ready
...
N. [Portal 2] — open in second browser tab
N+1. Record at 1280×800 resolution, browser zoom at 100%
N+2. Test audio before starting
N+3. Rehearse once without recording
```

---

### ⚙ SECTION — Notes

**Label:** Internal reference — do not share with client

📌 NOTE block (shaded yellow, FFF3CC):

Include 3–5 📌 NOTE items covering:
- REMINDER: replace "[Client Company Name]" in Header if sending to a specific client.
- REMINDER: before sending, re-record Section 05 with the prospect's actual company name
  if the video is being personalised.
- VERIFIED: all screen names in the script match the actual nav items in the HTML files.
- VERIFIED: all screen-to-problem mappings match the Problem Register and Proof Ledger.
- VERIFIED: the `Opening Screen` and `Ordered Proof Route` match the Decision Card exactly.
- Any screen that was intentionally skipped and why (e.g. "Revenue & Fees panel skipped —
  shows internal pricing that should not be in a prospect-facing demo").

---

## DOCX GENERATION INSTRUCTIONS

Follow the SKILL.md docx instructions exactly.

### Page setup
- US Letter page size (12240 × 15840 DXA), 1-inch margins (1440 DXA each side)
- Font: Arial throughout, 12pt (size 24 in half-points) body default

### Styles
Define these paragraph styles explicitly in the `styles` block:

```javascript
styles: {
  default: { document: { run: { font: "Arial", size: 24 } } },
  paragraphStyles: [
    {
      id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
      quickFormat: true,
      run: { size: 56, bold: true, font: "Arial", color: "1a5c8a" },
      paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 0 }
    },
    {
      id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
      quickFormat: true,
      run: { size: 36, bold: true, font: "Arial", color: "2a7aaa" },
      paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 }
    },
  ]
}
```

### Annotation block rendering — CRITICAL

Every annotation block (`🖥 SCREEN`, `👆 ACTION`, `🎙 SPEAK`, `📌 NOTE`, `⏱ TIMING`)
must be rendered as a **Paragraph** (never a Table) using this exact pattern:

```javascript
// Pattern for ACTION, SCREEN, SPEAK blocks
function annotationParagraph(symbol, label, bodyText, bgColor) {
  return new Paragraph({
    shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: symbol + " " + label + "  ",
        bold: true,
        color: "1a3a5c",
        size: 22,
        font: "Arial",
      }),
      new TextRun({
        text: bodyText,
        size: 22,
        font: "Arial",
      }),
    ],
  });
}
```

Apply these colours per annotation type:

| Annotation | Symbol + Label | Background colour |
|---|---|---|
| `🖥 SCREEN` | bold navy `1a3a5c` | light blue `ddeeff` |
| `👆 ACTION` | bold navy `1a3a5c` | light green `d4f4e3` |
| `🎙 SPEAK`  | bold navy `1a3a5c` | white (no shading) |
| `📌 NOTE`   | bold navy `1a3a5c` | light yellow `FFF3CC` |
| `⏱ TIMING` | bold grey `888888`, Courier New font, size 20 | no shading |

**The 🎙 SPEAK block must have a left indent** of 360 DXA and **1.5 line spacing**
to visually separate spoken content from the stage directions:

```javascript
new Paragraph({
  indent: { left: 360 },
  spacing: { line: 360, after: 140 },
  children: [
    new TextRun({ text: "🎙 SPEAK  ", bold: true, color: "1a3a5c", size: 24, font: "Arial" }),
    new TextRun({ text: spokenText, size: 24, font: "Arial" }),
  ],
})
```

**Do NOT use indented paragraphs for ACTION or SCREEN blocks** — they sit flush
with the left margin so they read as stage directions, not spoken content.

### Purpose labels and timing

Purpose labels (italic, size 22, color "555555") appear immediately after each
section heading, on their own paragraph:

```javascript
new Paragraph({
  children: [new TextRun({ text: purposeLabel, italic: true, size: 22, color: "555555", font: "Arial" })],
  spacing: { after: 60 },
})
```

⏱ TIMING markers appear on their own line, Courier New, size 20, color "888888":

```javascript
new Paragraph({
  children: [new TextRun({ text: "⏱ " + timingText, font: "Courier New", size: 20, color: "888888" })],
  spacing: { after: 120 },
})
```

### NOTE boxes

📌 NOTE boxes use paragraph-level yellow shading (`FFF3CC`), italic body text.
**Render each line of a NOTE box as a separate shaded Paragraph** — do not use
a Table. Add a small top and bottom spacing to group them visually:

```javascript
noteLines.map((line, i) => new Paragraph({
  shading: { fill: "FFF3CC", type: ShadingType.CLEAR },
  spacing: { before: i === 0 ? 120 : 0, after: i === noteLines.length - 1 ? 120 : 40 },
  children: [
    new TextRun({ text: "📌  ", bold: true, color: "1a3a5c", size: 22, font: "Arial" }),
    new TextRun({ text: line, italic: true, size: 22, font: "Arial" }),
  ],
}))
```

### Tables inside NOTE blocks (Section 01 and 02 screen-route tables)

The screen-route table (Position | Screen Role | What It Must Prove) inside
the NOTE blocks in Sections 01 and 02 must be rendered as an actual docx Table,
nested inside the NOTE block area. Use the standard table pattern from SKILL.md
with light grey header row fill `e0e0e0` and white body rows, border color `cccccc`.
Total table width: 9360 DXA (full content width). Column widths: 1440, 3000, 4920.

### Screen checklist

Render checklist items using the `numbering` config with `LevelFormat.DECIMAL`:

```javascript
numbering: {
  config: [
    {
      reference: "checklist",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }
  ]
}
// Then each item:
new Paragraph({
  numbering: { reference: "checklist", level: 0 },
  shading: { fill: "F0F8F3", type: ShadingType.CLEAR },
  spacing: { after: 60 },
  children: [new TextRun({ text: checklistItem, size: 22, font: "Arial" })],
})
```

**Never use the □ unicode character for checklist items.**

### Section index line

Render the section index line using bold Courier New, size 26, with proper spacing:

```javascript
new Paragraph({
  spacing: { before: 120, after: 240 },
  children: [new TextRun({
    text: "00 Hook  →  01 [Portal 1]  →  02 [Portal 2]  →  03 Proof Sequence  →  04 Before vs After  →  05 Next Step",
    bold: true,
    font: "Courier New",
    size: 26,
  })],
})
```

### Header block

The header block (client name, subtitle, presenter/date) uses three separate
paragraphs — no tables:

```javascript
new Paragraph({
  children: [new TextRun({ text: "[Client] — Product Demo", bold: true, size: 48, font: "Arial" })]
}),
new Paragraph({
  children: [new TextRun({ text: "Dev8X Demo Video Script — 5–7 Minute Recording", size: 24, color: "555555", font: "Arial" })]
}),
new Paragraph({
  children: [new TextRun({ text: "Abdul | " + monthYear, size: 24, color: "555555", font: "Arial" })]
  spacing: { after: 240 }
}),
```

### Page breaks

Add `new Paragraph({ children: [new PageBreak()] })` before each numbered
section (00, 01, 02, 03, 04, 05, Screen Checklist, ⚙ Notes).

### Footer

Left side: "Dev8X — Confidential Demo Script" in Arial 18pt color "888888"
Right side: page number using `PageNumber.CURRENT`
Use tab stops with `TabStopType.RIGHT` at `TabStopPosition.MAX` to align right.

### Steps

1. Install: `npm install -g docx`
2. Write script to `/home/claude/generate_demo_pitch.js`
3. Run: `node /home/claude/generate_demo_pitch.js`
4. Validate: `python scripts/office/validate.py /home/claude/demo_pitch.docx`
5. Fix any errors, re-run
6. Copy: `cp /home/claude/demo_pitch.docx "/mnt/user-data/outputs/13_Demo_Pitch_[ClientName].docx"`
7. Call `present_files` with the output path

---

## WHAT TO ATTACH

| File | Role |
|------|------|
| `prompts/phase4_demo_scoping/p4e_Demo_Pitch.md` | This prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, Demo Routing Decision, Decision Emotion Map |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Manual Operations Mapping, Proof Ledger |
| `portals/p4d_admin.html` | Primary demo portal — screens, nav, data labels |
| `portals/p4d_partner-portal.html` | Secondary demo portal |

> The Decision Card and Problem Register are PRIMARY sources. They determine
> which screens to show and in what order. The portal HTML files provide the
> visual content. Every screen in the script must map to a Problem Register row
> and a Proof Ledger entry.
> Estimated token usage: 25k–55k.

**Save output as:** `context/p4e_Demo_Pitch_[ClientName].docx`