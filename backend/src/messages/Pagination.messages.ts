interface Message {
  code: number;
  message: string;
}

export enum PaginationMessageKey {
  // Success messages

  // Missing fields messages
  MISSING_REQUEST_PAGE = 'MISSING_REQUEST_PAGE',
  MISSING_REQUEST_LIMIT = 'MISSING_REQUEST_LIMIT',

  // Invalid fields messages
  INVALID_REQUEST_PAGE = 'INVALID_REQUEST_PAGE',
  INVALID_REQUEST_LIMIT = 'INVALID_REQUEST_LIMIT',
  INVALID_REQUEST_INCLUDE = 'INVALID_REQUEST_INCLUDE',

  // Duplicate messages

  // Not found messages

  // Failure messages
}

const messages: Record<PaginationMessageKey, Message> = {
  // Success messages

  // Missing fields messages
  [PaginationMessageKey.MISSING_REQUEST_PAGE]: {
    code: 400,
    message: 'Invalid request. The page number is missing or invalid.',
  },
  [PaginationMessageKey.MISSING_REQUEST_LIMIT]: {
    code: 400,
    message: 'Invalid request. The limit parameter is missing or invalid.',
  },

  // Invalid fields messages
  [PaginationMessageKey.INVALID_REQUEST_PAGE]: {
    code: 400,
    message: 'Invalid request. The page number must be a positive integer.',
  },
  [PaginationMessageKey.INVALID_REQUEST_LIMIT]: {
    code: 400,
    message: 'Invalid request. The limit parameter must be a positive integer.',
  },
  [PaginationMessageKey.INVALID_REQUEST_INCLUDE]: {
    code: 400,
    message: "Invalid include parameter. The correct include parameter should be in the format '['Leads']'.",
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getPaginationMessage = (key: PaginationMessageKey): Message => {
  return messages[key];
};
