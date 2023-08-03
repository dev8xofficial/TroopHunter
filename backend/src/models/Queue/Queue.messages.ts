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
  MISSING_LAPTOP_NAME: {
    code: 400,
    message: 'Failed to update queue. Missing required field: laptopName.',
  },
  MISSING_STATUS: {
    code: 400,
    message: 'Failed to update queue. Missing required field: status.',
  },

  // Invalid fields messages

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
