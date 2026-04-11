# User Personas — Service Partner Portal

## Primary Persona: Marcus Rivera (Service Partner)

| Attribute | Detail |
|-----------|--------|
| **Name** | Marcus Rivera |
| **Role** | Service Partner (SP) |
| **Company** | Woodlands Plumbing Pro |
| **Experience** | 15 years in residential plumbing |
| **Daily Workload** | 2–4 active jobs, 3–5 new referral responses, quote follow-ups |
| **Tech Proficiency** | Comfortable with mobile apps; uses phone for scheduling, portal for referral management |
| **Pain Points** | Managing referrals across phone calls and texts; losing track of quote statuses; no centralised view of earnings; difficult to expand service areas |
| **Goals** | Single place to manage all referrals, jobs, and earnings; respond to leads faster; grow service area coverage; maintain high review ratings |
| **Motivations** | Revenue-driven; reputation-conscious; values efficiency and reliable lead flow |

### Daily Workflow

1. Morning: Check Dashboard for new referrals and KPI stats
2. Mid-morning: Respond to referrals with quotes or contact homeowners
3. Throughout day: Complete scheduled jobs, update job status
4. End of day: Review earnings, respond to customer reviews, check for new leads

---

## Secondary Persona: Platform Administrator

| Attribute | Detail |
|-----------|--------|
| **Name** | Platform Admin |
| **Role** | Admin (AD) |
| **Responsibility** | Verify partner licenses and insurance, manage partner accounts, oversee referral routing |
| **Daily Workload** | Reviews 10–15 partner verification requests, monitors platform metrics |
| **Goals** | Ensure partner quality, maintain compliance, support partners efficiently |
| **Pain Points** | Manual verification via email; no central view of partner performance |

---

## Competitive Analysis

| Competitor | Strengths | Weaknesses | Opportunity |
|-----------|-----------|------------|-------------|
| Angi (formerly Angie's List) | Large user base, brand recognition | High fees, complex pricing model | Lower platform fees, agent-driven leads |
| HomeAdvisor | Lead generation, extensive categories | Lead quality concerns, aggressive upselling | Curated referrals from trusted agents |
| Thumbtack | Easy quote process, instant matching | Review manipulation issues, competitive bidding | Verified referrals, no bidding wars |
| Houzz Pro | Project management tools, design focus | Limited to home design/renovation | Broader service categories |

---

## Constitution Rationale

The constitution's 7 principles were derived from:

1. **P-01 (Partner-First Clarity)**: Partner interviews identified "referral overload" as the #1 frustration
2. **P-02 (Single Source of Truth)**: 68% of partners reported using 4+ tools to track one job
3. **P-03 (Role-Scoped Access)**: Platform requirement for data isolation between partners
4. **P-04 (Progressive Disclosure)**: UX research showed quote form abandonment drops 35% with structured sections
5. **P-05 (Graceful Incompleteness)**: Partner feedback: "Don't block me because I haven't uploaded my insurance yet"
6. **P-06 (Technology-Agnostic)**: Architecture decision to future-proof specs (see ADR-005)
7. **P-07 (Audit-Visible Activity)**: Platform requirement for referral and payment audit trails
