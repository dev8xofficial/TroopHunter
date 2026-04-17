/* session.js — Simulated session context */

const Session = (() => {
  const ROLES = {
    CL: { label: 'Client',               abbrev: 'CL', colorClass: 'role-badge-cl', name: 'Sarah Chen' },
    AG: { label: 'Real Estate Agent',    abbrev: 'AG', colorClass: 'role-badge-ag', name: 'Michael Garcia' },
    LN: { label: 'Mortgage Lender',      abbrev: 'LN', colorClass: 'role-badge-ln', name: 'Jennifer Walsh' },
    AT: { label: 'Closing Attorney',     abbrev: 'AT', colorClass: 'role-badge-at', name: 'David Norton' },
    TC: { label: 'Transaction Coordinator', abbrev: 'TC', colorClass: 'role-badge-tc', name: 'Michelle Rodriguez' },
  };

  let current = {
    role: 'CL',
    transaction_id: 'TXN-0000000001',
    user_id: 'CL-000001',
    expires_at: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
  };

  return {
    get role()           { return current.role; },
    get transaction_id() { return current.transaction_id; },
    get user_id()        { return current.user_id; },
    get roleInfo()       { return ROLES[current.role]; },
    get name()           { return ROLES[current.role].name; },
    get ROLES()          { return ROLES; },

    setRole(role) {
      if (!ROLES[role]) return;
      current.role = role;
      current.user_id = `${role}-000001`;
      document.dispatchEvent(new CustomEvent('session:changed', { detail: { role } }));
    },

    canUpload(category) {
      const r = current.role;
      const map = {
        CL: ['OTHER', 'FINANCIAL'],
        AG: ['PURCHASE'],
        LN: ['FINANCIAL'],
        AT: ['LEGAL'],
        TC: ['PURCHASE', 'FINANCIAL', 'LEGAL', 'OTHER'],
      };
      return (map[r] || []).includes(category);
    },

    canSeeCategory(category) {
      const r = current.role;
      if (r === 'CP') return ['FINANCIAL', 'LEGAL'].includes(category);
      if (r === 'AG') return category !== 'FINANCIAL';
      if (r === 'LN') return category !== 'LEGAL';
      return true;
    },

    canEditInsurance() { return current.role === 'CL' || current.role === 'TC'; },
    canSeeInsurance(type) {
      const r = current.role;
      if (r === 'CL' || r === 'TC') return true;
      if (r === 'LN') return type === 'HOME' || type === 'AUTO';
      if (r === 'AT') return type === 'HOME' || type === 'WARRANTY';
      return false;
    },

    isVisible(event) {
      const roles = event.visibility?.visible_to_roles || [];
      return roles.includes(current.role);
    },
  };
})();

window.Session = Session;