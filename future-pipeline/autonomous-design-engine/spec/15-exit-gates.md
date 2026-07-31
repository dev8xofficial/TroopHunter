# 15 — Exit Gates & Readiness Criteria

> This document formally defines the mathematical and empirical pass/fail criteria required to exit Phase 3 (Taste Calibration) and Phase 4 (Production Hardening), establishing the standard for system autonomy and ship-readiness.

---

## 1. Phase 3 Exit Gate (Taste Calibration)

The goal of Phase 3 is to prove that the Critic's judgments align sufficiently with human experts to allow for safe autonomy relaxation. The gate is evaluated via the `ade eval prove-taste-calibration` command.

### 1.1 Criteria for Passing Phase 3

To pass the Phase 3 exit gate, the system must demonstrate:

1. **Critic↔Human Agreement:** The Critic's verdicts (pass/fail and multi-dimensional scores) must match the human expert's ground-truth verdicts with an agreement rate of **> 85%**.
2. **Stratum Reliability:** This >85% agreement threshold must be met independently across **all difficulty strata** (`routine`, `hard`, `adversarial`). An aggregate score that masks poor performance on adversarial cases constitutes a failure.
3. **Pairwise Dominance:** The system must statistically prove that **pairwise ranking** (comparing two candidates side-by-side) yields higher human-preferred gains across iterations than absolute isolated scoring.
4. **Zero Ground-Truth Leakage:** The evaluation must be conducted on a completely held-out benchmark set (the Golden Core) that the reward model or prompt has never been trained on.

If these criteria are met, the Phase 3 gate passes, allowing the system to climb the **Autonomy Ladder** (e.g., auto-approving sections unless the Critic flags uncertainty).

---

## 2. Phase 4 Exit Gate (Production Hardening & Ship-Readiness)

Phase 4 defines the final requirements before the system is allowed to run entirely unattended in a production environment. The Phase 4 gate is evaluated via the five ship-readiness criteria tracked in `src/exitgate.ts`.

### 2.1 The 5 Ship-Readiness Criteria

1. **Deterministic Floor Maintained:** 
   - All generated code must pass the Guardrail Layer (semantic HTML, prop-driven components, zero `dangerouslySetInnerHTML`, 100% accessible via axe-core, proper sRGB imagery, and URL allowlist checks) with a 0% false-pass rate.
2. **H1 (Eyes) Sustained:**
   - The core H1 hypothesis remains valid at scale: humans continue to blind-prefer the loop's final output over a matched-compute control at statistical significance ($\alpha=0.05$).
3. **H2 (Brief-Only Viability) $\ge$ 50%:**
   - At least 50% of the final outputs generated solely from a brief (without hard references) must be rated "good" or "strong" by human experts.
4. **H4 (Zero Token Drift):**
   - The Crystallization process (Phase 1) must enforce multi-section consistency flawlessly. There must be **zero** unauthorized token usage (e.g., hallucinated hex colors or spacing values) in any subsequent sections after the foundation is locked.
5. **Measured Benchmark Gain:**
   - The R3 Constitution-Grounded Critic and R4 Reward Model must yield a statistically significant gain on the R1 Golden Core Benchmark compared to the Phase 0 baseline. Any regression in benchmark performance blocks the ship decision.

When all 5 criteria are mathematically satisfied, the system is deemed **Ship-Ready** and Phase 4 is exited.
