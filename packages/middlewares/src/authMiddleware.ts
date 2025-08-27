/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { AuthMessageKey, getAuthMessage } from '@repo/messages';
import { type IVerifyUserToken, verifyUserToken } from '@repo/services';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IUserAttributes } from '@repo/validator';
import { type Request, type Response, type NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    if (req?.client != null) {
      if (req?.client?.authorized ?? false) {
        next();
        return;
      }
    }
  } catch (error) {
    console.error('Error calling Auth service:', error);
  }

  const token = req.headers.authorization?.split(' ')[1];
  const requestPayload: IVerifyUserToken = {
    headers: {
      ...(token != null ? { Authorization: req.headers.authorization } : {}),
    },
  };
  const userToken: ApiResponse<null> = await verifyUserToken(requestPayload);

  try {
    if (userToken.success ?? false) next();
    else {
      const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).code });
      return res.json(response);
    }
  } catch (error) {
    logger.error('Access denied: Invalid access token:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).code });
    return res.json(response);
  }
};

interface AuthorizeUserRequest extends Request {
  user: IUserAttributes;
}

export const authorizeUser = (req: AuthorizeUserRequest, res: Response, next: NextFunction): void => {
  const userRole = req.user.role;

  if (userRole !== 'admin') {
    logger.error('Access denied: User is not authorized');
    res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
