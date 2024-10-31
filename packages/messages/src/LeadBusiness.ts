interface Message {
  code: number;
  message: string;
}

export enum LeadBusinessMessageKey {
  // Success messages
  LEAD_BUSINESSES_CREATED = 'LEAD_BUSINESSES_CREATED',
  LEAD_BUSINESS_CREATED = 'LEAD_BUSINESS_CREATED',
  LEAD_BUSINESS_RETRIEVED = 'LEAD_BUSINESS_RETRIEVED',
  LEAD_BUSINESS_UPDATED = 'LEAD_BUSINESS_UPDATED',

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  LEAD_BUSINESSES_NOT_FOUND = 'LEAD_BUSINESSES_NOT_FOUND',
  LEAD_BUSINESS_NOT_FOUND = 'LEAD_BUSINESS_NOT_FOUND',

  // Failure messages
  FAILED_TO_CREATE_LEAD_BUSINESSES = 'FAILED_TO_CREATE_LEAD_BUSINESSES',
  FAILED_TO_CREATE_LEAD_BUSINESS = 'FAILED_TO_CREATE_LEAD_BUSINESS',
  FAILED_TO_RETRIEVE_LEAD_BUSINESSES = 'FAILED_TO_RETRIEVE_LEAD_BUSINESSES',
  FAILED_TO_RETRIEVE_LEAD_BUSINESS = 'FAILED_TO_RETRIEVE_LEAD_BUSINESS',
  FAILED_TO_UPDATE_LEAD_BUSINESS = 'FAILED_TO_UPDATE_LEAD_BUSINESS',
  FAILED_TO_DELETE_LEAD_BUSINESS = 'FAILED_TO_DELETE_LEAD_BUSINESS',
}

const messages: Record<LeadBusinessMessageKey, Message> = {
  // Success messages
  [LeadBusinessMessageKey.LEAD_BUSINESSES_CREATED]: {
    code: 201,
    message: 'Lead businesses created successfully.',
  },
  [LeadBusinessMessageKey.LEAD_BUSINESS_CREATED]: {
    code: 201,
    message: 'Lead business created successfully.',
  },
  [LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED]: {
    code: 200,
    message: 'Retrieved Lead Business with specified leadId and businessId.',
  },
  [LeadBusinessMessageKey.LEAD_BUSINESS_UPDATED]: {
    code: 200,
    message: 'Updated Lead Business with specified leadId and businessId.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  [LeadBusinessMessageKey.LEAD_BUSINESSES_NOT_FOUND]: {
    code: 200,
    message: 'Lead businesses not found.',
  },
  [LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND]: {
    code: 200,
    message: 'Lead business not found.',
  },

  // Failure messages
  [LeadBusinessMessageKey.FAILED_TO_CREATE_LEAD_BUSINESSES]: {
    code: 500,
    message: 'Failed to create lead businesses. An internal server error occurred.',
  },
  [LeadBusinessMessageKey.FAILED_TO_CREATE_LEAD_BUSINESS]: {
    code: 500,
    message: 'Failed to create lead business. An internal server error occurred.',
  },
  [LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES]: {
    code: 500,
    message: 'Failed to retrieve lead businesses. An internal server error occurred.',
  },
  [LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESS]: {
    code: 500,
    message: 'Failed to retrieve lead business. An internal server error occurred.',
  },
  [LeadBusinessMessageKey.FAILED_TO_UPDATE_LEAD_BUSINESS]: {
    code: 500,
    message: 'Failed to update lead business. An internal server error occurred.',
  },
  [LeadBusinessMessageKey.FAILED_TO_DELETE_LEAD_BUSINESS]: {
    code: 500,
    message: 'Failed to delete lead business. An internal server error occurred.',
  },
};

export const getLeadBusinessMessage = (key: LeadBusinessMessageKey): Message => {
  return messages[key];
};
