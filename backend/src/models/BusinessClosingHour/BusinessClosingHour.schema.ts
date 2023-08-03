import Joi from 'joi';
import { BusinessClosingHourAttributes } from './BusinessClosingHour.interface';

export const BusinessClosingHourSchema = Joi.object<BusinessClosingHourAttributes>({
  id: Joi.string(),
  time: Joi.string().optional(),
});
