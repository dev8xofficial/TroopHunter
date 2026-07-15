# Research Process

## 1. Purpose

This document defines the operational lifecycle of the Research Engine.

Where the **Research Methodology** explains *how research should be conducted*, the **Research Process** explains *how a research project actually moves from start to finish*.

The methodology is conceptual.

The process is operational.

Every investigation follows this lifecycle regardless of the domain being studied.

---

# 2. Process Overview

Every research project progresses through a standard lifecycle.

```text
Research Request
        ↓
Context Collection
        ↓
Evidence Collection
        ↓
Research Planning
        ↓
Multi-Agent Investigation
        ↓
Conflict Resolution
        ↓
Finding Generation
        ↓
Recommendation Generation
        ↓
Research Validation
        ↓
Final Report
        ↓
Knowledge Capture
```

Each phase produces specific artifacts that become inputs to the next phase.

---

# 3. Phase 1 — Research Request

## Objective

Define what is being investigated.

A research request should clearly identify:

* Research topic
* Desired objective
* Scope
* Constraints
* Existing concerns
* Known limitations

The request should describe **the problem**, not prescribe **the solution**.

Researchers should retain complete freedom to determine how the investigation proceeds.

### Inputs

* User request
* Research agenda
* Previous findings

### Outputs

* Research objective
* Scope definition
* Initial investigation record

### Exit Criteria

The research objective is clearly understood.

---

# 4. Phase 2 — Context Collection

## Objective

Build complete contextual understanding before analysis begins.

Researchers should collect every artifact necessary to understand the system.

Possible inputs include:

* Specifications
* Architecture documents
* Diagrams
* Existing implementations
* Previous research
* Failure catalogues
* Design decisions
* Benchmarks
* Historical discussions

Missing context should be identified explicitly.

Research should never silently assume unavailable information.

### Outputs

* Context package
* Missing information list
* Initial understanding

### Exit Criteria

Researchers understand the system sufficiently to reconstruct it.

---

# 5. Phase 3 — Evidence Collection

## Objective

Collect all evidence relevant to the investigation.

Evidence may include:

* Existing specifications
* Scientific literature
* Engineering practices
* Industry examples
* Comparable systems
* Previous experiments
* Failure reports
* Metrics
* Human observations

Evidence should include both supporting and contradictory material.

Researchers should actively search for disagreement.

### Outputs

* Evidence repository
* Supporting evidence
* Contradictory evidence
* Confidence estimates

---

# 6. Phase 4 — Research Planning

## Objective

Prepare the investigation before analysis begins.

Researchers identify:

* Primary questions
* Secondary questions
* Unknowns
* Assumptions
* Investigation priorities
* Required expertise

At this stage the Research Engine decides which specialist agents should participate.

Not every investigation requires every agent.

The investigation should remain proportional to the problem.

### Outputs

* Investigation plan
* Assigned agents
* Priority order

---

# 7. Phase 5 — Multi-Agent Investigation

## Objective

Conduct independent investigations from multiple perspectives.

Each research agent works independently using its own responsibilities.

Typical agents include:

* Architect
* Advocate
* Skeptic
* Cross-Domain Researcher
* Synthesizer

Additional specialist agents may participate when required.

Agents should avoid influencing one another during their initial investigations.

Independent reasoning reduces confirmation bias.

### Outputs

Each agent produces:

* Findings
* Supporting evidence
* Weaknesses
* Confidence
* Remaining uncertainty

---

# 8. Phase 6 — Conflict Resolution

## Objective

Resolve disagreements between researchers.

Conflicting conclusions are expected.

Disagreement is valuable because it often exposes hidden assumptions.

Rather than voting, conflicts are resolved through evidence.

Possible outcomes include:

* One position clearly supported.
* Multiple explanations remain plausible.
* Evidence insufficient.
* Additional investigation required.

Unresolved uncertainty should be reported rather than hidden.

### Outputs

* Conflict analysis
* Evidence comparison
* Resolution record
* Remaining disagreements

---

# 9. Phase 7 — Finding Generation

## Objective

Transform observations into validated findings.

Each finding should include:

* Description
* Supporting evidence
* Counter-evidence
* Impact
* Confidence
* Related assumptions
* Potential consequences

Findings should describe reality before suggesting improvements.

### Outputs

* Validated findings
* Failure catalogue
* Opportunity catalogue

---

# 10. Phase 8 — Recommendation Generation

## Objective

Convert findings into actionable recommendations.

Recommendations should explain:

* Why change is needed
* Expected benefit
* Possible drawbacks
* Dependencies
* Alternative approaches
* Suggested experiments

Recommendations should remain architecture-level unless implementation is explicitly requested.

### Outputs

* Recommendations
* Research hypotheses
* Suggested experiments

---

# 11. Phase 9 — Research Validation

## Objective

Verify that the investigation satisfies the standards of the Research Engine.

Before publication every report should be reviewed against questions such as:

* Was the system fully understood?
* Were assumptions challenged?
* Were alternative explanations considered?
* Was contradictory evidence sought?
* Were conclusions supported?
* Were uncertainties documented?
* Were recommendations justified?

If significant weaknesses remain, the investigation should return to the appropriate earlier phase.

Research quality takes precedence over research speed.

### Outputs

* Validation checklist
* Quality assessment
* Publication decision

---

# 12. Phase 10 — Final Report

## Objective

Produce the final research report.

The report should summarize:

* Research objective
* System understanding
* Investigation process
* Findings
* Supporting evidence
* Remaining uncertainty
* Recommendations
* Future research opportunities

The report becomes the permanent record of the investigation.

---

# 13. Phase 11 — Knowledge Capture

## Objective

Preserve valuable knowledge for future investigations.

Research should not disappear after publication.

Important discoveries should be captured as reusable organizational knowledge.

Examples include:

* Architectural insights
* Validated principles
* Proven mechanisms
* Failure patterns
* Anti-patterns
* Cross-domain analogies
* Research methodologies

Future investigations should build upon this accumulated knowledge rather than repeating previous work.

---

# 14. Research Quality Gates

A research project should not advance unless the current phase satisfies its quality requirements.

Typical quality gates include:

* Context sufficiently understood.
* Evidence adequately collected.
* Multiple viewpoints investigated.
* Contradictory evidence considered.
* Findings supported.
* Recommendations justified.
* Uncertainty explicitly documented.

Quality gates prevent incomplete investigations from reaching conclusions prematurely.

---

# 15. Iterative Research

Research is inherently iterative.

New evidence may require returning to earlier phases.

Examples include:

* New assumptions discovered.
* Contradictory evidence found.
* Better hypotheses proposed.
* Previously unknown constraints identified.

Returning to an earlier phase is considered refinement, not failure.

The process should encourage iteration whenever it improves the quality of understanding.

---

# 16. Completion Criteria

A research investigation is considered complete only when:

* The objective has been fully investigated.
* All major assumptions have been examined.
* Significant alternative explanations have been evaluated.
* Findings are supported by evidence.
* Remaining uncertainty has been documented.
* Recommendations logically follow from the findings.
* Future research opportunities have been identified.

Completion means that the current investigation has reached the highest practical level of understanding—not that the subject itself can never be researched again.

Every completed investigation should make the next investigation more informed than the last.
