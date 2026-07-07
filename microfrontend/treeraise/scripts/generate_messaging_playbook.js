const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Footer, PageNumber, ShadingType
} = require("docx");
const fs = require("fs");

const NAVY = "1a3a5c";
const GRAY = "555555";
const NOTE_BG = "FFF3CC";
const MSG_BG = "EBF3FB";

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, bold: true, size: 52, font: "Arial" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true, size: 38, font: "Arial" })]
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial", color: NAVY })]
  });
}

function purpose(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, italics: true, size: 22, color: GRAY, font: "Arial" })]
  });
}

function para(text) {
  return new Paragraph({
    spacing: { after: 100, line: 320 },
    children: [new TextRun({ text, size: 23, font: "Arial" })]
  });
}

function qaLine(label, text, checked) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: `${checked ? "☑" : "☐"} ${label}  `, bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

// One shaded, copy-ready block. Accepts an array of paragraph strings rendered
// as one visually grouped card (per DOCX GENERATION INSTRUCTIONS: "one block
// per message/branch, ready to copy and send").
function messageBlock(label, lines) {
  const out = [];
  if (label) {
    out.push(new Paragraph({
      spacing: { after: 40 },
      shading: { type: ShadingType.CLEAR, fill: MSG_BG },
      children: [new TextRun({ text: label, bold: true, size: 20, font: "Arial", color: NAVY })]
    }));
  }
  lines.forEach((text, i) => {
    out.push(new Paragraph({
      spacing: { after: i === lines.length - 1 ? 140 : 80, line: 320 },
      indent: { left: 180, right: 180 },
      shading: { type: ShadingType.CLEAR, fill: MSG_BG },
      children: [new TextRun({ text, size: 23, font: "Arial" })]
    }));
  });
  return out;
}

function notePara(text) {
  return new Paragraph({
    spacing: { after: 100 },
    shading: { type: ShadingType.CLEAR, fill: NOTE_BG },
    children: [
      new TextRun({ text: "📌 NOTE  ", bold: true, size: 21, font: "Arial" }),
      new TextRun({ text, italics: true, size: 21, font: "Arial" })
    ]
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 140 }, children: [] });
}

// ─── QUOTED VERBATIM FROM THE FINALIZED p3b VIDEO SCRIPT (Alignment Rule) ───
const VIDEO_STAKES_CORE = "even spread evenly across the year, that's about two new organizations every business day, each needing that same personal, one-to-two-day onboarding call";
const VIDEO_STAKES_GOAL_TIEBACK = "the exact pace behind the goal of unrestricted revenue for five hundred organizations this year";
const VIDEO_PROOF_LINE = "This is exactly the kind of operational gap Dev8X builds systems to close.";
const VIDEO_REPLY_ASK = "You know the inside of TreeRaise, I only see the outside — reply and tell me which of these is the real problem, and which one I got wrong.";

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
            new TextRun({ text: "Dev8X — Confidential Messaging Playbook", size: 18, font: "Arial", color: GRAY }),
            new TextRun({ text: "\t\t" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: GRAY })
          ]
        })]
      })
    },
    children: [

      // ══════════════════════════
      // TITLE + ALIGNMENT RULE CHECKLIST
      // ══════════════════════════
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "TreeRaise — Messaging & Objection-Handling Playbook", bold: true, size: 52, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Dev8X Stage 2 (Messaging) — Consultancy Pipeline", size: 26, font: "Arial", color: GRAY })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Abdul | July 2026", size: 26, font: "Arial", color: GRAY })]
      }),

      h2("Pre-Flight Check — Alignment Rule"),
      qaLine("p3b attached & finalized:", "p3b_First_Video_Script_TreeRaise.docx confirmed as the finalized, actually-recorded version (contains a \"Cross-Check Fixes\" revision log — not a draft).", true),
      qaLine("Extraction done from p3b, not re-derived:", "Stakes number, the 3 problems (in order), and the proof-of-competence line below are copied verbatim from that finalized script.", true),
      qaLine("[CONSULTATION_FEE] left as placeholder:", "No fee has been set for this engagement yet — left as a literal placeholder throughout, per instructions.", false),
      spacer(),

      h3("Quoted verbatim from the finalized video (reference — do not alter)"),
      notePara(`Stakes number (Beat 4): "${VIDEO_STAKES_CORE}." Tied to the goal in the same beat: "You've said the goal is unrestricted revenue for five hundred organizations this year," and to Wayne's own words: "scaling faster than you can actually deliver isn't growth — it's risk that hasn't hit the books yet." This is a workload-rate figure, NOT a dollar figure — no dollar stakes number was spoken in the video, so none is invented here.`),
      notePara("The 3 problems named in Beat 2, in order: (1) manual onboarding — a TreeRaiser Coach reaches out personally within one to two business days [thank-you page]; (2) broken campaign infrastructure — donation archive 404, four empty campaign pages, two empty dashboards [live site]; (3) static PDF content — the new Client Specialist writes every client's social posts and email reminders by hand from PDF templates [Upwork listing]."),
      notePara(`Proof of competence (Beat 5 opener): "${VIDEO_PROOF_LINE}"`),
      notePara(`Reply ask (Beat 5 close): "${VIDEO_REPLY_ASK} Whichever you push back on tells me what actually matters most to you right now."`),
      notePara("Confidence Signal (Decision Card): High. Strongest emotional lever (Decision Card §10): Fear of Inaction. Stakeholder Decision Map (Problem Register): Wayne Elsey decides; Judith Camacho (CFO/COO) most likely to scrutinize cost; Courtney Eaton (President) most likely to weigh brand/reputation risk — relevant to Branch P."),
      notePara("Problems in the Problem Register NOT used in the video (available context for Branch O, never introduced unprompted): no self-serve campaign launch tools; the 1-employee team-capacity problem itself; collapsed/unrendered FAQ content; the donation-receipt error-state edge case. Future problems: client-experience degradation at scale, founder operational drag, competitive catch-up."),

      // ══════════════════════════
      // B.1 — LINEAR PATH
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("B.1 — The Linear Path (Happy Path)"),
      para("Video reply arrives → Message 1 (qualify, no pitch) → Message 2 (paid consultation offer) → agreement → schedule + payment → hand off to p3d_Consultation_Playbook.md."),
      spacer(),

      h2("Message 1 — Sent immediately when Wayne replies"),
      purpose("Reward the reply, deepen rapport, qualify. No pitch. No request for internal numbers — that's the paid session's deliverable."),
      ...messageBlock("MESSAGE 1", [
        "Appreciate you writing back, Wayne — [specific reference to what he said in his reply]. Quick question: of the three things I flagged — the manual onboarding, the broken campaign pages, or the hand-built social content — which one is actually costing you the most day-to-day?"
      ]),
      notePara("Value hold-back: do not ask for conversion rate, campaign volume, or hours-per-onboarding here — capturing those L1 numbers is exactly what the paid session sells."),
      spacer(),

      h2("Message 2 — The consultation offer (after he answers Message 1)"),
      purpose("Seven elements, in order: Reframe → Stakes Tie-Back → Guarantee → Proof of Competence → Legitimacy → Price → Ask."),
      ...messageBlock("MESSAGE 2", [
        "What I'd normally do next is a working session — about 45 minutes — where I walk through everything I found alongside the real numbers only you have. You walk away with a documented operational diagnosis of the onboarding bottleneck, yours to keep either way.",
        `Here's why the timing matters: ${VIDEO_STAKES_CORE} — ${VIDEO_STAKES_GOAL_TIEBACK}, and it only gets heavier the closer you get to it. The session is where that gets pinned down against your real numbers instead of my outside estimate.`,
        "If you don't walk away with something worth more than the fee, you don't pay. You decide that, not me — and the documented diagnosis is yours to keep either way.",
        VIDEO_PROOF_LINE,
        "Dev8X is a registered studio — payment runs through a proper invoice, not a personal transfer.",
        "The session is [CONSULTATION_FEE]. Against an onboarding queue already running at two organizations a day on a one-person team, it's a small way to know exactly where you stand before the gap gets more expensive to close.",
        "If that sounds right, reply and I'll send over a couple of time options."
      ]),
      notePara("Fee Anchoring calibration: Confidence Signal is High, so the fee is stated plainly with no softening (per Confidence Signal Adjustments). However, the rule to raise the fee toward the higher end requires BOTH High confidence AND a strong proof of competence — the proof-of-competence line used here is the honest generic-capability framing (no specific comparable Dev8X result was attached to this engagement). So [CONSULTATION_FEE] should still be set toward the lower-but-credible end, not the top of the range, until a stronger case study exists to cite."),
      spacer(),

      h2("Message 3 — Soft follow-up if no reply after Message 2"),
      purpose("Timing: 3–4 days after Message 2. Maximum ONE send."),
      ...messageBlock("MESSAGE 3", [
        "No pressure at all — just wanted to circle back, Wayne. The onboarding bottleneck isn't going anywhere, and the guarantee still stands — if the session isn't worth more than the fee, you don't pay. Either way, happy to leave it here if the timing's off."
      ]),
      notePara("If no reply after this: STOP. Re-engage in 90 days with a fresh industry insight, not about TreeRaise specifically."),

      // ══════════════════════════
      // B.2 — WAR-GAME MATRIX
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("B.2 — The War-Game Matrix"),
      purpose("Every branch personalized to TreeRaise; any reference to the video or the stakes figure quotes the finalized script exactly."),

      h3("Branch A — Correction: \"You got it wrong\""),
      para("Beat 5 explicitly invited correction. Thank him, do not defend, absorb and recompute."),
      ...messageBlock(null, [
        "Appreciate you saying that, Wayne — genuinely, that's useful, not annoying.",
        "That's exactly why doing this properly matters — from outside I'll always have blind spots on the details. The session is where my read gets replaced with your real numbers."
      ]),
      notePara("If the correction guts the whole diagnosis (\"we don't even do that\"): do NOT push the offer. Send only: \"Got it — thanks for setting me straight. Out of curiosity, what is actually slowing you down day-to-day right now?\" Leave the door open."),
      spacer(),

      h3("Branch B — Silent Watcher: watched, no reply (the modal outcome)"),
      para("ONE touch only, 4–6 days after the video."),
      ...messageBlock(null, [
        "No need to reply to the video, Wayne — one quick question: is the manual onboarding actually what's standing between TreeRaise and the 500-org goal, or am I off?"
      ]),
      spacer(),

      h3("Branch C — Didn't Watch: video not opened"),
      para("5–7 days later."),
      ...messageBlock(null, [
        "Not sure if the video came through — it's a 3-minute look at how the manual, one-on-one onboarding process might be the thing standing between TreeRaise and the 500-org goal this year. Thought it was worth flagging. Either way, no pressure."
      ]),
      notePara("If still no watch after the second wrapper attempt (see p3b Part 0.1): stop. Re-engage in 90 days with a fresh industry insight, not the original video."),
      spacer(),

      h3("Branch D — \"Not Interested\""),
      ...messageBlock(null, [
        "Completely fair. If anything changes down the line, the research I did on TreeRaise is still valid — happy to pick it back up anytime. Wishing you well hitting the 500-org goal."
      ]),
      notePara("Graceful, immediate exit. No persuasion. Re-engage in 90 days ONLY with a general industry insight, not about TreeRaise."),
      spacer(),

      h3("Branch E — \"Too Busy Right Now\""),
      ...messageBlock(null, [
        "Totally understand — timing matters more than anything. When would be a better time to revisit? Happy to circle back whenever makes sense for you."
      ]),
      notePara("If he gives a time: schedule it, follow up exactly then. If not: 60-day check-in with one industry observation."),
      spacer(),

      h3("Branch F — \"What's This Going to Cost Me?\""),
      para("A buying signal disguised as an objection. Do not quote the fee here — bridge to Message 2."),
      ...messageBlock(null, [
        "The video and the research I've done are free — no cost to reply. If we end up doing a working session together, there's a fee, but it comes with a guarantee: if you don't walk away with something worth more than the fee, you don't pay. Happy to explain more if you're curious."
      ]),
      spacer(),

      h3("Branch G — \"Send Me More Info\""),
      ...messageBlock(null, [
        "Happy to — I've attached the research brief I built for TreeRaise. It's a one-page summary of what I found on the onboarding bottleneck and the platform gaps. Take a look and let me know if anything stands out."
      ]),
      notePara("Send p3a_New_Outcome_Report.html + a one-paragraph summary, not everything. Follow up in 3–4 days: \"Did anything in the brief surprise you, Wayne, or did it match what you're already seeing?\""),
      spacer(),

      h3("Branch H — \"I Already Have a Developer / Agency\""),
      ...messageBlock(null, [
        "That's great — this isn't about replacing anyone. The research I did might actually be useful context for whoever handles TreeRaise's tech. Happy to share it with them or with you directly."
      ]),
      notePara("No follow-up unless he re-engages — this often converts 3–6 months later if the current provider disappoints."),
      spacer(),

      h3("Branch I — \"Too Expensive\" (after Message 2)"),
      ...messageBlock(null, [
        `I hear you. The way I think about it: right now the onboarding queue is already running at roughly two new organizations a day needing that same personal setup call — ${VIDEO_STAKES_GOAL_TIEBACK} — and it only gets heavier from here. The session fee is [CONSULTATION_FEE], and if it doesn't surface something worth more than that, you keep the diagnosis and don't pay. The risk is genuinely on my side.`
      ]),
      notePara("If still no: \"Completely understand. The offer and the research stay valid. If the goal timeline changes or the bottleneck gets worse, I'm here.\" Never discount — anchor against the stakes, not competitors."),
      spacer(),

      h3("Branch J — \"I Want a Free Call Instead\""),
      ...messageBlock(null, [
        "I get it — paying a stranger feels like a risk, and I respect that. The guarantee exists for exactly that reason: if the session doesn't earn its fee, you keep the diagnosis and pay nothing. You decide, not me.",
        "That said, if you'd like a quick 15-minute call just to see if this is worth your time, I'm happy to do that first. No diagnosis in that call — just a fit check."
      ]),
      notePara("Hold the paid consultation as the default value delivery; the 15-minute fit check is a concession, offered only if Wayne is clearly interested but stuck on trust."),
      spacer(),

      h3("Branch K — \"Let Me Think About It\""),
      ...messageBlock(null, [
        "Of course — it's a real decision and I respect that. One thing to sit with: the onboarding queue is already running at roughly two new organizations a day needing a personal setup call, and that pace only gets heavier every month you're closer to five hundred. The session is designed to pin the real cost of that down against your actual numbers. Either way, no rush."
      ]),
      notePara("Follow up in 5–7 days: \"Hey Wayne — just checking in. Any questions I can answer? Happy to help you think it through.\" If still no reply: stop. 90-day re-engagement."),
      spacer(),

      h3("Branch L — \"Can You Send References?\""),
      ...messageBlock(null, [
        "We're a focused studio, so the reference list is still growing — I can walk you through our recent work and the results we've delivered instead. The guarantee also means you're not taking my word for it: if the session doesn't deliver, you don't pay."
      ]),
      spacer(),

      h3("Branch M — \"Can You Show Me Examples of Your Work?\""),
      ...messageBlock(null, [
        "Happy to. We're selective about what we take on, so the portfolio is growing — but the Decision Safety Brief I already sent you is itself a sample of how we work: deep research before any build, not the other way around. And the guarantee means you're not risking anything on the session itself."
      ]),
      spacer(),

      h3("Branch N — \"Who Are You?\" / \"How Did You Find Me?\""),
      ...messageBlock(null, [
        "I run Dev8X — a small development studio that builds web platforms and automation systems for businesses. I came across TreeRaise through your LinkedIn company page and the 2026 goals you've published — five hundred organizations and 125,000 trees is a big jump from where the platform looks today, and that gap is what caught my attention. I don't do mass outreach — I research one business at a time and only reach out if I find something worth flagging. The video is the result of that."
      ]),
      notePara("Always honest about the discovery path. Never say \"our algorithm found you\" or anything that sounds automated — this is a trust-check."),
      spacer(),

      h3("Branch O — \"Actually, Our Real Problem Is [Something Different]\""),
      ...messageBlock(null, [
        "That's really useful to know, Wayne — from outside, the onboarding process looked like the main bottleneck, but if that's what's actually costing you, that changes the picture. Can you tell me more about how it's affecting things day-to-day?"
      ]),
      notePara("If solvable with web/automation: bridge to the consultation with the updated framing. If not (hiring, management, compliance): \"That sounds more like a hiring / operations / management challenge than a systems one. I don't want to force a tech solution where it doesn't fit. If there's a web or automation angle to it, I'd love to explore that — but if not, I'd rather be straight about it.\""),
      notePara("If what he names is already in the Problem Register but wasn't used in the video — no self-serve campaign builder, the FAQ content gap, the donation-receipt error state, or the team-of-one capacity problem itself — treat it as confirming research, not a contradiction, and fold it into the follow-up question."),
      spacer(),

      h3("Branch P — \"I Need to Check With My Partner / Board / CTO\""),
      ...messageBlock(null, [
        "Of course — that makes sense. Would it help if I put together a short summary they can review? One page covering what I found and what the session would cover. That way they have context before you discuss it."
      ]),
      notePara("If yes: one-page summary — headline, the 3 problems from the video, the stakes figure, what the session delivers. Keep it forwardable. Per the Stakeholder Decision Map, if Wayne names Judith Camacho (CFO/COO), weight the summary toward cost-safety and the guarantee; if he names Courtney Eaton (President), weight it toward brand/reputation safety."),
      notePara("If \"I'll just tell them\": \"Got it. If any questions come up, happy to jump on a quick call with both of you — sometimes it's easier to hear it directly.\" Follow up in 5–7 days: \"Did you get a chance to discuss with the team? Any questions I can help with?\" Never pressure a multi-stakeholder decision."),
      spacer(),

      h3("Branch Q — \"We're Already In a Contract With Someone Until [Date]\""),
      ...messageBlock(null, [
        "That's totally fair — no point in doubling up. When does that wrap up? I'm happy to reconnect closer to that date. The research I've done on TreeRaise stays valid, and we can pick up right where we left off."
      ]),
      notePara("Note the end date; set a reminder for 30 days before. Re-engage then with a fresh insight, not just \"your contract is ending.\""),
      spacer(),

      h3("Branch R — Prospect Forwards to Someone Else"),
      para("A positive signal — always encourage it."),
      ...messageBlock(null, [
        "Absolutely — please do. If it's helpful, I can send them a short summary that gives context without needing the full video. And if they have questions, I'm happy to jump on a quick call with both of you."
      ]),
      spacer(),

      h3("Branch S — Free Consulting Extraction"),
      para("Detection signals: repeated detailed questions after Message 1 with no movement toward Message 2; questions asking for the session's actual deliverables."),
      ...messageBlock(null, [
        "Great question — that's exactly the kind of thing the session is built to answer properly. I could give you a quick take here, but the honest answer is it depends on your real numbers, and I'd rather give you the right answer than a fast one. That's what the session is for."
      ]),
      notePara("If it continues: \"I want to give you a proper answer, not a corridor one. The session is where I can do that.\" Then stop answering substantive questions."),

      // ══════════════════════════
      // B.3 — TIMING SUMMARY
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("B.3 — Timing Summary & Exit Criteria"),
      h3("Message / Touch Timing"),
      para("Message 1 — immediate, on reply to the video."),
      para("Message 2 — immediate, once he answers Message 1."),
      para("Message 3 — 3–4 days after Message 2, if no reply."),
      para("Silent-Watcher Touch (Branch B) — 4–6 days after the video, watched with no reply."),
      para("90-Day Re-engagement — for all paths that end, with a fresh industry insight."),
      spacer(),
      h3("Exit Criteria"),
      para("One silent-watcher touch, no reply → stop, 90-day re-engagement."),
      para("Message 3 sent, no reply → stop, 90-day re-engagement."),
      para("Explicit \"not interested\" → stop immediately, 90-day re-engagement."),
      para("Correction that guts the diagnosis → acknowledge, ask one question, stop."),
      para("Three total unanswered messages across all branches → stop."),
      para("Prospect agrees to the consultation → hand off to p3d_Consultation_Playbook.md — do NOT generate it before this point."),
      notePara("The universal rule: if continuing feels like chasing, stop. Pressure destroys the relationship for any future contact. Dev8X's edge is depth and trust — not persistence and volume."),

      // ══════════════════════════
      // CONFIDENCE SIGNAL ADJUSTMENTS
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("Confidence Signal Adjustments"),
      para("Confidence Signal (Decision Card): High → Message 2's fee is stated confidently, with no softening."),
      notePara("Reminder: raising the fee toward the top of a credible range requires BOTH High confidence AND a strong proof of competence. Confidence is High here, but the proof-of-competence line is the honest generic-capability framing, not a specific comparable result — so [CONSULTATION_FEE] should still be set toward the lower-but-credible end of the range for this engagement."),

      // ══════════════════════════
      // WHAT TO ATTACH / SOURCES
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("Sources Used"),
      para("p3b_First_Video_Script_TreeRaise.docx — PRIMARY for the stakes number, the 3 problems, the proof-of-competence line, and the reply ask."),
      para("p0a_Decision_Card_TreeRaise.md — Confidence Signal, Decision Emotion Map, general Stakeholder context."),
      para("p0b_Problem_Register_TreeRaise.md — problems not used in the video (Branch O), Stakeholder Decision Map detail (Branch P), Proof Ledger."),
      para("p3a_New_Outcome_Report.html — the Decision Safety Brief attached on Branch G."),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "d:\\Arham\\Dev8X\\TroopHunter\\microfrontend\\treeraise\\artifacts\\p3c_Messaging_Playbook_TreeRaise.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ Messaging Playbook DOCX generated:");
  console.log(outPath);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
