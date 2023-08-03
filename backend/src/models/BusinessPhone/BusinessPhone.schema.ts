import Joi from 'joi';
import { BusinessPhoneAttributes } from './BusinessPhone.interface';

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
