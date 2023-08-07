import Joi from 'joi';
import { LeadBusinessAttributes } from './LeadBusiness.interface';
import { NextFunction, Request, Response } from 'express';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';

export const LeadBusinessSchema = Joi.object<LeadBusinessAttributes>({
  leadId: Joi.string().guid().required(),
  businessId: Joi.string().guid().required(),
});

export const leadBusinessesRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = LeadBusinessSchema.validate(req.params, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (error) {
    const response: ApiResponse<null> = createApiResponse({
      error: error.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};
