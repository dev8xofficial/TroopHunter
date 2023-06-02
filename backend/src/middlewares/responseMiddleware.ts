// src/middlewares/responseMiddleware.ts

import { Request, Response, NextFunction } from 'express';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

type ResponseData = any; // Update this type to match the response data structure you expect

declare global {
  namespace Express {
    interface Response {
      sendSuccess: <T>(data: T) => Response;
    }
  }
}

const formatResponse = <T>(req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = function <T>(data: T) {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };
    res.json(response);
    return res;
  };

  next();
};

const removeSensitiveData = (data: ResponseData, sensitiveKeys: string[]): ResponseData => {
  const clone = JSON.parse(JSON.stringify(data));

  const removeSensitiveProps = (obj: any) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (sensitiveKeys.includes(key)) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            removeSensitiveProps(obj[key]);
          }
        }
      }
    }
  };

  removeSensitiveProps(clone);

  return clone;
};

const sanitizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  // Whitelisted properties
  const sensitiveKeys = ['password'];

  res.json = function (data: ResponseData) {
    const modifiedData = removeSensitiveData(data, sensitiveKeys);
    return originalJson.call(this, modifiedData) as Response; // Cast the result to Response type
  };

  next();
};

export { formatResponse, sanitizeResponse };
