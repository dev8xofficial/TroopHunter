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
          <div class="timeline__item">
            <div class="timeline__dot ${item.state === 'complete' ? 'is-complete' : item.state === 'active' ? 'is-active' : ''}">${item.step}</div>
            <h3 class="timeline__title">${item.title}</h3>
            <p class="timeline__copy">${item.copy}</p>
            <p class="timeline__date">${item.date}</p>
          </div>
        `
      )
      .join('');
  }
}

function initInterviews(outlet, data) {
  const slots = outlet.querySelector('[data-candidate-slots]');
  const details = outlet.querySelector('[data-candidate-panel-details]');

  if (slots && data.interviews?.availableSlots) {
    slots.innerHTML = data.interviews.availableSlots
      .map(
        (slot) => `
          <button class="btn btn-secondary" type="button" data-demo-action="Select ${slot.date} ${slot.time}">${slot.label}</button>
        `
      )
      .join('');
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
    tbody.innerHTML = data.documents
      .map(
        (doc) => `
          <tr>
            <td>${doc.name}</td>
            <td>${doc.category}</td>
            <td><span class="status-pill status-pill--${doc.statusTone}">${doc.statusLabel}</span></td>
            <td>${doc.action}</td>
          </tr>
        `
      )
      .join('');
  }
}

function initMessages(outlet, data) {
  const inbox = outlet.querySelector('[data-candidate-inbox]');
  const thread = outlet.querySelector('[data-candidate-thread]');

  if (inbox && data.messages?.inbox) {
    inbox.innerHTML = data.messages.inbox
      .map(
        (msg) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${msg.sender}</p>
              <p class="list-item__meta">${msg.preview}</p>
            </div>
            <span class="status-pill status-pill--${msg.tone}">${msg.label}</span>
          </div>
        `
      )
      .join('');
  }

  if (thread && data.messages?.thread) {
    thread.innerHTML = data.messages.thread
      .map(
        (msg) => `
          <div class="note-card">
            <p class="note-card__title">${msg.sender} · ${msg.time}</p>
            <p class="note-card__copy">${msg.copy}</p>
          </div>
        `
      )
      .join('');
  }
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
    root.innerHTML = \`
      <div class="empty-state" style="margin:2rem">
        <h1 class="empty-state__title">Candidate surface failed to load</h1>
        <p class="empty-state__desc">\${error.message}</p>
      </div>
    \`;
  }
});
