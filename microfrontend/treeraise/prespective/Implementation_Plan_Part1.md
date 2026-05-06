# Decision-Led Proof Perspective v2 — Implementation Plan

> **Scope**: Integrate the Decision Safety Operating System (v2) into the TreeRaise document generation pipeline.
> **Source**: `prespective/Decision_Led_Proof_Perspective_v2.md`
> **Target**: All prompts, context outputs, and pipeline docs under `microfrontend/treeraise/`

---

## Executive Summary

The v2 perspective introduces **8 mandatory artifacts** and upgrades every existing deliverable. This plan is split into **5 phases** of implementation, ordered by dependency chain. Each phase lists exact files to create/modify, micro-level tasks, and validation criteria.

### What Changes At a Glance

| Category | New Files | Modified Files |
|---|---|---|
| Pipeline infrastructure | 2 | 1 |
| Phase 0 (new) — Decision Card | 1 prompt | — |
| Phase 1 — Research | — | 1 prompt |
| Phase 3 — First Touch | — | 1 prompt |
| Phase 4 — Demo & Scoping | — | 3 prompts |
| Phase 5 — Proposal | — | 3 prompts |
| Post-deal (new) | 2 prompts | — |
| **Totals** | **5 new files** | **9 modified files** |

---

## Phase 1 of 5: Foundation — New Pipeline Layer & d0 Decision Card

**Goal**: Create the Phase 0 layer and the d0 Decision Card v2 prompt. This is the mandatory prerequisite for all downstream changes.

### Task 1.1 — Create Phase 0 folder

**Action**: Create new directory

```
prompts/phase0_decision_card/
```

**Micro-steps**:
1. Create folder `prompts/phase0_decision_card/`
2. This folder will hold the d0 prompt

---

### Task 1.2 — Create `d0_Decision_Card.md` prompt

**Action**: Create new file `prompts/phase0_decision_card/d0_Decision_Card.md`

**What this prompt must do**:
- Read all Phase 1 context files (same inputs as p4a)
- Output a structured Decision Card v2 markdown document
- Save output as `context/d0_Decision_Card_{PROSPECT}.md`

**Prompt content — required sections** (micro-level detail):

1. **Role statement**: "You are a decision intelligence analyst for a B2B web services company."

2. **Task statement**: Read attached research files, produce a Decision Card v2 that maps the buyer's desired outcome, current bottleneck, decision risks, required proof, ROI integrity, delivery confidence, stakeholder map, and recommended next action.

3. **Rule: Read all files first** — Extract:
   - The prospect's stated or inferred business goal / mission
   - Their buying reason (distinct from desired outcome)
   - Current manual/structural bottlenecks
   - Stakeholder roles visible in the data
   - Any financial metrics, volumes, or scale indicators
   - Signals of adoption risk (team size, tech maturity, change resistance)

4. **Rule: Separate Desired Outcome from Buying Reason**
   - Desired Outcome = what the org wants to achieve
   - Buying Reason = why they would approve change NOW
   - Both must be present; if buying reason is unclear, mark as "Hypothesis only"

5. **Rule: Buyer Confirmation Status** — Classify as:
   - `Confirmed` — buyer has stated this directly
   - `Partially confirmed` — strong inference from multiple signals
   - `Hypothesis only` — inferred from public data only

6. **Output template** — Use the exact d0 Decision Card v2 template from v2 perspective §6 (lines 271-319), which includes:
   - §1 Desired Outcome
   - §2 Buying Reason
   - §3 Current Bottleneck
   - §4 Buyer Confirmation Status
   - §5 Decision Risk
   - §6 Adoption Risk
   - §7 Required Proof table (Claim | Proof Needed | Screen/Artifact | Buyer Doubt Removed | Confidence)
   - §8 ROI Integrity table (Metric | Status | Label) using L1-L4 ladder
   - §9 Delivery Confidence table (Product fit | Delivery realism | Adoption readiness | Stakeholder alignment)
   - §10 Recommended Next Action

7. **Gate Rule**: Include a final assessment block:
   ```
   ## Investment Gate Assessment
   Based on the above analysis, this prospect qualifies for:
   [ ] Gate 1 — Snapshot Only
   [ ] Gate 2 — Discovery
   [ ] Gate 3 — Personalized Demo and Decision Report
   [ ] Gate 4 — Proposal
   ```

8. **WHAT TO ATTACH section**:
   | File | Role |
   |---|---|
   | `prompts/phase0_decision_card/d0_Decision_Card.md` | This prompt |
   | `context/p1a_Website.md` | Website research |
   | `context/p1b_Linkedin_Company.md` | Company LinkedIn |
   | `context/p1c_Linkedin_Owner.md` | Owner LinkedIn |
   | Any `context/p1d_*.md` files | Company documents |
   | `context/p1e_Job_Posting.md` | Job posting signals |
   | Discovery call notes (if available) | Direct buyer input |

9. **Save output as**: `context/d0_Decision_Card_{PROSPECT}.md`

**Validation**:
- [ ] Template matches v2 §6 structure exactly
- [ ] Buyer Confirmation Status field is present
- [ ] ROI Integrity uses L1-L4 ladder labels
- [ ] Delivery Confidence uses high/med/low scoring
- [ ] Investment Gate assessment is present

---

### Task 1.3 — Create Current & Future Problem Register prompt

**Action**: Create new file `prompts/phase0_decision_card/d0b_Problem_Registers.md`

**What this prompt must do**:
- Read the d0 Decision Card + Phase 1 context files
- Output two registers: Current Problem Register and Future Problem Register
- Save as `context/d0b_Problem_Registers_{PROSPECT}.md`

**Current Problem Register template** (from v2 §7):

| Current Problem | Evidence | Who Feels It | What It Blocks | Proof Needed |
|---|---|---|---|---|
| [problem] | [evidence] | [role] | [outcome blocked] | [screen/artifact] |

**Rules to encode in prompt**:
- Minimum 4, maximum 8 current problems
- Each must be traceable to Phase 1 research data
- Each must identify a specific role who feels the pain
- The top 3 must have viable demo proof — if not, flag as "No visible proof — cannot be lead claim"

**Future Problem Register template** (from v2 §8):

| Future Problem | Why It Will Happen | Leading Indicator | Business Risk | Preventive Narrative |
|---|---|---|---|---|
| [issue] | [reason] | [signal] | [risk] | [how platform prevents it] |

**Rules to encode in prompt**:
- Minimum 3 future problems
- Each must include a "Preventive Narrative" — a one-sentence framing of how the platform prevents this
- The prompt must instruct: "The report and proposal must include both the cost of the current bottleneck AND the cost of the future bottleneck if no system change happens"

**Validation**:
- [ ] Current problems are evidence-based, not invented
- [ ] Top 3 current problems each have a Proof Needed entry
- [ ] Future problems include leading indicators
- [ ] Preventive narratives are written in quotable sales language

---

### Task 1.4 — Update README.md pipeline documentation

**Action**: Modify `prompts/README.md`

**Micro-steps**:

1. **Add Phase 0 to the File Naming Convention** (after line 13):
   ```
   d0_   Phase 0 — Decision Card & Problem Registers
   ```

2. **Add Phase 0 to the 5-Phase Pipeline diagram** (make it 6-phase, line 35-41):
   ```
   PHASE 0 — Decision Card   Research → Decision Card + Problem Registers
   PHASE 1 — Research         Raw data → clean context files
   PHASE 2 — Outreach         Context → LinkedIn warming plan
   PHASE 3 — First Touch      Context → Decision Safety Brief (video sent cold)
   PHASE 4 — Demo & Scoping   Full analysis → working demos + demo pitch script
   PHASE 5 — Proposal         Demo outputs → Safe Change Case + Pitch + Blueprint
   POST    — Delivery & Learn  Deal outputs → Delivery Brief + Feedback Record
   ```

3. **Add Phase 0 section** with full documentation block matching the style of existing phases

4. **Update the folder structure diagram** (line 56-102):
   - Add `phase0_decision_card/` under `prompts/`
   - Add `d0_Decision_Card_{PROSPECT}.md` and `d0b_Problem_Registers_{PROSPECT}.md` under `context/`
   - Add `post_deal/` under `prompts/`

5. **Update the "How the Phases Connect" diagram** (line 453-461) to show d0 feeding into Phases 3, 4, and 5

6. **Update Token Budget table** to include Phase 0 estimates (~20k-40k tokens)

7. **Add the Investment Gate rule** as a new section:
   > No full personalized report, demo, or proposal may be created unless the Decision Card's Buyer Confirmation Status and Delivery Confidence are both visible.

**Validation**:
- [ ] All new files appear in the folder structure diagram
- [ ] Phase numbering is consistent throughout
- [ ] Token estimates are present for new phases
- [ ] Investment Gate rule is documented

---

## Phase 2 of 5: Upgrade Phase 3 — Outcome Report → Decision Safety Brief

**Goal**: Transform the Outcome Report prompt from a value narrative into a Decision Safety Brief.

### Task 2.1 — Modify `prompts/phase3_first_touch/p3a_Outcome_Report.md`

**Action**: Major rewrite of existing prompt

**What changes**:
The report structure (§5, lines 105-148) must be replaced with the Decision Safety Brief structure from v2 §14.

**Micro-steps**:

1. **Update the role statement** (line 1):
   - FROM: "You are an expert B2B sales strategist and web developer combined."
   - TO: "You are an expert B2B decision analyst and web developer combined. Your job is to produce a Decision Safety Brief, not a generic value pitch."

2. **Add new Rule 0 — Read the Decision Card first** (insert before Rule 1):
   ```
   ### 0. Read the Decision Card First
   Before reading any other file, read the d0 Decision Card and Problem Registers.
   Extract:
   - The Desired Outcome and Buying Reason
   - The Buyer Confirmation Status
   - The Current Problem Register (top 3 problems)
   - The Future Problem Register (top 3 problems)
   - The ROI Integrity classifications (L1-L4)
   - The Delivery Confidence scores
   
   These drive every section of the report. Do not proceed without them.
   ```

3. **Update Rule 3 — Outcome Quantification Method** (lines 64-90):
   - Add ROI Integrity Ladder enforcement:
   ```
   Every metric must be labeled with its integrity level:
   - L1 Sourced — directly from evidence. May lead.
   - L2 Estimated — reasonable estimate. May support, must be labeled.
   - L3 Proxy — indirect assumption. Illustrative only, never lead.
   - L4 Excluded — too weak. Do not use.
   
   No L3 or L4 metric may appear in the hero headline numbers.
   Only L1 metrics may lead the pitch. L2 may support with clear labeling.
   ```

4. **Replace Report Structure (Rule 5, lines 105-148)** with Decision Safety Brief structure:
   ```
   #### Section 1 — Hero
   - Company name + "Decision Safety Brief"
   - Three headline numbers — ONLY from L1/L2 metrics
   - Buyer Confirmation Status badge (Confirmed / Partial / Hypothesis)
   
   #### Section 2 — Desired Outcome
   - One paragraph: what the buyer is trying to achieve
   - If Buying Reason differs from Desired Outcome, show both
   
   #### Section 3 — Current Problem Register
   - Table from d0b: Problem | Evidence | Who Feels It | What It Blocks
   - Visual severity indicators (red/amber/green)
   
   #### Section 4 — Future Problem Register
   - Table from d0b: Future Problem | Why It Will Happen | Business Risk
   - Preventive narrative for each
   
   #### Section 5 — What Was Built to Remove the Bottleneck
   - Solution cards (keep existing 4-7 card format)
   - Each card must reference a specific Current Problem from Section 3
   - Add "Proof Status" badge: Visible in Demo / Described Only / Future State
   
   #### Section 6 — Proof Ledger Summary
   - Table: Claim | Evidence | Proof Condition | Remaining Doubt
   - Only claims with visible proof may lead
   
   #### Section 7 — Stakeholder Confidence
   - If stakeholder data is available, show abbreviated Stakeholder Map
   - Otherwise, show "Stakeholder mapping recommended during discovery"
   
   #### Section 8 — ROI Integrity Summary
   - Each metric shown with its L1-L4 label
   - Visual grouping: Sourced metrics → Estimated metrics → Excluded
   
   #### Section 9 — Recommended Next Action
   - Based on Investment Gate assessment from d0
   - CTA adjusted to gate level (discovery call vs. demo vs. proposal)
   ```

5. **Update WHAT TO ATTACH table** (lines 211-223):
   - Add `context/d0_Decision_Card_{PROSPECT}.md` as required input
   - Add `context/d0b_Problem_Registers_{PROSPECT}.md` as required input

6. **Update Save output as**: `context/p3a_Decision_Safety_Brief_{PROSPECT}.html`

**Validation**:
- [ ] Hero numbers only use L1/L2 metrics
- [ ] Current and Future Problem Registers are both present
- [ ] Each solution card traces back to a specific current problem
- [ ] ROI metrics show integrity labels
- [ ] CTA matches the Investment Gate level

---

## Phase 3 of 5: Upgrade Phase 4 — Demo & Scoping

**Goal**: Transform the demo from feature-tour to Proof Sequence, and inject decision safety into business analysis.

### Task 3.1 — Modify `p4a_Business_Operations_Doc_Generator.md`

**Action**: Add new output sections to the operations manual prompt

**Micro-steps**:

1. **Add Section 15 — Decision Safety Inputs** to the OUTPUT FORMAT (after Section 14):
   ```
   ## 15. Decision Safety Inputs
   
   ### 15.1 Probable Current Problems
   Identify 4-8 operational problems observable from the research.
   For each: Problem description | Evidence source | Affected role | Blocked outcome
   
   ### 15.2 Probable Future Problems
   If the business does not change, what breaks at scale?
   For each: Future problem | Why it will happen | Leading indicator
   
   ### 15.3 Stakeholder Landscape
   List visible stakeholders and their likely concerns:
   For each: Role | What They Want | What They Fear | Likely Support Level
   
   ### 15.4 Adoption Risk Signals
   Identify signals of potential adoption resistance:
   Team tech maturity | Process change magnitude | Training requirements
   ```

2. **Add Rule 10** to IMPORTANT RULES:
   ```
   10. Identify and flag every manual process, spreadsheet-based workflow, 
       and coordination bottleneck. These become the foundation for the 
       Decision Card's Current Bottleneck and the demo's Proof Sequence.
   ```

**Validation**:
- [ ] New sections produce structured data usable by d0 prompt
- [ ] Manual processes are explicitly called out

---

### Task 3.2 — Modify `p4b_Business_Report_Doc_Generator.md`

**Action**: Add Proof Ledger and Feasibility Gate outputs

**Micro-steps**:

1. **Add to the report requirements** (after item 6, line 10):
   ```
   7. **Proof Ledger**: For every recommended digital transformation, create a proof entry:
      Claim | Evidence | Proof Condition | Remaining Doubt | Backup Language
      
      Rule: If the proof condition cannot be shown in a demo, the claim cannot lead 
      the pitch. Flag it as "Supporting claim only."
   
   8. **Feasibility & Delivery Gate**: Score each proposed solution:
      | Area | Rating (High/Med/Low) |
      | Feasibility | ... |
      | Adoption ease | ... |
      | Data trust | ... |
      | Delivery effort | ... |
      
      Rule: If any lead solution scores "Low" in any area, flag it as 
      "Reframe as future-state vision" or "Remove from core pitch."
   
   9. **ROI Integrity Classification**: Every metric in the Impact Assessment 
      must be labeled: L1 Sourced | L2 Estimated | L3 Proxy | L4 Excluded.
   ```

**Validation**:
- [ ] Proof Ledger is produced as structured table
- [ ] Feasibility scores use High/Med/Low scale
- [ ] ROI metrics carry integrity labels

---

### Task 3.3 — Modify `p4e_Demo_Pitch.md`

**Action**: Transform from feature-tour script to Proof Sequence script

**Micro-steps**:

1. **Update the role statement** (line 1):
   - Add: "The demo is a Proof Sequence — every screen must prove a specific buyer doubt is solved."

2. **Add new Rule — Read the Decision Card** (insert into WHAT TO READ FIRST, line 15):
   ```
   ### From the Decision Card and Problem Registers, extract:
   - The Current Bottleneck (this is what Screen 1 must expose)
   - The Required Proof table (each proof item maps to a screen)
   - The top 3 Current Problems (these drive screen selection)
   - The Stakeholder Decision Map (tailor language to audience)
   - The Delivery Confidence scores (avoid areas rated "Low")
   ```

3. **Replace the section order** (lines 95-216) with Proof Sequence order from v2 §14:
   ```
   ### 00 SECTION — Hook (unchanged structure, new framing rule)
   Open with the current bottleneck, not a feature.
   
   ### 01 SECTION — Expose the Current Bottleneck
   Show the exact manual process that is broken. Use the Current Problem 
   Register's top item. The screen must make the pain visible.
   
   ### 02 SECTION — Show the Workflow That Removes It
   Navigate to the screen that directly automates or replaces the bottleneck.
   Reference the Proof Ledger: state the Proof Condition being met.
   
   ### 03 SECTION — Show Operator Usability
   Demonstrate that the daily user can actually use this without confusion.
   Address Adoption Risk from the Decision Card.
   
   ### 04 SECTION — Show Leadership Visibility and Control
   Show analytics, dashboards, or reporting screens that give leadership 
   the oversight they currently lack.
   
   ### 05 SECTION — Show Future Problem Prevention
   Reference the Future Problem Register. Show how the platform prevents 
   the next stage of growth from breaking operations.
   
   ### 06 SECTION — Before vs After (keep existing structure)
   
   ### 07 SECTION — Next Step (adjusted for Investment Gate level)
   ```

4. **Update WHAT TO ATTACH**:
   - Add `context/d0_Decision_Card_{PROSPECT}.md`
   - Add `context/d0b_Problem_Registers_{PROSPECT}.md`

**Validation**:
- [ ] Demo opens with bottleneck, not feature
- [ ] Every screen maps to a Proof Ledger entry
- [ ] Future Problem Prevention section exists
- [ ] Adoption risk is addressed in operator section

---

## Phase 4 of 5: Upgrade Phase 5 — Proposal Suite

**Goal**: Transform the proposal from a cost document into a Safe Change Case.

### Task 4.1 — Modify `p5a_Proposal.md`

**Micro-steps**:

1. **Add new Section 0 — Decision Context** before Section 1:
   ```
   ### SECTION 0 — Why Act Now
   - One paragraph: the current bottleneck and its business cost
   - One paragraph: what breaks if nothing changes (from Future Problem Register)
   - One paragraph: what proof already exists (from Proof Ledger summary)
   ```

2. **Add Section 7 — Adoption & Implementation Safety** after Section 6:
   ```
   ### SECTION 7 — Implementation Safety
   - Delivery Confidence summary from Decision Card
   - Adoption risk mitigation plan
   - What training/support is included
   - Stakeholder alignment status
   ```

3. **Add Section 8 — ROI by Integrity Level**:
   ```
   ### SECTION 8 — ROI Scenarios by Integrity Level
   Table showing:
   - L1 Sourced metrics — confident projections
   - L2 Estimated metrics — reasonable projections with assumptions stated
   - Note: L3/L4 metrics excluded from proposal
   ```

4. **Update WHAT TO ATTACH**:
   - Add `context/d0_Decision_Card_{PROSPECT}.md`
   - Add `context/d0b_Problem_Registers_{PROSPECT}.md`

---

### Task 4.2 — Modify `p5b_Proposal_Pitch.md`

**Micro-steps**:

1. **Update Section index line** (line 70):
   - FROM: `00 Intro  01 Phases  02 Team ⚠  03 Timeline ⚠  04 Cost ✓  05 Discovery ★`
   - TO: `00 Why Now  01 Proof  02 Phases  03 Team ⚠  04 Timeline ⚠  05 Cost ✓  06 Safety  07 Discovery ★`

2. **Add new Section 00 — Why Act Now** (replace current intro):
   - Open with the current bottleneck (from Decision Card)
   - State what breaks if nothing changes (Future Problem Register)
   - Reference proof that already exists

3. **Add new Section 01 — What Proof Exists**:
   - Summarize the Proof Ledger
   - Reference specific demo screens the prospect has already seen
   - Address the top Remaining Doubt from the Proof Ledger

4. **Add Section 06 — Implementation Safety** (new):
   - Delivery Confidence summary
   - Adoption risk mitigation
   - Stakeholder alignment status

5. **Update QA Section** — Add two new Q&A items:
   - "What if our team doesn't adopt the new system?" → Adoption risk mitigation plan
   - "How do you know these ROI numbers are accurate?" → ROI Integrity Ladder explanation

---

### Task 4.3 — Modify `p5c_Proposal_Development_Blueprint.md`

**Micro-steps** (minimal changes):

1. Add a new text block in the Header section showing the Decision Card's Buyer Confirmation Status
2. No structural changes needed — blueprint is a visual delivery plan, not a narrative document

---

## Phase 5 of 5: Post-Deal Layer — Delivery Brief & Feedback Loop

**Goal**: Create the two new post-deal prompts that close the system loop.

### Task 5.1 — Create post-deal folder

**Action**: Create `prompts/post_deal/`

---

### Task 5.2 — Create Delivery Intent Brief prompt

**Action**: Create `prompts/post_deal/p6a_Delivery_Intent_Brief.md`

**Template from v2 §15**:

| Section | Required Content |
|---|---|
| Buyer outcome | What the buyer actually cared about |
| Bottleneck solved | What manual/process problem was central |
| Lead proof used | What screens/artifacts won trust |
| Adoption risks | Where user behavior may fail |
| Metrics promised | Which metrics were used and at what integrity level |
| Non-negotiable trust areas | What must feel reliable in delivery |

**Prompt must**:
- Read the d0 Decision Card, Proof Ledger, and Proposal
- Output structured brief for the implementation team
- Save as `context/p6a_Delivery_Intent_Brief_{PROSPECT}.md`

**WHAT TO ATTACH**:
| File | Role |
|---|---|
| `context/d0_Decision_Card_{PROSPECT}.md` | Decision context |
| `context/d0b_Problem_Registers_{PROSPECT}.md` | Problem registers |
| `context/p5a_Proposal_{PROSPECT}.docx` | What was promised |

---

### Task 5.3 — Create Outcome Feedback Loop prompt

**Action**: Create `prompts/post_deal/p6b_Outcome_Feedback_Record.md`

**Template from v2 §16**:

| Field | What to Capture |
|---|---|
| Prospect type | nonprofit / SaaS / services / other |
| Desired outcome | what they cared about most |
| Current bottleneck | what was visibly broken |
| Decision risk | what nearly blocked the deal |
| Winning proof | which screen or artifact created belief |
| Weak proof | what failed or felt thin |
| ROI pushback | which numbers were challenged |
| Result | no reply / discovery / demo / proposal / won / lost |

**Prompt must**:
- Accept free-form notes from the sales team
- Structure them into the Pattern Library format
- Save as `context/p6b_Feedback_{PROSPECT}.md`

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Token budget exceeded with Decision Card + Problem Registers as new inputs | Medium | High | Decision Card is lean markdown (~2k tokens). Problem Registers ~1.5k tokens. Total new input: ~3.5k — well within 190k limit |
| Prompt complexity increases AI error rate | Medium | Medium | Each prompt change is additive (new sections), not restructural. Existing logic preserved |
| Team workflow disruption — adding Phase 0 | Low | Medium | Phase 0 uses same inputs as p4a. No new data collection needed |
| Backward compatibility — existing TreeRaise outputs | Low | Low | Existing context/ files remain valid. New outputs are additive |
| Over-engineering risk (v2 §20) | Medium | High | Investment Gates prevent unnecessary work. Gate 1 (Snapshot) is deliberately lightweight |

---

## Execution Order Summary

```
STEP 1  Create prompts/phase0_decision_card/ folder
STEP 2  Create d0_Decision_Card.md prompt
STEP 3  Create d0b_Problem_Registers.md prompt
STEP 4  Update prompts/README.md with Phase 0, post-deal, new naming
STEP 5  Modify p3a_Outcome_Report.md → Decision Safety Brief
STEP 6  Modify p4a_Business_Operations_Doc_Generator.md (add §15)
STEP 7  Modify p4b_Business_Report_Doc_Generator.md (add Proof Ledger + Feasibility)
STEP 8  Modify p4e_Demo_Pitch.md → Proof Sequence
STEP 9  Modify p5a_Proposal.md (add Why Now, Safety, ROI Integrity)
STEP 10 Modify p5b_Proposal_Pitch.md (add Why Now, Proof, Safety sections)
STEP 11 Modify p5c_Proposal_Development_Blueprint.md (minor — add status badge)
STEP 12 Create prompts/post_deal/ folder
STEP 13 Create p6a_Delivery_Intent_Brief.md prompt
STEP 14 Create p6b_Outcome_Feedback_Record.md prompt
```

---

## Testing & Validation Plan

### Per-prompt validation:
1. Run each modified prompt against existing TreeRaise context files
2. Verify output structure matches the v2 artifact templates
3. Verify ROI Integrity labels appear on all financial metrics
4. Verify Proof Ledger entries map to real demo screens
5. Verify Investment Gate assessment is internally consistent

### End-to-end validation:
1. Run full pipeline: Phase 0 → Phase 1 (existing) → Phase 3 → Phase 4 → Phase 5 → Post-deal
2. Verify d0 Decision Card data flows through all downstream outputs
3. Verify no deliverable is produced that violates Investment Gate rules
4. Verify Delivery Intent Brief captures all promises made in proposal
5. Verify Feedback Record structure is complete and actionable
