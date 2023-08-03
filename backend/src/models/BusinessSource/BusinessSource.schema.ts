import Joi from 'joi';
import { BusinessSourceAttributes } from './BusinessSource.interface';

export const BusinessSourceSchema = Joi.object<BusinessSourceAttributes>({
  id: Joi.string(),
  sourceName: Joi.string().required(),
});
