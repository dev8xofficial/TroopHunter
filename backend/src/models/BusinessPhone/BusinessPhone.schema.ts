import Joi from 'joi';
import { BusinessPhoneAttributes } from './BusinessPhone.interface';
import { getBusinessPhoneMessage } from './BusinessPhone.messages';

export const BusinessPhoneSchema = Joi.object<BusinessPhoneAttributes>({
  id: Joi.string(),
  countryCode: Joi.string().required(),
  regionCode: Joi.string().required(),
  number: Joi.string().required(),
  numberNationalFormatted: Joi.string().required(),
  numberInternationalFormatted: Joi.string().required(),
  numberType: Joi.string().required(),
  isValid: Joi.boolean().required(),
});

export const createBusinessPhoneErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_ID').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_ID').code;
            break;
        }
        break;
      case 'countryCode':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_COUNTRY_CODE').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_COUNTRY_CODE').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_COUNTRY_CODE').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_COUNTRY_CODE').code;
            break;
        }
        break;
      case 'regionCode':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_REGION_CODE').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_REGION_CODE').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_REGION_CODE').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_REGION_CODE').code;
            break;
        }
        break;
      case 'number':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_NUMBER').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_NUMBER').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NUMBER').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NUMBER').code;
            break;
        }
        break;
      case 'numberNationalFormatted':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_NATIONAL_FORMATTED').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_NATIONAL_FORMATTED').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED').code;
            break;
        }
        break;
      case 'numberInternationalFormatted':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_INTERNATIONAL_FORMATTED').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_INTERNATIONAL_FORMATTED').code;
            break;
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED').code;
            break;
        }
        break;
      case 'numberType':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_TYPE').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_TYPE').code;
            break;
          case 'string.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_NUMBER_TYPE').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_NUMBER_TYPE').code;
            break;
        }
        break;
      case 'isValid':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_VALIDITY').message;
            errorResponse.status = getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_VALIDITY').code;
            break;
          case 'boolean.base':
            errorResponse.error = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_IS_VALID').message;
            errorResponse.status = getBusinessPhoneMessage('INVALID_BUSINESS_PHONE_IS_VALID').code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
