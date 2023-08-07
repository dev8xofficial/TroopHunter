import Joi from 'joi';
import { IBusinessClosingHourResponseAttributes } from './BusinessClosingHour.interface';

export const BusinessClosingHourSchema = Joi.object<IBusinessClosingHourResponseAttributes>({
  id: Joi.string(),
  time: Joi.string().optional(),
});
