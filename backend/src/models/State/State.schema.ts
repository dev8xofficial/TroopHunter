import Joi from 'joi';
import { StateAttributes } from './State.interface';

export const StateSchema = Joi.object<StateAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});
