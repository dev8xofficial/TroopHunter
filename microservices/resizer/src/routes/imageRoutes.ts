import express from 'express';

import { resizer } from '../controllers/ImageController';

const router = express.Router();

router.get('/:imagePath(.*)/m/:dimensions/filters:quality\\(:quality\\)', resizer);

export default router;
