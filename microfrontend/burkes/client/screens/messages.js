/* =============================================================
   MESSAGES SCREEN — 003-messages spec
   Role-scoped two-panel messaging with document attachments,
   unread counts, and audit-visible delivery.
   ============================================================= */

const MessagesScreen = (() => {
  // ── State ─────────────────────────────────────────────────
  let _activeConvId = null;
  let _composeText = '';

  // Role color map (matching constitution role colours)
  const ROLE_COLORS = {
    CL: { bg: 'var(--role-cl-color)', label: 'Client' },
    AG: { bg: 'var(--role-ag-color)', label: 'Agent' },
    LN: { bg: 'var(--role-ln-color)', label: 'Lender' },
    AT: { bg: 'var(--role-at-color)', label: 'Attorney' },
    CP: { bg: 'var(--role-cp-color)', label: 'CPA' },
    TC: { bg: 'var(--role-tc-color)', label: 'Coordinator' },
  };

  function _initials(name) {
    return (name || '?')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  function _fmtTime(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffH = Math.floor(diffMs / 3600000);
    if (diffH < 1) return 'Just now';
    if (diffH < 24) return `${diffH}h ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function _fmtTimestamp(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function _getConversations() {
    const role = Session.role;
    const all = window.MockData?.messages || [];
    if (role === 'CL') return all;
    // Professionals see convs they participate in
    return all.filter((c) => c.with_role === role || c.participants?.includes(role));
  }

  function _getActiveConv() {
    const convs = _getConversations();
    if (!convs.length) return null;
    return convs.find((c) => c.id === _activeConvId) || convs[0];
  }

  // ── Render ────────────────────────────────────────────────
  function render(outlet) {
    if (!outlet) return;

    const convs = _getConversations();
    const active = _getActiveConv();
    if (!_activeConvId && active) _activeConvId = active.id;

    outlet.innerHTML = `
      <div class="screen" style="padding-bottom:0">

        <div class="page-header">
          <div class="page-header-left">
            <h1 class="page-title">Messages</h1>
            <p class="page-subtitle">Secure messaging with your transaction team</p>
          </div>
        </div>

        <div class="messages-layout" id="messages-layout">

          <!-- Thread List -->
          <div class="thread-list" id="thread-list" role="list" aria-label="Conversations">
            <div class="thread-list-header">
              Conversations
              <span style="font-size:var(--text-xs);font-weight:400;color:var(--neutral-400);margin-left:var(--space-2)">
                ${convs.reduce((sum, c) => sum + (c.unread || c.unread_count || 0), 0)} unread
              </span>
            </div>
            ${
              convs.length === 0
                ? `<div class="empty-state" style="padding:var(--space-8)">
                  <div class="empty-state-title">No conversations</div>
                  <div class="empty-state-desc">Your team hasn't started any threads yet.</div>
                 </div>`
                : convs.map((c) => _renderThread(c, c.id === _activeConvId)).join('')
            }
          </div>

          <!-- Message Panel -->
          <div class="message-panel" id="message-panel">
            ${active ? _renderMessagePanel(active) : _renderEmptyPanel()}
          </div>

        </div>

      </div>`;

    _bindEvents(outlet);
    _scrollToBottom();
  }

  function _renderThread(conv, isActive) {
    const role = conv.with_role;
    const color = ROLE_COLORS[role]?.bg || 'var(--color-navy)';
    const msgs = conv.messages || [];
    const last = msgs[msgs.length - 1];
    const preview = last?.text ? last.text.slice(0, 55) + (last.text.length > 55 ? '…' : '') : 'No messages yet';
    const unread = conv.unread || conv.unread_count || msgs.filter((m) => m.unread).length;
    const time = last?.timestamp ? _fmtTime(last.timestamp) : '';
    const initials = _initials(conv.with_name);

    return `
      <div class="thread-item${isActive ? ' active' : ''}" data-conv-id="${conv.id}" role="listitem" tabindex="0" aria-label="Conversation with ${conv.with_name}">
        <div class="thread-avatar" style="background:${color}" aria-hidden="true">${initials}</div>
        <div class="thread-info">
          <div class="thread-name">
            <span class="thread-name-text">${conv.with_name || 'Unknown'}</span>
            <div style="display:flex;align-items:center;gap:var(--space-1)">
              ${time ? `<span class="thread-time">${time}</span>` : ''}
              ${unread > 0 ? `<span class="thread-unread" aria-label="${unread} unread">${unread}</span>` : ''}
            </div>
          </div>
          <div class="thread-preview">${Badge.role(role)?.replace(/<[^>]*>/g, '') || role} · ${preview}</div>
        </div>
      </div>`;
  }

  function _renderMessagePanel(conv) {
    const role = conv.with_role;
    const color = ROLE_COLORS[role]?.bg || 'var(--color-navy)';
    const initials = _initials(conv.with_name);
    const msgs = conv.messages || [];
    const myRole = Session.role;

    const bubbles = msgs
      .map((m) => {
        const isMine = m.from === myRole;
        const time = _fmtTimestamp(m.timestamp);
        const attach = m.attachment_doc_id
          ? `<div style="margin-top:var(--space-2);padding:var(--space-2) var(--space-3);background:rgba(255,255,255,.15);border-radius:var(--radius-sm);font-size:var(--text-xs);display:flex;align-items:center;gap:var(--space-1)">
             <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 1H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4L6 1z"/><polyline points="6,1 6,4 9,4"/></svg>
             Attachment
           </div>`
          : '';

        return `
        <div class="message-bubble-wrap ${isMine ? 'sent' : 'received'}" style="max-width:72%">
          ${!isMine ? `<div style="width:28px;height:28px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;flex-shrink:0;align-self:flex-end">${_initials(conv.with_name)}</div>` : ''}
          <div style="display:flex;flex-direction:column;${isMine ? 'align-items:flex-end' : 'align-items:flex-start'}">
            <div class="message-bubble">
              ${m.text || m.bodytext || ''}
              ${attach}
            </div>
            <span class="message-time">${time}</span>
          </div>
          ${isMine ? `<div style="width:28px;height:28px;border-radius:50%;background:var(--role-cl-color);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;flex-shrink:0;align-self:flex-end">${_initials(window.MockData?.transaction?.client_name || 'Me')}</div>` : ''}
        </div>`;
      })
      .join('');

    return `
      <div class="message-panel-header">
        <div style="width:40px;height:40px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:var(--text-sm);flex-shrink:0">${initials}</div>
        <div>
          <div style="font-size:var(--text-base);font-weight:600;color:var(--color-navy)">${conv.with_name}</div>
          <div style="font-size:var(--text-xs);color:var(--neutral-500)">
            ${Badge.role(role)} · ${conv.with_company || ''}
          </div>
        </div>
        <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="Toast.info('Profile details coming soon')" type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="1"/><circle cx="2" cy="7" r="1"/><circle cx="12" cy="7" r="1"/></svg>
        </button>
      </div>

      <div class="messages-list" id="messages-list">
        ${msgs.length === 0 ? `<div class="empty-state"><div class="empty-state-title">No messages yet</div><div class="empty-state-desc">Send a message to start the conversation.</div></div>` : bubbles}
      </div>

      <div class="compose-bar" id="compose-bar">
        <button class="btn btn-ghost btn-sm" id="attach-btn" title="Attach document" type="button">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 7.5l-5.5 5.5a4 4 0 1 1-5.657-5.657l6.364-6.364a2.5 2.5 0 0 1 3.536 3.536L5.379 11.05a1 1 0 0 1-1.415-1.414l6.364-6.364"/></svg>
        </button>
        <textarea
          class="compose-textarea"
          id="compose-input"
          placeholder="Write a message…"
          rows="1"
          aria-label="Message input"
        >${_composeText}</textarea>
        <button class="btn btn-primary btn-sm" id="send-btn" type="button" aria-label="Send message">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="13" y1="1" x2="1" y2="5"/><line x1="13" y1="1" x2="7" y2="13"/><line x1="13" y1="1" x2="1" y2="7"/></svg>
          Send
        </button>
      </div>`;
  }

  function _renderEmptyPanel() {
    return `
      <div class="empty-state" style="flex:1">
        <div style="font-size:2.5rem;margin-bottom:var(--space-3)">💬</div>
        <div class="empty-state-title">Select a conversation</div>
        <div class="empty-state-desc">Choose a thread from the left to start messaging your team.</div>
      </div>`;
  }

  // ── Scroll ────────────────────────────────────────────────
  function _scrollToBottom() {
    requestAnimationFrame(() => {
      const list = document.getElementById('messages-list');
      if (list) list.scrollTop = list.scrollHeight;
    });
  }

  // ── Send message ──────────────────────────────────────────
  function _sendMessage() {
    const input = document.getElementById('compose-input');
    const text = input?.value?.trim();
    if (!text) return;

    const conv = _getActiveConv();
    if (!conv) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      from: Session.role,
      text,
      timestamp: new Date().toISOString(),
    };

    if (!conv.messages) conv.messages = [];
    conv.messages.push(newMsg);
    conv.unread = 0;
    _composeText = '';

    const outlet = document.getElementById('screen-outlet');
    if (outlet) render(outlet);
  }

  // ── Event binding ─────────────────────────────────────────
  function _bindEvents(outlet) {
    // Thread selection
    outlet.querySelectorAll('.thread-item').forEach((item) => {
      const select = () => {
        _activeConvId = item.dataset.convId;
        // Mark as read
        const conv = _getConversations().find((c) => c.id === _activeConvId);
        if (conv) {
          conv.unread = 0;
          conv.unread_count = 0;
          conv.messages?.forEach((m) => {
            m.unread = false;
          });
        }
        render(outlet);
      };
      item.addEventListener('click', select);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') select();
      });
    });

    // Send button
    document.getElementById('send-btn')?.addEventListener('click', _sendMessage);

    // Textarea — Enter to send, Shift+Enter for newline
    const input = document.getElementById('compose-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          _sendMessage();
        }
      });
      input.addEventListener('input', (e) => {
        _composeText = e.target.value;
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
      });
    }

    // Attach button
    document.getElementById('attach-btn')?.addEventListener('click', () => {
      _showAttachModal();
    });
  }

  // ── Attach document ───────────────────────────────────────
  function _showAttachModal() {
    const docs = window.MockData?.getDocumentsForRole?.(Session.role) || window.MockData?.documents || [];

    Modal.open({
      title: 'Attach Document',
      body: `
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          <p style="font-size:var(--text-sm);color:var(--neutral-500)">Select a document from your transaction to share:</p>
          ${docs
            .slice(0, 8)
            .map(
              (d) => `
            <div class="thread-item" style="border:var(--border-light);border-radius:var(--radius-md);cursor:pointer" data-attach-id="${d.id || d.document_id}" tabindex="0">
              <div class="td-filename-icon" style="background:var(--neutral-100);width:32px;height:32px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--neutral-500)" stroke-width="1.5" stroke-linecap="round"><path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 1z"/><polyline points="9,1 9,6 14,6"/></svg>
              </div>
              <div style="flex:1;min-width:0">
                <div style="font-size:var(--text-sm);font-weight:500;color:var(--color-navy);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.filename}</div>
                <div style="font-size:var(--text-xs);color:var(--neutral-400)">${Badge.category(d.category)}</div>
              </div>
            </div>`,
            )
            .join('')}
          ${docs.length === 0 ? '<div style="text-align:center;color:var(--neutral-400);font-size:var(--text-sm)">No documents available</div>' : ''}
        </div>`,
      actions: [{ label: 'Cancel', variant: 'secondary' }],
    });

    setTimeout(() => {
      document.querySelectorAll('[data-attach-id]').forEach((item) => {
        item.addEventListener('click', () => {
          Modal.close();
          const input = document.getElementById('compose-input');
          if (input) {
            input.value = (input.value + ' [📎 Document attached]').trim();
            _composeText = input.value;
          }
          Toast.info('Document attached to message.');
        });
      });
    }, 60);
  }

  return { render };
})();

window.MessagesScreen = MessagesScreen;
