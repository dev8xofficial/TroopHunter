interface Message {
  code: number;
  message: string;
}

export enum BusinessSourceMessageKey {
  // Success messages
  BUSINESS_SOURCE_RETRIEVED = 'BUSINESS_SOURCE_RETRIEVED',

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  BUSINESS_SOURCE_NOT_FOUND = 'BUSINESS_SOURCE_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_BUSINESS_SOURCE = 'FAILED_TO_RETRIEVE_BUSINESS_SOURCE',
}

const messages: Record<BusinessSourceMessageKey, Message> = {
  // Success messages
  [BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED]: {
    code: 200,
    message: 'Business source retrieved successfully.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  [BusinessSourceMessageKey.BUSINESS_SOURCE_NOT_FOUND]: {
    code: 404,
    message: 'Business source not found.',
  },

  // Failure messages
  [BusinessSourceMessageKey.FAILED_TO_RETRIEVE_BUSINESS_SOURCE]: {
    code: 500,
    message: 'Failed to retrieve business source. An internal server error occurred.',
  },
};

export const getBusinessSourceMessage = (key: BusinessSourceMessageKey): Message => {
  return messages[key];
};
