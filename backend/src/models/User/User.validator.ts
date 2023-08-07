import Joi from 'joi';
import { IUserResponseAttributes } from './User.interface';
import { NextFunction, Request, Response } from 'express';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';

export const UserSchema = Joi.object<IUserResponseAttributes>({
  id: Joi.string().guid().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid('guest', 'user', 'admin').optional(),
});

export const userFetchRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UserSchema.validate(req.params, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (error) {
    const response: ApiResponse<null> = createApiResponse({
      error: error.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};

export const userCreationRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UserSchema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (error) {
    const response: ApiResponse<null> = createApiResponse({
      error: error.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};
