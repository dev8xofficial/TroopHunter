import { logger } from '@repo/utils';

import app from './index';

const port = process.env.PORT ?? 50002;

try {
  app.listen(port, () => {
    logger.info(`API Gateway running at https://0.0.0.0:${port}`);
  });
} catch (error) {
  logger.error('Server error:', error);
}
