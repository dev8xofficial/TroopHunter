interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  POSTAL_CODES_RETRIEVED: {
    code: 200,
    message: 'Postal codes retrieved successfully.',
  },
  POSTAL_CODE_RETRIEVED: {
    code: 200,
    message: 'Postal code retrieved successfully.',
  },
  POSTAL_CODE_CREATED: {
    code: 200,
    message: 'Postal code created retrieved successfully.',
  },
  POSTAL_CODE_UPDATED: {
    code: 200,
    message: 'Postal code updated retrieved successfully.',
  },
  POSTAL_CODE_DELETED: {
    code: 200,
    message: 'Postal code deleted retrieved successfully.',
  },

  // Missing fields messages
  MISSING_POSTAL_CODE_ID: {
    code: 400,
    message: 'Failed to create/update postal code. Missing required field: Postal Code ID.',
  },
  MISSING_POSTAL_CODE: {
    code: 400,
    message: 'Failed to create/update postal code. Missing required field: Postal Code.',
  },

  // Invalid fields messages
  INVALID_POSTAL_CODE_ID: {
    code: 400,
    message: 'Invalid postal code ID. Please provide a valid UUID.',
  },
  INVALID_POSTAL_CODE: {
    code: 400,
    message: 'Invalid postal code. The postal code must be a number.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getPostalCodeMessage = (key: string): Message => {
  return messages[key];
};
