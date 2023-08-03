interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Required fields messages
  MISSING_CITY_STATE_COUNTRY: {
    code: 400,
    message: 'Please provide city, state, and country parameters.',
  },
  MISSING_PAGE_LIMIT: {
    code: 400,
    message: 'Pagination parameters (page and limit) are required.',
  },
  MISSING_LIMIT: {
    code: 400,
    message: 'Failed to update queue. Missing required field: status.',
  },

  // Error messages
  INVALID_INCLUDE_PARAMETER: {
    code: 400,
    message: "Invalid include parameter. The correct include parameter should be in the format '['Leads']'.",
  },
  INVALID_PAGE_LIMIT: {
    code: 400,
    message: 'Invalid pagination parameters. Both page and limit should be positive integers.',
  },

  // Internal Server Error
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error.',
  },
};

export const getMessage = (key: string): Message => {
  return messages[key];
};
