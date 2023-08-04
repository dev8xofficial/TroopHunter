export interface Message {
  code: number;
  message: string;
}

export enum StateMessageKey {
  // Success messages
  STATES_RETRIEVED = 'STATES_RETRIEVED',
  STATE_RETRIEVED = 'STATE_RETRIEVED',
  STATE_CREATED = 'STATE_CREATED',
  STATE_UPDATED = 'STATE_UPDATED',
  STATE_DELETED = 'STATE_DELETED',

  // Missing fields messages
  MISSING_STATE = 'MISSING_STATE',
  MISSING_STATE_NAME = 'MISSING_STATE_NAME',
  MISSING_STATE_CODE = 'MISSING_STATE_CODE',
  MISSING_STATE_COUNTRY_CODE = 'MISSING_STATE_COUNTRY_CODE',
  MISSING_STATE_LONGITUDE = 'MISSING_STATE_LONGITUDE',
  MISSING_STATE_LATITUDE = 'MISSING_STATE_LATITUDE',

  // Invalid fields messages
  INVALID_STATE_ID = 'INVALID_STATE_ID',
  INVALID_STATE_NAME = 'INVALID_STATE_NAME',
  INVALID_STATE_CODE = 'INVALID_STATE_CODE',
  INVALID_STATE_COUNTRY_CODE = 'INVALID_STATE_COUNTRY_CODE',
  INVALID_STATE_LONGITUDE = 'INVALID_STATE_LONGITUDE',
  INVALID_STATE_LATITUDE = 'INVALID_STATE_LATITUDE',

  // Duplicate messages

  // Not found messages
  STATE_NOT_FOUND = 'STATE_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_STATES = 'FAILED_TO_RETRIEVE_STATES',
  FAILED_TO_RETRIEVE_STATE = 'FAILED_TO_RETRIEVE_STATE',
  FAILED_TO_CREATE_STATE = 'FAILED_TO_CREATE_STATE',
  FAILED_TO_UPDATE_STATE = 'FAILED_TO_UPDATE_STATE',
  FAILED_TO_DELETE_STATE = 'FAILED_TO_DELETE_STATE',
}

const messages: Record<StateMessageKey, Message> = {
  // Success messages
  [StateMessageKey.STATES_RETRIEVED]: {
    code: 200,
    message: 'States retrieved successfully.',
  },
  [StateMessageKey.STATE_RETRIEVED]: {
    code: 200,
    message: 'State retrieved successfully.',
  },
  [StateMessageKey.STATE_CREATED]: {
    code: 201,
    message: 'State created successfully.',
  },
  [StateMessageKey.STATE_UPDATED]: {
    code: 200,
    message: 'State updated successfully.',
  },
  [StateMessageKey.STATE_DELETED]: {
    code: 204,
    message: 'State deleted successfully.',
  },

  // Missing fields messages
  [StateMessageKey.MISSING_STATE]: {
    code: 400,
    message: 'Please provide state parameter.',
  },
  [StateMessageKey.MISSING_STATE_NAME]: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: state name.',
  },
  [StateMessageKey.MISSING_STATE_CODE]: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: code.',
  },
  [StateMessageKey.INVALID_STATE_COUNTRY_CODE]: {
    code: 400,
    message: 'Invalid state country code. The provided country code for the state is not valid. Please provide a valid country code in ISO format.',
  },
  [StateMessageKey.MISSING_STATE_COUNTRY_CODE]: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: countryCode.',
  },
  [StateMessageKey.MISSING_STATE_LONGITUDE]: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: longitude.',
  },
  [StateMessageKey.MISSING_STATE_LATITUDE]: {
    code: 400,
    message: 'Failed to create/update state. Missing required field: latitude.',
  },

  // Invalid fields messages
  [StateMessageKey.INVALID_STATE_ID]: {
    code: 400,
    message: 'Invalid state ID. The state ID provided is not in a valid format.',
  },
  [StateMessageKey.INVALID_STATE_NAME]: {
    code: 400,
    message: 'Invalid state name. The state name must be a non-empty string.',
  },
  [StateMessageKey.INVALID_STATE_CODE]: {
    code: 400,
    message: 'Invalid state code. The state code must be a non-empty string.',
  },
  [StateMessageKey.INVALID_STATE_LONGITUDE]: {
    code: 400,
    message: 'Invalid state longitude. The longitude must be a valid number.',
  },
  [StateMessageKey.INVALID_STATE_LATITUDE]: {
    code: 400,
    message: 'Invalid state latitude. The latitude must be a valid number.',
  },

  // Duplicate messages

  // Not found messages
  [StateMessageKey.STATE_NOT_FOUND]: {
    code: 404,
    message: 'State not found.',
  },

  // Failure messages
  [StateMessageKey.FAILED_TO_RETRIEVE_STATES]: {
    code: 500,
    message: 'Failed to retrieve states. An internal server error occurred.',
  },
  [StateMessageKey.FAILED_TO_RETRIEVE_STATE]: {
    code: 500,
    message: 'Failed to retrieve state. An internal server error occurred.',
  },
  [StateMessageKey.FAILED_TO_CREATE_STATE]: {
    code: 500,
    message: 'Failed to create state. An internal server error occurred.',
  },
  [StateMessageKey.FAILED_TO_UPDATE_STATE]: {
    code: 500,
    message: 'Failed to update state. An internal server error occurred.',
  },
  [StateMessageKey.FAILED_TO_DELETE_STATE]: {
    code: 500,
    message: 'Failed to delete state. An internal server error occurred.',
  },
};

export const getStateMessage = (key: StateMessageKey): Message => {
  return messages[key];
};
