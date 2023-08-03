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
    message: 'User ID is required to create a lead.',
  },
  MISSING_LEAD_TITLE: {
    code: 400,
    message: 'Lead title is required.',
  },
  MISSING_LEAD_SEARCH: {
    code: 400,
    message: 'Lead search is required.',
  },
  MISSING_LEAD_BUSINESS_COUNT: {
    code: 400,
    message: 'Lead business count is required.',
  },

  // Invalid fields messages
  INVALID_USER_ID: {
    code: 400,
    message: 'Invalid user ID. Please provide a valid UUID.',
  },
  INVALID_SEARCH: {
    code: 400,
    message: 'Invalid search. Search must be a string not null.',
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
