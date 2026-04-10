# ADR-004: Role-Scoped Writes (No Overwrites)

**Status**: Accepted (April 2026)
**Decision Date**: March 2026
**Last Modified**: April 2026
**Decision ID**: ADR-004

## Title

We WILL enforce **role-scoped write access** — each role can only write to fields relevant to their job, never overwriting another role's data.

## Context

In a multi-stakeholder transaction, writes must be carefully controlled to prevent:

- **Client overwrites agent's work**: Client changes status_stage in cached dashboard copy
- **Agent loses lender updates**: Agent overwrites mortgage_status before lender's update syncs
- **Conflicts**: Who has authority to set transaction_status → agent or could client override?

## Decision

**Enforce role-scoped write permissions**:

1. Each role owns specific fields (cannot write to other roles' fields)
2. All writes go through API with role check (middleware)
3. Concurrent writes from different roles queued/versioned (not lost)

**Example**:

- **CL (Client)** can write: client_name, primary_address, signature_date
- **AG (Agent)** can write: agent_notes, client_feedback, transaction_status
- **LN (Lender)** can write: mortgage_status, underwriting_conditions, clear_to_close_status
- **AT (Attorney)** can write: attorney_notes, legal_requirements, title_search_results
- No role can write to another role's fields

## Rationale

**Benefits**:

- **Clean separation**: No field has conflicting writers
- **Auditability**: Activity log shows "AG set transaction_status" (clear ownership)
- **Conflict prevention**: No overwrite races (CL and AG both set status)
- **Compliance**: Clear who has authority over each field (AG controls status, not client)

**Drawbacks**:

- No "shared notes" field that multiple roles can write
- If status needs correction, must be done by owner role (cannot shortcut)
- Slightly more complex schema (role_owner field per data item?)

## Consequences

1. **Data Model**:
   - Each table row includes `owned_by_role` field
   - Or: Fields grouped by role ownership (client_fields, agent_fields, lender_fields sub-objects)

2. **API Layer**:
   - Middleware checks: Is user.role allowed to write client_name? → Yes (CL is owner)
   - Middleware checks: Is user.role allowed to write mortgage_status? → No (only LN can)
   - Returns 403 Forbidden if unauthorized write

3. **Conflict Handling**:
   - Concurrent writes from same role → last write wins (normal optimistic locking)
   - Concurrent writes from different roles → queued separately (each processes their role's fields)

## Alternatives Considered

1. **All roles can write all fields** (rejected): Chaos; overwrites; compliance violation
2. **Permissions per field per user** (rejected): Too granular; impossible to audit
3. **Shared notes field** (rejected): Conflicts too complex; use Messages instead

## Validation

✅ Verified with legal: Separates authority (agent controls status, not client)
✅ Tested: Concurrent writes (AG + LN updating different fields) → all data preserved
✅ Auditability: Activity log clearly shows "LN wrote mortgage_status" (field-level ownership)

## When to Revisit

- If shared note field needed between roles → create shared_notes in Messages instead (structured)
- If new role introduced → define which fields it owns
- If CL requests "I want to change my address after offer" → allow via new workflow (not direct write override)

---

**See Also**: ADR-001 (role model), GOVERNANCE.md (authority/approval gates), activity-log-event.json

## Example: Transaction Update Flow

```
CL writes: {primary_address: "123 New St"}
→ API middleware: Is CL owner of primary_address? YES
→ Update transaction.primary_address (write succeeds)
→ Emit event: "CL updated address"

CL writes: {transaction_status: "clear_to_close"}
→ API middleware: Is CL owner of transaction_status? NO (AG is)
→ Return 403 Forbidden
→ Emit security event: "CL attempted unauthorized write to transaction_status"
→ Alert ops team

AG + LN concurrent writes:
  AG: {agent_notes: "Client approved"}
  LN: {mortgage_status: "approved"}
→ Both writes allowed (different owning roles)
→ Both persist successfully
→ Activity log shows both updates with timestamps
```
