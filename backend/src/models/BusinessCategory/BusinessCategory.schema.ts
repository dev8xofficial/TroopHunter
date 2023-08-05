import Joi from 'joi';
import { IBusinessCategoryResponseAttributes } from './BusinessCategory.interface';

export const BusinessCategorySchema = Joi.object<IBusinessCategoryResponseAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
});
