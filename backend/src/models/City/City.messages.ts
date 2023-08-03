interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  CITIES_RETRIEVED: {
    code: 200,
    message: 'Cities retrieved successfully.',
  },
  CITY_RETRIEVED: {
    code: 200,
    message: 'City retrieved successfully.',
  },
  CITY_CREATED: {
    code: 201,
    message: 'City created successfully.',
  },
  CITY_UPDATED: {
    code: 200,
    message: 'City updated successfully.',
  },
  CITY_DELETED: {
    code: 204,
    message: 'City deleted successfully.',
  },

  // Missing fields messages
  MISSING_CITY: {
    code: 400,
    message: 'Please provide city parameter.',
  },

  // Missing fields messages

  // Duplicate messages

  // Not found messages
  CITY_NOT_FOUND: {
    code: 404,
    message: 'City not found.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_CITIES: {
    code: 500,
    message: 'Failed to retrieve cities. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_CITY: {
    code: 500,
    message: 'Failed to retrieve city. An internal server error occurred.',
  },
  FAILED_TO_CREATE_CITY: {
    code: 500,
    message: 'Failed to create city. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_CITY: {
    code: 500,
    message: 'Failed to update city. An internal server error occurred.',
  },
  FAILED_TO_DELETE_CITY: {
    code: 500,
    message: 'Failed to delete city. An internal server error occurred.',
  },
};

export const getCityMessage = (key: string): Message => {
  return messages[key];
};
