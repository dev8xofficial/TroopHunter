const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Footer, PageNumber, ShadingType
} = require("docx");
const fs = require("fs");

const NAVY = "1a3a5c";
const GRAY = "555555";
const NOTE_BG = "FFF3CC";
const CHECK_BG = "F0F8F3";
const MINT = "d4f4e3";

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
    children: [new TextRun({ text, bold: true, size: 44, font: "Arial" })]
  });
}

function purpose(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, italics: true, size: 22, color: GRAY, font: "Arial" })]
  });
}

function timing(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: `⏱ ${text}`, font: "Courier New", size: 20, color: "888888" })]
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
    spacing: { after: 120, line: 360 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: "SAY: ", bold: true, size: 24, font: "Arial", color: NAVY }),
      new TextRun({ text: `"${text}"`, size: 24, font: "Arial" })
    ]
  });
}

function actionPara(text) {
  return new Paragraph({
    spacing: { after: 80 },
    shading: { type: ShadingType.CLEAR, fill: MINT },
    children: [
      new TextRun({ text: "👆 DO: ", bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

function screenPara(text) {
  return new Paragraph({
    spacing: { after: 80 },
    shading: { type: ShadingType.CLEAR, fill: "e8f4ff" },
    children: [
      new TextRun({ text: "🖥 ON SCREEN: ", bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

function notePara(text) {
  return new Paragraph({
    spacing: { after: 60 },
    shading: { type: ShadingType.CLEAR, fill: NOTE_BG },
    children: [
      new TextRun({ text: "📌 ", size: 22, font: "Arial" }),
      new TextRun({ text, italics: true, size: 22, font: "Arial" })
    ]
  });
}

function checkItem(text) {
  return new Paragraph({
    spacing: { after: 50 },
    shading: { type: ShadingType.CLEAR, fill: CHECK_BG },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 160 }, children: [] });
}

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
            new TextRun({ text: "Dev8X — Confidential Demo Script", size: 18, font: "Arial", color: GRAY }),
            new TextRun({ text: "\t\t" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: GRAY })
          ]
        })]
      })
    },
    children: [

      // ══════════════════════════
      // HEADER
      // ══════════════════════════
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "TreeRaise — Product Demo", bold: true, size: 56, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Dev8X Demo Video Script — 5–7 Minute Recording", size: 26, font: "Arial", color: GRAY })]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: "Abdul | May 2026", size: 26, font: "Arial", color: GRAY })]
      }),
      notePara("Record in one take where possible. Pause freely between sections. This script is written as flowing paragraphs — read the SAY blocks word for word, follow the DO blocks for clicks and navigation. Total spoken time: ~6 minutes."),
      spacer(),
      new Paragraph({
        spacing: { after: 280 },
        children: [new TextRun({
          text: "00 Hook → 01 Partner Portal → 02 Admin Console → 03 Proof Sequence → 04 Before vs After → 05 Next Step",
          bold: true, font: "Courier New", size: 22
        })]
      }),

      // ══════════════════════════
      // 00 — HOOK
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("00 — Hook"),
      purpose("The first 20 seconds — start with the problem, not a greeting"),
      timing("0:00 – 0:20"),

      para("Open the Partner Portal in the browser. The viewer should see the Join TreeRaise landing page — the split-screen layout with the hero text on the left and the 3-step signup form on the right."),

      screenPara("Partner Portal — Join TreeRaise page. Left side shows \"Fundraising that grows forests\" with live stats: 1,284,390 trees planted, $6.8M raised, 347 partners. Right side shows Step 1 org-type selector."),

      para("No greeting, no introduction, no \"Hi I'm Abdul.\" Start directly with the problem:"),

      speakPara("Mission-driven organizations currently spend 30 to 40 volunteer hours per fundraiser selling products door to door — and keep less than half the money. This platform replaces all of that with a digital campaign that takes five minutes to launch, plants verified trees, and sends 50 cents of every dollar directly to the organization."),

      speakPara("This is a two-portal system: one for the organizations running campaigns, one for the TreeRaise team managing operations. I will walk through both in the next six minutes."),

      speakPara("By the end, you will see exactly how onboarding, campaign management, payouts, and impact tracking work — without spreadsheets, without manual follow-up, and without adding headcount."),

      // ══════════════════════════
      // 01 — PARTNER PORTAL
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("01 — Partner Portal"),
      purpose("Show three screens: the self-serve signup, the live dashboard, and the impact page"),
      timing("0:20 – 2:30"),

      // Screen 1
      h2("Screen 1 — The Onboarding Funnel"),

      para("You are still on the Join TreeRaise page from the Hook. Now you will walk through the signup flow to show how it replaces the manual coach onboarding."),

      actionPara("Click the \"School / PTA\" card on the right side. Then click the \"Continue →\" button."),

      screenPara("Step 2 of 3 is now visible — \"How many supporters do you reach?\" Four options appear: Under 100, 100–500, 500–2,000, and 2,000+. Each shows an estimated tree count."),

      speakPara("Right now, every new organization that signs up for TreeRaise gets a manual call from a coach within one to two business days. That coach walks them through setup, social media strategy, and their first campaign — by hand. At 500 organizations, that model breaks. This screen replaces it. The organization picks their type, picks their size, and in three clicks they see a personalized impact estimate — before they have even created an account."),

      actionPara("Click the \"500 – 2,000\" option. Then click \"See My Impact Estimate →\"."),

      screenPara("Step 3 of 3 — a dark green impact preview card shows: 1,230 Trees Planted, $18,500 Est. Funds Raised, 4.6t CO₂ Offset. Below it: name, org name, and email fields, with a \"🚀 Launch My Partner Portal\" button."),

      speakPara("The prospect sees exactly what their organization could achieve — trees, revenue, and carbon offset — before they type a single field. That is the hook. And when they submit, they land in a fully configured portal. No waiting for a coach. No three-day onboarding lag."),

      spacer(),

      // Screen 2
      h2("Screen 2 — The Partner Dashboard"),

      actionPara("Click \"🚀 Launch My Partner Portal\" to complete the funnel. Once the portal loads, click \"🏠 Home\" in the left sidebar."),

      screenPara("Home Dashboard for Riverside Elementary PTA. Top row: four KPI cards — 1,147 Trees Planted, $17,200 Funds Raised, 4.3t CO₂ Offset, 94.2% Tree Survival Rate. Middle: an Active Campaign card showing Spring Tree Drive 2025 at 39% of $12,400 goal, 312 donors, 29 days remaining. Bottom: a Live Contributions Feed with real-time donations — Sarah M. $84 (Grove) 2 min ago, Anonymous $45 (Sapling) 8 min ago, James T. $156 (Legacy) 14 min ago."),

      speakPara("This is what the school PTA president sees when they log in. Four numbers at the top — trees, funds, carbon, survival rate — all pulling live from veritree. Below that, their active campaign with a real-time progress bar. And below that, a live feed showing every contribution as it comes in — who gave, how much, which tier, and when. No spreadsheet. No email from a coach asking how the campaign is going. The organizer sees everything in real time."),

      spacer(),

      // Screen 3
      h2("Screen 3 — Impact & Trees"),

      actionPara("Click \"🌍 Impact & Trees\" in the left sidebar."),

      screenPara("Impact & Trees page — a GPS map showing verified planting sites, a species breakdown table (Rhizophora Mangle, Avicennia Germinans, etc.) with survival rates, and a downloadable Impact Certificate."),

      speakPara("Every tree planted through this organization is GPS-verified through veritree. The organizer can see exactly where their trees are, what species, and the survival rate for each batch. And they can download an Impact Certificate to share with their community — that is the proof their donors need to contribute again next year."),

      para("Now deliver the transition to the Admin Console:"),

      speakPara("That is the partner side. Now let me show you what the TreeRaise operations team sees."),

      // ══════════════════════════
      // 02 — ADMIN CONSOLE
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("02 — Admin Console"),
      purpose("Switch to the second browser tab — show leadership visibility, automated operations, and financial controls"),
      timing("2:30 – 4:00"),

      // Screen 4
      h2("Screen 4 — Company Overview"),

      actionPara("Switch to the second browser tab where the Admin Console is already open. The Company Overview panel should be active."),

      screenPara("Admin Console — Company Overview. Top bar: \"🌿 TreeRaise\" with \"⚿ Internal Admin\" badge and \"veritree synced 6m ago\". Four primary KPIs: 47 Active Partners (↑ +8 this quarter), $486k Total Raised YTD (↑ +34%), 38.9k Trees Planted (↑ 12,400 this month), $243k TreeRaise Revenue 50% (↑ +$6.5k vs Feb). Secondary row: $10.3k Avg per Partner, $81k This Month, 94% Retention Rate, 4.2d Avg Onboard. Below: a revenue chart, an Action Items panel with 5 open items (Maplewood PTA KYC failed, St. Michael's fraud flag, Riverside campaign ending, Lincoln bank change pending, Greenwood $50k milestone), and a Top Partners leaderboard (Greenwood $51,200, Riverside $41,800, Hope Community $34,200)."),

      speakPara("This is the command center. The founder or operations lead opens this once a day and sees everything: 47 active partners, $486,000 raised year to date, 38,900 trees planted, and TreeRaise's own $243,000 in platform revenue. The action items panel flags what needs attention right now — a KYC failure holding $3,200 in payouts, a fraud flag on St. Michael's, a campaign about to expire. Nothing falls through the cracks because the system surfaces it automatically."),

      spacer(),

      // Screen 5
      h2("Screen 5 — Automated Communications"),

      actionPara("Click \"📧 Communications\" in the left sidebar."),

      screenPara("Communications panel. Left column: 8 Automated Triggers — Welcome Email (on approval), KYC Reminder (Day 3), Campaign End Warning (3 days before close), Milestone Celebration ($10k/$25k/$50k/$100k), Fraud Alert to admin, Campaign Goal Reached to coach. Right column: Recent Sends timeline showing milestone email to Greenwood, fraud alert for St. Michael's, campaign warning to Riverside, KYC reminder to Maplewood, welcome email to Valley Nature. Bottom: a Broadcast composer with subject line, recipient filter (All 47 / Lane 1 / Lane 2+3 / Live only), and a message preview with merge tags."),

      speakPara("This is where 30 to 40 hours of manual coach work disappears. Eight automated triggers run without anyone pressing a button — welcome emails, KYC reminders, milestone celebrations, fraud alerts, campaign warnings. The recent sends timeline shows exactly what went out and when. And the broadcast tool lets the team send a personalized update to all 47 partners or a filtered segment in one click. No one is manually emailing each organization anymore."),

      spacer(),

      // Screen 6
      h2("Screen 6 — Payout Queue"),

      actionPara("Click \"🏦 Payout Queue\" in the left sidebar."),

      screenPara("Payout Queue — 3 organizations, $11,400 total, 1 blocked. Card 1: Riverside K-8, $5,200 pending, KYC ✅, Bank verified ✅, Chase ••••4231, status pipeline Pending → Processing → Disbursed, blue \"Release Payout →\" button. Card 2: Hope Community Church, $3,000 pending, BofA ••••8812, same pipeline. Card 3: Maplewood PTA, $3,200 BLOCKED in red — \"🚫 KYC failed · Cannot release until verified\", held 14 days, red \"Resolve KYC →\" button."),

      speakPara("Every dollar flowing through TreeRaise goes through this queue. The system checks KYC and bank verification before any payout can be released. Riverside has $5,200 ready — one click moves it to processing and then to disbursed. Maplewood is blocked because their KYC failed — the system held $3,200 automatically and will not release it until the issue is resolved. This is financial accountability at scale without a single spreadsheet."),

      // ══════════════════════════
      // 03 — PROOF SEQUENCE
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("03 — Proof Sequence"),
      purpose("Name the three biggest manual operations and point to the screen that eliminates each one"),
      timing("4:00 – 4:45"),

      actionPara("Click \"📊 Company Overview\" in the sidebar to return to the main dashboard."),

      screenPara("Company Overview dashboard visible — KPIs, action items, and leaderboard all on screen."),

      para("Now walk through three manual operations as a spoken list. Point to the relevant areas of the screen as you speak."),

      speakPara("Let me show you exactly what this platform replaces."),

      speakPara("Manual operation one: every new organization is onboarded by a coach who manually emails, calls, and walks them through setup within one to two business days. What you saw in the Partner Portal: the signup funnel auto-onboards organizations in three steps. The setup checklist guides them through verification, campaign creation, and team invites — no coach call required. 31 of 47 organizations are already on this self-serve track."),

      speakPara("Manual operation two: a Client Specialist manually creates social media posts, email reminders, and campaign content for each client using static PDF templates. What you saw in the Admin Console: the Communications panel shows eight automated triggers that send the right message at the right time — welcome emails, milestone celebrations, campaign warnings — all personalized with merge tags. The Digital Starter Kit in the Partner Portal delivers email templates, social graphics, posters, and a campaign checklist automatically on signup."),

      speakPara("Manual operation three: campaign pages are manually created and activated by the internal team — organizations cannot self-launch. What you saw in the Partner Portal: the organizer creates, configures, and launches a campaign in under ten minutes. The All Campaigns table in the Admin Console shows 38 live, 5 draft, and 12 closed campaigns — all managed by the organizations themselves."),

      // ══════════════════════════
      // 04 — BEFORE VS AFTER
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("04 — Before vs After"),
      purpose("Four workflow comparisons, then trigger Fear of Inaction"),
      timing("4:45 – 5:30"),

      screenPara("Stay on the Company Overview dashboard — the full KPI grid, revenue chart, and leaderboard visible."),

      para("Deliver the before/after pairs as a natural spoken list. Keep it conversational, not robotic."),

      speakPara("Before this platform: a new school signs up and waits one to two business days for a coach to call them. After: they complete a three-step funnel and land in their portal in under five minutes. A setup checklist guides the rest."),

      speakPara("Before: the Client Specialist creates social media posts and email sequences by hand for each organization using PDF templates. After: eight automated email triggers fire at the right moment, and a digital starter kit with branded templates downloads on signup."),

      speakPara("Before: campaign pages sit empty until someone on the internal team manually activates them. After: the organizer creates, configures, and publishes a campaign themselves. The Admin Console shows 38 live campaigns running simultaneously — managed by the organizations, not by TreeRaise staff."),

      speakPara("Before: tracking performance means checking spreadsheets and asking coaches for updates. After: the Company Overview shows $486,000 raised, 47 active partners, 94 percent retention, and every action item flagged in real time."),

      para("Pause briefly. Then deliver the fear-of-inaction closer — this is the most important paragraph in the entire script:"),

      speakPara("Now, here is what happens in the next 12 to 24 months if nothing changes. TreeRaise is targeting 500 organizations in 2026. The current team is one employee and one contractor. At 500 orgs, every manual onboarding call, every hand-crafted social post, every manually activated campaign page becomes a bottleneck that degrades the client experience exactly when first impressions matter most. And in the fundraising space, negative word-of-mouth in the school and PTA community travels faster than any marketing campaign."),

      speakPara("The platform prevents this by automating onboarding, content delivery, and campaign management so the team can scale to 500 organizations without scaling headcount — and every partner gets the same quality of support whether they are number 12 or number 412."),

      speakPara("Every one of these was either a spreadsheet, an email chain, or a manual process. Now it is a screen. And the future problems that would break operations at scale — they are handled before they start."),

      // ══════════════════════════
      // 05 — NEXT STEP
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("05 — Next Step"),
      purpose("One clear CTA — no pressure — end on the same screen you opened with"),
      timing("5:30 – 6:00"),

      actionPara("Switch back to the Partner Portal tab (Tab 1). Show the Join TreeRaise landing page — the same clean screen from the opening."),

      screenPara("Partner Portal — Join TreeRaise landing page. \"Fundraising that grows forests\" hero visible. Clean, professional close."),

      para("Deliver the close in four sentences. Unhurried, confident, no filler."),

      speakPara("What you have seen is the platform. What a discovery call covers is how it maps to your specific operations — your team structure, your current onboarding workflow, your 2026 growth targets, and exactly which pieces to build first."),

      speakPara("In 30 minutes, we scope a phased plan built around your actual operations — not a generic quote. The first phase ships in 30 days and targets the highest-visibility gaps without disrupting any live campaigns."),

      speakPara("If this looks like what you need, reply to this message and I will send over available times."),

      speakPara("Abdul Basit — Dev8X. abdul@dev8x.com."),

      notePara("Do not say \"I'd love to chat,\" \"let me know what you think,\" or \"feel free to reach out.\" The ask is one clear action: reply to this message."),

      // ══════════════════════════
      // SCREEN CHECKLIST
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("Pre-Recording Checklist"),
      purpose("Have these ready before pressing record"),
      spacer(),

      checkItem("□ 1. Tab 1 — Partner Portal: Join TreeRaise page open, Step 1 visible, \"School / PTA\" card ready to click"),
      checkItem("□ 2. Tab 2 — Admin Console: Company Overview panel active, all KPIs loaded"),
      checkItem("□ 3. Both tabs at 1280×800 resolution, browser zoom at 100%"),
      checkItem("□ 4. Audio tested — speak a test sentence and play it back"),
      checkItem("□ 5. Rehearse once without recording"),
      spacer(),
      para("Tab switching flow during the recording:"),
      checkItem("Sections 00–01: Tab 1 (Partner Portal) — funnel → home dashboard → impact & trees"),
      checkItem("Section 02: Tab 2 (Admin Console) — company overview → communications → payout queue"),
      checkItem("Sections 03–04: Tab 2 (Admin Console) — back to company overview, stay there"),
      checkItem("Section 05: Tab 1 (Partner Portal) — back to join page for clean visual bookend"),

      // ══════════════════════════
      // NOTES
      // ══════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      h1("⚙ Internal Notes"),
      purpose("Do not share with client — internal reference only"),
      spacer(),

      notePara("REMINDER: Before sending, re-record Section 05 with the prospect's actual company name if personalizing the video."),
      notePara("VERIFIED: All screen names match the actual nav items in both HTML portal files."),
      notePara("VERIFIED: All screen-to-problem mappings match the Problem Register and Proof Ledger entries."),
      notePara("VERIFIED: Opening Screen and Ordered Proof Route match the Decision Card Demo Routing Decision."),
      notePara("VERIFIED: All spoken metrics are L1 Sourced — 50% retention, 500+ orgs, 30–40 hrs, 125k trees, 1 employee."),
      notePara("SKIPPED: Revenue & Fees panel — exposes internal 50% split mechanics and refund controls, not prospect-appropriate."),
      notePara("SKIPPED: Growth Analytics — reinforces same proof as Company Overview; cut for runtime."),
      notePara("SKIPPED: Flagged Accounts, Coach Queue — internal operations workflow, not high-impact for CEO audience."),
      notePara("SKIPPED: Billing & Plans (Partner Portal) — internal pricing structure, not prospect-facing."),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "d:\\Arham\\Dev8X\\TroopHunter\\microfrontend\\treeraise\\context\\p4e_Demo_Pitch_TreeRaise.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ Demo Pitch DOCX regenerated (paragraph format):");
  console.log(outPath);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
