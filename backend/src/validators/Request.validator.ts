import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../types/Response.interface';

export interface RequestAttributes {
  include: string[];
}

export const RequestSchema = Joi.object<RequestAttributes>({
  include: Joi.array().items(Joi.string()).required(),
});

export const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error: paginationError } = RequestSchema.validate(req.query, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (paginationError) {
    const response: ApiResponse<null> = createApiResponse({
      error: paginationError.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};
