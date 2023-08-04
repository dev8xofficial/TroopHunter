interface Message {
  code: number;
  message: string;
}

export enum TimezoneMessageKey {
  // Success messages
  TIMEZONES_RETRIEVED = 'TIMEZONES_RETRIEVED',
  TIMEZONE_RETRIEVED = 'TIMEZONE_RETRIEVED',
  TIMEZONE_CREATED = 'TIMEZONE_CREATED',
  TIMEZONE_UPDATED = 'TIMEZONE_UPDATED',
  TIMEZONE_DELETED = 'TIMEZONE_DELETED',

  // Missing fields messages
  MISSING_TIMEZONE_ID = 'MISSING_TIMEZONE_ID',
  MISSING_TIMEZONE_NAME = 'MISSING_TIMEZONE_NAME',
  MISSING_UTC_OFFSET = 'MISSING_UTC_OFFSET',
  MISSING_DST = 'MISSING_DST',
  MISSING_DST_OFFSET = 'MISSING_DST_OFFSET',
  MISSING_COUNTRY_CODE = 'MISSING_COUNTRY_CODE',

  // Invalid fields messages
  INVALID_TIMEZONE_ID = 'INVALID_TIMEZONE_ID',
  INVALID_TIMEZONE_NAME = 'INVALID_TIMEZONE_NAME',
  INVALID_UTC_OFFSET = 'INVALID_UTC_OFFSET',
  INVALID_DST = 'INVALID_DST',
  INVALID_DST_OFFSET = 'INVALID_DST_OFFSET',
  INVALID_COUNTRY_CODE = 'INVALID_COUNTRY_CODE',

  // Duplicate messages

  // Not found messages

  // Failure messages
  FAILED_TO_RETRIEVE_TIMEZONES = 'FAILED_TO_RETRIEVE_TIMEZONES',
  FAILED_TO_RETRIEVE_TIMEZONE = 'FAILED_TO_RETRIEVE_TIMEZONE',
  FAILED_TO_CREATE_TIMEZONE = 'FAILED_TO_CREATE_TIMEZONE',
  FAILED_TO_UPDATE_TIMEZONE = 'FAILED_TO_UPDATE_TIMEZONE',
  FAILED_TO_DELETE_TIMEZONE = 'FAILED_TO_DELETE_TIMEZONE',
  LOGIN_FAILED = 'LOGIN_FAILED',
}

const messages: Record<TimezoneMessageKey, Message> = {
  // Success messages
  [TimezoneMessageKey.TIMEZONES_RETRIEVED]: {
    code: 200,
    message: 'Timezones retrieved successfully.',
  },
  [TimezoneMessageKey.TIMEZONE_RETRIEVED]: {
    code: 200,
    message: 'Timezone retrieved successfully.',
  },
  [TimezoneMessageKey.TIMEZONE_CREATED]: {
    code: 200,
    message: 'Timezone created successfully.',
  },
  [TimezoneMessageKey.TIMEZONE_UPDATED]: {
    code: 200,
    message: 'Timezone updated successfully.',
  },
  [TimezoneMessageKey.TIMEZONE_DELETED]: {
    code: 204,
    message: 'Timezone deleted successfully.',
  },

  // Missing fields messages
  [TimezoneMessageKey.MISSING_TIMEZONE_ID]: {
    code: 400,
    message: 'Timezone ID is required to create a timezone.',
  },
  [TimezoneMessageKey.MISSING_TIMEZONE_NAME]: {
    code: 400,
    message: 'Timezone name is required.',
  },
  [TimezoneMessageKey.MISSING_UTC_OFFSET]: {
    code: 400,
    message: 'UTC offset is required.',
  },
  [TimezoneMessageKey.MISSING_DST]: {
    code: 400,
    message: 'Missing required field: DST.',
  },
  [TimezoneMessageKey.MISSING_DST_OFFSET]: {
    code: 400,
    message: 'Missing required field: DST offset.',
  },
  [TimezoneMessageKey.MISSING_COUNTRY_CODE]: {
    code: 400,
    message: 'Missing required field: country code.',
  },

  // Invalid fields messages
  [TimezoneMessageKey.INVALID_TIMEZONE_ID]: {
    code: 400,
    message: 'Invalid timezone ID. The timezone ID provided is not in a valid format. Please provide a valid string for the timezone ID.',
  },
  [TimezoneMessageKey.INVALID_TIMEZONE_NAME]: {
    code: 400,
    message: 'Invalid timezone name. The timezone name must be a non-empty string.',
  },
  [TimezoneMessageKey.INVALID_UTC_OFFSET]: {
    code: 400,
    message: 'Invalid UTC offset. The UTC offset must be a non-empty string.',
  },
  [TimezoneMessageKey.INVALID_DST]: {
    code: 400,
    message: 'Invalid DST value. The DST field must be a boolean (true or false).',
  },
  [TimezoneMessageKey.INVALID_DST_OFFSET]: {
    code: 400,
    message: 'Invalid DST offset. The DST offset must be a string.',
  },
  [TimezoneMessageKey.INVALID_COUNTRY_CODE]: {
    code: 400,
    message: 'Invalid country code. The country code must be a string.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
  [TimezoneMessageKey.FAILED_TO_RETRIEVE_TIMEZONES]: {
    code: 500,
    message: 'Failed to retrieve timezones. An internal server error occurred.',
  },
  [TimezoneMessageKey.FAILED_TO_RETRIEVE_TIMEZONE]: {
    code: 500,
    message: 'Failed to retrieve timezone. An internal server error occurred.',
  },
  [TimezoneMessageKey.FAILED_TO_CREATE_TIMEZONE]: {
    code: 500,
    message: 'Failed to create timezone. Please try again later or contact support.',
  },
  [TimezoneMessageKey.FAILED_TO_UPDATE_TIMEZONE]: {
    code: 500,
    message: 'Failed to update timezone. An internal server error occurred.',
  },
  [TimezoneMessageKey.FAILED_TO_DELETE_TIMEZONE]: {
    code: 500,
    message: 'Failed to delete timezone. An internal server error occurred.',
  },
  [TimezoneMessageKey.LOGIN_FAILED]: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
};

export const getTimezoneMessage = (key: TimezoneMessageKey): Message => {
  return messages[key];
};
