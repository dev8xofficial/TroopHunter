import * as z from 'zod';
import { RequestSchema } from '../validators/Request';

type RequestAttributes = z.infer<typeof RequestSchema>;

export interface IRequestAttributes extends RequestAttributes {}
