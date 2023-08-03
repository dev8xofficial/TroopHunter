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
  MISSING_LEAD_ID: {
    code: 400,
    message: 'Lead ID is required for LeadBusiness.',
  },
  MISSING_BUSINESS_ID: {
    code: 400,
    message: 'Business ID is required for LeadBusiness.',
  },

  // Invalid fields messages

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getLeadBusinessMessage = (key: string): Message => {
  return messages[key];
};
