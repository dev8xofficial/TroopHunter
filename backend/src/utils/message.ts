interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  QUEUES_RETRIEVED: {
    code: 200,
    message: 'Queues retrieved successfully.',
  },
  QUEUE_UPDATED: {
    code: 200,
    message: 'Queue updated successfully.',
  },

  // Required fields messages
  MISSING_CITY_STATE_COUNTRY: {
    code: 400,
    message: 'Please provide city, state, and country parameters.',
  },
  MISSING_LAPTOP_NAME: {
    code: 400,
    message: 'Failed to update queue. Missing required field: laptopName.',
  },
  MISSING_STATUS: {
    code: 400,
    message: 'Failed to update queue. Missing required field: status.',
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
  QUEUE_NOT_FOUND: {
    code: 404,
    message: 'Queue not found.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_QUEUES: {
    code: 500,
    message: 'Failed to retrieve queues. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_QUEUE: {
    code: 500,
    message: 'Failed to update queue. An internal server error occurred.',
  },

  // Internal Server Error
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error.',
  },
  // Add more messages as needed
};

export const getMessage = (key: string): Message => {
  return messages[key];
};
