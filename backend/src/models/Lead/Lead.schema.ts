import Joi from 'joi';
import { LeadAttributes } from '../../types/lead';

// Define the Joi schema for LeadAttributes
export const LeadSchema = Joi.object<LeadAttributes>({
  id: Joi.string(),
  userId: Joi.string().uuid().required(),
  businessIds: Joi.array().items(Joi.string().uuid()).optional(),
  title: Joi.string().required(),
  search: Joi.string().required(),
  phone: Joi.string(),
  sponsoredAd: Joi.boolean(),
  businessCount: Joi.number().required(),
});
