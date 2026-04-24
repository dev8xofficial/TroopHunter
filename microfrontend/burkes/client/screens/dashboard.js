/* screens/dashboard.js — Client Portal Dashboard */

const DashboardScreen = (() => {
  function render(outlet) {
    if (!outlet) return;

    const tx = window.MockData?.transaction || {};
    const metrics = window.MockData?.metrics || {};
    const role = window.Session?.role || 'CL';
    const documents = window.MockData?.getDocumentsForRole(role) || [];
    const activity = window.MockData?.getActivityForRole(role) || [];
    const messages = window.MockData?.messages || [];

    const daysToClose = metrics.days_to_close ?? 0;
    const stageName = metrics.current_stage || tx.stage_name || 'Unknown';
    const greeting = tx.client_name ? tx.client_name.split(' ')[0] : 'there';
    const progressPct = metrics.progress_pct ?? 0;
    const docCount = documents.length;
    const needsSignature = documents.filter((d) => ['needs-signature', 'NEEDS_SIGNATURE'].includes(d.status)).length;
    const insuranceStatus = metrics.insurance_pct || '0/0';
    const unreadMessages = messages.reduce((sum, conv) => sum + (conv.unread || conv.unread_count || 0), 0);

    const daysColor = daysToClose <= 0 ? 'badge-red' : daysToClose < 8 ? 'badge-red' : daysToClose < 20 ? 'badge-amber' : 'badge-green';

    const addr = tx.property_address;
    const addrStr = addr ? `${addr.street}, ${addr.city}, ${addr.state}` : 'Transaction';
    const closeDate = window.MockData?.formatDate?.(tx.estimated_close_date) || 'TBD';

    outlet.innerHTML = `
      <div class="screen">
        <div class="page-header">
          <div class="page-header-left">
            <h1 class="page-title">Welcome back, ${greeting}</h1>
            <p class="page-subtitle">${addrStr} · Closing target: ${closeDate}</p>
          </div>
          <div class="page-actions">
            <span class="badge ${daysColor}" style="font-size:13px;padding:6px 14px;">
              ${daysToClose > 0 ? daysToClose + ' days to close' : 'Closing today!'}
            </span>
          </div>
        </div>

        <div class="grid grid-4" style="margin-bottom:var(--space-6)">
          ${renderStatCard({ value: `${progressPct}%`, label: 'Transaction Progress', sub: `Stage: ${stageName}`, accent: 'var(--color-accent-blue)' })}
          ${renderStatCard({ value: docCount, label: 'Documents on File', sub: needsSignature > 0 ? `${needsSignature} need${needsSignature === 1 ? 's' : ''} signature` : 'All current', accent: 'var(--color-success)' })}
          ${renderStatCard({ value: insuranceStatus, label: 'Insurance Policies', sub: 'Coverage status', accent: 'var(--color-warning)' })}
          ${renderStatCard({ value: unreadMessages, label: 'Unread Messages', sub: unreadMessages > 0 ? 'From your team' : 'All caught up', accent: 'var(--neutral-300)' })}
        </div>

        <div class="grid grid-3-2">
          <div style="display:flex;flex-direction:column;gap:var(--space-6)">
            ${renderActivityCard(activity)}
            ${renderQuickActionsCard()}
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-6)">
            ${renderTimelineCard(tx)}
            ${renderTeamCard(tx)}
          </div>
        </div>
      </div>
    `;
  }

  function renderStatCard({ value, label, sub, accent }) {
    return `
      <div class="stat-card">
        <div class="stat-card-value">${value}</div>
        <div>
          <div class="stat-card-label">${label}</div>
          <div class="stat-card-sub">${sub}</div>
        </div>
        <div class="stat-card-accent" style="background:${accent}"></div>
      </div>`;
  }

  function renderActivityCard(activity) {
    const items = activity.slice(0, 5);
    const itemsHtml = items
      .map((event) => {
        const ts = event.timestamp ? new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
        const roleBadge = event.role ? window.Badge?.role(event.role) || '' : '';
        return `
        <div class="activity-item">
          <div class="activity-icon">${event.icon || '•'}</div>
          <div class="activity-content">
            <div class="activity-label">${event.label || 'Event'}</div>
            <div class="activity-meta">
              <span class="activity-time">${ts}</span>
              ${roleBadge ? `<span> · </span>${roleBadge}` : ''}
            </div>
          </div>
        </div>`;
      })
      .join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-hdr-left">
            <div class="card-title">Recent Activity</div>
          </div>
        </div>
        <div class="card-bd">
          <div class="activity-feed">
            ${itemsHtml || '<div class="empty-state"><div class="empty-state-title">No activity yet</div></div>'}
          </div>
        </div>
      </div>`;
  }

  function renderQuickActionsCard() {
    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Quick Actions</div>
        </div>
        <div class="card-bd" style="display:flex;flex-direction:column;gap:var(--space-2)">
          <button class="btn btn-primary" type="button" style="width:100%;justify-content:center"
            onclick="Router.navigate('documents')">
            📄 Review Documents
          </button>
          <button class="btn btn-secondary" type="button" style="width:100%;justify-content:center"
            onclick="Router.navigate('messages')">
            💬 View Messages
          </button>
          <button class="btn btn-secondary" type="button" style="width:100%;justify-content:center"
            onclick="Router.navigate('insurance')">
            🛡️ Insurance Summary
          </button>
          <button class="btn btn-secondary" type="button" style="width:100%;justify-content:center"
            onclick="Router.navigate('mortgage')">
            🏦 Mortgage Application
          </button>
        </div>
      </div>`;
  }

  function renderTimelineCard(tx) {
    const stages = tx.stages || [];
    const itemsHtml = stages
      .map((stage) => {
        const statusClass = stage.status || 'pending';
        const icon = stage.status === 'completed' ? '✓' : stage.status === 'current' ? '●' : stage.num || '';
        return `
        <div class="timeline-item ${statusClass}">
          <div class="timeline-dot">${icon}</div>
          <div class="timeline-content">
            <div class="timeline-stage-num">Stage ${stage.num}</div>
            <div class="timeline-stage-name">${stage.name || ''}</div>
          </div>
        </div>`;
      })
      .join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Transaction Timeline</div>
          <span class="badge badge-amber">Stage ${tx.current_stage || 9}/11</span>
        </div>
        <div class="card-bd">
          <div class="timeline-wrap">
            ${itemsHtml || '<div class="empty-state"><div class="empty-state-title">No timeline data</div></div>'}
          </div>
        </div>
      </div>`;
  }

  function renderTeamCard(tx) {
    const professionals = tx.professionals || [];
    const teamHtml = professionals
      .map(
        (pro) => `
      <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) 0;border-bottom:var(--border-light)">
        ${window.Badge?.role(pro.role) || `<span>${pro.role}</span>`}
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--color-navy)">${pro.name}</div>
          <div style="font-size:var(--text-xs);color:var(--neutral-500)">${pro.company}</div>
        </div>
      </div>`,
      )
      .join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Your Team</div>
        </div>
        <div class="card-bd">
          ${teamHtml || '<div class="empty-state"><div class="empty-state-title">No team data</div></div>'}
        </div>
      </div>`;
  }

  return { render };
})();

window.DashboardScreen = DashboardScreen;
