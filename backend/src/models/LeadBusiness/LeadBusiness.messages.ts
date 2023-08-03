interface Message {
  code: number;
  message: string;
}

const messages: Record<string, Message> = {
  // Success messages
  LEADBUSINESS_RETRIEVED: {
    code: 200,
    message: 'Retrieved LeadBusiness with specified leadId and businessId.',
  },
  LEADBUSINESS_UPDATED: {
    code: 200,
    message: 'Updated LeadBusiness with specified leadId and businessId.',
  },

  // Missing fields messages

  // Invalid fields messages

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getLeadBusinessMessage = (key: string): Message => {
  return messages[key];
};
