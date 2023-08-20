import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import UserToken from '../models/UserToken';
import { createApiResponse } from 'validator/utils';
import { ApiResponse } from 'validator/interfaces';
import { AuthMessageKey, getAuthMessage } from '../messages/Auth';

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with the actual type of the user object
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userToken: UserToken | null = await UserToken.findOne({ where: { accessToken: token } });

  if (!token) {
    logger.error(getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).message);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).code });
    return res.json(response);
  }

  if (userToken === null) {
    logger.error(getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).message);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).code });
    return res.json(response);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '');
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Access denied: Invalid access token:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).code });
    return res.json(response);
  }
};

export const authorizeUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userRole = req.user.role;

  if (userRole !== 'admin') {
    logger.error('Access denied: User is not authorized');
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
