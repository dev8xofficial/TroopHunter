interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  COUNTRIES_RETRIEVED: {
    code: 200,
    message: 'Countries retrieved successfully.',
  },
  COUNTRY_RETRIEVED: {
    code: 200,
    message: 'Country retrieved successfully.',
  },
  COUNTRY_CREATED: {
    code: 201,
    message: 'Country created successfully.',
  },
  COUNTRY_UPDATED: {
    code: 200,
    message: 'Country updated successfully.',
  },
  COUNTRY_DELETED: {
    code: 204,
    message: 'Country deleted successfully.',
  },

  // Missing fields messages
  MISSING_COUNTRY_NAME: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: name.',
  },
  MISSING_COUNTRY_CODE: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: country code.',
  },
  MISSING_COUNTRY_PHONE_CODE: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: phone code.',
  },
  MISSING_COUNTRY_CURRENCY: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: currency.',
  },
  MISSING_COUNTRY_LONGITUDE: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: longitude.',
  },
  MISSING_COUNTRY_LATITUDE: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: latitude.',
  },

  // Invalid fields messages
  INVALID_COUNTRY_ID: {
    code: 400,
    message: 'Invalid country ID. The country ID provided is not in a valid format. Please provide a valid UUID for the country ID.',
  },
  INVALID_COUNTRY_NAME: {
    code: 400,
    message: 'Invalid country name. The country name must be a non-empty string.',
  },
  INVALID_COUNTRY_CODE: {
    code: 400,
    message: 'Invalid country code. The country code must be a non-empty string.',
  },
  INVALID_COUNTRY_PHONE_CODE: {
    code: 400,
    message: 'Invalid country phone code. The country phone code must be a non-empty string.',
  },
  INVALID_COUNTRY_CURRENCY: {
    code: 400,
    message: 'Invalid country currency. The country currency must be a non-empty string.',
  },
  INVALID_COUNTRY_LONGITUDE: {
    code: 400,
    message: 'Invalid country longitude. The country longitude must be a valid number.',
  },
  INVALID_COUNTRY_LATITUDE: {
    code: 400,
    message: 'Invalid country latitude. The country latitude must be a valid number.',
  },

  // Duplicate messages

  // Not found messages
  COUNTRY_NOT_FOUND: {
    code: 404,
    message: 'Country not found.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_COUNTRIES: {
    code: 500,
    message: 'Failed to retrieve countries. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_COUNTRY: {
    code: 500,
    message: 'Failed to retrieve country. An internal server error occurred.',
  },
  FAILED_TO_CREATE_COUNTRY: {
    code: 500,
    message: 'Failed to create country. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_COUNTRY: {
    code: 500,
    message: 'Failed to update country. An internal server error occurred.',
  },
  FAILED_TO_DELETE_COUNTRY: {
    code: 500,
    message: 'Failed to delete country. An internal server error occurred.',
  },
};

export const getCountryMessage = (key: string): Message => {
  return messages[key];
};
