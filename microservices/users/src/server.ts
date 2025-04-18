import fs from 'fs';
import https from 'https';
import path from 'path';

import { logger } from '@repo/utils';

import app from './index';

const port = process.env.PORT ?? 50017;

const privateKey = fs.readFileSync(path.resolve(__dirname, './certs/users-key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, './certs/users-cert.pem'));
const caCertificate = fs.readFileSync(path.resolve(__dirname, './certs/ca-cert.pem'));

const options = {
  key: privateKey,
  cert: certificate,
  ca: caCertificate,
  requestCert: true,
  rejectUnauthorized: true,
};

try {
  https.createServer(options, app).listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
} catch (error) {
  logger.error('Server error:', error);
}
