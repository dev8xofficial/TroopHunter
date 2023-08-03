interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
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

  // Missing fields messages
  MISSING_BUSINESS_PHONE_COUNTRY_CODE: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: countryCode.',
  },
  MISSING_BUSINESS_PHONE_REGION_CODE: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: regionCode.',
  },
  MISSING_BUSINESS_PHONE_NUMBER: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: number.',
  },
  MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: numberNationalFormatted.',
  },
  MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: numberInternationalFormatted.',
  },
  MISSING_BUSINESS_PHONE_TYPE: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: numberType.',
  },
  MISSING_BUSINESS_PHONE_VALIDITY: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: isValid.',
  },

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  BUSINESS_PHONE_NOT_FOUND: {
    code: 404,
    message: 'Business phone not found. The specified business phone ID does not exist.',
  },

  // Failure messages
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
};

export const getBusinessPhoneMessage = (key: string): Message => {
  return messages[key];
};
