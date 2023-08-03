import { BusinessAttributes } from './business';
import Joi from 'joi';

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'longitude' | 'latitude' | 'geoPoint' | 'phoneId' | 'photos' | 'sourceId' | 'socialMedia'> {
  id?: string;
  userId: string;
  businessIds?: string[];
  title: string;
  search: string;
  phone?: string;
  sponsoredAd?: boolean;
  businessCount: number;
}

// Define the Joi schema for LeadAttributes
export const leadSchema = Joi.object<LeadAttributes>({
  id: Joi.string(),
  userId: Joi.string().uuid().required(),
  businessIds: Joi.array().items(Joi.string().uuid()).optional(),
  title: Joi.string().required(),
  search: Joi.string().required(),
  phone: Joi.string(),
  sponsoredAd: Joi.boolean(),
  businessCount: Joi.number().required(),
});
