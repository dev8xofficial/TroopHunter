import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../types/Response.interface';

type RequestData = 'body' | 'params' | 'query';

const validationMiddleware = <T>(schema: Schema<T>, requestData: RequestData) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestDataObject = req[requestData];
    const { error } = schema.validate(requestDataObject, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      errors: { escapeHtml: true },
    });

    if (error) {
      const response: ApiResponse<null> = createApiResponse({
        error: error.details[0].message,
        status: 400,
      });
      return res.json(response);
    }

    next();
  };
};

export default validationMiddleware;
