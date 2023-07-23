interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  ACCOUNT_CREATED: {
    code: 200,
    message: 'Account created successfully.',
  },
  LOGGED_IN: {
    code: 200,
    message: 'Logged in successfully.',
  },
  BUSINESSES_RETRIEVED: {
    code: 200,
    message: 'Businesses retrieved successfully.',
  },
  BUSINESS_RETRIEVED_SUCCESSFULLY: {
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
  BUSINESS_DELETED_SUCCESSFULLY: {
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

  // Required fields messages
  MISSING_USER_ID: {
    code: 400,
    message: 'User ID is required to create a lead.',
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
  LEAD_NOT_FOUND: {
    code: 404,
    message: 'Lead not found.',
  },

  // Failure messages
  LOGIN_FAILED: {
    code: 500,
    message: 'Failed to login. Please try again later or contact support.',
  },
  FAILED_TO_CREATE_USER: {
    code: 500,
    message: 'Failed to create user. Please try again later or contact support.',
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
  FAILED_TO_RETRIEVE_LEADS: {
    code: 500,
    message: 'Failed to retrieve leads. An internal server error occurred.',
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
