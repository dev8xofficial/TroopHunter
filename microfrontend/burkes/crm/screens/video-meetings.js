/**
 * Burkes Group CRM — Video Meetings Screen
 * Source: .specify/specs/010-video-meetings/spec.md, screens/video-meetings.yaml
 * Batch: 6 of 7 — Department Workspaces + Video Meetings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.videoMeetings = {
  _view: 'upcoming',  // 'upcoming' | 'past'
  _activeNoteId: null,

  render() {
    const { meetings, calendarEvents, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const now = new Date();
    const upcoming = meetings
      .filter(m => m.status !== 'completed' || new Date(m.starts_at) >= now)
      .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
    const past = meetings
      .filter(m => m.status === 'completed')
      .sort((a, b) => new Date(b.starts_at) - new Date(a.starts_at));

    const recordedCount  = meetings.filter(m => m.recording_url).length;
    const nearPurge      = meetings.filter(m => {
      if (!m.retention_expires_at) return false;
      const days = (new Date(m.retention_expires_at) - now) / 86400000;
      return days <= 14 && days >= 0;
    }).length;

    const teamsCount  = meetings.filter(m => m.provider === 'teams').length;
    const meetCount   = meetings.filter(m => m.provider === 'google_meet').length;

    return `
      <!-- Video Meetings Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Video Meetings</h1>
          <p>Microsoft Teams &amp; Google Meet · Provider-launched · Recording-retention aware</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Screens.videoMeetings.openScheduleModal()">
            ${Icons.calendar} Schedule Meeting
          </button>
          <button class="btn btn-primary btn-sm" onclick="Screens.videoMeetings.openLaunchModal()">
            ${Icons.video} Launch Now
          </button>
        </div>
      </div>

      <!-- Provider Status Row -->
      <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-5);flex-wrap:wrap">
        <div class="vm-provider-chip vm-teams">
          <span style="font-size:18px">💼</span>
          <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">Microsoft Teams</span>
          <span class="sync-badge healthy">● Connected</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${teamsCount} meetings</span>
        </div>
        <div class="vm-provider-chip vm-meet">
          <span style="font-size:18px">📹</span>
          <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">Google Meet</span>
          <span class="sync-badge healthy">● Connected</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${meetCount} meetings</span>
        </div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:var(--space-3)">
          ${nearPurge > 0 ? `
          <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-3);
                      background:var(--color-warning-bg);border-radius:var(--radius-full);font-size:var(--text-xs);
                      color:var(--color-warning-text);font-weight:var(--weight-semibold)">
            ⚠️ ${nearPurge} recording${nearPurge !== 1 ? 's' : ''} nearing 90-day purge
          </div>` : ''}
        </div>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Meetings', value: meetings.length, accent:'navy', icon: Icons.video })}
        ${StatCard({ label:'Upcoming', value: upcoming.length, accent:'blue', icon: Icons.calendar })}
        ${StatCard({ label:'Recorded', value: recordedCount, accent:'green', icon: Icons.mic })}
        ${StatCard({ label:'Near Purge (14d)', value: nearPurge, accent: nearPurge > 0 ? 'gold' : 'navy', icon: Icons.alertTriangle })}
      </div>

      <!-- 90-Day Retention Notice -->
      <div class="degraded-banner" style="border-color:var(--color-info);background:var(--color-info-bg);margin-bottom:var(--space-5)">
        <span style="font-size:16px">📋</span>
        <span style="color:var(--color-info-text);font-weight:var(--weight-medium)">
          Video recordings are retained for <strong>90 days</strong> per platform policy. Recordings near expiry are flagged below.
          Export or archive before the purge window if needed.
        </span>
        <span style="margin-left:auto;font-size:var(--text-xs);color:var(--color-info-text);opacity:.7">
          Per retention policy — platform-wide
        </span>
      </div>

      <!-- Tabs -->
      <div class="tabs" style="margin-bottom:0">
        <div class="tab ${this._view === 'upcoming' ? 'active' : ''}"
             onclick="Screens.videoMeetings._view='upcoming';Screens.videoMeetings.rerender()">
          Upcoming &amp; Active
          <span style="margin-left:4px;background:var(--color-primary-navy);color:white;font-size:9px;
                       font-weight:700;border-radius:99px;padding:1px 5px">${upcoming.length}</span>
        </div>
        <div class="tab ${this._view === 'past' ? 'active' : ''}"
             onclick="Screens.videoMeetings._view='past';Screens.videoMeetings.rerender()">
          Past Meetings
          <span style="margin-left:4px;background:var(--neutral-300);color:var(--neutral-600);font-size:9px;
                       font-weight:700;border-radius:99px;padding:1px 5px">${past.length}</span>
        </div>
      </div>

      <!-- Meeting List -->
      <div id="vm-meeting-list" style="margin-top:var(--space-1)">
        ${this._view === 'upcoming'
          ? this.renderMeetingList(upcoming, false)
          : this.renderMeetingList(past, true)}
      </div>`;
  },

  renderMeetingList(meetings, isPast) {
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    if (!meetings.length) {
      return `
        <div class="card" style="padding:var(--space-10);text-align:center">
          <div style="font-size:40px;margin-bottom:var(--space-3)">📹</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;
                      color:var(--color-primary-navy)">
            No ${isPast ? 'past' : 'upcoming'} meetings
          </div>
          <div style="color:var(--neutral-400);font-size:var(--text-sm);margin-top:var(--space-2)">
            ${isPast ? 'Past meetings will appear here once completed.' : 'Schedule a meeting to get started.'}
          </div>
          ${!isPast ? `
          <button class="btn btn-primary" style="margin-top:var(--space-5)"
                  onclick="Screens.videoMeetings.openScheduleModal()">
            ${Icons.plus} Schedule Meeting
          </button>` : ''}
        </div>`;
    }

    return `
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        ${meetings.map(m => this.renderMeetingCard(m, isPast)).join('')}
      </div>`;
  },

  renderMeetingCard(m, isPast) {
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const now       = new Date();
    const startDate = new Date(m.starts_at);
    const endDate   = new Date(m.ends_at);
    const isToday   = startDate.toDateString() === now.toDateString();
    const isLive    = m.status === 'launched';

    const providerIcon  = m.provider === 'teams'      ? '💼' : '📹';
    const providerLabel = m.provider === 'teams'       ? 'Microsoft Teams' : 'Google Meet';
    const providerColor = m.provider === 'teams'
      ? 'var(--color-primary-navy)'
      : 'var(--color-accent-blue)';

    const daysUntilPurge = m.retention_expires_at
      ? Math.ceil((new Date(m.retention_expires_at) - now) / 86400000)
      : null;

    const statusBadge = isLive
      ? `<span class="badge badge-red" style="animation:pulse-rec 1.5s infinite">● Live</span>`
      : m.status === 'completed'
        ? `<span class="badge badge-gray">Completed</span>`
        : isToday
          ? `<span class="badge badge-blue">Today</span>`
          : `<span class="badge badge-green">Scheduled</span>`;

    return `
      <div class="card vm-card" onclick="Screens.videoMeetings.openMeetingDetail('${m.id}')">
        <div style="display:flex;align-items:flex-start;gap:var(--space-4);padding:var(--space-5)">

          <!-- Provider Icon -->
          <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:${providerColor};
                      display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
            ${providerIcon}
          </div>

          <!-- Meeting Info -->
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-2);flex-wrap:wrap">
              <span style="font-family:var(--font-heading);font-size:var(--text-lg);font-weight:var(--weight-bold);
                           color:var(--color-primary-navy)">${m.title}</span>
              ${statusBadge}
              ${isLive ? '' : ''}
            </div>

            <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;margin-bottom:var(--space-3)">
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--neutral-600)">
                ${Icons.calendar}
                <span>${helpers.formatDateTime(m.starts_at)}</span>
                <span style="color:var(--neutral-400)">–</span>
                <span>${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--neutral-600)">
                <span style="font-size:14px">${providerIcon}</span>
                <span>${providerLabel}</span>
              </div>
              ${m.contact_name ? `
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--neutral-600)">
                ${Icons.users}
                <span>${m.contact_name}</span>
              </div>` : ''}
            </div>

            <!-- Recording / Retention Row -->
            ${m.recording_url ? `
            <div style="display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap">
              <span class="recording-badge"><span class="recording-dot"></span> Recording available</span>
              ${daysUntilPurge !== null ? `
              <span style="font-size:var(--text-xs);
                           color:${daysUntilPurge <= 14 ? 'var(--color-warning-text)' : 'var(--neutral-400)'};
                           font-weight:${daysUntilPurge <= 14 ? 'var(--weight-semibold)' : 'var(--weight-regular)'}">
                ${daysUntilPurge <= 0
                  ? '⚠️ Recording has expired'
                  : daysUntilPurge <= 14
                    ? `⚠️ Purge in ${daysUntilPurge} day${daysUntilPurge !== 1 ? 's' : ''}`
                    : `Purge in ${daysUntilPurge} days`}
              </span>` : ''}
            </div>` : `
            <div style="font-size:var(--text-xs);color:var(--neutral-400)">
              No recording available for this meeting
            </div>`}
          </div>

          <!-- Action Column -->
          <div style="display:flex;flex-direction:column;gap:var(--space-2);flex-shrink:0;align-items:flex-end"
               onclick="event.stopPropagation()">
            ${!isPast ? `
            <button class="btn btn-primary btn-sm"
                    onclick="event.stopPropagation();Screens.videoMeetings.launchMeeting('${m.id}')">
              ${Icons.video} Launch
            </button>` : `
            <button class="btn btn-secondary btn-sm"
                    onclick="event.stopPropagation();Screens.videoMeetings.openNotes('${m.id}')">
              📝 Notes
            </button>`}
            ${m.contact_name ? `
            <button class="btn btn-ghost btn-sm"
                    onclick="event.stopPropagation();Router.navigate('contacts')">
              ${Icons.users} Contact
            </button>` : ''}
          </div>
        </div>

        <!-- Near-Purge Warning Banner -->
        ${daysUntilPurge !== null && daysUntilPurge <= 14 && daysUntilPurge > 0 ? `
        <div style="margin:0 var(--space-5) var(--space-4);padding:var(--space-3) var(--space-4);
                    background:var(--color-warning-bg);border-radius:var(--radius-md);
                    display:flex;align-items:center;gap:var(--space-3)">
          <span>⚠️</span>
          <div style="flex:1;font-size:var(--text-sm);color:var(--color-warning-text)">
            <strong>Recording nearing purge</strong> — expires on
            ${helpers.formatDate(m.retention_expires_at)}. Export or archive before this date.
          </div>
          <button class="btn btn-secondary btn-sm"
                  onclick="event.stopPropagation();Screens.videoMeetings.exportRecording('${m.id}')">
            ${window.Components.Icons.download} Export
          </button>
        </div>` : ''}
      </div>`;
  },

  openMeetingDetail(meetingId) {
    const m = window.MockData.meetings.find(x => x.id === meetingId);
    if (!m) return;
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const providerIcon  = m.provider === 'teams' ? '💼' : '📹';
    const providerLabel = m.provider === 'teams'  ? 'Microsoft Teams' : 'Google Meet';
    const startDate     = new Date(m.starts_at);
    const endDate       = new Date(m.ends_at);
    const durationMins  = Math.round((endDate - startDate) / 60000);
    const daysUntilPurge = m.retention_expires_at
      ? Math.ceil((new Date(m.retention_expires_at) - new Date()) / 86400000)
      : null;

    Components.openDrawer({
      title: m.title,
      subtitle: `${providerLabel} · ${helpers.formatDate(m.starts_at)}`,
      body: `
        <!-- Badges -->
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          <span class="badge badge-navy">${providerIcon} ${providerLabel}</span>
          <span class="badge badge-${m.status === 'completed' ? 'gray' : m.status === 'launched' ? 'red' : 'green'}">
            ${m.status}
          </span>
          ${m.recording_url ? `<span class="recording-badge"><span class="recording-dot"></span> Recorded</span>` : ''}
        </div>

        <!-- Event Details -->
        <div class="profile-section">
          <div class="profile-section-title">Meeting Details</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Starts</span>
              <span class="profile-field-value">${helpers.formatDateTime(m.starts_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Ends</span>
              <span class="profile-field-value">${helpers.formatDateTime(m.ends_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Duration</span>
              <span class="profile-field-value">${durationMins} min</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Provider</span>
              <span class="profile-field-value">${providerLabel}</span>
            </div>
          </div>
        </div>

        <!-- Contact Link -->
        ${m.contact_name ? `
        <div class="profile-section">
          <div class="profile-section-title">Linked Contact</div>
          <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);
                      background:var(--neutral-50);border-radius:var(--radius-md)">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--color-primary-navy);
                        color:white;display:flex;align-items:center;justify-content:center;
                        font-size:11px;font-weight:700">
              ${m.contact_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style="flex:1">
              <div style="font-weight:var(--weight-semibold)">${m.contact_name}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">Contact for this meeting</div>
            </div>
            <button class="btn btn-secondary btn-sm"
                    onclick="Components.closeDrawer();Router.navigate('contacts')">
              View
            </button>
          </div>
        </div>` : ''}

        <!-- Recording & Retention -->
        <div class="profile-section">
          <div class="profile-section-title">Recording &amp; Retention</div>
          ${m.recording_url ? `
          <div style="padding:var(--space-4);background:${daysUntilPurge !== null && daysUntilPurge <= 14 ? 'var(--color-warning-bg)' : 'var(--neutral-50)'};
                      border-radius:var(--radius-md)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
              <span class="recording-badge"><span class="recording-dot"></span> Recording available</span>
              <button class="btn btn-secondary btn-sm"
                      onclick="Screens.videoMeetings.playRecording('${m.id}')">
                ▶ Play
              </button>
            </div>
            <div class="profile-fields-grid">
              <div class="profile-field">
                <span class="profile-field-label">Retention Policy</span>
                <span class="profile-field-value">90 days (platform-wide)</span>
              </div>
              <div class="profile-field">
                <span class="profile-field-label">Expires</span>
                <span class="profile-field-value" style="color:${daysUntilPurge !== null && daysUntilPurge <= 14 ? 'var(--color-warning-text)' : 'inherit'}">
                  ${m.retention_expires_at ? helpers.formatDate(m.retention_expires_at) : '—'}
                  ${daysUntilPurge !== null && daysUntilPurge <= 14 ? ` (${daysUntilPurge}d)` : ''}
                </span>
              </div>
            </div>
            ${daysUntilPurge !== null && daysUntilPurge <= 14 ? `
            <div style="margin-top:var(--space-3);font-size:var(--text-sm);color:var(--color-warning-text);
                        font-weight:var(--weight-medium)">
              ⚠️ This recording will be automatically purged. Export before ${helpers.formatDate(m.retention_expires_at)}.
            </div>` : ''}
          </div>` : `
          <div style="padding:var(--space-4);background:var(--neutral-50);border-radius:var(--radius-md);
                      text-align:center;color:var(--neutral-400);font-size:var(--text-sm)">
            No recording available for this meeting
          </div>`}
        </div>

        <!-- Post-Meeting Notes -->
        ${m.status === 'completed' ? `
        <div class="profile-section">
          <div class="profile-section-title">Notes &amp; Outcomes</div>
          <div id="vm-notes-area-${m.id}">
            <textarea class="form-input" rows="4" style="height:auto;padding:var(--space-3)"
              placeholder="Add meeting notes, outcomes, and follow-up actions…"></textarea>
            <div style="display:flex;gap:var(--space-2);margin-top:var(--space-3)">
              <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);cursor:pointer">
                <input type="checkbox" id="vm-followup-${m.id}"> Flag for follow-up
              </label>
            </div>
          </div>
        </div>` : ''}
      `,
      footer: `
        ${m.status !== 'completed' ? `
        <button class="btn btn-primary" onclick="Screens.videoMeetings.launchMeeting('${m.id}')">
          ${Icons.video} Launch Meeting
        </button>` : `
        <button class="btn btn-primary"
                onclick="Screens.videoMeetings.saveNotes('${m.id}')">
          Save Notes
        </button>`}
        ${m.recording_url ? `
        <button class="btn btn-secondary"
                onclick="Screens.videoMeetings.exportRecording('${m.id}')">
          ${Icons.download} Export Recording
        </button>` : ''}
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>`
    });
  },

  launchMeeting(meetingId) {
    const m = window.MockData.meetings.find(x => x.id === meetingId);
    if (!m) return;
    const providerLabel = m.provider === 'teams' ? 'Microsoft Teams' : 'Google Meet';
    Components.closeDrawer();
    Components.Toast(`Launching ${providerLabel}… Handoff to provider in progress`, 'info');
    setTimeout(() => {
      m.status = 'launched';
      Components.Toast(`${providerLabel} session launched. Join link sent.`, 'success');
      this.rerender();
    }, 1200);
  },

  openNotes(meetingId) {
    const m = window.MockData.meetings.find(x => x.id === meetingId);
    if (!m) return;
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'vm-notes',
      title: '📝 Meeting Notes',
      subtitle: m.title,
      body: `
        <div class="form-group">
          <label class="form-label">Summary</label>
          <textarea class="form-input" id="note-summary" rows="4"
            style="height:auto;padding:var(--space-3)"
            placeholder="What was discussed? Key decisions, context…"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Action Items</label>
          <textarea class="form-input" id="note-actions" rows="3"
            style="height:auto;padding:var(--space-3)"
            placeholder="Follow-up tasks, commitments…"></textarea>
        </div>
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer;font-size:var(--text-sm)">
            <input type="checkbox" id="note-followup"> Requires follow-up call or SMS
          </label>
        </div>
        <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-info-text)">
          ℹ️ Notes are saved to the activity log and visible from the linked contact.
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('vm-notes')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('vm-notes');Components.Toast('Meeting notes saved to activity log','success')">
          ${Icons.check} Save Notes
        </button>`
    }));
  },

  saveNotes(meetingId) {
    Components.closeDrawer();
    Components.Toast('Meeting notes saved to activity log', 'success');
  },

  playRecording(meetingId) {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'vm-play',
      title: 'Meeting Recording',
      subtitle: '90-day retention policy',
      body: `
        <div style="padding:var(--space-5);background:var(--neutral-50);border-radius:var(--radius-lg);
                    text-align:center">
          <div style="font-size:48px;margin-bottom:var(--space-4)">🎬</div>
          <div style="background:var(--neutral-200);border-radius:var(--radius-full);height:6px;
                      margin-bottom:var(--space-3)">
            <div style="width:0%;height:6px;background:var(--color-primary-navy);
                        border-radius:var(--radius-full);transition:width 3s linear"
                 id="vm-progress-bar"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);
                      color:var(--neutral-400);margin-bottom:var(--space-4)">
            <span>0:00</span><span>45:23</span>
          </div>
          <div style="display:flex;gap:var(--space-3);justify-content:center">
            <button class="btn btn-secondary btn-sm">⏮ 30s</button>
            <button class="btn btn-primary" style="width:42px;height:42px;border-radius:50%;padding:0"
                    onclick="document.getElementById('vm-progress-bar').style.width='40%'">▶</button>
            <button class="btn btn-secondary btn-sm">30s ⏭</button>
          </div>
        </div>
        <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-info-bg);
                    border-radius:var(--radius-md);font-size:var(--text-xs);color:var(--color-info-text)">
          ℹ️ Recording access is logged. Provider-hosted media. Retention: 90 days.
        </div>`,
      footerRight: `<button class="btn btn-secondary" onclick="Components.closeModal('vm-play')">Close</button>`
    }));
  },

  exportRecording(meetingId) {
    Components.Toast('Recording export queued — download link will be sent via email', 'info');
  },

  openScheduleModal() {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'vm-schedule',
      title: '📅 Schedule Meeting',
      subtitle: 'Create a CRM-linked video meeting',
      body: `
        <div class="form-group">
          <label class="form-label required">Title</label>
          <input class="form-input" placeholder="e.g. Buyer consultation · Policy review">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Date</label>
            <input class="form-input" type="date" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="form-group">
            <label class="form-label required">Time</label>
            <input class="form-input" type="time" value="10:00">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Duration</label>
            <select class="form-select">
              <option>30 minutes</option>
              <option selected>1 hour</option>
              <option>90 minutes</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Provider</label>
            <select class="form-select">
              <option>💼 Microsoft Teams</option>
              <option>📹 Google Meet</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Link to Contact</label>
          <select class="form-select">
            <option value="">No contact linked</option>
            ${window.MockData.contacts.slice(0, 15).map(c =>
              `<option>${c.first_name} ${c.last_name}</option>`
            ).join('')}
          </select>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('vm-schedule')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('vm-schedule');Components.Toast('Meeting scheduled and calendar event created','success')">
          ${Icons.calendar} Schedule
        </button>`
    }));
  },

  openLaunchModal() {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'vm-launch-now',
      title: '📹 Launch Instant Meeting',
      subtitle: 'Start an ad-hoc video call',
      body: `
        <div class="form-group">
          <label class="form-label required">Provider</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
            <div class="vm-provider-select active" id="vl-teams"
                 onclick="this.classList.add('active');document.getElementById('vl-meet').classList.remove('active')"
                 style="padding:var(--space-4);border:2px solid var(--color-primary-navy);border-radius:var(--radius-lg);
                        cursor:pointer;text-align:center">
              <div style="font-size:28px">💼</div>
              <div style="font-weight:var(--weight-semibold);color:var(--color-primary-navy)">Teams</div>
            </div>
            <div class="vm-provider-select" id="vl-meet"
                 onclick="this.classList.add('active');document.getElementById('vl-teams').classList.remove('active')"
                 style="padding:var(--space-4);border:2px solid var(--neutral-200);border-radius:var(--radius-lg);
                        cursor:pointer;text-align:center">
              <div style="font-size:28px">📹</div>
              <div style="font-weight:var(--weight-semibold);color:var(--neutral-600)">Google Meet</div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Invite Contact (optional)</label>
          <select class="form-select">
            <option value="">No contact</option>
            ${window.MockData.contacts.slice(0, 10).map(c =>
              `<option>${c.first_name} ${c.last_name}</option>`
            ).join('')}
          </select>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('vm-launch-now')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('vm-launch-now');Components.Toast('Launching Microsoft Teams…','success')">
          ${Icons.video} Launch Now
        </button>`
    }));
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