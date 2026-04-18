/**
 * COMPONENTS/BADGE.JS — Burkes Group Client Portal
 * Factory functions for rendering status, role, and category badges.
 * Returns HTML strings for inline injection.
 */

const Badge = (() => {
  // ── Status badge ──────────────────────────────────────────

  const STATUS_MAP = {
    // Document statuses
    uploaded: { variant: 'gray', label: 'Uploaded' },
    'under-review': { variant: 'amber', label: 'Under Review' },
    approved: { variant: 'green', label: 'Approved' },
    rejected: { variant: 'red', label: 'Rejected' },
    'needs-signature': { variant: 'blue', label: 'Needs Signature' },
    signed: { variant: 'green', label: 'Signed' },
    'requires-revision': { variant: 'amber', label: 'Needs Revision' },

    // Insurance statuses
    NOT_STARTED: { variant: 'gray', label: 'Not Started' },
    PENDING: { variant: 'amber', label: 'Pending' },
    COMPLETED: { variant: 'green', label: 'Complete' },
    'not-started': { variant: 'gray', label: 'Not Started' },
    pending: { variant: 'amber', label: 'Pending' },
    completed: { variant: 'green', label: 'Complete' },

    // Mortgage statuses
    IN_PROGRESS: { variant: 'amber', label: 'In Progress' },
    SUBMITTED: { variant: 'navy', label: 'Submitted' },
    INCOMPLETE: { variant: 'gray', label: 'Incomplete' },
    'in-progress': { variant: 'amber', label: 'In Progress' },
    submitted: { variant: 'navy', label: 'Submitted' },
    incomplete: { variant: 'gray', label: 'Incomplete' },

    // Transaction stages
    underwriting: { variant: 'amber', label: 'Underwriting' },
    closing: { variant: 'blue', label: 'Closing' },
    closed: { variant: 'green', label: 'Closed' },
    active: { variant: 'green', label: 'Active' },
    'on-hold': { variant: 'amber', label: 'On Hold' },
  };

  /**
   * Render a status badge.
   * @param {string} status — Key from STATUS_MAP or raw string
   * @param {string} [override] — Override display label
   */
  function status(statusKey, override) {
    const def = STATUS_MAP[statusKey] || { variant: 'gray', label: statusKey || '—' };
    const label = override || def.label;
    return `<span class="badge badge--${def.variant}" title="${label}">${label}</span>`;
  }

  // ── Role badge ────────────────────────────────────────────

  const ROLE_MAP = {
    CL: { cssClass: 'role-badge--cl', label: 'Client' },
    AG: { cssClass: 'role-badge--ag', label: 'Agent' },
    LN: { cssClass: 'role-badge--ln', label: 'Lender' },
    AT: { cssClass: 'role-badge--at', label: 'Attorney' },
    CP: { cssClass: 'role-badge--cp', label: 'CPA' },
    TC: { cssClass: 'role-badge--tc', label: 'Coordinator' },
  };

  /**
   * Render a role badge.
   * @param {string} roleCode — CL | AG | LN | AT | CP | TC
   */
  function role(roleCode) {
    const def = ROLE_MAP[roleCode] || { cssClass: 'role-badge--cl', label: roleCode };
    return `<span class="role-badge ${def.cssClass}">${def.label}</span>`;
  }

  // ── Document category badge ───────────────────────────────

  const CATEGORY_MAP = {
    PURCHASE: { cssClass: 'doc-category--purchase', label: 'Purchase' },
    FINANCIAL: { cssClass: 'doc-category--financial', label: 'Financial' },
    LEGAL: { cssClass: 'doc-category--legal', label: 'Legal' },
    OTHER: { cssClass: 'doc-category--other', label: 'Other' },
    purchase: { cssClass: 'doc-category--purchase', label: 'Purchase' },
    financial: { cssClass: 'doc-category--financial', label: 'Financial' },
    legal: { cssClass: 'doc-category--legal', label: 'Legal' },
    other: { cssClass: 'doc-category--other', label: 'Other' },
  };

  /**
   * Render a document category badge.
   * @param {string} category — PURCHASE | FINANCIAL | LEGAL | OTHER
   */
  function category(cat) {
    const def = CATEGORY_MAP[cat] || CATEGORY_MAP.OTHER;
    return `<span class="doc-category-badge ${def.cssClass}">${def.label}</span>`;
  }

  // ── Generic colored badge ─────────────────────────────────

  /**
   * Render a badge with explicit variant.
   * @param {string} label
   * @param {'green'|'amber'|'blue'|'gray'|'red'|'navy'} variant
   */
  function custom(label, variant = 'gray') {
    return `<span class="badge badge--${variant}">${label}</span>`;
  }

  return { status, role, category, custom };
})();

window.Badge = Badge;
