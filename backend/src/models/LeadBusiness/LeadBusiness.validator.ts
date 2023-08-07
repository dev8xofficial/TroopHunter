import Joi from 'joi';
import { LeadBusinessAttributes } from './LeadBusiness.interface';
import validationMiddleware from '../../middlewares/validationMiddleware';

export const LeadBusinessSchema = Joi.object<LeadBusinessAttributes>({
  leadId: Joi.string().guid().required(),
  businessId: Joi.string().guid().required(),
});

export const LeadBusinessFetchOrUpdateRequestSchema = LeadBusinessSchema.keys({
  leadId: Joi.optional(),
  businessId: Joi.optional(),
});

export const LeadBusinessFetchByIdRequestSchema = LeadBusinessSchema.keys({
  businessId: Joi.optional(),
});

export const leadBusinessFetchRequestValidationMiddleware = validationMiddleware(LeadBusinessFetchOrUpdateRequestSchema, 'query');
export const leadBusinessFetchByIdRequestValidationMiddleware = validationMiddleware(LeadBusinessSchema, 'params');
export const leadBusinessUpdateRequestValidationMiddleware = validationMiddleware(LeadBusinessFetchOrUpdateRequestSchema, 'body');
