import type * as z from 'zod';

import { type BusinessClosingHourSchema } from '../validators/BusinessClosingHour';

type BusinessClosingHourAttributes = z.infer<typeof BusinessClosingHourSchema>;

export interface IBusinessClosingHourAttributes extends BusinessClosingHourAttributes {}
