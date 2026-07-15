# Research Methodology

## 1. Purpose

This document defines the canonical methodology followed by the Research Engine when investigating any subject.

Where the Research Philosophy defines **how research should think**, the methodology defines **how research should investigate**.

Every research project—regardless of domain—should follow the same methodology. Only the subject of investigation changes; the investigative process remains consistent.

The objective is to ensure that research is systematic, reproducible, evidence-driven, and resistant to bias.

---

# 2. Methodology Overview

Every investigation progresses through a series of structured stages.

```
Understand
        ↓
Reconstruct
        ↓
Question
        ↓
Hypothesize
        ↓
Investigate
        ↓
Stress Test
        ↓
Cross-Domain Research
        ↓
Synthesize
        ↓
Prioritize
        ↓
Recommend
```

Each stage exists because it answers a different class of questions.

Skipping stages weakens the quality of the final conclusions.

---

# 3. Stage 1 — Understand

## Objective

Develop an accurate understanding of the research subject before attempting to evaluate it.

Research begins with comprehension rather than criticism.

Researchers should first determine:

* What the system is.
* What it is trying to achieve.
* Why it exists.
* How success is currently defined.
* What constraints it operates under.

No recommendations should be made during this stage.

### Inputs

* Specifications
* Documentation
* Architecture diagrams
* Design decisions
* Previous research
* Supporting evidence

### Outputs

* Shared understanding of the subject
* Defined research scope
* Initial mental model

### Exit Criteria

Researchers can accurately explain the system in their own words without relying on implementation details.

---

# 4. Stage 2 — Reconstruct

## Objective

Rebuild the architecture mentally from first principles.

Rather than trusting documentation blindly, researchers reconstruct how the system actually functions.

The goal is to answer:

* How does information flow?
* Where are decisions made?
* Which components depend on others?
* What assumptions hold the system together?
* What mechanisms actually produce behavior?

The reconstructed model becomes the basis for every later investigation.

### Outputs

* System model
* Dependency graph
* Control flow
* Feedback loops
* Critical assumptions

### Exit Criteria

Researchers can explain the complete system without referring back to the original documents.

---

# 5. Stage 3 — Question

## Objective

Identify assumptions that deserve investigation.

Every architecture contains explicit and implicit assumptions.

Researchers should ask:

* Why was this decision made?
* Could the opposite also work?
* What happens if this assumption is false?
* Is this based on evidence or intuition?
* Is complexity justified?

Questions are collected before attempting answers.

A high-quality investigation is usually characterized by discovering questions that were never previously asked.

### Outputs

* Assumption list
* Unknowns
* Research questions
* Potential risks

---

# 6. Stage 4 — Hypothesize

## Objective

Develop multiple competing explanations.

Research should never begin with only one theory.

Instead, multiple hypotheses should be generated.

For example:

* The architecture succeeds because...
* The architecture fails because...
* The architecture succeeds only under certain conditions...
* Another architecture may outperform it because...

Alternative explanations create a healthier investigation than defending a single narrative.

### Outputs

* Competing hypotheses
* Expected outcomes
* Testable predictions

---

# 7. Stage 5 — Investigate

## Objective

Collect evidence relevant to each hypothesis.

Evidence may come from:

* Existing specifications
* Previous research
* Scientific literature
* Engineering experience
* Comparable systems
* Historical examples
* Cross-domain analogies
* Logical reasoning

Researchers should actively seek evidence that both supports and contradicts each hypothesis.

The objective is understanding—not confirmation.

### Outputs

* Supporting evidence
* Contradictory evidence
* Confidence estimates
* Remaining unknowns

---

# 8. Stage 6 — Stress Test

## Objective

Attempt to break the current understanding.

Every proposed explanation should be challenged.

Researchers should investigate:

* Edge cases
* Failure modes
* Scalability limits
* Unexpected environments
* Contradictory objectives
* Adversarial situations
* Long-term evolution
* Human misuse
* Model failures

The strongest conclusions are those that survive aggressive criticism.

### Outputs

* Failure catalogue
* Weaknesses
* Boundary conditions
* Robustness assessment

---

# 9. Stage 7 — Cross-Domain Research

## Objective

Import ideas from unrelated disciplines.

Researchers should deliberately ask:

* Has another field solved a similar problem?
* Does biology suggest a better mechanism?
* Would aviation approach this differently?
* Does distributed systems research apply?
* Can economics explain emergent behavior?

The purpose is not novelty.

The purpose is discovering proven mechanisms that ADE has not yet considered.

### Outputs

* Imported concepts
* Adaptation proposals
* Cross-domain comparisons

---

# 10. Stage 8 — Synthesize

## Objective

Combine all collected evidence into a coherent explanation.

This stage resolves conflicts between:

* competing hypotheses,
* different researchers,
* contradictory evidence,
* opposing recommendations.

Every conclusion should explain:

* Why this interpretation is preferred.
* Why alternatives were rejected.
* What evidence supports it.
* What uncertainty remains.

### Outputs

* Unified understanding
* Evidence-backed conclusions
* Confidence assessment

---

# 11. Stage 9 — Prioritize

## Objective

Determine which discoveries matter most.

Not every finding deserves implementation.

Researchers should prioritize according to factors such as:

* Expected impact
* Architectural importance
* Research confidence
* Implementation complexity
* Long-term leverage
* Risk reduction
* Contribution to autonomy

This transforms observations into actionable research priorities.

### Outputs

* Priority matrix
* Ranked recommendations
* Research roadmap

---

# 12. Stage 10 — Recommend

## Objective

Produce recommendations rather than prescriptions.

Recommendations should explain:

* What should change.
* Why it should change.
* Expected benefits.
* Trade-offs.
* Risks.
* Alternative options.
* Suggested validation experiments.

Recommendations should avoid implementation details unless specifically requested.

Their role is to guide architectural evolution rather than dictate engineering decisions.

### Outputs

* Final recommendations
* Proposed experiments
* Future research directions

---

# 13. Methodological Principles

Regardless of the research domain, every investigation should satisfy the following characteristics:

* Begin with understanding before evaluation.
* Reconstruct before criticizing.
* Generate multiple hypotheses.
* Seek contradictory evidence.
* Test architectural limits.
* Import external knowledge.
* Resolve disagreement through evidence.
* Make uncertainty explicit.
* Prioritize discoveries by impact.
* Produce reproducible conclusions.

---

# 14. Completion Criteria

A research investigation is considered complete only when it can answer the following questions:

* What does the system actually do?
* Why does it behave this way?
* What assumptions support it?
* Where can it fail?
* What evidence supports these conclusions?
* What uncertainty remains?
* What changes would most improve the system?
* What research should follow next?

If these questions cannot be answered with reasonable confidence, the investigation remains incomplete and should continue until sufficient evidence has been gathered.
