import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with the actual type of the user object
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authorizeUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userRole = req.user.role;

  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
