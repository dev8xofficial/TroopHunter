import * as z from 'zod';
import { TimezoneSchema } from '../validators/Timezone';

type TimezoneAttributes = z.infer<typeof TimezoneSchema>;

export interface ITimezoneAttributes extends TimezoneAttributes {}
