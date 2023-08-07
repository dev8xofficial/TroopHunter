import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../types/Response.interface';
import { IUserRequestAttributes } from '../models/User/User.interface';

export const AuthSchema = Joi.object<IUserRequestAttributes>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const authLoginRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = AuthSchema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (error) {
    const response: ApiResponse<null> = createApiResponse({
      error: error.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};
