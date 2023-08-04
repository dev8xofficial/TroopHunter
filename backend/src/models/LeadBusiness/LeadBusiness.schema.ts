import Joi from 'joi';
import { LeadBusinessAttributes } from './LeadBusiness.interface';
import { getLeadBusinessMessage } from './LeadBusiness.messages';

export const LeadBusinessSchema = Joi.object<LeadBusinessAttributes>({
  leadId: Joi.string().required(),
  businessId: Joi.string().required(),
});

export const createLeadBusinessErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'leadId':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getLeadBusinessMessage('MISSING_LEAD_BUSINESS_LEAD_ID').message;
            errorResponse.status = getLeadBusinessMessage('MISSING_LEAD_BUSINESS_LEAD_ID').code;
            break;
          case 'string.base':
            errorResponse.error = getLeadBusinessMessage('INVALID_LEAD_BUSINESS_LEAD_ID').message;
            errorResponse.status = getLeadBusinessMessage('INVALID_LEAD_BUSINESS_LEAD_ID').code;
            break;
        }
        break;
      case 'businessId':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getLeadBusinessMessage('MISSING_LEAD_BUSINESS_BUSINESS_ID').message;
            errorResponse.status = getLeadBusinessMessage('MISSING_LEAD_BUSINESS_BUSINESS_ID').code;
            break;
          case 'string.base':
            errorResponse.error = getLeadBusinessMessage('INVALID_LEAD_BUSINESS_BUSINESS_ID').message;
            errorResponse.status = getLeadBusinessMessage('INVALID_LEAD_BUSINESS_BUSINESS_ID').code;
            break;
        }
        break;
      default:
        break;
    }
  });

  return errorResponse;
};
