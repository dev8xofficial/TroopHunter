import Joi from 'joi';
import { ILeadAttributesResponseAttributes } from '../interfaces/Lead';
import { BusinessSchema } from './Business';
import validationMiddleware from '../middleware/validationMiddleware';

export const LeadSchema = BusinessSchema.append<ILeadAttributesResponseAttributes>({
  id: Joi.string().guid().required(),
  userId: Joi.string().uuid().required(),
  businessIds: Joi.array().items(Joi.string().uuid()).optional(),
  title: Joi.string().required(),
  search: Joi.string().required(),
  phone: Joi.string(),
  sponsoredAd: Joi.boolean(),
  businessCount: Joi.number().required(),
}).fork(['name', 'address', 'longitude', 'latitude', 'geoPoint', 'phoneId', 'sourceId'], (schema) => schema.optional());

export const LeadFetchOrUpdateRequestSchema = LeadSchema.keys({
  id: Joi.optional(),
  userId: Joi.optional(),
  businessIds: Joi.optional(),
  title: Joi.optional(),
  search: Joi.optional(),
  phone: Joi.optional(),
  sponsoredAd: Joi.optional(),
  businessCount: Joi.optional(),
});

export const LeadFetchByIdRequestSchema = LeadSchema.keys({
  userId: Joi.optional(),
  businessIds: Joi.optional(),
  title: Joi.optional(),
  search: Joi.optional(),
  phone: Joi.optional(),
  sponsoredAd: Joi.optional(),
  businessCount: Joi.optional(),
});

export const LeadCreateRequestSchema = LeadSchema.keys({
  id: Joi.optional(),
});

interface ILeadBulkDeleteAttributes {
  ids: string[];
}

export const LeadBuldDeleteRequestSchema = LeadSchema.append<ILeadBulkDeleteAttributes>({
  ids: Joi.array().items(Joi.string().guid().required()).required(),
}).fork(['id', 'userId', 'businessIds', 'title', 'search', 'phone', 'sponsoredAd', 'businessCount'], (schema) => schema.optional());

export const leadFetchRequestValidationMiddleware = validationMiddleware(LeadFetchOrUpdateRequestSchema, 'query');
export const leadFetchByIdRequestValidationMiddleware = validationMiddleware(LeadFetchByIdRequestSchema, 'params');
export const leadCreateRequestValidationMiddleware = validationMiddleware(LeadCreateRequestSchema, 'body');
export const leadUpdateRequestValidationMiddleware = validationMiddleware(LeadFetchOrUpdateRequestSchema, 'body');
export const leadBulkDeleteRequestValidationMiddleware = validationMiddleware(LeadBuldDeleteRequestSchema, 'body');
