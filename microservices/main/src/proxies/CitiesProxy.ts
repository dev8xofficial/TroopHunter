import fs from 'fs';
import https from 'https';
import path from 'path';

import { microservicesBaseUrls } from '@repo/utils';
import { type RequestHandler, type Request } from 'express';
import { createProxyMiddleware, type Options } from 'http-proxy-middleware';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../cert/cities-key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../cert/cities-cert.pem'));
const caCertificate = fs.readFileSync(path.resolve(__dirname, '../cert/ca-cert.pem'));

const options = {
  key: privateKey,
  cert: certificate,
  ca: caCertificate,
};

const proxyOptions: Options = {
  target: microservicesBaseUrls.cities,
  changeOrigin: true,
  secure: true,
  agent: new https.Agent(options),
  pathRewrite: function (path: string, req): string {
    const expressRequest = req as Request;
    return expressRequest.originalUrl;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const citiesProxyMiddleware = createProxyMiddleware(proxyOptions) as RequestHandler;
