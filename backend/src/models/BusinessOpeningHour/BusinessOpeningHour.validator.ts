import Joi from 'joi';
import { IBusinessOpeningHourResponseAttributes } from './BusinessOpeningHour.interface';

export const BusinessOpeningHourSchema = Joi.object<IBusinessOpeningHourResponseAttributes>({
  id: Joi.string(),
  time: Joi.string().optional(),
});
