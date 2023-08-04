interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  LEAD_CREATED: {
    code: 201,
    message: 'Lead created successfully.',
  },
  LEAD_RETRIEVED: {
    code: 200,
    message: 'Lead retrieved successfully.',
  },
  LEAD_UPDATED: {
    code: 200,
    message: 'Lead updated successfully.',
  },
  LEADS_DELETED: {
    code: 200,
    message: 'Leads deleted successfully.',
  },
  LEAD_DELETED: {
    code: 200,
    message: 'Lead deleted successfully.',
  },

  // Missing fields messages
  MISSING_USER_ID: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: user ID.',
  },
  MISSING_LEAD_TITLE: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: title.',
  },
  MISSING_LEAD_SEARCH: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: search.',
  },
  MISSING_LEAD_BUSINESS_COUNT: {
    code: 400,
    message: 'Failed to create/update lead. Missing required field: business count.',
  },

  // Invalid fields messages
  INVALID_LEAD_ID: {
    code: 400,
    message: 'Invalid lead ID. The lead ID provided is not in a valid format. Please provide a valid UUID for the lead ID.',
  },
  INVALID_USER_ID: {
    code: 400,
    message: 'Invalid user ID. Please provide a valid UUID.',
  },
  INVALID_BUSINESS_IDS: {
    code: 400,
    message: 'Invalid business IDs. The business IDs in the array must be valid UUIDs.',
  },
  INVALID_LEAD_TITLE: {
    code: 400,
    message: 'Invalid lead title. The lead title must be a non-empty string.',
  },
  INVALID_LEAD_SEARCH: {
    code: 400,
    message: 'Invalid lead search. The search field must be a non-null string.',
  },
  INVALID_LEAD_PHONE: {
    code: 400,
    message: 'Invalid lead phone. The phone must be a string value.',
  },
  INVALID_LEAD_SPONSORED_AD: {
    code: 400,
    message: 'Invalid value for sponsoredAd. The sponsoredAd field must be a boolean (true or false).',
  },
  INVALID_LEAD_BUSINESS_COUNT: {
    code: 400,
    message: 'Invalid lead business count. The lead business count must be a valid number greater than or equal to zero.',
  },

  // Duplicate messages

  // Not found messages
  LEADS_NOT_FOUND: {
    code: 404,
    message: 'Leads not found.',
  },
  LEAD_NOT_FOUND: {
    code: 404,
    message: 'Lead not found.',
  },

  // Failure messages
  FAILED_TO_CREATE_LEAD: {
    code: 500,
    message: 'Failed to create lead. An internal server error occurred.',
  },
  FAILED_TO_CREATE_LEADS: {
    code: 500,
    message: 'Failed to create leads. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_LEAD: {
    code: 500,
    message: 'Failed to retrieve lead. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_LEADS: {
    code: 500,
    message: 'Failed to retrieve leads. An internal server error occurred.',
  },
  FAILED_TO_DELETE_LEAD: {
    code: 500,
    message: 'Failed to delete lead. An internal server error occurred.',
  },
  FAILED_TO_DELETE_LEADS: {
    code: 500,
    message: 'Failed to delete leads. An internal server error occurred.',
  },
};

export const getLeadMessage = (key: string): Message => {
  return messages[key];
};
