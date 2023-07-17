import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
