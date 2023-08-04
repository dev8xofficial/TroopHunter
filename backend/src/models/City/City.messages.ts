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
    message: 'Failed to create/update city. Missing required field: name.',
  },
  MISSING_STATE_CODE: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: state code.',
  },
  MISSING_COUNTRY_CODE: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: country code.',
  },
  MISSING_CITY_LONGITUDE: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: longitude.',
  },
  MISSING_CITY_LATITUDE: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: latitude.',
  },

  // Invalid fields messages
  INVALID_CITY_ID: {
    code: 400,
    message: 'Invalid city ID. The city ID provided is not in a valid format. Please provide a valid UUID for the city ID.',
  },
  INVALID_CITY_NAME: {
    code: 400,
    message: 'Invalid city name. The city name must be a non-empty string.',
  },
  INVALID_STATE_CODE: {
    code: 400,
    message: 'Invalid state code. Please provide a valid state code.',
  },
  INVALID_COUNTRY_CODE: {
    code: 400,
    message: 'Invalid country code. Please provide a valid country code.',
  },
  INVALID_CITY_LONGITUDE: {
    code: 400,
    message: 'Invalid city longitude. The longitude must be a valid number.',
  },
  INVALID_CITY_LATITUDE: {
    code: 400,
    message: 'Invalid city latitude. The latitude must be a valid number.',
  },

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
