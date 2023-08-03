import Joi from 'joi';
import { BusinessOpeningHourAttributes } from './BusinessOpeningHour.interface';

export const BusinessOpeningHourSchema = Joi.object<BusinessOpeningHourAttributes>({
  id: Joi.string(),
  time: Joi.string().optional(),
});
