import Joi from 'joi';
import { CityAttributes } from './City.interface';

export const CitySchema = Joi.object<CityAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  stateCode: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});
