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

  // Invalid fields messages

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

  // Invalid fields messages

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
