interface Message {
  code: number;
  message: string;
}

export enum PostalCodeMessageKey {
  // Success messages
  POSTAL_CODES_RETRIEVED = 'POSTAL_CODES_RETRIEVED',
  POSTAL_CODE_RETRIEVED = 'POSTAL_CODE_RETRIEVED',
  POSTAL_CODE_CREATED = 'POSTAL_CODE_CREATED',
  POSTAL_CODE_UPDATED = 'POSTAL_CODE_UPDATED',
  POSTAL_CODE_DELETED = 'POSTAL_CODE_DELETED',

  // Missing fields messages
  MISSING_POSTAL_CODE_ID = 'MISSING_POSTAL_CODE_ID',
  MISSING_POSTAL_CODE = 'MISSING_POSTAL_CODE',

  // Invalid fields messages
  INVALID_POSTAL_CODE_ID = 'INVALID_POSTAL_CODE_ID',
  INVALID_POSTAL_CODE = 'INVALID_POSTAL_CODE',

  // Duplicate messages

  // Not found messages

  // Failure messages
}

const messages: Record<PostalCodeMessageKey, Message> = {
  // Success messages
  [PostalCodeMessageKey.POSTAL_CODES_RETRIEVED]: {
    code: 200,
    message: 'Postal codes retrieved successfully.',
  },
  [PostalCodeMessageKey.POSTAL_CODE_RETRIEVED]: {
    code: 200,
    message: 'Postal code retrieved successfully.',
  },
  [PostalCodeMessageKey.POSTAL_CODE_CREATED]: {
    code: 200,
    message: 'Postal code created successfully.',
  },
  [PostalCodeMessageKey.POSTAL_CODE_UPDATED]: {
    code: 200,
    message: 'Postal code updated successfully.',
  },
  [PostalCodeMessageKey.POSTAL_CODE_DELETED]: {
    code: 200,
    message: 'Postal code deleted successfully.',
  },

  // Missing fields messages
  [PostalCodeMessageKey.MISSING_POSTAL_CODE_ID]: {
    code: 400,
    message: 'Failed to create/update postal code. Missing required field: Postal Code ID.',
  },
  [PostalCodeMessageKey.MISSING_POSTAL_CODE]: {
    code: 400,
    message: 'Failed to create/update postal code. Missing required field: Postal Code.',
  },

  // Invalid fields messages
  [PostalCodeMessageKey.INVALID_POSTAL_CODE_ID]: {
    code: 400,
    message: 'Invalid postal code ID. Please provide a valid UUID.',
  },
  [PostalCodeMessageKey.INVALID_POSTAL_CODE]: {
    code: 400,
    message: 'Invalid postal code. The postal code must be a number.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getPostalCodeMessage = (key: PostalCodeMessageKey): Message => {
  return messages[key];
};
