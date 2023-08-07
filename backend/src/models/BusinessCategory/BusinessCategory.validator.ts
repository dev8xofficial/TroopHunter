import Joi from 'joi';
import { IBusinessCategoryResponseAttributes } from './BusinessCategory.interface';

export const BusinessCategorySchema = Joi.object<IBusinessCategoryResponseAttributes>({
  id: Joi.string().guid().required(),
  name: Joi.string().required(),
});
