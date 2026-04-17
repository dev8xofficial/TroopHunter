/* shell.js — Global nav bar and shell initialization */

const Shell = (() => {
  function renderNav() {
    const nav = document.getElementById('global-nav');
    if (!nav) return;

    const role = Session.roleInfo;
    const tx = window.TX;

    const navItems = [
      { route: 'dashboard', icon: 'grid',   label: 'Dashboard' },
      { route: 'documents', icon: 'folder', label: 'Documents' },
      { route: 'messages',  icon: 'chat',   label: 'Messages' },
      { route: 'insurance', icon: 'shield', label: 'Insurance',
        hidden: !['CL','LN','AT','TC'].includes(Session.role) },
      { route: 'mortgage',  icon: 'bank',   label: 'Mortgage',
        hidden: !['CL','LN','TC'].includes(Session.role) },
      { route: 'services',  icon: 'wrench', label: 'Services',
        hidden: !['CL','AG','TC'].includes(Session.role) },
    ];

    const addr = tx?.property_address;
    const addrStr = addr ? `${addr.street}, ${addr.city}` : 'Transaction';

    const itemsHtml = navItems
      .filter(i => !i.hidden)
      .map(i => `
        <a class="nav-item" data-route="${i.route}" href="#${i.route}" onclick="Router.navigate('${i.route}'); return false;" aria-label="${i.label}">
          <span class="nav-icon">${Utils.ICONS[i.icon]}</span>
          <span class="nav-label">${i.label}</span>
        </a>
      `).join('');

    const roleOptions = Object.entries(Session.ROLES).map(([k, v]) => `
      <button class="nav-role-option ${Session.role === k ? 'current' : ''}" onclick="Shell.switchRole('${k}')">
        <span class="role-badge role-badge-${k.toLowerCase()}">${k}</span>
        <span>
          <div class="nav-role-option-name">${v.name}</div>
          <div class="nav-role-option-label">${v.label}</div>
        </span>
      </button>
    `).join('');

    // Count unread messages
    const unread = (window.MOCK_MESSAGES || []).reduce((n, c) => n + (c.unread_count || 0), 0);

    nav.innerHTML = `
      <a class="nav-logo" href="#dashboard" onclick="Router.navigate('dashboard'); return false;">
        <div class="nav-logo-mark">BG</div>
        <div class="nav-logo-text"><span>Burkes</span> Group</div>
      </a>

      <div class="nav-transaction-pill">
        <strong>TXN</strong> · ${addrStr}
      </div>

      <nav class="nav-items" role="navigation" aria-label="Main navigation">
        ${itemsHtml}
      </nav>

      <div class="nav-spacer"></div>

      <button class="nav-bell-btn" onclick="Shell.toggleNotifications()" aria-label="Notifications">
        ${Utils.ICONS.bell}
        ${unread > 0 ? '<span class="nav-bell-badge" aria-label="' + unread + ' unread messages"></span>' : ''}
      </button>

      <div class="nav-role-switcher" id="nav-role-switcher">
        <button class="nav-role-btn" onclick="Shell.toggleRoleDropdown()" aria-label="Switch role — currently ${role.label}">
          <span class="nav-role-avatar role-badge-${Session.role.toLowerCase()}">${Session.role}</span>
          <span style="max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${role.name.split(' ')[0]}</span>
          <span style="opacity:.6;width:12px;height:12px;display:flex">${Utils.ICONS.chevronDown}</span>
        </button>
        <div class="nav-role-dropdown" id="nav-role-dropdown">
          <div class="nav-role-dropdown-header">Demo — Switch Role</div>
          ${roleOptions}
        </div>
      </div>
    `;
  }

  function switchRole(role) {
    Session.setRole(role);
    document.getElementById('nav-role-dropdown')?.classList.remove('open');
    renderNav();

    // Refresh current screen
    const active = document.querySelector('.screen.active');
    if (active) {
      const route = active.id.replace('screen-', '');
      Router.navigate(route);
    }

    // Show role toast
    showToast(`Viewing as ${Session.roleInfo.label}`, 'info');
  }

  function toggleRoleDropdown() {
    document.getElementById('nav-role-dropdown')?.classList.toggle('open');
  }

  function toggleNotifications() {
    showToast(`${Session.roleInfo.name} — No new notifications`, 'info');
  }

  let toastTimer;
  function showToast(msg, type = 'info') {
    let toast = document.getElementById('portal-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portal-toast';
      toast.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; z-index: 400;
        background: var(--color-navy); color: white;
        padding: 12px 20px; border-radius: 10px;
        font-size: 13px; font-family: var(--font-body); font-weight: 500;
        box-shadow: var(--shadow-lg);
        transition: all 0.25s cubic-bezier(.4,0,.2,1);
        opacity: 0; transform: translateY(8px);
        max-width: 320px; line-height: 1.4;
      `;
      document.body.appendChild(toast);
    }
    if (type === 'success') toast.style.background = 'var(--color-success-dark)';
    else if (type === 'error') toast.style.background = 'var(--color-error-dark)';
    else toast.style.background = 'var(--color-navy)';

    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
    }, 3000);
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('#nav-role-switcher')) {
      document.getElementById('nav-role-dropdown')?.classList.remove('open');
    }
  });

  document.addEventListener('session:changed', () => renderNav());

  return { renderNav, switchRole, toggleRoleDropdown, toggleNotifications, showToast };
})();

window.Shell = Shell;