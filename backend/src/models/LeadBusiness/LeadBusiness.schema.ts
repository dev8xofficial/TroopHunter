import Joi from 'joi';
import { LeadBusinessAttributes } from './LeadBusiness.interface';
import { getLeadBusinessMessage } from './LeadBusiness.messages';

export const LeadBusinessSchema = Joi.object<LeadBusinessAttributes>({
  leadId: Joi.string()
    .required()
    .messages({
      'any.required': getLeadBusinessMessage('MISSING_LEAD_ID').message,
    }),
  businessId: Joi.string()
    .required()
    .messages({
      'any.required': getLeadBusinessMessage('MISSING_BUSINESS_ID').message,
    }),
});
