interface Message {
  code: number;
  message: string;
}

export enum UserMessageKey {
  // Success messages
  USERS_RETRIEVED = 'USERS_RETRIEVED',
  USER_RETRIEVED = 'USER_RETRIEVED',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  LOGGED_IN = 'LOGGED_IN',

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages
  DUPLICATE_USER = 'DUPLICATE_USER',

  // Not found messages
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_USERS = 'FAILED_TO_RETRIEVE_USERS',
  FAILED_TO_RETRIEVE_USER = 'FAILED_TO_RETRIEVE_USER',
  FAILED_TO_CREATE_USER = 'FAILED_TO_CREATE_USER',
  FAILED_TO_UPDATE_USER = 'FAILED_TO_UPDATE_USER',
  FAILED_TO_DELETE_USER = 'FAILED_TO_DELETE_USER',
  LOGIN_FAILED = 'LOGIN_FAILED',
}

const messages: Record<UserMessageKey, Message> = {
  // Success messages
  [UserMessageKey.USERS_RETRIEVED]: {
    code: 200,
    message: 'Users retrieved successfully.',
  },
  [UserMessageKey.USER_RETRIEVED]: {
    code: 200,
    message: 'User retrieved successfully.',
  },
  [UserMessageKey.USER_CREATED]: {
    code: 200,
    message: 'User created successfully.',
  },
  [UserMessageKey.USER_UPDATED]: {
    code: 200,
    message: 'User updated successfully.',
  },
  [UserMessageKey.USER_DELETED]: {
    code: 204,
    message: 'User deleted successfully.',
  },
  [UserMessageKey.LOGGED_IN]: {
    code: 200,
    message: 'Logged in successfully.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages
  [UserMessageKey.DUPLICATE_USER]: {
    code: 409,
    message: 'Email already exists. Please log in or use a different email.',
  },

  // Not found messages
  [UserMessageKey.USER_NOT_FOUND]: {
    code: 404,
    message: 'User not found. Please check your credentials or sign up for a new account.',
  },

  // Failure messages
  [UserMessageKey.FAILED_TO_RETRIEVE_USERS]: {
    code: 500,
    message: 'Failed to retrieve users. An internal server error occurred.',
  },
  [UserMessageKey.FAILED_TO_RETRIEVE_USER]: {
    code: 500,
    message: 'Failed to retrieve user. An internal server error occurred.',
  },
  [UserMessageKey.FAILED_TO_CREATE_USER]: {
    code: 500,
    message: 'Failed to create user. Please try again later or contact support.',
  },
  [UserMessageKey.FAILED_TO_UPDATE_USER]: {
    code: 500,
    message: 'Failed to update user. An internal server error occurred.',
  },
  [UserMessageKey.FAILED_TO_DELETE_USER]: {
    code: 500,
    message: 'Failed to delete user. An internal server error occurred.',
  },
  [UserMessageKey.LOGIN_FAILED]: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
};

export const getUserMessage = (key: UserMessageKey): Message => {
  return messages[key];
};
