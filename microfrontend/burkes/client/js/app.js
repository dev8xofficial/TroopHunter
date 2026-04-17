/* app.js — Boot sequence */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load mock transaction data inline
  window.TX = {
    "transaction_id": "TXN-0000000001",
    "transaction_status": "MORTGAGE_UNDERWRITING",
    "current_stage": 9,
    "property_address": {
      "street": "4821 Willow Creek Dr",
      "city": "The Woodlands",
      "state": "TX",
      "postal_code": "77380"
    },
    "client_name": "Sarah Chen",
    "closing_date": "2026-05-29",
    "purchase_price": 485000,
    "professionals": [
      { "role": "AG", "name": "Michael Garcia", "company": "Burkes Realty Group" },
      { "role": "LN", "name": "Jennifer Walsh", "company": "Horizon Lending Partners" },
      { "role": "AT", "name": "David Norton", "company": "Norton & Associates Law" },
      { "role": "TC", "name": "Michelle Rodriguez", "company": "Burkes Group TC" }
    ],
    "stages": [
      { "id": 1,  "name": "Initial Consultation",        "status": "completed", "date": "2026-03-15", "owner": "AG" },
      { "id": 2,  "name": "Property Search & Selection", "status": "completed", "date": "2026-03-28", "owner": "AG" },
      { "id": 3,  "name": "Offer Submitted & Accepted",  "status": "completed", "date": "2026-04-03", "owner": "AG" },
      { "id": 4,  "name": "Under Contract — Docs",       "status": "completed", "date": "2026-04-07", "owner": "AG" },
      { "id": 5,  "name": "Mortgage Application",        "status": "completed", "date": "2026-04-10", "owner": "LN" },
      { "id": 6,  "name": "Insurance Documentation",     "status": "completed", "date": "2026-04-12", "owner": "CL" },
      { "id": 7,  "name": "Attorney & Title Review",     "status": "completed", "date": "2026-04-14", "owner": "AT" },
      { "id": 8,  "name": "Home Inspection & Appraisal","status": "completed", "date": "2026-04-15", "owner": "AG" },
      { "id": 9,  "name": "Mortgage Underwriting",       "status": "current",   "date": null,         "owner": "LN" },
      { "id": 10, "name": "Final Walkthrough & Signing", "status": "pending",   "date": null,         "owner": "CL" },
      { "id": 11, "name": "Closing Day",                 "status": "pending",   "date": "2026-05-29", "owner": "AT" }
    ]
  };

  window.MOCK_ACTIVITY_LOG = [
    { event_id:"EV-50", event_type:"status_changed", actor_role:"LN", actor_name:"Jennifer Walsh", label:"Underwriting Conditions Submitted", icon:"📋", description:"3 conditions require resolution before final approval", timestamp:"2026-04-17T14:22:00Z", visibility:{ visible_to_roles:["CL","AG","LN","AT","TC"], is_public:true } },
    { event_id:"EV-49", event_type:"document_uploaded", actor_role:"AT", actor_name:"David Norton", label:"Title Commitment Uploaded", icon:"📄", description:"Title search completed — no liens found", timestamp:"2026-04-16T11:05:00Z", visibility:{ visible_to_roles:["CL","AG","LN","AT","TC"], is_public:true } },
    { event_id:"EV-48", event_type:"document_reviewed", actor_role:"LN", actor_name:"Jennifer Walsh", label:"Appraisal Report Reviewed", icon:"✅", description:"Property appraised at $492,000 — above purchase price", timestamp:"2026-04-15T16:44:00Z", visibility:{ visible_to_roles:["CL","LN","TC"], is_public:true } },
    { event_id:"EV-47", event_type:"milestone_reached", actor_role:"AG", actor_name:"Michael Garcia", label:"Home Inspection Completed", icon:"🏠", description:"Inspector found minor issues — no structural concerns", timestamp:"2026-04-15T10:30:00Z", visibility:{ visible_to_roles:["CL","AG","LN","TC"], is_public:true } },
    { event_id:"EV-46", event_type:"insurance_updated", actor_role:"CL", actor_name:"Sarah Chen", label:"Homeowners Insurance Policy Submitted", icon:"🛡️", description:"Policy with State Farm — coverage $500,000", timestamp:"2026-04-14T09:15:00Z", visibility:{ visible_to_roles:["CL","LN","AT","TC"], is_public:true } },
    { event_id:"EV-45", event_type:"document_uploaded", actor_role:"CL", actor_name:"Sarah Chen", label:"W-2 and Bank Statements Uploaded", icon:"📁", description:"3 financial documents submitted for underwriting", timestamp:"2026-04-13T14:00:00Z", visibility:{ visible_to_roles:["CL","LN","TC"], is_public:true } },
    { event_id:"EV-44", event_type:"approval_given", actor_role:"LN", actor_name:"Jennifer Walsh", label:"Pre-Approval Letter Issued", icon:"🎉", description:"$388,000 approved at 6.875% for 30 years", timestamp:"2026-04-10T11:22:00Z", visibility:{ visible_to_roles:["CL","AG","LN","AT","TC"], is_public:true } },
    { event_id:"EV-43", event_type:"mortgage_updated", actor_role:"LN", actor_name:"Jennifer Walsh", label:"Mortgage Application Received", icon:"🏦", description:"Application submitted and accepted for processing", timestamp:"2026-04-09T08:50:00Z", visibility:{ visible_to_roles:["CL","LN","TC"], is_public:true } },
    { event_id:"EV-42", event_type:"document_uploaded", actor_role:"AG", actor_name:"Michael Garcia", label:"Purchase Agreement Uploaded", icon:"📝", description:"Fully executed purchase agreement — $485,000", timestamp:"2026-04-07T13:45:00Z", visibility:{ visible_to_roles:["CL","AG","LN","AT","TC"], is_public:true } },
    { event_id:"EV-41", event_type:"transaction_created", actor_role:"TC", actor_name:"Michelle Rodriguez", label:"Transaction Portal Opened", icon:"🚀", description:"Your portal is ready — welcome, Sarah!", timestamp:"2026-04-03T10:00:00Z", visibility:{ visible_to_roles:["CL","AG","LN","AT","CP","TC"], is_public:true } },
    { event_id:"EV-40", event_type:"status_changed", actor_role:"AT", actor_name:"David Norton", label:"Title Search Initiated", icon:"⚖️", description:"Internal: Researching lien history on property", timestamp:"2026-04-14T09:00:00Z", visibility:{ visible_to_roles:["AT","TC"], is_public:false } }
  ];

  window.MOCK_DOCUMENTS = [
    { document_id:"DOC-001", filename:"Purchase_Agreement_Signed.pdf", category:"PURCHASE", status:"APPROVED", size_bytes:1245032, uploaded_by_role:"AG", uploaded_by_name:"Michael Garcia", created_at:"2026-04-07T13:45:00Z" },
    { document_id:"DOC-002", filename:"Seller_Disclosure_Statement.pdf", category:"PURCHASE", status:"APPROVED", size_bytes:892400, uploaded_by_role:"AG", uploaded_by_name:"Michael Garcia", created_at:"2026-04-07T14:10:00Z" },
    { document_id:"DOC-003", filename:"Pre_Approval_Letter_Horizon.pdf", category:"FINANCIAL", status:"APPROVED", size_bytes:445100, uploaded_by_role:"LN", uploaded_by_name:"Jennifer Walsh", created_at:"2026-04-10T11:22:00Z" },
    { document_id:"DOC-004", filename:"W2_2024_Sarah_Chen.pdf", category:"FINANCIAL", status:"APPROVED", size_bytes:320000, uploaded_by_role:"CL", uploaded_by_name:"Sarah Chen", created_at:"2026-04-13T14:00:00Z" },
    { document_id:"DOC-005", filename:"Bank_Statements_Q1_2026.pdf", category:"FINANCIAL", status:"UNDER_REVIEW", size_bytes:1800000, uploaded_by_role:"CL", uploaded_by_name:"Sarah Chen", created_at:"2026-04-13T14:05:00Z" },
    { document_id:"DOC-006", filename:"Title_Commitment_4821_Willow.pdf", category:"LEGAL", status:"UNDER_REVIEW", size_bytes:560000, uploaded_by_role:"AT", uploaded_by_name:"David Norton", created_at:"2026-04-16T11:05:00Z" },
    { document_id:"DOC-007", filename:"Closing_Disclosure_Draft.pdf", category:"LEGAL", status:"NEEDS_SIGNATURE", size_bytes:980000, uploaded_by_role:"AT", uploaded_by_name:"David Norton", created_at:"2026-04-17T09:00:00Z" },
    { document_id:"DOC-008", filename:"Homeowners_Insurance_Binder.pdf", category:"OTHER", status:"APPROVED", size_bytes:415000, uploaded_by_role:"CL", uploaded_by_name:"Sarah Chen", created_at:"2026-04-14T09:15:00Z" },
    { document_id:"DOC-009", filename:"Appraisal_Report_Final.pdf", category:"FINANCIAL", status:"APPROVED", size_bytes:3200000, uploaded_by_role:"LN", uploaded_by_name:"Jennifer Walsh", created_at:"2026-04-15T16:44:00Z" },
    { document_id:"DOC-010", filename:"Loan_Estimate_Horizon_Lending.pdf", category:"FINANCIAL", status:"NEEDS_SIGNATURE", size_bytes:720000, uploaded_by_role:"LN", uploaded_by_name:"Jennifer Walsh", created_at:"2026-04-17T14:30:00Z" }
  ];

  window.MOCK_MESSAGES = [
    { conversation_id:"CONV-001", professional_role:"AG", professional_name:"Michael Garcia", professional_company:"Burkes Realty Group", unread_count:0, last_message_preview:"The inspection went great! Inspector found minor items only.", last_message_at:"2026-04-15T10:35:00Z", messages:[
      { message_id:"MSG-001", sender_role:"AG", sender_name:"Michael Garcia", bodytext:"Hi Sarah! Confirming your inspection is scheduled for tomorrow at 10am. The inspector is Atlas Home Inspection — very thorough.", created_at:"2026-04-14T15:20:00Z", read_at:"2026-04-14T16:05:00Z" },
      { message_id:"MSG-002", sender_role:"CL", sender_name:"Sarah Chen", bodytext:"Thanks Michael! Should I be there for the full inspection?", created_at:"2026-04-14T16:10:00Z", read_at:"2026-04-14T16:25:00Z" },
      { message_id:"MSG-003", sender_role:"AG", sender_name:"Michael Garcia", bodytext:"I recommend coming for the last 30 minutes so the inspector can walk you through any findings directly.", created_at:"2026-04-14T16:30:00Z", read_at:"2026-04-14T17:00:00Z" },
      { message_id:"MSG-004", sender_role:"AG", sender_name:"Michael Garcia", bodytext:"The inspection went great! Inspector found minor items only. Nothing structural. I'll send the full report to the lender today.", created_at:"2026-04-15T10:35:00Z", read_at:null }
    ]},
    { conversation_id:"CONV-002", professional_role:"LN", professional_name:"Jennifer Walsh", professional_company:"Horizon Lending Partners", unread_count:2, last_message_preview:"We need 2 more items before final approval.", last_message_at:"2026-04-17T14:46:00Z", messages:[
      { message_id:"MSG-010", sender_role:"LN", sender_name:"Jennifer Walsh", bodytext:"Hi Sarah, I received your financial documents. Your pre-approval is confirmed at $388,000 at 6.875%.", created_at:"2026-04-10T11:30:00Z", read_at:"2026-04-10T12:00:00Z" },
      { message_id:"MSG-011", sender_role:"CL", sender_name:"Sarah Chen", bodytext:"That's wonderful news! What are the next steps?", created_at:"2026-04-10T12:15:00Z", read_at:"2026-04-10T13:00:00Z" },
      { message_id:"MSG-012", sender_role:"LN", sender_name:"Jennifer Walsh", bodytext:"We need 2 more items before final approval: a letter of explanation for the gap in employment in 2024, and your most recent pay stub (April 2026).", created_at:"2026-04-17T14:45:00Z", read_at:null },
      { message_id:"MSG-013", sender_role:"LN", sender_name:"Jennifer Walsh", bodytext:"Please upload these to the Documents section as Financial documents. We're targeting approval by April 22nd.", created_at:"2026-04-17T14:46:00Z", read_at:null }
    ]},
    { conversation_id:"CONV-003", professional_role:"AT", professional_name:"David Norton", professional_company:"Norton & Associates Law", unread_count:0, last_message_preview:"Title search completed — you're clear to proceed.", last_message_at:"2026-04-16T11:30:00Z", messages:[
      { message_id:"MSG-020", sender_role:"AT", sender_name:"David Norton", bodytext:"Good morning Sarah. I've been assigned as your closing attorney. I'll be reviewing the title commitment and preparing closing documents.", created_at:"2026-04-14T09:05:00Z", read_at:"2026-04-14T10:00:00Z" },
      { message_id:"MSG-021", sender_role:"AT", sender_name:"David Norton", bodytext:"Title search completed — you're clear to proceed. No liens or encumbrances found on the property. I've uploaded the title commitment to your Documents portal.", created_at:"2026-04-16T11:30:00Z", read_at:"2026-04-16T12:15:00Z" }
    ]}
  ];

  window.MOCK_INSURANCE = {
    "HOME": { policy_id:"INS-001", policy_type:"HOME", status:"COMPLETED", policyholder_name:"Sarah Chen", dob:"1989-07-22", property_address:"4821 Willow Creek Dr, The Woodlands, TX 77380", additional_info:"State Farm Policy #SF-2026-TX-44821. Annual premium $2,100. Effective May 29, 2026.", document_ids:["DOC-008"] },
    "AUTO": { policy_id:"INS-002", policy_type:"AUTO", status:"COMPLETED", policyholder_name:"Sarah Chen", dob:"1989-07-22", vin_number:"1HGBH41JXMN109186", additional_info:"Allstate Policy #AL-2026-44821. Full coverage.", document_ids:[] },
    "WARRANTY": { policy_id:"INS-003", policy_type:"WARRANTY", status:"NOT_STARTED", policyholder_name:"", dob:"", property_address:"4821 Willow Creek Dr, The Woodlands, TX 77380", additional_info:"", document_ids:[] }
  };

  window.MOCK_MORTGAGE = {
    application_id:"APP-001", transaction_id:"TXN-0000000001", status:"SUBMITTED", progress_percent:100,
    personal_info: { first_name:"Sarah", last_name:"Chen", email:"sarah.chen@email.com", phone:"(713) 555-0142", dob:"1989-07-22", ssn_last_four:"4821", is_complete:true },
    property_details: { property_address:"4821 Willow Creek Dr, The Woodlands, TX 77380", purchase_price:485000, down_payment:97000, loan_amount_requested:388000, property_type:"Single Family Home", is_complete:true },
    employment_history: [
      { employer_name:"TechCorp Inc.", position_title:"Senior Software Engineer", start_date:"2021-03-01", end_date:null, annual_income:148000 },
      { employer_name:"StartupCo", position_title:"Software Engineer", start_date:"2018-06-01", end_date:"2021-02-28", annual_income:95000 }
    ],
    employment_is_complete: true
  };

  window.MOCK_SERVICES = [
    { provider_id:"SVC-001", name:"Atlas Plumbing Co.", description:"Licensed master plumbers since 2003.", category:"PLUMBING", is_recommended:true, rating:4.8, review_count:127, contact_phone:"(713) 555-0192", contact_name:"Mike Torres", services_offered:["Emergency repair","Water heater install","Pipe replacement","Drain cleaning"] },
    { provider_id:"SVC-002", name:"Lone Star Roofing", description:"Residential roofing specialists, 20+ years.", category:"ROOFING", is_recommended:true, rating:4.6, review_count:89, contact_phone:"(713) 555-0244", contact_name:"Robert Castillo", services_offered:["Full replacement","Leak repair","Storm damage","Inspection"] },
    { provider_id:"SVC-003", name:"Premier Electric TX", description:"Licensed electricians for residential work.", category:"ELECTRICAL", is_recommended:false, rating:4.5, review_count:62, contact_phone:"(713) 555-0317", contact_name:"James Liu", services_offered:["Panel upgrades","New circuits","EV charger","Safety inspection"] },
    { provider_id:"SVC-004", name:"Fresh Start Painting", description:"Interior and exterior painting.", category:"PAINTING", is_recommended:true, rating:4.9, review_count:203, contact_phone:"(713) 555-0158", contact_name:"Ana Mejia", services_offered:["Interior rooms","Exterior house","Cabinet painting","Pressure washing"] },
    { provider_id:"SVC-005", name:"Woodlands HVAC Pro", description:"A/C installation and emergency service.", category:"HVAC", is_recommended:false, rating:4.4, review_count:44, contact_phone:"(713) 555-0399", contact_name:"Carlos Diaz", services_offered:["A/C installation","Furnace repair","Duct cleaning","Maintenance"] },
    { provider_id:"SVC-006", name:"Green Thumb Landscaping", description:"Professional landscaping and lawn care.", category:"LANDSCAPING", is_recommended:true, rating:4.7, review_count:156, contact_phone:"(713) 555-0422", contact_name:"Kevin Park", services_offered:["Weekly lawn care","Tree trimming","Irrigation","New landscape"] }
  ];

  // 2. Mount shell
  Shell.renderNav();

  // 3. Register routes
  Router.register('dashboard', { onActivate: () => ScreenDashboard.render() });
  Router.register('documents', { onActivate: () => ScreenDocuments.render() });
  Router.register('messages',  { onActivate: () => ScreenMessages.render() });
  Router.register('insurance', { onActivate: () => ScreenInsurance.render() });
  Router.register('mortgage',  { onActivate: () => ScreenMortgage.render() });
  Router.register('services',  { onActivate: () => ScreenServices.render() });

  // 4. Init drawers & modals
  Drawer.init();
  Modal.init();

  // 5. Navigate
  Router.init();
});