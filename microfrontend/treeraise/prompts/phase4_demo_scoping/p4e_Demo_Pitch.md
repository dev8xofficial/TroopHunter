You are a senior technical sales consultant at Dev8X writing a product demo video script.

Your task is to read the attached HTML demo files and business context, then generate a
**Product Demo Video Pitch Script** as a `.docx` file. This script is read aloud by Abdul
while screen-recording a 5–7 minute walkthrough of the live demo portals. The video is
sent to a prospect CEO in the first outreach touchpoint to move them from curious to
wanting a full discovery call.

This is NOT a proposal pitch. Do not cover team, timeline, cost, or billing.
This is a product demo — every section shows a screen, explains the problem it solves,
and makes the prospect feel the value before they've spoken to anyone.

---

## WHAT TO READ FIRST

### From the attached HTML demo files, extract:

For each HTML file (portal):
- Portal name (from `<title>` or top brand mark)
- All sidebar navigation sections and nav item labels
- All panel/page IDs and what they contain (stats, tables, charts, forms)
- Key data points visible (KPIs, badges, chart labels, table column headers)
- Any interactive elements worth clicking during a demo (modals, filters, action buttons)
- The "wow" screens — the ones that show the most impressive functionality

### From the attached business context files, extract:

- What the business does and who their customers are
- The manual workflows that currently exist (from the Operations Manual)
- The specific pain points each portal screen directly solves
- Any metrics or volumes that make the automation impact feel concrete

**Mapping rule:** For every screen you plan to demo, write one sentence linking it
to a specific current pain point from the business context. If no pain point maps
cleanly, skip that screen. Only demo screens that solve a real identified problem.

Do not start writing the script until this mapping is complete internally.

---

## SCRIPT FORMAT RULES

Use exactly the same annotation system as the Proposal Pitch document:

| Symbol | Meaning |
|--------|---------|
| `🖥 SCREEN` | What is visible on screen at this moment |
| `🎙 SPEAK` | Words to read aloud verbatim |
| `👆 ACTION` | Specific click, scroll, or hover to perform |
| `📌 NOTE` | Internal note for the recorder — do not read aloud |
| `⏱ TIMING` | Approximate elapsed time marker |

**Tone rules for all SPEAK blocks:**
- Open every screen reveal with the problem, not the feature.
  Wrong: "This is the Campaign Dashboard."
  Right: "Right now, tracking how each campaign is performing means checking three
  separate spreadsheets. This screen replaces all of that."
- Plain English throughout. One idea per sentence.
- First person singular: "I", "I'll", "I've" — never "Abdul" or third person.
- No filler: no "So basically", "As you can see", "Pretty cool right".
- Confident, unhurried. The demo should feel like a tour, not a sales pitch.
- Never apologise for a feature being a prototype. Present everything as finished.

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

📌 NOTE block (shaded yellow):
"Record in one take where possible. Pause freely between sections.
🖥 SCREEN = what should be visible. 👆 ACTION = what to click.
🎙 SPEAK = read word for word. Total: ~800–1,000 words = 5–7 min."

Section index line (bold):
`00 Hook  01 [Portal 1 Name]  02 [Portal 2 Name]  03 Before vs After  04 Next Step`

Replace portal names with the actual names from the HTML files.

---

### 00 SECTION — Hook

**Purpose label:** The first 20 seconds — make them keep watching

⏱ TIMING: 0:00

🖥 SCREEN: Show the landing/login screen of the primary portal (most impressive one first).

🎙 SPEAK:
- ONE sentence stating the exact business problem this platform solves — specific, not generic.
  Example format: "[Business type] currently [specific painful manual process]. This platform
  eliminates that."
- ONE sentence on who this demo is for: the type of business, the user roles shown.
- ONE sentence on what they'll see in the next 5–6 minutes.
- No greetings. No introductions. Start with the problem.

Length: 3 sentences maximum. ~40 words.

---

### 01 SECTION — [Primary Portal Name]

**Purpose label:** [What this portal does in one phrase]

⏱ TIMING: ~0:20

📌 NOTE block: List 3–5 screens to navigate to in this section, in order.

🖥 SCREEN: The portal's main dashboard or overview screen.

For each screen navigated to in this section, use this exact sub-block format:

```
👆 ACTION [What to click — specific nav item or button name]
🖥 SCREEN [What is now visible — screen name + 1 key element on it]
🎙 SPEAK [Problem this screen solves → what it shows → why it matters]
```

**Rules for each sub-block SPEAK:**
- Open with the problem the screen solves (one sentence).
- Describe what is visible on screen — use the real data labels, column headers,
  or KPI names from the HTML (e.g. "the Pending Approvals queue", "the Revenue chart",
  "the Payout Queue with 3 items waiting").
- Close with the outcome: what the user can now do that they couldn't do before.
- Length: 3–5 sentences per screen.

Cover 3–5 screens maximum. Choose only the highest-impact screens.
Skip screens that are similar to a screen already shown.

At the end of this section:
🎙 SPEAK: One bridging sentence transitioning to the next portal.

---

### 02 SECTION — [Secondary Portal Name]

**Purpose label:** [What this portal does in one phrase]

⏱ TIMING: ~2:30

📌 NOTE block: List 3–4 screens to navigate to in this section, in order.

Use the exact same sub-block format as Section 01.

Cover 3–4 screens maximum. Focus on screens that serve a *different user type*
or *different workflow* from Section 01 — do not repeat functionality already shown.

---

### 03 SECTION — Before vs After

**Purpose label:** What actually changes for this business

⏱ TIMING: ~4:30

🖥 SCREEN: Return to the most impressive screen from either portal — the one with the
most visible data (dashboard, analytics, or main table).

🎙 SPEAK:
Write a clean Before vs After comparison using the real workflows extracted from the
business context files. Format as a spoken list — NOT bullet points on screen.

Structure:
- "Before this platform: [specific manual action 1]."
- "After: [what the platform does instead — one click or automatic]."
- Repeat for 2–3 more workflow pairs.
- Close with: "Every one of these was either a spreadsheet, an email chain, or a
  manual process. Now it's a screen."

Rules:
- Use actual screen names from the demo (e.g. "the Payout Queue", "the Campaigns table").
- Use actual numbers or volumes from the business context where available.
- Do not say "saves time" or "improves efficiency" — say what specifically changes.
- Length: ~150 words spoken.

---

### 04 SECTION — Next Step

**Purpose label:** One clear CTA — no pressure

⏱ TIMING: ~5:30

🖥 SCREEN: Show the login/landing screen again — clean, simple, professional close.

🎙 SPEAK:
- One sentence: what the full discovery call covers that this demo doesn't
  (customisation to their specific setup, their team roles, their workflow details).
- One sentence: what the prospect gets from a 30-minute call (a scoped plan built
  around their actual operations, not a generic quote).
- The ask: clear, low-pressure, one option only.
  Approved phrasings (adapt — do not copy verbatim):
  - "If this looks like what you need, reply to this message and we'll set up 30 minutes."
  - "One conversation is all it takes to scope this for your business specifically."
  - "Reply to this message — I'll send over available times."
- Final line: state your name, company, and one contact method.

Do NOT say: "I'd love to chat", "Let me know what you think", "Feel free to reach out",
or any phrase that puts the burden of enthusiasm on the prospect.

Length: ~80 words spoken.

---

### SCREEN CHECKLIST

**Label:** Pre-recording checklist — have these ready before pressing record

📌 NOTE block (shaded yellow):

Auto-generate a checklist from the script above. For every 🖥 SCREEN and 👆 ACTION
in the script, list it as a numbered item:

```
□ 1. [Portal 1] — open in browser tab, landed on [starting screen]
□ 2. [Portal 1] — [nav item to click] panel loaded and ready
□ 3. [Portal 1] — [next nav item] loaded and ready
...
□ N. [Portal 2] — open in second browser tab
□ N+1. Record at 1280×800 resolution, browser zoom at 100%
□ N+2. Test audio before starting
□ N+3. Rehearse once without recording
```

---

### ⚙ SECTION — Notes

**Label:** Internal reference — do not share with client

📌 NOTE block:

Include 3–5 📌 NOTE items covering:
- REMINDER: replace "[Client Company Name]" in Header if sending to a specific client.
- REMINDER: before sending, re-record Section 04 with the prospect's actual company name
  if the video is being personalised.
- VERIFIED: all screen names in the script match the actual nav items in the HTML files.
- VERIFIED: all Before vs After items are traceable to pain points in the business context.
- Any screen that was intentionally skipped and why (e.g. "Revenue & Fees panel skipped —
  shows internal pricing that should not be in a prospect-facing demo").

---

## DOCX GENERATION INSTRUCTIONS

Follow the SKILL.md docx instructions exactly. Match the visual style of the
Proposal Pitch document:

- US Letter page size (12240 × 15840 DXA), 1-inch margins
- Font: Arial throughout, 12pt body
- Section headings: HeadingLevel.HEADING_1, bold, size 28
- Sub-section headings (screen sub-blocks): HeadingLevel.HEADING_2, bold, size 22
- Purpose labels: italic, size 22, color "555555"
- Timing markers (⏱): Space Mono / Courier New font, size 11, color "888888"
- Annotation labels (🖥 SCREEN, 🎙 SPEAK, 👆 ACTION, ⏱ TIMING):
  Bold label in dark navy "1a3a5c" + normal body text, each on its own paragraph
- 📌 NOTE boxes: shading fill "FFF3CC" (light yellow), ShadingType.CLEAR, italic body text
- Screen checklist boxes: shading fill "F0F8F3" (light green), ShadingType.CLEAR
- Section index line (Header): bold, Courier New font, size 13
- Never use unicode bullets — use LevelFormat.BULLET for any lists
- Add a PageBreak before each numbered section (00, 01, 02, 03, 04)
- Footer: left — "Dev8X — Confidential Demo Script", right — page number

**Steps:**
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
| `prompts/13_Demo_Pitch.md` | This prompt |
| `admin.html` or primary portal HTML | Primary demo portal — screens, nav, data labels |
| `partner-portal.html` or secondary portal HTML | Secondary demo portal |
| `context/4_Business_Operations_Manual.docx` | Pain points and workflows for Before vs After |

> Attach the HTML files Claude will actually screen-record. The Operations Manual
> provides the business context needed to frame each screen as a problem-solution moment.
> If the Operations Manual is not yet generated, attach `context/1_Website.md` and
> `context/2a_Company.md` as a fallback.
> Estimated token usage: 25k–55k.

**Save output as:** `context/13_Demo_Pitch_<ClientName>.docx`
