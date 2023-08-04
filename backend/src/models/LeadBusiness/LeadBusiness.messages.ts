export interface Message {
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
  MISSING_LEAD_BUSINESS_LEAD_ID = 'MISSING_LEAD_BUSINESS_LEAD_ID',
  MISSING_LEAD_BUSINESS_BUSINESS_ID = 'MISSING_LEAD_BUSINESS_BUSINESS_ID',

  // Invalid fields messages
  INVALID_LEAD_BUSINESS_LEAD_ID = 'INVALID_LEAD_BUSINESS_LEAD_ID',
  INVALID_LEAD_BUSINESS_BUSINESS_ID = 'INVALID_LEAD_BUSINESS_BUSINESS_ID',

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
  [LeadBusinessMessageKey.MISSING_LEAD_BUSINESS_LEAD_ID]: {
    code: 400,
    message: 'Failed to create/update Lead Business. Missing required field: Lead ID.',
  },
  [LeadBusinessMessageKey.MISSING_LEAD_BUSINESS_BUSINESS_ID]: {
    code: 400,
    message: 'Failed to create/update Lead Business. Missing required field: Business ID.',
  },

  // Invalid fields messages
  [LeadBusinessMessageKey.INVALID_LEAD_BUSINESS_LEAD_ID]: {
    code: 400,
    message: 'Invalid lead business lead ID. The lead ID provided is not in a valid format. Please provide a valid UUID for the lead ID.',
  },
  [LeadBusinessMessageKey.INVALID_LEAD_BUSINESS_BUSINESS_ID]: {
    code: 400,
    message: 'Invalid lead business business ID. The business ID provided is not in a valid format. Please provide a valid UUID for the business ID.',
  },

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
