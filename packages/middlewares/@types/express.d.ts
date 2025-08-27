import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      client?: {
        authorized?: boolean;
        // Add other properties as needed
      };
    }
  }
}
