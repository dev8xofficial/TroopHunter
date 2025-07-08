import { type RequestHandler, type Request } from 'express';
import { createProxyMiddleware, type Options } from 'http-proxy-middleware';

const proxyOptions: Options = {
  target: process.env.USERS_MICROSERVICE_URL,
  changeOrigin: true,
  secure: false,
  pathRewrite: function (path: string, req): string {
    const expressRequest = req as Request;
    return expressRequest.originalUrl;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const usersProxyMiddleware = createProxyMiddleware(proxyOptions) as RequestHandler;
