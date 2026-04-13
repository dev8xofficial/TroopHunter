# Feature Specification: CRM Reports

**Feature ID**: 015-reports
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [001-dashboard](../001-dashboard/spec.md)
**Screen / Module**: Reports - department KPIs, conversion, revenue, and operational analytics

---

## Overview

The Reports feature provides structured analytics for Burkes Group's CRM operations. It extends the real-time dashboard into a deeper analytical workspace for revenue, conversion, agent performance, campaign results, department comparisons, and operational throughput across insurance, mortgage, and real estate.

---

## Problem Statement

Dashboard helps operators see what is happening now, but leadership also needs to understand patterns over time. They need to compare departments, evaluate agent performance, measure campaign and communication outcomes, and see where leads stall or convert. Without a dedicated reporting screen, those questions would require ad hoc spreadsheet exports or separate BI tooling before the CRM is mature enough to support it. Reports solves that by turning CRM operational data into decision-ready analytics while keeping drill-down paths back to the source workflows.

---

## Goals

- Provide time-based KPI analysis across departments and operators.
- Show revenue, conversion, throughput, and communication performance trends.
- Support filters by department, date range, agent, owner, and lead source.
- Offer drill-down paths from reports into the operational CRM record or workspace.
- Keep reporting understandable to business users without requiring external BI expertise.

---

## Non-Goals

- This feature does not replace a future enterprise BI platform or accounting system.
- It does not provide unrestricted raw data exports for every field in the CRM.
- It does not permit report editing that bypasses access-control rules.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Reviews team performance, conversion, and workload trends |
| Platform Administrator (PA) | Monitors cross-department health and platform-wide outcomes |
| Insurance Agent (IA) | Reviews personal or team performance where allowed |
| Real Estate Agent (RA) | Reviews pipeline and closing outcomes where allowed |

---

## User Scenarios

### Scenario 1 - Owner reviews department performance for the month

**Actor**: Department Owner
**Precondition**: The CRM has active department data for the reporting period.
**Flow**:
1. The owner opens Reports and chooses a department and date range.
2. The CRM shows KPI summaries, conversion rates, stage distribution, and communication activity.
3. The owner drills into a metric to inspect the underlying records.

**Success**: The owner can move from summary insight to operational detail without leaving the CRM.

---

### Scenario 2 - Administrator compares cross-department outcomes

**Actor**: Platform Administrator
**Precondition**: Multiple departments have reportable data.
**Flow**:
1. The administrator selects a cross-department view.
2. The CRM shows comparative revenue, conversion, and throughput metrics.
3. The administrator identifies where performance or process quality differs significantly.

**Success**: Leadership can understand platform-wide performance without external spreadsheet assembly.

---

## Functional Requirements

### FR-15-01 - KPI Overview

The feature must provide high-level KPI summaries for revenue, conversion, throughput, and communication activity.

### FR-15-02 - Flexible Filtering

Users must be able to filter reports by date range, department, agent, owner, source, or status where allowed by role.

### FR-15-03 - Department and Agent Comparisons

The feature must support department-level and agent-level comparison views with clear scoping.

### FR-15-04 - Funnel and Stage Analysis

The workspace must show how leads or records move through shared and department-specific stages over time.

### FR-15-05 - Campaign and Communication Performance

Reports must surface relevant communication metrics such as calls, SMS, email, and campaign outcomes where available.

### FR-15-06 - Drill-Down Navigation

Users must be able to pivot from an aggregate metric into the underlying contact, pipeline, or department workspace context.

### FR-15-07 - Access-Scoped Reporting

Report visibility must respect role, department, and tenant boundaries.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `report.id` | string | Report definition or generated view identifier |
| `report.scope` | string | Department, cross-department, or user scope |
| `report.filters` | object | Applied dimensions and date range |
| `report.metrics` | object | KPI summary values |
| `report.breakdowns` | array | Grouped or comparative results |
| `report.drilldown_target` | object | Linked CRM query or route |

---

## Edge Cases & Error States

- **Sparse data**: Reports render partial results without implying false precision.
- **Permission mismatch**: Users see only the scope they are allowed to access.
- **Delayed metrics**: The workspace shows freshness or lag indicators when analytics are not real-time.
- **Cross-feature dependency gap**: Missing Phase 2 metrics remain visibly unavailable rather than silently omitted.

---

## Assumptions

1. Reports will be summary-heavy before the platform adopts a separate BI layer.
2. Drill-downs are more valuable than endless visualization variety at this stage.
3. Department owners need comparisons, but not unrestricted platform data by default.

---

## Success Criteria

1. Leadership can answer core performance questions directly in the CRM.
2. Reported insights can be traced back to operational records and workflows.
3. Report access remains aligned with department and role boundaries.

---

## Open Questions

1. Which metrics should be considered executive-default versus department-default on first load?

---

## Dependencies

- **Depends on**: [001-dashboard](../001-dashboard/spec.md), [003-pipeline](../003-pipeline/spec.md), [004-activities](../004-activities/spec.md), [009-email-blast](../009-email-blast/spec.md), [011-insurance](../011-insurance/spec.md), [012-mortgage](../012-mortgage/spec.md), [013-real-estate](../013-real-estate/spec.md), [014-integrations](../014-integrations/spec.md)
