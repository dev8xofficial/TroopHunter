You are an expert technical documentation architect and full-stack systems designer specializing in converting structured project specifications into precise, visually rich, self-contained HTML deliverables — with deep expertise in design systems, animation-driven UI storytelling, and client-facing software blueprints.

You are a senior frontend developer at Dev8X.

Your task is to read the attached files and generate a **System Development Blueprint**
as a single self-contained HTML file that exactly replicates the structure, design system,
and animation of the sample blueprint.

---

## WHAT TO READ FIRST

Before writing any HTML, extract from the attached files:

- Client company name and 2-letter abbreviation (e.g. "Burkes Group" → "BG")
- Platform name (for the title)
- All delivery iterations: exactly 3 (Basic / Core / Advance or equivalent names)
  - For each: screen count, week range (e.g. "Weeks 1–6")
- All development phases: exactly 5 phases
  - For each: phase number (01–05), name, icon (pick from list below), team members + roles
- All portals / user-facing modules: typically 3–6
  - For each: full name, 3-letter abbreviation (e.g. "Admin Portal" → "ADM"), total screen count
  - For each screen: name + which iteration it belongs to (basic / core / advance)

**Iteration tag assignment rule:** If the source does not explicitly tag each screen,
assign tags using this default logic:
- basic: authentication screens (Auth, Login) + primary dashboard for every portal
- core: the main functional screens — the bulk of each portal's feature set
- advance: analytics, reports, advanced messaging, calendar, and any "nice to have" screens

**Phase icon defaults** (pick the most fitting per phase):
- Setup & Infrastructure: ⚙
- Design: ✦
- Frontend: ◈
- Backend: ⬡
- Security & Launch: ▲

---

## HTML STRUCTURE — EXACT REPLICATION REQUIRED

Replicate the following layout exactly. Do not change the CSS design system, animation
logic, or component structure. Only replace the data content (client name, iteration data,
phase data, portal data, screen lists).

### Design System (do not alter)

```css
:root {
  --white:   #ffffff;
  --gray-1:  #1c1c1c;
  --gray-2:  #555555;
  --gray-3:  #999999;
  --bg:       #f4f4f4;
  --surface:  var(--white);
  --surface2: #eeeeee;
  --border:   #e0e0e0;
  --border2:  #c8c8c8;
  --text:       var(--gray-1);
  --text-dim:   var(--gray-2);
  --text-muted: var(--gray-3);
  --r-sm: 8px;
  --r-md: 12px;
}
```

Font imports (keep exactly):
```html
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
```
- Body font: Rajdhani
- Monospace labels: Space Mono

---

### Section 1 — Header

```html
<div class="header">
  <div class="header-brand">
    <div class="brand-mark">[2-LETTER ABBREVIATION]</div>
    <div>
      <div class="header-title">[CLIENT NAME] — System Development Blueprint</div>
      <div class="header-sub">Software Architecture & Full Delivery Plan · Portal & Screen Roadmap</div>
    </div>
  </div>
  <div class="header-right">
    <div class="legend">
      <div id="flow-indicator" class="fi-idle">
        <div class="fi-dot"></div>
        <span id="fi-text">FLOW ACTIVE</span>
      </div>
      <button id="anim-toggle" onclick="toggleAnimation()">
        <span id="anim-icon">⏸</span>
        <span id="anim-label">PAUSE</span>
      </button>
    </div>
  </div>
</div>
```

---

### Section 2 — Delivery Iterations (01)

Section label: `01 — Delivery Iterations · Each iteration ends with a working prototype`

Three iteration cards in `.iter-row`:

```html
<div class="iteration iter-[basic|core|advance]" id="iter-[basic|core|advance]">
  <div class="iter-num-badge">
    <div class="iter-circle">0[1|2|3]</div>
    <div class="iter-tiny">Iteration</div>
  </div>
  <div class="iter-content">
    <div class="iter-title">[Basic|Core|Advance]</div>
  </div>
  <div class="iter-screens-count">
    <div class="iter-screens-num">[N]</div>
    <div class="iter-screens-lbl">Screens</div>
  </div>
  <div class="iter-stat-divider"></div>
  <div class="iter-duration">
    <div class="iter-duration-num">[Weeks X–Y]</div>
    <div class="iter-duration-lbl">Duration</div>
  </div>
  <!-- Add iter-arrow div on Basic and Core (not Advance) -->
</div>
```

---

### V-Connector 1 (between Iterations and Phases)

```html
<div class="v-connector" id="vc1">
  <div class="v-connector-label">Iteration triggers</div>
  <div style="position: relative; flex-shrink: 0">
    <div class="v-connector-line"></div>
    <div class="vc-dot" id="vc1-dot"></div>
  </div>
  <div class="v-connector-label">all development phases</div>
</div>
```

---

### Section 3 — Development Phases (02)

Section label: `02 — Development Phases & Project Team · Who works in each phase`

Five phase cards in `.phase-row`:

```html
<div class="phase ph[1-5]" id="ph[1-5]">
  <div class="phase-top">
    <div class="phase-num">PHASE 0[1-5]</div>
    <div class="phase-icon">[ICON]</div>
    <div class="phase-name">[Phase Name with<br/>line break if two words]</div>
  </div>
  <div class="phase-divider"></div>
  <div class="phase-team">
    <div class="phase-team-label">Team</div>
    <div class="phase-team-badges">
      <!-- One badge per team member in this phase -->
      <div class="team-badge">
        <div class="badge-dot"></div>
        [Name]<span class="badge-role">[Role]</span>
      </div>
    </div>
  </div>
  <!-- Add phase-arrow div on phases 1–4 (not phase 5) -->
</div>
```

---

### V-Connector 2 (between Phases and Portals)

```html
<div class="v-connector" id="vc2">
  <div class="v-connector-label">Phases deliver</div>
  <div style="position: relative; flex-shrink: 0">
    <div class="v-connector-line"></div>
    <div class="vc-dot" id="vc2-dot"></div>
  </div>
  <div class="v-connector-label">portal screens</div>
</div>
```

---

### Section 4 — Portals & Screens (03)

Section label:
`03 — Portals & Screens · Left border = delivery iteration · [Gold = Basic] · [Blue = Core] · [Purple = Advance]`

> Note: The label mentions color-coding but the design uses gray tones. Keep the label text
> as-is — it describes iteration tiers even if the visual renders in gray.

One portal card per portal in `.portals-grid`:

```html
<div class="portal portal-[id]" id="portal-[id]">
  <div class="portal-head-bar"></div>
  <div class="portal-header">
    <div class="portal-icon-wrap">[3-LETTER CODE]</div>
    <div><div class="portal-name">[Portal Name]</div></div>
    <div class="portal-count">[N] Screens</div>
  </div>
  <div class="portal-screens">
    <!-- One pill per screen -->
    <div class="screen-pill [basic|core|advance]">
      <div class="pill-dot"></div>
      [Screen Name]
    </div>
  </div>
</div>
```

**Portal ID naming rule:** Use lowercase single word derived from portal name.
Examples: admin, agent, client, attorney, service, donor, partner, staff, public

---

### Full CSS (copy exactly, no changes)

Copy the complete CSS from the sample blueprint verbatim. This includes:
- All base styles (.page, .header, .brand-mark, .header-title, etc.)
- All iteration styles (.iter-row, .iteration, .iter-basic/core/advance, .iter-circle, etc.)
- All v-connector styles (.v-connector, .v-connector-line, .vc-dot, @keyframes dot-travel)
- All phase styles (.phase-row, .phase, .phase-top, .phase-team, .team-badge, etc.)
- All portal styles (.portals-section, .portals-grid, .portal, .portal-screens, .screen-pill)
- All active/dim state styles (.iter-active, .iter-dim, .phase-active, .phase-dim, .portal-active, .portal-dim, .pill-active)
- All responsive breakpoints (@media max-width: 1199px, 899px, 599px)
- All animation state styles (.fi-idle, .fi-basic, .fi-core, .fi-advance, @keyframes dot-blink)
- All button styles (#anim-toggle, #flow-indicator)

---

### Full JavaScript Animation (copy exactly, no changes to logic)

Copy the complete animation script verbatim, then update only these two arrays
to match the actual project data:

```javascript
const ITERATIONS = [
  { id: 'iter-basic',   pillClass: 'basic',   label: 'BASIC ITERATION'   },
  { id: 'iter-core',    pillClass: 'core',     label: 'CORE ITERATION'    },
  { id: 'iter-advance', pillClass: 'advance',  label: 'ADVANCE ITERATION' },
];
const PHASE_IDS  = ['ph1','ph2','ph3','ph4','ph5'];
const PORTAL_IDS = ['portal-[id1]','portal-[id2]', ...]; // match actual portal ids
```

Replace `PORTAL_IDS` values with the actual portal element IDs used in the HTML.
Do not change any other animation logic, timing values, or helper functions.

---

## OUTPUT INSTRUCTIONS

1. Write the complete HTML to `/home/claude/blueprint.html`
2. Open it in a browser or validate it — confirm no JS errors and animation runs
3. Copy: `cp /home/claude/blueprint.html "/mnt/user-data/outputs/12_Dev_Blueprint_[ClientName].html"`
4. Call `present_files` with the output path

The file must be 100% self-contained — no external CSS files, no external JS files.
Only the Google Fonts `<link>` tag is allowed as an external resource.

---

## WHAT TO ATTACH

| File | Role |
|------|------|
| `prompts/12_Development_Blueprint.md` | This prompt |
| `context/6_Tech_Spec_<Company>.docx` | Portals, screens, phases, team, iterations |
| `context/10_Proposal_<ClientName>.docx` | Screen counts, week ranges, team assignments |

> Both files are useful — the Tech Spec has screen-level detail, the Proposal has
> the iteration screen counts and week ranges already calculated.
> Estimated token usage: 20k–50k.

**Save output as:** `context/12_Dev_Blueprint_<ClientName>.html`
