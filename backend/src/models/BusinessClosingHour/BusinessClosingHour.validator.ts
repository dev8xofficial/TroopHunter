import Joi from 'joi';
import { IBusinessClosingHourResponseAttributes } from './BusinessClosingHour.interface';

export const BusinessClosingHourSchema = Joi.object<IBusinessClosingHourResponseAttributes>({
  id: Joi.string().guid().required(),
  time: Joi.string().optional(),
});
