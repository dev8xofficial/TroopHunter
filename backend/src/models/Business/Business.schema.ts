import Joi from 'joi';
import { BusinessAttributes } from './Business.interface';
import { GeoPointSchema } from '../../schema/GeoPoint.schema';
import { getBusinessMessage } from './Business.messages';

export const BusinessSchema = Joi.object<BusinessAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  businessDomain: Joi.string(),
  categoryId: Joi.string(),
  address: Joi.string().required(),
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

export const createErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_BUSINESS_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_BUSINESS_ID').code;
            break;
        }
        break;
      case 'name':
        switch (errorDetail.type) {
          case 'string.empty':
            errorResponse.error = getBusinessMessage('MISSING_NAME').message;
            errorResponse.status = getBusinessMessage('MISSING_NAME').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessMessage('MISSING_NAME').message;
            errorResponse.status = getBusinessMessage('MISSING_NAME').code;
            break;
        }
        break;
      case 'businessDomain':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_BUSINESS_DOMAIN').message;
            errorResponse.status = getBusinessMessage('INVALID_BUSINESS_DOMAIN').code;
            break;
        }
        break;
      case 'categoryId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_CATEGORY_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_CATEGORY_ID').code;
            break;
        }
        break;
      case 'address':
        switch (errorDetail.type) {
          case 'string.empty':
            errorResponse.error = getBusinessMessage('MISSING_ADDRESS').message;
            errorResponse.status = getBusinessMessage('MISSING_ADDRESS').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessMessage('MISSING_ADDRESS').message;
            errorResponse.status = getBusinessMessage('MISSING_ADDRESS').code;
            break;
        }
        break;
      case 'cityId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_CITY_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_CITY_ID').code;
            break;
        }
        break;
      case 'stateId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_STATE_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_STATE_ID').code;
            break;
        }
        break;
      case 'countryId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_COUNTRY_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_COUNTRY_ID').code;
            break;
        }
        break;
      case 'longitude':
        switch (errorDetail.type) {
          case 'number.empty':
            errorResponse.error = getBusinessMessage('MISSING_LONGITUDE').message;
            errorResponse.status = getBusinessMessage('MISSING_LONGITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessMessage('MISSING_LONGITUDE').message;
            errorResponse.status = getBusinessMessage('MISSING_LONGITUDE').code;
            break;
        }
        break;
      case 'latitude':
        switch (errorDetail.type) {
          case 'number.empty':
            errorResponse.error = getBusinessMessage('MISSING_LATITUDE').message;
            errorResponse.status = getBusinessMessage('MISSING_LATITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessMessage('MISSING_LATITUDE').message;
            errorResponse.status = getBusinessMessage('MISSING_LATITUDE').code;
            break;
        }
        break;
      case 'geoPoint':
        switch (errorDetail.type) {
          case 'object.empty':
          case 'any.required':
            errorResponse.error = getBusinessMessage('MISSING_SOURCE').message;
            errorResponse.status = getBusinessMessage('MISSING_SOURCE').code;
            break;
        }
        break;
      case 'postalCodeId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_POSTAL_CODE_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_POSTAL_CODE_ID').code;
            break;
        }
        break;
      case 'phoneId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_PHONE_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_PHONE_ID').code;
            break;
        }
        break;
      case 'email':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_BUSINESS_EMAIL').message;
            errorResponse.status = getBusinessMessage('INVALID_BUSINESS_EMAIL').code;
            break;
        }
        break;
      case 'website':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_BUSINESS_WEBSITE').message;
            errorResponse.status = getBusinessMessage('INVALID_BUSINESS_WEBSITE').code;
            break;
        }
        break;
      case 'ratingId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_BUSINESS_RATING_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_BUSINESS_RATING_ID').code;
            break;
        }
        break;
      case 'reviews':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getBusinessMessage('INVALID_BUSINESS_REVIEWS').message;
            errorResponse.status = getBusinessMessage('INVALID_BUSINESS_REVIEWS').code;
            break;
        }
        break;
      case 'timezoneId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_TIMEZONE_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_TIMEZONE_ID').code;
            break;
        }
        break;
      case 'sourceId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_SOURCE_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_SOURCE_ID').code;
            break;
        }
        break;
      case 'socialMediaId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_SOCIAL_MEDIA_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_SOCIAL_MEDIA_ID').code;
            break;
        }
        break;
      case 'sponsoredAd':
        switch (errorDetail.type) {
          case 'boolean.base':
            errorResponse.error = getBusinessMessage('INVALID_SPONSORED_AD').message;
            errorResponse.status = getBusinessMessage('INVALID_SPONSORED_AD').code;
            break;
        }
        break;
      case 'openingHourId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_OPENING_HOUR_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_OPENING_HOUR_ID').code;
            break;
        }
        break;
      case 'closingHourId':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessMessage('INVALID_CLOSING_HOUR_ID').message;
            errorResponse.status = getBusinessMessage('INVALID_CLOSING_HOUR_ID').code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
