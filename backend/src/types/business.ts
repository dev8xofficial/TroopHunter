import { GeoPointAttributes, geoPointSchema } from './geoPoint';
import Joi from 'joi';

export interface BusinessAttributes {
  id?: string;
  name: string;
  businessDomain?: string;
  categoryId?: string;
  address?: string;
  cityId?: string;
  stateId?: string;
  countryId?: string;
  longitude: number;
  latitude: number;
  geoPoint: GeoPointAttributes;
  postalCodeId?: string;
  phoneId?: string;
  email?: string;
  website?: string;
  ratingId?: string;
  reviews?: number;
  timezoneId?: string;
  sourceId?: string;
  socialMediaId?: string;
  sponsoredAd?: boolean;
  openingHourId?: string;
  closingHourId?: string;
}

// Define the Joi schema for BusinessAttributes
export const businessSchema = Joi.object<BusinessAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  businessDomain: Joi.string(),
  categoryId: Joi.string(),
  address: Joi.string(),
  cityId: Joi.string(),
  stateId: Joi.string(),
  countryId: Joi.string(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  geoPoint: geoPointSchema.required(),
  postalCodeId: Joi.string(),
  phoneId: Joi.string(),
  email: Joi.string(),
  website: Joi.string(),
  ratingId: Joi.string(),
  reviews: Joi.number(),
  timezoneId: Joi.string(),
  sourceId: Joi.string(),
  socialMediaId: Joi.string(),
  sponsoredAd: Joi.boolean(),
  openingHourId: Joi.string(),
  closingHourId: Joi.string(),
});
