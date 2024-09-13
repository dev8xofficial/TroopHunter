interface Message {
  code: number;
  message: string;
}

export enum UserMessageKey {
  // Success messages
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  RESET_PASSWORD_TOKEN_VERIFIED = 'RESET_PASSWORD_TOKEN_VERIFIED',
  USERS_RETRIEVED = 'USERS_RETRIEVED',
  USER_RETRIEVED = 'USER_RETRIEVED',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  LOGGED_IN = 'LOGGED_IN',
  SIGN_OUT = 'SIGN_OUT',
  PASSWORD_UPDATED = 'PASSWORD_UPDATED',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',

  // Missing fields messages

  // Invalid fields messages
  EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  INVALID_EMAIL_VERIFICATION_TOKEN = 'INVALID_EMAIL_VERIFICATION_TOKEN',
  EXPIRED_EMAIL_VERIFICATION_TOKEN = 'EXPIRED_EMAIL_VERIFICATION_TOKEN',
  INVALID_RESET_PASSWORD_VERIFICATION_TOKEN = 'INVALID_RESET_PASSWORD_VERIFICATION_TOKEN',
  EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN = 'EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN',

  // Duplicate messages
  DUPLICATE_USER = 'DUPLICATE_USER',

  // Not found messages
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_NOT_FOUND_BY_ID = 'USER_NOT_FOUND_BY_ID',

  // Failure messages
  EMAIL_VERIFICATION_TOKEN_FAILED = 'EMAIL_VERIFICATION_TOKEN_FAILED',
  FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN = 'FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN',
  FAILED_TO_VERIFY_RESET_PASSWORD_TOKEN = 'FAILED_TO_VERIFY_RESET_PASSWORD_TOKEN',
  FAILED_TO_RETRIEVE_USERS = 'FAILED_TO_RETRIEVE_USERS',
  FAILED_TO_RETRIEVE_USER = 'FAILED_TO_RETRIEVE_USER',
  FAILED_TO_CREATE_USER = 'FAILED_TO_CREATE_USER',
  FAILED_TO_UPDATE_USER = 'FAILED_TO_UPDATE_USER',
  FAILED_TO_DELETE_USER = 'FAILED_TO_DELETE_USER',
  FAILED_TO_UPDATE_PASSWORD = 'FAILED_TO_UPDATE_PASSWORD',
  LOGIN_FAILED = 'LOGIN_FAILED',
  SIGN_OUT_FAILED = 'SIGN_OUT_FAILED',
  FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN = 'FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN',
  FAILED_TO_RESET_PASSWORD_TOKEN = 'FAILED_TO_RESET_PASSWORD_TOKEN',
}

const messages: Record<UserMessageKey, Message> = {
  // Success messages
  [UserMessageKey.VERIFY_EMAIL]: {
    code: 200,
    message: 'Verification email sent successfully. Please check your inbox.',
  },
  [UserMessageKey.EMAIL_VERIFIED]: {
    code: 200,
    message: 'Email verified successfully.',
  },
  [UserMessageKey.RESET_PASSWORD_TOKEN_VERIFIED]: {
    code: 200,
    message: 'Reset password token verified successfully.',
  },
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
  [UserMessageKey.SIGN_OUT]: {
    code: 200,
    message: 'Sign out successfully.',
  },
  [UserMessageKey.PASSWORD_UPDATED]: {
    code: 200,
    message: 'Password updated successfully.',
  },
  [UserMessageKey.FORGOT_PASSWORD]: {
    code: 200,
    message: 'Please check your inbox to proceed.',
  },
  [UserMessageKey.RESET_PASSWORD_SUCCESS]: {
    code: 200,
    message: 'Password reset successfully.',
  },

  // Missing fields messages
  [UserMessageKey.DUPLICATE_USER]: {
    code: 409,
    message: 'Email already exists. Please log in or use a different email.',
  },

  // Invalid fields messages
  [UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN]: {
    code: 409,
    message: 'Invalid email verification token.',
  },
  [UserMessageKey.EXPIRED_EMAIL_VERIFICATION_TOKEN]: {
    code: 409,
    message: 'Email verification token is expired.',
  },
  [UserMessageKey.INVALID_RESET_PASSWORD_VERIFICATION_TOKEN]: {
    code: 409,
    message: 'Invalid reset password token.',
  },
  [UserMessageKey.EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN]: {
    code: 409,
    message: 'Reset password token is expired!',
  },
  [UserMessageKey.EMAIL_UNVERIFIED]: {
    code: 409,
    message: 'Email unverified. Please verify your email to proceed.',
  },

  // Duplicate messages
  [UserMessageKey.PASSWORD_MISMATCH]: {
    code: 409,
    message: 'User password mismatch. Please provide valid user password.',
  },

  // Not found messages
  [UserMessageKey.USER_NOT_FOUND]: {
    code: 404,
    message: 'User not found. Please check your credentials or sign up for a new account.',
  },
  [UserMessageKey.USER_NOT_FOUND_BY_ID]: {
    code: 404,
    message: 'User not found.',
  },

  // Failure messages
  [UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED]: {
    code: 500,
    message: 'Failed to verify email. An internal server error occurred.',
  },
  [UserMessageKey.FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN]: {
    code: 500,
    message: 'Failed to send email verification token. An internal server error occurred.',
  },
  [UserMessageKey.FAILED_TO_VERIFY_RESET_PASSWORD_TOKEN]: {
    code: 500,
    message: 'Failed to verify reset password token. An internal server error occurred.',
  },
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
  [UserMessageKey.FAILED_TO_UPDATE_PASSWORD]: {
    code: 500,
    message: 'Failed to update password. An internal server error occurred.',
  },
  [UserMessageKey.LOGIN_FAILED]: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
  [UserMessageKey.SIGN_OUT_FAILED]: {
    code: 500,
    message: 'Failed to sign out. Please try again later or contact support.',
  },
  [UserMessageKey.FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN]: {
    code: 500,
    message: 'Failed to send reset password verification. An internal server error occurred.',
  },
  [UserMessageKey.FAILED_TO_RESET_PASSWORD_TOKEN]: {
    code: 500,
    message: 'Failed to reset password. An internal server error occurred.',
  },
};

export const getUserMessage = (key: UserMessageKey): Message => {
  return messages[key];
};
