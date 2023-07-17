import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  logger.warn('Resource not found:', req.originalUrl);
  res.status(404).json({ error: 'Not Found' });
};

export default notFoundHandler;
