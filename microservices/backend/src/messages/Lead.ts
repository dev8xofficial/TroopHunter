export interface Message {
  code: number;
  message: string;
}

export enum LeadMessageKey {
  // Success messages
  LEAD_CREATED = 'LEAD_CREATED',
  LEAD_RETRIEVED = 'LEAD_RETRIEVED',
  LEADS_RETRIEVED_BY_USERID = 'LEADS_RETRIEVED_BY_USERID',
  LEAD_UPDATED = 'LEAD_UPDATED',
  LEADS_DELETED = 'LEADS_DELETED',
  LEAD_DELETED = 'LEAD_DELETED',

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  LEADS_NOT_FOUND = 'LEADS_NOT_FOUND',
  LEAD_NOT_FOUND = 'LEAD_NOT_FOUND',

  // Failure messages
  FAILED_TO_CREATE_LEAD = 'FAILED_TO_CREATE_LEAD',
  FAILED_TO_UPDATE_LEAD = 'FAILED_TO_UPDATE_LEAD',
  FAILED_TO_CREATE_LEADS = 'FAILED_TO_CREATE_LEADS',
  FAILED_TO_RETRIEVE_LEAD = 'FAILED_TO_RETRIEVE_LEAD',
  FAILED_TO_RETRIEVE_LEADS_BY_USERID = 'FAILED_TO_RETRIEVE_LEADS_BY_USERID',
  FAILED_TO_RETRIEVE_LEADS = 'FAILED_TO_RETRIEVE_LEADS',
  FAILED_TO_DELETE_LEAD = 'FAILED_TO_DELETE_LEAD',
  FAILED_TO_DELETE_LEADS = 'FAILED_TO_DELETE_LEADS',
}

const messages: Record<LeadMessageKey, Message> = {
  // Success messages
  [LeadMessageKey.LEAD_CREATED]: {
    code: 201,
    message: 'Lead created successfully.',
  },
  [LeadMessageKey.LEAD_RETRIEVED]: {
    code: 200,
    message: 'Lead retrieved successfully.',
  },
  [LeadMessageKey.LEADS_RETRIEVED_BY_USERID]: {
    code: 200,
    message: 'Leads by user id retrieved successfully.',
  },
  [LeadMessageKey.LEAD_UPDATED]: {
    code: 200,
    message: 'Lead updated successfully.',
  },
  [LeadMessageKey.LEADS_DELETED]: {
    code: 200,
    message: 'Leads deleted successfully.',
  },
  [LeadMessageKey.LEAD_DELETED]: {
    code: 200,
    message: 'Lead deleted successfully.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  [LeadMessageKey.LEADS_NOT_FOUND]: {
    code: 404,
    message: 'Leads not found.',
  },
  [LeadMessageKey.LEAD_NOT_FOUND]: {
    code: 404,
    message: 'Lead not found.',
  },

  // Failure messages
  [LeadMessageKey.FAILED_TO_CREATE_LEAD]: {
    code: 500,
    message: 'Failed to create lead. An internal server error occurred.',
  },
  [LeadMessageKey.FAILED_TO_UPDATE_LEAD]: {
    code: 500,
    message: 'Failed to update lead. An internal server error occurred.',
  },

  [LeadMessageKey.FAILED_TO_CREATE_LEADS]: {
    code: 500,
    message: 'Failed to create leads. An internal server error occurred.',
  },
  [LeadMessageKey.FAILED_TO_RETRIEVE_LEAD]: {
    code: 500,
    message: 'Failed to retrieve lead. An internal server error occurred.',
  },
  [LeadMessageKey.FAILED_TO_RETRIEVE_LEADS_BY_USERID]: {
    code: 500,
    message: 'Failed to retrieve leads by user id. An internal server error occurred.',
  },
  [LeadMessageKey.FAILED_TO_RETRIEVE_LEADS]: {
    code: 500,
    message: 'Failed to retrieve leads. An internal server error occurred.',
  },
  [LeadMessageKey.FAILED_TO_DELETE_LEAD]: {
    code: 500,
    message: 'Failed to delete lead. An internal server error occurred.',
  },
  [LeadMessageKey.FAILED_TO_DELETE_LEADS]: {
    code: 500,
    message: 'Failed to delete leads. An internal server error occurred.',
  },
};

export const getLeadMessage = (key: LeadMessageKey): Message => {
  return messages[key];
};
