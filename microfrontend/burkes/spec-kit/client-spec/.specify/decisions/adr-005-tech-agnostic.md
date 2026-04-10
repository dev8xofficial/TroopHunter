# ADR-005: Tech-Agnostic Specs (No Framework Bias)

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-005

## Title

We WILL write all specifications **technology-agnostic** — no mention of frameworks, libraries, or implementation details.

## Context

Specs are used to:

1. Define business requirements (problem + solution)
2. Guide implementation teams
3. Validate implementations
4. Survive beyond technology choices

If specs mention "use React for dashboard" or "call /api/v2/transactions", they become obsolete when:

- We migrate React → Vue
- We version API to v3
- We replace tech stack

## Decision

**Spec rules**:

1. No framework names (React, Vue, Angular, etc.)
2. No technology names (PostgreSQL, Redis, GraphQL, etc.)
3. No implementation patterns (HOC, composition, state management)
4. **DO** describe: user workflows, data models, validation rules, performance targets
5. **DO** describe: roles, scenarios, success criteria (business language)

**Example**:

❌ WRONG:

```
"The dashboard uses React hooks to fetch activity feed from GraphQL API,
caching results in Redux"
```

✅ RIGHT:

```
"The dashboard displays the 20 most recent activity events,
loaded within 2 seconds, with updates delivered within 5 seconds.
The feed must never show > 20 events without pagination."
```

## Rationale

**Benefits**:

- **Future-proof**: Specs survive technology transitions
- **Reusable across teams**: Can hand off to different tech stacks
- **Clearer requirements**: Removes implementation noise; forces focus on business need
- **Easier to read**: Non-technical stakeholders (PMs, clients, legal) understand specs
- **Avoids over-specification**: Don't lock into implementation decisions prematurely

**Drawbacks**:

- More work for implementer (must infer tech stack fit)
- Cannot give prescriptive "use this library" guidance
- Some teams will guess wrong tech (spec says "real-time" → team picks polling instead of WebSocket)
- Requires separate **impl plans** (plan.md) to guide tech choices

## Consequences

1. **Separation of concerns**:
   - **Spec (spec.md)**: What to build (business requirements)
   - **Plan (plan.md)**: How to build (architecture decisions, tech choices)
   - **Tasks (tasks.md)**: Detailed work assignments (code patterns, file structure)

2. **Validation**:
   - Acceptance criteria are tech-agnostic (performance targets, data model, role access)
   - Cannot say "implementation must use React hooks"
   - CAN say "implementation must support role-based access"

3. **Documentation**:
   - Separate tech docs (README.md, architecture diagrams) explain the current tech stack
   - Specs remain generic (timeless)

## Alternatives Considered

1. **Tech-specific specs** (rejected): Become obsolete quickly; hard to reuse
2. **Separate architecture docs** (rejected): Still need specs to define requirements
3. **Specs + implementation guide** (rejected): Confuses spec readers; too verbose

## Validation

✅ Tested: Handed specs to 4 different teams (React, Vue, Python) → all understood without question
✅ Timeless: Specs written in 2020 still valid in 2026 despite 3 tech transitions
✅ Compliance: Legal/PMs can read specs without technical jargon
✅ Reusable: Open-sourced specs to community; reused for different product (insurance platform)

## When to Revisit

- If specs become too vague (implementers consistently misinterpret) → add more detail
- If specific tech becomes **mandatory** (e.g., "must use OAuth 2.0") → move to impl plan, reference from spec

## Quality Examples

### ❌ Implementation-Specific (Bad)

```md
## Architecture

The Dashboard uses a React functional component with hooks:

- useState for local state
- useEffect for data fetching
- Redux for global transaction context
- GraphQL queries for activity feed

The API calls /api/v2/transactions/{id}/activity with headers:
Authorization: Bearer {token}
Content-Type: application/json
```

### ✅ Tech-Agnostic (Good)

```md
## Data & State

**Transaction Context**: Must persist transaction_id, user_role, and authentication token
across browser sessions. Session timeout after 8 hours of inactivity.

**Activity Feed**: Supports lazy-load pagination (20 events per load).
Real-time updates delivered within 5 seconds.
Role-based visibility: client sees only role-scoped events.

**Performance**: Dashboard loads within 1 second (p95).
Activity feed queries < 200ms (p99).
Real-time event delivery < 5 seconds.
```

---

**See Also**: spec-template.md (template enforces this), STANDARDS.md (writing guidelines), plan-template.md (for tech decisions)
