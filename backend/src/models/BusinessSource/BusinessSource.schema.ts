import Joi from 'joi';
import { BusinessSourceAttributes } from './BusinessSource.interface';

export const businessSourceSchema = Joi.object<BusinessSourceAttributes>({
  id: Joi.string(),
  sourceName: Joi.string().required(),
});
