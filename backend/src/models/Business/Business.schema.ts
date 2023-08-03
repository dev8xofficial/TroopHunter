import Joi from 'joi';
import { BusinessAttributes } from './Business.interface';
import { GeoPointSchema } from '../../schema/GeoPoint.schema';
import { getBusinessMessage } from './Business.messages';

export const BusinessSchema = Joi.object<BusinessAttributes>({
  id: Joi.string(),
  name: Joi.string()
    .required()
    .messages({
      'string.empty': getBusinessMessage('MISSING_NAME').message,
      'any.required': getBusinessMessage('MISSING_NAME').message,
    }),
  businessDomain: Joi.string(),
  categoryId: Joi.string(),
  address: Joi.string()
    .required()
    .messages({
      'string.empty': getBusinessMessage('MISSING_ADDRESS').message,
      'any.required': getBusinessMessage('MISSING_ADDRESS').message,
    }),
  cityId: Joi.string(),
  stateId: Joi.string(),
  countryId: Joi.string(),
  longitude: Joi.number()
    .required()
    .messages({
      'number.empty': getBusinessMessage('MISSING_LONGITUDE').message,
      'any.required': getBusinessMessage('MISSING_LONGITUDE').message,
    }),
  latitude: Joi.number()
    .required()
    .messages({
      'number.empty': getBusinessMessage('MISSING_LATITUDE').message,
      'any.required': getBusinessMessage('MISSING_LATITUDE').message,
    }),
  geoPoint: GeoPointSchema.required().messages({
    'object.empty': getBusinessMessage('MISSING_SOURCE').message,
    'any.required': getBusinessMessage('MISSING_SOURCE').message,
  }),
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
