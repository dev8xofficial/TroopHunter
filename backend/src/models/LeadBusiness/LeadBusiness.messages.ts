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
  MISSING_LEAD_BUSINESS_LEAD_ID: {
    code: 400,
    message: 'Failed to create/update LeadBusiness. Missing required field: Lead ID.',
  },
  MISSING_LEAD_BUSINESS_BUSINESS_ID: {
    code: 400,
    message: 'Failed to create/update LeadBusiness. Missing required field: Business ID.',
  },

  // Invalid fields messages
  INVALID_LEAD_BUSINESS_LEAD_ID: {
    code: 400,
    message: 'Invalid lead business lead ID. The lead ID provided is not in a valid format. Please provide a valid UUID for the lead ID.',
  },
  INVALID_LEAD_BUSINESS_BUSINESS_ID: {
    code: 400,
    message: 'Invalid lead business business ID. The business ID provided is not in a valid format. Please provide a valid UUID for the business ID.',
  },

  // Duplicate messages

  // Not found messages

  // Failure messages
};

export const getLeadBusinessMessage = (key: string): Message => {
  return messages[key];
};
