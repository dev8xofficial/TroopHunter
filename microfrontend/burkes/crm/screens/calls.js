/**
 * Burkes Group CRM — Calls Screen
 * Source: .specify/specs/006-calls/spec.md, screens/calls.yaml
 * Batch: 3 of 7 — Pipeline + Calls (Phase 1)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.calls = {
  _dialBuffer: '',
  _activeFilter: '',

  render() {
    const { activities, recordings, contacts, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const callActivities = activities
      .filter(a => a.type === 'call_outbound' || a.type === 'call_inbound')
      .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at));

    const todayCalls = callActivities.filter(a => {
      const d = new Date(a.occurred_at);
      const now = new Date();
      return d.getDate() === now.getDate() && d.getMonth() === now.getMonth();
    }).length;

    const recordedCalls = callActivities.filter(a => a.recorded).length;
    const availableRecs = recordings.filter(r => r.status === 'available').length;

    return `
      <!-- Calls Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Calls</h1>
          <p>VOIP dialer · Call log · Recording management</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Screens.calls.openUnmatchedQueue()">
            ${Icons.alertTriangle} Unmatched (2)
          </button>
        </div>
      </div>

      <!-- Compliance Banner -->
      <div class="degraded-banner" style="border-color:var(--color-success);background:var(--color-success-bg)">
        <span class="degraded-banner-icon" style="color:var(--color-success)">🔒</span>
        <span class="degraded-banner-text" style="color:var(--color-success-text)">
          Compliance recording <strong>active</strong> · Insurance: 18 mo · Mortgage: 24 mo · Real Estate: 4 yr
        </span>
        <span style="font-size:var(--text-xs);color:var(--color-success-text);opacity:0.7">Burkes Group Marketing LLC</span>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Calls Today', value: todayCalls, accent:'navy', icon: Icons.phone })}
        ${StatCard({ label:'Total This Week', value: callActivities.length, accent:'blue', icon: Icons.activity })}
        ${StatCard({ label:'Recorded', value: recordedCalls, accent:'green', icon: Icons.mic })}
        ${StatCard({ label:'Recordings Available', value: availableRecs, accent:'gold', icon: Icons.play })}
      </div>

      <!-- Main Layout: Dialer + Call Log -->
      <div class="calls-layout">

        <!-- Dialer Panel -->
        <div class="dialer-card">
          <div style="color:rgba(255,255,255,0.6);font-size:var(--text-xs);font-weight:var(--weight-semibold);text-transform:uppercase;letter-spacing:0.08em">
            VOIP Dialer
          </div>
          <div class="dialer-display">
            <div>
              <div class="dialer-number" id="dialer-display">${this._dialBuffer || '—'}</div>
              <div class="dialer-name" id="dialer-name">Enter number or search contact</div>
            </div>
          </div>
          <div class="dialer-pad">
            ${[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']].map(([k, sub]) => `
              <div class="dialer-key" onclick="Screens.calls.dialKey('${k}')">
                ${k}
                ${sub ? `<span class="dialer-key-sub">${sub}</span>` : ''}
              </div>`).join('')}
          </div>
          <div class="dialer-actions">
            <div class="dialer-call-btn" onclick="Screens.calls.placeCall()" title="Call">📞</div>
            <div class="dialer-clear-btn" onclick="Screens.calls.clearDial()" title="Clear">⌫</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:var(--space-3)">
            <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.4);margin-bottom:var(--space-2)">Quick Dial</div>
            ${window.MockData.contacts.slice(0,4).map(c => `
              <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2);border-radius:var(--radius-md);cursor:pointer;transition:.1s"
                   onmouseover="this.style.background='rgba(255,255,255,0.07)'" onmouseout="this.style.background=''"
                   onclick="Screens.calls.quickDial('${c.id}')">
                <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;flex-shrink:0">
                  ${c.first_name[0]}${c.last_name[0]}
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-xs);color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.first_name} ${c.last_name}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.4)">${c.phone}</div>
                </div>
                <span style="color:rgba(255,255,255,0.4);font-size:12px">📞</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Call Log -->
        <div>
          <!-- Filter tabs -->
          <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4)">
            ${[['','All Calls'],['call_outbound','Outbound'],['call_inbound','Inbound']].map(([type, label]) => `
              <button class="btn btn-${this._activeFilter===type?'primary':'secondary'} btn-sm"
                      onclick="Screens.calls.setFilter('${type}')">
                ${label}
              </button>`).join('')}
          </div>

          <div class="table-wrapper">
            <div class="table-toolbar">
              <span class="table-toolbar-title">Call History</span>
              <div class="table-toolbar-right">
                <button class="btn btn-ghost btn-sm">${Icons.download} Export</button>
              </div>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Direction</th>
                    <th>Department</th>
                    <th>Duration</th>
                    <th>Recording</th>
                    <th>Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${this.getFilteredCalls(callActivities).slice(0, 20).map(a => {
                    const rec = recordings.find(r => r.call_id?.includes(a.id.slice(-4)));
                    const dept = a.department;
                    return `
                      <tr onclick="Screens.calls.openCallDetail('${a.id}')" style="cursor:pointer">
                        <td>
                          <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${a.contact_name || 'Unknown'}</div>
                          <div style="font-size:var(--text-xs);color:var(--neutral-400)">${a.actor_name}</div>
                        </td>
                        <td>
                          <span class="badge badge-${a.type==='call_outbound'?'blue':'green'}">
                            ${a.type==='call_outbound'?'↑ Out':'↓ In'}
                          </span>
                        </td>
                        <td><span class="badge badge-${dept==='insurance'?'gold':dept==='mortgage'?'blue':'green'}">${window.MockData.helpers.departmentLabel(dept)}</span></td>
                        <td><span style="font-size:var(--text-sm);font-family:monospace">${a.recorded ? Math.floor(Math.random()*15+2)+'m '+Math.floor(Math.random()*59)+'s' : '—'}</span></td>
                        <td>
                          ${a.recorded
                            ? `<span class="recording-badge"><span class="recording-dot"></span> Recorded</span>`
                            : `<span style="color:var(--neutral-300);font-size:var(--text-xs)">—</span>`}
                        </td>
                        <td><span style="font-size:var(--text-xs);color:var(--neutral-400)">${helpers.formatRelative(a.occurred_at)}</span></td>
                        <td>
                          <div style="display:flex;gap:4px">
                            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Screens.calls.openPostCall('${a.id}')" title="Log note">📝</button>
                            ${a.recorded ? `<button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Screens.calls.playRecording('${a.id}')" title="Play">▶</button>` : ''}
                          </div>
                        </td>
                      </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Recordings Section -->
          <div class="card" style="margin-top:var(--space-5)">
            <div class="card-header">
              <span class="card-title">Recent Recordings</span>
              <span style="font-size:var(--text-xs);color:var(--neutral-400)">${recordings.length} total · ${recordings.filter(r=>r.status==='available').length} available</span>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <tr><th>ID</th><th>Department</th><th>Recorded</th><th>Expires</th><th>Status</th><th>Access</th></tr>
                </thead>
                <tbody>
                  ${recordings.slice(0,8).map(r => `
                    <tr>
                      <td><code style="font-size:var(--text-xs)">${r.id}</code></td>
                      <td><span class="badge badge-${r.department==='insurance'?'gold':r.department==='mortgage'?'blue':'green'}">${r.department}</span></td>
                      <td style="font-size:var(--text-xs);color:var(--neutral-500)">${helpers.formatDate(r.recorded_at)}</td>
                      <td style="font-size:var(--text-xs);color:${new Date(r.expires_at)<new Date()?'var(--color-danger)':'var(--neutral-500)'}">
                        ${helpers.formatDate(r.expires_at)}
                      </td>
                      <td><span class="badge badge-${r.status==='available'?'green':r.status==='failed'?'red':'gray'}">${r.status}</span></td>
                      <td><span style="font-size:var(--text-xs);color:var(--neutral-400)">${r.access_scope}</span></td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;
  },

  getFilteredCalls(all) {
    if (!this._activeFilter) return all;
    return all.filter(a => a.type === this._activeFilter);
  },

  dialKey(k) {
    this._dialBuffer = (this._dialBuffer + k).slice(0, 14);
    const el = document.getElementById('dialer-display');
    if (el) el.textContent = this._dialBuffer || '—';
    // Try to match contact
    const c = window.MockData.contacts.find(c =>
      (c.phone || '').replace(/\D/g,'').includes(this._dialBuffer.replace(/\D/g,''))
    );
    const nameEl = document.getElementById('dialer-name');
    if (nameEl && c) nameEl.textContent = `${c.first_name} ${c.last_name}`;
  },

  clearDial() {
    this._dialBuffer = this._dialBuffer.slice(0, -1);
    const el = document.getElementById('dialer-display');
    if (el) el.textContent = this._dialBuffer || '—';
    const nameEl = document.getElementById('dialer-name');
    if (nameEl && !this._dialBuffer) nameEl.textContent = 'Enter number or search contact';
  },

  quickDial(contactId) {
    const c = window.MockData.contacts.find(c => c.id === contactId);
    if (c) {
      this._dialBuffer = c.phone.replace(/\D/g,'');
      const el = document.getElementById('dialer-display');
      if (el) el.textContent = c.phone;
      const nameEl = document.getElementById('dialer-name');
      if (nameEl) nameEl.textContent = `${c.first_name} ${c.last_name}`;
    }
  },

  placeCall() {
    if (!this._dialBuffer) {
      Components.Toast('Enter a number to dial', 'warning');
      return;
    }
    Components.Toast(`Connecting to ${this._dialBuffer}…`, 'info');
    setTimeout(() => {
      this.openActiveCall();
    }, 1000);
  },

  openActiveCall() {
    const num = this._dialBuffer;
    const contact = window.MockData.contacts.find(c =>
      (c.phone||'').replace(/\D/g,'').includes(num.replace(/\D/g,'').slice(0,6))
    );
    let timer = 0;
    const interval = setInterval(() => {
      timer++;
      const el = document.getElementById('active-call-timer');
      if (el) el.textContent = `${String(Math.floor(timer/60)).padStart(2,'0')}:${String(timer%60).padStart(2,'0')}`;
      else clearInterval(interval);
    }, 1000);

    Components.openModal(Components.Modal({
      id: 'active-call',
      title: '📞 Active Call',
      subtitle: contact ? `${contact.first_name} ${contact.last_name}` : num,
      body: `
        <div style="text-align:center;padding:var(--space-6)">
          <div style="font-family:var(--font-heading);font-size:var(--text-4xl);font-weight:800;color:var(--color-primary-navy);letter-spacing:-0.02em;margin-bottom:var(--space-2)">
            ${contact ? `${contact.first_name} ${contact.last_name}` : num}
          </div>
          <div style="font-size:var(--text-sm);color:var(--neutral-400);margin-bottom:var(--space-5)">
            ${contact ? `${num}` : 'External number'}
          </div>
          <div id="active-call-timer" style="font-family:monospace;font-size:var(--text-3xl);font-weight:700;color:var(--color-success);margin-bottom:var(--space-6)">
            00:00
          </div>
          <div class="recording-badge" style="display:inline-flex;margin-bottom:var(--space-5)">
            <span class="recording-dot"></span> Recording active
          </div>
          <div style="display:flex;gap:var(--space-3);justify-content:center">
            <button class="btn btn-secondary" style="border-radius:50%;width:52px;height:52px;padding:0;font-size:18px" title="Mute">🔇</button>
            <button class="btn btn-secondary" style="border-radius:50%;width:52px;height:52px;padding:0;font-size:18px" title="Hold">⏸</button>
            <button onclick="clearInterval(arguments.callee);Components.closeModal('active-call');Screens.calls.openPostCall('new-${Date.now()}')"
                    style="background:var(--color-danger);border:none;border-radius:50%;width:64px;height:64px;cursor:pointer;font-size:22px;color:white" title="End call">
              📵
            </button>
          </div>
        </div>`,
      footerRight: ''
    }));
  },

  openPostCall(callId) {
    Components.closeModal();
    Components.openDrawer({
      title: 'Post-Call Wrap Up',
      subtitle: 'Log outcome and follow-up',
      body: `
        <div class="form-group">
          <label class="form-label">Call Outcome / Disposition</label>
          <select class="form-select" id="pc-disposition">
            <option>Left voicemail</option>
            <option>Spoke with contact</option>
            <option>Appointment scheduled</option>
            <option>No answer</option>
            <option>Call back requested</option>
            <option>Information sent</option>
            <option>Converted / closed</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Notes</label>
          <textarea class="form-input" rows="4" id="pc-notes" style="height:auto;padding:var(--space-3)"
            placeholder="What was discussed? Any follow-up actions?"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Follow-up Required?</label>
          <div style="display:flex;gap:var(--space-2)">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:var(--text-sm)">
              <input type="checkbox" id="pc-followup"> Schedule follow-up task
            </label>
          </div>
        </div>`,
      footer: `
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Skip</button>
        <button class="btn btn-primary" onclick="Screens.calls.savePostCall()">
          Save & Close
        </button>`
    });
  },

  savePostCall() {
    const disp = document.getElementById('pc-disposition')?.value;
    const notes = document.getElementById('pc-notes')?.value;
    Components.closeDrawer();
    Components.Toast('Call logged successfully', 'success');
  },

  playRecording(callId) {
    Components.openModal(Components.Modal({
      id: 'play-recording',
      title: 'Call Recording',
      subtitle: 'Department-compliant playback',
      body: `
        <div style="padding:var(--space-4);background:var(--neutral-50);border-radius:var(--radius-lg);text-align:center">
          <div style="font-size:48px;margin-bottom:var(--space-4)">🎵</div>
          <div style="font-family:monospace;font-size:var(--text-sm);color:var(--neutral-500);margin-bottom:var(--space-4)">${callId}</div>
          <div style="background:var(--neutral-200);border-radius:var(--radius-full);height:6px;margin-bottom:var(--space-3)">
            <div style="width:35%;height:6px;background:var(--color-primary-navy);border-radius:var(--radius-full)"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--neutral-400);margin-bottom:var(--space-4)">
            <span>2:41</span><span>7:33</span>
          </div>
          <div style="display:flex;gap:var(--space-3);justify-content:center">
            <button class="btn btn-secondary btn-sm">⏮ 15s</button>
            <button class="btn btn-primary" style="width:40px;height:40px;border-radius:50%;padding:0">▶</button>
            <button class="btn btn-secondary btn-sm">15s ⏭</button>
          </div>
        </div>
        <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);font-size:var(--text-xs);color:var(--color-info-text)">
          ℹ️ Playback is logged per access_control.yaml. Recording retained per department policy.
        </div>`,
      footerRight: `<button class="btn btn-secondary" onclick="Components.closeModal('play-recording')">Close</button>`
    }));
  },

  openCallDetail(activityId) {
    const a = window.MockData.activities.find(x => x.id === activityId);
    if (!a) return;
    const { helpers } = window.MockData;
    Components.openDrawer({
      title: `${a.label} — ${a.contact_name}`,
      subtitle: helpers.formatDateTime(a.occurred_at),
      body: `
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-5)">
          <span class="badge badge-${a.type==='call_outbound'?'blue':'green'}">${a.type==='call_outbound'?'Outbound':'Inbound'}</span>
          <span class="badge badge-${a.department==='insurance'?'gold':a.department==='mortgage'?'blue':'green'}">${window.MockData.helpers.departmentLabel(a.department)}</span>
          ${a.recorded ? `<span class="recording-badge"><span class="recording-dot"></span> Recorded</span>` : ''}
        </div>
        <div class="profile-fields-grid">
          <div class="profile-field"><span class="profile-field-label">Actor</span><span class="profile-field-value">${a.actor_name}</span></div>
          <div class="profile-field"><span class="profile-field-label">Contact</span><span class="profile-field-value">${a.contact_name}</span></div>
          <div class="profile-field"><span class="profile-field-label">Time</span><span class="profile-field-value">${helpers.formatDateTime(a.occurred_at)}</span></div>
          <div class="profile-field"><span class="profile-field-label">ID</span><span class="profile-field-value" style="font-family:monospace;font-size:11px">${a.id}</span></div>
        </div>
        ${a.notes ? `<div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--neutral-600)">📝 ${a.notes}</div>` : ''}`,
      footer: `
        <div style="flex:1"></div>
        ${a.recorded ? `<button class="btn btn-secondary" onclick="Screens.calls.playRecording('${a.id}')">▶ Play Recording</button>` : ''}
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>`
    });
  },

  openUnmatchedQueue() {
    Components.openDrawer({
      title: 'Unmatched Calls',
      subtitle: 'Inbound calls without a linked contact',
      body: `
        ${[{ num:'(832) 555-0142', time:'2h ago', dept:'insurance' }, { num:'(713) 555-8834', time:'5h ago', dept:'real_estate' }].map(c => `
          <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);margin-bottom:var(--space-3)">
            <div style="font-size:24px">📲</div>
            <div style="flex:1">
              <div style="font-weight:var(--weight-semibold)">${c.num}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">${c.time} · ${c.dept}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="Components.Toast('Contact lookup opened','info')">Link Contact</button>
          </div>`).join('')}`,
      footer: `<div style="flex:1"></div><button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>`
    });
  },

  setFilter(type) {
    this._activeFilter = type;
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML = `<div class="screen-wrapper">${this.render()}</div>`;
    }
  },

  init() {}
};