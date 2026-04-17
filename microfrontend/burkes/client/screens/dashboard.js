/* screens/dashboard.js — 001-dashboard */

const ScreenDashboard = (() => {
  function render() {
    const tx = window.TX;
    const metrics = computeMetrics(tx);
    const role = Session.role;

    AlertBanner.clearAll();

    // Show action-required alerts
    if (metrics.needsSignature > 0 && ['CL','TC'].includes(role)) {
      AlertBanner.show({
        type: 'warning',
        id: 'sig-required',
        title: `${metrics.needsSignature} document${metrics.needsSignature > 1 ? 's' : ''} awaiting your signature`,
        desc: 'The Closing Disclosure and Loan Estimate require your review and signature.',
        cta: { label: 'View Documents', action: "Router.navigate('documents')" },
        dismissible: false,
      });
    }

    if (role === 'LN') {
      AlertBanner.show({
        type: 'info',
        id: 'underwriting',
        title: 'Underwriting in progress — 2 conditions outstanding',
        desc: 'Employment letter and April pay stub still needed from client.',
        cta: { label: 'Message Client', action: "Router.navigate('messages')" },
        dismissible: true,
      });
    }

    const daysLeft = Utils.daysUntil(tx.closing_date);
    const daysColor = daysLeft < 8 ? 'badge-red' : daysLeft < 20 ? 'badge-amber' : 'badge-green';

    const screenEl = document.getElementById('screen-dashboard');
    screenEl.innerHTML = `
      <div class="page-header">
        <div class="page-header-content">
          <h1 class="page-title">Welcome back, ${tx.client_name.split(' ')[0]}</h1>
          <p class="page-subtitle">
            ${tx.property_address.street}, ${tx.property_address.city}, ${tx.property_address.state} &nbsp;·&nbsp;
            Closing target: ${Utils.formatDate(tx.closing_date)}
          </p>
        </div>
        <div class="page-actions">
          <span class="badge ${daysColor}" style="font-size:13px;padding:6px 14px;">
            ${daysLeft} days to close
          </span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-4" style="margin-bottom:var(--space-6)">
        ${renderStatCard({
          icon: 'grid', iconBg: '#dbeafe', iconColor: '#2563eb',
          value: `${metrics.progress}%`,
          label: 'Transaction Progress',
          sub: `Stage ${tx.current_stage} of 11`,
          accent: 'var(--color-accent-blue)',
        })}
        ${renderStatCard({
          icon: 'folder', iconBg: '#dcfce7', iconColor: '#16a34a',
          value: metrics.docsTotal,
          label: 'Documents on File',
          sub: `${metrics.needsSignature} need${metrics.needsSignature !== 1 ? '' : 's'} action`,
          accent: 'var(--color-success)',
        })}
        ${renderStatCard({
          icon: 'shield', iconBg: metrics.insuranceComplete === 3 ? '#dcfce7' : '#fef3c7',
          iconColor: metrics.insuranceComplete === 3 ? '#16a34a' : '#d97706',
          value: `${metrics.insuranceComplete}/3`,
          label: 'Insurance Policies',
          sub: metrics.insuranceComplete === 3 ? 'All policies complete' : 'Warranty policy pending',
          accent: metrics.insuranceComplete === 3 ? 'var(--color-success)' : 'var(--color-warning)',
        })}
        ${renderStatCard({
          icon: 'chat', iconBg: '#ede9fe', iconColor: '#7c3aed',
          value: metrics.unreadMessages,
          label: 'Unread Messages',
          sub: metrics.unreadMessages > 0 ? 'From Jennifer Walsh (Lender)' : 'All caught up',
          accent: metrics.unreadMessages > 0 ? 'var(--color-info)' : 'var(--neutral-300)',
        })}
      </div>

      <!-- Two-column layout -->
      <div class="grid grid-3-2">
        <!-- Left: Activity + Quick Actions -->
        <div style="display:flex;flex-direction:column;gap:var(--space-6)">
          ${renderActivityCard()}
          ${renderQuickActions(role)}
        </div>

        <!-- Right: Timeline + Team -->
        <div style="display:flex;flex-direction:column;gap:var(--space-6)">
          ${renderTimelineCard(tx)}
          ${renderTeamCard(tx)}
        </div>
      </div>
    `;

    // Animate stats
    screenEl.querySelectorAll('.stat-card-value').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => {
        el.style.transition = 'all 0.4s cubic-bezier(.34,1.56,.64,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 60);
    });
  }

  function computeMetrics(tx) {
    const docs = window.MOCK_DOCUMENTS || [];
    const msgs = window.MOCK_MESSAGES || [];
    const ins  = window.MOCK_INSURANCE || {};

    const stages = tx.stages || [];
    const done = stages.filter(s => s.status === 'completed').length;
    const progress = Math.round((done / 11) * 100);

    const needsSignature = docs.filter(d =>
      d.status === 'NEEDS_SIGNATURE' &&
      Session.isVisible({ visibility: { visible_to_roles: ['CL','TC'] } })
    ).length;

    const insuranceComplete = Object.values(ins)
      .filter(p => p.status === 'COMPLETED').length;

    const unreadMessages = msgs.reduce((n, c) => n + (c.unread_count || 0), 0);

    return {
      progress,
      docsTotal: docs.length,
      needsSignature,
      insuranceComplete,
      unreadMessages,
    };
  }

  function renderStatCard({ icon, iconBg, iconColor, value, label, sub, accent }) {
    return `
      <div class="stat-card">
        <div class="stat-card-header">
          <div class="stat-card-icon" style="background:${iconBg};color:${iconColor}">
            ${Utils.ICONS[icon]}
          </div>
        </div>
        <div class="stat-card-value">${value}</div>
        <div>
          <div class="stat-card-label">${label}</div>
          <div class="stat-card-sub">${sub}</div>
        </div>
        <div class="stat-card-accent" style="background:${accent}"></div>
      </div>`;
  }

  function renderActivityCard() {
    const events = (window.MOCK_ACTIVITY_LOG || [])
      .filter(e => Session.isVisible(e))
      .slice(0, 5);

    const itemsHtml = events.map((e, i) => `
      <div class="activity-item" style="animation-delay:${i * 60}ms">
        <div class="activity-icon">${e.icon}</div>
        <div class="activity-content">
          <div class="activity-label">${Utils.escHtml(e.label)}</div>
          <div class="activity-meta">
            <span class="activity-time">${Utils.timeAgo(e.timestamp)}</span>
            <span style="color:var(--neutral-300)">·</span>
            ${Badge.roleBadge(e.actor_role)}
            <span class="activity-actor">${e.actor_name.split(' ')[0]}</span>
          </div>
        </div>
      </div>`).join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-hdr-left">
            <div class="card-icon" style="background:var(--neutral-100)">
              ${Utils.ICONS.grid}
            </div>
            <div>
              <div class="card-title">Recent Activity</div>
              <div class="card-subtitle">Latest transaction events</div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="ScreenDashboard.openFullFeed()">
            View all ${Utils.ICONS.arrowRight}
          </button>
        </div>
        <div class="card-bd">
          <div class="activity-feed">${itemsHtml || '<div class="empty-state" style="padding:var(--space-8)"><div class="empty-state-title">No activity yet</div></div>'}</div>
        </div>
      </div>`;
  }

  function renderQuickActions(role) {
    const actions = [];

    if (['CL','TC'].includes(role)) {
      actions.push({ label: 'Sign Closing Disclosure', icon: 'edit', route: 'documents', urgent: true });
      actions.push({ label: 'Upload Employment Letter', icon: 'upload', route: 'documents', urgent: true });
    }
    actions.push({ label: 'View Messages', icon: 'chat', route: 'messages', urgent: false });
    actions.push({ label: 'Check Insurance Status', icon: 'shield', route: 'insurance', urgent: false });

    const actHtml = actions.map(a => `
      <button class="btn ${a.urgent ? 'btn-primary' : 'btn-secondary'}" style="justify-content:flex-start;width:100%"
        onclick="Router.navigate('${a.route}')">
        <span style="width:14px;height:14px;display:flex">${Utils.ICONS[a.icon]}</span>
        ${a.label}
      </button>`).join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Quick Actions</div>
        </div>
        <div class="card-bd" style="display:flex;flex-direction:column;gap:var(--space-2)">
          ${actHtml}
        </div>
      </div>`;
  }

  function renderTimelineCard(tx) {
    const stages = tx.stages || [];
    const itemsHtml = stages.map(s => `
      <div class="timeline-item ${s.status}">
        <div class="timeline-dot">
          ${s.status === 'completed' ? Utils.ICONS.check : ''}
        </div>
        <div class="timeline-content">
          <div class="timeline-stage-num">Stage ${s.id}</div>
          <div class="timeline-stage-name">${s.name}</div>
          ${s.date && s.status !== 'pending' ? `<div style="font-size:11px;color:var(--neutral-400);margin-top:1px">${Utils.formatDate(s.date)}</div>` : ''}
        </div>
        ${Badge.roleBadge(s.owner)}
      </div>`).join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-hdr-left">
            <div>
              <div class="card-title">Transaction Progress</div>
              <div class="card-subtitle">11-stage lifecycle</div>
            </div>
          </div>
          ${Badge.render('current', { label: `Stage ${tx.current_stage}/11` })}
        </div>
        <div class="card-bd" style="padding-top:var(--space-4)">
          <div class="timeline-wrap">${itemsHtml}</div>
        </div>
      </div>`;
  }

  function renderTeamCard(tx) {
    const roleNames = { AG: 'Agent', LN: 'Lender', AT: 'Attorney', TC: 'Coordinator' };
    const teamHtml = (tx.professionals || []).map(p => `
      <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:var(--border-light)">
        ${Badge.roleBadge(p.role, { large: true })}
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--color-navy)">${Utils.escHtml(p.name)}</div>
          <div style="font-size:var(--text-xs);color:var(--neutral-500)">${roleNames[p.role] || p.role} · ${Utils.escHtml(p.company)}</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('messages')" title="Message ${p.name}">
          ${Utils.ICONS.chat}
        </button>
      </div>`).join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Your Team</div>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${(tx.professionals||[]).length} members</span>
        </div>
        <div class="card-bd" style="padding-top:0">
          ${teamHtml}
          <div style="padding-top:var(--space-3);display:flex;align-items:center;gap:var(--space-3)">
            ${Badge.roleBadge(Session.role, { large: true })}
            <div>
              <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--color-navy)">${Session.name} (You)</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-500)">${Session.roleInfo.label}</div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function openFullFeed() {
    const events = (window.MOCK_ACTIVITY_LOG || []).filter(e => Session.isVisible(e));
    const html = events.map(e => `
      <div class="activity-item">
        <div class="activity-icon">${e.icon}</div>
        <div class="activity-content">
          <div class="activity-label">${Utils.escHtml(e.label)}</div>
          ${e.description ? `<div style="font-size:var(--text-xs);color:var(--neutral-500);margin-top:2px">${Utils.escHtml(e.description)}</div>` : ''}
          <div class="activity-meta">
            <span class="activity-time">${Utils.timeAgo(e.timestamp)}</span>
            <span style="color:var(--neutral-300)">·</span>
            ${Badge.roleBadge(e.actor_role)}
            <span class="activity-actor">${e.actor_name}</span>
          </div>
        </div>
      </div>`).join('');

    Drawer.open({
      title: 'Full Activity Log',
      body: `<div class="activity-feed">${html}</div>`,
    });
  }

  return { render, openFullFeed };
})();

window.ScreenDashboard = ScreenDashboard;