import app from './index';
import logger from './utils/logger';

const port = process.env.PORT || 50004;

try {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
} catch (error) {
  logger.error('Server error:', error);
}
