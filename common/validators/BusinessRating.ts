import Joi from 'joi';
import { IBusinessRatingResponseAttributes } from '../interfaces/BusinessRating';

export const BusinessRatingSchema = Joi.object<IBusinessRatingResponseAttributes>({
  id: Joi.string().guid().required(),
  ratingValue: Joi.number().required(),
  description: Joi.string().optional(),
});
