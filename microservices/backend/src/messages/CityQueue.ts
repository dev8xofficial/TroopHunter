export interface Message {
  code: number;
  message: string;
}

export enum CityQueueMessageKey {
  // Success messages
  QUEUES_RETRIEVED = 'QUEUES_RETRIEVED',
  CITYQUEUE_CREATED = 'CITYQUEUE_CREATED',

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  QUEUE_NOT_FOUND = 'QUEUE_NOT_FOUND',

  // Failure messages
  FAILED_TO_RETRIEVE_CITYQUEUES = 'FAILED_TO_RETRIEVE_CITYQUEUES',
  FAILED_TO_RETRIEVE_CITYQUEUE = 'FAILED_TO_RETRIEVE_CITYQUEUE',
  FAILED_TO_CREATE_CITYQUEUE = 'FAILED_TO_CREATE_CITYQUEUE',
}

const messages: Record<CityQueueMessageKey, Message> = {
  // Success messages
  [CityQueueMessageKey.QUEUES_RETRIEVED]: {
    code: 200,
    message: 'CityQueues retrieved successfully.',
  },
  [CityQueueMessageKey.CITYQUEUE_CREATED]: {
    code: 200,
    message: 'CityQueue created successfully.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages
  [CityQueueMessageKey.QUEUE_NOT_FOUND]: {
    code: 404,
    message: 'CityQueue not found.',
  },

  // Failure messages
  [CityQueueMessageKey.FAILED_TO_RETRIEVE_CITYQUEUES]: {
    code: 500,
    message: 'Failed to retrieve city queues. An internal server error occurred.',
  },
  [CityQueueMessageKey.FAILED_TO_RETRIEVE_CITYQUEUE]: {
    code: 500,
    message: 'Failed to retrieve city queue. An internal server error occurred.',
  },
  [CityQueueMessageKey.FAILED_TO_CREATE_CITYQUEUE]: {
    code: 500,
    message: 'Failed to update city queue. An internal server error occurred.',
  },
};

export const getCityQueueMessage = (key: CityQueueMessageKey): Message => {
  return messages[key];
};
