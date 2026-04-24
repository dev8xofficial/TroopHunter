/**
 * Burkes Group CRM — Mortgage Screen
 * Source: .specify/specs/012-mortgage/spec.md, screens/mortgage.yaml
 * Batch: 6 of 7 — Department Workspaces + Video Meetings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.mortgage = {
  _view: 'list',   // 'list' | 'board'
  _filters: {
    stage: '',
    search: '',
    missingItems: false,
    ctcOnly: false
  },

  render() {
    const { mortgageRecords, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const filtered     = this.getFiltered();
    const inProcess    = mortgageRecords.filter(r => !['funded', 'declined'].includes(r.status)).length;
    const ctcReady     = mortgageRecords.filter(r => r.clear_to_close_at).length;
    const withBlockers = mortgageRecords.filter(r => r.missing_items.length > 0).length;
    const staleSync    = mortgageRecords.filter(r => r.sync_state.status === 'stale').length;

    const ariveConnector  = window.MockData.connectors.find(c => c.id === 'conn-arive');
    const ariveStatus     = ariveConnector?.status || 'unknown';
    const ariveHealthy    = ariveStatus === 'healthy';
    const ariveLastSynced = ariveConnector?.last_synced_at;

    return `
      <!-- Mortgage Header -->
      <div class="dept-workspace-header mortgage">
        <div class="dept-workspace-icon" style="background:var(--dept-mortgage-bg)">🏠</div>
        <div class="dept-workspace-info">
          <div class="dept-workspace-title" style="color:var(--dept-mortgage-text)">
            Mortgage Workspace
          </div>
          <div class="dept-workspace-sub">
            ${mortgageRecords.length} records · Loan milestones, Arive-linked pipeline, document readiness
          </div>
        </div>
        <div style="display:flex;gap:var(--space-2)">
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')">
            ${Icons.users} All Contacts
          </button>
          <button class="btn btn-primary btn-sm" onclick="Router.quickAction('new-lead')">
            ${Icons.plus} New Loan
          </button>
        </div>
      </div>

      <!-- §2.2 G-02: Per-Department Compliance Notice (T2-02) -->
      ${window.Compliance ? window.Compliance.deptComplianceBanner('mortgage') : ''}

      <!-- Arive Sync Status Banner -->
      <div class="degraded-banner"
           style="border-color:${ariveHealthy ? 'var(--color-success)' : 'var(--color-danger)'};
                  background:${ariveHealthy ? 'var(--color-success-bg)' : 'var(--color-danger-bg)'};
                  margin-bottom:var(--space-5)">
        <span style="font-size:16px">🏛️</span>
        <span style="color:${ariveHealthy ? 'var(--color-success-text)' : 'var(--color-danger-text)'};
                    font-weight:var(--weight-medium)">
          Arive: <strong>${ariveStatus.charAt(0).toUpperCase() + ariveStatus.slice(1)}</strong>
          ${ariveHealthy
            ? ` — Loan data synced. Last updated ${helpers.formatRelative(ariveLastSynced)}.`
            : ` — Sync is degraded. Mortgage records may not reflect the latest Arive state.`}
        </span>
        <button class="btn btn-secondary btn-sm" style="margin-left:auto"
                onclick="Router.navigate('integrations')">
          ${ariveHealthy ? 'View Integration' : '⚠ Fix Sync'}
        </button>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Loans', value: mortgageRecords.length, accent:'navy', icon: Icons.bank })}
        ${StatCard({ label:'In Process', value: inProcess, accent:'blue', icon: Icons.activity })}
        ${StatCard({ label:'Clear to Close', value: ctcReady, accent:'green', icon: Icons.check })}
        ${StatCard({ label:'Doc Blockers', value: withBlockers, accent: withBlockers > 0 ? 'gold' : 'navy', icon: Icons.alertTriangle })}
        ${StatCard({ label:'Stale Arive Sync', value: staleSync, accent: staleSync > 0 ? 'gold' : 'navy', icon: Icons.refresh })}
      </div>

      <!-- Blockers Alert -->
      ${withBlockers > 0 ? `
      <div class="degraded-banner" style="margin-bottom:var(--space-5)">
        <span class="degraded-banner-icon">📋</span>
        <span class="degraded-banner-text">
          <strong>${withBlockers} loan${withBlockers !== 1 ? 's' : ''}</strong> have missing documents or data blocking progression.
          Review the list below and contact clients to resolve.
        </span>
        <button class="btn btn-secondary btn-sm" style="margin-left:auto"
                onclick="Screens.mortgage._filters.missingItems=true;Screens.mortgage.rerender()">
          Show Blockers Only
        </button>
      </div>` : ''}

      <!-- Filter Bar + View Toggle -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input type="text" placeholder="Search contacts, lenders, loan IDs…"
                 value="${this._filters.search}"
                 oninput="Screens.mortgage._filters.search=this.value;Screens.mortgage.refreshContent()">
        </div>
        <select class="filter-select"
                onchange="Screens.mortgage._filters.stage=this.value;Screens.mortgage.refreshContent()">
          <option value="">All Stages</option>
          <option value="inquiry"         ${this._filters.stage === 'inquiry'         ? 'selected' : ''}>Inquiry</option>
          <option value="pre_approval"    ${this._filters.stage === 'pre_approval'    ? 'selected' : ''}>Pre-Approval</option>
          <option value="processing"      ${this._filters.stage === 'processing'      ? 'selected' : ''}>Processing</option>
          <option value="clear_to_close"  ${this._filters.stage === 'clear_to_close'  ? 'selected' : ''}>Clear to Close</option>
          <option value="funded"          ${this._filters.stage === 'funded'          ? 'selected' : ''}>Funded</option>
          <option value="declined"        ${this._filters.stage === 'declined'        ? 'selected' : ''}>Declined</option>
        </select>
        <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);
                      cursor:pointer;white-space:nowrap">
          <input type="checkbox" ${this._filters.missingItems ? 'checked' : ''}
                 onchange="Screens.mortgage._filters.missingItems=this.checked;Screens.mortgage.refreshContent()">
          Blockers only
        </label>
        <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);
                      cursor:pointer;white-space:nowrap">
          <input type="checkbox" ${this._filters.ctcOnly ? 'checked' : ''}
                 onchange="Screens.mortgage._filters.ctcOnly=this.checked;Screens.mortgage.refreshContent()">
          CTC ready
        </label>
        <button class="filter-clear" onclick="Screens.mortgage.clearFilters()">Clear</button>
        <div class="pipeline-view-toggle" style="margin-left:auto">
          <button class="view-toggle-btn ${this._view === 'list'  ? 'active' : ''}"
                  onclick="Screens.mortgage.setView('list')">List</button>
          <button class="view-toggle-btn ${this._view === 'board' ? 'active' : ''}"
                  onclick="Screens.mortgage.setView('board')">Board</button>
        </div>
      </div>

      <!-- Content -->
      <div id="mort-content">
        ${this.renderContent(filtered)}
      </div>`;
  },

  getFiltered() {
    let data = window.MockData.mortgageRecords;
    const { stage, search, missingItems, ctcOnly } = this._filters;
    if (stage)        data = data.filter(r => r.status === stage);
    if (missingItems) data = data.filter(r => r.missing_items.length > 0);
    if (ctcOnly)      data = data.filter(r => r.clear_to_close_at);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        r.contact_name.toLowerCase().includes(q) ||
        (r.lender_name || '').toLowerCase().includes(q) ||
        (r.arive_loan_id || '').toLowerCase().includes(q)
      );
    }
    return data;
  },

  renderContent(filtered) {
    return this._view === 'board' ? this.renderBoard(filtered) : this.renderList(filtered);
  },

  renderList(filtered) {
    const { helpers } = window.MockData;

    if (!filtered.length) {
      return `
        <div class="card" style="padding:var(--space-10);text-align:center">
          <div style="font-size:40px;margin-bottom:var(--space-3)">🏠</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;
                      color:var(--color-primary-navy)">No mortgage records match filters</div>
          <div style="color:var(--neutral-400);font-size:var(--text-sm);margin-top:var(--space-2)">
            Try adjusting filters or creating a new loan record.
          </div>
        </div>`;
    }

    return `
      <div class="table-wrapper">
        <div class="table-toolbar">
          <span class="table-toolbar-title">Mortgage Records</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${filtered.length} loans</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Contact</th>
                <th>Stage</th>
                <th>Loan Type</th>
                <th>Pre-Approval</th>
                <th>Lender</th>
                <th>Arive ID</th>
                <th>Blockers</th>
                <th>Sync</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(r => `
                <tr onclick="Screens.mortgage.openRecordDrawer('${r.id}')" style="cursor:pointer">
                  <td>
                    <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${r.contact_name}</div>
                    <div style="font-size:var(--text-xs);color:var(--neutral-400)">${r.id}</div>
                  </td>
                  <td>${this.renderStageBadge(r.status)}</td>
                  <td><span class="badge badge-blue">${r.loan_type || '—'}</span></td>
                  <td style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">
                    ${r.pre_approval_amount ? helpers.formatCurrency(r.pre_approval_amount) : '—'}
                  </td>
                  <td style="font-size:var(--text-sm)">${r.lender_name || '—'}</td>
                  <td>
                    ${r.arive_loan_id
                      ? `<code style="font-size:10px;background:var(--neutral-100);padding:2px 5px;
                                    border-radius:4px">${r.arive_loan_id}</code>`
                      : `<span style="color:var(--neutral-300);font-size:var(--text-xs)">Not linked</span>`}
                  </td>
                  <td>
                    ${r.missing_items.length > 0
                      ? `<span class="badge badge-gold" title="${r.missing_items.join(', ')}">
                           📋 ${r.missing_items.length}
                         </span>`
                      : `<span class="badge badge-green">Clear</span>`}
                  </td>
                  <td>
                    <span class="sync-badge ${r.sync_state.status === 'healthy' ? 'healthy' : 'stale'}">
                      ${r.sync_state.status === 'healthy' ? '● Synced' : '⚠ Stale'}
                    </span>
                  </td>
                  <td onclick="event.stopPropagation()">
                    <div style="display:flex;gap:4px">
                      <button class="btn btn-ghost btn-sm btn-icon"
                              onclick="Router.navigate('calls')" title="Call">📞</button>
                      <button class="btn btn-ghost btn-sm btn-icon"
                              onclick="Router.navigate('email')" title="Email">✉️</button>
                    </div>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  renderBoard(filtered) {
    const stages = ['inquiry', 'pre_approval', 'processing', 'clear_to_close', 'funded', 'declined'];
    const stageLabels = {
      inquiry: 'Inquiry', pre_approval: 'Pre-Approval', processing: 'Processing',
      clear_to_close: 'Clear to Close', funded: 'Funded', declined: 'Declined'
    };
    const stageColors = {
      inquiry: 'var(--neutral-400)', pre_approval: 'var(--dept-mortgage)',
      processing: 'var(--color-primary-navy)', clear_to_close: 'var(--color-success)',
      funded: 'var(--color-success)', declined: 'var(--color-danger)'
    };
    const byStage = {};
    stages.forEach(s => { byStage[s] = []; });
    filtered.forEach(r => { if (byStage[r.status]) byStage[r.status].push(r); });

    return `
      <div style="display:flex;gap:var(--space-4);overflow-x:auto;padding-bottom:var(--space-4)">
        ${stages.map(stage => `
          <div style="min-width:220px;width:220px;flex-shrink:0">
            <div style="display:flex;align-items:center;justify-content:space-between;
                        padding:var(--space-3) var(--space-4);background:var(--neutral-100);
                        border-radius:var(--radius-md);border:1px solid var(--neutral-200);
                        margin-bottom:var(--space-3)">
              <span style="font-size:var(--text-xs);font-weight:var(--weight-semibold);
                           text-transform:uppercase;letter-spacing:.05em;color:${stageColors[stage]}">
                ${stageLabels[stage]}
              </span>
              <span style="background:${stageColors[stage]};color:white;font-size:var(--text-xs);
                           font-weight:700;border-radius:99px;width:20px;height:20px;
                           display:flex;align-items:center;justify-content:center">
                ${byStage[stage].length}
              </span>
            </div>
            <div style="display:flex;flex-direction:column;gap:var(--space-2)">
              ${byStage[stage].length
                ? byStage[stage].map(r => `
                  <div onclick="Screens.mortgage.openRecordDrawer('${r.id}')"
                       style="background:white;border:1px solid var(--neutral-200);
                              border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);
                              cursor:pointer;box-shadow:var(--shadow-xs);
                              ${r.missing_items.length > 0 ? 'border-left:3px solid var(--color-warning)' : ''}"
                       onmouseover="this.style.boxShadow='var(--shadow-md)'"
                       onmouseout="this.style.boxShadow='var(--shadow-xs)'">
                    <div style="font-weight:var(--weight-semibold);color:var(--neutral-800);
                                font-size:var(--text-sm);margin-bottom:var(--space-2);
                                white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                      ${r.contact_name}
                    </div>
                    <div style="font-size:11px;color:var(--neutral-500);margin-bottom:var(--space-2)">
                      ${r.loan_type || 'Loan'} · ${r.lender_name || 'No lender'}
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between">
                      ${r.pre_approval_amount
                        ? `<span style="font-size:var(--text-xs);font-weight:700;color:var(--dept-mortgage)">
                             ${window.MockData.helpers.formatCurrency(r.pre_approval_amount)}
                           </span>`
                        : `<span style="font-size:var(--text-xs);color:var(--neutral-400)">No amount</span>`}
                      ${r.missing_items.length > 0
                        ? `<span style="font-size:9px;background:var(--color-warning-bg);
                                       color:var(--color-warning-text);padding:1px 5px;border-radius:99px;
                                       font-weight:700">📋 ${r.missing_items.length}</span>` : ''}
                    </div>
                  </div>`).join('')
                : `<div style="padding:var(--space-4);color:var(--neutral-300);font-size:var(--text-xs);
                              text-align:center;border:1.5px dashed var(--neutral-200);border-radius:var(--radius-md)">
                     No loans
                   </div>`}
            </div>
          </div>`).join('')}
      </div>`;
  },

  renderStageBadge(status) {
    const config = {
      inquiry:        { cls: 'badge-gray',  label: 'Inquiry'        },
      pre_approval:   { cls: 'badge-blue',  label: 'Pre-Approval'   },
      processing:     { cls: 'badge-navy',  label: 'Processing'     },
      clear_to_close: { cls: 'badge-green', label: 'Clear to Close' },
      funded:         { cls: 'badge-green', label: 'Funded'         },
      declined:       { cls: 'badge-red',   label: 'Declined'       }
    }[status] || { cls: 'badge-gray', label: status };
    return `<span class="badge ${config.cls}">${config.label}</span>`;
  },

  openRecordDrawer(recordId) {
    const r = window.MockData.mortgageRecords.find(x => x.id === recordId);
    if (!r) return;
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const milestones = [
      { name: 'Application Submitted', done: !['inquiry'].includes(r.status) },
      { name: 'Pre-Approval Issued',   done: !['inquiry', 'pre_approval'].includes(r.status) },
      { name: 'Processing Underway',   done: ['clear_to_close', 'funded'].includes(r.status) },
      { name: 'Clear to Close',        done: ['funded'].includes(r.status) || !!r.clear_to_close_at },
      { name: 'Funded',                done: r.status === 'funded' }
    ];

    const recentActs = window.MockData.activities
      .filter(a => a.contact_id === r.contact_id)
      .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at))
      .slice(0, 4);

    Components.openDrawer({
      title: r.contact_name,
      subtitle: `Mortgage · ${r.id}`,
      body: `
        <!-- Status Row -->
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          <span class="badge badge-blue">Mortgage</span>
          ${this.renderStageBadge(r.status)}
          ${r.loan_type ? `<span class="badge badge-gray">${r.loan_type}</span>` : ''}
          ${r.clear_to_close_at ? `<span class="badge badge-green">🎯 CTC Ready</span>` : ''}
          ${r.missing_items.length > 0
            ? `<span class="badge badge-gold">📋 ${r.missing_items.length} blocker${r.missing_items.length !== 1 ? 's' : ''}</span>`
            : ''}
        </div>

        <!-- Loan Milestone Tracker -->
        <div class="profile-section">
          <div class="profile-section-title">Loan Milestones</div>
          <div class="milestone-list">
            ${milestones.map(ms => `
              <div class="milestone-item ${ms.done ? 'done' : 'pending'}">
                <div class="milestone-check">${ms.done ? '✓' : ''}</div>
                <span style="font-size:var(--text-sm);${ms.done ? 'color:var(--color-success-text)' : 'color:var(--neutral-600)'}">
                  ${ms.name}
                </span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Loan Details -->
        <div class="profile-section">
          <div class="profile-section-title">Loan Details</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Loan Type</span>
              <span class="profile-field-value">${r.loan_type || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Pre-Approval</span>
              <span class="profile-field-value">${r.pre_approval_amount ? helpers.formatCurrency(r.pre_approval_amount) : '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Lender</span>
              <span class="profile-field-value">${r.lender_name || '—'}</span>
            </div>
            ${r.clear_to_close_at ? `
            <div class="profile-field">
              <span class="profile-field-label">Clear to Close</span>
              <span class="profile-field-value" style="color:var(--color-success-text);font-weight:var(--weight-semibold)">
                ${helpers.formatDate(r.clear_to_close_at)}
              </span>
            </div>` : ''}
          </div>
        </div>

        <!-- Document Blockers -->
        ${r.missing_items.length > 0 ? `
        <div class="profile-section">
          <div class="profile-section-title">📋 Document Blockers</div>
          <div class="missing-items-list">
            ${r.missing_items.map(item => `
              <div class="missing-item">
                <span>📄</span>
                <span style="flex:1">${item}</span>
                <button class="btn btn-ghost btn-sm" style="padding:0 var(--space-2);height:24px;font-size:10px"
                        onclick="Router.navigate('email');Components.Toast('Email drafted to request: ${item}','success')">
                  Request
                </button>
              </div>`).join('')}
          </div>
          <div style="margin-top:var(--space-3);padding:var(--space-3);background:var(--color-info-bg);
                      border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-info-text)">
            ℹ️ All items above must be collected before this loan can advance to Processing.
          </div>
        </div>` : `
        <div class="profile-section">
          <div style="padding:var(--space-3);background:var(--color-success-bg);border-radius:var(--radius-md);
                      font-size:var(--text-sm);color:var(--color-success-text);font-weight:var(--weight-medium)">
            ✅ No document blockers — loan is ready to advance.
          </div>
        </div>`}

        <!-- Arive Sync -->
        <div class="profile-section">
          <div class="profile-section-title">Arive Integration</div>
          <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <span style="font-size:16px">🏛️</span>
                <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">Arive</span>
              </div>
              <span class="sync-badge ${r.sync_state.status === 'healthy' ? 'healthy' : 'stale'}">
                ${r.sync_state.status === 'healthy' ? '● Synced' : '⚠ Stale'}
              </span>
            </div>
            ${r.arive_loan_id ? `
            <div style="font-size:var(--text-xs);color:var(--neutral-500)">
              Loan ID: <code style="font-family:monospace">${r.arive_loan_id}</code> ·
              Last synced: ${helpers.formatRelative(r.sync_state.last_synced_at)}
            </div>` : `
            <div style="font-size:var(--text-xs);color:var(--color-warning-text)">
              ⚠ No Arive loan ID linked. Record may not sync automatically.
            </div>`}
          </div>
        </div>

        <!-- Stage Advancement -->
        <div class="profile-section">
          <div class="profile-section-title">Advance Stage</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${['pre_approval', 'processing', 'clear_to_close', 'funded'].map(s => `
              <button class="btn btn-${r.status === s ? 'primary' : 'secondary'} btn-sm"
                      onclick="Screens.mortgage.updateStage('${r.id}', '${s}')">
                ${({ pre_approval: 'Pre-Approval', processing: 'Processing',
                     clear_to_close: 'Clear to Close', funded: 'Funded' })[s]}
              </button>`).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="profile-section">
          <div class="profile-section-title">Communication Shortcuts</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('calls')">${Icons.phone} Call</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('sms')">${Icons.message} SMS</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('email')">${Icons.mail} Email</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('activities')">${Icons.activity} Activities</button>
          </div>
        </div>

        <!-- Recent Activity -->
        ${recentActs.length ? `
        <div class="profile-section">
          <div class="profile-section-title">Recent Activity</div>
          <div class="activity-feed">
            ${recentActs.map(a => Components.ActivityItem({
              icon: a.icon, iconClass: a.iconClass,
              title: a.label, actor: a.actor_name, time: a.occurred_at
            })).join('')}
          </div>
        </div>` : ''}
      `,
      footer: `
        <button class="btn btn-secondary"
                onclick="Screens.mortgage.requestMissingItems('${r.id}')">
          📋 Request Items
        </button>
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>
        <button class="btn btn-primary"
                onclick="Screens.mortgage.promoteStage('${r.id}')">Advance Stage →</button>`
    });
  },

  updateStage(recordId, newStage) {
    const r = window.MockData.mortgageRecords.find(x => x.id === recordId);
    if (r) {
      r.status = newStage;
      if (newStage === 'clear_to_close') r.clear_to_close_at = new Date().toISOString();
      Components.Toast(`Stage updated to "${({ pre_approval: 'Pre-Approval', processing: 'Processing', clear_to_close: 'Clear to Close', funded: 'Funded' })[newStage]}"`, 'success');
      Components.closeDrawer();
      this.refreshContent();
    }
  },

  promoteStage(recordId) {
    const order = ['inquiry', 'pre_approval', 'processing', 'clear_to_close', 'funded'];
    const r = window.MockData.mortgageRecords.find(x => x.id === recordId);
    if (!r) return;
    const idx = order.indexOf(r.status);
    if (idx < order.length - 1) this.updateStage(recordId, order[idx + 1]);
    else { Components.Toast('Loan is already at the final stage', 'info'); Components.closeDrawer(); }
  },

  requestMissingItems(recordId) {
    const r = window.MockData.mortgageRecords.find(x => x.id === recordId);
    if (!r || !r.missing_items.length) {
      Components.Toast('No missing items to request', 'info');
      return;
    }
    Components.closeDrawer();
    Components.Toast(`Document request drafted for ${r.contact_name} (${r.missing_items.length} item${r.missing_items.length !== 1 ? 's' : ''})`, 'success');
    Router.navigate('email');
  },

  setView(view) { this._view = view; this.refreshContent(); },

  refreshContent() {
    const el = document.getElementById('mort-content');
    if (el) el.innerHTML = this.renderContent(this.getFiltered());
  },

  clearFilters() {
    this._filters = { stage: '', search: '', missingItems: false, ctcOnly: false };
    this.rerender();
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