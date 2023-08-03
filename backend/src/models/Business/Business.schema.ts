import Joi from 'joi';
import { BusinessAttributes } from './Business.interface';
import { GeoPointSchema } from '../../schema/GeoPoint.schema';

export const BusinessSchema = Joi.object<BusinessAttributes>({
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
  geoPoint: GeoPointSchema.required(),
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
