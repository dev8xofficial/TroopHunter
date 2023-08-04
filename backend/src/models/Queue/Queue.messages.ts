interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  QUEUES_RETRIEVED: {
    code: 200,
    message: 'Queues retrieved successfully.',
  },
  QUEUE_UPDATED: {
    code: 200,
    message: 'Queue updated successfully.',
  },

  // Missing fields messages
  MISSING_QUEUE_ID: {
    code: 400,
    message: 'Failed to process queue. Missing required field: queue ID.',
  },
  MISSING_QUEUE_SEARCH: {
    code: 400,
    message: 'Failed to process queue. Missing required field: search.',
  },
  MISSING_QUEUE_LAPTOP_NAME: {
    code: 400,
    message: 'Failed to process queue. Missing required field: laptop name.',
  },
  MISSING_QUEUE_STATUS: {
    code: 400,
    message: 'Failed to process queue. Missing required field: queue status.',
  },

  // Invalid fields messages
  INVALID_QUEUE_ID: {
    code: 400,
    message: 'Invalid queue ID. The queue ID provided is not in a valid format. Please provide a valid UUID for the queue ID.',
  },
  INVALID_QUEUE_SEARCH: {
    code: 400,
    message: 'Invalid queue search. The search field must be a non-null string.',
  },
  INVALID_QUEUE_LAPTOP_NAME: {
    code: 400,
    message: 'Invalid queue laptop name. The laptop name must be a non-empty string.',
  },
  INVALID_QUEUE_STATUS: {
    code: 400,
    message: 'Invalid queue status. The queue status must be one of the allowed values.',
  },

  // Duplicate messages

  // Not found messages
  QUEUE_NOT_FOUND: {
    code: 404,
    message: 'Queue not found.',
  },

  // Failure messages
  FAILED_TO_RETRIEVE_QUEUES: {
    code: 500,
    message: 'Failed to retrieve queues. An internal server error occurred.',
  },
  FAILED_TO_UPDATE_QUEUE: {
    code: 500,
    message: 'Failed to update queue. An internal server error occurred.',
  },
};

export const getQueueMessage = (key: string): Message => {
  return messages[key];
};
