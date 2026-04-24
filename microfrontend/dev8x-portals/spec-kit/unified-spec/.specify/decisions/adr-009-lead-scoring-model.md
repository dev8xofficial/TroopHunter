# ADR-009: Lead Scoring Model

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect, Sales Domain Owner

---

## Context

The CRM Portal (Module 406) includes a lead scoring system. The `crm-portal.html` prototype shows score cards with:

- A **composite score** (0–100) displayed as a colored circle
- **Five dimensions** shown as individual progress bars:
  1. Response Time — how quickly the contact responds
  2. Budget Fit — how well the contact's budget matches Dev8X services
  3. Decision Power — whether the contact has purchasing authority
  4. Timeline — urgency and alignment with Dev8X capacity
  5. Tech Stack Match — compatibility of the contact's technical needs

The question is whether scoring should be rule-based (deterministic) or ML-based (learned), and whether the 5-dimension model is the right abstraction.

---

## Decision

Adopt a **rule-based, 5-dimension weighted scoring model**:

### Scoring Formula

```
total_score = (w1 × response_time) + (w2 × budget_fit) + (w3 × decision_power) + (w4 × timeline) + (w5 × tech_stack_match)
```

Where:
- Each dimension score is 0–100
- Weights (w1–w5) are configurable via CRM settings (Module 408)
- Default weights: `w1=0.15, w2=0.25, w3=0.25, w4=0.20, w5=0.15` (sum = 1.0)
- Total score is clamped to 0–100

### Dimension Definitions

| Dimension | Score 0 | Score 50 | Score 100 | Data Source |
|-----------|---------|----------|-----------|-------------|
| Response Time | No response in 14+ days | Response in 3-7 days | Response within 24 hours | Outreach analytics |
| Budget Fit | Budget < 25% of typical project | Budget ~50% match | Budget ≥ typical project | Contact profile |
| Decision Power | No authority, needs multi-level approval | Influencer, one approval needed | Final decision maker | Contact profile (is_decision_maker flag) |
| Timeline | No defined timeline or 12+ months | 3-6 month timeline | Immediate need (< 1 month) | Contact interactions |
| Tech Stack Match | No overlap with Dev8X capabilities | Partial overlap | Full alignment | Contact profile |

### Score Thresholds

| Range | Lead Temperature | Action |
|-------|-----------------|--------|
| 80–100 | 🔥 Hot | Prioritize immediate outreach |
| 50–79 | 🟡 Warm | Schedule follow-up within 1 week |
| 0–49 | 🔵 Cool | Add to nurture sequence |

### Recalculation Triggers

- Contact sentiment changed
- New outreach response received
- Contact profile updated (budget, decision maker status)
- Manual override by sales_rep or manager

---

## Consequences

### Positive

- **Transparent**: Sales team understands why a lead scores high/low — no black box
- **Tunable**: Weights configurable per business strategy (e.g., prioritize budget fit over response time)
- **Actionable**: Score thresholds map directly to workflow actions
- **Auditable**: Score changes emit `crm.score.updated` events with old/new values

### Negative

- **Manual calibration**: Weights need periodic review as business priorities shift
- **Subjectivity**: Some dimensions (budget fit, tech stack match) rely on sales rep input
- **No learning**: Rule-based scoring doesn't improve from historical win/loss patterns

---

## Alternatives Considered

### Alternative 1: Machine Learning Scoring

**Description**: Train a model on historical win/loss data to predict conversion probability.
**Rejected Because**: Insufficient training data at this stage. ML scoring is a Phase 4 evolution candidate once the platform has 6+ months of deal history.

### Alternative 2: Single-Dimension Scoring

**Description**: Use a single 0–100 score without dimension breakdown.
**Rejected Because**: The prototype explicitly shows 5-dimension bars. A single score provides no actionable insight into _why_ a lead scores high/low.

### Alternative 3: Binary Qualification (Qualified / Unqualified)

**Description**: Use BANT (Budget, Authority, Need, Timeline) as a yes/no checklist.
**Rejected Because**: Too coarse-grained. The 0–100 scale with dimensions provides richer prioritization signals.

---

## References

- [406-crm-scoring](../specs/406-crm-scoring/spec.md)
- [schemas/lead-score.schema.json](../../schemas/lead-score.schema.json)
- [contracts/events.yaml](../../contracts/events.yaml) — EVT-406-01: crm.score.updated
