export interface Message {
  code: number;
  message: string;
}

export enum CountryMessageKey {
  // Success messages
  COUNTRIES_RETRIEVED = 'COUNTRIES_RETRIEVED',
  COUNTRY_RETRIEVED = 'COUNTRY_RETRIEVED',
  COUNTRY_CREATED = 'COUNTRY_CREATED',
  COUNTRY_UPDATED = 'COUNTRY_UPDATED',
  COUNTRY_DELETED = 'COUNTRY_DELETED',

  // Missing fields messages
  MISSING_COUNTRY_NAME = 'MISSING_COUNTRY_NAME',
  MISSING_COUNTRY_CODE = 'MISSING_COUNTRY_CODE',
  MISSING_COUNTRY_PHONE_CODE = 'MISSING_COUNTRY_PHONE_CODE',
  MISSING_COUNTRY_CURRENCY = 'MISSING_COUNTRY_CURRENCY',
  MISSING_COUNTRY_LONGITUDE = 'MISSING_COUNTRY_LONGITUDE',
  MISSING_COUNTRY_LATITUDE = 'MISSING_COUNTRY_LATITUDE',

  // Invalid fields messages
  INVALID_COUNTRY_ID = 'INVALID_COUNTRY_ID',
  INVALID_COUNTRY_NAME = 'INVALID_COUNTRY_NAME',
  INVALID_COUNTRY_CODE = 'INVALID_COUNTRY_CODE',
  INVALID_COUNTRY_PHONE_CODE = 'INVALID_COUNTRY_PHONE_CODE',
  INVALID_COUNTRY_CURRENCY = 'INVALID_COUNTRY_CURRENCY',
  INVALID_COUNTRY_LONGITUDE = 'INVALID_COUNTRY_LONGITUDE',
  INVALID_COUNTRY_LATITUDE = 'INVALID_COUNTRY_LATITUDE',

  // Duplicate messages

  // Not found messages
  COUNTRY_NOT_FOUND = 'COUNTRY_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_COUNTRIES = 'FAILED_TO_RETRIEVE_COUNTRIES',
  FAILED_TO_RETRIEVE_COUNTRY = 'FAILED_TO_RETRIEVE_COUNTRY',
  FAILED_TO_CREATE_COUNTRY = 'FAILED_TO_CREATE_COUNTRY',
  FAILED_TO_UPDATE_COUNTRY = 'FAILED_TO_UPDATE_COUNTRY',
  FAILED_TO_DELETE_COUNTRY = 'FAILED_TO_DELETE_COUNTRY',
}

const messages: Record<CountryMessageKey, Message> = {
  // Success messages
  [CountryMessageKey.COUNTRIES_RETRIEVED]: {
    code: 200,
    message: 'Countries retrieved successfully.',
  },
  [CountryMessageKey.COUNTRY_RETRIEVED]: {
    code: 200,
    message: 'Country retrieved successfully.',
  },
  [CountryMessageKey.COUNTRY_CREATED]: {
    code: 201,
    message: 'Country created successfully.',
  },
  [CountryMessageKey.COUNTRY_UPDATED]: {
    code: 200,
    message: 'Country updated successfully.',
  },
  [CountryMessageKey.COUNTRY_DELETED]: {
    code: 204,
    message: 'Country deleted successfully.',
  },

  // Missing fields messages
  [CountryMessageKey.MISSING_COUNTRY_NAME]: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: name.',
  },
  [CountryMessageKey.MISSING_COUNTRY_CODE]: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: country code.',
  },
  [CountryMessageKey.MISSING_COUNTRY_PHONE_CODE]: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: phone code.',
  },
  [CountryMessageKey.MISSING_COUNTRY_CURRENCY]: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: currency.',
  },
  [CountryMessageKey.MISSING_COUNTRY_LONGITUDE]: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: longitude.',
  },
  [CountryMessageKey.MISSING_COUNTRY_LATITUDE]: {
    code: 400,
    message: 'Failed to create/update country. Missing required field: latitude.',
  },

  // Invalid fields messages
  [CountryMessageKey.INVALID_COUNTRY_ID]: {
    code: 400,
    message: 'Invalid country ID. The country ID provided is not in a valid format. Please provide a valid UUID for the country ID.',
  },
  [CountryMessageKey.INVALID_COUNTRY_NAME]: {
    code: 400,
    message: 'Invalid country name. The country name must be a non-empty string.',
  },
  [CountryMessageKey.INVALID_COUNTRY_CODE]: {
    code: 400,
    message: 'Invalid country code. The country code must be a non-empty string.',
  },
  [CountryMessageKey.INVALID_COUNTRY_PHONE_CODE]: {
    code: 400,
    message: 'Invalid country phone code. The country phone code must be a non-empty string.',
  },
  [CountryMessageKey.INVALID_COUNTRY_CURRENCY]: {
    code: 400,
    message: 'Invalid country currency. The country currency must be a non-empty string.',
  },
  [CountryMessageKey.INVALID_COUNTRY_LONGITUDE]: {
    code: 400,
    message: 'Invalid country longitude. The country longitude must be a valid number.',
  },
  [CountryMessageKey.INVALID_COUNTRY_LATITUDE]: {
    code: 400,
    message: 'Invalid country latitude. The country latitude must be a valid number.',
  },

  // Duplicate messages

  // Not found messages
  [CountryMessageKey.COUNTRY_NOT_FOUND]: {
    code: 404,
    message: 'Country not found.',
  },

  // Failure messages
  [CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRIES]: {
    code: 500,
    message: 'Failed to retrieve countries. An internal server error occurred.',
  },
  [CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRY]: {
    code: 500,
    message: 'Failed to retrieve country. An internal server error occurred.',
  },
  [CountryMessageKey.FAILED_TO_CREATE_COUNTRY]: {
    code: 500,
    message: 'Failed to create country. An internal server error occurred.',
  },
  [CountryMessageKey.FAILED_TO_UPDATE_COUNTRY]: {
    code: 500,
    message: 'Failed to update country. An internal server error occurred.',
  },
  [CountryMessageKey.FAILED_TO_DELETE_COUNTRY]: {
    code: 500,
    message: 'Failed to delete country. An internal server error occurred.',
  },
};

export const getCountryMessage = (key: CountryMessageKey): Message => {
  return messages[key];
};
