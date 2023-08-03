import Joi from 'joi';
import { TimezoneAttributes } from './Timezone.interface';

export const TimezoneSchema = Joi.object<TimezoneAttributes>({
  id: Joi.string(),
  timezoneName: Joi.string().required(),
  utcOffset: Joi.string().required(),
  dst: Joi.boolean().required(),
  dstOffset: Joi.string().required(),
  countryCode: Joi.string().required(),
});
