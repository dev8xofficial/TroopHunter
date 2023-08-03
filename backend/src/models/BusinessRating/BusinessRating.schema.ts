import Joi from 'joi';
import { BusinessRatingAttributes } from './BusinessRating.interface';

export const BusinessRatingSchema = Joi.object<BusinessRatingAttributes>({
  id: Joi.string(),
  ratingValue: Joi.number().required(),
  description: Joi.string().optional(),
});
