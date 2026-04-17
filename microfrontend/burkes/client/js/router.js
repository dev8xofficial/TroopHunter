/* ============================================================
   router.js — Hash-based screen router
   ============================================================ */
const Router = (() => {
  let screens = {};
  let current = null;

  function navigate(route) {
    if (!screens[route]) return;
    if (current) {
      const prev = document.getElementById(`screen-${current}`);
      if (prev) prev.classList.remove('active');
    }
    current = route;
    const el = document.getElementById(`screen-${route}`);
    if (el) el.classList.add('active');

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.route === route);
    });

    window.location.hash = route;
    if (screens[route].onActivate) screens[route].onActivate();
  }

  function register(route, opts) { screens[route] = opts; }

  function init() {
    window.addEventListener('hashchange', () => {
      const r = window.location.hash.slice(1) || 'dashboard';
      navigate(r);
    });
    const initial = window.location.hash.slice(1) || 'dashboard';
    navigate(initial);
  }

  return { navigate, register, init };
})();

window.Router = Router;


/* ============================================================
   badge.js — Status badge factory
   ============================================================ */
const Badge = (() => {
  const STATUS_MAP = {
    // Document statuses
    'APPROVED':          { cls: 'badge-green', icon: '✓', label: 'Approved' },
    'UNDER_REVIEW':      { cls: 'badge-amber', icon: '⏳', label: 'Under Review' },
    'NEEDS_SIGNATURE':   { cls: 'badge-blue',  icon: '✍️', label: 'Needs Signature' },
    'NEEDS_REVIEW':      { cls: 'badge-amber', icon: '👁', label: 'Needs Review' },
    // Insurance statuses
    'COMPLETED':         { cls: 'badge-green', icon: '✓', label: 'Completed' },
    'PENDING':           { cls: 'badge-amber', icon: '⏳', label: 'Pending' },
    'NOT_STARTED':       { cls: 'badge-gray',  icon: '○',  label: 'Not Started' },
    // Mortgage statuses
    'SUBMITTED':         { cls: 'badge-green', icon: '✓', label: 'Submitted' },
    'IN_PROGRESS':       { cls: 'badge-amber', icon: '⏳', label: 'In Progress' },
    'INCOMPLETE':        { cls: 'badge-gray',  icon: '○',  label: 'Incomplete' },
    // Stage statuses
    'completed':         { cls: 'badge-green', icon: '✓', label: 'Complete' },
    'current':           { cls: 'badge-amber', icon: '●',  label: 'In Progress' },
    'pending':           { cls: 'badge-gray',  icon: '○',  label: 'Upcoming' },
    // Generic
    'active':            { cls: 'badge-green', icon: '●',  label: 'Active' },
    'overdue':           { cls: 'badge-red',   icon: '!',  label: 'Overdue' },
    'info':              { cls: 'badge-navy',  icon: 'ℹ',  label: 'Info' },
  };

  function render(status, opts = {}) {
    const def = STATUS_MAP[status] || { cls: 'badge-gray', icon: '?', label: status };
    const label = opts.label !== undefined ? opts.label : def.label;
    return `<span class="badge ${def.cls}" title="${label}">${label}</span>`;
  }

  function roleBadge(role, opts = {}) {
    const sz = opts.large ? 'role-badge-lg' : '';
    return `<span class="role-badge ${sz} role-badge-${role.toLowerCase()}">${role}</span>`;
  }

  return { render, roleBadge };
})();

window.Badge = Badge;


/* ============================================================
   alert-banner.js — Alert banner component
   ============================================================ */
const AlertBanner = (() => {
  const ICONS = {
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  };

  function render({ type = 'info', title, desc, cta, dismissible = true, id }) {
    const icon = ICONS[type] || ICONS.info;
    const btnHtml = cta ? `<button class="btn btn-sm btn-${type === 'error' ? 'danger' : 'primary'}" onclick="${cta.action}">${cta.label}</button>` : '';
    const dismissHtml = dismissible ? `<button class="alert-banner-dismiss" onclick="AlertBanner.dismiss('${id || type}')" aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>` : '';
    return `
      <div class="alert-banner alert-banner-${type}" data-alert-id="${id || type}">
        <span class="alert-banner-icon">${icon}</span>
        <div class="alert-banner-body">
          <div class="alert-banner-title">${title}</div>
          ${desc ? `<div class="alert-banner-desc">${desc}</div>` : ''}
        </div>
        <div class="alert-banner-actions">${btnHtml}${dismissHtml}</div>
      </div>`;
  }

  function show(opts) {
    const slot = document.getElementById('alert-banner-slot');
    if (!slot) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = render(opts);
    slot.appendChild(wrapper.firstElementChild);
  }

  function dismiss(id) {
    const el = document.querySelector(`[data-alert-id="${id}"]`);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-4px)';
      el.style.transition = 'all 0.2s ease';
      setTimeout(() => el.remove(), 200);
    }
  }

  function clearAll() {
    const slot = document.getElementById('alert-banner-slot');
    if (slot) slot.innerHTML = '';
  }

  return { render, show, dismiss, clearAll };
})();

window.AlertBanner = AlertBanner;


/* ============================================================
   utils.js — Shared utilities
   ============================================================ */
const Utils = (() => {
  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60)   return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
    const days = Math.floor(diff / 86400);
    if (days === 1)  return 'yesterday';
    if (days < 30)   return `${days}d ago`;
    return formatDate(iso);
  }

  function fileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / 86400000);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fileIcon(filename) {
    const ext = (filename || '').split('.').pop().toLowerCase();
    if (ext === 'pdf') return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
  }

  const ICONS = {
    grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    bank: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
    wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`,
    upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>`,
    paperclip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  };

  return { formatDate, timeAgo, fileSize, daysUntil, escHtml, fileIcon, ICONS };
})();

window.Utils = Utils;