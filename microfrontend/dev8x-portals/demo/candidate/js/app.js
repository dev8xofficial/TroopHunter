import bootstrapSurface from '../../shared/js/surface-app.js';

const DATASET_KEY = 'data/mock-candidate-data.json';

function getCandidateData(datasets) {
  return datasets?.[DATASET_KEY] || {};
}

function initDashboard(outlet, data) {
  const metrics = outlet.querySelector('[data-candidate-metrics]');
  const timeline = outlet.querySelector('[data-candidate-timeline]');
  const deadlines = outlet.querySelector('[data-candidate-deadlines]');

  if (metrics && data.dashboard?.metrics) {
    metrics.innerHTML = data.dashboard.metrics
      .map(
        (card, index) => `
          <article class="metric-card ${index === 0 ? 'candidate-spotlight' : ''}">
            <div class="metric-card__label">${card.label}</div>
            <div class="metric-card__value">${card.value}</div>
            <div class="metric-card__meta">${card.meta}</div>
          </article>
        `
      )
      .join('');
  }

  if (timeline && data.timeline) {
    timeline.innerHTML = data.timeline
      .map(
        (item) => `
          <div class="timeline__item">
            <div class="timeline__dot ${item.state === 'complete' ? 'is-complete' : item.state === 'active' ? 'is-active' : ''}">${item.step}</div>
            <h3 class="timeline__title">${item.title}</h3>
            <p class="timeline__date">${item.date}</p>
          </div>
        `
      )
      .join('');
  }

  if (deadlines && data.dashboard?.deadlines) {
    deadlines.innerHTML = data.dashboard.deadlines
      .map(
        (item) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${item.title}</p>
              <p class="list-item__meta">${item.meta}</p>
            </div>
            <span class="status-pill status-pill--${item.status}">${item.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }
}

function initTimeline(outlet, data) {
  const timeline = outlet.querySelector('[data-candidate-full-timeline]');
  if (timeline && data.timeline) {
    timeline.innerHTML = data.timeline
      .map(
        (item) => `
          <div class="timeline__item" style="cursor:pointer" data-timeline-step="${item.step}">
            <div class="timeline__dot ${item.state === 'complete' ? 'is-complete' : item.state === 'active' ? 'is-active' : ''}">${item.step}</div>
            <div style="flex:1">
              <h3 class="timeline__title">${item.title}</h3>
              <p class="timeline__date">${item.date}</p>
              <div class="timeline__detail" data-step-detail="${item.step}" style="display:none;margin-top:.5rem">
                <p class="timeline__copy" style="color:var(--color-text-subtle)">${item.copy}</p>
              </div>
            </div>
          </div>
        `
      )
      .join('');

    timeline.querySelectorAll('[data-timeline-step]').forEach((item) => {
      const detail = item.querySelector('[data-step-detail]');
      if (!detail) return;
      item.addEventListener('click', () => {
        const isOpen = detail.style.display !== 'none';
        detail.style.display = isOpen ? 'none' : 'block';
        item.querySelector('.timeline__dot')?.classList.toggle('is-active', !isOpen);
      });
    });
  }
}

function initInterviews(outlet, data) {
  const slots = outlet.querySelector('[data-candidate-slots]');
  const details = outlet.querySelector('[data-candidate-panel-details]');
  const confirmArea = outlet.querySelector('[data-candidate-confirm-area]');
  const confirmBtn = outlet.querySelector('[data-candidate-confirm-slot]');
  const selectedLabel = outlet.querySelector('[data-candidate-selected-label]');
  let selectedSlot = null;

  if (slots && data.interviews?.availableSlots) {
    slots.innerHTML = data.interviews.availableSlots
      .map(
        (slot) => `
          <button class="btn btn-secondary" type="button" data-slot-id="${slot.date}-${slot.time}" data-demo-action="Select ${slot.date} ${slot.time}">${slot.label}</button>
        `
      )
      .join('');

    slots.querySelectorAll('[data-slot-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        slots.querySelectorAll('[data-slot-id]').forEach((b) => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        selectedSlot = btn.textContent.trim();
        if (selectedLabel) selectedLabel.textContent = `Selected: ${selectedSlot}`;
        if (confirmArea) confirmArea.style.display = 'flex';
      });
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!selectedSlot) return;
      confirmBtn.textContent = `Confirmed: ${selectedSlot}`;
      confirmBtn.classList.remove('btn-primary');
      confirmBtn.classList.add('btn-secondary');
      confirmBtn.disabled = true;
      if (selectedLabel) selectedLabel.textContent = 'Joining instructions will be sent shortly.';
    });
  }

  if (details && data.interviews?.panelDetails) {
    details.innerHTML = data.interviews.panelDetails
      .map(
        (detail) => `
          <div class="note-card">
            <p class="note-card__title">${detail.title}</p>
            <p class="note-card__copy">${detail.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initDocuments(outlet, data) {
  const tbody = outlet.querySelector('[data-candidate-documents]');
  if (tbody && data.documents) {
    const docData = [...data.documents];
    const renderRows = () => {
      tbody.innerHTML = docData
        .map(
          (doc, i) => {
            const isSignable = doc.action === 'Review and sign' && doc.statusTone !== 'success';
            const isUpload = doc.action === 'Upload form' && doc.statusTone !== 'success';
            const actionCell = isSignable
              ? `<button class="btn btn-primary" type="button" style="font-size:.75rem;padding:.25rem .75rem" data-doc-sign="${i}">Sign document</button>`
              : isUpload
              ? `<button class="btn btn-secondary" type="button" style="font-size:.75rem;padding:.25rem .75rem" data-doc-sign="${i}">Upload</button>`
              : `<span style="color:var(--color-text-subtle);font-size:.85rem">${doc.action}</span>`;
            return `
              <tr>
                <td>${doc.name}</td>
                <td>${doc.category}</td>
                <td><span class="status-pill status-pill--${doc.statusTone}">${doc.statusLabel}</span></td>
                <td>${actionCell}</td>
              </tr>
            `;
          }
        )
        .join('');

      tbody.querySelectorAll('[data-doc-sign]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.docSign);
          docData[idx] = { ...docData[idx], statusTone: 'success', statusLabel: 'Signed', action: 'No action' };
          renderRows();
        });
      });
    };
    renderRows();
  }
}

function initMessages(outlet, data) {
  const inbox = outlet.querySelector('[data-candidate-inbox]');
  const thread = outlet.querySelector('[data-candidate-thread]');

  const threadData = data.messages?.thread ? [...data.messages.thread] : [];

  const renderThread = () => {
    if (!thread) return;
    thread.innerHTML = threadData
      .map(
        (msg) => `
          <div class="note-card">
            <p class="note-card__title">${msg.sender} · ${msg.time}</p>
            <p class="note-card__copy">${msg.copy}</p>
          </div>
        `
      )
      .join('');
  };

  if (inbox && data.messages?.inbox) {
    inbox.innerHTML = data.messages.inbox
      .map(
        (msg, i) => `
          <div class="list-item" style="cursor:pointer" data-inbox-idx="${i}">
            <div class="list-item__content">
              <p class="list-item__title">${msg.sender}</p>
              <p class="list-item__meta">${msg.preview}</p>
            </div>
            <span class="status-pill status-pill--${msg.tone}" data-inbox-label-${i}>${msg.label}</span>
          </div>
        `
      )
      .join('');

    inbox.querySelectorAll('[data-inbox-idx]').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = Number(item.dataset.inboxIdx);
        const msg = data.messages.inbox[idx];
        const pill = item.querySelector('[data-inbox-label-' + idx + ']');
        if (pill && msg.label === 'Unread') {
          pill.textContent = 'Read';
          pill.classList.remove('status-pill--info');
          pill.classList.add('status-pill--neutral');
        }
        threadData.unshift({ sender: msg.sender, time: 'Selected', copy: msg.preview });
        if (threadData.length > 4) threadData.pop();
        renderThread();
      });
    });
  }

  renderThread();
}

function initProfile(outlet, data) {
  const phone = outlet.querySelector('[data-candidate-phone]');
  const location = outlet.querySelector('[data-candidate-location]');
  const summary = outlet.querySelector('[data-candidate-summary]');

  if (phone) phone.textContent = data.profile?.phone || '';
  if (location) location.textContent = data.profile?.location || '';

  if (summary && data.profile?.summary) {
    summary.innerHTML = data.profile.summary
      .map(
        (item) => `
          <div class="note-card">
            <p class="note-card__title">${item.title}</p>
            <p class="note-card__copy">${item.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initCandidateRoute({ outlet, route, datasets }) {
  const data = getCandidateData(datasets);

  switch (route.id) {
    case 'dashboard':
      initDashboard(outlet, data);
      break;
    case 'timeline':
      initTimeline(outlet, data);
      break;
    case 'interviews':
      initInterviews(outlet, data);
      break;
    case 'documents':
      initDocuments(outlet, data);
      break;
    case 'messages':
      initMessages(outlet, data);
      break;
    case 'profile':
      initProfile(outlet, data);
      break;
    default:
      break;
  }
}

bootstrapSurface({ onRouteInit: initCandidateRoute }).catch((error) => {
  const root = document.getElementById('d8x-shell');
  if (root) {
    root.innerHTML = `
      <div class="empty-state" style="margin:2rem">
        <h1 class="empty-state__title">Candidate surface failed to load</h1>
        <p class="empty-state__desc">${error.message}</p>
      </div>
    `;
  }
});
