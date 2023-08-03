import Joi from 'joi';
import { BusinessCategoryAttributes } from './BusinessCategory.interface';

export const BusinessCategorySchema = Joi.object<BusinessCategoryAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
});
