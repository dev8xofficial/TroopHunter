import { logger } from '@repo/utils';
import { type Request, type Response, type NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  logger.warn('Resource not found:', req.originalUrl);
  res.status(404).json({ error: 'Not Found' });
};
