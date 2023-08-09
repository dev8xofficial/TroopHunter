import Joi from 'joi';
import { GeoPointAttributes } from '../interfaces/GeoPoint';

export const GeoPointSchema = Joi.object<GeoPointAttributes>({
  type: Joi.string().required(),
  coordinates: Joi.array().items(Joi.number()).required(),
});
