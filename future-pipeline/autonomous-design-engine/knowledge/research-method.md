# Research Methodology & Epistemics

This document defines the load-bearing epistemics and methodology for all formal investigations (located in `investigations/`). It is a strict port of the Evidence Ladder and research norms that guide architectural changes.

## The Evidence Ladder

Every investigation finding and architectural claim must be explicitly graded by the strength of the evidence supporting it. The tiers are:

- **Established (direct repo observation)**: Facts read directly from the repository state (e.g., file contents, git history, existing config). The baseline tier.
- **T0 (Anecdote / Hypothesis)**: An untested claim or intuition.
- **T1 (Local Empirical)**: A local empirical observation on a small sample.
- **T2 (Formal Experiment)**: A formal experiment with a control, but non-comprehensive benchmark.
- **T3 (Benchmark Pass)**: A rigorous benchmark pass demonstrating a statistically significant gain over the Evaluation Charter.
- **T4 (Production Metric)**: Deployed production metrics proving the claim.

> **Confidence Caps**: No architectural change may be committed based on T0 or T1 evidence alone. Significant changes require T2 or T3 validation.

## Mandatory Norms

All commissioned investigations must adhere to the following epistemics:

1. **Pre-registration**: Hypotheses and specific evaluation criteria must be written down *before* running the experiment.
2. **Mandatory Status-Quo Steelman**: Before proposing an alternative, the investigation must steelman the current architecture (i.e., articulate its strongest possible defense and why it was built that way).
3. **Null-Result Parity**: A negative finding (falsifying the hypothesis) is as valuable as a positive one and must be recorded with equal weight.

## Provenance Header

Every investigation document must begin with a provenance header that explicitly traces its origin, the corpus it reviewed, and its relationship to prior work.
