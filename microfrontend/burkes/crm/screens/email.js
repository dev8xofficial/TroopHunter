/**
 * Burkes Group CRM — Email Screen
 * Source: .specify/specs/008-email/spec.md, screens/email.yaml
 * Batch: 4 of 7 — SMS + Email (Phase 1)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.email = {
  _activeEmailId: null,
  _view: 'inbox',  // 'inbox' | 'unresolved'

  render() {
    const { emailInbox, helpers } = window.MockData;
    const { Icons } = window.Components;

    if (!this._activeEmailId && emailInbox.length) {
      this._activeEmailId = emailInbox[0].id;
    }
    const active = emailInbox.find(e => e.id === this._activeEmailId);

    const unresolvedCount = emailInbox.filter(e => e.status === 'received' && !e.contact_id).length;

    return `
      <!-- Email Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Email</h1>
          <p>Outlook-linked workspace · ${emailInbox.length} messages</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Screens.email.openCompose()">
            ${Icons.plus} Compose
          </button>
        </div>
      </div>

      <!-- Provider Status -->
      <div class="degraded-banner" style="border-color:var(--color-success);background:var(--color-success-bg);margin-bottom:var(--space-4)">
        <span style="font-size:16px">📧</span>
        <span style="color:var(--color-success-text);font-weight:var(--weight-medium)">
          Microsoft Outlook connected · Last synced just now · <strong>7 unread</strong>
        </span>
        <span style="margin-left:auto;font-size:var(--text-xs);color:var(--color-success-text);opacity:.7">
          Outlook as system of record (per adr-004)
        </span>
      </div>

      <!-- Tabs -->
      <div class="tabs" style="margin-bottom:0">
        <div class="tab ${this._view==='inbox'?'active':''}" onclick="Screens.email._view='inbox';Screens.email.rerender()">
          Inbox <span style="margin-left:4px;background:var(--color-primary-navy);color:white;font-size:9px;font-weight:700;border-radius:99px;padding:1px 5px">7</span>
        </div>
        <div class="tab ${this._view==='unresolved'?'active':''}" onclick="Screens.email._view='unresolved';Screens.email.rerender()">
          Unresolved Senders
          ${unresolvedCount ? `<span style="margin-left:4px;background:var(--color-warning);color:white;font-size:9px;font-weight:700;border-radius:99px;padding:1px 5px">${unresolvedCount}</span>` : ''}
        </div>
      </div>

      <!-- Email Two-Panel Layout -->
      <div class="email-layout">

        <!-- Sidebar: Email List -->
        <div class="email-sidebar">
          <div class="email-toolbar">
            <div style="position:relative;flex:1">
              <span style="position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--neutral-400);display:flex">${Icons.search}</span>
              <input style="width:100%;height:30px;padding:0 10px 0 28px;border:1.5px solid var(--neutral-200);border-radius:var(--radius-md);font-size:var(--text-xs);outline:none"
                     placeholder="Search email…"
                     oninput="Screens.email.filterEmails(this.value)">
            </div>
            <button class="btn btn-ghost btn-sm btn-icon" onclick="Components.Toast('Syncing with Outlook…','info')" title="Refresh">${Icons.refresh}</button>
          </div>
          <div class="email-list" id="email-list">
            ${this.renderEmailList(emailInbox)}
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="email-preview" id="email-preview">
          ${active
            ? this.renderEmailPreview(active)
            : `<div class="email-empty"><div style="font-size:48px">✉️</div><div>Select an email to read</div></div>`}
        </div>

      </div>`;
  },

  renderEmailList(emails) {
    const { helpers } = window.MockData;
    const filtered = this._view === 'unresolved'
      ? emails.filter(e => !e.contact_id)
      : emails;

    if (!filtered.length) {
      return `<div style="padding:var(--space-7);text-align:center;color:var(--neutral-400)">
        <div style="font-size:32px;margin-bottom:8px">📭</div>
        <div>${this._view === 'unresolved' ? 'No unresolved senders' : 'No emails'}</div>
      </div>`;
    }

    return filtered.map(email => {
      const isActive = email.id === this._activeEmailId;
      const isUnread = email.direction === 'inbound' && email.status === 'received';
      return `
        <div class="email-item ${isActive ? 'active' : ''} ${isUnread ? 'unread' : ''}"
             onclick="Screens.email.selectEmail('${email.id}')">
          <div style="width:32px;height:32px;border-radius:50%;background:${isUnread?'var(--color-primary-navy)':'var(--neutral-200)'};color:${isUnread?'white':'var(--neutral-600)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">
            ${email.contact_name?.split(' ').map(n=>n[0]).join('').toUpperCase() || '?'}
          </div>
          <div class="email-item-info">
            <div class="email-item-from">
              ${email.contact_name || 'Unknown Sender'}
              ${email.has_attachments ? `<span style="color:var(--neutral-400)">📎</span>` : ''}
              ${!email.contact_id ? `<span style="font-size:9px;background:#fee2e2;color:#991b1b;padding:1px 4px;border-radius:3px">UNRESOLVED</span>` : ''}
            </div>
            <div class="email-item-subject">${email.subject}</div>
            <div class="email-item-preview">${email.preview || ''}</div>
          </div>
          <div class="email-item-time">${window.MockData.helpers.formatRelative(email.sent_at)}</div>
        </div>`;
    }).join('');
  },

  renderEmailPreview(email) {
    const { helpers, contacts } = window.MockData;
    const { Icons } = window.Components;
    const contact = contacts.find(c => c.id === email.contact_id);

    return `
      <div class="email-preview-header">
        <div class="email-preview-subject">${email.subject}</div>
        <div class="email-preview-meta">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--color-primary-navy);color:white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">
            ${(email.contact_name||'?').split(' ').map(n=>n[0]).join('').toUpperCase()}
          </div>
          <div>
            <span style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${email.contact_name || 'Unknown'}</span>
            <span>·</span>
            <span>${helpers.formatDateTime(email.sent_at)}</span>
            ${email.has_attachments ? `<span>·</span><span>📎 Attachment</span>` : ''}
          </div>
          ${email.contact_id
            ? `<span class="badge badge-green badge-dot">Linked</span>`
            : `<span class="badge badge-red">Unresolved sender</span>`}
        </div>
      </div>

      <div class="email-preview-actions">
        <button class="btn btn-primary btn-sm" onclick="Screens.email.openReply('${email.id}')">${Icons.arrowRight} Reply</button>
        <button class="btn btn-secondary btn-sm" onclick="Screens.email.openReply('${email.id}','forward')">Forward</button>
        ${!email.contact_id
          ? `<button class="btn btn-secondary btn-sm" onclick="Screens.email.resolveUnknown('${email.id}')">${Icons.users} Link Contact</button>`
          : `<button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')">${Icons.users} View Contact</button>`}
        <div style="flex:1"></div>
        <span class="badge badge-${email.direction==='inbound'?'blue':'green'}">${email.direction === 'inbound' ? '↓ Inbound' : '↑ Outbound'}</span>
      </div>

      <div class="email-body">
        <p>Dear ${email.contact_name || 'Team'},</p>
        <p>Thank you for reaching out. I wanted to follow up on our previous conversation regarding your inquiry. We have reviewed your information and would be happy to discuss next steps.</p>
        <p>Please let me know if you have any questions or if there's a time that works best for a call.</p>
        <p>Best regards,<br>Burkes Group Team</p>
        ${email.has_attachments ? `
        <div style="margin-top:var(--space-5);padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
          <div style="font-size:var(--text-xs);font-weight:var(--weight-semibold);color:var(--neutral-500);margin-bottom:var(--space-2)">ATTACHMENTS</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:white;border:1px solid var(--neutral-200);border-radius:var(--radius-md);font-size:var(--text-sm)">
              📄 document.pdf <span style="color:var(--neutral-400);font-size:var(--text-xs)">248 KB</span>
            </div>
          </div>
        </div>` : ''}
      </div>`;
  },

  selectEmail(emailId) {
    this._activeEmailId = emailId;
    // Update list active state
    document.querySelectorAll('.email-item').forEach(el => el.classList.remove('active'));
    const emails = this._view === 'unresolved'
      ? window.MockData.emailInbox.filter(e => !e.contact_id)
      : window.MockData.emailInbox;
    const idx = emails.findIndex(e => e.id === emailId);
    const items = document.querySelectorAll('.email-item');
    if (items[idx]) items[idx].classList.add('active');
    // Update preview
    const email = window.MockData.emailInbox.find(e => e.id === emailId);
    const preview = document.getElementById('email-preview');
    if (preview && email) preview.innerHTML = this.renderEmailPreview(email);
  },

  filterEmails(query) {
    const q = query.toLowerCase();
    const all = window.MockData.emailInbox;
    const filtered = q ? all.filter(e =>
      (e.subject||'').toLowerCase().includes(q) ||
      (e.contact_name||'').toLowerCase().includes(q)
    ) : all;
    const list = document.getElementById('email-list');
    if (list) list.innerHTML = this.renderEmailList(filtered);
  },

  openCompose(contactId) {
    const { Icons, Modal } = window.Components;
    const contact = contactId ? window.MockData.contacts.find(c => c.id === contactId) : null;

    Components.openModal(Modal({
      id: 'compose-email',
      title: '✉️ New Email',
      subtitle: 'Compose via Outlook',
      large: true,
      body: `
        <div class="form-group">
          <label class="form-label required">To</label>
          <select class="form-select" id="ce-to">
            ${contact
              ? `<option value="${contact.id}" selected>${contact.first_name} ${contact.last_name} &lt;${contact.email}&gt;</option>`
              : `<option value="">Select a contact…</option>`}
            ${window.MockData.contacts.map(c =>
              (!contact || c.id !== contact.id) ? `<option value="${c.id}">${c.first_name} ${c.last_name} &lt;${c.email}&gt;</option>` : ''
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">Subject</label>
          <input class="form-input" id="ce-subject" placeholder="Email subject…">
        </div>
        <div class="form-group">
          <label class="form-label required">Message</label>
          <textarea class="form-input" id="ce-body" rows="8" style="height:auto;padding:var(--space-3)"
            placeholder="Compose your message…"></textarea>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) 0">
          <button class="btn btn-ghost btn-sm">${Icons.paperclip} Attach</button>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Sent via Microsoft Outlook · Activity auto-logged to CRM</span>
        </div>`,
      footerLeft: `<label style="display:flex;align-items:center;gap:6px;font-size:var(--text-sm);cursor:pointer">
        <input type="checkbox" checked> Auto-log to CRM activity
      </label>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('compose-email')">Cancel</button>
        <button class="btn btn-primary" onclick="Screens.email.sendEmail()">
          ${Icons.send} Send via Outlook
        </button>`
    }));
  },

  openReply(emailId, type = 'reply') {
    const email = window.MockData.emailInbox.find(e => e.id === emailId);
    if (!email) return;
    const { Icons, Modal } = window.Components;

    Components.openModal(Modal({
      id: 'reply-email',
      title: type === 'forward' ? '⤴ Forward Email' : '↩ Reply',
      subtitle: email.subject,
      body: `
        <div class="form-group">
          <label class="form-label required">To</label>
          <input class="form-input" value="${email.contact_name || ''}" ${type === 'reply' ? '' : 'placeholder="Add recipients…"'}>
        </div>
        <div class="form-group">
          <label class="form-label required">Message</label>
          <textarea class="form-input" rows="5" style="height:auto;padding:var(--space-3)"
            placeholder="Write your reply…"></textarea>
        </div>
        <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-xs);color:var(--neutral-400)">
          ——— Original message ———<br>
          From: ${email.contact_name} · ${window.MockData.helpers.formatDateTime(email.sent_at)}<br>
          Subject: ${email.subject}
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('reply-email')">Cancel</button>
        <button class="btn btn-primary" onclick="Screens.email.sendEmail('reply-email')">
          ${Icons.send} Send
        </button>`
    }));
  },

  sendEmail(modalId = 'compose-email') {
    Components.closeModal(modalId);
    // Add to inbox as sent
    const newEmail = {
      id: `EML-new-${Date.now()}`,
      contact_name: 'Contact',
      subject: document.getElementById('ce-subject')?.value || 'Re: Message',
      direction: 'outbound',
      status: 'sent',
      sent_at: new Date().toISOString(),
      has_attachments: false,
      preview: 'Message sent via Outlook'
    };
    window.MockData.emailInbox.unshift(newEmail);
    Components.Toast('Email sent via Outlook · Auto-logged to activity', 'success');
    this.rerender();
  },

  resolveUnknown(emailId) {
    const email = window.MockData.emailInbox.find(e => e.id === emailId);
    if (!email) return;
    const { Icons, Modal } = window.Components;

    Components.openModal(Modal({
      id: 'resolve-sender',
      title: 'Resolve Unknown Sender',
      subtitle: 'Link this email to a CRM contact',
      body: `
        <div style="padding:var(--space-3);background:var(--color-warning-bg);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-warning-text);margin-bottom:var(--space-4)">
          ⚠️ This email has no matched contact. Link it to maintain a complete customer record.
        </div>
        <div class="form-group">
          <label class="form-label">Search existing contacts</label>
          <input class="form-input" placeholder="Name or email…">
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);margin:var(--space-3) 0">
          <div style="flex:1;height:1px;background:var(--neutral-200)"></div>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">OR</span>
          <div style="flex:1;height:1px;background:var(--neutral-200)"></div>
        </div>
        <div class="form-group">
          <label class="form-label">Create minimal contact</label>
          <div class="form-row">
            <input class="form-input" placeholder="First name">
            <input class="form-input" placeholder="Last name">
          </div>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('resolve-sender')">Cancel</button>
        <button class="btn btn-primary" onclick="Components.closeModal('resolve-sender');Components.Toast('Email linked to contact','success')">
          ${Icons.check} Link Contact
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