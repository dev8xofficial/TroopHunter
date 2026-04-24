# Admin Jobs
> **Module ID**: `103-admin-jobs`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0

---

## Overview

Manages job posting lifecycle: Draft -> Live -> Paused -> Closed. Job cards display title, department, status badge, applicant count, and department icon.

---

## Functional Requirements

### FR-103-01: Job CRUD
- [ ] Create job posting with title, department, description, requirements
- [ ] Edit existing job postings
- [ ] Archive/delete closed jobs

### FR-103-02: Job Status Lifecycle
- [ ] Draft -> Live (publish)
- [ ] Live -> Paused (pause)
- [ ] Paused -> Live (resume)
- [ ] Live/Paused -> Closed (close)

### FR-103-03: Applicant Count
- [ ] Each job card displays total applicant count
- [ ] Clicking count navigates to `101-admin-applicants` filtered by position

---

## Data Model

### JobPosting
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | uuid | Yes | Primary key |
| title | string | Yes | Job title |
| department | string | Yes | Department |
| status | enum | Yes | draft, live, paused, closed |
| applicant_count | integer | Yes | Count of applicants |
| posted_date | date | No | Date published |
| description | text | Yes | Full job description |
| requirements | text | Yes | Job requirements |
