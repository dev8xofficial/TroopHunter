import { logger } from '@repo/utils';

import app from './index';

const port = process.env.PORT ?? 50011;

try {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
} catch (error) {
  logger.error('Server error:', error);
}
