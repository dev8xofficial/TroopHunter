# The Burkes Group Client Portal — Backend System Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's Client Portal **Backend Services** — the central API ecosystem, data models, and workflow engines that power the real estate transaction system from offer acceptance through closing day.

This repository is the **single source of truth** for backend architecture, data contracts, and implementation guidance. Code serves these specifications, not the reverse.

---

## 📋 Quick Navigation

### For New Backend Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write API specs (RESTful structures, naming conventions)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business domains and technical vocabulary
- **[ROADMAP.md](ROADMAP.md)** — Backend feature prioritization and API versioning timeline

### For Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Service architecture, event buses, and data flow
- **[GOVERNANCE.md](GOVERNANCE.md)** — Schema versioning process and approval gates

### For Implementation

- **[.specify/specs/](/.specify/specs/)** — API Module specifications (000-foundation through 006-services)
- **[.specify/schemas/](/.specify/schemas/)** — Canonical JSON Schema definitions for payloads
- **[CHANGELOG.md](CHANGELOG.md)** — Service evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle logic)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (e.g. why S3 over DB blob storage)

---

## 🎯 What Is This?

This specification kit implements **Schema-Driven Backend Development (SDBD)**. In SDBD:

- **Specifications define the Contract** — they describe exactly what payloads APIs consume and emit, without dictating specific language frameworks (Node/Go/Python).
- **Code is the manifestation** — engineers translate these specs into routing logic, middleware, and database queries.
- **Plans bridge the gap** — implementation plans outline database migrations, worker queues, and caching layers before coding.

Every backend domain is defined by:

1. A **Feature Specification** (Endpoints, Event Producers, State Transitions)
2. **JSON Schemas** (Strict validation rules)
3. **Integration Guidelines** (Webhook interactions, background jobs)

---

## 📁 Repository Structure

```
.
├── README.md                           ⬅ You are here
├── STANDARDS.md                        Backend API writing standards
├── ARCHITECTURE.md                     Microservice structure and Data Flows
├── GLOSSARY.md                         Vocabulary
├── ROADMAP.md                          API Timeline
├── CHANGELOG.md                        Version history
├── CONTRIBUTING.md                     Contribution rules
├── GOVERNANCE.md                       Approval process
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md             Project charter (state machines, authorization levels)
│   │
│   ├── specs/
│   │   ├── 000-foundation/
│   │   │   ├── spec.md                 API Gateway, Auth, JWT, Activity Bus
│   │   │   ├── validation-schema.json  Schemas
│   │   │   └── ... 
│   │   ├── 001-dashboard/              Aggregator APIs
│   │   ├── 002-documents/              S3 workflows, virus scanning, signatures
│   │   ├── 003-messages/               Websockets, pub/sub logic
│   │   ├── 004-insurance/              Policy validation endpoints
│   │   ├── 005-mortgage/               LOS Webhook sinks and progression APIs
│   │   └── 006-services/               Partner service integrations
│   │
│   ├── templates/                      API Spec templates, ADR templates
│   │
│   ├── schemas/                        Canonical Data Contracts
│   │   ├── transaction.json            Transaction Model
│   │   ├── activity-event.json         Event Structures
│   │   └── ...
│   │
│   └── decisions/                      Backend Architecture Decisions
│
└── .github/                            CI/CD definitions
```

---

## 🎨 Backend Service Domains

The ecosystem consists of **6 API Modules** handling the **11-stage transaction logic**:

| API Module          | Purpose                                                   | Primary Workflows        |
| ------------------- | --------------------------------------------------------- | ---------------------- |
| **001 Aggregator**  | Data composition API returning grouped transaction status | Highly cached parallel GETs |
| **002 Documents**   | Pre-signed S3 links, e-signature logic, metadata DB       | Webhook processing, blob ops |
| **003 Messaging**   | State sync and WebSockets for chat threads                | Pub/sub routing        |
| **004 Insurance**   | Dedicated endpoints for Policy payloads and dates         | Complex payload validations |
| **005 Mortgage**    | Interaction sink for Loan Origination Systems (external)  | Webhook ingests / State Mgmt |
| **006 Services**    | Partner API proxy and scheduling logic                    | 3rd party integrations |

All built on a shared **Foundation** (000) that governs:

- API Gateway routing
- JWT Token issuance and verification
- Centralized Activity Event bus (Kafka/Redis)
- Role Based Access Control (RBAC) definitions

---

## 👥 Server-Side Authorization Scope

Access is strictly evaluated per endpoint request. The system maps 6 logical roles:

| Role Identifier         | API Write Level        | Target Restrictions     |
| ----------------------- | ---------------------- | ----------------------- |
| `ROLE_CLIENT`           | Scoped Writes          | Own policy/forms only   |
| `ROLE_AGENT`            | Scoped Writes          | Purchase & Sale context |
| `ROLE_LENDER`           | Scoped Writes          | Financial contexts      |
| `ROLE_ATTORNEY`         | Scoped Writes          | Legal contexts          |
| `ROLE_CPA`              | Read Only              | Full read access        |
| `ROLE_ADMIN_TC`         | Global Writes          | Mutate any record       |

---

## 📚 Key Backend Principles

- **B-01: API-First** — Functionality does not exist unless exposed via an authenticated, documented endpoint.
- **B-02: Stateless APIs** — Services cannot rely on local memory context; use centralized caches/DBs.
- **B-03: Event Sourcing over Mutability** — Critical data changes emit events rather than just mutating tables.
- **B-04: Strict JSON Validation** — The gateway denies malformed payload shapes with canonical `400` errors instantly.
- **B-05: Offload Binary processing** — Do not stream files through the Node service; rely on cloud storage direct uploads.

---

## 📄 License & Attribution

This backend specification kit is maintained by The Burkes Group Architecture Team. All endpoints and systems are proprietary.

**Version**: 2.0 (Backend Edition)  
**Last Updated**: April 15, 2026
