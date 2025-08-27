interface Message {
  code: number;
  message: string;
}

export enum BusinessMessageKey {
  // Success messages
  BUSINESSES_RETRIEVED = 'BUSINESSES_RETRIEVED',
  BUSINESS_RETRIEVED = 'BUSINESS_RETRIEVED',
  BUSINESS_CREATED = 'BUSINESS_CREATED',
  BUSINESSES_CREATED = 'BUSINESSES_CREATED',
  BUSINESS_UPDATED = 'BUSINESS_UPDATED',
  BUSINESS_DELETED = 'BUSINESS_DELETED',

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  BUSINESS_NOT_FOUND = 'BUSINESS_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_BUSINESSES = 'FAILED_TO_RETRIEVE_BUSINESSES',
  FAILED_TO_CREATE_BUSINESS = 'FAILED_TO_CREATE_BUSINESS',
  FAILED_TO_CREATE_BUSINESSES = 'FAILED_TO_CREATE_BUSINESSES',
  FAILED_TO_UPDATE_BUSINESS = 'FAILED_TO_UPDATE_BUSINESS',
  FAILED_TO_DELETE_BUSINESS = 'FAILED_TO_DELETE_BUSINESS',
}

const messages: Record<BusinessMessageKey, Message> = {
  // Success messages
  [BusinessMessageKey.BUSINESSES_RETRIEVED]: {
    code: 200,
    message: 'Businesses retrieved successfully.',
  },
  [BusinessMessageKey.BUSINESS_RETRIEVED]: {
    code: 200,
    message: 'Business retrieved successfully.',
  },
  [BusinessMessageKey.BUSINESS_CREATED]: {
    code: 201,
    message: 'Business created successfully.',
  },
  [BusinessMessageKey.BUSINESSES_CREATED]: {
    code: 201,
    message: 'Businesses created successfully.',
  },
  [BusinessMessageKey.BUSINESS_UPDATED]: {
    code: 200,
    message: 'Business updated successfully.',
  },
  [BusinessMessageKey.BUSINESS_DELETED]: {
    code: 204,
    message: 'Business deleted successfully.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  [BusinessMessageKey.BUSINESS_NOT_FOUND]: {
    code: 404,
    message: 'Business not found. The specified business ID does not exist.',
  },

  // Failure messages
  [BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES]: {
    code: 500,
    message: 'Failed to retrieve businesses. An internal server error occurred.',
  },
  [BusinessMessageKey.FAILED_TO_CREATE_BUSINESS]: {
    code: 500,
    message: 'Failed to create business. An internal server error occurred.',
  },
  [BusinessMessageKey.FAILED_TO_CREATE_BUSINESSES]: {
    code: 500,
    message: 'Failed to create businesses. An internal server error occurred.',
  },
  [BusinessMessageKey.FAILED_TO_UPDATE_BUSINESS]: {
    code: 500,
    message: 'Failed to update business. An internal server error occurred.',
  },
  [BusinessMessageKey.FAILED_TO_DELETE_BUSINESS]: {
    code: 500,
    message: 'Failed to delete business. An internal server error occurred.',
  },
};

export const getBusinessMessage = (key: BusinessMessageKey): Message => {
  return messages[key];
};
