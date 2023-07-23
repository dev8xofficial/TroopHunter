interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  ACCOUNT_CREATED: {
    code: 200,
    message: 'Account created successfully.',
  },
  LOGGED_IN: {
    code: 200,
    message: 'Logged in successfully.',
  },
  // Error messages
  INVALID_INCLUDE_PARAMETER: {
    code: 400,
    message: "Invalid include parameter. The correct include parameter should be in the format '['Leads']'.",
  },
  INVALID_EMAIL: {
    code: 400,
    message: 'Invalid email address.',
  },
  INVALID_PASSWORD: {
    code: 400,
    message: 'Invalid password. Password should be at least 8 characters long and contain letters, numbers, and special characters.',
  },
  DUPLICATE_USER: {
    code: 409,
    message: 'Email already exists. Please log in or use a different email.',
  },
  USER_NOT_FOUND: {
    code: 404,
    message: 'User not found. Please check your credentials or sign up for a new account.',
  },
  // Failure messages
  LOGIN_FAILED: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
  FAILED_TO_CREATE_USER: {
    code: 500,
    message: 'Failed to create user. Please try again later or contact support.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error.',
  },
  // Add more messages as needed
};

export const getMessage = (key: string): Message => {
  return messages[key];
};
