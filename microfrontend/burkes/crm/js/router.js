/**
 * Burkes Group CRM — SPA Router
 * Source: index.yaml (screens inventory), layout.yaml
 * Batch: 1 of 7 — Foundation (Phase 0)
 * Status: COMPLETE
 */

window.Router = (() => {

  const routes = {
    '':              'dashboard',
    'dashboard':     'dashboard',
    'contacts':      'contacts',
    'pipeline':      'pipeline',
    'activities':    'activities',
    'calendar':      'calendar',
    'calls':         'calls',
    'sms':           'sms',
    'email':         'email',
    'email-blast':   'emailBlast',
    'video-meetings':'videoMeetings',
    'insurance':     'insurance',
    'mortgage':      'mortgage',
    'real-estate':   'realEstate',
    'integrations':  'integrations',
    'reports':       'reports',
    'admin':         'admin'
  };

  // Nav item config
  const navItems = {
    Main: [
      { key: 'dashboard',   label: 'Dashboard',    hash: '',             icon: 'layouts' },
      { key: 'contacts',    label: 'Contacts',     hash: 'contacts',     icon: 'users' },
      { key: 'pipeline',    label: 'Pipeline',     hash: 'pipeline',     icon: 'activity' },
      { key: 'activities',  label: 'Activities',   hash: 'activities',   icon: 'chart' },
      { key: 'calendar',    label: 'Calendar',     hash: 'calendar',     icon: 'calendar' },
    ],
    Communications: [
      { key: 'calls',       label: 'Calls',        hash: 'calls',        icon: 'phone' },
      { key: 'sms',         label: 'SMS',          hash: 'sms',          icon: 'message' },
      { key: 'email',       label: 'Email',        hash: 'email',        icon: 'mail' },
      { key: 'email-blast', label: 'Email Blast',  hash: 'email-blast',  icon: 'send' },
      { key: 'video-meetings', label: 'Video Meetings', hash: 'video-meetings', icon: 'video' },
    ],
    Departments: [
      { key: 'insurance',   label: 'Insurance',    hash: 'insurance',    icon: 'shield' },
      { key: 'mortgage',    label: 'Mortgage',     hash: 'mortgage',     icon: 'bank' },
      { key: 'real-estate', label: 'Real Estate',  hash: 'real-estate',  icon: 'home' },
    ],
    'Tools & Admin': [
      { key: 'integrations',label: 'Integrations', hash: 'integrations', icon: 'link' },
      { key: 'reports',     label: 'Reports',      hash: 'reports',      icon: 'chart' },
      { key: 'admin',       label: 'Admin Settings',hash: 'admin',       icon: 'settings' },
    ]
  };

  function getCurrentRoute() {
    const hash = window.location.hash.replace('#/', '').replace('#', '').split('?')[0];
    return hash || '';
  }

  function navigate(hash) {
    window.location.hash = hash ? `#/${hash}` : '#';
    handleRoute();
  }

  function handleRoute() {
    const hash = getCurrentRoute();
    const screenKey = routes[hash] || 'dashboard';

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.hash === hash || (hash === '' && el.dataset.hash === '')) {
        el.classList.add('active');
      }
    });

    // Load screen
    const content = document.getElementById('content');
    if (!content) return;

    const screen = window.Screens && window.Screens[screenKey];
    if (screen && typeof screen.render === 'function') {
      content.innerHTML = `<div class="screen-wrapper">${screen.render()}</div>`;
      if (typeof screen.init === 'function') screen.init();
    } else {
      content.innerHTML = `<div class="screen-wrapper">${renderStub(screenKey, hash)}</div>`;
    }

    // Close mobile sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth <= 992) {
      sidebar.classList.remove('open');
    }
  }

  function renderStub(screenKey, hash) {
    return `
      <div class="screen-header">
        <div class="screen-title">
          <h1>${hash.charAt(0).toUpperCase() + hash.slice(1).replace(/-/g,' ') || 'Dashboard'}</h1>
          <p>Screen coming soon</p>
        </div>
      </div>
      <div class="card" style="padding:var(--space-9);text-align:center">
        <div style="font-size:48px;margin-bottom:var(--space-4)">🚧</div>
        <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-primary-navy);margin-bottom:var(--space-2)">${screenKey} screen</div>
        <div style="color:var(--neutral-400);font-size:var(--text-sm)">This screen is being implemented. Navigate to Dashboard or Contacts.</div>
      </div>`;
  }

  function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const { Icons } = window.Components;
    const currentHash = getCurrentRoute();

    sidebar.innerHTML = `
      <div class="sidebar-brand">
        <div class="sidebar-brand-logo">BG</div>
        <div class="sidebar-brand-text">
          <div class="sidebar-brand-name">Burkes Group</div>
          <div class="sidebar-brand-sub">CRM Platform</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${Object.entries(navItems).map(([group, items]) => `
          <div class="nav-group">
            <div class="nav-group-label">${group}</div>
            ${items.map(item => `
              <div class="nav-item ${(currentHash === item.hash || (item.hash === '' && currentHash === '')) ? 'active' : ''}"
                   data-hash="${item.hash}"
                   onclick="Router.navigate('${item.hash}')">
                <span class="nav-item-icon">${Icons[item.icon] || ''}</span>
                <span>${item.label}</span>
                ${item.key === 'sms' ? '<span style="margin-left:auto;background:var(--color-danger);color:white;font-size:9px;font-weight:700;border-radius:99px;padding:1px 5px">3</span>' : ''}
                ${item.key === 'email' ? '<span style="margin-left:auto;background:var(--color-primary-gold);color:var(--color-primary-navy);font-size:9px;font-weight:700;border-radius:99px;padding:1px 5px">7</span>' : ''}
              </div>`).join('')}
          </div>`).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-footer-version">v1.1.0 · Phase 2</div>
      </div>`;
  }

  function renderTopNav() {
    const topNav = document.getElementById('top-nav');
    if (!topNav) return;
    const { Icons } = window.Components;
    const currentUser = window.MockData.users[0]; // JB as default

    topNav.innerHTML = `
      <button class="nav-toggle" onclick="Router.toggleSidebar()">${Icons.menu}</button>
      <div class="nav-search">
        <span class="nav-search-icon">${Icons.search}</span>
        <input class="nav-search-input" type="text" placeholder="Search contacts, leads, activities…">
      </div>
      <div class="nav-quick-actions">
        <button class="nav-action-btn primary" onclick="Router.quickAction('new-lead')">
          ${Icons.plus}<span>New Lead</span>
        </button>
        <button class="nav-action-btn" onclick="Router.navigate('calls')" title="Dial">
          ${Icons.phone}<span>Dial</span>
        </button>
        <button class="nav-action-btn" onclick="Router.navigate('sms')" title="SMS">
          ${Icons.message}<span>SMS</span>
        </button>
        <button class="nav-action-btn" onclick="Router.navigate('email')" title="Email">
          ${Icons.mail}<span>Email</span>
        </button>
        <button class="nav-action-btn" onclick="Router.navigate('video-meetings')" title="Meet">
          ${Icons.video}<span>Meet</span>
        </button>
      </div>
      <div class="nav-controls">
        <button class="nav-icon-btn" title="Notifications">
          ${Icons.bell}
          <span class="nav-badge">4</span>
        </button>
        <div class="nav-user" onclick="Router.navigate('admin')">
          <div class="nav-user-avatar">${currentUser.initials}</div>
          <div class="nav-user-info">
            <span class="nav-user-name">${currentUser.full_name}</span>
            <span class="nav-user-role">Dept. Owner · Insurance</span>
          </div>
          ${Icons.chevronDown}
        </div>
      </div>`;
  }

  function renderVoipBar() {
    const bar = document.getElementById('voip-bar');
    if (!bar) return;
    bar.innerHTML = `
      <div class="voip-indicator">
        <span class="voip-dot"></span>
        <span>VOIP Ready</span>
      </div>
      <div class="voip-status-text">Provider: <strong>Active</strong></div>
      <div class="voip-bar-spacer"></div>
      <div class="voip-bar-right">
        <span>📋 Compliance recording: Auto</span>
        <span>·</span>
        <span>Retention: Department policy</span>
        <span>·</span>
        <span>🔒 Burkes Group Marketing LLC</span>
      </div>`;
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  }

  function quickAction(type) {
    if (type === 'new-lead') {
      Components.openModal(Components.Modal({
        id: 'new-contact',
        title: 'New Contact',
        subtitle: 'Add a customer to the CRM',
        steps: [
          { label: 'Identity', active: true },
          { label: 'Department' },
          { label: 'Enrichment' }
        ],
        body: `
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">First Name</label>
              <input class="form-input" placeholder="First name">
            </div>
            <div class="form-group">
              <label class="form-label required">Last Name</label>
              <input class="form-input" placeholder="Last name">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label required">Phone</label>
            <input class="form-input" placeholder="(555) 000-0000">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" placeholder="email@example.com">
          </div>
          <div class="form-group">
            <label class="form-label required">Source</label>
            <select class="form-select">
              <option>Manual entry</option><option>Portal intake</option><option>Referral</option><option>Import</option>
            </select>
          </div>`,
        footerRight: `
          <button class="btn btn-secondary" onclick="Components.closeModal('new-contact')">Cancel</button>
          <button class="btn btn-primary">Next: Department →</button>`
      }));
    }
  }

  function init() {
    renderSidebar();
    renderTopNav();
    renderVoipBar();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
  }

  return { navigate, handleRoute, toggleSidebar, quickAction, init, routes, navItems };

})();