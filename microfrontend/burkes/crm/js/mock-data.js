/**
 * Burkes Group CRM — Mock Data Layer
 * Source: schemas/*.schema.json, .specify/memory/constitution.md
 * Batch: 1 of 7 — Foundation (Phase 0)
 * Status: COMPLETE
 */

window.MockData = (() => {

  /* ── Users ────────────────────────────────────────── */
  const users = [
    { id: 'USR-OW-001', role: 'OW', full_name: 'Jaquarian Bonilla', initials: 'JB',
      email: 'jbonilla@burkesgroup.com', departments: ['insurance'], active: true, avatar_color: '#1a3a52' },
    { id: 'USR-OW-002', role: 'OW', full_name: 'Tom Burke', initials: 'TB',
      email: 'tburke@burkesgroup.com', departments: ['real_estate'], active: true, avatar_color: '#0f5e35' },
    { id: 'USR-IA-001', role: 'IA', full_name: 'Alisha Reeves', initials: 'AR',
      email: 'areeves@burkesgroup.com', departments: ['insurance'], active: true, avatar_color: '#7c3aed' },
    { id: 'USR-IA-002', role: 'IA', full_name: 'Marcus Webb', initials: 'MW',
      email: 'mwebb@burkesgroup.com', departments: ['insurance'], active: true, avatar_color: '#b45309' },
    { id: 'USR-ML-001', role: 'ML', full_name: 'Sandra Pham', initials: 'SP',
      email: 'spham@burkesgroup.com', departments: ['mortgage'], active: true, avatar_color: '#1d4ed8' },
    { id: 'USR-RA-001', role: 'RA', full_name: 'Derek Okafor', initials: 'DO',
      email: 'dokafor@burkesgroup.com', departments: ['real_estate'], active: true, avatar_color: '#065f46' },
    { id: 'USR-RA-002', role: 'RA', full_name: 'Lisa Chen', initials: 'LC',
      email: 'lchen@burkesgroup.com', departments: ['real_estate'], active: true, avatar_color: '#be123c' },
    { id: 'USR-PA-001', role: 'PA', full_name: 'Platform Admin', initials: 'PA',
      email: 'admin@burkesgroup.com', departments: ['insurance','mortgage','real_estate'], active: true, avatar_color: '#374151' }
  ];

  /* ── Contacts (50) ────────────────────────────────── */
  const firstNames = ['James','Maria','Robert','Jennifer','Michael','Linda','William','Barbara','David','Elizabeth','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Charles','Karen','Christopher','Lisa','Daniel','Nancy','Matthew','Betty','Anthony','Margaret','Mark','Sandra','Donald','Ashley','Steven','Dorothy','Paul','Kimberly','Andrew','Emily','Kenneth','Donna','Joshua','Michelle','Kevin','Carol','Brian','Amanda','George','Melissa','Timothy','Deborah','Ronald','Stephanie'];
  const lastNames = ['Williams','Johnson','Smith','Jones','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee','Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Gonzalez','Nelson','Carter'];
  const stages = ['New Inquiry','Contacted','Quoted / Offer','Under Contract','Pending Close','Closed'];
  const sources = ['portal','manual','import','referral','partner'];
  const depts = ['insurance','mortgage','real_estate'];

  function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString(); }
  function phone() { return `(${randInt(200,999)}) ${randInt(200,999)}-${randInt(1000,9999)}`; }

  const contacts = Array.from({ length: 50 }, (_, i) => {
    const idx = i + 1;
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const contactDepts = i % 5 === 0
      ? [depts[0], depts[1]]
      : i % 7 === 0
        ? [depts[0], depts[2]]
        : [randItem(depts)];

    const stageMap = {};
    contactDepts.forEach(d => { stageMap[d] = randItem(stages); });

    const agentMap = {};
    contactDepts.forEach(d => {
      agentMap[d] = d === 'insurance' ? randItem(['USR-IA-001','USR-IA-002'])
        : d === 'mortgage' ? 'USR-ML-001'
        : randItem(['USR-RA-001','USR-RA-002']);
    });

    return {
      id: `CNT-${String(idx).padStart(5,'0')}`,
      first_name: fn, last_name: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@email.com`,
      phone: phone(),
      source: randItem(sources),
      portal_origin: Math.random() < 0.3,
      departments: contactDepts,
      assigned_agents: agentMap,
      pipeline_stage: stageMap,
      missing_data: Math.random() < 0.25,
      consent: {
        consented_at: daysAgo(randInt(5,180)),
        consent_document_id: `DOC-${String(randInt(1000,9999))}`,
        source: randItem(['portal','manual','import'])
      },
      created_at: daysAgo(randInt(2,365)),
      created_by: randItem(['USR-OW-001','USR-IA-001','USR-PA-001']),
      date_of_birth: null,
      address: `${randInt(100,9999)} ${randItem(['Main St','Oak Ave','Elm Dr','Park Blvd','Cedar Ln'])}`,
      city: randItem(['Houston','Dallas','Austin','San Antonio','Fort Worth']),
      state: 'TX',
      postal_code: `${randInt(70000,79999)}`,
      vehicles: Math.random() < 0.4 ? [{ vin: `1HG${randInt(100000,999999)}`, make: randItem(['Toyota','Honda','Ford','Chevrolet']), model: randItem(['Camry','Civic','F-150','Silverado']), year: randInt(2015,2023) }] : [],
      family_members: Math.random() < 0.3 ? [{ name: `${randItem(firstNames)} ${ln}`, relationship: randItem(['Spouse','Child','Parent']), date_of_birth: null }] : []
    };
  });

  /* ── Leads (30) ───────────────────────────────────── */
  const leads = Array.from({ length: 30 }, (_, i) => {
    const c = contacts[i % contacts.length];
    const dept = randItem(c.departments);
    return {
      id: `LED-${String(i+1).padStart(5,'0')}`,
      contact_id: c.id,
      contact_name: `${c.first_name} ${c.last_name}`,
      department: dept,
      stage: randItem(stages),
      priority: randItem(['hot','warm','cool']),
      assigned_agent_id: c.assigned_agents[dept] || 'USR-PA-001',
      source: c.source,
      last_activity_at: daysAgo(randInt(0,30)),
      notes_summary: randItem([
        'Requested quote for home insurance.',
        'Follow-up scheduled for next week.',
        'Mortgage pre-approval in progress.',
        'Property showing scheduled.',
        'Needs additional documentation.',
        'Ready to proceed to next stage.',
        null
      ]),
      created_at: daysAgo(randInt(5,120))
    };
  });

  /* ── Activities (80) ──────────────────────────────── */
  const activityTypes = ['call_outbound','call_inbound','sms_sent','sms_received','email_sent','email_received','lead_transferred','stage_changed','note_added','portal_intake'];
  const activityLabels = {
    call_outbound: 'Outbound call',
    call_inbound: 'Inbound call',
    sms_sent: 'SMS sent',
    sms_received: 'SMS received',
    email_sent: 'Email sent',
    email_received: 'Email received',
    lead_transferred: 'Lead transferred',
    stage_changed: 'Stage updated',
    note_added: 'Note added',
    portal_intake: 'Portal intake'
  };
  const activityIcons = {
    call_outbound: '📞', call_inbound: '📲',
    sms_sent: '💬', sms_received: '💬',
    email_sent: '✉️', email_received: '📧',
    lead_transferred: '🔄', stage_changed: '📊',
    note_added: '📝', portal_intake: '🌐'
  };
  const activityClasses = {
    call_outbound: 'call', call_inbound: 'call',
    sms_sent: 'sms', sms_received: 'sms',
    email_sent: 'email', email_received: 'email',
    lead_transferred: 'transfer', stage_changed: 'stage',
    note_added: 'note', portal_intake: 'intake'
  };

  const activities = Array.from({ length: 80 }, (_, i) => {
    const c = contacts[i % contacts.length];
    const type = randItem(activityTypes);
    const dept = randItem(c.departments);
    const actor = randItem(users.filter(u => u.departments.includes(dept) || u.role === 'PA'));
    return {
      id: `ACT-${String(i+1).padStart(6,'0')}`,
      type,
      label: activityLabels[type],
      icon: activityIcons[type],
      iconClass: activityClasses[type],
      contact_id: c.id,
      contact_name: `${c.first_name} ${c.last_name}`,
      department: dept,
      actor_id: actor.id,
      actor_name: actor.full_name,
      occurred_at: daysAgo(randInt(0,60)),
      recorded: type.startsWith('call') && Math.random() < 0.8,
      notes: randItem(['Follow-up completed.','Documentation requested.','Customer confirmed appointment.','Policy quote shared.','Ready for next stage.', null])
    };
  });

  /* ── Call Recordings (20) ─────────────────────────── */
  const recordings = Array.from({ length: 20 }, (_, i) => {
    const dept = randItem(depts);
    const months = dept === 'insurance' ? 18 : dept === 'mortgage' ? 24 : 48;
    const recAt = daysAgo(randInt(1, 30));
    const exp = new Date(recAt);
    exp.setMonth(exp.getMonth() + months);
    return {
      id: `REC-${String(i+1).padStart(6,'0')}`,
      call_id: `CALL-${randInt(10000,99999)}`,
      department: dept,
      provider_id: `prov_${randInt(100000,999999)}`,
      recorded_at: recAt,
      expires_at: exp.toISOString(),
      status: randItem(['available','available','available','failed','expired']),
      access_scope: dept === 'insurance' ? 'department' : 'platform_admin',
      duration_seconds: randInt(60, 1800),
      contact_name: `${randItem(firstNames)} ${randItem(lastNames)}`
    };
  });

  /* ── Calendar Events (15) ─────────────────────────── */
  const calendarEvents = Array.from({ length: 15 }, (_, i) => {
    const daysOffset = randInt(-3, 14);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + daysOffset);
    startDate.setHours(randInt(8, 17), randItem([0, 30]), 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + randInt(1, 2));
    const c = contacts[i % contacts.length];
    return {
      id: `EVT-${String(i+1).padStart(4,'0')}`,
      provider: randItem(['outlook','google_calendar']),
      title: randItem(['Property showing','Client consultation','Policy review','Mortgage consultation','Closing walkthrough','Follow-up call','Team meeting','Quote presentation']),
      status: randItem(['scheduled','scheduled','scheduled','tentative','completed']),
      starts_at: startDate.toISOString(),
      ends_at: endDate.toISOString(),
      contact_id: Math.random() < 0.7 ? c.id : null,
      contact_name: Math.random() < 0.7 ? `${c.first_name} ${c.last_name}` : null,
      sync_state: randItem(['healthy','healthy','healthy','stale'])
    };
  });

  /* ── Integration Connectors ───────────────────────── */
  const connectors = [
    { id: 'conn-outlook', provider: 'Microsoft Outlook', status: 'healthy', priority: 'priority_1',
      owner: 'Platform Admin', last_synced_at: daysAgo(0.001), affected_features: ['email','calendar','notifications'],
      actions: ['test','retry'], icon: '📧' },
    { id: 'conn-voip', provider: 'VOIP Provider', status: 'healthy', priority: 'priority_1',
      owner: 'Platform Admin', last_synced_at: daysAgo(0.002), affected_features: ['calls','sms'],
      actions: ['test'], icon: '📞' },
    { id: 'conn-arive', provider: 'Arive', status: 'degraded', priority: 'priority_1',
      owner: 'Sandra Pham', last_synced_at: daysAgo(0.5), affected_features: ['mortgage'],
      actions: ['test','retry','reconnect'], icon: '🏠' },
    { id: 'conn-har', provider: 'HAR (Houston MLS)', status: 'healthy', priority: 'priority_2',
      owner: 'Tom Burke', last_synced_at: daysAgo(0.1), affected_features: ['real_estate'],
      actions: ['test'], icon: '🏘️' },
    { id: 'conn-agency-zoom', provider: 'Agency Zoom', status: 'pending', priority: 'priority_2',
      owner: 'Jaquarian Bonilla', last_synced_at: null, affected_features: ['insurance'],
      actions: ['test','reconnect'], icon: '📋' },
    { id: 'conn-dotloop', provider: 'DotLoop', status: 'planned', priority: 'priority_2',
      owner: null, last_synced_at: null, affected_features: ['real_estate'],
      actions: [], icon: '📄' },
    { id: 'conn-gcal', provider: 'Google Calendar', status: 'healthy', priority: 'priority_2',
      owner: 'Platform Admin', last_synced_at: daysAgo(0.01), affected_features: ['calendar'],
      actions: ['test'], icon: '📅' }
  ];

  /* ── Insurance Records (15) ───────────────────────── */
  const insuranceStatuses = ['quoted','bound','issued','prospect'];
  const carriers = ['State Farm','Allstate','Progressive','GEICO','Farmers'];
  const lines = ['Auto','Home','Commercial','Life','Umbrella'];

  const insuranceRecords = contacts.filter(c => c.departments.includes('insurance')).slice(0, 15).map((c, i) => ({
    id: `INS-${String(i+1).padStart(4,'0')}`,
    contact_id: c.id, contact_name: `${c.first_name} ${c.last_name}`,
    line_of_business: randItem(lines),
    status: randItem(insuranceStatuses),
    carrier: randItem(carriers),
    premium: randInt(800, 4500),
    renewal_at: daysAgo(randInt(-90, 180)),
    missing_fields: Math.random() < 0.4 ? randItem([['date_of_birth'],['vehicle_vin','address'],['family_members']]) : [],
    sync_state: { provider: 'agency_zoom', source_id: `AZ-${randInt(10000,99999)}`, last_synced_at: daysAgo(randInt(0,30)), status: randItem(['healthy','stale']) }
  }));

  /* ── Mortgage Records (12) ────────────────────────── */
  const mortgageStatuses = ['inquiry','pre_approval','processing','clear_to_close','funded','declined'];
  const lenders = ['Wells Fargo','Chase','Bank of America','US Bank','Quicken Loans'];

  const mortgageRecords = contacts.filter(c => c.departments.includes('mortgage')).slice(0, 12).map((c, i) => ({
    id: `MRT-${String(i+1).padStart(4,'0')}`,
    contact_id: c.id, contact_name: `${c.first_name} ${c.last_name}`,
    status: randItem(mortgageStatuses),
    arive_loan_id: `ARV-${randInt(100000,999999)}`,
    loan_type: randItem(['Conventional','FHA','VA','USDA']),
    pre_approval_amount: randInt(150000, 750000),
    lender_name: randItem(lenders),
    missing_items: Math.random() < 0.5 ? randItem([['Pay stubs (last 2)'],['Bank statements','W-2 forms'],['Tax returns (2 years)']]) : [],
    clear_to_close_at: Math.random() < 0.2 ? daysAgo(randInt(1,10)) : null,
    sync_state: { provider: 'arive', source_id: `ARV-${randInt(10000,99999)}`, last_synced_at: daysAgo(randInt(0,3)), status: randItem(['healthy','healthy','stale']), error_code: null }
  }));

  /* ── Real Estate Records (10) ─────────────────────── */
  const txnStatuses = ['lead','under_contract','pending_close','closed','cancelled'];
  const propertyAddresses = ['1247 Magnolia Dr, Houston TX 77001','3891 Cypress Creek Rd, Sugar Land TX 77478','720 Westheimer Rd #1104, Houston TX 77007','5500 Memorial Dr, Houston TX 77007','1628 Heights Blvd, Houston TX 77008'];

  const realEstateRecords = contacts.filter(c => c.departments.includes('real_estate')).slice(0, 10).map((c, i) => ({
    id: `TXN-${String(i+1).padStart(4,'0')}`,
    contact_id: c.id, contact_name: `${c.first_name} ${c.last_name}`,
    transaction_type: randItem(['purchase','sale','refinance']),
    status: randItem(txnStatuses),
    property_address: randItem(propertyAddresses),
    dotloop_id: Math.random() < 0.6 ? `DL-${randInt(100000,999999)}` : null,
    closing_date: daysAgo(randInt(-30, 30)),
    commission_amount: randInt(6000, 25000),
    agent_id: randItem(['USR-RA-001','USR-RA-002']),
    external_link_state: {
      provider: 'dotloop',
      status: randItem(['linked','pending','missing']),
      last_checked_at: daysAgo(randInt(0, 5))
    },
    milestones: [
      { name: 'Contract signed', completed: true, due_at: daysAgo(15) },
      { name: 'Inspection', completed: Math.random() < 0.7, due_at: daysAgo(10) },
      { name: 'Appraisal', completed: Math.random() < 0.5, due_at: daysAgo(5) },
      { name: 'Clear to close', completed: Math.random() < 0.3, due_at: daysAgo(-3) }
    ]
  }));

  /* ── Campaigns (5) ────────────────────────────────── */
  const campaigns = [
    { id: 'CMP-001', department: 'insurance', status: 'sent', subject: 'Policy Renewal Reminder — Q2 2026', audience_count: 87, excluded_count: 4, created_by: 'USR-OW-001', scheduled_at: daysAgo(3), metrics: { sent: 83, delivered: 81, opened: 41, clicked: 12 } },
    { id: 'CMP-002', department: 'mortgage', status: 'draft', subject: 'Refinancing Rates at Historic Lows', audience_count: 34, excluded_count: 2, created_by: 'USR-ML-001', scheduled_at: null, metrics: {} },
    { id: 'CMP-003', department: 'real_estate', status: 'scheduled', subject: 'Spring Listings — Houston Heights', audience_count: 156, excluded_count: 9, created_by: 'USR-OW-002', scheduled_at: daysAgo(-2), metrics: {} },
    { id: 'CMP-004', department: 'insurance', status: 'failed', subject: 'Umbrella Policy Awareness', audience_count: 45, excluded_count: 3, created_by: 'USR-OW-001', scheduled_at: daysAgo(7), metrics: { sent: 0, delivered: 0 } },
    { id: 'CMP-005', department: 'platform', status: 'sent', subject: 'Welcome to Burkes Group Services', audience_count: 200, excluded_count: 5, created_by: 'USR-PA-001', scheduled_at: daysAgo(14), metrics: { sent: 195, delivered: 192, opened: 88, clicked: 31 } }
  ];

  /* ── Video Meetings (8) ───────────────────────────── */
  const meetings = Array.from({ length: 8 }, (_, i) => {
    const daysOffset = randInt(-5, 7);
    const starts = new Date(); starts.setDate(starts.getDate() + daysOffset); starts.setHours(randInt(9,16),0,0,0);
    const ends = new Date(starts); ends.setHours(ends.getHours() + 1);
    const c = contacts[i % contacts.length];
    const recorded = Math.random() < 0.5;
    const retExp = new Date(starts); retExp.setDate(retExp.getDate() + 90);
    return {
      id: `MTG-${String(i+1).padStart(4,'0')}`,
      provider: randItem(['teams','google_meet']),
      status: daysOffset < 0 ? 'completed' : daysOffset === 0 ? 'launched' : 'scheduled',
      starts_at: starts.toISOString(), ends_at: ends.toISOString(),
      contact_id: c.id, contact_name: `${c.first_name} ${c.last_name}`,
      calendar_event_id: `EVT-${String(randInt(1,15)).padStart(4,'0')}`,
      recording_url: recorded ? `https://recordings.example.com/mtg-${i}` : null,
      retention_expires_at: recorded ? retExp.toISOString() : null,
      title: randItem(['Buyer consultation','Policy review call','Loan application review','Property walk-through','Follow-up meeting'])
    };
  });

  /* ── Reports Mock ─────────────────────────────────── */
  const reportData = {
    kpis: {
      total_revenue_mtd: 284750,
      leads_created_mtd: 47,
      leads_closed_mtd: 12,
      conversion_rate: 0.255,
      avg_cycle_days: 38,
      calls_made: 124,
      emails_sent: 287,
      sms_sent: 203
    },
    by_department: [
      { dept: 'insurance', label: 'Insurance', color: '#fdb913', leads: 23, closed: 7, revenue: 89500, conversion: 0.304 },
      { dept: 'mortgage', label: 'Mortgage', color: '#3b82f6', leads: 14, closed: 3, revenue: 141000, conversion: 0.214 },
      { dept: 'real_estate', label: 'Real Estate', color: '#10b981', leads: 10, closed: 2, revenue: 54250, conversion: 0.200 }
    ],
    funnel: stages.map((s, i) => ({ stage: s, count: [47, 35, 28, 19, 14, 12][i] }))
  };

  /* ── Admin Settings Mock ──────────────────────────── */
  const adminSettings = {
    users: users.map(u => ({
      user_id: u.id, role: u.role, status: 'active',
      department_scope: u.departments, full_name: u.full_name, email: u.email
    })),
    retention_policies: [
      { data_type: 'Call Recordings', department: 'insurance', retention_window: '18 months' },
      { data_type: 'Call Recordings', department: 'mortgage', retention_window: '24 months' },
      { data_type: 'Call Recordings', department: 'real_estate', retention_window: '4 years' },
      { data_type: 'Policy Documents', department: 'insurance', retention_window: '3 years' },
      { data_type: 'Loan Documents', department: 'mortgage', retention_window: '2 years' },
      { data_type: 'Transaction Documents', department: 'real_estate', retention_window: '4 years' },
      { data_type: 'Video Recordings', department: 'platform', retention_window: '90 days' },
      { data_type: 'Customer Records', department: 'platform', retention_window: 'Indefinite' }
    ],
    entitlements: [
      { code: 'crm_calls', state: 'enabled', label: 'VOIP Calling' },
      { code: 'crm_sms', state: 'enabled', label: 'SMS Messaging' },
      { code: 'crm_email', state: 'enabled', label: 'Email Integration' },
      { code: 'crm_email_blast', state: 'enabled', label: 'Email Campaigns' },
      { code: 'crm_video', state: 'enabled', label: 'Video Meetings' },
      { code: 'crm_insurance', state: 'enabled', label: 'Insurance Workspace' },
      { code: 'crm_mortgage', state: 'enabled', label: 'Mortgage Workspace' },
      { code: 'crm_real_estate', state: 'enabled', label: 'Real Estate Workspace' },
      { code: 'crm_reports', state: 'limited', label: 'Reports & Analytics' },
      { code: 'crm_ai_assist', state: 'future_gated', label: 'AI Assist (Beta)' },
      { code: 'white_label', state: 'future_gated', label: 'White-Labeling' },
      { code: 'multi_tenant', state: 'future_gated', label: 'Multi-Tenant SaaS' }
    ]
  };

  /* ── SMS Threads (12) ─────────────────────────────── */
  const smsThreads = contacts.slice(0, 12).map((c, i) => ({
    id: `THR-${String(i+1).padStart(4,'0')}`,
    contact_id: c.id, contact_name: `${c.first_name} ${c.last_name}`,
    phone: c.phone, department: randItem(c.departments),
    unread_count: randInt(0, 4), opt_out: Math.random() < 0.1,
    last_message_at: daysAgo(randInt(0, 14)),
    last_message: randItem([
      'Sounds good, talk soon!','Can we reschedule for Thursday?',
      'I have a few more questions.','Thank you for the information!',
      'Yes, please send the documents.','What time works for you?'
    ]),
    messages: Array.from({ length: randInt(3,8) }, (_, j) => ({
      id: `MSG-${i}-${j}`, direction: j % 2 === 0 ? 'inbound' : 'outbound',
      body: randItem(['Hi, following up on your inquiry.','Thank you for reaching out!','I will check and get back to you.','Great, see you then!','Could you send more details?','Absolutely, will do!']),
      status: 'delivered', created_at: daysAgo(randInt(0,14))
    }))
  }));

  /* ── Email Inbox (15) ─────────────────────────────── */
  const emailInbox = contacts.slice(0, 15).map((c, i) => ({
    id: `EML-${String(i+1).padStart(4,'0')}`,
    provider_id: `MSG_${randInt(100000,999999)}`,
    contact_id: c.id, contact_name: `${c.first_name} ${c.last_name}`,
    department: randItem(c.departments),
    direction: randItem(['inbound','outbound']),
    subject: randItem(['Re: Policy Quote Request','Question about my mortgage application','Interested in listing my home','Follow-up: Property showing','Document submission','Schedule consultation']),
    sent_at: daysAgo(randInt(0, 14)),
    has_attachments: Math.random() < 0.35,
    status: randItem(['received','sent','sent','sent']),
    preview: 'Thank you for reaching out. I wanted to follow up on our previous conversation...'
  }));

  /* ── Dashboard Summary ────────────────────────────── */
  const dashboardSummary = {
    kpi: {
      active_leads: leads.length,
      calls_today: randInt(8, 22),
      sms_sent_today: randInt(12, 35),
      emails_today: randInt(15, 40),
      policies_quoted: randInt(3, 9),
      transactions_active: realEstateRecords.filter(r => r.status !== 'closed').length,
      mortgages_in_process: mortgageRecords.filter(r => !['funded','declined'].includes(r.status)).length,
      revenue_mtd: 284750
    },
    pipeline_funnel: stages.map((s, i) => ({ stage: s, count: [47, 35, 28, 19, 14, 12][i] })),
    integrations_status: connectors.slice(0, 4).map(c => ({ name: c.provider, status: c.status, icon: c.icon })),
    tasks_today: [
      { id: 't1', title: 'Call back Maria Johnson — insurance quote', due: '10:00 AM', priority: 'high', done: false },
      { id: 't2', title: 'Send policy documents to Marcus Webb', due: '11:30 AM', priority: 'medium', done: true },
      { id: 't3', title: 'Review Arive sync errors — 3 records', due: '2:00 PM', priority: 'high', done: false },
      { id: 't4', title: 'Schedule closing walkthrough — 720 Westheimer', due: '3:00 PM', priority: 'medium', done: false },
      { id: 't5', title: 'Follow up: pre-approval documents', due: '4:30 PM', priority: 'low', done: false }
    ]
  };

  /* ── Helpers ──────────────────────────────────────── */
  function getUserById(id) { return users.find(u => u.id === id); }
  function getContactById(id) { return contacts.find(c => c.id === id); }
  function getLeadsByDept(dept) { return leads.filter(l => l.department === dept); }
  function getLeadsByStage(stage) { return leads.filter(l => l.stage === stage); }
  function getActivitiesForContact(contactId) { return activities.filter(a => a.contact_id === contactId); }
  function getRecentActivities(n = 10) { return [...activities].sort((a,b) => new Date(b.occurred_at) - new Date(a.occurred_at)).slice(0,n); }
  function getUpcomingEvents() {
    const now = new Date();
    return [...calendarEvents].filter(e => new Date(e.starts_at) >= now).sort((a,b) => new Date(a.starts_at) - new Date(b.starts_at));
  }
  function formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function formatDateTime(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }
  function formatRelative(iso) {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return formatDate(iso);
  }
  function formatCurrency(n) {
    if (!n && n !== 0) return '—';
    return '$' + n.toLocaleString('en-US');
  }
  function departmentLabel(d) {
    return { insurance: 'Insurance', mortgage: 'Mortgage', real_estate: 'Real Estate' }[d] || d;
  }
  function roleName(r) {
    return { OW:'Dept. Owner', IA:'Insurance Agent', ML:'Mortgage Liaison', RA:'Real Estate Agent', PA:'Platform Admin' }[r] || r;
  }
  function stageBadgeClass(s) {
    return {
      'New Inquiry': 'badge-gray',
      'Contacted': 'badge-blue',
      'Quoted / Offer': 'badge-gold',
      'Under Contract': 'badge-navy',
      'Pending Close': 'badge-green',
      'Closed': 'badge-green'
    }[s] || 'badge-gray';
  }
  function statusBadgeClass(s) {
    const map = { healthy:'badge-green', degraded:'badge-red', disconnected:'badge-red', pending:'badge-gold', planned:'badge-gray', active:'badge-green', invited:'badge-blue', suspended:'badge-red', available:'badge-green', failed:'badge-red', expired:'badge-gray', enabled:'badge-green', limited:'badge-gold', future_gated:'badge-gray', disabled:'badge-red', sent:'badge-green', draft:'badge-gray', scheduled:'badge-blue', sending:'badge-gold', failed:'badge-red', cancelled:'badge-gray' };
    return map[s] || 'badge-gray';
  }

  return {
    users, contacts, leads, activities, recordings, calendarEvents,
    connectors, insuranceRecords, mortgageRecords, realEstateRecords,
    campaigns, meetings, smsThreads, emailInbox, dashboardSummary, adminSettings, reportData,
    helpers: { getUserById, getContactById, getLeadsByDept, getLeadsByStage,
      getActivitiesForContact, getRecentActivities, getUpcomingEvents,
      formatDate, formatDateTime, formatRelative, formatCurrency,
      departmentLabel, roleName, stageBadgeClass, statusBadgeClass }
  };

})();