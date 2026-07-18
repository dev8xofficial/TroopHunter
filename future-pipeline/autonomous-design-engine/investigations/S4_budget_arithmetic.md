# S4 - H1 Budget Arithmetic

## Variables & Assumptions
- **n** = 20 briefs
- **Arms** = 2 (Experimental and Control, per M1)
- **Loop length** = 6 iterations
- **Candidates (Appendix B)** = 3 (explore at iter 0) + 1 * 5 (polish at iter 1-5) = 8 generator candidates.
- **Render repairs** = ~2 extra generator calls.
- **Critiques** = 6 calls (1 per iteration).
- **Total calls per run** = 10 Generator calls + 6 Critic calls.

## Token Usage (Estimates based on Appendix A traces)
- **Generator (`claude-sonnet-5`)**: ~8k input, ~1.5k output per call.
  - Per run (10 calls): 80k in, 15k out.
- **Critic (`claude-opus-4-8`)**: ~12k input (visual context), ~0.5k output per call.
  - Per run (6 calls): 72k in, 3k out.

## Cost per Run (Using standard API rates for baseline comparison)
- **Sonnet 5**: 80k * $3/M = $0.24 in; 15k * $15/M = $0.22 out. Total = $0.46.
- **Opus 4.8**: 72k * $15/M = $1.08 in; 3k * $75/M = $0.22 out. Total = $1.30.
- **Total cost per run** = ~$1.76.

## Total Budget for H1 Benchmark
- 40 runs (20 briefs × 2 arms) × $1.76 = **~$70.40**.

## S2 Limits Comparison & Cadence Decision
The Claude Pro plan provides a **$20/mo** Agent SDK credit, which replenishes monthly (not weekly).
A single full H1 benchmark (~$70.40) vastly exceeds the $20 monthly budget for Claude Pro.
If we attempt this on Pro, it will exhaust the SDK credit on brief 11 out of 40, immediately triggering pay-as-you-go billing or halting.

### Proposals for Owner Sign-off
To remain viable, we propose the following reduced design and cadence:
1. **Reduce 'n' to 10 briefs**: 10 briefs × 2 arms = 20 runs = **$35.20**.
2. **Serialize the execution**: Run 5 briefs per week (10 runs/week = ~$17.60).
3. **Budget expectation**: Even with `n=10` serialized, it requires ~2 months of Pro credit or falling back to pay-as-you-go API billing for the remainder. For uninterrupted testing, we recommend upgrading to the **Claude Max 5x plan ($100/mo)** during the benchmark month.
