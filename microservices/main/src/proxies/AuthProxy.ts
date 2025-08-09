import type { IncomingMessage, ServerResponse } from 'http';

import { type RequestHandler, type Request } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Options } from 'http-proxy-middleware';

const proxyOptions: Options<IncomingMessage, ServerResponse> = {
  target: process.env.AUTH_MICROSERVICE_URL ?? 'http://localhost:50005',
  changeOrigin: true,
  secure: false,
  pathRewrite: function (path: string, req) {
    const expressRequest = req as Request;
    return expressRequest.originalUrl;
  },
};

export const authProxyMiddleware = createProxyMiddleware(proxyOptions) as RequestHandler;
