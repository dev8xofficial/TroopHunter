export interface Message {
  code: number;
  message: string;
}

export enum LeadMessageKey {
  // Success messages
  LEAD_CREATED = 'LEAD_CREATED',
  LEAD_RETRIEVED = 'LEAD_RETRIEVED',
  LEAD_UPDATED = 'LEAD_UPDATED',
  LEADS_DELETED = 'LEADS_DELETED',
  LEAD_DELETED = 'LEAD_DELETED',

  // Missing fields messages
  MISSING_USER_ID = 'MISSING_USER_ID',
  MISSING_LEAD_TITLE = 'MISSING_LEAD_TITLE',
  MISSING_LEAD_SEARCH = 'MISSING_LEAD_SEARCH',
  MISSING_LEAD_BUSINESS_COUNT = 'MISSING_LEAD_BUSINESS_COUNT',

  // Invalid fields messages
  INVALID_LEAD_ID = 'INVALID_LEAD_ID',
  INVALID_USER_ID = 'INVALID_USER_ID',
  INVALID_BUSINESS_IDS = 'INVALID_BUSINESS_IDS',
  INVALID_LEAD_TITLE = 'INVALID_LEAD_TITLE',
  INVALID_LEAD_SEARCH = 'INVALID_LEAD_SEARCH',
  INVALID_LEAD_PHONE = 'INVALID_LEAD_PHONE',
  INVALID_LEAD_SPONSORED_AD = 'INVALID_LEAD_SPONSORED_AD',
  INVALID_LEAD_BUSINESS_COUNT = 'INVALID_LEAD_BUSINESS_COUNT',

  // Duplicate messages

  // Not found messages
  LEADS_NOT_FOUND = 'LEADS_NOT_FOUND',
  LEAD_NOT_FOUND = 'LEAD_NOT_FOUND',

  // Failure messages
  FAILED_TO_CREATE_LEAD = 'FAILED_TO_CREATE_LEAD',
  FAILED_TO_UPDATE_LEAD = 'FAILED_TO_UPDATE_LEAD',
  FAILED_TO_CREATE_LEADS = 'FAILED_TO_CREATE_LEADS',
  FAILED_TO_RETRIEVE_LEAD = 'FAILED_TO_RETRIEVE_LEAD',
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
  [LeadMessageKey.MISSING_USER_ID]: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: user ID.',
  },
  [LeadMessageKey.MISSING_LEAD_TITLE]: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: title.',
  },
  [LeadMessageKey.MISSING_LEAD_SEARCH]: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: search.',
  },
  [LeadMessageKey.MISSING_LEAD_BUSINESS_COUNT]: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: business count.',
  },

  // Invalid fields messages
  [LeadMessageKey.INVALID_LEAD_ID]: {
    code: 400,
    message: 'Invalid lead ID. The lead ID provided is not in a valid format. Please provide a valid UUID for the lead ID.',
  },
  [LeadMessageKey.INVALID_USER_ID]: {
    code: 400,
    message: 'Invalid user ID. Please provide a valid UUID.',
  },
  [LeadMessageKey.INVALID_BUSINESS_IDS]: {
    code: 400,
    message: 'Invalid business IDs. The business IDs in the array must be valid UUIDs.',
  },
  [LeadMessageKey.INVALID_LEAD_TITLE]: {
    code: 400,
    message: 'Invalid lead title. The lead title must be a non-empty string.',
  },
  [LeadMessageKey.INVALID_LEAD_SEARCH]: {
    code: 400,
    message: 'Invalid lead search. The search field must be a non-null string.',
  },
  [LeadMessageKey.INVALID_LEAD_PHONE]: {
    code: 400,
    message: 'Invalid lead phone. The phone must be a string value.',
  },
  [LeadMessageKey.INVALID_LEAD_SPONSORED_AD]: {
    code: 400,
    message: 'Invalid value for sponsoredAd. The sponsoredAd field must be a boolean (true or false).',
  },
  [LeadMessageKey.INVALID_LEAD_BUSINESS_COUNT]: {
    code: 400,
    message: 'Invalid lead business count. The lead business count must be a valid number greater than or equal to zero.',
  },

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
