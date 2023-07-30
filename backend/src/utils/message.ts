interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  USERS_RETRIEVED: {
    code: 200,
    message: 'Users retrieved successfully.',
  },
  USER_RETRIEVED: {
    code: 200,
    message: 'User retrieved successfully.',
  },
  USER_CREATED: {
    code: 200,
    message: 'User created successfully.',
  },
  USER_UPDATED: {
    code: 200,
    message: 'User updated successfully.',
  },
  USER_DELETED: {
    code: 204,
    message: 'User deleted successfully.',
  },
  LOGGED_IN: {
    code: 200,
    message: 'Logged in successfully.',
  },
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
  LEADBUSINESS_RETRIEVED: {
    code: 200,
    message: 'Retrieved LeadBusiness with specified leadId and businessId.',
  },
  LEADBUSINESS_UPDATED: {
    code: 200,
    message: 'Updated LeadBusiness with specified leadId and businessId.',
  },
  LEAD_CREATED: {
    code: 201,
    message: 'Lead created successfully.',
  },
  LEAD_RETRIEVED: {
    code: 200,
    message: 'Lead retrieved successfully.',
  },
  LEAD_UPDATED: {
    code: 200,
    message: 'Lead updated successfully.',
  },
  LEADS_DELETED: {
    code: 200,
    message: 'Leads deleted successfully.',
  },
  LEAD_DELETED: {
    code: 200,
    message: 'Lead deleted successfully.',
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

  // Required fields messages
  MISSING_USER_ID: {
    code: 400,
    message: 'User ID is required to create a lead.',
  },
  MISSING_USER_ID_UPDATE: {
    code: 400,
    message: 'User ID is required to update a user.',
  },
  MISSING_FIRST_NAME: {
    code: 400,
    message: 'Failed to update user. Missing required field: firstName.',
  },
  MISSING_LAST_NAME: {
    code: 400,
    message: 'Failed to update user. Missing required field: lastName.',
  },
  MISSING_EMAIL: {
    code: 400,
    message: 'Failed to update user. Missing required field: email.',
  },
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

  // Error messages
  INVALID_INCLUDE_PARAMETER: {
    code: 400,
    message: "Invalid include parameter. The correct include parameter should be in the format '['Leads']'.",
  },
  INVALID_EMAIL: {
    code: 400,
    message: 'Invalid email address.',
  },
  INVALID_PASSWORD: {
    code: 400,
    message: 'Invalid password. Password should be at least 8 characters long and contain letters, numbers, and special characters.',
  },
  INVALID_PAGE_LIMIT: {
    code: 400,
    message: 'Invalid pagination parameters. Both page and limit should be positive integers.',
  },
  DUPLICATE_USER: {
    code: 409,
    message: 'Email already exists. Please log in or use a different email.',
  },
  USER_NOT_FOUND: {
    code: 404,
    message: 'User not found. Please check your credentials or sign up for a new account.',
  },
  BUSINESS_NOT_FOUND: {
    code: 404,
    message: 'Business not found. The specified business ID does not exist.',
  },
  LEADS_NOT_FOUND: {
    code: 404,
    message: 'Leads not found.',
  },
  LEAD_NOT_FOUND: {
    code: 404,
    message: 'Lead not found.',
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

  // Failure messages
  LOGIN_FAILED: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
  FAILED_TO_RETRIEVE_USERS: {
    code: 500,
    message: 'Failed to retrieve users. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_USER: {
    code: 500,
    message: 'Failed to retrieve user. An internal server error occurred.',
  },
  FAILED_TO_CREATE_USER: {
    code: 500,
    message: 'Failed to create user. Please try again later or contact support.',
  },
  FAILED_TO_UPDATE_USER: {
    code: 500,
    message: 'Failed to update user. An internal server error occurred.',
  },
  FAILED_TO_DELETE_USER: {
    code: 500,
    message: 'Failed to delete user. An internal server error occurred.',
  },
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
  FAILED_TO_CREATE_LEAD: {
    code: 500,
    message: 'Failed to create lead. An internal server error occurred.',
  },
  FAILED_TO_CREATE_LEADS: {
    code: 500,
    message: 'Failed to create leads. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_LEAD: {
    code: 500,
    message: 'Failed to retrieve lead. An internal server error occurred.',
  },
  FAILED_TO_RETRIEVE_LEADS: {
    code: 500,
    message: 'Failed to retrieve leads. An internal server error occurred.',
  },
  FAILED_TO_DELETE_LEAD: {
    code: 500,
    message: 'Failed to delete lead. An internal server error occurred.',
  },
  FAILED_TO_DELETE_LEADS: {
    code: 500,
    message: 'Failed to delete leads. An internal server error occurred.',
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
