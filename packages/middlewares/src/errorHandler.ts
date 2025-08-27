import { getSystemMessage, SystemMessageKey } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse } from '@repo/validator';
import { type NextFunction, type Request, type Response } from 'express';

// eslint-disable-next-line @typescript-eslint/require-await
export const errorHandler = async (err: unknown, req: Request, res: Response, next: NextFunction): Promise<Response> => {
  logger.error('Internal Server Error:', err);

  const response: ApiResponse<null> = createApiResponse({ error: getSystemMessage(SystemMessageKey.SYSTEM_FAILED).message, status: getSystemMessage(SystemMessageKey.SYSTEM_FAILED).code });
  return res.json(response);
};
