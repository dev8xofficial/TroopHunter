# Admin Pipeline
> **Module ID**: `102-admin-pipeline`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0

---

## Overview

A Kanban board for the hiring pipeline. 5 columns: Applied, Shortlisted, Interview, Selected, Joined. Cards are draggable between columns (subject to state machine guards). Per-card: avatar, role, days-in-stage, tags, urgency indicator.

---

## Functional Requirements

### FR-102-01: Kanban Board Display
- [ ] 5 columns with applicant cards
- [ ] Cards show: avatar, name, role, days-in-stage, tags, urgent flag
- [ ] Column header shows count

### FR-102-02: Card Drag-Drop
- [ ] Drag card between columns triggers PATCH /applicants/{id}/status
- [ ] Invalid transitions show error toast
- [ ] Stale indicators: amber border at 7+ days, red border at 14+ days

### FR-102-03: Pipeline Filters
- [ ] Filter by department, position, urgency
- [ ] Search by applicant name
