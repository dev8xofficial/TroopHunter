/**
 * Burkes Group CRM — SMS Screen
 * Source: .specify/specs/007-sms/spec.md, screens/sms.yaml
 * Batch: 4 of 7 — SMS + Email (Phase 1)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.sms = {
  _activeThreadId: null,

  render() {
    const { smsThreads, helpers } = window.MockData;
    const { Icons } = window.Components;

    const activeThread = this._activeThreadId
      ? smsThreads.find(t => t.id === this._activeThreadId)
      : smsThreads[0];

    if (!this._activeThreadId && smsThreads.length) {
      this._activeThreadId = smsThreads[0].id;
    }

    return `
      <!-- SMS Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>SMS</h1>
          <p>${smsThreads.reduce((n, t) => n + t.unread_count, 0)} unread · ${smsThreads.length} threads</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-primary btn-sm" onclick="Screens.sms.newThread()">
            ${Icons.plus} New Message
          </button>
        </div>
      </div>

      <!-- Two-Panel SMS Layout -->
      <div class="sms-layout">

        <!-- Thread List -->
        <div class="sms-thread-list">
          <div class="sms-thread-search">
            <div style="position:relative">
              <span style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--neutral-400);pointer-events:none;display:flex">${Icons.search}</span>
              <input type="text" style="width:100%;height:32px;padding:0 12px 0 30px;border:1.5px solid var(--neutral-200);border-radius:var(--radius-md);font-size:var(--text-sm);outline:none;"
                     placeholder="Search threads…"
                     oninput="Screens.sms.filterThreads(this.value)">
            </div>
          </div>
          <div class="sms-thread-scroll" id="sms-thread-scroll">
            ${smsThreads.map(thread => this.renderThreadItem(thread, thread.id === (activeThread?.id))).join('')}
          </div>
        </div>

        <!-- Conversation Panel -->
        <div class="sms-conversation">
          ${activeThread
            ? this.renderConversation(activeThread)
            : `<div class="sms-empty-state"><div style="font-size:48px">💬</div><div>Select a thread to start messaging</div></div>`}
        </div>

      </div>`;
  },

  renderThreadItem(thread, isActive) {
    const { helpers } = window.MockData;
    return `
      <div class="sms-thread-item ${isActive ? 'active' : ''}" onclick="Screens.sms.selectThread('${thread.id}')">
        <div style="width:36px;height:36px;border-radius:50%;background:var(--color-primary-navy);color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">
          ${thread.contact_name.split(' ').map(n=>n[0]).join('').toUpperCase()}
        </div>
        <div class="sms-thread-info">
          <div class="sms-thread-name">
            ${thread.contact_name}
            ${thread.opt_out ? '<span style="font-size:9px;background:#fee2e2;color:#991b1b;padding:1px 4px;border-radius:3px;margin-left:4px">OPT-OUT</span>' : ''}
          </div>
          <div class="sms-thread-preview">${thread.last_message}</div>
        </div>
        <div class="sms-thread-time">${window.MockData.helpers.formatRelative(thread.last_message_at)}</div>
        ${thread.unread_count > 0 ? `<div class="sms-unread-badge">${thread.unread_count}</div>` : ''}
      </div>`;
  },

  renderConversation(thread) {
    const { helpers } = window.MockData;
    const { Icons } = window.Components;
    const isOptedOut = thread.opt_out;

    return `
      <!-- Conversation Header -->
      <div class="sms-conv-header">
        <div style="display:flex;align-items:center;gap:var(--space-3)">
          <div style="width:36px;height:36px;border-radius:50%;background:var(--color-primary-navy);color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">
            ${thread.contact_name.split(' ').map(n=>n[0]).join('').toUpperCase()}
          </div>
          <div>
            <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${thread.contact_name}</div>
            <div style="font-size:var(--text-xs);color:var(--neutral-400)">${thread.phone} · ${thread.department}</div>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-2)">
          ${isOptedOut ? `<span class="badge badge-red">Opted Out</span>` : `<span class="badge badge-green badge-dot">Active</span>`}
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')" title="View contact">${Icons.users}</button>
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('calls')" title="Call">${Icons.phone}</button>
        </div>
      </div>

      ${isOptedOut ? `
      <div class="degraded-banner" style="margin:var(--space-3) var(--space-4) 0;border-radius:var(--radius-md)">
        <span class="degraded-banner-icon">⛔</span>
        <span class="degraded-banner-text">This contact has opted out of SMS messaging. Outbound sending is blocked.</span>
      </div>` : ''}

      <!-- Messages -->
      <div class="sms-messages" id="sms-messages-${thread.id}">
        ${thread.messages.map(msg => `
          <div class="sms-message ${msg.direction}">
            <div class="sms-bubble">${msg.body}</div>
            <div class="sms-msg-time">${helpers.formatRelative(msg.created_at)}</div>
          </div>`).join('')}
      </div>

      <!-- Compose Bar -->
      <div class="sms-compose">
        <textarea class="sms-compose-input"
                  id="sms-compose-${thread.id}"
                  placeholder="${isOptedOut ? 'Messaging blocked — contact has opted out' : 'Type a message…'}"
                  ${isOptedOut ? 'disabled' : ''}
                  rows="1"
                  oninput="this.style.height='auto';this.style.height=(this.scrollHeight)+'px'"
                  onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();Screens.sms.sendMessage('${thread.id}')}"></textarea>
        <button class="sms-send-btn" onclick="Screens.sms.sendMessage('${thread.id}')" ${isOptedOut ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>
          ${Icons.send}
        </button>
      </div>`;
  },

  selectThread(threadId) {
    this._activeThreadId = threadId;
    // Mark thread as read
    const thread = window.MockData.smsThreads.find(t => t.id === threadId);
    if (thread) thread.unread_count = 0;
    // Re-render conversation panel only
    const conv = document.querySelector('.sms-conversation');
    if (conv) {
      const t = window.MockData.smsThreads.find(t => t.id === threadId);
      conv.innerHTML = t ? this.renderConversation(t) : `<div class="sms-empty-state">Select a thread</div>`;
    }
    // Update active state in thread list
    document.querySelectorAll('.sms-thread-item').forEach(el => el.classList.remove('active'));
    const items = document.querySelectorAll('.sms-thread-item');
    const idx = window.MockData.smsThreads.findIndex(t => t.id === threadId);
    if (items[idx]) items[idx].classList.add('active');
    // Scroll to bottom
    setTimeout(() => {
      const msgs = document.getElementById(`sms-messages-${threadId}`);
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }, 50);
  },

  sendMessage(threadId) {
    if (this._sending) return;
    const input = document.getElementById(`sms-compose-${threadId}`);
    const body = input?.value.trim();
    if (!body) return;

    const thread = window.MockData.smsThreads.find(t => t.id === threadId);
    if (!thread || thread.opt_out) {
      Components.Toast('Cannot send — contact has opted out', 'error');
      return;
    }

    // Add message to thread
    const msg = {
      id: `MSG-new-${Date.now()}`,
      direction: 'outbound',
      body,
      status: 'delivered',
      created_at: new Date().toISOString()
    };
    thread.messages.push(msg);
    thread.last_message = body;
    thread.last_message_at = msg.created_at;

    if (input) { input.value = ''; input.style.height = 'auto'; }

    // Re-render conversation area
    const conv = document.querySelector('.sms-conversation');
    if (conv) conv.innerHTML = this.renderConversation(thread);

    setTimeout(() => {
      const msgs = document.getElementById(`sms-messages-${threadId}`);
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }, 50);

    Components.Toast('Message sent', 'success');
  },

  filterThreads(query) {
    const q = query.toLowerCase();
    const scroll = document.getElementById('sms-thread-scroll');
    if (!scroll) return;
    const filtered = q
      ? window.MockData.smsThreads.filter(t =>
          t.contact_name.toLowerCase().includes(q) ||
          t.last_message.toLowerCase().includes(q) ||
          t.phone.includes(q))
      : window.MockData.smsThreads;
    scroll.innerHTML = filtered.map(t =>
      this.renderThreadItem(t, t.id === this._activeThreadId)
    ).join('');
  },

  newThread() {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'new-sms',
      title: 'New Message',
      subtitle: 'Send an SMS to a contact',
      body: `
        <div class="form-group">
          <label class="form-label required">Contact</label>
          <select class="form-select" id="ns-contact">
            <option value="">Select a contact…</option>
            ${window.MockData.contacts.map(c =>
              `<option value="${c.id}">${c.first_name} ${c.last_name} — ${c.phone}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">Message</label>
          <textarea class="form-input" id="ns-body" rows="4" style="height:auto;padding:var(--space-3)"
            placeholder="Type your message here…"></textarea>
          <div class="form-helper">Max 160 characters for standard SMS</div>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('new-sms')">Cancel</button>
        <button class="btn btn-primary" onclick="Components.closeModal('new-sms');Components.Toast('Message sent successfully','success')">
          ${Icons.send} Send Message
        </button>`
    }));
  },

  init() {
    // Scroll to bottom of active thread
    if (this._activeThreadId) {
      setTimeout(() => {
        const msgs = document.getElementById(`sms-messages-${this._activeThreadId}`);
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      }, 100);
    }
  }
};