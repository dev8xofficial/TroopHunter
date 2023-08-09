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

  // Invalid fields messages

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

  // Invalid fields messages

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
