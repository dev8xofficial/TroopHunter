import { logger } from '@repo/utils';

import app from './index';

const port = process.env.PORT ?? 50000;

try {
  app.listen(port, () => {
    logger.info(`API Gateway running at http://localhost:${port}`);
  });
} catch (error) {
  logger.error('Server error:', error);
}
