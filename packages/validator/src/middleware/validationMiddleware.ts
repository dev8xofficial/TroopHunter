import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../interfaces/Response';

type RequestData = 'body' | 'params' | 'query';

const numberRegex = /^[+-]?\d+(\.\d+)?$/;
const booleanRegex = /^(true|false)$/i;

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join('.');

  return `${pathString}: ${message}`;
};

// Format the Zod error message with only the current error
export const formatZodError = (error: ZodError): { message: string; error: string } => {
  const { issues } = error;

  const currentIssue = issues[0];

  return { error: formatZodIssue(currentIssue), message: currentIssue.message };
};

const processQueryParams = (queryParams: Record<string, string | any>) => {
  const processedQuery: Record<string, any> = {};

  for (const key in queryParams) {
    const value = Array.isArray(queryParams[key]) ? queryParams[key][0] : queryParams[key];

    if (numberRegex.test(value)) {
      processedQuery[key] = parseFloat(value);
    } else if (booleanRegex.test(value)) {
      processedQuery[key] = value.toLowerCase() === 'true';
    } else {
      processedQuery[key] = value;
    }
  }

  return processedQuery;
};

const processParams = (params: Record<string, string>) => {
  const processedParams: Record<string, any> = {};

  for (const key in params) {
    const value = params[key];

    if (numberRegex.test(value)) {
      processedParams[key] = parseFloat(value);
    } else if (booleanRegex.test(value)) {
      processedParams[key] = value.toLowerCase() === 'true';
    } else {
      processedParams[key] = value;
    }
  }

  return processedParams;
};

const validationMiddleware = <T>(schema: ZodSchema<T>, requestData: RequestData) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestDataObject = requestData === 'query' ? processQueryParams(req.query) : requestData === 'params' ? processParams(req.params) : req[requestData];

    try {
      await schema.parseAsync(requestDataObject);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const descriptiveErrorMessage: { message: string; error: string } = formatZodError(error);
        const status = 400;

        const response: ApiResponse<null> = createApiResponse({
          message: descriptiveErrorMessage.message,
          error: descriptiveErrorMessage.error,
          status: status,
        });

        return res.status(status).json(response);
      }
      next(error);
    }
  };
};

export default validationMiddleware;
