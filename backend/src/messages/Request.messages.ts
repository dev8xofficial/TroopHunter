interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages

  // Missing fields messages
  MISSING_REQUEST_PAGE: {
    code: 400,
    message: 'Invalid request. The page number is missing or invalid.',
  },
  MISSING_REQUEST_LIMIT: {
    code: 400,
    message: 'Invalid request. The limit parameter is missing or invalid.',
  },

  // Invalid fields messages
  INVALID_REQUEST_PAGE: {
    code: 400,
    message: 'Invalid request. The page number must be a positive integer.',
  },
  INVALID_REQUEST_LIMIT: {
    code: 400,
    message: 'Invalid request. The limit parameter must be a positive integer.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getRequestMessage = (key: string): Message => {
  return messages[key];
};
