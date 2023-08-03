import Joi from 'joi';
import { BusinessPhoneAttributes } from './BusinessPhone.interface';
import { getBusinessPhoneMessage } from './BusinessPhone.messages';

export const BusinessPhoneSchema = Joi.object<BusinessPhoneAttributes>({
  id: Joi.string(),
  countryCode: Joi.string()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_COUNTRY_CODE').message,
    }),
  regionCode: Joi.string()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_REGION_CODE').message,
    }),
  number: Joi.string()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NUMBER').message,
    }),
  numberNationalFormatted: Joi.string()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NATIONAL_FORMATTED').message,
    }),
  numberInternationalFormatted: Joi.string()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_INTERNATIONAL_FORMATTED').message,
    }),
  numberType: Joi.string()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_NUMBER_TYPE').message,
    }),
  isValid: Joi.boolean()
    .required()
    .messages({
      'any.required': getBusinessPhoneMessage('MISSING_BUSINESS_PHONE_IS_VALID').message,
    }),
});
