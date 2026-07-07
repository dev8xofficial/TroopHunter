const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Footer, PageNumber, ShadingType, BorderStyle
} = require("docx");
const fs = require("fs");

const NAVY = "1a3a5c";
const GRAY = "555555";
const NOTE_BG = "FFF3CC";
const ACTION_BG = "d4f4e3";
const SCREEN_BG = "ddeeff";
const WRAPPER_BG = "eef2ff";

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, bold: true, size: 56, font: "Arial" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true, size: 40, font: "Arial" })]
  });
}

function purpose(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, italics: true, size: 22, color: GRAY, font: "Arial" })]
  });
}

function timingPara(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: `⏱ TIMING  ${text}`, font: "Courier New", size: 20, color: "888888" })]
  });
}

function para(text) {
  return new Paragraph({
    spacing: { after: 100, line: 340 },
    children: [new TextRun({ text, size: 24, font: "Arial" })]
  });
}

function speakPara(text) {
  return new Paragraph({
    spacing: { after: 160, line: 360 },
    indent: { left: 360 },
    shading: { type: ShadingType.CLEAR, fill: "FFFFFF" },
    children: [
      new TextRun({ text: "🎙 SPEAK  ", bold: true, size: 24, font: "Arial", color: NAVY }),
      new TextRun({ text: `"${text}"`, size: 24, font: "Arial" })
    ]
  });
}

function actionPara(text) {
  return new Paragraph({
    spacing: { after: 80 },
    shading: { type: ShadingType.CLEAR, fill: ACTION_BG },
    children: [
      new TextRun({ text: "👆 ACTION  ", bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

function screenPara(text) {
  return new Paragraph({
    spacing: { after: 80 },
    shading: { type: ShadingType.CLEAR, fill: SCREEN_BG },
    children: [
      new TextRun({ text: "🖥 SCREEN  ", bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

function notePara(text) {
  return new Paragraph({
    spacing: { after: 100 },
    shading: { type: ShadingType.CLEAR, fill: NOTE_BG },
    children: [
      new TextRun({ text: "📌 NOTE  ", bold: true, size: 22, font: "Arial" }),
      new TextRun({ text, italics: true, size: 22, font: "Arial" })
    ]
  });
}

function wrapperBlock(lines) {
  return lines.map((text, i) => new Paragraph({
    spacing: { after: i === lines.length - 1 ? 160 : 60, line: 320 },
    shading: { type: ShadingType.CLEAR, fill: WRAPPER_BG },
    children: [new TextRun({ text, size: 24, font: "Arial" })]
  }));
}

function captionLine(text) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [new TextRun({ text, font: "Courier New", size: 20, color: "333333" })]
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 160 }, children: [] });
}

function qaLine(label, text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: `${label}  `, bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

// ─── SPOKEN CONTENT (single source of truth — script + captions read from here) ───
const BEAT1_SPEAK = "Right now, every organization joining TreeRaise needs a coach to personally reach out before they can raise a dollar. I noticed it because you're hiring your very first client-support role right now — to help take on five hundred of those calls this year.";

const BEAT2_SPEAK = "Your own thank-you page says a TreeRaiser Coach reaches out personally within one to two business days — that's a person, not a system. On the live site, the donation archive throws a 404, four campaign pages are empty shells, and two dashboards have nothing in them yet. And the Upwork listing for your new Client Specialist has them writing every client's social posts and email reminders by hand from PDF templates. None of this is a guess — it's sitting on your own public pages right now.";

const BEAT3_SPEAK = "Here's the honest boundary of what I can see from outside. I can see the manual onboarding, the broken pages, and that LinkedIn lists TreeRaise at one employee. What I can't see is whether any of that onboarding is already partly automated behind the scenes, whether those empty pages are live gaps or just staging, and whether Funds2Orgs gives you more hands than the public numbers show. Those three unknowns are exactly where the real cost is sitting — and they're the first thing worth mapping together.";

const BEAT4_SPEAK = "Even spread evenly across the year, that's about two new organizations every business day, each needing that same personal, one-to-two-day onboarding call. You've said the goal is unrestricted revenue for five hundred organizations this year. And you've written yourself that scaling faster than you can actually deliver isn't growth — it's risk that hasn't hit the books yet. Right now this onboarding queue is that exact risk, and it only grows heavier every month you get closer to the goal.";

const BEAT5_SPEAK = "This is exactly the kind of operational gap Dev8X builds systems to close. You know the inside of TreeRaise, I only see the outside — reply and tell me which of these is the real problem, and which one I got wrong. Whichever you push back on tells me what actually matters most to you right now.";

// ─── BUILD ───
const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
      }
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Dev8X — Confidential First-Touch Script", size: 18, font: "Arial", color: GRAY }),
            new TextRun({ text: "\t\t" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: GRAY })
          ]
        })]
      })
    },
    children: [

      // ══════════════════════════
      // TITLE / QA GATE
      // ══════════════════════════
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "TreeRaise — First Video", bold: true, size: 56, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Dev8X First-Touch Script — 2–3 Minute Recording", size: 26, font: "Arial", color: GRAY })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Abdul | July 2026", size: 26, font: "Arial", color: GRAY })]
      }),

      h2("Pre-Flight QA Gate — Result: PASS"),
      qaLine("Specificity:", "3 problems traced to named public sources — the thank-you page (Page 31), the live site (404 donation archive, empty campaign pages, thin dashboards), and the Upwork Client Specialist listing. Meets the 3-problem minimum."),
      qaLine("Bottleneck:", "Manual onboarding at 1-person-team scale is corroborated by three independent sources (Upwork posting, thank-you page, LinkedIn employee count) — not a single weak signal."),
      qaLine("Stakes number:", "Built only from the published 500-org goal and the confirmed manual onboarding process (Beat 2) — deliberately NOT from team headcount, since Beat 3 confesses team size/Funds2Orgs capacity as unconfirmed. Directional, not fabricated."),
      qaLine("Version guard:", "p3a_New_Outcome_Report.html confirmed as the TRIMMED hold-back version — section numbering jumps 4 → 8 (solution/ROI/timeline sections removed), and the CTA is a reply-ask (\"Did I read your operation right?\"), not a Watch-the-Demo button."),
      spacer(),

      // ══════════════════════════
      // PART 0 — DM WRAPPER & DELIVERY
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("Part 0 — The DM Wrapper & Delivery"),
      purpose("What earns the click and the watch — produced alongside the script, not read on camera"),

      h2("0.1 — Wrapper Message (sent with the video)"),
      ...wrapperBlock([
        "Wayne — we've never spoken, so this is out of the blue. I run a small dev studio (Dev8X), and I spent some time looking at how TreeRaise is set up to actually hit the 500-organization goal this year. Recorded a 3-minute read on the one gap I think matters most — no pitch, tell me if I'm wrong."
      ]),
      notePara("If unwatched after 5–7 days, send this shorter second-angle wrapper. Never more than 2 attempts."),
      ...wrapperBlock([
        "Different angle, still no pitch: the video's about the gap between your 1-person team and the 500-org goal that's on your own site. Three minutes — I'd rather you correct me than ignore me."
      ]),
      spacer(),

      h2("0.2 — Caption Transcript (burned-in, mandatory)"),
      purpose("Full spoken transcript for editing — a muted viewer must receive every beat"),
      captionLine(BEAT1_SPEAK),
      captionLine(BEAT2_SPEAK),
      captionLine(BEAT3_SPEAK),
      captionLine(BEAT4_SPEAK),
      captionLine(BEAT5_SPEAK),
      spacer(),

      h2("0.3 — Recording for Mobile (legibility)"),
      para("Do not film a continuous full-page scroll of the brief. Zoom into one element at a time, matched to the beat being spoken:"),
      notePara("Beat 1: the hero headline, then pan to the '500+ organizations' hero stat tile as that number is spoken. Beat 2: one Problem Register row at a time, in table order (onboarding → broken pages → PDF content). Beat 3: the Research Transparency table, one row/column at a time. Beat 4: the single future-risk card. Beat 5: the closing reply-ask text block."),
      notePara("Record at 1280×720 or higher. Verify the smallest on-screen text (transparency table footnotes, source tags) is legible at phone size before recording the final take."),
      spacer(),

      h2("0.4 — LinkedIn Connection Request (before the video)"),
      notePara("Send only after a warming comment on a Wayne Elsey or TreeRaise post has received engagement (a like, reply, or profile view). No pitch in the request itself — it is a handshake, not a sales letter. Wait 24–48 hours after acceptance before sending the video and wrapper message above."),

      // ══════════════════════════
      // PART A — HEADER BLOCK
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "TreeRaise — First Video", bold: true, size: 44, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Dev8X First-Touch Script — 2–3 Minute Recording", size: 24, font: "Arial", color: GRAY })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: "Abdul | July 2026", size: 24, font: "Arial", color: GRAY })]
      }),

      // ══════════════════════════
      // BEAT 1
      // ══════════════════════════
      h1("Beat 1 — Cold Open: Name His Exact Bottleneck"),
      purpose("First 20 seconds — trigger RECOGNITION"),
      timingPara("0:00"),
      screenPara("The hero of the Decision Safety Brief — headline: \"Your 2026 goals require infrastructure your platform isn't ready for yet.\""),
      speakPara(BEAT1_SPEAK),
      notePara("The disarming \"who I am / why this is cold\" context lives in the wrapper message (Part 0.1), not here — the open stays a pure problem-first hook. No greeting."),
      spacer(),

      // ══════════════════════════
      // BEAT 2
      // ══════════════════════════
      h1("Beat 2 — The Homework: His Real Problems, In His Words"),
      purpose("Prove this is not a template"),
      timingPara("~0:20"),
      actionPara("Scroll slowly down the Current Problem Register table (Section 3 of the brief), in row order: manual onboarding → broken campaign infrastructure → static PDF content. Zoom into one row at a time, matched exactly to the row being spoken."),
      screenPara("The problem table — severity badges, problem text, and business impact column visible one row at a time."),
      speakPara(BEAT2_SPEAK),
      notePara("Surveillance calibration: cite public sources by name (thank-you page, Upwork listing, live site). Never imply access to internal systems — specificity should feel like diligence, not intrusion."),
      spacer(),

      // ══════════════════════════
      // BEAT 3
      // ══════════════════════════
      h1("Beat 3 — The Honest Limit: Trust + the Bridge"),
      purpose("The most important beat — TRUST + the reason the session exists"),
      timingPara("~1:00"),
      actionPara("Zoom into the Research Transparency table (Section 3B) — hold on the \"What We'd Like to Confirm\" and \"Open Question\" columns."),
      screenPara("Research Transparency table — Claim / Evidence / What We'd Like to Confirm / Open Question columns."),
      speakPara(BEAT3_SPEAK),
      notePara("Do not name a price or a session yet. This beat is the bridge, not the ask."),
      spacer(),

      // ══════════════════════════
      // BEAT 4
      // ══════════════════════════
      h1("Beat 4 — The Stakes Number + the Regret Gap"),
      purpose("Make the cost real, then point it at his own ambition — Fear of Inaction"),
      timingPara("~1:40"),
      screenPara("One future-risk card from Section 4 — \"Client experience degrades at scale — and word spreads fast in the school and nonprofit community.\""),
      speakPara(BEAT4_SPEAK),
      notePara("Decoupling check: the stakes number is built only from the published 500-org goal and the confirmed manual, personal onboarding process (Beat 2) — deliberately NOT from team headcount, since Beat 3 explicitly flags team size / Funds2Orgs capacity as unconfirmed. Asserting 'team of one' here would contradict the honesty just established in Beat 3."),
      notePara("Tone discipline: this pressures Wayne's own stated goal and his own public standard about scaling risk (LinkedIn Post 5) — never his character. No guilt, no shame."),
      spacer(),

      // ══════════════════════════
      // BEAT 5
      // ══════════════════════════
      h1("Beat 5 — The Reply Ask"),
      purpose("One low-friction next step — a reply, not a payment. No money, no price."),
      timingPara("~2:20"),
      screenPara("Clean closing screen — the brief's reply-ask CTA: \"Did I read your operation right?\""),
      speakPara(BEAT5_SPEAK),
      notePara("The video ends here. No consultation, no price, no calendar link is mentioned — that begins only in p3c_Messaging_Playbook.md once Wayne replies."),

      // ══════════════════════════
      // INTERNAL NOTES
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("⚙ Internal Notes"),
      purpose("Do not share with client — internal reference only"),
      spacer(),
      notePara("Total spoken word count across Beats 1–5: ~350 words at a calm ~120 wpm pace ≈ 2:55 — within the 2–3 minute / 280–360 word target."),
      notePara("Confidence Signal is High per the Decision Card: stakes number is stated plainly (not hedged) and the reply ask is direct."),
      notePara("Proof-of-competence line (Beat 5 opener) uses the honest capability framing, not a fabricated case study — no prior comparable Dev8X build was attached to this prompt run."),
      notePara("Skipped per Hold-Back Rules: all solution cards, the ROI/ operational-readiness chart, and any build timeline or team/cost detail from p3a — none of it is narrated or shown on screen."),
      notePara("REMINDER: Re-record Beat 1's opening reference if this script is reused for a contact other than Wayne Elsey."),
      spacer(),
      h2("Cross-Check Fixes (this revision)"),
      notePara("FIXED — contradiction: Beat 4 previously asserted 'team of one, plus a contractor' as a hard input to the stakes math, directly contradicting Beat 3's honest confession that team size / Funds2Orgs capacity is unconfirmed. Rebuilt the stakes number to rely only on the published 500-org goal and the confirmed manual onboarding process."),
      notePara("FIXED — missing goal callback: Beat 4's regret gap only referenced Wayne's personal philosophy (LinkedIn Post 5) and skipped the Decision Card's actual Primary Goal language. Added an explicit 'unrestricted revenue for five hundred organizations' callback before the philosophy line."),
      notePara("FIXED — screen/narration desync: Beat 2's spoken problem order (onboarding, content, broken pages) did not match the Problem Register table's visual row order (onboarding, broken pages, content), which would desync a row-by-row screen recording. Reordered the spoken sentences to match the table."),
      notePara("FIXED — tone: Beat 1's 'to somehow cover five hundred of those calls' read as incredulous/snarky rather than the mandated calm, diagnostic tone. Reworded to a neutral factual observation."),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "d:\\Arham\\Dev8X\\TroopHunter\\microfrontend\\treeraise\\artifacts\\p3b_First_Video_Script_TreeRaise.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ First Video Script DOCX generated:");
  console.log(outPath);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
