import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import UserToken from '../models/UserToken';

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with the actual type of the user object
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userToken: UserToken | null = await UserToken.findOne({ where: { accessToken: token } });

  if (!token || userToken === null) {
    logger.error('Access denied: Authentication token not found');
    return res.status(406).json({ error: 'Access denied: Authentication token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '');
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Error authenticating user:', error);
    return res.status(406).json({ error: 'Access denied: You are not authorized to perform this action.' });
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
