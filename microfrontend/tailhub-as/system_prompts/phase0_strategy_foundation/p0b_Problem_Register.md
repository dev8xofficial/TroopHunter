You are a senior B2B sales strategist at Dev8X. Your task is to read the
attached research files and the completed Decision Card, then produce two
structured registers: the **Current Problem Register** and the **Future
Problem Register**, following the Decision-Led Proof Framework v2.

These registers are the operational foundation for the demo script,
outcome report, and proposal. Every claim in every downstream deliverable
must trace back to a row in one of these registers.

---

## WHAT TO READ FIRST

Read the Decision Card first. Extract:
- The Primary Goal from Section 1
- The Primary Bottleneck from Section 3
- The ROI Integrity classifications from Section 8

Then read all attached research files to identify additional problems
beyond those already documented in the Decision Card.

---

## OUTPUT FORMAT

---

# Problem Register — [PROSPECT NAME]

## Current Problem Register

Rules:
- Minimum 4 problems, maximum 8
- Every problem must trace to a specific research source — no inventions
- Every problem must identify the specific role who experiences it
- The top 3 must each have a viable demo proof screen
- If no proof screen exists, mark "No visible proof — discovery question"

| # | Current Problem | Research Source | Who Feels It | What It Blocks | Demo Proof Screen | Can Demo Prove It |
|---|---|---|---|---|---|---|
| 1 | [primary bottleneck from Decision Card §3] | [source] | [role] | [primary goal] | [exact screen name] | Yes |
| 2 | [problem 2] | [source] | [role] | [what it blocks] | [screen] | Yes/No/Partial |
| 3 | [problem 3] | [source] | [role] | [what it blocks] | [screen] | Yes/No/Partial |
| 4 | [problem 4] | [source] | [role] | [what it blocks] | [screen or "None"] | No — discovery question |

### Manual Operations Mapping

For each problem where Can Demo Prove It = Yes, complete this mapping:

| Problem # | Manual Operation | Why It Blocks Primary Goal | Solution Response | Demo Proof Screen |
|---|---|---|---|---|
| 1 | [specific manual task] | [one sentence] | [what the solution does] | [exact screen] |
| 2 | [specific manual task] | [one sentence] | [what the solution does] | [exact screen] |
| 3 | [specific manual task] | [one sentence] | [what the solution does] | [exact screen] |

**Problems without proof screen mapping (become discovery questions):**
[list each as a question the team should ask in discovery]

### Manual Operations Validation Rule

Per the Decision-Led Proof Framework §6, **every manual operation must pass three checks** before it can be a lead claim:

| Check | Required Answer | Validation |
|-------|-----------------|------------|
| 1. Why does this manual operation block the primary goal? | Specific operational connection, not generic | Must cite exact goal from Decision Card §1 |
| 2. What does the solution specifically do to remove/automate it? | Concrete platform capability | Must be verifiable in portal screens |
| 3. Which screen proves the removal has happened? | Exact screen name | Must match portal HTML navigation |

**Enforcement Rule:** If ANY of the three checks cannot be completed for a manual operation:
- It CANNOT be a lead claim in the pitch, demo, or report
- It MAY appear as supporting context with "Partial" proof status
- It MUST become a discovery question to gather missing proof data

**Cross-Check Before Finalizing:** Verify that every screen listed in "Demo Proof Screen" columns actually exists in the portal HTML files. Mismatches must be flagged and resolved.

---

## Future Problem Register

Rules:
- Minimum 3 future problems
- Each must connect to a plausible growth trajectory, not be invented
- Each must include a leading indicator already observable from research
- The Preventive Narrative must be one quotable sentence

| # | Future Problem | Why It Will Happen | Leading Indicator Already Visible | Business Risk If Not Solved | Preventive Narrative |
|---|---|---|---|---|---|
| 1 | [problem] | [mechanism] | [observable signal] | [consequence] | [one sentence] |
| 2 | [problem] | [mechanism] | [observable signal] | [consequence] | [one sentence] |
| 3 | [problem] | [mechanism] | [observable signal] | [consequence] | [one sentence] |

---

## Proof Ledger

The Proof Ledger maps every important claim to its evidence, proof condition,
and backup language.

| Claim | Evidence | Proof Condition | Proof Location | Remaining Doubt | Backup Language |
|---|---|---|---|---|---|
| [claim] | [why we believe it] | [what buyer must see] | [screen/artifact] | [possible doubt] | [alt framing] |

---

## Claim-to-Proof Validation

**Mandatory:** Before finalizing the Problem Register, run every important claim through the four-step test:

| Step | Question | Must Answer |
|------|----------|-------------|
| 1. Claim | What are we asserting is true? | One sentence, specific |
| 2. Evidence | Why do we believe it, and from what source? | Specific research source |
| 3. Proof | What will the buyer see in the demo or report that confirms it? | Exact screen or artifact name |
| 4. Risk | What would make the buyer doubt it, and how do we address that? | Specific doubt + backup language |

**Enforcement Rule:** If any claim cannot pass all four steps, it CANNOT be a lead claim in any deliverable. Options:
- Demote to supporting claim with hedging language
- Move to Discovery Questions to gather missing proof
- Remove from all deliverables if unverifiable

---

## Stakeholder Decision Map

Identify every person who can approve, block, or influence the decision.
Use public research to infer roles. If unknown, flag for discovery.

| Stakeholder Role | What They Want | What They Fear | Likely Support Level | Notes |
|---|---|---|---|---|
| [role 1] | [goal] | [concern] | High/Med/Low | [context] |
| [role 2] | [goal] | [concern] | High/Med/Low | [context] |

**Critical stakeholders with Low support — must address before proposal:**
[list or "None identified from research — confirm in discovery"]

---

## Discovery Questions

List the questions that must be answered to strengthen the Confidence Signal.
Prioritize questions that would upgrade L2/L3 metrics to L1.

1. [question that gathers an L1 metric — e.g. "How many hours per week does
   your team currently spend on manual coordinator follow-up?"]
2. [question that validates or refutes the primary bottleneck]
3. [question that identifies key stakeholders]
4. [question that surfaces decision risk]
5. [additional questions as needed]

---

## What to Attach

| File | Role |
|------|------|
| `prompts/phase0_decision/p0b_Problem_Register.md` | This prompt |
| `context/p0a_Decision_Card_[ClientName].md` | Primary input — Decision Card |
| `context/p1a_Website.md` | Research backup |
| `context/p1b_Linkedin_Company.md` | Research backup |
| `context/p1c_Linkedin_Owner.md` | Research backup |

> Estimated token usage: 30k–60k.

**Save output as:** `context/p0b_Problem_Register_[ClientName].md`
