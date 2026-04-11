# Specify Prompt — The Burkes Group Service Partner Portal

## Purpose

Use this prompt to generate or update a feature specification for the Burkes Group Service Partner Portal.

---

## Portal Context

You are writing specifications for **The Burkes Group Service Partner Portal** — a single-page web portal used by home service providers to manage referrals, jobs, quotes, reviews, service areas, earnings, and company profile.

### Existing Screens

| ID | Screen | Spec File |
|----|--------|-----------| 
| 000 | Foundation | `.specify/specs/000-foundation/spec.md` |
| 001 | Dashboard | `.specify/specs/001-dashboard/spec.md` |
| 002 | Referrals | `.specify/specs/002-referrals/spec.md` |
| 003 | Active Jobs | `.specify/specs/003-active-jobs/spec.md` |
| 004 | Quotes | `.specify/specs/004-quotes/spec.md` |
| 005 | Reviews | `.specify/specs/005-reviews/spec.md` |
| 006 | Service Areas | `.specify/specs/006-service-areas/spec.md` |
| 007 | Earnings | `.specify/specs/007-earnings/spec.md` |
| 008 | Profile | `.specify/specs/008-profile/spec.md` |

### Canonical Roles

- **Service Partner (SP)**: Primary portal user; receives referrals, manages jobs, sends quotes
- **Admin (AD)**: Platform administrator; verifies partners, manages operations
- **Agent (AG)**: Submits referrals on behalf of homeowners
- **Client (CL)**: Homeowner; receives quotes, leaves reviews

### Key Constraints

- Specs must be technology-agnostic (no framework, API, or database names).
- All monetary values are USD.
- All status badges must use the canonical badge system.
- Every meaningful state change must produce an activity log entry.
- No feature may hard-lock navigation when data is incomplete.

---

## What to Specify

> **[FEATURE DESCRIPTION]**
