import type { IncomingMessage, ServerResponse } from 'http';

import { type RequestHandler, type Request } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Options } from 'http-proxy-middleware';

const proxyOptions: Options<IncomingMessage, ServerResponse> = {
  target: process.env.CITY_QUEUES_MICROSERVICE_URL ?? 'http://localhost:50014',
  changeOrigin: true,
  secure: false,
  pathRewrite: function (path: string, req): string {
    const expressRequest = req as Request;
    return expressRequest.originalUrl;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const cityQueuesProxyMiddleware = createProxyMiddleware(proxyOptions) as RequestHandler;
