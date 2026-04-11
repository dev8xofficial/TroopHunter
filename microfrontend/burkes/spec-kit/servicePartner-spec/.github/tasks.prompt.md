# Tasks Prompt — The Burkes Group Service Partner Portal

## Purpose

Use this prompt to break down an approved implementation plan into developer-ready, dependency-ordered tasks.

---

## Portal Context

You are generating developer tasks for **The Burkes Group Service Partner Portal**.

### Development Conventions

| Pattern | Where to find an example |
|---------|--------------------------| 
| Screen shell (page-body, page-header) | Any screen in `servicePartner.html` |
| Card component with card-header / card body | Dashboard referral cards |
| Badge rendering | Referral table status column |
| Filter section | Referrals screen filter bar |
| Form layout | Quotes creation form |
| Table layout | Earnings payment history |
| Stat card | Dashboard KPI grid |
| Job card | Active Jobs screen |
| Review card | Reviews screen |
| Area card | Service Areas grid |

### Task Granularity Rules

- **Independently completable**: One developer, one PR
- **Small enough**: No task > 2 days of focused work
- **Specific enough**: Reference specific components and FR IDs
- **Dependency-ordered**: Data/state → UI → integration/testing

### Task Naming Convention

`TASK-[FEATURE_NUM]-[NN] — [Verb] [Object]`

---

## Inputs

> **Plan file**: `[PLAN_FILE_PATH]`
> **Spec file**: `[SPEC_FILE_PATH]`
