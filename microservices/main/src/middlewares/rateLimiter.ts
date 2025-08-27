import { type Request, type Response, type NextFunction } from 'express';

export const rateLimiter = (limit: number): ((req: Request, res: Response, next: NextFunction) => void) => {
  let requestCount = 0;

  return (req: Request, res: Response, next: NextFunction): void => {
    requestCount++;
    if (requestCount > limit) {
      res.status(429).send('Too Many Requests');
    } else {
      next();
    }
  };
};
