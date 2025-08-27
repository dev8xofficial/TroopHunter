import type * as z from 'zod';

import { type RequestSchema } from '../validators/Request';

type RequestAttributes = z.infer<typeof RequestSchema>;

export interface IRequestAttributes extends RequestAttributes {}
