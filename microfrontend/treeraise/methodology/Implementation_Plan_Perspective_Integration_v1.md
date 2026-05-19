# Implementation Plan: Perspective Router + Strategy Packet Integration

## 1. Objective

Implement the perspective system into the existing TreeRaise prompt pipeline so the
AI can:

1. read company and founder research
2. decide which perspective is the better fit for that company
3. produce one unified strategy packet that downstream prompts can consume
4. generate reports, demos, proposals, and handoff artifacts from that strategy
5. keep the demo route, proof logic, and narrative logic aligned end to end

This plan assumes the active perspectives are:

- `prespective/Vision_Led_Perspective_v5.md` (current v6 Priority Stack framework)
- `prespective/Decision_Led_Proof_Perspective_v2.md`

This plan does **not** assume application runtime code changes inside a Next.js app.
The current TreeRaise implementation surface is a **prompt-driven document pipeline**
with HTML portal artifacts and generated context files.

---

## 2. Current System Map

### Existing modules

- `microfrontend/treeraise/prompts/`
- `microfrontend/treeraise/context/`
- `microfrontend/treeraise/portals/`
- `microfrontend/treeraise/prespective/`

### Existing prompt flow

```text
Phase 1: Research
Phase 2: Outreach
Phase 3: First Touch
Phase 4: Demo + Scoping
Phase 5: Proposal
```

### Current problem in the pipeline

The pipeline still assumes downstream prompts can go directly from Phase 1 research
to deliverables. That is now the main architectural gap.

The perspective system requires a new strategy layer between research and deliverable
generation. Without that layer:

- different prompts will interpret the same company differently
- the chosen perspective will not persist across phases
- the demo can drift away from the manual bottlenecks identified in research
- proposal framing can ignore decision risk, ROI integrity, and proof confidence

---

## 3. Target Architecture

### New target flow

```text
Phase 1: Research
Phase 0A: Perspective Router
Phase 0B: Unified Strategy Packet
Phase 2: Outreach
Phase 3: First Touch
Phase 4A: Scoping Docs
Phase 4B: Portal Implementation
Phase 4C: Screen Inventory + Demo Route
Phase 4D: Demo Pitch
Phase 5: Proposal Suite
Post-Sale: Delivery Intent Brief
```

### Core architectural decision

Do **not** make every downstream prompt read both perspective files and decide
again. That would create inconsistency.

Instead:

1. run one **Perspective Router**
2. produce one **Unified Strategy Packet**
3. make every downstream prompt read that packet first

### Why this is the right implementation shape

- it keeps the perspective choice stable
- it prevents each prompt from improvising a different interpretation
- it reduces token waste versus repeatedly attaching both perspective files
- it gives the system one contract to validate

---

## 4. Files to Modify

### 4.1 Existing files to modify

#### Documentation and pipeline contract

- `microfrontend/treeraise/prompts/README.md`

#### Phase 2 prompt

- `microfrontend/treeraise/prompts/phase2_outreach/p2a_Lead_Warming.md`

#### Phase 3 prompt

- `microfrontend/treeraise/prompts/phase3_first_touch/p3a_Outcome_Report.md`

#### Phase 4 prompts

- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4b_Business_Report_Doc_Generator.md`
- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4c_Tech_Spec_Doc_Generator.md`
- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4d_TreeRaise_Implementation_Changes.md`
- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4e_Demo_Pitch.md`

#### Phase 5 prompts

- `microfrontend/treeraise/prompts/phase5_proposal/p5a_Proposal.md`
- `microfrontend/treeraise/prompts/phase5_proposal/p5b_Proposal_Pitch.md`
- `microfrontend/treeraise/prompts/phase5_proposal/p5c_Proposal_Development_Blueprint.md`

#### Optional one-time portal consistency cleanup

- `microfrontend/treeraise/portals/p4d_admin.html`
- `microfrontend/treeraise/portals/p4d_partner-portal.html`

### 4.2 Existing files that should remain read-only inputs

- all `microfrontend/treeraise/context/p1*.md` files
- `microfrontend/treeraise/prespective/Vision_Led_Perspective_v5.md`
- `microfrontend/treeraise/prespective/Decision_Led_Proof_Perspective_v2.md`
- `microfrontend/treeraise/prompts/phase1_research/*`
- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4a_Business_Operations_Doc_Generator.md`

`p4a` should remain mostly framework-neutral. It extracts raw operational reality
and should not become too sales-opinionated.

---

## 5. Files to Create

### 5.1 New prompt folder

Create:

- `microfrontend/treeraise/prompts/phase0_strategy/`

### 5.2 New prompt files

Create:

- `microfrontend/treeraise/prompts/phase0_strategy/p0a_Perspective_Router.md`
- `microfrontend/treeraise/prompts/phase0_strategy/p0b_Strategy_Packet.md`
- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4d_Screen_Inventory.md`
- `microfrontend/treeraise/prompts/phase4_demo_scoping/p4d_Demo_Route.md`
- `microfrontend/treeraise/prompts/phase5_proposal/p5d_Delivery_Intent_Brief.md`

### 5.3 New generated context outputs

These are generated by the prompts above and stored in the flat `context/` folder:

- `microfrontend/treeraise/context/p0a_Perspective_Selection.md`
- `microfrontend/treeraise/context/p0b_Strategy_Packet.md`
- `microfrontend/treeraise/context/p4d_Screen_Inventory.md`
- `microfrontend/treeraise/context/p4d_Demo_Route.md`
- `microfrontend/treeraise/context/p5d_Delivery_Intent_Brief.md`

### 5.4 Optional validation helpers

If lightweight automation is desired, create:

- `microfrontend/treeraise/scripts/validate_strategy_packet.mjs`
- `microfrontend/treeraise/scripts/validate_demo_route.mjs`
- `microfrontend/treeraise/scripts/check_prompt_contracts.mjs`

These are optional. The system can function without them, but they reduce drift.

---

## 6. Data Contract to Standardize

The most important technical decision is the shape of the unified strategy packet.
Every downstream prompt must rely on the same section names.

### Required sections in `context/p0b_Strategy_Packet.md`

1. `Selected Perspective`
2. `Selection Confidence`
3. `Why This Perspective Won`
4. `Primary Goal / Future Outcome`
5. `Supporting Goal or Secondary Lens`
6. `Buying Reason`
7. `Current Bottleneck`
8. `Current Problem Register`
9. `Future Problem Register`
10. `Stakeholder Decision Map`
11. `Decision Risk`
12. `Adoption Risk`
13. `Required Proof Table`
14. `Proof Ledger`
15. `ROI Integrity`
16. `Delivery Confidence`
17. `Recommended Investment Gate`
18. `Recommended Next Action`
19. `Narrative Formula`
20. `Demo Routing Requirements`

### Required fields inside `Demo Routing Requirements`

- `Opening Screen Rule`
- `Opening Screen Type`
- `Ordered Proof Route`
- `Fallback Opening Screen`
- `Strategic Unlock Position`
- `Screens That Must Not Lead`

This section is conceptual at Phase 0. It describes what the demo route must prove.
It does **not** yet assume the exact final HTML screen list exists.

---

## 7. Dependencies, Integrations, and System Impacts

### 7.1 Runtime/package dependencies

No new npm package dependency is required for the base implementation.

The current system already relies on:

- Markdown prompt files
- generated Markdown, HTML, and DOCX outputs
- AI docx generation workflow
- Chart.js CDN in HTML outputs

### 7.2 Token budget impact

The prompt pipeline currently documents a `190k` token limit per Claude session.
Adding perspective routing and strategy artifacts will increase context size.

Mitigation:

- keep `p0a_Perspective_Selection.md` short
- make `p0b_Strategy_Packet.md` structured and table-driven
- do not reattach raw perspective files to every downstream phase
- attach only the generated packet after Phase 0

### 7.3 Cross-phase integration impact

The new files introduce hard dependencies:

- `p0a_Perspective_Router.md` depends on both perspective files + Phase 1 context
- `p0b_Strategy_Packet.md` depends on `p0a` output + Phase 1 context
- `p3a`, `p4b`, `p4c`, `p4d`, `p4e`, `p5a`, `p5b`, `p5c` all depend on `p0b_Strategy_Packet.md`
- `p4d_Demo_Route.md` depends on `p0b_Strategy_Packet.md` + `p4d_Screen_Inventory.md`
- `p4e_Demo_Pitch.md` depends on `p0b_Strategy_Packet.md` + `p4d_Demo_Route.md` + portal HTML
- `p5d_Delivery_Intent_Brief.md` depends on `p0b_Strategy_Packet.md` + proposal/demo outputs

### 7.4 Portal artifact impact

The demo-routing framework is only reliable if portal screens are identifiable.

This means the system must ensure:

- nav labels are stable
- page titles are visible and unique
- conceptual proof screens can be mapped to actual screens

If current portal labels are ambiguous, a one-time cleanup is required in the HTML.

---

## 8. Phase-by-Phase Execution Plan

## Phase 1 - Define the new pipeline contract

### Goal

Add the Phase 0 strategy layer to the system contract before changing downstream prompts.

### Files

- modify `prompts/README.md`

### Micro tasks

1. Add a new top-level pipeline phase named `Phase 0 - Strategy`.
2. Insert `p0_` naming into the file naming convention section.
3. Add the new execution order showing that Phase 0 runs after Phase 1 and before Phase 2/3.
4. Document the new generated outputs:
   - `context/p0a_Perspective_Selection.md`
   - `context/p0b_Strategy_Packet.md`
   - `context/p4d_Screen_Inventory.md`
   - `context/p4d_Demo_Route.md`
   - `context/p5d_Delivery_Intent_Brief.md`
5. Update the folder structure block to include `prompts/phase0_strategy/`.
6. Add a dependency note stating that all downstream prompts must read the strategy packet first.
7. Fix any stale references that imply Phase 3 can run directly from Phase 1 without Phase 0.

### Validation

- README contains `Phase 0`
- naming examples are consistent
- no downstream phase documentation contradicts the new order

---

## Phase 2 - Create the Perspective Router

### Goal

Create a prompt that chooses the best-fit perspective for a given company using
evidence and explicit scoring.

### Files

- create `prompts/phase0_strategy/p0a_Perspective_Router.md`

### Micro tasks

1. Write the prompt so it reads:
   - both perspective files
   - relevant Phase 1 context files
   - optional founder/CEO context if available
2. Force the prompt to output one primary framework, not an ambiguous blend.
3. Require scoring across at least:
   - strategic fit
   - evidence fit
   - demo fit
   - stakeholder fit
   - ROI defensibility
   - decision safety
   - operational reuse
4. Require the output to explicitly state:
   - winning perspective
   - support perspective, if any
   - confidence level
   - main reason it won
   - main risk in that choice
5. Make the output short and structured so downstream prompts do not carry both frameworks forward.

### Output file

- `context/p0a_Perspective_Selection.md`

### Validation

- output always names exactly one primary perspective
- output includes a confidence level
- output explains why the loser lost

---

## Phase 3 - Create the Unified Strategy Packet

### Goal

Translate the selected perspective plus research into one canonical planning artifact.

### Files

- create `prompts/phase0_strategy/p0b_Strategy_Packet.md`

### Micro tasks

1. Instruct the prompt to read:
   - `context/p0a_Perspective_Selection.md`
   - all relevant `context/p1*.md` research files
   - optionally existing ops/docs if helpful
2. Require the exact section contract listed in Section 6 of this plan.
3. Make the prompt perspective-aware:
   - if Vision-Led wins, emphasize goal/mission/priority stack in the packet
   - if Decision-Led wins, emphasize buying reason/proof/risk/adoption in the packet
4. Standardize the output fields so downstream prompts do not care which perspective won.
5. Require `Current Problem Register` and `Future Problem Register`.
6. Require `Proof Ledger`.
7. Require `ROI Integrity`.
8. Require `Demo Routing Requirements`.
9. Require `Recommended Investment Gate`.
10. Require `Recommended Next Action`.

### Output file

- `context/p0b_Strategy_Packet.md`

### Validation

- every required section exists
- goal, bottleneck, risk, proof, and gate are all present
- output is structurally consistent across both perspective types

---

## Phase 4 - Refactor the outreach prompt to consume strategy

### Goal

Make outreach smarter without making it overly salesy.

### Files

- modify `prompts/phase2_outreach/p2a_Lead_Warming.md`

### Micro tasks

1. Add `WHAT TO READ FIRST` instruction for `context/p0b_Strategy_Packet.md`.
2. Tell the prompt to use the selected perspective only as internal guidance, not explicit messaging.
3. If the selected perspective is Vision-Led:
   - allow comments to align with the founder's future goal or mission themes
4. If the selected perspective is Decision-Led:
   - bias toward operational and decision-relevant overlap
5. Prevent the prompt from referencing speculative goals unless they are high-confidence in the packet.
6. Make sure shared-ground analysis can pull from:
   - future goal
   - manual bottleneck
   - decision risk
7. Keep the outward tone natural and non-pitchy.

### Validation

- comments do not invent buyer goals
- comments remain useful even if the future goal is only a hypothesis

---

## Phase 5 - Refactor Phase 3 first-touch generation

### Goal

Make first-touch output obey the investment gate and selected perspective.

### Files

- modify `prompts/phase3_first_touch/p3a_Outcome_Report.md`

### Micro tasks

1. Add a mandatory read of `context/p0b_Strategy_Packet.md`.
2. If `Recommended Investment Gate` is Gate 1:
   - output a lightweight impact snapshot, not a heavy ROI report
3. If Gate 2:
   - output a constrained report with flagged assumptions and a discovery CTA
4. If Gate 3 or 4:
   - output the full first-touch report aligned to the selected perspective
5. Replace the current always-on metric assumption (`hours saved`, `cost impact`, `workflows automated`) with strategy-aware metrics:
   - Vision-Led: allow capacity/goal/friction metrics
   - Decision-Led: allow proof/risk/current bottleneck/next-action framing
6. Add explicit `L1/L2/L3/L4` ROI rules from the strategy packet.
7. Prevent hero metrics from leading with weak estimates.
8. Ensure the CTA matches the gate:
   - discovery ask
   - demo ask
   - proposal progression

### Validation

- one prompt can produce different output modes by gate
- no L3/L4 metric appears in hero numbers
- report language changes when the selected perspective changes

---

## Phase 6 - Refactor scoping documents

### Goal

Make scoping docs align with the selected strategy, not just generic business transformation.

### Files

- modify `prompts/phase4_demo_scoping/p4b_Business_Report_Doc_Generator.md`
- modify `prompts/phase4_demo_scoping/p4c_Tech_Spec_Doc_Generator.md`

### `p4b` micro tasks

1. Add `context/p0b_Strategy_Packet.md` as mandatory input.
2. Reframe the generated document from generic company report toward a strategy-aligned report.
3. Add required sections:
   - selected perspective summary
   - primary goal / buying reason
   - current problem register
   - future problem register
   - stakeholder concerns
   - recommended digital response
4. Ensure every recommended solution maps back to the bottlenecks and proof items in the packet.

### `p4c` micro tasks

1. Add `context/p0b_Strategy_Packet.md` as mandatory input.
2. Require the tech spec to preserve the proof architecture needed by the demo.
3. Add a section in the tech spec:
   - `Proof-Critical Screens and Modules`
4. Map each proof-critical screen to:
   - user role
   - module
   - required data
   - risk if missing
5. Add `non-negotiable trust areas` derived from:
   - decision risk
   - adoption risk
   - delivery confidence

### Validation

- p4b solutions align with packet bottlenecks
- p4c includes proof-critical modules that the demo later depends on

---

## Phase 7 - Refactor the implementation-change prompt

### Goal

Make portal implementation support the strategy packet and future demo routing.

### Files

- modify `prompts/phase4_demo_scoping/p4d_TreeRaise_Implementation_Changes.md`

### Micro tasks

1. Add `context/p0b_Strategy_Packet.md` and `context/p4c_Tech_Spec_TreeRaise.docx` as mandatory inputs.
2. Add a new instruction block: `Proof Screen Coverage Requirements`.
3. Require the implementation changes to ensure every lead proof item in the packet has:
   - a visible screen
   - a stable title
   - a clear nav path
4. Require stable and human-readable screen names that can be reused in the demo route.
5. Require any new KPI cards or proof panels to align with the selected perspective.
6. Add a rule that the implementation prompt must not create impressive but irrelevant screens.

### Optional portal HTML cleanup tasks

If `p4d_admin.html` or `p4d_partner-portal.html` contain ambiguous labels:

1. normalize page headings
2. ensure every major screen has a visible title
3. align sidebar labels with screen titles
4. reduce duplicate names across screens

### Validation

- portal screens can be referred to consistently by name
- proof-critical screens exist after implementation

---

## Phase 8 - Add screen inventory extraction

### Goal

Create a structured inventory of actual portal screens after the HTML portals exist.

### Files

- create `prompts/phase4_demo_scoping/p4d_Screen_Inventory.md`

### Micro tasks

1. Make the prompt read:
   - `portals/p4d_admin.html`
   - `portals/p4d_partner-portal.html`
2. Require output sections for:
   - portal name
   - nav items
   - page/screen names
   - screen purpose
   - obvious proof value
   - notable actions
3. Make the output compact and table-driven.
4. Use stable screen naming that matches what the demo route and proof ledger will reference.

### Output file

- `context/p4d_Screen_Inventory.md`

### Validation

- every navigable demo screen appears once
- screen naming matches portal HTML

---

## Phase 9 - Add final demo route generation

### Goal

Turn the conceptual route from the strategy packet into the final concrete route
using actual portal screens.

### Files

- create `prompts/phase4_demo_scoping/p4d_Demo_Route.md`
- modify `prompts/phase4_demo_scoping/p4e_Demo_Pitch.md`

### `p4d_Demo_Route.md` micro tasks

1. Read:
   - `context/p0b_Strategy_Packet.md`
   - `context/p4d_Screen_Inventory.md`
2. Select the actual opening screen using:
   - top current problem
   - proof confidence
   - decision risk
3. Output:
   - Opening Screen
   - Ordered Proof Route
   - Fallback Opening Screen
   - Why each screen appears in order
   - Which manual operation each screen proves

### Output file

- `context/p4d_Demo_Route.md`

### `p4e_Demo_Pitch.md` micro tasks

1. Add mandatory inputs:
   - `context/p0b_Strategy_Packet.md`
   - `context/p4d_Demo_Route.md`
   - portal HTML files
2. Remove any freedom to improvise screen order.
3. Force the script to follow the ordered route.
4. Force the hook to match:
   - selected perspective
   - current bottleneck
   - opening screen proof
5. Force strategic upside to appear only after proof screens.

### Validation

- demo opener is deterministic
- route persists from analysis to script
- every demo screen maps to a proof item and a manual operation

---

## Phase 10 - Refactor proposal generation

### Goal

Make proposal outputs obey the selected perspective, strategy packet, proof ledger,
and ROI integrity rules.

### Files

- modify `prompts/phase5_proposal/p5a_Proposal.md`
- modify `prompts/phase5_proposal/p5b_Proposal_Pitch.md`
- modify `prompts/phase5_proposal/p5c_Proposal_Development_Blueprint.md`
- create `prompts/phase5_proposal/p5d_Delivery_Intent_Brief.md`

### `p5a_Proposal.md` micro tasks

1. Add `context/p0b_Strategy_Packet.md` as mandatory input.
2. Add a required section:
   - `Why This Buyer Should Change Now`
3. Add a required section:
   - `Decision Risks and Mitigations`
4. Add a required section:
   - `Proof Already Established`
5. Enforce ROI integrity:
   - L1 may lead
   - L2 may support
   - L3 illustrative only
   - L4 excluded
6. If delivery confidence contains Low ratings, require mitigation language.

### `p5b_Proposal_Pitch.md` micro tasks

1. Add `context/p0b_Strategy_Packet.md` as mandatory input.
2. Make the spoken script address the main decision risk directly.
3. Make the pitch use the same selected perspective that won in Phase 0.
4. Keep technical explanations aligned with the same proof and trust logic used in the demo.

### `p5c_Proposal_Development_Blueprint.md` micro tasks

1. Add `context/p0b_Strategy_Packet.md` as mandatory input.
2. Make the blueprint highlight proof-critical screens/modules, not only all screens equally.
3. Preserve any non-negotiable trust areas from the packet.

### `p5d_Delivery_Intent_Brief.md` micro tasks

1. Read:
   - `context/p0b_Strategy_Packet.md`
   - proposal output
   - demo route output
2. Produce a handoff brief containing:
   - buyer outcome
   - bottleneck solved
   - lead proof used
   - adoption risks
   - metrics promised
   - trust-sensitive areas

### Output file

- `context/p5d_Delivery_Intent_Brief.md`

### Validation

- proposal framing matches selected perspective
- no weak metrics lead financial sections
- delivery handoff preserves the sales truth

---

## Phase 11 - Deprecate or supersede outdated internal docs

### Goal

Prevent internal confusion between old and new implementation plans.

### Files

- optionally update `microfrontend/treeraise/prespective/Implementation_Plan_Part1.md`

### Micro tasks

1. Add a note at the top of `Implementation_Plan_Part1.md` marking it as superseded.
2. Point readers to this new implementation plan file as the canonical source.
3. Do not delete the old file until the new system is implemented and verified.

### Validation

- only one plan is treated as canonical

---

## 9. Detailed Testing and Validation Requirements

## 9.1 Contract validation

Verify:

- `p0a` output always chooses one primary perspective
- `p0b` always emits all required packet sections
- every downstream prompt explicitly reads `p0b_Strategy_Packet.md`

## 9.2 Gate validation

Run at least three dry-run scenarios:

1. clear mission / clear goal / strong evidence
2. weak public data / unclear buying reason
3. strong current bottleneck / weak ROI math / high proof clarity

Expected results:

- scenario 1 can select Vision-Led or hybrid
- scenario 2 routes to Gate 1 or Gate 2
- scenario 3 selects Decision-Led and suppresses weak ROI claims

## 9.3 Demo-route validation

Verify:

- a concrete `Opening Screen` is always chosen
- `Ordered Proof Route` is stored in `context/p4d_Demo_Route.md`
- `p4e_Demo_Pitch.md` follows that route exactly
- every route screen exists in `p4d_Screen_Inventory.md`

## 9.4 Proof validation

For sample runs:

- each lead claim in report/demo/proposal must have a matching proof entry
- if a claim has no proof, it must be demoted or removed

## 9.5 ROI validation

Verify:

- no L3 or L4 metric appears in hero stats
- no proposal financial table contains excluded metrics
- scripts use directional language when only L3 data exists

## 9.6 Regression validation

Ensure the changes do not break:

- docx generation format requirements
- HTML self-contained output requirements
- existing portal implementation flow
- existing file naming conventions

---

## 10. Major Risks and How to Handle Them

### Risk 1 - Token sprawl

If the strategy packet becomes too long, downstream prompts will become expensive and inconsistent.

Mitigation:

- keep packet highly structured
- use tables instead of long prose
- avoid duplicating research quotes unnecessarily

### Risk 2 - Perspective drift across phases

If a downstream prompt reinterprets the company instead of using the selected strategy,
the system will split into multiple narratives.

Mitigation:

- make `p0b_Strategy_Packet.md` mandatory
- forbid perspective re-selection downstream

### Risk 3 - Conceptual route vs actual portal screens

The strategy packet may demand proof screens that the portals do not actually expose.

Mitigation:

- use `p4d_Screen_Inventory.md`
- generate `p4d_Demo_Route.md` only after portal HTML exists

### Risk 4 - Weak public evidence

The router may choose a perspective based on incomplete data.

Mitigation:

- use confidence scoring
- let low-confidence cases fall to Gate 1 or Gate 2

### Risk 5 - Outdated generated outputs

Old context files may survive after prompt changes and confuse the pipeline.

Mitigation:

- define regeneration order
- regenerate all `p0`, `p3`, `p4`, `p5` outputs after contract changes

### Risk 6 - Human-readable labels do not match proof terms

If portal labels and proof ledger names diverge, demo routing becomes brittle.

Mitigation:

- normalize screen naming
- use screen inventory as source of truth

---

## 11. Regeneration Order After Implementation

After prompt changes are complete, regenerate in this order:

```text
1. All required Phase 1 research context files
2. p0a_Perspective_Router -> context/p0a_Perspective_Selection.md
3. p0b_Strategy_Packet -> context/p0b_Strategy_Packet.md
4. p2a_Lead_Warming
5. p3a_Outcome_Report
6. p4b_Business_Report
7. p4c_Tech_Spec
8. p4d_Implementation_Changes -> portal HTML updates
9. p4d_Screen_Inventory -> context/p4d_Screen_Inventory.md
10. p4d_Demo_Route -> context/p4d_Demo_Route.md
11. p4e_Demo_Pitch
12. p5a_Proposal
13. p5b_Proposal_Pitch
14. p5c_Proposal_Development_Blueprint
15. p5d_Delivery_Intent_Brief
```

This order must be documented and followed. If the route is generated before the
screen inventory, or the proposal is generated before the strategy packet, outputs
will drift.

---

## 12. Definition of Done

The implementation is complete only when all of the following are true:

1. A company can be evaluated by the router and one primary perspective is chosen.
2. A unified strategy packet is generated and used by every downstream prompt.
3. The first-touch report changes behavior based on the investment gate.
4. The demo route is selected deterministically and stored as a file.
5. The demo pitch follows the stored route.
6. Proposal outputs respect ROI integrity and decision risk.
7. A delivery intent brief exists for handoff.
8. The README documents the full new pipeline clearly.
9. At least one end-to-end dry run succeeds using the TreeRaise sample data.

---

## 13. Recommended Implementation Sequence for an AI Agent

If one AI agent is executing this plan, the safest order is:

1. Update `prompts/README.md`
2. Create `prompts/phase0_strategy/`
3. Create `p0a_Perspective_Router.md`
4. Create `p0b_Strategy_Packet.md`
5. Modify `p3a_Outcome_Report.md`
6. Modify `p4b`, `p4c`, `p4d`, `p4e`
7. Create `p4d_Screen_Inventory.md`
8. Create `p4d_Demo_Route.md`
9. Modify `p5a`, `p5b`, `p5c`
10. Create `p5d_Delivery_Intent_Brief.md`
11. Modify `p2a_Lead_Warming.md`
12. Run validation and dry-run generation

This order minimizes downstream rework because it establishes the contract first
and the pitch/proposal layers last.
