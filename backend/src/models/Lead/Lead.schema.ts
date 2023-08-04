import Joi from 'joi';
import { LeadAttributes } from './Lead.interface';
import { getLeadMessage } from './Lead.messages';
import { BusinessSchema } from '../Business/Business.schema';

export const LeadSchema = BusinessSchema.append<LeadAttributes>({
  id: Joi.string(),
  userId: Joi.string().uuid().required(),
  businessIds: Joi.array().items(Joi.string().uuid()).optional(),
  title: Joi.string().required(),
  search: Joi.string().required(),
  phone: Joi.string(),
  sponsoredAd: Joi.boolean(),
  businessCount: Joi.number().required(),
}).fork(['name', 'address', 'longitude', 'latitude', 'geoPoint', 'phoneId', 'sourceId'], (schema) => schema.optional());

export const createLeadErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getLeadMessage('INVALID_LEAD_ID').message;
            errorResponse.status = getLeadMessage('INVALID_LEAD_ID').code;
            break;
        }
        break;
      case 'userId':
        switch (errorDetail.type) {
          case 'string.uuid':
            errorResponse.error = getLeadMessage('INVALID_USER_ID').message;
            errorResponse.status = getLeadMessage('INVALID_USER_ID').code;
            break;
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_USER_ID').message;
            errorResponse.status = getLeadMessage('MISSING_USER_ID').code;
            break;
        }
        break;
      case 'businessIds':
        switch (errorDetail.type) {
          case 'array.base':
            errorResponse.error = getLeadMessage('INVALID_BUSINESS_IDS').message;
            errorResponse.status = getLeadMessage('INVALID_BUSINESS_IDS').code;
            break;
        }
        break;
      case 'title':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getLeadMessage('INVALID_LEAD_TITLE').message;
            errorResponse.status = getLeadMessage('INVALID_LEAD_TITLE').code;
            break;
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_LEAD_TITLE').message;
            errorResponse.status = getLeadMessage('MISSING_LEAD_TITLE').code;
            break;
        }
        break;
      case 'search':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getLeadMessage('INVALID_LEAD_SEARCH').message;
            errorResponse.status = getLeadMessage('INVALID_LEAD_SEARCH').code;
            break;
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_LEAD_SEARCH').message;
            errorResponse.status = getLeadMessage('MISSING_LEAD_SEARCH').code;
            break;
        }
        break;
      case 'phone':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getLeadMessage('INVALID_LEAD_PHONE').message;
            errorResponse.status = getLeadMessage('INVALID_LEAD_PHONE').code;
            break;
        }
        break;
      case 'sponsoredAd':
        switch (errorDetail.type) {
          case 'boolean.base':
            errorResponse.error = getLeadMessage('INVALID_LEAD_SPONSORED_AD').message;
            errorResponse.status = getLeadMessage('INVALID_LEAD_SPONSORED_AD').code;
            break;
        }
        break;
      case 'businessCount':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getLeadMessage('INVALID_LEAD_BUSINESS_COUNT').message;
            errorResponse.status = getLeadMessage('INVALID_LEAD_BUSINESS_COUNT').code;
            break;
          case 'any.required':
            errorResponse.error = getLeadMessage('MISSING_LEAD_BUSINESS_COUNT').message;
            errorResponse.status = getLeadMessage('MISSING_LEAD_BUSINESS_COUNT').code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
