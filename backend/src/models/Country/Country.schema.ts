import Joi from 'joi';
import { CountryAttributes } from './Country.interface';
import { getCountryMessage } from './Country.messages';

export const CountrySchema = Joi.object<CountryAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  phoneCode: Joi.string().required(),
  currency: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

export const createCountryErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_ID').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_ID').code;
            break;
        }
        break;
      case 'name':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCountryMessage('MISSING_COUNTRY_NAME').message;
            errorResponse.status = getCountryMessage('MISSING_COUNTRY_NAME').code;
            break;
          case 'string.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_NAME').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_NAME').code;
            break;
        }
        break;
      case 'code':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getCountryMessage('MISSING_COUNTRY_CODE').message;
            errorResponse.status = getCountryMessage('MISSING_COUNTRY_CODE').code;
            break;
          case 'string.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_CODE').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_CODE').code;
            break;
        }
        break;
      case 'phoneCode':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_PHONE_CODE').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_PHONE_CODE').code;
            break;
          case 'any.required':
            errorResponse.error = getCountryMessage('MISSING_COUNTRY_PHONE_CODE').message;
            errorResponse.status = getCountryMessage('MISSING_COUNTRY_PHONE_CODE').code;
            break;
        }
        break;
      case 'currency':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_CURRENCY').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_CURRENCY').code;
            break;
          case 'any.required':
            errorResponse.error = getCountryMessage('MISSING_COUNTRY_CURRENCY').message;
            errorResponse.status = getCountryMessage('MISSING_COUNTRY_CURRENCY').code;
            break;
        }
        break;
      case 'longitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_LONGITUDE').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_LONGITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getCountryMessage('MISSING_COUNTRY_LONGITUDE').message;
            errorResponse.status = getCountryMessage('MISSING_COUNTRY_LONGITUDE').code;
            break;
        }
        break;
      case 'latitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getCountryMessage('INVALID_COUNTRY_LATITUDE').message;
            errorResponse.status = getCountryMessage('INVALID_COUNTRY_LATITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getCountryMessage('MISSING_COUNTRY_LATITUDE').message;
            errorResponse.status = getCountryMessage('MISSING_COUNTRY_LATITUDE').code;
            break;
        }
        break;
      default:
        break;
    }
  });

  return errorResponse;
};
