interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  USERS_RETRIEVED: {
    code: 200,
    message: 'Users retrieved successfully.',
  },
  USER_RETRIEVED: {
    code: 200,
    message: 'User retrieved successfully.',
  },
  USER_CREATED: {
    code: 200,
    message: 'User created successfully.',
  },
  USER_UPDATED: {
    code: 200,
    message: 'User updated successfully.',
  },
  USER_DELETED: {
    code: 204,
    message: 'User deleted successfully.',
  },
  LOGGED_IN: {
    code: 200,
    message: 'Logged in successfully.',
  },

  // Missing fields messages
  MISSING_USER_ID: {
    code: 400,
    message: 'User ID is required to create/update a lead.',
  },
  MISSING_FIRST_NAME: {
    code: 400,
    message: 'Failed to create/update user. Missing required field: firstName.',
  },
  MISSING_LAST_NAME: {
    code: 400,
    message: 'Failed to create/update user. Missing required field: lastName.',
  },
  MISSING_EMAIL: {
    code: 400,
    message: 'Failed to create/update user. Missing required field: email.',
  },
  MISSING_PASSWORD: {
    code: 400,
    message: 'Failed to create/update user. Missing required field: password.',
  },

  // Invalid fields messages
  INVALID_USER_ID: {
    code: 400,
    message: 'Invalid user ID. Please provide a valid UUID.',
  },
  INVALID_FIRST_NAME: {
    code: 400,
    message: 'Invalid first name. The first name must be a non-empty string.',
  },
  INVALID_LAST_NAME: {
    code: 400,
    message: 'Invalid last name. The last name must be a non-empty string.',
  },
  INVALID_EMAIL: {
    code: 400,
    message: 'Invalid email address.',
  },
  INVALID_PASSWORD: {
    code: 400,
    message: 'Invalid password. Password should be at least 8 characters long and contain letters, numbers, and special characters.',
  },
  INVALID_ROLE: {
    code: 400,
    message: 'Invalid role. The role must be one of the following: guest, user, admin.',
  },

  // Duplicate messages
  DUPLICATE_USER: {
    code: 409,
    message: 'Email already exists. Please log in or use a different email.',
  },

  // Not found messages
  USER_NOT_FOUND: {
    code: 404,
    message: 'User not found. Please check your credentials or sign up for a new account.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_USERS: {
    code: 500,
    message: 'Failed to retrieve users. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_USER: {
    code: 500,
    message: 'Failed to retrieve user. An internal server error occurred.',
  },
  FAILED_TO_CREATE_USER: {
    code: 500,
    message: 'Failed to create user. Please try again later or contact support.',
  },
  FAILED_TO_UPDATE_USER: {
    code: 500,
    message: 'Failed to update user. An internal server error occurred.',
  },
  FAILED_TO_DELETE_USER: {
    code: 500,
    message: 'Failed to delete user. An internal server error occurred.',
  },
  LOGIN_FAILED: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
};

export const getUserMessage = (key: string): Message => {
  return messages[key];
};
