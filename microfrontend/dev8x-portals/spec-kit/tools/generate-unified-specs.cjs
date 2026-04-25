const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'unified-spec');
const SPECS_ROOT = path.join(ROOT, '.specify', 'specs');
const CONTRACTS_ROOT = path.join(ROOT, 'contracts');
const TODAY = '2026-04-24';
const roleOrder = ['super_admin', 'hr_admin', 'candidate', 'client', 'sales_rep', 'manager'];

const domainMeta = {
  foundation: {
    title: 'Platform Foundation',
    code: '000',
    label: 'Platform Foundation (000)',
    roles: [
      ['Super Admin', 'super_admin', 'Owns canonical registries and governance updates'],
      ['HR Admin', 'hr_admin', 'Consumes global registries for admin workflows'],
      ['Sales Rep', 'sales_rep', 'Consumes shared contracts and role definitions'],
      ['Manager', 'manager', 'Uses shared registries for cross-portal oversight'],
      ['System', 'system', 'Publishes immutable contracts and activity envelopes'],
    ],
    references: [
      'adr-001-unified-spec-kit.md',
      'adr-003-centralized-contracts.md',
      'adr-004-13-file-module-standard.md',
    ],
  },
  auth: {
    title: 'Authentication & Identity',
    code: '0xx',
    label: 'Authentication & Identity (0xx)',
    roles: [
      ['Candidate', 'candidate', 'Registers and authenticates into the candidate portal'],
      ['Client', 'client', 'Authenticates into the client portal'],
      ['HR Admin', 'hr_admin', 'Authenticates into the admin portal with MFA'],
      ['Super Admin', 'super_admin', 'Authenticates into privileged administrative flows'],
      ['Sales Rep', 'sales_rep', 'Authenticates into CRM portal access'],
      ['Manager', 'manager', 'Authenticates for managed account oversight'],
      ['System', 'system', 'Issues tokens, challenges, and audit events'],
    ],
    references: [
      'adr-006-portal-routing-architecture.md',
      'adr-010-multi-portal-auth.md',
    ],
  },
  admin: {
    title: 'HR Admin Panel',
    code: '1xx',
    label: 'HR Admin Panel (1xx)',
    roles: [
      ['HR Admin', 'hr_admin', 'Runs recruiting, hiring, and operational workflows'],
      ['Super Admin', 'super_admin', 'Maintains global oversight and escalations'],
      ['Manager', 'manager', 'Has read-only oversight for managed teams'],
      ['System', 'system', 'Publishes calculations, alerts, and audit entries'],
    ],
    references: ['adr-007-pipeline-kanban-state-machine.md'],
  },
  candidate: {
    title: 'Candidate Portal',
    code: '2xx',
    label: 'Candidate Portal (2xx)',
    roles: [
      ['Candidate', 'candidate', 'Acts on their own application, interviews, and onboarding'],
      ['HR Admin', 'hr_admin', 'Supports candidate progress and exception handling'],
      ['Super Admin', 'super_admin', 'Reviews escalations and compliance issues'],
      ['Manager', 'manager', 'Has limited read-only oversight for managed placements'],
      ['System', 'system', 'Calculates progress, deadlines, and audit events'],
    ],
    references: [],
  },
  client: {
    title: 'Client Portal',
    code: '3xx',
    label: 'Client Portal (3xx)',
    roles: [
      ['Client', 'client', 'Views and manages their own account data'],
      ['Manager', 'manager', 'Operates on managed client accounts'],
      ['Super Admin', 'super_admin', 'Provides read-only or support access'],
      ['System', 'system', 'Publishes summaries, sync status, and lifecycle events'],
    ],
    references: ['adr-008-clockify-integration-strategy.md'],
  },
  crm: {
    title: 'CRM / Sales',
    code: '4xx',
    label: 'CRM / Sales (4xx)',
    roles: [
      ['Sales Rep', 'sales_rep', 'Owns outreach, contacts, deals, and pipeline activity'],
      ['Manager', 'manager', 'Configures teams, targets, and pipeline oversight'],
      ['Super Admin', 'super_admin', 'Supports escalations and cross-domain audits'],
      ['System', 'system', 'Computes scores, alerts, and audit records'],
    ],
    references: ['adr-009-lead-scoring-model.md'],
  },
};

function f(name, type, required, constraints, description, extra = {}) {
  return { name, type, required, constraints, description, ...extra };
}

function req(title, description, acceptance) {
  return { title, description, acceptance };
}

function rule(title, condition, action, rationale) {
  return { title, condition, action, rationale };
}

function ep(method, route, description, options = {}) {
  const auth = options.auth ?? (method === 'GET' && route.includes('/auth/') ? 'None' : 'Bearer token');
  return {
    method,
    route,
    description,
    auth,
    rateLimit:
      options.rateLimit ||
      (method === 'GET' ? '60 requests/minute' : method === 'POST' ? '30 requests/minute' : '20 requests/minute'),
    idempotent: options.idempotent || (method === 'GET' ? 'Yes' : 'No'),
    requestModel: options.requestModel || null,
    responseModel: options.responseModel || null,
    errors: options.errors || defaultErrors(method, auth),
  };
}

function ev(name, trigger, actor, payload, extra = {}) {
  return { name, trigger, actor, payload, ...extra };
}

function model(name, description, fields, options = {}) {
  return { name, description, fields, ...options };
}

function entity(name, description, fields) {
  return { name, description, fields };
}

function op(label, access) {
  return { label, access };
}

function lifecycle(name, states, transitions, invariants) {
  return { name, states, transitions, invariants };
}

const idField = f('id', 'uuid', true, 'Primary key, immutable', 'Unique identifier');
const createdAtField = f('created_at', 'datetime', true, 'Auto-generated', 'Creation timestamp');
const updatedAtField = f('updated_at', 'datetime', true, 'Auto-updated on mutation', 'Last update timestamp');
const emailField = f('email', 'string', true, 'RFC 5322, max 254', 'Email address', { format: 'email' });
const nameField = f('name', 'string', true, 'min 1, max 255', 'Display name');
const dateFromField = f('date_from', 'date', false, 'Inclusive lower bound', 'Reporting range start');
const dateToField = f('date_to', 'date', false, 'Inclusive upper bound', 'Reporting range end');
const paginationFields = [
  f('page', 'integer', false, 'min 1, default 1', 'Page number'),
  f('page_size', 'integer', false, 'min 1, max 100, default 25', 'Page size'),
];

function withAudit(fields) {
  return [idField, ...fields, createdAtField, updatedAtField];
}

function defaultErrors(method, auth = 'Bearer token') {
  const items = [{ code: 400, condition: 'Validation failure', body: '{ error: "VALIDATION_ERROR" }' }];
  if (method !== 'GET' || auth !== 'None') items.push({ code: 401, condition: 'Unauthorized', body: '{ error: "UNAUTHORIZED" }' });
  items.push({ code: 403, condition: 'Forbidden', body: '{ error: "FORBIDDEN" }' });
  items.push({ code: 429, condition: 'Rate limit exceeded', body: '{ error: "RATE_LIMITED" }' });
  return items;
}

function accessLabel(access, role) {
  switch (access) {
    case 'foundation_read':
      return ['super_admin', 'hr_admin', 'sales_rep', 'manager'].includes(role) ? 'Read' : 'Deny';
    case 'foundation_manage':
      return role === 'super_admin' ? 'Allow' : role === 'hr_admin' ? 'Read' : 'Deny';
    case 'public_auth':
      return ['super_admin', 'hr_admin', 'candidate', 'client', 'sales_rep', 'manager'].includes(role) ? 'Allow' : 'Deny';
    case 'candidate_client':
      return ['candidate', 'client'].includes(role) ? 'Allow' : 'Deny';
    case 'self_register':
      return role === 'candidate' ? 'Allow' : 'Deny';
    case 'self_service':
      return ['super_admin', 'hr_admin', 'candidate', 'client', 'sales_rep', 'manager'].includes(role) ? 'Own' : 'Deny';
    case 'admin_manage':
      return ['super_admin', 'hr_admin'].includes(role) ? 'Allow' : 'Deny';
    case 'admin_read':
      return ['super_admin', 'hr_admin'].includes(role) ? 'Allow' : role === 'manager' ? 'Read' : 'Deny';
    case 'admin_config':
      return role === 'super_admin' ? 'Allow' : role === 'hr_admin' ? 'Support' : 'Deny';
    case 'super_admin_only':
      return role === 'super_admin' ? 'Allow' : 'Deny';
    case 'candidate_view':
      return role === 'candidate'
        ? 'Own'
        : ['super_admin', 'hr_admin'].includes(role)
          ? 'Read'
          : role === 'manager'
            ? 'Read'
            : 'Deny';
    case 'candidate_action':
      return role === 'candidate' ? 'Own' : ['super_admin', 'hr_admin'].includes(role) ? 'Support' : 'Deny';
    case 'candidate_support':
      return ['super_admin', 'hr_admin'].includes(role) ? 'Allow' : role === 'manager' ? 'Read' : 'Deny';
    case 'client_view':
      return role === 'client' ? 'Own' : role === 'manager' ? 'Managed' : role === 'super_admin' ? 'Read' : 'Deny';
    case 'client_action':
      return role === 'client' ? 'Own' : role === 'manager' ? 'Managed' : role === 'super_admin' ? 'Support' : 'Deny';
    case 'client_support':
      return role === 'manager' ? 'Managed' : role === 'super_admin' ? 'Support' : 'Deny';
    case 'crm_view':
      return ['sales_rep', 'manager'].includes(role) ? 'Allow' : role === 'super_admin' ? 'Read' : 'Deny';
    case 'crm_write':
      return ['sales_rep', 'manager'].includes(role) ? 'Allow' : role === 'super_admin' ? 'Support' : 'Deny';
    case 'crm_config':
      return role === 'manager' ? 'Allow' : role === 'sales_rep' ? 'Read' : role === 'super_admin' ? 'Support' : 'Deny';
    default:
      return 'Deny';
  }
}

function dataVisibilityRows(domainKey) {
  const map = {
    foundation: [
      ['Canonical registries', 'Read', 'Read', 'Deny', 'Deny', 'Read', 'Read'],
      ['Contract publication history', 'Allow', 'Read', 'Deny', 'Deny', 'Read', 'Read'],
      ['Governance changes', 'Allow', 'Read', 'Deny', 'Deny', 'Deny', 'Deny'],
    ],
    auth: [
      ['Own account', 'Own', 'Own', 'Own', 'Own', 'Own', 'Own'],
      ['Own active sessions', 'Own', 'Own', 'Own', 'Own', 'Own', 'Own'],
      ['All active sessions', 'Allow', 'Deny', 'Deny', 'Deny', 'Deny', 'Deny'],
    ],
    admin: [
      ['All recruiting records', 'Allow', 'Allow', 'Deny', 'Deny', 'Deny', 'Read'],
      ['Configuration and user management', 'Allow', 'Support', 'Deny', 'Deny', 'Deny', 'Deny'],
      ['Audit exports', 'Allow', 'Allow', 'Deny', 'Deny', 'Deny', 'Read'],
    ],
    candidate: [
      ['Own candidate record', 'Read', 'Read', 'Own', 'Deny', 'Deny', 'Read'],
      ['Candidate exception handling', 'Allow', 'Allow', 'Deny', 'Deny', 'Deny', 'Deny'],
      ['Peer candidate records', 'Read', 'Read', 'Deny', 'Deny', 'Deny', 'Deny'],
    ],
    client: [
      ['Own client account', 'Read', 'Deny', 'Deny', 'Own', 'Deny', 'Managed'],
      ['Managed client accounts', 'Support', 'Deny', 'Deny', 'Deny', 'Deny', 'Managed'],
      ['Cross-client data', 'Read', 'Deny', 'Deny', 'Deny', 'Deny', 'Deny'],
    ],
    crm: [
      ['Assigned pipeline records', 'Read', 'Deny', 'Deny', 'Deny', 'Allow', 'Allow'],
      ['Teamwide CRM settings', 'Support', 'Deny', 'Deny', 'Deny', 'Read', 'Allow'],
      ['Closed deal archive', 'Read', 'Deny', 'Deny', 'Deny', 'Allow', 'Allow'],
    ],
  };
  return map[domainKey];
}

function moduleSpecificReferences(module) {
  const refs = [...domainMeta[module.domainKey].references];
  if (module.id === '102-admin-pipeline') refs.push('adr-007-pipeline-kanban-state-machine.md');
  if (module.id === '304-client-working-hours') refs.push('adr-008-clockify-integration-strategy.md');
  if (module.id === '406-crm-scoring') refs.push('adr-009-lead-scoring-model.md');
  return [...new Set(refs)];
}

function moduleCode(module) {
  return module.id.split('-')[0];
}

function moduleHeading(module) {
  return `${module.title}`;
}

function modelMap(module) {
  return Object.fromEntries(module.models.map((item) => [item.name, item]));
}

function defaultTasks(module) {
  const tasks = [];
  if (module.entities.length) {
    tasks.push({
      title: `Model ${module.entities.map((item) => item.name).join(' and ')}`,
      priority: 'P0',
      complexity: module.entities.length > 1 ? 'L' : 'M',
      description: `Finalize canonical data structures, validation rules, and ownership boundaries for ${module.title.toLowerCase()}.`,
    });
  }
  if (module.endpoints.length) {
    tasks.push({
      title: 'Deliver core API surface',
      priority: 'P0',
      complexity: module.endpoints.length > 2 ? 'L' : 'M',
      description: `Implement the request and response contracts for ${module.endpoints.map((item) => `${item.method} ${item.route}`).join(', ')}.`,
    });
  }
  tasks.push({
    title: 'Enforce RBAC and data scoping',
    priority: 'P0',
    complexity: 'M',
    description: 'Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix.',
  });
  if (module.stateMachine) {
    tasks.push({
      title: `Implement ${module.stateMachine.name.toLowerCase()}`,
      priority: 'P1',
      complexity: 'M',
      description: 'Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling.',
    });
  }
  if (module.events.length) {
    tasks.push({
      title: 'Wire audit events',
      priority: 'P1',
      complexity: 'S',
      description: `Emit ${module.events.length} append-only events with payloads aligned to contracts/events.yaml.`,
    });
  }
  tasks.push({
    title: 'Add validation and regression coverage',
    priority: 'P1',
    complexity: 'S',
    description: 'Cover positive, negative, permission, and lifecycle regression cases before implementation closes.',
  });
  return tasks;
}

function defaultMetrics(module) {
  const slug = module.id;
  if (slug.includes('dashboard') || slug.includes('analytics')) {
    return [
      ['Snapshot freshness', '95% of snapshots refreshed within 5 minutes', 'dashboard summary timestamps'],
      ['Query latency', 'p95 under 1.5 seconds', 'API response timing'],
      ['Drilldown completion', '80% of drilldowns land on a valid downstream module', 'navigation audit events'],
    ];
  }
  if (slug.includes('pipeline')) {
    return [
      ['Invalid transition rate', '< 1% of attempted stage moves rejected', 'stage change audit events'],
      ['Stale record visibility', '100% of stale records flagged within SLA', 'staleness job output'],
      ['Transition completion time', 'p95 under 2 seconds', 'workflow timing metrics'],
    ];
  }
  if (slug.includes('documents') || slug.includes('contracts')) {
    return [
      ['Completion rate', '95% of required signatures completed before deadline', 'document status changes'],
      ['Verification lag', 'p95 under 1 business day', 'review workflow timestamps'],
      ['Download success rate', '> 99%', 'download audit events'],
    ];
  }
  if (slug.includes('messages') || slug.includes('messaging') || slug.includes('support')) {
    return [
      ['Unread backlog', '< 5 aged unread items per owner', 'message and ticket queues'],
      ['Response SLA', '90% responded within agreed SLA', 'message and ticket timestamps'],
      ['Escalation accuracy', '100% of escalations linked to a valid thread or ticket', 'audit events'],
    ];
  }
  if (slug.includes('working-hours')) {
    return [
      ['Clockify sync freshness', '95% of imports under 15 minutes old', 'sync metadata'],
      ['Budget threshold alerting', '100% of threshold crossings logged', 'budget burn events'],
      ['Time entry completeness', '98% of imported entries mapped to a project', 'time entry audits'],
    ];
  }
  if (slug.includes('settings')) {
    return [
      ['Change approval coverage', '100% of setting changes include an approver', 'settings audit trail'],
      ['Rollback success rate', '> 99% for reversible changes', 'change management workflow'],
      ['Policy drift incidents', '0 unauthorized configuration drifts', 'periodic reconciliation'],
    ];
  }
  return [
    ['Request success rate', '> 99%', 'API status codes'],
    ['Lifecycle compliance', '100% of state changes follow the approved lifecycle', 'state transition logs'],
    ['Audit coverage', '100% of writes emit events', 'event pipeline reconciliation'],
  ];
}

function defaultRisks(module) {
  const slug = module.id;
  if (slug.includes('auth') || slug.includes('mfa') || slug.includes('password') || slug.includes('sso')) {
    return [
      ['Identity security regression', 'High', 'Protect with rate limits, replay protection, and lockout controls.'],
      ['Role leakage between portals', 'High', 'Enforce portal-scoped claims and route validation.'],
      ['Incomplete audit coverage', 'Medium', 'Verify every authentication branch emits an event.'],
    ];
  }
  if (slug.includes('pipeline') || slug.includes('application') || slug.includes('jobs')) {
    return [
      ['Invalid lifecycle skip', 'High', 'Block transitions that bypass required stages.'],
      ['Stale decision data', 'Medium', 'Add freshness indicators and escalation rules.'],
      ['Manager read access overreach', 'Medium', 'Keep managers in read-only or managed scopes only.'],
    ];
  }
  if (slug.includes('files') || slug.includes('documents') || slug.includes('contracts')) {
    return [
      ['Sensitive document exposure', 'High', 'Require scoped access and secure download auditing.'],
      ['Version mismatch', 'Medium', 'Keep immutable version identifiers and current-version markers.'],
      ['Signature gating failure', 'High', 'Prevent onboarding or contract progression until signatures are complete.'],
    ];
  }
  if (slug.includes('analytics') || slug.includes('dashboard') || slug.includes('scoring')) {
    return [
      ['Stale insights', 'Medium', 'Publish snapshot timestamps and refresh jobs.'],
      ['Calculation drift', 'High', 'Centralize formula definitions and regression tests.'],
      ['Cross-account leakage', 'High', 'Filter aggregates by the current account or book of business.'],
    ];
  }
  return [
    ['Permission drift', 'High', 'Validate role mapping against the RBAC contract on every release.'],
    ['Validation gaps', 'Medium', 'Keep request schemas aligned with contract changes.'],
    ['Incomplete event payloads', 'Medium', 'Reconcile module events with the shared event schema.'],
  ];
}

function defaultRollout(module) {
  return [
    ['Phase 1', 'Contract readiness', `Validate ${module.models.length || 1} schemas, permissions, and event payloads in non-production review.`],
    ['Phase 2', 'Pilot release', `Enable ${module.title.toLowerCase()} for a limited audience with event and error monitoring.`],
    ['Phase 3', 'General availability', 'Promote to all intended roles after lifecycle, permissions, and audit checks pass.'],
  ];
}

function defaultTests(module) {
  const code = moduleCode(module);
  const tests = [
    [`TS-${code}-01`, 'Happy path', `Validate primary ${module.title.toLowerCase()} workflow succeeds for the intended role.`],
    [`TS-${code}-02`, 'Permission boundary', 'Confirm unauthorized roles receive FORBIDDEN and no state changes occur.'],
    [`TS-${code}-03`, 'Validation failure', 'Submit malformed or incomplete payloads and confirm schema rejection.'],
  ];
  if (module.stateMachine) {
    tests.push([`TS-${code}-04`, 'Invalid state transition', 'Attempt a disallowed lifecycle move and confirm the state remains unchanged.']);
  }
  if (module.events.length) {
    tests.push([`TS-${code}-05`, 'Audit emission', 'Confirm the expected audit event is emitted exactly once with the required payload.']);
  }
  return tests;
}

function accessNotes(module) {
  const notes = {
    foundation: [
      ['Registry edits', 'Only `super_admin` may publish or supersede canonical registries.'],
      ['Shared visibility', '`hr_admin`, `sales_rep`, and `manager` consume read-only registry views.'],
    ],
    auth: [
      ['Admin MFA', '`super_admin` and `hr_admin` cannot complete admin authentication without MFA.'],
      ['Candidate registration', 'Only `candidate` supports self-registration.'],
      ['Portal scoping', 'Authenticated sessions remain bound to the selected portal.'],
    ],
    admin: [
      ['Manager access', '`manager` stays read-only across admin modules unless explicitly escalated elsewhere.'],
      ['Administrative changes', 'Mutating operations require `hr_admin` or `super_admin`.'],
    ],
    candidate: [
      ['Own-data model', '`candidate` can only act on their own records.'],
      ['Support roles', '`hr_admin` and `super_admin` may assist or review but do not become the owning actor.'],
    ],
    client: [
      ['Managed accounts', '`manager` works only within managed client accounts.'],
      ['Support access', '`super_admin` is support or read-only unless otherwise stated.'],
    ],
    crm: [
      ['Sales ownership', '`sales_rep` and `manager` own operational CRM workflows.'],
      ['Configuration control', 'CRM configuration changes require `manager` or supported `super_admin` action.'],
    ],
  };
  return notes[module.domainKey];
}

function table(headers, rows) {
  const escapeCell = (value) =>
    String(value)
      .replace(/\|/g, '\\|')
      .replace(/\r?\n/g, '<br>');
  const head = `| ${headers.map(escapeCell).join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`).join('\n');
  return [head, divider, body].join('\n');
}

function stringifyPayload(payload) {
  return typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
}

function schemaForField(field) {
  const schema = { description: field.description };
  switch (field.type) {
    case 'uuid':
      schema.type = 'string';
      schema.format = 'uuid';
      break;
    case 'datetime':
      schema.type = 'string';
      schema.format = 'date-time';
      break;
    case 'date':
      schema.type = 'string';
      schema.format = 'date';
      break;
    case 'integer':
      schema.type = 'integer';
      break;
    case 'number':
      schema.type = 'number';
      break;
    case 'boolean':
      schema.type = 'boolean';
      break;
    case 'array':
      schema.type = 'array';
      schema.items = field.items || { type: 'string' };
      break;
    case 'object':
      schema.type = 'object';
      break;
    default:
      schema.type = 'string';
  }
  if (field.enum) schema.enum = field.enum;
  if (field.pattern) schema.pattern = field.pattern;
  return schema;
}

function buildSchema(module) {
  const definitions = {};
  const sourceModels = module.models.length ? module.models : module.entities;
  sourceModels.forEach((item) => {
    const properties = {};
    const required = [];
    item.fields.forEach((field) => {
      properties[field.name] = schemaForField(field);
      if (field.required) required.push(field.name);
    });
    definitions[item.name] = {
      type: 'object',
      description: item.description,
      properties,
      additionalProperties: false,
    };
    if (required.length) definitions[item.name].required = required;
  });
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: `${module.title} validation schema`,
    description: `Validation definitions for ${module.id}.`,
    type: 'object',
    definitions,
  };
}

function renderSpec(module) {
  const code = moduleCode(module);
  const references = moduleSpecificReferences(module)
    .map((item) => `- [${item}](../../decisions/${item})`)
    .join('\n');
  const entitySections = module.entities
    .map((item) => {
      const rows = item.fields.map((field) => [
        field.name,
        field.type,
        field.required ? 'Yes' : 'No',
        field.constraints,
        field.description,
      ]);
      return `### ${item.name}\n\n${item.description}\n\n${table(
        ['Field', 'Type', 'Required', 'Constraints', 'Description'],
        rows,
      )}`;
    })
    .join('\n\n');
  const dependencyRows = (module.dependencies.length ? module.dependencies : [['contracts', 'Shared', 'Reads from shared contracts and constitutional guardrails']])
    .map((item) => (Array.isArray(item) ? item : [item.module, item.type, item.description]));

  return `# ${moduleHeading(module)}

> **Module ID**: \`${module.id}\`
> **Domain**: ${domainMeta[module.domainKey].label}
> **Version**: 1.0.0
> **Last Updated**: ${TODAY}

---

## Overview

${module.overview}

---

## Actors

${table(
  ['Actor', 'Role', 'Interaction'],
  module.actors.map((item) => item),
)}

---

## Functional Requirements

${module.requirements
  .map(
    (item, index) => `### FR-${code}-${String(index + 1).padStart(2, '0')}: ${item.title}

**Description**: ${item.description}

**Acceptance Criteria**:
${item.acceptance.map((point) => `- [ ] ${point}`).join('\n')}`,
  )
  .join('\n\n')}

---

## Data Model

${entitySections}

---

## Business Rules

${module.rules
  .map(
    (item, index) => `### BR-${code}-${String(index + 1).padStart(2, '0')}: ${item.title}

**Condition**: ${item.condition}
**Action**: ${item.action}
**Rationale**: ${item.rationale}`,
  )
  .join('\n\n')}

---

## State Machine

See [state-machines.md](state-machines.md) for the ${module.stateMachine ? module.stateMachine.name.toLowerCase() : 'approved lifecycle'}.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
${module.endpoints.map((item) => `- \`${item.method} ${item.route}\``).join('\n')}

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
${module.events.map((item, index) => `- \`${item.name}\` (EVT-${code}-${String(index + 1).padStart(2, '0')})`).join('\n')}

---

## Dependencies

${table(['Module', 'Dependency Type', 'Description'], dependencyRows)}

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
${references}`;
}

function renderPlan(module) {
  const tasks = module.tasks.length ? module.tasks : defaultTasks(module);
  const phases = [
    ['Phase 1', 'Contract preparation', tasks.filter((item) => item.priority === 'P0').map((item) => item.title).join(', ') || 'Core contract validation'],
    ['Phase 2', 'Workflow delivery', tasks.filter((item) => item.priority === 'P1').map((item) => item.title).join(', ') || 'Lifecycle and event wiring'],
    ['Phase 3', 'Hardening', tasks.filter((item) => ['P2', 'P3'].includes(item.priority)).map((item) => item.title).join(', ') || 'Regression, observability, and rollout checks'],
  ];
  const contractRows = [
    ['api.yaml', 'Yes', `Registers ${module.endpoints.length} ${module.endpoints.length === 1 ? 'endpoint' : 'endpoints'}`],
    ['access-control.yaml', 'Yes', `Captures ${module.operations.length || 3} permission operations`],
    ['events.yaml', 'Yes', `Registers ${module.events.length} append-only audit events`],
    ['interactions.yaml', 'Yes', `Publishes ${module.stateMachine ? module.stateMachine.name : 'module lifecycle'} transitions`],
  ];
  return `# ${module.title} - Implementation Plan

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Objective

Implement the ${module.title.toLowerCase()} specification for the ${domainMeta[module.domainKey].title.toLowerCase()} domain with contract-first validation, RBAC enforcement, and append-only audit coverage.

---

## Prerequisites

${table(
  ['Prerequisite', 'Status'],
  [
    ['Functional requirements approved', 'Complete (spec.md)'],
    ['Validation models defined', 'Complete (validation-schema.json)'],
    ['RBAC contract defined', 'Complete (rbac-matrix.md)'],
    ['Shared contracts aligned', 'Complete (contracts/*.yaml)'],
  ],
)}

---

## Implementation Tasks

${tasks
  .map(
    (item, index) => `### Task ${index + 1}: ${item.title}

**Complexity**: ${item.complexity}
**Priority**: ${item.priority}

**Description**: ${item.description}`,
  )
  .join('\n\n')}

---

## Cross-Domain Dependencies

${table(['Contract', 'Update Required', 'Description'], contractRows)}

---

## Estimated Timeline

${table(['Phase', 'Duration', 'Tasks'], phases.map((item, index) => [item[0], `${index + 1}-${index + 2} days`, item[2]]))}`;
}

function renderTasks(module) {
  const code = moduleCode(module);
  const tasks = module.tasks.length ? module.tasks : defaultTasks(module);
  const groups = ['P0', 'P1', 'P2', 'P3'];
  return `# ${module.title} - Tasks

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Task Breakdown

${groups
  .map((priority) => {
    const items = tasks.filter((item) => item.priority === priority);
    if (!items.length) return '';
    return `### ${priority} - ${priority === 'P0' ? 'Critical Path' : priority === 'P1' ? 'High Priority' : priority === 'P2' ? 'Medium Priority' : 'Low Priority'}

${items
  .map(
    (item, index) =>
      `- [ ] **T-${code}-${String(index + 1).padStart(2, '0')}**: ${item.title} - ${item.description} \`[Complexity: ${item.complexity}]\``,
  )
  .join('\n')}`;
  })
  .filter(Boolean)
  .join('\n\n')}

---

## Validation Tasks

${defaultTests(module)
  .map((item, index) => `- [ ] **V-${code}-${String(index + 1).padStart(2, '0')}**: ${item[2]}`)
  .join('\n')}`;
}

function renderChangelog(module) {
  return `# ${module.title} - Changelog

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Entries

| Date | Version | Change | Author |
| --- | --- | --- | --- |
| ${TODAY} | 1.0.0 | Replaced placeholder artifact set with portal-aligned functional spec, contracts, RBAC, lifecycle, validation schema, rollout, and test coverage. | Codex |
| 2026-04-22 | 0.1.0 | Scaffolded module directory and empty artifact set. | System |

---

## Notes

- This changelog tracks specification evolution only.
- Contract-breaking updates must publish a new ADR before the next version increment.`;
}

function renderMetrics(module) {
  const rows = module.metrics.length ? module.metrics : defaultMetrics(module);
  return `# ${module.title} - Metrics

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Success Metrics

${table(['Metric', 'Target', 'Measurement Source'], rows)}

---

## Review Cadence

- Weekly review during active delivery.
- Monthly review after general availability.
- Immediate review when lifecycle, permission, or audit regressions are detected.`;
}

function renderRisks(module) {
  const rows = module.risks.length ? module.risks : defaultRisks(module);
  return `# ${module.title} - Risks

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Risk Register

${table(['Risk', 'Severity', 'Mitigation'], rows)}

---

## Escalation Triggers

- Contract drift between module artifacts and shared YAML contracts.
- Missing audit events on state-changing operations.
- Any permission result that exceeds the RBAC matrix.`;
}

function renderRollout(module) {
  const rows = module.rollout.length ? module.rollout : defaultRollout(module);
  return `# ${module.title} - Rollout

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Rollout Stages

${table(['Stage', 'Goal', 'Exit Criteria'], rows)}

---

## Rollback Criteria

- Repeated validation failures on required payloads.
- Unauthorized access beyond the matrix defined in rbac-matrix.md.
- Missing or malformed append-only audit events.`;
}

function renderTests(module) {
  return `# ${module.title} - Test Scenarios

> **Module ID**: \`${module.id}\`
> **Version**: 1.0.0

---

## Scenarios

${table(['Scenario ID', 'Category', 'Expected Result'], defaultTests(module))}

---

## Coverage Expectations

- Cover all functional requirements in spec.md.
- Cover all state transitions in state-machines.md.
- Cover all write operations and audit events in activity-log-events.md.
- Cover every role-operation pair that should resolve to something other than \`Deny\`.`;
}

function renderRbac(module) {
  const operations = module.operations.length
    ? module.operations
    : [
        op(`View ${module.title.toLowerCase()} data`, `${module.domainKey}_view`),
        op(`Manage ${module.title.toLowerCase()} workflow`, `${module.domainKey}_write`),
        op('Review audit history', module.domainKey === 'foundation' ? 'foundation_read' : module.domainKey === 'admin' ? 'admin_read' : module.domainKey === 'candidate' ? 'candidate_support' : module.domainKey === 'client' ? 'client_support' : 'crm_view'),
      ];
  return `# ${module.title} - RBAC Matrix

> **Module ID**: \`${module.id}\`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

${table(
  ['Operation', ...roleOrder],
  operations.map((item) => [item.label, ...roleOrder.map((role) => accessLabel(item.access, role))]),
)}

---

## Special Access Rules

${table(['Rule', 'Description'], accessNotes(module))}

---

## Data Visibility

${table(['Data Scope', ...roleOrder], dataVisibilityRows(module.domainKey))}`;
}

function renderEvents(module) {
  const code = moduleCode(module);
  const primary = module.events[0];
  return `# ${module.title} - Activity Log Events

> **Module ID**: \`${module.id}\`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

${table(
  ['Event ID', 'Event Name', 'Trigger', 'Actor', 'Payload'],
  module.events.map((item, index) => [
    `EVT-${code}-${String(index + 1).padStart(2, '0')}`,
    `\`${item.name}\``,
    item.trigger,
    item.actor,
    item.payload,
  ]),
)}

---

## Event Schema

### EVT-${code}-01: \`${primary.name}\`

\`\`\`json
${JSON.stringify(
  {
    event_id: `EVT-${code}-01`,
    event_name: primary.name,
    timestamp: `${TODAY}T10:00:00Z`,
    actor: { user_id: 'uuid', role: primary.actor.split(' / ')[0] || primary.actor },
    entity: { type: module.entities[0] ? module.entities[0].name.toLowerCase() : 'record', id: 'uuid' },
    payload: { details: primary.payload },
  },
  null,
  2,
)}
\`\`\`

---

## Retention Policy

${table(
  ['Event Category', 'Retention', 'Archive'],
  [
    [`${module.domainKey} events`, 'Indefinite', 'Cold storage after 1 year'],
    ['Security-relevant events', 'Indefinite', 'Pinned for forensic review'],
  ],
)}
`;
}

function renderApi(module) {
  const models = modelMap(module);
  const sections = module.endpoints
    .map((item) => {
      const requestModel = item.requestModel ? models[item.requestModel] : null;
      const responseModel = item.responseModel ? models[item.responseModel] : null;
      const requestRows = requestModel
        ? requestModel.fields.map((field) => [field.name, field.type, field.required ? 'Yes' : 'No', field.constraints, field.description]).join('\n')
        : '';
      const responseRows = responseModel
        ? responseModel.fields.map((field) => [field.name, field.type, field.description]).join('\n')
        : '';
      return `### ${item.method} ${item.route}

| Field | Value |
| --- | --- |
| **Description** | ${item.description} |
| **Auth** | ${item.auth} |
| **Rate Limit** | ${item.rateLimit} |
| **Idempotent** | ${item.idempotent} |

${requestModel ? `**Request Body:**\n\n${table(['Field', 'Type', 'Required', 'Constraints', 'Description'], requestModel.fields.map((field) => [field.name, field.type, field.required ? 'Yes' : 'No', field.constraints, field.description]))}\n` : '**Request Body:** None\n'}
${responseModel ? `\n**Response (200 OK):**\n\n${table(['Field', 'Type', 'Description'], responseModel.fields.map((field) => [field.name, field.type, field.description]))}\n` : '\n**Response (200 OK):** Standard success envelope.\n'}
**Error Codes:**

${table(['Code', 'Condition', 'Response Body'], item.errors.map((error) => [String(error.code), error.condition, `\`${error.body}\``]))}`;
    })
    .join('\n\n---\n\n');

  return `# ${module.title} - API Contracts

> **Module ID**: \`${module.id}\`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

${sections}

---

## Common Headers

${table(
  ['Header', 'Required', 'Description'],
  [
    ['`Authorization`', 'Yes (authenticated endpoints)', '`Bearer {token}`'],
    ['`Content-Type`', 'Yes', '`application/json`'],
    ['`X-Request-ID`', 'Recommended', 'Request tracing identifier'],
    ['`X-Portal`', module.domainKey === 'auth' ? 'Yes for auth flows' : 'Optional', 'Portal context'],
  ],
)}
`;
}

function renderStateMachine(module) {
  if (!module.stateMachine) {
    return `# ${module.title} - State Machines

> **Module ID**: \`${module.id}\`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

No standalone lifecycle is defined for this module.`;
  }
  const diagram = module.stateMachine.transitions
    .map((item) => `[${item.from}] -- ${item.trigger} --> [${item.to}]`)
    .join('\n');
  return `# ${module.title} - State Machines

> **Module ID**: \`${module.id}\`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## ${module.stateMachine.name}

### States

${table(
  ['State', 'Description', 'Terminal'],
  module.stateMachine.states.map((item) => [item.name, item.description, item.terminal ? 'Yes' : 'No']),
)}

### Transitions

${table(
  ['From', 'To', 'Trigger', 'Guard', 'Side Effects'],
  module.stateMachine.transitions.map((item) => [item.from, item.to, item.trigger, item.guard, item.sideEffects]),
)}

### State Diagram

\`\`\`
${diagram}
\`\`\`

### Invariants

${table(
  ['Invariant', 'Description'],
  module.stateMachine.invariants.map((item, index) => [`INV-${moduleCode(module)}-${String(index + 1).padStart(2, '0')}`, item]),
)}
`;
}

function renderValidationSchema(module) {
  return `${JSON.stringify(buildSchema(module), null, 2)}\n`;
}

function writeFile(target, content) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}

const modules = [
  {
    id: '000-foundation',
    title: 'Foundation',
    domainKey: 'foundation',
    overview:
      'The Foundation module owns the canonical role registry, domain map, audit envelope, and contract discovery surfaces used by every Dev8X portal. It prevents domain drift by keeping shared definitions centralized and versioned.',
    requirements: [
      req('Publish the canonical domain registry', 'The system shall expose the single approved registry of platform domains, modules, and ownership boundaries.', [
        'Registry lists all 39 modules with their domain grouping.',
        'Superseded registry versions remain discoverable for audit.',
        'Consumers can retrieve the current contract manifest without portal-specific knowledge.',
      ]),
      req('Publish the canonical role model', 'The system shall expose the approved platform roles and their cross-domain meanings.', [
        'All six platform roles are listed with a unique role identifier.',
        'Role definitions align with the constitution and access-control contract.',
        'Changes to role definitions are versioned before publication.',
      ]),
      req('Define the immutable audit envelope', 'The system shall define the append-only event wrapper shared by all domains.', [
        'Audit envelope includes actor, entity, payload, and timestamp.',
        'Envelope structure is consistent across auth, admin, candidate, client, and CRM domains.',
        'Envelope schema is referenced by contracts/events.yaml.',
      ]),
    ],
    entities: [
      entity(
        'DomainRegistry',
        'Canonical list of platform modules and their domain ownership.',
        withAudit([
          f('domain_code', 'string', true, 'enum: 000, 0xx, 1xx, 2xx, 3xx, 4xx', 'Domain code group'),
          f('module_id', 'string', true, 'unique', 'Module identifier'),
          f('module_title', 'string', true, 'max 255', 'Module title'),
          f('owner_role', 'string', true, 'enum: super_admin, hr_admin, sales_rep, manager', 'Owning role'),
          f('status', 'string', true, 'enum: draft, validated, published, superseded', 'Registry record status', {
            enum: ['draft', 'validated', 'published', 'superseded'],
          }),
        ]),
      ),
      entity(
        'AuditEnvelope',
        'Shared wrapper for immutable event records.',
        [
          f('event_id', 'string', true, 'Unique event identifier', 'Published event id'),
          f('event_name', 'string', true, 'dot.notation', 'Canonical event name'),
          f('actor_role', 'string', true, 'platform role id', 'Role responsible for the event'),
          f('entity_type', 'string', true, 'max 120', 'Affected entity type'),
          f('entity_id', 'uuid', false, 'Nullable for anonymous flows', 'Affected entity identifier'),
          f('occurred_at', 'datetime', true, 'ISO-8601', 'Event timestamp'),
        ],
      ),
    ],
    models: [
      model('foundationQuery', 'Request model for registry lookups.', [
        f('domain_code', 'string', false, 'Optional domain filter', 'Requested domain code'),
        f('include_superseded', 'boolean', false, 'default false', 'Include superseded versions'),
      ]),
      model('foundationSnapshot', 'Response envelope for shared registry reads.', [
        f('module_count', 'integer', true, 'min 0', 'Total modules returned'),
        f('roles_count', 'integer', true, 'min 0', 'Total platform roles returned'),
        f('published_version', 'string', true, 'semantic version', 'Current publication version'),
      ]),
    ],
    operations: [op('View domain registry', 'foundation_read'), op('View role definitions', 'foundation_read'), op('Publish registry revision', 'foundation_manage')],
    endpoints: [
      ep('GET', '/api/v1/platform/domains', 'Return canonical domain and module registry.', { requestModel: 'foundationQuery', responseModel: 'foundationSnapshot' }),
      ep('GET', '/api/v1/platform/roles', 'Return canonical platform roles and descriptions.', { responseModel: 'foundationSnapshot' }),
      ep('GET', '/api/v1/platform/contracts', 'Return the current shared contract manifest.', { responseModel: 'foundationSnapshot' }),
    ],
    events: [
      ev('foundation.registry.read', 'Shared registry requested', 'super_admin / hr_admin / sales_rep / manager', '{ domain_code, include_superseded }'),
      ev('foundation.registry.published', 'Registry version promoted', 'super_admin', '{ module_count, published_version }'),
      ev('foundation.contracts.published', 'Shared contract bundle updated', 'system', '{ contract_count, version }'),
    ],
    rules: [
      rule('Single source of truth', 'When a shared platform definition changes', 'Update the foundation registry before downstream module specs.', 'Constitution P-02'),
      rule('Append-only history', 'When a registry version is replaced', 'Mark the old record as superseded rather than deleting it.', 'Constitution P-03 and P-07'),
    ],
    dependencies: [
      ['contracts', 'Shared', 'Owns the shared contracts directory and keeps downstream references stable'],
      ['all modules', 'Downstream', 'Every module consumes foundation definitions for roles, module ids, or audit envelope fields'],
    ],
    stateMachine: lifecycle(
      'Specification Registry Lifecycle',
      [
        { name: 'draft', description: 'Registry version is being prepared.', terminal: false },
        { name: 'validated', description: 'Registry version passed structural review.', terminal: false },
        { name: 'published', description: 'Registry version is the active canonical definition.', terminal: false },
        { name: 'superseded', description: 'Registry version has been replaced.', terminal: true },
      ],
      [
        { from: 'draft', to: 'validated', trigger: 'validate()', guard: 'All required modules and roles are present', sideEffects: 'Store review evidence' },
        { from: 'validated', to: 'published', trigger: 'publish()', guard: 'Approver signs off', sideEffects: 'Emit foundation.registry.published' },
        { from: 'published', to: 'superseded', trigger: 'supersede()', guard: 'New published version exists', sideEffects: 'Retain immutable history' },
      ],
      ['Only one registry version may remain in published state at a time.', 'Superseded records remain readable for audit and historical traceability.'],
    ),
  },
  {
    id: '001-authentication',
    title: 'Authentication',
    domainKey: 'auth',
    overview:
      'The Authentication module validates credentials, creates portal-scoped sessions, applies account lockout, and handles candidate registration for the Dev8X platform.',
    requirements: [
      req('Validate email and password credentials', 'The system shall authenticate users against stored credentials without leaking whether an email exists.', [
        'Valid credentials create a session for the selected portal.',
        'Invalid email and invalid password return the same error response.',
        'Successful login records IP address, user agent, and portal.',
      ]),
      req('Support candidate self-registration', 'The system shall allow only candidates to register new accounts.', [
        'Registration requires first name, last name, email, and password confirmation.',
        'Duplicate email addresses are rejected.',
        'New candidate accounts remain inactive until verification completes.',
      ]),
      req('Manage portal-scoped sessions', 'The system shall issue sessions whose role and portal claims restrict downstream access.', [
        'Admin sessions require later MFA completion.',
        'Session lifetime follows the selected portal policy.',
        'Logout can revoke the current session or all active sessions for the current user.',
      ]),
      req('Apply lockout policy', 'The system shall lock accounts after repeated failures according to portal policy.', [
        'Admin accounts lock faster than non-admin accounts.',
        'Lockout records the responsible email, portal, and lock duration.',
        'Successful login resets the failed-attempt counter.',
      ]),
    ],
    entities: [
      entity(
        'User',
        'Platform identity record for every authenticated actor.',
        withAudit([
          emailField,
          f('first_name', 'string', true, 'min 1, max 100', 'First name'),
          f('last_name', 'string', true, 'min 1, max 100', 'Last name'),
          f('role', 'string', true, 'platform role id', 'Assigned role'),
          f('status', 'string', true, 'enum: active, inactive, locked', 'Account status', { enum: ['active', 'inactive', 'locked'] }),
          f('failed_login_attempts', 'integer', true, 'min 0', 'Failed login counter'),
        ]),
      ),
      entity(
        'Session',
        'Portal-scoped authenticated session.',
        withAudit([
          f('user_id', 'uuid', true, 'FK -> User.id', 'Owning user'),
          f('portal', 'string', true, 'enum: candidate, client, admin, crm', 'Portal scope', { enum: ['candidate', 'client', 'admin', 'crm'] }),
          f('mfa_verified', 'boolean', true, 'default false', 'Whether MFA is complete'),
          f('expires_at', 'datetime', true, 'Portal-specific TTL', 'Session expiry'),
        ]),
      ),
    ],
    models: [
      model('loginRequest', 'Credential validation request.', [
        emailField,
        f('password', 'string', true, 'min 8', 'Submitted password'),
        f('portal', 'string', true, 'enum: candidate, client, admin, crm', 'Requested portal', { enum: ['candidate', 'client', 'admin', 'crm'] }),
        f('remember_me', 'boolean', false, 'default false', 'Extend non-admin session lifetime'),
      ]),
      model('registerRequest', 'Candidate self-registration request.', [
        f('first_name', 'string', true, 'min 1, max 100', 'First name'),
        f('last_name', 'string', true, 'min 1, max 100', 'Last name'),
        emailField,
        f('password', 'string', true, 'min 8 with complexity', 'Password'),
        f('password_confirmation', 'string', true, 'Must match password', 'Password confirmation'),
      ]),
      model('logoutRequest', 'Logout request payload.', [
        f('all_devices', 'boolean', false, 'default false', 'Revoke all active sessions for the current user'),
      ]),
      model('authSessionResponse', 'Authentication success envelope.', [
        f('token', 'string', true, 'JWT', 'Issued access token'),
        f('portal', 'string', true, 'Requested portal', 'Session portal'),
        f('expires_at', 'datetime', true, 'ISO-8601', 'Session expiry'),
        f('mfa_required', 'boolean', true, 'true for admin pre-MFA state', 'Indicates whether MFA is pending'),
      ]),
      model('authRegistrationResponse', 'Registration success envelope.', [
        f('user_id', 'uuid', true, 'Created user id', 'Created user'),
        f('email', 'string', true, 'Registered email', 'Registered email'),
        f('message', 'string', true, 'Verification sent message', 'Registration result message'),
      ]),
      model('logoutResponse', 'Logout success envelope.', [
        f('message', 'string', true, 'Logout message', 'Logout result'),
        f('sessions_revoked', 'integer', true, 'min 1', 'Number of revoked sessions'),
      ]),
    ],
    operations: [
      op('Login with email and password', 'public_auth'),
      op('Self-register candidate account', 'self_register'),
      op('Logout current session', 'self_service'),
      op('Logout all active sessions', 'self_service'),
      op('Unlock another user account', 'super_admin_only'),
      op('Provision non-candidate account', 'admin_manage'),
    ],
    endpoints: [
      ep('POST', '/api/v1/auth/login', 'Authenticate a user into the selected portal.', { auth: 'None', requestModel: 'loginRequest', responseModel: 'authSessionResponse', rateLimit: '10 requests/minute per IP' }),
      ep('POST', '/api/v1/auth/register', 'Create a new candidate account.', { auth: 'None', requestModel: 'registerRequest', responseModel: 'authRegistrationResponse', rateLimit: '5 requests/minute per IP' }),
      ep('POST', '/api/v1/auth/logout', 'Terminate the current or all active sessions.', { requestModel: 'logoutRequest', responseModel: 'logoutResponse' }),
    ],
    events: [
      ev('auth.session.login', 'Successful credential validation', 'candidate / client / hr_admin / super_admin / sales_rep / manager', '{ portal, ip_address, user_agent }'),
      ev('auth.session.logout', 'Session terminated by actor or timeout', 'candidate / client / hr_admin / super_admin / sales_rep / manager', '{ all_devices, duration_minutes }'),
      ev('auth.session.login_failed', 'Credential validation failed', 'system', '{ email, portal, attempt_count }'),
      ev('auth.account.registered', 'Candidate account created', 'candidate', '{ email, registration_method }'),
      ev('auth.account.locked', 'Lockout threshold reached', 'system', '{ email, portal, locked_until }'),
    ],
    rules: [
      rule('No user enumeration', 'When login fails for unknown email or wrong password', 'Return the same invalid-credentials response.', 'Constitution guardrail and security hardening'),
      rule('Portal-scoped claims', 'When a session is created', 'Bind the session to the selected portal and role claims.', 'Prevents cross-portal access leakage'),
      rule('Admin lockout severity', 'When an admin or super admin exceeds the failure threshold', 'Apply the stricter lockout policy before another login attempt.', 'Administrative accounts carry elevated risk'),
    ],
    dependencies: [
      ['002-portal-routing', 'Downstream', 'Consumes role and portal context after successful authentication'],
      ['003-mfa', 'Conditional', 'Admin sessions remain incomplete until MFA verification succeeds'],
      ['004-password-reset', 'Related', 'Shares credential recovery entities and audit rules'],
      ['005-sso', 'Alternative', 'Alternative identity entry path for eligible portals'],
    ],
    stateMachine: lifecycle(
      'Authentication Session Lifecycle',
      [
        { name: 'unauthenticated', description: 'No active portal session.', terminal: false },
        { name: 'credentials_validated', description: 'Credentials valid and awaiting MFA for admin portal.', terminal: false },
        { name: 'authenticated', description: 'Session active and usable by downstream domains.', terminal: false },
        { name: 'expired', description: 'Session timed out.', terminal: true },
        { name: 'revoked', description: 'Session manually revoked.', terminal: true },
      ],
      [
        { from: 'unauthenticated', to: 'credentials_validated', trigger: 'login()', guard: 'Admin credentials valid', sideEffects: 'Issue partial auth context' },
        { from: 'unauthenticated', to: 'authenticated', trigger: 'login()', guard: 'Non-admin credentials valid', sideEffects: 'Emit auth.session.login' },
        { from: 'credentials_validated', to: 'authenticated', trigger: 'verify_mfa()', guard: 'Valid MFA challenge', sideEffects: 'Mark session mfa_verified=true' },
        { from: 'authenticated', to: 'expired', trigger: 'timeout()', guard: 'Session TTL exceeded', sideEffects: 'Emit auth.session.logout with timeout reason' },
        { from: 'authenticated', to: 'revoked', trigger: 'logout()', guard: 'User or admin revocation requested', sideEffects: 'Invalidate token' },
      ],
      ['Admin portal access never reaches authenticated without MFA.', 'Expired and revoked sessions require a fresh authentication flow.'],
    ),
  },
  {
    id: '002-portal-routing',
    title: 'Portal Routing',
    domainKey: 'auth',
    overview:
      'The Portal Routing module resolves the selected portal, verifies that the user role may enter that portal, and returns the correct destination after authentication.',
    requirements: [
      req('Publish portal metadata', 'The system shall expose the supported portals and their allowed entry routes.', [
        'Candidate, client, admin, and CRM portals are present in the registry.',
        'Each portal includes a default landing destination.',
        'Disabled or unavailable portals are omitted from the selector response.',
      ]),
      req('Resolve post-auth destinations', 'The system shall return the correct landing page for the current role and portal.', [
        'Role-to-portal mismatches are rejected.',
        'Managers route only to managed areas they are permitted to access.',
        'Users can resume the last permitted destination when one exists.',
      ]),
      req('Prevent unauthorized navigation', 'The system shall block direct portal entry when the session portal and route do not match.', [
        'Portal mismatch returns FORBIDDEN.',
        'Blocked navigation writes an audit event.',
        'Resolution logic is deterministic for the same input claims.',
      ]),
    ],
    entities: [
      entity(
        'PortalConfig',
        'Canonical configuration for a navigable portal.',
        withAudit([
          f('portal_key', 'string', true, 'unique', 'Portal identifier'),
          f('default_route', 'string', true, 'URL path', 'Landing route after login'),
          f('allowed_roles', 'array', true, 'platform role ids', 'Roles permitted to enter the portal', { items: { type: 'string' } }),
          f('enabled', 'boolean', true, 'default true', 'Portal availability flag'),
        ]),
      ),
      entity(
        'RouteDecision',
        'Evaluated routing result for a current user context.',
        withAudit([
          f('user_role', 'string', true, 'platform role id', 'Current user role'),
          f('portal_key', 'string', true, 'portal identifier', 'Requested portal'),
          f('resolved_route', 'string', true, 'URL path', 'Chosen destination'),
          f('decision', 'string', true, 'enum: allow, deny, redirect', 'Routing outcome', { enum: ['allow', 'deny', 'redirect'] }),
        ]),
      ),
    ],
    models: [
      model('portalResolveRequest', 'Portal resolution request.', [
        f('portal_key', 'string', true, 'candidate | client | admin | crm', 'Requested portal'),
        f('role', 'string', true, 'platform role id', 'Authenticated role'),
        f('last_route', 'string', false, 'Optional URL path', 'Last successful route'),
      ]),
      model('portalResolveResponse', 'Portal resolution response.', [
        f('resolved_route', 'string', true, 'URL path', 'Chosen route'),
        f('decision', 'string', true, 'allow | deny | redirect', 'Resolution result', { enum: ['allow', 'deny', 'redirect'] }),
        f('portal_label', 'string', true, 'max 100', 'Human-readable portal name'),
      ]),
    ],
    operations: [op('Read portal selector configuration', 'public_auth'), op('Resolve portal destination', 'self_service'), op('Override invalid portal route', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/portals/config', 'Return enabled portals and their default destinations.', { auth: 'None', responseModel: 'portalResolveResponse' }),
      ep('POST', '/api/v1/portals/resolve', 'Resolve the destination route for the authenticated session.', { requestModel: 'portalResolveRequest', responseModel: 'portalResolveResponse' }),
      ep('GET', '/api/v1/portals/last-destination', 'Return the most recent permitted destination for the current session.', { responseModel: 'portalResolveResponse' }),
    ],
    events: [
      ev('auth.portal.selected', 'Portal chosen from selector', 'candidate / client / hr_admin / super_admin / sales_rep / manager', '{ portal_key }'),
      ev('auth.route.resolved', 'Portal route resolved', 'system', '{ portal_key, role, decision, resolved_route }'),
      ev('auth.route.blocked', 'Unauthorized portal route attempted', 'system', '{ portal_key, role, requested_route }'),
    ],
    rules: [
      rule('Role-to-portal match', 'When resolving a route', 'Allow only role and portal combinations approved by the registry.', 'ADR-006'),
      rule('Last-route safety', 'When restoring a last destination', 'Return the stored route only if it remains permitted for the current session.', 'Prevents stale or leaked deep links'),
    ],
    dependencies: [
      ['001-authentication', 'Upstream', 'Consumes authenticated role and portal claims'],
      ['000-foundation', 'Shared', 'Reads canonical portal and role registry definitions'],
    ],
    stateMachine: lifecycle(
      'Portal Resolution Lifecycle',
      [
        { name: 'selected', description: 'Portal was selected by the actor.', terminal: false },
        { name: 'validated', description: 'Portal and role combination was validated.', terminal: false },
        { name: 'resolved', description: 'Destination route returned to the caller.', terminal: true },
        { name: 'blocked', description: 'Route request denied.', terminal: true },
      ],
      [
        { from: 'selected', to: 'validated', trigger: 'validate()', guard: 'Portal exists and role claims present', sideEffects: 'Load portal registry' },
        { from: 'validated', to: 'resolved', trigger: 'resolve()', guard: 'Role allowed for portal', sideEffects: 'Emit auth.route.resolved' },
        { from: 'validated', to: 'blocked', trigger: 'resolve()', guard: 'Role or route mismatch', sideEffects: 'Emit auth.route.blocked' },
      ],
      ['A denied route cannot produce a destination URL.', 'The same portal and claims resolve to the same destination unless configuration changes.'],
    ),
  },
  {
    id: '003-mfa',
    title: 'MFA',
    domainKey: 'auth',
    overview:
      'The MFA module issues and verifies second-factor challenges for privileged login flows, with recovery-code fallback and auditable challenge state changes.',
    requirements: [
      req('Issue MFA challenges for privileged sessions', 'The system shall issue an MFA challenge whenever a privileged portal session reaches the credentials-validated state.', [
        'Admin and super admin sessions require a challenge before activation.',
        'Challenge issuance records a short-lived expiry timestamp.',
        'Repeated challenge requests invalidate previous unverified challenges.',
      ]),
      req('Verify TOTP or recovery code', 'The system shall verify a valid second factor before elevating the session.', [
        'Valid TOTP code activates the pending session.',
        'Recovery code may be used once and is consumed on success.',
        'Three failed attempts invalidate the challenge.',
      ]),
      req('Support step-up verification', 'The system shall support additional verification for high-risk actions.', [
        'Step-up challenge inherits the actor role and target action.',
        'Successful verification is limited to the requested action window.',
        'Expired challenges cannot be reused.',
      ]),
    ],
    entities: [
      entity(
        'MfaChallenge',
        'One-time verification challenge bound to an in-progress session.',
        withAudit([
          f('session_id', 'uuid', true, 'FK -> Session.id', 'Pending session'),
          f('challenge_type', 'string', true, 'enum: totp, recovery_code, step_up', 'Challenge type', {
            enum: ['totp', 'recovery_code', 'step_up'],
          }),
          f('status', 'string', true, 'enum: issued, verified, failed, expired', 'Challenge status', {
            enum: ['issued', 'verified', 'failed', 'expired'],
          }),
          f('expires_at', 'datetime', true, 'short-lived', 'Challenge expiry'),
        ]),
      ),
    ],
    models: [
      model('mfaChallengeRequest', 'MFA challenge creation request.', [
        f('session_id', 'uuid', true, 'Pending session id', 'Pending session identifier'),
        f('challenge_type', 'string', false, 'totp | recovery_code | step_up', 'Requested challenge type', {
          enum: ['totp', 'recovery_code', 'step_up'],
        }),
      ]),
      model('mfaVerifyRequest', 'Second-factor verification request.', [
        f('challenge_id', 'uuid', true, 'Existing issued challenge id', 'Challenge identifier'),
        f('code', 'string', true, '6 digits or recovery token', 'Submitted second factor', { pattern: '^[A-Za-z0-9-]{6,16}$' }),
      ]),
      model('mfaVerifyResponse', 'MFA verification response.', [
        f('challenge_id', 'uuid', true, 'Existing challenge id', 'Challenge identifier'),
        f('status', 'string', true, 'verified | failed | expired', 'Challenge outcome', { enum: ['verified', 'failed', 'expired'] }),
        f('session_activated', 'boolean', true, 'true when auth session is promoted', 'Whether the session became active'),
      ]),
    ],
    operations: [op('Issue MFA challenge', 'admin_manage'), op('Verify own MFA challenge', 'self_service'), op('Reset another user MFA challenge', 'super_admin_only')],
    endpoints: [
      ep('POST', '/api/v1/auth/mfa/challenge', 'Issue or rotate an MFA challenge for a pending session.', { requestModel: 'mfaChallengeRequest', responseModel: 'mfaVerifyResponse' }),
      ep('POST', '/api/v1/auth/mfa/verify', 'Verify the submitted MFA code.', { requestModel: 'mfaVerifyRequest', responseModel: 'mfaVerifyResponse' }),
      ep('POST', '/api/v1/auth/mfa/recovery', 'Verify a recovery code for a pending session.', { requestModel: 'mfaVerifyRequest', responseModel: 'mfaVerifyResponse' }),
    ],
    events: [
      ev('auth.mfa.challenge_issued', 'Challenge issued or rotated', 'system', '{ challenge_id, challenge_type, expires_at }'),
      ev('auth.mfa.verified', 'Challenge verified successfully', 'hr_admin / super_admin', '{ challenge_id, verification_method }'),
      ev('auth.mfa.failed', 'Challenge verification failed', 'system', '{ challenge_id, attempt_count }'),
      ev('auth.mfa.expired', 'Issued challenge expired', 'system', '{ challenge_id }'),
    ],
    rules: [
      rule('Single active challenge', 'When a new challenge is issued for the same session', 'Expire any older unverified challenge.', 'Avoid parallel challenge reuse'),
      rule('Recovery code consumption', 'When a recovery code succeeds', 'Mark the code as consumed immediately.', 'Prevents replay'),
    ],
    dependencies: [
      ['001-authentication', 'Upstream', 'Consumes pending sessions created by privileged authentication'],
      ['108-admin-settings', 'Related', 'Administrative policies determine MFA enrollment and recovery rules'],
    ],
    stateMachine: lifecycle(
      'MFA Challenge Lifecycle',
      [
        { name: 'issued', description: 'Challenge is active and waiting for verification.', terminal: false },
        { name: 'verified', description: 'Challenge succeeded and may activate the session.', terminal: true },
        { name: 'failed', description: 'Challenge exceeded retry limits.', terminal: true },
        { name: 'expired', description: 'Challenge timed out.', terminal: true },
      ],
      [
        { from: 'issued', to: 'verified', trigger: 'verify()', guard: 'Submitted code is valid and unexpired', sideEffects: 'Emit auth.mfa.verified' },
        { from: 'issued', to: 'failed', trigger: 'verify()', guard: 'Retry limit reached', sideEffects: 'Emit auth.mfa.failed' },
        { from: 'issued', to: 'expired', trigger: 'expire()', guard: 'Expiry timestamp reached', sideEffects: 'Emit auth.mfa.expired' },
      ],
      ['Verified and failed challenges are terminal.', 'Expired challenges cannot be promoted back to issued.'],
    ),
  },
  {
    id: '004-password-reset',
    title: 'Password Reset',
    domainKey: 'auth',
    overview:
      'The Password Reset module supports token-based credential recovery without exposing whether a user exists or allowing stale reset tokens to be reused.',
    requirements: [
      req('Issue reset requests safely', 'The system shall accept password reset requests without revealing whether the email exists.', [
        'Known and unknown emails receive the same response envelope.',
        'Each reset token has a short expiry window.',
        'Issuing a new reset token invalidates previous unused tokens.',
      ]),
      req('Verify reset tokens', 'The system shall validate token integrity and expiry before allowing a password change.', [
        'Expired tokens are rejected.',
        'Consumed tokens cannot be reused.',
        'Token verification returns only whether the token is currently valid.',
      ]),
      req('Complete password reset', 'The system shall update the password only after a valid token is presented.', [
        'New passwords must meet complexity rules.',
        'Password reset writes a security audit event.',
        'Existing sessions are revoked after password reset completes.',
      ]),
    ],
    entities: [
      entity(
        'PasswordResetToken',
        'Token issued for a single password reset attempt.',
        withAudit([
          f('user_id', 'uuid', false, 'Nullable when email is unknown', 'Associated user'),
          f('status', 'string', true, 'enum: issued, verified, consumed, expired', 'Reset token status', {
            enum: ['issued', 'verified', 'consumed', 'expired'],
          }),
          f('expires_at', 'datetime', true, 'max 24h', 'Token expiry'),
        ]),
      ),
    ],
    models: [
      model('passwordResetRequest', 'Reset request payload.', [emailField]),
      model('passwordTokenCheck', 'Reset token verification payload.', [
        f('token', 'string', true, 'opaque token', 'Reset token'),
      ]),
      model('passwordResetCompletion', 'Password reset completion payload.', [
        f('token', 'string', true, 'opaque token', 'Reset token'),
        f('password', 'string', true, 'min 8 with complexity', 'New password'),
        f('password_confirmation', 'string', true, 'Must match password', 'Confirmation'),
      ]),
      model('passwordResetResponse', 'Reset flow status response.', [
        f('accepted', 'boolean', true, 'Always true for request step', 'Request accepted'),
        f('token_valid', 'boolean', false, 'Present on verification', 'Whether token is valid'),
        f('sessions_revoked', 'integer', false, 'Present on completion', 'Number of revoked sessions'),
      ]),
    ],
    operations: [op('Request password reset', 'public_auth'), op('Complete own password reset', 'self_service'), op('Invalidate another user reset token', 'super_admin_only')],
    endpoints: [
      ep('POST', '/api/v1/auth/password/request', 'Request a reset token for the supplied email.', { auth: 'None', requestModel: 'passwordResetRequest', responseModel: 'passwordResetResponse', rateLimit: '5 requests/minute per IP' }),
      ep('POST', '/api/v1/auth/password/verify-token', 'Verify that a reset token is valid and unexpired.', { auth: 'None', requestModel: 'passwordTokenCheck', responseModel: 'passwordResetResponse' }),
      ep('POST', '/api/v1/auth/password/reset', 'Complete the password reset flow.', { auth: 'None', requestModel: 'passwordResetCompletion', responseModel: 'passwordResetResponse' }),
    ],
    events: [
      ev('auth.password.reset_requested', 'Password reset request accepted', 'system', '{ email, token_expires_at }'),
      ev('auth.password.token_verified', 'Reset token verified', 'system', '{ token_id }'),
      ev('auth.password.reset_completed', 'Password successfully reset', 'candidate / client / hr_admin / super_admin / sales_rep / manager', '{ sessions_revoked }'),
    ],
    rules: [
      rule('Indistinguishable request response', 'When a reset request is submitted', 'Return the same accepted response for unknown and known emails.', 'Prevents enumeration'),
      rule('Token invalidation on completion', 'When a password reset succeeds', 'Consume the token and revoke all active sessions.', 'Restores account integrity'),
    ],
    dependencies: [
      ['001-authentication', 'Shared', 'Uses user identities and session revocation rules'],
      ['003-mfa', 'Related', 'High-risk resets may require additional verification policies'],
    ],
    stateMachine: lifecycle(
      'Password Reset Token Lifecycle',
      [
        { name: 'issued', description: 'Reset token created and awaiting verification.', terminal: false },
        { name: 'verified', description: 'Token validated and may complete reset.', terminal: false },
        { name: 'consumed', description: 'Token used successfully.', terminal: true },
        { name: 'expired', description: 'Token timed out.', terminal: true },
      ],
      [
        { from: 'issued', to: 'verified', trigger: 'verify_token()', guard: 'Token is valid and unexpired', sideEffects: 'Emit auth.password.token_verified' },
        { from: 'verified', to: 'consumed', trigger: 'reset_password()', guard: 'Password meets policy', sideEffects: 'Emit auth.password.reset_completed and revoke sessions' },
        { from: 'issued', to: 'expired', trigger: 'expire()', guard: 'Expiry timestamp reached', sideEffects: 'Close reset window' },
      ],
      ['Consumed tokens cannot return to any earlier state.', 'Only verified tokens may complete password reset.'],
    ),
  },
  {
    id: '005-sso',
    title: 'SSO',
    domainKey: 'auth',
    overview:
      'The SSO module provides Google sign-in for candidate and client portals, plus controlled account-linking rules for existing credentials.',
    requirements: [
      req('Start Google sign-in for supported portals', 'The system shall initiate Google authentication only for candidate and client portal entry.', [
        'Admin and CRM privileged roles cannot use Google SSO to access admin-only flows.',
        'The provider handshake preserves the selected target portal.',
        'Provider state is signed and expires quickly.',
      ]),
      req('Complete SSO callback safely', 'The system shall validate the provider callback before issuing a platform session.', [
        'Invalid provider state is rejected.',
        'New identities are linked or provisioned only for allowed roles.',
        'Successful completion emits an audit event with provider context.',
      ]),
      req('Support account linking', 'The system shall allow an existing eligible account to link a provider identity.', [
        'Only candidate and client accounts may link Google identity.',
        'A provider identity can be bound to only one platform account.',
        'Linked identity can later be disabled without deleting the local account.',
      ]),
    ],
    entities: [
      entity(
        'SsoIdentity',
        'Linked third-party identity for an eligible platform account.',
        withAudit([
          f('user_id', 'uuid', true, 'FK -> User.id', 'Linked platform user'),
          f('provider', 'string', true, 'enum: google', 'Identity provider', { enum: ['google'] }),
          f('provider_subject', 'string', true, 'Unique provider subject', 'Provider user id'),
          f('status', 'string', true, 'enum: pending, linked, disabled', 'Link state', { enum: ['pending', 'linked', 'disabled'] }),
        ]),
      ),
    ],
    models: [
      model('ssoInitRequest', 'SSO init request.', [
        f('portal', 'string', true, 'candidate | client', 'Target portal', { enum: ['candidate', 'client'] }),
        f('return_to', 'string', false, 'Optional route override', 'Preferred return route'),
      ]),
      model('ssoCallbackRequest', 'SSO callback payload.', [
        f('state', 'string', true, 'signed opaque token', 'Provider state value'),
        f('authorization_code', 'string', true, 'provider authorization code', 'Provider code'),
      ]),
      model('ssoSessionResponse', 'SSO completion response.', [
        f('token', 'string', true, 'JWT', 'Issued session token'),
        f('provider', 'string', true, 'google', 'Identity provider', { enum: ['google'] }),
        f('linked_account', 'boolean', true, 'Whether identity was linked to an existing account', 'Link result'),
      ]),
    ],
    operations: [op('Start Google SSO', 'candidate_client'), op('Complete own SSO callback', 'candidate_client'), op('Disable linked provider identity', 'self_service')],
    endpoints: [
      ep('GET', '/api/v1/auth/sso/google/init', 'Create a signed Google SSO handshake.', { auth: 'None', requestModel: 'ssoInitRequest', responseModel: 'ssoSessionResponse' }),
      ep('POST', '/api/v1/auth/sso/google/callback', 'Validate the Google callback and issue a platform session.', { auth: 'None', requestModel: 'ssoCallbackRequest', responseModel: 'ssoSessionResponse' }),
      ep('POST', '/api/v1/auth/sso/google/link', 'Link a Google identity to an existing eligible account.', { requestModel: 'ssoCallbackRequest', responseModel: 'ssoSessionResponse' }),
    ],
    events: [
      ev('auth.sso.started', 'SSO handshake initialized', 'candidate / client', '{ provider, portal }'),
      ev('auth.sso.completed', 'SSO callback verified and session created', 'candidate / client', '{ provider, linked_account }'),
      ev('auth.sso.linked', 'Existing account linked to provider identity', 'candidate / client', '{ provider }'),
    ],
    rules: [
      rule('Portal eligibility', 'When SSO starts', 'Allow only candidate and client portals.', 'Admin and CRM privileged access require stricter credential controls'),
      rule('Unique provider binding', 'When linking a provider identity', 'Reject the link if the provider subject is already attached to another platform account.', 'Prevents identity collision'),
    ],
    dependencies: [
      ['001-authentication', 'Upstream', 'Issues the resulting session after provider validation'],
      ['002-portal-routing', 'Downstream', 'Uses selected portal information during callback completion'],
    ],
    stateMachine: lifecycle(
      'SSO Handshake Lifecycle',
      [
        { name: 'initiated', description: 'Provider handshake has been created.', terminal: false },
        { name: 'validated', description: 'Provider callback passed integrity checks.', terminal: false },
        { name: 'linked', description: 'Identity is linked and session may be created.', terminal: true },
        { name: 'failed', description: 'Provider callback failed validation.', terminal: true },
      ],
      [
        { from: 'initiated', to: 'validated', trigger: 'validate_callback()', guard: 'State and provider code are valid', sideEffects: 'Load provider subject' },
        { from: 'validated', to: 'linked', trigger: 'link_or_create()', guard: 'Portal and role are eligible', sideEffects: 'Emit auth.sso.completed' },
        { from: 'initiated', to: 'failed', trigger: 'validate_callback()', guard: 'State invalid or expired', sideEffects: 'Emit failure telemetry' },
      ],
      ['Only validated handshakes may create sessions.', 'A linked provider identity remains unique across all accounts.'],
    ),
  },
  {
    id: '100-admin-dashboard',
    title: 'Admin Dashboard',
    domainKey: 'admin',
    overview:
      'The Admin Dashboard aggregates recruiting KPIs, funnel conversion counts, and exception queues so HR administrators can prioritize day-to-day hiring work from a single entry point.',
    requirements: [
      req('Aggregate recruiting KPIs', 'The system shall calculate and display top-level recruiting metrics.', [
        'Counts include total applicants, active jobs, interviews this week, and average time to hire.',
        'Metrics may be filtered by date range.',
        'Each metric publishes the snapshot timestamp used for calculation.',
      ]),
      req('Display funnel performance', 'The system shall show the recruiting funnel from applied through joined.', [
        'Each stage shows the current count and conversion rate from the previous stage.',
        'Joined and rejected records are excluded from active-stage counts.',
        'Users can drill into the underlying queue for a selected stage.',
      ]),
      req('Surface priority queues', 'The system shall present stale, urgent, or blocked recruiting work items.', [
        'Urgent applicant cards and overdue interview scheduling requests appear in the priority queue.',
        'Items are ordered by urgency and age.',
        'Queue selection routes to the owning downstream module.',
      ]),
    ],
    entities: [
      entity(
        'AdminDashboardSnapshot',
        'Aggregated recruiting summary for the current filter scope.',
        withAudit([
          f('applicant_count', 'integer', true, 'min 0', 'Total applicants'),
          f('active_job_count', 'integer', true, 'min 0', 'Open jobs'),
          f('interviews_this_week', 'integer', true, 'min 0', 'Upcoming interviews this week'),
          f('average_time_to_hire_days', 'number', true, 'min 0', 'Average days to join'),
        ]),
      ),
      entity(
        'FunnelMetric',
        'Recruiting funnel stage aggregate.',
        [
          f('stage', 'string', true, 'Recruiting stage', 'Stage name'),
          f('count', 'integer', true, 'min 0', 'Records in stage'),
          f('conversion_rate', 'number', true, '0-100', 'Conversion from prior stage'),
        ],
      ),
    ],
    models: [
      model('adminDashboardQuery', 'Dashboard filter request.', [dateFromField, dateToField, f('department', 'string', false, 'Optional department id', 'Department filter')]),
      model('adminDashboardResponse', 'Dashboard KPI response.', [
        f('snapshot_id', 'uuid', true, 'Dashboard snapshot id', 'Snapshot identifier'),
        f('applicant_count', 'integer', true, 'min 0', 'Total applicants'),
        f('priority_item_count', 'integer', true, 'min 0', 'Priority queue size'),
        f('generated_at', 'datetime', true, 'ISO-8601', 'Snapshot timestamp'),
      ]),
    ],
    operations: [op('View recruiting KPI summary', 'admin_read'), op('View funnel drilldown', 'admin_read'), op('Export dashboard snapshot', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/dashboard/summary', 'Return recruiting KPI summary.', { requestModel: 'adminDashboardQuery', responseModel: 'adminDashboardResponse' }),
      ep('GET', '/api/v1/admin/dashboard/funnel', 'Return recruiting funnel counts and conversion rates.', { requestModel: 'adminDashboardQuery', responseModel: 'adminDashboardResponse' }),
      ep('GET', '/api/v1/admin/dashboard/priority-queue', 'Return urgent recruiting work items.', { requestModel: 'adminDashboardQuery', responseModel: 'adminDashboardResponse' }),
    ],
    events: [
      ev('admin.dashboard.viewed', 'Dashboard summary requested', 'hr_admin / super_admin / manager', '{ department, date_from, date_to }'),
      ev('admin.dashboard.drilldown_opened', 'User opens a funnel or queue drilldown', 'hr_admin / super_admin / manager', '{ target_stage }'),
    ],
    rules: [
      rule('Snapshot freshness', 'When metrics are shown', 'Expose the timestamp used for the calculation.', 'Prevents stale operational decisions'),
      rule('Manager read-only oversight', 'When the actor role is manager', 'Allow drilldown visibility but block any mutation paths from the dashboard.', 'Constitution P-05'),
    ],
    dependencies: [
      ['101-admin-applicants', 'Upstream', 'Provides applicant counts and queue details'],
      ['102-admin-pipeline', 'Upstream', 'Provides funnel stage counts and stale-stage indicators'],
      ['104-admin-interviews', 'Upstream', 'Provides upcoming interview metrics'],
    ],
    stateMachine: lifecycle(
      'Recruiting Snapshot Lifecycle',
      [
        { name: 'requested', description: 'Dashboard summary requested.', terminal: false },
        { name: 'aggregated', description: 'Counts and metrics calculated.', terminal: false },
        { name: 'published', description: 'Snapshot delivered to the actor.', terminal: true },
        { name: 'stale', description: 'Snapshot exceeded freshness window.', terminal: true },
      ],
      [
        { from: 'requested', to: 'aggregated', trigger: 'aggregate()', guard: 'Source modules respond successfully', sideEffects: 'Compose cross-module metrics' },
        { from: 'aggregated', to: 'published', trigger: 'publish()', guard: 'Metrics pass validation', sideEffects: 'Emit admin.dashboard.viewed' },
        { from: 'published', to: 'stale', trigger: 'age_out()', guard: 'Freshness window exceeded', sideEffects: 'Require regeneration on next request' },
      ],
      ['Published snapshots are immutable for audit purposes.', 'Stale snapshots cannot be reused as current operational truth.'],
    ),
  },
  {
    id: '101-admin-applicants',
    title: 'Admin Applicants',
    domainKey: 'admin',
    overview:
      'The Admin Applicants module owns the applicant roster, filtering, detail views, and approved status changes across the recruiting lifecycle.',
    requirements: [
      req('List and filter applicants', 'The system shall provide filterable and pageable access to the applicant roster.', [
        'Filters support status, position, department, source, and applied date.',
        'Pagination is stable and sortable by key recruiting columns.',
        'Result counts reflect the active filter set.',
      ]),
      req('Show applicant detail', 'The system shall provide a full applicant detail view with recruiting context.', [
        'Detail view includes profile, current status, timeline, evaluation summary, and documents.',
        'Missing sections are shown as empty states rather than causing an error.',
        'Detail view is accessible from dashboard and pipeline drilldowns.',
      ]),
      req('Apply approved status changes', 'The system shall allow HR admins to update applicant status along the approved lifecycle.', [
        'Status changes must respect the approved applicant lifecycle.',
        'Rejected and future hire require a reason.',
        'Every status change emits an audit event.',
      ]),
    ],
    entities: [
      entity(
        'Applicant',
        'Candidate application record in the recruiting system.',
        withAudit([
          f('candidate_id', 'uuid', true, 'FK -> Candidate profile', 'Linked candidate'),
          f('position_title', 'string', true, 'max 150', 'Applied position'),
          f(
            'status',
            'string',
            true,
            'applied, shortlisted, interview, selected, joined, rejected, future_hire',
            'Current applicant stage',
            { enum: ['applied', 'shortlisted', 'interview', 'selected', 'joined', 'rejected', 'future_hire'] },
          ),
          f('source', 'string', true, 'max 100', 'Applicant source'),
          f('department', 'string', true, 'max 100', 'Hiring department'),
        ]),
      ),
    ],
    models: [
      model('applicantFilter', 'Applicant list filter.', [
        ...paginationFields,
        f('status', 'string', false, 'Applicant stage', 'Status filter', {
          enum: ['applied', 'shortlisted', 'interview', 'selected', 'joined', 'rejected', 'future_hire'],
        }),
        f('position_title', 'string', false, 'Optional exact or partial match', 'Position filter'),
        f('department', 'string', false, 'Optional department id', 'Department filter'),
        dateFromField,
        dateToField,
      ]),
      model('applicantStatusUpdate', 'Applicant status update command.', [
        f('status', 'string', true, 'Approved applicant lifecycle value', 'New status', {
          enum: ['shortlisted', 'interview', 'selected', 'joined', 'rejected', 'future_hire'],
        }),
        f('reason', 'string', false, 'Required for rejected and future_hire', 'Status reason'),
      ]),
      model('applicantSummary', 'Applicant response summary.', [
        f('applicant_id', 'uuid', true, 'Applicant id', 'Applicant identifier'),
        f('status', 'string', true, 'Current stage', 'Applicant status'),
        f('evaluation_score', 'number', false, '0-5', 'Current evaluation score'),
      ]),
    ],
    operations: [op('View applicant roster', 'admin_read'), op('View applicant detail', 'admin_read'), op('Update applicant status', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/applicants', 'Return the applicant roster for the current filters.', { requestModel: 'applicantFilter', responseModel: 'applicantSummary' }),
      ep('GET', '/api/v1/admin/applicants/{id}', 'Return the detailed applicant record.', { responseModel: 'applicantSummary' }),
      ep('PATCH', '/api/v1/admin/applicants/{id}/status', 'Update applicant status along the approved lifecycle.', { requestModel: 'applicantStatusUpdate', responseModel: 'applicantSummary' }),
    ],
    events: [
      ev('admin.applicant.viewed', 'Applicant detail opened', 'hr_admin / super_admin / manager', '{ applicant_id }'),
      ev('admin.applicant.status_changed', 'Applicant status updated', 'hr_admin / super_admin', '{ applicant_id, from_status, to_status }'),
      ev('admin.applicant.exported', 'Filtered applicant list exported', 'hr_admin / super_admin', '{ filter_signature }'),
    ],
    rules: [
      rule('No lifecycle skip', 'When changing applicant status', 'Reject transitions that skip required intermediate stages.', 'Constitution G-05'),
      rule('Terminal join and reject semantics', 'When an applicant reaches joined, rejected, or future_hire', 'Treat the current workflow as complete and prevent return to earlier active stages.', 'Preserves recruiting history'),
    ],
    dependencies: [
      ['102-admin-pipeline', 'Related', 'Shares approved applicant stage definitions'],
      ['105-admin-evaluations', 'Related', 'Displays latest evaluation summary in applicant detail'],
      ['106-admin-documents', 'Related', 'Displays required and submitted documents'],
    ],
    stateMachine: lifecycle(
      'Applicant Lifecycle',
      [
        { name: 'applied', description: 'Application submitted.', terminal: false },
        { name: 'shortlisted', description: 'Applicant advanced to shortlist.', terminal: false },
        { name: 'interview', description: 'Interview process active.', terminal: false },
        { name: 'selected', description: 'Offer or selection decision reached.', terminal: false },
        { name: 'joined', description: 'Applicant joined successfully.', terminal: true },
        { name: 'rejected', description: 'Applicant rejected from current process.', terminal: true },
        { name: 'future_hire', description: 'Applicant held for a future opportunity.', terminal: true },
      ],
      [
        { from: 'applied', to: 'shortlisted', trigger: 'shortlist()', guard: 'Initial screening passed', sideEffects: 'Emit admin.applicant.status_changed' },
        { from: 'shortlisted', to: 'interview', trigger: 'schedule_interview()', guard: 'Interview capacity exists', sideEffects: 'Notify interview module' },
        { from: 'interview', to: 'selected', trigger: 'select()', guard: 'Evaluation threshold met', sideEffects: 'Prepare offer readiness' },
        { from: 'selected', to: 'joined', trigger: 'confirm_joining()', guard: 'Offer accepted and onboarding approved', sideEffects: 'Close recruiting workflow' },
        { from: 'applied', to: 'rejected', trigger: 'reject()', guard: 'Reason supplied', sideEffects: 'Record rejection reason' },
        { from: 'shortlisted', to: 'future_hire', trigger: 'hold_for_future()', guard: 'Reason supplied', sideEffects: 'Tag for future pipeline' },
      ],
      ['Joined, rejected, and future_hire are terminal states.', 'Applicant records retain a full timeline of all approved state changes.'],
    ),
  },
  {
    id: '102-admin-pipeline',
    title: 'Admin Pipeline',
    domainKey: 'admin',
    overview:
      'The Admin Pipeline module manages the recruiting kanban board, stage transitions, age-in-stage signals, and the conversion logic behind the hiring funnel.',
    requirements: [
      req('Render stage-based board', 'The system shall group active applicants into the approved recruiting stages.', [
        'Board stages follow the approved order from applied through joined.',
        'Each card shows candidate, role, age in stage, and urgency indicators.',
        'Stage counts update after every valid transition.',
      ]),
      req('Support stage changes', 'The system shall allow HR admins to move applicants between valid stages.', [
        'Only valid stage moves are accepted.',
        'Invalid moves return a validation error and do not mutate the card.',
        'Stage changes update both the board and the applicant record.',
      ]),
      req('Flag stale work', 'The system shall identify cards that exceed stage-age thresholds.', [
        'Stale cards are highlighted consistently.',
        'Thresholds may vary by stage.',
        'Stale flagging writes an audit event for monitoring.',
      ]),
    ],
    entities: [
      entity(
        'PipelineCard',
        'Recruiting pipeline card attached to an applicant.',
        withAudit([
          f('applicant_id', 'uuid', true, 'FK -> Applicant.id', 'Applicant identifier'),
          f('stage', 'string', true, 'Recruiting stage', 'Board stage', {
            enum: ['applied', 'shortlisted', 'interview', 'selected', 'joined'],
          }),
          f('age_in_stage_days', 'integer', true, 'min 0', 'Days in current stage'),
          f('urgent', 'boolean', true, 'default false', 'Urgency indicator'),
        ]),
      ),
    ],
    models: [
      model('pipelineBoardQuery', 'Pipeline board filter.', [
        f('department', 'string', false, 'Optional department id', 'Department filter'),
        f('urgent_only', 'boolean', false, 'default false', 'Only urgent cards'),
      ]),
      model('pipelineMoveRequest', 'Pipeline move command.', [
        f('to_stage', 'string', true, 'Approved recruiting stage', 'Destination stage', {
          enum: ['applied', 'shortlisted', 'interview', 'selected', 'joined'],
        }),
        f('reason', 'string', false, 'max 500', 'Optional move rationale'),
      ]),
      model('pipelineBoardResponse', 'Pipeline board summary.', [
        f('stage', 'string', true, 'Current board lane', 'Lane name'),
        f('card_count', 'integer', true, 'min 0', 'Cards in lane'),
        f('stale_count', 'integer', true, 'min 0', 'Cards over SLA'),
      ]),
    ],
    operations: [op('View recruiting board', 'admin_read'), op('Move applicant card', 'admin_manage'), op('Acknowledge stale-card alert', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/pipeline', 'Return the recruiting pipeline board.', { requestModel: 'pipelineBoardQuery', responseModel: 'pipelineBoardResponse' }),
      ep('PATCH', '/api/v1/admin/pipeline/cards/{applicant_id}/stage', 'Move an applicant to a new pipeline stage.', { requestModel: 'pipelineMoveRequest', responseModel: 'pipelineBoardResponse' }),
      ep('GET', '/api/v1/admin/pipeline/metrics', 'Return aggregate board and funnel metrics.', { requestModel: 'pipelineBoardQuery', responseModel: 'pipelineBoardResponse' }),
    ],
    events: [
      ev('admin.pipeline.stage_changed', 'Applicant card moved to a new stage', 'hr_admin / super_admin', '{ applicant_id, from_stage, to_stage }'),
      ev('admin.pipeline.stale_flagged', 'Card exceeds stage-age threshold', 'system', '{ applicant_id, stage, age_in_stage_days }'),
      ev('admin.pipeline.metrics_viewed', 'Board metrics requested', 'hr_admin / super_admin / manager', '{ department }'),
    ],
    rules: [
      rule('Approved lane order', 'When a card moves', 'Apply only stage transitions present in the approved pipeline lifecycle.', 'ADR-007'),
      rule('Board and record consistency', 'When a card moves successfully', 'Persist the same resulting stage to the applicant record.', 'Avoids divergent truth between roster and board'),
    ],
    dependencies: [
      ['101-admin-applicants', 'Shared', 'Shares applicant identity and lifecycle state'],
      ['100-admin-dashboard', 'Downstream', 'Publishes aggregate counts back to the dashboard'],
    ],
    stateMachine: lifecycle(
      'Recruiting Pipeline Lifecycle',
      [
        { name: 'applied', description: 'Application submitted and waiting for review.', terminal: false },
        { name: 'shortlisted', description: 'Passed initial review.', terminal: false },
        { name: 'interview', description: 'Interview activity is underway.', terminal: false },
        { name: 'selected', description: 'Candidate selected pending join.', terminal: false },
        { name: 'joined', description: 'Candidate joined the organization.', terminal: true },
      ],
      [
        { from: 'applied', to: 'shortlisted', trigger: 'move_card()', guard: 'Screening review complete', sideEffects: 'Emit admin.pipeline.stage_changed' },
        { from: 'shortlisted', to: 'interview', trigger: 'move_card()', guard: 'Interview slot exists', sideEffects: 'Notify interview scheduling' },
        { from: 'interview', to: 'selected', trigger: 'move_card()', guard: 'Evaluation complete', sideEffects: 'Mark selection readiness' },
        { from: 'selected', to: 'joined', trigger: 'move_card()', guard: 'Joining confirmed', sideEffects: 'Close active pipeline card' },
      ],
      ['Cards may move only one approved recruiting stage at a time.', 'Joined is terminal for the active pipeline board.'],
    ),
  },
  {
    id: '103-admin-jobs',
    title: 'Admin Jobs',
    domainKey: 'admin',
    overview:
      'The Admin Jobs module manages job posting records, their lifecycle from draft to closed, and the aggregate applicant counts associated with each opening.',
    requirements: [
      req('Create and maintain job records', 'The system shall allow HR admins to create and edit job posting details.', [
        'Each job stores title, department, employment type, and posting status.',
        'Draft jobs are editable before publication.',
        'Applicant counts remain linked to the active job record.',
      ]),
      req('Publish and pause jobs', 'The system shall support the approved job lifecycle.', [
        'Draft jobs can be published to live.',
        'Live jobs may be paused and later resumed.',
        'Closed jobs remain immutable and cannot be reopened.',
      ]),
      req('Expose job summaries', 'The system shall return a filtered list of jobs for administrative review.', [
        'Result list supports status and department filtering.',
        'Each row includes applicant count and last updated time.',
        'Job detail links route to the full record.',
      ]),
    ],
    entities: [
      entity(
        'JobPosting',
        'Recruiting job opening tracked by the admin portal.',
        withAudit([
          f('title', 'string', true, 'max 150', 'Job title'),
          f('department', 'string', true, 'max 100', 'Owning department'),
          f('status', 'string', true, 'draft, live, paused, closed', 'Posting status', { enum: ['draft', 'live', 'paused', 'closed'] }),
          f('applicant_count', 'integer', true, 'min 0', 'Number of linked applicants'),
          f('employment_type', 'string', true, 'max 50', 'Employment type'),
        ]),
      ),
    ],
    models: [
      model('jobRecord', 'Job create or update payload.', [
        f('title', 'string', true, 'max 150', 'Job title'),
        f('department', 'string', true, 'max 100', 'Owning department'),
        f('employment_type', 'string', true, 'max 50', 'Employment type'),
        f('status', 'string', true, 'draft | live | paused | closed', 'Job status', { enum: ['draft', 'live', 'paused', 'closed'] }),
      ]),
      model('jobStatusUpdate', 'Job lifecycle transition command.', [
        f('status', 'string', true, 'live | paused | closed', 'Requested status', { enum: ['live', 'paused', 'closed'] }),
        f('reason', 'string', false, 'max 500', 'Lifecycle transition reason'),
      ]),
      model('jobSummary', 'Job summary response.', [
        f('job_id', 'uuid', true, 'Job id', 'Job identifier'),
        f('status', 'string', true, 'Job lifecycle state', 'Current status'),
        f('applicant_count', 'integer', true, 'min 0', 'Linked applicants'),
      ]),
    ],
    operations: [op('View job roster', 'admin_read'), op('Create or edit job', 'admin_manage'), op('Change job lifecycle state', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/jobs', 'Return the filtered job roster.', { requestModel: 'adminDashboardQuery', responseModel: 'jobSummary' }),
      ep('POST', '/api/v1/admin/jobs', 'Create a new job posting.', { requestModel: 'jobRecord', responseModel: 'jobSummary' }),
      ep('PATCH', '/api/v1/admin/jobs/{id}/status', 'Update the job posting lifecycle state.', { requestModel: 'jobStatusUpdate', responseModel: 'jobSummary' }),
      ep('GET', '/api/v1/admin/jobs/{id}', 'Return the detailed job posting.', { responseModel: 'jobSummary' }),
    ],
    events: [
      ev('admin.job.created', 'Job record created', 'hr_admin / super_admin', '{ job_id, department }'),
      ev('admin.job.status_changed', 'Job status updated', 'hr_admin / super_admin', '{ job_id, from_status, to_status }'),
      ev('admin.job.closed', 'Job closed permanently', 'hr_admin / super_admin', '{ job_id }'),
    ],
    rules: [
      rule('Closed is terminal', 'When a job reaches closed', 'Block any later transition back to live or paused.', 'Constitution G-06'),
      rule('Draft isolation', 'When a job remains in draft', 'Exclude it from public candidate discovery surfaces.', 'Preserves unpublished work'),
    ],
    dependencies: [
      ['101-admin-applicants', 'Related', 'Applicant counts attach to the active job record'],
      ['100-admin-dashboard', 'Downstream', 'Dashboard uses live job counts'],
    ],
    stateMachine: lifecycle(
      'Job Posting Lifecycle',
      [
        { name: 'draft', description: 'Job is being prepared and is not yet active.', terminal: false },
        { name: 'live', description: 'Job accepts applicants.', terminal: false },
        { name: 'paused', description: 'Job is temporarily inactive.', terminal: false },
        { name: 'closed', description: 'Job is complete and terminal.', terminal: true },
      ],
      [
        { from: 'draft', to: 'live', trigger: 'publish()', guard: 'Required job fields complete', sideEffects: 'Emit admin.job.status_changed' },
        { from: 'live', to: 'paused', trigger: 'pause()', guard: 'Hiring temporarily paused', sideEffects: 'Retain existing applicants' },
        { from: 'paused', to: 'live', trigger: 'resume()', guard: 'Hiring resumed', sideEffects: 'Restore active visibility' },
        { from: 'live', to: 'closed', trigger: 'close()', guard: 'Hiring complete', sideEffects: 'Emit admin.job.closed' },
        { from: 'paused', to: 'closed', trigger: 'close()', guard: 'Hiring complete', sideEffects: 'Emit admin.job.closed' },
      ],
      ['Closed jobs are terminal and cannot be reopened.', 'Only live jobs may accept new applicants.'],
    ),
  },
  {
    id: '104-admin-interviews',
    title: 'Admin Interviews',
    domainKey: 'admin',
    overview:
      'The Admin Interviews module schedules interviews, assigns interviewers, and tracks interview outcomes without allowing conflicting reservations.',
    requirements: [
      req('Schedule interviews', 'The system shall create interview records for applicants and interviewers.', [
        'Interview creation requires applicant, interviewer, type, and scheduled time.',
        'Conflicting interviewer slots are rejected.',
        'Successful scheduling publishes a candidate-facing confirmation path.',
      ]),
      req('Manage status changes', 'The system shall update interviews through their approved statuses.', [
        'Interviews can be confirmed, completed, cancelled, or marked no_show.',
        'Status changes record the actor and reason where applicable.',
        'Candidate reschedules remain linked to the same interview thread.',
      ]),
      req('Expose calendar and queue views', 'The system shall present time-based and list-based interview views.', [
        'Calendar view groups interviews by date and interviewer.',
        'Queue view highlights unconfirmed or overdue interviews.',
        'Filters support interviewer and status.',
      ]),
    ],
    entities: [
      entity(
        'Interview',
        'Scheduled interview between an applicant and interviewer.',
        withAudit([
          f('applicant_id', 'uuid', true, 'FK -> Applicant.id', 'Linked applicant'),
          f('interviewer_id', 'uuid', true, 'FK -> Admin user', 'Assigned interviewer'),
          f('scheduled_for', 'datetime', true, 'ISO-8601', 'Interview start'),
          f('type', 'string', true, 'screening | technical | final', 'Interview type', { enum: ['screening', 'technical', 'final'] }),
          f('status', 'string', true, 'scheduled, confirmed, completed, cancelled, no_show', 'Interview status', {
            enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'],
          }),
        ]),
      ),
    ],
    models: [
      model('interviewSchedule', 'Interview scheduling payload.', [
        f('applicant_id', 'uuid', true, 'Applicant id', 'Applicant identifier'),
        f('interviewer_id', 'uuid', true, 'Interviewer id', 'Assigned interviewer'),
        f('scheduled_for', 'datetime', true, 'ISO-8601', 'Interview start'),
        f('type', 'string', true, 'screening | technical | final', 'Interview type', { enum: ['screening', 'technical', 'final'] }),
      ]),
      model('interviewStatusUpdate', 'Interview status update payload.', [
        f('status', 'string', true, 'confirmed | completed | cancelled | no_show', 'New interview status', {
          enum: ['confirmed', 'completed', 'cancelled', 'no_show'],
        }),
        f('reason', 'string', false, 'max 500', 'Update reason'),
      ]),
      model('interviewSummary', 'Interview response summary.', [
        f('interview_id', 'uuid', true, 'Interview id', 'Interview identifier'),
        f('status', 'string', true, 'Interview status', 'Current status'),
        f('scheduled_for', 'datetime', true, 'ISO-8601', 'Scheduled time'),
      ]),
    ],
    operations: [op('View interview calendar', 'admin_read'), op('Schedule interview', 'admin_manage'), op('Update interview status', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/interviews/calendar', 'Return the interview calendar.', { requestModel: 'adminDashboardQuery', responseModel: 'interviewSummary' }),
      ep('POST', '/api/v1/admin/interviews', 'Create a new interview record.', { requestModel: 'interviewSchedule', responseModel: 'interviewSummary' }),
      ep('PATCH', '/api/v1/admin/interviews/{id}/status', 'Update interview status.', { requestModel: 'interviewStatusUpdate', responseModel: 'interviewSummary' }),
    ],
    events: [
      ev('admin.interview.scheduled', 'Interview created', 'hr_admin / super_admin', '{ interview_id, applicant_id, interviewer_id }'),
      ev('admin.interview.rescheduled', 'Interview time changed', 'hr_admin / super_admin', '{ interview_id, previous_time, scheduled_for }'),
      ev('admin.interview.status_changed', 'Interview status updated', 'hr_admin / super_admin', '{ interview_id, status }'),
    ],
    rules: [
      rule('No interviewer conflicts', 'When scheduling or rescheduling an interview', 'Reject the request if the interviewer already has an overlapping interview.', 'Maintains scheduling integrity'),
      rule('Candidate visibility', 'When an interview is scheduled or rescheduled', 'Expose the resulting reservation to the candidate portal immediately.', 'Keeps both portals in sync'),
    ],
    dependencies: [
      ['101-admin-applicants', 'Upstream', 'Interview records belong to applicants'],
      ['202-candidate-interviews', 'Downstream', 'Candidate portal reflects scheduling availability and confirmations'],
    ],
    stateMachine: lifecycle(
      'Interview Lifecycle',
      [
        { name: 'scheduled', description: 'Interview created and awaiting confirmation.', terminal: false },
        { name: 'confirmed', description: 'Interview confirmed by the relevant actors.', terminal: false },
        { name: 'completed', description: 'Interview concluded.', terminal: true },
        { name: 'cancelled', description: 'Interview cancelled before completion.', terminal: true },
        { name: 'no_show', description: 'Interview did not occur because a participant failed to attend.', terminal: true },
      ],
      [
        { from: 'scheduled', to: 'confirmed', trigger: 'confirm()', guard: 'Candidate and interviewer availability confirmed', sideEffects: 'Emit admin.interview.status_changed' },
        { from: 'confirmed', to: 'completed', trigger: 'complete()', guard: 'Interview occurred', sideEffects: 'Release evaluation workflow' },
        { from: 'scheduled', to: 'cancelled', trigger: 'cancel()', guard: 'Cancellation reason supplied', sideEffects: 'Free the interview slot' },
        { from: 'confirmed', to: 'no_show', trigger: 'mark_no_show()', guard: 'Attendance not recorded', sideEffects: 'Emit admin.interview.status_changed' },
      ],
      ['Completed, cancelled, and no_show are terminal.', 'Only scheduled or confirmed interviews may be rescheduled.'],
    ),
  },
  {
    id: '105-admin-evaluations',
    title: 'Admin Evaluations',
    domainKey: 'admin',
    overview:
      'The Admin Evaluations module captures structured candidate assessments, scoring dimensions, and final decision readiness after interviews complete.',
    requirements: [
      req('Capture structured assessments', 'The system shall store dimension-based evaluation scores and notes.', [
        'Each evaluation references the applicant and evaluator.',
        'Scores are captured for multiple named dimensions.',
        'Evaluators may save drafts before submission.',
      ]),
      req('Support calibration and decisioning', 'The system shall support final assessment decisions after review.', [
        'Submitted evaluations may enter calibration before finalization.',
        'Final decisions record a recommendation outcome.',
        'Decision readiness is visible on the applicant record.',
      ]),
      req('Preserve evaluation history', 'The system shall keep submitted and finalized evaluations immutable.', [
        'Finalized evaluations cannot be edited in place.',
        'New revisions create a new record rather than mutating the finalized one.',
        'All submissions emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'Evaluation',
        'Structured assessment of an applicant.',
        withAudit([
          f('applicant_id', 'uuid', true, 'FK -> Applicant.id', 'Linked applicant'),
          f('evaluator_id', 'uuid', true, 'Admin user id', 'Evaluator'),
          f('status', 'string', true, 'draft, submitted, calibrated, finalized', 'Evaluation lifecycle state', {
            enum: ['draft', 'submitted', 'calibrated', 'finalized'],
          }),
          f('recommendation', 'string', false, 'advance | hold | reject', 'Final recommendation', {
            enum: ['advance', 'hold', 'reject'],
          }),
        ]),
      ),
    ],
    models: [
      model('evaluationSubmission', 'Evaluation save or submit payload.', [
        f('applicant_id', 'uuid', true, 'Applicant id', 'Applicant identifier'),
        f('status', 'string', true, 'draft | submitted', 'Requested lifecycle state', { enum: ['draft', 'submitted'] }),
        f('technical_score', 'number', true, '0-5', 'Technical score'),
        f('communication_score', 'number', true, '0-5', 'Communication score'),
        f('notes', 'string', false, 'max 2000', 'Evaluator notes'),
      ]),
      model('evaluationDecision', 'Calibration or final decision payload.', [
        f('status', 'string', true, 'calibrated | finalized', 'Lifecycle state', { enum: ['calibrated', 'finalized'] }),
        f('recommendation', 'string', true, 'advance | hold | reject', 'Decision recommendation', { enum: ['advance', 'hold', 'reject'] }),
        f('decision_notes', 'string', false, 'max 2000', 'Decision notes'),
      ]),
      model('evaluationSummary', 'Evaluation summary response.', [
        f('evaluation_id', 'uuid', true, 'Evaluation id', 'Evaluation identifier'),
        f('status', 'string', true, 'Evaluation lifecycle state', 'Current status'),
        f('recommendation', 'string', false, 'Decision result', 'Recommendation'),
      ]),
    ],
    operations: [op('View evaluation summary', 'admin_read'), op('Submit evaluation', 'admin_manage'), op('Finalize evaluation decision', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/evaluations/{applicant_id}', 'Return evaluation history for an applicant.', { responseModel: 'evaluationSummary' }),
      ep('POST', '/api/v1/admin/evaluations/{applicant_id}', 'Save or submit an evaluation.', { requestModel: 'evaluationSubmission', responseModel: 'evaluationSummary' }),
      ep('POST', '/api/v1/admin/evaluations/{applicant_id}/decision', 'Record a calibrated or finalized decision.', { requestModel: 'evaluationDecision', responseModel: 'evaluationSummary' }),
    ],
    events: [
      ev('admin.evaluation.saved', 'Evaluation draft saved', 'hr_admin / super_admin', '{ evaluation_id, applicant_id }'),
      ev('admin.evaluation.submitted', 'Evaluation submitted for review', 'hr_admin / super_admin', '{ evaluation_id, applicant_id }'),
      ev('admin.evaluation.finalized', 'Evaluation finalized with recommendation', 'hr_admin / super_admin', '{ evaluation_id, recommendation }'),
    ],
    rules: [
      rule('Immutable finalized records', 'When an evaluation is finalized', 'Prevent in-place edits and require a new revision for further changes.', 'Preserves auditability'),
      rule('Decision traceability', 'When a final recommendation is recorded', 'Store evaluator identity and timestamp with the recommendation.', 'Supports downstream hiring decisions'),
    ],
    dependencies: [
      ['104-admin-interviews', 'Upstream', 'Evaluations typically begin after interviews complete'],
      ['101-admin-applicants', 'Downstream', 'Applicant detail shows evaluation summaries and readiness'],
    ],
    stateMachine: lifecycle(
      'Evaluation Lifecycle',
      [
        { name: 'draft', description: 'Evaluation in progress.', terminal: false },
        { name: 'submitted', description: 'Evaluation submitted for review.', terminal: false },
        { name: 'calibrated', description: 'Evaluation aligned across reviewers.', terminal: false },
        { name: 'finalized', description: 'Evaluation locked with final recommendation.', terminal: true },
      ],
      [
        { from: 'draft', to: 'submitted', trigger: 'submit()', guard: 'Required scores present', sideEffects: 'Emit admin.evaluation.submitted' },
        { from: 'submitted', to: 'calibrated', trigger: 'calibrate()', guard: 'Reviewer discussion complete', sideEffects: 'Store calibration notes' },
        { from: 'calibrated', to: 'finalized', trigger: 'finalize()', guard: 'Recommendation selected', sideEffects: 'Emit admin.evaluation.finalized' },
      ],
      ['Finalized evaluations are immutable.', 'Recommendation may be empty until finalization.'],
    ),
  },
  {
    id: '106-admin-documents',
    title: 'Admin Documents',
    domainKey: 'admin',
    overview:
      'The Admin Documents module manages applicant document requests, uploads, verification, and document access for the recruiting process.',
    requirements: [
      req('Manage required document requests', 'The system shall let admins request documents from applicants.', [
        'Requests identify the document type and deadline.',
        'Candidate-facing document queues update after a request is created.',
        'Outstanding requests remain visible until resolved.',
      ]),
      req('Store and review uploaded files', 'The system shall store applicant documents with review status.', [
        'Each uploaded document captures type, source, and review status.',
        'Admins can mark a document verified or rejected.',
        'Version history is preserved when a candidate uploads a replacement file.',
      ]),
      req('Provide secure document access', 'The system shall allow only authorized actors to view or download a document.', [
        'Access is scoped to the applicant and authorized support roles.',
        'Every download emits an audit event.',
        'Rejected documents remain visible for historical review.',
      ]),
    ],
    entities: [
      entity(
        'ApplicantDocument',
        'Document associated with a candidate or applicant workflow.',
        withAudit([
          f('applicant_id', 'uuid', true, 'FK -> Applicant.id', 'Linked applicant'),
          f('document_type', 'string', true, 'employment | identity | tax | education | other', 'Document category'),
          f('status', 'string', true, 'requested, uploaded, verified, rejected, archived', 'Review status', {
            enum: ['requested', 'uploaded', 'verified', 'rejected', 'archived'],
          }),
          f('version', 'integer', true, 'min 1', 'Current version number'),
        ]),
      ),
    ],
    models: [
      model('documentRequest', 'Document request payload.', [
        f('applicant_id', 'uuid', true, 'Applicant id', 'Applicant identifier'),
        f('document_type', 'string', true, 'employment | identity | tax | education | other', 'Requested document type'),
        f('deadline', 'date', false, 'Optional due date', 'Submission deadline'),
      ]),
      model('documentReview', 'Document review payload.', [
        f('status', 'string', true, 'verified | rejected | archived', 'Review outcome', { enum: ['verified', 'rejected', 'archived'] }),
        f('reason', 'string', false, 'max 1000', 'Review notes'),
      ]),
      model('documentSummary', 'Document response summary.', [
        f('document_id', 'uuid', true, 'Document id', 'Document identifier'),
        f('status', 'string', true, 'Document review state', 'Current status'),
        f('version', 'integer', true, 'min 1', 'Current version'),
      ]),
    ],
    operations: [op('View applicant document queue', 'admin_read'), op('Request applicant document', 'admin_manage'), op('Review uploaded document', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/documents', 'Return documents for the supplied applicant or filter set.', { requestModel: 'applicantFilter', responseModel: 'documentSummary' }),
      ep('POST', '/api/v1/admin/documents/requests', 'Create a new applicant document request.', { requestModel: 'documentRequest', responseModel: 'documentSummary' }),
      ep('PATCH', '/api/v1/admin/documents/{id}/review', 'Record the admin review outcome for an uploaded document.', { requestModel: 'documentReview', responseModel: 'documentSummary' }),
      ep('GET', '/api/v1/admin/documents/{id}', 'Return document metadata and access handle.', { responseModel: 'documentSummary' }),
    ],
    events: [
      ev('admin.document.requested', 'Admin requests a document from an applicant', 'hr_admin / super_admin', '{ document_type, applicant_id }'),
      ev('admin.document.reviewed', 'Admin verifies or rejects a document', 'hr_admin / super_admin', '{ document_id, status }'),
      ev('admin.document.downloaded', 'Authorized actor downloads a document', 'hr_admin / super_admin', '{ document_id }'),
    ],
    rules: [
      rule('Version preservation', 'When a new file replaces an earlier document', 'Increment the version and retain earlier versions for audit.', 'Supports compliance reviews'),
      rule('Candidate queue synchronization', 'When a document is requested or reviewed', 'Update the candidate-facing documents module within the same workflow.', 'Keeps both actors aligned'),
    ],
    dependencies: [
      ['203-candidate-documents', 'Downstream', 'Candidate document queue mirrors requested and reviewed records'],
      ['204-candidate-onboarding', 'Related', 'Verified documents unlock onboarding readiness'],
    ],
    stateMachine: lifecycle(
      'Applicant Document Lifecycle',
      [
        { name: 'requested', description: 'Document requested but not yet uploaded.', terminal: false },
        { name: 'uploaded', description: 'Document uploaded and awaiting review.', terminal: false },
        { name: 'verified', description: 'Document accepted and complete.', terminal: true },
        { name: 'rejected', description: 'Document rejected and requires replacement.', terminal: false },
        { name: 'archived', description: 'Document retained only for history.', terminal: true },
      ],
      [
        { from: 'requested', to: 'uploaded', trigger: 'upload()', guard: 'Candidate submits a file', sideEffects: 'Increment version and notify reviewers' },
        { from: 'uploaded', to: 'verified', trigger: 'verify()', guard: 'Admin approves the file', sideEffects: 'Emit admin.document.reviewed' },
        { from: 'uploaded', to: 'rejected', trigger: 'reject()', guard: 'Admin rejects the file', sideEffects: 'Require candidate resubmission' },
        { from: 'verified', to: 'archived', trigger: 'archive()', guard: 'Retention or workflow close criteria met', sideEffects: 'Preserve immutable history' },
      ],
      ['Verified documents satisfy the current request.', 'Archived documents remain readable but not editable.'],
    ),
  },
  {
    id: '107-admin-email-templates',
    title: 'Admin Email Templates',
    domainKey: 'admin',
    overview:
      'The Admin Email Templates module stores reusable recruiting communications, validates variable placeholders, and supports preview or test-send workflows.',
    requirements: [
      req('Store reusable templates', 'The system shall maintain template records grouped by recruiting use case.', [
        'Each template includes a subject, body, and allowed variables.',
        'Templates may be draft, approved, or retired.',
        'Template list can be filtered by status and use case.',
      ]),
      req('Validate variable placeholders', 'The system shall validate that template variables belong to the approved variable catalog.', [
        'Unsupported placeholders are rejected.',
        'Preview output replaces known variables with sample values.',
        'Variable validation occurs before approval.',
      ]),
      req('Preview and test templates', 'The system shall let admins preview or send a controlled test of a template.', [
        'Preview leaves the template unchanged.',
        'Test send targets a controlled recipient only.',
        'Preview and test actions emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'EmailTemplate',
        'Reusable email template for recruiting workflows.',
        withAudit([
          f('template_key', 'string', true, 'unique', 'Template identifier'),
          f('channel', 'string', true, 'enum: email', 'Delivery channel', { enum: ['email'] }),
          f('status', 'string', true, 'draft, approved, retired', 'Template lifecycle state', { enum: ['draft', 'approved', 'retired'] }),
          f('variable_names', 'array', true, 'Approved placeholders', 'Allowed variable names', { items: { type: 'string' } }),
        ]),
      ),
    ],
    models: [
      model('emailTemplateRecord', 'Template create or update payload.', [
        f('template_key', 'string', true, 'unique', 'Template identifier'),
        f('subject', 'string', true, 'max 255', 'Email subject'),
        f('body', 'string', true, 'max 10000', 'Email body'),
        f('status', 'string', true, 'draft | approved | retired', 'Template status', { enum: ['draft', 'approved', 'retired'] }),
      ]),
      model('emailTemplatePreview', 'Template preview payload.', [
        f('sample_candidate_name', 'string', false, 'max 100', 'Sample candidate name'),
        f('sample_position_title', 'string', false, 'max 150', 'Sample position title'),
        f('sample_company_name', 'string', false, 'max 150', 'Sample company name'),
      ]),
      model('emailTemplateSummary', 'Template response summary.', [
        f('template_id', 'uuid', true, 'Template id', 'Template identifier'),
        f('status', 'string', true, 'Template lifecycle state', 'Current status'),
        f('variable_count', 'integer', true, 'min 0', 'Number of allowed variables'),
      ]),
    ],
    operations: [op('View email template library', 'admin_read'), op('Create or update template', 'admin_manage'), op('Preview or test template', 'admin_manage')],
    endpoints: [
      ep('GET', '/api/v1/admin/templates', 'Return the recruiting email template library.', { requestModel: 'adminDashboardQuery', responseModel: 'emailTemplateSummary' }),
      ep('POST', '/api/v1/admin/templates', 'Create or update a recruiting email template.', { requestModel: 'emailTemplateRecord', responseModel: 'emailTemplateSummary' }),
      ep('POST', '/api/v1/admin/templates/{id}/preview', 'Render a preview of a template with sample values.', { requestModel: 'emailTemplatePreview', responseModel: 'emailTemplateSummary' }),
    ],
    events: [
      ev('admin.template.created', 'Email template created', 'hr_admin / super_admin', '{ template_id, status }'),
      ev('admin.template.updated', 'Email template updated', 'hr_admin / super_admin', '{ template_id, status }'),
      ev('admin.template.previewed', 'Email template preview or test-send generated', 'hr_admin / super_admin', '{ template_id }'),
    ],
    rules: [
      rule('Approved variable catalog', 'When a template is created or updated', 'Reject placeholders outside the approved variable catalog.', 'Prevents malformed communications'),
      rule('Retired template safety', 'When a template is retired', 'Block it from future preview-for-send or workflow usage.', 'Avoids accidental reuse'),
    ],
    dependencies: [
      ['101-admin-applicants', 'Related', 'Template variables often reference applicant and job context'],
      ['205-candidate-messages', 'Downstream', 'Outbound communications may surface back into candidate communications history'],
    ],
    stateMachine: lifecycle(
      'Template Lifecycle',
      [
        { name: 'draft', description: 'Template is being authored.', terminal: false },
        { name: 'approved', description: 'Template may be used for production workflows.', terminal: false },
        { name: 'retired', description: 'Template is no longer used.', terminal: true },
      ],
      [
        { from: 'draft', to: 'approved', trigger: 'approve()', guard: 'Variables validated and copy reviewed', sideEffects: 'Template becomes available for production use' },
        { from: 'approved', to: 'retired', trigger: 'retire()', guard: 'Template replaced or deprecated', sideEffects: 'Block future workflow use' },
      ],
      ['Retired templates remain readable for audit.', 'Only approved templates may be used in live workflow sends.'],
    ),
  },
  {
    id: '108-admin-settings',
    title: 'Admin Settings',
    domainKey: 'admin',
    overview:
      'The Admin Settings module manages administrative users, recruiting configuration toggles, and policy settings for the admin portal.',
    requirements: [
      req('Maintain administrative users', 'The system shall provision admin users and assign their platform roles.', [
        'Provisioning records the assigned role and activation state.',
        'Role changes are auditable.',
        'Only permitted actors may change another admin user role.',
      ]),
      req('Update recruiting configuration', 'The system shall store recruiting-related settings such as thresholds and toggles.', [
        'Settings capture the previous and new value.',
        'Sensitive changes require an approver.',
        'Rollback remains available when the setting is reversible.',
      ]),
      req('Expose current policy state', 'The system shall return the latest effective settings for the admin portal.', [
        'Read responses show the effective value and last editor.',
        'History is retained for audit review.',
        'Settings align with shared constitutional guardrails.',
      ]),
    ],
    entities: [
      entity(
        'AdminSetting',
        'Administrative portal configuration setting.',
        withAudit([
          f('setting_key', 'string', true, 'unique', 'Setting identifier'),
          f('value_type', 'string', true, 'toggle, text, select, number', 'Stored value type', {
            enum: ['toggle', 'text', 'select', 'number'],
          }),
          f('value', 'string', true, 'Serialized effective value', 'Effective value'),
          f('status', 'string', true, 'proposed, approved, applied, rolled_back', 'Change lifecycle state', {
            enum: ['proposed', 'approved', 'applied', 'rolled_back'],
          }),
        ]),
      ),
      entity(
        'AdminUser',
        'Administrative user allowed into the admin portal.',
        withAudit([
          nameField,
          emailField,
          f('role', 'string', true, 'hr_admin | super_admin', 'Administrative role', { enum: ['hr_admin', 'super_admin'] }),
          f('status', 'string', true, 'active | suspended', 'User status', { enum: ['active', 'suspended'] }),
        ]),
      ),
    ],
    models: [
      model('adminSettingUpdate', 'Administrative setting update payload.', [
        f('setting_key', 'string', true, 'Existing setting id', 'Setting identifier'),
        f('value', 'string', true, 'Serialized value', 'New value'),
        f('approver_id', 'uuid', false, 'Required for sensitive changes', 'Approver'),
      ]),
      model('adminUserProvision', 'Administrative user provisioning payload.', [
        nameField,
        emailField,
        f('role', 'string', true, 'hr_admin | super_admin', 'Administrative role', { enum: ['hr_admin', 'super_admin'] }),
      ]),
      model('adminSettingSummary', 'Admin settings response summary.', [
        f('record_id', 'uuid', true, 'Setting or user record id', 'Record identifier'),
        f('status', 'string', true, 'Current lifecycle status', 'Current status'),
        f('changed_by', 'uuid', false, 'User id of last editor', 'Last editor'),
      ]),
    ],
    operations: [op('View admin settings', 'admin_config'), op('Update admin settings', 'admin_config'), op('Provision admin user', 'admin_config')],
    endpoints: [
      ep('GET', '/api/v1/admin/settings', 'Return effective admin settings.', { responseModel: 'adminSettingSummary' }),
      ep('PATCH', '/api/v1/admin/settings', 'Apply or approve an admin setting change.', { requestModel: 'adminSettingUpdate', responseModel: 'adminSettingSummary' }),
      ep('POST', '/api/v1/admin/settings/users', 'Provision a new admin user.', { requestModel: 'adminUserProvision', responseModel: 'adminSettingSummary' }),
      ep('PATCH', '/api/v1/admin/settings/users/{id}/role', 'Change an existing admin user role.', { requestModel: 'adminUserProvision', responseModel: 'adminSettingSummary' }),
    ],
    events: [
      ev('admin.setting.updated', 'Administrative setting changed', 'super_admin / hr_admin', '{ setting_key, previous_value, new_value }'),
      ev('admin.user.provisioned', 'Administrative user created', 'super_admin', '{ user_id, role }'),
      ev('admin.user.role_changed', 'Administrative user role changed', 'super_admin', '{ user_id, previous_role, role }'),
    ],
    rules: [
      rule('Super admin control for role changes', 'When another admin user is provisioned or re-roled', 'Allow only a super admin to complete the action.', 'Limits privilege escalation'),
      rule('Sensitive change approval', 'When a high-impact setting changes', 'Require an approver id before the setting reaches approved or applied.', 'Reduces configuration risk'),
    ],
    dependencies: [
      ['003-mfa', 'Related', 'MFA policies are administered through settings'],
      ['000-foundation', 'Shared', 'Role definitions come from the canonical registry'],
    ],
    stateMachine: lifecycle(
      'Administrative Setting Lifecycle',
      [
        { name: 'proposed', description: 'Setting change drafted but not approved.', terminal: false },
        { name: 'approved', description: 'Setting change approved and ready to apply.', terminal: false },
        { name: 'applied', description: 'Setting change is effective.', terminal: false },
        { name: 'rolled_back', description: 'Setting reverted to the prior value.', terminal: true },
      ],
      [
        { from: 'proposed', to: 'approved', trigger: 'approve()', guard: 'Approver present when required', sideEffects: 'Store approval metadata' },
        { from: 'approved', to: 'applied', trigger: 'apply()', guard: 'Validation passed', sideEffects: 'Emit admin.setting.updated' },
        { from: 'applied', to: 'rolled_back', trigger: 'rollback()', guard: 'Rollback supported for the setting', sideEffects: 'Restore previous value' },
      ],
      ['Applied settings remain the effective truth until rolled back or superseded.', 'Role changes always write an audit event.'],
    ),
  },
  {
    id: '200-candidate-dashboard',
    title: 'Candidate Dashboard',
    domainKey: 'candidate',
    overview:
      'The Candidate Dashboard summarizes the current application state, progress tracker, upcoming deadlines, and quick actions for an individual candidate.',
    requirements: [
      req('Summarize progress', 'The system shall display the current application progress and overall completion status.', [
        'Progress reflects completed, current, and pending steps.',
        'Overall completion percentage updates after each completed requirement.',
        'Progress links to the relevant underlying module.',
      ]),
      req('Surface deadlines and actions', 'The system shall list urgent deadlines and available actions.', [
        'Deadlines are ordered by due date and urgency.',
        'Quick actions only include actions currently available to the candidate.',
        'Completed or unavailable actions are not presented as actionable.',
      ]),
      req('Publish a personalized snapshot', 'The system shall scope dashboard data to the current candidate only.', [
        'No cross-candidate records are exposed.',
        'Snapshot publishes the timestamp of the latest refresh.',
        'Dashboard refresh emits an audit event.',
      ]),
    ],
    entities: [
      entity(
        'CandidateProgress',
        'Aggregated progress tracker for a candidate.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('overall_completion_pct', 'number', true, '0-100', 'Completion percentage'),
          f('current_step', 'string', true, 'Current workflow step', 'Current active step'),
          f('deadline_count', 'integer', true, 'min 0', 'Visible deadlines'),
        ]),
      ),
    ],
    models: [
      model('candidateDashboardQuery', 'Candidate dashboard query.', [dateFromField, dateToField]),
      model('candidateDashboardResponse', 'Candidate dashboard snapshot.', [
        f('overall_completion_pct', 'number', true, '0-100', 'Completion percentage'),
        f('current_step', 'string', true, 'Current workflow step', 'Current active step'),
        f('quick_action_count', 'integer', true, 'min 0', 'Available actions'),
        f('generated_at', 'datetime', true, 'ISO-8601', 'Snapshot timestamp'),
      ]),
    ],
    operations: [op('View own dashboard', 'candidate_view'), op('Use quick actions', 'candidate_action'), op('Assist candidate dashboard issue', 'candidate_support')],
    endpoints: [
      ep('GET', '/api/v1/candidate/dashboard/summary', 'Return candidate progress summary.', { responseModel: 'candidateDashboardResponse' }),
      ep('GET', '/api/v1/candidate/dashboard/deadlines', 'Return candidate deadlines.', { responseModel: 'candidateDashboardResponse' }),
      ep('GET', '/api/v1/candidate/dashboard/quick-actions', 'Return currently available quick actions.', { responseModel: 'candidateDashboardResponse' }),
    ],
    events: [
      ev('candidate.dashboard.viewed', 'Candidate dashboard opened', 'candidate', '{ candidate_id }'),
      ev('candidate.dashboard.quick_action_opened', 'Candidate opens a quick action', 'candidate', '{ action_key }'),
    ],
    rules: [
      rule('Candidate isolation', 'When dashboard data is queried', 'Scope all data to the current candidate record.', 'Constitution G-03'),
      rule('Action availability', 'When showing quick actions', 'Return only actions whose prerequisites are currently satisfied.', 'Avoids dead-end actions'),
    ],
    dependencies: [
      ['201-candidate-application', 'Upstream', 'Provides current application step and status'],
      ['202-candidate-interviews', 'Upstream', 'Provides upcoming interview reminders'],
      ['203-candidate-documents', 'Upstream', 'Provides pending document actions'],
      ['204-candidate-onboarding', 'Upstream', 'Provides onboarding completion status'],
    ],
    stateMachine: lifecycle(
      'Candidate Snapshot Lifecycle',
      [
        { name: 'requested', description: 'Dashboard snapshot requested.', terminal: false },
        { name: 'assembled', description: 'Module data aggregated for the candidate.', terminal: false },
        { name: 'published', description: 'Snapshot delivered.', terminal: true },
        { name: 'stale', description: 'Snapshot exceeded freshness window.', terminal: true },
      ],
      [
        { from: 'requested', to: 'assembled', trigger: 'assemble()', guard: 'Dependent modules respond', sideEffects: 'Compose personalized summary' },
        { from: 'assembled', to: 'published', trigger: 'publish()', guard: 'Candidate scope validated', sideEffects: 'Emit candidate.dashboard.viewed' },
        { from: 'published', to: 'stale', trigger: 'age_out()', guard: 'Freshness window exceeded', sideEffects: 'Regenerate on next request' },
      ],
      ['Published snapshots remain candidate-scoped.', 'Stale snapshots are never shown as current data.'],
    ),
  },
  {
    id: '201-candidate-application',
    title: 'Candidate Application',
    domainKey: 'candidate',
    overview:
      'The Candidate Application module exposes the application timeline, step-by-step status updates, and acknowledgement paths for candidate-facing recruiting progress.',
    requirements: [
      req('Display timeline status', 'The system shall show the candidate timeline from application through final outcome.', [
        'Timeline steps include state, date, and step details where available.',
        'Current step is visually distinguishable from done and pending steps in functional data terms.',
        'Skipped or unavailable steps do not break the sequence.',
      ]),
      req('Provide step detail', 'The system shall allow a candidate to read the detail for a timeline step.', [
        'Each step detail explains the current state and next expected action.',
        'Detail access is limited to the owning candidate record.',
        'Viewed steps emit an audit event.',
      ]),
      req('Record acknowledgements', 'The system shall allow the candidate to acknowledge required application notices.', [
        'Acknowledgement records the step and timestamp.',
        'Duplicate acknowledgements do not create duplicate state changes.',
        'Acknowledgement does not move the application to a new recruiting stage by itself.',
      ]),
    ],
    entities: [
      entity(
        'ApplicationStep',
        'Candidate-visible step in the application timeline.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('step_key', 'string', true, 'unique per application', 'Step identifier'),
          f('status', 'string', true, 'done, current, pending, skipped, not_selected, offer', 'Candidate-facing step state', {
            enum: ['done', 'current', 'pending', 'skipped', 'not_selected', 'offer'],
          }),
          f('step_date', 'datetime', false, 'Optional timestamp', 'When the step changed'),
        ]),
      ),
    ],
    models: [
      model('applicationTimelineQuery', 'Application timeline request.', []),
      model('applicationAcknowledgement', 'Application step acknowledgement payload.', [
        f('step_key', 'string', true, 'Existing step key', 'Acknowledged step'),
        f('acknowledged', 'boolean', true, 'Must be true', 'Acknowledgement flag'),
      ]),
      model('applicationStepSummary', 'Application step response.', [
        f('step_key', 'string', true, 'Existing step key', 'Step identifier'),
        f('status', 'string', true, 'Candidate-visible step state', 'Step status'),
        f('step_date', 'datetime', false, 'Optional timestamp', 'When the step changed'),
      ]),
    ],
    operations: [op('View own application timeline', 'candidate_view'), op('Acknowledge timeline step', 'candidate_action'), op('Review candidate timeline for support', 'candidate_support')],
    endpoints: [
      ep('GET', '/api/v1/candidate/application/timeline', 'Return the candidate application timeline.', { responseModel: 'applicationStepSummary' }),
      ep('GET', '/api/v1/candidate/application/status', 'Return the current application status summary.', { responseModel: 'applicationStepSummary' }),
      ep('POST', '/api/v1/candidate/application/acknowledge-step', 'Record acknowledgement of a candidate-facing step.', { requestModel: 'applicationAcknowledgement', responseModel: 'applicationStepSummary' }),
    ],
    events: [
      ev('candidate.application.timeline_viewed', 'Candidate views the application timeline', 'candidate', '{ candidate_id }'),
      ev('candidate.application.step_acknowledged', 'Candidate acknowledges a required step', 'candidate', '{ step_key }'),
    ],
    rules: [
      rule('Read-only recruiting state', 'When the candidate acknowledges a step', 'Do not advance the core recruiting stage without an admin-side event.', 'Prevents candidate self-promotion'),
      rule('Timeline continuity', 'When a step is skipped or not applicable', 'Keep the ordered timeline intact and mark the step accordingly.', 'Supports transparent progress communication'),
    ],
    dependencies: [
      ['101-admin-applicants', 'Upstream', 'Primary recruiting stage source of truth'],
      ['200-candidate-dashboard', 'Downstream', 'Dashboard progress tracker reflects timeline status'],
    ],
    stateMachine: lifecycle(
      'Candidate Application Lifecycle',
      [
        { name: 'applied', description: 'Application submitted.', terminal: false },
        { name: 'screening', description: 'Initial screening in progress.', terminal: false },
        { name: 'shortlisted', description: 'Candidate shortlisted.', terminal: false },
        { name: 'interview', description: 'Interview process active.', terminal: false },
        { name: 'hr_review', description: 'Final HR review in progress.', terminal: false },
        { name: 'offer', description: 'Offer issued.', terminal: true },
        { name: 'not_selected', description: 'Candidate not selected.', terminal: true },
      ],
      [
        { from: 'applied', to: 'screening', trigger: 'screen()', guard: 'Initial review begins', sideEffects: 'Timeline updates for candidate' },
        { from: 'screening', to: 'shortlisted', trigger: 'shortlist()', guard: 'Screening passes', sideEffects: 'Candidate can expect interview scheduling' },
        { from: 'shortlisted', to: 'interview', trigger: 'schedule_interview()', guard: 'Interview reservation exists', sideEffects: 'Timeline shows scheduling step' },
        { from: 'interview', to: 'hr_review', trigger: 'complete_interview()', guard: 'Interview cycle complete', sideEffects: 'Await final decision' },
        { from: 'hr_review', to: 'offer', trigger: 'issue_offer()', guard: 'Candidate selected', sideEffects: 'Offer action becomes available' },
        { from: 'hr_review', to: 'not_selected', trigger: 'close_as_not_selected()', guard: 'Candidate not selected', sideEffects: 'Timeline enters terminal outcome' },
      ],
      ['Offer and not_selected are terminal candidate-visible outcomes.', 'Candidate acknowledgements do not alter the recruiting lifecycle on their own.'],
    ),
  },
  {
    id: '202-candidate-interviews',
    title: 'Candidate Interviews',
    domainKey: 'candidate',
    overview:
      'The Candidate Interviews module lets candidates review available interview slots, reserve or reschedule interviews, and confirm their upcoming interview commitments.',
    requirements: [
      req('Show available slots', 'The system shall present interview slots that match candidate and interviewer availability.', [
        'Unavailable slots are excluded or marked as taken.',
        'Availability is refreshed before final reservation.',
        'Displayed slots remain scoped to the candidate application.',
      ]),
      req('Reserve and reschedule interviews', 'The system shall create or update the candidate reservation for an interview.', [
        'Reservation requires a valid open slot.',
        'Rescheduling releases the previous slot only after the new slot is secured.',
        'Candidate confirmation is auditable.',
      ]),
      req('Publish interview status', 'The system shall show the current interview reservation state to the candidate.', [
        'Status includes scheduled, confirmed, completed, cancelled, or no_show.',
        'Latest reservation details are returned on refresh.',
        'Updates stay synchronized with admin interview records.',
      ]),
    ],
    entities: [
      entity(
        'InterviewReservation',
        'Candidate-facing interview reservation.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('interview_id', 'uuid', true, 'Admin interview id', 'Linked interview'),
          f('reserved_for', 'datetime', true, 'ISO-8601', 'Reserved slot'),
          f('status', 'string', true, 'scheduled, confirmed, completed, cancelled, no_show', 'Reservation status', {
            enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'],
          }),
        ]),
      ),
    ],
    models: [
      model('candidateInterviewReservation', 'Candidate interview reservation payload.', [
        f('slot_id', 'uuid', true, 'Available slot id', 'Requested slot'),
        f('confirmation_note', 'string', false, 'max 500', 'Optional note'),
      ]),
      model('candidateInterviewUpdate', 'Candidate interview update payload.', [
        f('status', 'string', true, 'confirmed | cancelled', 'Requested status', { enum: ['confirmed', 'cancelled'] }),
        f('reason', 'string', false, 'max 500', 'Update reason'),
      ]),
      model('candidateInterviewSummary', 'Candidate interview response.', [
        f('interview_id', 'uuid', true, 'Interview id', 'Interview identifier'),
        f('status', 'string', true, 'Reservation status', 'Current status'),
        f('reserved_for', 'datetime', true, 'ISO-8601', 'Reserved slot'),
      ]),
    ],
    operations: [op('View own interview availability', 'candidate_view'), op('Reserve or reschedule own interview', 'candidate_action'), op('Support candidate interview issue', 'candidate_support')],
    endpoints: [
      ep('GET', '/api/v1/candidate/interviews/availability', 'Return available interview slots for the candidate.', { responseModel: 'candidateInterviewSummary' }),
      ep('POST', '/api/v1/candidate/interviews/reservations', 'Reserve an available interview slot.', { requestModel: 'candidateInterviewReservation', responseModel: 'candidateInterviewSummary' }),
      ep('PATCH', '/api/v1/candidate/interviews/reservations/{id}', 'Confirm, cancel, or reschedule an interview reservation.', { requestModel: 'candidateInterviewUpdate', responseModel: 'candidateInterviewSummary' }),
    ],
    events: [
      ev('candidate.interview.reserved', 'Candidate reserves an interview slot', 'candidate', '{ interview_id, reserved_for }'),
      ev('candidate.interview.rescheduled', 'Candidate changes to a new slot', 'candidate', '{ interview_id, previous_slot, reserved_for }'),
      ev('candidate.interview.confirmed', 'Candidate confirms interview attendance', 'candidate', '{ interview_id }'),
    ],
    rules: [
      rule('Single active reservation', 'When the candidate reschedules', 'Hold the new slot before releasing the previous reservation.', 'Avoids losing a valid reservation'),
      rule('Admin sync', 'When a reservation changes', 'Update the linked admin interview record in the same workflow.', 'Prevents drift between portals'),
    ],
    dependencies: [
      ['104-admin-interviews', 'Upstream', 'Admin interview records own scheduling truth'],
      ['200-candidate-dashboard', 'Downstream', 'Dashboard shows interview reminders and action state'],
    ],
    stateMachine: lifecycle(
      'Candidate Interview Reservation Lifecycle',
      [
        { name: 'scheduled', description: 'Reservation exists but is not yet confirmed.', terminal: false },
        { name: 'confirmed', description: 'Candidate confirmed attendance.', terminal: false },
        { name: 'completed', description: 'Interview concluded.', terminal: true },
        { name: 'cancelled', description: 'Reservation cancelled.', terminal: true },
        { name: 'no_show', description: 'Candidate failed to attend.', terminal: true },
      ],
      [
        { from: 'scheduled', to: 'confirmed', trigger: 'confirm()', guard: 'Candidate accepts reservation', sideEffects: 'Emit candidate.interview.confirmed' },
        { from: 'scheduled', to: 'cancelled', trigger: 'cancel()', guard: 'Cancellation reason allowed', sideEffects: 'Free the slot' },
        { from: 'confirmed', to: 'completed', trigger: 'complete()', guard: 'Interview recorded as finished', sideEffects: 'Update timeline progress' },
        { from: 'confirmed', to: 'no_show', trigger: 'mark_no_show()', guard: 'Attendance absent', sideEffects: 'Close reservation as no_show' },
      ],
      ['Completed, cancelled, and no_show are terminal for a reservation.', 'Only scheduled reservations can be confirmed by the candidate.'],
    ),
  },
  {
    id: '203-candidate-documents',
    title: 'Candidate Documents',
    domainKey: 'candidate',
    overview:
      'The Candidate Documents module organizes required and supplemental documents, supports e-signature completion, and keeps the candidate aware of outstanding document obligations.',
    requirements: [
      req('List assigned documents', 'The system shall return documents grouped by category and obligation state.', [
        'Each document includes category, current status, and available actions.',
        'Required documents are clearly identifiable in data terms.',
        'Only documents assigned to the current candidate are returned.',
      ]),
      req('Support electronic signatures', 'The system shall allow the candidate to sign eligible documents.', [
        'Only signable documents expose a sign action.',
        'Signature completion changes the document status to signed.',
        'Signed documents cannot be unsigned.',
      ]),
      req('Accept supplemental uploads', 'The system shall accept candidate uploads for requested or supplemental files.', [
        'Uploaded files are attached to the candidate record and current request when applicable.',
        'Uploading a replacement increments the document version.',
        'Upload completion emits an audit event.',
      ]),
    ],
    entities: [
      entity(
        'CandidateDocument',
        'Candidate-facing document record.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('category', 'string', true, 'employment | identity | tax | education | other', 'Document category'),
          f('status', 'string', true, 'pending, viewed, signed, uploaded, accepted', 'Candidate-facing status', {
            enum: ['pending', 'viewed', 'signed', 'uploaded', 'accepted'],
          }),
          f('version', 'integer', true, 'min 1', 'Document version'),
        ]),
      ),
    ],
    models: [
      model('candidateDocumentSign', 'Candidate signature payload.', [
        f('signature_type', 'string', true, 'typed_name | drawn', 'Signature method', { enum: ['typed_name', 'drawn'] }),
        f('signed_name', 'string', true, 'max 255', 'Rendered signature name'),
      ]),
      model('candidateDocumentUpload', 'Candidate supplemental upload payload.', [
        f('document_type', 'string', true, 'max 100', 'Document type'),
        f('file_name', 'string', true, 'max 255', 'Uploaded file name'),
        f('file_size_bytes', 'integer', true, 'min 1', 'Uploaded file size'),
      ]),
      model('candidateDocumentSummary', 'Candidate document response.', [
        f('document_id', 'uuid', true, 'Document id', 'Document identifier'),
        f('status', 'string', true, 'Candidate-facing status', 'Current status'),
        f('version', 'integer', true, 'min 1', 'Current version'),
      ]),
    ],
    operations: [op('View own document queue', 'candidate_view'), op('Sign own document', 'candidate_action'), op('Upload own supplemental document', 'candidate_action')],
    endpoints: [
      ep('GET', '/api/v1/candidate/documents', 'Return the candidate document queue.', { responseModel: 'candidateDocumentSummary' }),
      ep('POST', '/api/v1/candidate/documents/{id}/sign', 'Apply an electronic signature to a signable document.', { requestModel: 'candidateDocumentSign', responseModel: 'candidateDocumentSummary' }),
      ep('POST', '/api/v1/candidate/documents/uploads', 'Upload a requested or supplemental document.', { requestModel: 'candidateDocumentUpload', responseModel: 'candidateDocumentSummary' }),
    ],
    events: [
      ev('candidate.document.viewed', 'Candidate opens a document', 'candidate', '{ document_id }'),
      ev('candidate.document.signed', 'Candidate signs a document', 'candidate', '{ document_id, signature_type }'),
      ev('candidate.document.uploaded', 'Candidate uploads a document', 'candidate', '{ document_id, file_name, version }'),
    ],
    rules: [
      rule('Signature irreversibility', 'When a document reaches signed', 'Do not allow the candidate to remove the signature through the same workflow.', 'Constitution 5.6 invariant'),
      rule('Request linkage', 'When the upload satisfies an open request', 'Link the new file to the request before marking it uploaded.', 'Avoids orphaned documents'),
    ],
    dependencies: [
      ['106-admin-documents', 'Upstream', 'Admin requests and reviews drive candidate document obligations'],
      ['204-candidate-onboarding', 'Downstream', 'Signed required documents unlock onboarding progress'],
    ],
    stateMachine: lifecycle(
      'Candidate Document Lifecycle',
      [
        { name: 'pending', description: 'Document assigned or requested and awaiting candidate action.', terminal: false },
        { name: 'viewed', description: 'Candidate opened the document.', terminal: false },
        { name: 'signed', description: 'Candidate completed a signature step.', terminal: false },
        { name: 'uploaded', description: 'Candidate uploaded a file and awaits review.', terminal: false },
        { name: 'accepted', description: 'Document is complete and accepted.', terminal: true },
      ],
      [
        { from: 'pending', to: 'viewed', trigger: 'view()', guard: 'Document is accessible to candidate', sideEffects: 'Emit candidate.document.viewed' },
        { from: 'viewed', to: 'signed', trigger: 'sign()', guard: 'Document requires signature', sideEffects: 'Emit candidate.document.signed' },
        { from: 'pending', to: 'uploaded', trigger: 'upload()', guard: 'Upload request allowed', sideEffects: 'Emit candidate.document.uploaded' },
        { from: 'signed', to: 'accepted', trigger: 'accept()', guard: 'Admin review confirms completion', sideEffects: 'Unlock downstream requirements' },
        { from: 'uploaded', to: 'accepted', trigger: 'accept()', guard: 'Admin review confirms completion', sideEffects: 'Unlock downstream requirements' },
      ],
      ['Accepted documents are complete for the current workflow.', 'Signed documents remain signed permanently.'],
    ),
  },
  {
    id: '204-candidate-onboarding',
    title: 'Candidate Onboarding',
    domainKey: 'candidate',
    overview:
      'The Candidate Onboarding module manages new-hire setup tasks, account provisioning visibility, and the gating rules that prevent completion before required prerequisites are satisfied.',
    requirements: [
      req('Show onboarding checklist', 'The system shall return onboarding tasks grouped by setup category.', [
        'Checklist includes account provisioning, software setup, and policy acknowledgements.',
        'Each item shows whether it is pending, in progress, blocked, or complete.',
        'Checklist completion percentage updates after each completed item.',
      ]),
      req('Support candidate completion updates', 'The system shall let the candidate mark eligible tasks complete.', [
        'Only candidate-owned tasks may be completed directly by the candidate.',
        'Blocked tasks cannot be marked complete.',
        'Task completion is auditable.',
      ]),
      req('Enforce onboarding gates', 'The system shall prevent onboarding completion until required documents and policies are complete.', [
        'Unsigned required documents block onboarding completion.',
        'Provisioning-only tasks controlled by the system cannot be manually completed by the candidate.',
        'Overall onboarding completion reflects both candidate and system-owned steps.',
      ]),
    ],
    entities: [
      entity(
        'OnboardingItem',
        'Single onboarding task or provisioning item.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('category', 'string', true, 'accounts | software | policy | first_day', 'Checklist category', {
            enum: ['accounts', 'software', 'policy', 'first_day'],
          }),
          f('status', 'string', true, 'not_started, in_progress, blocked, completed', 'Onboarding item status', {
            enum: ['not_started', 'in_progress', 'blocked', 'completed'],
          }),
          f('owner_type', 'string', true, 'candidate | system', 'Owning actor type', { enum: ['candidate', 'system'] }),
        ]),
      ),
    ],
    models: [
      model('onboardingItemUpdate', 'Candidate onboarding completion payload.', [
        f('status', 'string', true, 'completed', 'Requested status', { enum: ['completed'] }),
        f('note', 'string', false, 'max 500', 'Optional completion note'),
      ]),
      model('onboardingSummary', 'Onboarding summary response.', [
        f('item_id', 'uuid', true, 'Onboarding item id', 'Item identifier'),
        f('status', 'string', true, 'Checklist state', 'Current status'),
        f('owner_type', 'string', true, 'candidate | system', 'Owning actor', { enum: ['candidate', 'system'] }),
      ]),
    ],
    operations: [op('View own onboarding checklist', 'candidate_view'), op('Complete own onboarding item', 'candidate_action'), op('Assist onboarding issue', 'candidate_support')],
    endpoints: [
      ep('GET', '/api/v1/candidate/onboarding/checklist', 'Return the onboarding checklist.', { responseModel: 'onboardingSummary' }),
      ep('POST', '/api/v1/candidate/onboarding/items/{id}/complete', 'Mark an eligible onboarding item complete.', { requestModel: 'onboardingItemUpdate', responseModel: 'onboardingSummary' }),
      ep('GET', '/api/v1/candidate/onboarding/accounts', 'Return account provisioning status.', { responseModel: 'onboardingSummary' }),
    ],
    events: [
      ev('candidate.onboarding.item_completed', 'Candidate completes an onboarding item', 'candidate', '{ item_id }'),
      ev('candidate.onboarding.account_provisioned', 'System provisions an onboarding account', 'system', '{ item_id, account_type }'),
      ev('candidate.onboarding.completed', 'All required onboarding work is complete', 'system', '{ candidate_id }'),
    ],
    rules: [
      rule('Document gate', 'When computing onboarding completion', 'Block overall completion until required signed documents exist.', 'Constitution G-07'),
      rule('Owner-respecting completion', 'When an item is system-owned', 'Do not allow the candidate to mark it complete directly.', 'Preserves workflow integrity'),
    ],
    dependencies: [
      ['203-candidate-documents', 'Upstream', 'Signed required documents unlock onboarding completion'],
      ['200-candidate-dashboard', 'Downstream', 'Dashboard progress reflects onboarding state'],
    ],
    stateMachine: lifecycle(
      'Onboarding Item Lifecycle',
      [
        { name: 'not_started', description: 'Item exists but work has not begun.', terminal: false },
        { name: 'in_progress', description: 'Work has begun.', terminal: false },
        { name: 'blocked', description: 'Prerequisite missing.', terminal: false },
        { name: 'completed', description: 'Item is complete.', terminal: true },
      ],
      [
        { from: 'not_started', to: 'in_progress', trigger: 'start()', guard: 'Prerequisites available', sideEffects: 'Expose action to candidate or system' },
        { from: 'in_progress', to: 'completed', trigger: 'complete()', guard: 'Required work done', sideEffects: 'Emit candidate.onboarding.item_completed when candidate-owned' },
        { from: 'not_started', to: 'blocked', trigger: 'block()', guard: 'Prerequisite missing', sideEffects: 'Surface blocking reason' },
        { from: 'blocked', to: 'in_progress', trigger: 'unblock()', guard: 'Prerequisite satisfied', sideEffects: 'Re-open work item' },
      ],
      ['Completed items are terminal for the current onboarding plan.', 'Blocked items cannot be completed until they re-enter in_progress.'],
    ),
  },
  {
    id: '205-candidate-messages',
    title: 'Candidate Messages',
    domainKey: 'candidate',
    overview:
      'The Candidate Messages module provides inbox and thread views for candidate communications with HR and support teams.',
    requirements: [
      req('Show inbox overview', 'The system shall return a candidate-scoped inbox of message threads.', [
        'Inbox rows include sender, subject, preview, timestamp, and read state.',
        'Unread threads are distinguishable in data terms.',
        'Only candidate-owned threads are returned.',
      ]),
      req('Support thread replies', 'The system shall allow the candidate to reply within an existing thread.', [
        'Reply body is required.',
        'Replies append to the existing thread rather than creating a new one.',
        'Reply activity emits an audit event.',
      ]),
      req('Track read state', 'The system shall let the candidate mark messages as read.', [
        'Read state change records the timestamp.',
        'Marking an already-read thread does not duplicate events.',
        'Read state updates remain visible in the inbox summary.',
      ]),
    ],
    entities: [
      entity(
        'CandidateThread',
        'Message thread visible to a candidate.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('subject', 'string', true, 'max 255', 'Thread subject'),
          f('status', 'string', true, 'unread, read, replied, closed', 'Thread state', {
            enum: ['unread', 'read', 'replied', 'closed'],
          }),
          f('last_message_at', 'datetime', true, 'ISO-8601', 'Timestamp of latest message'),
        ]),
      ),
    ],
    models: [
      model('candidateMessageReply', 'Candidate reply payload.', [
        f('body', 'string', true, 'min 1, max 5000', 'Reply body'),
      ]),
      model('candidateMessageRead', 'Read-state payload.', [
        f('read', 'boolean', true, 'Must be true', 'Read flag'),
      ]),
      model('candidateThreadSummary', 'Candidate thread response.', [
        f('thread_id', 'uuid', true, 'Thread id', 'Thread identifier'),
        f('status', 'string', true, 'Thread state', 'Current state'),
        f('last_message_at', 'datetime', true, 'ISO-8601', 'Latest message timestamp'),
      ]),
    ],
    operations: [op('View own inbox', 'candidate_view'), op('Reply in own thread', 'candidate_action'), op('Mark own thread as read', 'candidate_action')],
    endpoints: [
      ep('GET', '/api/v1/candidate/messages', 'Return the candidate inbox.', { responseModel: 'candidateThreadSummary' }),
      ep('GET', '/api/v1/candidate/messages/{id}', 'Return a candidate message thread.', { responseModel: 'candidateThreadSummary' }),
      ep('POST', '/api/v1/candidate/messages/{id}/reply', 'Append a reply to a candidate thread.', { requestModel: 'candidateMessageReply', responseModel: 'candidateThreadSummary' }),
      ep('POST', '/api/v1/candidate/messages/{id}/read', 'Mark a thread as read.', { requestModel: 'candidateMessageRead', responseModel: 'candidateThreadSummary' }),
    ],
    events: [
      ev('candidate.message.received', 'New message arrives in a candidate thread', 'system', '{ thread_id }'),
      ev('candidate.message.replied', 'Candidate sends a reply', 'candidate', '{ thread_id }'),
      ev('candidate.message.read', 'Candidate marks a thread as read', 'candidate', '{ thread_id }'),
    ],
    rules: [
      rule('Thread ownership', 'When loading or mutating a thread', 'Ensure the thread belongs to the current candidate.', 'Constitution G-03'),
      rule('Append-only messaging', 'When a reply is sent', 'Append the message to the thread and preserve prior content.', 'Supports audit history'),
    ],
    dependencies: [
      ['107-admin-email-templates', 'Related', 'Template-based outbound messages may appear in candidate inbox history'],
      ['200-candidate-dashboard', 'Downstream', 'Dashboard quick actions may route into inbox threads'],
    ],
    stateMachine: lifecycle(
      'Candidate Thread Lifecycle',
      [
        { name: 'unread', description: 'Thread contains an unread message for the candidate.', terminal: false },
        { name: 'read', description: 'Candidate has opened the thread.', terminal: false },
        { name: 'replied', description: 'Candidate responded most recently.', terminal: false },
        { name: 'closed', description: 'Thread no longer accepts new replies.', terminal: true },
      ],
      [
        { from: 'unread', to: 'read', trigger: 'mark_read()', guard: 'Candidate opens the thread', sideEffects: 'Emit candidate.message.read' },
        { from: 'read', to: 'replied', trigger: 'reply()', guard: 'Candidate sends a reply', sideEffects: 'Emit candidate.message.replied' },
        { from: 'replied', to: 'unread', trigger: 'receive_message()', guard: 'Counterparty sends a new message', sideEffects: 'Emit candidate.message.received' },
        { from: 'read', to: 'closed', trigger: 'close()', guard: 'Thread resolved', sideEffects: 'Block new replies' },
      ],
      ['Closed threads are immutable except for audit reads.', 'Unread always means a new inbound message exists for the candidate.'],
    ),
  },
  {
    id: '206-candidate-profile',
    title: 'Candidate Profile',
    domainKey: 'candidate',
    overview:
      'The Candidate Profile module stores the candidate personal record, editable contact details, and emergency contact information used across recruiting and onboarding.',
    requirements: [
      req('Show profile details', 'The system shall return the candidate personal and employment profile.', [
        'Profile includes contact information, address, and emergency contacts.',
        'Missing optional sections return empty values instead of errors.',
        'Only the owning candidate or approved support roles may view the profile.',
      ]),
      req('Allow profile updates', 'The system shall let the candidate update editable profile fields.', [
        'Editable fields are validated before save.',
        'Protected fields remain read-only.',
        'Each successful update emits an audit event.',
      ]),
      req('Track verification state', 'The system shall track whether the current profile data is complete and verified.', [
        'Profile may be incomplete, submitted, verified, or needs_revision.',
        'Verification state is visible to support roles.',
        'Verification changes do not expose other candidate records.',
      ]),
    ],
    entities: [
      entity(
        'CandidateProfile',
        'Candidate personal profile record.',
        withAudit([
          nameField,
          emailField,
          f('phone', 'string', true, 'max 30', 'Phone number'),
          f('address', 'string', false, 'max 500', 'Address'),
          f('verification_state', 'string', true, 'incomplete, submitted, verified, needs_revision', 'Profile verification state', {
            enum: ['incomplete', 'submitted', 'verified', 'needs_revision'],
          }),
        ]),
      ),
      entity(
        'EmergencyContact',
        'Candidate emergency contact record.',
        withAudit([
          f('candidate_id', 'uuid', true, 'Candidate profile id', 'Candidate identifier'),
          f('contact_name', 'string', true, 'max 255', 'Emergency contact name'),
          f('relationship', 'string', true, 'max 100', 'Relationship to candidate'),
          f('phone', 'string', true, 'max 30', 'Emergency contact phone'),
        ]),
      ),
    ],
    models: [
      model('candidateProfileUpdate', 'Candidate profile update payload.', [
        f('phone', 'string', false, 'max 30', 'Phone number'),
        f('address', 'string', false, 'max 500', 'Address'),
        f('emergency_contact_name', 'string', false, 'max 255', 'Emergency contact name'),
        f('emergency_contact_phone', 'string', false, 'max 30', 'Emergency contact phone'),
      ]),
      model('candidateProfileSummary', 'Candidate profile response.', [
        f('profile_id', 'uuid', true, 'Profile id', 'Profile identifier'),
        f('verification_state', 'string', true, 'Profile verification state', 'Verification state'),
        f('updated_at', 'datetime', true, 'ISO-8601', 'Latest profile update time'),
      ]),
    ],
    operations: [op('View own profile', 'candidate_view'), op('Update own profile', 'candidate_action'), op('Review candidate profile for support', 'candidate_support')],
    endpoints: [
      ep('GET', '/api/v1/candidate/profile', 'Return the current candidate profile.', { responseModel: 'candidateProfileSummary' }),
      ep('PATCH', '/api/v1/candidate/profile', 'Update editable candidate profile fields.', { requestModel: 'candidateProfileUpdate', responseModel: 'candidateProfileSummary' }),
      ep('POST', '/api/v1/candidate/profile/emergency-contacts', 'Create or replace the primary emergency contact.', { requestModel: 'candidateProfileUpdate', responseModel: 'candidateProfileSummary' }),
    ],
    events: [
      ev('candidate.profile.updated', 'Candidate profile updated', 'candidate', '{ profile_id }'),
      ev('candidate.profile.emergency_contact_updated', 'Emergency contact updated', 'candidate', '{ profile_id }'),
      ev('candidate.profile.verification_changed', 'Support role changes profile verification state', 'hr_admin / super_admin', '{ profile_id, verification_state }'),
    ],
    rules: [
      rule('Protected identity fields', 'When the candidate edits the profile', 'Keep protected identity fields read-only unless an approved support workflow is used.', 'Preserves identity integrity'),
      rule('Scoped support access', 'When a support role opens the profile', 'Allow read or assisted updates only for the current candidate record.', 'Prevents cross-candidate leakage'),
    ],
    dependencies: [
      ['204-candidate-onboarding', 'Related', 'Onboarding uses contact and emergency-contact data'],
      ['106-admin-documents', 'Related', 'Profile identity details may support document verification workflows'],
    ],
    stateMachine: lifecycle(
      'Candidate Profile Verification Lifecycle',
      [
        { name: 'incomplete', description: 'Required profile fields are missing.', terminal: false },
        { name: 'submitted', description: 'Profile has been submitted for support review.', terminal: false },
        { name: 'verified', description: 'Profile data confirmed.', terminal: true },
        { name: 'needs_revision', description: 'Profile data requires candidate changes.', terminal: false },
      ],
      [
        { from: 'incomplete', to: 'submitted', trigger: 'submit()', guard: 'Required fields complete', sideEffects: 'Expose profile for review' },
        { from: 'submitted', to: 'verified', trigger: 'verify()', guard: 'Support review passed', sideEffects: 'Emit candidate.profile.verification_changed' },
        { from: 'submitted', to: 'needs_revision', trigger: 'request_revision()', guard: 'Review found an issue', sideEffects: 'Return feedback to candidate' },
        { from: 'needs_revision', to: 'submitted', trigger: 'resubmit()', guard: 'Candidate corrected issues', sideEffects: 'Restart review' },
      ],
      ['Verified profiles remain authoritative until a new revision is requested.', 'Needs_revision requires candidate action before verification can proceed.'],
    ),
  },
  {
    id: '300-client-dashboard',
    title: 'Client Dashboard',
    domainKey: 'client',
    overview:
      'The Client Dashboard provides a client-scoped summary of projects, invoices, support tickets, and recent account activity.',
    requirements: [
      req('Aggregate client KPIs', 'The system shall show top-level client account metrics.', [
        'Metrics include active projects, total invoiced, open tickets, and team size.',
        'Values are scoped to the current client or managed client account.',
        'Snapshot timestamp is included with the response.',
      ]),
      req('List project health overview', 'The system shall summarize active projects and their current health.', [
        'Each project row includes current health, progress, and project manager context.',
        'Projects are ordered by recent activity.',
        'Project detail routing leads to the project module.',
      ]),
      req('Publish recent account activity', 'The system shall show the latest account-level events.', [
        'Activity includes file uploads, invoices, ticket updates, and project milestones.',
        'Activity stays within the current client account scope.',
        'Dashboard reads emit an audit event.',
      ]),
    ],
    entities: [
      entity(
        'ClientDashboardSnapshot',
        'Aggregated client account summary.',
        withAudit([
          f('client_id', 'uuid', true, 'Client account id', 'Client identifier'),
          f('active_project_count', 'integer', true, 'min 0', 'Number of active projects'),
          f('open_ticket_count', 'integer', true, 'min 0', 'Open support tickets'),
          f('total_invoiced_amount', 'number', true, 'min 0', 'Total invoiced amount'),
          f('team_size', 'integer', true, 'min 0', 'Visible team size'),
        ]),
      ),
    ],
    models: [
      model('clientDashboardQuery', 'Client dashboard filter request.', [dateFromField, dateToField]),
      model('clientDashboardResponse', 'Client dashboard summary response.', [
        f('active_project_count', 'integer', true, 'min 0', 'Number of active projects'),
        f('open_ticket_count', 'integer', true, 'min 0', 'Open support tickets'),
        f('total_invoiced_amount', 'number', true, 'min 0', 'Total invoiced amount'),
        f('generated_at', 'datetime', true, 'ISO-8601', 'Snapshot timestamp'),
      ]),
    ],
    operations: [op('View own client dashboard', 'client_view'), op('Open managed client dashboard', 'client_support'), op('Export client summary', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/dashboard/summary', 'Return client KPI summary.', { responseModel: 'clientDashboardResponse' }),
      ep('GET', '/api/v1/client/dashboard/projects-overview', 'Return active project overview.', { responseModel: 'clientDashboardResponse' }),
      ep('GET', '/api/v1/client/dashboard/activity', 'Return recent client account activity.', { responseModel: 'clientDashboardResponse' }),
    ],
    events: [
      ev('client.dashboard.viewed', 'Client dashboard opened', 'client / manager / super_admin', '{ client_id }'),
      ev('client.dashboard.project_drilldown_opened', 'User drills into a project from the dashboard', 'client / manager / super_admin', '{ project_id }'),
    ],
    rules: [
      rule('Client account isolation', 'When querying dashboard data', 'Filter all summaries to the active client account or managed account list.', 'Constitution G-04'),
      rule('Support-only super admin access', 'When the actor is super_admin', 'Allow read-only or support access from the dashboard.', 'Prevents accidental mutation'),
    ],
    dependencies: [
      ['301-client-projects', 'Upstream', 'Provides project health and progress data'],
      ['302-client-invoices', 'Upstream', 'Provides invoicing summaries'],
      ['306-client-support', 'Upstream', 'Provides ticket counts and recent updates'],
    ],
    stateMachine: lifecycle(
      'Client Snapshot Lifecycle',
      [
        { name: 'requested', description: 'Snapshot requested for a client account.', terminal: false },
        { name: 'aggregated', description: 'Account metrics assembled.', terminal: false },
        { name: 'published', description: 'Snapshot delivered to the caller.', terminal: true },
        { name: 'stale', description: 'Snapshot freshness window exceeded.', terminal: true },
      ],
      [
        { from: 'requested', to: 'aggregated', trigger: 'aggregate()', guard: 'Dependent modules respond', sideEffects: 'Compose client summary' },
        { from: 'aggregated', to: 'published', trigger: 'publish()', guard: 'Account scope validated', sideEffects: 'Emit client.dashboard.viewed' },
        { from: 'published', to: 'stale', trigger: 'age_out()', guard: 'Freshness window exceeded', sideEffects: 'Require regeneration' },
      ],
      ['Published snapshots are scoped to one client account context.', 'Stale snapshots cannot be treated as real-time status.'],
    ),
  },
  {
    id: '301-client-projects',
    title: 'Client Projects',
    domainKey: 'client',
    overview:
      'The Client Projects module exposes the client project roster, health indicators, progress, and project detail information for client-owned or managed accounts.',
    requirements: [
      req('List projects', 'The system shall return all visible projects for the active client account scope.', [
        'Projects can be filtered by health and payment type.',
        'Each row includes progress, health, and project manager context.',
        'Only projects linked to the active client account are returned.',
      ]),
      req('Provide project detail', 'The system shall provide detail for a selected project.', [
        'Detail includes progress, milestones, team roster, and payment type.',
        'Missing optional fields return empty states instead of errors.',
        'Project detail is accessible from the dashboard.',
      ]),
      req('Preserve project lifecycle state', 'The system shall expose the current project lifecycle state and protect terminal states.', [
        'Projects can be active, at_risk, delayed, completed, or archived.',
        'Completed or archived projects are not shown as active.',
        'Lifecycle changes emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'Project',
        'Client project visible in the client portal.',
        withAudit([
          f('client_id', 'uuid', true, 'Client account id', 'Owning client account'),
          f('status', 'string', true, 'active, at_risk, delayed, completed, archived', 'Project status', {
            enum: ['active', 'at_risk', 'delayed', 'completed', 'archived'],
          }),
          f('progress_pct', 'number', true, '0-100', 'Project progress percentage'),
          f('payment_type', 'string', true, 'fixed, hourly, monthly', 'Billing model', { enum: ['fixed', 'hourly', 'monthly'] }),
          f('project_manager_name', 'string', true, 'max 255', 'Project manager display name'),
        ]),
      ),
    ],
    models: [
      model('clientProjectFilter', 'Client project filter.', [
        ...paginationFields,
        f('status', 'string', false, 'Project status filter', 'Status filter', { enum: ['active', 'at_risk', 'delayed', 'completed', 'archived'] }),
        f('payment_type', 'string', false, 'fixed | hourly | monthly', 'Billing model filter', { enum: ['fixed', 'hourly', 'monthly'] }),
      ]),
      model('clientProjectSummary', 'Client project response.', [
        f('project_id', 'uuid', true, 'Project id', 'Project identifier'),
        f('status', 'string', true, 'Project lifecycle state', 'Current status'),
        f('progress_pct', 'number', true, '0-100', 'Progress percentage'),
      ]),
    ],
    operations: [op('View own project list', 'client_view'), op('View managed client projects', 'client_support'), op('Download project status summary', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/projects', 'Return visible client projects.', { requestModel: 'clientProjectFilter', responseModel: 'clientProjectSummary' }),
      ep('GET', '/api/v1/client/projects/{id}', 'Return client project detail.', { responseModel: 'clientProjectSummary' }),
      ep('GET', '/api/v1/client/projects/{id}/milestones', 'Return client project milestones.', { responseModel: 'clientProjectSummary' }),
    ],
    events: [
      ev('client.project.viewed', 'Project detail opened', 'client / manager / super_admin', '{ project_id }'),
      ev('client.project.lifecycle_changed', 'Project lifecycle state updated', 'manager / system', '{ project_id, status }'),
    ],
    rules: [
      rule('Client scope only', 'When listing or reading projects', 'Restrict visibility to the current client account or managed accounts.', 'Constitution G-04'),
      rule('Archived visibility', 'When a project is archived', 'Keep it available for historical reads but exclude it from active summaries.', 'Prevents stale active counts'),
    ],
    dependencies: [
      ['300-client-dashboard', 'Downstream', 'Dashboard uses project health summaries'],
      ['303-client-files', 'Related', 'Project detail links to project-scoped file assets'],
      ['304-client-working-hours', 'Related', 'Project budget burn and team hours roll into detail'],
    ],
    stateMachine: lifecycle(
      'Project Lifecycle',
      [
        { name: 'active', description: 'Project is active and on track.', terminal: false },
        { name: 'at_risk', description: 'Project needs attention but remains active.', terminal: false },
        { name: 'delayed', description: 'Project is delayed.', terminal: false },
        { name: 'completed', description: 'Project work completed.', terminal: true },
        { name: 'archived', description: 'Project retained for historical access only.', terminal: true },
      ],
      [
        { from: 'active', to: 'at_risk', trigger: 'flag_risk()', guard: 'Risk threshold crossed', sideEffects: 'Alert managed account owners' },
        { from: 'at_risk', to: 'delayed', trigger: 'mark_delayed()', guard: 'Delivery date missed', sideEffects: 'Update dashboard health' },
        { from: 'active', to: 'completed', trigger: 'complete()', guard: 'All project deliverables accepted', sideEffects: 'Close active work' },
        { from: 'completed', to: 'archived', trigger: 'archive()', guard: 'Retention policy reached', sideEffects: 'Retain read-only history' },
      ],
      ['Completed and archived are terminal client-visible lifecycle states.', 'Archived projects remain readable but not editable through client workflows.'],
    ),
  },
  {
    id: '302-client-invoices',
    title: 'Client Invoices',
    domainKey: 'client',
    overview:
      'The Client Invoices module provides invoice listings, payment-status visibility, and detailed billing summaries for each client account.',
    requirements: [
      req('List invoices by status', 'The system shall return invoices filterable by status and date.', [
        'Statuses include draft, due, overdue, and paid.',
        'Rows show amount, issue date, due date, and payment method.',
        'Invoices remain scoped to the current client account.',
      ]),
      req('Provide invoice detail and billing summary', 'The system shall show the detailed billing summary for an invoice.', [
        'Detail includes subtotal, tax, total, and project reference.',
        'Payment summary remains consistent with the invoice record.',
        'Invoice detail is available from the invoice list.',
      ]),
      req('Preserve invoice lifecycle state', 'The system shall expose invoice lifecycle state without allowing clients to mutate historical billing records through this module.', [
        'Invoices move from draft to due to paid, or due to overdue to paid.',
        'Paid is terminal.',
        'Lifecycle changes emit audit events for downstream reporting.',
      ]),
    ],
    entities: [
      entity(
        'Invoice',
        'Client invoice record.',
        withAudit([
          f('client_id', 'uuid', true, 'Client account id', 'Owning client account'),
          f('project_id', 'uuid', true, 'Project id', 'Linked project'),
          f('amount', 'number', true, 'min 0', 'Invoice total amount'),
          f('status', 'string', true, 'draft, due, overdue, paid', 'Invoice status', { enum: ['draft', 'due', 'overdue', 'paid'] }),
          f('payment_method', 'string', true, 'max 50', 'Payment method'),
        ]),
      ),
    ],
    models: [
      model('invoiceFilter', 'Invoice list filter.', [
        ...paginationFields,
        f('status', 'string', false, 'draft | due | overdue | paid', 'Invoice status filter', {
          enum: ['draft', 'due', 'overdue', 'paid'],
        }),
        dateFromField,
        dateToField,
      ]),
      model('invoiceSummary', 'Invoice response summary.', [
        f('invoice_id', 'uuid', true, 'Invoice id', 'Invoice identifier'),
        f('status', 'string', true, 'Invoice lifecycle state', 'Current status'),
        f('amount', 'number', true, 'min 0', 'Invoice amount'),
      ]),
    ],
    operations: [op('View own invoices', 'client_view'), op('View managed client invoices', 'client_support'), op('Download invoice summary', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/invoices', 'Return visible invoices for the client account.', { requestModel: 'invoiceFilter', responseModel: 'invoiceSummary' }),
      ep('GET', '/api/v1/client/invoices/{id}', 'Return invoice detail.', { responseModel: 'invoiceSummary' }),
      ep('GET', '/api/v1/client/invoices/{id}/summary', 'Return invoice billing summary.', { responseModel: 'invoiceSummary' }),
    ],
    events: [
      ev('client.invoice.viewed', 'Invoice detail opened', 'client / manager / super_admin', '{ invoice_id }'),
      ev('client.invoice.lifecycle_changed', 'Invoice lifecycle state updated', 'system / manager', '{ invoice_id, status }'),
    ],
    rules: [
      rule('Client billing isolation', 'When loading invoices', 'Filter to the current client account or managed accounts only.', 'Constitution G-04'),
      rule('Paid terminal state', 'When an invoice reaches paid', 'Prevent further lifecycle changes through the invoice module.', 'Constitution invoice lifecycle'),
    ],
    dependencies: [
      ['300-client-dashboard', 'Downstream', 'Dashboard uses invoice counts and totals'],
      ['301-client-projects', 'Related', 'Invoices link back to project references'],
    ],
    stateMachine: lifecycle(
      'Invoice Lifecycle',
      [
        { name: 'draft', description: 'Invoice prepared but not yet issued.', terminal: false },
        { name: 'due', description: 'Invoice issued and awaiting payment.', terminal: false },
        { name: 'overdue', description: 'Invoice past due date.', terminal: false },
        { name: 'paid', description: 'Invoice settled.', terminal: true },
      ],
      [
        { from: 'draft', to: 'due', trigger: 'issue()', guard: 'Invoice approved for delivery', sideEffects: 'Expose invoice to client portal' },
        { from: 'due', to: 'overdue', trigger: 'age_past_due()', guard: 'Due date passed without payment', sideEffects: 'Flag billing follow-up' },
        { from: 'due', to: 'paid', trigger: 'record_payment()', guard: 'Payment confirmed', sideEffects: 'Emit client.invoice.lifecycle_changed' },
        { from: 'overdue', to: 'paid', trigger: 'record_payment()', guard: 'Payment confirmed', sideEffects: 'Clear overdue state' },
      ],
      ['Paid is terminal.', 'Only due invoices can become overdue.'],
    ),
  },
  {
    id: '303-client-files',
    title: 'Client Files',
    domainKey: 'client',
    overview:
      'The Client Files module manages client-visible project files, upload workflows, version tracking, and secure download access.',
    requirements: [
      req('List project files', 'The system shall return project-scoped files grouped by category.', [
        'Files include category, version, uploader, and upload date.',
        'Results can be filtered by project and category.',
        'Only files from visible client projects are returned.',
      ]),
      req('Support file uploads', 'The system shall allow authorized actors to upload project files.', [
        'Upload records file name, size, category, and project.',
        'Uploading a replacement file creates a new version.',
        'Successful upload emits an audit event.',
      ]),
      req('Expose version history', 'The system shall return the version history for a file record.', [
        'Current version is clearly identifiable.',
        'Historical versions remain readable for audit.',
        'Download access is logged.',
      ]),
    ],
    entities: [
      entity(
        'ProjectFile',
        'Client-visible project file.',
        withAudit([
          f('project_id', 'uuid', true, 'Project id', 'Linked project'),
          f('category', 'string', true, 'contracts, deliverables, reports, other', 'File category', {
            enum: ['contracts', 'deliverables', 'reports', 'other'],
          }),
          f('version', 'integer', true, 'min 1', 'Current version'),
          f('uploaded_by', 'string', true, 'Actor role or user reference', 'Uploader'),
        ]),
      ),
    ],
    models: [
      model('clientFileQuery', 'Project file filter.', [
        ...paginationFields,
        f('project_id', 'uuid', false, 'Optional project id', 'Project filter'),
        f('category', 'string', false, 'contracts | deliverables | reports | other', 'Category filter', {
          enum: ['contracts', 'deliverables', 'reports', 'other'],
        }),
      ]),
      model('clientFileUpload', 'Project file upload payload.', [
        f('project_id', 'uuid', true, 'Project id', 'Linked project'),
        f('category', 'string', true, 'contracts | deliverables | reports | other', 'File category', {
          enum: ['contracts', 'deliverables', 'reports', 'other'],
        }),
        f('file_name', 'string', true, 'max 255', 'File name'),
        f('file_size_bytes', 'integer', true, 'min 1', 'File size'),
      ]),
      model('clientFileSummary', 'Project file response.', [
        f('file_id', 'uuid', true, 'File id', 'File identifier'),
        f('version', 'integer', true, 'min 1', 'Current version'),
        f('category', 'string', true, 'File category', 'Category'),
      ]),
    ],
    operations: [op('View own project files', 'client_view'), op('Upload project file', 'client_action'), op('View project file version history', 'client_view')],
    endpoints: [
      ep('GET', '/api/v1/client/files', 'Return visible project files.', { requestModel: 'clientFileQuery', responseModel: 'clientFileSummary' }),
      ep('POST', '/api/v1/client/files', 'Upload a new project file or replacement version.', { requestModel: 'clientFileUpload', responseModel: 'clientFileSummary' }),
      ep('GET', '/api/v1/client/files/{id}/versions', 'Return file version history.', { responseModel: 'clientFileSummary' }),
      ep('GET', '/api/v1/client/files/{id}/download', 'Return a secure download handle for a file.', { responseModel: 'clientFileSummary' }),
    ],
    events: [
      ev('client.file.uploaded', 'Project file uploaded', 'client / manager / super_admin', '{ file_id, project_id, version }'),
      ev('client.file.downloaded', 'Project file downloaded', 'client / manager / super_admin', '{ file_id }'),
      ev('client.file.version_created', 'Replacement file creates a new version', 'client / manager / super_admin', '{ file_id, version }'),
    ],
    rules: [
      rule('Project-scoped visibility', 'When listing or downloading files', 'Allow only files belonging to visible projects.', 'Maintains client data isolation'),
      rule('Immutable version history', 'When a replacement file is uploaded', 'Create a new version rather than overwriting the current version in place.', 'Supports traceability'),
    ],
    dependencies: [
      ['301-client-projects', 'Upstream', 'Files attach to visible projects only'],
      ['307-client-contracts', 'Related', 'Contract documents may surface in the files module for download'],
    ],
    stateMachine: lifecycle(
      'Project File Lifecycle',
      [
        { name: 'uploaded', description: 'File uploaded and available.', terminal: false },
        { name: 'reviewed', description: 'File reviewed internally.', terminal: false },
        { name: 'approved', description: 'File accepted as current deliverable.', terminal: false },
        { name: 'superseded', description: 'Newer version exists.', terminal: true },
        { name: 'archived', description: 'File retained for history only.', terminal: true },
      ],
      [
        { from: 'uploaded', to: 'reviewed', trigger: 'review()', guard: 'Internal review performed', sideEffects: 'Attach review metadata' },
        { from: 'reviewed', to: 'approved', trigger: 'approve()', guard: 'Review accepted', sideEffects: 'Mark as current version' },
        { from: 'approved', to: 'superseded', trigger: 'replace()', guard: 'New version uploaded', sideEffects: 'Retain approved history' },
        { from: 'superseded', to: 'archived', trigger: 'archive()', guard: 'Retention threshold reached', sideEffects: 'Keep read-only history' },
      ],
      ['Superseded files remain accessible as history but are not current.', 'Only one version may be current for a file record at a time.'],
    ),
  },
  {
    id: '304-client-working-hours',
    title: 'Client Working Hours',
    domainKey: 'client',
    overview:
      'The Client Working Hours module exposes time-entry summaries, budget burn, and team effort reporting driven by the approved time-tracking integration strategy.',
    requirements: [
      req('Publish time-entry summaries', 'The system shall return time-entry totals by day, team member, and project.', [
        'Responses include the selected reporting range.',
        'Entries remain scoped to visible client projects.',
        'Missing sync data is reported explicitly rather than silently omitted.',
      ]),
      req('Track budget burn', 'The system shall calculate budget burn for time-billed work.', [
        'Budget burn includes used amount, total budget, and percentage consumed.',
        'Threshold crossings can be highlighted for attention.',
        'Budget calculations align with project payment type rules.',
      ]),
      req('Expose sync freshness', 'The system shall show the freshness of imported time data.', [
        'Latest sync time is included in the response.',
        'Stale integrations are surfaced as degraded rather than current.',
        'Sync completion and degradation emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'TimeEntrySummary',
        'Aggregated time-entry row for reporting.',
        withAudit([
          f('project_id', 'uuid', true, 'Project id', 'Linked project'),
          f('entry_date', 'date', true, 'ISO-8601 date', 'Entry date'),
          f('hours', 'number', true, 'min 0', 'Reported hours'),
          f('team_member_name', 'string', true, 'max 255', 'Team member'),
        ]),
      ),
      entity(
        'BudgetBurn',
        'Budget consumption summary for a project.',
        [
          f('project_id', 'uuid', true, 'Project id', 'Linked project'),
          f('used_amount', 'number', true, 'min 0', 'Consumed amount'),
          f('total_amount', 'number', true, 'min 0', 'Budget total'),
          f('used_pct', 'number', true, '0-100', 'Budget usage percentage'),
        ],
      ),
    ],
    models: [
      model('timeRangeQuery', 'Time reporting filter.', [
        f('project_id', 'uuid', false, 'Optional project id', 'Project filter'),
        dateFromField,
        dateToField,
      ]),
      model('timeRangeSummary', 'Time reporting response.', [
        f('row_count', 'integer', true, 'min 0', 'Returned summary rows'),
        f('hours_total', 'number', true, 'min 0', 'Total hours'),
        f('latest_sync_at', 'datetime', true, 'ISO-8601', 'Latest sync time'),
      ]),
    ],
    operations: [op('View own time summary', 'client_view'), op('View managed client time summary', 'client_support'), op('Acknowledge budget threshold alert', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/time-entries', 'Return time-entry summaries for the selected range.', { requestModel: 'timeRangeQuery', responseModel: 'timeRangeSummary' }),
      ep('GET', '/api/v1/client/time-entries/summary', 'Return aggregate time and team totals.', { requestModel: 'timeRangeQuery', responseModel: 'timeRangeSummary' }),
      ep('GET', '/api/v1/client/time-entries/budget-burn', 'Return budget burn summary.', { requestModel: 'timeRangeQuery', responseModel: 'timeRangeSummary' }),
    ],
    events: [
      ev('client.time_entries.synced', 'Working-hours data imported successfully', 'system', '{ latest_sync_at }'),
      ev('client.budget.threshold_crossed', 'Budget burn threshold crossed', 'system', '{ project_id, used_pct }'),
      ev('client.time_entries.viewed', 'Time-entry summary viewed', 'client / manager / super_admin', '{ project_id }'),
    ],
    rules: [
      rule('Freshness transparency', 'When time data is stale', 'Mark the response degraded instead of presenting it as current.', 'ADR-008'),
      rule('Project-bound calculations', 'When computing budget burn', 'Include only visible project entries in the current account scope.', 'Prevents cross-account leakage'),
    ],
    dependencies: [
      ['301-client-projects', 'Upstream', 'Project payment type and budget define burn calculations'],
      ['300-client-dashboard', 'Downstream', 'Dashboard may display open budget burn alerts'],
    ],
    stateMachine: lifecycle(
      'Time Data Sync Lifecycle',
      [
        { name: 'queued', description: 'Time sync waiting to run.', terminal: false },
        { name: 'synced', description: 'Latest import completed successfully.', terminal: false },
        { name: 'degraded', description: 'Time data partially available or stale.', terminal: false },
        { name: 'stale', description: 'No acceptable fresh data available.', terminal: true },
      ],
      [
        { from: 'queued', to: 'synced', trigger: 'sync_complete()', guard: 'Import succeeds', sideEffects: 'Emit client.time_entries.synced' },
        { from: 'synced', to: 'degraded', trigger: 'detect_issue()', guard: 'Data freshness or completeness threshold missed', sideEffects: 'Surface degraded state' },
        { from: 'degraded', to: 'stale', trigger: 'age_out()', guard: 'Recovery window missed', sideEffects: 'Block real-time interpretation' },
      ],
      ['Stale data cannot be presented as current working-hour truth.', 'A successful sync always replaces degraded as the current state.'],
    ),
  },
  {
    id: '305-client-messaging',
    title: 'Client Messaging',
    domainKey: 'client',
    overview:
      'The Client Messaging module supports thread-based communication between clients and delivery teams, including scoped replies and escalation markers.',
    requirements: [
      req('Return client message threads', 'The system shall provide a scoped inbox of client threads.', [
        'Threads include participants, latest message time, and unread state.',
        'Only threads linked to the active client account are visible.',
        'Managers may view threads only for managed accounts.',
      ]),
      req('Allow replies in thread', 'The system shall support replying within an existing thread.', [
        'Reply body is required.',
        'Replies append to the thread history.',
        'Reply activity emits an audit event.',
      ]),
      req('Track escalation state', 'The system shall allow a thread to be marked for support follow-up.', [
        'Escalation state is visible in the thread summary.',
        'Escalation does not create a new ticket automatically unless routed to support.',
        'Escalation changes emit an audit event.',
      ]),
    ],
    entities: [
      entity(
        'ClientThread',
        'Client communication thread.',
        withAudit([
          f('client_id', 'uuid', true, 'Client account id', 'Owning client account'),
          f('subject', 'string', true, 'max 255', 'Thread subject'),
          f('status', 'string', true, 'unread, read, replied, escalated, closed', 'Thread status', {
            enum: ['unread', 'read', 'replied', 'escalated', 'closed'],
          }),
          f('last_message_at', 'datetime', true, 'ISO-8601', 'Latest message timestamp'),
        ]),
      ),
    ],
    models: [
      model('clientMessageReply', 'Client reply payload.', [f('body', 'string', true, 'min 1, max 5000', 'Reply body')]),
      model('clientThreadUpdate', 'Client thread status update.', [
        f('status', 'string', true, 'read | escalated | closed', 'Requested thread status', { enum: ['read', 'escalated', 'closed'] }),
        f('reason', 'string', false, 'max 500', 'Update reason'),
      ]),
      model('clientThreadSummary', 'Client thread response.', [
        f('thread_id', 'uuid', true, 'Thread id', 'Thread identifier'),
        f('status', 'string', true, 'Thread status', 'Current status'),
        f('last_message_at', 'datetime', true, 'ISO-8601', 'Latest message timestamp'),
      ]),
    ],
    operations: [op('View own message threads', 'client_view'), op('Reply in own thread', 'client_action'), op('Escalate managed client thread', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/messages', 'Return visible client message threads.', { responseModel: 'clientThreadSummary' }),
      ep('GET', '/api/v1/client/messages/{id}', 'Return a client message thread.', { responseModel: 'clientThreadSummary' }),
      ep('POST', '/api/v1/client/messages/{id}/reply', 'Append a reply to a client thread.', { requestModel: 'clientMessageReply', responseModel: 'clientThreadSummary' }),
      ep('PATCH', '/api/v1/client/messages/{id}', 'Update thread status or escalation state.', { requestModel: 'clientThreadUpdate', responseModel: 'clientThreadSummary' }),
    ],
    events: [
      ev('client.message.received', 'New inbound client message arrives', 'system', '{ thread_id }'),
      ev('client.message.replied', 'Client or manager replies in a thread', 'client / manager', '{ thread_id }'),
      ev('client.thread.escalated', 'Thread marked for support follow-up', 'client / manager', '{ thread_id }'),
    ],
    rules: [
      rule('Account-bound messaging', 'When reading or replying in a thread', 'Enforce client-account ownership or manager account assignment.', 'Maintains isolation'),
      rule('Escalation without duplication', 'When a thread is escalated', 'Mark the thread state without duplicating the existing message history.', 'Keeps a single conversation record'),
    ],
    dependencies: [
      ['306-client-support', 'Related', 'Escalated threads may result in support ticket creation'],
      ['300-client-dashboard', 'Downstream', 'Dashboard reflects unread or escalated communication counts'],
    ],
    stateMachine: lifecycle(
      'Client Thread Lifecycle',
      [
        { name: 'unread', description: 'Thread has unread inbound content.', terminal: false },
        { name: 'read', description: 'Visible but no pending unread content.', terminal: false },
        { name: 'replied', description: 'Latest action is a reply from the client side.', terminal: false },
        { name: 'escalated', description: 'Thread requires support follow-up.', terminal: false },
        { name: 'closed', description: 'Thread no longer accepts replies.', terminal: true },
      ],
      [
        { from: 'unread', to: 'read', trigger: 'mark_read()', guard: 'Actor views the thread', sideEffects: 'Persist read state' },
        { from: 'read', to: 'replied', trigger: 'reply()', guard: 'Reply body present', sideEffects: 'Emit client.message.replied' },
        { from: 'read', to: 'escalated', trigger: 'escalate()', guard: 'Support follow-up requested', sideEffects: 'Emit client.thread.escalated' },
        { from: 'escalated', to: 'closed', trigger: 'close()', guard: 'Issue resolved', sideEffects: 'Prevent future replies' },
      ],
      ['Closed threads are terminal.', 'Escalation is a status overlay on the same thread history.'],
    ),
  },
  {
    id: '306-client-support',
    title: 'Client Support',
    domainKey: 'client',
    overview:
      'The Client Support module manages client support tickets, including creation, lifecycle status, and reopen rules.',
    requirements: [
      req('Create and list tickets', 'The system shall allow clients to create and review support tickets.', [
        'Ticket creation requires subject, category, priority, and description.',
        'Ticket list is filterable by status and priority.',
        'Tickets remain scoped to the current client account.',
      ]),
      req('Track ticket status', 'The system shall move tickets through the approved support lifecycle.', [
        'Statuses include open, in_progress, and resolved.',
        'Resolved tickets may be reopened within the approved window.',
        'Status changes are audited.',
      ]),
      req('Show ticket detail', 'The system shall provide ticket detail and latest activity.', [
        'Detail includes subject, current status, category, priority, and activity timestamps.',
        'Ticket detail is accessible from the list and dashboard drilldowns.',
        'Managers may access tickets only for managed client accounts.',
      ]),
    ],
    entities: [
      entity(
        'SupportTicket',
        'Client support ticket record.',
        withAudit([
          f('client_id', 'uuid', true, 'Client account id', 'Owning client account'),
          f('subject', 'string', true, 'max 255', 'Ticket subject'),
          f('status', 'string', true, 'open, in_progress, resolved', 'Ticket status', { enum: ['open', 'in_progress', 'resolved'] }),
          f('priority', 'string', true, 'low, medium, high, urgent', 'Ticket priority', {
            enum: ['low', 'medium', 'high', 'urgent'],
          }),
          f('category', 'string', true, 'max 100', 'Ticket category'),
        ]),
      ),
    ],
    models: [
      model('supportTicketCreate', 'Support ticket creation payload.', [
        f('subject', 'string', true, 'max 255', 'Ticket subject'),
        f('category', 'string', true, 'max 100', 'Ticket category'),
        f('priority', 'string', true, 'low | medium | high | urgent', 'Ticket priority', {
          enum: ['low', 'medium', 'high', 'urgent'],
        }),
        f('description', 'string', true, 'min 1, max 5000', 'Ticket description'),
      ]),
      model('supportTicketUpdate', 'Support ticket status update payload.', [
        f('status', 'string', true, 'in_progress | resolved | open', 'Ticket status', { enum: ['in_progress', 'resolved', 'open'] }),
        f('reason', 'string', false, 'max 1000', 'Status change reason'),
      ]),
      model('supportTicketSummary', 'Support ticket response.', [
        f('ticket_id', 'uuid', true, 'Ticket id', 'Ticket identifier'),
        f('status', 'string', true, 'Ticket status', 'Current status'),
        f('priority', 'string', true, 'Ticket priority', 'Priority'),
      ]),
    ],
    operations: [op('View own support tickets', 'client_view'), op('Create support ticket', 'client_action'), op('Update or reopen managed support ticket', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/support/tickets', 'Return support tickets for the active account.', { responseModel: 'supportTicketSummary' }),
      ep('POST', '/api/v1/client/support/tickets', 'Create a new support ticket.', { requestModel: 'supportTicketCreate', responseModel: 'supportTicketSummary' }),
      ep('PATCH', '/api/v1/client/support/tickets/{id}', 'Update support ticket status.', { requestModel: 'supportTicketUpdate', responseModel: 'supportTicketSummary' }),
      ep('GET', '/api/v1/client/support/tickets/{id}', 'Return support ticket detail.', { responseModel: 'supportTicketSummary' }),
    ],
    events: [
      ev('client.ticket.opened', 'Support ticket created', 'client / manager', '{ ticket_id, priority }'),
      ev('client.ticket.status_changed', 'Support ticket status updated', 'client / manager / system', '{ ticket_id, status }'),
      ev('client.ticket.reopened', 'Resolved ticket reopened', 'client / manager', '{ ticket_id }'),
    ],
    rules: [
      rule('Reopen window', 'When reopening a resolved ticket', 'Allow reopen only within 30 days of resolution.', 'Constitution support lifecycle'),
      rule('Client-account scope', 'When loading ticket data', 'Restrict visibility to the current or managed client account.', 'Constitution G-04'),
    ],
    dependencies: [
      ['300-client-dashboard', 'Downstream', 'Dashboard shows open ticket counts'],
      ['305-client-messaging', 'Related', 'Escalated message threads may open support tickets'],
    ],
    stateMachine: lifecycle(
      'Support Ticket Lifecycle',
      [
        { name: 'open', description: 'Ticket created and awaiting action.', terminal: false },
        { name: 'in_progress', description: 'Ticket actively being worked.', terminal: false },
        { name: 'resolved', description: 'Ticket resolved.', terminal: false },
      ],
      [
        { from: 'open', to: 'in_progress', trigger: 'start_work()', guard: 'Support owner accepts the ticket', sideEffects: 'Emit client.ticket.status_changed' },
        { from: 'in_progress', to: 'resolved', trigger: 'resolve()', guard: 'Resolution recorded', sideEffects: 'Emit client.ticket.status_changed' },
        { from: 'resolved', to: 'open', trigger: 'reopen()', guard: 'Reopen request within 30 days', sideEffects: 'Emit client.ticket.reopened' },
      ],
      ['Resolved tickets may reopen only within the approved window.', 'Tickets remain account-scoped throughout the lifecycle.'],
    ),
  },
  {
    id: '307-client-contracts',
    title: 'Client Contracts',
    domainKey: 'client',
    overview:
      'The Client Contracts module tracks contract documents, signature status, and client-accessible contract detail for project relationships.',
    requirements: [
      req('List client contracts', 'The system shall return the visible contract set for a client account.', [
        'Each contract row shows related project, status, and last updated time.',
        'Only contracts linked to the current or managed client account are returned.',
        'Contract detail is accessible from the contract list.',
      ]),
      req('Support contract signing', 'The system shall allow the client to sign eligible contracts.', [
        'Only pending-signature contracts expose a sign action.',
        'Signing captures the signer identity and timestamp.',
        'Signed contracts cannot revert to unsigned.',
      ]),
      req('Retain contract history', 'The system shall retain contract status history for audit and reference.', [
        'Historical contracts remain visible for read access.',
        'Signature reminders and downloads are audited.',
        'Contract status aligns with related project lifecycle where applicable.',
      ]),
    ],
    entities: [
      entity(
        'ClientContract',
        'Contract document linked to a client project.',
        withAudit([
          f('client_id', 'uuid', true, 'Client account id', 'Owning client account'),
          f('project_id', 'uuid', true, 'Project id', 'Linked project'),
          f('status', 'string', true, 'draft, pending_signature, signed, archived', 'Contract status', {
            enum: ['draft', 'pending_signature', 'signed', 'archived'],
          }),
          f('signed_at', 'datetime', false, 'Present after signature', 'Signature timestamp'),
        ]),
      ),
    ],
    models: [
      model('clientContractSign', 'Contract signature payload.', [
        f('signed_name', 'string', true, 'max 255', 'Signer name'),
        f('signature_type', 'string', true, 'typed_name | drawn', 'Signature method', { enum: ['typed_name', 'drawn'] }),
      ]),
      model('clientContractSummary', 'Client contract response.', [
        f('contract_id', 'uuid', true, 'Contract id', 'Contract identifier'),
        f('status', 'string', true, 'Contract status', 'Current status'),
        f('signed_at', 'datetime', false, 'Signature timestamp', 'Signed at'),
      ]),
    ],
    operations: [op('View own contracts', 'client_view'), op('Sign own contract', 'client_action'), op('Assist managed contract issue', 'client_support')],
    endpoints: [
      ep('GET', '/api/v1/client/contracts', 'Return visible client contracts.', { responseModel: 'clientContractSummary' }),
      ep('GET', '/api/v1/client/contracts/{id}', 'Return contract detail.', { responseModel: 'clientContractSummary' }),
      ep('POST', '/api/v1/client/contracts/{id}/sign', 'Apply a client signature to an eligible contract.', { requestModel: 'clientContractSign', responseModel: 'clientContractSummary' }),
    ],
    events: [
      ev('client.contract.viewed', 'Client opens a contract', 'client / manager / super_admin', '{ contract_id }'),
      ev('client.contract.signed', 'Client signs a contract', 'client / manager', '{ contract_id, signed_at }'),
      ev('client.contract.reminder_sent', 'Contract reminder sent', 'system', '{ contract_id }'),
    ],
    rules: [
      rule('Signature irreversibility', 'When a contract reaches signed', 'Do not allow the same workflow to remove the signature.', 'Contract and document invariants'),
      rule('Account isolation', 'When reading contracts', 'Return only contracts linked to the current or managed client account.', 'Constitution G-04'),
    ],
    dependencies: [
      ['303-client-files', 'Related', 'Contracts may also appear as downloadable project documents'],
      ['301-client-projects', 'Related', 'Contracts link back to active or historical project context'],
    ],
    stateMachine: lifecycle(
      'Client Contract Lifecycle',
      [
        { name: 'draft', description: 'Contract drafted but not yet sent for signature.', terminal: false },
        { name: 'pending_signature', description: 'Contract waiting for signature.', terminal: false },
        { name: 'signed', description: 'Contract fully signed.', terminal: true },
        { name: 'archived', description: 'Contract retained for history.', terminal: true },
      ],
      [
        { from: 'draft', to: 'pending_signature', trigger: 'send_for_signature()', guard: 'Contract ready for client action', sideEffects: 'Expose sign action' },
        { from: 'pending_signature', to: 'signed', trigger: 'sign()', guard: 'Eligible signer completes signature', sideEffects: 'Emit client.contract.signed' },
        { from: 'signed', to: 'archived', trigger: 'archive()', guard: 'Historical retention threshold reached', sideEffects: 'Keep read-only history' },
      ],
      ['Signed contracts are terminal for signature state.', 'Archived contracts remain readable but not editable.'],
    ),
  },
  {
    id: '400-crm-dashboard',
    title: 'CRM Dashboard',
    domainKey: 'crm',
    overview:
      'The CRM Dashboard summarizes sales pipeline metrics, funnel performance, outreach activity, and hot leads for B2B and freelance segments.',
    requirements: [
      req('Aggregate CRM KPIs', 'The system shall calculate top-level CRM metrics for the selected segment.', [
        'Metrics support B2B and freelance segment toggles.',
        'Each metric publishes the snapshot time and segment used.',
        'Counts stay scoped to the visible book of business.',
      ]),
      req('Show funnel and hot leads', 'The system shall display funnel counts and a hot-leads list.', [
        'Funnel stages include new lead, contacted, meeting, proposal, and closed outcomes.',
        'Hot leads list highlights score, last contact, and temperature.',
        'Hot lead drilldown routes to contact or deal detail.',
      ]),
      req('Publish outreach feed', 'The system shall show recent outreach and activity highlights.', [
        'Feed items are sorted newest first.',
        'Activity feed stays within CRM scope.',
        'Dashboard reads emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'CrmDashboardSnapshot',
        'Aggregated CRM summary for a selected segment.',
        withAudit([
          f('segment', 'string', true, 'b2b | freelance', 'Selected segment', { enum: ['b2b', 'freelance'] }),
          f('open_deal_count', 'integer', true, 'min 0', 'Open deals'),
          f('pipeline_value', 'number', true, 'min 0', 'Open pipeline value'),
          f('hot_lead_count', 'integer', true, 'min 0', 'Visible hot leads'),
        ]),
      ),
    ],
    models: [
      model('crmDashboardQuery', 'CRM dashboard filter.', [
        f('segment', 'string', true, 'b2b | freelance', 'Selected segment', { enum: ['b2b', 'freelance'] }),
        dateFromField,
        dateToField,
      ]),
      model('crmDashboardResponse', 'CRM dashboard response.', [
        f('segment', 'string', true, 'Selected segment', 'Current segment'),
        f('open_deal_count', 'integer', true, 'min 0', 'Open deals'),
        f('hot_lead_count', 'integer', true, 'min 0', 'Hot leads'),
        f('generated_at', 'datetime', true, 'ISO-8601', 'Snapshot timestamp'),
      ]),
    ],
    operations: [op('View CRM dashboard', 'crm_view'), op('Switch CRM segment', 'crm_write'), op('Export CRM summary', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/dashboard/summary', 'Return CRM KPI summary for the selected segment.', { requestModel: 'crmDashboardQuery', responseModel: 'crmDashboardResponse' }),
      ep('GET', '/api/v1/crm/dashboard/funnel', 'Return CRM funnel counts and conversion trends.', { requestModel: 'crmDashboardQuery', responseModel: 'crmDashboardResponse' }),
      ep('GET', '/api/v1/crm/dashboard/hot-leads', 'Return hot leads and outreach highlights.', { requestModel: 'crmDashboardQuery', responseModel: 'crmDashboardResponse' }),
    ],
    events: [
      ev('crm.dashboard.viewed', 'CRM dashboard opened', 'sales_rep / manager / super_admin', '{ segment }'),
      ev('crm.dashboard.segment_changed', 'CRM segment switched', 'sales_rep / manager', '{ segment }'),
    ],
    rules: [
      rule('Segment fidelity', 'When a segment is selected', 'Use the same segment for all dashboard sub-queries in the response.', 'Avoids mixed metrics'),
      rule('Book-of-business scoping', 'When the actor is sales_rep', 'Scope summary data to the rep assignment or team allocation.', 'Prevents cross-team leakage'),
    ],
    dependencies: [
      ['401-crm-contacts', 'Upstream', 'Hot-lead and contact-health counts originate from contacts'],
      ['402-crm-pipeline', 'Upstream', 'Deal counts and funnel stages originate from the pipeline'],
      ['406-crm-scoring', 'Upstream', 'Hot-lead prioritization uses current lead scores'],
    ],
    stateMachine: lifecycle(
      'CRM Snapshot Lifecycle',
      [
        { name: 'requested', description: 'CRM snapshot requested.', terminal: false },
        { name: 'aggregated', description: 'CRM metrics assembled.', terminal: false },
        { name: 'published', description: 'Snapshot delivered.', terminal: true },
        { name: 'stale', description: 'Snapshot freshness expired.', terminal: true },
      ],
      [
        { from: 'requested', to: 'aggregated', trigger: 'aggregate()', guard: 'Segment and source data valid', sideEffects: 'Compose CRM summary' },
        { from: 'aggregated', to: 'published', trigger: 'publish()', guard: 'Book-of-business scope verified', sideEffects: 'Emit crm.dashboard.viewed' },
        { from: 'published', to: 'stale', trigger: 'age_out()', guard: 'Snapshot exceeded freshness window', sideEffects: 'Require refresh' },
      ],
      ['Published snapshots keep a single segment context.', 'Stale snapshots are not treated as live CRM truth.'],
    ),
  },
  {
    id: '401-crm-contacts',
    title: 'CRM Contacts',
    domainKey: 'crm',
    overview:
      'The CRM Contacts module stores sales contacts, health and sentiment indicators, outreach channel context, and decision-maker metadata.',
    requirements: [
      req('List and filter contacts', 'The system shall provide searchable, filterable access to CRM contacts.', [
        'Filters include temperature, channel, sentiment, pipeline, and last contact date.',
        'Result rows include company, role, health score, and decision-maker flag.',
        'Results remain scoped to the visible sales assignment.',
      ]),
      req('Maintain contact records', 'The system shall allow sales users to create and update contact records.', [
        'Contact records include company, role, temperature, and channels.',
        'Health score and sentiment may be updated as outreach evolves.',
        'Contact changes emit audit events.',
      ]),
      req('Preserve qualification state', 'The system shall track whether a contact is new, qualified, nurturing, disqualified, or archived.', [
        'Qualification state changes are auditable.',
        'Archived contacts remain readable for history.',
        'Disqualified contacts are excluded from active pipeline views.',
      ]),
    ],
    entities: [
      entity(
        'Contact',
        'CRM contact record.',
        withAudit([
          nameField,
          f('company_name', 'string', true, 'max 255', 'Company name'),
          f('job_title', 'string', true, 'max 150', 'Job title'),
          f('health_score', 'number', true, '0-100', 'Contact health score'),
          f('temperature', 'string', true, 'hot, warm, cool', 'Lead temperature', { enum: ['hot', 'warm', 'cool'] }),
          f('sentiment', 'string', true, 'positive, neutral, negative, no_response, burned', 'Latest sentiment', {
            enum: ['positive', 'neutral', 'negative', 'no_response', 'burned'],
          }),
          f('qualification_state', 'string', true, 'new, qualified, nurturing, disqualified, archived', 'Qualification state', {
            enum: ['new', 'qualified', 'nurturing', 'disqualified', 'archived'],
          }),
        ]),
      ),
    ],
    models: [
      model('crmContactFilter', 'CRM contact filter.', [
        ...paginationFields,
        f('temperature', 'string', false, 'hot | warm | cool', 'Temperature filter', { enum: ['hot', 'warm', 'cool'] }),
        f('channel', 'string', false, 'linkedin | email | whatsapp | upwork | call', 'Channel filter', {
          enum: ['linkedin', 'email', 'whatsapp', 'upwork', 'call'],
        }),
        f('sentiment', 'string', false, 'positive | neutral | negative | no_response | burned', 'Sentiment filter', {
          enum: ['positive', 'neutral', 'negative', 'no_response', 'burned'],
        }),
      ]),
      model('crmContactRecord', 'CRM contact create or update payload.', [
        nameField,
        emailField,
        f('company_name', 'string', true, 'max 255', 'Company name'),
        f('job_title', 'string', true, 'max 150', 'Job title'),
        f('temperature', 'string', true, 'hot | warm | cool', 'Lead temperature', { enum: ['hot', 'warm', 'cool'] }),
      ]),
      model('crmContactSummary', 'CRM contact response.', [
        f('contact_id', 'uuid', true, 'Contact id', 'Contact identifier'),
        f('health_score', 'number', true, '0-100', 'Health score'),
        f('qualification_state', 'string', true, 'Contact qualification state', 'Qualification state'),
      ]),
    ],
    operations: [op('View CRM contacts', 'crm_view'), op('Create or update CRM contact', 'crm_write'), op('Archive CRM contact', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/contacts', 'Return visible CRM contacts.', { requestModel: 'crmContactFilter', responseModel: 'crmContactSummary' }),
      ep('POST', '/api/v1/crm/contacts', 'Create a CRM contact.', { requestModel: 'crmContactRecord', responseModel: 'crmContactSummary' }),
      ep('PATCH', '/api/v1/crm/contacts/{id}', 'Update a CRM contact.', { requestModel: 'crmContactRecord', responseModel: 'crmContactSummary' }),
      ep('GET', '/api/v1/crm/contacts/{id}', 'Return CRM contact detail.', { responseModel: 'crmContactSummary' }),
    ],
    events: [
      ev('crm.contact.created', 'CRM contact created', 'sales_rep / manager', '{ contact_id, company_name }'),
      ev('crm.contact.updated', 'CRM contact updated', 'sales_rep / manager', '{ contact_id }'),
      ev('crm.contact.health_changed', 'CRM contact health score changed', 'system / sales_rep / manager', '{ contact_id, health_score }'),
    ],
    rules: [
      rule('Assignment scoping', 'When contacts are queried', 'Return only contacts in the current assignment scope.', 'Prevents cross-book leakage'),
      rule('Archive visibility', 'When a contact is archived', 'Keep it readable for history while excluding it from active qualification views.', 'Preserves context without clutter'),
    ],
    dependencies: [
      ['402-crm-pipeline', 'Related', 'Deals often attach to qualifying contacts'],
      ['406-crm-scoring', 'Related', 'Lead scoring depends on contact attributes and activity'],
    ],
    stateMachine: lifecycle(
      'CRM Contact Qualification Lifecycle',
      [
        { name: 'new', description: 'New contact record.', terminal: false },
        { name: 'qualified', description: 'Contact meets qualification threshold.', terminal: false },
        { name: 'nurturing', description: 'Contact in ongoing outreach.', terminal: false },
        { name: 'disqualified', description: 'Contact not fit for current pursuit.', terminal: true },
        { name: 'archived', description: 'Contact retained for history.', terminal: true },
      ],
      [
        { from: 'new', to: 'qualified', trigger: 'qualify()', guard: 'Qualification data complete', sideEffects: 'Enable deal creation' },
        { from: 'qualified', to: 'nurturing', trigger: 'start_nurture()', guard: 'Outreach sequence begins', sideEffects: 'Track engagement history' },
        { from: 'new', to: 'disqualified', trigger: 'disqualify()', guard: 'Not a fit for current targeting', sideEffects: 'Retain reason' },
        { from: 'nurturing', to: 'archived', trigger: 'archive()', guard: 'Historical retention chosen', sideEffects: 'Remove from active lists' },
      ],
      ['Disqualified and archived are terminal for active outreach.', 'Qualified contacts may later move into nurturing but not skip directly to archive without audit.'],
    ),
  },
  {
    id: '402-crm-pipeline',
    title: 'CRM Pipeline',
    domainKey: 'crm',
    overview:
      'The CRM Pipeline module manages deal records across the sales board, including stage changes, stale-deal indicators, and won/lost outcomes.',
    requirements: [
      req('Render the deal board', 'The system shall group visible deals by approved sales stage.', [
        'Board stages follow new_lead, contacted, meeting_set, proposal, won, and lost.',
        'Cards include deal value, age, and stale indicator.',
        'Counts update after each valid stage change.',
      ]),
      req('Support deal stage changes', 'The system shall allow sales users to move deals along the approved lifecycle.', [
        'Only approved stage transitions are allowed.',
        'Won and lost are terminal outcomes.',
        'Every successful move emits an audit event.',
      ]),
      req('Flag stale deals', 'The system shall mark deals that exceed age thresholds in their current stage.', [
        'Stale thresholds may vary by stage.',
        'Stale flags are visible on the board and summary metrics.',
        'Stale flagging emits an audit event.',
      ]),
    ],
    entities: [
      entity(
        'Deal',
        'CRM deal tracked on the sales pipeline board.',
        withAudit([
          f('contact_id', 'uuid', true, 'Contact id', 'Linked contact'),
          f('stage', 'string', true, 'new_lead, contacted, meeting_set, proposal, won, lost', 'Deal stage', {
            enum: ['new_lead', 'contacted', 'meeting_set', 'proposal', 'won', 'lost'],
          }),
          f('value', 'number', true, 'min 0', 'Deal value'),
          f('age_days', 'integer', true, 'min 0', 'Age in current stage'),
          f('stale_level', 'string', false, 'amber | red', 'Stale severity', { enum: ['amber', 'red'] }),
        ]),
      ),
    ],
    models: [
      model('crmDealRecord', 'CRM deal create payload.', [
        f('contact_id', 'uuid', true, 'Contact id', 'Linked contact'),
        f('stage', 'string', true, 'new_lead | contacted | meeting_set | proposal', 'Initial stage', {
          enum: ['new_lead', 'contacted', 'meeting_set', 'proposal'],
        }),
        f('value', 'number', true, 'min 0', 'Deal value'),
      ]),
      model('crmDealStageUpdate', 'CRM deal stage update payload.', [
        f('stage', 'string', true, 'contacted | meeting_set | proposal | won | lost', 'Requested stage', {
          enum: ['contacted', 'meeting_set', 'proposal', 'won', 'lost'],
        }),
        f('reason', 'string', false, 'max 1000', 'Stage change reason'),
      ]),
      model('crmDealSummary', 'CRM deal response.', [
        f('deal_id', 'uuid', true, 'Deal id', 'Deal identifier'),
        f('stage', 'string', true, 'Deal stage', 'Current stage'),
        f('value', 'number', true, 'min 0', 'Deal value'),
      ]),
    ],
    operations: [op('View CRM deal board', 'crm_view'), op('Create CRM deal', 'crm_write'), op('Move CRM deal stage', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/deals', 'Return visible deals.', { requestModel: 'crmDashboardQuery', responseModel: 'crmDealSummary' }),
      ep('POST', '/api/v1/crm/deals', 'Create a CRM deal.', { requestModel: 'crmDealRecord', responseModel: 'crmDealSummary' }),
      ep('PATCH', '/api/v1/crm/deals/{id}/stage', 'Update the CRM deal stage.', { requestModel: 'crmDealStageUpdate', responseModel: 'crmDealSummary' }),
      ep('GET', '/api/v1/crm/deals/board', 'Return the CRM board grouped by stage.', { requestModel: 'crmDashboardQuery', responseModel: 'crmDealSummary' }),
    ],
    events: [
      ev('crm.deal.created', 'CRM deal created', 'sales_rep / manager', '{ deal_id, stage, value }'),
      ev('crm.deal.stage_changed', 'CRM deal moves stage', 'sales_rep / manager', '{ deal_id, from_stage, to_stage }'),
      ev('crm.deal.stale_flagged', 'CRM deal exceeds stage-age threshold', 'system', '{ deal_id, stage, stale_level }'),
      ev('crm.deal.closed', 'CRM deal reaches won or lost', 'sales_rep / manager', '{ deal_id, stage }'),
    ],
    rules: [
      rule('Approved sales stage order', 'When a deal changes stage', 'Allow only approved transitions within the sales lifecycle.', 'Preserves funnel integrity'),
      rule('Closed-deal immutability', 'When a deal reaches won or lost', 'Treat the active deal lifecycle as complete and move later history to archive.', 'Protects reporting accuracy'),
    ],
    dependencies: [
      ['401-crm-contacts', 'Upstream', 'Deals attach to contact records'],
      ['407-crm-archive', 'Downstream', 'Closed deals become archive records'],
      ['400-crm-dashboard', 'Downstream', 'Dashboard uses deal counts and funnel metrics'],
    ],
    stateMachine: lifecycle(
      'CRM Deal Lifecycle',
      [
        { name: 'new_lead', description: 'Deal created and not yet contacted.', terminal: false },
        { name: 'contacted', description: 'Initial outreach happened.', terminal: false },
        { name: 'meeting_set', description: 'Meeting scheduled.', terminal: false },
        { name: 'proposal', description: 'Proposal stage active.', terminal: false },
        { name: 'won', description: 'Deal closed-won.', terminal: true },
        { name: 'lost', description: 'Deal closed-lost.', terminal: true },
      ],
      [
        { from: 'new_lead', to: 'contacted', trigger: 'contact()', guard: 'Initial outreach recorded', sideEffects: 'Emit crm.deal.stage_changed' },
        { from: 'contacted', to: 'meeting_set', trigger: 'schedule_meeting()', guard: 'Meeting accepted', sideEffects: 'Update dashboard funnel' },
        { from: 'meeting_set', to: 'proposal', trigger: 'send_proposal()', guard: 'Proposal created', sideEffects: 'Track proposal stage timing' },
        { from: 'proposal', to: 'won', trigger: 'close_won()', guard: 'Deal accepted', sideEffects: 'Emit crm.deal.closed' },
        { from: 'proposal', to: 'lost', trigger: 'close_lost()', guard: 'Deal not accepted', sideEffects: 'Emit crm.deal.closed' },
      ],
      ['Won and lost are terminal deal outcomes.', 'Deals cannot skip directly from new_lead to proposal.'],
    ),
  },
  {
    id: '403-crm-outreach-analytics',
    title: 'CRM Outreach Analytics',
    domainKey: 'crm',
    overview:
      'The CRM Outreach Analytics module measures outreach channel performance, response patterns, and best-channel guidance across the sales pipeline.',
    requirements: [
      req('Publish channel metrics', 'The system shall report sent, reply, and meeting conversion metrics by channel.', [
        'Metrics include reply rate and meeting rate.',
        'Best-performing channel is identifiable for the selected range.',
        'Metrics remain scoped to the visible team or assignment.',
      ]),
      req('Return response heatmap', 'The system shall provide response distribution by day and time.', [
        'Heatmap values include day-of-week and time block.',
        'Empty cells are returned as zero rather than omitted.',
        'Heatmap reads emit an audit event.',
      ]),
      req('Recommend next-best outreach direction', 'The system shall surface recommendation data based on recent performance.', [
        'Recommendations cite the source range and segment.',
        'Recommendations are read-only guidance.',
        'Recommendation generation is auditable.',
      ]),
    ],
    entities: [
      entity(
        'ChannelMetric',
        'Outreach performance summary for one channel.',
        [
          f('channel', 'string', true, 'linkedin, email, whatsapp, upwork, cold_call', 'Channel name'),
          f('sent_count', 'integer', true, 'min 0', 'Outreach attempts'),
          f('reply_rate', 'number', true, '0-100', 'Reply rate'),
          f('meeting_rate', 'number', true, '0-100', 'Meeting conversion rate'),
        ],
      ),
      entity(
        'HeatmapCell',
        'Response heatmap cell.',
        [
          f('day_of_week', 'string', true, 'Mon-Sun', 'Day label'),
          f('time_block', 'string', true, 'HH:MM block', 'Time block'),
          f('value', 'integer', true, 'min 0', 'Response count'),
        ],
      ),
    ],
    models: [
      model('outreachAnalyticsQuery', 'Outreach analytics filter.', [f('segment', 'string', false, 'b2b | freelance', 'Segment filter', { enum: ['b2b', 'freelance'] }), dateFromField, dateToField]),
      model('outreachAnalyticsSummary', 'Outreach analytics response.', [
        f('channel_count', 'integer', true, 'min 0', 'Number of returned channels'),
        f('best_channel', 'string', false, 'Best-performing channel', 'Best channel'),
        f('generated_at', 'datetime', true, 'ISO-8601', 'Snapshot timestamp'),
      ]),
    ],
    operations: [op('View outreach channel analytics', 'crm_view'), op('View outreach heatmap', 'crm_view'), op('Generate outreach recommendation', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/analytics/channels', 'Return outreach channel metrics.', { requestModel: 'outreachAnalyticsQuery', responseModel: 'outreachAnalyticsSummary' }),
      ep('GET', '/api/v1/crm/analytics/heatmap', 'Return outreach response heatmap.', { requestModel: 'outreachAnalyticsQuery', responseModel: 'outreachAnalyticsSummary' }),
      ep('GET', '/api/v1/crm/analytics/recommendations', 'Return next-best outreach recommendations.', { requestModel: 'outreachAnalyticsQuery', responseModel: 'outreachAnalyticsSummary' }),
    ],
    events: [
      ev('crm.analytics.viewed', 'Outreach analytics viewed', 'sales_rep / manager / super_admin', '{ segment, date_from, date_to }'),
      ev('crm.analytics.recommendation_generated', 'Outreach recommendation generated', 'system', '{ segment, best_channel }'),
    ],
    rules: [
      rule('Zero-value completeness', 'When the heatmap has no responses for a bucket', 'Return zero rather than omitting the cell.', 'Supports consistent rendering and analysis'),
      rule('Guidance is descriptive', 'When recommendations are returned', 'Treat recommendations as read-only guidance rather than direct workflow mutations.', 'Keeps analytics separate from actions'),
    ],
    dependencies: [
      ['401-crm-contacts', 'Upstream', 'Contact engagement history contributes to analytics'],
      ['404-crm-templates', 'Related', 'Template performance contributes to outreach recommendations'],
      ['400-crm-dashboard', 'Downstream', 'Dashboard summarizes analytics highlights'],
    ],
    stateMachine: lifecycle(
      'Outreach Analytics Snapshot Lifecycle',
      [
        { name: 'requested', description: 'Analytics snapshot requested.', terminal: false },
        { name: 'computed', description: 'Analytics calculated.', terminal: false },
        { name: 'published', description: 'Analytics delivered.', terminal: true },
        { name: 'stale', description: 'Analytics freshness window exceeded.', terminal: true },
      ],
      [
        { from: 'requested', to: 'computed', trigger: 'compute()', guard: 'Input range and segment valid', sideEffects: 'Aggregate outreach metrics' },
        { from: 'computed', to: 'published', trigger: 'publish()', guard: 'Visibility scope validated', sideEffects: 'Emit crm.analytics.viewed' },
        { from: 'published', to: 'stale', trigger: 'age_out()', guard: 'Refresh threshold exceeded', sideEffects: 'Require recompute' },
      ],
      ['Published analytics remain read-only snapshots.', 'Stale analytics should not be used as current decision support without refresh.'],
    ),
  },
  {
    id: '404-crm-templates',
    title: 'CRM Templates',
    domainKey: 'crm',
    overview:
      'The CRM Templates module stores outreach templates, validates variables, and supports preview workflows for channel-specific sales messaging.',
    requirements: [
      req('Store outreach templates', 'The system shall maintain reusable outreach templates by channel.', [
        'Templates are grouped by channel such as LinkedIn, email, and WhatsApp.',
        'Each template stores body, variables, and lifecycle status.',
        'Templates can be filtered by channel and status.',
      ]),
      req('Validate placeholders', 'The system shall validate placeholder tokens against the approved template variable set.', [
        'Unsupported placeholders are rejected.',
        'Preview substitution uses sample values without changing the template.',
        'Validation must pass before approval.',
      ]),
      req('Track template lifecycle', 'The system shall track draft, tested, approved, and retired states for templates.', [
        'Approved templates can be used in live outreach workflows.',
        'Retired templates remain readable for historical analysis.',
        'Lifecycle changes emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'OutreachTemplate',
        'Reusable sales outreach template.',
        withAudit([
          f('channel', 'string', true, 'linkedin, email, whatsapp', 'Template channel', { enum: ['linkedin', 'email', 'whatsapp'] }),
          f('status', 'string', true, 'draft, tested, approved, retired', 'Template lifecycle state', {
            enum: ['draft', 'tested', 'approved', 'retired'],
          }),
          f('reply_rate', 'number', false, '0-100', 'Observed reply rate'),
          f('variable_names', 'array', true, 'Approved placeholders', 'Allowed variable names', { items: { type: 'string' } }),
        ]),
      ),
    ],
    models: [
      model('crmTemplateRecord', 'CRM outreach template create or update payload.', [
        f('channel', 'string', true, 'linkedin | email | whatsapp', 'Template channel', { enum: ['linkedin', 'email', 'whatsapp'] }),
        f('body', 'string', true, 'min 1, max 10000', 'Template body'),
        f('status', 'string', true, 'draft | tested | approved | retired', 'Template status', {
          enum: ['draft', 'tested', 'approved', 'retired'],
        }),
      ]),
      model('crmTemplatePreview', 'CRM template preview payload.', [
        f('first_name', 'string', false, 'max 100', 'Sample first name'),
        f('company', 'string', false, 'max 150', 'Sample company'),
        f('job_title', 'string', false, 'max 150', 'Sample job title'),
      ]),
      model('crmTemplateSummary', 'CRM template response.', [
        f('template_id', 'uuid', true, 'Template id', 'Template identifier'),
        f('status', 'string', true, 'Template lifecycle state', 'Current status'),
        f('reply_rate', 'number', false, '0-100', 'Observed reply rate'),
      ]),
    ],
    operations: [op('View CRM template library', 'crm_view'), op('Create or update CRM template', 'crm_write'), op('Preview CRM template', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/templates', 'Return visible CRM templates.', { responseModel: 'crmTemplateSummary' }),
      ep('POST', '/api/v1/crm/templates', 'Create or update a CRM template.', { requestModel: 'crmTemplateRecord', responseModel: 'crmTemplateSummary' }),
      ep('POST', '/api/v1/crm/templates/{id}/preview', 'Render a preview of a CRM template.', { requestModel: 'crmTemplatePreview', responseModel: 'crmTemplateSummary' }),
    ],
    events: [
      ev('crm.template.created', 'CRM template created', 'sales_rep / manager', '{ template_id, channel }'),
      ev('crm.template.updated', 'CRM template updated', 'sales_rep / manager', '{ template_id, status }'),
      ev('crm.template.previewed', 'CRM template preview generated', 'sales_rep / manager', '{ template_id }'),
    ],
    rules: [
      rule('Approved placeholder catalog', 'When a template is saved', 'Reject placeholder names outside the approved CRM variable catalog.', 'Prevents malformed outreach'),
      rule('Retired template safety', 'When a template is retired', 'Block its use in live outreach automation.', 'Avoids accidental reuse'),
    ],
    dependencies: [
      ['401-crm-contacts', 'Related', 'Template variables often use contact attributes'],
      ['403-crm-outreach-analytics', 'Related', 'Analytics consumes template reply-performance data'],
    ],
    stateMachine: lifecycle(
      'CRM Template Lifecycle',
      [
        { name: 'draft', description: 'Template in authoring.', terminal: false },
        { name: 'tested', description: 'Template previewed or test-used.', terminal: false },
        { name: 'approved', description: 'Template approved for use.', terminal: false },
        { name: 'retired', description: 'Template retired from active use.', terminal: true },
      ],
      [
        { from: 'draft', to: 'tested', trigger: 'preview()', guard: 'Variables validate successfully', sideEffects: 'Emit crm.template.previewed' },
        { from: 'tested', to: 'approved', trigger: 'approve()', guard: 'Review complete', sideEffects: 'Expose for live outreach' },
        { from: 'approved', to: 'retired', trigger: 'retire()', guard: 'Template deprecated', sideEffects: 'Keep for analysis only' },
      ],
      ['Retired templates remain readable but inactive.', 'Only approved templates may be used in live outreach.'],
    ),
  },
  {
    id: '405-crm-lead-stacks',
    title: 'CRM Lead Stacks',
    domainKey: 'crm',
    overview:
      'The CRM Lead Stacks module manages curated lead collections grouped by targeting theme, platform, and recent outreach history.',
    requirements: [
      req('Maintain lead stacks', 'The system shall create and update named lead stacks.', [
        'Each stack includes a name, description, platform tags, and lead count.',
        'Stacks may be filtered by platform and status.',
        'Stack changes emit audit events.',
      ]),
      req('Assign stacks for outreach', 'The system shall support assigning a lead stack to an owner or campaign.', [
        'Assignment records the target owner and date.',
        'Only active stacks may be assigned.',
        'Assignment does not duplicate stack members.',
      ]),
      req('Track stack lifecycle', 'The system shall track draft, active, exhausted, and archived stack states.', [
        'Exhausted stacks remain readable but not assignable.',
        'Archived stacks remain historical only.',
        'Status changes are auditable.',
      ]),
    ],
    entities: [
      entity(
        'LeadStack',
        'Curated collection of leads for outreach.',
        withAudit([
          nameField,
          f('description', 'string', true, 'max 1000', 'Stack description'),
          f('platforms', 'array', true, 'Platform tags', 'Target platforms', { items: { type: 'string' } }),
          f('lead_count', 'integer', true, 'min 0', 'Number of leads in stack'),
          f('status', 'string', true, 'draft, active, exhausted, archived', 'Stack lifecycle state', {
            enum: ['draft', 'active', 'exhausted', 'archived'],
          }),
        ]),
      ),
    ],
    models: [
      model('leadStackRecord', 'Lead stack create or update payload.', [
        nameField,
        f('description', 'string', true, 'max 1000', 'Stack description'),
        f('status', 'string', true, 'draft | active | exhausted | archived', 'Stack status', {
          enum: ['draft', 'active', 'exhausted', 'archived'],
        }),
      ]),
      model('leadStackAssignment', 'Lead stack assignment payload.', [
        f('owner_id', 'uuid', true, 'Sales owner id', 'Assignee'),
        f('campaign_name', 'string', false, 'max 255', 'Campaign name'),
      ]),
      model('leadStackSummary', 'Lead stack response.', [
        f('stack_id', 'uuid', true, 'Stack id', 'Stack identifier'),
        f('status', 'string', true, 'Stack lifecycle state', 'Current status'),
        f('lead_count', 'integer', true, 'min 0', 'Lead count'),
      ]),
    ],
    operations: [op('View lead stacks', 'crm_view'), op('Create or update lead stack', 'crm_write'), op('Assign lead stack', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/lead-stacks', 'Return lead stacks in scope.', { responseModel: 'leadStackSummary' }),
      ep('POST', '/api/v1/crm/lead-stacks', 'Create or update a lead stack.', { requestModel: 'leadStackRecord', responseModel: 'leadStackSummary' }),
      ep('POST', '/api/v1/crm/lead-stacks/{id}/assign', 'Assign a lead stack to an owner or campaign.', { requestModel: 'leadStackAssignment', responseModel: 'leadStackSummary' }),
    ],
    events: [
      ev('crm.lead_stack.created', 'Lead stack created', 'sales_rep / manager', '{ stack_id }'),
      ev('crm.lead_stack.updated', 'Lead stack updated', 'sales_rep / manager', '{ stack_id, status }'),
      ev('crm.lead_stack.assigned', 'Lead stack assigned', 'sales_rep / manager', '{ stack_id, owner_id }'),
    ],
    rules: [
      rule('Assignment eligibility', 'When assigning a lead stack', 'Allow assignment only for stacks in active state.', 'Prevents stale targeting'),
      rule('Historical preservation', 'When a stack is exhausted or archived', 'Keep it readable for reporting and learning.', 'Supports campaign analysis'),
    ],
    dependencies: [
      ['401-crm-contacts', 'Related', 'Contacts may be grouped into lead stacks'],
      ['404-crm-templates', 'Related', 'Lead stacks may be paired with outreach templates'],
    ],
    stateMachine: lifecycle(
      'Lead Stack Lifecycle',
      [
        { name: 'draft', description: 'Lead stack is being curated.', terminal: false },
        { name: 'active', description: 'Lead stack may be assigned for outreach.', terminal: false },
        { name: 'exhausted', description: 'Lead stack no longer has meaningful unworked leads.', terminal: false },
        { name: 'archived', description: 'Lead stack retained for history.', terminal: true },
      ],
      [
        { from: 'draft', to: 'active', trigger: 'activate()', guard: 'Lead stack validated', sideEffects: 'Expose for assignment' },
        { from: 'active', to: 'exhausted', trigger: 'mark_exhausted()', guard: 'Lead pool mostly worked', sideEffects: 'Block further assignment' },
        { from: 'exhausted', to: 'archived', trigger: 'archive()', guard: 'Historical retention step', sideEffects: 'Retain read-only access' },
      ],
      ['Archived stacks remain visible for analytics only.', 'Only active stacks may be assigned to new campaigns.'],
    ),
  },
  {
    id: '406-crm-scoring',
    title: 'CRM Scoring',
    domainKey: 'crm',
    overview:
      'The CRM Scoring module calculates lead scores, tracks scoring freshness, and exposes prioritized follow-up queues for the sales team.',
    requirements: [
      req('Calculate composite lead scores', 'The system shall produce a composite lead score and dimension breakdown.', [
        'Composite score ranges from 0 to 100.',
        'Dimension scores include response time, budget fit, decision power, timeline, and technical fit.',
        'Score calculations cite the refresh time used.',
      ]),
      req('Refresh stale scores', 'The system shall mark stale scores and support recalculation.', [
        'Stale scores are not treated as current decision support.',
        'Recalculation can run on-demand or from a queue.',
        'Recalculation events are auditable.',
      ]),
      req('Prioritize follow-up work', 'The system shall expose prioritized scoring queues.', [
        'Priority queues sort highest-score leads first.',
        'Manual overrides are allowed but auditable.',
        'Priority changes emit audit events.',
      ]),
    ],
    entities: [
      entity(
        'LeadScore',
        'Composite score for a CRM contact.',
        withAudit([
          f('contact_id', 'uuid', true, 'Contact id', 'Linked contact'),
          f('total_score', 'number', true, '0-100', 'Composite score'),
          f('status', 'string', true, 'stale, recalculating, current, overridden', 'Score freshness state', {
            enum: ['stale', 'recalculating', 'current', 'overridden'],
          }),
          f('calculated_at', 'datetime', true, 'ISO-8601', 'Calculation timestamp'),
        ]),
      ),
    ],
    models: [
      model('leadScoreRequest', 'Lead score recalculation request.', [
        f('contact_id', 'uuid', false, 'Optional contact id; omit for batch queue', 'Target contact'),
        f('force', 'boolean', false, 'default false', 'Force recalculation'),
      ]),
      model('leadScoreSummary', 'Lead score response.', [
        f('contact_id', 'uuid', true, 'Contact id', 'Linked contact'),
        f('total_score', 'number', true, '0-100', 'Composite score'),
        f('status', 'string', true, 'Score freshness state', 'Current status'),
      ]),
    ],
    operations: [op('View CRM lead score', 'crm_view'), op('Recalculate CRM lead score', 'crm_write'), op('Apply manual score override', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/scoring/{contact_id}', 'Return the current score for a contact.', { responseModel: 'leadScoreSummary' }),
      ep('POST', '/api/v1/crm/scoring/recalculate', 'Recalculate one or more lead scores.', { requestModel: 'leadScoreRequest', responseModel: 'leadScoreSummary' }),
      ep('GET', '/api/v1/crm/scoring/queue', 'Return prioritized follow-up queue by score.', { responseModel: 'leadScoreSummary' }),
    ],
    events: [
      ev('crm.score.recalculated', 'Lead score recalculated', 'system / sales_rep / manager', '{ contact_id, total_score }'),
      ev('crm.score.priority_changed', 'Follow-up priority changes due to scoring or override', 'system / sales_rep / manager', '{ contact_id, total_score, status }'),
      ev('crm.score.overridden', 'Manual score override applied', 'sales_rep / manager', '{ contact_id, total_score }'),
    ],
    rules: [
      rule('Freshness requirement', 'When a score is stale', 'Do not use it as current prioritization until recalculated or overridden.', 'ADR-009'),
      rule('Override traceability', 'When a manual override occurs', 'Preserve both computed and overridden values with actor identity.', 'Supports explainability'),
    ],
    dependencies: [
      ['401-crm-contacts', 'Upstream', 'Contact attributes contribute to scoring input'],
      ['403-crm-outreach-analytics', 'Upstream', 'Engagement metrics may inform scoring dimensions'],
      ['400-crm-dashboard', 'Downstream', 'Dashboard hot leads use current scores'],
    ],
    stateMachine: lifecycle(
      'Lead Score Lifecycle',
      [
        { name: 'stale', description: 'Score needs recalculation.', terminal: false },
        { name: 'recalculating', description: 'Score is being recomputed.', terminal: false },
        { name: 'current', description: 'Score is current and usable.', terminal: false },
        { name: 'overridden', description: 'Manual override applied.', terminal: true },
      ],
      [
        { from: 'stale', to: 'recalculating', trigger: 'recalculate()', guard: 'Queue accepted or on-demand request made', sideEffects: 'Start scoring job' },
        { from: 'recalculating', to: 'current', trigger: 'complete()', guard: 'Scoring job succeeded', sideEffects: 'Emit crm.score.recalculated' },
        { from: 'current', to: 'overridden', trigger: 'override()', guard: 'Manual override authorized', sideEffects: 'Emit crm.score.overridden' },
      ],
      ['Overridden scores remain explicit and auditable.', 'Current scores always retain the last calculation timestamp.'],
    ),
  },
  {
    id: '407-crm-archive',
    title: 'CRM Archive',
    domainKey: 'crm',
    overview:
      'The CRM Archive module provides read access to closed-won and closed-lost deals for historical analysis and reporting.',
    requirements: [
      req('Return closed-won and closed-lost history', 'The system shall expose separate views for won and lost archived deals.', [
        'Archive queries can filter by close date and owner.',
        'Archive views include deal value and close date.',
        'Archived deals remain read-only.',
      ]),
      req('Preserve historical context', 'The system shall retain enough context to understand why a deal was closed.', [
        'Archive detail includes close reason and outcome.',
        'Related contact and company references remain visible.',
        'Archive reads emit audit events.',
      ]),
      req('Block reactivation through archive', 'The system shall not reactivate deals from the archive module.', [
        'Archive is read-only.',
        'Any future deal must be created as a new record.',
        'The module enforces terminal closed states.',
      ]),
    ],
    entities: [
      entity(
        'ArchivedDeal',
        'Historical deal record retained after closure.',
        withAudit([
          f('deal_id', 'uuid', true, 'Original deal id', 'Deal identifier'),
          f('outcome', 'string', true, 'won | lost', 'Closed outcome', { enum: ['won', 'lost'] }),
          f('close_date', 'date', true, 'ISO-8601 date', 'Closure date'),
          f('value', 'number', true, 'min 0', 'Deal value'),
          f('close_reason', 'string', false, 'max 1000', 'Closure reason'),
        ]),
      ),
    ],
    models: [
      model('archiveQuery', 'Archive query filter.', [
        f('outcome', 'string', false, 'won | lost', 'Archive outcome filter', { enum: ['won', 'lost'] }),
        dateFromField,
        dateToField,
      ]),
      model('archiveSummary', 'Archive response summary.', [
        f('deal_id', 'uuid', true, 'Deal id', 'Deal identifier'),
        f('outcome', 'string', true, 'won | lost', 'Closed outcome', { enum: ['won', 'lost'] }),
        f('close_date', 'date', true, 'ISO-8601 date', 'Closure date'),
      ]),
    ],
    operations: [op('View closed-won archive', 'crm_view'), op('View closed-lost archive', 'crm_view'), op('Export archive summary', 'crm_write')],
    endpoints: [
      ep('GET', '/api/v1/crm/archive/won', 'Return closed-won deals.', { requestModel: 'archiveQuery', responseModel: 'archiveSummary' }),
      ep('GET', '/api/v1/crm/archive/lost', 'Return closed-lost deals.', { requestModel: 'archiveQuery', responseModel: 'archiveSummary' }),
      ep('GET', '/api/v1/crm/archive/{deal_id}', 'Return archived deal detail.', { responseModel: 'archiveSummary' }),
    ],
    events: [
      ev('crm.archive.viewed', 'Archived deals viewed', 'sales_rep / manager / super_admin', '{ outcome }'),
      ev('crm.deal.archived', 'Closed deal persisted into archive', 'system', '{ deal_id, outcome }'),
    ],
    rules: [
      rule('Archive immutability', 'When reading archived deals', 'Provide read-only access and reject reactivation attempts.', 'Closed deals are terminal'),
      rule('Historical completeness', 'When archiving a deal', 'Retain closure context such as outcome, value, and close reason.', 'Supports later analysis'),
    ],
    dependencies: [
      ['402-crm-pipeline', 'Upstream', 'Closed deals originate from the CRM pipeline'],
      ['400-crm-dashboard', 'Related', 'Dashboard may summarize recent closed outcomes'],
    ],
    stateMachine: lifecycle(
      'Archived Deal Lifecycle',
      [
        { name: 'active', description: 'Deal is still on the live pipeline.', terminal: false },
        { name: 'closed_won', description: 'Deal closed as won.', terminal: false },
        { name: 'closed_lost', description: 'Deal closed as lost.', terminal: false },
        { name: 'archived', description: 'Deal retained for historical reads only.', terminal: true },
      ],
      [
        { from: 'active', to: 'closed_won', trigger: 'close_won()', guard: 'Deal accepted', sideEffects: 'Prepare archive record' },
        { from: 'active', to: 'closed_lost', trigger: 'close_lost()', guard: 'Deal declined or dropped', sideEffects: 'Prepare archive record' },
        { from: 'closed_won', to: 'archived', trigger: 'archive()', guard: 'Archive write succeeds', sideEffects: 'Emit crm.deal.archived' },
        { from: 'closed_lost', to: 'archived', trigger: 'archive()', guard: 'Archive write succeeds', sideEffects: 'Emit crm.deal.archived' },
      ],
      ['Archived deals are read-only and terminal.', 'Closed outcomes must be preserved during archive creation.'],
    ),
  },
  {
    id: '408-crm-settings',
    title: 'CRM Settings',
    domainKey: 'crm',
    overview:
      'The CRM Settings module manages CRM user roles, integration toggles, and sales automation settings such as auto-follow-up and email sync.',
    requirements: [
      req('Return effective CRM settings', 'The system shall expose current CRM settings and integration state.', [
        'Settings include integration and automation toggles.',
        'Responses show last updated actor and timestamp.',
        'Read access is limited to CRM configuration roles.',
      ]),
      req('Apply CRM configuration changes', 'The system shall allow approved actors to change CRM settings.', [
        'Each change records previous and new value.',
        'High-impact changes may require approval.',
        'Rollbacks remain available where supported.',
      ]),
      req('Manage CRM user roles', 'The system shall provision CRM users and update their roles.', [
        'CRM role updates are auditable.',
        'Provisioned users align with the shared role registry.',
        'Unsupported roles are rejected.',
      ]),
    ],
    entities: [
      entity(
        'CrmSetting',
        'CRM configuration setting.',
        withAudit([
          f('setting_key', 'string', true, 'unique', 'Setting identifier'),
          f('value_type', 'string', true, 'toggle, text, select', 'Value type', { enum: ['toggle', 'text', 'select'] }),
          f('value', 'string', true, 'Serialized value', 'Effective value'),
          f('status', 'string', true, 'proposed, approved, applied, rolled_back', 'Change lifecycle state', {
            enum: ['proposed', 'approved', 'applied', 'rolled_back'],
          }),
        ]),
      ),
      entity(
        'CrmUser',
        'CRM user or manager record.',
        withAudit([
          nameField,
          emailField,
          f('role', 'string', true, 'sales_rep | manager', 'CRM role', { enum: ['sales_rep', 'manager'] }),
          f('status', 'string', true, 'active | suspended', 'User status', { enum: ['active', 'suspended'] }),
        ]),
      ),
    ],
    models: [
      model('crmSettingUpdate', 'CRM setting update payload.', [
        f('setting_key', 'string', true, 'Existing setting id', 'Setting identifier'),
        f('value', 'string', true, 'Serialized value', 'New value'),
        f('approver_id', 'uuid', false, 'Optional approver', 'Approver'),
      ]),
      model('crmUserRoleUpdate', 'CRM user provisioning or role update payload.', [
        nameField,
        emailField,
        f('role', 'string', true, 'sales_rep | manager', 'CRM role', { enum: ['sales_rep', 'manager'] }),
      ]),
      model('crmSettingSummary', 'CRM settings response.', [
        f('record_id', 'uuid', true, 'Setting or user id', 'Record identifier'),
        f('status', 'string', true, 'Current status', 'Lifecycle status'),
        f('changed_by', 'uuid', false, 'Latest editor', 'Latest editor'),
      ]),
    ],
    operations: [op('View CRM settings', 'crm_config'), op('Update CRM settings', 'crm_config'), op('Provision or re-role CRM user', 'crm_config')],
    endpoints: [
      ep('GET', '/api/v1/crm/settings', 'Return effective CRM settings.', { responseModel: 'crmSettingSummary' }),
      ep('PATCH', '/api/v1/crm/settings', 'Update a CRM setting.', { requestModel: 'crmSettingUpdate', responseModel: 'crmSettingSummary' }),
      ep('POST', '/api/v1/crm/settings/users', 'Provision a CRM user.', { requestModel: 'crmUserRoleUpdate', responseModel: 'crmSettingSummary' }),
      ep('PATCH', '/api/v1/crm/settings/users/{id}/role', 'Update a CRM user role.', { requestModel: 'crmUserRoleUpdate', responseModel: 'crmSettingSummary' }),
    ],
    events: [
      ev('crm.setting.updated', 'CRM setting changed', 'manager / super_admin', '{ setting_key, previous_value, new_value }'),
      ev('crm.integration.toggled', 'CRM integration or automation toggle changed', 'manager / super_admin', '{ setting_key, value }'),
      ev('crm.user.role_changed', 'CRM user role changed', 'manager / super_admin', '{ user_id, role }'),
    ],
    rules: [
      rule('Manager-owned CRM config', 'When a CRM setting changes', 'Require manager or supported super admin action.', 'Maintains CRM ownership boundaries'),
      rule('Role whitelist', 'When a CRM user is provisioned or re-roled', 'Allow only sales_rep and manager roles in the CRM settings module.', 'Aligns with CRM actor model'),
    ],
    dependencies: [
      ['000-foundation', 'Shared', 'Uses the canonical role registry'],
      ['003-mfa', 'Related', 'High-impact settings may depend on stronger auth policies'],
    ],
    stateMachine: lifecycle(
      'CRM Setting Lifecycle',
      [
        { name: 'proposed', description: 'CRM setting change proposed.', terminal: false },
        { name: 'approved', description: 'CRM setting change approved.', terminal: false },
        { name: 'applied', description: 'CRM setting is effective.', terminal: false },
        { name: 'rolled_back', description: 'CRM setting reverted.', terminal: true },
      ],
      [
        { from: 'proposed', to: 'approved', trigger: 'approve()', guard: 'Approver present when required', sideEffects: 'Store approval evidence' },
        { from: 'approved', to: 'applied', trigger: 'apply()', guard: 'Validation passes', sideEffects: 'Emit crm.setting.updated' },
        { from: 'applied', to: 'rolled_back', trigger: 'rollback()', guard: 'Rollback supported and approved', sideEffects: 'Restore prior value' },
      ],
      ['Applied settings remain effective until another approved change supersedes or rolls them back.', 'Role changes always emit an audit event.'],
    ),
  },
  {
    id: '109-admin-performance',
    title: 'Admin Performance',
    domainKey: 'admin',
    overview: 'Performance tracking, time logging, attendance calendar, and HR-raised concerns.',
    requirements: [req('Track performance', 'Track attendance and clockify hours.', ['Record clock-ins'])],
    endpoints: [ep('GET', '/api/v1/admin/performance', 'Get performance records')]
  },
  {
    id: '110-admin-team',
    title: 'Admin Team',
    domainKey: 'admin',
    overview: 'Internal HR team management, role assignments, and permissions.',
    requirements: [req('Manage team', 'HR team provisioning.', ['Add HR members'])],
    endpoints: [ep('GET', '/api/v1/admin/team', 'Get HR team members')]
  },
  {
    id: '111-admin-analytics',
    title: 'Admin Analytics',
    domainKey: 'admin',
    overview: 'Platform analytics, conversion charts, and pipeline velocity metrics.',
    requirements: [req('View analytics', 'High-level reporting.', ['Show charts'])],
    endpoints: [ep('GET', '/api/v1/admin/analytics', 'Get admin analytics')]
  },
  {
    id: '207-candidate-performance',
    title: 'Candidate Performance',
    domainKey: 'candidate',
    overview: 'Candidate-facing performance dashboard, target hours, late alerts.',
    requirements: [req('View performance', 'Candidate sees own stats.', ['Show hours'])],
    endpoints: [ep('GET', '/api/v1/candidate/performance', 'Get own performance')]
  },
  {
    id: '308-client-milestones',
    title: 'Client Milestones',
    domainKey: 'client',
    overview: 'Project milestones, phase tracking, and deliverable sign-offs.',
    requirements: [req('Track milestones', 'Manage project phases.', ['Sign-off phases'])],
    endpoints: [ep('GET', '/api/v1/client/milestones', 'Get milestones')]
  },
  {
    id: '309-client-payment-methods',
    title: 'Client Payment Methods',
    domainKey: 'client',
    overview: 'Billing management, saved cards, ACH connections, and auto-pay settings.',
    requirements: [req('Manage billing', 'Save payment methods.', ['Add card'])],
    endpoints: [ep('GET', '/api/v1/client/payment-methods', 'Get saved cards')]
  },
  {
    id: '310-client-team',
    title: 'Client Team',
    domainKey: 'client',
    overview: 'Client-side team provisioning, role assignment.',
    requirements: [req('Manage client team', 'Client adds internal members.', ['Invite members'])],
    endpoints: [ep('GET', '/api/v1/client/team', 'Get client team members')]
  },
  {
    id: '311-client-notifications',
    title: 'Client Notifications',
    domainKey: 'client',
    overview: 'System-wide notifications, alert histories, and inbox.',
    requirements: [req('View notifications', 'Alerts and system messages.', ['Mark as read'])],
    endpoints: [ep('GET', '/api/v1/client/notifications', 'Get notifications')]
  },
  {
    id: '312-client-settings',
    title: 'Client Settings',
    domainKey: 'client',
    overview: 'Client profile, security (2FA), billing preferences, and danger zone actions.',
    requirements: [req('Manage settings', 'Update profile and security.', ['Enable 2FA'])],
    endpoints: [ep('GET', '/api/v1/client/settings', 'Get client settings')]
  },
  {
    id: '409-crm-companies',
    title: 'CRM Companies',
    domainKey: 'crm',
    overview: 'Account-level CRM management, hierarchy tracking, and firmographics.',
    requirements: [req('Manage companies', 'Account level records.', ['View hierarchy'])],
    endpoints: [ep('GET', '/api/v1/crm/companies', 'Get CRM companies')]
  },
  {
    id: '410-crm-jobs',
    title: 'CRM Jobs',
    domainKey: 'crm',
    overview: 'Job requisition tracking tied to CRM pipelines.',
    requirements: [req('Track jobs', 'Recruiting job boards.', ['View open roles'])],
    endpoints: [ep('GET', '/api/v1/crm/jobs', 'Get CRM jobs')]
  }
];

modules.forEach((module) => {
  module.actors ||= domainMeta[module.domainKey].roles;
  module.operations ||= [];
  module.models ||= [];
  module.entities ||= [];
  module.requirements ||= [];
  module.rules ||= [];
  module.tasks ||= [];
  module.metrics ||= [];
  module.risks ||= [];
  module.rollout ||= [];
  module.dependencies ||= [];
});

function renderApiYaml() {
  const grouped = groupByDomain();
  const lines = ['api_version: v1', `generated_at: ${TODAY}`, 'domains:'];
  Object.entries(grouped).forEach(([domain, mods]) => {
    lines.push(`  ${domain}:`);
    mods.forEach((module) => {
      lines.push(`    ${module.id}:`);
      module.endpoints.forEach((item) => {
        lines.push(`      - ${item.method} ${item.route}`);
      });
    });
  });
  return `${lines.join('\n')}\n`;
}

function renderEventsYaml() {
  const grouped = groupByDomain();
  const lines = ['generated_at: ' + TODAY, 'events:'];
  Object.entries(grouped).forEach(([domain, mods]) => {
    lines.push(`  ${domain}:`);
    mods.forEach((module) => {
      lines.push(`    ${module.id}:`);
      module.events.forEach((item) => {
        lines.push(`      - ${item.name}`);
      });
    });
  });
  return `${lines.join('\n')}\n`;
}

function renderInteractionsYaml() {
  const lines = ['generated_at: ' + TODAY, 'entities:'];
  modules.forEach((module) => {
    if (!module.stateMachine) return;
    lines.push(`  ${module.id}:`);
    lines.push(`    lifecycle: ${module.stateMachine.name}`);
    lines.push(`    states: [${module.stateMachine.states.map((item) => item.name).join(', ')}]`);
    lines.push('    transitions:');
    module.stateMachine.transitions.forEach((item) => {
      lines.push(`      - trigger: ${item.trigger}`);
      lines.push(`        from: ${item.from}`);
      lines.push(`        to: ${item.to}`);
    });
  });
  return `${lines.join('\n')}\n`;
}

function renderAccessYaml() {
  return `generated_at: ${TODAY}
roles:
  super_admin:
    foundation: ["read", "publish"]
    auth: ["login", "logout", "unlock", "provision"]
    admin: ["read", "write", "configure"]
    candidate: ["read", "support"]
    client: ["read", "support"]
    crm: ["read", "support", "configure"]
  hr_admin:
    foundation: ["read"]
    auth: ["login", "logout", "provision"]
    admin: ["read", "write"]
    candidate: ["read", "support"]
    client: []
    crm: []
  candidate:
    foundation: []
    auth: ["login", "register", "logout"]
    admin: []
    candidate: ["own_read", "own_write"]
    client: []
    crm: []
  client:
    foundation: []
    auth: ["login", "logout"]
    admin: []
    candidate: []
    client: ["own_read", "own_write"]
    crm: []
  sales_rep:
    foundation: ["read"]
    auth: ["login", "logout"]
    admin: []
    candidate: []
    client: []
    crm: ["read", "write"]
  manager:
    foundation: ["read"]
    auth: ["login", "logout"]
    admin: ["read"]
    candidate: ["read"]
    client: ["managed_read", "managed_write"]
    crm: ["read", "write", "configure"]
`;
}

function groupByDomain() {
  return modules.reduce((acc, module) => {
    acc[module.domainKey] ||= [];
    acc[module.domainKey].push(module);
    return acc;
  }, {});
}

function writeModule(module) {
  const dir = path.join(SPECS_ROOT, module.id);
  writeFile(path.join(dir, 'spec.md'), renderSpec(module));
  writeFile(path.join(dir, 'plan.md'), renderPlan(module));
  writeFile(path.join(dir, 'tasks.md'), renderTasks(module));
  writeFile(path.join(dir, 'changelog.md'), renderChangelog(module));
  writeFile(path.join(dir, 'metrics.md'), renderMetrics(module));
  writeFile(path.join(dir, 'risks.md'), renderRisks(module));
  writeFile(path.join(dir, 'rollout.md'), renderRollout(module));
  writeFile(path.join(dir, 'test-scenarios.md'), renderTests(module));
  writeFile(path.join(dir, 'validation-schema.json'), renderValidationSchema(module));
  writeFile(path.join(dir, 'rbac-matrix.md'), renderRbac(module));
  writeFile(path.join(dir, 'activity-log-events.md'), renderEvents(module));
  writeFile(path.join(dir, 'api-contracts.md'), renderApi(module));
  writeFile(path.join(dir, 'state-machines.md'), renderStateMachine(module));
}

modules.forEach(writeModule);
writeFile(path.join(CONTRACTS_ROOT, 'api.yaml'), renderApiYaml());
writeFile(path.join(CONTRACTS_ROOT, 'events.yaml'), renderEventsYaml());
writeFile(path.join(CONTRACTS_ROOT, 'interactions.yaml'), renderInteractionsYaml());
writeFile(path.join(CONTRACTS_ROOT, 'access-control.yaml'), renderAccessYaml());

console.log(`Generated ${modules.length} module specs and refreshed shared contracts.`);
