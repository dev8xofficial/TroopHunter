/**
 * Burkes Group CRM — Calendar Screen
 * Source: .specify/specs/005-calendar/spec.md, screens/calendar.yaml
 * Batch: 5 of 7 — Activities + Calendar + Email Blast (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.calendar = {
  _view: 'week',         // 'day' | 'week' | 'month'
  _currentDate: new Date(),
  _syncState: { outlook: 'healthy', google: 'healthy' },

  render() {
    const { Icons } = window.Components;
    const { calendarEvents, helpers } = window.MockData;

    const staleCount = calendarEvents.filter(e => e.sync_state === 'stale').length;
    if (staleCount > 0) this._syncState.google = 'stale';

    return `
      <!-- Calendar Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Calendar</h1>
          <p>Operator schedule · Outlook & Google sync · Provider-linked events</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-primary btn-sm" onclick="Screens.calendar.openCreateEvent()">
            ${Icons.plus} New Event
          </button>
        </div>
      </div>

      <!-- Provider Status Bar -->
      <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-4);flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);
                    background:white;border:1px solid var(--neutral-200);border-radius:var(--radius-full);
                    box-shadow:var(--shadow-xs)">
          <span style="font-size:16px">📧</span>
          <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">Microsoft Outlook</span>
          <span class="sync-badge ${this._syncState.outlook}">
            ${this._syncState.outlook === 'healthy' ? '● Synced' : '⚠ Stale'}
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);
                    background:white;border:1px solid var(--neutral-200);border-radius:var(--radius-full);
                    box-shadow:var(--shadow-xs)">
          <span style="font-size:16px">📅</span>
          <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">Google Calendar</span>
          <span class="sync-badge ${this._syncState.google}">
            ${this._syncState.google === 'healthy' ? '● Synced' : '⚠ Stale — refresh needed'}
          </span>
        </div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:var(--space-2)">
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">
            ${calendarEvents.length} events · ${staleCount > 0 ? staleCount + ' with stale sync' : 'All fresh'}
          </span>
        </div>
      </div>

      ${staleCount > 0 ? `
      <div class="degraded-banner" style="margin-bottom:var(--space-4)">
        <span class="degraded-banner-icon">⚠️</span>
        <span class="degraded-banner-text">
          ${staleCount} event${staleCount!==1?'s':''} may be stale — Google Calendar sync is delayed.
          Data shown may not reflect the latest provider state.
        </span>
        <button class="btn btn-secondary btn-sm" onclick="Screens.calendar.triggerSync()" style="margin-left:auto">
          ${Icons.refresh} Sync Now
        </button>
      </div>` : ''}

      <!-- Calendar Toolbar -->
      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
        <!-- View Toggle -->
        <div class="pipeline-view-toggle">
          <button class="view-toggle-btn ${this._view==='day'?'active':''}"
                  onclick="Screens.calendar.setView('day')">Day</button>
          <button class="view-toggle-btn ${this._view==='week'?'active':''}"
                  onclick="Screens.calendar.setView('week')">Week</button>
          <button class="view-toggle-btn ${this._view==='month'?'active':''}"
                  onclick="Screens.calendar.setView('month')">Month</button>
        </div>

        <!-- Navigation -->
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <button class="btn btn-secondary btn-sm btn-icon" onclick="Screens.calendar.navigate(-1)" title="Previous">
            ‹
          </button>
          <button class="btn btn-secondary btn-sm" onclick="Screens.calendar.goToday()">Today</button>
          <button class="btn btn-secondary btn-sm btn-icon" onclick="Screens.calendar.navigate(1)" title="Next">
            ›
          </button>
        </div>

        <!-- Current Period Label -->
        <div style="font-family:var(--font-heading);font-size:var(--text-lg);font-weight:var(--weight-bold);color:var(--color-primary-navy)">
          ${this.getPeriodLabel()}
        </div>

        <!-- Legend -->
        <div style="margin-left:auto;display:flex;gap:var(--space-4);align-items:center">
          <div style="display:flex;align-items:center;gap:6px;font-size:var(--text-xs);color:var(--neutral-500)">
            <div style="width:12px;height:12px;border-radius:3px;background:var(--color-primary-navy)"></div>
            Outlook
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:var(--text-xs);color:var(--neutral-500)">
            <div style="width:12px;height:12px;border-radius:3px;background:var(--color-accent-blue)"></div>
            Google
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:var(--text-xs);color:var(--neutral-500)">
            <div style="width:12px;height:12px;border-radius:3px;border:2px dashed var(--neutral-400)"></div>
            Tentative
          </div>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div id="cal-grid-container">
        ${this.renderGrid()}
      </div>`;
  },

  getPeriodLabel() {
    const d = this._currentDate;
    if (this._view === 'month') {
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    if (this._view === 'day') {
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
    // Week view — show range
    const start = new Date(d);
    start.setDate(d.getDate() - d.getDay()); // Sunday
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr   = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} – ${endStr}`;
  },

  renderGrid() {
    if (this._view === 'month') return this.renderMonthGrid();
    if (this._view === 'day')   return this.renderDayGrid();
    return this.renderWeekGrid();
  },

  // ── Month View ──────────────────────────────────────────────────────────────
  renderMonthGrid() {
    const { calendarEvents } = window.MockData;
    const d = this._currentDate;
    const year  = d.getFullYear();
    const month = d.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);
    while (cells.length % 7 !== 0) cells.push(null);

    return `
      <div class="card" style="overflow:hidden">
        <!-- Day headers -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid var(--neutral-200)">
          ${dayNames.map(n => `
            <div style="padding:var(--space-3);text-align:center;font-size:var(--text-xs);font-weight:var(--weight-semibold);
                        text-transform:uppercase;letter-spacing:.06em;color:var(--neutral-500)">
              ${n}
            </div>`).join('')}
        </div>
        <!-- Day cells -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr)">
          ${cells.map((day, idx) => {
            if (!day) return `<div style="min-height:100px;border-right:1px solid var(--neutral-100);border-bottom:1px solid var(--neutral-100);background:var(--neutral-50)"></div>`;
            const cellDate = new Date(year, month, day);
            const isToday  = cellDate.toDateString() === today.toDateString();
            const dayEvents = calendarEvents.filter(e => {
              const ed = new Date(e.starts_at);
              return ed.getFullYear()===year && ed.getMonth()===month && ed.getDate()===day;
            });

            return `
              <div style="min-height:100px;padding:var(--space-2);border-right:1px solid var(--neutral-100);
                          border-bottom:1px solid var(--neutral-100);
                          ${isToday?'background:rgba(26,58,82,0.04)':''};cursor:pointer;transition:background .1s"
                   onmouseover="this.style.background='var(--neutral-50)'"
                   onmouseout="this.style.background='${isToday?'rgba(26,58,82,0.04)':''}'"
                   onclick="Screens.calendar.selectDay(${year},${month},${day})">
                <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
                  <span style="width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                               font-size:var(--text-sm);font-weight:${isToday?'700':'400'};
                               background:${isToday?'var(--color-primary-navy)':'transparent'};
                               color:${isToday?'white':'var(--neutral-700)'}">
                    ${day}
                  </span>
                </div>
                ${dayEvents.slice(0,3).map(e => `
                  <div onclick="event.stopPropagation();Screens.calendar.openEventDetail('${e.id}')"
                       style="padding:2px 5px;border-radius:3px;font-size:10px;font-weight:600;margin-bottom:2px;
                              background:${e.provider==='outlook'?'var(--color-primary-navy)':'var(--color-accent-blue)'};
                              color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
                              ${e.status==='tentative'?'opacity:.65;border:1px dashed rgba(255,255,255,.5)':''};
                              cursor:pointer">
                    ${e.title}
                  </div>`).join('')}
                ${dayEvents.length > 3 ? `<div style="font-size:10px;color:var(--neutral-400);padding:2px 5px">+${dayEvents.length-3} more</div>` : ''}
              </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  // ── Week View ───────────────────────────────────────────────────────────────
  renderWeekGrid() {
    const { calendarEvents, helpers } = window.MockData;
    const d = this._currentDate;
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay()); // Sunday

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    const today = new Date();
    const HOUR_START  = 7;  // 7am
    const HOUR_END    = 21; // 9pm
    const TOTAL_MINS  = (HOUR_END - HOUR_START) * 60;
    const ROW_HEIGHT  = 56; // px per hour
    const TOTAL_HEIGHT = (HOUR_END - HOUR_START) * ROW_HEIGHT;

    const hours = [];
    for (let h = HOUR_START; h < HOUR_END; h++) hours.push(h);

    return `
      <div class="card" style="overflow:hidden">
        <div style="display:grid;grid-template-columns:64px repeat(7,1fr);border-bottom:2px solid var(--neutral-200)">
          <div></div>
          ${days.map(day => {
            const isToday = day.toDateString() === today.toDateString();
            return `
              <div style="padding:var(--space-3);text-align:center;border-left:1px solid var(--neutral-100)">
                <div style="font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.06em;
                            color:${isToday?'var(--color-primary-navy)':'var(--neutral-400)'};font-weight:600">
                  ${day.toLocaleDateString('en-US',{weekday:'short'})}
                </div>
                <div style="width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                            margin:4px auto 0;font-family:var(--font-heading);font-size:var(--text-md);font-weight:700;
                            background:${isToday?'var(--color-primary-navy)':'transparent'};
                            color:${isToday?'white':'var(--neutral-700)'}">
                  ${day.getDate()}
                </div>
              </div>`;
          }).join('')}
        </div>

        <!-- Time Grid -->
        <div style="display:flex;overflow-y:auto;max-height:600px">
          <!-- Time labels -->
          <div style="width:64px;flex-shrink:0;position:relative" aria-hidden="true">
            ${hours.map(h => `
              <div style="height:${ROW_HEIGHT}px;padding:0 var(--space-2);display:flex;align-items:flex-start;
                          padding-top:4px;font-size:10px;color:var(--neutral-400);font-weight:600;
                          text-align:right;justify-content:flex-end">
                ${h === 12 ? '12 PM' : h > 12 ? (h-12)+' PM' : h+' AM'}
              </div>`).join('')}
          </div>

          <!-- Day columns -->
          ${days.map(day => {
            const isToday = day.toDateString() === today.toDateString();
            const dayEvents = calendarEvents.filter(e => {
              const eDate = new Date(e.starts_at);
              return eDate.toDateString() === day.toDateString();
            });

            return `
              <div style="flex:1;border-left:1px solid var(--neutral-200);position:relative;
                          height:${TOTAL_HEIGHT}px;background:${isToday?'rgba(26,58,82,0.025)':'white'}">
                <!-- Hour lines -->
                ${hours.map((h, i) => `
                  <div style="position:absolute;left:0;right:0;top:${i*ROW_HEIGHT}px;
                              border-top:1px solid ${i===0?'var(--neutral-200)':'var(--neutral-100)'}">
                  </div>`).join('')}

                <!-- Current time indicator -->
                ${isToday ? (() => {
                  const now = new Date();
                  const mins = (now.getHours() - HOUR_START) * 60 + now.getMinutes();
                  if (mins < 0 || mins > TOTAL_MINS) return '';
                  const top = (mins / TOTAL_MINS) * TOTAL_HEIGHT;
                  return `<div style="position:absolute;left:0;right:0;top:${top}px;z-index:2;display:flex;align-items:center">
                    <div style="width:8px;height:8px;border-radius:50%;background:var(--color-danger);flex-shrink:0"></div>
                    <div style="flex:1;height:1.5px;background:var(--color-danger)"></div>
                  </div>`;
                })() : ''}

                <!-- Events -->
                ${dayEvents.map(e => {
                  const start = new Date(e.starts_at);
                  const end   = new Date(e.ends_at);
                  const startMins = (start.getHours() - HOUR_START) * 60 + start.getMinutes();
                  const endMins   = (end.getHours()   - HOUR_START) * 60 + end.getMinutes();
                  const clampedStart = Math.max(0, startMins);
                  const clampedEnd   = Math.min(TOTAL_MINS, endMins);
                  if (clampedEnd <= clampedStart) return '';
                  const top  = (clampedStart / TOTAL_MINS) * TOTAL_HEIGHT;
                  const height = Math.max(24, ((clampedEnd - clampedStart) / TOTAL_MINS) * TOTAL_HEIGHT - 2);
                  const bgColor = e.provider === 'outlook' ? 'var(--color-primary-navy)' : 'var(--color-accent-blue)';
                  return `
                    <div onclick="Screens.calendar.openEventDetail('${e.id}')"
                         style="position:absolute;left:4px;right:4px;top:${top}px;height:${height}px;
                                background:${bgColor};border-radius:4px;padding:3px 6px;cursor:pointer;
                                z-index:1;transition:filter .1s;overflow:hidden;
                                ${e.status==='tentative'?'opacity:.7;border:1.5px dashed rgba(255,255,255,.5)':''}
                                ${e.status==='completed'?'opacity:.5;':''}
                                ${e.sync_state==='stale'?'border-top:3px solid var(--color-warning)':''}"
                         onmouseover="this.style.filter='brightness(1.15)'"
                         onmouseout="this.style.filter=''">
                      <div style="font-size:10px;font-weight:700;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                        ${e.title}
                      </div>
                      ${height > 36 ? `<div style="font-size:9px;color:rgba(255,255,255,.7)">
                        ${start.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}
                      </div>` : ''}
                    </div>`;
                }).join('')}
              </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  // ── Day View ────────────────────────────────────────────────────────────────
  renderDayGrid() {
    const { calendarEvents, helpers } = window.MockData;
    const d = this._currentDate;
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();

    const HOUR_START = 7;
    const HOUR_END   = 21;
    const TOTAL_MINS = (HOUR_END - HOUR_START) * 60;
    const ROW_HEIGHT = 64;
    const TOTAL_HEIGHT = (HOUR_END - HOUR_START) * ROW_HEIGHT;

    const hours = [];
    for (let h = HOUR_START; h < HOUR_END; h++) hours.push(h);

    const dayEvents = calendarEvents.filter(e => new Date(e.starts_at).toDateString() === d.toDateString());

    return `
      <div class="card" style="overflow:hidden">
        <div style="padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--neutral-200);
                    display:flex;align-items:center;gap:var(--space-3)">
          <div style="font-family:var(--font-heading);font-size:var(--text-lg);font-weight:700;
                      color:${isToday?'var(--color-primary-navy)':'var(--neutral-700)'}">
            ${d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
          </div>
          <span class="badge badge-${dayEvents.length?'blue':'gray'}">${dayEvents.length} event${dayEvents.length!==1?'s':''}</span>
        </div>
        <div style="display:flex;overflow-y:auto;max-height:640px">
          <div style="width:80px;flex-shrink:0">
            ${hours.map(h => `
              <div style="height:${ROW_HEIGHT}px;padding:0 var(--space-3);display:flex;align-items:flex-start;
                          padding-top:6px;font-size:11px;color:var(--neutral-400);font-weight:600;text-align:right;justify-content:flex-end">
                ${h===12?'12 PM':h>12?(h-12)+' PM':h+' AM'}
              </div>`).join('')}
          </div>
          <div style="flex:1;position:relative;height:${TOTAL_HEIGHT}px;border-left:2px solid var(--neutral-200)">
            ${hours.map((h,i)=>`<div style="position:absolute;left:0;right:0;top:${i*ROW_HEIGHT}px;border-top:1px solid var(--neutral-100)"></div>`).join('')}

            ${isToday ? (() => {
              const now = new Date();
              const mins = (now.getHours()-HOUR_START)*60+now.getMinutes();
              if (mins<0||mins>TOTAL_MINS) return '';
              const top = (mins/TOTAL_MINS)*TOTAL_HEIGHT;
              return `<div style="position:absolute;left:0;right:0;top:${top}px;z-index:3;display:flex;align-items:center">
                <div style="width:10px;height:10px;border-radius:50%;background:var(--color-danger);flex-shrink:0"></div>
                <div style="flex:1;height:2px;background:var(--color-danger)"></div>
              </div>`;
            })() : ''}

            ${dayEvents.map(e => {
              const start = new Date(e.starts_at);
              const end   = new Date(e.ends_at);
              const startMins = (start.getHours()-HOUR_START)*60+start.getMinutes();
              const endMins   = (end.getHours()-HOUR_START)*60+end.getMinutes();
              const top    = Math.max(0,(startMins/TOTAL_MINS)*TOTAL_HEIGHT);
              const height = Math.max(36,((Math.min(TOTAL_MINS,endMins)-Math.max(0,startMins))/TOTAL_MINS)*TOTAL_HEIGHT-3);
              const bgColor = e.provider==='outlook'?'var(--color-primary-navy)':'var(--color-accent-blue)';
              return `
                <div onclick="Screens.calendar.openEventDetail('${e.id}')"
                     style="position:absolute;left:12px;right:12px;top:${top}px;height:${height}px;
                            background:${bgColor};border-radius:var(--radius-md);padding:var(--space-2) var(--space-3);
                            cursor:pointer;z-index:1;transition:filter .1s;
                            ${e.sync_state==='stale'?'border-top:3px solid var(--color-warning)':''}"
                     onmouseover="this.style.filter='brightness(1.12)'"
                     onmouseout="this.style.filter=''">
                  <div style="font-size:var(--text-sm);font-weight:700;color:white">${e.title}</div>
                  <div style="font-size:var(--text-xs);color:rgba(255,255,255,.75)">
                    ${start.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})} –
                    ${end.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}
                  </div>
                  ${e.contact_name ? `<div style="font-size:var(--text-xs);color:rgba(255,255,255,.65)">👤 ${e.contact_name}</div>` : ''}
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
  },

  openEventDetail(eventId) {
    const e = window.MockData.calendarEvents.find(x => x.id === eventId);
    if (!e) return;
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const start = new Date(e.starts_at);
    const end   = new Date(e.ends_at);
    const durationMins = Math.round((end - start) / 60000);
    const durationStr  = durationMins < 60
      ? `${durationMins}m`
      : `${Math.floor(durationMins/60)}h ${durationMins%60>0?durationMins%60+'m':''}`;

    Components.openDrawer({
      title: e.title,
      subtitle: start.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }),
      body: `
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          <span class="badge badge-${e.provider==='outlook'?'navy':'blue'}">
            ${e.provider === 'outlook' ? '📧 Outlook' : '📅 Google Calendar'}
          </span>
          <span class="badge badge-${e.status==='scheduled'?'green':e.status==='tentative'?'gold':'gray'}">${e.status}</span>
          ${e.sync_state === 'stale'
            ? `<span class="sync-badge stale">⚠ Stale sync</span>`
            : `<span class="sync-badge healthy">● Synced</span>`}
        </div>

        <div class="profile-section">
          <div class="profile-section-title">Event Details</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Starts</span>
              <span class="profile-field-value">${helpers.formatDateTime(e.starts_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Ends</span>
              <span class="profile-field-value">${helpers.formatDateTime(e.ends_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Duration</span>
              <span class="profile-field-value">${durationStr}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Provider</span>
              <span class="profile-field-value">${e.provider === 'outlook' ? 'Microsoft Outlook' : 'Google Calendar'}</span>
            </div>
          </div>
        </div>

        ${e.contact_name ? `
        <div class="profile-section">
          <div class="profile-section-title">Linked Contact</div>
          <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);
                      background:var(--neutral-50);border-radius:var(--radius-md)">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--color-primary-navy);
                        color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">
              ${e.contact_name.split(' ').map(n=>n[0]).join('').toUpperCase()}
            </div>
            <div>
              <div style="font-weight:var(--weight-semibold);font-size:var(--text-sm)">${e.contact_name}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">Contact linked to this event</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="Components.closeDrawer();Router.navigate('contacts')" style="margin-left:auto">
              View Contact
            </button>
          </div>
        </div>` : `
        <div class="profile-section">
          <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);
                      font-size:var(--text-sm);color:var(--neutral-400);text-align:center">
            No CRM contact linked to this event
          </div>
        </div>`}

        ${e.sync_state === 'stale' ? `
        <div style="padding:var(--space-3);background:var(--color-warning-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-warning-text);margin-top:var(--space-4)">
          ⚠️ This event's sync data may be outdated. The displayed time and details reflect the last successful sync.
          Freshness indicator: stale.
        </div>` : ''}
      `,
      footer: `
        <button class="btn btn-secondary btn-sm" onclick="Screens.calendar.openCreateEvent('${e.id}')">
          Edit Event
        </button>
        ${e.contact_name ? `
        <button class="btn btn-secondary btn-sm" onclick="Components.closeDrawer();Router.navigate('contacts')">
          ${Icons.users} Open Contact
        </button>` : ''}
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>`
    });
  },

  openCreateEvent(existingId) {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'create-event',
      title: existingId ? '✏️ Edit Event' : '📅 New Event',
      subtitle: 'Creates event in connected provider calendar',
      body: `
        <div class="form-group">
          <label class="form-label required">Event Title</label>
          <input class="form-input" id="ev-title" placeholder="e.g. Property showing · Policy review">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Date</label>
            <input class="form-input" id="ev-date" type="date" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="form-group">
            <label class="form-label required">Start Time</label>
            <input class="form-input" id="ev-time" type="time" value="10:00">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Duration</label>
          <select class="form-select">
            <option>30 minutes</option>
            <option selected>1 hour</option>
            <option>90 minutes</option>
            <option>2 hours</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Provider</label>
          <select class="form-select">
            <option>📧 Microsoft Outlook</option>
            <option>📅 Google Calendar</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Link to Contact</label>
          <select class="form-select">
            <option value="">No contact linked</option>
            ${window.MockData.contacts.slice(0,10).map(c=>
              `<option value="${c.id}">${c.first_name} ${c.last_name}</option>`).join('')}
          </select>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('create-event')">Cancel</button>
        <button class="btn btn-primary" onclick="Components.closeModal('create-event');Components.Toast('Event created in Outlook','success')">
          ${Icons.calendar} Create Event
        </button>`
    }));
  },

  selectDay(year, month, day) {
    this._currentDate = new Date(year, month, day);
    this._view = 'day';
    this.rerender();
  },

  setView(view) {
    this._view = view;
    this.rerender();
  },

  navigate(direction) {
    const d = this._currentDate;
    if (this._view === 'month') {
      this._currentDate = new Date(d.getFullYear(), d.getMonth() + direction, 1);
    } else if (this._view === 'week') {
      this._currentDate = new Date(d.getTime() + direction * 7 * 24 * 60 * 60 * 1000);
    } else {
      this._currentDate = new Date(d.getTime() + direction * 24 * 60 * 60 * 1000);
    }
    this.rerender();
  },

  goToday() {
    this._currentDate = new Date();
    this.rerender();
  },

  triggerSync() {
    Components.Toast('Syncing with calendar providers…', 'info');
    setTimeout(() => {
      this._syncState = { outlook: 'healthy', google: 'healthy' };
      window.MockData.calendarEvents.forEach(e => e.sync_state = 'healthy');
      Components.Toast('All calendars synced successfully', 'success');
      this.rerender();
    }, 1500);
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