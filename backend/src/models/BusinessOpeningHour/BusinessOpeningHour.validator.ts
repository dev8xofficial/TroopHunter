import Joi from 'joi';
import { IBusinessOpeningHourResponseAttributes } from './BusinessOpeningHour.interface';

export const BusinessOpeningHourSchema = Joi.object<IBusinessOpeningHourResponseAttributes>({
  id: Joi.string().guid().required(),
  time: Joi.string().optional(),
});
