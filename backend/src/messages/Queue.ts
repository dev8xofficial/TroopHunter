export interface Message {
  code: number;
  message: string;
}

export enum QueueMessageKey {
  // Success messages
  QUEUES_RETRIEVED = 'QUEUES_RETRIEVED',
  QUEUE_UPDATED = 'QUEUE_UPDATED',

  // Missing fields messages

  // Invalid fields messages

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

  // Invalid fields messages

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
