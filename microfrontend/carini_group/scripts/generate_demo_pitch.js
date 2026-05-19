// Demo Pitch Generator — Carini Group
// Decision-Led Proof Framework v2
// Run: node generate_demo_pitch.js

const DOCX_PATH = 'C:/Users/Arham/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/docx';
const OUTPUT_DIR = 'D:/Arham/Dev8X/TroopHunter/microfrontend/carini-group/context';
const OUTPUT_FILE = OUTPUT_DIR + '/p4e_Demo_Pitch_CariniGroup.docx';

const {
  Document, Packer, Paragraph, TextRun, PageBreak,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, AlignmentType, LevelFormat,
  TabStopType, TabStopPosition, PageNumber,
  Header, Footer, Tab, ImageRun,
} = require(DOCX_PATH);

const fs = require('fs');

// ─── COLOUR TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:    '1a3a5c',
  blue:    '2a7aaa',
  grey:    '888888',
  mid:     '555555',
  screenBg:'ddeeff',
  actionBg:'d4f4e3',
  noteBg:  'FFF3CC',
  greenBg: 'F0F8F3',
  white:   'FFFFFF',
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function heading1(text) {
  return new Paragraph({
    style: 'Heading1',
    children: [new TextRun({ text, font: 'Arial', size: 56, bold: true, color: C.navy })],
    spacing: { before: 320, after: 120 },
  });
}

function heading2(text) {
  return new Paragraph({
    style: 'Heading2',
    children: [new TextRun({ text, font: 'Arial', size: 36, bold: true, color: C.blue })],
    spacing: { before: 240, after: 80 },
  });
}

function purposeLabel(text) {
  return new Paragraph({
    children: [new TextRun({ text, italic: true, size: 22, color: C.mid, font: 'Arial' })],
    spacing: { after: 60 },
  });
}

function timing(text) {
  return new Paragraph({
    children: [new TextRun({ text: '⏱ ' + text, font: 'Courier New', size: 20, color: C.grey })],
    spacing: { after: 120 },
  });
}

// Annotation block: SCREEN (blue bg), ACTION (green bg), SPEAK (no bg, indented)
function screen(bodyText) {
  return new Paragraph({
    shading: { fill: C.screenBg, type: ShadingType.CLEAR },
    spacing: { after: 80 },
    children: [
      new TextRun({ text: '🖥 SCREEN  ', bold: true, color: C.navy, size: 22, font: 'Arial' }),
      new TextRun({ text: bodyText, size: 22, font: 'Arial' }),
    ],
  });
}

function action(bodyText) {
  return new Paragraph({
    shading: { fill: C.actionBg, type: ShadingType.CLEAR },
    spacing: { after: 80 },
    children: [
      new TextRun({ text: '👆 ACTION  ', bold: true, color: C.navy, size: 22, font: 'Arial' }),
      new TextRun({ text: bodyText, size: 22, font: 'Arial' }),
    ],
  });
}

function speak(bodyText) {
  return new Paragraph({
    indent: { left: 360 },
    spacing: { line: 360, after: 140 },
    children: [
      new TextRun({ text: '🎙 SPEAK  ', bold: true, color: C.navy, size: 24, font: 'Arial' }),
      new TextRun({ text: bodyText, size: 24, font: 'Arial' }),
    ],
  });
}

function noteLines(lines, bgColor) {
  const fill = bgColor || C.noteBg;
  return lines.map((line, i) => new Paragraph({
    shading: { fill, type: ShadingType.CLEAR },
    spacing: { before: i === 0 ? 120 : 0, after: i === lines.length - 1 ? 120 : 40 },
    children: [
      new TextRun({ text: '📌  ', bold: true, color: C.navy, size: 22, font: 'Arial' }),
      new TextRun({ text: line, italic: true, size: 22, font: 'Arial' }),
    ],
  }));
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function emptyLine() {
  return new Paragraph({ children: [new TextRun({ text: '' })], spacing: { after: 60 } });
}

// ─── SCREEN-ROUTE TABLE (for NOTE blocks in sections 01 and 02) ──────────────

function screenRouteTable(rows) {
  const headerCells = ['Position', 'Screen Role', 'What It Must Prove'].map(h =>
    new TableCell({
      shading: { fill: 'e0e0e0', type: ShadingType.CLEAR },
      width: { size: h === 'Position' ? 1440 : h === 'Screen Role' ? 3000 : 4920, type: WidthType.DXA },
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, size: 20, font: 'Arial', color: '333333' })],
      })],
    })
  );

  const dataRows = rows.map(([pos, role, proves]) =>
    new TableRow({
      children: [pos, role, proves].map((txt, ci) =>
        new TableCell({
          shading: { fill: C.white, type: ShadingType.CLEAR },
          width: { size: ci === 0 ? 1440 : ci === 1 ? 3000 : 4920, type: WidthType.DXA },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
            left: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
            right: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
          },
          children: [new Paragraph({
            children: [new TextRun({ text: txt, size: 20, font: 'Arial' })],
          })],
        })
      ),
    })
  );

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headerCells.map((c, ci) => {
          c.options = c.options || {};
          return new TableCell({
            shading: { fill: 'e0e0e0', type: ShadingType.CLEAR },
            width: { size: ci === 0 ? 1440 : ci === 1 ? 3000 : 4920, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
              left: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
              right: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
            },
            children: [new Paragraph({
              children: [new TextRun({
                text: ['Position', 'Screen Role', 'What It Must Prove'][ci],
                bold: true, size: 20, font: 'Arial', color: '333333',
              })],
            })],
          });
        }),
      }),
      ...dataRows,
    ],
  });
}

// ─── CHECKLIST ITEMS ──────────────────────────────────────────────────────────

function checklistItem(text) {
  return new Paragraph({
    numbering: { reference: 'checklist', level: 0 },
    shading: { fill: C.greenBg, type: ShadingType.CLEAR },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22, font: 'Arial' })],
  });
}

// ─── DOCUMENT ASSEMBLY ────────────────────────────────────────────────────────

const children = [];

// ── HEADER BLOCK ──────────────────────────────────────────────────────────────
children.push(
  new Paragraph({
    children: [new TextRun({ text: 'CARINI GROUP — Product Demo', bold: true, size: 48, font: 'Arial' })],
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Dev8X Demo Video Script — 5–7 Minute Recording', size: 24, color: C.mid, font: 'Arial' })],
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Abdul | May 2026', size: 24, color: C.mid, font: 'Arial' })],
    spacing: { after: 240 },
  }),
);

// Recording note
children.push(
  ...noteLines([
    'Record in one take where possible. Pause freely between sections.',
    '🖥 SCREEN = what should be visible.  👆 ACTION = what to click.',
    '🎙 SPEAK = read word for word.  Total: ~800–1,000 words = 5–7 min.',
  ])
);

children.push(emptyLine());

// Section index
children.push(
  new Paragraph({
    spacing: { before: 120, after: 240 },
    children: [new TextRun({
      text: '00 Hook  →  01 NYC Buyer\'s Guide  →  02 CRM Pipeline  →  03 Proof Sequence  →  04 Before vs After  →  05 Next Step',
      bold: true, font: 'Courier New', size: 26,
    })],
  })
);

// ── 00 HOOK ───────────────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('00 — Hook'));
children.push(purposeLabel('The first 20 seconds — trigger RECOGNITION'));
children.push(timing('0:00'));

children.push(action('Open phase0_auth.html in browser tab — show the Carini Group login/landing screen'));
children.push(screen('Authentication screen — "CARINI GROUP / New York City Real Estate" branding, tagline: "Your private gateway to New York\'s most exclusive properties," stats panel: $2.4B+ Closed Volume · 340+ Transactions · 15+ Years NYC'));
children.push(speak(
  '"A boutique NYC real estate firm with 50% international clientele is appearing on RAI, La7, and Newsmax simultaneously — and has no automated system to capture the high-net-worth leads those appearances generate. This platform eliminates that gap. In the next five minutes, you\'ll see every piece of the system that catches what media investment earns — from the first international inquiry to a fully qualified lead in the pipeline, with no manual intake from Alex."'
));

// ── 01 NYC BUYER'S GUIDE ──────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('01 — NYC Buyer\'s Guide'));
children.push(purposeLabel('Expose bottleneck → Remove manual work'));
children.push(timing('~0:20'));

children.push(
  ...noteLines([
    'Screen route for this section — follow in order:',
  ])
);
children.push(
  new Paragraph({
    shading: { fill: C.noteBg, type: ShadingType.CLEAR },
    spacing: { after: 120 },
    children: [new TextRun({ text: ' ', size: 22, font: 'Arial' })],
  })
);

// Inject the route table inside a note-styled area
children.push(screenRouteTable([
  ['Screen 1', 'Expose the bottleneck', 'Prospect has no automated intake path — this replaces the static contact form with a branded content hub'],
  ['Screen 2', 'Remove the manual work', 'Lead capture gate: structured form with International Investor option auto-routes to the CRM'],
  ['Screen 3', 'Operator usability', 'Investor quiz qualifies the lead automatically — budget, geography, goal — scored before Alex sees it'],
]));

children.push(emptyLine());

// Screen 1 — Guide Landing
children.push(heading2('Screen 1 — Guide Landing'));
children.push(action('Open lead_capture.html in browser — guide landing page is active (page-guide)'));
children.push(screen('Carini Group — NYC Buyer\'s Guide hero: three guide tabs (Buyer / Seller / Rental), headline "The NYC Buyer\'s Complete Guide," description copy, four preview items (Closing process, Financial structures, Neighborhood analysis, Market timing), "Download Free Guide →" button, and a PDF preview panel on the right'));
children.push(speak(
  '"Right now, when an Italian viewer sees Alex on RAI and searches for Carini Group, they reach a static English-only contact form — and then wait. This is what they reach instead: a branded content hub that immediately signals that this firm understands them and speaks their language. The three tabs — Buyer, Seller, Rental — tell the prospect within two seconds that Carini Group has thought about their specific situation. They click the guide download button, and the intake begins."'
));

// Screen 2 — Gate Form
children.push(emptyLine());
children.push(heading2('Screen 2 — Lead Capture Gate'));
children.push(action('Click the "Download Free Guide →" button'));
children.push(screen('Gate form (page-gate): headline "You\'re moments from expert knowledge," fields: First Name / Last Name / Email / Phone, "I Am A" dropdown (options: First-time NYC buyer, Experienced NYC buyer, International investor, Portfolio builder), Timeline dropdown (Within 3 months / 3–6 months / 6–12 months / Just researching), privacy note'));
children.push(speak(
  '"Here is where the manual intake ends. The prospect fills this form at their moment of highest intent — immediately after seeing Alex on Italian television. The \'I Am A\' dropdown includes International Investor as an option — that single selection routes this lead differently from a local buyer. Their name, email, timeline, and profile are loaded into the CRM by the time Alex finishes his current meeting. He did not write a single response. He did not triage a single message. The lead is already in the pipeline."'
));

// Screen 3 — Investor Quiz
children.push(emptyLine());
children.push(heading2('Screen 3 — Investor Profile Quiz'));
children.push(action('Click "Send Me the Guide & Take the Investor Quiz →"'));
children.push(screen('Quiz step 1 (page-quiz): progress bar at top, "Question 1 of 4 / 0% complete," question: "What best describes your primary investment goal?" Four option tiles: Long-term Wealth Building / Rental Income Generation / Lifestyle + Investment / Portfolio Diversification'));
children.push(speak(
  '"The guide is delivered — and the prospect immediately enters a four-question investor profile quiz. Their answers — investment goal, acquisition horizon, geographic location, and budget — become the lead\'s CRM record. When they select \'Europe (Italy / Spain)\' as their geography and \'$5M–$15M\' as their budget, that is a qualified international HNW lead, auto-scored and routed before Alex has finished his next call. The quiz does not feel like a form. It feels like advice — and it is giving Alex everything he would have asked in a first call, without the call."'
));

// Bridge to Section 02
children.push(emptyLine());
children.push(speak(
  '"Now let me show you the CRM that receives every one of those leads — and where Alex\'s team can see them without a briefing call from him."'
));

// ── 02 CRM PIPELINE ───────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('02 — CRM Pipeline'));
children.push(purposeLabel('Safe Change → Leadership visibility'));
children.push(timing('~2:30'));

children.push(
  ...noteLines([
    'Screen route for this section — follow in order:',
  ])
);
children.push(
  new Paragraph({
    shading: { fill: C.noteBg, type: ShadingType.CLEAR },
    spacing: { after: 120 },
    children: [new TextRun({ text: ' ', size: 22, font: 'Arial' })],
  })
);
children.push(screenRouteTable([
  ['Screen 4', 'Leadership visibility', 'Pipeline Board metrics bar shows 47 active leads, $8.4M pipeline value, 8 international buyers — all visible without a briefing call'],
  ['Screen 5', 'Future problem prevention', 'Italian lead card (Marco Rossi) shows language tag, lead score, budget, activity log — Eddie or Vivek can run this relationship without Alex'],
  ['Screen 6', 'Strategic unlock', 'Move Stage tab: automated follow-up in the client\'s preferred language within 60 seconds — Alex\'s touch preserved at scale'],
  ['Screen 7', 'Agent operating independently', 'Phase3 Agent Dashboard: agent has own KPIs (47 leads, 5 deals, $84K MTD commission) — new hire operates without Alex\'s daily oversight'],
]));
children.push(emptyLine());

// Screen 4 — Pipeline Metrics Bar
children.push(heading2('Screen 4 — Pipeline Board'));
children.push(action('Open phase1_crm_pipeline.html in a second browser tab — Pipeline Board is visible'));
children.push(screen('Carini Group CRM Pipeline — sidebar: Dashboard / Pipeline (active, badge 3) / All Leads (badge 47) / Clients / Follow-Ups (badge 5) / Listings / International / Analytics. Metrics bar across top: 47 Total Active Leads · $8.4M Pipeline Value · 12 Hot Leads (Score 8+) · 8 International Buyers · 14d Avg. Time to Offer · 5 Follow-ups Due Today. Kanban columns: Inquiry (5) · Consultation (4) · Prop. Search (6) · Viewings (5) · Offer (3) · Negotiation (3) · Contract (3) · Closed ✓ (3)'));
children.push(speak(
  '"This is what a Carini Group pipeline looks like with the system running. Forty-seven active leads. Eight point four million dollars in pipeline value. Eight of those leads are international buyers — each tagged by language, scored, and staged without Alex manually sorting a single one. The Follow-ups Due Today counter shows five — not because they were missed, but because the system knows exactly when to surface them. The international filter at the top lets Alex or any team member isolate the Italian and Spanish-language leads in one click."'
));

// Screen 5 — Lead Modal (Marco Rossi - IT)
children.push(emptyLine());
children.push(heading2('Screen 5 — Lead Profile (Marco Rossi)'));
children.push(action('Click on the lead card for Marco Rossi in the Consultation column'));
children.push(screen('Lead modal — Profile tab: Stage: Consultation · Language: 🇮🇹 Italiano · Budget: $3.2M · Neighbourhood: Upper West Side · Timeline: 60 days · Score: 9/10 · Source: Portal · Notes: "Relocating from Milan. Pre-approved. Urgent." Activity Log: "Sent property brochures for UWS listings in Italian — 1d ago"'));
children.push(speak(
  '"Here is Marco Rossi — an Italian buyer relocating from Milan, $3.2M budget, 60-day timeline, pre-approved. His preferred language is on his profile. His lead score is 9 out of 10. His activity log shows that Italian-language property brochures were already sent to him — without Alex writing a single word from scratch. When Eddie takes Marco to a showing, he has everything: budget, neighborhood preference, urgency level, and communication history — without a briefing call from Alex. That is the handoff that does not exist today."'
));

// Screen 6 — Move Stage / Auto Follow-up
children.push(emptyLine());
children.push(heading2('Screen 6 — Move Stage & Language-Matched Follow-up'));
children.push(action('Click the "Move Stage" tab in the lead modal'));
children.push(screen('Move Stage panel: stage pills — Inquiry · Consultation (current, gold) · Prop. Search · Viewings · Offer · Negotiation · Contract · Closed ✓. Note below the pills: "An automated follow-up email will be sent within 60 seconds in the client\'s preferred language."'));
children.push(speak(
  '"When any team member moves Marco from Consultation to Property Search, a follow-up email goes out in Italian within 60 seconds — in Alex\'s name, with Carini Group branding, at the exact moment the client expects to hear from the firm. Alex did not write it. Eddie did not translate it. The system preserved the Alex Carini client experience at scale. That is the only way to serve more international clients without diluting what makes this firm distinctive."'
));

// Screen 7 — Agent Dashboard
children.push(emptyLine());
children.push(heading2('Screen 7 — Agent Dashboard'));
children.push(action('Open phase3_dashboards.html — switch to the Agent view using the role switcher'));
children.push(screen('Agent Dashboard: KPI tiles — 47 Active Leads · 5 Active Deals · 8 Viewings This Week · $84K Est. Commission (MTD) · 12 Hot Leads (Score 8+). Panels below: Pipeline Overview · Today\'s Schedule · Hot Leads — Action Required. Sidebar nav: Agent Dashboard / My Leads / Deal Room / Calendar / Messages / Commissions'));
children.push(speak(
  '"When Alex hires a new agent, this is their operational home from day one. They do not need Alex to hand them a client briefing. They can see their assigned leads, their schedule, their active deals, and their commission position — all without a phone call. The Hot Leads panel surfaces the leads that need attention today, scored and sorted already. An agent who joins Carini Group this week can run their first independent deal without consuming weeks of Alex\'s time to get started."'
));

// Bridge to Section 03
children.push(emptyLine());
children.push(speak(
  '"Let me now walk through the three specific manual operations this platform replaces — the ones that are currently running through Alex\'s personal calendar."'
));

// ── 03 PROOF SEQUENCE ─────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('03 — Proof Sequence'));
children.push(purposeLabel('Prove the top 3 manual operations are eliminated'));
children.push(timing('~4:00'));

children.push(action('Return to lead_capture.html — the gate form (page-gate) is visible'));
children.push(screen('Gate form — lead capture fields with International Investor option visible in the "I Am A" dropdown'));

children.push(speak(
  '"Manual operation one: Alex personally receives, reads, and responds to every inbound inquiry from media audiences — with no triage, routing, or async path. What you see here: a branded intake form that captures name, email, profile, and timeline automatically, routes the lead to the CRM, and sends a confirmation before Alex has to open his phone."'
));

children.push(action('Switch to phase1_crm_pipeline.html — click any Italian-language lead card and open the Activity Log tab'));
children.push(screen('Activity Log tab for an Italian lead — log entry: "Sent property brochures for UWS listings in Italian · 1d ago" and "Auto-routed to Alex Carini — Italian language preference · Just now"'));
children.push(speak(
  '"Manual operation two: Alex manually composes every international prospect response in the correct language, with no saved templates and no record of what was sent. What you see here: language-tagged lead records with automated Italian-language outreach already logged — so every communication exists in writing, in the pipeline, visible to the whole team."'
));

children.push(action('Click "Move Stage" tab — show the language-matched follow-up note'));
children.push(screen('Move Stage panel — note visible: "An automated follow-up email will be sent within 60 seconds in the client\'s preferred language." Stage pills across the full Kanban column sequence.'));
children.push(speak(
  '"Manual operation three: Alex manually tracks every client relationship, deal stage, and follow-up timing through personal memory and direct communication — no shared pipeline, no handoff mechanism. What you see here: a full deal pipeline that any team member can act on — without Alex being the only person who knows where each relationship stands."'
));

// ── 04 BEFORE vs AFTER ────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('04 — Before vs After'));
children.push(purposeLabel('What actually changes — and what breaks if they wait'));
children.push(timing('~4:45'));

children.push(action('Return to phase1_crm_pipeline.html — Pipeline Board with metrics bar fully visible'));
children.push(screen('Pipeline Board — metrics bar: 47 Total Active Leads · $8.4M Pipeline Value · 8 International Buyers · 5 Follow-ups Due Today. Kanban board with all eight stages visible.'));

children.push(speak(
  '"Before this platform: every RAI or La7 viewer who reaches out waits for Alex to see a DM, answer a call, or respond to a contact form submission — during business hours, between his other meetings. After: a branded intake journey captures them at their moment of highest intent, qualifies them automatically with an investor profile quiz, and routes the lead into the pipeline before Alex\'s next available slot."'
));
children.push(speak(
  '"Before: every Italian and Spanish prospect response is written from scratch by Alex in the right language — no templates, no record of what was sent. After: an automated language-matched follow-up goes out in Italian or Spanish within 60 seconds of a stage change, under Alex\'s name and the Carini Group brand, with the communication logged in the lead\'s activity history."'
));
children.push(speak(
  '"Before: Eddie and Vivek need a briefing call from Alex before every client interaction — because deal context, budget, preferences, and timeline live in Alex\'s memory. After: every team member opens the lead card, sees the full profile and activity log, and walks into a showing or call with everything Alex would have told them."'
));
children.push(speak(
  '"In the next 12 to 24 months, if nothing changes: media appearances will continue to accelerate — and every appearance made without a capture system behind it is a promise the firm cannot yet keep. The audiences Alex earns on Italian TV will find an English-only contact form and a 48-hour response window. The platform prevents this by making the intake infrastructure scale in parallel with the media presence — so every appearance compounds into revenue, not just visibility."'
));
children.push(speak(
  '"Every one of these was either a missed lead, a manual email, or a personal briefing. Now each is a screen. And the future problems that would break Carini Group\'s operations at scale — they are handled before they start."'
));

// ── 05 NEXT STEP ──────────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('05 — Next Step'));
children.push(purposeLabel('One clear CTA — no pressure — trigger MOMENTUM'));
children.push(timing('~5:30'));

children.push(action('Switch back to the phase0_auth.html tab — show the Carini Group login/landing screen'));
children.push(screen('Authentication screen — Carini Group branding, tagline "Your private gateway to New York\'s most exclusive properties," $2.4B+ Closed Volume · 340+ Transactions · 15+ Years NYC'));
children.push(speak(
  '"What this demo does not cover is your specific setup — your lead volume, your team roles for Eddie and Vivek, the exact languages your current international pipeline speaks, and how you want to structure the commercial versus residential intake. A 30-minute discovery call gives us the specifics to configure this exactly for how Carini Group operates — not a generic template, but a scoped implementation built around your workflow. Reply to this message and I\'ll send you available times. I\'m Abdul, at Dev8X — abdulrehmandev8x@gmail.com."'
));

// ── SCREEN CHECKLIST ──────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('Screen Checklist'));
children.push(
  ...noteLines([
    'Pre-recording checklist — have these ready before pressing record',
  ], C.greenBg)
);
children.push(emptyLine());

const checklistItems = [
  'phase0_auth.html — open in Tab 1, landed on login screen (Carini Group branding visible)',
  'lead_capture.html — open in Tab 2, landed on Guide Landing (page-guide, Buyer tab active)',
  'lead_capture.html — "Download Free Guide →" button loaded and clickable',
  'lead_capture.html — Gate form (page-gate) preloaded with "International investor" option visible in "I Am A" dropdown',
  'lead_capture.html — Quiz step 1 (page-quiz) preloaded, progress bar at 0%',
  'phase1_crm_pipeline.html — open in Tab 3, Pipeline Board loaded with all 8 Kanban columns visible',
  'phase1_crm_pipeline.html — language filter set to "All Languages" (default) — reset before recording',
  'phase1_crm_pipeline.html — Marco Rossi card visible in Consultation column (IT tag, Score 9/10)',
  'phase1_crm_pipeline.html — click Marco Rossi to confirm modal loads with Profile tab active',
  'phase1_crm_pipeline.html — confirm "Move Stage" tab note reads: "automated follow-up email will be sent within 60 seconds in the client\'s preferred language"',
  'phase3_dashboards.html — open in Tab 4, Agent Dashboard loaded (role switcher on Agent)',
  'phase3_dashboards.html — confirm Agent KPI tiles visible: 47 Active Leads · 5 Active Deals · $84K Est. Commission (MTD)',
  'Record at 1280×800 resolution, browser zoom at 100%',
  'Test audio input level before starting — no echo, no background noise',
  'Rehearse once without recording — target total time 5:30–6:30',
];

checklistItems.forEach(item => children.push(checklistItem(item)));

// ── NOTES ─────────────────────────────────────────────────────────────────────
children.push(pageBreak());
children.push(heading1('⚙ Notes'));
children.push(
  ...noteLines([
    'Internal reference — do not share with client',
    '',
    'REMINDER: The header uses "CARINI GROUP" — confirm prospect name spelling before sending.',
    'REMINDER: Before sending personalised version, re-record Section 05 with the prospect\'s actual first name if known.',
    'VERIFIED: All screen names in this script match actual HTML file names and nav elements confirmed from portal source code.',
    'VERIFIED: Screen-to-problem mappings align with Problem Register (Problems #1, #2, #3, #4) and Proof Ledger (Claims A, B, C, D).',
    'VERIFIED: Opening Screen (phase0_auth.html) and Ordered Proof Route match Decision Card §7 Demo Routing Decision.',
    'SKIPPED: international_hub.html Language Switcher — multilingual UX is demonstrated through the CRM lead tags (IT/ES) and the Move Stage auto-follow-up note instead, to keep timing under 7 minutes. Show this screen if Alex specifically asks about multilingual capability.',
    'SKIPPED: investor_portfolio.html and phase2_deal_room.html — not shown in this demo; flagged as discovery questions (Problems #5 and #6 require Alex to confirm commercial pipeline and investor advisory workflows before demoing).',
    'ROI NOTE: No dollar savings figures are spoken aloud — L1 data only (50% international, 3-person team, 4 media appearances in 90 days). Specific ROI calculation is scoped in the discovery call.',
    'CONFIDENCE: Medium — all lead claims approved (Problems #1, #2, #3). Agent onboarding claim (Problem #4) shown as supporting context via Agent Dashboard — not led as a primary claim.',
  ])
);

// ─── DOCUMENT BUILD ───────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'checklist',
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: '%1.',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 },
              },
            },
          },
        ],
      },
    ],
  },
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 24 },
      },
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal',
        quickFormat: true,
        run: { size: 56, bold: true, font: 'Arial', color: C.navy },
        paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal',
        quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: C.blue },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: 'Dev8X — Confidential Demo Script', size: 18, color: C.grey, font: 'Arial' }),
                new Tab(),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 18, color: C.grey, font: 'Arial',
                }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT_FILE, buffer);
  console.log('✓ Generated: ' + OUTPUT_FILE);
}).catch(err => {
  console.error('Error generating docx:', err);
  process.exit(1);
});
