interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  TIMEZONES_RETRIEVED: {
    code: 200,
    message: 'Timezones retrieved successfully.',
  },
  TIMEZONE_RETRIEVED: {
    code: 200,
    message: 'Timezone retrieved successfully.',
  },
  TIMEZONE_CREATED: {
    code: 200,
    message: 'Timezone created successfully.',
  },
  TIMEZONE_UPDATED: {
    code: 200,
    message: 'Timezone updated successfully.',
  },
  TIMEZONE_DELETED: {
    code: 204,
    message: 'Timezone deleted successfully.',
  },

  // Missing fields messages
  MISSING_TIMEZONE_ID: {
    code: 400,
    message: 'Timezone ID is required to create a timezone.',
  },
  MISSING_TIMEZONE_NAME: {
    code: 400,
    message: 'Timezone name is required.',
  },
  MISSING_UTC_OFFSET: {
    code: 400,
    message: 'UTC offset is required.',
  },
  MISSING_DST: {
    code: 400,
    message: 'Missing required field: DST.',
  },
  MISSING_DST_OFFSET: {
    code: 400,
    message: 'Missing required field: DST offset.',
  },
  MISSING_COUNTRY_CODE: {
    code: 400,
    message: 'Missing required field: country code.',
  },

  // Invalid fields messages
  INVALID_TIMEZONE_ID: {
    code: 400,
    message: 'Invalid timezone ID. The timezone ID provided is not in a valid format. Please provide a valid string for the timezone ID.',
  },
  INVALID_TIMEZONE_NAME: {
    code: 400,
    message: 'Invalid timezone name. The timezone name must be a non-empty string.',
  },
  INVALID_UTC_OFFSET: {
    code: 400,
    message: 'Invalid UTC offset. The UTC offset must be a non-empty string.',
  },
  INVALID_DST: {
    code: 400,
    message: 'Invalid DST value. The DST field must be a boolean (true or false).',
  },
  INVALID_DST_OFFSET: {
    code: 400,
    message: 'Invalid DST offset. The DST offset must be a string.',
  },
  INVALID_COUNTRY_CODE: {
    code: 400,
    message: 'Invalid country code. The country code must be a string.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
  FAILED_TO_RETRIEVE_TIMEZONES: {
    code: 500,
    message: 'Failed to retrieve timezones. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_TIMEZONE: {
    code: 500,
    message: 'Failed to retrieve timezone. An internal server error occurred.',
  },
  FAILED_TO_CREATE_TIMEZONE: {
    code: 500,
    message: 'Failed to create timezone. Please try again later or contact support.',
  },
  FAILED_TO_UPDATE_TIMEZONE: {
    code: 500,
    message: 'Failed to update timezone. An internal server error occurred.',
  },
  FAILED_TO_DELETE_TIMEZONE: {
    code: 500,
    message: 'Failed to delete timezone. An internal server error occurred.',
  },
  LOGIN_FAILED: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
};

export const getTimezoneMessage = (key: string): Message => {
  return messages[key];
};
