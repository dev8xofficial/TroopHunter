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
  INVALID_BUSINESS_ID: {
    code: 400,
    message: 'Invalid business ID. The business ID provided is not in a valid format. Please provide a valid UUID for the business ID.',
  },
  INVALID_BUSINESS_DOMAIN: {
    code: 400,
    message: 'Invalid business domain. The business domain must be a non-null string.',
  },
  INVALID_CATEGORY_ID: {
    code: 400,
    message: 'Invalid category ID. The category ID provided is not in a valid format. Please provide a valid UUID for the category ID.',
  },
  INVALID_CITY_ID: {
    code: 400,
    message: 'Invalid city ID. The city ID provided is not in a valid format. Please provide a valid UUID for the city ID.',
  },
  INVALID_STATE_ID: {
    code: 400,
    message: 'Invalid state ID. The state ID provided is not in a valid format. Please provide a valid UUID for the state ID.',
  },
  INVALID_COUNTRY_ID: {
    code: 400,
    message: 'Invalid country ID. The country ID provided is not in a valid format. Please provide a valid UUID for the country ID.',
  },
  INVALID_PHONE_ID: {
    code: 400,
    message: 'Invalid phone ID. The phone ID provided is not in a valid format. Please provide a valid UUID for the phone ID.',
  },
  INVALID_BUSINESS_EMAIL: {
    code: 400,
    message: 'Invalid email. Please provide a valid email address.',
  },
  INVALID_BUSINESS_WEBSITE: {
    code: 400,
    message: 'Invalid website. Please provide a valid website URL.',
  },
  INVALID_BUSINESS_RATING_ID: {
    code: 400,
    message: 'Invalid rating ID. The rating ID provided is not in a valid format. Please provide a valid UUID for the rating ID.',
  },
  INVALID_BUSINESS_REVIEWS: {
    code: 400,
    message: 'Invalid reviews. The reviews must be a valid number.',
  },
  INVALID_TIMEZONE_ID: {
    code: 400,
    message: 'Invalid timezone ID. The timezone ID must be a string value.',
  },
  INVALID_SOURCE_ID: {
    code: 400,
    message: 'Invalid source ID. The source ID must be a string value.',
  },
  INVALID_SOCIAL_MEDIA_ID: {
    code: 400,
    message: 'Invalid social media ID. The social media ID must be a string value.',
  },
  INVALID_SPONSORED_AD: {
    code: 400,
    message: 'Invalid sponsored ad. The sponsored ad must be a boolean value.',
  },
  INVALID_OPENING_HOUR_ID: {
    code: 400,
    message: 'Invalid opening hour ID. The opening hour ID must be a string value.',
  },
  INVALID_CLOSING_HOUR_ID: {
    code: 400,
    message: 'Invalid closing hour ID. The closing hour ID must be a string value.',
  },

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
