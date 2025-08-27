interface Message {
  code: number;
  message: string;
}

export enum BusinessPhoneMessageKey {
  // Success messages
  BUSINESS_PHONES_RETRIEVED = 'BUSINESS_PHONES_RETRIEVED',
  BUSINESS_PHONE_RETRIEVED = 'BUSINESS_PHONE_RETRIEVED',
  BUSINESS_PHONE_CREATED = 'BUSINESS_PHONE_CREATED',
  BUSINESS_PHONE_UPDATED = 'BUSINESS_PHONE_UPDATED',
  BUSINESS_PHONE_DELETED = 'BUSINESS_PHONE_DELETED',

  // Missing fields messages
  MISSING_BUSINESS_PHONE_COUNTRY_CODE = 'MISSING_BUSINESS_PHONE_COUNTRY_CODE',
  MISSING_BUSINESS_PHONE_REGION_CODE = 'MISSING_BUSINESS_PHONE_REGION_CODE',
  MISSING_BUSINESS_PHONE_NUMBER = 'MISSING_BUSINESS_PHONE_NUMBER',
  MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED = 'MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED',
  MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED = 'MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED',
  MISSING_BUSINESS_PHONE_TYPE = 'MISSING_BUSINESS_PHONE_TYPE',
  MISSING_BUSINESS_PHONE_VALIDITY = 'MISSING_BUSINESS_PHONE_VALIDITY',

  // Invalid fields messages
  INVALID_BUSINESS_PHONE_ID = 'INVALID_BUSINESS_PHONE_ID',
  INVALID_BUSINESS_PHONE_COUNTRY_CODE = 'INVALID_BUSINESS_PHONE_COUNTRY_CODE',
  INVALID_BUSINESS_PHONE_REGION_CODE = 'INVALID_BUSINESS_PHONE_REGION_CODE',
  INVALID_BUSINESS_PHONE_NUMBER = 'INVALID_BUSINESS_PHONE_NUMBER',
  INVALID_BUSINESS_PHONE_NATIONAL_FORMATTED = 'INVALID_BUSINESS_PHONE_NATIONAL_FORMATTED',
  INVALID_BUSINESS_PHONE_INTERNATIONAL_FORMATTED = 'INVALID_BUSINESS_PHONE_INTERNATIONAL_FORMATTED',
  INVALID_BUSINESS_PHONE_NUMBER_TYPE = 'INVALID_BUSINESS_PHONE_NUMBER_TYPE',
  INVALID_BUSINESS_PHONE_IS_VALID = 'INVALID_BUSINESS_PHONE_IS_VALID',

  // Duplicate messages

  // Not found messages
  BUSINESS_PHONE_NOT_FOUND = 'BUSINESS_PHONE_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_BUSINESS_PHONES = 'FAILED_TO_RETRIEVE_BUSINESS_PHONES',
  FAILED_TO_RETRIEVE_BUSINESS_PHONE = 'FAILED_TO_RETRIEVE_BUSINESS_PHONE',
  FAILED_TO_CREATE_BUSINESS_PHONE = 'FAILED_TO_CREATE_BUSINESS_PHONE',
  FAILED_TO_UPDATE_BUSINESS_PHONE = 'FAILED_TO_UPDATE_BUSINESS_PHONE',
  FAILED_TO_DELETE_BUSINESS_PHONE = 'FAILED_TO_DELETE_BUSINESS_PHONE',
}

const messages: Record<BusinessPhoneMessageKey, Message> = {
  // Success messages
  [BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED]: {
    code: 200,
    message: 'Business phones retrieved successfully.',
  },
  [BusinessPhoneMessageKey.BUSINESS_PHONE_RETRIEVED]: {
    code: 200,
    message: 'Business phone retrieved successfully.',
  },
  [BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED]: {
    code: 200,
    message: 'Business phone created successfully.',
  },
  [BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED]: {
    code: 200,
    message: 'Business phone updated successfully.',
  },
  [BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED]: {
    code: 200,
    message: 'Business phone deleted successfully.',
  },

  // Missing fields messages
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_COUNTRY_CODE]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: Country Code.',
  },
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_REGION_CODE]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: Region Code.',
  },
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_NUMBER]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: Phone Number.',
  },
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: National Formatted Number.',
  },
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: International Formatted Number.',
  },
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_TYPE]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: Phone Number Type.',
  },
  [BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_VALIDITY]: {
    code: 400,
    message: 'Failed to create/update business phone. Missing required field: Validity.',
  },

  // Invalid fields messages
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_ID]: {
    code: 400,
    message: 'Invalid business phone ID. The business phone ID provided is not in a valid format. Please provide a valid UUID for the business phone ID.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_COUNTRY_CODE]: {
    code: 400,
    message: 'Invalid business phone country code. The country code must be a non-empty string.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_REGION_CODE]: {
    code: 400,
    message: 'Invalid business phone region code. The region code must be a non-empty string.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_NUMBER]: {
    code: 400,
    message: 'Invalid business phone number. The business phone number must be a string value.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_NATIONAL_FORMATTED]: {
    code: 400,
    message: 'Invalid business phone number in national formatted. The phone number must be in a valid national format.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_INTERNATIONAL_FORMATTED]: {
    code: 400,
    message: 'Invalid business phone number in international formatted. The phone number must be in a valid international format.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_NUMBER_TYPE]: {
    code: 400,
    message: 'Invalid business phone number type. The phone number type must be a valid value.',
  },
  [BusinessPhoneMessageKey.INVALID_BUSINESS_PHONE_IS_VALID]: {
    code: 400,
    message: 'Invalid business phone validity. The phone validity must be a boolean (true or false).',
  },

  // Duplicate messages

  // Not found messages
  [BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND]: {
    code: 404,
    message: 'Business phone not found. The specified business phone ID does not exist.',
  },

  // Failure messages
  [BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONES]: {
    code: 500,
    message: 'Failed to retrieve business phones. An internal server error occurred.',
  },
  [BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONE]: {
    code: 500,
    message: 'Failed to retrieve business phone. An internal server error occurred.',
  },
  [BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE]: {
    code: 500,
    message: 'Failed to create business phone. An internal server error occurred.',
  },
  [BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE]: {
    code: 500,
    message: 'Failed to update business phone. An internal server error occurred.',
  },
  [BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE]: {
    code: 500,
    message: 'Failed to delete business phone. An internal server error occurred.',
  },
};

export const getBusinessPhoneMessage = (key: BusinessPhoneMessageKey): Message => {
  return messages[key];
};
