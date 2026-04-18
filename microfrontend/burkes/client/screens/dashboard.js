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

    const daysColor = daysToClose < 8 ? 'badge-red' : daysToClose < 20 ? 'badge-amber' : 'badge-green';

    outlet.innerHTML = `
      <div class="page-header">
        <div class="page-header-content">
          <h1 class="page-title">Welcome back, ${greeting}</h1>
          <p class="page-subtitle">
            ${tx.property_address?.street || 'Transaction'} · Closing target: ${window.MockData?.formatDate?.(tx.estimated_close_date || tx.closing_date) || 'TBD'}
          </p>
        </div>
        <div class="page-actions">
          <span class="badge ${daysColor}" style="font-size:13px;padding:6px 14px;">
            ${daysToClose} days to close
          </span>
        </div>
      </div>

      <div class="grid grid-4" style="margin-bottom:var(--space-6)">
        ${renderStatCard({
          value: `${progressPct}%`,
          label: 'Transaction Progress',
          sub: `Current stage: ${stageName}`,
          accent: 'var(--color-accent-blue)',
        })}
        ${renderStatCard({
          value: docCount,
          label: 'Documents on File',
          sub: `${needsSignature} need${needsSignature === 1 ? '' : 's'} action`,
          accent: 'var(--color-success)',
        })}
        ${renderStatCard({
          value: insuranceStatus,
          label: 'Insurance Policies',
          sub: 'Coverage summary',
          accent: 'var(--color-warning)',
        })}
        ${renderStatCard({
          value: unreadMessages,
          label: 'Unread Messages',
          sub: unreadMessages > 0 ? 'From your team' : 'All caught up',
          accent: 'var(--neutral-300)',
        })}
      </div>

      <div class="grid grid-3-2">
        <div style="display:flex;flex-direction:column;gap:var(--space-6)">
          ${renderActivityCard(activity)}
          ${renderQuickActions()}
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-6)">
          ${renderTimelineCard(tx)}
          ${renderTeamCard(tx)}
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
      .map((event) => `
        <div class="activity-item">
          <div class="activity-icon">${event.icon || '•'}</div>
          <div class="activity-content">
            <div class="activity-label">${event.label || 'Event'}</div>
            <div class="activity-meta">
              <span class="activity-time">${event.timestamp ? new Date(event.timestamp).toLocaleDateString('en-US') : ''}</span>
              ${event.role ? ` · ${event.role}` : ''}
            </div>
          </div>
        </div>`)
      .join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Recent Activity</div>
        </div>
        <div class="card-bd">
          <div class="activity-feed">${itemsHtml || '<div class="empty-state"><div class="empty-state-title">No activity yet</div></div>'}</div>
        </div>
      </div>`;
  }

  function renderQuickActions() {
    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Quick Actions</div>
        </div>
        <div class="card-bd" style="display:flex;flex-direction:column;gap:var(--space-2)">
          <button class="btn btn-primary" type="button" onclick="Router.navigate('documents')">Review Documents</button>
          <button class="btn btn-secondary" type="button" onclick="Router.navigate('messages')">View Messages</button>
          <button class="btn btn-secondary" type="button" onclick="Router.navigate('insurance')">Insurance Summary</button>
        </div>
      </div>`;
  }

  function renderTimelineCard(tx) {
    const stages = tx.stages || [];
    const itemsHtml = stages
      .map((stage) => `
        <div class="timeline-item ${stage.status || ''}">
          <div class="timeline-dot">${stage.status === 'completed' ? '✓' : ''}</div>
          <div class="timeline-content">
            <div class="timeline-stage-num">Stage ${stage.num || stage.id || ''}</div>
            <div class="timeline-stage-name">${stage.name || stage.stage_name || ''}</div>
          </div>
        </div>`)
      .join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Transaction Timeline</div>
        </div>
        <div class="card-bd">
          <div class="timeline-wrap">${itemsHtml || '<div class="empty-state"><div class="empty-state-title">No timeline data</div></div>'}</div>
        </div>
      </div>`;
  }

  function renderTeamCard(tx) {
    const professionals = tx.professionals || [];
    const teamHtml = professionals
      .map((pro) => `
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:var(--border-light)">
          ${window.Badge?.role(pro.role) || ''}
          <div style="flex:1;min-width:0">
            <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--color-navy)">${pro.name || ''}</div>
            <div style="font-size:var(--text-xs);color:var(--neutral-500)">${pro.company || ''}</div>
          </div>
        </div>`)
      .join('');

    return `
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">Your Team</div>
        </div>
        <div class="card-bd">
          ${teamHtml || '<div class="empty-state"><div class="empty-state-title">No team data available</div></div>'}
        </div>
      </div>`;
  }

  return { render };
})();

window.DashboardScreen = DashboardScreen;
