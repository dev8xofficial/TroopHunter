/**
 * MOCK-DATA.JS — Burkes Group Client Portal
 * In-memory data store for all portal mock data.
 * Single source of truth — all screens read from MockData.
 * Simulates what a real API would return.
 */

const MockData = (() => {
  // ── Raw data (inlined for single-file portability) ────────

  const _transaction = {
    transaction_id: 'TXN-0000000001',
    transaction_status: 'underwriting',
    current_stage: 9,
    stage_name: 'Underwriting',
    purchase_price: 485000,
    down_payment: 97000,
    loan_amount: 388000,
    estimated_close_date: '2026-05-15',
    days_to_close: 28,
    client_name: 'Sarah Chen',
    property_address: {
      street: '4821 Willow Creek Dr',
      city: 'The Woodlands',
      state: 'TX',
      postal_code: '77380',
    },
    stages: [
      { num: 1, name: 'Offer Submitted', party: 'Client / Agent', status: 'completed' },
      { num: 2, name: 'Offer Accepted', party: 'Seller / Agent', status: 'completed' },
      { num: 3, name: 'Option Period', party: 'Client', status: 'completed' },
      { num: 4, name: 'Home Inspection', party: 'Inspector', status: 'completed' },
      { num: 5, name: 'Appraisal Ordered', party: 'Lender', status: 'completed' },
      { num: 6, name: 'Appraisal Complete', party: 'Lender', status: 'completed' },
      { num: 7, name: 'Loan Application Filed', party: 'Lender / Client', status: 'completed' },
      { num: 8, name: 'Title Search', party: 'Attorney', status: 'completed' },
      { num: 9, name: 'Underwriting', party: 'Lender', status: 'current' },
      { num: 10, name: 'Clear to Close', party: 'Lender', status: 'pending' },
      { num: 11, name: 'Closing & Funding', party: 'All Parties', status: 'pending' },
    ],
    professionals: [
      { role: 'AG', name: 'Michael Garcia', company: 'Burkes Realty Group', phone: '(713) 555-0101', email: 'mgarcia@burkes.com' },
      { role: 'LN', name: 'Jennifer Walsh', company: 'Horizon Lending Corp', phone: '(713) 555-0202', email: 'jwalsh@horizonlending.com' },
      { role: 'AT', name: 'David Norton', company: 'Norton & Associates Law', phone: '(713) 555-0303', email: 'dnorton@nortonlaw.com' },
      { role: 'CP', name: 'Patricia Lee', company: 'Lee & Partners CPA', phone: '(713) 555-0404', email: 'plee@leeandpartners.com' },
      { role: 'TC', name: 'Michelle Rodriguez', company: 'Burkes Group', phone: '(713) 555-0505', email: 'mrodriguez@burkes.com' },
    ],
    progress_pct: 72,
  };

  const _activityLog = [
    { id: 'evt-020', icon: '📋', label: 'Underwriting package sent to lender', role: 'TC', timestamp: '2026-04-17T09:15:00Z', visible_to: ['CL', 'AG', 'LN', 'AT', 'CP', 'TC'] },
    { id: 'evt-019', icon: '✍️', label: 'Purchase Agreement signed by Sarah Chen', role: 'CL', timestamp: '2026-04-16T14:22:00Z', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'evt-018', icon: '📁', label: 'Title commitment received from Norton & Associates', role: 'AT', timestamp: '2026-04-16T11:05:00Z', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'evt-017', icon: '🛡️', label: 'Auto Insurance verified — policy #AU-88821 on file', role: 'TC', timestamp: '2026-04-15T16:30:00Z', visible_to: ['CL', 'LN', 'AT', 'TC'] },
    { id: 'evt-016', icon: '💬', label: 'Message from Jennifer Walsh (Lender): document request', role: 'LN', timestamp: '2026-04-15T10:00:00Z', visible_to: ['CL', 'LN', 'TC'] },
    { id: 'evt-015', icon: '📄', label: 'W-2 (2024) uploaded by Sarah Chen', role: 'CL', timestamp: '2026-04-14T13:45:00Z', visible_to: ['CL', 'LN', 'CP', 'TC'] },
    { id: 'evt-014', icon: '📄', label: 'Bank Statement (March 2026) uploaded by Sarah Chen', role: 'CL', timestamp: '2026-04-14T13:45:00Z', visible_to: ['CL', 'LN', 'CP', 'TC'] },
    { id: 'evt-013', icon: '🏠', label: 'Appraisal report completed — value: $492,000', role: 'LN', timestamp: '2026-04-13T15:00:00Z', visible_to: ['CL', 'AG', 'LN', 'TC'] },
    { id: 'evt-012', icon: '🔍', label: 'Home inspection completed — 3 minor items flagged', role: 'AG', timestamp: '2026-04-10T10:30:00Z', visible_to: ['CL', 'AG', 'TC'] },
    { id: 'evt-011', icon: '📝', label: 'Mortgage application 65% complete', role: 'CL', timestamp: '2026-04-09T09:00:00Z', visible_to: ['CL', 'LN', 'TC'] },
    { id: 'evt-010', icon: '✅', label: 'Option period expired — transaction active', role: 'TC', timestamp: '2026-04-08T17:00:00Z', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'evt-009', icon: '🤝', label: 'Offer accepted — transaction opened', role: 'TC', timestamp: '2026-04-05T14:00:00Z', visible_to: ['CL', 'AG', 'LN', 'AT', 'CP', 'TC'] },
    { id: 'evt-008', icon: '💰', label: 'Earnest money deposit confirmed — $4,850', role: 'TC', timestamp: '2026-04-05T12:30:00Z', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'evt-007', icon: '📋', label: 'Listing agreement signed by seller', role: 'AG', timestamp: '2026-04-04T11:00:00Z', visible_to: ['AG', 'TC'] },
    { id: 'evt-006', icon: '📩', label: 'Client invitation sent to Sarah Chen', role: 'TC', timestamp: '2026-04-03T09:00:00Z', visible_to: ['TC'] },
  ];

  const _documents = [
    { id: 'doc-001', filename: 'Purchase_Agreement_Final.pdf', category: 'PURCHASE', status: 'needs-signature', uploader: 'AG', size_mb: 1.2, date: '2026-04-16', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'doc-002', filename: 'Property_Disclosure_Report.pdf', category: 'PURCHASE', status: 'approved', uploader: 'AG', size_mb: 0.8, date: '2026-04-14', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'doc-003', filename: 'Home_Inspection_Report.pdf', category: 'PURCHASE', status: 'approved', uploader: 'AG', size_mb: 3.4, date: '2026-04-10', visible_to: ['CL', 'AG', 'TC'] },
    { id: 'doc-004', filename: 'W2_2024.pdf', category: 'FINANCIAL', status: 'under-review', uploader: 'CL', size_mb: 0.5, date: '2026-04-14', visible_to: ['CL', 'LN', 'CP', 'TC'] },
    { id: 'doc-005', filename: 'Bank_Statement_March2026.pdf', category: 'FINANCIAL', status: 'under-review', uploader: 'CL', size_mb: 1.1, date: '2026-04-14', visible_to: ['CL', 'LN', 'CP', 'TC'] },
    { id: 'doc-006', filename: 'Appraisal_Report_4821Willow.pdf', category: 'FINANCIAL', status: 'approved', uploader: 'LN', size_mb: 2.7, date: '2026-04-13', visible_to: ['CL', 'AG', 'LN', 'TC'] },
    { id: 'doc-007', filename: 'Loan_Commitment_Letter.pdf', category: 'FINANCIAL', status: 'needs-signature', uploader: 'LN', size_mb: 0.4, date: '2026-04-15', visible_to: ['CL', 'LN', 'TC'] },
    { id: 'doc-008', filename: 'Title_Commitment_Draft.pdf', category: 'LEGAL', status: 'under-review', uploader: 'AT', size_mb: 1.8, date: '2026-04-16', visible_to: ['CL', 'AG', 'AT', 'TC'] },
    { id: 'doc-009', filename: 'HOA_Rules_Regulations.pdf', category: 'LEGAL', status: 'approved', uploader: 'AT', size_mb: 0.9, date: '2026-04-11', visible_to: ['CL', 'AT', 'TC'] },
    { id: 'doc-010', filename: 'Auto_Insurance_Policy.pdf', category: 'OTHER', status: 'approved', uploader: 'CL', size_mb: 0.6, date: '2026-04-15', visible_to: ['CL', 'LN', 'AT', 'TC'] },
  ];

  const _messages = [
    {
      id: 'conv-001',
      with_role: 'AG',
      with_name: 'Michael Garcia',
      with_company: 'Burkes Realty Group',
      unread: 0,
      messages: [
        { id: 'm-001', from: 'AG', text: "Hi Sarah! Welcome to the Burkes Group portal. I've uploaded the purchase agreement for your review.", timestamp: '2026-04-16T14:00:00Z' },
        { id: 'm-002', from: 'CL', text: 'Thanks Michael! I can see it in the Documents section. Should I sign it directly in the portal?', timestamp: '2026-04-16T14:15:00Z' },
        { id: 'm-003', from: 'AG', text: 'Yes, you can click "Sign Now" next to the document. It\'s quick — takes about 2 minutes.', timestamp: '2026-04-16T14:18:00Z' },
        { id: 'm-004', from: 'CL', text: "Perfect, I'll take care of that this evening!", timestamp: '2026-04-16T14:20:00Z' },
      ],
    },
    {
      id: 'conv-002',
      with_role: 'LN',
      with_name: 'Jennifer Walsh',
      with_company: 'Horizon Lending Corp',
      unread: 2,
      messages: [
        { id: 'm-010', from: 'LN', text: "Hello Sarah, I've reviewed your mortgage application so far. Looking good!", timestamp: '2026-04-15T09:30:00Z' },
        { id: 'm-011', from: 'LN', text: "Could you upload your 2023 W-2 as well? I see the 2024 one but I'll need both for the underwriting package.", timestamp: '2026-04-15T10:00:00Z' },
        { id: 'm-012', from: 'CL', text: "Of course — I'll get that uploaded today.", timestamp: '2026-04-15T10:45:00Z' },
        { id: 'm-013', from: 'LN', text: 'Also, the loan commitment letter is ready for your signature in Documents.', timestamp: '2026-04-16T11:00:00Z', unread: true },
        { id: 'm-014', from: 'LN', text: 'Once signed, we should be clear to proceed to underwriting final approval!', timestamp: '2026-04-16T11:02:00Z', unread: true },
      ],
    },
    {
      id: 'conv-003',
      with_role: 'AT',
      with_name: 'David Norton',
      with_company: 'Norton & Associates Law',
      unread: 1,
      messages: [
        { id: 'm-020', from: 'AT', text: "Hi Sarah, title search is complete. I've uploaded the title commitment draft for your review.", timestamp: '2026-04-16T11:05:00Z' },
        { id: 'm-021', from: 'AT', text: 'There are no title defects. Everything looks clean for closing.', timestamp: '2026-04-16T11:07:00Z', unread: true },
      ],
    },
  ];

  const _insurance = {
    policies: [
      {
        type: 'HOME',
        label: 'Home Insurance',
        icon: '🏠',
        required: true,
        status: 'PENDING',
        data: {
          policyholder_name: 'Sarah Chen',
          property_address: '4821 Willow Creek Dr, The Woodlands, TX 77380',
          notes: '',
          document_id: null,
        },
      },
      {
        type: 'AUTO',
        label: 'Auto Insurance',
        icon: '🚗',
        required: true,
        status: 'COMPLETED',
        data: {
          policyholder_name: 'Sarah Chen',
          vin: '1HGBH41JXMN109186',
          dob: '1985-04-12',
          policy_number: 'AU-88821',
          document_id: 'doc-010',
        },
      },
      {
        type: 'WARRANTY',
        label: 'Home Warranty',
        icon: '🛡️',
        required: false,
        status: 'NOT_STARTED',
        data: {},
      },
    ],
    compliance_summary: {
      total_required: 2,
      completed: 1,
      message: '1 of 2 required policies complete',
    },
  };

  const _mortgage = {
    application_id: 'MOR-0000000001',
    status: 'IN_PROGRESS',
    progress_pct: 65,
    lender: 'Horizon Lending Corp',
    loan_officer: 'Jennifer Walsh',
    loan_amount: 388000,
    interest_rate: 6.875,
    term_years: 30,
    sections: [
      {
        id: 'personal',
        title: 'Personal Information',
        status: 'complete',
        fields: {
          first_name: 'Sarah',
          last_name: 'Chen',
          email: 'sarah.chen@email.com',
          phone: '(832) 555-0199',
          dob: '1985-04-12',
          ssn_last4: '4821',
        },
      },
      {
        id: 'property',
        title: 'Property Details',
        status: 'complete',
        fields: {
          property_address: '4821 Willow Creek Dr, The Woodlands, TX 77380',
          purchase_price: 485000,
          down_payment: 97000,
          loan_amount: 388000,
        },
      },
      {
        id: 'employment',
        title: 'Employment History',
        status: 'in-progress',
        fields: {
          employers: [{ company: 'Meridian Tech Solutions', position: 'Senior Designer', start_date: '2019-03-01', annual_income: 98000 }],
        },
      },
      {
        id: 'documents',
        title: 'Financial Documents',
        status: 'not-started',
        fields: {},
      },
    ],
  };

  const _services = [
    { id: 'svc-001', name: 'Atlas Plumbing Co.', category: 'PLUMBING', rating: 4.8, reviews: 127, phone: '(713) 555-0192', contact: 'Mike Torres', recommended: true, zip: '77380' },
    { id: 'svc-002', name: 'ClearView Home Inspections', category: 'INSPECTION', rating: 4.9, reviews: 214, phone: '(713) 555-0193', contact: 'Donna Park', recommended: true, zip: '77380' },
    { id: 'svc-003', name: 'Bright Electric LLC', category: 'ELECTRICAL', rating: 4.6, reviews: 89, phone: '(713) 555-0194', contact: 'Ray Gutierrez', recommended: false, zip: '77380' },
    { id: 'svc-004', name: 'Cool Air HVAC Services', category: 'HVAC', rating: 4.7, reviews: 156, phone: '(713) 555-0195', contact: 'Lisa Kim', recommended: true, zip: '77380' },
    { id: 'svc-005', name: 'PaintPro Residential', category: 'PAINTING', rating: 4.5, reviews: 63, phone: '(713) 555-0196', contact: 'Carlos Reyes', recommended: false, zip: '77380' },
    { id: 'svc-006', name: 'Roots & Branches Landscaping', category: 'LANDSCAPING', rating: 4.8, reviews: 101, phone: '(713) 555-0197', contact: 'Amy Tran', recommended: true, zip: '77380' },
  ];

  const _notifications = [
    {
      id: 'notif-001',
      severity: 'ERROR',
      title: 'Action Required: 2 documents need your signature',
      body: 'Purchase Agreement and Loan Commitment Letter are awaiting your signature.',
      cta_label: 'Sign Now',
      cta_screen: 'documents',
      visible_to: ['CL'],
      read: false,
    },
    {
      id: 'notif-002',
      severity: 'WARNING',
      title: 'Home Insurance policy incomplete',
      body: 'Please upload your home insurance document to continue the closing process.',
      cta_label: 'Upload Insurance',
      cta_screen: 'insurance',
      visible_to: ['CL', 'TC'],
      read: false,
    },
    {
      id: 'notif-003',
      severity: 'WARNING',
      title: 'Mortgage application 65% complete',
      body: 'Employment section needs completion before the underwriting deadline.',
      cta_label: 'Complete Application',
      cta_screen: 'mortgage',
      visible_to: ['CL'],
      read: false,
    },
    {
      id: 'notif-004',
      severity: 'INFO',
      title: 'New message from Jennifer Walsh (Lender)',
      body: 'Loan commitment letter ready for signature.',
      cta_label: 'View Message',
      cta_screen: 'messages',
      visible_to: ['CL'],
      read: false,
    },
    {
      id: 'notif-005',
      severity: 'INFO',
      title: 'Title commitment uploaded by David Norton',
      body: 'Review the title commitment draft in Documents.',
      cta_label: 'View Document',
      cta_screen: 'documents',
      visible_to: ['CL', 'AG', 'TC'],
      read: true,
    },
  ];

  // ── Dashboard metrics computed from data ──────────────────

  function _computeMetrics() {
    const docs = _documents;
    const needsSig = docs.filter((d) => d.status === 'needs-signature').length;
    const insuranceComplete = _insurance.policies.filter((p) => p.status === 'COMPLETED').length;
    const insuranceTotal = _insurance.policies.filter((p) => p.required).length;
    const today = new Date();
    const closing = new Date(_transaction.estimated_close_date);
    const daysToClose = Math.ceil((closing - today) / (1000 * 60 * 60 * 24));

    return {
      progress_pct: _transaction.progress_pct,
      docs_pending: needsSig,
      insurance_pct: `${insuranceComplete}/${insuranceTotal}`,
      days_to_close: Math.max(0, daysToClose),
      current_stage: _transaction.stages.find((s) => s.status === 'current')?.name || 'Unknown',
    };
  }

  // ── Helpers ───────────────────────────────────────────────

  /** Format a timestamp as relative human-readable (e.g. "2h ago") */
  function relativeTime(isoString) {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  /** Format ISO date as "Apr 16, 2026" */
  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  /** Format currency */
  function currency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  }

  // ── Public API ────────────────────────────────────────────

  let _initialized = false;

  return {
    init() {
      if (_initialized) return;
      _initialized = true;
      // Future: could fetch from /data/*.json files here
    },

    get transaction() {
      return _transaction;
    },
    get activityLog() {
      return _activityLog;
    },
    get documents() {
      return _documents;
    },
    get messages() {
      return _messages;
    },
    get insurance() {
      return _insurance;
    },
    get mortgage() {
      return _mortgage;
    },
    get services() {
      return _services;
    },
    get notifications() {
      return _notifications;
    },
    get metrics() {
      return _computeMetrics();
    },

    /** Filter activity log for current session role */
    getActivityForRole(role) {
      return _activityLog.filter((e) => !e.visible_to || e.visible_to.includes(role));
    },

    /** Filter documents for current session role */
    getDocumentsForRole(role) {
      return _documents.filter((d) => !d.visible_to || d.visible_to.includes(role));
    },

    /** Get a document by ID */
    getDocument(id) {
      return _documents.find((d) => d.id === id);
    },

    /** Get conversation by professional role */
    getConversation(withRole) {
      return _messages.find((c) => c.with_role === withRole);
    },

    relativeTime,
    formatDate,
    currency,
  };
})();

window.MockData = MockData;
