import fs from 'fs';
import https from 'https';
import path from 'path';

import { type RequestHandler, type Request } from 'express';
import { createProxyMiddleware, type Options } from 'http-proxy-middleware';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../certs/queues-key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../certs/queues-cert.pem'));
const caCertificate = fs.readFileSync(path.resolve(__dirname, '../certs/ca-cert.pem'));

const options = {
  key: privateKey,
  cert: certificate,
  ca: caCertificate,
};

const proxyOptions: Options = {
  target: process.env.QUEUES_MICROSERVICE_URL,
  changeOrigin: true,
  secure: true,
  agent: new https.Agent(options),
  pathRewrite: function (path: string, req): string {
    const expressRequest = req as Request;
    return expressRequest.originalUrl;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const queuesProxyMiddleware = createProxyMiddleware(proxyOptions) as RequestHandler;
