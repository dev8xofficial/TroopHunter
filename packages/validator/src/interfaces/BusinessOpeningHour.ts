import type * as z from 'zod';

import { type BusinessOpeningHourSchema } from '../validators/BusinessOpeningHour';

type BusinessOpeningHourAttributes = z.infer<typeof BusinessOpeningHourSchema>;

export interface IBusinessOpeningHourAttributes extends BusinessOpeningHourAttributes {}
