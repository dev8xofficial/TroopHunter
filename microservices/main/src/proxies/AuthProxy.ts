import { type RequestHandler, type Request } from 'express';
import { createProxyMiddleware, type Options } from 'http-proxy-middleware';

const proxyOptions: Options = {
  target: process.env.AUTH_MICROSERVICE_URL ?? 'http://localhost:50005',
  changeOrigin: true,
  secure: false,
  pathRewrite: function (path: string, req): string {
    const expressRequest = req as Request;
    return expressRequest.originalUrl;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const authProxyMiddleware = createProxyMiddleware(proxyOptions) as RequestHandler;
