interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  BUSINESSES_RETRIEVED: {
    code: 200,
    message: 'Businesses retrieved successfully.',
  },
  BUSINESS_RETRIEVED: {
    code: 200,
    message: 'Business retrieved successfully.',
  },
  BUSINESS_CREATED: {
    code: 201,
    message: 'Business created successfully.',
  },
  BUSINESS_UPDATED: {
    code: 200,
    message: 'Business updated successfully.',
  },
  BUSINESS_DELETED: {
    code: 204,
    message: 'Business deleted successfully.',
  },

  // Missing fields messages
  MISSING_NAME: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: name.',
  },
  MISSING_ADDRESS: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: address.',
  },
  MISSING_LONGITUDE: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: longitude.',
  },
  MISSING_LATITUDE: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: latitude.',
  },
  MISSING_SOURCE: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: source.',
  },

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  BUSINESS_NOT_FOUND: {
    code: 404,
    message: 'Business not found. The specified business ID does not exist.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_BUSINESSES: {
    code: 500,
    message: 'Failed to retrieve businesses. An internal server error occurred.',
  },
  FAILED_TO_CREATE_BUSINESS: {
    code: 500,
    message: 'Failed to create business. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_BUSINESS: {
    code: 500,
    message: 'Failed to update business. An internal server error occurred.',
  },
  FAILED_TO_DELETE_BUSINESS: {
    code: 500,
    message: 'Failed to delete business. An internal server error occurred.',
  },
};

export const getBusinessMessage = (key: string): Message => {
  return messages[key];
};
