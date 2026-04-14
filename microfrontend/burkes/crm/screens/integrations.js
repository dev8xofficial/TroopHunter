/**
 * Burkes Group CRM — Integrations Screen
 * Source: .specify/specs/014-integrations/spec.md, screens/integrations.yaml
 * Batch: 7 of 7 — Integrations + Reports + Admin Settings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.integrations = {
  _activeConnectorId: null,
  _filterStatus: '',

  render() {
    const { connectors, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const healthy  = connectors.filter(c => c.status === 'healthy').length;
    const degraded = connectors.filter(c => c.status === 'degraded').length;
    const pending  = connectors.filter(c => c.status === 'pending').length;
    const planned  = connectors.filter(c => c.status === 'planned').length;

    const filtered = this._filterStatus
      ? connectors.filter(c => c.status === this._filterStatus)
      : connectors;

    const activeConnector = this._activeConnectorId
      ? connectors.find(c => c.id === this._activeConnectorId)
      : null;

    return `
      <!-- Integrations Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Integrations</h1>
          <p>Connector health · Dependency visibility · Provider governance</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Screens.integrations.runHealthCheck()">
            ${Icons.refresh} Health Check All
          </button>
        </div>
      </div>

      <!-- KPI Summary Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Healthy',     value: healthy,  accent:'green',                           icon: Icons.check })}
        ${StatCard({ label:'Degraded',    value: degraded, accent: degraded > 0 ? 'gold' : 'navy',  icon: Icons.alertTriangle })}
        ${StatCard({ label:'Pending',     value: pending,  accent:'blue',                            icon: Icons.link })}
        ${StatCard({ label:'Planned',     value: planned,  accent:'navy',                            icon: Icons.chart })}
      </div>

      ${degraded > 0 ? `
      <div class="degraded-banner" style="margin-bottom:var(--space-5)">
        <span class="degraded-banner-icon">⚠️</span>
        <span class="degraded-banner-text">
          <strong>${degraded} connector${degraded !== 1 ? 's' : ''} degraded</strong> — some CRM features may be affected.
          Review below and use available retry or reconnect actions.
        </span>
      </div>` : ''}

      <!-- Status Filter Tabs -->
      <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4)">
        ${[['','All'],['healthy','Healthy'],['degraded','Degraded'],['pending','Pending'],['planned','Planned']].map(([v,l]) => `
          <button class="btn btn-${this._filterStatus === v ? 'primary' : 'secondary'} btn-sm"
                  onclick="Screens.integrations._filterStatus='${v}';Screens.integrations.rerender()">
            ${l}
          </button>`).join('')}
      </div>

      <!-- Two-Panel Layout -->
      <div style="display:grid;grid-template-columns:${activeConnector ? '380px 1fr' : '1fr'};gap:var(--space-5);margin-bottom:var(--space-5)">

        <!-- Connector List -->
        <div>
          <div class="card" style="overflow:hidden">
            <div class="card-header">
              <span class="card-title">Connector Registry</span>
              <span style="font-size:var(--text-xs);color:var(--neutral-400)">${filtered.length} connector${filtered.length !== 1 ? 's' : ''}</span>
            </div>
            ${filtered.map(c => this.renderConnectorRow(c)).join('')}
          </div>
        </div>

        <!-- Detail Panel -->
        ${activeConnector
          ? `<div>${this.renderConnectorDetail(activeConnector)}</div>`
          : this.renderEmptyDetail()}
      </div>

      <!-- Audit Timeline -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Recent Integration Events</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Connector activity · append-only</span>
        </div>
        <div style="padding:var(--space-5)">
          ${this.renderAuditTimeline()}
        </div>
      </div>`;
  },

  renderConnectorRow(connector) {
    const isActive = connector.id === this._activeConnectorId;

    const statusConfig = {
      healthy:      { cls: 'badge-green', label: '● Healthy',      bg: 'var(--color-success-bg)' },
      degraded:     { cls: 'badge-red',   label: '⚠ Degraded',     bg: 'var(--color-danger-bg)' },
      pending:      { cls: 'badge-gold',  label: '◑ Pending',      bg: 'var(--color-warning-bg)' },
      planned:      { cls: 'badge-gray',  label: '○ Planned',      bg: 'var(--neutral-100)' },
      disconnected: { cls: 'badge-red',   label: '✕ Disconnected', bg: 'var(--color-danger-bg)' }
    }[connector.status] || { cls: 'badge-gray', label: connector.status, bg: 'var(--neutral-100)' };

    const priorityLabel = {
      priority_1: { text: 'P1 — Core',     color: 'var(--color-danger-text)' },
      priority_2: { text: 'P2 — Extended', color: 'var(--color-warning-text)' },
      priority_3: { text: 'P3 — Future',   color: 'var(--neutral-400)' }
    }[connector.priority] || { text: connector.priority, color: 'var(--neutral-400)' };

    return `
      <div onclick="Screens.integrations.selectConnector('${connector.id}')"
           style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-4) var(--space-5);
                  border-bottom:1px solid var(--neutral-100);cursor:pointer;transition:background .1s;
                  ${isActive ? 'background:rgba(26,58,82,0.05);border-left:3px solid var(--color-primary-navy)' : ''}"
           onmouseover="if(!${isActive})this.style.background='var(--neutral-50)'"
           onmouseout="if(!${isActive})this.style.background=''">

        <!-- Provider Icon -->
        <div style="width:44px;height:44px;border-radius:var(--radius-lg);background:${statusConfig.bg};
                    display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
          ${connector.icon || '🔗'}
        </div>

        <!-- Details -->
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--neutral-800);margin-bottom:2px">
            ${connector.provider}
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;margin-bottom:var(--space-1)">
            <span style="font-size:10px;font-weight:600;color:${priorityLabel.color}">${priorityLabel.text}</span>
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">
              ${connector.last_synced_at
                ? `Synced ${window.MockData.helpers.formatRelative(connector.last_synced_at)}`
                : 'Not yet connected'}
            </span>
          </div>
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            ${(connector.affected_features || []).slice(0,4).map(f =>
              `<span style="font-size:9px;background:var(--neutral-100);color:var(--neutral-500);
                            padding:1px 5px;border-radius:4px">${f}</span>`).join('')}
            ${(connector.affected_features || []).length > 4
              ? `<span style="font-size:9px;color:var(--neutral-400)">+${connector.affected_features.length - 4}</span>` : ''}
          </div>
        </div>

        <!-- Status Badge -->
        <span class="badge ${statusConfig.cls}" style="flex-shrink:0">${statusConfig.label}</span>
      </div>`;
  },

  renderEmptyDetail() {
    return `
      <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                                min-height:300px;gap:var(--space-4)">
        <div style="font-size:48px">🔗</div>
        <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-primary-navy)">
          Select a connector
        </div>
        <div style="color:var(--neutral-400);font-size:var(--text-sm);text-align:center;max-width:260px">
          Choose a connector to view health details, dependency mapping, and available actions.
        </div>
      </div>`;
  },

  renderConnectorDetail(connector) {
    const { Icons } = window.Components;

    const actionConfig = {
      test:      { label: 'Test Connection', icon: '🔍', cls: 'btn-secondary' },
      retry:     { label: 'Retry Sync',      icon: '🔄', cls: 'btn-secondary' },
      reconnect: { label: 'Reconnect',       icon: '🔌', cls: 'btn-primary'   },
      view_only: { label: 'View Status',     icon: '👁',  cls: 'btn-ghost'    }
    };

    const statusConfig = {
      healthy:      { badge: 'badge-green', label: 'Healthy',      msg: 'Operating normally. All dependent features are functioning.' },
      degraded:     { badge: 'badge-red',   label: 'Degraded',     msg: 'Experiencing issues. Dependent features may be impacted.' },
      pending:      { badge: 'badge-gold',  label: 'Pending',      msg: 'Awaiting initial connection or credential configuration.' },
      planned:      { badge: 'badge-gray',  label: 'Planned',      msg: 'Scheduled for a future phase. Not yet implemented.' },
      disconnected: { badge: 'badge-red',   label: 'Disconnected', msg: 'Connection lost. Reconnect to restore functionality.' }
    }[connector.status] || { badge: 'badge-gray', label: connector.status, msg: '' };

    const priorityFull = {
      priority_1: 'Priority 1 — Core Operations',
      priority_2: 'Priority 2 — Extended Features',
      priority_3: 'Priority 3 — Future Roadmap'
    }[connector.priority] || connector.priority;

    return `
      <div class="card" style="overflow:hidden">
        <!-- Header -->
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--neutral-200)">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3)">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2)">
                <span style="font-size:24px">${connector.icon || '🔗'}</span>
                <span style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-primary-navy)">
                  ${connector.provider}
                </span>
              </div>
              <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
                <span class="badge ${statusConfig.badge}">${statusConfig.label}</span>
                <span class="badge badge-gray">${priorityFull}</span>
              </div>
            </div>
            <button onclick="Screens.integrations._activeConnectorId=null;Screens.integrations.rerender()"
                    class="btn btn-ghost btn-sm btn-icon">✕</button>
          </div>
        </div>

        <div style="padding:var(--space-5) var(--space-6)">

          <!-- Status Message -->
          <div style="padding:var(--space-3) var(--space-4);background:var(--neutral-50);border-radius:var(--radius-md);
                      font-size:var(--text-sm);color:var(--neutral-600);margin-bottom:var(--space-5)">
            ${statusConfig.msg}
          </div>

          <!-- Details Grid -->
          <div class="profile-section">
            <div class="profile-section-title">Connector Details</div>
            <div class="profile-fields-grid">
              <div class="profile-field">
                <span class="profile-field-label">Credential Owner</span>
                <span class="profile-field-value">${connector.owner || '—'}</span>
              </div>
              <div class="profile-field">
                <span class="profile-field-label">Last Successful Sync</span>
                <span class="profile-field-value">
                  ${connector.last_synced_at
                    ? window.MockData.helpers.formatDateTime(connector.last_synced_at)
                    : 'Never'}
                </span>
              </div>
              <div class="profile-field">
                <span class="profile-field-label">Priority Tier</span>
                <span class="profile-field-value">${priorityFull}</span>
              </div>
              <div class="profile-field">
                <span class="profile-field-label">Connector ID</span>
                <span class="profile-field-value" style="font-family:monospace;font-size:11px">${connector.id}</span>
              </div>
            </div>
          </div>

          <!-- Affected Features -->
          ${(connector.affected_features || []).length > 0 ? `
          <div class="profile-section">
            <div class="profile-section-title">Dependent CRM Features</div>
            <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
              ${connector.affected_features.map(f => `
                <span style="padding:var(--space-2) var(--space-3);background:var(--color-info-bg);
                             color:var(--color-info-text);border-radius:var(--radius-full);font-size:var(--text-xs);
                             font-weight:var(--weight-semibold);cursor:pointer"
                      onclick="Router.navigate('${f}')" title="Open ${f} screen">
                  ${f} ↗
                </span>`).join('')}
            </div>
          </div>` : ''}

          <!-- Remediation Actions -->
          <div class="profile-section">
            <div class="profile-section-title">Supported Actions</div>
            ${(connector.actions || []).length > 0 ? `
            <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
              ${connector.actions.map(action => {
                const cfg = actionConfig[action] || { label: action, icon: '▶', cls: 'btn-secondary' };
                return `
                  <button class="btn ${cfg.cls} btn-sm"
                          onclick="Screens.integrations.runAction('${connector.id}','${action}')">
                    ${cfg.icon} ${cfg.label}
                  </button>`;
              }).join('')}
            </div>` : `
            <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);
                        font-size:var(--text-sm);color:var(--neutral-400)">
              No supported remediation actions available for this connector.
            </div>`}
          </div>

          <!-- Status-specific notices -->
          ${connector.status === 'degraded' ? `
          <div style="padding:var(--space-3) var(--space-4);background:var(--color-danger-bg);
                      border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-danger-text)">
            ⚠️ This connector is degraded. Try <strong>Retry Sync</strong> first.
            If the issue persists, use <strong>Reconnect</strong> to re-authenticate, or contact your system administrator.
          </div>` : ''}

          ${connector.status === 'planned' ? `
          <div style="padding:var(--space-3) var(--space-4);background:var(--neutral-100);
                      border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--neutral-500)">
            📅 This integration is on the product roadmap for a future phase and is not yet implemented.
            No action is required at this time.
          </div>` : ''}

          ${connector.status === 'pending' ? `
          <div style="padding:var(--space-3) var(--space-4);background:var(--color-warning-bg);
                      border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-warning-text)">
            ◑ This connector is awaiting initial setup. Use <strong>Reconnect</strong> to begin credential configuration.
          </div>` : ''}
        </div>
      </div>`;
  },

  renderAuditTimeline() {
    const events = [
      { icon:'✅', text:'Microsoft Outlook — sync completed successfully · 147 events ingested', time:'2 minutes ago',  type:'success'  },
      { icon:'⚠️', text:'Arive — sync timeout after 30s · Retry queued',                         time:'18 minutes ago', type:'warning'  },
      { icon:'✅', text:'HAR (Houston MLS) — connection test passed',                             time:'1 hour ago',     type:'success'  },
      { icon:'❌', text:'Arive — sync failed: 503 Service Unavailable',                           time:'2 hours ago',    type:'error'    },
      { icon:'✅', text:'VOIP Provider — health check passed · Latency 42ms',                     time:'3 hours ago',    type:'success'  },
      { icon:'🔌', text:'Agency Zoom — reconnect action initiated by Platform Admin',              time:'5 hours ago',    type:'info'     }
    ];
    const colors = {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error:   'var(--color-danger)',
      info:    'var(--color-info)'
    };
    return events.map((e, i) => `
      <div style="display:flex;align-items:flex-start;gap:var(--space-3);
                  ${i < events.length - 1 ? 'border-bottom:1px solid var(--neutral-100);padding-bottom:var(--space-3);margin-bottom:var(--space-3)' : ''}">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--neutral-100);
                    display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">
          ${e.icon}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--text-sm);color:var(--neutral-700)">${e.text}</div>
          <div style="font-size:var(--text-xs);color:var(--neutral-400);margin-top:2px">${e.time}</div>
        </div>
        <div style="width:8px;height:8px;border-radius:50%;background:${colors[e.type]};flex-shrink:0;margin-top:5px"></div>
      </div>`).join('');
  },

  selectConnector(connectorId) {
    this._activeConnectorId = this._activeConnectorId === connectorId ? null : connectorId;
    this.rerender();
  },

  runAction(connectorId, action) {
    const connector = window.MockData.connectors.find(c => c.id === connectorId);
    const msgs = { test: 'Testing connection for', retry: 'Retrying sync for', reconnect: 'Reconnecting' };
    Components.Toast(`${msgs[action] || 'Running action on'} ${connector?.provider}…`, 'info');
    setTimeout(() => {
      if (action === 'reconnect') {
        const c = window.MockData.connectors.find(x => x.id === connectorId);
        if (c) { c.status = 'healthy'; c.last_synced_at = new Date().toISOString(); }
      }
      Components.Toast(`${connector?.provider}: action completed successfully`, 'success');
      this.rerender();
    }, 1600);
  },

  runHealthCheck() {
    Components.Toast('Running health check on all connectors…', 'info');
    setTimeout(() => {
      Components.Toast('Health check complete — 5 healthy, 1 degraded, 1 pending', 'success');
    }, 2000);
  },

  rerender() {
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML = `<div class="screen-wrapper">${this.render()}</div>`;
      this.init();
    }
  },

  init() {}
};