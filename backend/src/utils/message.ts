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
  LISTS_RETRIEVED: {
    code: 200,
    message: 'Lists retrieved successfully.',
  },
  LIST_RETRIEVED: {
    code: 200,
    message: 'List retrieved successfully.',
  },
  LIST_CREATED: {
    code: 201,
    message: 'List created successfully.',
  },
  LIST_UPDATED: {
    code: 200,
    message: 'List updated successfully.',
  },
  LIST_DELETED: {
    code: 204,
    message: 'List deleted successfully.',
  },
  QUEUES_RETRIEVED: {
    code: 200,
    message: 'Queues retrieved successfully.',
  },
  QUEUE_UPDATED: {
    code: 200,
    message: 'Queue updated successfully.',
  },
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
  STATES_RETRIEVED: {
    code: 200,
    message: 'States retrieved successfully.',
  },
  STATE_RETRIEVED: {
    code: 200,
    message: 'State retrieved successfully.',
  },
  STATE_CREATED: {
    code: 201,
    message: 'State created successfully.',
  },
  STATE_UPDATED: {
    code: 200,
    message: 'State updated successfully.',
  },
  STATE_DELETED: {
    code: 204,
    message: 'State deleted successfully.',
  },
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
  BUSINESS_PHONES_RETRIEVED: {
    code: 200,
    message: 'Business phones retrieved successfully.',
  },
  BUSINESS_PHONE_RETRIEVED: {
    code: 200,
    message: 'Business phone retrieved successfully.',
  },
  BUSINESS_PHONE_CREATED: {
    code: 200,
    message: 'Business phone created successfully.',
  },
  BUSINESS_PHONE_UPDATED: {
    code: 200,
    message: 'Business phone updated successfully.',
  },
  BUSINESS_PHONE_DELETED: {
    code: 200,
    message: 'Business phone deleted successfully.',
  },

  // Required fields messages
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
  MISSING_LIST_NAME: {
    code: 400,
    message: 'Failed to create/update list. Missing required field: name.',
  },
  MISSING_CITY_STATE_COUNTRY: {
    code: 400,
    message: 'Please provide city, state, and country parameters.',
  },
  MISSING_LAPTOP_NAME: {
    code: 400,
    message: 'Failed to update queue. Missing required field: laptopName.',
  },
  MISSING_STATUS: {
    code: 400,
    message: 'Failed to update queue. Missing required field: status.',
  },
  MISSING_PAGE_LIMIT: {
    code: 400,
    message: 'Pagination parameters (page and limit) are required.',
  },
  MISSING_LIMIT: {
    code: 400,
    message: 'Failed to update queue. Missing required field: status.',
  },
  MISSING_CITY: {
    code: 400,
    message: 'Please provide city parameter.',
  },
  MISSING_STATE: {
    code: 400,
    message: 'Please provide state parameter.',
  },
  MISSING_COUNTRY: {
    code: 400,
    message: 'Please provide country parameter.',
  },
  MISSING_BUSINESS_PHONE_NUMBER: {
    code: 400,
    message: 'Failed to retrieve business phones. Missing required field: number.',
  },

  // Error messages
  INVALID_INCLUDE_PARAMETER: {
    code: 400,
    message: "Invalid include parameter. The correct include parameter should be in the format '['Leads']'.",
  },
  INVALID_PAGE_LIMIT: {
    code: 400,
    message: 'Invalid pagination parameters. Both page and limit should be positive integers.',
  },
  BUSINESS_NOT_FOUND: {
    code: 404,
    message: 'Business not found. The specified business ID does not exist.',
  },
  LIST_NOT_FOUND: {
    code: 404,
    message: 'List not found.',
  },
  QUEUE_NOT_FOUND: {
    code: 404,
    message: 'Queue not found.',
  },
  COUNTRY_NOT_FOUND: {
    code: 404,
    message: 'Country not found.',
  },
  BUSINESS_PHONE_NOT_FOUND: {
    code: 404,
    message: 'Business phone not found. The specified business phone ID does not exist.',
  },
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
  STATE_NOT_FOUND: {
    code: 404,
    message: 'State not found.',
  },
  FAILED_TO_RETRIEVE_STATES: {
    code: 500,
    message: 'Failed to retrieve states. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_STATE: {
    code: 500,
    message: 'Failed to retrieve state. An internal server error occurred.',
  },
  FAILED_TO_CREATE_STATE: {
    code: 500,
    message: 'Failed to create state. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_STATE: {
    code: 500,
    message: 'Failed to update state. An internal server error occurred.',
  },
  FAILED_TO_DELETE_STATE: {
    code: 500,
    message: 'Failed to delete state. An internal server error occurred.',
  },
  CITY_NOT_FOUND: {
    code: 404,
    message: 'City not found.',
  },
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
  FAILED_TO_RETRIEVE_BUSINESS_PHONES: {
    code: 500,
    message: 'Failed to retrieve business phones. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_BUSINESS_PHONE: {
    code: 500,
    message: 'Failed to retrieve business phone. An internal server error occurred.',
  },
  FAILED_TO_CREATE_BUSINESS_PHONE: {
    code: 500,
    message: 'Failed to create business phone. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_BUSINESS_PHONE: {
    code: 500,
    message: 'Failed to update business phone. An internal server error occurred.',
  },
  FAILED_TO_DELETE_BUSINESS_PHONE: {
    code: 500,
    message: 'Failed to delete business phone. An internal server error occurred.',
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
  FAILED_TO_RETRIEVE_LISTS: {
    code: 500,
    message: 'Failed to retrieve lists. An internal server error occurred.',
  },
  FAILED_TO_CREATE_LIST: {
    code: 500,
    message: 'Failed to create list. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_LIST: {
    code: 500,
    message: 'Failed to update list. An internal server error occurred.',
  },
  FAILED_TO_DELETE_LIST: {
    code: 500,
    message: 'Failed to delete list. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_QUEUES: {
    code: 500,
    message: 'Failed to retrieve queues. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_QUEUE: {
    code: 500,
    message: 'Failed to update queue. An internal server error occurred.',
  },

  // Internal Server Error
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error.',
  },
  // Add more messages as needed
};

export const getMessage = (key: string): Message => {
  return messages[key];
};
