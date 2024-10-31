import * as z from 'zod';

import validationMiddleware from '../middleware/validationMiddleware';

export const RequestSchema = z.object({
  include: z.string().nonempty(),
});

export const RequestValidationMiddleware = validationMiddleware(RequestSchema, 'query');
