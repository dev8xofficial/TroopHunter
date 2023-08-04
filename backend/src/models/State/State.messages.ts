interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  STATES_RETRIEVED: {
    code: 200,
    message: 'States retrieved successfully.',
  },
  STATE_RETRIEVED: {
    code: 200,
    message: 'State retrieved successfully.',
  },
  STATE_CREATED: {
    code: 201,
    message: 'State created successfully.',
  },
  STATE_UPDATED: {
    code: 200,
    message: 'State updated successfully.',
  },
  STATE_DELETED: {
    code: 204,
    message: 'State deleted successfully.',
  },

  // Missing fields messages
  MISSING_STATE: {
    code: 400,
    message: 'Please provide state parameter.',
  },
  MISSING_STATE_NAME: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: state name.',
  },
  MISSING_STATE_CODE: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: code.',
  },
  MISSING_STATE_COUNTRY_CODE: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: countryCode.',
  },
  MISSING_STATE_LONGITUDE: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: longitude.',
  },
  MISSING_STATE_LATITUDE: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: latitude.',
  },

  // Invalid fields messages
  INVALID_STATE_ID: {
    code: 400,
    message: 'Invalid state ID. The state ID provided is not in a valid format.',
  },
  INVALID_STATE_NAME: {
    code: 400,
    message: 'Invalid state name. The state name must be a non-empty string.',
  },
  INVALID_STATE_CODE: {
    code: 400,
    message: 'Invalid state code. The state code must be a non-empty string.',
  },
  INVALID_STATE_LONGITUDE: {
    code: 400,
    message: 'Invalid state longitude. The longitude must be a valid number.',
  },
  INVALID_STATE_LATITUDE: {
    code: 400,
    message: 'Invalid state latitude. The latitude must be a valid number.',
  },

  // Duplicate messages

  // Not found messages
  STATE_NOT_FOUND: {
    code: 404,
    message: 'State not found.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_STATES: {
    code: 500,
    message: 'Failed to retrieve states. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_STATE: {
    code: 500,
    message: 'Failed to retrieve state. An internal server error occurred.',
  },
  FAILED_TO_CREATE_STATE: {
    code: 500,
    message: 'Failed to create state. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_STATE: {
    code: 500,
    message: 'Failed to update state. An internal server error occurred.',
  },
  FAILED_TO_DELETE_STATE: {
    code: 500,
    message: 'Failed to delete state. An internal server error occurred.',
  },
};

export const getStateMessage = (key: string): Message => {
  return messages[key];
};
