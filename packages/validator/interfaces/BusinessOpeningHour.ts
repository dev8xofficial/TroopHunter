import * as z from 'zod';
import { BusinessOpeningHourSchema } from '../validators/BusinessOpeningHour';

type BusinessOpeningHourAttributes = z.infer<typeof BusinessOpeningHourSchema>;

export interface IBusinessOpeningHourAttributes extends BusinessOpeningHourAttributes {}
