import { verifyToken } from '@repo/middlewares';
import { BusinessSourceFetchBySourceNameRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getBusinessSourceBySourceName } from '../controllers/BusinessSourceController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define businessSourceRoutes routes
router.get('/:sourceName', BusinessSourceFetchBySourceNameRequestValidationMiddleware, getBusinessSourceBySourceName);

export default router;
