/**
 * Burkes Group CRM — Activities Screen
 * Source: .specify/specs/004-activities/spec.md, screens/activities.yaml
 * Batch: 5 of 7 — Activities + Calendar + Email Blast (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.activities = {
  _filters: {
    type: '',
    dept: '',
    actor: '',
    search: '',
    dateRange: '30'   // days back: '7' | '30' | '90' | 'all'
  },

  render() {
    const { activities, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const filtered = this.getFiltered();
    const callCount   = activities.filter(a => a.type.startsWith('call')).length;
    const smsCount    = activities.filter(a => a.type.startsWith('sms')).length;
    const emailCount  = activities.filter(a => a.type.startsWith('email')).length;
    const todayCount  = activities.filter(a => {
      const d = new Date(a.occurred_at);
      const n = new Date();
      return d.getDate() === n.getDate() && d.getMonth() === n.getMonth();
    }).length;

    const actorOptions = [...new Set(activities.map(a => a.actor_name))].sort();

    return `
      <!-- Activities Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Activities</h1>
          <p>Full audit trail · ${activities.length} events recorded · Append-only</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Screens.activities.exportTimeline()">
            ${Icons.download} Export
          </button>
        </div>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Activities', value: activities.length, accent:'navy', icon: Icons.activity })}
        ${StatCard({ label:'Today', value: todayCount, delta: 12, accent:'blue', icon: Icons.chart })}
        ${StatCard({ label:'Calls Logged', value: callCount, accent:'green', icon: Icons.phone })}
        ${StatCard({ label:'Texts + Emails', value: smsCount + emailCount, accent:'gold', icon: Icons.message })}
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input id="act-search" type="text" placeholder="Search contacts, actors, notes…"
                 value="${this._filters.search}"
                 oninput="Screens.activities._filters.search=this.value;Screens.activities.refreshTimeline()">
        </div>
        <select class="filter-select" id="act-type"
                onchange="Screens.activities._filters.type=this.value;Screens.activities.refreshTimeline()">
          <option value="">All Types</option>
          <option value="call_outbound"  ${this._filters.type==='call_outbound'?'selected':''}>Outbound Call</option>
          <option value="call_inbound"   ${this._filters.type==='call_inbound'?'selected':''}>Inbound Call</option>
          <option value="sms_sent"       ${this._filters.type==='sms_sent'?'selected':''}>SMS Sent</option>
          <option value="sms_received"   ${this._filters.type==='sms_received'?'selected':''}>SMS Received</option>
          <option value="email_sent"     ${this._filters.type==='email_sent'?'selected':''}>Email Sent</option>
          <option value="email_received" ${this._filters.type==='email_received'?'selected':''}>Email Received</option>
          <option value="stage_changed"  ${this._filters.type==='stage_changed'?'selected':''}>Stage Changed</option>
          <option value="lead_transferred" ${this._filters.type==='lead_transferred'?'selected':''}>Lead Transferred</option>
          <option value="note_added"     ${this._filters.type==='note_added'?'selected':''}>Note Added</option>
          <option value="portal_intake"  ${this._filters.type==='portal_intake'?'selected':''}>Portal Intake</option>
        </select>
        <select class="filter-select" id="act-dept"
                onchange="Screens.activities._filters.dept=this.value;Screens.activities.refreshTimeline()">
          <option value="">All Departments</option>
          <option value="insurance"   ${this._filters.dept==='insurance'?'selected':''}>Insurance</option>
          <option value="mortgage"    ${this._filters.dept==='mortgage'?'selected':''}>Mortgage</option>
          <option value="real_estate" ${this._filters.dept==='real_estate'?'selected':''}>Real Estate</option>
        </select>
        <select class="filter-select" id="act-actor"
                onchange="Screens.activities._filters.actor=this.value;Screens.activities.refreshTimeline()">
          <option value="">All Agents</option>
          ${actorOptions.map(name => `<option value="${name}" ${this._filters.actor===name?'selected':''}>${name}</option>`).join('')}
        </select>
        <select class="filter-select" id="act-range"
                onchange="Screens.activities._filters.dateRange=this.value;Screens.activities.refreshTimeline()">
          <option value="7"   ${this._filters.dateRange==='7'?'selected':''}>Last 7 days</option>
          <option value="30"  ${this._filters.dateRange==='30'?'selected':''}>Last 30 days</option>
          <option value="90"  ${this._filters.dateRange==='90'?'selected':''}>Last 90 days</option>
          <option value="all" ${this._filters.dateRange==='all'?'selected':''}>All time</option>
        </select>
        <button class="filter-clear" onclick="Screens.activities.clearFilters()">Clear</button>
      </div>

      <!-- Compliance Notice -->
      <div class="degraded-banner" style="border-color:var(--color-primary-navy);background:rgba(26,58,82,0.05);margin-bottom:var(--space-4)">
        <span style="font-size:16px">🔒</span>
        <span style="color:var(--color-primary-navy);font-weight:var(--weight-medium)">
          Activity log is <strong>append-only and immutable</strong> — entries cannot be edited or deleted. Corrections must be appended as new entries.
        </span>
        <span style="margin-left:auto;font-size:var(--text-xs);color:var(--neutral-400)">Per ADR-007</span>
      </div>

      <!-- Timeline -->
      <div id="act-timeline">
        ${this.renderTimeline(filtered)}
      </div>`;
  },

  getFiltered() {
    const { activities } = window.MockData;
    let data = [...activities].sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at));

    const { type, dept, actor, search, dateRange } = this._filters;

    if (dateRange !== 'all') {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - parseInt(dateRange));
      data = data.filter(a => new Date(a.occurred_at) >= cutoff);
    }
    if (type)   data = data.filter(a => a.type === type);
    if (dept)   data = data.filter(a => a.department === dept);
    if (actor)  data = data.filter(a => a.actor_name === actor);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(a =>
        (a.contact_name||'').toLowerCase().includes(q) ||
        (a.actor_name||'').toLowerCase().includes(q)  ||
        (a.notes||'').toLowerCase().includes(q)        ||
        (a.label||'').toLowerCase().includes(q)
      );
    }
    return data;
  },

  renderTimeline(activities) {
    if (!activities.length) {
      return `
        <div class="card" style="padding:var(--space-10);text-align:center">
          <div style="font-size:40px;margin-bottom:var(--space-3)">📋</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-primary-navy)">No activity found</div>
          <div style="color:var(--neutral-400);font-size:var(--text-sm);margin-top:var(--space-2)">Try adjusting filters or expanding the date range</div>
        </div>`;
    }

    // Group by calendar date
    const groups = {};
    activities.forEach(a => {
      const key = new Date(a.occurred_at).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });

    const { helpers } = window.MockData;

    return `
      <div style="position:relative">
        ${Object.entries(groups).map(([dateStr, items]) => {
          const date = new Date(dateStr);
          const isToday = date.toDateString() === new Date().toDateString();
          const isYesterday = (() => {
            const y = new Date(); y.setDate(y.getDate() - 1);
            return date.toDateString() === y.toDateString();
          })();
          const label = isToday ? 'Today' : isYesterday ? 'Yesterday'
            : date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

          return `
            <div style="margin-bottom:var(--space-6)">
              <!-- Date Header -->
              <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
                <div style="font-family:var(--font-heading);font-size:var(--text-sm);font-weight:var(--weight-bold);
                            color:${isToday?'var(--color-primary-navy)':'var(--neutral-500)'};
                            white-space:nowrap">
                  ${label}
                </div>
                <div style="flex:1;height:1px;background:var(--neutral-200)"></div>
                <span style="font-size:var(--text-xs);color:var(--neutral-400)">${items.length} event${items.length!==1?'s':''}</span>
              </div>

              <!-- Activity Items -->
              <div class="card" style="overflow:hidden">
                ${items.map((a, idx) => this.renderActivityRow(a, idx === items.length - 1)).join('')}
              </div>
            </div>`;
        }).join('')}

        <!-- End of timeline -->
        <div style="text-align:center;padding:var(--space-6);color:var(--neutral-300)">
          <div style="font-size:11px;font-weight:var(--weight-semibold);text-transform:uppercase;letter-spacing:.06em">
            — End of timeline · ${activities.length} events —
          </div>
        </div>
      </div>`;
  },

  renderActivityRow(a, isLast) {
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const typeColors = {
      call_outbound: 'var(--color-info-bg)',
      call_inbound:  'var(--color-success-bg)',
      sms_sent:      'var(--color-success-bg)',
      sms_received:  '#f3e8ff',
      email_sent:    'var(--dept-mortgage-bg)',
      email_received:'var(--color-gold-light)',
      stage_changed: 'var(--color-warning-bg)',
      lead_transferred:'#f3e8ff',
      note_added:    'var(--neutral-100)',
      portal_intake: 'var(--color-gold-light)'
    };

    const complianceBadge = a.recorded
      ? `<span class="recording-badge" style="flex-shrink:0"><span class="recording-dot"></span> Recorded</span>`
      : '';

    const deptColors = {
      insurance: 'var(--dept-insurance-text)', mortgage: 'var(--dept-mortgage-text)',
      real_estate: 'var(--dept-real-estate-text)'
    };

    return `
      <div onclick="Screens.activities.openDetail('${a.id}')"
           style="display:flex;align-items:flex-start;gap:var(--space-4);padding:var(--space-4) var(--space-5);
                  border-bottom:${isLast?'none':'1px solid var(--neutral-100)'};
                  cursor:pointer;transition:background .1s"
           onmouseover="this.style.background='var(--neutral-50)'"
           onmouseout="this.style.background=''">

        <!-- Icon -->
        <div style="width:36px;height:36px;border-radius:var(--radius-full);background:${typeColors[a.type]||'var(--neutral-100)'};
                    display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;margin-top:2px">
          ${a.icon}
        </div>

        <!-- Content -->
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:baseline;gap:var(--space-2);flex-wrap:wrap;margin-bottom:2px">
            <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--neutral-800)">${a.contact_name || 'System'}</span>
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">—</span>
            <span style="font-size:var(--text-sm);color:var(--neutral-600)">${a.label}</span>
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap">
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">by ${a.actor_name}</span>
            ${a.department ? `<span style="font-size:10px;font-weight:var(--weight-semibold);text-transform:uppercase;letter-spacing:.04em;color:${deptColors[a.department]||'var(--neutral-500)'}">${window.MockData.helpers.departmentLabel(a.department)}</span>` : ''}
            ${a.notes ? `<span style="font-size:var(--text-xs);color:var(--neutral-500);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px">📝 ${a.notes}</span>` : ''}
          </div>
        </div>

        <!-- Right Side -->
        <div style="display:flex;align-items:center;gap:var(--space-3);flex-shrink:0">
          ${complianceBadge}
          <span style="font-size:var(--text-xs);color:var(--neutral-400);white-space:nowrap">
            ${helpers.formatRelative(a.occurred_at)}
          </span>
          <span style="color:var(--neutral-300)">${Icons.chevronDown}</span>
        </div>
      </div>`;
  },

  openDetail(activityId) {
    const a = window.MockData.activities.find(x => x.id === activityId);
    if (!a) return;
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const typeDescriptions = {
      call_outbound: 'Outbound VOIP call placed from the CRM',
      call_inbound: 'Inbound call received and logged',
      sms_sent: 'Outbound SMS sent from CRM thread',
      sms_received: 'Inbound SMS received and linked to contact',
      email_sent: 'Outbound email sent via Outlook integration',
      email_received: 'Inbound email received and linked to contact',
      stage_changed: 'Pipeline stage updated by an operator',
      lead_transferred: 'Lead ownership transferred to new agent',
      note_added: 'Manual note added to contact record',
      portal_intake: 'Contact created or updated via client portal submission'
    };

    const complianceSection = a.recorded ? `
      <div style="padding:var(--space-4);background:var(--color-warning-bg);border-radius:var(--radius-md);margin-top:var(--space-4)">
        <div style="font-size:var(--text-xs);font-weight:var(--weight-semibold);text-transform:uppercase;letter-spacing:.07em;color:var(--color-warning-text);margin-bottom:var(--space-3)">
          Compliance Metadata
        </div>
        <div class="profile-fields-grid">
          <div class="profile-field">
            <span class="profile-field-label">Recording Status</span>
            <span class="profile-field-value"><span class="recording-badge"><span class="recording-dot"></span> Recorded</span></span>
          </div>
          <div class="profile-field">
            <span class="profile-field-label">Retention Department</span>
            <span class="profile-field-value">${helpers.departmentLabel(a.department)}</span>
          </div>
          <div class="profile-field">
            <span class="profile-field-label">Retention Window</span>
            <span class="profile-field-value">${a.department==='insurance'?'18 months':a.department==='mortgage'?'24 months':'4 years'}</span>
          </div>
          <div class="profile-field">
            <span class="profile-field-label">Access Scope</span>
            <span class="profile-field-value">Department + Platform Admin</span>
          </div>
        </div>
      </div>` : '';

    Components.openDrawer({
      title: a.label,
      subtitle: `${a.contact_name} · ${helpers.formatDateTime(a.occurred_at)}`,
      body: `
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          <span class="badge badge-${a.type.startsWith('call')?'blue':a.type.startsWith('sms')?'green':a.type.startsWith('email')?'navy':'gray'}">${a.label}</span>
          ${a.department ? `<span class="badge badge-${a.department==='insurance'?'gold':a.department==='mortgage'?'blue':'green'}">${helpers.departmentLabel(a.department)}</span>` : ''}
          ${a.recorded ? `<span class="recording-badge"><span class="recording-dot"></span> Recorded</span>` : ''}
          <span class="badge badge-gray">Immutable</span>
        </div>

        <!-- Event Description -->
        <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--neutral-600);margin-bottom:var(--space-5)">
          ${typeDescriptions[a.type] || 'CRM activity event'}
        </div>

        <div class="profile-section">
          <div class="profile-section-title">Event Details</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Event ID</span>
              <span class="profile-field-value" style="font-family:monospace;font-size:11px">${a.id}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Type</span>
              <span class="profile-field-value">${a.type}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Contact</span>
              <span class="profile-field-value">${a.contact_name || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Performed By</span>
              <span class="profile-field-value">${a.actor_name}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Timestamp</span>
              <span class="profile-field-value">${helpers.formatDateTime(a.occurred_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Department</span>
              <span class="profile-field-value">${a.department ? helpers.departmentLabel(a.department) : '—'}</span>
            </div>
          </div>
        </div>

        ${a.notes ? `
        <div class="profile-section">
          <div class="profile-section-title">Notes</div>
          <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--neutral-600)">
            📝 ${a.notes}
          </div>
        </div>` : ''}

        ${complianceSection}
      `,
      footer: `
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')">
          ${Icons.users} View Contact
        </button>
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>`
    });
  },

  refreshTimeline() {
    const el = document.getElementById('act-timeline');
    if (el) el.innerHTML = this.renderTimeline(this.getFiltered());
  },

  clearFilters() {
    this._filters = { type:'', dept:'', actor:'', search:'', dateRange:'30' };
    ['act-search','act-type','act-dept','act-actor'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const range = document.getElementById('act-range');
    if (range) range.value = '30';
    this.refreshTimeline();
  },

  exportTimeline() {
    Components.Toast('Timeline export queued — download will begin shortly', 'info');
  },

  init() {}
};