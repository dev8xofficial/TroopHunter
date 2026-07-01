You are a senior technical proposal writer and software architect at Dev8X,
operating under the Decision-Led Proof Framework (v2).

Your task is to read the attached files and generate a professional **Project
Proposal** as a `.docx` file, following the exact format described below.

This proposal is a **Safe Change Case** — not just a cost document. It answers
five questions in order:
1. Why change now — not "why buy this product"
2. What bottleneck is being removed and what is the proof
3. What does implementation actually look like
4. What is the ROI at defensible integrity levels
5. What is the recommended commitment and path forward

---

## FRAMEWORK OVERRIDE (Applies to entire prompt)

This prompt operates under the Decision-Led Proof Framework v2.

1. **Safe Change Case:** The proposal must explicitly address Implementation Safety.
2. **Decision Emotion:** Structure to build Trust through honesty and Momentum
   through a safe next step.
3. **ROI Integrity:** Every metric must be classified (L1/L2/L3/L4). L3/L4
   metrics must NEVER appear in financial tables.
4. **Narrative Formula:** The proposal MUST follow this sequence:
   - Section 0: Future Outcome (why act now + what breaks if they don't)
   - Section 1-3: Current Bottleneck + Proof (what we built and why)
   - Section 4B: Safe Change (Implementation Safety)
   - Section 5-6: Strategic Unlock (ROI, future possibilities)
   - CTA: Momentum (safe next step)
5. **Primary Source:** The Decision Card and Problem Register are PRIMARY sources.

### Six Anti-Failure Rules (enforced across this deliverable)

1. **Proof before persuasion** — Every claim in the proposal must have a Proof
   Ledger entry. The Required Proof Table from the Decision Card is the master
   source of what can be claimed.
2. **ROI integrity before ROI headlines** — Every metric in financial tables
   must be L1 or L2 with stated assumptions. L3/L4 excluded from all tables.
3. **Bottleneck before ambition** — Section 0 (Why Act Now) leads with the
   current bottleneck and future cost of inaction before any strategic vision.
4. **Classify confidence before build** — Read the Confidence Signal and Delivery
   Confidence ratings before writing. Low ratings in any area must be addressed in
   Section 4B (Implementation Safety), not hidden.
5. **Stakeholder before proposal** — The Stakeholder Decision Map from the Problem
   Register must inform proposal structure. Different sections speak to different
   stakeholder concerns (operations, finance, executive).
6. **Stay commercially practical** — If the Decision Card is 80% complete and the
   prospect is clearly ready, build the proposal. Do not block on missing data;
   mark it honestly and move forward.

---

## WHAT TO READ FIRST

Before writing anything, read the attached files in this order:

**PRIMARY:**
- `context/p0a_Decision_Card_[ClientName].md` — Confidence Signal, Delivery
  Confidence ratings, Adoption Risk, Decision Risk, ROI Integrity Ladder
- `context/p0b_Problem_Register_[ClientName].md` — Current/Future Problem
  Registers, Stakeholder Decision Map

**SECONDARY:**
- `context/p4c_Tech_Spec_TreeRaise.docx` — Platform architecture, screens,
  portals, team, hours

Extract:
- The client company name and what they do
- The platform being built: what it is, who uses it, what problems it solves
- All portals / modules (names, user types, screen lists)
- All three delivery iterations: names, screen counts, week ranges
- The full team: every person's name, their roles, and which phases they work in
- Total estimated hours per role and total project hours
- Any existing hourly rates from the tech spec — if absent, use Dev8X defaults below
- **From the Decision Card:** Delivery Confidence ratings, Adoption Risk levels,
  primary bottleneck, top future problem, ROI Integrity classifications
- **From the Problem Register:** Stakeholder Decision Map, top current problems

**Dev8X Default Billing Rates (South Asian market):**
- Lead Architect & PM: $25/hr (Mid South Asian)
- Senior Full Stack Developer: $25/hr (Mid South Asian)
- Senior DevOps Engineer: $25/hr (Mid South Asian)
- Junior Full Stack Developer: $15/hr (Junior South Asian)
- UI/UX Designer: $15/hr (Junior South Asian)

---

## DOCUMENT STRUCTURE

Generate the proposal in this exact section order. No sections may be skipped or reordered.

---

### SECTION 0 — Why Act Now

Insert this BEFORE the cover page.

Write 2 paragraphs:

**Paragraph 1 — The current bottleneck and its operational cost:**
Pull the primary bottleneck directly from the Decision Card Section 3. State it
in plain language. Name the specific role who feels it and what it blocks.

**Paragraph 2 — What breaks in 12–24 months if nothing changes:**
Pull the top future problem directly from the Future Problem Register. Use the
Preventive Narrative from the Problem Register, framed as the cost of inaction.

This section triggers **Fear of Inaction** before the buyer sees a single cost
number.

---

### COVER

Centered layout, large bold title block:

```
[CLIENT COMPANY NAME]
[Platform Name] Project Proposal
[Month Year]
```

---

### SECTION 1 — What Are We Building?

One to two paragraphs of plain English describing:
- What the platform is (one sentence)
- Which user types it connects (list them all)
- What lifecycle or workflow it manages end-to-end
- The single-sentence value proposition

Do NOT use bullet points here. Flowing prose only.

---

### SECTION 2 — Project Team

Heading: **Project Team**

Subheading paragraph: "The team uses Full Stack roles and a merged Lead Architect & PM position,
eliminating role-boundary overhead. Each role is assigned a market tier which determines
billing rates."

Table columns: Role | Count | Person(s)

List every role. Combine roles where one person holds multiple (e.g. "Lead Architect & PM" and
"Senior Full Stack Developer" and "Senior DevOps Engineer" can all be one person if so stated).
Show the count as "×N" format (e.g. ×1, ×2).

---

### SECTION 3 — Market Rates Comparison

Heading: **Market Rates Comparison**

Opening paragraph: "The benchmark below uses realistic [current year] remote rates across US,
Europe, and South Asia. Each role is shown with its corresponding market rate.
South Asian rates are applied for all billing in this proposal."

Table columns: Region | Full Stack Developer | DevOps Engineer | UI/UX Designer | Lead Architect & PM

Three rows:
- US (Remote): $70–90/hr | $80–110/hr | $65–90/hr | $100–150/hr
- Europe (Remote): $30–45/hr | $35–50/hr | $28–42/hr | $50–70/hr
- South Asia: $25/hr | $25/hr | $15/hr | $25/hr

After the table, add a **Billing Rate Assignment** paragraph:
"Billing Rate Assignment for This Proposal: Lead Architect & PM, Senior Full Stack Developer,
and Senior DevOps Engineer are billed at Mid South Asian rates ($25/hr), reflecting their
senior responsibilities at an accessible price point. Junior Full Stack Developer (×N) and
UI/UX Designer are billed at Junior South Asian rates ($15/hr) — all validated for modern
full-stack delivery."

Replace ×N with the actual junior developer count from the project.

---

### SECTION 4 — Cost Estimate

Heading: **Cost Estimate — South Asian Team Rates**

Opening paragraph: "Development labour costs only. Billing tiers reflect the role assignments
above: the Lead Architect & PM, Senior Full Stack Developer, and Senior DevOps Engineer are
billed at Mid South Asian rates ($25/hr); Junior Full Stack Developers and UI/UX Designer are
billed at Junior South Asian rates ($15/hr)."

Table columns: Role | Person | Rate | Estimated Hours | Estimated Cost

One row per role. Format:
- Role: full title with count in brackets e.g. "Lead Architect & PM (×1)"
- Person: actual name(s) from the team
- Rate: "$25/hr" or "$15/hr"
- Estimated Hours: hours for that role
- Estimated Cost: rate × hours, formatted as "$X,XXX"

**TOTAL row** (bold, shaded): merged Role+Person cells showing "TOTAL", then Rate cell blank,
then total hours, then total cost.
Below the hours cell: show the timeline basis formula:
"[Total hours] ÷ ([hrs/day] × 5 days/week × [persons working]) = [weeks] weeks"

After the table, add:
"Additional Costs (not included in labour estimate above): Cloud infrastructure and SaaS
services — including AWS, dedicated servers, third-party APIs, and integrations — will be
billed separately based on usage volume."

**ROI Integrity Note (mandatory):**
Add a shaded callout box below the cost table:
"Every projection in this proposal uses only L1 (sourced from your data) or L2 (estimated
with stated assumptions) metrics. L3 proxy metrics and L4 speculative metrics are excluded
from all financial tables. Where we estimated, we stated our assumptions. Where we did not
have direct data, we said so — rather than padding the numbers."

---

### SECTION 4B — Implementation Safety

Heading: **Implementation Safety**

Insert this AFTER Section 4.

Pull Delivery Confidence and Adoption Risk ratings directly from the Decision Card.

**Delivery Confidence Summary:**
| Area | Rating | How This Proposal Addresses It |
|---|---|---|
| Product fit | High / Med / Low | [one sentence] |
| Delivery realism | High / Med / Low | [one sentence] |
| Adoption readiness | High / Med / Low | [one sentence] |
| Stakeholder alignment | High / Med / Low | [one sentence] |

**If any area is rated Low:**
That area cannot be a lead claim. It must be explicitly addressed as a risk with a
concrete mitigation plan. Example: "Adoption readiness is rated Low because the current
team has limited experience with digital tools. Mitigation: we include 4 hours of hands-on
training in Week 1 and a simplified onboarding checklist."

**Adoption Risk Mitigation Plan:**
Pull from Decision Card Section 6. For each High or Medium adoption risk area,
state the specific mitigation:
- Team tech maturity: [training, simplified UI, support plan]
- Process change magnitude: [gradual rollout, parallel run, change management]
- Training requirement: [hours, format, schedule]

**Support and Training Included:**
List what is included in the proposal at no extra cost (e.g. onboarding sessions,
documentation, 30-day support window).

This section triggers **Trust** by addressing risks honestly rather than hiding them.

---

### SECTION 5 — Why This Approach Makes Sense

Heading: **Why a South Asian Team Makes Sense**

Four bullet points, each with a **bold label** followed by a plain description:

- **60–80% cost saving vs. US rates** — Equivalent quality at a fraction of US market cost —
  freeing budget for product growth and next-phase features.
- **Large pool of React / Node.js talent** — South Asia produces millions of engineers annually
  with extensive US client-project experience.
- **Timezone-friendly collaboration** — Flexible working hours allow meaningful overlap with
  US time zones for daily standups and review sessions.
- **Fast ramp-up on modern stacks** — Proven with Next.js, Express.js, Kubernetes, and other
  SaaS integrations used in this project. (Adapt this to match the actual tech stack from the
  attached files.)

---

### SECTION 6 — References

Heading: **References**

Opening sentence: "The following Upwork profiles were used to benchmark market rates across
regions and roles."

Three numbered groups (1. US Remote, 2. Europe Remote, 3. South Asia), each containing
four sub-sections by role (Full Stack Developer, DevOps Engineer, UI/UX Designer, Tech Lead),
each listing 5 Upwork profile URLs.

**Use the exact Upwork URLs from the sample list below verbatim — do not invent or modify
any URLs.**

```
1. US Remote
Full Stack Developer
https://www.upwork.com/freelancers/~014d4f896c530c3193?mp_source=share
https://www.upwork.com/freelancers/adamallam?mp_source=share
https://www.upwork.com/freelancers/~0157f208d3bf6ebff5?mp_source=share
https://www.upwork.com/freelancers/lkdev?mp_source=share
https://www.upwork.com/freelancers/~01f797275f19192eea?mp_source=share
DevOps Engineer
https://www.upwork.com/freelancers/spacerocket?mp_source=share
https://www.upwork.com/freelancers/crifasielliott?mp_source=share
https://www.upwork.com/freelancers/nelsgodfredson2?mp_source=share
https://www.upwork.com/freelancers/serverhelper?mp_source=share
https://www.upwork.com/freelancers/umairn?mp_source=share
UI/UX Designer
https://www.upwork.com/freelancers/sergeyreznik?mp_source=share
https://www.upwork.com/freelancers/kristinmciver?mp_source=share
https://www.upwork.com/freelancers/julieng?mp_source=share
https://www.upwork.com/freelancers/~0114ef502cc2d32a55?mp_source=share
https://www.upwork.com/freelancers/natalliagoroshko?mp_source=share
Tech Lead
https://www.upwork.com/freelancers/michaelklosner?mp_source=share
https://www.upwork.com/freelancers/~01b27cd8942c40e5ea?mp_source=share
https://www.upwork.com/freelancers/~0179b586dca8613427?mp_source=share
https://www.upwork.com/freelancers/nonara?mp_source=share
https://www.upwork.com/freelancers/~01626ab4a39a0756c4?mp_source=share

2. Europe Remote
Full Stack Developer
https://www.upwork.com/freelancers/~01925090a3b319f0de?mp_source=share
https://www.upwork.com/freelancers/~01e2c162c2d772977b?mp_source=share
https://www.upwork.com/freelancers/~017906686bd6b3cfc7?mp_source=share
https://www.upwork.com/freelancers/svitlanadev?mp_source=share
https://www.upwork.com/freelancers/sabirhussain?mp_source=share
DevOps Engineer
https://www.upwork.com/freelancers/fabricetriboix?mp_source=share
https://www.upwork.com/freelancers/ledis?mp_source=share
https://www.upwork.com/freelancers/maksympu?mp_source=share
https://www.upwork.com/freelancers/~01b00aef07ad919b00?mp_source=share
https://www.upwork.com/freelancers/~01b00aef07ad919b00?mp_source=share
UI/UX Designer
https://www.upwork.com/freelancers/~013796416c81608fad?mp_source=share
https://www.upwork.com/freelancers/sidor?mp_source=share
https://www.upwork.com/freelancers/~016cf0e4c29dd10a2b?mp_source=share
https://www.upwork.com/freelancers/~01e908f539a5339efd?mp_source=share
https://www.upwork.com/freelancers/~0113db0fe1301c338c?mp_source=share
Tech Lead
https://www.upwork.com/freelancers/~01504e86dbeddc7df2?mp_source=share
https://www.upwork.com/freelancers/iond9?mp_source=share
https://www.upwork.com/freelancers/andrewthepro?mp_source=share
https://www.upwork.com/freelancers/~016b3709d9d386d5a8?mp_source=share
https://www.upwork.com/freelancers/mykolas51?mp_source=share

3. South Asia
Full Stack Developer
https://www.upwork.com/freelancers/naumannaseer444?mp_source=share
https://www.upwork.com/freelancers/nooruddeen?mp_source=share
https://www.upwork.com/freelancers/muhammadadamc2?mp_source=share
https://www.upwork.com/freelancers/harisfullstackdeveloper?mp_source=share
https://www.upwork.com/freelancers/~017512f69372080923?mp_source=share
DevOps Engineer
https://www.upwork.com/freelancers/~01ad3a1340289ef7a8?mp_source=share
https://www.upwork.com/freelancers/bestdevops?mp_source=share
https://www.upwork.com/freelancers/~01ba20dc68a2d1f38f?mp_source=share
https://www.upwork.com/freelancers/zayandevops?mp_source=share
https://www.upwork.com/freelancers/~01ee253f6c3038464b?mp_source=share
UI/UX Designer
https://www.upwork.com/freelancers/~0115757cd3409d4abf?mp_source=share
https://www.upwork.com/freelancers/zuraizzafar?mp_source=share
https://www.upwork.com/freelancers/uxuidesignerupwork?mp_source=share
https://www.upwork.com/freelancers/sruiuxdesigner?mp_source=share
https://www.upwork.com/freelancers/~014743c9c381c3071c?mp_source=share
Tech Lead
https://www.upwork.com/freelancers/~011c64ff284fa023bf?mp_source=share
https://www.upwork.com/freelancers/~0171af25b7a3ca393b?mp_source=share
https://www.upwork.com/freelancers/jaykumarvaghani?mp_source=share
https://www.upwork.com/freelancers/~01edef3070378462c1?mp_source=share
https://www.upwork.com/freelancers/~012fed6987e9cd5f0c?mp_source=share
```

---

## DOCX GENERATION INSTRUCTIONS

Follow the SKILL.md docx instructions exactly. Key rules:
- US Letter page size (12240 × 15840 DXA), 1-inch margins
- Font: Arial throughout
- Never use unicode bullets — use LevelFormat.BULLET with numbering config
- Tables: dual widths (columnWidths array + width on every cell), ShadingType.CLEAR
- Total table width = 9360 DXA (US Letter with 1" margins)
- Cover page: centered, large bold title, followed by PageBreak
- Section headings: HeadingLevel.HEADING_1, run size 32, bold
- Sub-headings / table headers: bold TextRun
- TOTAL row in cost table: shading fill "EEEEEE", all cells bold
- **Section 0 (Why Act Now):** place before cover, no page break after
- **Section 4B (Implementation Safety):** shading fill "EBF3FB" (light blue) for the
  risk mitigation table, ShadingType.CLEAR

**Steps:**
1. Install: `npm install -g docx`
2. Write script to `/home/claude/generate_proposal.js`
3. Run: `node /home/claude/generate_proposal.js`
4. Validate: `python scripts/office/validate.py /home/claude/proposal.docx`
5. Fix any errors, re-run
6. Copy: `cp /home/claude/proposal.docx "/mnt/user-data/outputs/10_Proposal_[ClientName].docx"`
7. Call `present_files` with the output path

---

## WHAT TO ATTACH

| File | Role |
|------|------|
| `prompts/phase5_proposal/p5a_Proposal.md` | This prompt |
| `context/p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, Delivery Confidence, Adoption Risk, ROI Integrity |
| `context/p0b_Problem_Register_[ClientName].md` | PRIMARY — Current/Future problems, Stakeholder Map |
| `context/p4c_Tech_Spec_TreeRaise.docx` | SECONDARY — Screens, portals, phases, team, hours |

> The Decision Card and Problem Register are PRIMARY sources. They determine
> tone, risk disclosure, and Implementation Safety content. The Tech Spec
> provides the structural data (team, hours, screens).
> Estimated token usage: 20k–50k.

**Save output as:** `context/p5a_Proposal_[ClientName].docx`
