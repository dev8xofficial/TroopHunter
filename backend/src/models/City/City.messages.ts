interface Message {
  code: number;
  message: string;
}

export enum CityMessageKey {
  // Success messages
  CITIES_RETRIEVED = 'CITIES_RETRIEVED',
  CITY_RETRIEVED = 'CITY_RETRIEVED',
  CITY_CREATED = 'CITY_CREATED',
  CITY_UPDATED = 'CITY_UPDATED',
  CITY_DELETED = 'CITY_DELETED',

  // Missing fields messages
  MISSING_CITY = 'MISSING_CITY',
  MISSING_STATE_CODE = 'MISSING_STATE_CODE',
  MISSING_COUNTRY_CODE = 'MISSING_COUNTRY_CODE',
  MISSING_CITY_LONGITUDE = 'MISSING_CITY_LONGITUDE',
  MISSING_CITY_LATITUDE = 'MISSING_CITY_LATITUDE',

  // Invalid fields messages
  INVALID_CITY_ID = 'INVALID_CITY_ID',
  INVALID_CITY_NAME = 'INVALID_CITY_NAME',
  INVALID_STATE_CODE = 'INVALID_STATE_CODE',
  INVALID_COUNTRY_CODE = 'INVALID_COUNTRY_CODE',
  INVALID_CITY_LONGITUDE = 'INVALID_CITY_LONGITUDE',
  INVALID_CITY_LATITUDE = 'INVALID_CITY_LATITUDE',

  // Duplicate messages

  // Not found messages
  CITY_NOT_FOUND = 'CITY_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_CITIES = 'FAILED_TO_RETRIEVE_CITIES',
  FAILED_TO_RETRIEVE_CITY = 'FAILED_TO_RETRIEVE_CITY',
  FAILED_TO_CREATE_CITY = 'FAILED_TO_CREATE_CITY',
  FAILED_TO_UPDATE_CITY = 'FAILED_TO_UPDATE_CITY',
  FAILED_TO_DELETE_CITY = 'FAILED_TO_DELETE_CITY',
}

const messages: Record<CityMessageKey, Message> = {
  // Success messages
  [CityMessageKey.CITIES_RETRIEVED]: {
    code: 200,
    message: 'Cities retrieved successfully.',
  },
  [CityMessageKey.CITY_RETRIEVED]: {
    code: 200,
    message: 'City retrieved successfully.',
  },
  [CityMessageKey.CITY_CREATED]: {
    code: 201,
    message: 'City created successfully.',
  },
  [CityMessageKey.CITY_UPDATED]: {
    code: 200,
    message: 'City updated successfully.',
  },
  [CityMessageKey.CITY_DELETED]: {
    code: 204,
    message: 'City deleted successfully.',
  },

  // Missing fields messages
  [CityMessageKey.MISSING_CITY]: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: name.',
  },
  [CityMessageKey.MISSING_STATE_CODE]: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: state code.',
  },
  [CityMessageKey.MISSING_COUNTRY_CODE]: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: country code.',
  },
  [CityMessageKey.MISSING_CITY_LONGITUDE]: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: longitude.',
  },
  [CityMessageKey.MISSING_CITY_LATITUDE]: {
    code: 400,
    message: 'Failed to create/update city. Missing required field: latitude.',
  },

  // Invalid fields messages
  [CityMessageKey.INVALID_CITY_ID]: {
    code: 400,
    message: 'Invalid city ID. The city ID provided is not in a valid format. Please provide a valid UUID for the city ID.',
  },
  [CityMessageKey.INVALID_CITY_NAME]: {
    code: 400,
    message: 'Invalid city name. The city name must be a non-empty string.',
  },
  [CityMessageKey.INVALID_STATE_CODE]: {
    code: 400,
    message: 'Invalid state code. Please provide a valid state code.',
  },
  [CityMessageKey.INVALID_COUNTRY_CODE]: {
    code: 400,
    message: 'Invalid country code. Please provide a valid country code.',
  },
  [CityMessageKey.INVALID_CITY_LONGITUDE]: {
    code: 400,
    message: 'Invalid city longitude. The longitude must be a valid number.',
  },
  [CityMessageKey.INVALID_CITY_LATITUDE]: {
    code: 400,
    message: 'Invalid city latitude. The latitude must be a valid number.',
  },

  // Duplicate messages

  // Not found messages
  [CityMessageKey.CITY_NOT_FOUND]: {
    code: 404,
    message: 'City not found.',
  },

  // Failure messages
  [CityMessageKey.FAILED_TO_RETRIEVE_CITIES]: {
    code: 500,
    message: 'Failed to retrieve cities. An internal server error occurred.',
  },
  [CityMessageKey.FAILED_TO_RETRIEVE_CITY]: {
    code: 500,
    message: 'Failed to retrieve city. An internal server error occurred.',
  },
  [CityMessageKey.FAILED_TO_CREATE_CITY]: {
    code: 500,
    message: 'Failed to create city. An internal server error occurred.',
  },
  [CityMessageKey.FAILED_TO_UPDATE_CITY]: {
    code: 500,
    message: 'Failed to update city. An internal server error occurred.',
  },
  [CityMessageKey.FAILED_TO_DELETE_CITY]: {
    code: 500,
    message: 'Failed to delete city. An internal server error occurred.',
  },
};

export const getCityMessage = (key: CityMessageKey): Message => {
  return messages[key];
};
