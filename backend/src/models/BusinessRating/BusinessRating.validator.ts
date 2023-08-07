import Joi from 'joi';
import { IBusinessRatingResponseAttributes } from './BusinessRating.interface';

export const BusinessRatingSchema = Joi.object<IBusinessRatingResponseAttributes>({
  id: Joi.string(),
  ratingValue: Joi.number().required(),
  description: Joi.string().optional(),
});
