import * as z from 'zod';
import { BusinessClosingHourSchema } from '../validators/BusinessClosingHour';

type BusinessClosingHourAttributes = z.infer<typeof BusinessClosingHourSchema>;

export interface IBusinessClosingHourAttributes extends BusinessClosingHourAttributes {}
