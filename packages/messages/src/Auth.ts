interface Message {
  code: number;
  message: string;
}

export enum AuthMessageKey {
  // Success messages
  ACCESS_TOKEN_REFRESHED = 'ACCESS_TOKEN_REFRESHED',
  ACCESS_TOKEN_RETRIEVED = 'ACCESS_TOKEN_RETRIEVED',
  INTERNAL_ACCESS_TOKEN_RETRIEVED = 'INTERNAL_ACCESS_TOKEN_RETRIEVED',
  INTERNAL_TOKEN_UPDATED = 'INTERNAL_TOKEN_UPDATED',

  // Missing fields messages
  MISSING_ACCESS_TOKEN = 'MISSING_ACCESS_TOKEN',
  MISSING_REFRESH_TOKEN = 'MISSING_REFRESH_TOKEN',

  // Invalid fields messages
  INVALID_AUTH_EMAIL = 'INVALID_AUTH_EMAIL',
  INVALID_AUTH_PASSWORD = 'INVALID_AUTH_PASSWORD',
  INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
  INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
  INVALID_INTERNAL_ACCESS_TOKEN = 'INVALID_INTERNAL_ACCESS_TOKEN',

  // Add more messages as needed

  // Duplicate messages

  // Not found messages
  NOT_FOUND_ACCESS_TOKEN = 'NOT_FOUND_ACCESS_TOKEN',
  NOT_FOUND_REFRESH_TOKEN = 'NOT_FOUND_REFRESH_TOKEN',
  NOT_FOUND_INTERNAL_TOKEN = 'NOT_FOUND_INTERNAL_TOKEN',

  // Failure messages
  FAILED_TO_UPDATE_INTERNAL_TOKEN = 'FAILED_TO_UPDATE_INTERNAL_TOKEN',
}

const messages: Record<AuthMessageKey, Message> = {
  // Success messages
  [AuthMessageKey.ACCESS_TOKEN_REFRESHED]: {
    code: 200,
    message: 'Access token refreshed.',
  },
  [AuthMessageKey.ACCESS_TOKEN_RETRIEVED]: {
    code: 200,
    message: 'Access token retrieved successfully.',
  },
  [AuthMessageKey.INTERNAL_ACCESS_TOKEN_RETRIEVED]: {
    code: 200,
    message: 'Internal Access token retrieved successfully.',
  },
  [AuthMessageKey.INTERNAL_TOKEN_UPDATED]: {
    code: 200,
    message: 'Internal token updated successfully.',
  },

  // Missing fields messages
  [AuthMessageKey.MISSING_ACCESS_TOKEN]: {
    code: 403,
    message: 'Missing access token. Please provide valid access token to proceed.',
  },
  [AuthMessageKey.MISSING_REFRESH_TOKEN]: {
    code: 403,
    message: 'Missing refresh token. Please provide valid refresh token to proceed.',
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
  [AuthMessageKey.INVALID_ACCESS_TOKEN]: {
    code: 406,
    message: 'Invalid access token. You are not authorized to perform this action.',
  },
  [AuthMessageKey.INVALID_REFRESH_TOKEN]: {
    code: 407,
    message: 'Invalid refresh token. To gain access to the system, please proceed to initiate a new authentication by logging in.',
  },
  [AuthMessageKey.INVALID_INTERNAL_ACCESS_TOKEN]: {
    code: 406,
    message: 'Invalid internal access token. You are not authorized to perform this action.',
  },

  // Add more messages as needed

  // Duplicate messages

  // Not found messages
  [AuthMessageKey.NOT_FOUND_ACCESS_TOKEN]: {
    code: 406,
    message: 'Access token not found.',
  },
  [AuthMessageKey.NOT_FOUND_REFRESH_TOKEN]: {
    code: 407,
    message: 'Refresh token not found. Please login again to proceed.',
  },
  [AuthMessageKey.NOT_FOUND_INTERNAL_TOKEN]: {
    code: 407,
    message: 'Internal token not found.',
  },

  // Failure messages
  [AuthMessageKey.FAILED_TO_UPDATE_INTERNAL_TOKEN]: {
    code: 500,
    message: 'Failed to update internal token.',
  },
};

export const getAuthMessage = (key: AuthMessageKey): Message => {
  return messages[key];
};
