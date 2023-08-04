export interface Message {
  code: number;
  message: string;
}

export enum AuthMessageKey {
  // Missing fields messages
  MISSING_AUTH_EMAIL = 'MISSING_AUTH_EMAIL',
  MISSING_AUTH_PASSWORD = 'MISSING_AUTH_PASSWORD',

  // Invalid fields messages
  INVALID_AUTH_EMAIL = 'INVALID_AUTH_EMAIL',
  INVALID_AUTH_PASSWORD = 'INVALID_AUTH_PASSWORD',

  // Add more messages as needed

  // Duplicate messages

  // Not found messages

  // Failure messages
}

const messages: Record<AuthMessageKey, Message> = {
  // Missing fields messages
  [AuthMessageKey.MISSING_AUTH_EMAIL]: {
    code: 400,
    message: 'Missing authentication email. Please provide a valid email address.',
  },
  [AuthMessageKey.MISSING_AUTH_PASSWORD]: {
    code: 400,
    message: 'Missing authentication password. Please provide a valid password.',
  },

  // Invalid fields messages
  [AuthMessageKey.INVALID_AUTH_EMAIL]: {
    code: 400,
    message: 'Invalid authentication email. Please provide a valid email address.',
  },
  [AuthMessageKey.INVALID_AUTH_PASSWORD]: {
    code: 400,
    message: 'Invalid authentication password. Please provide a valid password.',
  },

  // Add more messages as needed

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getAuthMessage = (key: AuthMessageKey): Message => {
  return messages[key];
};
