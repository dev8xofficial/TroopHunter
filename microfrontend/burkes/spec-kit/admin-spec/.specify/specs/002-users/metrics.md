# Metrics & KPIs — 002-users

**Feature ID**: [NNN-short-name]  
**Spec**: [Link to spec.md]  
**Owner**: @pm-feature  
**Last Updated**: [YYYY-MM-DD]

---

## Overview

This document defines the success metrics (Key Performance Indicators) for this feature. Metrics are measured in production and used to:

- ✅ Validate that the feature delivers expected user value
- ✅ Detect usage patterns and adoption issues
- ✅ Inform decisions about features to improve, deprecate, or remove
- ✅ Support quarterly business reviews and roadmap planning

---

## Primary KPIs (Track in Dashboard)

### KPI-1: Feature Adoption

**Definition**: % of eligible users who access this feature within 7 days of eligibility

**Calculation**: (Unique users accessing feature in first 7 days) ÷ (Total eligible users) × 100%

**Measurement**:

- **Tool**: Analytics dashboard
- **Event**: User views [relevant screen/section]
- **Period**: Rolling 7-day windows

**Target**: 30% by day 7, 50% by day 30

**Alerting**:

- 🔴 Critical: < 10% after 7 days (feature is invisible or undesirable)
- 🟡 Warning: < 20% after 7 days (feature needs UX/marketing improvement)
- 🟢 Healthy: ≥ 30% after 7 days

**Why We Measure**: If users aren't using the feature, either they don't know it exists, don't understand its value, or the UX is poor.

---

### KPI-2: Time to Completion

**Definition**: Time from feature entry to successful completion (task completion time)

**Calculation**: p50, p90, p100 (50th, 90th, 100th percentile)

**Measurement**:

- **Tool**: Real User Monitoring (RUM) / Session Replay
- **Event**: Time from [start action] to [success event]
- **Sample**: All sessions (100%)

**Target**: p50 < 10 minutes, p90 < 30 minutes

**Alerting**:

- 🔴 Critical: p50 > 30 min (users are struggling)
- 🟡 Warning: p50 > 15 min or p90 > 45 min
- 🟢 Healthy: p50 < 10 min, p90 < 30 min

**Why We Measure**: Slow completion times indicate poor UX, complexity, or backend performance issues.

---

### KPI-3: Abandonment Rate

**Definition**: % of users who enter feature but don't complete intended action

**Calculation**: (Sessions entering feature & not completing) ÷ (Total sessions entering feature) × 100%

**Measurement**:

- **Tool**: Analytics / Funnel Analysis
- **Event**: Funnel: Step 1 (enter feature) → Step 2 (submit/complete)
- **Period**: Daily rolling window

**Target**: < 10% at each step, < 30% overall

**Alerting**:

- 🔴 Critical: > 40% abandonment (feature is broken or confusing)
- 🟡 Warning: > 20% abandonment
- 🟢 Healthy: < 10% abandonment

**Why We Measure**: High abandonment indicates UX friction, unclear value, or technical issues.

---

### KPI-4: Error Rate

**Definition**: % of feature operations that fail or result in errors

**Calculation**: (Failed operations) ÷ (Total operations) × 100%

**Measurement**:

- **Tool**: Error tracking (Sentry, LogRocket, custom logging)
- **Event**: Any error logged while using feature
- **Period**: Real-time, hourly aggregation

**Target**: < 0.1% for critical operations (auth, data save), < 1% for non-critical

**Alerting**:

- 🔴 Critical: > 1% error rate (immediate investigation)
- 🟡 Warning: > 0.5% error rate
- 🟢 Healthy: < 0.1% error rate

**Why We Measure**: Errors block users, damage trust, and indicate implementation issues.

---

### KPI-5: User Satisfaction (NPS/CSAT)

**Definition**: Net Promoter Score (NPS) or Customer Satisfaction (CSAT) for this feature

**Calculation**: "How likely are you to recommend this feature?" (0–10 scale)

- NPS = % Promoters (9–10) − % Detractors (0–6)
- CSAT = % Satisfied (4–5) ÷ Total Responses

**Measurement**:

- **Tool**: In-app survey (shown to 5% of users after completing feature)
- **Event**: Post-completion survey
- **Period**: Weekly aggregate

**Target**: NPS > 30 (considered good), CSAT > 70%

**Alerting**:

- 🔴 Critical: NPS < 0 or CSAT < 50% (users dislike feature)
- 🟡 Warning: NPS < 20 or CSAT < 60%
- 🟢 Healthy: NPS > 30, CSAT > 70%

**Why We Measure**: Satisfaction indicates value delivery and user experience quality.

---

## Secondary KPIs (Monitor, Inform Decisions)

### KPI-6: Feature Latency (Performance)

**Definition**: Response time for key operations within the feature

**Calculation**: p50, p90 latency in milliseconds

**Measurement**:

- **Tool**: RUM / Performance Monitoring
- **Operation**: [Key operation, e.g., document upload, form submission]
- **Period**: Real-time, hourly buckets

**Target**: < [feature-specific target, e.g., 2 sec for document upload, 500 ms for search]

**Alerting**:

- 🔴 Critical: > 2× target latency
- 🟡 Warning: > 1.5× target latency
- 🟢 Healthy: < target latency

**Why We Measure**: Slow operations frustrate users and increase abandonment.

---

### KPI-7: Feature Penetration (Over Time)

**Definition**: % of total transactions / operations involving this feature (growth metric)

**Calculation**: (Transactions using feature) ÷ (Total transactions) × 100%

**Measurement**:

- **Tool**: Analytics
- **Event**: Transaction uses feature (or doesn't)
- **Period**: Daily rolling 30-day average

**Target**: Increases week-over-week (at least in Month 1)

**Why We Measure**: Declining penetration indicates declining value or increasing friction.

---

### KPI-8: Cost Per Feature Operation

**Definition**: Operational cost per transaction/operation using feature (for cost-sensitive features)

**Calculation**: (Infrastructure cost for feature) ÷ (Number of operations) = $ per operation

**Measurement**:

- **Tool**: Cloud cost tracking (AWS billing, etc.)
- **Period**: Monthly

**Target**: Must be < [business threshold, e.g., $0.10 per operation]

**Why We Measure**: Feature might work great but be prohibitively expensive to operate at scale.

---

### KPI-9: Integration Health (if applicable)

**Definition**: Success rate of integrations with external systems (e.g., document storage, lender API)

**Calculation**: (Successful integrations) ÷ (Attempted integrations) × 100%

**Measurement**:

- **Tool**: Integration monitoring / API health checks
- **Event**: API call to external system
- **Period**: Real-time

**Target**: > 99% success rate

**Alerting**:

- 🔴 Critical: < 95% success
- 🟡 Warning: < 99% success
- 🟢 Healthy: ≥ 99% success

**Why We Measure**: External system failures block users even if our code is perfect.

---

## Measurement & Dashboards

### Dashboard 1: Real-Time Health (Updated Instantly)

```
┌─────────────────────────────────────────┐
│ 002-users — Real-Time Health       │
├─────────────────────────────────────────┤
│ Error Rate: 0.05% ✅                    │
│ P50 Latency: 1.2s ✅                    │
│ Active Users (Now): 42 🟢               │
│ Uptime: 100% ✅                         │
│ Last Updated: 2026-04-10 14:32 UTC      │
└─────────────────────────────────────────┘
```

**Audience**: On-call engineer, ops team  
**Update Frequency**: Real-time (refresh every 10 sec)  
**Action**: Page on-call if any metric turns red

### Dashboard 2: Daily Summary

| Metric              | Yesterday | 7-Day Avg | Target | Status          |
| ------------------- | --------- | --------- | ------ | --------------- |
| Adoption            | 15%       | 12%       | 30%    | 🟡 Below Target |
| Avg Completion Time | 8 min     | 10 min    | 10 min | 🟢 On Target    |
| Abandonment Rate    | 8%        | 9%        | 10%    | 🟢 On Target    |
| Error Rate          | 0.1%      | 0.08%     | 0.1%   | 🟢 On Target    |
| NPS                 | 28        | 26        | 30     | 🟡 Below Target |

**Audience**: Product manager, engineering lead  
**Update Frequency**: Daily (morning briefing)  
**Action**: Review alerts; adjust marketing, UX, or engineering priorities

### Dashboard 3: Weekly Business Review

**Audience**: PM, stakeholders, leadership  
**Update Frequency**: Weekly  
**Content**:

- Adoption curve (chart)
- Top user feedback themes (quote-tagged with sentiment)
- Key issues discovered (and resolution status)
- Competitive comparison (if applicable)
- Financial impact (if measurable)

---

## Data Collection & Tools

| Metric          | Tool                     | Event Name          | Custom Fields                        |
| --------------- | ------------------------ | ------------------- | ------------------------------------ |
| Adoption        | Segment/Mixpanel         | Feature_Entry       | transaction_id, user_role            |
| Completion Time | RUM (New Relic, DataDog) | Feature_Completed   | duration_ms, success_flag            |
| Abandonment     | Funnel Analysis          | Funnel_Drop         | step_number, reason (if available)   |
| Error Rate      | Sentry / LogRocket       | Error_Logged        | error_type, feature_module, severity |
| Satisfaction    | In-app Survey            | Survey_Submitted    | nps_score, comment (text)            |
| Latency         | RUM                      | Operation_Complete  | operation_name, latency_ms           |
| Cost            | AWS CloudWatch           | Billing_Aggregation | service, region, cost$               |

---

## Analysis & Reporting

### Weekly Standup (Fridays)

**Attendees**: PM, Tech Lead, Designer  
**Duration**: 15 min  
**Format**:

1. Review KPI dashboard (any alerts?)
2. Discuss top 3 pieces of user feedback
3. Identify blockers or improvements
4. Decide on next week's focus

### Monthly Business Review (Last Friday)

**Attendees**: PM, Director, Finance, Marketing  
**Duration**: 30 min  
**Format**:

1. Month-over-month KPI comparison
2. Feature impact (business metrics: revenue, NPS, churn reduction)
3. Budget status (if cost is metric)
4. Forecast for next quarter

### Quarterly Retrospective (Q-end)

**Attendees**: PM, Tech Lead, Designer, Data Analyst  
**Duration**: 1–2 hours  
**Format**:

1. Did the feature deliver expected value?
2. What was harder/easier than predicted?
3. What should we improve in next feature?
4. Update spec and roadmap based on learnings

---

## Decision Triggers

| Metric Situation                  | Decision                                                                 |
| --------------------------------- | ------------------------------------------------------------------------ |
| Adoption < 10% after 30 days      | Consider sunsetting or major UX redesign                                 |
| Avg completion > 60 min           | Simplify UX; break into smaller steps                                    |
| Abandonment > 40%                 | Feature is too hard; redesign or deprecate                               |
| Error Rate > 1%                   | Critical bug; pause rollout; fix immediately                             |
| NPS < 0                           | Users dislike feature; get qualitative feedback before investing further |
| Cost/op > budget                  | Consider cheaper implementation or billing model change                  |
| External integration health < 95% | Incident; escalate to partner team                                       |

---

## Baseline (Pre-Launch Targets)

| KPI            | Baseline / Assumption | Source                                 |
| -------------- | --------------------- | -------------------------------------- |
| Adoption Day 7 | 30%                   | [Industry benchmark, similar features] |
| Avg Completion | 10 min                | [Spec success criteria, user research] |
| Abandonment    | < 10%                 | [Acceptable friction level]            |
| Error Rate     | < 0.1%                | [Quality bar]                          |
| NPS            | 30+                   | [Target satisfaction]                  |
| Latency P50    | 2 sec                 | [Spec performance target]              |

---

## Feedback Loop: From Metrics to Product

1. **Metric indicates issue** (e.g., high abandonment)
2. **QA / Analyst investigates** (e.g., replay sessions, survey feedback, error logs)
3. **Root cause identified** (e.g., form is too long, UX labels are confusing, bug in certain browser)
4. **PM decides action** (e.g., shorten form, redesign labels, fix bug)
5. **Plan & Task created** (if actionable item)
6. **Deploy fix** (next sprint or hotfix)
7. **Metric remeasured** (confirm fix worked)
8. **Update spec** (if learnings generalize to other features)

---

**Version**: 1.0  
**Review Cadence**: Weekly monitoring, monthly business review, quarterly retrospective

See also: [spec.md](./spec.md) for success criteria; [rollout-template.md](./rollout-template.md) for rollout health metrics.

