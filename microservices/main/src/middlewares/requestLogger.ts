import { logger } from '@repo/utils';
import { type Request, type Response, type NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  const getIpAddress = (req: Request): string => {
    if (req.ip != null) {
      return req.ip;
    }
    return req.socket?.remoteAddress ?? 'Unknown IP';
  };

  const ip = getIpAddress(req);
  const params = JSON.stringify(req.params);
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);

  const logMessage = `Request received at ${timestamp}: ${method} ${url} from IP: ${ip} with params: ${params}, query: ${query} and body: ${body}`;

  logger.info(logMessage);
  next();
};
