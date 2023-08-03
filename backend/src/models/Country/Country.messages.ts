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
  MISSING_COUNTRY: {
    code: 400,
    message: 'Please provide country parameter.',
  },

  // Missing fields messages

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
