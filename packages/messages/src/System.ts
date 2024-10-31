interface Message {
  code: number;
  message: string;
}

export enum SystemMessageKey {
  // Success messages

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages

  // Failure messages
  SYSTEM_FAILED = 'SYSTEM_FAILED',
}

const messages: Record<SystemMessageKey, Message> = {
  // Success messages

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages

  // Failure messages
  [SystemMessageKey.SYSTEM_FAILED]: {
    code: 500,
    message: 'Internal Server Error',
  },
};

export const getSystemMessage = (key: SystemMessageKey): Message => {
  return messages[key];
};
