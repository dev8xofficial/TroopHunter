import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../interfaces/Response';
import { PaginationAttributes } from '../interfaces/Pagination';

export const PaginationSchema = Joi.object<PaginationAttributes>({
  page: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1).max(100).required(),
});

export const paginationRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error: paginationError } = PaginationSchema.validate(req.query, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (paginationError) {
    const response: ApiResponse<null> = createApiResponse({
      error: paginationError.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};
