import Joi from 'joi';
import { IBusinessSourceResponseAttributes } from './BusinessSource.interface';

export const BusinessSourceSchema = Joi.object<IBusinessSourceResponseAttributes>({
  id: Joi.string().guid().required(),
  sourceName: Joi.string().required(),
});
