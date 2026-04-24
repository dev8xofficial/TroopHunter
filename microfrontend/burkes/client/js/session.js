/**
 * SESSION.JS — Burkes Group Client Portal
 * Simulates a JWT-based authenticated session.
 * Exposes role, user identity, and transaction context.
 * Role switcher available in nav for demo purposes.
 */

const Session = (() => {
  // ── Role definitions ──────────────────────────────────────

  const ROLES = {
    CL: {
      code: 'CL',
      label: 'Client',
      badgeClass: 'role-badge--cl',
      avatarClass: 'person-avatar--cl',
      navItems: ['dashboard', 'documents', 'messages', 'insurance', 'mortgage', 'services'],
      canUpload: true,
      canSign: true,
      canViewFinancial: true,
      canViewLegal: true,
    },
    AG: {
      code: 'AG',
      label: 'Agent',
      badgeClass: 'role-badge--ag',
      avatarClass: 'person-avatar--ag',
      navItems: ['dashboard', 'documents', 'messages', 'services'],
      canUpload: true,
      canSign: false,
      canViewFinancial: false,
      canViewLegal: false,
    },
    LN: {
      code: 'LN',
      label: 'Lender',
      badgeClass: 'role-badge--ln',
      avatarClass: 'person-avatar--ln',
      navItems: ['dashboard', 'documents', 'messages', 'insurance', 'mortgage'],
      canUpload: true,
      canSign: false,
      canViewFinancial: true,
      canViewLegal: false,
    },
    AT: {
      code: 'AT',
      label: 'Attorney',
      badgeClass: 'role-badge--at',
      avatarClass: 'person-avatar--at',
      navItems: ['dashboard', 'documents', 'messages', 'insurance'],
      canUpload: true,
      canSign: false,
      canViewFinancial: false,
      canViewLegal: true,
    },
    CP: {
      code: 'CP',
      label: 'CPA',
      badgeClass: 'role-badge--cp',
      avatarClass: 'person-avatar--cp',
      navItems: ['dashboard', 'documents', 'messages'],
      canUpload: false,
      canSign: false,
      canViewFinancial: true,
      canViewLegal: false,
    },
    TC: {
      code: 'TC',
      label: 'Coordinator',
      badgeClass: 'role-badge--tc',
      avatarClass: 'person-avatar--tc',
      navItems: ['dashboard', 'documents', 'messages', 'insurance', 'mortgage', 'services'],
      canUpload: true,
      canSign: false,
      canViewFinancial: true,
      canViewLegal: true,
    },
  };

  // ── Users per role (demo personas) ───────────────────────

  const USERS = {
    CL: { id: 'CL-000001', name: 'Sarah Chen', initials: 'SC' },
    AG: { id: 'AG-000001', name: 'Michael Garcia', initials: 'MG' },
    LN: { id: 'LN-000001', name: 'Jennifer Walsh', initials: 'JW' },
    AT: { id: 'AT-000001', name: 'David Norton', initials: 'DN' },
    CP: { id: 'CP-000001', name: 'Patricia Lee', initials: 'PL' },
    TC: { id: 'TC-000001', name: 'Michelle Rodriguez', initials: 'MR' },
  };

  // ── State ─────────────────────────────────────────────────

  let _currentRole = 'CL';
  const TRANSACTION_ID = 'TXN-0000000001';

  // Persist role across page refreshes
  const _stored = sessionStorage.getItem('portal_role');
  if (_stored && ROLES[_stored]) _currentRole = _stored;

  // ── Public API ────────────────────────────────────────────

  const session = {
    get role() {
      return _currentRole;
    },
    get roleData() {
      return ROLES[_currentRole];
    },
    get user() {
      return USERS[_currentRole];
    },
    get transaction_id() {
      return TRANSACTION_ID;
    },

    /** Check if current role can see a nav item */
    canSee(screen) {
      return ROLES[_currentRole].navItems.includes(screen);
    },

    /** Check permission flag */
    can(action) {
      const map = {
        upload: 'canUpload',
        sign: 'canSign',
        viewFinancial: 'canViewFinancial',
        viewLegal: 'canViewLegal',
      };
      return !!ROLES[_currentRole][map[action]];
    },

    /** Switch role (demo use only) */
    switchRole(roleCode) {
      if (!ROLES[roleCode]) {
        console.warn(`Session.switchRole: unknown role "${roleCode}"`);
        return;
      }
      _currentRole = roleCode;
      sessionStorage.setItem('portal_role', roleCode);

      // Emit custom event so shell can re-render
      window.dispatchEvent(
        new CustomEvent('session:roleChanged', {
          detail: { role: roleCode },
        }),
      );
    },

    /** All available role codes */
    get allRoles() {
      return Object.keys(ROLES);
    },

    /** Render a role badge element (string) */
    roleBadgeHTML(roleCode) {
      const r = ROLES[roleCode] || ROLES[_currentRole];
      return `<span class="role-badge ${r.badgeClass}">${r.label}</span>`;
    },

    /** Formatted display of current user + role */
    get displayName() {
      return USERS[_currentRole].name;
    },

    /** Current initials for avatar */
    get initials() {
      return USERS[_currentRole].initials;
    },
  };

  return session;
})();

// Export to global scope
window.Session = Session;
