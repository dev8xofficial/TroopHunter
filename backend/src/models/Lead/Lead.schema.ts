import Joi from 'joi';
import { LeadAttributes } from './Lead.interface';
import { getLeadMessage } from './Lead.messages';

// Define the Joi schema for LeadAttributes
export const LeadSchema = Joi.object<LeadAttributes>({
  id: Joi.string(),
  userId: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': getLeadMessage('MISSING_USER_ID').message,
      'string.uuid': getLeadMessage('INVALID_USER_ID').message,
    }),
  businessIds: Joi.array().items(Joi.string().uuid()).optional(),
  title: Joi.string()
    .required()
    .messages({
      'any.required': getLeadMessage('MISSING_LEAD_TITLE').message,
    }),
  search: Joi.string().required(),
  phone: Joi.string(),
  sponsoredAd: Joi.boolean(),
  businessCount: Joi.number()
    .required()
    .messages({
      'any.required': getLeadMessage('MISSING_LEAD_BUSINESS_COUNT').message,
    }),
});

export const createErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {}; // Customize the error response format as needed
  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getLeadMessage('INVALID_USER_ID').message;
            errorResponse.status = getLeadMessage('INVALID_USER_ID').code;
            break;
        }
        break;
      case 'userId':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_USER_ID').message;
            errorResponse.status = getLeadMessage('MISSING_USER_ID').code;
            break;
          case 'string.uuid':
            errorResponse.error = getLeadMessage('INVALID_USER_ID').message;
            errorResponse.status = getLeadMessage('INVALID_USER_ID').code;
            break;
        }
        break;
      case 'businessIds':
        switch (
          errorDetail.type
          // Handle any required or validation errors for businessIds if needed...
        ) {
        }
        break;
      case 'title':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_LEAD_TITLE').message;
            errorResponse.status = getLeadMessage('MISSING_LEAD_TITLE').code;
            break;
        }
        break;
      case 'search':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_LEAD_SEARCH').message;
            errorResponse.status = getLeadMessage('MISSING_LEAD_SEARCH').code;
            break;
        }
        break;
      case 'phone':
        switch (
          errorDetail.type
          // Handle any required or validation errors for phone if needed...
        ) {
        }
        break;
      case 'sponsoredAd':
        switch (
          errorDetail.type
          // Handle any required or validation errors for sponsoredAd if needed...
        ) {
        }
        break;
      case 'businessCount':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_LEAD_BUSINESS_COUNT').message;
            errorResponse.status = getLeadMessage('MISSING_LEAD_BUSINESS_COUNT').code;
            break;
        }
        break;
      default:
        // Handle any other field-specific errors if needed...
        break;
    }
  });
  return errorResponse;
};
