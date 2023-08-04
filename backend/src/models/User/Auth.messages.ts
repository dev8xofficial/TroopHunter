interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages

  // Missing fields messages
  MISSING_AUTH_EMAIL: {
    code: 400,
    message: 'Missing authentication email. Please provide a valid email address.',
  },
  MISSING_AUTH_PASSWORD: {
    code: 400,
    message: 'Missing authentication password. Please provide a valid password.',
  },

  // Invalid fields messages
  INVALID_AUTH_EMAIL: {
    code: 400,
    message: 'Invalid authentication email. Please provide a valid email address.',
  },
  INVALID_AUTH_PASSWORD: {
    code: 400,
    message: 'Invalid authentication password. Please provide a valid password.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getAuthMessage = (key: string): Message => {
  return messages[key];
};
