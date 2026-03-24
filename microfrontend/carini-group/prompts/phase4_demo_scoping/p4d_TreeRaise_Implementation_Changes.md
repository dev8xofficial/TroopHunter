You are a Senior Frontend Engineer with deep expertise in HTML, CSS, and vanilla JavaScript, specializing in spec-driven UI compliance work on enterprise SaaS dashboards.
Before writing a single line of code, you read the specification document against the existing codebase to identify every gap, misalignment, and missing feature — then you implement changes in strict priority order (critical first, then partial, then missing). You treat every Feature ID (FR-XXX) as a contract: a change is only complete when it satisfies the acceptance criteria stated in the spec, not merely when it looks correct on screen. You never implement a change without first verifying which spec requirement it maps to, and you flag any instruction that contradicts a spec requirement rather than silently overriding it. Your outputs are production-ready, design-system-compliant, and traceable back to the originating FR reference.

Implementation Change Instructions

> **Purpose:** This document lists every change required in `admin.html` and `partner-portal.html` based on the Tech Spec Verification Report (Tech_Spec_CariniGroup.docx v1.0). Each change is explicit and actionable. Implement all items marked 🔴 first, then 🟡, then ⚪.

---

## Context

- **Spec:** Carini Group platform — digital fundraising platform with 50/50 revenue split (org keeps 50%, Carini Group keeps 50%)
- **Contribution tiers:** Seed $15 = 1 tree · Sapling $45 = 3 trees · Grove $84 = 6 trees · Legacy $156 = 12 trees
- **User roles:** Campaign Organizer · Supporter/Donor · Coach · Platform Admin · Sustainability Specialist · Super Admin
- **Design system (do not change):** Fraunces serif · Instrument Sans · DM Mono · CSS variables (`--forest`, `--mint`, `--gold`, `--red`, etc.)
- **Overall compliance:** 50% — 14 pass, 7 partial, 7 missing across 28 requirements

---

## GLOBAL CHANGE — Both Files (Fix First)

### CHANGE-G1 🔴 Fix Revenue Split Model (8% → 50/50)

**Affects:** Every financial surface in both files  
**Problem:** Both files show an 8%/92% fee structure. The spec mandates a **50/50 split**.  
**Rule:** On every contribution, 50% goes to the organization, 50% goes to Carini Group.

**In `admin.html` — find and replace all instances of:**

- `"Carini Group Revenue (8%)"` → `"Carini Group Revenue (50%)"`
- `"Fee Rate: 8%"` → `"Split: 50%"`
- `"TR Fee: 8%"` → `"CG Share: 50%"`
- `"8% of $486k partner raises"` → `"50% of all contributions"`
- Any KPI label referencing "8% fee" → change to "50% platform share"
- The topbar KPI card value `$38.9k` (8% of $486k) → `$243k` (50% of $486k)

**In `partner-portal.html` — find and replace all instances of:**

- `"92% Goes to your org"` → `"50% Goes to your org"`
- `"8% Carini Group platform fee"` → `"50% Carini Group share"`
- `"$0 Upfront cost"` third split card: keep as-is (still accurate)
- The quote: `"We earn $4,000 and you keep $46,000"` (on $50k raised) → `"We earn $25,000 and you keep $25,000"`
- Any calculator showing 8% deductions → recalculate at 50%
- Split percentage visuals (the large `92%` / `8%` numbers) → `50%` / `50%`

---

## admin.html — Required Changes

### CHANGE-A1 🔴 Add `/admin/users` Panel (FR-061 · P1)

**What to build:** A new sidebar nav item and full panel for User Account Management.

**Sidebar — add a new nav item under the "Organizations" section:**

```html
<div class="nav-item" onclick="showPanel('users', this)"><span class="nav-icon">👥</span> User Management</div>
```

**Panel — add `id="panel-users"` with the following sections:**

1. **Page header:** title "User Management", subtitle "All organizer accounts · Search, manage roles, deactivate"
2. **Toolbar row:** search box (filter by email or org name) + "Invite User" button
3. **Filter chips:** All · Active · Deactivated · Pending Verification
4. **Users table** with columns:
   - User (name + email, stacked)
   - Organization
   - Role (dropdown pill: Organizer / Coach / Admin)
   - Status (Active / Deactivated / Unverified)
   - Joined date
   - Actions: "Edit Role" button · "Deactivate" button · "Reset Password" button
5. **At least 5 sample rows** using the same `.org-row` / `.data-table` pattern already in the file
6. Role change should call `showToast('Role updated for [name]')`
7. Deactivate should toggle the status pill from green to gray and call `showToast('Account deactivated')`
8. Reset Password should call `showToast('Password reset email sent to [email]')`

---

### CHANGE-A2 🔴 Add `/admin/coaches` Panel (FR-062, FR-052 · P1)

**What to build:** A new sidebar nav item and panel for Coach management and task queue.

**Sidebar — add a new nav item under the "Operations" section:**

```html
<div class="nav-item" onclick="showPanel('coaches', this)">
  <span class="nav-icon">🧑‍🏫</span> Coach Queue
  <span class="nav-badge red">4</span>
</div>
```

**Panel — add `id="panel-coaches"` with the following sections:**

1. **Page header:** title "Coach Task Queue", subtitle "Follow-up tasks · Alert triggers · Coach assignments"
2. **KPI row (3 cards):**
   - Active Coaches: `3`
   - Open Tasks: `4`
   - Avg Response Time: `1.8d`
3. **Alert Tasks section** — a list of action items using the `.action-item` pattern, each with:
   - 🔴 dot for "Not launched within 48h" alerts
   - 🟡 dot for "80% of campaign duration, <50% of goal" alerts
   - Each item shows: org name · coach assigned · time since signup · "Mark Complete" button
   - Sample tasks:
     - 🔴 **Valley Nature Conservancy** — Signed up 3 days ago, campaign not launched. Assigned: Coach Maria. `Mark Complete` button.
     - 🔴 **Lincoln Robotics Boosters** — Signed up 2 days ago, no launch. Assigned: Coach David. `Mark Complete` button.
     - 🟡 **Sunrise High Booster Club** — 24 of 30 days elapsed, only 44% of goal reached. Assigned: Coach Maria. `Send Push` button.
     - 🟡 **Westside Soccer League** — 26 of 30 days elapsed, 38% of goal. Assigned: Coach David. `Send Push` button.
4. **Coach Assignment section** — a table showing all live campaigns with an "Assigned Coach" dropdown column:
   - Columns: Campaign · Organization · Status · Days Remaining · Assigned Coach (dropdown: Coach Maria / Coach David / Unassigned)
   - Changing the dropdown calls `showToast('Coach assignment updated')`

---

### CHANGE-A3 🔴 Add Campaigns Table (Separate from Organizations) (FR-060 · P1)

**What to build:** A new sidebar nav item and panel for campaign-level management, distinct from the existing "All Organizations" panel.

**Sidebar — add a new nav item under the "Organizations" section (above "All Organizations"):**

```html
<div class="nav-item" onclick="showPanel('campaigns', this)">
  <span class="nav-icon">📋</span> All Campaigns
  <span class="nav-badge green">38</span>
</div>
```

**Panel — add `id="panel-campaigns"` with:**

1. **Page header:** title "All Campaigns", subtitle "38 live · 5 draft · 12 closed · across 47 organizations"
2. **Toolbar:** search input + "Export CSV" button (calls `showToast('CSV exported')`) + filter chips: All · Draft · Live · Closed
3. **Table** with columns:
   - Campaign Name (bold) + org name below (muted, smaller)
   - Sector (pill: School / Church / Nonprofit / Civic)
   - Status (pill: DRAFT gray / LIVE green / CLOSED blue)
   - Start Date
   - Total Raised (DM Mono font)
   - Tree Count (DM Mono font)
   - Assigned Coach (name or "Unassigned" in muted)
   - Actions: "View" button
4. **Sample rows (at least 6)** mixing LIVE, DRAFT, and CLOSED statuses across different orgs:
   - Spring Tree Drive 2025 · Greenwood Elementary · School · LIVE · Feb 1 · $51,200 · 4,120 · Coach Maria
   - Fall Fundraiser 2025 · Riverside K-8 · School · CLOSED · Oct 1 · $41,800 · 3,344 · Coach David
   - Community Roots 2026 · Hope Community Church · Church · LIVE · Jan 15 · $34,200 · 2,736 · Coach Maria
   - Spring Drive 2026 · Lincoln Robotics · School · DRAFT · — · — · 0 · Unassigned
   - Nature Campaign · Valley Conservancy · Nonprofit · DRAFT · — · — · 0 · Unassigned
   - Soccer for Trees · Westside Soccer · Civic · LIVE · Dec 1 · $19,400 · 1,552 · Coach David

---

### CHANGE-A4 🟡 Fix Disbursement Status Progression (FR-032 · P1)

**In the existing `panel-payouts`:**

1. Replace the binary "Release/Blocked" payout card layout with a **3-state status** system.
2. Each `.payout-card` should show a status row below the org name:
   ```
   Status: [pill] → [pill] → [pill]
   ```
   Where the active step is highlighted and the others are muted.
3. Status states: `● Pending` (gold) → `● Processing` (blue) → `● Disbursed` (green)
4. The "Release Payout →" button should change the card to "Processing" state on click (update pill, call `showToast('Payout moved to Processing')`).
5. Add a second "Mark Disbursed" button that appears once status is Processing (calls `showToast('Payout marked as Disbursed')`).

---

### CHANGE-A5 🟡 Add Campaign-Level CSV Export to Campaigns Table (FR-060 · P1)

**In the new `panel-campaigns` (CHANGE-A3):** The "Export CSV" button in the toolbar is already specified above — ensure it is present and calls `showToast('Campaigns exported to CSV')`.

**In existing `panel-orgs`:** Add an "Export CSV" button to the page-header actions area alongside the existing "+ Add Org" button.

---

### CHANGE-A6 🟡 Add Date-Range Filter to Financial Dashboard (FR-063 · P1)

**In the existing `panel-revenue`:**

1. Add a date-range filter row below the page header and above the KPI cards:
   ```html
   <div style="display:flex; gap:10px; align-items:center; margin-bottom:20px">
     <label style="font-size:12px; color:var(--muted)">Date range:</label>
     <input type="date" class="adm-input" style="width:150px" />
     <span style="color:var(--muted)">→</span>
     <input type="date" class="adm-input" style="width:150px" />
     <button class="btn btn-secondary btn-sm" onclick="showToast('Filter applied')">Apply</button>
   </div>
   ```
2. Add a **"By Sector" breakdown table** below the existing revenue table:
   - Columns: Sector · Organizations · Gross Raised · Carini Group Share (50%) · Org Payout (50%)
   - Rows: Schools & PTAs · Churches · Nonprofits · Civic / Sports · **Total**
   - Use DM Mono font for all dollar values.

---

### CHANGE-A7 ⚪ Add Refund Processing UI (FR-033 · P2)

**In the existing `panel-revenue` fee table:**

1. Add a fifth column "Actions" to the table header.
2. For each org row, add a `"↩ Refund"` button using `btn btn-danger btn-sm`.
3. Clicking it should show a `showToast('Refund initiated via Stripe for [org name]. Both ledger entries reversed.')`.
4. After clicking, the row's Status pill should change from `● Paid` (blue) to `↩ Refunded` (red).

---

## partner-portal.html — Required Changes

### CHANGE-P1 🔴 Add Campaign Close Flow (FR-016 · P1)

**In the existing `page-campaigns`:**

1. On the **active campaign card** (the "Spring Tree Drive 2025" card currently showing `● Live`), add a "Close Campaign" button in the card actions row:
   ```html
   <button class="btn btn-danger btn-sm" onclick="closeCampaign(this)">🔒 Close Campaign</button>
   ```
2. Add the `closeCampaign()` JavaScript function:
   ```javascript
   function closeCampaign(btn) {
     if (!confirm('Close this campaign? Contributions will be frozen, final totals locked, and an impact report will be generated.')) return;
     const card = btn.closest('.camp-card'); // or equivalent parent selector
     // Change the status pill from Live (green) to Closed (blue/gray)
     const pill = card.querySelector('.pill-green');
     if (pill) {
       pill.textContent = '● Closed';
       pill.className = 'pill pill-blue';
     }
     btn.textContent = '✓ Closed';
     btn.disabled = true;
     showToast('Campaign closed. Impact report generation triggered. Wrap-up email queued.');
   }
   ```
3. Add a **confirmation alert banner** below the campaign card after closing:
   ```html
   <div class="alert alert-success" style="margin-top:12px">✅ Campaign closed. Impact report will be ready within 24 hours. Disbursement record created.</div>
   ```

---

### CHANGE-P2 🔴 Add Starter Kit Download (FR-015 · P1)

**In the existing `page-home` (dashboard overview):**

1. Add a new "Quick Actions" card below the existing quick actions section (or add to the existing quick actions list if one exists):
   ```html
   <button class="btn btn-secondary btn-block" onclick="showToast('Starter Kit ZIP downloading…')">📦 Download Starter Kit</button>
   ```
2. Add a **Starter Kit info card** in the dashboard using the existing `.card.card-p` style:
   - Title: "Your Digital Starter Kit"
   - Subtitle: "Everything you need to promote your campaign"
   - List the 4 items with icons:
     - 📧 Email Templates (HTML) — 3 templates
     - 🖼️ Social Media Graphics (PNG) — 8 assets
     - 🖨️ Printable Posters (PDF) — 2 sizes
     - ✅ Campaign Checklist (PDF)
   - A primary "Download ZIP" button at the bottom: `btn btn-primary btn-block`
   - Clicking calls: `showToast('Starter Kit downloaded — check your Downloads folder')`

---

### CHANGE-P3 🔴 Add Campaign Launch Button (DRAFT → LIVE) (FR-012 · P1)

**In the existing `page-campaigns`:**

1. Any campaign card showing `● Draft` status must have a **"🚀 Launch Campaign"** button.
2. Add a sample draft campaign card if one does not exist. It should show:
   - Campaign name (e.g., "Summer Tree Drive 2026")
   - Status pill: `⏸ Draft` (gray)
   - Goal, start date TBD
   - Two buttons: `"✏️ Edit"` and `"🚀 Launch Campaign"`
3. The launch button calls:
   ```javascript
   function launchCampaign(btn) {
     const card = btn.closest('.camp-card'); // or equivalent
     const pill = card.querySelector('.pill-gray');
     if (pill) {
       pill.textContent = '● Live';
       pill.className = 'pill pill-green';
     }
     btn.textContent = '✓ Launched';
     btn.disabled = true;
     showToast('🚀 Campaign is now LIVE. Launch email queued for delivery within 60 seconds.');
   }
   ```

---

### CHANGE-P4 🟡 Add Live Contributions Feed (FR-013 · P1)

**In the existing `page-home` dashboard:**

1. Add a new section below the active campaign progress bar titled **"Live Contributions Feed"** with a green `● Live` badge.
2. Use a scrollable list container (max-height: 260px, overflow-y: auto) with the following structure per item:
   - Supporter display name (bold) — or **"Anonymous Supporter"** if anonymous
   - Tier pill (Seed / Sapling / Grove / Legacy) in the appropriate color
   - Amount in DM Mono font
   - Relative timestamp ("2 min ago", "14 min ago") in muted color
3. **Sample feed items (6–8 entries), newest first:**
   - Sarah M. · Grove · $84 · 2 min ago
   - Anonymous Supporter · Sapling · $45 · 8 min ago
   - James T. · Legacy · $156 · 14 min ago
   - Priya K. · Seed · $15 · 22 min ago
   - Anonymous Supporter · Grove · $84 · 31 min ago
   - Robert L. · Sapling · $45 · 45 min ago
4. Add a small "Refreshing every 5s" indicator with a pulsing dot (reuse the `.live-pulse` style already in the file).

---

### CHANGE-P5 🟡 Rebuild Campaign Setup as 6-Step Wizard (FR-011 · P1)

**Replace the existing 5-step checklist in `page-setup` with a proper step-by-step wizard.**

The wizard must have 6 steps. Use a step indicator bar at the top showing Step 1 of 6, Step 2 of 6, etc. Only the active step is visible at a time; a "Next →" and "← Back" button navigate between steps.

**Step 1 — Organization Name**

- Label: "What is your organization's name?"
- Input: text field, placeholder "e.g. Riverside Elementary PTA"
- Sub-label: "This will appear on your public campaign page."

**Step 2 — Sector Selection**

- Label: "What type of organization are you?"
- Four clickable cards: 🏫 School / PTA · 💚 Nonprofit · ⛪ Faith Community · ⚽ Civic / Sports
- Only one selectable at a time (highlight selected with `--mint3` background and `--forest2` border)

**Step 3 — Logo & Banner Upload**

- Label: "Upload your organization logo and banner"
- Logo upload: drag-and-drop zone, accepts JPG/PNG up to 5MB. Label: "Logo (square, min 200×200px)"
- Banner upload: drag-and-drop zone, accepts JPG/PNG up to 5MB. Label: "Campaign banner (wide, min 1200×400px)"
- Both can be simulated — clicking the zone calls `showToast('File selected: logo.png')`

**Step 4 — Fundraising Goal**

- Label: "Set your fundraising goal"
- Number input with `$` prefix, placeholder `12,400`
- Below: live preview showing "At 50% split, your organization keeps: **$X**" (calculate dynamically as user types — 50% of input value)
- Also show: estimated tree count based on average $15/tree

**Step 5 — Impact Region**

- Label: "Choose your reforestation region"
- Four selectable cards with map thumbnail placeholder:
  - 🌿 Haiti — Agroforestry
  - 🌊 East Africa — Mangrove Restoration
  - 🌳 Peru — Tropical Rainforest
  - 🌲 Indonesia — Kalimantan Coast
- Only one selectable at a time

**Step 6 — Campaign Duration**

- Label: "How long will your campaign run?"
- Three option buttons: 15 days · 30 days (recommended, pre-selected) · 45 days
- Start date picker (date input)
- Auto-calculate and display end date
- On "Finish & Generate URL" button click: show a success state with a generated campaign URL like `carinigroup.com/c/riverside-pta-spring-2026`, a "Copy Link" button, and a "Go to Dashboard →" button (calls `showPage('page-home', ...)`)

---

### CHANGE-P6 🟡 Add 4-Stage Email Sequence Manager (FR-050 · P1)

**In the existing `page-campaigns` or as a new sub-section within the campaign detail:**

Add an **"Email Sequence"** collapsible section or tab below the active campaign card. It must show the 4 automated emails as a timeline:

| #   | Stage        | Timing              | Subject Line                               | Status                    | Actions        |
| --- | ------------ | ------------------- | ------------------------------------------ | ------------------------- | -------------- |
| 1   | Launch Email | Day 0 (on go-live)  | Our Fundraiser Starts Today                | ✅ Sent Mar 1             | Preview        |
| 2   | Mid-Drive    | Day 15              | Halfway There — Thank You for Your Support | 🕐 Scheduled Mar 16       | Preview · Edit |
| 3   | Final Push   | Day 28–29           | Last Day to Support Our Fundraiser         | 🕐 Scheduled Mar 29       | Preview · Edit |
| 4   | Wrap-Up      | Within 24h of close | Thank You for Supporting Our Fundraiser    | ⏸ Pending campaign close | —              |

- "Preview" button calls `showToast('Email preview opened')`
- "Edit" button calls `showToast('Email editor opened — customize your message before it sends')`
- Each row uses the existing `.comms-row` style pattern already in admin.html (replicate that pattern here)
- Include a note below the table: _"Templates use merge tags: {ORG_NAME} {CAMPAIGN_URL} {TREE_COUNT} {TOTAL_RAISED} {GOAL}"_

---

### CHANGE-P7 ⚪ Add Notification Bell to Topbar (FR-051 · P2)

**In the existing topbar of `partner-portal.html`:**

1. Add a notification bell icon button between the `.topbar-live` veritree badge and the user avatar:
   ```html
   <div style="position:relative; cursor:pointer" onclick="toggleNotifications()">
     <span style="font-size:18px; color:rgba(255,255,255,.7)">🔔</span>
     <span id="notif-badge" style="position:absolute; top:-4px; right:-5px; background:var(--red); color:#fff; font-size:9px; font-weight:700; border-radius:99px; padding:1px 5px; font-family:'DM Mono',monospace;">3</span>
   </div>
   ```
2. Add a notification dropdown panel (hidden by default, toggled by the bell click):
   ```html
   <div id="notif-dropdown" style="display:none; position:absolute; top:56px; right:80px; width:320px; background:var(--white); border:1px solid var(--border); border-radius:var(--r); box-shadow:var(--shadow3); z-index:300;"></div>
   ```
3. Dropdown contents:
   - Header row: "Notifications" (bold) + "Mark all read" link
   - 3 sample notification items using `.timeline-item` style:
     - 🌳 **New contribution** — James T. contributed $156 (Legacy) · 14 min ago
     - 🎯 **Milestone reached** — You've planted 1,000 trees! · 1 hour ago
     - 📜 **Impact report ready** — Fall Fundraiser 2025 report is available · 2 days ago
   - Each item has a blue left border if unread
4. Add the toggle function:
   ```javascript
   function toggleNotifications() {
     const d = document.getElementById('notif-dropdown');
     d.style.display = d.style.display === 'none' ? 'block' : 'none';
     document.getElementById('notif-badge').style.display = 'none'; // clear badge on open
   }
   ```

---

### CHANGE-P8 🟡 Add Contribution Tier Breakdown (FR-021)

**In the existing `page-home` dashboard:**

Add a **"Contributions by Tier"** card in the secondary stats section using the existing `.card.card-sm` pattern:

- Title: "Contributions by Tier"
- A horizontal bar breakdown showing 4 tiers with counts and amounts:
  - 🌱 Seed ($15 · 1 tree) — 42 contributions · $630
  - 🌿 Sapling ($45 · 3 trees) — 28 contributions · $1,260
  - 🌳 Grove ($84 · 6 trees) — 18 contributions · $1,512
  - 🏛️ Legacy ($156 · 12 trees) — 8 contributions · $1,248
- Use the existing `.prog-track` / `.prog-fill` bar pattern, with bar widths proportional to contribution count
- Show tier name, count, and total amount inline

---

## Summary Table

| ID  | Change                                                             | Priority    | File                |
| --- | ------------------------------------------------------------------ | ----------- | ------------------- |
| G1  | Fix revenue split 8% → 50/50 everywhere                            | 🔴 Critical | Both                |
| A1  | Add `/admin/users` panel                                           | 🔴 P1       | admin.html          |
| A2  | Add `/admin/coaches` panel + task queue                            | 🔴 P1       | admin.html          |
| A3  | Add `/admin/campaigns` table (separate from orgs)                  | 🔴 P1       | admin.html          |
| A4  | Fix disbursement status: Pending → Processing → Disbursed          | 🟡 P1       | admin.html          |
| A5  | Add CSV export to campaigns table                                  | 🟡 P1       | admin.html          |
| A6  | Add date-range filter + by-sector breakdown to Financial Dashboard | 🟡 P1       | admin.html          |
| A7  | Add refund processing UI to Revenue table                          | ⚪ P2       | admin.html          |
| P1  | Add Campaign Close button and LIVE → CLOSED flow                   | 🔴 P1       | partner-portal.html |
| P2  | Add Starter Kit download section to dashboard                      | 🔴 P1       | partner-portal.html |
| P3  | Add Launch Campaign button (DRAFT → LIVE)                          | 🔴 P1       | partner-portal.html |
| P4  | Add live contributions feed to dashboard                           | 🟡 P1       | partner-portal.html |
| P5  | Rebuild setup as 6-step wizard                                     | 🟡 P1       | partner-portal.html |
| P6  | Add 4-stage email sequence manager                                 | 🟡 P1       | partner-portal.html |
| P7  | Add notification bell to topbar                                    | ⚪ P2       | partner-portal.html |
| P8  | Add contribution tier breakdown card to dashboard                  | 🟡 —        | partner-portal.html |

---

## Do Not Change

The following are correctly implemented and should not be modified:

**admin.html:**

- Impact Registry panel (panel-impact) — veritree GPS table, CO₂, sync status ✅
- Communications panel (panel-comms) — automated triggers, broadcast composer ✅
- Flagged Accounts panel (panel-flags) — fraud risk signals, action controls ✅
- Pending Approvals panel (panel-pending) — KYC verification chips ✅
- Design system, CSS variables, typography, color tokens ✅
- Super Admin role display in topbar and sidebar footer ✅

**partner-portal.html:**

- Impact page (page-impact) — GPS map, species, Donor Receipt, Impact Certificate ✅
- Team management page (page-team) — role invite, role warnings ✅
- Campaign history list in page-campaigns ✅
- Milestones / Legacy Forest pages ✅
- Billing page structure (update numbers only per CHANGE-G1) ✅
- Design system, CSS variables, typography, color tokens ✅

---

_Based on Tech_Spec_CariniGroup.docx v1.0 · Verified March 14, 2026_
