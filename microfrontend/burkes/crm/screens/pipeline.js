/**
 * Burkes Group CRM — Pipeline Screen
 * Source: .specify/specs/003-pipeline/spec.md, screens/pipeline.yaml
 * Batch: 3 of 7 — Pipeline + Calls (Phase 1)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.pipeline = {
  _view: 'kanban',   // 'kanban' | 'list' | 'forecast'
  _dept: '',
  _priority: '',
  _search: '',

  render() {
    const { leads, helpers } = window.MockData;
    const { Icons } = window.Components;
    return `
      <!-- Pipeline Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Pipeline</h1>
          <p>${leads.length} active leads · Shared across departments</p>
        </div>
        <div class="screen-actions">
          <div class="pipeline-view-toggle">
            <button class="view-toggle-btn ${this._view==='kanban'?'active':''}"
                    onclick="Screens.pipeline.setView('kanban')">
              ${Icons.layouts} Board
            </button>
            <button class="view-toggle-btn ${this._view==='list'?'active':''}"
                    onclick="Screens.pipeline.setView('list')">
              ${Icons.sort||'≡'} List
            </button>
            <button class="view-toggle-btn ${this._view==='forecast'?'active':''}"
                    onclick="Screens.pipeline.setView('forecast')">
              ${Icons.chart} Forecast
            </button>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Router.quickAction('new-lead')">
            ${Icons.plus} New Lead
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input id="pipeline-search" type="text" placeholder="Search contacts, agents…"
                 value="${this._search}"
                 oninput="Screens.pipeline._search=this.value;Screens.pipeline.refresh()">
        </div>
        <select class="filter-select" id="pipeline-dept"
                onchange="Screens.pipeline._dept=this.value;Screens.pipeline.refresh()">
          <option value="">All Departments</option>
          <option value="insurance" ${this._dept==='insurance'?'selected':''}>Insurance</option>
          <option value="mortgage" ${this._dept==='mortgage'?'selected':''}>Mortgage</option>
          <option value="real_estate" ${this._dept==='real_estate'?'selected':''}>Real Estate</option>
        </select>
        <select class="filter-select" id="pipeline-priority"
                onchange="Screens.pipeline._priority=this.value;Screens.pipeline.refresh()">
          <option value="">All Priorities</option>
          <option value="hot" ${this._priority==='hot'?'selected':''}>Hot 🔥</option>
          <option value="warm" ${this._priority==='warm'?'selected':''}>Warm</option>
          <option value="cool" ${this._priority==='cool'?'selected':''}>Cool</option>
        </select>
        <button class="filter-clear" onclick="Screens.pipeline.clearFilters()">Clear</button>
      </div>

      <!-- View Content -->
      <div id="pipeline-view-content">
        ${this.renderView()}
      </div>`;
  },

  getFiltered() {
    let data = window.MockData.leads;
    if (this._dept) data = data.filter(l => l.department === this._dept);
    if (this._priority) data = data.filter(l => l.priority === this._priority);
    if (this._search) {
      const q = this._search.toLowerCase();
      data = data.filter(l =>
        l.contact_name?.toLowerCase().includes(q) ||
        l.assigned_agent_id?.toLowerCase().includes(q) ||
        l.stage?.toLowerCase().includes(q)
      );
    }
    return data;
  },

  renderView() {
    const filtered = this.getFiltered();
    if (this._view === 'kanban') return this.renderKanban(filtered);
    if (this._view === 'list')   return this.renderList(filtered);
    return this.renderForecast(filtered);
  },

  renderKanban(filtered) {
    const { Icons, DeptBadge, StageBadge } = window.Components;
    const stages = ['New Inquiry','Contacted','Quoted / Offer','Under Contract','Pending Close','Closed'];
    const helpers = window.MockData.helpers;

    const byStage = {};
    stages.forEach(s => { byStage[s] = []; });
    filtered.forEach(l => { if (byStage[l.stage]) byStage[l.stage].push(l); });

    const stageColors = {
      'New Inquiry': 'var(--neutral-400)', 'Contacted': 'var(--color-info)',
      'Quoted / Offer': 'var(--color-warning)', 'Under Contract': 'var(--color-primary-navy)',
      'Pending Close': 'var(--color-success)', 'Closed': 'var(--color-success)'
    };

    return `<div class="pipeline-board">
      ${stages.map(stage => `
        <div class="pipeline-column">
          <div class="pipeline-column-header">
            <span class="pipeline-column-title" style="color:${stageColors[stage]}">${stage}</span>
            <span class="pipeline-column-count" style="background:${stageColors[stage]}">${byStage[stage].length}</span>
          </div>
          <div class="pipeline-column-cards">
            ${byStage[stage].length ? byStage[stage].map(lead => {
              const dept = lead.department;
              const dotClass = `dept-dot-${dept === 'real_estate' ? 'real-estate' : dept}`;
              const user = window.MockData.users.find(u => u.id === lead.assigned_agent_id);
              return `
                <div class="pipeline-card" onclick="Screens.pipeline.openLeadDrawer('${lead.id}')">
                  <div class="pipeline-card-name">${lead.contact_name}</div>
                  <div class="pipeline-card-meta">
                    <div class="pipeline-card-dept">
                      <span class="dept-dot ${dotClass}"></span>
                      <span>${helpers.departmentLabel(dept)}</span>
                    </div>
                    <span class="badge badge-${lead.priority==='hot'?'red':lead.priority==='warm'?'gold':'blue'}" style="font-size:10px">${lead.priority}</span>
                  </div>
                  <div class="pipeline-card-footer">
                    <span class="pipeline-card-agent">${user?.full_name || '—'}</span>
                    <span class="pipeline-card-activity">${helpers.formatRelative(lead.last_activity_at)}</span>
                  </div>
                </div>`;
            }).join('') : `<div style="padding:var(--space-4);color:var(--neutral-300);font-size:var(--text-xs);text-align:center;border:1.5px dashed var(--neutral-200);border-radius:var(--radius-md)">No leads</div>`}
          </div>
        </div>`).join('')}
    </div>`;
  },

  renderList(filtered) {
    const { DataTable, DeptBadge, StageBadge, Avatar } = window.Components;
    const { helpers } = window.MockData;

    const columns = [
      {
        key: 'contact_name', label: 'Contact',
        render: (v, row) => {
          const initials = v.split(' ').map(n=>n[0]).join('').toUpperCase();
          return `<div style="display:flex;align-items:center;gap:var(--space-3)">
            ${Avatar({ initials, size: 28 })}
            <span style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${v}</span>
          </div>`;
        }
      },
      {
        key: 'department', label: 'Department',
        render: v => DeptBadge(v)
      },
      {
        key: 'stage', label: 'Stage',
        render: v => StageBadge(v)
      },
      {
        key: 'priority', label: 'Priority',
        render: v => `<span class="badge badge-${v==='hot'?'red':v==='warm'?'gold':'blue'}">${v}</span>`
      },
      {
        key: 'assigned_agent_id', label: 'Agent',
        render: v => {
          const u = window.MockData.users.find(u => u.id === v);
          return `<span style="font-size:var(--text-sm);color:var(--neutral-600)">${u?.full_name || '—'}</span>`;
        }
      },
      {
        key: 'last_activity_at', label: 'Last Activity',
        render: v => `<span style="font-size:var(--text-xs);color:var(--neutral-400)">${helpers.formatRelative(v)}</span>`
      },
      {
        key: '_actions', label: '',
        render: (v, row) => `
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Router.navigate('calls')" title="Call">📞</button>
            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Router.navigate('sms')" title="SMS">💬</button>
            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Router.navigate('email')" title="Email">✉️</button>
          </div>`
      }
    ];

    return DataTable({
      id: 'pipeline-list',
      columns,
      rows: filtered,
      pageSize: 15,
      searchable: false,
      emptyMsg: 'No leads match the current filters',
      onRowClick: (row) => Screens.pipeline.openLeadDrawer(row.id)
    });
  },

  renderForecast(filtered) {
    const { helpers } = window.MockData;
    const stages = ['New Inquiry','Contacted','Quoted / Offer','Under Contract','Pending Close','Closed'];
    const bySt = {};
    stages.forEach(s => { bySt[s] = 0; });
    filtered.forEach(l => { if (bySt[l.stage] !== undefined) bySt[l.stage]++; });

    const total = filtered.length;
    const hot = filtered.filter(l=>l.priority==='hot').length;
    const depts = [...new Set(filtered.map(l=>l.department))];
    const byDept = {};
    depts.forEach(d => { byDept[d] = filtered.filter(l=>l.department===d).length; });

    return `
      <div class="forecast-grid">
        <div class="forecast-card">
          <div class="forecast-card-value">${total}</div>
          <div class="forecast-card-label">Total Active Leads</div>
          <div class="forecast-card-sub">${hot} hot priority</div>
        </div>
        <div class="forecast-card">
          <div class="forecast-card-value">${bySt['Pending Close'] + bySt['Closed']}</div>
          <div class="forecast-card-label">Near Close</div>
          <div class="forecast-card-sub">Pending Close + Closed this period</div>
        </div>
        <div class="forecast-card">
          <div class="forecast-card-value">${total ? Math.round((bySt['Closed']/total)*100) : 0}%</div>
          <div class="forecast-card-label">Conversion Rate</div>
          <div class="forecast-card-sub">Closed / total leads</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:var(--space-5)">
        <div class="card-header">
          <span class="card-title">Stage Distribution</span>
        </div>
        <div class="card-body">
          <div class="funnel-stages">
            ${stages.map((s, i) => {
              const maxVal = Math.max(...stages.map(st=>bySt[st]), 1);
              const pct = Math.round((bySt[s]/maxVal)*80);
              return `
                <div class="funnel-stage">
                  <div class="funnel-bar-wrapper">
                    <div class="funnel-bar" style="height:${Math.max(pct,8)}px"></div>
                  </div>
                  <div class="funnel-count">${bySt[s]}</div>
                  <div class="funnel-label">${s}</div>
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="grid-3">
        ${depts.map(d => `
          <div class="card">
            <div class="card-header">
              <span class="card-title" style="display:flex;align-items:center;gap:8px">
                <span class="dept-dot dept-dot-${d==='real_estate'?'real-estate':d}"></span>
                ${helpers.departmentLabel(d)}
              </span>
              <span class="badge badge-${d==='insurance'?'gold':d==='mortgage'?'blue':'green'}">${byDept[d]}</span>
            </div>
            <div class="card-body" style="padding:var(--space-4)">
              ${stages.map(s => {
                const count = filtered.filter(l=>l.department===d&&l.stage===s).length;
                return count > 0 ? `
                  <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);padding:var(--space-1) 0;border-bottom:1px solid var(--neutral-50)">
                    <span style="color:var(--neutral-600)">${s}</span>
                    <span style="font-weight:var(--weight-semibold)">${count}</span>
                  </div>` : '';
              }).join('')}
            </div>
          </div>`).join('')}
      </div>`;
  },

  setView(v) {
    this._view = v;
    this.refresh();
  },

  refresh() {
    const el = document.getElementById('pipeline-view-content');
    if (el) el.innerHTML = this.renderView();
    // Re-render header to update active toggle
    const content = document.getElementById('content');
    if (content && this._view) {
      const toggle = document.querySelector('.pipeline-view-toggle');
      if (toggle) {
        toggle.querySelectorAll('.view-toggle-btn').forEach((btn, i) => {
          const views = ['kanban','list','forecast'];
          btn.classList.toggle('active', views[i] === this._view);
        });
      }
    }
  },

  clearFilters() {
    this._dept = '';
    this._priority = '';
    this._search = '';
    ['pipeline-search','pipeline-dept','pipeline-priority'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    this.refresh();
  },

  openLeadDrawer(leadId) {
    const lead = window.MockData.leads.find(l => l.id === leadId);
    if (!lead) return;
    const { Icons, DeptBadge, StageBadge, Avatar } = window.Components;
    const { helpers, users, activities } = window.MockData;

    const user = users.find(u => u.id === lead.assigned_agent_id);
    const contact = window.MockData.contacts.find(c => c.id === lead.contact_id);
    const recentActs = activities
      .filter(a => a.contact_id === lead.contact_id)
      .sort((a,b) => new Date(b.occurred_at) - new Date(a.occurred_at))
      .slice(0, 5);

    const stages = ['New Inquiry','Contacted','Quoted / Offer','Under Contract','Pending Close','Closed'];

    Components.openDrawer({
      title: lead.contact_name,
      subtitle: `${helpers.departmentLabel(lead.department)} · ${lead.id}`,
      body: `
        <!-- Status Row -->
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          ${DeptBadge(lead.department)}
          ${StageBadge(lead.stage)}
          <span class="badge badge-${lead.priority==='hot'?'red':lead.priority==='warm'?'gold':'blue'}">${lead.priority} priority</span>
          ${lead.source ? `<span class="badge badge-gray">${lead.source}</span>` : ''}
        </div>

        <!-- Stage Progress -->
        <div class="profile-section">
          <div class="profile-section-title">Stage Progress</div>
          <div style="display:flex;align-items:center;gap:4px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px">
            ${stages.map((s, i) => {
              const idx = stages.indexOf(lead.stage);
              const done = i < idx; const active = i === idx;
              return `<div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
                <div style="display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer"
                     onclick="Screens.pipeline.updateStage('${lead.id}','${s}')">
                  <div style="width:28px;height:28px;border-radius:50%;border:2px solid ${done||active?'var(--color-success)':'var(--neutral-300)'};background:${done?'var(--color-success)':active?'var(--color-primary-navy)':'white'};display:flex;align-items:center;justify-content:center;color:${done||active?'white':'var(--neutral-400)'};font-size:10px;font-weight:700;transition:.15s">
                    ${done ? '✓' : i+1}
                  </div>
                  <span style="font-size:9px;color:${active?'var(--color-primary-navy)':done?'var(--color-success)':'var(--neutral-400)'};font-weight:${active?'700':'400'};text-align:center;max-width:52px;line-height:1.2">${s}</span>
                </div>
                ${i < stages.length-1 ? `<div style="width:16px;height:2px;background:${done?'var(--color-success)':'var(--neutral-200)'};flex-shrink:0;margin-bottom:16px"></div>` : ''}
              </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Details -->
        <div class="profile-section">
          <div class="profile-section-title">Lead Details</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Assigned Agent</span>
              <span class="profile-field-value">${user?.full_name || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Source</span>
              <span class="profile-field-value">${lead.source || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Created</span>
              <span class="profile-field-value">${helpers.formatDate(lead.created_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Last Activity</span>
              <span class="profile-field-value">${helpers.formatRelative(lead.last_activity_at)}</span>
            </div>
          </div>
          ${lead.notes_summary ? `
          <div style="margin-top:var(--space-3);padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--neutral-600)">
            📝 ${lead.notes_summary}
          </div>` : ''}
        </div>

        <!-- Communication shortcuts -->
        <div class="profile-section">
          <div class="profile-section-title">Quick Actions</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('calls')">${Icons.phone} Call</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('sms')">${Icons.message} SMS</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('email')">${Icons.mail} Email</button>
            ${contact ? `<button class="btn btn-secondary btn-sm" onclick="Screens.contacts.openProfile('${contact.id}')">${Icons.users} Contact</button>` : ''}
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
        <button class="btn btn-secondary" onclick="Screens.pipeline.openTransferModal('${lead.id}')">Transfer Lead</button>
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>
        <button class="btn btn-primary" onclick="Screens.pipeline.updateStageFromDrawer('${lead.id}')">Update Stage</button>`
    });
  },

  updateStage(leadId, newStage) {
    const lead = window.MockData.leads.find(l => l.id === leadId);
    if (lead) {
      lead.stage = newStage;
      Components.Toast(`Stage updated to "${newStage}"`, 'success');
      Components.closeDrawer();
      this.refresh();
    }
  },

  updateStageFromDrawer(leadId) {
    const lead = window.MockData.leads.find(l => l.id === leadId);
    if (!lead) return;
    const stages = ['New Inquiry','Contacted','Quoted / Offer','Under Contract','Pending Close','Closed'];
    const idx = stages.indexOf(lead.stage);
    const next = stages[Math.min(idx + 1, stages.length - 1)];
    this.updateStage(leadId, next);
  },

  openTransferModal(leadId) {
    const lead = window.MockData.leads.find(l => l.id === leadId);
    if (!lead) return;
    Components.closeDrawer();
    const { users, helpers } = window.MockData;
    const { Icons, Modal } = window.Components;

    Components.openModal(Modal({
      id: 'transfer-lead',
      title: 'Transfer Lead',
      subtitle: `Reassign ${lead.contact_name} to a new owner`,
      body: `
        <div class="form-group">
          <label class="form-label required">Department</label>
          <select class="form-select" id="tl-dept">
            <option value="insurance">Insurance</option>
            <option value="mortgage">Mortgage</option>
            <option value="real_estate">Real Estate</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">New Owner</label>
          <select class="form-select" id="tl-agent">
            ${users.filter(u=>u.role!=='PA').map(u => `<option value="${u.id}">${u.full_name} · ${helpers.roleName(u.role)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Transfer Note</label>
          <textarea class="form-input" rows="3" style="height:auto;padding:var(--space-2) var(--space-3)" placeholder="Optional note for the new owner…"></textarea>
        </div>
        <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-info-text)">
          ℹ️ The new owner will be notified. Full activity history is preserved.
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('transfer-lead')">Cancel</button>
        <button class="btn btn-primary" onclick="Screens.pipeline.confirmTransfer('${leadId}')">
          ${Icons.arrowRight} Transfer Lead
        </button>`
    }));
  },

  confirmTransfer(leadId) {
    Components.closeModal('transfer-lead');
    const agentId = document.getElementById('tl-agent')?.value;
    const lead = window.MockData.leads.find(l => l.id === leadId);
    if (lead && agentId) {
      lead.assigned_agent_id = agentId;
      const user = window.MockData.users.find(u => u.id === agentId);
      Components.Toast(`Lead transferred to ${user?.full_name || 'new owner'}`, 'success');
      this.refresh();
    }
  },

  init() {}
};