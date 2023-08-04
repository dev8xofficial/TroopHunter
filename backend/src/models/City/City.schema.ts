import Joi from 'joi';
import { CityAttributes } from './City.interface';
import { getCityMessage } from './City.messages';

export const CitySchema = Joi.object<CityAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  stateCode: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

export const createCityErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getCityMessage('INVALID_CITY_ID').message;
            errorResponse.status = getCityMessage('INVALID_CITY_ID').code;
            break;
        }
        break;
      case 'name':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCityMessage('MISSING_CITY').message;
            errorResponse.status = getCityMessage('MISSING_CITY').code;
            break;
          case 'string.base':
            errorResponse.error = getCityMessage('INVALID_CITY_NAME').message;
            errorResponse.status = getCityMessage('INVALID_CITY_NAME').code;
            break;
        }
        break;
      case 'stateCode':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCityMessage('MISSING_STATE_CODE').message;
            errorResponse.status = getCityMessage('MISSING_STATE_CODE').code;
            break;
          case 'string.base':
            errorResponse.error = getCityMessage('INVALID_STATE_CODE').message;
            errorResponse.status = getCityMessage('INVALID_STATE_CODE').code;
            break;
        }
        break;
      case 'countryCode':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCityMessage('MISSING_COUNTRY_CODE').message;
            errorResponse.status = getCityMessage('MISSING_COUNTRY_CODE').code;
            break;
          case 'string.base':
            errorResponse.error = getCityMessage('INVALID_COUNTRY_CODE').message;
            errorResponse.status = getCityMessage('INVALID_COUNTRY_CODE').code;
            break;
        }
        break;
      case 'longitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getCityMessage('INVALID_CITY_LONGITUDE').message;
            errorResponse.status = getCityMessage('INVALID_CITY_LONGITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getCityMessage('MISSING_CITY_LONGITUDE').message;
            errorResponse.status = getCityMessage('MISSING_CITY_LONGITUDE').code;
            break;
        }
        break;
      case 'latitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getCityMessage('INVALID_CITY_LATITUDE').message;
            errorResponse.status = getCityMessage('INVALID_CITY_LATITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getCityMessage('MISSING_CITY_LATITUDE').message;
            errorResponse.status = getCityMessage('MISSING_CITY_LATITUDE').code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
