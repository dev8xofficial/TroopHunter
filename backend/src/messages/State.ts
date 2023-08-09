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

  // Invalid fields messages

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

  // Invalid fields messages

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
