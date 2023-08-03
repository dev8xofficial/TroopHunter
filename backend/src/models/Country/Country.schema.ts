import Joi from 'joi';
import { CountryAttributes } from './Country.interface';

export const CountrySchema = Joi.object<CountryAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  phoneCode: Joi.string().required(),
  currency: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});
