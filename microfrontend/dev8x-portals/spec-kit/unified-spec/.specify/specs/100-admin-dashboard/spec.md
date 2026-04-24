# Admin Dashboard
> **Module ID**: `100-admin-dashboard`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Dashboard aggregates HR pipeline health into a single view: applicant volume, active job postings, upcoming interviews, and hiring velocity (average time-to-hire). KPI cards show delta metrics for period-over-period comparisons, and a 5-stage hiring funnel visualizes conversion rates.

---

## Actors

| Actor | Role | Interaction |
|-------|------|-------------|
| HR Admin | `hr_admin` | Full dashboard access |
| Super Admin | `super_admin` | Full dashboard access |
| Manager | `manager` | Read-only access |

---

## Functional Requirements

### FR-100-01: KPI Aggregation

**Description**: Display 4 core KPIs with delta trends.

**Acceptance Criteria**:
- [ ] Total Applicants (count + delta %)
- [ ] Active Jobs (count + delta %)
- [ ] Interviews This Week (count + delta %)
- [ ] Avg Time-to-Hire (days + delta %)

### FR-100-02: Hiring Funnel

**Description**: Display a 5-stage conversion funnel.

**Acceptance Criteria**:
- [ ] Stages: Applied -> Shortlisted -> Interview -> Selected -> Joined
- [ ] Each stage shows count, percentage of total, and conversion rate to next stage
- [ ] Time period selectable (7d, 30d, 90d, All)

### FR-100-03: Pipeline Summary

**Description**: Display counts per pipeline stage for quick overview.

**Acceptance Criteria**:
- [ ] Shows count per stage in a horizontal bar
- [ ] Clicking a stage navigates to `102-admin-pipeline` filtered by that stage

---

## Data Model

### DashboardKPI

| Field | Type | Description |
|-------|------|-------------|
| metric | string | KPI name |
| value | number | Current value |
| delta | number | Change from prior period (%) |
| direction | enum | up, down, flat |

### FunnelMetric

| Field | Type | Description |
|-------|------|-------------|
| stage | string | Pipeline stage name |
| count | integer | Applicants in stage |
| percentage | number | % of total applicants |
| conversion_rate | number | % converting to next stage |
