import Joi from 'joi';
import { ICityResponseAttributes } from './City.interface';
import { CityMessageKey, getCityMessage } from './City.messages';

export const CitySchema = Joi.object<ICityResponseAttributes>({
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
            errorResponse.error = getCityMessage(CityMessageKey.INVALID_CITY_ID).message;
            errorResponse.status = getCityMessage(CityMessageKey.INVALID_CITY_ID).code;
            break;
        }
        break;
      case 'name':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCityMessage(CityMessageKey.MISSING_CITY).message;
            errorResponse.status = getCityMessage(CityMessageKey.MISSING_CITY).code;
            break;
          case 'string.base':
            errorResponse.error = getCityMessage(CityMessageKey.INVALID_CITY_NAME).message;
            errorResponse.status = getCityMessage(CityMessageKey.INVALID_CITY_NAME).code;
            break;
        }
        break;
      case 'stateCode':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCityMessage(CityMessageKey.MISSING_STATE_CODE).message;
            errorResponse.status = getCityMessage(CityMessageKey.MISSING_STATE_CODE).code;
            break;
          case 'string.base':
            errorResponse.error = getCityMessage(CityMessageKey.INVALID_STATE_CODE).message;
            errorResponse.status = getCityMessage(CityMessageKey.INVALID_STATE_CODE).code;
            break;
        }
        break;
      case 'countryCode':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCityMessage(CityMessageKey.MISSING_COUNTRY_CODE).message;
            errorResponse.status = getCityMessage(CityMessageKey.MISSING_COUNTRY_CODE).code;
            break;
          case 'string.base':
            errorResponse.error = getCityMessage(CityMessageKey.INVALID_COUNTRY_CODE).message;
            errorResponse.status = getCityMessage(CityMessageKey.INVALID_COUNTRY_CODE).code;
            break;
        }
        break;
      case 'longitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getCityMessage(CityMessageKey.INVALID_CITY_LONGITUDE).message;
            errorResponse.status = getCityMessage(CityMessageKey.INVALID_CITY_LONGITUDE).code;
            break;
          case 'any.required':
            errorResponse.error = getCityMessage(CityMessageKey.MISSING_CITY_LONGITUDE).message;
            errorResponse.status = getCityMessage(CityMessageKey.MISSING_CITY_LONGITUDE).code;
            break;
        }
        break;
      case 'latitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getCityMessage(CityMessageKey.INVALID_CITY_LATITUDE).message;
            errorResponse.status = getCityMessage(CityMessageKey.INVALID_CITY_LATITUDE).code;
            break;
          case 'any.required':
            errorResponse.error = getCityMessage(CityMessageKey.MISSING_CITY_LATITUDE).message;
            errorResponse.status = getCityMessage(CityMessageKey.MISSING_CITY_LATITUDE).code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
