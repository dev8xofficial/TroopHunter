export interface Message {
  code: number;
  message: string;
}

export enum QueueMessageKey {
  // Success messages
  QUEUES_RETRIEVED = 'QUEUES_RETRIEVED',
  QUEUE_UPDATED = 'QUEUE_UPDATED',

  // Missing fields messages
  MISSING_QUEUE_ID = 'MISSING_QUEUE_ID',
  MISSING_QUEUE_SEARCH = 'MISSING_QUEUE_SEARCH',
  MISSING_QUEUE_LAPTOP_NAME = 'MISSING_QUEUE_LAPTOP_NAME',
  MISSING_QUEUE_STATUS = 'MISSING_QUEUE_STATUS',

  // Invalid fields messages
  INVALID_QUEUE_ID = 'INVALID_QUEUE_ID',
  INVALID_QUEUE_SEARCH = 'INVALID_QUEUE_SEARCH',
  INVALID_QUEUE_LAPTOP_NAME = 'INVALID_QUEUE_LAPTOP_NAME',
  INVALID_QUEUE_STATUS = 'INVALID_QUEUE_STATUS',

  // Duplicate messages

  // Not found messages
  QUEUE_NOT_FOUND = 'QUEUE_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_QUEUES = 'FAILED_TO_RETRIEVE_QUEUES',
  FAILED_TO_RETRIEVE_QUEUE = 'FAILED_TO_RETRIEVE_QUEUE',
  FAILED_TO_UPDATE_QUEUE = 'FAILED_TO_UPDATE_QUEUE',
}

const messages: Record<QueueMessageKey, Message> = {
  // Success messages
  [QueueMessageKey.QUEUES_RETRIEVED]: {
    code: 200,
    message: 'Queues retrieved successfully.',
  },
  [QueueMessageKey.QUEUE_UPDATED]: {
    code: 200,
    message: 'Queue updated successfully.',
  },

  // Missing fields messages
  [QueueMessageKey.MISSING_QUEUE_ID]: {
    code: 400,
    message: 'Failed to process queue. Missing required field: queue ID.',
  },
  [QueueMessageKey.MISSING_QUEUE_SEARCH]: {
    code: 400,
    message: 'Failed to process queue. Missing required field: search.',
  },
  [QueueMessageKey.MISSING_QUEUE_LAPTOP_NAME]: {
    code: 400,
    message: 'Failed to process queue. Missing required field: laptop name.',
  },
  [QueueMessageKey.MISSING_QUEUE_STATUS]: {
    code: 400,
    message: 'Failed to process queue. Missing required field: queue status.',
  },

  // Invalid fields messages
  [QueueMessageKey.INVALID_QUEUE_ID]: {
    code: 400,
    message: 'Invalid queue ID. The queue ID provided is not in a valid format. Please provide a valid UUID for the queue ID.',
  },
  [QueueMessageKey.INVALID_QUEUE_SEARCH]: {
    code: 400,
    message: 'Invalid queue search. The search field must be a non-null string.',
  },
  [QueueMessageKey.INVALID_QUEUE_LAPTOP_NAME]: {
    code: 400,
    message: 'Invalid queue laptop name. The laptop name must be a non-empty string.',
  },
  [QueueMessageKey.INVALID_QUEUE_STATUS]: {
    code: 400,
    message: 'Invalid queue status. The queue status must be one of the allowed values.',
  },

  // Duplicate messages

  // Not found messages
  [QueueMessageKey.QUEUE_NOT_FOUND]: {
    code: 404,
    message: 'Queue not found.',
  },

  // Failure messages
  [QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES]: {
    code: 500,
    message: 'Failed to retrieve queues. An internal server error occurred.',
  },
  [QueueMessageKey.FAILED_TO_RETRIEVE_QUEUE]: {
    code: 500,
    message: 'Failed to retrieve queue. An internal server error occurred.',
  },
  [QueueMessageKey.FAILED_TO_UPDATE_QUEUE]: {
    code: 500,
    message: 'Failed to update queue. An internal server error occurred.',
  },
};

export const getQueueMessage = (key: QueueMessageKey): Message => {
  return messages[key];
};
