# User Personas — Agent Portal

## Primary Persona: Sarah Anderson (Agent)

| Attribute | Detail |
|-----------|--------|
| **Name** | Sarah Anderson |
| **Role** | Real Estate Agent (AG) |
| **Brokerage** | The Burkes Group |
| **Experience** | 8 years in residential real estate |
| **Daily Workload** | 5–8 active transactions, 15+ client touchpoints |
| **Tech Proficiency** | Comfortable with web apps; uses phone for email, portal for deal management |
| **Pain Points** | Juggling multiple transactions across email/spreadsheets; losing track of document status; forgetting appointment details; unable to quickly refer partners |
| **Goals** | Single place to manage all transactions, clients, documents, and communications; reduce admin overhead; improve client satisfaction through faster response times |
| **Motivations** | Commission-driven; reputation-conscious; values efficiency and organisation |

### Daily Workflow

1. Morning: Check Dashboard for KPIs, pending tasks, and unread messages
2. Mid-morning: Review transaction pipeline on Transactions screen
3. Throughout day: Upload documents, respond to messages, schedule appointments
4. End of day: Submit stage updates for completed milestones, review calendar for tomorrow

---

## Secondary Persona: Marcus Chen (Transaction Coordinator / Admin)

| Attribute | Detail |
|-----------|--------|
| **Name** | Marcus Chen |
| **Role** | Transaction Coordinator (TC) |
| **Responsibility** | Approve stage updates, manage portal setup, oversee all transactions |
| **Daily Workload** | Reviews 10–20 stage update requests per day |
| **Goals** | Ensure data accuracy, maintain compliance, support agents efficiently |
| **Pain Points** | Approval requests via email are untracked; no central view of all transactions |

---

## Competitive Analysis

| Competitor | Strengths | Weaknesses | Opportunity |
|-----------|-----------|------------|-------------|
| Dotloop | Document management, e-signatures | Complex UI, steep learning curve | Simpler, agent-first design |
| Skyslope | Transaction compliance, audit trails | Limited mobile, dated interface | Modern responsive design |
| BrokerMint | Commission tracking, back-office | Not client-facing, no messaging | Unified portal with messaging |
| Follow Up Boss | CRM, lead management | No document or transaction management | Full transaction lifecycle |

---

## Constitution Rationale

The constitution's 7 principles were derived from:

1. **P-01 (Agent-First Clarity)**: Agent interviews identified "information overload" as the #1 frustration
2. **P-02 (Single Source of Truth)**: 73% of agents reported using 3+ tools to track one transaction
3. **P-03 (Role-Scoped Access)**: Compliance requirement from The Burkes Group legal team
4. **P-04 (Progressive Disclosure)**: UX research showed form abandonment drops 40% with stepped forms
5. **P-05 (Graceful Incompleteness)**: Agent feedback: "Don't lock me out because I'm missing one field"
6. **P-06 (Technology-Agnostic)**: Architecture decision to future-proof specs (see ADR-005)
7. **P-07 (Audit-Visible Activity)**: Regulatory requirement for transaction audit trails
