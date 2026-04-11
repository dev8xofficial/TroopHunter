# User Personas — Attorney Portal

## Primary Persona: Sarah Mitchell — Closing Attorney

**Role**: Closing Attorney (AT)
**Portal**: Attorney Portal
**Initials**: SM
**Firm**: The Burkes Group (legal counsel)

### Background
Sarah Mitchell is a licensed closing attorney specialising in residential real estate transactions. She handles closings for The Burkes Group, overseeing document accuracy, amount verification, and legal compliance.

### Pain Points
- **Scattered information**: Transaction amounts, documents, and client details are spread across emails, faxes, and paper files.
- **Manual verification**: Cross-referencing sale prices, loan amounts, and closing costs across multiple documents is time-consuming and error-prone.
- **Deadline pressure**: Closing dates are firm; missing a deadline due to incomplete verification causes significant disruption.
- **Communication gaps**: Coordinating with agents, lenders, and title companies requires multiple phone calls and emails.

### Goals
- Quickly identify which transactions require verification attention
- Review and approve or reject documents in one place
- Verify all closing amounts against source documents
- Flag discrepancies before they reach the closing table
- Generate verification reports for title company and client records

### Typical Workflow
1. **Morning check**: Open Dashboard → review KPIs and upcoming deadlines
2. **Document review**: Navigate to Documents → review pending documents → approve or reject
3. **Verification**: Navigate to Verification → verify closing amounts for pending transactions
4. **Client communication**: Navigate to Clients → send secure messages about case status
5. **Report generation**: Generate verification reports for completed reviews

---

## Secondary Persona: Transaction Coordinator (TC/Admin)

**Role**: Admin / Transaction Coordinator
**Portal**: Admin Portal (separate spec-kit)

### Relationship to Attorney Portal
The TC may view attorney verification statuses in aggregate for operational reporting. However, the TC does not verify amounts or approve documents — those are AT-exclusive actions.

---

## Tertiary Persona: Real Estate Agent (AG)

**Role**: Real Estate Agent
**Portal**: Agent Portal (separate spec-kit)

### Relationship to Attorney Portal
Agents submit transactions and documents for attorney review. They are the primary document uploaders (purchase agreements, client information). The attorney reviews and verifies what agents submit.

---

## User Journey Map

```
Agent submits           Attorney reviews         Attorney verifies        Closing proceeds
transaction & docs  →   documents on portal  →   closing amounts      →   or flags issue
                    →   approves or rejects  →   signs off             →   report shared
```
