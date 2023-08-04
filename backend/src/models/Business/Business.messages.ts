export interface Message {
  code: number;
  message: string;
}

export enum BusinessMessageKey {
  // Success messages
  BUSINESSES_RETRIEVED = 'BUSINESSES_RETRIEVED',
  BUSINESS_RETRIEVED = 'BUSINESS_RETRIEVED',
  BUSINESS_CREATED = 'BUSINESS_CREATED',
  BUSINESS_UPDATED = 'BUSINESS_UPDATED',
  BUSINESS_DELETED = 'BUSINESS_DELETED',

  // Missing fields messages
  MISSING_NAME = 'MISSING_NAME',
  MISSING_ADDRESS = 'MISSING_ADDRESS',
  MISSING_LONGITUDE = 'MISSING_LONGITUDE',
  MISSING_LATITUDE = 'MISSING_LATITUDE',
  MISSING_SOURCE = 'MISSING_SOURCE',

  // Invalid fields messages
  INVALID_BUSINESS_ID = 'INVALID_BUSINESS_ID',
  INVALID_BUSINESS_DOMAIN = 'INVALID_BUSINESS_DOMAIN',
  INVALID_CATEGORY_ID = 'INVALID_CATEGORY_ID',
  INVALID_CITY_ID = 'INVALID_CITY_ID',
  INVALID_STATE_ID = 'INVALID_STATE_ID',
  INVALID_COUNTRY_ID = 'INVALID_COUNTRY_ID',
  INVALID_POSTAL_CODE_ID = 'INVALID_POSTAL_CODE_ID',
  INVALID_PHONE_ID = 'INVALID_PHONE_ID',
  INVALID_BUSINESS_EMAIL = 'INVALID_BUSINESS_EMAIL',
  INVALID_BUSINESS_WEBSITE = 'INVALID_BUSINESS_WEBSITE',
  INVALID_BUSINESS_RATING_ID = 'INVALID_BUSINESS_RATING_ID',
  INVALID_BUSINESS_REVIEWS = 'INVALID_BUSINESS_REVIEWS',
  INVALID_TIMEZONE_ID = 'INVALID_TIMEZONE_ID',
  INVALID_SOURCE_ID = 'INVALID_SOURCE_ID',
  INVALID_SOCIAL_MEDIA_ID = 'INVALID_SOCIAL_MEDIA_ID',
  INVALID_SPONSORED_AD = 'INVALID_SPONSORED_AD',
  INVALID_OPENING_HOUR_ID = 'INVALID_OPENING_HOUR_ID',
  INVALID_CLOSING_HOUR_ID = 'INVALID_CLOSING_HOUR_ID',

  // Duplicate messages

  // Not found messages
  BUSINESS_NOT_FOUND = 'BUSINESS_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_BUSINESSES = 'FAILED_TO_RETRIEVE_BUSINESSES',
  FAILED_TO_CREATE_BUSINESS = 'FAILED_TO_CREATE_BUSINESS',
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
  [BusinessMessageKey.BUSINESS_UPDATED]: {
    code: 200,
    message: 'Business updated successfully.',
  },
  [BusinessMessageKey.BUSINESS_DELETED]: {
    code: 204,
    message: 'Business deleted successfully.',
  },

  // Missing fields messages
  [BusinessMessageKey.MISSING_NAME]: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: name.',
  },
  [BusinessMessageKey.MISSING_ADDRESS]: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: address.',
  },
  [BusinessMessageKey.MISSING_LONGITUDE]: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: longitude.',
  },
  [BusinessMessageKey.MISSING_LATITUDE]: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: latitude.',
  },
  [BusinessMessageKey.MISSING_SOURCE]: {
    code: 400,
    message: 'Failed to create/update business. Missing required field: source.',
  },

  // Invalid fields messages
  [BusinessMessageKey.INVALID_BUSINESS_ID]: {
    code: 400,
    message: 'Invalid business ID. The business ID provided is not in a valid format. Please provide a valid UUID for the business ID.',
  },
  [BusinessMessageKey.INVALID_BUSINESS_DOMAIN]: {
    code: 400,
    message: 'Invalid business domain. The business domain must be a non-null string.',
  },
  [BusinessMessageKey.INVALID_CATEGORY_ID]: {
    code: 400,
    message: 'Invalid category ID. The category ID provided is not in a valid format. Please provide a valid UUID for the category ID.',
  },
  [BusinessMessageKey.INVALID_CITY_ID]: {
    code: 400,
    message: 'Invalid city ID. The city ID provided is not in a valid format. Please provide a valid UUID for the city ID.',
  },
  [BusinessMessageKey.INVALID_STATE_ID]: {
    code: 400,
    message: 'Invalid state ID. The state ID provided is not in a valid format. Please provide a valid UUID for the state ID.',
  },
  [BusinessMessageKey.INVALID_COUNTRY_ID]: {
    code: 400,
    message: 'Invalid country ID. The country ID provided is not in a valid format. Please provide a valid UUID for the country ID.',
  },
  [BusinessMessageKey.INVALID_POSTAL_CODE_ID]: {
    code: 400,
    message: 'Invalid postal code ID. The postal code ID provided is not in a valid format. Please provide a valid UUID for the postal code ID.',
  },
  [BusinessMessageKey.INVALID_PHONE_ID]: {
    code: 400,
    message: 'Invalid phone ID. The phone ID provided is not in a valid format. Please provide a valid UUID for the phone ID.',
  },
  [BusinessMessageKey.INVALID_BUSINESS_EMAIL]: {
    code: 400,
    message: 'Invalid email. Please provide a valid email address.',
  },
  [BusinessMessageKey.INVALID_BUSINESS_WEBSITE]: {
    code: 400,
    message: 'Invalid website. Please provide a valid website URL.',
  },
  [BusinessMessageKey.INVALID_BUSINESS_RATING_ID]: {
    code: 400,
    message: 'Invalid rating ID. The rating ID provided is not in a valid format. Please provide a valid UUID for the rating ID.',
  },
  [BusinessMessageKey.INVALID_BUSINESS_REVIEWS]: {
    code: 400,
    message: 'Invalid reviews. The reviews must be a valid number.',
  },
  [BusinessMessageKey.INVALID_TIMEZONE_ID]: {
    code: 400,
    message: 'Invalid timezone ID. The timezone ID must be a string value.',
  },
  [BusinessMessageKey.INVALID_SOURCE_ID]: {
    code: 400,
    message: 'Invalid source ID. The source ID must be a string value.',
  },
  [BusinessMessageKey.INVALID_SOCIAL_MEDIA_ID]: {
    code: 400,
    message: 'Invalid social media ID. The social media ID must be a string value.',
  },
  [BusinessMessageKey.INVALID_SPONSORED_AD]: {
    code: 400,
    message: 'Invalid sponsored ad. The sponsored ad must be a boolean value.',
  },
  [BusinessMessageKey.INVALID_OPENING_HOUR_ID]: {
    code: 400,
    message: 'Invalid opening hour ID. The opening hour ID must be a string value.',
  },
  [BusinessMessageKey.INVALID_CLOSING_HOUR_ID]: {
    code: 400,
    message: 'Invalid closing hour ID. The closing hour ID must be a string value.',
  },

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
